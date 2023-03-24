<template>
  <view
    class="selectGood flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <view class="vh-full overflow-hidden flex flex-column">
      <VoNav is-fixed is-have-more title="选择商品" />
      <view class="selectGood-search">
        <VoSearch v-model="queryForm.name" height="34" placeholder="请输入商品名称" @search="searchHandler" @custom="searchHandler" />
      </view>
      <EraTabs class="selectGood-tab" :list="tabList" @click="tabsClick" :current="current" />
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
            isView
            @bottomClick="bottomClick"
          />
        </block>
        <VoNoData v-else />
<!--        <VoLoadingText :has-more="hasMore" :loading="loading" />-->
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import GoodItem from './components/GoodItem'
  import VoLoadingText from '@/components/VoLoadingText/VoLoadingText'

  export default {
    components: {
      GoodItem,
      VoLoadingText,
    },
    data() {
      return {
        pageQuery: {
          pageNo: 1,
          pageSize: 20,
        },
        queryForm: {
          goodApprovalStatus: 1, // 状态 1：待审核-审核中 2：待审核-审核未通过 3：违规-待整改 4：违规-审核中 5：违规-审核未通过
          goodStatus: '0', // 状态  (0：全部 1：在售   3：待售)
          name: '', // 商品名称
          status: '', // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架
          violationStatus: '', // 违规状态 1：已违规  2：违规审核 3：未违规
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
        let api = ''
        let param={

        }
        if (this.userInfo.platformCode === 'agent') {
          param.orderProperty='logCreateTime'
          param.orderType='DESC'
          api = 'apiGoodsQueryChooseGoods'
        } else {
          api = 'apiGoodsQueryGoodsOnSale'
        }
        try {

          const ret = await this.$VoHttp.GOODS[api]({ ...this.pageQuery, ...this.queryForm ,...param})
          this.goodsList = this.goodsList.concat(ret.data.pageResult.records)
          this.hasMore = this.goodsList.length < ret.data.pageResult.total
          let totalNum = 0
          const statistics = ret.data.statistics ? ret.data.statistics : []
          this.tabList = statistics.map((item) => {
            totalNum = totalNum + item.statisticCount * 1
            return {
              ...item,
              name: item.statisticName,
              count: item.statisticCount,
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
        //平台服务费
        let platFee = 0
        if (data.data.goodsServeFeeVOS && data.data.goodsServeFeeVOS.length) {
          let arr = data.data.goodsServeFeeVOS.filter(item => item.roleId === "platform");
          platFee = arr.length ? arr[0].serveFee : 0
        }

        if (type === 2) {
          uni.$emit('chooseGoodsHandler', {
            id: data.data.id,
            name: data.data.name,
            salesArea: data.data.salesArea,
            desc: JSON.parse(data.data.desc),
            cashPrice: data.data.cashPrice,
            platFee: platFee,
            accountPrice: data.data.accountPrice,
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
