var wechartAuthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize'
var redirectUri = 'http://eim-talk-stg.dmzstg.pingan.com.cn/pack-pir/lotteryRedirect'
var weappNo = 'PACK95511_01'
var appid = 'wx50aab92add0cb026'
var scope = 'snsapi_base'
var state = 'pa18'
var backUrl = encodeURIComponent(location.href.split('#')[0] + '?back=Y')
var dmzurl = encodeURIComponent(redirectUri + '?weappNo=' + weappNo + '&backurl=' + backUrl)

export let WX = {
  jssdkRegist: function () {
    var wxReq = Vue.http.get('focusweixin/jssdkparams',
      {
        url: backUrl
      }).then(function (r) {
        var d = r.data.extraInfo
        wx.config({
          appId: d.appId,
          timestamp: d.timestamp,
          nonceStr: d.noncestr,
          signature: d.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'chooseImage',
            'uploadImage',
            'previewImage',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'onVoicePlayEnd',
            'uploadVoice',
            'downloadVoice',
            'chooseWXPay'
          ]
        })
      })
  },

  checkAuth: function () {
    window.location.href = wechartAuthUrl + '?appid=' + appid + '&redirect_uri=' + dmzurl +
    '&response_type=code&scope=' + scope +
    '&state=' + state + '#wechat_redirect'
  },

  checkService: function (openid, cb) {
    Vue.resource('weixininfo{/openid}')
      .get({
        openid: openid
      })
      .then(function (res) {
        var isExist = false
        if (res.data.content) {
          isExist = true
        }
        cb(isExist)
      })
  },

  doAuthReady: function (vm, cb) {
    var code = Utils.getQueryString('code')
    var user = Utils.STORE.getStore(Utils.STORE.user)
    console.log('openid: ' + user.openid)
    if (user.openid) {
      this.checkService(user.openid, function (isExist) {
        if (isExist) {
          this.copyUser(vm, user, cb)
        } else {
          Utils.STORE.setStore(Utils.STORE.user, {})
          this.checkAuth()
        }
      }.bind(this))
    } else if (code) {
      this.getUserInfo(code).then(function (res) {
        var resUser = res.data.extraInfo
        this.copyUser(vm, resUser, cb)
        Utils.STORE.setStore(Utils.STORE.user, resUser)
      }.bind(this))
    } else {
      this.checkAuth()
    }
  },

  copyUser: function (vm, user, cb) {
    vm.nickname = user.nickname
    vm.headimgurl = user.headimgurl
    vm.openid = user.openid
    if (Utils.isFunction(cb)) {
      cb()
    }
  },

  getUserInfo: function (code) {
    return Vue.http.get('weixinpage/baseinfo', { code: code })
  },

  isWeixn: function () {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      return true
    }
    return false
  },

  checkRecord: function () {
    if (!localStorage.allowRecord || localStorage.allowRecord !== 'true') {
      wx.startRecord({
        success: function () {
          localStorage.allowRecord = 'true'
          wx.stopRecord()
        },
        cancel: function () {
          alert('用户拒绝授权录音')
        }
      })
    }
  },

  startRecord: function () {
    wx.startRecord({
      success: function () {
        localStorage.allowRecord = 'true'
      },
      cancel: function () {
        $.dialog({
          content: '用户拒绝授权录音',
          button: ['确认']
        })
      }
    })
  },

  stopRecord: function (voice) {
    wx.stopRecord({
      success: function (res) {
        voice.localId = res.localId
      },
      fail: function (r) {
        console.log(r);
      }
    })
  },

  uploadVoice: function (voice) {
    wx.uploadVoice({
      localId: voice.localId,
      isShowProgressTips: 1,
      success: function (res) {
        voice.serverId = res.serverId
      }
    })
  },

  downloadVoice: function (voice) {
    wx.downloadVoice({
      serverId: voice.serverId,
      success: function (res) {
        voice.localId = res.localId
      }
    })
  },

  playVoice: function (voice) {
    wx.playVoice({
      localId: voice.localId
    })
  },

  stopVoice: function (voice) {
    wx.stopVoice({
      localId: voice.localId
    })
  },

  chooseImage: function (cb) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        cb(res.localIds)
      }
    })
  },

  previewImage: function (current, urls) {
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    });
  },

  uploadImages: function (localId, cb) {
    wx.uploadImage({
      localId: localId,
      isShowProgressTips: 0,
      success: function (res) {
        cb(res.serverId)
      }
    })
  }
}

if (typeof wx !== 'undefined') {
  wx.error(function (res) {
    alert('微信功能失效，我们只是信息的搬运工！')
    setTimeout(function () {
      wxtool.jssdkRegist()
    }, 50000)
  })
}
