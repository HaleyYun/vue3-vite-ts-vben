<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="search"
  >
    <VoNav :leftWidth="80" :rightWidth="100">
      <block slot="title">
        <VoSearch
          v-model="searchModel"
          :showAction="false"
          placeholder="请输入搜索"
          height="34"
          @search="searchFn"
        />
      </block>
      <block slot="operation">
        <view class="search-nav" @click="searchCancel">取消</view>
      </block>
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
      confirmColor="#22284B"
      showCancelButton
      title="确定清除搜索历史吗？"
      @cancel="cancel"
      @confirm="deleteConfirm"
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
          '/pagesSupplier/Order/OrderList/OrderList?search=' + e + '&type=' + this.orderType,
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
        console.log('as')
        if (e.length > 0) {
          this.searchChange = true
          return
        }
        this.searchChange = false
      },
      goGoodDetailFn(item) {
        this.$u.toast('点击了' + item)
        this.$linkToEasy(
          '/pagesSupplier/Order/OrderList/OrderList?search=' + item + '&type=' + this.orderType,
        )
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
