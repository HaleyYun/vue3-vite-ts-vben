<template>
  <view
    class="search"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav :rightWidth="100" :leftWidth="80">
      <template #title>
        <VoSearch
          placeholder="请输入搜索"
          height="34"
          :showAction="false"
          v-model="searchModel"
          @search="searchFn"
        />
      </template>
      <template #operation>
        <view class="search-nav" @click="searchCancel">取消</view>
      </template>
    </VoNav>
    <view class="search-line" />
    <GoodInfoItem v-for="(item, index) in orderList" :key="index" :order-data="item" />
  </view>
</template>

<script>
  import GoodInfoItem from '../components/GoodInfoItem'

  export default {
    components: {
      GoodInfoItem,
    },
    data() {
      return {
        orderList: [
          {
            orderNum: '202020202021020120120',
            time: '23小时23分钟',
            status: '1',
            statusDes: '待付款',
            storeName: '郑州安途代理商',
            goodUrl: '/static/created/product/rectangle.png',
            goodName: '江铃动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)',
            goodPrice: '3810.00',
            paymentTime: '30天',
            orderType: '1',
            goodNum: 'x1',
            servicePrice: '100',
            remake: '货到付款,联系确认型号发货',
          },
          {
            orderNum: '202020202021020120120',
            time: '23小时23分钟',
            status: '2',
            statusDes: '待发货',
            storeName: '郑州安途代理商',
            goodUrl: '/static/created/product/rectangle.png',
            goodName: '江铃动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)',
            goodPrice: '3810.00',
            paymentTime: '30天',
            orderType: '2',
            goodNum: 'x1',
            servicePrice: '100',
            remake: '',
          },
          {
            orderNum: '202020202021020120120',
            time: '23小时23分钟',
            status: '3',
            statusDes: '已发货',
            storeName: '郑州安途代理商',
            goodUrl: '/static/created/product/rectangle.png',
            goodName: '江铃动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)',
            goodPrice: '3810.00',
            paymentTime: '30天',
            orderType: '1',
            goodNum: 'x1',
            servicePrice: '100',
            remake: '货到付款,联系确认型号发货',
          },
          {
            orderNum: '202020202021020120120',
            time: '23小时23分钟',
            status: '4',
            statusDes: '已完成',
            storeName: '郑州安途代理商',
            goodUrl: '/static/created/product/rectangle.png',
            goodName: '江铃动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)',
            goodPrice: '3810.00',
            paymentTime: '30天',
            orderType: '1',
            goodNum: 'x1',
            servicePrice: '100',
            remake: '货到付款,联系确认型号发货',
          },
          {
            orderNum: '202020202021020120120',
            time: '23小时23分钟',
            status: '5',
            statusDes: '已取消',
            storeName: '郑州安途代理商',
            goodUrl: '/static/created/product/rectangle.png',
            goodName: '江铃动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)',
            goodPrice: '3810.00',
            paymentTime: '30天',
            orderType: '1',
            goodNum: 'x1',
            servicePrice: '100',
            remake: '货到付款,联系确认型号发货',
          },
          {
            orderNum: '202020202021020120120',
            time: '23小时23分钟',
            status: '1',
            statusDes: '待付款',
            storeName: '郑州安途代理商',
            goodUrl: '/static/created/product/rectangle.png',
            goodName: '江铃动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)',
            goodPrice: '3810.00',
            paymentTime: '30天',
            orderType: '1',
            goodNum: 'x1',
            servicePrice: '100',
            remake: '货到付款,联系确认型号发货',
          },
        ],
      }
    },
    methods: {
      searchCancel() {
        this.searchModel = ''
      },
      //点击搜索
      searchFn(e) {
        if (this.searchHistory.indexOf(e) > -1) {
          return
        }
        this.searchHistory.push(e)
        console.log('searchHistory 的数据' + this.searchHistory)
        //向本地存储搜索的记录数据
        uni.setStorage({
          key: 'searchHistory', //属性名
          data: this.searchHistory, //值
        })
      },
      //监听搜索框数据
      searchModelWatch(e) {
        if (e.length > 0) {
          this.searchChange = true
          return
        }
        this.searchChange = false
      },
      goGoodDetailFn(item) {
        this.$u.toast('点击了' + item)
        this.$linkToEasy('/pagesSupplier/Order/OrderList/OrderSearchResult')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .search {
    height: 100vh;
    width: 750rpx;
    box-sizing: border-box;
    background-color: #ffffff;

    &-nav {
      color: $v-c0-65;
      font-size: 32rpx;
    }

    &-line {
      background-color: #f8f8f8;
      height: 22rpx;
      width: 750rpx;
    }
  }
</style>
