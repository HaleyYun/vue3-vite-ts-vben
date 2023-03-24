<template>
  <view>
    <view class="invest flex flex-column">
      <VoNav :is-fixed="false" is-have-more title="相似项目" />
      <view v-show="isShow" class="invest-header flex flex-column flex-vertical-c">
        <image class="overdue-img" src="/static/icons/overdue_icon.png" />
        <view class="invest-header__text flex flex-row flex-vertical-c">
          <view class="header-line" />
          <span class="line-text"> 更多相似推荐</span>
          <view class="header-line" />
        </view>
      </view>
      <EraTabs
        :current="current"
        :list="tabsList"
        :scrollable="false"
        class="bg-white m-t-16"
        @change="changeTabs"
      />
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <swiper :current="current" class="swiper flex1" @change="swiperChange">
        <swiper-item v-for="swiper in tabsList" :key="swiper.name">
          <scroll-view
            :refresher-threshold="10"
            :refresher-triggered="triggered"
            class="scroll-view overflow-y"
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
            <!--  商品信息  -->
            <InvestmentGoodsInfo
              v-for="info of infoList"
              :key="info.id"
              :dataObj="info"
              @addShop="showInvestmentPop('加入备货车', info)"
              @buyShop="showInvestmentPop('订购', info)"
              @goProjectDetails="goProjectDetails"
            />
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 加购弹框 -->
    <u-popup :show="showInvestment" closeable mode="bottom" @close="showInvestment = false">
      <InvestmentPopup
        :btnText="btnText"
        :info="dataObj"
        :queryType="dataObj.queryType"
        @closeFn="showInvestment = false"
      />
    </u-popup>
  </view>
</template>

