<template>
  <dialog class="ci-dialog-alert"
  :show="show"
  :mask-transition="maskTransition"
  :dialog-transition="dialogTransition"
  @on-hide="$emit('on-hide')"
  @on-show="$emit('on-show')">
    <div class="ci-dialog-hd"><strong class="ci-dialog-title">{{title}}</strong></div>
    <div class="ci-dialog-bd"><slot></slot></div>
    <div class="ci-dialog-ft">
      <a href="javascript:;" class="ci-btn-dialog primary" @click="onHide">{{buttonText}}</a>
    </div>
  </dialog>
</template>

<script>
import Dialog from './dialog'

export default {
  components: {
    Dialog
  },
  props: {
    show: Boolean,
    title: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      default: '好'
    },
    maskTransition: {
      type: String,
      default: 'ci-fade'
    },
    dialogTransition: {
      type: String,
      default: 'ci-dialog'
    }
  },
  methods: {
    onHide () {
      this.show = false
    }
  }
}
</script>
