<template>
  <view>
    <view :class="{ 'vo-fixed': isFixed }" :style="{ zIndex: zIndex }" class="vo">
      <view :style="statusBarStyle" class="vo-bar" />

      <view
        :class="{ shadow: isShadow }"
        :style="{ backgroundColor: isTransparent ? '' : bgColor }"
        class="vo-nav"
      >
        <view
          :style="{
            width: leftWidth + 'rpx',
          }"
          class="vo-nav__back"
        >
          <slot v-if="showBack" name="back">
            <view v-if="noLeft"></view>
            <VoIcon v-else @click="backFn" name="nav-back" color="#000" opacity="0.45" />
          </slot>
        </view>
        <view class="vo-nav__title fz-b">
          <slot name="title">
            {{ title }}
          </slot>
        </view>
        <view
          :style="{
            width: rightWidth + 'rpx',
          }"
          class="vo-nav__operation"
          @click="operationFn"
        >
          <slot name="operation">
            <text
              v-if="rightTitle"
              :style="{
                color: rightTitleColor,
              }"
              class="operation"
              >{{ rightTitle }}</text
            >
          </slot>
          <view @click="iconFn">
            <slot name="more">
              <VoIcon
                v-if="isHaveMore"
                :opacity="0.45"
                class="more-icon"
                color="#000"
                name="more"
              />
            </slot>
          </view>
        </view>
      </view>
    </view>

    <!-- 如果固定定位占位  -->
    <block v-if="isFixed">
      <view :style="statusBarStyle" class="nav-block" />
      <view
        :style="{ backgroundColor: isTransparent ? '' : placeBgColor ? placeBgColor : bgColor }"
        class="nav-block h88"
      />
    </block>

    <VoQuick :isHack="isHack" :isShowOverlay="isShowOverlay" :show.sync="showDirect" />

    <VoHelpAction ref="helpRef" />
  </view>
</template>

<script>
  export default {
    name: 'VoNav',
    props: {
      noLeft:{
        type: Boolean,
        default: false,
      },
      showBack: {
        type: Boolean,
        default: true,
      },
      isHack: {
        type: Boolean,
        default: false,
      },
      isHaveMore: {
        type: Boolean,
        default: false,
      },
      /**
       * 左侧插槽的宽度
       */
      leftWidth: {
        type: Number,
        default: 150,
      },
      /**
       * 右侧插槽的宽度
       */
      rightWidth: {
        type: Number,
        default: 150,
      },
      /**
       * 是否有下线阴影
       */
      isShadow: {
        type: Boolean,
        default: false,
      },
      /**
       * 是否帮助中心事件
       */
      isHelp: {
        type: Boolean,
        default: false,
      },
      /**
       * 是否显示快捷入口的遮罩层
       */
      isShowOverlay: {
        type: Boolean,
        default: true,
      },
      /**
       * 是否透明显示
       */
      isBack: {
        type: Boolean,
        default: true,
      },
      /**
       * 是否透明显示
       */
      isTransparent: {
        type: Boolean,
        default: false,
      },
      /**
       * 右边标题文字
       */
      rightTitle: {
        type: String,
        default: '',
      },
      /**
       * 右边 文字 color
       */
      rightTitleColor: {
        type: String,
        default: '#22284b',
      },
      /**
       * 层级z-index
       */
      zIndex: {
        type: Number,
        default: 10,
      },
      /**
       * 固定定位占位背景色
       */
      placeBgColor: {
        type: String,
        default: '',
      },
      /**
       * 背景色
       */
      bgColor: {
        type: String,
        default: '#ffffff',
      },
      /**
       * 标题
       */
      title: {
        type: String,
        default: '',
      },
      /**
       *  是否固定顶部
       */
      isFixed: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        showDirect: false,
        statusBarStyle: {
          height: this.$systemInfo.statusBarHeight + 'px',
          backgroundColor: this.isTransparent ? '' : this.bgColor,
        },
      }
    },
    methods: {
      iconFn() {
        console.log(this.isHack, '999')
        this.showDirect = true
      },
      /**
       * @description 帮助中心事件
       */
      actionSelect(e) {
        console.log(e)
      },
      /**
       * @description 点击返回按钮
       */
      backFn() {
        if (this.isBack) {
          uni.navigateBack()
        }
        this.$emit('backFn')
      },
      /**
       * @description 点击右侧
       */
      operationFn() {
        this.$emit('operationFn')
        if (this.isHelp) {
          this.$refs.helpRef.open()
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .vo {
    width: 750rpx;
    z-index: 2;

    &-bar {
      width: 750rpx;
    }

    &-nav {
      width: 750rpx;
      height: 88rpx;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      padding: 0rpx 32rpx;

      &__back {
        display: flex;
        align-items: center;
      }

      &__title {
        flex: 1;
        text-align: center;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 36rpx;
        //height: 88rpx;
        //line-height: 88rpx;
        color: rgba(0, 0, 0, 0.85);
      }

      &__operation {
        margin-left: auto;
        text-align: right;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .operation {
          font-size: 32rpx;
          height: 88rpx;
          line-height: 88rpx;
        }
      }
    }
  }

  .vo-fixed {
    position: fixed;
    left: 0rpx;
    top: 0rpx;
    z-index: 10;
  }

  .nav-block {
    width: 750rpx;
  }

  .h88 {
    height: 88rpx;
  }

  .shadow {
    box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.08);
  }
</style>
