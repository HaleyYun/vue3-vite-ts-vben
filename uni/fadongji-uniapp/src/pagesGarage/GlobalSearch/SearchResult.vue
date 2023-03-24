<template>
  <view class="search flex flex-column">
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
    <view class="flex1 overflow-y p-t-16">
      <VoNoData v-if="goodsCell.length < 1" :no-data-tips="['未找到相关数据']" />
      <view v-else>
        <!--  筛选栏  -->
        <view class="search-sift flex flex-vertical-c">
          <view class="flex flex-vertical-c">
            <view class="search-sift__name">品牌</view>
            <VoIcon :size="14" color="#AFB2BA" name="arrow-bottom-line"></VoIcon>
          </view>
          <view class="flex flex-vertical-c m-l-58">
            <view class="search-sift__name">类型</view>
            <VoIcon :size="14" color="#AFB2BA" name="arrow-bottom-line"></VoIcon>
          </view>
          <view class="flex flex-vertical-c m-l-58">
            <view class="search-sift__name">排序</view>
            <VoIcon :size="14" color="#AFB2BA" name="arrow-bottom-line"></VoIcon>
          </view>
        </view>
        <!--  商品  -->
        <view @click="goGoodsDetails">
          <GoodCell
            v-for="info of goodsCell"
            :key="info.id"
            :goods-cell="info"
            @buyNow="buyNow"
            @installation="installation"
            @technicalSupport="technicalSupport"
          ></GoodCell>
        </view>
      </view>
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
        goodsCell: [
          {
            id: 1,
            name: 'B15发动机荣光-黑色、银光OCV江陵动力发动机',
            orderMoney: '450.00',
          },
          {
            id: 2,
            name: 'B15发动机荣光-黑色、银光OCV江陵动力发动机',
            orderMoney: '450.00',
          },
          {
            id: 3,
            name: 'B15发动机荣光-黑色、银光OCV江陵动力发动机',
            orderMoney: '450.00',
          },
          {
            id: 4,
            name: 'B15发动机荣光-黑色、银光OCV江陵动力发动机',
            orderMoney: '450.00',
          },
          {
            id: 5,
            name: 'B15发动机荣光-黑色、银光OCV江陵动力发动机',
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
        // this.$linkToEasy('/pagesOldBuyer/HomeJumpPage/GoodsDetails')
      },
      /**
       * 技术支持
       */
      installation() {
        this.$u.toast('安装指导')
      },
      /**
       * 技术支持
       */
      technicalSupport() {
        this.$u.toast('技术支持')
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
    box-sizing: border-box;
    &-search {
      position: fixed;
      top: 0;
      left: 0;
      width: 750rpx;
      padding: 8rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      z-index: 99;
    }
    &-sift {
      background: #fff;
      padding: 20rpx 28rpx;
      box-sizing: border-box;
      &__name {
        height: 40rpx;
        line-height: 40rpx;
        font-size: 26rpx;
        color: $v-c0-85;
        margin-right: 8rpx;
      }
    }
  }
</style>
