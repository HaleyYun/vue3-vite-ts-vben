<template>
  <view class="order relative flex flex-column">
    <view class="order-cancel">取消订单</view>
    <view class="order-close" @click="closeFn">
      <VoIcon :opacity="0.65" color="#000" name="close"></VoIcon>
    </view>
    <scroll-view class="order-info flex1 overflow-y" :scroll-y="true">
      <view class="order-info__tips">请选择取消订单的原因 (必选)</view>
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
    </scroll-view>
    <view class="order-bottom p-b-safe-area">
      <EraButton :disabled="disabled" circle @click="confirmClick" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CancelOrder',
    data() {
      return {
        radioValue: '',
        disabled: true,
        // 基本案列数据
        radioList: [],
      }
    },
    created() {
      this.radioList = []
      this.getCancelOrderRequest()
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
      confirmClick() {
        this.$emit('cancelConfirm', { reason: this.radioValue })
      },
      getCancelOrderRequest() {
        this.$VoHttp
          .apiOrderCancelCauseQueryList()
          .then((res) => {
            if (res.code === '20001') {
              if (res.data && res.data.length > 0) {
                res.data.forEach((item) => {
                  let dict = { name: item, disabled: false }
                  this.radioList.push(dict)
                })
              } else {
                console.log(res.message || '获取取消订单原因失败')
              }
            } else {
              console.log(res.message || '获取取消订单原因失败')
            }
          })
          .catch((err) => {
            console.log(err.message || '获取取消订单原因失败')
          })
      },
      /**
       * 点击x关闭弹框
       */
      closeFn() {
        this.$emit('closeFn')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    height: 60vh;
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
