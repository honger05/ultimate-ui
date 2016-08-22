/**
* @function readPlatform
* @memberof navigator
* @description 平台读取
* @example
*/
window.mobileUtil = function() {
    let browser={
        versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {                                                            //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1,                             //IE内核
                presto: u.indexOf('Presto') > -1,                               //opera内核
                webKit: u.indexOf('AppleWebKit') > -1,                          //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,     //火狐内核
                // mobile: !!u.match(/AppleWebKit.*Mobile.*/),                  //是否为移动终端
                // ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),             //ios终端
                android: u.indexOf('Android') > -1,                             //android终端
                // iPhone: u.indexOf('iPhone') > -1 ,                           //是否为iPhone或者QQHD浏览器
                // iPad: u.indexOf('iPad') > -1,                                //是否iPad
                webApp: u.indexOf('Safari') == -1                               //是否web应该程序，没有头部与底部
           }
        }(),
        language:(navigator.browserLanguage || navigator.language).toLowerCase()
    }

    let UA = navigator.userAgent,
        isAndroid = /android|adr/gi.test(UA),
        isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,                    // 据说某些国产机的UA会同时包含 android iphone 字符
        isMobile = isAndroid || isIos                                           // 粗略的判断

    return {
        isAndroid: isAndroid,
        isIos: isIos,
        isMobile: isMobile,

        isNewsApp: /NewsApp\/[\d\.]+/gi.test(UA),
        isWeixin: /MicroMessenger/gi.test(UA),
        isQQ: /QQ\/\d/gi.test(UA),
        isYixin: /YiXin/gi.test(UA),
        isWeibo: /Weibo/gi.test(UA),
        isTXWeibo: /T(?:X|encent)MicroBlog/gi.test(UA),

        tapEvent: isMobile ? 'tap' : 'click'
    }

}

sdk.getUser()
.then(function(user) {
  //user为Object，aopsId为用户ID，token为登录的accessToken
  //如：{aopsId: "123", token: "xxxx"}
})
.catch(function(err) {
  //此处为获取登录信息失败时调用，即用户未登录
});
