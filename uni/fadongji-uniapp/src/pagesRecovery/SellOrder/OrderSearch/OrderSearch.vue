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
        <view class="search-nav" @click="searchClick">搜索</view>
      </template>
    </VoNav>
    <view class="search-line" />
    <block v-if="searchHistory.length > 0">
      <OrderSearchHistory
        :searchHistory="searchHistory"
        @deleteHistoryFn="deleteHistory"
        @goGoodDetailFn="goGoodDetailFn"
      />
    </block>
    <u-modal
      :show="deleteShow"
      title="确定清除搜索历史吗？"
      showCancelButton
      confirmColor="#22284B"
      @confirm="deleteConfirm"
      @cancel="cancel"
    />
  </view>
</template>

<script>
  import OrderSearchHistory from '../components/OrderSearchHistory'

  export default {
    components: {
      OrderSearchHistory,
    },
    data() {
      return {
        searchModel: '',
        searchHistory: [],
        deleteShow: false,
        orderType: false,
      }
    },
    onLoad(option) {
      this.orderType = option.type
    },
    methods: {
      searchCancel() {
        this.searchModel = ''
      },
      //点击搜索
      searchFn(e) {
        console.log(e)
        if (this.searchHistory.indexOf(e) > -1) {
          return
        }
        this.searchHistory.push(e)
        //向本地存储搜索的记录数据
        uni.setStorage({
          key: 'searchHistory', //属性名
          data: this.searchHistory, //值
        })
        this.$linkToEasy(
          '/pagesRecovery/SellOrder/MarketOrder/MarketOrderList?search=' +
            e +
            '&type=' +
            this.orderType,
        )
      },
      //删除搜索历史记录
      deleteHistory() {
        this.deleteShow = true
      },
      deleteConfirm() {
        this.deleteShow = false
        //清空本地缓存
        uni.removeStorage({
          key: 'searchHistory',
          success: (e) => {
            this.searchHistory = []
          },
        })
      },
      cancel() {
        this.deleteShow = false
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
        this.$linkToEasy(
          '/pagesRecovery/SellOrder/MarketOrder/MarketOrderList?search=' +
            item +
            '&type=' +
            this.orderType,
        )
      },
      searchClick() {
        console.log(this.searchModel)
        this.$linkToEasy(
          '/pagesRecovery/SellOrder/MarketOrder/MarketOrderList?search=' +
            this.searchModel +
            '&type=' +
            this.orderType,
        )
        this.searchFn(this.searchModel)
      },
      onLoad() {
        //取缓存中的搜索记录数据
        uni.getStorage({
          key: 'searchHistory',
          success: (e) => {
            this.searchHistory = e.data
          },
        })
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
