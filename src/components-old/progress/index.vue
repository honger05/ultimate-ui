<template>
  <div :id="'cus-progress-' + uuid" class="cus-progress" v-if="template > 0"></div>
  <div class="ci-progress" v-if="template === 0">
    <div class="ci-progress-bar">
      <div class="ci-progress-inner-bar js-progress" :style="{width: percent + '%'}"></div>
    </div>
    <a href="javascript:;" class="ci-progress-opr">
      <i class="ci-icon-cancel" @click="cancel"></i>
    </a>
  </div>
</template>

<script>
import Progress from './progress'
import Base from '../../libs/base'
export default {
  mixins: [Base],
  props: {
    template: {
      type: Number,
      default: 0
    },
    percent: {
      type: Number,
      default: 0,
      twoWay: true
    }
  },
  ready () {
    const _this = this
    if (_this.template > 0) {
      this.progress = new Progress({
        template: _this.template,
        parent: _this.template === 1 ? 'body' : `#cus-progress-${_this.uuid}`,
        start: true
      })
    }
  },
  methods: {
    cancel () {
      this.$emit('on-cancel')
    }
  },
  data () {
    return {
    }
  },
  destroyed () {
    if (this.template > 0 && this.progress) {
      this.progress.destroy()
      if (this.progress.timer) {
        clearTimeout(this.progress.timer)
      }
      this.progress = null
      document.querySelector(`#cus-progress-${this.uuid}`).innerHTML = ''
    }
    if (this.template === 1) {
      const progress = document.querySelector('#mprogress1')
      progress && progress.parentNode.removeChild(progress)
    }
  }
}
</script>

<style lang="scss">
@import './style.css';

.ui-mprogress .indeter-bar, .ui-mprogress .query-bar, .ui-mprogress .deter-bar {
  background-color: #0ae;
}

.ui-mprogress .bar-bg, .ui-mprogress .buffer-bg {
  background-color: #EBEBEB;
}

.cus-progress {
  width: 100%;
  height: 3px;
}
</style>
