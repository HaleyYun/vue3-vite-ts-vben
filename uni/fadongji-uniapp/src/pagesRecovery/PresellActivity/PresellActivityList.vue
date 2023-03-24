<template>
  <view>
    <view class="presell flex p-b-safe-area">
      <VoNav is-have-more title="预售商品" />
      <view class="head">
          <VoSearch
              v-model.trim="keyword"
              placeholder="请输入关键字搜索"
              height="34"
              borderColor="#FF5319"
              bgColor="#fff"
              :actionStyle="{color:'#fff'}"
              :showInsideAction="true"
              @custom="change"
              @search="change"
            />
        <!-- <view>
          <u-input
            v-model.trim="keyword"
            :customStyle="{ backgroundColor: '#F7F7F8', height: '100%' }"
            border="none"
            placeholder="请输入关键字搜索"
            placeholder-style=" fontSize: '26rpx'; color: #B9B9BA "
            shape="circle"
            @blur="change"
          >
            <view slot="prefix">
              <VoIcon class="p-l-20" color="#B9B9BA" name="search" />
            </view>
          </u-input>
        </view> -->
        <!-- <view>
          <view class="fz-24" @click="releasePresell">发布预售商品</view>
        </view> -->
      </view>
      <view class="presell-tabs">
        <EraTabs
          :active-style="{ color: '#FF5319', 'font-weight': 500 }"
          :current="currentTab"
          :list="tabsList"
          :scrollable="true"
          itemStyle="padding:10rpx 40rpx;height:48rpx;padding-bottom:28rpx"
          lineColor="#FF5319"
          @change="changeTabs"
        />
      </view>
      <view
        v-if="
          tabsList &&
          tabsList[currentTab] &&
          tabsList[currentTab].statisticCode &&
          tabsList[currentTab].statisticCode === '1'
        "
        class="subsection-wrap"
      >
        <VoSubsection
          :current="current"
          :list="list"
          activeColor="rgba(0, 0, 0, 0.85)"
          class="subsection"
          inactiveColor="rgba(0, 0, 0, 0.45)"
          mode="button"
          @change="sectionChange"
        />
      </view>
      <swiper :current="currentTab" class="swiper flex1" @change="changeCurrent">
        <swiper-item v-for="(i, key) in tabsList" :key="key">
          <scroll-view
            :refresher-threshold="10"
            :refresher-triggered="triggered"
            :scroll-y="goodDataList.length === 0 ? false : true"
            class="presell-scroll"
            refresher-background="#F7F7F8"
            refresher-default-style="none"
            refresher-enabled="true"
            scroll-top="0"
            @refresherabort="onAbort"
            @refresherpulling="onPulling"
            @refresherrefresh="onRefresh"
            @refresherrestore="onRestore"
            @scroll="onScroll"
            @scrolltolower="scrolltolower"
          >
            <view v-if="goodDataList.length">
              <!-- 下拉刷新组件 -->
              <VoListFresh :show="loadingStatus" />
              <view v-for="(item, index) in goodDataList" :key="index">
                <PresellActivityItemVue
                  ref="setToast"
                  :good-data="item"
                  :index="index"
                  @bottomFn="bottonFn"
                  @onToast="onToast"
                  @showReason="showReason"
                />
              </view>
              <VoLoadingText :has-more="goodDataList.length < total" :loading="loading" />
            </view>
            <VoNoData v-else no-data-tips="暂无预售的商品" />
          </scroll-view>
        </swiper-item>
      </swiper>
      <view class="uploaded-footer flex flex-justify-r p-b-safe-area">
        <EraButton circle text="发布销售商品" @click="releasePresell" />
      </view>
    </view>
    <u-modal :show="modelShow" :title="modelTitle" confirmColor="#22284B" @confirm="confirm">
      <text class="fz-32">{{ modelContent }}</text>
    </u-modal>
  </view>
</template>

