<template>
  <view class="manager bg">
    <view class="flex flex-column flex1 w-full h-full">
      <!--  头部  -->
      <!--      <VoBatteryBar />-->
      <VoNav
        :title="'我的修理厂' + (myGarageTitle > 0 ? '(' + myGarageTitle + ')' : '')"
        is-fixed
        isHaveMore
      >
        <block slot="operation">
          <view class="garage-map fz-28 color-block-65 m-r-20" @click="goMapFn">地图</view>
        </block>
      </VoNav>
      <!--  搜索  -->
      <view class="manager-search bg-white flex flex-vertical-c">
        <VoSearch
          v-model="queryData.keywords"
          bg-color="#fff"
          border-color="#FF5319"
          height="36"
          placeholder="请输入搜索"
          show-inside-action
          @custom="searchFn"
          @search="searchFn"
        />
      </view>
      <view class="manager-tabs">
        <!--        <u-tabs-->
        <!--          :current="currentTab"-->
        <!--          :list="tabsList"-->
        <!--          :scrollable="false"-->
        <!--          activeStyle="color: #FF5319;font-size: 16px;font-weight: bold;"-->
        <!--          inactiveStyle="color: rgba(0, 0, 0, 0.45);font-weight: 400;font-size: 14px;"-->
        <!--          lineColor="#FF5319"-->
        <!--          @change="changeTabs"-->
        <!--        />-->
        <EraTabs
          :current="currentTab"
          :list="tabsList"
          activeLabelStyle="color: #FF5319;font-size: 14px;font-weight: bold;"
          activeStyle="color: #FF5319;font-size: 16px;font-weight: bold;"
          inactiveLabelStyle="color: #F20014;font-weight: 400;font-size: 12px;"
          inactiveStyle="color: rgba(0, 0, 0, 0.45);font-weight: 400;font-size: 14px;"
          lineColor="#FF5319"
          @change="changeTabs"
        ></EraTabs>
      </view>
      <scroll-view
        :refresher-enabled="true"
        :refresher-threshold="10"
        :refresher-triggered="triggered"
        class="flex1 overflow-y"
        refresher-background="#F7F7F8"
        refresher-default-style="none"
        scroll-top="0"
        scroll-y
        @refresherabort="onAbort"
        @refresherpulling="onPulling"
        @refresherrefresh="onRefresh"
        @refresherrestore="onRestore"
        @scroll="onScroll"
        @scrolltolower="scrolltolowerFn"
      >
        <view v-if="cardList.length > 0">
          <NotCertified
            v-for="(item, index) in cardList"
            :key="item.companyId"
            :infos="item"
            @click.native="goManagerDetail(item)"
          >
            <view
              v-if="item.checkStatus === 1 && item.isBindMobile"
              class="manager-lr m-t-32"
              @click.stop="showPopup(item)"
              >审核
            </view>
            <view
              v-if="item.checkStatus === 1 && !item.isBindMobile"
              class="manager-bt m-t-32"
              @click.stop="invitationCode(item)"
              >邀请码
            </view>
            <view v-if="item.checkStatus === 4" class="flex flex-vertical-c m-t-32">
              <view class="manager-bt" @click.stop="unBindding(item)">解除绑定</view>
              <view class="manager-bt m-l-32" @click="goToBuy(item)">代客下单</view>
            </view>
            <view
              v-if="item.checkStatus === 5"
              class="manager-bt m-t-32"
              @click.stop="goCreateService(item)"
              >拒绝原因
            </view>
          </NotCertified>
          <VoLoadingText :has-more="hasMore" :loading="isLoading" />
        </view>
        <VoNoData v-else />
      </scroll-view>

      <view class="bottom">
        <view class="p-b-safe-area flex flex-row flex-vertical-c">
          <view class="bottom-text1 flex1 m-r-18" @click.stop="inviteSupply">邀请修理厂注册</view>
          <view class="bottom-text2 flex1 m-l-18" @click.stop="goCreateChooseType">新增修理厂</view>
        </view>
      </view>
    </view>

    <!--    <PopupServiceManager ref="setManagerPopup" @changeStatus="changeStatus" />-->
    <!--审核提示弹框-->
    <VoModal
      :show="processTip"
      class="position-f"
      closeOnClickOverlay
      confirmText="我知道了"
      content="请先联系修理厂下载并登录App后，再进行审核"
      @confirm="processTip = false"
    />
    <!--审核弹框-->
    <VoModal
      :content="processContent"
      :show="process"
      :showCancelButton="true"
      cancelText="取消"
      class="position-f"
      closeOnClickOverlay
      confirmText="审核通过"
      title="修理厂审核"
      @cancel="process = false"
      @confirm="pass"
    />
    <!-- 解除绑定弹窗 -->
    <VoModal
      :cancelText="cancelBt"
      :closeOnClickOverlay="true"
      :confirmText="confirmBt"
      :content="content"
      :show="showModalCancel"
      :showCancelButton="curItem.showCancelButton"
      :title="title"
      class="position-f"
      @cancel="bindCancel"
      @confirm="bindConfirm"
    />
    <!--    <VoShareQrCodeView ref="sharePop" :params="params" />-->
  </view>
