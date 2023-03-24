<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="order flex flex-column"
  >
    <view class="order-top">
      <VoNav :is-fixed="false" isHaveMore @backFn="backPageFn">
        <block slot="title">
          <view class="flex">
            <EraTabs
              :current="current"
              :list="navList"
              activeStyle="color:rgba(0, 0, 0, 0.85);font-size: 36rpx;"
              class="flex flex-justify-c"
              inactiveStyle="color: rgba(0, 0, 0, 0.45);font-weight: 400;"
              lineColor="transparent"
              @click="navTab"
            />
          </view>
        </block>
      </VoNav>
    </view>
    <InvestOrder ref="investOrderRef" class="flex1" :orderType="current" />
  </view>
</template>

<script>
  import InvestOrder from '../components/InvestOrder'

  export default {
    components: {
      InvestOrder,
    },
    data() {
      return {
        current: 0,
        navList: [{ name: '采购订单' }, { name: '转投订单' }],
        searchModel: '',
      }
    },
    onLoad(option) {
      uni.$on('updateOrderList', ()=> {
        let paramCountry = { index: 3 }
        this.$refs.investOrderRef.tabsClick(paramCountry)
      })
      if (option) {
        this.searchModel = option.search
        if (option.status) {
          //1210.待付款
          let status = 0
          if (+option.status === 1210) {
            status = 1
          }
          //待发货
          if (+option.status === 1220) {
            status = 2
          }
          //有值是投资到全国
          let paramCountry = { index: status }
          if (option.type) {
            setTimeout(() => {
              this.$refs.investOrderRef.tabsClick(paramCountry)
              setTimeout(() => {
                this.$refs.investOrderRef.investCountryChange()
              }, 500)
            }, 500)
            return
          }
          let param = { index: status }
          setTimeout(() => {
            this.$refs.investOrderRef.tabsClick(param)
          }, 1000)
        }
      }
    },
    onShow() {
	  if (this.$refs.hasOwnProperty('investOrderRef')) {
		this.$refs.investOrderRef.warehouseShow(this.current)
	  }
      //发货成功之后跳转待发货列表页面
      const delivery = uni.getStorageSync('SellOrderUpdate')
      if (!delivery) {
        return
      }
      if (delivery === 'returnInvest') {
        this.$refs.investOrderRef.deliverGoodsUpdate()
      }
      uni.setStorageSync('SellOrderUpdate', '')

	},
    methods: {
      backPageFn() {
        uni.$emit('refresh')
      },
      back() {
        this.$backFn()
      },
      searchOnClick() {
        this.$linkToEasy('/pagesSupplier/Order/OrderList/OrderSearch?type=' + this.orderType)
      },
      //切换tabbar
      navTab(e) {
        this.current = e.index
        this.$refs.investOrderRef.warehouseShow(this.current)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;

    &-top {
      width: 750rpx;
      background-color: #ffffff;
      z-index: 66;
    }
  }
</style>
