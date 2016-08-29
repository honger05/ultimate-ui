<template>
  <div class="ci-cell" :class="{'ci-tap-active': isLink || !!link}" @click="onClick">
    <div class="ci-cell-hd">
      <slot name="icon"></slot>
    </div>
    <div class="ci-cell-bd" :class="{'ci-cell-primary':primary==='title'}">
      <p>
        {{title}}
        <slot name="after-title"></slot>
      </p>
      <inline-desc>{{inlineDesc}}</inline-desc>
    </div>
    <div class="ci-cell-ft" :class="{'ci-cell-primary':primary==='content', 'with-arrow': isLink || !!link}">
      {{value}}
      <slot name="value"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import InlineDesc from './inline-desc'
import { go } from '../libs/router'

export default {
  components: {
    InlineDesc
  },
  props: {
    title: String,
    value: String,
    isLink: Boolean,
    inlineDesc: String,
    primary: {
      type: String,
      default: 'title'
    },
    link: {
      type: [String, Object]
    }
  },
  methods: {
    onClick () {
      go(this.link, this.$router)
    }
  }
}
</script>
