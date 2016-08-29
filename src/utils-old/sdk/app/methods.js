import {
  ANDROID,
  IOS,
} from './os';

const args = params => encodeURIComponent(JSON.stringify(params));

const callNative = (method, params) => {
  const _params = params || {};
  _params.jsCallBack = 'window.haoJs.getCommonArgs';
  const obj = {
    MethodName: method,
    Parameters: _params,
  };
  if (!window.hczApp || !window.hczApp.CallNative) {
    throw new Error('Method window.hczApp.CallNative not found');
  }
  window.hczApp.CallNative(JSON.stringify(obj));
};

/*  eslint new-cap: ["error", {"capIsNew": false}] */
export default {
  getUser: {
    [IOS]: params => `native://commonAPI.getAopsIdAndToken?args=${args(params)}`,
    [ANDROID]: params => window.wst.GetLogininfo.apply(window.wst, params),
  },
  toLogin: {
    [IOS]: params => `native://commonAPI.goLogin?args=${args(params)}`,
    [ANDROID]: params => window.wst.goLogin.apply(window.wst, params),
  },
  haveCar: {
    [IOS]: params => `native://commonAPI.haveAddCar?args=${args(params)}`,
    [ANDROID]: params => window.wst.HaveAddCar.apply(window.wst, params),
  },
  addCar: {
    [IOS]: params => `native://commonAPI.goAddCar?args=${args(params)}`,
    [ANDROID]: params => window.wst.goAddCar.apply(window.wst, params),
  },
  getCars: {
    [IOS]: params => `native://commonAPI.getCarList?args=${args(params)}`,
    [ANDROID]: params => window.wst.getCarList.apply(window.wst, params),
  },
  getVersion: {
    [IOS]: params => `native://commonAPI.getAppVersion?args=${args(params)}`,
    [ANDROID]: params => window.wst.GetVersionInfo.apply(window.wst, params),
  },
  shareToWechat: {
    [IOS]: params => `native://commonAPI.shareToWXFriendsWithParams?args=${args(params)}`,
    [ANDROID]: params => {
      try {
        if (params.length < 4) {
          throw new Error('Need to call old method');
        }
        window.wst.shareWithWX.call(window.wst, JSON.stringify({
          title: params[0],
          content: params[1],
          url: params[2],
          thumbImg: params[3],
        }));
      } catch (e) {
        window.wst.shareWithWX.apply(window.wst, params.slice(0, 3));
      }
    },
  },
  shareToWechatFriends: {
    [IOS]: params => `native://commonAPI.shareToWeChatWithParams?args=${args(params)}`,
    [ANDROID]: params => {
      try {
        if (params.length < 3) {
          throw new Error('Need to call old method');
        }
        window.wst.shareWithFriends.call(window.wst, JSON.stringify({
          content: params[0],
          url: params[1],
          thumbImg: params[2],
        }));
      } catch (e) {
        window.wst.shareWithFriends.apply(window.wst, params.slice(0, 2));
      }
    },
  },
  shareToWeibo: {
    [IOS]: params => `native://commonAPI.shareToSinaWeiboWithParams?args=${args(params)}`,
    [ANDROID]: params => window.wst.shareToWeibo.apply(window.wst, params),
  },
  shareToSMS: {
    [IOS]: params => `native://commonAPI.shareToMessageWithParams?args=${args(params)}`,
    [ANDROID]: params => window.wst.shareToSMS.apply(window.wst, params),
  },
  toCoupon: {
    [IOS]: () => 'native://coupon',
    [ANDROID]: () => window.wst.goCoupon(),
  },
  toWelfare: {
    [IOS]: () => 'native://welfare',
    [ANDROID]: () => window.wst.goWelfare(),
  },
  clear: {
    [IOS]: params => `native://commonAPI.H1.JKIMG.NET?args=${args(params)}`,
    [ANDROID]: () => {},
  },
  sign: {
    [IOS]: params => callNative('signHeaders', params),
    [ANDROID]: params => window.wst.signHeaders.apply(window.wst, params),
  },
  getDevice: {
    [IOS]: params => callNative('getPhoneInfo', params),
    [ANDROID]: params => window.wst.getPhoneInfo.apply(window.wst, params),
  },
};
