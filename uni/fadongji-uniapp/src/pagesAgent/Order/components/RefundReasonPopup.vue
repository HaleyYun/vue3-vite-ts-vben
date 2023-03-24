<template>
  <u-popup v-if="visible" :show="visible" @close="close">
    <view class="order relative">
      <view class="order-cancel">退货退款原因</view>
      <view class="order-close" @click="close">
        <VoIcon :opacity="0.65" color="#000" name="close"></VoIcon>
      </view>
      <view class="order-info">
        <view class="order-info__tips">请选择退货退款原因的原因 (必选)</view>
        <EraRadioGroup v-model="radioValue" placement="column">
          <EraRadio
            v-for="(item, index) in radioList"
            :key="index"
            :customStyle="{ padding: '12px 16px' }"
            :disabled="item.disabled"
            :iconSize="14"
            :label="item.name"
            :name="item.name"
            :opacity="0.15"
            activeColor="#FF5319"
            labelColor="rgba(0, 0, 0, 0.85)"
            @change="radioChange"
          />
        </EraRadioGroup>
      </view>
      <view class="order-bottom p-b-safe-area">
        <EraButton :disabled="disabled" circle @click="select" />
      </view>
    </view>
  </u-popup>
</template>
<script>
  export default {
    name: 'RefundReasonPopup',
    props: {
      radioList: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        visible: false,
        disabled: true,
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
        this.disabled = false
      },
      show() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
      select() {
        this.$emit('select', { reason: this.radioValue })
        this.close()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .order {
    width: 750rpx;
    box-sizing: border-box;
    &-cancel {
      padding: 20rpx 0;
      text-align: center;
      font-weight: bold;
      font-size: 32rpx;
      line-height: 150%;
      border-bottom: 2rpx solid $v-bg-light;
      color: $v-c0-85;
    }
    &-close {
      position: absolute;
      top: 20rpx;
      right: 24rpx;
    }
    &-info {
      margin-bottom: 24rpx;
      &__tips {
        font-size: 28rpx;
        color: $v-c0-45;
        padding: 28rpx 32rpx 24rpx;
      }
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
