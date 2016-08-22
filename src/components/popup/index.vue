<template>
  <div v-show="show" transition="ci-popup" :style="{height:height}" class="ci-popup">
    <slot></slot>
  </div>
</template>

<script>
import Popup from './popup'

export default {
  props: {
    show: {
      type: Boolean,
      twoWay: true
    },
    height: {
      type: String,
      default: 'auto'
    },
    hideOnBlur: {
      type: Boolean,
      default: true
    }
  },
  ready () {
    const _this = this
    this.popup = new Popup({
      container: _this.$el,
      innerHTML: '',
      hideOnBlur: _this.hideOnBlur,
      onOpen (dialog) {
        _this.fixSafariOverflowScrolling('auto')
        _this.show = true
      },
      onClose (dialog) {
        _this.fixSafariOverflowScrolling('touch')
        _this.show = false
      }
    })
    this.$overflowScrollingList = document.querySelectorAll('.ci-fix-safari-overflow-scrolling')
  },
  methods: {
    fixSafariOverflowScrolling (type) {
      if (!this.$overflowScrollingList.length) return
      for (let i = 0; i < this.$overflowScrollingList.length; i++) {
        this.$overflowScrollingList[i].style.webkitOverflowScrolling = type
      }
    }
  },
  data () {
    return {
      hasFirstShow: false
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.popup.show()
        this.$emit('on-show')
        if (!this.hasFirstShow) {
          this.$emit('on-first-show')
          this.hasFirstShow = true
        }
      } else {
        this.$emit('on-hide')
        this.show = false
        this.popup.hide(false)
      }
    }
  },
  beforeDestroy () {
    this.popup.destroy()
  }
}
</script>
