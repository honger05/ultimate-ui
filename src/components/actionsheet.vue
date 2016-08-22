<template>
  <div>
    <div class="ci-mask-transition"
      :class="{'ci-fade-toggle': show}"
      :style="{display: show ? 'block' : 'none'}"
      @click="show=false">
    </div>
    <div class="ci-actionsheet"
      :class="{'ci-actionsheet-toggle': show}">
      <div class="ci-actionsheet-menu">
        <div class="ci-actionsheet-cell ci-border-t"
          v-for="(key, text) in menus"
          @click="emitEvent('on-click-menu', key)"
          v-html="text">
        </div>
        <div class="ci-actionsheet-gap"
          v-if="showCancel">
        </div>
        <div class="ci-actionsheet-cell ci-actionsheet-cancel"
          @click="emitEvent('on-click-menu', 'cancel')"
          v-if="showCancel">{{cancelText}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    showCancel: Boolean,
    cancelText: {
      type: String,
      default: 'cancel'
    },
    menus: {
      type: Object,
      default: {}
    }
  },
  methods: {
    emitEvent (event, menu) {
      if (event === 'on-click-menu' && !/.noop/.test(menu)) {
        this.$emit(event, menu)
        this.$emit(`${event}-${menu}`)
        this.show = false
      }
    }
  }
}
</script>
