<template>
  <view class="info">
    <view class="info-box">
      <view class="info-box__title">
        <view class="left">基础信息</view>
        <view class="right"><VoIcon name="edit" color="#155BD4" />使用模板快速发布</view>
      </view>
      <view class="info-box__main">
        <view class="main-row">
          <view class="main-row__wrap">
            <view class="label"><text class="star">*</text>商品分类</view>
            <view class="value">发动机系列-发动机</view>
            <VoIcon name="right-arrow" color="#000000" :opacity="0.25" />
          </view>
        </view>
        <view class="main-row">
          <view class="main-row__wrap">
            <view class="label"><text class="star">*</text>商品品牌</view>
            <view class="value">发动机系列-发动机</view>
            <VoIcon name="right-arrow" color="#000000" :opacity="0.25" />
          </view>
        </view>
        <view class="main-row">
          <view class="main-row__wrap">
            <view class="label"><text class="star">*</text>商品型号</view>
            <view class="value">发动机系列-发动机</view>
            <VoIcon name="right-arrow" color="#000000" :opacity="0.25" />
          </view>
        </view>
        <view class="main-row">
          <view class="main-row__wrap">
            <view class="label"><text class="star">*</text>商品名称</view>
            <view class="value">发动机系列-发动机</view>
            <VoIcon name="right-arrow" color="#000000" :opacity="0.25" />
          </view>
        </view>
        <view class="main-row">
          <view class="main-row__wrap">
            <view class="label"><text class="star">*</text>商品类型</view>
            <view class="value">发动机系列-发动机</view>
            <VoIcon name="right-arrow" color="#000000" :opacity="0.25" />
          </view>
        </view>
      </view>
    </view>
    <view class="info-box">
      <view class="info-box__title">
        <view class="left">商品介绍</view>
      </view>
      <view class="info-box__main">
        <view class="main-row">
          <view class="main-row__wrap">
            <view class="label">商品参数</view>
            <view class="value" />
            <VoIcon name="right-arrow" color="#000000" :opacity="0.25" />
          </view>
        </view>
        <view class="main-row">
          <view class="main-row__wrap noborder">
            <view class="label">适配车型</view>
            <view class="value" />
            <VoIcon name="right-arrow" color="#000000" :opacity="0.25" />
          </view>
        </view>
      </view>
    </view>
    <view class="info-box">
      <view class="info-box__main">
        <view class="main-row">
          <view class="main-row__wrap">
            <view class="label">商品主图</view>
            <view class="value">2/6</view>
          </view>
          <view class="tip"> 建议800*800px，JPG/JPEG/mp4格式，第1张是首图。 </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'ApplySale',
    props: {
      text: {
        type: String,
        require: true,
      },
    },
    data() {
      return {
        visible: true,
        labelArr: [
          {
            name: '',
            value: '',
            require: true,
          },
        ],
      }
    },
    methods: {
      show() {
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
  .info {
    margin-top: 16rpx;
    &-box {
      background: #fff;
      margin-bottom: 22rpx;
      &__title {
        display: flex;
        padding: 20rpx 32rpx;
        .left {
          font-size: 32rpx;
          line-height: 1.5;
          color: $v-c0-85;
          font-weight: 500;
        }
        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 28rpx;
          line-height: 1.5;
          color: #155bd4;
        }
      }
      &__main {
        .main-row {
          padding-left: 32rpx;
          &__wrap {
            padding: 24rpx 32rpx 24rpx 0;
            border-bottom: 1px solid #f7f7f8;
            display: flex;
            font-size: 32rpx;
            line-height: 1.5;
            &.noborder {
              border-bottom: 0;
            }
            .label {
              color: $v-c0-85;
            }
            .star {
              color: #ee0a24;
            }
            .value {
              flex: 1;
              text-align: right;
              color: $v-c0-65;
            }
          }
        }
        .tip {
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-25;
        }
      }
    }
  }
</style>
