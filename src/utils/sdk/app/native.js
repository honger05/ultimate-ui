import { ANDROID, IOS } from './os';

class Native {
  constructor(Queue = null, timeout = 100) {
    const os = window.navigator.userAgent.match(/Android/i) ? ANDROID : IOS;
    this.options = { os, timeout };
    const maxConcurrent = 1;
    const maxQueue = Infinity;
    this.queue = Queue ? new Queue(maxConcurrent, maxQueue) : null;
  }
  call(method, params = {}, timeout = 0) {
    if (!this.queue) {
      return this._call(method, params, timeout);
    }
    return this.queue.add(() => this._call(method, params, timeout));
  }
  _call(method, params, timeout) {
    return new Promise((resolve, reject) => {
      const m = method[this.options.os];
      if (timeout >= 0) {
        setTimeout(() => {
          reject(new Error(`Timeout to call ${m} with ${JSON.stringify(params)}`));
        }, timeout || this.options.timeout);
      }
      window.haoJs = {
        getCommonArgs: res => resolve(res),
      };
      try {
        if (this.options.os === ANDROID) {
          this.android(m, params);
          return;
        }
        this.iOS(m, params);
      } catch (e) {
        reject(e);
      }
    });
  }
  android(method, params) {
    const _params = [];
    for (const key in params) {
      if (!params.hasOwnProperty(key)) {
        continue;
      }
      _params.push(params[key]);
    }
    method(_params);
  }
  iOS(method, params = {}) {
    let iframe = window.document.createElement('iframe');
    iframe.src = method(params);
    window.document.body.appendChild(iframe);
    window.document.body.removeChild(iframe);
    iframe = null;
  }
}

export default Native;
