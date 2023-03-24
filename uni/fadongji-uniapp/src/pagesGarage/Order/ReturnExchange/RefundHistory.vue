<template>
  <view class="return flex flex-column">
    <VoNav is-fixed title="退货/退款" is-have-more>
      <template #operation>
        <VoIcon class="m-r-32" name="urge" color="#000000" :opacity="0.45" />
      </template>
    </VoNav>
    <view class="return-search flex flex-vertical-c" @click="goSearchPage">
      <VoSearch placeholder="请输入搜索" height="34" v-model="keyword" />
    </view>
    <view class="return-box">
      <EraSubsection
        :list="list"
        :current="currentTab"
        @change="sectionChange"
        activeColor="rgba(0, 0, 0, 0.85)"
        inactiveColor="rgba(0, 0, 0, 0.45)"
        customStyle="background-color: #f7f7f8"
      />
    </view>
    <swiper class="flex1" :autoplay="false" :current="currentTab" @change="changeSwiper">
      <swiper-item>
        <scroll-view class="return-scroll flex1" :scroll-y="true">
          <ReturnGoods
            v-for="info of returnGoodsList"
            :key="info.id"
            :return-goods-list="info"
            @checkDetails="checkDetails"
          />
          <u-loadmore class="p-b-16" :status="status" line fontSize="12" />
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view class="return-scroll flex1" :scroll-y="true">
          <ReturnGoods
            v-for="info of returnGoodsList"
            :key="info.id"
            :return-goods-list="info"
            @checkDetails="checkDetails"
          />
          <u-loadmore class="p-b-16" :status="status" line fontSize="12" />
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view class="return-scroll flex1" :scroll-y="true">
          <ReturnGoods
            v-for="info of returnGoodsList"
            :key="info.id"
            :return-goods-list="info"
            @checkDetails="checkDetails"
          />
          <u-loadmore class="p-b-16" :status="status" line fontSize="12" />
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  import ReturnGoods from './components/ReturnGoods'
  export default {
    name: 'ReturnExchange',
    components: { ReturnGoods },
    data() {
      return {
        status: 'noMore',
        keyword: '',
        currentTab: 0,
        list: ['全部', '进行中', '已完成'],
        returnGoodsList: [],
      }
    },
    onLoad() {
      this.returnExchangeRequest()
    },
    methods: {
      /**
       * 去搜索页
       */
      goSearchPage() {
        this.$linkToEasy('/pagesGarage/Order/ReturnExchange/SearchPage')
      },
      sectionChange(index) {
        this.currentTab = index
      },
      changeSwiper(e) {
        this.currentTab = e.detail.current
        this.returnGoodsList = []
        this.refresh = false
        this.returnExchangeRequest()
      },
      /**
       * 去去查看详情
       */
      checkDetails(data) {
        // 仅退款详情页面
        if (data.isRefundOnly) {
          this.$linkToEasy('/pagesGarage/Order/ReturnExchange/RefundDetails?id=' + data.id)
          return
        }
        // 退货/退款详情页面
        this.$linkToEasy('/pagesGarage/Order/ReturnExchange/ReturnRefundDetails?id=' + data.id)
      },
      /**
       * 退货列表接口请求
       */
      returnExchangeRequest() {
        let isfresh = this.refresh
        if (isfresh) {
          this.returnGoodsList = []
          this.pageNo = 1
        }
        let params = {
          status: this.currentTab,
          pageNo: 1,
          pageSize: 20,
          type: '4',
        }
        this.$VoHttp
          .apiRefundQueryList(params)
          .then((res) => {
            if (res.code === '20001') {
              console.log('退货数据', res)
              let resultData = res.data.records
              this.total = res.data.total
              this.returnGoodsList = this.returnGoodsList.concat(resultData)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            } else {
              uni.$u.toast(res.message || '退货获取失败')
              this.loadingStatus = false
              this.triggered = false
              this.refresh = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('退货获取失败')
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .return {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-search {
      padding:8rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-box {
      background: #ffffff;
      width: 750rpx;
      padding: 14rpx 32rpx 22rpx;
      box-sizing: border-box;
    }
    &-scroll {
      height: 100%;
    }
  }
</style>
