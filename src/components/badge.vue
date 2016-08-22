<template>
  <span v-text="text" :class="['ci-badge', {'ci-badge-single': text.length === 1}]"></span>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang="less">
.ci-badge {
  display: inline-block;
  text-align: center;
  background: #f74c31;
  color: #fff;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
  border-radius: 8px;
  padding: 0 6px;
  background-clip: padding-box;
}
.ci-badge-single {
  padding: 0;
  width: 16px;
}
</style>
