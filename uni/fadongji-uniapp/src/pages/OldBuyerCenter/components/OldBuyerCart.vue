<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="checkList flex flex-column"
    >
      <!--   ENG-4008   -->
      <!--      <VoBatteryBar bg-color="transparent" />-->
      <VoNav :is-fixed="false" :leftWidth="60" isHaveMore title="购物车">
        <view slot="back">
          <view />
        </view>
        <view slot="title">
          <view class="flex flex-vertical-c" @click="toChooseAddress">
            <view class="fz-b fz-32 color-block">购物车</view>
            <view class="checkList-nav flex flex-vertical-c">
              <VoIcon :size="12" class="m-l-7" name="address" />
              <view class="m-l-8 m-r-16 fz-24 color-block-45 overEllipsis"
                >配送至:{{ addressInfo.address }}
              </view>
            </view>
          </view>
        </view>
        <view slot="operation">
          <view class="flex flex-vertical-c m-r-22 fz-28 color-block" @click="editClick">
            {{ navTitle }}
          </view>
        </view>
      </VoNav>
      <scroll-view
        :refresher-triggered="loading"
        class="flex1 overflow-y m-t-16"
        refresher-enabled
        scroll-y
        @refresherrefresh="refresherrefresh"
      >
        <view v-if="cartList.length + expiredList.length > 0">
          <CheckItem
            v-if="cartList.length > 0"
            ref="checkRef1"
            :card-list="cartList"
            class="m-b-16"
            @updateFn="updateFn"
          />

          <CheckItem
            v-if="expiredList.length > 0"
            ref="checkRef2"
            :card-list="expiredList"
            class="m-b-16"
            is-expired
            @clearFailGoods="clearFailGoods"
            @updateFn="updateFn"
          />
        </view>
        <VoNoData v-else img-url="/static/noData/noGoods.png" no-data-tips="暂无商品，快去购买吧" />
      </scroll-view>

      <block v-if="+currentUserFullInfo.checkStatus === 3">
        <!--编辑底部弹框-->
        <view v-if="isEdit" class="checkList-bottom flex flex-justify-between flex-vertical-c">
          <view class="flex flex-vertical-c" @click="selectAll">
            <VoIcon v-if="formData.isAllSelect" :size="24" color="#FF5319" name="select-right" />
            <VoIcon v-else :size="24" name="address_select" />
            <view class="m-l-6 fz-26 color-block-45">全选</view>
          </view>
          <view class="flex">
            <!-- <view class="checkList-bottom__btn" @click="deleteFn('collect')">移入收藏</view> -->
            <view v-if="formData.totalKind !== 0">
              <view class="checkList-bottom__button m-l-32" @click="deleteFn('del')"
                >删除({{ formData.totalKind }})
              </view>
            </view>
            <view v-else>
              <view class="checkList-bottom__btn m-l-32">删除({{ formData.totalKind }}) </view>
            </view>
          </view>
        </view>

        <!--结算-->
        <view v-else>
          <!--      <view v-show="isShowTip" class="checkList-top">您的账期额度不足，请调整支付方式</view>-->
          <view class="checkList-bottom flex flex-justify-between flex-vertical-c">
            <view>
              <view class="flex flex-vertical-c" @click="selectAll">
                <VoIcon
                  v-if="formData.isAllSelect"
                  :size="24"
                  color="#FF5319"
                  name="select-right"
                />
                <VoIcon v-else :size="24" name="address_select" />
                <view class="m-l-6 fz-26 color-block-45">全选</view>
              </view>
              <view v-show="isShowTip" class="m-l-48 m-t-8 color-block-65 fz-28"
                >共{{ formData.totalKind }}种{{ formData.totalNum }}件商品
              </view>
            </view>
            <view class="flex flex-vertical-c">
              <view>
                <view class="color-red fz-24 flex m-r-24 flex-vertical-c">
                  <view class="fz-28 lh48">合计：</view>
                  <VoPointPrice :price="formData.totalPrice" />
                  <view>元</view>
                </view>
                <view v-show="formData.paymentPrice > 0" class="m-r-24 m-t-4 color-red fz-24"
                  >账期支付{{ formData.paymentPrice }}元
                </view>
                <view v-show="formData.cashPrice > 0" class="m-r-24 m-t-4 color-red fz-24"
                  >现金支付{{ formData.cashPrice }}元
                </view>
              </view>
              <view class="checkList-bottom__button" @click="goSettlementFn">去结算</view>
            </view>
          </view>
        </view>
      </block>
      <VoSafetyArea :is-fixed="false" />
    </view>
    <!-- 地址选择弹窗 -->
    <AddressPop ref="addressPop" @select="selectAddress" />
    <VoModal
      v-if="delVisible"
      :show="delVisible"
      showCancelButton
      @cancel="delVisible = false"
      @confirm="deleteFnConfirm"
    >
      <view class="color-block-65 fz-28 text-center"> {{ modalText }}</view>
    </VoModal>
    <VoModal
      v-if="modalVisible"
      :show="modalVisible"
      showCancelButton
      @cancel="modalVisible = false"
      @confirm="toAddress"
    >
      <view class="slot-content"> 请先去添加地址</view>
    </VoModal>
    <!--  底部悬浮start  -->
    <view
      v-if="
        Number(currentUserFullInfo.checkStatus) === -1 ||
        Number(currentUserFullInfo.checkStatus) === 0
      "
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">当前为游客模式，体验更多功能，请先进行认证</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 4"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">为保障认证信息是本人真实操作，请验证手机号</view>
      <view class="suspension__button" @click="agentApproveFn">去验证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 2"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">认证未通过，请重新进行认证。</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 1"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">信息正在认证审核中，请耐心等待...</view>
      <view class="suspension__button bg" @click="agentApproveFn">审核中</view>
    </view>
    <!--  底部悬浮end  -->
  </view>
