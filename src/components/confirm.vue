<template>
  <dialog class="ci-dialog-confirm"
  :show="show"
  :mask-transition="maskTransition"
  :dialog-transition="dialogTransition"
  @on-hide="$emit('on-hide')"
  @on-show="$emit('on-show')">
    <div class="ci-dialog-hd"><strong class="ci-dialog-title">{{title}}</strong></div>
    <div class="ci-dialog-bd"><slot></slot></div>
    <div class="ci-dialog-ft">
      <a href="javascript:;" class="ci-btn-dialog default" @click="onCancel">{{cancelText}}</a>
      <a href="javascript:;" class="ci-btn-dialog primary" @click="onConfirm">{{confirmText}}</a>
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
    show: {
      type: Boolean,
      default: false,
      twoWay: true
    },
    title: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
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
    onConfirm () {
      this.show = false
      this.$emit('on-confirm')
    },
    onCancel () {
      this.show = false
      this.$emit('on-cancel')
    }
  }
}
</script>
