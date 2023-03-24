<template>
  <view class="manager bg">
    <view class="flex flex-column flex1 w-full h-full">
      <!--  头部  -->
      <VoNav is-fixed isHaveMore title="服务商管理">

      </VoNav>
      <!--  搜索  -->
      <view class="search-wrap">
        <VoSearch
          v-model.trim="keyword"
          placeholder="请输入搜索"
          height="34"
          @custom="searchData"
          @search="searchData"
        />
      </view>
      <EraTabs
        :current="currentTab"
        :list="tabsList"
        activeStyle="color: #FF5319;font-weight: bold;font-size: 32rpx;"
        class="garage-tab"
        inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 28rpx;"
        line-color="#FF5319"
        @click="changeTabFn"
      />
      <swiper
        :circular="false"
        :current="currentTab"
        class="content-swiper flex1"
        @change="changeSwiperFn"
      >
        <swiper-item v-for="item in tabsList" :key="item.id">
          <scroll-view
            :refresher-enabled="true"
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
              @click.native="goManagerDetail(item)"
            >
              <view
                v-if="item.checkStatus === 2 && !item.isBindMobile"
                class="manager-bt m-t-32"
                @click.stop="inviteBind(item)"
                >邀请绑定手机号</view
              >
              <view
                v-if="item.checkStatus === 3"
                class="manager-bt m-t-32"
                @click.stop="goCreateService(item)"
                >修改认证信息</view
              >
              <view
                v-if="item.checkStatus === 2 && item.isBindMobile"
                class="manager-lr m-t-32"
                @click.stop="showPopup(item)"
                >审核</view
              >
            </NotCertified>
            <VoLoadingText v-if="cardList.length" :has-more="hasMore" :loading="loading" />
            <VoNoData v-if="!cardList.length && !refresh" no-data-tips="暂无数据" />
          </scroll-view>
        </swiper-item>
      </swiper>

      <view class="bottom flex flex-justify-between p-b-safe-area">
        <view class="bottom-btn1" @click="inviteSupply">邀请服务商</view>
        <view class="bottom-btn2" @click="goCreateChooseType">创建服务商</view>
        <!--        <view class="bottom-text1 flex1 m-r-18" @click="inviteSupply">邀请服务商</view>-->
        <!--        <view class="bottom-text2 flex1 m-l-18" @click="goCreateChooseType">创建服务商</view>-->
      </view>
      <VoSafetyArea :is-fixed="false" />
    </view>
    <PopupServiceManager ref="setManagerPopup" :cur="curClick" @success="init" />
    <VoShareQrCodeView ref="sharePop" :params="shareParams">
      <EraButton
        circle
        text="手动创建"
        @click="goTo('/pagesChannelManager/HomePage/CreateChooseType')"
      />
    </VoShareQrCodeView>
  </view>
</template>

