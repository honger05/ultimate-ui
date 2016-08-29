<template>
  <div id="loadingToast"
    class="ci-loading-toast" v-show="show">
    <div class="ci-mask-transparent"></div>
    <div class="ci-toast">
      <div class="ci-loading">
        <div class="ci-loading-leaf" v-for="i in 12" :class="['ci-loading-leaf-' + i]"></div>
      </div>
      <p class="ci-toast-content">{{text}}<slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    text: {
      type: String,
      default: 'Loading'
    }
  }
}
</script>
