<template>
  <view class="order flex flex-column">
    <VoNav :is-fixed="false" is-have-more title="取消订单" />
    <scroll-view :scroll-y="true" class="order-info m-t-16 flex1 overflow-y">
      <view class="order-info__tips">请选择取消订单的原因 (必选)</view>
      <EraRadioGroup v-model="radioValue" placement="column">
        <EraRadio
          v-for="(item, index) in radioList"
          :key="index"
          :customStyle="{ marginBottom: '12px' }"
          :disabled="item.disabled"
          :iconSize="14"
          :label="item.name"
          :name="item.name"
          activeColor="#FF5319"
          labelColor="#262626"
          @change="radioChange"
        />
      </EraRadioGroup>
      <u--textarea
        v-if="radioValue === '其他'"
        v-model="value"
        confirmType="done"
        count
        height="130"
        maxlength="120"
        placeholder="请输入内容"
      />
    </scroll-view>
    <view class="order-bottom p-b-safe-area">
      <EraButton :disabled="disabled" circle @click="confirmClick" />
    </view>
    <!--  取消订单  -->
  </view>
</template>

<script>
  export default {
    name: 'CancelOrder',
    data() {
      return {
        radioValue: '',
        value: '',
        id: '',
        // 基本案列数据
        radioList: [
          {
            name: '匹配距离太远',
            disabled: false,
          },
          {
            name: '非擅长主修机型',
            disabled: false,
          },
          {
            name: '临时有事，没有时间',
            disabled: false,
          },
          {
            name: '店里没人',
            disabled: false,
          },
          {
            name: '其他',
            disabled: false,
          },
        ],
      }
    },
    computed: {
      disabled() {
        if (this.radioValue && this.radioValue !== '其他') {
          return false
        } else if (this.radioValue == '其他' && this.value) {
          return false
        } else {
          return true
        }
      },
    },
    onLoad(val) {
      if (val && val.id) {
        this.id = val.id
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
      async confirmClick() {
        const isBind = await this.$VoHttp.apiOrderRecycleCheckCancel({
          id: this.id,
          cancelReason: this.radioValue == '其他' ? this.value : this.radioValue,
        })
        if (isBind.success == false) {
          uni.$u.toast(isBind.message)
          return
        }
        const res = await this.$VoHttp.apiOrderRecycleCancel({
          id: this.id,
          cancelReason: this.radioValue == '其他' ? this.value : this.radioValue,
        })
        if (res.code == 20001) {
          uni.$u.toast(res.message)
          this.timer = setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
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
      background-color: #fff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      flex-grow: 1;
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
      box-sizing: border-box;
      padding: 20rpx 0 72rpx 0;
      border-top: 2rpx solid $v-bg-light;
    }
    ::v-deep {
      .u-textarea {
        background-color: #f7f7f8;
        border: none;
      }
      .u-textarea__count {
        background-color: rgba(0, 0, 0, 0) !important;
        font-size: 28rpx;
      }
    }
  }
</style>
