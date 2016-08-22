<template>
  <div>
    <div class="ci-cells-title" v-if="title" :style="{color:titleColor}" v-html="title"></div>
    <div class="ci-cells" :class="{'ci-no-group-title':!title}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    titleColor: String
  }
}
</script>

<style>
.ci-no-group-title {
  margin-top:15px;
}
.ci-cells > a {
  color:#000;
}
</style>
