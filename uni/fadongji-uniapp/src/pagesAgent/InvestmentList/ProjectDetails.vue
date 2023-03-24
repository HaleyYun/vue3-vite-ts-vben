<template>
  <view>
    <view
      v-if="detailInfo"
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="details flex flex-column"
    >
      <VoNav :is-fixed="false" is-have-more title="商品详情" />
      <view v-if="old.scrollTop >= 200" class="tab-fixed vw-full fixed bg-white">
        <EraTabs
          :activeStyle="activeStyle"
          :current="current"
          :list="tabList"
          lineColor="#FF5319"
          @click="tabClick"
        />
      </view>
      <scroll-view
        :scroll-into-view="scrollIntoView"
        :scroll-top="scrollTop"
        class="flex1 overflow-hidden relative"
        scroll-anchoring
        scroll-with-animation
        scroll-y
        @scroll="scrollHandler"
      >
        <!--  立即投资模块  -->
        <view id="invest" />
        <InvestInvestment
          :info="detailInfo"
          :isDisabled="isDisabled"
          @toInvest="showInvestmentPop('订购')"
        />
        <!--  项目信息模块  -->
        <view id="info" />
        <ProductInfo :product-data="detailInfo" />
        <!--  商家信息模块  -->
        <view id="company" />
        <StoreInfo :info="detailInfo.goodsGoodsShopInfoVO" @toShopPage="toShopPage" />
        <!--  商品详情模块  -->
        <view id="detail" />
        <ProductDetail :info="detailInfo" />
        <!--  适配车型模块  -->
        <view id="CarModel" />
        <CarModel v-if="detailInfo.vehicles && detailInfo.vehicles.length" :info="detailInfo" />
        <!--  服务保障模块  -->
        <view id="ServiceSafe" />
        <ServiceSafe
          v-if="detailInfo.serviceConfig && detailInfo.serviceConfig.length"
          :ServiceData="detailInfo.serviceConfig"
        />
        <!--  产品参数模块  -->
        <view id="ProductParams" />
        <ProductParams
          v-if="detailInfo.paramsProperty && detailInfo.paramsProperty.length"
          :info="detailInfo"
        />
        <!--  安装指导模块  -->
        <view id="InstallationGuide" />
        <InstallationGuide
          v-if="detailInfo.guideVideo && detailInfo.guideVideo.length"
          :info="detailInfo"
        />
        <!--  评论模块  -->
        <InvestEvaluate :info="detailInfo" />
        <!--        <vo-safety-area :is-fixed="false" class="bg-white" />-->
      </scroll-view>

      <!--  底部固定区域  -->
      <view class="details-bottom p-b-safe-area">
        <VoAlert
          v-if="alertDesc"
          :description="alertDesc"
          :isClose="false"
          :showIcon="false"
          :showTitle="false"
          contentClass="flex flex-justify-c"
        />

        <view class="details-bottom__main flex flex-justify-between">
          <view class="flex">
            <view class="flex flex-column flex-vertical-c m-r-32" @click="toShopPage">
              <VoIcon :size="24" color="#FF5319" name="sell-goods" />
              <view class="details-bottom__tips m-t-4">店铺</view>
            </view>
            <view class="flex flex-column flex-vertical-c m-r-32" @click="toIm">
              <image class="details-bottom__icon" src="/static/icons/customer_service_icon.png" />
              <view class="details-bottom__tips m-t-4">客服</view>
            </view>
            <view v-if="queryType === 'L'" class="badge">
              <view
                class="flex flex-column flex-vertical-c"
                @click="$linkToEasy('/pagesAgent/InvestmentList/InvestmentCheckList')"
              >
                <!-- <image class="details-bottom__icon" src="/static/icons/contract_icon.png" /> -->
                <VoIcon name="car-new" size="25"></VoIcon>
                <view class="details-bottom__tips m-t-4">备货车</view>
              </view>
              <VoBadge v-if="cartNum" :value="cartNum" class="badge_number" max="99" />
            </view>
          </view>
          <view class="flex1 flex flex-justify-r">
            <view
              v-if="queryType === 'L' && !isDisabled"
              class="details-bottom__button investColor"
              @click="showInvestmentPop('加入备货车')"
            >
              加入备货车
            </view>
            <view v-if="!isDisabled" class="details-bottom__button m-l-16 flex1" @click="toInvest"
              >订购
            </view>
            <view v-if="isDisabled" class="details-bottom__button m-l-16 flex1" @click="toSamePage"
              >查看相似项目
            </view>
          </view>
        </view>
      </view>
      <!--  固定定位图标  -->
      <view v-if="showPageBox" class="page-box">
        <VoIcon
          :opacity="0.45"
          :size="16"
          class="page-box__del"
          color="#000000"
          name="close-c"
          @click="showPageBox = false"
        />
        <view
          v-for="item in pageList"
          :key="item.id"
          class="page-box__item"
          @click="tabClick(item)"
        >
          {{ item.name }}
        </view>
      </view>
      <view v-show="fixBtn" class="fix-btn">
        <image
          class="order-icon m-b-24"
          src="/static/icons/shop_details.png"
          @click="showPageBox = !showPageBox"
        />
        <image class="order-icon" src="/static/icons/to_top.png" @click="toTop()" />
      </view>
      <!-- <image class="details-details" src="/static/created/product/goods_details.png" />
	  <image class="details-back" src="/static/created/product/back_top.png" /> -->
    </view>
    <u-popup :round="8" :show="showInvestment" mode="bottom" @close="close" @open="open">
      <InvestmentPopup
        :btnText="btnText"
        :info="detailInfo"
        :is-my-self-goods="true"
        :queryType="queryType"
        @closeFn="closeClick"
      />
    </u-popup>
  </view>
