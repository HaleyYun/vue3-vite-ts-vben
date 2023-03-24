<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="business"
  >
    <VoNav is-fixed is-have-more title="申请记录" />
    <view class="business-tabs">
      <EraTabs :current="currentTab" :list="tabsList" :scrollable="false" @change="changeTabs" />
    </view>
    <swiper :autoplay="false" :current="currentTab" class="flex1" @change="changeSwiper">
      <swiper-item>
        <scroll-view
          :scroll-y="true"
          class="business-scroll flex1 bg-white"
          @scrolltolower="scrolltolowerFn(currentTab)"
        >
          <template v-if="oneList.length > 0">
            <view v-for="info of oneList" :key="info.id" class="m-t-16">
              <ApplyRecordList :apply-record="info" @goAuditResult="goAuditResult(info)" />
            </view>
            <VoLoadingText :has-more="hasMore" :loading="loading" />
          </template>
          <template v-else>
            <VoNoData :no-data-tips="'您还没有经营品牌'" />
          </template>
        </scroll-view>
      </swiper-item>

      <swiper-item>
        <scroll-view
          :scroll-y="true"
          class="business-scroll overflow-hidden flex1 bg-white"
          @scrolltolower="scrolltolowerFn(currentTab)"
        >
          <template v-if="twoList.length > 0">
            <view v-for="info of twoList" :key="info.id" class="m-t-16">
              <ApplyRecordList :apply-record="info" @goAuditResult="goAuditResult(info)" />
            </view>
            <VoLoadingText :has-more="hasMore" :loading="loading" />
          </template>
          <template v-else>
            <VoNoData />
          </template>
        </scroll-view>
      </swiper-item>

      <swiper-item>
        <scroll-view
          :scroll-y="true"
          class="business-scroll flex1"
          @scrolltolower="scrolltolowerFn(currentTab)"
        >
          <template v-if="threeList.length > 0">
            <view v-for="info of threeList" :key="info.id" class="m-t-16">
              <ApplyRecordList :apply-record="info" @goAuditResult="goAuditResult(info)" />
            </view>
            <VoLoadingText :has-more="hasMore" :loading="loading" />
          </template>
          <template v-else>
            <VoNoData />
          </template>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import ApplyRecordList from './components/ApplyRecordList'
  import VoLoadingText from '@/components/VoLoadingText/VoLoadingText'

  export default {
    name: 'ApplyRecord',
    components: { ApplyRecordList, VoLoadingText },
    data() {
      return {
        currentTab: 0, // 横向tabs默认
        loading: false,
        hasMore: false,
        tabsList: [
          {
            name: '全部',
            type: 0,
          },
          {
            name: '审核中',
            type: 1,
          },
          {
            name: '已审核',
            type: 2,
          },
        ],
        applyRecord: [
          {
            id: 0,
            time: '2020-06-18 15:32:56',
            status: '审核中',
            series: '发动机、水泵、',
          },
          {
            id: 1,
            time: '2020-04-18 15:32:56',
            status: '审核通过',
            series:
              '发动机、水泵、发动机、水泵、发动机、水泵、发动机、水泵、发动机、水泵、发动机、水泵、发动机、水泵、',
          },
          {
            id: 3,
            time: '2020-03-18 15:32:56',
            status: '审核不通过',
            series:
              '发动机、水泵、发动机、水泵、发动机、水泵、发动机、水泵、发动机、水泵、发动机、水泵、发动机、水泵、',
          },
        ],
        oneList: [],
        twoList: [],
        threeList: [],
        pageQuery: {
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    onLoad() {
      this.oneList = []
      this.twoList = []
      this.threeList = []
      this.pageQuery.pageNo = 1
      this.hasMore = false
      this.queryData()
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
      transferData(list) {
        let result = []
        result = list.map((item) => {
          const tmp = new Map()
          item.categoryName.forEach((c) => {
            const arr = c.split('-')
            const key = arr[0]
            const val = arr[1]
            const valArr = tmp.get(key) || []
            valArr.push(val)
            tmp.set(key, valArr)
          })
          const t = []
          tmp.forEach((val, key) => {
            t.push({
              name: key,
              value: val.join('、'),
            })
          })
          item.statusText =
            item.status === 1 ? '审核中' : item.status === 2 ? '已通过' : '审核不通过'
          item['list'] = t
          return item
        })
        return result
      },
      // 查询数据
      async queryData(status = 0) {
        try {
          const { data } = await this.$VoHttp.apiGoodsCategoryApplyQueryList({
            status,
            ...this.pageQuery,
          })

          if (status === 0) {
            this.oneList = this.oneList.concat(this.transferData(data.records))
            this.hasMore = this.oneList.length < data.total
            this.loading = false
          }
          if (status === 1) {
            this.twoList = this.twoList.concat(this.transferData(data.records))
            this.hasMore = this.twoList.length < data.total
            this.loading = false
          }
          if (status === 2) {
            this.threeList = this.threeList.concat(this.transferData(data.records))
            this.hasMore = this.threeList.length < data.total
            this.loading = false
          }
        } catch (e) {
          this.loading = false
          this.hasMore = false
          console.warn(e, 'ApplyRecord')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      /**
       * 去详情
       * @param info
       */
      goAuditResult(info) {
        this.$u.route({
          url: '/pagesCommon/StoreInfo/AuditResult',
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
    background: #f7f7f8;

    &-tabs {
      width: 100%;
      background: #ffffff;
      height: 96rpx;
      box-sizing: border-box;
      padding-top: 8rpx;
    }

    &-scroll {
      height: 100%;
      background: #f7f7f8;
    }
  }
</style>
