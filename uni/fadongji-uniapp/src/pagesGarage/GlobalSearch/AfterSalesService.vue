<template>
  <view class="sales p-b-safe-area">
    <!--    <VoBatteryBar />-->
    <VoNav :left-width="200" :right-width="280" is-fixed isHaveMore title="售后服务">
      <block slot="operation">
        <view class="fz-24 nav_button m-r-20" @click="$linkToEasy('/pagesGarage/PostSaleService/ApplyPostSaleList')">售后记录</view>
      </block>
    </VoNav>
    <block v-if="searchPostSaleData && searchPostSaleData.length">
      <!--        <AfterSales v-for="(item, index) in searchPostSaleData" :key="index" :itemData="item"  :code="code"/>-->
      <scroll-view
        class="overflow-y bg-white flex1"
        scroll-y
        :refresher-threshold="10"
        :refresher-triggered="triggered"
        refresher-background="#F7F7F8"
        refresher-default-style="none"
        refresher-enabled="true"
        scroll-top="0"
        @refresherabort="onAbort"
        @refresherpulling="onPulling"
        @refresherrefresh="onRefresh"
        @refresherrestore="onRestore"
        @scroll="scrollHandler"
        @scrolltolower="scrolltolower"
      >
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <view class="line-18" />
        <view v-for="(itemData, index) in searchPostSaleData" :key="index" class="after">
          <view class="lh42 fz-28 color-block-65">下单时间：{{ itemData.createTime }}</view>
          <view class="flex flex-vertical-c m-t-32">
            <VoIcon name="smile-m" @click.stop="goImUrl(itemData)" />
            <view
              class="fz-28 color-block-main m-l-8"
              @click.stop="
                  $linkToEasy(
                    '/pagesAgent/InvestmentList/ShopDetails?companyId=' +
                      itemData.goodsDetail[0].shopId,
                  )
                "
            >
              {{ itemData.shopName }}
            </view>
            <VoIcon :size="16" name="right-arrow" />
          </view>
          <view v-if="itemData.goodsDetail[0].goodsName" class="m-t-16 flex">
            <block v-if="itemData.goodsDetail[0].pic.length">
              <block v-if="itemData.goodsDetail[0].pic[0].split('.').pop() === 'mp4'">
                <image :src="`${itemData.goodsDetail[0].pic[0]}&type=3`" class="after-photo" />
              </block>
              <image
                v-else
                :src="itemData.goodsDetail[0].pic[0] + '&type=1'"
                class="after-photo"
              />
            </block>
            <!--      <image class="after-photo" :src="itemData.goodsDetail[0].pic[0] + '&type=1'" />-->
            <view class="flex1 m-l-16">
              <view class="after-name">
                <text v-show="itemData.goodsDetail[0].categoryType" class="good-tips m-r-8">
                  {{ itemData.goodsDetail[0].categoryType }}
                </text>
                {{ itemData.goodsDetail[0].goodsName }}
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view class="flex flex-vertical-c">
                  <view class="tips">
                    {{
                      itemData.goodsDetail[0].periodDays > 0
                        ? `${itemData.goodsDetail[0].periodDays}天账期`
                        : '现金价'
                    }}
                  </view>
                  <VoPointPrice
                    :leftSize="14"
                    :showUnit="true"
                    class="lh42"
                    color="#F20014"
                    :price="itemData.goodsDetail[0].payPrice || 0"
                  />
                </view>
                <view class="fz-24 color-block-45"
                >x{{ itemData.goodsDetail[0].goodsCount }}</view
                >
              </view>
            </view>
          </view>
          <view class="m-t-32 flex flex-justify-r">
            <view class="after-sales flex flex-vertical-c flex-justify-c" @click="goOnline">
              <VoIcon :size="20" name="smile-m" />
              <view>售后服务</view>
            </view>
            <view
              class="after-rapid"
              @click="
                  $linkToEasy(
                    `/pagesGarage/PostSaleService/ApplyPostSaleService?id=${itemData.id}&engineNo=${code}`,
                  )
                "
            >极速售后</view
            >
          </view>
        </view>
        <VoLoadingText
          :loading="loading"
          :has-more="searchPostSaleData.length <= total"
          noMoreText="暂无更多数据"
        />
      </scroll-view>
    </block>
    <VoNoData v-else no-data-tips="暂无数据" />
  </view>
