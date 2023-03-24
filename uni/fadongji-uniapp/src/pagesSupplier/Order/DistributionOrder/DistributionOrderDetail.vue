<template>
    <view>
      <view class="detail flex flex-column">
        <!--导航栏 -->
        <VoNav :isBack="false" is-fixed is-have-more @backFn="reback">
          <block slot="title">
            <view class="flex flex-justify-c flex-vertical-c">
              <!--标题状态前面显示logo-->
              <VoIcon v-if="type === 5130" :size="28" class="p-r-14" name="warning" />
              <VoIcon v-else :size="28" class="p-r-14" name="clock-new" />
              <!--标题状态-->
              <view class="fz-36 fz-b color-block">{{ navTitle }}</view>
            </view>
          </block>

        </VoNav>

      <view class="detail-flex1 flex1 overflow-y">
        <!--  已取消 -->
        <view v-if="type === 5130" class="m-t-24 p-b-24 flex flex-justify-c">
            <view class="fz-28 color-block">取消原因：买家手动取消 </view>
        </view>

        <!--   地址信息   -->
        <view class="detail-address m-t-16">
          <view class="detail-address__user flex flex-vertical-c" @click="goImUrl">
            <VoIcon name="smile-m" />
            <view class="flex1 m-l-8 fz-32 fz-b">{{ orderData.buyerName }} </view>
          </view>
          <view class="detail-address__info">
            <view :class="mobile2 ? '' : 'flex-vertical-c'" class="flex flex-justify-between">
              <view :class="mobile2 ? '' : 'flex-vertical-c'" class="flex">
                <VoIcon name="address" />
                <view class="fz-28 fz-b m-l-8">
                  <view class="flex1 flex flex-vertical-c" @click="callPhone(orderAddress.phone)">
                    <text v-if="orderAddress.name">
                      {{
                        orderAddress.name.length > 6
                          ? orderAddress.name.slice(0, 6) + '...'
                          : orderAddress.name
                      }}
                    </text>
                    <text class="m-l-8"> {{ mobile1 ? mobile1 : orderAddress.phone }} </text>
                  </view>
                  <view v-if="mobile2">{{ mobile2 ? mobile2 : '' }}</view>
                </view>
              </view>
              <view class="flex flex-vertical-c fz-28 h42">
                <u-line color="rgba(0, 0, 0, 0.15)" direction="col" length="12"></u-line>
                <view class="color-blue m-l-24" @click="callPhone(orderAddress.phone)">
                  打电话
                </view>
              </view>
            </view>
            <view class="fz-28 m-t-24 overTwoEllipsis lh42 color-block">
              <text>地址：</text>
              <text> {{ orderAddress.address }}{{ orderAddress.addressDetail }} </text>
            </view>
          </view>
        </view>

        <!--   货物信息   -->
        <view class="detail-address m-t-16">
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="detail-address__titleInfo fz-32 fz-b">
              {{warehouseName }}
            </view>
          </view>
          <view
            v-for="(item, index) in orderData.goodsDetail"
            :key="index"
            @click="goodDetail(item)">
            <view class="detail-address__list flex flex-column">
              <view class="flex">
                <image :src="$transferCosUrl(item.pic[0])" class="list-image" />
                <view class="flex1 m-l-16 flex flex-column">
                  <view class="fz-28 fz-b list-hidden">
                    <text v-show="item.categoryType" class="good-tips m-r-8">{{
                      item.categoryType
                    }}</text>
                    <text class="fz-32"> {{ item.goodsName }}</text>
                  </view>
                  <view class="good-bottom flex flex-justify-between">
                    <view class="good-bottom__left flex flex-vertical-c">
                      <view class="tips">{{
                        item.periodDays > 0 ? `${item.periodDays}天账期` : '现金价'
                      }}</view>
                      <view class="fz-28 price flex flex-vertical-c">
                        <VoPointPrice :price="item.originalPrice.toString()" />
                        <view>元</view>
                      </view>
                    </view>
                    <view class="flex flex-justify-r flex-vertical-c">
                      <view class="good-bottom__num">x{{ item.goodsCount }}</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <view v-if="type === 5120" class="detail-address__note list-info lh42 color-block flex">
              <text>发动机识别码：</text>
              <text class="color-block-65"> {{JSON.parse(item.engineNos)[0]}} </text>
            </view>
          </view>
        </view>

        <!-- 关联销售订单 -->
        <!-- <view class="detail-address m-t-16">
          <view class="detail-address__note flex flex-vertical-c flex-justify-between" @click="goSellOrdelDetail">
            <view class="fz-32 fz-b">关联销售订单</view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
          <view class="detail-address__profit flex flex-justify-between flex-vertical-c">
            <view class="color-block fz-26">商品名称：</view>
            <view @click="openProfit">
              <view class="flex fz-24 flex-vertical-c">
                <view v-if="relatedGoods.goodsName" class="color-block-65"
                  >{{relatedGoods.goodsName}}
                </view>
              </view>
            </view>
          </view>
        </view> -->

        <!--   订单信息   -->
        <view class="detail-address m-t-16 m-b-16">
          <!--待付款-->
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-28">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }} </view>
                  <view class="fz-28 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }} </view>
              </view>
              <view v-if="deliverGoodTime && type === 5120" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>发货时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ deliverGoodTime }} </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.orderTotalAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.orderTotalAmount }}元</view>
              </view>
              <view v-if="orderCancelTime && type === 5130" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>取消时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderCancelTime }} </view>
              </view>
            </view>
        </view>
      </view>

      <!--   底部固定区域   -->
      <view v-if="type === 5110" class="detail-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <template>
          <view class="detail-bottom__button fill" @click="goDeliverGoods">发货</view>
        </template>
      </view>
      <view class="p-b-safe-area" />
      </view>

      <!-- 电话弹框 -->
    <VoActionSheet
      v-show="mobileShowAction"
      :actions="mobileList"
      :show="mobileShowAction"
      cancelText="取消"
      class="action-sheet"
      @close="mobileShowAction = false"
      @select="mobileActionSelect"
    />
        <!--  发货弹窗  -->
    <VoModal
      :show="showManual"
      title="发货"
      class="position-f"
      closeOnClickOverlay
      confirmColor="#000000"
      confirmText="确定"
      showCancelButton
      @cancel="close"
      @close="close"
      @confirm="confirmDeliverGoods"
    >
      <view class="slot-content w-full">
        <view class="flex flex-justify-c fz-28 color-block-45 m-b-32">请输入发动机识别码</view>
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="modify-form"
          labelPosition="left"
          labelWidth="0"
        >
          <EraFormItem
            class="modify-form__item"
            style="background-color: #f7f7f8; border-radius: 4px"
            color="rgba(0, 0, 0, 0.85)"
            label=""
          >
            <u-input
              v-model.trim="formData.contentManual"
              border="none"
              clearable
              fontSize="18px"
              placeholder="请输入发动机识别码"
              placeholderStyle="font-size: 16px;color: rgba(0, 0, 0, 0.25);"
            />
          </EraFormItem>
        </EraForm>
      </view>
    </VoModal>
    </view>
