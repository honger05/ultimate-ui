const s = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
class Reporter {
  constructor({ prefix, api }) {
    this.options = { prefix, api };
  }
  guid() {
    let guid = localStorage.getItem('report_guid');
    if (!guid) {
      guid = `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`.toLowerCase();
      localStorage.setItem('report_guid', guid);
    }
    return guid;
  }
  report(event, user, label, times = 1) {
    const { api, prefix } = this.options;
    const data = {
      source: this.guid(),
      label,
      msg: {
        client_event: [{
          type: `${prefix}${event}`,
          num: times,
        }],
      },
    };
    let type = 'aopsid';
    if (/^1[3|4|5|6|8|9][0-9]{9}$/.exec(user)) {
      type = 'phone';
    }
    data[type] = user;
    const query = [];
    for (const key in data) {
      if (!data.hasOwnProperty(key)) {
        continue;
      }
      let value = data[key];
      if (typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      query.push(`${key}=${encodeURIComponent(value)}`);
    }
    let script = document.createElement('img');
    script.src = `${api}?${query.join('&')}`;
    document.body.appendChild(script);
    document.body.removeChild(script);
    script = null;
  }
}

Reporter.API = {
  PROD: 'http://icore-hczhd.pingan.com.cn/collect/client',
  TEST: 'http://ytest1-icore-hczhd.pingan.com.cn:36080/collect/client',
};

export default Reporter;
