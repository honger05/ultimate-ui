<template>
  <div class="cus-search-box">
    <div class="ci-search-bar" id="search-bar" :class="{'ci-search-focusing': !isCancel}">
      <form class="ci-search-outer" @submit.prevent="$emit('on-submit', value)">
        <div class="cus-search-mask" @click="touch" v-show="!isFixed"></div>
        <div class="ci-search-inner">
          <i class="ci-icon-search"></i>
          <input type="search" class="ci-search-input" id="search-input" placeholder="{{placeholder}}" autocomplete="off" required v-model="value" v-el:input/>
          <a href="javascript:" class="ci-icon-clear" id="search-clear" @click="clear"></a>
        </div>
        <label for="search-input" class="ci-search-text" id="search-text">
          <i class="ci-icon-search"></i>
          <span>{{placeholder}}</span>
        </label>
      </form>
      <a href="javascript:" class="ci-search-cancel" id="search-cancel" @click="cancel">{{cancelText}}</a>
    </div>
    <div class="ci-cells ci-cells-access cus-search-show" id="search-show" v-show="isFixed && results.length && value">
      <div class="ci-cell" v-for="item in results" @click="handleResultClick(item)">
        <div class="ci-cell-bd ci-cell-primary">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    },
    cancelText: {
      type: String,
      default: 'cancel'
    },
    value: {
      type: String,
      twoWay: true,
      default: ''
    },
    results: {
      type: Array,
      default () {
        return []
      }
    },
    autoFixed: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clear () {
      this.value = ''
      this.isFocus = true
      this.setFocus()
    },
    cancel () {
      this.value = ''
      this.isCancel = true
      this.isFixed = false
      this.$emit('on-cancel')
    },
    handleResultClick (item) {
      this.$emit('result-click', item)
      this.isCancel = true
      this.isFixed = false
    },
    touch () {
      this.isCancel = false
      if (this.autoFixed) {
        this.isFixed = true
      }
    },
    setFocus () {
      this.$els.input.focus()
    }
  },
  data () {
    return {
      isCancel: true,
      isFocus: false,
      isFixed: false
    }
  },
  watch: {
    isFixed (val) {
      if (val === true) {
        this.$el.classList.add('cus-search-fixed')
        this.setFocus()
        this.isFocus = true
      } else {
        this.$el.classList.remove('cus-search-fixed')
      }
    },
    value (val) {
      this.$emit('on-change', this.value)
    }
  }
}
</script>

<style lang="scss">
.cus-search-fixed {
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 5;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}
.cus-search-box {
  width: 100%;
}
.cus-search-show {
  margin-top: 0;
  overflow-y: auto;
  height: 100%;
}
.cus-search-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
.ci-icon-clear:before {
    color: #B2B2B2;
    font-size: 14px;
}
</style>