</template>

<script>
 import { getImUserId } from '@/common/helper'

export default {
    name: 'DistributionOrderDetail',
    data() {
      return {
        type: 0, // 订单状态,0=无状态,5110=待发货,5120=已发货,5130=已取消
        navTitle: '订单详情',
        orderAddress: {},        //地址信息
        orderData: {}, //订单详情数据
        orderId: '', // 订单id
        goodNumber: 0, //商品总数量
        createOrderTime: '',//下单时间
        orderCancelTime: '',//取消时间
        payTime: '',//支付时间
        deliverGoodTime: '', //发货时间
        finishTime: '',//完成时间
        deliverInfo: [],//物流信息
        mobile1: '', // 电话号码1
        mobile2: '', // 电话号码2
        mobile: [], // 电话号码
        mobileList: [], // 电话列表
        mobileShowAction: false, // 电话联系人弹框
        addServieAmount: '',
        cancelReason:'',//取消原因
        relatedGoods:{},//关联商品
        warehouseName:'',//仓库
        showManual: false,
        // 编辑内容
        formData: {
          contentManual: '', // 手动输入识别码
          content: '',
        },
        // 表单验证
        rules: {
          contentManual: {
            type: 'string',
            required: true,
            message: '识别码不可为空',
            trigger: ['blur'],
          },
          content: {
            type: 'string',
            required: true,
            message: '识别码不可为空',
            trigger: ['blur'],
          },
        },
      }
    },
    created() {

    },
    onLoad(option) {
      this.orderId = option.id
    },
    async onShow() {
      await this.getOrderDetailRequest()
    },
    methods: {
      reback() {
        this.$backFn()
      },
      /**
       * 去店铺聊天
       */
      goImUrl() {
        console.log('this.orderData.buyerId', this.orderData.buyerId)
        //根据店铺id获取userId
        getImUserId({ companyId: this.orderData.buyerId })
          .then((res) => {
            console.log('res', res)
            if (res.data) {
              const info = {
                targetId: res.data.userId,
                type: 0,
                note: this.orderData.buyerName,
                platformCode: res.data.platformCode,
              }
              this.$storage.set('temp_im_room_info', info)
              this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
            } else {
              this.$u.toast('用户信息错误')
            }
          })
          .catch((err) => {
            this.$u.toast('用户信息错误')
            console.log(err)
          })
      },
      /**
       * 联系电话
       * @param e
       */
      callPhone(phone) {
        if (phone && phone.indexOf('/') > -1) {
          let mobile = phone.split('/')
          this.mobileList = []
          mobile.forEach((item) => {
            if (uni.$u.test.mobile(item)) {
              let param = {
                name: item,
              }
              this.mobileList.push(param)
            }
          })
          if (this.mobileList.length > 1) {
            this.mobileShowAction = true
            return
          }
          this.$cellPhone(phone)
          return
        }
        this.$cellPhone(phone)
      },
       /**
        * 点击手机号
        */
       mobileActionSelect(e) {
        this.$cellPhone(e.name)
      },
       /**
        * 复制订单编号
        */
      copyClick() {
        let that=this
         uni.setClipboardData({
          data: this.orderData.id,
          showToast:false,
          success: function () {
            that.$u.toast('复制成功')
          },
        })
      },
      //获取订单详情
      getOrderDetailRequest() {
        let param = { id: this.orderId }
        this.$VoHttp
          .apiOrderDistributionDetail(param)
          .then((res) => {
            console.log("res ---- ",res)
            if (res.code === '20001') {
              this.orderData = res.data
              this.warehouseName = this.orderData.goodsDetail[0].warehouseName
              // this.getRelatedOrderRequest(this.orderData.orderSellId)
              this.orderDetailProcessData(res.data)
            } else {
              uni.$u.toast(res.message || '订单详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单详情获取失败')
          })
      },
      //获取关联销售订单
      // getRelatedOrderRequest(sellId) {
      //   let param = { id: sellId }
      //   this.$VoHttp
      //     .apiOrderSell$Id(param)
      //     .then((res) => {
      //       if (res.code === '20001') {
      //           console.log("sell res --- ",res.data.goodsDetail[0])
      //           this.relatedGoods =  res.data.goodsDetail[0]
      //           console.log("this.relatedGoods ----- ",this.relatedGoods.goodsName)
      //       } else {
      //         uni.$u.toast(res.message || '订单获取失败')
      //       }
      //     })
      //     .catch((err) => {
      //       console.log('err', err)
      //       uni.$u.toast(err.message || '订单获取失败')
      //     })
      // },
      // 关闭弹窗
      close() {
        this.show = false
        this.showManual = false
        this.formData.content = ''
        this.formData.contentManual = ''
      },
      confirmDeliverGoods() {
        let data = []
        if(this.formData.contentManual.length > 0) {
          data.push(this.formData.contentManual)
        let param = {
          engineNo: data,
          id: this.orderId,
        }
         console.log(param)
        this.$VoHttp
          .apiOrderDistributionDeliver(param)
          .then((res) => {
            console.log("res ---- ",res)
             if (res.code === '20001') {
              this.close()
              uni.$u.toast('发货成功')
              setTimeout(() =>{
                this.$backFn()
                this.isLoading = false
                // this.getOrderDetailRequest()
              },1500)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('发货失败')
          })
          .finally(() => {
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
            this.isLoading = false
          })
        }else{
          uni.$u.toast('识别码不可为空')
        }
      },
      /**
       * 去发货页面
       */
      goDeliverGoods() {
        this.showManual = true
      },
      /**
       * 跳转修理厂详情
       */
      goSellOrdelDetail() {
        this.$linkToEasy('/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=' + this.orderData.orderSellId)
      },

       orderDetailProcessData(data) {
        this.orderData = data
        console.log('订单详情:', this.orderData)
        // let Time = new Date(this.orderData.nextStageTime.replace(/-/g, '/'))
        // let timestemp = Time.getTime()
        // this.downData = timestemp - this.newData

        //状态
        this.type = this.orderData.orderStatus
        this.navTitle = this.orderData.orderStatusName
        //商品数量
        this.orderData.goodsDetail.forEach((item) => {
          this.goodNumber = this.goodNumber + item.goodsCount
        })

        //订单信息
        this.orderData.timeList.forEach((item) => {
          //下单时间
          if (item.status === 5110) {
            this.createOrderTime = item.createTime
          }
          if (item.status === 5120) {
           this.deliverGoodTime = item.createTime
          }
          if (item.status === 5130) {
            this.orderCancelTime = item.createTime
          }

        })

        //地址信息
        this.orderAddress = this.orderData.orderAddress
        if (this.orderAddress.phone && this.orderAddress.phone.indexOf('/') > -1) {
          this.mobile = this.orderAddress.phone.split('/')
          this.mobile1 = this.mobile[0]
          this.mobile2 = this.mobile[1]
        }
      },
    }

}
</script>

<style lang="scss" scoped>
.detail {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    &-state {
      width: 750rpx;
      height: 108rpx;
      color: #ffffff;
      background: linear-gradient(
        96.72deg,
        #fa2c19 -1.29%,
        #fa3f19 46.76%,
        #fa5919 82.49%,
        #fa6419 104.67%
      );
    }
    &-flex1 {
      width: 750rpx;
      overflow-x: hidden;
    }
    &-address {
      background: #ffffff;
      color: $v-c0-85;
      &__user {
        padding: 24rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        color: #000;
      }
      &__titleInfo {
        padding: 24rpx 0;
        margin: 0 32rpx;
        color: #000;
      }
      &__info {
        font-size: 28rpx;
        padding: 24rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        .info-place {
          width: 438rpx;
        }
      }
      &__note {
        font-size: 28rpx;
        padding: 16rpx 0;
        margin: 0 32rpx;
        &.note-line {
          border-bottom: 2rpx solid $v-bg-light;
        }
      }
      &__list {
        padding: 16rpx 32rpx;
        height: 160rpx;
        .list-image {
          width: 160rpx;
          height: 160rpx;
          border-radius: 8rpx;
          overflow: hidden;
        }
        .list-info {
          margin-top: 50rpx;
          height: 42rpx;
          line-height: 42rpx;
          font-size: 28rpx;
          color: $v-c0-45;
        }
        .list-hidden {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .list-days {
          border: 2rpx solid $color-primary-red;
          border-radius: 4rpx;
          height: 28rpx;
          margin-left: 8rpx;
          &__left {
            background: $color-primary-red;
            color: #ffffff;
          }
          &__right {
            background: rgba(229, 0, 18, 0.1);
            color: $color-primary-red;
          }
        }
      }
      &__serve {
        margin: 28rpx 32rpx;
        margin-left: auto;
        background: $v-bg-light;
        border-radius: 8rpx;
        font-size: 24rpx;
        width: 510rpx;
        height: 56rpx;
        padding: 0 16rpx;
        .serve-word {
          color: $v-c0-45;
        }
        .serve-num {
          color: $color-primary-red;
        }
        .serve-icon {
          margin-left: auto;
        }
      }
      &__account {
        font-size: 13px;
        line-height: 150%;
        color: $v-c0-45;
        padding: 32rpx 32rpx 0rpx;
      }
      &__profit {
        padding: 28rpx 0;
        margin: 0 32rpx;
      }
      &__service {
        width: 516rpx;
        margin: 0 auto;
        padding-bottom: 16rpx;
        font-size: 24rpx;
        .service-left {
          width: 156rpx;
          text-align: center;
        }
        .service-middle {
          width: 252rpx;
          height: 2rpx;
          margin: 18rpx 18rpx 0;
          border-top: 1px dashed rgba(0, 0, 0, 0.45);
        }
        .service-middleOne {
          width: 252rpx;
          margin: 0 18rpx;
        }
        .service-right {
          width: 72rpx;
          text-align: left;
        }
      }
      &__order {
        padding: 0 32rpx 24rpx;
      }
    }
    &-bottom {
      padding: 24rpx 32rpx 12rpx;
      background: #ffffff;
      border-top: 2rpx solid $v-bg-light;
      &__button {
        width: 160rpx;
        height: 80rpx;
        line-height: 80rpx;
        border: 2rpx solid $v-c0-25;
        border-radius: 40rpx;
        text-align: center;
        font-size: 24rpx;
        color: $v-c0-85;
        margin-left: 32rpx;
        box-sizing: border-box;
      }
      .fill {
        color: $color-primary-yellow;
        border: 2rpx solid $color-primary-yellow;
      }
      &__width {
        width: 200rpx;
      }
    }
  }
 .color-red {
    color: $color-primary-red;
  }
  .color-blue {
    color: $v-tip;
  }
  .line {
    border-top: 2rpx solid $v-bg-light;
  }
  .p-b-safe-area {
    background: #ffffff;
  }
  .good-bottom {
    &__left {
      margin-top: 16rpx;
      height: 42rpx;
      .tips {
        padding: 0 4rpx;
        height: 28rpx;
        line-height: 28rpx;
        text-align: center;
        background: #fdf2f3;
        border: 2rpx solid #ec404d;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #ec404d;
      }
      .price {
        font-size: 28rpx;
        color: $color-primary-red;
        margin-left: 8rpx;
      }
    }
    &__num {
      margin-top: 8rpx;
      height: 42rpx;
      line-height: 42rpx;
      font-weight: bold;
      font-size: 28rpx;
      color: $v-c0-45;
    }
    &__delivery {
      margin-top: 8rpx;
      margin-left: 16rpx;
      color: $color-primary-red;
      font-size: 28rpx;
    }
  }
   .service {
    background: #f7f7f8;
    border-radius: 4px;
    padding: 24rpx 16rpx 0 24rpx;
    box-sizing: border-box;
    margin: 24rpx 32rpx;
    &-red {
      color: #e50012;
      font-size: 24rpx;
    }
    &-icon {
      width: 40rpx;
      height: 40rpx;
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
</style>
