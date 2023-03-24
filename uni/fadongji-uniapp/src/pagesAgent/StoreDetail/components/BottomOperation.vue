<template>
  <u-popup v-if="visible" mode="bottom" :show="visible" :overlay="false" @close="close">
    <view class="btm-popup">
      <view class="left">
        <VoIcon
          class="radio"
          name="circle"
          color="#000000"
          :size="28"
          :opacity="0.45"
          v-if="!isSelect"
          @click="select()"
        />
        <VoIcon
          class="radio"
          name="select-right"
          :size="28"
          v-if="isSelect"
          @click="selectCancel()"
        />
        <view class="left-text">全选</view>
      </view>
      <view class="right">
        <view class="right-text">合计：<text class="value">1个商品</text></view>
        <!-- <view class="right-btn default" @click="deleteFn" v-if="status === 2 || status === 3">删除</view> -->
        <view class="right-btn" v-if="status === 1" @click="soldOut">下架</view>
        <view class="right-btn" v-if="status === 3" @click="soldUp">上架</view>
      </view>
    </view>
  </u-popup>
</template>
<script>
  export default {
    name: 'CenterPopup',
    props: {
      //商品状态
      status: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        visible: false,
        isSelect: false,
      }
    },
    methods: {
      show() {
        this.isSelect = false
        this.visible = true
      },
      close() {
        this.visible = false
        this.isSelect = false
      },
      //选择事件
      select() {
        this.$emit('select')
        this.isSelect = true
      },
      //选择取消
      selectCancel() {
        this.$emit('selectAllCancel')
        this.isSelect = false
      },
      //删除
      deleteFn() {
        this.$emit('deleteFn')
      },
      //下架
      soldOut() {
        this.$emit('soldOut')
      },
      soldUp() {
        this.$emit('soldUp')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .btm-popup {
    background: #ffffff;
    display: flex;
    padding: 18rpx 32rpx;
    box-sizing: border-box;
    height: 116rpx;
    .left {
      display: flex;
      align-items: center;
      &-text {
        font-size: 32rpx;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.85);
        padding-left: 8rpx;
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      &-btn {
        padding: 0 40rpx;
        background: #22284b;
        border-radius: 48rpx;
        font-size: 32rpx;
        line-height: 80rpx;
        text-align: center;
        color: #ffffff;
        &.default {
          border: 1px solid #22284b;
          color: $v-c0-85;
          background: #fff;
          line-height: 76rpx;
          margin-right: 32rpx;
        }
      }
      &-text {
        font-size: 12px;
        line-height: 1.5;
        color: $v-c0-85;
        padding-right: 32rpx;
        .value {
          font-size: 28rpx;
          font-weight: 500;
        }
      }
    }
  }
</style>
