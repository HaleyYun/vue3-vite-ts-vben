<template>
  <view class="search">
    <!--  搜索  -->
    <VoBatteryBar />
    <view class="search-search flex flex-vertical-c">
      <VoIcon
        :opacity="0.45"
        class="m-r-24"
        color="#000000"
        name="left-arrow"
        @click="returnFn"
      ></VoIcon>
      <VoSearch v-model="keyword" height="34" placeholder="请输入搜索" />
    </view>
    <!--  筛选栏  -->
    <view class="search-sift flex flex-vertical-c">
      <view
        v-model="showPriceLow"
        :class="{ selected: this.showPriceLow === true }"
        class="search-sift__public"
        @click="priceLow"
        >价格低</view
      >
      <view
        v-model="showQuickly"
        :class="{ selected: this.showQuickly === true }"
        class="search-sift__public"
        @click="arrivalResult"
        >到货快</view
      >
    </view>
    <!--  商品  -->
    <view @click="goGoodsDetails">
      <GoodCell
        v-for="info of goodsCell"
        :key="info.id"
        :goods-cell="info"
        @buyNow="buyNow"
        @joinCart="joinCart"
      ></GoodCell>
    </view>
  </view>
</template>

<script>
  import GoodCell from './components/GoodCell'

  export default {
    name: 'SearchResult',
    components: { GoodCell },
    data() {
      return {
        keyword: '', // 搜索双向绑定
        showPriceLow: false, // 是否选中价格低
        showQuickly: false, // 是否选中到货快
        goodsCell: [
          {
            id: 1,
            name: 'B15发动机荣光-黑色、银光OCV江陵动力发动机',
            delivery: '郑州发货',
            inventory: 200,
            orderMoney: '450.00',
          },
          {
            id: 2,
            name: 'B15发动机荣光-黑色、银光OCV江陵动力发动机',
            delivery: '郑州发货',
            inventory: 200,
            orderMoney: '450.00',
          },
          {
            id: 3,
            name: 'B15发动机荣光-黑色、银光OCV江陵动力发动机',
            delivery: '郑州发货',
            inventory: 200,
            orderMoney: '450.00',
          },
          {
            id: 4,
            name: 'B15发动机荣光-黑色、银光OCV江陵动力发动机',
            delivery: '郑州发货',
            inventory: 200,
            orderMoney: '450.00',
          },
          {
            id: 5,
            name: 'B15发动机荣光-黑色、银光OCV江陵动力发动机',
            delivery: '郑州发货',
            inventory: 200,
            orderMoney: '450.00',
          },
        ],
      }
    },
    onLoad(option) {
      this.keyword = option.search
      console.log(this.keyword)
    },
    methods: {
      // 返回上一页
      returnFn() {
        this.$backFn()
      },
      // 价格低
      priceLow() {
        this.showPriceLow = !this.showPriceLow
      },
      // 到货快
      arrivalResult() {
        this.showQuickly = !this.showQuickly
      },
      /**
       * 去商品详情页
       */
      goGoodsDetails() {
        this.$linkToEasy('/pagesOldBuyer/HomeJumpPage/GoodsDetails')
      },
      /**
       * 加入购物车
       */
      joinCart() {
        this.$u.toast('加入购物车')
      },
      /**
       * 立即购买
       */
      buyNow() {
        this.$u.toast('立即购买')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .search {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    padding-top: 92rpx;
    &-search {
      position: fixed;
      top: 0;
      left: 0;
      width: 750rpx;
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      z-index: 99;
    }
    &-sift {
      background: #fff;
      margin-top: 16rpx;
      padding: 16rpx 32rpx;
      box-sizing: border-box;
      &__public {
        width: 186rpx;
        font-size: 28rpx;
        padding-left: 16rpx;
        box-sizing: border-box;
        color: $v-c0-45;
      }
    }
  }
  .selected {
    color: #ff5319;
  }
</style>
