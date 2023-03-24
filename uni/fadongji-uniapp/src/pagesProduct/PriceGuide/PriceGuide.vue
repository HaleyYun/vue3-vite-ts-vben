<template>
  <view>
    <view class="vh-full flex flex-column overflow-hidden">
      <VoNav is-fixed is-have-more title="价格指导" />
      <view class="guide-search">
        <VoSearch
          v-model="keyword"
          actionText="搜索"
          height="34"
          placeholder="请输入商品名称进行搜索"
          @custom="queryHandler"
          @search="queryHandler"
        />
      </view>
      <view v-if="loading" class="text-center fz-25 py-20">
        <text>数据加载中</text>
      </view>
      <VoNoData
        v-if="!loading && priceGuide.length == 0"
        :no-data-tips="['输入商品名称，', '搜索在售的同类商品的价格哦～']"
        img-url="/static/noData/noCoupon.png"
      />
      <scroll-view
        v-if="priceGuide.length"
        :scroll-y="priceGuide.length === 0 ? false : true"
        class="flex1 overflow-hidden"
        refresher-default-style="none"
        scroll-top="0"
        @scrolltolower="scrolltolower"
      >
        <PriceGuideBlock
          v-for="(info, index) of priceGuide"
          :key="index"
          :price-guide-block="info"
        />
        <view v-if="!loading" class="text-center fz-25 py-20 color-gray">
          <text v-if="hasMore">加载更多</text>
          <text v-if="!hasMore && priceGuide.length > 0">暂无更多数据</text>
        </view>
      </scroll-view>
    </view>
    <view v-if="false" class="guide flex flex-column">
      <VoNav is-fixed is-have-more title="价格指导" />
      <view class="guide-search">
        <VoSearch v-model="keyword" height="34" placeholder="请输入搜索" />
      </view>
      <!--  页面无内容组件  -->
      <!--  页面搜索时的样式  -->
      <PriceGuideBlock v-for="(info, index) of priceGuide" :key="index" :price-guide-block="info" />
    </view>
  </view>
</template>

<script>
  import PriceGuideBlock from '../components/PriceGuideBlock'

  export default {
    name: 'PriceGuide',
    components: { PriceGuideBlock },
    data() {
      return {
        indexList: [],
        urls: [
          'https://cdn.uviewui.com/uview/album/1.jpg',
          'https://cdn.uviewui.com/uview/album/2.jpg',
          'https://cdn.uviewui.com/uview/album/3.jpg',
          'https://cdn.uviewui.com/uview/album/4.jpg',
          'https://cdn.uviewui.com/uview/album/5.jpg',
          'https://cdn.uviewui.com/uview/album/6.jpg',
          'https://cdn.uviewui.com/uview/album/7.jpg',
          'https://cdn.uviewui.com/uview/album/8.jpg',
          'https://cdn.uviewui.com/uview/album/9.jpg',
          'https://cdn.uviewui.com/uview/album/10.jpg',
        ],
        keyword: '', // 搜索双向绑定
        priceGuide: [],
        loading: true,
        hasMore: true,
        pageQuery: {
          goodStatus: 1,
          pageNo: 1,
          pageSize: 20,
        },
      }
    },
    onLoad(option) {
      this.keyword = option?.name || ''
      this.loadmore()
    },
    methods: {
      queryHandler() {
        this.pageQuery.pageNo = 1
        this.priceGuide = []
        this.queryData()
        // 搜索
      },
      scrolltolower() {
        if (this.hasMore && !this.loading) {
          this.pageQuery.pageNo += 1
          this.loadmore()
        }
      },
      loadmore() {
        this.queryData()
      },
      async queryData() {
        this.loading = true

        try {
          const ret = await this.$VoHttp.GOODS.apiGoodsQueryPriceGuideList({
            ...this.pageQuery,
            name: this.keyword,
          })
          this.priceGuide = this.priceGuide.concat(ret.data?.records || [])
          console.log(this.priceGuide)
          this.hasMore = this.priceGuide.length < ret.data.total
          this.loading = false
        } catch (e) {
          this.loading = false
          console.warn(e, 'PriceGuide')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .substitute__scroll {
    height: 100%;
    width: 100%;
  }
  .guide {
    min-height: 100vh;
    background-color: #f6f7f8;

    &-operate {
      display: flex;
      align-items: center;

      &__icon {
        margin-left: 28rpx;
      }
    }

    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
  }
</style>
