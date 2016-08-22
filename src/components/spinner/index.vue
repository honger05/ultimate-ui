<template>
  <span class="ci-spinner" :class="className"></span>
</template>

<script>
import Spinner from './spinner'
const types = ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral']

export default {
  ready () {
    Spinner(this.$el, this.type)
  },
  props: {
    type: {
      type: String,
      default: 'ios'
    }
  },
  computed: {
    className () {
      let rs = {}
      for (let i = 0; i < types.length; i++) {
        rs[`ci-spinner-${types[i]}`] = this.type === types[i]
      }
      return rs
    }
  }
}
</script>

<style>
.ci-spinner {
  stroke: #444;
  fill: #444;
  vertical-align: middle;
  display: inline-block;
  width: 28px;
  height: 28px;
}

.ci-spinner svg {
  width: 28px;
  height: 28px;
}

.ci-spinner.ci-spinner-inverse {
  stroke: #fff;
  fill: #fff;
}

.ci-spinner-android {
  stroke: #4b8bf4;
}

.ci-spinner-ios, .ci-spinner-ios-small {
  stroke: #69717d;
}

.ci-spinner-spiral .stop1 {
  stop-color: #fff;
  stop-opacity: 0;
}

.ci-spinner-spiral.ci-spinner-inverse .stop1 {
  stop-color: #000;
}

.ci-spinner-spiral.ci-spinner-inverse .stop2 {
  stop-color: #fff;
}
</style>
