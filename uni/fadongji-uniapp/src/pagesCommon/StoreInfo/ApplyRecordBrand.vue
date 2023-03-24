<template>
  <view
    class="business"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav is-fixed is-have-more title="申请记录" />
    <view class="business-tabs">
      <EraTabs :list="tabsList" :current="currentTab" @change="changeTabs" :scrollable="false" />
    </view>
    <swiper class="flex1" :autoplay="false" :current="currentTab" @change="changeSwiper">
      <swiper-item class="h-full">
        <scroll-view
          class="add-scroll overflow-hidden border-box h-full"
          @scrolltolower="scrolltolowerFn(currentTab)"
          scroll-y
        >
          <ApplyBrandRecordList
            :apply-record="info"
            v-for="info of oneList"
            :key="info.id"
            @goAuditResult="goAuditResult(info)"
          />
          <VoLoadingText :loading="loading" :has-more="hasMore" />
        </scroll-view>
      </swiper-item>
      <swiper-item class="h-full">
        <scroll-view
          class="add-scroll overflow-hidden border-box h-full"
          @scrolltolower="scrolltolowerFn(currentTab)"
          scroll-y
        >
          <ApplyBrandRecordList
            :apply-record="info"
            v-for="info of twoList"
            :key="info.id"
            @goAuditResult="goAuditResult(info)"
          />
          <VoLoadingText :loading="loading" :has-more="hasMore" />
        </scroll-view>
      </swiper-item>
      <swiper-item class="h-full">
        <scroll-view
          class="add-scroll overflow-hidden border-box h-full"
          @scrolltolower="scrolltolowerFn(currentTab)"
          scroll-y
        >
          <ApplyBrandRecordList
            :apply-record="info"
            v-for="info of threeList"
            :key="info.id"
            @goAuditResult="goAuditResult(info)"
          />
          <VoLoadingText :loading="loading" :has-more="hasMore" />
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import ApplyBrandRecordList from './components/ApplyBrandRecordList'
  import VoLoadingText from '@/components/VoLoadingText/VoLoadingText'

  export default {
    name: 'ApplyRecordBrand',
    components: { ApplyBrandRecordList, VoLoadingText },
    data() {
      return {
        currentTab: 1, // 横向tabs默认
        tabsList: [
          {
            name: '全部',
          },
          {
            name: '审核中',
          },
          {
            name: '已审核',
          },
        ],
        applyRecord: [
          {
            id: 1,
            time: '2020-06-18 15:32:56',
            status: '审核中',
            series: '品牌名称：江陵动力',
          },
          {
            id: 2,
            time: '2020-04-18 15:32:56',
            status: '审核通过',
            series: '品牌名称：江陵动力',
          },
          {
            id: 3,
            time: '2020-03-18 15:32:56',
            status: '审核不通过',
            series: '品牌名称：江陵动力',
          },
        ],
        oneList: [],
        twoList: [],
        threeList: [],
        loading: false,
        hasMore: true,
        pageQuery: {
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    onShow() {
      this.oneList = []
      this.twoList = []
      this.threeList = []
      this.pageQuery.pageNo = 1
      this.hasMore = true
      this.currentTab = 1
      this.queryData(1)
    },
    watch: {
      currentTab(val) {
        if (val === 0) {
          this.oneList = []
        }
        if (val === 1) {
          this.twoList = []
        }
        if (val === 2) {
          this.threeList = []
        }
        this.pageQuery.pageNo = 1
        this.hasMore = true
        this.queryData(val)
      },
    },
    methods: {
      // 滑动到底部加载
      scrolltolowerFn(status) {
        if (this.hasMore && !this.loading) {
          this.pageQuery.pageNo += 1
          this.queryData(status)
        }
      },
      // tab切换检测
      changeTabs(e) {
        this.currentTab = e.index
      },
      // 滑动检测
      changeSwiper(e) {
        console.log(e)
        this.currentTab = e.detail.current
      },
      // 组装数据
      // 查询数据
      async queryData(status = 1) {
        try {
          const { data } = await this.$VoHttp.apiGoodsBrandApplyLogList({
            status,
            ...this.pageQuery,
            orderProperty: 'create_time',
            orderType: 'DESC',
          })

          if (status === 0) {
            this.oneList = this.oneList.concat(data.records)
            this.hasMore = this.oneList.length < data.total
            this.loading = false
          }
          if (status === 1) {
            this.twoList = this.twoList.concat(data.records)
            this.hasMore = this.twoList.length < data.total
            this.loading = false
          }
          if (status === 2) {
            this.threeList = this.threeList.concat(data.records)
            this.hasMore = this.threeList.length < data.total
            this.loading = false
          }
        } catch (e) {
          this.loading = false
          this.hasMore = false
          console.warn(e, 'ApplyRecordBrand')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      /**
       * 去详情
       * @param info
       */
      goAuditResult(info) {
        this.$u.route({
          url: '/pagesCommon/StoreInfo/AuditBrandResult',
          params: {
            id: info.id,
          },
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .business {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &-tabs {
      width: 100%;
      background: #ffffff;
      height: 96rpx;
      box-sizing: border-box;
      padding-top: 8rpx;
    }
  }
</style>
