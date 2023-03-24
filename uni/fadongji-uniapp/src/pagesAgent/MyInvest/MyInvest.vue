<template>
  <view class="good border-box overflow-hidden">
    <view class="vh-full flex flex-column">
      <VoNav :is-fixed="false" is-have-more title="我的项目" />
      <view class="good-search">
        <VoSearch
          v-model="queryForm.keyword"
          :showInsideAction="true"
          bgColor="#fff"
          borderColor="#FF5319"
          height="34"
          @custom="searchHandler"
        />
      </view>
      <EraTabs
        :current="current"
        :list="tabList"
        activeStyle="color: #FF5319;font-weight: bold;"
        class="good-tab"
        inactiveStyle="font-size: 14px;color: rgba(0, 0, 0, 0.45);"
        @click="tabsClick"
      />
      <scroll-view
        :refresher-threshold="10"
        :refresher-triggered="triggered"
        class="good-scroll border-box overflow-hidden flex1"
        enable-back-to-top
        refresher-background="#F7F7F8"
        refresher-default-style="none"
        refresher-enabled="true"
        scroll-top="0"
        scroll-y="true"
        @refresherabort="onAbort"
        @refresherpulling="onPulling"
        @refresherrefresh="onRefresh"
        @refresherrestore="onRestore"
        @scroll="onScroll"
        @scrolltolower="scrolltolower"
      >
        <view v-if="current === 1" class="good-label border-box flex flex-vertical-c">
          <view
            v-for="info of labelList"
            :key="info.id"
            :class="info.selected ? 'select' : 'no-select'"
            class="good-label__choose"
            @click="chooseClick(info)"
            >{{ info.name }}
          </view>
        </view>
        <view v-if="current === 3" class="good-label border-box flex flex-vertical-c">
          <view
            v-for="info of violationList"
            :key="info.id"
            :class="info.selected ? 'select' : 'no-select'"
            class="good-label__choose"
            @click="violationClick(info)"
            >{{ info.name }}
          </view>
        </view>
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <template v-if="underwayList.length > 0">
          <GoodItem
            v-for="(item, index) in underwayList"
            :key="index"
            :data="item"
            :isSelfClicked="true"
            @goodBottomBtnFn="goodBottomBtnFn"
            @select="selectHandler"
            @toDetail="toDetail(item)"
          />
          <VoLoadingText :has-more="hasMore" :loading="loading" />
        </template>
        <VoNoData v-if="!underwayList.length && !loadingStatus" />
        <!-- <view style="height: 65px" /> -->
      </scroll-view>
    </view>
    <image class="send-btn" src="/static/agent/investment.png" @click="sendHandler" />
    <!--    <view class="send-btn" @click="sendHandler" />-->
    <u-modal :content="reasonContent" :show="show" :title="reasonTitle" @confirm="show = false" />
    <view
      v-if="+queryForm.projectStatus === 1 && underwayList.length"
      class="select-all-box flex flex-justify-between flex-vertical-c"
    >
      <view class="flex flex-vertical-c p-l-10 fz-0">
        <VoIcon
          v-if="!chooseAllFlag"
          :size="24"
          class="m-r-6"
          color="#d9d9d9"
          name="circle"
          @click="clickSelectAll(true)"
        />
        <VoIcon
          v-else
          :size="24"
          class="m-r-6"
          color="#ff5319"
          name="select-right"
          @click="clickSelectAll(false)"
        />
        <view class="choose-all-text">全选</view>
      </view>
      <view class="flex flex-vertical-c py-15">
        <view class="choose-text p-l-10">
          <text class="choose-desc">合计：</text>
          {{ selectedKeys.length }}个项目
        </view>
        <view class="w210 m-l-20 p-r-20">
          <u-button
            :loading="putOrOfflineLoading"
            color="#ff5319"
            shape="circle"
            size="large"
            text="下架"
            type="primary"
            @click="offLineHandler"
          />
        </view>
      </view>
    </view>
    <view
      v-if="+queryForm.projectStatus === 3 && underwayList.length && selectedKeys.length"
      class="select-all-box flex flex-justify-between flex-vertical-c"
    >
      <view class="flex flex-vertical-c p-l-10 fz-0">
        <VoIcon
          v-if="!chooseAllFlag"
          :size="24"
          class="m-r-6"
          color="#d9d9d9"
          name="circle"
          @click="clickSelectAll(true)"
        />
        <VoIcon
          v-else
          :size="24"
          class="m-r-6"
          color="#ff5319"
          name="select-right"
          @click="clickSelectAll(false)"
        />
        <view class="choose-all-text">全选</view>
      </view>
      <view class="flex flex-vertical-c py-15">
        <view class="choose-text p-l-10">
          <text class="choose-desc">合计：</text>
          {{ selectedKeys.length }}个项目
        </view>
        <view class="w210 m-l-20 p-r-20">
          <u-button
            :loading="putOrOfflineLoading"
            color="#ff5319"
            shape="circle"
            size="large"
            text="上架"
            type="primary"
            @click="putLineHandler"
          />
        </view>
      </view>
    </view>
    <VoSafetyArea :is-fixed="false" />
    <ReasonModal ref="reasonModal" />
  </view>
