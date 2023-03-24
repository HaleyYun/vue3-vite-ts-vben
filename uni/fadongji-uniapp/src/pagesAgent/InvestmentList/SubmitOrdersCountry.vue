<template>
  <view class="order">
    <VoNav :is-fixed="false" is-have-more title="提交订单" />
    <view class="good">
      <view class="good-shop" @click="goImUrl(info)">
        <VoIcon :size="24" class="m-r-4" color="#22284B" name="smile-s" />
        <view class="fz-28 fz-b lh42">
          {{ info.goodsGoodsShopInfoVO.name }}
        </view>
      </view>
      <view class="good-main">
        <image :src="info.pic + '&type=1'" class="good-main__img" />
        <view class="good-main__right">
          <view class="name">
            <text v-show="info.categoryType" class="good-tips m-r-8">{{ info.categoryType }}</text>
            <text>
              {{ info.goodsName }}
              <text class="color-block-yellow p-l-20">{{ info.remainingAvailable }}台</text>
            </text>
          </view>
          <view class="flex flex-justify-between m-t-24">
            <view
              v-for="item in typeList"
              v-show="
                item.value === 1 ||
                (item.value === 0 && info.accountPeriodDays && info.accountPrice)
              "
              :key="item.value"
              :class="item.choosed ? 'selected' : 'no-selected'"
              class="type-btn"
              @click="chooseType(item)"
            >
              <view v-if="item.value === 1" class="flex">
                <text>现金支付</text>
                <VoPointPrice
                  :color="item.choosed ? '#FF5319' : ''"
                  :leftSize="14"
                  :price="info.cashPrice"
                  :rightSize="12"
                  :show-unit="true"
                />
              </view>
              <view
                v-if="item.value === 0 && info.accountPeriodDays && info.accountPrice"
                class="flex"
              >
                <text>{{ info.accountPeriodDays || 0 }}天账期</text>
                <VoPointPrice
                  :color="item.choosed ? '#FF5319' : ''"
                  :leftSize="14"
                  :price="info.accountPrice"
                  :rightSize="12"
                  :show-unit="true"
                />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="order-info">
      <view class="title">设置收货地址及数量</view>
      <view v-for="(item, index) in WareHouseArr" :key="item.warehouseId" class="ware-item">
        <view class="ware-item__name">
          {{ item.warehouseName }}
          ({{
            item.type === 0
              ? '平台仓'
              : item.type === 1
              ? '工厂仓'
              : item.type === 2
              ? '前置仓'
              : ''
          }})
        </view>
        <view class="desc">
          <text class="m-r-24">周转率：{{ item.wmsTurnover || '--' }}天</text>
          <!--          <text>仓库容量：&#45;&#45;</text>-->
        </view>
        <view class="edit">
          <view v-if="!item.edit" class="edit-input" @click="showNumBox(item, index)"
            >{{ item.editNum }}
          </view>
          <u-number-box
            v-else
            v-model="item.editNum"
            :asyncChange="true"
            :min="0"
            class="number-box"
            integer
            @blur="numberBlur($event, item)"
            @change="valChange($event, item)"
          />
          <!--  :max="item.availableNumber" -->

          <!-- <input type="number" class="edit-input" /> -->
          <!-- :value="item.availableNumber"
			@blur="editNumber($event, item)" -->
          <view class="edit-text">数量</view>
        </view>
      </view>
    </view>
    <view v-if="WareHouseArr.length === 0" class="notice">项目已结束啦，下次早点来哦</view>
    <view v-else class="submit-bottom flex flex-justify-r p-b-safe-area">
      <view class="m-r-24 flex flex-column flex-vertical-t">
        <view class="fz-28 lh48">
          合计：
          <VoPointPrice :price="formData.totalPrice" :show-unit="true" display="inline-block" />
        </view>
        <view class="fz-24 m-t-4 color-block-65 lh36"> 共{{ formData.totalNum }}件商品</view>
      </view>
      <view class="submit-bottom__button" @click="toSettlement()">去结算</view>
    </view>
    <VoPayPopup
      :show.sync="showPay"
      :total-price="formData.totalPrice"
      @close="cancelPay"
      @confirm="goPayFn"
    />
    <VoPayValidation
      :show="payValidationVisible"
      @close="cancelPay"
      @confirm="payValidationConfirm"
    />
  </view>
