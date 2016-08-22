<template>
  <div class="ci-dialog-alert" v-show="show"
    :transition="maskTransition"
    @touchmove="!this.scroll && $event.preventDefault()">
    <div class="ci-mask" @click="hideOnBlur && (show = false)"></div>
    <div class="ci-dialog" v-show="show" :transition="dialogTransition">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'ci-fade'
    },
    dialogTransition: {
      type: String,
      default: 'ci-dialog'
    },
    hideOnBlur: Boolean,
    scroll: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    show (val) {
      this.$emit(val ? 'on-show' : 'on-hide')
    }
  }
}
</script>