</template>
<script>
  import CheckItem from './CartComponents/CheckItem'
  import AddressPop from './CartComponents/AddressPop'
  import store from '@/store'
  import { showLoading } from '@/common/helper'

  export default {
    name: 'OldBuyerCart',
    components: { CheckItem, AddressPop },
    data() {
      return {
        loading: false,
        expiredList: [], // 过期列表
        addressInfo: {
          address: '',
        },
        isLoading: false,
        isEdit: false,
        isShowTip: false,
        navTitle: '编辑',
        cartList: [],
        formData: {
          isAllSelect: false,
          totalPrice: 0, //合计
          totalKind: 0, //几种商品
          totalNum: 0, //几件商品
          paymentPrice: 0, // 账期金额
          cashPrice: 0, //现金金额
          selectId: [],
        },
        modalVisible: false,
        delVisible: false,
        modalText: '确定删除吗？',
        modalKey: 'del', //del删除collect收藏
        currentUserFullInfo: {},
      }
    },
    async created() {
      console.log('zxc')
      showLoading()
      await store.dispatch('user/getFullUserInfo').then((res) => {
        this.currentUserFullInfo = res
        console.log(res)
        this.$store.dispatch('user/setUseInfoItem', res)
        if (+this.userInfo.checkStatus !== 3) {
          return
        }
        this.initAddrss()
      })
    },
    methods: {
      selectAll() {
        console.log(this.formData.isAllSelect, 'isAllSelect')
        console.log(this.cartList)
        this.$refs.checkRef1.selectAllBizFn(!this.formData.isAllSelect)
        // this.cardList.forEach((item) => {
        //   item.selected = !this.formData.isAllSelect
        //   if (item.resaleGoodsList) {
        //     item.resaleGoodsList.forEach((good) => {
        //       good.selectEd = !this.formData.isAllSelect
        //     })
        //   }
        // })
      },
      /**
       * @description 认证跳转
       */
      agentApproveFn() {
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {
          //companyType   企业类型（2：企业会员, 3：个人会员）
          if (Number(this.userInfo.companyType) === 2) {
            this.$linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
            return
          } else if (Number(this.userInfo.companyType) === 3) {
            this.$linkToEasy('/pages/AuthenticationInformation/AgentAccount')
            return
          }
          // 如果是服务商
          this.$linkToEasy('/pages/AuthenticationInformation/PublicAccounts')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus === -1) {
          // 游客模式单独处理
          this.showApprove = true
          return
        }
        if (this.userInfo.roleCode == 'garage') {
          this.$linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
          return
        }

        this.$linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      refresherrefresh() {
        if (this.loading) return
        this.loading = true
        this.initAddrss()
      },
      refreshData() {
        this.initAddrss()
      },
      /**
       * @description 去结算
       */
      goSettlementFn() {
        if (this.formData.totalKind <= 0) {
          uni.$u.toast('请先选择商品')
          return
        }
        let cartList = JSON.parse(JSON.stringify(this.cartList))
        console.log(cartList)
        // 先拿最后一级商品的选中
        let proSelectArr = []
        cartList.map((item) => {
          let resultInfo = item
          item.resaleGoodsList = item.resaleGoodsList.filter((pro) => pro.selectEd)
          proSelectArr.push(resultInfo)
        })

        let cartDetailstList = []
        cartList.map((item) => {
          item.resaleGoodsList.map((good) => {
            good.goodsCount = good.resaleGoodsNum || 1
            good.price = good.cashPrice
            good.isPress = good.isPreSale
            good.isCash = true
            good.name = good.resaleGoodsName
            good.carId = good.id
            good.id = good.resaleGoodsId
            good.businessId = good.preSalesId
            cartDetailstList.push(good)
          })
        })

        let orderProductInfo = [
          {
            shopId: cartList[0].shopId,
            shopName: cartList[0].shopName,
            cartWarehouseList: [
              {
                warehouseName: cartList[0].shopName,
                warehouseId: cartList[0].warehouseId,
                arrivalTime: cartList[0].arrivalTime,
                deliveryAreaName: cartList[0].warehouseAddress,
                cartDetailstList: cartDetailstList,
              },
            ],
          },
        ]
        this.$storage.set('OrderPayInfoOldBuyer', orderProductInfo)
        this.$linkToEasy('/pagesOldBuyer/CartModule/SubmitOrders?isCartInit=true')
      },
      /**
       * 删除
       */
      deleteFnConfirm() {
        if (this.isLoading) return
        this.isLoading = false
        if (this.modalKey === 'del') {
          this.$VoHttp
            .apiCartResaleDeleteBatch({
              ids: this.formData.selectId,
            })
            .then((res) => {
              uni.$u.toast('删除成功')
              this.initFn()
              this.isLoading = false
              this.delVisible = false
            })
            .catch((e) => {
              this.isLoading = false
              uni.$u.toast(e.message || '删除失败')
              this.delVisible = false
            })
        } else {
          // this.$VoHttp
          //   .apiCartBasisSaveCollection({
          //     contentIds: this.formData.selectId,
          //   })
          //   .then((res) => {
          //     uni.$u.toast('收藏成功')
          //     this.initFn()
          //     this.isLoading = false
          //     this.delVisible = false
          //   })
          //   .catch((e) => {
          //     this.isLoading = false
          //     uni.$u.toast(e.message || '收藏失败')
          //     this.delVisible = false
          //   })
        }
      },
      /**
       * 删除确认
       */
      deleteFn(key) {
        this.modalKey = key
        if (this.formData.totalKind <= 0) {
          uni.$u.toast('请先选择商品')
          return
        }
        if (key === 'collect') {
          this.modalText = `确认要将这${this.formData.totalKind}种商品移入我的收藏？`
        } else {
          this.modalText = `确定删除这${this.formData.totalKind}种商品吗？`
        }
        this.delVisible = true
      },
      /**
       * 更改价格
       */
      updateFn(res) {
        console.log(res, '99999999')
        this.formData.totalPrice = res.totalPrice
        this.formData.totalKind = res.totalKind
        this.formData.totalNum = res.totalNum
        this.formData.paymentPrice = res.paymentPrice
        this.formData.cashPrice = res.cashPrice
        this.formData.isAllSelect = res.isAllSelect
        this.formData.selectId = res.selectId

        //判断底部共x种x件商品 显隐
        if (this.formData.totalKind > 0) {
          this.isShowTip = true
        } else {
          this.isShowTip = false
        }
      },
      editClick() {
        this.isEdit = !this.isEdit
        if (this.isEdit) {
          this.navTitle = '完成'
        } else {
          this.navTitle = '编辑'
        }
      },
      /**
       * 初始化方法
       */
      initFn() {
        console.log(this.addressInfo, '11111111')
        //获取购物车详情
        this.$VoHttp
          .apiCartResaleDetailst({
            areaCode: this.addressInfo.areaCode,
          })
          .then((res) => {
            this.formData = {
              isAllSelect: false,
              totalPrice: 0, //合计
              totalKind: 0, //几种商品
              totalNum: 0, //几件商品
              paymentPrice: 0, // 账期金额
              cashPrice: 0, //现金金额
              selectId: [],
            }
            this.cartList = (res.data && res.data.noExpiredList) || []
            this.expiredList = (res.data && res.data.expiredList) || []
            this.cartList.map((item) => {
              item.selectEd = false
              item.resaleGoodsList.map((goods) => {
                goods.selectEd = false
              })
            })

            console.log('111111111111111', this.cartList)
          })
          .finally((res) => {
            this.loading = false
          })
      },
      // 获取默认地址
      initAddrss() {
        this.$VoHttp.USER.apiReceiverAddressDefault()
          .then((res) => {
            if (res.data) {
              this.addressInfo = res.data
              this.initFn()
            } else {
              this.loading = false
              // TODO 添加判断逻辑
              console.log(this.userInfo)
              this.modalVisible = true
            }
          })
          .catch((err) => {
            this.loading = false
          })
      },
      toAddress() {
        this.modalVisible = false
        this.$linkToEasy('/pagesSupplier/Setting/AddressHome')
      },
      //清空过期列表后刷新数据
      clearFailGoods() {
        this.initFn()
      },
      toChooseAddress() {
        //选择地址
        this.$refs.addressPop.show(this.addressInfo)
      },
      selectAddress(data) {
        this.addressInfo = data
      },
    },
    //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object
    onLoad() {
      // this.initAddrss()
    },
    //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {},
    //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    //监听页面隐藏
    onHide() {},
    //监听页面卸载
    onUnload() {},
    //监听用户下拉动作，一般用于下拉刷新
    async onPullDownRefresh() {
      await this.initAddrss()
      uni.stopPullDownRefresh()
    },
    //页面滚动到底部的事件（不是scroll-view滚到底）
    onReachBottom() {},
  }
</script>
<style lang="scss" scoped>
  .checkList {
    width: 750rpx;
    height: 100vh;
    background: #f7f7f8;
    ::v-deep .vo-nav__back {
      display: none;
    }
    &-nav {
      background-color: $v-bg-light;
      border-radius: 48rpx;
      height: 48rpx;
      line-height: 48rpx;
      width: 340rpx;
      margin-left: 8rpx;
    }

    &-top {
      background-color: $v-error-btn-disabled;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      color: $color-primary-red;
      font-size: 24rpx;
      width: 750rpx;
    }

    &-bottom {
      padding: 24rpx 32rpx;
      background: #fff;
      margin-bottom: 130rpx;

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

      &__btn {
        border: 2rpx solid $color-primary-yellow;
        color: $color-primary-yellow;
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        padding: 20rpx 40rpx;
        font-size: 32rpx;
        border-radius: 48rpx;
      }
    }

    .slot-content {
      font-size: 28rpx;
      line-height: 1.5;
      text-align: center;
      color: $v-c0-65;
    }
  }
  .suspension {
    //ENG-5623
    position: fixed;
    bottom: 172rpx;
    left: 32rpx;
    width: 686rpx;
    height: 88rpx;
    //ENG-5623
    margin: auto;
    margin-bottom: 16rpx;
    background: rgba(0, 0, 0, 0.65);
    border-radius: 62rpx;
    padding: 0 16rpx;
    box-sizing: border-box;
    z-index: 99;
    &__tips {
      font-size: 24rpx;
      color: #ffffff;
    }
    &__button {
      color: #fff;
      background: #ff5319;
      border-radius: 30rpx;
      font-size: 24rpx;
      width: 130rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      &.bg {
        background: #ff9b05;
      }
    }
  }
</style>
