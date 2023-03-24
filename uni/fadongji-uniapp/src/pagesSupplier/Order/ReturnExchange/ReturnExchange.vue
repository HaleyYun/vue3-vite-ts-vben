<template>
  <view class="return flex flex-column">
    <VoNav is-fixed is-have-more title="退货/退款">
      <block slot="operation">
        <VoIcon :size="24" class="m-r-32" color="#155BD4" name="warranty" @click="afterInfoClick" />
      </block>
    </VoNav>
    <view class="return-search flex flex-vertical-c">
      <VoSearch
        v-model.trim="keyword"
        placeholder="请输入搜索"
        height="34"
        borderColor="#FF5319"
        bgColor="#fff"
        :actionStyle="{color:'#fff'}"
        :showInsideAction="true"
        @custom="goSearchPage"
        @search="goSearchPage"
      />
    </view>
    <view class="return-box">
      <EraSubsection
        :current="currentTab"
        :list="list"
        activeColor="rgba(0, 0, 0, 0.85)"
        customStyle="background-color: #f7f7f8"
        inactiveColor="rgba(0, 0, 0, 0.45)"
        @change="sectionChange"
      />
    </view>
    <swiper :autoplay="false" :current="currentTab" class="flex1" @change="changeSwiper">
      <swiper-item>
        <scroll-view :scroll-y="true" class="return-scroll flex1" @scrolltolower="scrolltolowerFn">
          <block v-if=" returnGoodsList[0].list.length">
            <ReturnGoods
              v-for="info of returnGoodsList[0].list"
              :key="info.id"
              :return-goods-list="info"
              @checkDetails="checkDetails"
            />
            <u-loadmore :status="status" class="p-b-16" fontSize="12" line />
          </block>
          <VoNoData v-else no-data-tips="暂无退货退款申请" />
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view :scroll-y="true" class="return-scroll flex1"  @scrolltolower="scrolltolowerFn">
          <block v-if="returnGoodsList[1].list.length">
            <ReturnGoods
              v-for="info of returnGoodsList[1].list"
              :key="info.id"
              :return-goods-list="info"
              @checkDetails="checkDetails"
            />
            <u-loadmore :status="status" class="p-b-16" fontSize="12" line />
          </block>
          <VoNoData v-else no-data-tips="暂无退货退款申请" />
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view :scroll-y="true" class="return-scroll flex1"  @scrolltolower="scrolltolowerFn">
          <block v-if="returnGoodsList[2].list.length">
            <ReturnGoods
              v-for="info of returnGoodsList[2].list"
              :key="info.id"
              :return-goods-list="info"
              @checkDetails="checkDetails"
            />
            <u-loadmore :status="status" class="p-b-16" fontSize="12" line />
          </block>
          <VoNoData v-else no-data-tips="暂无退货退款申请" />
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
        returnGoodsList: [{
          pageNo:1,
          pageSize:20,
          total:0,
          list:[]
        },{
          pageNo:1,
          pageSize:20,
          total:0,
          list:[]
        },{
          pageNo:1,
          pageSize:20,
          total:0,
          list:[]
        }],
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
        this.returnExchangeRequest(true)
      },
      /**
       * 去质保说明
       */
      afterInfoClick() {
        this.$linkToEasy('/pagesGarage/Order/ReturnExchange/AfterInfo')
      },
      sectionChange(index) {
        this.currentTab = index
      },
      changeSwiper(e) {
        this.currentTab = e.detail.current
        this.returnExchangeRequest(true)
      },
      /**
       * 去去查看详情
       */
      checkDetails(data) {
        // 仅退款详情页面
        if (data.isRefundOnly) {
          this.$linkToEasy('/pagesSupplier/Order/ReturnExchange/RefundDetails?id=' + data.id)
          return
        }
        // 退货/退款详情页面
        this.$linkToEasy('/pagesSupplier/Order/ReturnExchange/ReturnRefundDetails?id=' + data.id)
      },
      /**
       * 退货列表接口请求
       */
      returnExchangeRequest(isfresh) {
        if (isfresh) {
          this.returnGoodsList[this.currentTab].pageNo=1
          this.returnGoodsList[this.currentTab].list=[]
        }
        let params = {
          status: this.currentTab,
          pageNo: this.returnGoodsList[this.currentTab].pageNo,
          pageSize: this.returnGoodsList[this.currentTab].pageSize,
          type: '1',
        }
        if (this.keyword) {
          params.searchWord = this.keyword
        }
        this.$VoHttp
          .apiRefundQueryList(params)
          .then((res) => {
            if (res.code === '20001') {
              console.log('退货数据', res)
              let resultData = res.data.records
              this.returnGoodsList[this.currentTab].total = res.data.total
              this.returnGoodsList[this.currentTab].list = this.returnGoodsList[this.currentTab].list.concat(resultData)
            } else {
              uni.$u.toast(res.message || '退货获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('退货获取失败')
          })
      },
      scrolltolowerFn(){
        if(this.returnGoodsList[this.currentTab].list.length<this.returnGoodsList[this.currentTab].total){

          this.returnGoodsList[this.currentTab].pageNo++
          this.returnExchangeRequest()
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .return {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-search {
      padding: 12rpx 32rpx;
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
