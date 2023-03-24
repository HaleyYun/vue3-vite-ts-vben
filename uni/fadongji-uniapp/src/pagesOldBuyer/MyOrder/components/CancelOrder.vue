<template>
  <view class="order flex flex-column">
    <view class="order-cancel">取消订单</view>
    <view class="order__tips">请选择取消订单的原因 (必选)</view>
    <scroll-view class="order-info flex1 overflow-y" :scroll-y="true">
      <EraRadioGroup v-model="radioValue" placement="column">
        <EraRadio
          :customStyle="{ marginBottom: '12px' }"
          v-for="(item, index) in list"
          :key="index"
          :label="item.name"
          :name="item.name"
          @change="radioChange"
          :disabled="item.disabled"
          :iconSize="14"
        />
      </EraRadioGroup>
    </scroll-view>
    <view class="order-bottom p-b-safe-area">
      <EraButton circle @click="confirmClick" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CancelOrder',
    props: {
      // 基本案列数据
      list: {
        type: Array,
        default: () => [
          {
            name: '不想要了',
            disabled: false,
          },
          {
            name: '商品错选/多选',
            disabled: false,
          },
          {
            name: '商品无货',
            disabled: false,
          },
          {
            name: '地址信息填写错误',
            disabled: false,
          },
          {
            name: '商品降价',
            disabled: false,
          },
          {
            name: '没用/少用/错用优惠券',
            disabled: false,
          },
        ],
      },
    },
    data() {
      return {
        radioValue: '',
      }
    },
    methods: {
      /**
       * 某个radio状态发生变化时触发(选中状态)
       * @param n
       */
      radioChange(n) {
        this.radioValue = n
      },
      confirmClick() {
        this.$emit('cancelConfirm',{ reason: this.radioValue})
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    box-sizing: border-box;
    height: 700rpx;
    &-cancel {
      padding: 20rpx 0;
      text-align: center;
      font-weight: bold;
      font-size: 32rpx;
      line-height: 150%;
      border-bottom: 2rpx solid $v-bg-light;
    }
    &__tips {
      font-size: 28rpx;
      color: $v-c0-45;
      padding: 28rpx 32rpx 24rpx;
    }
    &-info {
      margin-bottom: 24rpx;
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }
</style>
