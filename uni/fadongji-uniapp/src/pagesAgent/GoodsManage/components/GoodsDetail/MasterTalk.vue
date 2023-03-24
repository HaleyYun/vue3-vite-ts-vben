<template>
  <view class="master">
    <view class="master-box">
      <view class="master-box__title">
        <view class="left">大咖说<text class="left-num">(80)</text></view>
        <view class="right" @click="toPage"
          >查看更多<VoIcon name="right-arrow" color="#000000" :opacity="0.25" :size="16"
        /></view>
      </view>
    </view>
    <MasterItem />
     <MasterItem />
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
      }
    },
    methods: {
      toPage() {
        this.$linkToEasy('/pagesSupplier/GoodsManage/MasterTalkList')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .master {
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
          font-size: 32rpx;
          line-height: 1.5;
          color: $v-c0-85;
          font-weight: 500;
          &-num {
            font-weight: 400;
            font-size: 26rpx;
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
  }
</style>
