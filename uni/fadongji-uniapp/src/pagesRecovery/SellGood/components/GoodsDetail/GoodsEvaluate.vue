<template>
  <view class="evaluate">
    <view class="evaluate-box">
      <view class="evaluate-box__title">
        <view class="left"
          >评价
          <text class="left-num">(850+)</text>
          <text class="left-tip">好评度96%</text>
        </view>
        <view class="right" @click="toPage"
          >查看更多<VoIcon name="right-arrow" color="#000000" :opacity="0.25" :size="16"
        /></view>
      </view>
    </view>
    <view class="evaluate-tag">
      <view class="tag"> 全部(3) </view>
      <view class="tag" v-for="item in tags" :key="item">
        {{ item }}
      </view>
    </view>
    <MasterItem pageName="evaluate" />
  </view>
</template>
<script>
  import MasterItem from '@/pagesSupplier/GoodsManage/components/MasterItem.vue'
  export default {
    name: 'MasterTalk',
    components: { MasterItem },
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        labelArr: [
          {
            name: '',
            value: '',
            require: true,
          },
        ],
        tags: ['安装简单(256)', '省油(256)', '服务热情(999+)', '耐磨好用(256)'],
      }
    },
    methods: {
      toPage() {
        this.$linkToEasy('/pagesSupplier/GoodsManage/GoodsEvaluateList')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .evaluate {
    margin-top: 16rpx;
    background: #fff;
    .fz-16 {
      font-size: 32rpx !important;
    }
    &-box {
      background: #fff;
      &__title {
        display: flex;
        padding: 24rpx 32rpx;
        .left {
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-85;
          font-weight: 500;
          &-num {
            font-weight: 400;
            font-size: 24rpx;
          }
          &-tip {
            color: #f45f70;
            font-size: 24rpx;
            margin-left: 16rpx;
          }
        }
        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 26rpx;
          line-height: 1.5;
          color: $v-c0-65;
        }
      }
    }
    &-tag {
      display: flex;
      flex-wrap: wrap;
      padding-left: 32rpx;
      padding-bottom: 20rpx;
      box-sizing: border-box;
      background-color: #fff;
      .tag {
        background: #feecee;
        border: 1px solid #f95865;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        text-align: center;
        color: #e50012;
        padding: 4rpx 24rpx;
        margin-right: 36rpx;
        margin-bottom: 22rpx;
      }
    }
  }
</style>
