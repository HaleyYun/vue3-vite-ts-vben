<template>
  <view class="order flex flex-column">
    <VoNav is-fixed is-have-more title="取消订单" />
    <view class="order-info flex1">
      <view class="order-info__tips">
        <text style="color: #ee0a24; font-size: 32rpx">*</text>
        <block v-if="type === 2"> 请选择取消订单的原因 </block>
        <block v-else> 请选择取消接单的原因 </block>
      </view>
      <EraRadioGroup v-model="radioValue" placement="column">
        <block v-if="type === 2">
          <EraRadio
            v-for="(item, index) in radioList2"
            :key="index"
            :customStyle="{ marginBottom: '12px' }"
            :disabled="item.disabled"
            :iconSize="14"
            :label="item.name"
            :name="item.name"
            iconColor="#000"
            labelColor="rgba(0,0,0,0.85)"
            @change="radioChange"
          />
        </block>
        <block v-else>
          <EraRadio
            v-for="(item, index) in radioList"
            :key="index"
            :customStyle="{ marginBottom: '12px' }"
            :disabled="item.disabled"
            :iconSize="14"
            :label="item.name"
            :name="item.name"
            iconColor="#000"
            labelColor="rgba(0,0,0,0.85)"
            @change="radioChange"
          />
        </block>
      </EraRadioGroup>
      <block v-if="radioValue === '其他'">
        <view class="order-info__tips"
          ><text style="color: #ee0a24; font-size: 32rpx">*</text>取消原因：</view
        >
        <EraTextarea
          v-model.trim="remark"
          border="none"
          class="reason-textarea"
          count
          countStyle="background: inherit;"
          height="130"
          maxlength="200"
          placeholder="请输入取消原因"
          placeholderStyle="font-size: 30rpx;color: rgba(0, 0, 0, 0.25);"
        />
      </block>
    </view>
    <view class="order-bottom p-b-safe-area">
      <EraButton :disabled="!radioValue" :font-size="32" circle @click="confirmClick" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CancelOrder',
    data() {
      return {
        radioValue: '',
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
        radioList2: [
          {
            name: '不需要安装了',
            disabled: false,
          },
          {
            name: '计划有变，重新预约时间',
            disabled: false,
          },
          {
            name: '已经与集师傅协商一致，重新约定的安装时间',
            disabled: false,
          },
          {
            name: '其他',
            disabled: false,
          },
        ],
        // 取消原因
        remark: '',
        id: '', // 订单id
        isLoading: false,
        type: 1, // 来源： 1 技术工 2 修理厂
        supportType: '', //服务单类型,31:售后回收单 32:安装单 33:回收单
        back: 1, // 回退层数
      }
    },
    onLoad(options) {
      this.id = options.id
      if (options.type) {
        this.type = +options.type
      }
      if (options.supportType) {
        this.supportType = +options.supportType
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
        if (this.radioValue === '其他') {
          if (!this.remark) {
            uni.$u.toast('请填写取消原因！')
            return
          }
        }
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        let api = ''
        let params = {}
        //服务单类型,31:售后单 32:安装单 33:回收单
        // if (this.supportType === 31) {
        //   params = {
        //     req: {
        //       orderId: this.id,
        //       cancelReason: this.radioValue,
        //       remark: this.remark,
        //     },
        //     // sign: '',
        //     // timeStr: '',
        //   }
        //   api = 'apiOrderSupportAfterSaleCancel'
        // } else if (this.supportType === 32) {
        //   params = {
        //     orderId: this.id,
        //     cancelReason: this.radioValue,
        //     remark: this.remark,
        //   }
        //   api = 'apiGraborderSaveordercancel'
        // } else if (this.supportType === 33) {
        //   params = {
        //     id: this.id,
        //     cancelReason: this.radioValue == '其他' ? this.remark : this.radioValue,
        //   }
        //   api = 'apiOrderRecycleMasterCancel'
        // }
        params = {
          orderId: this.id,
          cancelReason: this.radioValue,
          remark: this.remark,
        }
        this.$VoHttp
          .apiGraborderSaveordercancel(params)
          .then((res) => {
            this.$u.toast('取消成功')
            // this.$backFn()
            uni.reLaunch({
              url: '/pages/EngineerCenter/EngineerTabbar?tabbarVal=1',
            })
          })
          .catch((err) => {
            console.log(err)
            this.$u.toast(err.message || '取消失败')
          })
          .finally(() => {
            this.isLoading = false
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    height: 100vh;
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
      margin-top: 18rpx;
      background: #ffffff;
      &__tips {
        display: flex;
        align-items: center;
        font-size: 32rpx;
        line-height: 150%;
        color: $v-c0-65;
        padding: 32rpx 32rpx 40rpx;
      }
    }
    ::v-deep .u-radio {
      margin-left: 32rpx;
      width: 100%;
    }
    .reason-textarea {
      background-color: #f7f7f8;
      margin: 0 32rpx;
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
