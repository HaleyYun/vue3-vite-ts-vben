<template>
  <view>
    <view id="detail" class="goods flex flex-column">
      <VoNav is-fixed is-have-more v-if="old.scrollTop > 490">
        <view slot="title" class="nav-mid">
          <EraTabs
            :current="current"
            :list="tabs"
            activeStyle="font-size: 32rpx;font-weight: bold;color:#FF5319;"
            class="tabClick"
            inactiveStyle="font-size: 28rpx;font-weight: 400;color:rgba(0, 0, 0, 0.45);"
            itemStyle="flex:1;padding:20rpx;"
            @change="tabChange"
          />
        </view>
      </VoNav>

      <scroll-view
        scroll-y
        :scroll-into-view="scrollIntoView"
        scroll-anchoring
        scroll-with-animation
        @scroll="scrollHandler"
        v-if="info"
        class="flex1 overflow-y"
      >
        <u-gap :height="$systemInfo.statusBarHeight" />
        <view
          class="top-nav flex flex-justify-between"
          :style="{ top: $systemInfo.statusBarHeight + 'px' }"
        >
          <image class="icon-img" src="/static/icons/back_pray.png" @click="$backFn()" />
          <image class="icon-img" src="/static/icons/more_pray.png" @click="showDirect = true" />
        </view>
        <!-- 顶部商品信息 -->
        <view id="goods" />
        <GoodsInfo v-if="info" :info="info" :type="type" />
        <!-- 商品信息 -->
        <CellInfo
          v-if="info"
          :info="info"
          @servicePopup="popupShow = true"
          @productParamsLookMore="productParamsLookMore"
        />
        <view v-if="info.guideVideo" id="install" />
        <!-- 安装教程 -->
        <InstallGuide v-if="info.guideVideo" :info="info" />
        <!-- 店铺名片 -->
        <view class="goods-shop flex-vertical-c" @click="toShopPage()">
          <image class="left" src="/static/logo-2.png" />
          <view class="right flex1">
            <view class="right-title">{{ info.goodsGoodsShopInfoVO.name }}</view>
            <view class="right-text">
              <text class="right-text__label">商品</text>
              <text class="right-text__value">{{
                info.goodsGoodsShopInfoVO.goodsScore || '--'
              }}</text>
              <text class="right-text__label">服务</text>
              <text class="right-text__value">{{
                info.goodsGoodsShopInfoVO.serviceScore || '--'
              }}</text>
              <text class="right-text__label"> 物流</text>
              <text class="right-text__value">{{
                info.goodsGoodsShopInfoVO.logisticsScore || '--'
              }}</text>
            </view>
          </view>
          <VoIcon :opacity="0.25" color="#000000" name="right-arrow" />
        </view>
        <!-- 大咖说 -->
        <MasterTalk v-if="info && info.id" :info="info" />
        <!-- 商品评价 -->
        <GoodsEvaluate v-if="info && info.id" :info="info" :companyId="companyId" />
        <view id="goods-detail" />
        <!-- 产品详情 -->
        <view v-if="info.desc" class="goods-detail">
          <view class="goods-detail__title">产品详情</view>
          <image
            v-for="(src, index) in info.desc"
            v-show="!(src.indexOf('.mp4') > -1)"
            :key="index"
            :src="src"
            class="goods-detail__image"
            mode="widthFix"
            @click="priviewImg(src)"
          />
        </view>
      </scroll-view>
      <view
        v-if="info && info.warehouseNum < 1 && info.warnLabel && info.warnLabel === '无货'"
        class="goods-shelves"
      >
        商品库存不足，快去联系卖家补货吧</view
      >
      <view v-else-if="info.status === 4" class="goods-shelves">商品已下架，去看看其他商品吧</view>
      <view class="goods-bottom">
        <!-- <view class="flex">
          <view class="flex flex-column flex-vertical-c m-r-40" @click="toShopPage()">
            <VoIcon :size="20" name="sell-goods" />
            <view class="m-t-8 lh30 fz-22 color-block-main">店铺</view>
          </view>
          <view class="flex flex-column flex-vertical-c" @click="customerService">
            <VoIcon :size="20" name="customer-service" />
            <view class="m-t-8 lh30 fz-22 color-block-main">客服</view>
          </view>
        </view> -->
        <EraButton v-if="info.status === 4" @click="lookSimilarFn" text="查看相似商品" />
        <block v-else>
          <EraButton
            v-if="info && info.warehouseNum < 1 && info.warnLabel && info.warnLabel === '无货'"
            disabled
            :text="type ? '立即推送' : '立即购买'"
          />
          <EraButton v-else-if="Number(info.isbuy) === 0" @click="buyNowHandler" text="立即购买" />
          <EraButton v-else-if="Number(info.isbuy) === 1" @click="lookSimilarFn" text="查看相似商品" />
        </block>
        <VoSafetyArea :is-fixed="false" />
      </view>
      <view v-show="fixBtn" class="fix-btn">
        <image class="order-icon" src="/static/icons/to_top.png" @click="toTop()" />
      </view>
    </view>
    <u-popup :round="10" :show="showBuyNow" mode="bottom" @close="showBuyNow = false">
      <BuyNow :info="currentRow" @closeFn="showBuyNow = false" @confirm="confirm" :queryType="type" />
    </u-popup>
    <!--下单确认弹框-->
    <VoModal
      :closeOnClickOverlay="true"
      :show="confirmModal"
      :showCancelButton="true"
      cancelText="我在想想"
      confirmText="提交订单"
      content="您选购的商品未选择定制服务，请确认是否继续提交订单？"
      @cancel="confirmModal = false"
      @confirm="confirmClick"
    />
    <VoQuick :show.sync="showDirect" />
    <!-- <swiper class="swiper" :current="current" @change="swiperChange">
	  <swiper-item class="swiper-item">
		<GoodsInfo />
	  </swiper-item>
	</swiper> -->
    <u-popup :show="popupShow" closeable round="10" @close="popupShow = false">
      <view class="popup">
        <view class="popup__title">服务说明</view>
        <view class="popup__image">
          <u--image mode="widthFix" src="/static/garage/home/postService.png" width="100%" />
        </view>
        <view class="popup__btn">
          <EraButton color="#FF5319" text="确定" @click="popupShow = false" />
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
  import GoodsInfo from './components/GoodsInfo.vue'
  import CellInfo from './components/CellInfo.vue'
  import InstallGuide from './components/InstallGuide.vue'
  import MasterTalk from './components/MasterTalk.vue'
  import GoodsEvaluate from './components/GoodsEvaluate.vue'
  import BuyNow from './components/BuyNow'
  import EraButton from '../../uni_modules/era-ui/components/EraButton/EraButton.vue'

  export default {
    name: 'GoodsDetail',
    components: { GoodsInfo, CellInfo, InstallGuide, MasterTalk, GoodsEvaluate, BuyNow, EraButton },
    data() {
      return {
        salesArea:'',
        popupShow: false,
        imType: '',
        fixBtn: false, // 悬浮球显隐
        scrollIntoView: '',
        old: {
          scrollTop: 0,
        },
        installScroll: 0, // 安装指导dom高度
        detailScroll: 0, // 详情dom高度
        type: '',
        companyId: '',
        userName: '',
        current: 0,
        showBuyNow: false,
        tabs: [
          {
            name: '产品',
            value: '0',
            index: 0,
            id: 'goods',
          },
          {
            name: '安装指导',
            value: '1',
            index: 1,
            id: 'install',
          },
          {
            name: '详情',
            value: '2',
            index: 2,
            id: 'goods-detail',
          },
        ],
        info: null,
        currentRow: '',
        confirmModal: false,
        seviceInfo: '',
        showDirect: false,
      }
    },
    onLoad(options) {
      this.salesArea=options.salesArea
      this.type = options.current
      this.imType = options.imType
      if (options.target === 'install') {
        setTimeout(() => {
          this.$nextTick(() => {
            this.tabChange(this.tabs[1])
          })
        }, 1200)
      }
      this.companyId = options.companyId
      this.userName = options.userName
      if (options.id) {
        this.getDetail(options.id, options.wid, this.companyId)
      }
      // this.getDetail()
    },
    methods: {
      // 滑动处理
      scrollHandler({ detail }) {
        this.old.scrollTop = detail.scrollTop
        this.scrollIntoView = ''
        if (detail.scrollTop <= this.installScroll) {
          this.current = 0
        } else if (detail.scrollTop >= this.installScroll && detail.scrollTop < this.detailScroll) {
          this.current = 1
        } else if (detail.scrollTop >= this.detailScroll) {
          this.current = 2
        }
        this.fixBtn = detail.scrollTop > 250
      },
      //锚点跳转
      toAnchor() {
        uni
          .createSelectorQuery()
          .select('#install')
          .boundingClientRect((data) => {
            uni
              .createSelectorQuery()
              .select('#detail')
              .boundingClientRect((res) => {
                this.installScroll = data?.top - 50 - res?.top
              })
              .exec()
          })
          .exec()
        uni
          .createSelectorQuery()
          .select('#goods-detail')
          .boundingClientRect((data) => {
            uni
              .createSelectorQuery()
              .select('#detail')
              .boundingClientRect((res) => {
                this.detailScroll = data?.top - 50 - res?.top
              })
              .exec()

            // console.log('data', data)
          })
          .exec()
      },
      //回到顶部
      toTop() {
        this.current = 0
        this.scrollIntoView = ''
        this.scrollIntoView = 'goods'
        console.log('scrollIntoView', this.scrollIntoView)
      },
      // 快捷跳转
      // tabClick(name) {
      //   this.scrollIntoView = ''
      //   this.scrollIntoView = name.id
      //   console.log('scrollIntoView', this.scrollIntoView)
      // },
      /*
       * 预览图片
       */
      priviewImg(src) {
        uni.previewImage({
          urls: [src],
          current: 0,
        })
      },
      //跳转店铺页面
      toShopPage() {
        // 跳转详情暂时不跳了
        // 6725
        // this.$linkToEasy(
        //   '/pagesAgent/InvestmentList/InvestmentShop?companyId=' +
        //     this.info.goodsGoodsShopInfoVO.shopId,
        // )
        this.$linkToEasy(
          `/pagesGarage/ShopList/ShopGoodsList?salesArea=${this.salesArea}&shopId=${this.info.goodsGoodsShopInfoVO.shopId}&current=${this.type}&companyId=${this.companyId}`,
        )
      },
      /**
       * 查看相似商品
       */
      lookSimilarFn() {
        this.$linkToEasy(
          '/pagesGarage/ShopList/SimilarPro?goodsNames=' + JSON.stringify(this.info.goodsNames),
        )
      },
      // 客服聊天页面
      customerService() {
        const info = {
          targetId: this.info.userId,
          type: 0,
          note: this.info.goodsGoodsShopInfoVO.name,
          platformCode: this.info.role == 1 ? 'supplier' : 'agent', // 1供应商  2服务商
          isProject: false,
          goods: {
            name: this.info.name,
            pic: this.info.pic[0],
            id: this.info.id,
            warehouseId: this.info.warehouseId,
            cashPrice: this.info.cashPrice,
            goodsType: 0,
            accountPrice: this.info.accountPrice,
            accountPeriodDays: this.info.accountPeriodDays,
          },
        }
        this.$storage.set('temp_im_room_info', info)
        // 组装数据然后跳转到订单提交页面
        const orderProductInfo = {
          shopInfo: {
            shopName: this.info.goodsGoodsShopInfoVO.name,
          },
          goodsInfo: {
            addedServices: [],
            goodsCount: 1,
            goodsId: this.info.id,
            isCash: true,
            originalPrice: this.info.cashPrice,
            periodDays: 0,
            projectId: '',
            shippingType: this.info.shippingType, // 1 包邮 2 到付
            codingPrice: this.info.codingPrice,
            isCoding: this.info.isCoding,
            shopId: this.info.goodsGoodsShopInfoVO.shopId,
            skuProperty: JSON.stringify(this.info.skuProperty || {}),
            warehouseId: this.info.warehouseId,
            warehouseName: this.info.warehouseName,
            arrivalTime: this.info.arrivalTime,
            pic: this.info.pic && this.info.pic.length ? this.info.pic[0] : '',
            name: this.info.name,
            categoryType: this.info.categoryType,
          },
        }
        this.$storage.set('ProductInfo', orderProductInfo)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      // 立即订购
      buyNowHandler() {
        this.currentRow = this.info
        this.currentRow.queryType = this.type
        this.showBuyNow = true
      },
      confirm(data) {
        this.seviceInfo = data
        // if (this.currentRow.isCoding && !data.isCoding) {
        //   this.confirmModal = true
        // } else {
        //   this.goConfirmOrder()
        // }
        this.goConfirmOrder()
      },
      //确认下单弹框
      confirmClick() {
        this.confirmModal = false
        this.goConfirmOrder()
      },
      goConfirmOrder() {
        // 存储商品信息，并带到提交订单页面
        // 组装需要的数据
        const orderProductInfo = {
          shopInfo: {
            shopName: this.info.goodsGoodsShopInfoVO.name,
            buyerId: this.companyId,
            userName: this.userName,
          },
          goodsInfo: {
            orgGoodsId: this.info.orgGoodsId || '',
            addedServices: [],
            goodsCount: 1,
            goodsId: this.info.id,
            isCash: Number(this.seviceInfo.isCash) === 1 ? true : false,
            originalPrice:
              Number(this.seviceInfo.isCash) === 1 ? this.info.cashPrice : this.info.accountPrice,
            projectId: '',
            shippingType: this.info.shippingType, // 1 包邮 2 到付
            periodDays: this.info.accountPeriodDays || 0,
            codingPrice: this.info.codingPrice,
            shopId: this.info.goodsGoodsShopInfoVO.shopId,
            skuProperty: JSON.stringify(this.info.skuProperty || {}),
            warehouseId: this.info.warehouseId,
            warehouseName: this.info.warehouse,
            deliveryAreaName: this.info.deliveryAreaName,
            arrivalTime: this.info.arrivalTime,
            pic: this.info.pic && this.info.pic.length ? this.info.pic[0] : '',
            name: this.info.name,
            tradeInFee: this.currentRow.tradeInFee, //回收费用
            installationFee: this.currentRow.installationFee, //安装费用 - 兼容提交订单-安装费用字段
            isCoding: this.seviceInfo.isCoding,
            isInstall: this.seviceInfo.isInstall,
            installFee: this.info.installFee, //安装费用
            categoryType: this.info.categoryType,
          },
        }
        console.log(orderProductInfo, 'xxxx')
        this.$storage.set('OrderPayInfoAgent', orderProductInfo)
        this.$linkToEasy(`/pagesAgent/SubmitOrder/SubmitOrder?imType=` + this.imType)
        this.showBuyNow = false
      },
      productParamsLookMore() {
        this.$linkToEasy('/pagesGarage/ShopList/ProductParams')
      },
      async getDetail(goodsId, warehouseId, companyId) {
        await this.$VoHttp.GOODS.apiGoodsGarageDetail({ goodsId, warehouseId, companyId }).then(
          (res) => {
            this.info = res.data
            this.info.optionCompanyId = this.companyId
            // helpUtil.regroupFileData(this.info, 'guideVideo')
          },
        )
        await this.toAnchor()
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.scrollIntoView = ''
        this.scrollIntoView = tab.id
        console.log('scrollIntoView', this.scrollIntoView)
        //锚点跳转
        // if (tab.index === 0) {
        //   uni.pageScrollTo({
        //     scrollTop: 0,
        //   })
        // }
        // if (tab.index === 1) {
        //   this.toAnchor('#install')
        // }
        // if (tab.index === 2) {
        //   this.toAnchor('#goods-detail')
        // }
      },
      //锚点跳转
      // toAnchor(anchor) {
      //   uni
      //     .createSelectorQuery()
      //     .select(anchor)
      //     .boundingClientRect((data) => {
      //       uni
      //         .createSelectorQuery()
      //         .select('#detail')
      //         .boundingClientRect((res) => {
      //           console.log('res', res)
      //           uni.pageScrollTo({
      //             duration: 100,
      //             scrollTop: data.top - 50 - res.top, //到达距离顶部的top值
      //           })
      //         })
      //         .exec()

      //       console.log('data', data)
      //     })
      //     .exec()
      // },
    },
  }
</script>
<style lang="scss" scoped>
  .goods {
    height: 100vh;
    // background: #fff;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    &-shop {
      display: flex;
      padding: 32rpx;
      box-sizing: border-box;
      background: #fff;

      .left {
        width: 96rpx;
        height: 96rpx;
        margin-right: 24rpx;
        border-radius: 8rpx;
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: 1.5;

        &-title {
          font-weight: 500;
          font-size: 30rpx;
          color: $v-c0-85;
        }

        &-text {
          &__label {
            font-size: 24rpx;
            color: $v-c0-65;
            margin-right: 6rpx;
          }

          &__value {
            font-size: 24rpx;
            color: $color-primary-red;
            margin-right: 30rpx;
          }
        }
      }
    }
    &-shelves {
      width: 750rpx;
      height: 80rpx;
      line-height: 80rpx;
      background: #feecee;
      text-align: center;
      font-size: 24rpx;
      color: #e50012;
    }

    &-detail {
      background: #fff;
      padding: 0 32rpx;
      box-sizing: border-box;
      margin-top: 16rpx;

      &__title {
        padding: 24rpx 0;
        font-size: 30rpx;
        line-height: 1.5;
        color: $v-c0-85;
        font-weight: 500;
      }

      &__image {
        width: 100%;
      }
    }

    &-bottom {
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      border-top: 2rpx solid $v-bg-light;

      &__button {
        width: 520rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background: $color-primary-yellow;
        border-radius: 48rpx;
        font-size: 32rpx;
        color: #fff;
      }
    }

    .swiper {
      flex: 1;

      &-item {
        height: 100%;
      }
    }
  }
  .fix-btn {
    width: 72rpx;
    // height: 72rpx;
    position: fixed;
    z-index: 10;
    bottom: 240rpx;
    right: 32rpx;
  }
  .order-icon {
    width: 96rpx;
    height: 96rpx;
  }
  .top-nav {
    width: 750rpx;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    z-index: 99;
    .icon-img {
      width: 48rpx;
      height: 48rpx;
    }
  }
  .popup {
    .popup__title {
      margin: 44rpx auto 0 auto;
      text-align: center;
      font-size: 32rpx;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
    }
    .popup__image {
      padding: 32rpx;
    }
    .popup__btn {
      padding: 24rpx 32rpx 80rpx 32rpx;
      border-top: 1rpx solid #f7f7f8;
    }
  }
</style>