</template>
<script>
  import {
    appSource,
    getImUserId,
    getUserCheckStatus,
    goWechat,
    hideLoading,
    showLoading,
  } from '@/common/helper'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'SubmitOrders',
    data() {
      return {
        payValidationVisible: false,
        showPay: false,
        result: {},
        info: '', //项目信息
        typeList: [
          {
            value: 1,
            choosed: true,
          },
          {
            value: 0,
            choosed: false,
          },
        ],
        isCash: 1,
        factoryWareHouse: [],
        platWareHouse: [
          {
            id: 1,
            newAvailableNumber: 2,
          },
          {
            id: 2,
            newAvailableNumber: 3,
          },
        ],
        formData: {
          isAllSelect: false,
          totalPrice: 0, //合计
          totalKind: 0, //几种商品
          totalNum: 0, //几件商品
          paymentPrice: 0, // 账期金额
          cashPrice: 0, //现金金额
        },
        showNotice: false,
        WareHouseArr: [],
        addressData: {},
      }
    },
    onLoad() {
      let data = this.$storage.get('projectData')
      this.info = data
      console.log('this.info', this.info)

      this.getWareInfo(data.goodsId, data.investableAreaList)
    },
    watch: {
      // WareHouseArr: {
      //   deep: true,
      //   handler(newVal) {
      //     let totalPrice = 0
      //     let num = 0
      //     newVal.forEach((item) => {
      //       const tmpTotal = this.info.cashPrice * item.editNum
      //       totalPrice += tmpTotal
      //       num += item.editNum
      //     })
      //     console.log(totalPrice, 'ssss')
      //   },
      // },
    },
    methods: {
      goImUrl(item) {
        //根据店铺id获取userId
        getImUserId({ companyId: item.goodsGoodsShopInfoVO.shopId })
          .then((res) => {
            if (res.data) {
              const info = {
                targetId: res.data.userId,
                type: 0,
                note: item.goodsGoodsShopInfoVO.name,
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
          })
      },
      //账期支付验证通过
      payValidationConfirm(code) {
        const req = {
          orderId: this.result.id,
          payChannel: 0,
          payType: '61', // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.userInfo.companyId,
          smsCode: code,
          ...this.result,
        }
        showLoading('加载中')
        this.$VoHttp
          .appPay({
            req,
          })
          .then((res) => {
            console.log(res.data)
            hideLoading()
            this.payValidationVisible = false
            this.$u.toast('支付成功')
            uni.redirectTo({
              url:
                '/pagesCommon/PayResult/PayResult?type=agent&status=4&orderType=1' +
                  '&price=' +
                  this.formData.cashPrice +
                  '&accountAmount=' +
                  this.result.accountAmount || '',
            })
          })
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
      },
      /**
       * 取消支付
       */
      cancelPay() {
        this.showPay = false
        this.payValidationVisible = false
        uni.redirectTo({
          url: '/pagesAgent/Order/InvestOrder/InvestOrderList?status=1210&type=1',
        })
      },
      /**
       * 去支付
       */
      async goPayFn(info) {
        let that = this
        const req = {
          orderId: this.result.id,
          payChannel: 0,
          payKey: '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.userInfo.companyId,
          ...this.result,
        }
        if (info.payTypeCode === 1) {
          req.access_token = this.userInfo.access_token
          console.log(JSON.stringify(req), '55555')
          goWechat(`/pages/pay/pay?req=${JSON.stringify(req)}`)
          this.showPay = false
          plus.globalEvent.addEventListener('newintent', (e) => {
            var args = plus.runtime.arguments
            console.log(`args`, args)
            if (args) {
              that.$VoHttp
                .payPayResult({ orderId: that.result.id })
                .then((res) => {
                  plus.globalEvent.removeEventListener('newintent')
                  console.log('支付结果', res)
                  if (res && res.data && +res.data.status === 1) {
                    console.log('未支付')
                    return
                  }
                  // orderType=1代表是全国下单
                  uni.redirectTo({
                    url: `/pagesCommon/PayResult/PayResult?type=agent&status=${res.data.status}
                    &price=${this.formData.cashPrice}&accountAmount=${
                      this.result.accountAmount || ''
                    }&orderType=1`,
                  })
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                })
            }
          })
          return
        }
        showLoading('加载中')
        const { payInfo } = await this.$VoHttp
          .appPay({
            req,
          })
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
          .then((res) => res.data)
        hideLoading()
        this.showPay = false
        vocenPay.voPayModuleView(
          {
            url: payInfo,
            // url: 'https://qr.alipay.com/bax08931vw9wth5je97x5559',
          },
          (res) => {
            if (res.data.businessCode == 'F00001') {
              //拉取支付宝失败
              uni.$u.toast(res.des || '拉起支付宝失败')
            }
          },
        )
        vocenPay.voPayModuleListeningCallback((res) => {
          if (res.data.businessCode == 'S10001') {
            that.$VoHttp
              .payPayResult({ orderId: that.result.id })
              .then((res) => {
                vocenPay.voPayRemoveListening()
                uni.redirectTo({
                  url: `/pagesCommon/PayResult/PayResult?type=agent&status=${
                    res.data.status
                  }&price=${this.formData.cashPrice}&accountAmount=${
                    this.result.accountAmount || ''
                  }&orderType=1`,
                })
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
        })
      },
      //获取仓库信息
      getWareInfo(goodId, investableAreaList) {
        let params = {
          goodId: goodId,
          investableAreaList: investableAreaList.join(),
        }
        console.log('params===============', params)
        this.$VoHttp
          .apiWarehouseStockAgentInvestAreaGoodsWarehouse(params)
          .then((res) => {
            // let factoryWareHouse = res.data.factoryWareHouse
            // let platWareHouse = res.data.platWareHouse
            let WareHouseArr = res.data
            WareHouseArr.forEach((item) => {
              item.edit = false
              item.editNum = 0
            })
            this.WareHouseArr = WareHouseArr
            this.totalCalculateFn()
          })
          .catch((err) => {
            console.log(err)
          })
      },
      //选择付款类型
      chooseType(data) {
        this.isCash = data.value
        this.typeList.forEach((item) => {
          if (item.value === data.value) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
        this.totalCalculateFn()
      },
      /**
       * 计算价格
       */
      totalCalculateFn() {
        console.log('合计计算', this.WareHouseArr)
        let totalPrice = 0 //合计
        let totalKind = 0 //几种商品
        let totalNum = 0 //几件商品
        let paymentPrice = 0 // 账期金额
        let cashPrice = 0 //现金金额

        this.WareHouseArr.forEach((item) => {
          totalNum += Number(item.editNum)
          if (this.isCash === 1) {
            //现金
            cashPrice = this.decimalAddFn(
              cashPrice,
              this.decimalMulFn(this.info.cashPrice, item.editNum),
            )
          } else {
            //账期
            paymentPrice = this.decimalAddFn(
              paymentPrice,
              this.decimalMulFn(this.info.accountPrice, item.editNum),
            )
          }
        })
        this.formData.totalPrice = this.decimalAddFn(paymentPrice, cashPrice).toFixed(2)
        this.formData.totalKind = totalKind
        this.formData.totalNum = totalNum
        this.formData.paymentPrice = paymentPrice
        this.formData.cashPrice = cashPrice
        console.log('this.formData.totalNum=============', this.formData.totalNum)
        console.log('this.formData.totalPrice', this.formData.totalPrice)
      },
      //显示步进器
      showNumBox(item, index) {
        this.WareHouseArr[index].edit = true
        this.$forceUpdate()
      },
      //步进器change
      valChange($event, data) {
        console.log('当前值为: ' + $event.value)
        console.log('当前number值为: ' + data.editNum)
        //手动赋值，解决真机赋值错误问题
        this.WareHouseArr.forEach((item) => {
          if (item.id === data.id) {
            item.editNum = $event.value || 0
          }
        })
        setTimeout(() => {
          this.totalCalculateFn()
        }, 10)
      },
      //步进器失焦
      numberBlur($event, data) {
        //手动赋值，解决真机赋值错误问题
        this.WareHouseArr.forEach((item) => {
          if (item.id === data.id) {
            item.editNum = $event.value || 0
          }
        })
        setTimeout(() => {
          this.totalCalculateFn()
        }, 10)
      },
      //结算
      async toSettlement() {
        if (this.formData.totalNum > this.info.remainingAvailable) {
          this.$u.toast('商品总量不能大于剩余可投量~~')
          return
        }
        // //检查是否可以下单
        // let val = await getUserCheckStatus()
        // if (!val) {
        //   this.$u.toast('当前用户禁止下单~~')
        //   return
        // }
        let nationalHouseGoodsList = []
        let arr = this.WareHouseArr.filter((item) => item.editNum > 0)
        arr.forEach((item) => {
          nationalHouseGoodsList.push({
            goodsCount: item.editNum,
            goodsId: item.goodsId,
            warehouseId: item.warehouseId,
            warehouseName: item.warehouseName,
          })
        })
        if (!nationalHouseGoodsList.length) {
          this.$u.toast('请设置投放数量')
          return
        }

        let params = {
          sign: '12313',
          req: {
            activityDetail: '{}',
            buyerInfo: {
              // addressId: this.addressData.id,
              buyerId: this.userInfo.companyId,
            },
            investType: 2,
            isCash: this.isCash === 1 ? true : false,
            originalPrice: this.isCash === 1 ? this.info.cashPrice : this.info.accountPrice,
            projectId: this.info.id,
            remark: '',
            shopId: this.info.goodsGoodsShopInfoVO.shopId,
            shopName: this.info.goodsGoodsShopInfoVO.name,
            nationalHouseGoodsList: nationalHouseGoodsList,
            source: appSource(), // 订单来源(1：Android，2：IOS，3：PC，4：小程序，5：h5)
            periodDays: this.isCash === 1 ? 0 : this.info.accountPeriodDays,
          },
        }
        const result = await this.$VoHttp
          .apiOrderPlaceSpNational(params)
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '下单失败')
          })
        if (result) {
          this.result = result
          this.$storage.set('payParams', result)
          if (this.isCash === 1) {
            this.showPay = true
          } else {
            this.payValidationVisible = true
          }
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .order {
    height: 100vh;
    display: flex;
    flex-direction: column;

    .good {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      margin-top: 16rpx;
      margin-bottom: 16rpx;

      &-shop {
        display: flex;
      }

      &-main {
        display: flex;

        &__img {
          width: 160rpx;
          height: 160rpx;
          margin-right: 16rpx;
        }

        &__right {
          flex: 1;
          display: flex;
          flex-direction: column;

          .name {
            font-weight: bold;
            font-size: 28rpx;
            line-height: 150%;
            color: rgba(0, 0, 0, 0.85);
          }

          .type-btn {
            width: 224rpx;
            justify-content: center;
            font-size: 24rpx;
            padding: 8rpx 10rpx;
            box-sizing: border-box;
            text-align: center;
            line-height: 42rpx;
            display: flex;
            &.selected {
              background: #ffece5;
              border: 2rpx solid #ff5319;
              border-radius: 80rpx;
              color: #ff5319;
            }

            &.no-selected {
              background: #f6f7f8;
              border-radius: 80rpx;
              border: 2rpx solid transparent;
              color: $v-c0-85;
            }
          }
        }
      }
    }

    &-info {
      flex: 1;
      overflow-y: auto;
      background: #fff;
      padding: 24rpx 32rpx;

      .title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 32rpx;
        line-height: 1.5;
        box-sizing: border-box;
      }

      .ware-item {
        padding: 24rpx 0;
        box-sizing: border-box;
        position: relative;
        border-bottom: 1px solid #f7f7f8;

        &__name {
          color: rgba(0, 0, 0, 0.85);
          font-size: 28rpx;
          line-height: 46rpx;
        }

        .desc {
          color: rgba(0, 0, 0, 0.45);
          line-height: 1.5;
          font-size: 26rpx;
        }
      }

      .edit {
        position: absolute;
        right: 32rpx;
        top: 24rpx;
        text-align: center;

        &-text {
          color: rgba(0, 0, 0, 0.45);
          line-height: 1.5;
          font-size: 24rpx;
        }
      }

      .edit-input {
        width: 110rpx;
        height: 48rpx;
        text-align: center;
        line-height: 44rpx;
        color: rgba(0, 0, 0, 0.85);
        font-size: 24rpx;
        border-radius: 8rpx;
        border: 2rpx solid rgba(0, 0, 0, 0.65);
      }
    }

    .submit-bottom {
      padding: 24rpx 32rpx;
      background: #fff;

      &__button {
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        padding: 20rpx 40rpx;
        font-size: 32rpx;
        color: #fff;
        background: #ff5319;
        border-radius: 48rpx;
      }
    }

    .notice {
      background: #feecee;
      padding: 22rpx;
      text-align: center;
      line-height: 1.5;
      font-size: 24rpx;
      color: #ff5319;
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
