<template>
  <view class="bg-white">
    <block v-if="show">
      <VoBatteryBar bg-color="transparent" />
      <VoNav title="发动机安装服务协议" :is-fixed="false" />
    </block>
    <view class="container">
      <view class="content">
        发动集APP是由郑州发动集产业链科技有限公司及关联企业研发并推出的的一款专业软件。发动集APP平台通过科学完善的汽车发动机安装工程和专业高效的技术服务团队，向汽车修理企业和其他用户（以下统称为“用户”）提供发动机的购买、安装、调试及售后服务。请用户仔细阅读本协议，当用户通过发动集APP端发起申请并完成付费，视为用户已经详细阅读、理解并接受本协议的全部内容，用户将依据本协议享有权利并承担义务。
      </view>
      <view class="title">一、服务概括</view>
      <view class="content">
        1. 服务名称：汽车发动机安装；
      </view>
      <view class="content">
        2. 服务流程：由用户在发动集APP申请并完成付费，由平台派单至具体的服务人员，服务人员接单后上门安装调试；
      </view>
      <view class="content">
        3. 服务范围和内容：仅限用户通过发动集APP购买的发动机产品的安装、调试及售后服务。
      </view>
      <view class="title">二、服务期限</view>
      <view class="content">
        1. 安装服务具体期限由用户与服务人员共同协商；
      </view>
      <view class="content">
        2. 用户在发动集APP端点击【已完成】，即视为用户已认可服务人员完成安装、调试，并验收合格；
      </view>
      <view class="content">
        3. 用户在安装过程中有任何异议，均可通过发动集APP投诉，平台核实情况后应及时处理。
      </view>
      <view class="title">三、服务费用</view>
      <view class="content">
        1. 用户通过发动集APP发起申请并完成付费的，平台及派单的服务人员不会向用户收取其他费用；
      </view>
      <view class="content">
        2. 除本协议约定内容外，平台派单的服务人员不得向用户私下索取任何费用，否则，客户应当拒绝并向平台投诉；
      </view>
      <view class="title">四、特别约定</view>
      <view class="content">
        1.用户通过发动集APP下单时，应仔细核对并确认收货地址，如地址有误或者要求更改收货地址的，应当及时与发动集APP客服人员联系。客服人员确认未发货且派单的服务人员还未出发的，告知用户取消订单并更改收货地址，然后通过发动集APP平台重新发起申请。客服人员确认已发货或者派单人员已出发的，用户应当另行支付运费或交通费用。
      </view>
      <view class="content">
        <view>
          2.发生以下情况，与发动集APP平台无关：
        </view>
        <view>(1) 用户未通过发动集APP购买的发动机、配件或其他产品，要求服务人员进行安装、维修、调试、搬运等服务的，应当与服务人员协商并另行支付费用，但发动集APP平台不承担相应的产品质量、售后维修等责任；
        </view>
        <view>(2) 因用户原因更改收货地址，没有联系发动集APP平台并向发动集APP平台另行支付费用，而是与服务人员协商并另行支付费用的。
        </view>
        <view>(3) 本协议未约定，派单的服务人员自行与用户达成的承诺、保证、协议或收取费用的。
        </view>
        <view>(4) 在服务人员安装发动机的过程中，出现因服务人员本身导致的机器损坏等问题，由其本人承担补偿费用。
        </view>
      </view>
      <view class="title">五、违约责任</view>
      <view class="content">
        用户下单后无故取消订单的，造成发动集APP平台及派单服务人员损害的，应当承担赔偿责任，承担赔偿责任的范围包括但不限于诉讼费、律师费、保全费、鉴定费、交通费、运费、文印费等。同时，用户应当视情况向发动集APP支付违约金，违约金按照相应交易金额的百分之十到百分之三十标准计算。
      </view>
      <view class="title">六、纠纷处理及诉讼
      </view>
      <view class="content">
        1. 本协议履行过程中发生争议时或有任何突发情况，用户可通过发动集APP提出，届时售后人员会根据问题情况给出处理办法；
      </view>
      <view class="content">
        2.用户应当遵守本协议全部内容，否则郑州发动集产业链科技有限公司有权对其提起诉讼。
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      show: false
    }
  },
  onLoad(opt) {
    this.show = opt?.show || false
  },
}
</script>

<style scoped lang="scss">
.container {
  padding: 32rpx;
  color: rgba(0, 0, 0, 0.85);
  font-size: 28rpx;
  .red {
    color: #ff5319;
  }
  > view {
    margin-bottom: 32rpx;
    line-height: 150%;
  }
  .title {
    font-size: 32rpx;
    margin-top: 8rpx;
    margin-bottom: 24rpx;
    font-weight: bold;
  }
  .title1 {
    margin-top: -8rpx;
    margin-bottom: 16rpx;
    font-weight: bold;
  }
}
</style>
