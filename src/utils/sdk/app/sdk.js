import methods from './methods';

const parse = params => {
  if (!params) {
    return '';
  }
  if (typeof params === 'string') {
    return params.indexOf('?') === 0 ? params.substr(0) : params;
  }
  const _params = [];
  for (const key in params) {
    if (!params.hasOwnProperty(key)) {
      continue;
    }
    _params.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  }
  return _params.join('&');
};

class SDK {
  constructor(native) {
    this.native = native;
  }
  getUser(timeout) {
    return this.native
    .call(methods.getUser, {}, timeout || 1000)
    .then(res => {
      if (!res.aopsId || res.aopsId === 'null' || !res.token || res.token === 'null') {
        return Promise.reject(new Error('Failed to get user'));
      }
      //  ignore the error
      this.native.call(methods.clear).catch(() => {});
      return { aopsId: res.aopsId, token: res.token, phone: res.phone };
    });
  }
  toLogin(interval = 1000) {
    //  clear last interval
    clearInterval(this.intervalId);
    this.native
    .call(methods.toLogin);

    return new Promise(resolve => {
      this.intervalId = setInterval(() => {
        this.getUser()
        .then(user => {
          clearInterval(this.intervalId);
          resolve(user);
        });
      }, interval);
    });
  }
  share(channel, params) {
    return this.native
    .call(methods[channel], params, -1)// nerver timeout
    .then(res => {
      if (res.result === 'success') {
        return true;
      }
      return Promise.reject(new Error(`Failed to ${channel} with ${JSON.stringify(params)}`));
    });
  }
  shareToWechat(title, msg, url, picUrl) {
    return this.share(SDK.channel.WECHAT, { title, msg, url, picUrl });
  }
  shareToWechatFriends(title, url, picUrl) {
    return this.share(SDK.channel.WECHAT_FRIENDS, { title, url, picUrl });
  }
  shareToWeibo(msg, url) {
    return this.share(SDK.channel.WEIBO, { msg, url });
  }
  shareToSMS(msg, url) {
    return this.share(SDK.channel.SMS, { msg, url });
  }
  getVersion() {
    return this.native
    .call(methods.getVersion)
    .then(res => ({ version: res.appVersion ? res.appVersion : res.appVersions }));
  }
  isInApp() {
    if (/hczandroid|hczios|carowner/i.exec(window.navigator.userAgent)) {
      return Promise.resolve(true);
    }
    return this.native
    .call(methods.getVersion, {}, 200)
    .then(() => true);
  }
  setBackable(backable) {
    if (window.goBackInterface && window.goBackInterface.canBack) {
      window.goBackInterface.canBack(backable ? 1 : -1);
    }
    window.back = () => backable;
  }
  toAddCar() {
    return this.native
    .call(methods.addCar, {}, -1);//  nerver timeout
  }
  haveCar() {
    return this.native
    .call(methods.haveCar, {}, 1000)
    .then(({ addCar }) => {
      if (addCar === 1 || addCar === '1') {
        return true;
      }
      return Promise.reject(new Error('Not found for car'));
    });
  }
  getCars() {
    return this.native
    .call(methods.getCars, {}, 1000)
    .then(({ carList }) => carList);
  }
  toCoupon() {
    return this.native
    .call(methods.toCoupon, {});
  }
  toWelfare() {
    return this.native
    .call(methods.toWelfare, {});
  }
  sign(method, path, query, body, syncTime = false) {
    return this.native
    .call(methods.sign, {
      method,
      path,
      query: parse(query),
      body: parse(body),
      updateTime: syncTime ? '1' : '0',
    }, syncTime ? 3000 : 500);
  }
  getDevice() {
    return this.native
    .call(methods.getDevice);
  }
}

SDK.channel = {
  //  微信好友
  WECHAT: 'shareToWechat',
  //  微信朋友圈
  WECHAT_FRIENDS: 'shareToWechatFriends',
  //  新浪微博
  WEIBO: 'shareToWeibo',
  //  短信
  SMS: 'shareToSMS',
};

export default SDK;