</template>

<script>
  import InvestInvestment from './components/InvestInvestment'
  import ProductInfo from './components/ProductInfo'
  import StoreInfo from './components/StoreInfo'
  import ProductDetail from '@/pagesAgent/InvestmentList/components/ProductDetail'
  import CarModel from '@/pagesAgent/InvestmentList/components/CarModel'
  import ServiceSafe from '@/pagesAgent/InvestmentList/components/ServiceSafe'
  import ProductParams from '@/pagesAgent/InvestmentList/components/ProductParams'
  import InstallationGuide from '@/pagesAgent/InvestmentList/components/InstallationGuide'
  import InvestEvaluate from '@/pagesAgent/InvestmentList/components/InvestEvaluate'
  import InvestmentPopup from './components/InvestmentPopup'
  import {error, getStoreImUserIdFn} from "@/common/helper";

  export default {
    name: 'ProjectDetails',
    components: {
      InvestInvestment,
      ProductInfo,
      StoreInfo,
      ProductDetail,
      CarModel,
      ServiceSafe,
      ProductParams,
      InstallationGuide,
      InvestEvaluate,
      InvestmentPopup,
    },
    data() {
      return {
        fixBtn: false, // 悬浮球显隐
        remainingAvailable: '', //剩余投资数
        showInvestment: false, // 弹出层
        productData: {
          productName: '江陵动力 - B15荣光 - 黑色OCV',
          productList: [
            { price: '40/400', title: '已售量/总量' },
            { price: '360', title: '剩余可批量' },
            { price: '约6.01%', title: '回报率' },
            { price: '2800.00元', title: '现金价' },
            { price: '2900.00元', title: '30天账期' },
            { price: '郑州', title: '发货仓库' },
          ],
        },
        id: '',
        detailInfo: null,
        btnText: '',
        queryType: '', //A全国L本地
        showPageBox: false,
        pageList: [
          {
            name: '图文介绍',
            id: 'detail',
          },
        ],
        tabList: [
          {
            name: '项目信息',
            id: 'info',
          },
          {
            name: '商家信息',
            id: 'companyData',
          },
          {
            name: '商品详情',
            id: 'detail',
          },
        ],
        activeStyle: {
          color: '#FF5319',
          fontWeight: 'bold',
        },
        old: {
          scrollTop: 0,
        },
        scrollTop: 0,
        current: 0,
        scrollIntoView: '',
        alertDesc: '',
        isDisabled: false, //是否不符合投资条件
        cartNum: 0,
      }
    },
    onLoad(options) {
      if (options.id) {
        this.id = options.id
        this.queryType = options.queryType
        this.getDetail()
      }
    },
    onShow() {
      this.getCartNumRequest()
    },
    methods: {
      closeClick() {
        this.showInvestment = false
        this.getCartNumRequest()
      },
      //回到顶部
      toTop() {
        this.current = 0
        this.scrollIntoView = 'invest'
      },
      // 快捷跳转
      tabClick(name) {
        this.scrollIntoView = ''
        this.scrollIntoView = name.id
      },
      // 滑动处理
      scrollHandler({ detail }) {
        this.old.scrollTop = detail.scrollTop
        console.log(detail)
        if (detail.scrollTop >= 400) {
          this.current = 1
        } else {
          this.current = 0
        }

        if (detail.scrollTop >= 500) {
          this.current = 2
        }
        if (detail.scrollTop === 8) {
          this.scrollIntoView = ''
        }
        console.log(this.scrollIntoView, 'scrollIntoView')
        this.fixBtn = detail.scrollTop > 900
      },
      // 订购
      toInvest() {
        if (Number(this.detailInfo.isbuy) === 1) {
          return
        }
        // 项目剩余可投量，小于最小起投量
        if (this.detailInfo.remainingAvailable < this.detailInfo.startNumber) {
          uni.$u.toast('库存不足')
          return
        }
        //已投量大于等于限投量
        // if (this.detailInfo.alreadyInvestedNum >= this.detailInfo.investmentLimit) {
        //   uni.$u.toast('已达到限投量')
        //   return
        // }
        if (this.remainingAvailable > 0) {
          if (this.queryType === 'A') {
            this.$storage.set('projectData', this.detailInfo)
            this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrdersCountry')
          } else {
            this.showInvestmentPop('订购')
          }
        }
      },
      toSamePage() {
        //相似项目
        this.$linkToEasy(
          '/pagesAgent/InvestmentList/InvestmentSimilarOrder?goodsNames=' +
            JSON.stringify(this.detailInfo.goodsNames),
        )
      },
      //跳转店铺页面
      toShopPage() {
        this.$linkToEasy(
          '/pagesAgent/InvestmentList/InvestmentShop?shopId=' +
            this.detailInfo.goodsGoodsShopInfoVO.shopId,
        )
      },
      // 跳转到客服聊天界面
      toIm() {
        getStoreImUserIdFn({
          companyId:this.detailInfo.shopId
        }).then(res=>{
          const info = {
            targetId: res,
            type: 0,
            note: this.detailInfo.goodsGoodsShopInfoVO.name,
            platformCode: this.detailInfo.role == 1 ? 'supplier' : 'agent', // 1供应商  2服务商
            isProject: true,
            projectId: this.detailInfo.id,
            investType: this.queryType,
            isShop: true, //是否是店铺聊天
            goods: {
              name: this.detailInfo.goodsName,
              pic: this.detailInfo.pic[0],
              id: this.detailInfo.id,
              cashPrice: this.detailInfo.cashPrice,
              accountPrice: this.detailInfo.accountPrice,
              accountPeriodDays: this.detailInfo.accountPeriodDays,
            },
          }
          this.$storage.set('temp_im_room_info', info)
          this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
        }).catch(e=>{

          error(e.message||"未找到店铺客服")
        })



      },
      // 获取详情
      getDetail() {
        this.$VoHttp.GOODS.apiGoodsProjectInvestmentBuyerPreview({
          id: this.id,
          companyId: this.userInfo.companyId,
        }).then((res) => {
          if (res.data) {
            this.detailInfo = res.data
            this.detailInfo.queryType = this.queryType
            this.remainingAvailable = this.detailInfo.remainingAvailable
            if (this.detailInfo.isbuy === 1) {
              this.alertDesc = '当前区域不支持投资，去看看其他项目吧'
              this.isDisabled = true
            }
            if (Number(this.detailInfo.status) != 1) {
              this.alertDesc = '商品已经抢光了，下次早点来哦'
              this.isDisabled = true
            }
            if (Number(this.detailInfo.remainingAvailable) < 1) {
              this.alertDesc = '项目可投余量不足，去联系客服开放更多吧'
              this.isDisabled = true
            }
            if (
              this.detailInfo.alreadyInvestedNum >= this.detailInfo.totalInvestment ||
              this.detailInfo.remainingAvailable < this.detailInfo.startNumber
            ) {
              this.isDisabled = true
            }
            //用来判断 显示哪些快捷跳转
            if (this.detailInfo.vehicleVOS && this.detailInfo.vehicleVOS.length) {
              this.pageList.push({
                name: '适配车型',
                id: 'CarModel',
              })
            }
            if (this.detailInfo.serviceConfig && this.detailInfo.serviceConfig.length) {
              this.pageList.push({
                name: '服务保障',
                id: 'ServiceSafe',
              })
            }
            if (this.detailInfo.paramsProperty && this.detailInfo.paramsProperty.length) {
              this.pageList.push({
                name: '产品参数',
                id: 'ProductParams',
              })
            }
            if (this.detailInfo.guideVideo && this.detailInfo.guideVideo.length) {
              this.pageList.push({
                name: '安装指导',
                id: 'InstallationGuide',
              })
            }
            this.pageList.push({
              name: '商品评价',
              id: 'InvestEvaluate',
            })
          }
        })
      },
      // 获取备货车数量
      getCartNumRequest() {
        this.$VoHttp.apiCartBasisQueryNum().then((res) => {
          console.log('res.data', res.data)
          if (res.data || +res.data === 0) {
            this.cartNum = +res.data
          }
        })
      },
      /**
       * 打开弹出层
       */
      showInvestmentPop(text) {
        console.log(this.detailInfo, 'ssss')
        if (Number(this.detailInfo.isbuy) === 1) {
          return
        }
        if (this.remainingAvailable < 1) {
          return
        }
        if (this.detailInfo.totalInvestment <= this.detailInfo.alreadyInvestedNum) {
          uni.$u.toast('购买数量已经达到上限')
          return
        }
        this.btnText = text
        this.showInvestment = true
      },
      open() {
        // console.log('open');
      },
      /**
       * 关闭弹出层
       */
      close() {
        this.showInvestment = false
        // console.log('close');
      },
    },
  }
