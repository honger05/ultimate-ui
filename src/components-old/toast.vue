<template>
  <div class="cus-toast">
    <div class="ci-mask-transparent" v-show="show"></div>
      <div class="ci-toast" :style="{width: width}" :class="toastClass" v-show="show" :transition="transition">
        <i class="ci-icon-toast" v-show="type !== 'text'"></i>
        <p class="ci-toast-content" v-if="text" v-html="text"></p>
        <p class="ci-toast-content" v-else><slot></slot></p>
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
    time: {
      type: Number,
      default: 2000
    },
    type: {
      type: String,
      default: 'success'
    },
    transition: {
      type: String,
      default: 'ci-fade'
    },
    width: {
      type: String,
      default: '7.6em'
    },
    text: String
  },
  computed: {
    toastClass () {
      return {
        'ci-toast-forbidden': this.type === 'warn',
        'ci-toast-cancel': this.type === 'cancel',
        'ci-toast-success': this.type === 'success',
        'ci-toast-text': this.type === 'text'
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.show = false
          this.$emit('on-hide')
        }, this.time)
      }
    }
  }
}
</script>

<style lang="scss">
.ci-toast {
  transform: translateX(-50%);
  margin-left: 0!important;
}
.ci-toast-forbidden {
  color: #F76260;
}
.ci-toast.ci-toast-text{
  min-height: 0;
}
.ci-toast-text .ci-toast-content {
  margin: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 15px;
}
.ci-toast-success .ci-icon-toast:before {
  content: "\EA08";
}
.ci-toast-cancel .ci-icon-toast:before {
  content: "\EA0D";
}
.ci-toast-forbidden .ci-icon-toast:before {
  content: "\EA0B";
  color: #F76260;
}
</style>
