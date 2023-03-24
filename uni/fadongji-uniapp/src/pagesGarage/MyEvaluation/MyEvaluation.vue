<template>
  <view class="eva flex flex-column">
    <VoNav :is-fixed="false" is-have-more title="评价">

      <!-- <block v-if="currentTab === 1" slot="operation"> -->
      <!-- bug3701 -->
      <block slot="operation">
        <image
          class="m-r-32 w48 h48"
          src="/static/agent/appraise_rule.png"
          @click="$linkToEasy('/pagesGarage/MyEvaluation/EvaluationRole')"
        />
      </block>
    </VoNav>
    <view class="eva-box">
      <EraSubsection
        :badgeNumList="badgeNumList"
        :current="currentTab"
        :list="list"
        activeColor="rgba(0, 0, 0, 0.85)"
        customStyle="background-color: #f7f7f8"
        inactiveColor="rgba(0, 0, 0, 0.45)"
        @change="sectionChange"
      />
    </view>
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="flex1 overflow-y bg h-full"
      refresher-background="#F7F7F8"
      refresher-default-style="none"
      refresher-enabled="true"
      scroll-top="0"
      scroll-y
      @refresherabort="onAbort"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @scroll="onScroll"
      @scrolltolower="scrolltolower"
    >
      <!--      <VoListFresh :show="loadingStatus" />-->
      <view v-if="dataList.length === 0 && !refresh" class="h-full">
        <VoNoData class="m-t-16" no-data-tips="您还没有相关评价" />
      </view>
      <block v-else>
        <block v-if="currentTab === 0">
          <ToEvaluate
            v-for="(info, infoIndex) of dataList"
            :key="infoIndex"
            :to-evaluate-list="info"
            class="m-t-16"
          />
        </block>
        <block v-else>
          <HaveEvaluation
            v-for="item of dataList"
            :key="item.id"
            :have-evaluation-list="item"
            class="m-t-16"
            @click.native="goEvaluationDetails(item)"
          />
        </block>
        <VoLoadingText
          v-if="dataList.length > 10"
          :has-more="dataList.length < total"
          :loading="loading"
        />
      </block>
    </scroll-view>
    <VoSafetyArea :is-fixed="false" />
    <!--    <swiper :autoplay="false" :current="currentTab" class="flex1 overflow-y" @change="changeSwiper">-->
    <!--      <swiper-item>-->
    <!--        <scroll-view-->
    <!--          :refresher-threshold="10"-->
    <!--          :refresher-triggered="triggered"-->
    <!--          :scroll-y="toEvaluateList.length === 0 ? false : true"-->
    <!--          class="eva-scroll flex1"-->
    <!--          refresher-background="#F7F7F8"-->
    <!--          refresher-default-style="none"-->
    <!--          refresher-enabled="true"-->
    <!--          scroll-top="0"-->
    <!--          @refresherabort="onAbort"-->
    <!--          @refresherpulling="onPulling"-->
    <!--          @refresherrefresh="onRefresh"-->
    <!--          @refresherrestore="onRestore"-->
    <!--          @scroll="onScroll"-->
    <!--          @scrolltolower="scrolltolower"-->
    <!--        >-->
    <!--          <view v-if="toEvaluateList.length === 0 && !refresh">-->
    <!--            <VoNoData class="m-t-16" no-data-tips="您还没有相关评价" />-->
    <!--          </view>-->
    <!--          <view v-else>-->
    <!--            &lt;!&ndash; 下拉刷新组件 &ndash;&gt;-->
    <!--            <VoListFresh :show="loadingStatus" />-->
    <!--            <ToEvaluate-->
    <!--              v-for="(info, infoIndex) of toEvaluateList"-->
    <!--              :key="infoIndex"-->
    <!--              :to-evaluate-list="info"-->
    <!--            />-->
    <!--            <u-loadmore :status="status" class="p-b-16" fontSize="12" line />-->
    <!--          </view>-->
    <!--        </scroll-view>-->
    <!--      </swiper-item>-->
    <!--      <swiper-item>-->
    <!--        <scroll-view :scroll-y="true" class="eva-scroll flex1">-->
    <!--          <view v-if="haveEvaluationList.length > 0" class="m-t-16">-->
    <!--            <HaveEvaluation-->
    <!--              v-for="item of haveEvaluationList"-->
    <!--              :key="item.id"-->
    <!--              :have-evaluation-list="item"-->
    <!--              @click.native="goEvaluationDetails(item)"-->
    <!--            />-->
    <!--            <u-loadmore :status="status" class="p-b-16" fontSize="12" line />-->
    <!--          </view>-->
    <!--          <VoNoData v-else class="m-t-16" no-data-tips="您还没有相关评价" />-->
    <!--        </scroll-view>-->
    <!--      </swiper-item>-->
    <!--    </swiper>-->
  </view>