</template>

<script>
  // import AfterSales from './components/AfterSales'
  import { mapGetters } from 'vuex'
  import { goOnlineCustomerFn } from '@/common/helper'

  export default {
    name: 'AfterSalesService',
    // components: { AfterSales },
    data() {
      return {
        code: '', //文字识别出的字符串
        searchPostSaleData: [],
        loading: false,
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        total: 0,
        pageQuery: {
          pageNo: 1,
          pageSize: 10,
        },
      }
    },
    // computed: {
    //   ...mapGetters('search', ['searchPostSaleResultGetter']),
    // },
    // watch: {
    //   searchPostSaleResultGetter: {
    //     deep: true,
    //     immediate: true,
    //     handler(val) {
    //       if (val) {
    //         this.searchPostSaleData = val
    //       }
    //     },
    //   },
    // },
    onLoad(opt) {
      this.code = opt.code
      this.getList(1)
    },
    methods: {
      getList(init) {
        if (this.loading) return
        let param = {
          code: this.code,
        }
        this.loading = !this.loading
        if (init) {
          this.pageQuery.pageNo = 1
          this.searchPostSaleData = []
        }
        this.$VoHttp
          .apiBusinessVehicleScanGetgoodsbyno({ ...param, ...this.pageQuery })
          .then((res) => {
            console.log(res)
            if (!res || !res.data || !res.data.length) {
              this.loading = false
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              return
            }
            this.searchPostSaleData = [...this.searchPostSaleData, ...res.data]
            console.log(this.searchPostSaleData)
            this.total = res.data.total || 0
          })
          .catch((e) => {
            uni.$u.toast(e.message)
          })
          .finally(() => {
            this.loading = false
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
          })
      },
      goImUrl(itemData) {
        const data = {
          targetId: itemData.shopUserId,
          type: 0,
          note: itemData.goodsDetail[0].shopName,
          platformCode: itemData.shopPlatformCode,
        }
        this.$storage.set('temp_im_room_info', data)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      goOnline() {
        goOnlineCustomerFn(2)
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
        console.log(e);
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
        setTimeout(() => {
          this.loadingStatus = false
        }, 2000)
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
          this.getList(1)
          // setTimeout(() => {
          //   this.triggered = false
          //   this.refresh = false
          //   this.loadingStatus = false
          // }, 500)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        // uni.$u.throttle(() => {
        // }, 2000)
        console.log('底部加载')
        this.refresh = false
        if (this.searchPostSaleData.length >= this.total) {
          return
        }
        this.pageQuery.pageNo += 1
        this.getList()
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
      // 滑动触发判断是否固定
      scrollHandler({ detail: { scrollTop } }) {
        this.scrollTop = scrollTop
        // if (scrollTop >= 205 && !this.fixedTop) {
        //   this.fixedTop = true
        // }
        // if (scrollTop < 205 && this.fixedTop) {
        //   this.fixedTop = false
        // }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sales {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .nav_button {
      padding: 12rpx 30rpx;
      color: #ff5319;
      border: 1rpx solid #ff5319;
      border-radius: 200rpx;
    }
    .after {
      padding: 24rpx 32rpx 32rpx;
      &-photo {
        width: 160rpx;
        height: 160rpx;
        border-radius: 8rpx;
        overflow: hidden;
        display: block;
      }
      &-name {
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
        color: #22284b;
      }
      &-sales {
        width: 184rpx;
        height: 56rpx;
        box-sizing: border-box;
        border: 2rpx solid #22284b;
        border-radius: 100rpx;
        font-size: 24rpx;
        margin-right: 32rpx;
      }
      &-rapid {
        width: 160rpx;
        height: 56rpx;
        line-height: 56rpx;
        text-align: center;
        box-sizing: border-box;
        border: 2rpx solid #ff5319;
        border-radius: 56rpx;
        color: #ff5319;
        font-size: 24rpx;
      }
      .tips {
        padding: 0 4rpx;
        height: 28rpx;
        line-height: 28rpx;
        text-align: center;
        background: #ffe5e8;
        border: 2rpx solid #fa3243;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #fa3243;
        margin-right: 8rpx;
      }
      .good-tips {
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        color: $color-primary-yellow;
        padding: 0 12rpx;
        background: $v-tags-btn-disabled;
        border-radius: 24rpx;
      }
    }
  }
</style>
