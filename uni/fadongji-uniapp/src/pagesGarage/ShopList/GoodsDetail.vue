<template>
  <view>
    <view id="detail" class="goods flex flex-column">
      <VoNav is-fixed is-have-more>
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
        v-if="info"
        :scroll-into-view="scrollIntoView"
        class="flex1 overflow-hidden"
        scroll-anchoring
        scroll-with-animation
        scroll-y
        @scroll="scrollHandler"
      >
        <!-- 顶部商品信息 -->
        <view id="goods" />
        <GoodsInfo v-if="info" :info="info" />
        <!-- 商品信息 -->
        <CellInfo
          v-if="info"
          :info="info"
          @carModelLookMore="carModelLookMore"
          @productParamsLookMore="productParamsLookMore"
          @servicePopup="popupShow = true"
        />
        <view id="install" />
        <!-- 安装教程 -->
        <InstallGuide v-if="info" :info="info" />
        <!-- 店铺名片 -->
        <view class="goods-shop" @click="goShopDetails">
          <image
            :src="
              info.goodsGoodsShopInfoVO.storeUrl
                ? info.goodsGoodsShopInfoVO.storeUrl
                : userInfo.photoUrl
            "
            class="left"
          />
          <view class="right">
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
        </view>
        <!-- 大咖说 -->
        <MasterTalk v-if="info && info.id" v-show="bigShotShow" :info="info" />
        <!-- 商品评价 -->
        <GoodsEvaluate v-if="info && info.id" v-show="evaluateShow" :info="info" />
        <view id="goods-detail" />
        <!-- 产品详情 -->
        <view v-if="info.desc && info.desc.length > 0" class="goods-detail">
          <view class="goods-detail__title">产品详情</view>
          <image
            v-for="(src, index) in info.desc"
            v-show="!(src.indexOf('.mp4') > -1)"
            :key="index"
            :src="src"
            class="goods-detail__image"
            mode="widthFix"
            @click="previewFn(info.desc, index)"
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
      <view v-if="info" class="goods-bottom flex flex-vertical-c flex-justify-between">
        <view class="flex">
          <view class="flex flex-column flex-vertical-c m-r-40" @click="goShopDetails">
            <VoIcon :size="20" color="#FF5319" name="sell-goods" />
            <view class="m-t-8 lh30 fz-22 color-block-main">店铺</view>
          </view>
          <view class="flex flex-column flex-vertical-c" @click="customerService">
            <VoIcon :size="20" name="customer-service-new" />
            <view class="m-t-8 lh30 fz-22 color-block-main">客服</view>
          </view>
        </view>
        <view v-if="info.status === 4" class="goods-bottom__button" @click="lookSimilarFn"
          >查看相似商品</view
        >
        <view v-else>
          <view
            v-if="info && info.warehouseNum < 1 && info.warnLabel && info.warnLabel === '无货'"
            class="goods-bottom__button goods-bottom__button1"
            >立即购买</view
          >
          <view
            v-else-if="Number(info.isbuy) === 0"
            class="goods-bottom__button"
            @click="buyHandler()"
            >立即购买</view
          >
          <view
            v-else-if="Number(info.isbuy) === 1"
            class="goods-bottom__button"
            @click="lookSimilarFn"
            >查看相似商品</view
          >
        </view>
      </view>
      <!-- 安全区域 -->
      <VoSafetyArea :is-fixed="false" />

      <!-- <swiper class="swiper" :current="current" @change="swiperChange">
        <swiper-item class="swiper-item">
        <GoodsInfo />
        </swiper-item>
      </swiper> -->
    </view>
    <!--    <VoAlert-->
    <!--      v-if="info && info.warehouseNum < 1"-->
    <!--      :isClose="false"-->
    <!--      :showIcon="false"-->
    <!--      :showTitle="false"-->
    <!--      contentClass="flex flex-justify-c"-->
    <!--      description="商品库存不足，快去联系卖家补货吧"-->
    <!--    />-->
    <u-popup :round="10" :show="showBuyNow" closeable mode="bottom" @close="showBuyNow = false">
      <BuyNow :info="info" @confirm="confirm" />
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
  import { getUserCheckStatus,getStoreImUserIdFn,error} from '@/common/helper'
  import EraButton from '../../uni_modules/era-ui/components/EraButton/EraButton.vue'

  export default {
    name: 'GoodsDetail',
    components: { GoodsInfo, CellInfo, InstallGuide, MasterTalk, GoodsEvaluate, BuyNow, EraButton },
    data() {
      return {
        popupShow: false,
        scrollIntoView: '',
        old: {
          scrollTop: 0,
        },
        scrollTop: 0,
        installScroll: 0, // 安装指导dom高度
        detailScroll: 0, // 详情dom高度
        showBuyNow: false,
        confirmModal: false,
        current: 0,
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
        info: '',
        //定制，安装服务和以旧换新服务
        isCoding: false,
        isInstall: false,
        isNew: false,
        bigShotShow: false,
        evaluateShow: false,
      }
    },
    async onLoad(options) {
      if (options.id) {
        await this.getDetail(options.id, options.wid)
        await this.recordAdd(options.id, 'scan')
        if (options.current) {
          let ids = ['goods', 'install', 'goods-detail']
          this.current = Number(options.current)
          this.scrollIntoView = ids[this.current]
        }
        // setTimeout(() => {
        //   if (this.current === 1) {
        //     this.toAnchor('#install')
        //   }
        //   if (this.current === 2) {
        //     this.toAnchor('#goods-detail')
        //   }
        // }, 1000)
      }
      // this.getDetail()
    },
    methods: {
      /**
       * 产品详情图片预览
       * @param urls 需要预览的图片链接列表
       * @param current 当前显示图片的链接/索引值，不填或填写的值无效则为 urls 的第一张。
       */
      previewFn(urls, current) {
        uni.previewImage({
          urls,
          current,
        })
      },
      // 滑动处理
      scrollHandler({ detail }) {
        // console.log('滑动处理', detail.scrollTop, this.installScroll)

        this.old.scrollTop = detail.scrollTop
        let scrollTop = detail.scrollTop + 50
        if (scrollTop < this.installScroll) {
          this.current = 0
        } else if (scrollTop >= this.installScroll && scrollTop < this.detailScroll) {
          this.current = 1
        } else if (scrollTop >= this.detailScroll) {
          this.current = 2
        }
        // this.fixBtn = detail.scrollTop > 250
      },
      //获取结点高度
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
                console.log(this.installScroll, 'installScroll')
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
                console.log(this.detailScroll, 'detailScroll')
              })
              .exec()

            console.log('data', data)
          })
          .exec()
      },
      //显示订购弹框
      buyHandler() {
        if (!this.info.warehouseNum || this.info.warehouseNum < 1) {
          uni.$u.toast('商品库存不足，快去联系卖家补货吧')
          return
        }
        this.showBuyNow = true
      },
      //确认下单点击事件
      confirm(data) {
        this.showBuyNow = false
        this.isCoding = data.isCoding
        this.isInstall = data.isInstall
        this.isNew = data.isNew
        // if (!data.isCoding && data.proIsCoding) {
        //   this.confirmModal = true
        // } else {
        //   this.buyNowHandler()
        // }
        this.buyNowHandler()
      },
      //确认下单弹框
      confirmClick() {
        this.confirmModal = false
        this.buyNowHandler()
      },
      /**
       * 查看相似商品
       */
      lookSimilarFn() {
        this.$linkToEasy(
          '/pagesGarage/ShopList/SimilarPro?goodsNames=' + JSON.stringify(this.info.goodsNames),
        )
      },
      /**
       * 去店铺详情
       */
      goShopDetails() {
        this.$linkToEasy(
          '/pagesGarage/ShopList/ShopGoodsList?shopId=' + this.info.goodsGoodsShopInfoVO.shopId,
        )
      },
      // 提交订单
      async buyNowHandler() {
        // //检查是否可以下单
        // let val = await getUserCheckStatus()
        // console.log('getUserCheckStatus()', val)
        // if (!val) {
        //   this.$u.toast('当前用户禁止下单~~')
        //   return
        // }
        // 组装数据然后跳转到订单提交页面
        const orderProductInfo = {
          shopInfo: {
            shopName: this.info.goodsGoodsShopInfoVO.name,
          },
          goodsInfo: {
            orgGoodsId: this.info.orgGoodsId || '',
            addedServices: [],
            goodsCount: 1,
            goodsId: this.info.id,
            isCash: true,
            originalPrice: this.info.cashPrice,
            periodDays: 0,
            projectId: '',
            shippingType: this.info.shippingType, // 1 包邮 2 到付
            codingPrice: this.info.codingPrice,
            isCoding: this.isCoding,
            isInstall: this.isInstall,
            installationFee: this.info.installationFee, //安装费用
            isNew: this.isNew,
            tradeInFee: this.info.tradeInFee, //回收费用
            shopId: this.info.goodsGoodsShopInfoVO.shopId,
            skuProperty: JSON.stringify(this.info.skuProperty || {}),
            warehouseId: this.info.warehouseId,
            warehouseName: this.info.warehouseName,
            deliveryAreaName: this.info.deliveryAreaName,
            arrivalTime: this.info.arrivalTime,
            pic: this.info.pic && this.info.pic.length ? this.info.pic[0] : '',
            name: this.info.name,
            modelName: this.info.goodsNames[0],
            categoryType: this.info.categoryType,
          },
        }
        this.$storage.set('ProductInfo', orderProductInfo)

        this.$linkToEasy('/pagesGarage/ShopList/SubmitOrders')
      },
      productParamsLookMore() {
        this.$linkToEasy('/pagesGarage/ShopList/ProductParams')
      },
      carModelLookMore() {
        this.$linkToEasy('/pagesSupplier/InvestmentInfo/InvestCarModel')
      },
      async getDetail(goodsId, warehouseId) {
        await this.$VoHttp.GOODS.apiGoodsGarageDetail({
          goodsId,
          warehouseId,
          companyId: this.userInfo.companyId,
          userId: this.userInfo.id,
        })
          .then((res) => {
            this.info = res.data
            this.info.optionCompanyId = this.companyId
            this.isCoding = this.info.isCoding || false
            this.isInstall = this.info.isInstallation || false
            this.isNew = this.info.isTradeIn && this.info.tradeInFee > 0 ? true : false
            // helpUtil.regroupFileData(this.info, 'guideVideo')
            this.getBigData()
            this.getEvaluateData()
            this.$nextTick(() => {
              this.toAnchor()
            })
          })
          .catch((e) => {
            this.$u.toast(e?.message || '服务错误')
          })
      },

      // 客服聊天页面
      customerService() {
        getStoreImUserIdFn({companyId:this.info.goodsGoodsShopInfoVO.shopId}).then(res=>{
          const info = {
            targetId: res,
            type: 0,
            note: this.info.goodsGoodsShopInfoVO.name,
            platformCode: this.info.role == 1 ? 'supplier' : 'agent', // 1供应商  2服务商
            isProject: false,
            goodsDetail: this.info,
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
              modelName: this.info.goodsNames[0],
            },
          }
          this.$storage.set('ProductInfo', orderProductInfo)
          this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')

        }).catch(e=>{
            error(e.message||"未找到店铺客服")
        })
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.scrollIntoView = tab.id
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
      //大咖说请求
      getBigData() {
        let params = {
          pageNo: 1,
          pageSize: 3,
          businessType: 1,
          goodsId: this.info.id,
        }
        this.$VoHttp
          .apiCreateQuestionsQuestionList(params, { noLoading: true })
          .then((res) => {
            if (res.data) {
              let total = res.data.total
              if (Number(total) > 0) {
                this.bigShotShow = true
              }
            }
          })
          .finally(() => {})
      },
      //获取评价请求
      getEvaluateData() {
        this.$VoHttp
          .apiContentEvaluateQueryProductEvaluatePage(
            { sourceId: this.info.id, sourceType: 0 },
            { noLoading: true },
          )
          .then((res) => {
            if (res.data) {
              let evaInfo = res.data.records
              if (evaInfo && evaInfo.length > 0) {
                this.evaluateShow = true
              }
            }
          })
          .finally(() => {})
      },
      // 增加浏览量
      async recordAdd(id, type) {
        try {
          await this.$VoHttp.GOODS.apiGoodsVisitRecordAdd(
            { goodsId: id, visitType: type },
            { noLoading: true },
          )
        } catch (e) {
          console.log(e)
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .goods {
    height: 100vh;
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
          font-weight: bold;
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
        font-weight: bold;
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
      position: relative;
      z-index: 1;

      &__button {
        width: 520rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background: $color-primary-yellow;
        border-radius: 48rpx;
        font-size: 32rpx;
        color: #fff;
        position: relative;
        z-index: 1;
      }
      &__button1 {
        background: #f6f7f8;
        color: $v-c0-25;
      }
    }

    .swiper {
      flex: 1;

      &-item {
        height: 100%;
      }
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