</template>

<script>
  import ToEvaluate from './components/ToEvaluate'
  import HaveEvaluation from './components/HaveEvaluation'

  export default {
    name: 'MyEvaluation',
    components: { ToEvaluate, HaveEvaluation },
    data() {
      return {
        list: ['待评价', '已评价'],
        currentTab: 0,
        pageNo: 1,
        pageSize: 20,
        total: 0,
        loading: false,
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        status: 'noMore',
        dataList: [],
        badgeNumList: [0, 0],
      }
    },
    onShow() {
      this.refresh = true
      this.getDataList()
    },
    methods: {
      sectionChange(index) {
        this.currentTab = index
        this.refresh = true
        this.getDataList()
      },
      changeSwiper(e) {
        this.currentTab = e.detail.current
        if (this.currentTab === 0) {
          this.refresh = true
          this.getUnEvaluateRequest()
          return
        }
        this.getEvaluateRequest()
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      onScroll(e) {
        this.scrollTop = e.detail.scrollTop
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getDataList()
          // this.getUnEvaluateRequest()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.dataList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.getDataList()
          // this.getUnEvaluateRequest()
        }, 2000)
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },
      /**
       * 去评价详情
       */
      goEvaluationDetails(data) {
        console.log(data)
        this.$linkToEasy(
          '/pagesGarage/MyEvaluation/EvaluationDetails?orderId=' +
            data.orderId +
            '&sourceId=' +
            data.goodsId,
        )
      },
      /**
       * 是否刷新
       * @param refresh
       */
      async getDataList(refresh) {
        if (this.loading) return
        this.loading = !this.loading
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.dataList = []
          this.pageNo = 1
        }
        let params = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        }
        try {
          let data
          this.badgeNumList = [0, 0]
          if (this.currentTab === 0) {
            data = await this.$VoHttp.apiOrderEvaluateGetUnEvaluateOrderList(params)
          } else {
            params.companyId = this.userInfo.companyId
            data = await this.$VoHttp.apiOrderEvaluateGetEvaluateOrderList(params)
          }
          if (data.data && data.data.records && data.data.records.length > 0) {
            this.dataList.push(...data.data.records)
          }
          if (data && data.data) {
            this.total = data.data.total
          }
          if (this.currentTab === 0) {
            this.badgeNumList = [this.total, 0]
          } else {
            // this.badgeNumList = [0, this.dataList.length]
          }
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
        this.triggered = false
        this.refresh = false
        this.loadingStatus = false
        this.loading = false
      },

      //我的评价-待评价请求
      getUnEvaluateRequest() {
        let isfresh = this.refresh
        if (isfresh) {
          this.toEvaluateList = []
          this.pageNo = 1
        }

        let param = {
          pageNo: this.pageNo,
          pageSize: 20,
        }
        this.$VoHttp
          .apiOrderEvaluateGetUnEvaluateOrderList(param)
          .then((res) => {
            this.toEvaluateList = this.toEvaluateList.concat(res.data.records)
            this.total = res.data.total
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(res.message || '待评价列表获取失败')
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
          })
      },
      //我的评价-已评价请求
      getEvaluateRequest() {
        console.log('1111111')
        let param = {
          companyId: this.userInfo.companyId,
        }
        this.$VoHttp
          .apiOrderEvaluateGetEvaluateOrderList(param)
          .then((res) => {
            console.log('1111111', res)
            if (res.code === '20001') {
              console.log('1111111', res)
              if (!res.data) {
                return
              }
              if (res.data && res.data.records && res.data.records.length > 0) {
                this.haveEvaluationList = res.data.records
              }
            } else {
              uni.$u.toast(res.message || '已评价列表失败')
            }
          })
          .catch((err) => {
            uni.$u.toast(err.message || '已评价列表失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .eva {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    background-color: #ffffff;
    &-box {
      background: #ffffff;
      width: 750rpx;
      padding: 14rpx 32rpx 22rpx;
      box-sizing: border-box;
    }
    &-scroll {
      height: 100%;
    }
  }
</style>
