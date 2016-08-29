<template>
  <div class="ci-flex" :class="{'ci-flex-col': orient === 'vertical', 'ci-flex-row': orient === 'horizontal'}" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    gutter: {
      type: Number,
      default: 8
    },
    orient: {
      type: String,
      default: 'horizontal'
    },
    justify: String,
    align: String,
    wrap: String,
    direction: String
  },
  computed: {
    styles () {
      return {
        'justify-content': this.justify,
        'align-items': this.align,
        'flex-wrap': this.wrap,
        'flex-direction': this.direction
      }
    }
  }
}
</script>

<style lang="scss">
.ci-flex{
  width: 100%;
  text-align: left;
  display: flex;
  box-align: center;
  align-items: center;
  &-item {
    flex: 1;
    min-width: 20px;
    width: 0%;
    &:first-child{
      margin-left: 0!important;
      margin-top: 0!important;
    }
  }
  &-col {
    box-orient: vertical;
    flex-direction: column;
    & > .ci-flex-item {
      width: 100%;
    }
  }
  &-row {
    box-direction: row;
    box-orient: horizontal;
    flex-direction: row;
  }
}
.ci-flex-item > .ci-flex {
  width: 100%;
}
</style>
