<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="checkList flex flex-column"
    >
      <VoNav :is-fixed="false" :leftWidth="60" isHaveMore @backFn="backPage">
        <block slot="title">
          <view class="flex flex-vertical-c" @click="toChooseAddress">
            <view class="fz-b fz-32 color-block">备货车</view>
            <view class="checkList-nav flex flex-vertical-c">
              <VoIcon :size="12" class="m-l-7" name="address" />
              <view class="m-l-8 m-r-16 fz-24 color-block-45 overEllipsis"
                >配送至:{{ addressInfo.address }}
              </view>
            </view>
          </view>
        </block>
        <block slot="operation">
          <view class="flex flex-vertical-c m-r-22 fz-28 color-block" @click="editClick">
            {{ navTitle }}
          </view>
        </block>
      </VoNav>
      <scroll-view
        :scroll-y="!showAddress"
        class="flex1 overflow-y m-b-16"
        scroll-top="0"
        @scroll="onScroll"
      >
        <template v-if="cartList.length > 0 || expiredList.length > 0">
          <InvestmentCheckItem
            v-if="cartList.length > 0"
            ref="checkRef"
            :card-list="cartList"
            class="m-t-16"
            @updateFn="updateFn"
          />

          <InvestmentCheckItem
            v-if="expiredList.length > 0"
            ref="checkRef1"
            :card-list="expiredList"
            class="m-t-16"
            is-expired
            @clearFailGoods="clearFailGoods"
            @updateFn="updateFn"
          />
        </template>
        <VoNoData v-else />
      </scroll-view>

      <!--编辑底部弹框-->
      <view
        v-if="isEdit"
        class="checkList-bottom flex flex-justify-between p-b-safe-area flex-vertical-c"
      >
        <view
          class="flex flex-vertical-c"
          @click="$refs.checkRef.selectAllFn(!formData.isAllSelect)"
        >
          <VoIcon v-if="formData.isAllSelect" :size="24" color="#FF5319" name="select-right" />
          <VoIcon v-else :size="24" name="address_select" />
          <view class="m-l-6 fz-26 color-block-45">全选</view>
        </view>
        <view class="flex">
          <!-- <view class="checkList-bottom__btn" @click="deleteFn('collect')">移入收藏</view> -->
          <view class="checkList-bottom__btn m-l-32" @click="deleteFn('del')"
            >删除({{ formData.totalKind }})
          </view>
        </view>
      </view>

      <!--结算-->
      <view v-else>
        <!--      <view v-show="isShowTip" class="checkList-top">您的账期额度不足，请调整支付方式</view>-->
        <view class="checkList-bottom flex flex-justify-between p-b-safe-area flex-vertical-c">
          <view>
            <view
              class="flex flex-vertical-c"
              @click="$refs.checkRef.selectAllFn(!formData.isAllSelect)"
            >
              <VoIcon v-if="formData.isAllSelect" :size="24" color="#FF5319" name="select-right" />
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
                <VoPointPrice :price="formData.totalPrice.toFixed(2)" />
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
    </view>
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
  </view>
</template>

<script>
  import InvestmentCheckItem from './components/InvestmentCheckItem'
  import AddressPop from './components/AddressPop'

  export default {
    components: {
      InvestmentCheckItem,
      AddressPop,
    },
    data() {
      return {
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
        scrollTop: 0,
        showAddress: false,
      }
    },
    methods: {
      //返回事件
      backPage() {
        uni.$emit('refresh')
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

        // 先拿最后一级商品的选中
        let proSelectArr = []
        cartList.map((item) => {
          let resultInfo = item
          item.cartWarehouseList.map((it) => {
            it.cartDetailstList = it.cartDetailstList.filter((pro) => pro.selectEd)
          })

          proSelectArr.push(resultInfo)
        })

        let resultArr = []
        proSelectArr.map((item) => {
          let result = item
          result.cartWarehouseList = result.cartWarehouseList.filter(
            (pro) => pro.cartDetailstList.length > 0,
          )
          if (result.cartWarehouseList.length > 0) {
            resultArr.push(result)
          }
        })
        this.$storage.set('investGoodsData', resultArr)
        if (this.addressInfo && this.addressInfo.id) {
          this.$linkToEasy(
            '/pagesAgent/InvestmentList/SubmitOrders?isCartInit=true&addressId=' +
              this.addressInfo.id,
          )
        } else {
          this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrders?isCartInit=true')
        }
      },
      /**
       * 删除
       */
      deleteFnConfirm() {
        if (this.isLoading) return
        this.isLoading = false
        if (this.modalKey === 'del') {
          this.$VoHttp
            .apiCartBasisDeleteBatch({
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
          this.modalText = '确定删除吗？'
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
        this.$VoHttp
          .apiCartBasisDetailst({
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
              item.cartWarehouseList.map((it) => {
                it.selectEd = false
                if (it.cartDetailstList && it.cartDetailstList.length) {
                  it.cartDetailstList.map((goods) => {
                    goods.selectEd = false
                  })
                }
              })
            })
            console.log(this.cartList)
          })
      },
      // 获取默认地址
      initAddrss() {
        this.$VoHttp.USER.apiReceiverAddressDefault().then((res) => {
          if (res.data) {
            this.addressInfo = res.data
            this.initFn()
          } else {
            this.modalVisible = true
          }
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
        this.showAddress = true
        //选择地址
        this.$refs.addressPop.show(this.addressInfo)
      },
      selectAddress(data) {
        this.addressInfo = data
        this.showAddress = false
      },
      //页面滚动
      onScroll(e) {
        console.log(111222222)
        this.scrollTop = e.detail.scrollTop
      },
    },
    onShow() {
      this.initAddrss()
    },
    async onPullDownRefresh() {
      if (this.scrollTop === 0) {
        await this.initAddrss()
        uni.stopPullDownRefresh()
      }
    },
    onLoad() {
      // this.initAddrss()
    },
  }
</script>

<style lang="scss" scoped>
  .checkList {
    width: 750rpx;
    height: 100vh;

    &-nav {
      background-color: $v-bg-light;
      border-radius: 48rpx;
      height: 48rpx;
      line-height: 48rpx;
      width: 340rpx;
      margin-left: 8rpx;
      font-weight: 400;
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
        border-radius: 24rpx;
        padding: 16rpx 32rpx;
        color: $color-primary-yellow;
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        padding: 20rpx 50rpx;
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
</style>
