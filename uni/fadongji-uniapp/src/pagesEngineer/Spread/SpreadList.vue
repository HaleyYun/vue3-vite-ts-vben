<template>
  <view>
    <view class="page">
      <VoNav is-have-more>
        <block slot="title">
          <text
            :class="{ selected: currentSelected === 1 }"
            class="fz-36 nav_title"
            @click="handleSelect(1)"
            >修理厂<text class="fz-24">({{ info.garageNum }})</text></text
          >
          <text
            :class="{ selected: currentSelected === 2 }"
            class="fz-36 nav_title m-l-32"
            @click="handleSelect(2)"
            >集师傅<text class="fz-24">({{ info.technicianNum }})</text></text
          >
        </block>
        <block v-if="+currentSelected === 1" slot="operation">
          <view class="garage-map fz-28 color-block-65 m-r-20" @click="goMapFn">地图</view>
        </block>
      </VoNav>
      <scroll-view
        v-if="dataList && dataList.length"
        :refresher-threshold="10"
        :refresher-triggered="triggered"
        class="scroll-view"
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
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <view v-for="(item, index) in dataList" :key="index" class="spread_item m-t-16">
          <SpreadItem :data="item" @error="imgErr" :currentSelected="currentSelected" />
        </view>
        <view class="m-b-30" />
      </scroll-view>
      <VoNoData v-else />
      <view class="setting-bottom p-b-safe-area">
        <view class="setting-bottom__quit" @click="toInvite">{{ formateUser() }}</view>
      </view>
    </view>
    <VoShareQrCodeView ref="sharePop" :params="params" />
  </view>
</template>

<script>
  import { hideLoading, showLoading } from '../../common/helper'
  import SpreadItem from './components/SpreadItem.vue'
  import VoShareQrCodeView from '../../components/VoShareView/VoShareQrCodeView.vue'
  import devConf from '@/common/env'

  export default {
    components: {
      SpreadItem,
      VoShareQrCodeView,
    },
    data() {
      return {
        info: '', // 接收的邀请数
        orderProperty: '', // 排序属性
        orderType: '', // 排序类型

        currentSelected: 1,
        params: {},
        dataList: [
          {
            url: 'https://cdn.uviewui.com/uview/album/1.jpg',
            name: '江陵动力修理厂',
            lastDate: '2022-08-22',
            phoneNm: '132****1789',
            addr: '河南省郑州市金水区龙子湖街道中央广场',
          },
        ],
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1, // 页数，默认值 1
        pageSize: 10, // 每页条数，默认值 10
        total: 0,
        paramsWorker: '',
        paramsGarge: '',
      }
    },
    async onLoad(options) {
      if (options.redirectTo) {
        await this.getData()
        await this.initFn(true)
        return
      }
      if (options.info) {
        this.info = JSON.parse(options.info)
      }
      this.paramsWorker = options.workerCode || ''
      this.paramsGarge = options.garageCode || ''
      this.currentSelected = Number(options.defaultTab) || 1
      await this.initFn(true)
    },
    methods: {
      async getData() {
        try {
          const res = await this.$VoHttp.apiCompanyInfoTechnicianRelationCount()
          this.info = res.data
          const { data } = await this.$VoHttp.apiOrderSellQueryInviterCount()
          console.log(data)
          this.info.count = data
          this.$forceUpdate()
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      /**
       * 去地图页
       */
      goMapFn() {
        console.log(5555555555555555)
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
      // 图片加载失败处理
      imgErr() {
        // eslint-disable-next-line vue/no-mutating-props
        this.dataList.photoUrl = '/static/default_avatar.png'
      },
      handleSelect(val) {
        this.currentSelected = val
        this.initFn(true)
      },
      formateUser() {
        switch (this.currentSelected) {
          case 1:
            return '邀请修理厂'
          case 2:
            return '邀请集师傅'
          default:
            return '--'
        }
      },
      async toInvite() {
        let router = '/pages/ShareRegister'
        const { id, companyId, userName } = this.userInfo
        let params = {
          inviteUserId: id,
          companyId,
          userName,
        }
        let path
        try {
          if (this.currentSelected === 1) {
            if (!this.paramsGarge) {
              let paramsGarge = Object.assign({}, params)
              paramsGarge.roleCode = 'garage'
              let resGarge = await this.$VoHttp.apiShareLinkAdd({
                shareInfo: JSON.stringify(paramsGarge),
              })
              this.paramsGarge = resGarge.data
            }
            path = `/pagesCommon/SharePoste/SharePoste?code=${this.paramsGarge}&router=${router}`
          } else {
            let paramsWorker = Object.assign({}, params)
            paramsWorker.roleCode = 'skilledWorker'
            let resWorker = await this.$VoHttp.apiShareLinkAdd({
              shareInfo: JSON.stringify(paramsWorker),
            })
            this.paramsWorker = resWorker.data
            path = `/pagesCommon/SharePoste/SharePoste?code=${this.paramsWorker}&type=1&router=${router}`
          }
          this.$linkToEasy(path)
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      /**
       * 获取列表数据
       */
      initFn(refresh) {
        showLoading()
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.dataList = []
          this.pageNo = 1
        }
        let param = {
          orderProperty: this.orderProperty,
          orderType: this.orderType,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        let api = ''
        if (this.currentSelected === 1) {
          api = 'apiCompanyInfoTechnicianGaragePage'
        } else if (this.currentSelected === 2) {
          api = 'apiCompanyInfoTechnicianRelationPage'
        }
        this.$VoHttp[api](param)
          .then((res) => {
            console.log(res)
            let data = res.data.records
            this.total = res.data.total
            this.dataList = this.dataList.concat(data)
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            console.log(this.dataList)
            hideLoading()
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            hideLoading()
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
          this.initFn()
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
          this.initFn()
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
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    > :nth-child(2) {
      flex-grow: 1;
      overflow: auto;
    }
  }
  .nav_title {
    color: rgba(0, 0, 0, 0.45);
  }

  .selected {
    color: rgba(0, 0, 0, 0.85);
  }

  .scroll-view {
    .spread_item {
      box-sizing: border-box;
      background-color: #fff;
      padding: 24rpx 32rpx;
    }
  }

  .setting-bottom {
    height: 132rpx;
    width: 100%;
    background-color: #ffffff;
    &__quit {
      margin: 20rpx 47rpx;
      height: 92rpx;
      line-height: 92rpx;
      text-align: center;
      background-color: $color-primary-yellow;
      color: #ffffff;
      font-size: 32rpx;
      border-radius: 48rpx;
    }
  }
</style>
