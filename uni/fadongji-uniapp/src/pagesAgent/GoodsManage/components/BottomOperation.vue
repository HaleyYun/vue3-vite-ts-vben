<template>
  <u-popup v-if="visible" :overlay="false" :show="visible" mode="bottom" @close="close">
    <view class="btm-popup">
      <view class="left">
        <VoIcon
          v-if="isSelect"
          :size="28"
          class="radio"
          color="#FF5319"
          name="select-right"
          @click="selectCancel()"
        />
        <VoIcon
          v-else
          :opacity="0.15"
          :size="28"
          class="radio"
          color="#000000"
          name="circle"
          @click="select()"
        />
        <view class="left-text">全选</view>
      </view>
      <view class="right">
        <view class="right-text"
          >合计：<text class="value">{{ selectCount }}个商品</text></view
        >
        <!-- <view class="right-btn default" @click="deleteFn" v-if="status === 2 || status === 3">删除</view> -->
        <view v-if="status === 0" class="right-btn" @click="soldOut">下架</view>
        <view v-if="status === 1" class="right-btn" @click="soldUp">上架</view>
      </view>
    </view>
  </u-popup>
</template>
<script>
  export default {
    name: 'CenterPopup',
    props: {
      selectCount: {
        type: Number,
        default: 0,
      },
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
        this.isSelect = true
        this.$emit('select')
      },
      //选择取消
      selectCancel() {
        this.isSelect = false
        this.$emit('selectAllCancel')
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
        padding: 0 72rpx;
        background: #ff5319;
        border-radius: 48rpx;
        font-size: 32rpx;
        line-height: 80rpx;
        text-align: center;
        color: #ffffff;
        &.default {
          border: 1px solid #ff5319;
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