</script>

<style lang="scss" scoped>
  .details {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;

    &-bottom {
      background: #fff;

      &__main {
        padding: 20rpx 32rpx 20rpx 24rpx;
        box-sizing: border-box;
      }

      &__tips {
        line-height: 30rpx;
        font-size: 22rpx;
        color: #373a4e;
      }

      &__icon {
        width: 48rpx;
        height: 48rpx;
      }

      &__button {
        min-width: 200rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        font-size: 32rpx;
        background: $color-primary-yellow;
        border-radius: 48rpx;
        color: #fff;

        &.disabled {
          background: #f6f7f8;
          color: rgba(0, 0, 0, 0.25);
        }

        &.investColor {
          background: #ff9b05;
        }
      }
    }

    // &-details {
    //   position: fixed;
    //   bottom: 336rpx;
    //   right: 32rpx;
    //   width: 72rpx;
    //   height: 72rpx;
    //   border-radius: 50%;
    //   overflow: hidden;
    // }
    // &-back {
    //   position: fixed;
    //   bottom: 240rpx;
    //   right: 32rpx;
    //   width: 72rpx;
    //   height: 72rpx;
    //   border-radius: 50%;
    //   overflow: hidden;
    // }
    .page-box {
      padding: 0 24rpx;
      box-sizing: border-box;
      position: fixed;
      z-index: 11;
      bottom: 360rpx;
      right: 32rpx;
      background: #fff;
      box-shadow: 0px 2px 8px rgba(34, 40, 75, 0.15);
      border-radius: 8rpx;

      &__item {
        color: rgba(0, 0, 0, 0.65);
        font-size: 28rpx;
        line-height: 1.5;
        text-align: center;
        padding: 16rpx;
        border-bottom: 1px solid #f6f7f8;
      }

      &__del {
        position: absolute;
        top: -16rpx;
        right: -16rpx;
      }
    }

    .fix-btn {
      width: 72rpx;
      // height: 72rpx;
      position: fixed;
      z-index: 10;
      bottom: 240rpx;
      right: 40rpx;
    }
  }

  .order-icon {
    width: 104rpx;
    height: 104rpx;
  }

  .badge {
    position: relative;

    &_number {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .goods-shelves {
    width: 750rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #feecee;
    text-align: center;
    font-size: 24rpx;
    color: #e50012;
  }
</style>