<script>
  import NotCertified from './components/NotCertified'
  import PopupServiceManager from './components/PopupServiceManager'
  import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView'
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'ServiceManager',
    components: { NotCertified, PopupServiceManager, VoShareQrCodeView },
    data() {
      return {
        loading: false,
        hasMore: true,
        triggered: false, // 下拉刷新判断布尔值
        refresh: false, // 下拉刷新判断布尔值
        loadingStatus: false, // 下拉刷新防抖
        curClick: {}, // 当前点击审核对象
        keyword: '', // 搜索双向绑定
        currentTab: 0, // 横向tabs默认
        scrollTop: 0,
        // 分页
        pages: {
          pageNo: 1,
          pageSize: 20,
        },
        total: 0, // 总页数
        shareParams: {}, // 分享参数
        isShowPopup: false,
        // tab按钮列表
        tabsList: [],
        // 数据列表
        cardList: [],
      }
    },
    methods: {
      /**
       *  滑动swiper
       */
      changeSwiperFn(e) {
        this.currentTab = Number(e.detail.current)
        this.pages.pageNo = 1
        this.cardList = []
        this.getListData()
      },
      /**
       * 点击tab事件
       * @param e  触发的事件
       */
      changeTabFn(e) {
        this.currentTab = e.index
        // this.pages.pageNo = 1
        // this.cardList = []
        // this.getListData()
      },
      // 审核弹窗
      showPopup(cur) {
        console.log('showPopup')
        this.curClick = cur
        this.$refs.setManagerPopup.showPop()
      },
      /**
       * 修改服务商资料
       */
      goCreateService(item) {
        if (this.loading) return
        this.loading = true
        showLoading()
        this.$VoHttp
          .apiCompanyInvitationAuthInfo({ companyId: item.companyId })
          .then((res) => {
            console.log(res)
            const { failureStatus, companyId } = res.data
            let url
            if (res.data.companyType === 3) {
              url = `/pagesChannelManager/HomePage/CreateService?id=${companyId}&type=3`
              this.$linkToEasy(url)
            } else if (res.data.companyType === 2) {
              url = '/pagesCommon/StoreInfo/CustomEdit?data='
              if (failureStatus < 4) {
                // 营业执照失败、身份证失败等
                let data = { failureStatus, companyId, source: 'agent' }
                this.$linkToEasy(url + JSON.stringify(data))
              } else {
                // 其它认证失败
                url = `/pagesChannelManager/HomePage/CreateService?id=${companyId}&type=2`
                this.$linkToEasy(url)
              }
              // if (failureStatus === 5) {
              //   // 通联失败，手机号都要改，所以重新创建
              //   this.$linkToEasy('/pagesChannelManager/HomePage/CreateChooseType')
              // } else
            }
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络请求失败')
          })
          .finally(() => {
            this.loading = false
            hideLoading()
          })
      },
      /**
       * 创建服务商资料
       */
      goCreateChooseType() {
        this.$linkToEasy('/pagesChannelManager/HomePage/CreateChooseType')
      },
      /**
       * 邀请服务商
       */
      inviteSupply() {
        this.shareParams = {
          inviteUserId: this.userInfo.id,
          companyId: this.userInfo.companyId,
          userName: this.userInfo.storeName,
          roleCode: 'agent',
        }
        this.$refs.sharePop.showShare('/pages/ShareRegister')
        // this.$refs.sharePop.showShare('/pagesChannelManager/HomePage/CreateService')

      },
      /**
       * 邀请绑定手机号
       */
      inviteBind(item) {
        this.shareParams = {}
        this.shareParams.type = 1 // 类型： 1、通联绑定；2、关系绑定
        this.shareParams.inviteUserId = this.userInfo.id
        this.shareParams.userPhone = item.userName
        this.shareParams.status = 0
        this.shareParams.inviteeId = item.companyId
        this.shareParams.inviterId = this.userInfo.companyId
        // this.shareParams.shareName = item.storeName
        this.$refs.sharePop.showShare('/pagesChannelManager/HomePage/AuthenticationCompleted')
      },
      /**
       * 去服务商详情
       * @param item
       */
      goManagerDetail(item) {
        console.log(111)
        this.$linkToEasy(
          `./ServiceDetails?companyId=${item.companyId}&inviterId=${this.userInfo.companyId}`,
        )
      },
      // 页面跳转方法
      goTo(url) {
        this.$linkToEasy(url)
      },
      async init() {
        await this.getTabs()
        await this.getListData()
      },
      // 获取tabs
      async getTabs() {
        const { companyId } = this.userInfo
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerTab({
            platformCode: 'agent',
            companyId,
          })
          let arr = []
          data.data.forEach((item) => {
            let obj = {}
            obj.name = item.checkStatusStr
            obj.status = item.checkStatus
            obj.count = item.count
            arr.push(obj)
          })
          this.tabsList = arr
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      // 获取列表数据
      async getListData() {
        this.loading = true
        showLoading()
        const { companyId, licenseId } = this.userInfo
        const { pageNo, pageSize } = this.pages
        let params = {
          bindingType: 1,
          platformCode: 'agent',
          inviterId: companyId,
          licenseId,
          keywords: this.keyword || '',
          pageNo,
          pageSize,
        }
        params.checkStatus = this.tabsList[this.currentTab].status
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerPage(params)
          console.log(data)
          this.total = data.data.total
          this.cardList = [...this.cardList, ...data.data.records]
          console.log(this.cardList);
          this.hasMore = this.cardList.length < data.data.total
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
        this.loading = false
      },
      // 搜索
      searchData(keywords) {
        this.keyword = keywords
        this.reFresh()
      },
      reFresh() {
        this.pages.pageNo = 1
        this.cardList = []
        this.getListData()
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
          this.getTabs()
        }
        setTimeout(() => {
          this.triggered = false
          this.refresh = false
          this.loadingStatus = false
        }, 500)
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
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
        // this.$emit('onScroll', e)
      },
    },
    onLoad() {
      this.init()
      this.shareParams = {
        inviteUserId: this.userInfo.id,
        companyId: this.userInfo.companyId,
        phone: this.userInfo.userName,
        roleCode: 'agent',
        shareName: this.userInfo.storeName,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .manager {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-search {
      padding: 12rpx 32rpx;
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
      padding: 10rpx 24rpx;
      box-sizing: border-box;
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
  .bottom {
    background-color: #fff;
    font-size: 32rpx;
    width: 750rpx;
    padding: 20rpx 32rpx;
    box-sizing: border-box;
    &-text1 {
      padding: 22rpx 0;
      box-sizing: border-box;
      border: 2rpx solid #ff5319;
      border-radius: 196rpx;
      color: #ff5319;
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
  .garage-tab {
    width: 750rpx;
    background-color: #ffffff;
    z-index: 2;
  }
  .search-wrap {
    padding: 12rpx 32rpx;
    box-sizing: border-box;
    background: #fff;
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
      margin-top: 16rpx;
      &__scroll {
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
      }
    }
  }
  .bottom-btn1 {
    border: 2rpx solid #d3d4db;
    background-color: #fff;
    width: 324rpx;
    line-height: 80rpx;
    font-size: 32rpx;
    color: $v-c0-85;
    border-radius: 196rpx;
    text-align: center;
  }
  .bottom-btn2 {
    border: 2rpx solid #ff5319;
    background-color: #ff5319;
    width: 324rpx;
    line-height: 80rpx;
    font-size: 32rpx;
    color: #fff;
    border-radius: 196rpx;
    text-align: center;
  }
</style>
