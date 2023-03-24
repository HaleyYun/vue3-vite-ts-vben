<template>
  <view
      :style="{
      width: size + 'px',
      height: size + 'px',
      backgroundImage: svgIcon,
      opacity: opacity,
      display: display,
    }"
      class="vo-icon"
      @click="click"
  />
</template>

<script>
import getSvg from '@vocen/era-svg-icons'

export default {
  name: 'VoIcon',
  props: {
    /**
     * icon名称
     */
    name: {
      type: String,
      default: 'user',
    },
    /**
     *  大小px
     */
    size: {
      type: [Number, String],
      default: 24,
    },
    /**
     * 主题
     */
    color: {
      type: String,
      default: '',
    },
    dataUri: {
      type: Boolean,
      default: true,
    },
    // 白名单颜色
    whiteColor: {
      type: Array,
      default: () => [],
    },
    opacity: {
      type: [Number, String],
      default: 1,
    },
    display: {
      type: String,
      default: 'inline-block',
    },
  },
  data() {
    return {
      svgIcon: '',
      svgName: '',
    }
  },
  watch: {

    name: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.svgName = newVal
        const svgIcon = getSvg(newVal, {
          size: this.size,
          color: this.color,
          whiteColor: this.whiteColor,
          dataUri: this.dataUri,
        })
        this.svgIcon = `url("${svgIcon}")`
      },
    },
    color: {
      deep: true,
      immediate: true,
      handler(newVal) {
        const svgIcon = getSvg(this.svgName, {
          size: this.size,
          color: newVal,
          whiteColor: this.whiteColor,
          dataUri: this.dataUri,
        })
        this.svgIcon = `url("${svgIcon}")`
      },
    },
  },
  methods: {
    click() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
.vo-icon {
  //display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
</style>
