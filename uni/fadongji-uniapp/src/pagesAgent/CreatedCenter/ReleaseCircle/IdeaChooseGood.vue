<template>
  <view
    class="selectGood flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <view class="vh-full overflow-hidden flex flex-column">
      <VoNav is-fixed is-have-more title="选择商品" />
      <view class="selectGood-search">
        <VoSearch v-model="queryForm.name" height="34" @custom="searchHandler" @search="searchHandler">
<!--          <view slot="suffix" class="flex flex-vertical-c">-->
<!--            <VoIcon name="voice-line" color="#000" :opacity="0.65" class="m-r-14" />-->
<!--            <u-line direction="col" length="12" color="#B9B9BA" />-->
<!--            <VoIcon name="scan" color="#EE0A24" class="m-l-14" />-->
<!--          </view>-->
        </VoSearch>
      </view>
      <!-- <EraTabs class="selectGood-tab" :list="tabList" @click="tabsClick" :current="current" /> -->
      <view class="h16" />
      <scroll-view
        scroll-y="true"
        @scrolltolower="scrolltolower"
        class="selectGood-swiper__scroll flex1 overflow-hidden"
      >
        <block v-if="goodsList.length > 0">
          <GoodItem
            v-for="(item, index) in goodsList"
            :key="index"
            :good-data="item"
            @bottomClick="bottomClick"
          />
        </block>
        <VoNoData v-if="!goodsList.length" no-data-tips="暂无数据" />
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import GoodItem from './components/GoodItem'

  export default {
    components: {
      GoodItem,
    },
    data() {
      return {
        pageQuery: {
          pageNo: 1,
          pageSize: 20,
        },
        queryForm: {
          // goodApprovalStatus: 1, // 状态 1：待审核-审核中 2：待审核-审核未通过 3：违规-待整改 4：违规-审核中 5：违规-审核未通过
          goodStatus: 1, // 状态 1：在售   2：待审核 3：待售 4：违规
          name: '', // 商品名称
          // status: '', // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架
          // violationStatus: '', // 违规状态 1：已违规  2：违规审核 3：未违规
        },
        loading: false,
        hasMore: true,
        current: 0,
        tabList: [],
        goodsList: [],
      }
    },
    created() {
      this.queryData()
    },
    methods: {
      // 搜索
      searchHandler() {
        this.pageQuery.pageNo = 1
        this.goodsList = []
        this.hasMore = true
        this.queryData()
      },
      // 加载更多
      scrolltolower() {
        // 加载更多
        if (this.hasMore && !this.loading) {
          this.pageQuery.pageNo += 1
          this.queryData()
        }
      },
      async queryData() {
        this.loading = true
        try {
          const ret = await this.$VoHttp.GOODS.apiGoodsQueryMyGoods({
            ...this.pageQuery,
            ...this.queryForm,
          })
          this.goodsList = this.goodsList.concat(ret.data.pageResult.records)
          this.hasMore = this.goodsList.length < ret.data.pageResult.total
          let totalNum = 0
          const statistics = ret.data.statistics ? ret.data.statistics : []
          this.tabList = statistics.map((item) => {
            totalNum = totalNum + item.statisticCount * 1
            return {
              ...item,
              name: `${item.statisticName}(${item.statisticCount})`,
            }
          })
          // const tab = [
          //       {
          //           order: 0,
          //           statisticCode: '',
          //           statisticCount: totalNum,
          //           name: `全部(${totalNum})`,
          //       },
          //   ];
          // this.tabList = [...tab, ...this.tabList];
          this.loading = false
        } catch (e) {
          this.loading = false
          this.hasMore = false
          console.warn(e, 'InvestChooseGood')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },

      bottomClick(data) {
        let type = data.type
        if (type === 1) {
          this.$u.toast('商品详情')
          return
        }

        if (type === 2) {
          uni.$emit('chooseGoodsHandler', {
            id: data.data.id,
            name: data.data.name,
          })
          this.$backFn()
          return
        }
      },
      tabsClick(item) {
        this.current = item.index
        this.pageQuery.pageNo = 1
        this.goodsList = []
        this.hasMore = true
        this.queryForm.goodStatus = item.statisticCode
        this.queryData()
      },
      changeSwiper(e) {
        this.current = e.detail.current
      },
    },
  }
</script>

<style scoped lang="scss">
  .selectGood {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;

    &-search {
      height: 88rpx;
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background-color: #ffffff;
    }

    &-tab {
      background-color: #ffffff;
    }

    &-swiper {
      height: 100%;

      &__scroll {
        height: 100%;
      }
    }
  }
</style>
