
import config from 'config'

export let URL = config.debug ? {
  REPORT: 'http://ytest1-icore-hczhd.pingan.com.cn:36080/collect/client',
  CARINFO: 'https://test-icore-aoas.pingan.com.cn:40201/claimer/car_info'
} : {
  REPORT: 'http://icore-hczhd.pingan.com.cn/collect/client',
  CARINFO: 'https://icore-aoas.pingan.com.cn:30222/claimer/car_info'
}
