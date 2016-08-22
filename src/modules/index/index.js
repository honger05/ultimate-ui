import Vue from 'vue'
import {
  Loading,
  Swiper,
  Alert,
  Confirm,
  Group,
  Cell,
  Flex,
  FlexItem,
  Popup,
  Picker,
  PopupPicker,
  Switch,
  Address,
  Toast,
  Search,
  Spinner,
  Progress
} from 'components'

const imgList = [
  'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
]

const swiperList = imgList.map((one, index) => ({
  url: 'javascript:',
  img: one
}))

let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}

let areaData = [{
  name: '中国',
  value: 'china',
  parent: 0
}, {
  name: '美国',
  value: 'USA',
  parent: 0
}, {
  name: '广东',
  value: 'china001',
  parent: 'china'
}, {
  name: '广西',
  value: 'china002',
  parent: 'china'
}, {
  name: '美国001',
  value: 'usa001',
  parent: 'USA'
}, {
  name: '美国002',
  value: 'usa002',
  parent: 'USA'
}, {
  name: '广州',
  value: 'gz',
  parent: 'china001'
}, {
  name: '深圳',
  value: 'sz',
  parent: 'china001'
}, {
  name: '广西001',
  value: 'gz',
  parent: 'china002'
}, {
  name: '广西002',
  value: 'sz',
  parent: 'china002'
}, {
  name: '美国001_001',
  value: '0003',
  parent: 'usa001'
}, {
  name: '美国001_002',
  value: '0004',
  parent: 'usa001'
}, {
  name: '美国002_001',
  value: '0005',
  parent: 'usa002'
}, {
  name: '美国002_002',
  value: '0006',
  parent: 'usa002'
}]

new Vue({
  el: 'body',
  data: {
    showLoading: false,
    showConfirm: false,
    showPopup: false,
    showAlert: false,
    showToast: false,
    swiperList: swiperList,
    loadingTxt: 'progress',
    areaData: areaData,
    pickerYearVal: ['2010'],
    years: [years],
    popupPickerVal: ['iPhone'],
    popupPickerList: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
    searchVal: '',
    searchResults: []
  },
  methods: {
    onConfirm () {
      console.log(1)
    },
    onPickerChange (value) {
      console.log(value)
    },
    resultClick (item) {
      alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.searchResults = getResult(this.value)
    }
  },
  components: {
    Loading,
    Swiper,
    Alert,
    Confirm,
    Group,
    Cell,
    Flex,
    FlexItem,
    Popup,
    Picker,
    PopupPicker,
    Switch,
    Address,
    Toast,
    Search,
    Spinner,
    Progress
  }
})

function getResult (val) {
  let rs = []
  for (let i = 0; i < 40; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
