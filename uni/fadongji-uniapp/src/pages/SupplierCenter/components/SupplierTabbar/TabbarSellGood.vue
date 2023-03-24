<template>
  <view class="good border-box overflow-hidden">
    <view class="vh-full flex flex-column border-box overflow-hidden">
      <VoNav :is-fixed="false" title="多卖货">
        <view slot="back">
          <view />
        </view>
      </VoNav>
      <view class="good-search">
        <VoSearch
            v-model="queryForm.keyword"
            height="34"
            bgColor="#fff"
            borderColor="#FF5319"
            :actionStyle="{color:'#fff'}"
            :showInsideAction="true"
            @custom="searchHandler"
          />
      </view>
      <EraTabs
        v-if="current === 0 || current"
        :current="current"
        :list="tabList"
        class="good-tab"
        inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 14px;"
        @click="tabsClick"
      />
      <scroll-view
        :refresher-threshold="10"
        :refresher-triggered="triggered"
        :scroll-y="true"
        class="good-scroll border-box overflow-hidden flex1"
        enable-back-to-top
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
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <view
          v-if="current === 1"
          class="good-label border-box flex flex-vertical-c flex-justify-c"
        >
          <view
            v-for="info of labelList"
            :key="info.id"
            :class="info.selected ? 'select' : 'no-select'"
            class="good-label__choose"
            @click="chooseClick(info)"
            >{{ info.name }}
          </view>
        </view>
        <view
          v-if="current === 3"
          class="good-label border-box flex flex-vertical-c flex-justify-c"
        >
          <view
            v-for="info of violationList"
            :key="info.id"
            :class="info.selected ? 'select' : 'no-select'"
            class="good-label__choose"
            @click="violationClick(info)"
            >{{ info.name }}
          </view>
        </view>
        <view v-if="underwayList.length > 0">
          <GoodItem
            v-for="(item, index) in underwayList"
            :key="index"
            :data="item"
            :type="current"
            class="m-t-16"
            @goodBottomBtnFn="goodBottomBtnFn"
            @select="selectHandler"
          />
          <VoLoadingText :has-more="hasMore" :loading="loading" />
        </view>
        <VoNoData v-else />
      </scroll-view>
      <view
        v-if="+queryForm.projectStatus === 1 && underwayList.length > 0 && selectedKeys.length > 0"
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
            color="#FF5319"
            name="select-right"
            @click="clickSelectAll(false)"
          />
          <view class="fz-26 color-block-45 lh150 m-l-6">全选</view>
        </view>
        <view class="flex flex-vertical-c py-15">
          <view class="choose-text p-l-10">
            <text class="choose-desc">合计：</text>
            {{ selectedKeys.length }}个项目
          </view>
          <view class="w210 m-l-20 p-r-20">
            <u-button
              :loading="putOrOfflineLoading"
              color="#FF5319"
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
        v-if="+queryForm.projectStatus === 3 && underwayList.length > 0 && selectedKeys.length > 0"
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
            color="#FF5319"
            name="select-right"
            @click="clickSelectAll(false)"
          />
          <view class="fz-26 color-block-45 lh150 m-l-6">全选</view>
        </view>
        <view class="flex flex-vertical-c py-15">
          <view class="choose-text p-l-10">
            <text class="choose-desc">合计：</text>
            {{ selectedKeys.length }}个项目
          </view>
          <view class="w210 m-l-20 p-r-20">
            <u-button
              :loading="putOrOfflineLoading"
              color="#FF5319"
              shape="circle"
              size="large"
              text="上架"
              type="primary"
              @click="putLineHandler"
            />
          </view>
        </view>
      </view>
    </view>
    <image class="send-btn" src="/static/agent/investment.png" @click="sendHandler" />
    <!--    <view class="send-btn" @click="sendHandler" />-->
    <VoModal
      :content="reasonContent"
      :show="show"
      :title="reasonTitle"
      confirmColor="rgba(0, 0, 0, 0.65)"
      @confirm="show = false"
    ></VoModal>

    <EraApproveModal :show.sync="showApprove" />
    <!--下架原因弹框-->
    <OutStockReason ref="stockReason" @close="outStockClose" @confirm="outStockConfirm" />
    <!--  底部悬浮start  -->
    <view
      v-if="
        Number(currentUserFullInfo.checkStatus) === -1 ||
        Number(currentUserFullInfo.checkStatus) === 0
      "
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">当前为游客模式，体验更多功能，请先进行认证</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 4"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">为保障认证信息是本人真实操作，请验证手机号</view>
      <view class="suspension__button" @click="agentApproveFn">去验证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 2"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">认证未通过，请重新进行认证。</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 1"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">信息正在认证审核中，请耐心等待...</view>
      <view class="suspension__button bg" @click="agentApproveFn">审核中</view>
    </view>
    <!--  底部悬浮end  -->
  </view>
