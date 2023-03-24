<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="order flex flex-column"
  >
    <VoNav isHaveMore title="销售订单" />
    <MarketOrder
      ref="marketRef"
      :current="current"
      :search="searchModel"
      class="flex1"
      @change="changeTab"
    />
  </view>
</template>

<script>
  import MarketOrder from '../components/MarketOrder'

  export default {
    components: {
      MarketOrder,
    },
    data() {
      return {
        current: 0,
        searchModel: '',
      }
    },
    onLoad(option) {
      if (option) {
        console.log(option)
        this.searchModel = option.search
      }
      if (option.tabIndex) {
        this.current = +option.tabIndex

        setTimeout(() => {
          this.$refs.marketRef.getOrderTypeList(this.current)
        }, 500)
      }
    },
    methods: {
      changeTab(index) {
        this.current = index
      },
      back() {
        this.$backFn()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
  }
</style>
