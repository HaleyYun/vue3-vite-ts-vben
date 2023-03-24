<template>
  <view class="substitute">
    <view>
      <VoNav is-have-more title="代客下单" />
      <VoAlert v-if="false" icon-position="right" />
    </view>
    <view class="searchView">
      <VoSearch
        v-model="search"
        :showInsideAction="true"
        bgColor="#fff"
        borderColor="#FF5319"
        height="34"
        placeholder="输入修理厂名称搜索"
        @custom="searchData"
      />
    </view>
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      :scroll-y="orderList.length === 0 ? false : true"
      class="substitute__scroll flex1 overflow-y"
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
      <block v-if="orderList.length">
        <SubstituteOrder
          v-for="(item, index) of orderList"
          :key="index + 'SubstituteOrder'"
          :order="item"
          :type="type"
        />
        <VoLoadingText :has-more="hasMore" :loading="loading" />
      </block>
      <VoNoData v-if="!orderList.length && !refresh" no-data-tips="尚未绑定修理厂，快去邀请吧">
        <view class="noData-buttons" @click="toInvite">
          <view class="m-auto">邀请修理厂</view>
        </view>
      </VoNoData>
    </scroll-view>
    <!--    <view class="position-f">-->
    <!--      <VoShareQrCodeView ref="sharePop" :params="params" />-->
    <!--    </view>-->
  </view>
</template>

<script>
  import VoAlert from '@/components/VoAlert/VoAlert'
  import SubstituteOrder from './components/orderList'
  // import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView'

  export default {
    components: { VoAlert, SubstituteOrder },
    data() {
      return {
        search: '',
        orderList: [],
        triggered: false,
        refresh: true,
        loadingStatus: false,
        scrollTop: 0,
        total: 0,
        loading: true,
        hasMore: false,
        type: '',
        pageParams: {
          pageNo: 1,
          pageSize: 10,
          storeName: '',
        },
        params: {},
        shareCode: null,
      }
    },
    onLoad(options) {
      this.type = options.type
      this.params = {
        inviteUserId: this.userInfo.id,
        companyId: this.userInfo.companyId,
        userName: this.userInfo.userName,
        roleCode: 'garage',
      }
    },
    created() {
      this.getOrderList()
    },
    methods: {
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getOrderList()
        }
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
      },
      // 自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
      },
      //滚动时触发
      onScroll(e) {
        this.scrollTop = e.detail.scrollTop
      },
      //滚动到底部/右边
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.orderList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageParams.pageNo++
          this.getOrderList()
        }, 2000)
      },
      searchData() {
        this.pageParams.pageNo = 1
        this.pageParams.storeName = this.search
        this.orderList = []
        this.getOrderList()
      },

      async getOrderList() {
        // garagePage
        if (this.refresh) {
          this.orderList = []
          this.pageParams.pageNo = 1
        }
        this.loading = true
        const res = await this.$VoHttp.GOODS.apiCompanyInfoGaragePage(this.pageParams)
        if (!res || !res.data) return
        this.loading = false
        if (+res.code === 20001) {
          this.total = res.data.total
          this.orderList = this.orderList.concat(res.data.records)
          this.hasMore = this.pageParams.pageNo > 1 && this.orderList.length < this.total
        }
        this.triggered = false
        this.refresh = false
        this.loadingStatus = false
      },
      async toInvite() {
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
        // this.$refs.sharePop.showShare('/pages/ShareRegister')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .substitute {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &__scroll {
      flex: 1;
      height: 100%;
    }

    .searchView {
      background: #fff;
      padding: 8rpx 32rpx;
    }
  }
  .noData-buttons {
    padding-top: 30rpx;
    text-align: center;
    view {
      display: inline-block;
      font-size: 32rpx;
      color: $color-primary-yellow;
      padding: 20rpx 70rpx;
      border: 2rpx solid $color-primary-yellow;
      border-radius: 100rpx;
    }
  }
</style>