</template>
<script>
  import GoodItem from '@/pages/SupplierCenter/components/GoodComponents/GoodItem'
  import VoLoadingText from '@/components/VoLoadingText/VoLoadingText'
  import OutStockReason from '@/pages/SupplierCenter/components/GoodComponents/OutStockReason'
  import store from '@/store'
  import { linkToEasy } from '@/common/helper'

  const violationListDefault = [
    // {
    //   id: 11,
    //   name: '全部',
    //   selected: true,
    //   proApprovalStatus: '',
    // },
    {
      id: 1,
      name: '待整改',
      selected: true,
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
    components: { GoodItem, VoLoadingText, OutStockReason },
    data() {
      return {
        currentUserFullInfo: {},
        showApprove: false,
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
        goodId: '',

        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        total: 0,
        noMore: false,
        content:''
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
          console.log(this.selectedKeys)
        },
      },
    },
    created() {
      this.queryData()
      store.dispatch('user/getFullUserInfo').then((res) => {
        this.currentUserFullInfo = res
        this.$store.dispatch('user/setUseInfoItem', res)

        // if (Number(this.currentUserFullInfo.checkStatus) === 0) {
        //   this.content = '您的账号未认证，请先完成认证'
        //   this.showApprove = true
        // } else if(Number(this.currentUserFullInfo.checkStatus) == 2){
        //   this.content = '您的账号未认证通过，请先完成认证'
        // }
      })
      uni.$off('refresh')
      uni.$on('refresh', () => {
        this.queryForm.projectStatus = 1
        this.current = 0
        this.pageQuery.pageNo = 1
        this.underwayList = []
        this.queryData()
      })
    },
    methods: {
      /**
       * @description 服务商认证跳转
       */

      /**
       * @description 服务商认证跳转
       */
      agentApproveFn() {
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {
          //companyType   企业类型（2：企业会员, 3：个人会员）
          linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus === -1) {
          this.showApprove = true
          return
        }
        if (this.userInfo.roleCode == 'garage') {
          linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
          return
        }

        linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      /**
       * 去认证详情
       */
      goApproveStatusFn() {
        if (this.currentUserFullInfo.checkStatus == 0) {
          this.$linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
          return
        } else if (this.currentUserFullInfo.checkStatus == 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        }
        this.$linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
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
            this.$u.toast('操作成功')
            setTimeout(() => {
              this.pageQuery.pageNo = 1
              this.underwayList = []
              this.queryData()
            }, 1500)
          })
          .catch((e) => {
            this.putOrOfflineLoading = false
            console.log(e)
            this.$u.toast(e?.message || '请检查网络')
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
            this.$u.toast('操作成功')
            setTimeout(() => {
              this.pageQuery.pageNo = 1
              this.underwayList = []
              this.queryData()
            }, 1500)
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
        console.log(type, data)
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
          this.$VoHttp.GOODS.apiGoodsProjectInvestmentWhetherApplyListing({ id: data.id })
            .then((res) => {
              if (res.data) {
                // 可以进行编辑上架
                this.$u.route({
                  url: '/pagesSupplier/SendInvestmentInfo/EditInvestmentInfo',
                  params: {
                    id: data.id,
                    type: 1,
                  },
                })
              }
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请检查网络')
            })
          return
        }
        // 查看原因
        if (type === 'reason') {
          this.$VoHttp.GOODS.apiGoodsProjectInvestmentReason({
            projectInvestmentId: data.id,
            isViolation,
          })
            .then((res) => {
              console.log(res)
              this.reasonTitle = ''
              this.reasonContent = res.data
              this.show = true
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请检查网络')
            })
          return
        }
        if (!this.operateLoading) {
          this.operateLoading = true
          if (type === 'offline') {
            this.goodId = data.id
            this.$refs.stockReason.show()
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
      //下架弹框关闭
      outStockClose() {
        this.operateLoading = false
      },
      //下架确认
      outStockConfirm() {
        this.$VoHttp.GOODS.apiGoodsProjectInvestmentUpdateStatus({
          id: [this.goodId],
          status: 4, // 1上架  4下架
        })
          .then((res) => {
            console.log(res)
            if (!res) return
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
        this.pageQuery.pageNo = 1
        this.underwayList = []
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
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.pageQuery.pageNo = 1
          this.underwayList = []
          this.queryData()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.underwayList.length >= this.total) {
            // uni.$u.toast('没有更多了')
            this.noMore = true
            return false
          }
          this.noMore = false
          this.pageQuery.pageNo++
          this.queryData()
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
      },
      // 发起投资
      sendHandler() {
        if (this.currentUserFullInfo.checkStatus == 1) {
          this.$u.toast('账号正在认证中，审核通过后才可以访问该页面。')
          return
        }
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }

        this.$storage.set('defaultArea', [])
        this.$u.route('pagesSupplier/SendInvestmentInfo/SendInvestmentInfo')
      },
      tabsClick(item) {
        this.queryForm.projectStatus = item.statisticCode
        this.pageQuery.pageNo = 1
        this.underwayList = []
        this.current = item.index
        this.labelList = this.$vocenApi._.cloneDeep(labelListDefault)
        this.violationList = this.$vocenApi._.cloneDeep(violationListDefault)
        this.queryForm.proApprovalStatus = ''
        this.queryData()
      },
      changeSwiper(e) {
        this.current = e.detail.current
      },
      async queryData() {
        if (this.loading) return
        this.loading = true
        try {
          await this.$VoHttp.GOODS.apiGoodsProjectInvestmentList({
            ...this.pageQuery,
            ...this.queryForm,
          }).then(ret=>{
            if(ret&&ret.data&&ret.data.pageResult){
              this.total = ret.data.pageResult.total
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
            }

          })

        } catch (e) {
          console.warn(e, 'TabbarSellGood')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
        this.loading = false
        this.triggered = false
        this.refresh = false
        this.loadingStatus = false
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
    //position: fixed;
    //bottom: 65px;
    //left: 0;
    //right: 0;
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
    }
  }

  .send-btn {
    position: fixed;
    width: 120rpx;
    height: 120rpx;
    right: 30rpx;
    bottom: 330rpx;
    //  no-repeat center center;
    border-radius: 50%;
    //font-size: 25rpx;
  }

  .good {
    width: 750rpx;
    height: 100%;
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
      border-bottom: 2rpx solid #f6f7f8;
      background-color: #ffffff;
    }

    &-swiper {
      height: 100%;
    }
  }

  .good-label {
    width: 750rpx;
    height: 96rpx;
    box-sizing: border-box;
    background: #ffffff;

    &__choose {
      width: 160rpx;
      height: 56rpx;
      line-height: 56rpx;
      box-sizing: border-box;
      font-size: 24rpx;
      border-radius: 32rpx;
      text-align: center;
      margin-right: 56rpx;
      //padding: 6rpx 24rpx;
      white-space: nowrap;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .no-select {
    color: $v-c0-85;
    background: $v-bg-light !important;
    border: 2rpx solid $v-bg-light;
  }

  .select {
    color: $color-primary-yellow;
    background: $v-tags-btn-disabled;
    border: 2rpx solid $v-tags-one;
    box-sizing: border-box;
    //line-height: 60rpx !important;
  }
  .suspension {
    z-index: 99;
    position: fixed;
    bottom: 172rpx;
    left: 32rpx;
    width: 686rpx;
    height: 88rpx;
    background: rgba(0, 0, 0, 0.65);
    border-radius: 62rpx;
    padding: 0 16rpx;
    box-sizing: border-box;
    &__tips {
      font-size: 24rpx;
      color: #ffffff;
    }
    &__button {
      color: #fff;
      background: #ff5319;
      border-radius: 30rpx;
      font-size: 24rpx;
      width: 130rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      &.bg {
        background: #ff9b05;
      }
    }
  }
</style>
