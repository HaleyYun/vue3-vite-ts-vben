<template>
  <u-popup
    v-if="visible"
    :show="visible"
    bgColor="transparent"
    class="center-popup"
    mode="center"
    @close="close"
  >
    <view class="main">
      <view class="center-popup__text">
        <view>
          <view>
            <!-- 1全网违规  2独立违规   -->
            {{
              content.violationType == 0
                ? ''
                : content.violationType === 1
                ? '全网违规:'
                : '独立违规:'
            }}
            {{ content.reason || '暂无原因' }}
          </view>
          <view class="fz-22 red m-t-20" v-if="content.violationType === 1"
            >平台上所有售卖的该商品都已下架，请尽快联系客服处理</view
          >
        </view>
      </view>
      <view class="center-popup__btn" @click="confirm"> 确定 </view>
    </view>
  </u-popup>
</template>
<script>
  export default {
    name: 'ReasonModal',
    props: {},
    data() {
      return {
        visible: false,
        content: '',
      }
    },
    methods: {
      show(content) {
        this.content = content
        this.visible = true
      },
      close() {
        this.visible = false
      },
      confirm() {
        this.visible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .center-popup {
    background: none;
    // padding: 0;
    .main {
      width: 640rpx;
      // margin: 0 56rpx;
      background: #ffffff;
      text-align: center;
      border-radius: 8rpx;
    }

    &__text {
      font-size: 32rpx;
      line-height: 1.5;
      color: $v-c0-85;
      padding: 80rpx 56rpx;
      box-sizing: border-box;
    }
    &__btn {
      border-top: 1px solid $v-c0-8;
      padding: 20rpx 0;
      font-weight: 500;
      color: #22284b;
      font-size: 32rpx;
    }
  }
  .red {
    color: rgba(242, 0, 20, 1);
  }
</style>
