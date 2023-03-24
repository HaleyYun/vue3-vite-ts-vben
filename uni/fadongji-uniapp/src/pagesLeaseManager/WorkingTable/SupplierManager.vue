<template>
  <view>
    <view class="manager bg flex flex-column">
      <VoNav is-fixed isHaveMore title="供应商管理">

      </VoNav>
      <!--  搜索  -->
      <view class="manager-search bg-white flex flex-vertical-c">
        <VoSearch
          v-model.trim="keyword"
          height="34"
          placeholder="请输入搜索"
          bgColor="#fff"
          borderColor="#FF5319"
          :actionStyle="{color:'#fff'}"
          :showInsideAction="true"
          @search="searchData" />
      </view>
      <view class="manager-tabs">
        <EraTabs
          :current="currentTab"
          :list="tabsList"
          activeStyle="color: #FF5319;font-weight: bold;font-size: 32rpx;"
          inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 28rpx;"
          line-color="#FF5319"
          @click="changeTabFn"
        />
      </view>
      <swiper
        :circular="false"
        :current="currentTab"
        class="content-swiper flex1"
        @change="changeSwiperFn"
      >
        <swiper-item v-for="item in tabsList" :key="item.id">
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
            <view v-for="item in cardList" :key="item.id" @click="goSupplierDetail(item)">
              <NotCertified :info="item">
                <view
                  v-if="item.checkStatus === 2 && !item.isBindMobile"
                  class="manager-bt m-t-32"
                  @click.stop="openShare(item)"
                >
                  邀请绑定手机号
                </view>
                <view
                  v-if="item.checkStatus === 3"
                  class="manager-bt m-t-32"
                  @click.stop="modifyCreateSupplier(item)"
                  >修改认证信息</view
                >
                <view
                  v-if="item.checkStatus === 2 && item.isBindMobile"
                  class="manager-lr m-t-32"
                  @click.stop="showPopup(item)"
                >
                  审核
                </view>
                <view v-if="item.checkStatus === 4" class="flex flex-vertical-c m-t-32">
                  <view v-if="!item.brandStatus" class="manager-bt" @click.stop="BindingBrand">
                    绑定品牌
                  </view>
                  <view
                    v-if="!item.categoryStatus"
                    class="manager-bt m-l-12"
                    @click.stop="BindingCategory"
                  >
                    绑定品类
                  </view>
                  <view class="manager-bt m-l-12" @click.stop="unBinding(item)">解除绑定</view>
                </view>
              </NotCertified>
            </view>
            <VoLoadingText :has-more="hasMore" :loading="loading" />
          </scroll-view>
        </swiper-item>
      </swiper>
      <view class="bottom flex flex-row flex-vertical-c">
        <view class="bottom-text1 flex1 m-r-18" @click="openShareInvite">邀请供应商</view>
        <view
          class="bottom-text2 flex1 m-l-18"
          @click="goTo('/pagesLeaseManager/HomePage/CreateSupplier')"
          >创建供应商</view
        >
      </view>
      <VoSafetyArea :is-fixed="false" />
      <PopupServiceManager ref="PopupServiceManager" :cur="curClick" @success="init" />
    </view>
    <!--  解除绑定弹框  -->
    <VoModal
      :closeOnClickOverlay="true"
      :show="showUnBinding"
      cancelText="再想想"
      confirmText="确定"
      content="确定要与该供应商解除绑定关系吗？"
      showCancelButton
      @cancel="showUnBinding = false"
      @confirm="bindConfirm"
    />
    <VoShareQrCodeView ref="sharePop" :params="shareParams">
      <EraButton
        circle
        text="手动创建"
        @click="goTo('/pagesLeaseManager/HomePage/CreateSupplier')"
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
    name: 'SupplierManager',
    components: { NotCertified, PopupServiceManager, VoShareQrCodeView },
    data() {
      return {
        loading: false,
        hasMore: true,
        triggered: false, // 下拉刷新判断布尔值
        refresh: false, // 下拉刷新判断布尔值
        loadingStatus: false, // 下拉刷新防抖
        keyword: '', // 搜索双向绑定
        currentTab: 0, // 横向tabs默认
        tabsList: [], // tab按钮列表
        cardList: [], // 数据列表
        curClick: {}, // 当前点击审核对象
        // 分页
        pages: {
          pageNo: 1,
          pageSize: 20,
        },
        total: 0, // 总页数
        shareParams: {}, // 分享参数
        showUnBinding: false,
        shareCode: '',
      }
    },
    onLoad() {
      this.init()
      console.log(this.userInfo)
      this.shareParams = {
        inviteUserId: this.userInfo.id,
        companyId: this.userInfo.companyId,
        phone: this.userInfo.userName,
        roleCode: 'supplier',
      }
    },
    methods: {
      unBinding(item) {
        this.curClick = item
        this.showUnBinding = true
      },
      // 解除绑定
      bindConfirm() {
        showLoading()
        console.log(this.curClick);
        this.$VoHttp
          .apiCompanyInfoRemoveBind$Id({ id: this.curClick.companyId })
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('解除成功', 'success', '/static/icons/success_icon.png')
              this.showModalRelieve = false
              setTimeout(() => {
                this.total = 0
                this.cardList = []
                this.pages.pageNo = 1
                this.init()
              }, 1500)
            }
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络请求失败')
          })
          .finally(() => {
            hideLoading()
            this.showUnBinding = false
          })
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
          const { data } = await this.$VoHttp.apiCompanyInfoManagerTab({
            platformCode: 'supplier',
            companyId,
          })
          let arr = []
          data.forEach((item) => {
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
        if (this.loading) {
          return
        }
        this.loading = true
        showLoading()
        const { companyId, licenseId } = this.userInfo
        const { pageNo, pageSize } = this.pages
        let params = {
          bindingType: 1,
          platformCode: 'supplier',
          inviterId: companyId,
          licenseId,
          keywords: this.keyword || '',
          pageNo,
          pageSize,
        }
        params.checkStatus = this.tabsList[this.currentTab].status
        try {
          const { data } = await this.$VoHttp.apiCompanyInfoManagerPage(params)
          console.log(data)
          this.total = data.total
          this.cardList = [...this.cardList, ...data.records]
          console.log(this.cardList)
          this.hasMore = this.cardList.length < data.total
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
        }
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
      /**
       *  滑动swiper
       */
      changeSwiperFn(e) {
        this.currentTab = Number(e.detail.current)
        this.cardList = []
        this.pages.pageNo = 1
        this.getListData()
      },
      /**
       * 点击tab事件
       * @param e  触发的事件
       */
      changeTabFn(e) {
        this.currentTab = e.index
        // this.cardList = []
        // this.pages.pageNo = 1
        // this.getListData()
      },
      /**
       * 供应商审核弹窗
       */
      showPopup(cur) {
        console.log(this.curClick)
        this.curClick = cur
        this.$refs.PopupServiceManager.showPop()
      },
      /**
       * 修改供应商资料
       */
      modifyCreateSupplier(item) {
        if (this.loading) return
        this.loading = true
        showLoading()
        this.$VoHttp
          .apiCompanyInvitationAuthInfo({ companyId: item.companyId })
          .then((res) => {
            console.log(res)
            let url = '/pagesCommon/StoreInfo/CustomEdit?data='
            const { failureStatus, companyId } = res.data
            if (failureStatus < 4) {
              let data = { failureStatus, companyId, source: 'supplier' }
              this.$linkToEasy(url + JSON.stringify(data))
            } else {
              this.$linkToEasy(`/pagesLeaseManager/HomePage/CreateSupplier?id=${item.companyId}`)
            }
            // if (failureStatus === 5) {
            //   // 通联失败，手机号都要改，所以重新创建
            //   this.$linkToEasy('/pagesLeaseManager/HomePage/CreateSupplier')
            // } else
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络请求失败')
          })
          .finally(() => {
            this.loading = false
            hideLoading()
          })
      },
      /**
       * 去供应商详情
       * @param item
       */
      goSupplierDetail(item) {
        console.log(111)
        console.log(item)
        this.$linkToEasy(
          `./SupplierDetail?companyId=${item.companyId}&inviterId=${this.userInfo.companyId}`,
        )
      },
      /**
       * 绑定品牌
       * @constructor
       */
      BindingBrand() {
        this.$linkToEasy('/pagesLeaseManager/WorkingTable/OperateBrand')
      },
      /**
       * 绑定品类
       * @constructor
       */
      BindingCategory() {
        this.$linkToEasy('/pagesLeaseManager/WorkingTable/BusinessCategory')
      },
      /**
       * 邀请绑定手机号
       */
      openShare(item) {
        this.shareParams = {}
        this.shareParams.type = 1 // 类型： 1、通联绑定；2、关系绑定
        this.shareParams.userPhone = item.userName
        this.shareParams.status = 0
        this.shareParams.inviteeId = item.companyId
        this.shareParams.inviterId = this.userInfo.companyId
        this.shareParams.shareName = item.storeName
        this.$refs.sharePop.showShare('/pagesChannelManager/HomePage/AuthenticationCompleted')
      },
      /**
       * 邀请注册
       */
      async openShareInvite() {
        this.shareParams = {
          inviteUserId: this.userInfo.id,
          companyId: this.userInfo.companyId,
          userName: this.userInfo.storeName,
          roleCode: 'supplier',
        }
        this.$refs.sharePop.showShare('/pages/ShareRegister')
        // let router = '/pages/ShareRegister'
        // if (!this.shareCode) {
        //   try {
        //     const { data } = await this.$VoHttp.apiShareLinkAdd({ shareInfo: JSON.stringify(this.shareParams) })
        //     this.shareCode = data
        //   } catch (e) {
        //     this.$u.toast(e.message || '网络请求失败')
        //   }
        // }
        // this.$linkToEasy(`/pagesCommon/SharePoste/SharePoste?code=${this.shareCode}&router=${router}`)
        // this.$refs.sharePop.showShare('/pagesLeaseManager/HomePage/CreateSupplier')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .manager {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    background-color: #f7f7f8;
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
</style>