<script>
  import PresellActivityItemVue from './components/PresellActivityItem.vue'

  export default {
    components: {
      PresellActivityItemVue,
    },
    data() {
      return {
        modelShow: false,
        modelTitle: '审核未通过原因',
        modelContent: '',
        currentTab: 0,
        current: 0,
        list: ['全部商品', '审核中', '审核未通过'],
        //用于待审核情况下的筛选 商品状态 1：待审核 2：审核不通过
        status: '',
        tabsList: [],
        goodDataList: [],
        keyword: '',
        //tab栏筛选数据 用于请求列表
        tabData: {},
        //下拉刷新上拉加载
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        loading: false,
      }
    },
    onLoad() {
      this.getPresellListRequest()
    },
    methods: {
      onToast(res) {
        console.log(res, '9999999')
        this.goodDataList.forEach((item, index) => {
          this.$refs.setToast[index].setToast(res.index)
        })
      },
      confirm() {
        this.modelShow = false
      },
      lookReason(id) {
        this.$VoHttp
          .apiGoodsRecyclePreSaleQueryReason({ id })
          .then((res) => {
            if (res.code == '20001') {
              this.modelContent = res.data
              this.modelShow = true
            } else {
              uni.$u.toast(res.message || '预售活动添加失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '预售活动添加失败')
          })
      },
      showReason(id) {
        this.lookReason(id)
      },
      changeTabs(e) {
        this.currentTab = e.index
      },
      changeCurrent(e) {
        console.log(e);
        this.currentTab = e.detail.current
        this.tabData = this.tabsList[this.currentTab]
        this.refresh = true
        if (e.detail.current === 0) {
          console.log(this.current);
          this.status = this.current || ''
        } else {
          this.status = null
        }
        this.getPresellListRequest()
      },
      sectionChange(index) {
        this.current = index
        this.status = index
        this.refresh = true
        this.getPresellListRequest()
      },
      //搜索框
      change(value) {
        this.keyword = value
        this.refresh = true
        this.getPresellListRequest()
      },
      //底部按钮点击事件
      bottonFn(data) {
        //1.修改 2.暂停预售 3.启动预售 4.查看原因
        if (data.index === 1) {
          this.$linkToEasy(
            '/pagesRecovery/PresellActivity/PresellReleaseActivity?id=' + data.id + '&sourceType=2',
          )
          return
        }
        if (data.index === 2) {
          this.saleUpdateStatus(data)
          return
        }
        if (data.index === 3) {
          this.saleUpdateStatus(data)
          return
        }
        if (data.index === 4) {
          this.$u.toast('查看原因')
          return
        }
      },

      /**
       * 跳转发布预售
       */
      releasePresell() {
        this.$linkToEasy('/pagesRecovery/PresellActivity/PresellReleaseActivity?sourceType=1')
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
          this.getPresellListRequest()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.goodDataList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.getPresellListRequest()
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
      //获取预售订单列表请求
      getPresellListRequest() {
        if (this.loading) return
        this.loading = !this.loading
        let isfresh = this.refresh
        if (isfresh) {
          this.goodDataList = []
          this.pageNo = 1
        }
        let param = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        param.keyword = this.keyword
        if (this.currentTab === 0) {
          param.status = this.status == 2 ? 6 : this.status
        } else {
          if (+this.status !== 1) {
            if (this.tabData.statisticCode) {
              param.queryStatus = Number(this.tabData.statisticCode) || 1
            } else {
              param.queryStatus = 1
            }
          }
        }
        this.$VoHttp
          .apiGoodsRecyclePreSaleQueryMyList(param)
          .then((res) => {
            console.log('预售订单数据', res)
            this.processTabData(res.data.statistics)
            let resultData = res.data.pageResult.records
            this.total = res.data.pageResult.total
            console.log('预售订单records数据', resultData)
            this.goodDataList.push(...resultData)
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '网络连接错误')
          })
          .finally(() => {
            console.log(this.goodDataList);

            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            this.loading = false
            console.log(this.loading);
          })
      },
      //处理顶部tab栏显示数据
      processTabData(data) {
        this.tabsList = []
        data.forEach((item) => {
          if (item.statisticName) {
            let count = ''
            if (item.statisticCount && item.statisticCount > 0) {
              count = item.statisticCount
            }
            let name = item.statisticName
            let param = { name: name, statisticCode: item.statisticCode, count: count }
            this.tabsList.push(param)
          }
        })
        console.log(this.tabsList, '99999')
      },
      //修改预售活动状态
      saleUpdateStatus(data) {
        console.log(data)
        let status
        if (data.index === 2) {
          status = 4
        }
        if (data.index === 3) {
          status = 3
        }
        let param = {
          ids: [data.id],
          status: status,
        }
        this.$VoHttp
          .apiGoodsRecyclePreSaleUpdateStatus(param)
          .then((res) => {
            if (res.code === '20001') {
              if (data.index === 2) {
                uni.$u.toast('暂停预售成功')
              }
              if (data.index === 3) {
                uni.$u.toast('启动预售成功')
              }
              this.refresh = true
              this.loadingStatus = true
              this.getPresellListRequest()
            } else {
              uni.$u.toast(res.message || '启动预售失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '启动预售失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .presell {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 0 32rpx;

      > :nth-child(1) {
        width: 526rpx;
        height: 88rpx;
        box-sizing: border-box;
        padding: 12rpx 0 12rpx 0;
      }

      > :nth-child(2) {
        width: 176rpx;
        height: 56rpx;
        text-align: center;
        line-height: 56rpx;

        > :nth-child(1) {
          background: #ff5319;
          border-radius: 32px;
          color: #fff;
        }
      }
    }

    &-tabs {
      background-color: #fff;
    }

    &-scroll {
      height: 100%;
      overflow-y: scroll;
    }

    .no_more {
      width: 500rpx;
      height: 100rpx;
      margin: 48rpx auto;
    }
    .uploaded-footer {
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }
  .subsection {
    background: #f7f7f8;
    border-radius: 78px;
    height: 56rpx;
  }
  .subsection-wrap {
    background: #fff;
    padding: 18rpx 32rpx;
    box-sizing: border-box;
  }
</style>