</template>

<script>
  import NotCertified from './components/NotCertified'
  import PopupServiceManager from './components/PopupServiceManager'
  import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView'
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'MyGarage',
    components: { NotCertified, PopupServiceManager, VoShareQrCodeView },
    data() {
      return {
        isLoading: false,
        hasMore: true,
        triggered: false, // 下拉刷新判断布尔值
        refresh: false, // 下拉刷新判断布尔值
        loadingStatus: false, // 下拉刷新防抖
        /*** alart ***/
        title: '', //标题
        confirmBt: '', //确定按钮
        cancelBt: '', //取消按钮
        showModalCancel: false, //
        content: '您与该修理厂之间有未结算的分佣，请联系平台客服进行分佣结算并解除绑定！', //内容
        /*** alart ***/
        name: '新东方', //
        isPass: false,
        isShowPopup: false,
        currentTab: 0, // 横向tabs默认
        params: {},
        tabsList: [
          {
            name: '全部',
          },
          {
            name: '未认证',
          },
          {
            name: '待审核',
          },
          {
            name: '已认证',
          },
        ],
        myGarageTitle: '',
        cardList: [],
        queryData: {
          bindingType: '2',
          platformCode: 'garage',
          keywords: '',
          total: 0,
          pageNo: 1,
          pageSize: 10,
        },
        // 当前选中列表项
        curItem: {},
        shareCode: '',
        processTip: false, // 审核提示弹窗
        process: false, // 审核弹窗
        processContent: '审核弹窗内容',
      }
    },
    methods: {
      searchFn() {
        this.currentTab = 0
        this.initListFn('init')
      },
      // 审核通过
      async pass() {
        showLoading()
        let params = {
          id: this.curItem.companyId,
          status: 4,
        }
        try {
          const data = await this.$VoHttp.apiCompanyInfoAudit(params)
          if (!data || !data.data) {
            this.process = false
            hideLoading()
            return
          }
          this.$toast('操作成功', 'success', '/static/icons/success_icon.png')
          this.initTabFn()
          this.initListFn('init')
          this.process = false
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
      },
      /**
       * 去地图页
       */
      goMapFn() {
        // #ifdef H5
        this.$linkToEasy(
          `/pagesCommon/LightUp/MapMarkers?licenseId=${this.userInfo.licenseId}&inviterId=${this.userInfo.companyId}`,
        )
        // #endif
        // #ifdef APP-PLUS
        this.$linkToEasy(
          `/pagesCommon/LightUp/MapMarkersApp?licenseId=${this.userInfo.licenseId}&inviterId=${this.userInfo.companyId}`,
        )
        // #endif
      },
      changeStatus() {
        this.initTabFn()
        this.initListFn('init')
      },
      changeTabs(e) {
        this.currentTab = e.index
        this.initListFn('init')
      },
      /**
       * 审核
       */
      showPopup(item) {
        // this.$refs.setManagerPopup.showPop(item)
        this.curItem = item
        if (!item.downloadStatus) {
          this.processTip = true
          return
        }
        this.processContent = '修理厂名称：' + item.storeName
        this.process = true
      },
      /**
       * 拒绝原因
       */
      goCreateService(item) {
        console.log(item)
        this.curItem = item
        this.showModalCancel = true
        this.title = '拒绝原因'
        this.confirmBt = '知道了'
        this.curItem.showCancelButton = false
      },
      // 拒绝原因确定跳转修改
      refuseReason() {
        this.$linkToEasy(
          `/pagesChannelManager/GarageModule/CreateGarage?id=${this.curClick.companyId}`,
        )
      },
      /**
       * 创建服务商资料
       */
      goCreateChooseType() {
        this.$linkToEasy('/pagesChannelManager/GarageModule/CreateGarage')
      },
      /**
       * 邀请修理厂
       */
      async inviteSupply() {
        // this.$refs.sharePop.showShare('/pagesChannelManager/GarageModule/CreateGarage')
        this.params = {
          inviteUserId: this.userInfo.id,
          companyId: this.userInfo.companyId,
          userName: this.userInfo.userName,
          roleCode: 'garage',
        }
        // let router = '/pagesAgent/TokerDistrict/RegisterMobilePage'
        // this.$linkToEasy(
        //   `/pagesCommon/SharePoste/SharePoste?params=${JSON.stringify(
        //     this.params
        //   )}&router=${router}`,
        // )
        let router = '/pages/ShareRegister'
        if (!this.shareCode) {
          try {
            const res = await this.$VoHttp.apiShareLinkAdd({
              shareInfo: JSON.stringify(this.params),
            })
            if (!res || !res.data) {
              this.$u.toast(res.message || '网络请求失败')
              return
            }
            this.shareCode = res.data
          } catch (e) {
            this.$u.toast(e.message || '网络请求失败')
            return
          }
        }
        this.$linkToEasy(
          `/pagesCommon/SharePoste/SharePoste?code=${this.shareCode}&router=${router}`,
        )
        // this.$refs.sharePop.showShare('/pagesAgent/TokerDistrict/RegisterMobilePage')
      },
      /**
       * 邀请码
       */
      invitationCode(item) {
        // 运营需求，直接展示下载二维码
        console.log(item)
        // let param = {
        //   inviteUserId: this.userInfo.id,
        //   inviterId: this.userInfo.companyId,
        //   inviteeId: item.companyId,
        //   phone: item.userName,
        //   type: 1,
        //   userName: item.storeName,
        // }
        // this.params = param
        // this.$forceUpdate()
        // this.$nextTick(() => {
        //   this.$refs.sharePop.showShare('/pagesAgent/TokerDistrict/GoLoginDownload')
        // })
        let router = '/pagesAgent/TokerDistrict/GoLoginDownload'
        this.$linkToEasy(`/pagesCommon/SharePoste/SharePoste?code=asd&router=${router}`)
      },

      /**
       * 去修理厂详情
       * @param item
       */
      goManagerDetail(item) {
        this.$linkToEasy(
          '/pagesChannelManager/GarageModule/GarageDetail?companyId=' +
            item.companyId +
            '&inviterId=' +
            this.userInfo.companyId +
            '&type=4',
        )
      },
      // 代客下单
      goToBuy(item) {
        this.$storage.set('garageArea', item.areaCode)
        this.$linkToEasy(
          `/pagesAgent/GoodsList/GoodsList?companyId=${item.companyId}&salesArea=${item.areaCode}`,
        )
      },
      /**
       * 解除绑定
       */
      unBindding(item) {
        this.curItem = item
        if (item.isSettlement) {
          this.title = '系统提示'
          this.content = '您与该修理厂之间有未结算的分佣，请联系平台客服进行分佣结算并解除绑定！'
          this.showModalCancel = true
          this.confirmBt = '查看待结算明细'
          this.curItem.showCancelButton = true
          this.cancelBt = '我知道了'
          this.curItem.isSettlement = true
        } else {
          this.title = ''
          this.content = '确认要解除绑定'
          this.showModalCancel = true
          this.confirmBt = '确定'
          this.curItem.showCancelButton = true
          this.cancelBt = '取消'
        }
      },
      bindCancel() {
        this.showModalCancel = false
      },
      // 弹窗确认事件
      async bindConfirm() {
        if (this.title === '拒绝原因') {
          this.$linkToEasy(
            `/pageChannelManager/GarageModule/CreateGarage?id=${this.curItem.companyId}`,
          )
          return
        }
        //true有待结算金额 false无待结算金额
        if (!this.curItem.isSettlement) {
          if (this.isLoading) {
            return
          }
          this.isLoading = true
          showLoading()
          await this.$VoHttp
            .apiCompanyInfoRemoveBind$Id({ id: this.curItem.companyId })
            .then((res) => {
              this.isLoading = false
              if (+res.code === 20001) {
                this.showModalCancel = false
                this.$toast('解除成功', 'success', '/static/icons/success_icon.png')
                setTimeout(() => {
                  this.initTabFn()
                  this.initListFn('init')
                }, 1500)
              } else {
                this.showModalRelieve = false
                this.$u.toast(res.message)
              }
            })
            .catch((e) => {
              if (e.code === 'U1102') {
                this.isLoading = false
                this.title = '系统提示'
                this.content =
                  '您与该修理厂之间有未结算的分佣，请联系平台客服进行分佣结算并解除绑定！'
                this.showModalCancel = true
                this.confirmBt = '查看待结算明细'
                this.curItem.showCancelButton = true
                this.cancelBt = '我知道了'
                this.curItem.isSettlement = true
              } else {
                this.$u.toast(e.message || '网络请求失败')
              }
            })
            .finally(() => {
              this.isLoading = false
              hideLoading()
            })
        } else {
          this.showModalCancel = false
          // 跳转待结算金额页面
          this.$linkToEasy('/pagesSupplier/UserCenter/MyAccount/AmountSettled')
        }
      },
      //获取列表接口
      async initListFn(init) {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        if (init) {
          this.cardList = []
          this.queryData.pageNo = 1
        }
        let param = {
          inviterId: this.userInfo.companyId,
          checkStatus: this.tabsList[this.currentTab].checkStatus,
          ...this.queryData,
        }
        showLoading('加载中')
        await this.$VoHttp
          .apiCompanyInfoManagerGaragePage(param)
          .then((res) => {
            this.isLoading = false
            // res.data.records.map((item) => {
            //   this.cardList.push(item)
            // })
            this.cardList = [...this.cardList, ...res.data.records]
            this.queryData.total = res.data.total
            if (this.cardList.length >= res.data.total) {
              this.hasMore = false
            } else {
              this.hasMore = true
            }
          })
          .catch((e) => {
            this.isLoading = false
            this.$u.toast(e.message || '网络请求失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
      /**
       * @description 获取tab
       */
      async initTabFn() {
        await this.$VoHttp
          .apiCompanyInfoManagerGarageTab({
            companyId: this.userInfo.companyId,
            platformCode: this.userInfo.platformCode,
          })
          .then((res) => {
            console.log(res)
            this.myGarageTitle = 0
            res.data.map((item) => {
              item.name = item.checkStatusStr
              item.badge = {}
              if (+item.checkStatus === 1) {
                item.badge.value = item.count
                item.count = null
              }
              if (item.name === '全部') {
                this.myGarageTitle += Number(item.count)
              }
            })
            this.tabsList = res.data
            console.log(this.tabsList)
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络请求失败')
          })
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
          this.queryData.pageNo = 1
          this.cardList = []
          this.initListFn(1)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolowerFn() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.cardList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.queryData.pageNo += 1
          this.initListFn()
        }, 1000)
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
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
      },
    },
    onShow() {
      this.initTabFn()
      this.initListFn('init')
      this.params = {
        inviteUserId: this.userInfo.id,
        companyId: this.userInfo.companyId,
        userName: this.userInfo.userName,
        roleCode: 'garage',
      }
    },
  }
</script>

<style lang="scss" scoped>
  .position-f {
    position: fixed;
  }
  .manager {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;

    &-map {
      margin-right: 32rpx;
      font-size: 28rpx;
      color: $v-c0-65;
      line-height: 42rpx;
    }

    &-search {
      padding: 8rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }

    &-tabs {
      width: 100%;
      background: #ffffff;
      height: 96rpx;
      padding: 0 32rpx;
      box-sizing: border-box;
    }

    &-bt {
      padding: 0 24rpx;
      height: 52rpx;
      line-height: 52rpx;
      border: 2rpx solid #ff5319;
      border-radius: 30rpx;
      color: #ff5319;
      font-size: 24rpx;
    }

    &-lr {
      width: 140rpx;
      height: 52rpx;
      line-height: 52rpx;
      text-align: center;
      border: 2rpx solid #ff5319;
      border-radius: 30rpx;
      color: #ff5319;
      font-size: 24rpx;
    }
  }
  ::v-deep.manager-tabs {
    .u-tabs__wrapper__nav__item {
      position: relative;
      .u-badge--error {
        background-color: $v-error;
        position: absolute;
        right: 20rpx;
        top: 10rpx;
      }
    }
  }

  .bottom {
    background-color: #fff;
    font-size: 32rpx;
    width: 750rpx;
    padding: 20rpx 32rpx;
    box-sizing: border-box;

    &-text1 {
      padding: 22rpx 0;
      box-sizing: border-box;
      border: 2rpx solid #d3d4db;
      border-radius: 196rpx;
      color: $v-c0-85;
      text-align: center;
    }

    &-text2 {
      padding: 22rpx 0;
      box-sizing: border-box;
      border-radius: 196rpx;
      color: #fff;
      background-color: #ff5319;
      text-align: center;
    }
  }
  ::v-deep .manager-tabs .u-tabs__wrapper__nav__item .u-badge--error {
    right: -5px;
    top: 10px;
  }
</style>
