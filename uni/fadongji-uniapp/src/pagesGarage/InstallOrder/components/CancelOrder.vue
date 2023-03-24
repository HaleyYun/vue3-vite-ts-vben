<template>
  <view class="order flex flex-column">
    <view class="order-cancel relative flex-vertical-c"
      >取消订单 <VoIcon :size="20" class="order-close" name="close" @click="closeOrder" />
    </view>
    <scroll-view class="order-info flex1 overflow-y" :scroll-y="true">
      <view class="order-info__tips">请选择取消订单的原因 (必选)</view>
      <EraRadioGroup v-model="radioValue" placement="column" @change="groupChange">
        <EraRadio
          v-for="(item, index) in radioList"
          :key="index"
          :customStyle="{ marginBottom: '24px', marginLeft: '16px' }"
          :disabled="item.disabled"
          :iconSize="14"
          :label="item.name"
          :labelSize="16"
          :name="item.name"
          activeColor="#FF5319"
          labelColor="rgba(0,0,0,0.85)"
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
       * 关闭
       */
      closeOrder() {
        this.$emit('cancelOrder')
      },
      /**
       * 某个radio状态发生变化时触发(选中状态)
       * @param n
       */
      groupChange(n) {
        // this.radioValue = n
        console.log('this.radioValue', this.radioValue)
        this.disabled = false
      },
      confirmClick() {
        this.$emit('cancelConfirm', { reason: this.radioValue })
      },
      getCancelOrderRequest() {
        this.$VoHttp
          .apiOrderCancelCauseQueryList({},{noLoading:true})
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
    }
    &-info {
      margin-bottom: 24rpx;
      &__tips {
        font-size: 28rpx;
        color: $v-c0-45;
        padding: 0rpx 32rpx 48rpx 32rpx;
      }
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 0rpx 32rpx 48rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
    &-close {
      position: absolute;
      right: 24rpx;
    }
  }
</style>
