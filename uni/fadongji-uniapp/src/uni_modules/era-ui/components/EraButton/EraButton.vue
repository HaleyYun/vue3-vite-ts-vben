<template>
  <view
    :class="{
      primary: themeType === 'Primary',
      danger: themeType === 'Danger',
      wire: themeType === 'Wire',
      default: themeType === 'Default',
    }"
    @click="click"
  >
    <u-button
      :class="{
        'wire-btn': themeType === 'Wire',
        'wire-disabled': themeType === 'Wire' && disabled,
      }"
      :color="getBgColorFn()"
      :disabled="disabled"
      :shape="shape"
      :style="{
        width: widthBtn ? widthBtn : width + 'rpx',
        height: height + 'rpx',
        padding: padding + 'rpx',
      }"
    >
      <block slot="default">
        <slot name="default">
          <view
            :style="{
            fontSize: fontSizeVal + 'rpx',
              color: getColorFn(),
            }"
          >
            {{ text }}
          </view>
        </slot>
      </block>
    </u-button>
  </view>
</template>
<script>
  export default {
    name: 'EraButton',
    props: {
      // circle圆角
      widthBtn: {
        type: Number,
        default: 0,
      },
      // circle圆角
      padding: {
        type: Number,
        default: 0,
      },
      // circle圆角
      shape: {
        type: String,
        default: 'circle',
      },
      // button 大小  可选值 lg  medium  small  mini
      size: {
        type: String,
        default: 'lg',
      },
      //button类型 可选  Primary  Danger Wire default
      themeType: {
        type: String,
        default: 'Primary',
      },
      //是否可以点击
      disabled: {
        type: Boolean,
        default: false,
      },
      //按钮文字
      text: {
        type: String,
        default: '确定',
      },
      //按钮文字大小
      fontSize: {
        type: [Number, String],
        default: 32,
      },
      //按钮文字颜色
      fontColor: {
        type: String,
        default: '#ffffff',
      },
    },
    data() {
      return {
        width: '',
        height: 92,
        colorClass: '',
        fontSizeVal: '',
      }
    },
    watch: {
      //监听props color
      size: {
        deep: true,
        immediate: true,
        handler: function (newVal) {
          if (this.block) {
            return (this.width = 'auto')
          }
          switch (newVal) {
            case 'lg':
              this.width = 686
              this.height = 80
              break
            case 'medium':
              this.width = 656
              // this.width = 686
              this.height = 80
              break

            case 'lg-mini':
              this.width = 646
              this.height = 92
              break
            case 'small':
              this.width = 326
              this.height = 80
              break
            case 'nav-mini':
              this.width = 120
              this.height = 56
              break
            case 'more-mini':
              this.width = 180
              this.height = 64
              break
            case 'mini':
              this.width = 160
              this.height = 64
              this.fontSizeVal = 24
              break
            case 'btn-mini':
              this.width = 120
              this.height = 64
              this.fontSizeVal = 24
              break
            case 'btn-modal':
              this.width = 596
              this.height = 80
              this.fontSizeVal = 32
              break
            case 'less-mini':
              this.width = 160
              this.height = 64
              this.fontSizeVal = 24
              break
            case 'long-mini':
              this.width = 208
              this.height = 64
              this.fontSizeVal = 24
              break
            case 'height-mini':
              this.width = 160
              this.height = 80
              this.fontSizeVal = 28
              break
            case 'two-hundred':
              this.width = 200
              this.height = 80
              this.fontSizeVal = 28
              break
          }
        },
      },
      fontSize: {
        deep: true,
        immediate: true,
        handler: function (newVal) {
          this.fontSizeVal = newVal
        },
      },
    },
    methods: {
      click() {
        if (this.disabled) return
        this.$emit('click')
      },
      /**
       * @description 返回当前类型的背景色
       */
      getBgColorFn() {
        let bgColor = ''
        switch (this.themeType) {
          case 'Primary':
            if (this.disabled) {
              bgColor = '#F6F7F8'
            } else {
              bgColor = '#FF5319'
            }
            break
          case 'Danger':
            if (this.disabled) {
              bgColor = '#F6F7F8'
            } else {
              bgColor = '#E50012'
            }
            break
          case 'Danger':
            bgColor = '#FFFFFF'
            break
        }
        return bgColor
      },
      getColorFn() {
        let colorVal = this.colorClass
        if (!this.disabled) return colorVal
        switch (this.themeType) {
          case 'Primary':
            colorVal = 'rgba(0, 0, 0, 0.25)'
            break
          case 'Drfault':
            colorVal = 'rgba(0, 0, 0, 0.65)'
            break
          case 'Danger':
            colorVal = 'rgba(229, 0, 18, 0.2)'
            break
          case 'Wire':
            colorVal = '#D3D4DB'
            break
        }
        return colorVal
      },
    },
  }
</script>
<style lang="scss" scoped>
  .primary {
    line-height: 1;

    .u-button--active {
      &:before {
        background-color: #ff5319 !important;
      }
      background-color: #ff5319 !important;
      border: none !important;
      color: rgba(255, 255, 255) !important;
    }

    .u-button--disabled {
      background-color: #f6f7f8 !important;
      color: #b9b9ba !important;
    }
  }
  .default {
    color: rgba(0, 0, 0, 0.85);
    .u-button--info {
      border-color: $v-c0-25;
    }
  }

  .danger {
    .u-button--active {
      &:before {
        opacity: 1 !important;
        background-color: #ec404d !important;
      }
      opacity: 1 !important;
      border: none !important;
      color: rgba(255, 255, 255, 0.85) !important;
    }
  }

  .wire {
    &-btn {
      color: $color-primary-yellow;
      border: 2rpx solid #ff5319;
      box-sizing: border-box;
    }

    .u-button--active {
      &:before {
        opacity: 1 !important;
        background-color: transparent !important;
      }
      border: 2rpx solid $color-primary-yellow !important;
      box-sizing: border-box !important;
      color: $color-primary-yellow !important;
    }

    .u-button--info {
      color: $color-primary-yellow !important;
    }

    .wire-disabled {
      border: 2rpx solid #f6f7f8 !important;
      color: rgba(0, 0, 0, 0.25) !important;
    }
  }

  .u-button--square {
    border-radius: 8rpx !important;
  }

  .u-button--disabled {
    opacity: 1 !important;
  }
</style>
