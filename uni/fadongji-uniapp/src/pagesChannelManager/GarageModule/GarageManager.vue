<template>
  <view>
    <view class="garage">
      <view class="flex flex-column flex1 w-full h-full">
        <VoNav :is-fixed="false" is-have-more title="修理厂管理">
          <block slot="operation">
            <view class="garage-map fz-28 color-block-65 m-r-20" @click="goMapFn">地图</view>
          </block>
        </VoNav>
        <EraTabs
          :current="current"
          :list="tabList"
          activeStyle="font-weight: bold;color: #FF5319;font-size: 32rpx;"
          class="garage-tab"
          inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 28rpx;"
          line-color="#FF5319"
          @click="changeTabFn"
        />
        <swiper
          :circular="false"
          :current="current"
          class="content-swiper flex1"
          @change="changeSwiperFn"
        >
          <swiper-item v-for="item in tabList" :key="item.id">
            <scroll-view
              :refresher-enabled="false"
              :refresher-threshold="10"
              :refresher-triggered="triggered"
              :scroll-y="true"
              class="content-swiper__scroll"
              refresher-background="#F7F7F8"
              refresher-default-style="none"
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
              <NotCertified
                v-for="(item, index) in cardList"
                :key="index"
                :info="item"
                @click.native="goGarageDetail(item)"
              >
                <view
                  v-if="item.checkStatus === 1 && !item.isBindMobile"
                  class="short m-t-32"
                  @click.stop="openShare(item)"
                  >邀请码</view
                >
                <view
                  v-if="item.checkStatus === 1 && item.isBindMobile"
                  class="short m-t-32"
                  @click.stop="showPopup(item)"
                >
                  审核
                </view>
                <view
                  v-if="item.checkStatus === 4"
                  class="short m-t-32"
                  @click.stop="unBindding(item)"
                  >解除绑定</view
                >
                <view
                  v-if="item.checkStatus === 5"
                  class="long m-t-32"
                  @click.stop="showRefuse(item)"
                  >查看拒绝原因</view
                >
              </NotCertified>
              <VoLoadingText v-if="cardList.length > 0" :has-more="hasMore" :loading="loading" />
              <VoNoData v-if="!cardList.length && !refresh" no-data-tips="暂无数据" />
            </scroll-view>
          </swiper-item>
        </swiper>

        <view class="bottom flex flex-row flex-vertical-c">
          <view class="bottom-text1 flex1 m-r-18" @click="openShareInvite">邀请修理厂注册</view>
          <view
            class="bottom-text2 flex1 m-l-18"
            @click="goTo('/pagesChannelManager/GarageModule/CreateGarage')"
          >
            新增修理厂
          </view>
        </view>
        <VoSafetyArea :is-fixed="false" />
      </view>
    </view>
    <!--  解除绑定弹框  -->
    <VoModal
      :cancelText="relieve.cancelBt"
      :closeOnClickOverlay="true"
      :confirmText="relieve.confirmBt"
      :content="relieve.content"
      :show="showModalRelieve"
      :showCancelButton="true"
      :title="relieve.title"
      @cancel="bindCancel"
      @confirm="bindConfirm"
    />
    <!--  拒绝原因弹框  -->
    <VoModal
      :content="curClick.checkResult"
      :show="showModalRefuse"
      closeOnClickOverlay
      @confirm="refuseReason"
    />
    <PopupServiceManager ref="PopupServiceManager" :cur="curClick" @success="init" />
    <VoShareQrCodeView ref="sharePop" :params="shareParams">
      <EraButton
        circle
        text="手动创建"
        @click="goTo('/pagesChannelManager/GarageModule/CreateGarage')"
      />
    </VoShareQrCodeView>
  </view>
</template>

