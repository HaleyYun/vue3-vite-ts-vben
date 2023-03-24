<template>
  <view>
    <view
      id="_drag_button"
      :class="{ transition: isDock && !isMove, left: isLeft }"
      :style="'left: ' + left + 'px; top:' + top + 'px;'"
      class="drag"
      @touchend="touchend"
      @touchstart="touchstart"
      @touchmove.stop.prevent="touchmove"
      @click.stop.prevent="click"
    >
      <!-- <text>{{ text }}</text> -->
      <block v-if="isLeft">
        <view class="fz-24 color-white lh-126 m-r-10">
          <view  v-if="isPlatform===1">平台</view>
          <view  v-else-if="isPlatform===2">售后</view>
          <view  v-else-if="isPlatform===3">投诉</view>
          <view>客服</view>
        </view>
        <VoIcon :size="30"  name="qimo-phone" />

      </block>
      <block v-else>
        <VoIcon :size="30"  name="qimo-phone" />
        <view class="fz-24 color-white lh-126 m-l-10">
          <view  v-if="isPlatform===1">平台</view>
          <view  v-else-if="isPlatform===2">售后</view>
          <view  v-else-if="isPlatform===3">投诉</view>
          <view>客服</view>
        </view>
      </block>


    </view>
  </view>
</template>

<script>
  export default {
    name: 'VoDragButton',
    props: {
      /**
       * @description 1售前  2售后  3投诉客服
       */
      isPlatform:{
        type:Number,
        default:1
      },
      isDock: {
        type: Boolean,
        default: false,
      },
      existTabBar: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        sys: {},
        top: -120,
        left: -120,
        width: 0,
        height: 0,
        offsetWidth: 0,
        offsetHeight: 0,
        windowWidth: 0,
        windowHeight: 0,
        isMove: true,
        edge: 0,
        text: '按钮',
        isLeft: false,
      }
    },
    mounted() {
      const sys = uni.getSystemInfoSync()
      this.sys = sys
      this.windowWidth = sys.windowWidth
      this.windowHeight = sys.windowHeight

      const bottomNum = sys.safeAreaInsets.bottom
      this.existTabBar && (this.windowHeight -= 180 + bottomNum)

      // if (sys.windowTop) {
      //   this.windowHeight += sys.windowTop
      // }

      const query = uni.createSelectorQuery().in(this)
      query
        .select('#_drag_button')
        .boundingClientRect((data) => {
          this.width = data.width
          this.height = data.height
          this.offsetWidth = data.width / 2
          this.offsetHeight = data.height / 2
          this.left = this.windowWidth - this.width - this.edge
          // this.top = this.windowHeight - this.height - this.edge
          this.top = 350
        })
        .exec()
    },
    methods: {
      click() {
        this.$emit('btnClick', { left: this.left, top: this.top })
      },
      touchstart(e) {
        this.$emit('btnTouchstart')
      },
      touchmove(e) {
        // 单指触摸
        if (e.touches.length !== 1) {
          return false
        }

        this.isMove = true

        this.left = e.touches[0].clientX - this.offsetWidth

        let clientY = e.touches[0].clientY - this.offsetHeight
        // #ifdef H5
        clientY += this.height
        // #endif
        let edgeBottom = this.windowHeight - this.height - this.edge

        // 上下触及边界
        if (clientY < this.sys.statusBarHeight) {
          this.top = this.sys.statusBarHeight
        } else if (clientY > edgeBottom) {
          this.top = edgeBottom
        } else {
          this.top = clientY
        }
      },
      touchend(e) {
        if (this.isDock) {
          let edgeRigth = this.windowWidth - this.width - this.edge

          if (this.left < this.windowWidth / 2 - this.offsetWidth) {
            this.left = this.edge
          } else {
            this.left = edgeRigth
          }
        }

        this.isMove = false
        if (this.left === 0) {
          this.isLeft = true
        } else {
          this.isLeft = false
        }

        this.$emit('btnTouchend')
      },
    },
  }
</script>

<style lang="scss">
  .drag {
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: rgba(0, 0, 0, 0.5);
    // box-shadow: 0 0 6upx rgba(0, 0, 0, 0.4);
    // color: $uni-text-color-inverse;
    width: 144rpx;
    height: 80rpx;
    // border-radius: 50%;
    // font-size: $uni-font-size-sm;
    // position: fixed;
    // z-index: 999999;
    //background: linear-gradient(270deg, #161825 -8.54%, #404773 100%);
    background: linear-gradient(89.93deg, #ff8640 0.06%, #ff5622 99.94%);
    mix-blend-mode: normal;
    position: fixed;
    // right: 0;
    // bottom: 330rpx;
    z-index: 99;
    border-top-left-radius: 100rpx;
    border-bottom-left-radius: 100rpx;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    &.transition {
      transition: left 0.3s ease, top 0.3s ease;
    }
    &.left {
      border-top-right-radius: 100rpx;
      border-bottom-right-radius: 100rpx;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .lh-126{
    line-height: 126%;
  }
</style>