<script>
  import InvestmentGoodsInfo from './components/InvestmentGoodsInfo'
  import InvestmentPopup from './components/InvestmentPopup'
  import FliterPop from './components/FliterPop'
  import FliterPopPay from './components/FliterPopPay'
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'InvestmentSimilarOrder',
    components: { InvestmentGoodsInfo, FliterPop, FliterPopPay, InvestmentPopup },
    data() {
      return {
        isShow: false,
        isEmpty: false,
        goodsNames: [], // 搜索双向绑定
        current: 0, // 横向tabs默认
        tabsList: [
          {
            name: '本地投资',
            isShow: false,
            isEmpty: false,
            goodsNames: [],
          },
          {
            name: '全国投资',
            isShow: false,
            isEmpty: false,
            goodsNames: [],
          },
        ],
        filterList: [
          {
            id: 0,
            name: '品牌',
            choosed: false,
          },
          {
            id: 1,
            name: '适配车型',
            choosed: false,
          },
          {
            id: 2,
            name: '型号',
            choosed: false,
          },
          {
            id: 3,
            name: '商品类型',
            choosed: false,
          },
          {
            id: 4,
            name: '付款方式',
            choosed: false,
          },
        ],
        orderList: [
          {
            name: '价格',
            choosed: true,
            icon: '',
            orderType: 'ASC',
            orderProperty: 'cashPrice',
          },
          {
            name: '投资回报率',
            choosed: false,
            icon: '',
            orderType: '',
            orderProperty: 'rol',
          },
          {
            name: '持有人数',
            choosed: false,
            icon: '',
            orderType: '',
            orderProperty: 'holderNumber',
          },
        ],
        wareList: [
          {
            name: '广州平台仓',
            choosed: false,
          },
          {
            name: '杭州平台仓',
            choosed: false,
          },
          {
            name: '济南平台仓',
            choosed: false,
          },
          {
            name: '长沙平台仓',
            choosed: false,
          },
          {
            name: '成都平台仓',
            choosed: false,
          },
        ],
        fliterVisible: false,
        fliterVisiblePay: false,
        payType: '', //付款方式 1：现金 2 ：账期
        minPeriodDays: '', //最短账期天数
        maxPeriodDays: '', //最长账期天数
        typeList: [],
        orderType: 'ASC', //排序类型
        orderProperty: 'cashPrice', //排序属性
        brandList: [],
        brandIds: [], //选中品牌id
        selectBrandId: '',
        valetVehicleBrandQOList: [], //适配车型
        skuProperties: [], //商品型号值
        infoList: [],
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,

        showInvestment: false, // 弹出层
        btnText: '',
        dataObj: {},
      }
    },
    onLoad(options) {
      this.tabsList[0].goodsNames = JSON.parse(options.goodsNames)
      this.tabsList[1].goodsNames = JSON.parse(options.goodsNames)
      this.isEmpty = true
      this.getData(true)
    },
    methods: {
      changeTabs(e) {
        this.fliterVisible = false
        this.current = e.index
        this.isShow = this.tabsList[this.current].isShow
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
          queryType: this.current === 1 ? 'A' : 'L',
          brandIds: this.brandIds,
          valetVehicleBrandQOList: this.valetVehicleBrandQOList,
          skuProperties: this.skuProperties,
        }
        if (this.tabsList[this.current].goodsNames.length > 0) {
          console.log('goodsNames', this.tabsList[this.current].goodsNames)
          params['analyzerNames'] = this.tabsList[this.current].goodsNames
        }
        if (this.payType) {
          params['payType'] = this.payType
          if (this.minPeriodDays) {
            params['minPeriodDays'] = this.minPeriodDays
          }
          if (this.maxPeriodDays) {
            params['maxPeriodDays'] = this.maxPeriodDays
          }
        }
        if (this.categoryType) {
          params['categoryType'] = this.categoryType
        }
        let apiGoodsQueryWarehousesGoodsList =
          this.$VoHttp.GOODS.apiGoodsProjectInvestmentSpList(params)
        let apiGoodsProjectInvestmentSpList =
          this.$VoHttp.GOODS.apiGoodsProjectInvestmentSpList(params)
        let api =
          this.tabsList[this.current].goodsNames.length > 0
            ? apiGoodsQueryWarehousesGoodsList
            : apiGoodsProjectInvestmentSpList
        api
          .then((res) => {
            if (res.data) {
              let data = res.data.records
              data.forEach((item) => {
                item.queryType = this.current === 1 ? 'A' : 'L'
              })
              this.total = res.data.total
              this.infoList = this.infoList.concat(data)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              if (api === apiGoodsQueryWarehousesGoodsList) {
                this.tabsList[this.current].isShow = false
              }
              this.tabsList[this.current].isEmpty = this.infoList.length === 0
              if (api === apiGoodsQueryWarehousesGoodsList && this.tabsList[this.current].isEmpty) {
                console.log('重置搜索关键字,显示默认项目')
                this.tabsList[this.current].goodsNames = []
                if (this.current === 1) {
                  this.tabsList[1].isShow = true
                  this.isShow = true
                } else {
                  this.tabsList[0].isShow = true
                  this.isShow = true
                }
                this.getData(true)
              }
            }
          })
          .catch((err) => {
            console.log('err', err)
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            uni.$u.toast(err.message || '请检查网络')
            if (this.tabsList[this.current].goodsNames) {
              this.tabsList[this.current].goodsNames = []
              if (this.current === 1) {
                this.tabsList[1].isShow = true
              } else {
                this.tabsList[0].isShow = true
              }
            }
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
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getData()
        }
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
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
      //swiper切换
      swiperChange(event) {
        this.fliterVisible = false
        this.current = event.detail.current
        this.getData(true)
      },
      /**
       * 去项目详情
       */
      goProjectDetails() {
        // this.$linkToEasy('/pagesAgent/InvestmentList/ProjectDetails')
      },
      /**
       * 打开弹出层
       */
      async showInvestmentPop(text, data) {
        showLoading('加载中')
        let res = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentBuyerPreview({
          id: data.id,
          companyId: this.userInfo.companyId,
        })
        if (res.data) {
          this.dataObj = res.data
          this.dataObj.queryType = data.queryType
          if (this.dataObj.isbuy === 1) {
            this.$u.toast('当前区域不支持投资，去看看其他项目吧')
            return
          }
          if (Number(this.dataObj.status) != 1) {
            this.$u.toast('商品已经抢光了，下次早点来哦')
            return
          }
          if (Number(this.dataObj.remainingAvailable) < 1) {
            this.$u.toast('库存不足，暂不支持参与')
            return
          }
          if (
            this.dataObj.alreadyInvestedNum >= this.dataObj.totalInvestment ||
            this.dataObj.remainingAvailable < this.dataObj.startNumber
          ) {
            this.$u.toast('库存不足')
            return
          }
          if (this.dataObj.remainingAvailable < 1) {
            uni.$u.toast('库存不足')
            return
          }
          if (this.dataObj.totalInvestment <= this.dataObj.alreadyInvestedNum) {
            uni.$u.toast('购买数量已经达到上限')
            return
          }
        }
        hideLoading()

        this.btnText = text
        //全国投资
        if (this.dataObj.queryType === 'A') {
          this.$storage.set('projectData', this.dataObj)
          this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrdersCountry')
          return
        }
        this.showInvestment = true
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invest {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-header {
      padding: 24rpx 0 32rpx 0;
      width: 100%;
      &__text1 {
        font-size: 28rpx;
        color: $v-c0-45;
        line-height: 42rpx;
        margin-top: 8rpx;
      }
      &__text {
        margin-top: 41rpx;
        .header-line {
          width: 120rpx;
          height: 2rpx;
          background: rgba(0, 0, 0, 0.08);
        }
        .line-text {
          padding: 0 16rpx 0;
          font-size: 20rpx;
          color: $v-c0-45;
          line-height: 30rpx;
        }
      }
    }
    .scroll-view {
      height: 100%;
    }
    &-slide {
      padding: 16rpx 0 16rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      //overflow-x: scroll;
      &__img {
        width: 88rpx;
        height: 88rpx;
        border-radius: 50%;
        overflow: hidden;
      }

      &__name {
        line-height: 28rpx;
        font-weight: 400;
        font-size: 24rpx;
        margin-top: 4rpx;
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.65);
      }

      .brand-item {
        &.choosed {
          .invest-slide__name {
            color: rgba(0, 0, 0, 0.85);
            font-weight: 500;
          }
        }
      }

      &__sift {
        padding: 6rpx 32rpx;
        border-radius: 80rpx;
        margin-right: 16rpx;
        white-space: nowrap;

        &.select {
          background: #feecee;
          border: 2rpx solid #e50012;
          color: #e50012;
        }

        &.no-select {
          background: #f6f7f8;
          border: 2rpx solid transparent;
        }
      }
      .order-nav {
        display: flex;
        margin-top: 16rpx;

        &__item {
          display: flex;
          align-items: center;
          height: 56rpx;
          color: rgba(0, 0, 0, 0.45);
          font-size: 28rpx;
          padding: 0 34rpx;
          box-sizing: border-box;
          position: relative;

          &.choosed {
            color: rgba(0, 0, 0, 0.85);
            font-weight: 500;
          }

          &:first-child {
            padding-left: 0;
          }

          &:last-child {
            .right-line {
              display: none;
            }
          }

          .right-line {
            width: 1px;
            height: 12px;
            background: #f6f7f8;
            position: absolute;
            right: 0;
            top: 16rpx;
          }
        }
      }
    }
  }
  .overdue-img {
    width: 196rpx;
    height: 226rpx;
  }
</style>