<script>
  import { hideLoading, showLoading } from '@/common/helper'
  import NotCertified from './components/NotCertified'
  import PopupServiceManager from './components/PopupServiceManager'
  import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView'

  export default {
    name: 'GarageManager',
    components: { NotCertified, PopupServiceManager, VoShareQrCodeView },
    data() {
      return {
        loading: false,
        hasMore: true,
        triggered: false, // 下拉刷新判断布尔值
        refresh: false, // 下拉刷新判断布尔值
        loadingStatus: false, // 下拉刷新防抖
        curClick: {}, // 当前点击审核对象
        showModalRelieve: false, // 解除绑定弹窗
        showModalRefuse: false, // 拒绝原因弹窗
        current: 0,
        tabList: [],
        cardList: [],
        pages: {
          pageNo: 1,
          pageSize: 20,
        },
        params: {},
        total: 0,
        shareParams: {},
        relieve: {
          cancelBt: '',
          confirmBt: '',
          content: '',
        },
        shareCode: '',
      }
    },
    onLoad() {
      this.init()
      this.shareParams = {
        inviteUserId: this.userInfo.id,
        companyId: this.userInfo.companyId,
        userName: this.userInfo.userName,
        roleCode: 'garage',
      }
    },
    methods: {
      showRefuse(item) {
        this.curClick = item
        this.showModalRefuse = true
      },
      // 拒绝原因确定跳转修改
      refuseReason() {
        this.$linkToEasy(
          `./CreateGarage?id=${this.curClick.companyId}&inviterId=${this.userInfo.companyId}`,
        )
      },
      /**
       * 解除绑定
       */
      unBindding(item) {
        console.log(item)
        this.curClick = item
        if (item.isSettlement) {
          this.relieve = {
            title: '系统提示',
            content: '您与该修理厂之间有未结算的分佣，请联系平台客服进行分佣结算并解除绑定！',
            confirmBt: '查看待结算明细',
            cancelBt: '我知道了',
          }
        } else {
          this.relieve = {
            title: '',
            content: '确认要解除绑定？',
            confirmBt: '确定',
            cancelBt: '取消',
          }
        }
        this.showModalRelieve = true
      },
      /**
       * 取消解除绑定
       */
      bindCancel() {
        this.showModalRelieve = false
      },
      /**
       * 提交解除绑定
       */
      async bindConfirm() {
        if (this.curClick.isSettlement) {
          // 跳转待结算金额页面
          this.$linkToEasy('/pagesSupplier/UserCenter/MyAccount/AmountSettled')
        } else {
          if (this.loading) {
            return
          }
          this.loading = true
          showLoading()
        }
        let that = this
        console.log(this.curClick)
        await this.$VoHttp
          .apiCompanyInfoRemoveBind$Id({ id: this.curClick.companyId })
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('解除成功', 'success', '/static/icons/success_icon.png')
              this.showModalRelieve = false
              setTimeout(() => {
                that.init()
              }, 1500)
            }
          })
          .catch((e) => {
            if (e.code === 'U1102') {
              this.relieve = {
                title: '系统提示',
                content: '您与该修理厂之间有未结算的分佣，请联系平台客服进行分佣结算并解除绑定！',
                confirmBt: '查看待结算明细',
                cancelBt: '我知道了',
              }
              this.curClick.isSettlement = true
              this.showModalRelieve = true
            } else {
              this.showModalRelieve = false
              this.$u.toast(e.message || '网络请求失败')
            }
          })
          .finally(() => {
            this.loading = false
            hideLoading()
          })
      },
      // 页面跳转方法
      goTo(url) {
        this.$linkToEasy(url)
      },
      async init() {
        this.cardList = []
        this.pages.pageNo = 1
        await this.getTabs()
        await this.getListData()
      },
      // 获取tabs
      async getTabs() {
        const { companyId, licenseId, platformCode } = this.userInfo
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerGarageTab({
            platformCode,
            licenseId,
            companyId,
          })
          console.log(data)
          if (+data.code === 20001) {
            let arr = []
            data.data.forEach((item) => {
              let obj = {}
              obj.name = item.checkStatusStr
              obj.count = item.count
              obj.status = item.checkStatus
              arr.push(obj)
            })
            console.log(arr)
            this.tabList = arr
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
          console.log(e)
        }
      },
      // 获取列表数据
      async getListData() {
        if (this.loading) {
          return
        }
        this.loading = true
        showLoading()
        const { platformCode, companyId, licenseId } = this.userInfo
        const { pageNo, pageSize } = this.pages
        let params = {
          bindingType: platformCode === 'channelManager' ? 1 : 2,
          platformCode: 'garage',
          inviterId: companyId,
          licenseId,
          pageNo,
          pageSize,
        }
        console.log(this.tabList)
        params.checkStatus = this.tabList[this.current].status
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerGaragePage(params)
          console.log(data)
          if (+data.code === 20001) {
            this.total = data.data.total
            this.cardList.push(...data.data.records)
            this.hasMore = this.cardList.length < data.total
          } else {
            this.$u.toast(data.message)
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
        this.loading = false
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
          this.pages.pageNo = 1
          this.cardList = []
          this.getListData()
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        console.log(this.cardList.length)
        console.log(this.total)
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.cardList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pages.pageNo += 1
          this.getListData()
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
      /**
       * 点击tab事件
       * @param e  触发的事件
       */
      changeTabFn(e) {
        this.pages.pageNo = 1
        // this.cardList = []
        // this.current = e.index
        // this.getListData()
      },
      /**
       * swiper滑动事件
       */
      changeSwiperFn(e) {
        this.pages.pageNo = 1
        this.cardList = []
        this.current = e.detail.current
        this.getListData()
      },
      /**
       * 点击审核
       */
      showPopup(cur) {
        this.curClick = cur
        this.$refs.PopupServiceManager.showPop()
      },
      goGarageDetail(item) {
        console.log(item)
        this.$linkToEasy(
          `./GarageDetail?companyId=${item.companyId}&inviterId=${this.userInfo.companyId}&type=1`,
        )
      },
      /**
       * 去地图页
       */
      goMapFn() {
        console.log(5555555555555555)
        // #ifdef H5
        this.$linkToEasy(
          `/pagesCommon/MapMarkers/MapMarkers?licenseId=${this.userInfo.licenseId}&inviterId=${this.userInfo.companyId}`,
        )
        // #endif
        // #ifdef APP-PLUS
        this.$linkToEasy(
          `/pagesCommon/MapMarkers/MapMarkersApp?licenseId=${this.userInfo.licenseId}&inviterId=${this.userInfo.companyId}`,
        )
        // #endif
      },
      /**
       * 邀请绑定手机号
       */
      openShare(item) {
        console.log(item)
        // this.shareParams.phone = item.userName
        // this.shareParams.type = 1 // 类型： 1、通联绑定；2、关系绑定
        // this.shareParams.userPhone = this.userInfo.userName
        // this.shareParams.inviteeId = item.companyId
        // this.shareParams.inviterId = this.userInfo.companyId
        // this.shareParams.shareName = item.storeName
        let param = {
          inviteUserId: this.userInfo.id,
          inviterId: this.userInfo.companyId,
          inviteeId: item.companyId,
          phone: item.userName,
          type: 1,
          userName: item.storeName,
        }
        this.shareParams = param
        this.$refs.sharePop.showShare('/pagesAgent/TokerDistrict/RegisterPage')
      },
      /**
       * 邀请注册
       */
      async openShareInvite() {
        this.params = {
          inviteUserId: this.userInfo.id,
          companyId: this.userInfo.companyId,
          userName: this.userInfo.storeName,
          roleCode: 'garage',
        }
        this.$refs.sharePop.showShare('/pages/ShareRegister')
        // let router = '/pages/ShareRegister'
        // if (!this.shareCode) {
        //   try {
        //     const { data } = await this.$VoHttp.apiShareLinkAdd({ shareInfo: JSON.stringify(this.params) })
        //     this.shareCode = data
        //   } catch (e) {
        //     this.$u.toast(e.message || '网络请求失败')
        //   }
        // }
        // this.$linkToEasy(`/pagesCommon/SharePoste/SharePoste?code=${this.shareCode}&router=${router}`)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .garage {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-map {
      margin-right: 32rpx;
      font-size: 28rpx;
      color: $v-c0-65;
      line-height: 42rpx;
    }
    &-tab {
      width: 750rpx;
      background-color: #ffffff;
      z-index: 2;
    }
    &-bt {
      padding: 10rpx 0rpx;
      text-align: center;
      border: 2rpx solid #ff5319;
      border-radius: 30rpx;
      color: #ff5319;
      font-size: 24rpx;
    }
  }
  .bottom {
    background-color: #fff;
    font-size: 32rpx;
    width: 750rpx;
    padding: 20rpx 32rpx;
    box-sizing: border-box;
    &-text1 {
      padding: 16rpx 0;
      box-sizing: border-box;
      border: 2rpx solid #d3d4db;
      border-radius: 196rpx;
      color: $v-c0-85;
      text-align: center;
    }
    &-text2 {
      padding: 20rpx 0;
      box-sizing: border-box;
      border-radius: 196rpx;
      color: #fff;
      background-color: #ff5319;
      text-align: center;
    }
  }
  .content {
    width: 750rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &-swiper {
      flex: 1;
      overflow: hidden;
      width: 100%;
      &__scroll {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
      }
    }
  }
  .short {
    padding: 10rpx 0rpx;
    text-align: center;
    border: 2rpx solid #ff5319;
    border-radius: 30rpx;
    color: #ff5319;
    font-size: 24rpx;
    width: 144rpx;
  }
  .long {
    padding: 10rpx 0rpx;
    text-align: center;
    border: 2rpx solid #ff5319;
    border-radius: 30rpx;
    color: #ff5319;
    font-size: 24rpx;
    width: 196rpx;
  }
</style>
