<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="invoiceList flex flex-column"
  >
    <VoNav isHaveMore title="开发票" />

    <EraTabs
      :current="current"
      :lineBottom="0"
      :list="tabList"
      class="invoiceList-tabs"
      itemStyle="width: 206rpx; height: 96rpx;"
      @click="tabClick"
    />

    <swiper :autoplay="false" :current="current" class="invoiceList-swiper" @change="changeSwiper">
      <swiper-item v-for="swiper in tabList" :key="swiper.name">
        <scroll-view
          :refresher-threshold="10"
          :refresher-triggered="triggered"
          class="invoiceList-swiper__item"
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
          <view v-for="(item, index) in infoList" :key="index">
            <view class="h16" />
            <InvoiceItem
              :invoicey-data="item"
              @openInvoice="openInvoice(item)"
              @click.native="invoiceDetail(item)"
            />
          </view>
          <VoNoData v-if="!infoList.length && !loadingStatus" />
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import InvoiceItem from './components/InvoiceItem'

  export default {
    components: {
      InvoiceItem,
    },
    data() {
      return {
        current: 0,
        tabList: [{ name: '全部' }, { name: '待开票' }, { name: '已开票' }],
        infoList: [],
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
      }
    },
    onLoad() {
      uni.$off('refresh')
      uni.$on('refresh', () => {
        this.getData(true)
      })
      this.getData(true)
    },
    methods: {
      tabClick(e) {
        this.current = e.index
      },
      changeSwiper(e) {
        this.current = e.detail.current
        this.getData(true)
      },
      /**
       * 开票
       */
      openInvoice(item) {
        //ownerType：1企业2个人
        this.$linkToEasy(
          `/pagesSupplier/UserCenter/Invoice/CreateInvoice?id=${item.id}&ownerType=${item.ownerType}`,
        )
      },
      /**
       *发票详情
       */
      invoiceDetail(item) {
        this.$linkToEasy('/pagesSupplier/UserCenter/Invoice/InvoiceDetail?id=' + item.id)
      },
      //获取列表数据
      getData(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        if (this.current) {
          params.invoiceStatus = this.current
        }
        this.$VoHttp
          .apiInvoiceSelectList(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records
              this.total = res.data.total
              this.infoList = this.infoList.concat(data)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            uni.$u.toast(err.message || '请检查网络')
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
          this.getData()
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.infoList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.getData()
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
        this.$emit('onScroll', e)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invoiceList {
    width: 750rpx;
    height: 100vh;
    &-tabs {
      background-color: #ffffff;
    }
    &-swiper {
      flex: 1;

      &__item {
        height: 100%;
      }
      &__item1 {
        height: 100%;
        background-color: #00bb00;
      }
      &__item2 {
        height: 100%;
        background-color: #00ffff;
      }
    }
  }
</style>