</template>
<script>
  import GoodItem from '@/pagesAgent/MyInvest/components/GoodItem'
  import VoLoadingText from '@/components/VoLoadingText/VoLoadingText'
  import ReasonModal from '../GoodsManage/components/ReasonModal.vue'

  const violationListDefault = [
    {
      id: 11,
      name: '全部',
      selected: true,
      proApprovalStatus: '',
    },
    {
      id: 1,
      name: '待整改',
      selected: false,
      proApprovalStatus: 3,
    },
    {
      id: 2,
      name: '审核中',
      selected: false,
      proApprovalStatus: 4,
    },
    {
      id: 3,
      name: '审核未通过',
      selected: false,
      proApprovalStatus: 5,
    },
  ]

  const labelListDefault = [
    {
      id: 1,
      name: '全部项目',
      selected: true,
    },
    {
      id: 2,
      name: '审核中',
      selected: false,
      proApprovalStatus: 1,
    },
    {
      id: 3,
      name: '审核未通过',
      selected: false,
      proApprovalStatus: 2,
    },
  ]
  export default {
    name: 'TabbarSellGood',
    components: { GoodItem, VoLoadingText, ReasonModal },
    data() {
      return {
        putOrOfflineLoading: false,
        show: false,
        reasonTitle: '',
        reasonContent: '',
        loading: false,
        hasMore: true,
        violationList: this.$vocenApi._.cloneDeep(violationListDefault),
        labelList: this.$vocenApi._.cloneDeep(labelListDefault),
        current: 0,
        lookReasonShow: false,
        tabList: [],
        underwayList: [],
        pageQuery: {
          pageNo: 1,
          pageSize: 20,
        },
        queryForm: {
          projectStatus: 1, // 状态 1：进行中 2：待审核 3：已下架 4：违规 5：已完成
          keyword: '', // 商品名称
          proApprovalStatus: '', // 状态 1：待审核-审核中 2：待审核-审核未通过 3：违规-待整改 4：违规-审核中 5：违规-审核未通过
        },
        operateLoading: false,
        selectedKeys: [],

        triggered: false,
        filterVisible: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        total: 0,
        tabTitle: '进行中',
      }
    },
    computed: {
      chooseAllFlag() {
        return this.underwayList.every((item) => item.selected)
      },
    },
    watch: {
      underwayList: {
        deep: true,
        handler(newVal) {
          this.selectedKeys = []
          newVal.forEach((item) => {
            if (item.selected) this.selectedKeys.push(item.id)
          })
          // console.log(this.selectedKeys)
        },
      },
    },
    onShow() {
      this.queryData(true)
    },
    methods: {
      //去详情
      toDetail(item) {
        console.log(this.tabTitle)
        this.$linkToEasy(
          '/pagesAgent/MyInvest/CheckInvestmentInfo?id=' + item.id + '&title=' + this.tabTitle,
        )
      },
      // 批量上架
      putLineHandler() {
        if (!this.selectedKeys.length) {
          return this.$u.toast('请选择操作项目')
        }
        this.putOrOfflineLoading = true
        this.$VoHttp.GOODS.apiGoodsProjectInvestmentUpdateStatus({
          id: this.selectedKeys,
          status: 1, // 1上架  4下架
        })
          .then((res) => {
            this.putOrOfflineLoading = false
            console.log(res, 'xx')
            if (+res.code === 20001) {
              this.$u.toast('操作成功')
              this.pageQuery.pageNo = 1
              this.underwayList = []
              this.queryData()
            }
          })
          .catch((e) => {
            this.putOrOfflineLoading = false
            console.log(e)
            this.$u.toast(e?.message || '服务错误')
          })
      },
      // 批量下架
      offLineHandler() {
        if (!this.selectedKeys.length) {
          return this.$u.toast('请选择操作项目')
        }
        this.putOrOfflineLoading = true
        this.$VoHttp.GOODS.apiGoodsProjectInvestmentUpdateStatus({
          id: this.selectedKeys,
          status: 4, // 1上架  4下架
        })
          .then((res) => {
            console.log(res, 'xx')
            this.putOrOfflineLoading = false
            if (+res.code === 20001) {
              this.$u.toast('操作成功')
              this.pageQuery.pageNo = 1
              this.underwayList = []
              this.queryData()
            }
          })
          .catch((e) => {
            this.putOrOfflineLoading = false
            console.log(e)
            this.$u.toast(e?.message || '服务错误')
          })
      },
      // 全选
      clickSelectAll(flag) {
        this.underwayList = this.underwayList.map((item) => {
          return {
            ...item,
            selected: flag,
          }
        })
      },
      // 项目选择
      selectHandler({ id, status }) {
        this.underwayList = this.underwayList.map((item) => {
          return {
            ...item,
            selected: item.id === id ? status : item.selected,
          }
        })
      },
      // 操作按钮点击回调
      goodBottomBtnFn({ type, data, isViolation }) {
        if (type === 'edit') {
          this.$u.route({
            url: '/pagesSupplier/SendInvestmentInfo/EditInvestmentInfo',
            params: {
              id: data.id,
            },
          })
          return
        }
        if (type === 'put-apply') {
          this.$VoHttp.GOODS.apiGoodsProjectInvestmentWhetherApplyListing({ id: data.id }).then(
            (res) => {
              if (res.data) {
                // 可以进行编辑上架
                this.$u.route({
                  url: '/pagesSupplier/SendInvestmentInfo/EditInvestmentInfo',
                  params: {
                    id: data.id,
                    type: 1,
                  },
                })
              } else {
                // 调取违规原因
                this.$VoHttp
                  .apiGoodsQueryReason({
                    id: data.id,
                    status: true,
                  })
                  .then((res) => {
                    this.$refs.reasonModal.show(res.data)
                  })
                  .catch((err) => {
                    uni.$u.toast('操作失败')
                  })
              }
            },
          )
          return
        }
        // 查看原因
        if (type === 'reason') {
          this.$VoHttp.GOODS.apiGoodsProjectInvestmentReason({
            projectInvestmentId: data.id,
            isViolation,
          }).then((res) => {
            console.log(res)
            this.reasonTitle = ''
            this.reasonContent = res.data
            this.show = true
          })
          return
        }
        if (!this.operateLoading) {
          this.operateLoading = true
          if (type === 'offline') {
            this.$VoHttp.GOODS.apiGoodsProjectInvestmentUpdateStatus({
              id: [data.id],
              status: 4, // 1上架  4下架
            })
              .then((res) => {
                console.log(res, 'xx')
                this.operateLoading = false
                if (+res.code === 20001) {
                  this.$u.toast('操作成功')
                  this.pageQuery.pageNo = 1
                  this.underwayList = []
                  this.queryData()
                }
              })
              .catch((e) => {
                this.operateLoading = false
                console.log(e)
                this.$u.toast(e?.message || '服务错误')
              })
          }
          if (type === 'put') {
            this.$VoHttp.GOODS.apiGoodsProjectInvestmentUpdateStatus({
              id: [data.id],
              status: 1, // 1上架  4下架
            })
              .then((res) => {
                this.operateLoading = false
                console.log(res, 'xx')
                if (+res.code === 20001) {
                  this.$u.toast('操作成功')
                  this.pageQuery.pageNo = 1
                  this.underwayList = []
                  this.queryData()
                }
              })
              .catch((e) => {
                this.operateLoading = false
                console.log(e)
                this.$u.toast(e?.message || '服务错误')
              })
          }
        }
      },
      // 头部标签选择
      chooseClick(item) {
        this.labelList.forEach((model) => {
          if (item.id === model.id) {
            model.selected = true
          } else {
            model.selected = false
          }
        })
        this.queryForm.proApprovalStatus = item.proApprovalStatus
        this.pageQuery.pageNo = 1
        this.underwayList = []
        this.queryData()
      },
      violationClick(item) {
        this.violationList.forEach((model) => {
          if (item.id === model.id) {
            model.selected = true
          } else {
            model.selected = false
          }
        })
        this.queryForm.proApprovalStatus = item.proApprovalStatus
        this.pageQuery.pageNo = 1
        this.underwayList = []
        this.queryData()
      },
      searchHandler() {
        // this.pageQuery.pageNo = 1
        // this.underwayList = []
        this.refresh = true
        this.hasMore = true
        // 重置一些不确定因素
        this.queryData()
      },
      // scrolltolower() {
      //   // 加载更多
      //   if (this.hasMore && !this.loading) {
      //     this.pageQuery.pageNo += this.pageQuery.pageNo
      //     this.queryData()
      //   }
      // },
      // 发起投资
      sendHandler() {
        this.$u.route('pagesSupplier/SendInvestmentInfo/SendInvestmentInfo')
      },
      tabsClick(item) {
        this.tabTitle = item.statisticName
        this.queryForm.projectStatus = item.statisticCode
        this.pageQuery.pageNo = 1
        this.underwayList = []
        this.current = item.index
        this.labelList = this.$vocenApi._.cloneDeep(labelListDefault)
        this.violationList = this.$vocenApi._.cloneDeep(violationListDefault)
        this.queryForm.proApprovalStatus = ''
        this.queryData(true)
      },
      changeSwiper(e) {
        this.current = e.detail.current
      },
      async queryData(refresh) {
        this.loading = true
        if (this.refresh || refresh) {
          this.underwayList = []
          this.pageQuery.pageNo = 1
        }
        try {
          const ret = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentList({
            ...this.pageQuery,
            ...this.queryForm,
          })
          this.underwayList = this.underwayList.concat(
            ret.data.pageResult.records.map((item) => {
              return {
                ...item,
                selected: false,
              }
            }),
          )
          this.hasMore = this.underwayList.length < ret.data.pageResult.total
          this.tabList = ret.data.statistics?.map((item) => {
            return {
              ...item,
              name: `${item.statisticName}(${item.statisticCount})`,
            }
          })
          this.loading = false
          this.triggered = false
          this.refresh = false
          this.loadingStatus = false
        } catch (e) {
          this.loading = false
          this.hasMore = false
          this.triggered = false
          this.refresh = false
          this.loadingStatus = false
          console.warn(e, 'TabbarSellGood')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.queryData(true)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.hasMore && !this.loading) {
            this.pageQuery.pageNo += this.pageQuery.pageNo
            this.queryData()
          }
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
      onScroll(e) {
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
      /**
       *跳转投资详情
       */
      goodDetailClick(data) {
        console.log(data)
        this.$linkToEasy('/pagesSupplier/InvestmentInfo/InvestmentDetail')
      },
      goodBottomClick(data) {
        //type 1.下架 2.修改 3.删除 4.查看原因 5.上架
        let type = data.type
        if (type === 1) {
          this.$u.toast('下架')
          return
        }

        if (type === 2) {
          this.$u.toast('修改')
          return
        }

        if (type === 3) {
          this.$u.toast('删除')
          return
        }

        if (type === 4) {
          this.lookReasonShow = true
          return
        }
        if (type === 5) {
          this.$u.toast('上架')
          return
        }
        if (type === 6) {
          this.$u.toast('申请上架')
          return
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .select-all-box {
    z-index: 9;
    background-color: #fff;

    .choose-text {
      line-height: 1;
      font-size: 28rpx;
      font-weight: 500;

      .choose-desc {
        @include black-size-color(24, 0.85);
      }
    }

    .choose-all-text {
      @include black-size-color(28, 0.45);
      line-height: 1;
    }
  }

  .send-btn {
    position: fixed;
    width: 120rpx;
    height: 120rpx;
    right: 30rpx;
    bottom: 280rpx;
    //background: url('/static/agent/investment.png') no-repeat center center;
    border-radius: 50%;
    //font-size: 25rpx;
  }

  .good {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    background-color: #f7f7f8;

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
    }
  }

  .good-label {
    width: 750rpx;
    height: 96rpx;
    padding-left: 36rpx;
    box-sizing: border-box;
    background: #ffffff;

    &__choose {
      font-size: 24rpx;
      border-radius: 32rpx;
      text-align: center;
      margin-right: 28rpx;
      padding: 6rpx 24rpx;
      white-space: nowrap;
    }
  }

  .no-select {
    color: $v-c0-85;
    background: $v-bg-light !important;
    border: 2rpx solid transparent;
  }

  .select {
    color: #ff5319;
    background: #ffece5;
    border: 2rpx solid #ff6633;
    box-sizing: border-box;
    //line-height: 60rpx !important;
  }
</style>
