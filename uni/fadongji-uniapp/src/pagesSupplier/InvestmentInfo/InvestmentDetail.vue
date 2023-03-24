<template>
  <view
    v-if="detailInfo"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="investment flex flex-column"
  >
    <VoNav is-fixed is-have-more title="批发详情" />
    <view class="h16" />
    <CarInfo :info="detailInfo" />
    <view class="h16" />
    <ProductInfo :info="detailInfo" :product-data="productData" />
    <view class="h16" />
    <StoreInfo :info="detailInfo" :store-data="storeData" @click="storeInfoClick" />
    <view class="h16" />
    <ProductDetail :info="detailInfo" />
    <CarModel :car-model="carModelList" :info="detailInfo" @carModelLookMore="carModelLookMore" />
    <view class="h8" />
    <ServiceSafe :info="detailInfo" :service-data="ServiceData" />
    <view class="h8" />
    <ProductParams
      :info="detailInfo"
      :product-data="productDatalList"
      @productParamsLookMore="productParamsLookMore"
    />
    <view class="h8" />
    <InstallationGuide :info="detailInfo" />
    <view class="h8" />
    <!--	评价	-->
    <InvestEvaluate @evaluateLookMore="evaluateLookMore" :info="detailInfo" />
  </view>
</template>

<script>
  import CarInfo from './components/CarInfo'
  import ProductInfo from './components/ProductInfo'
  import StoreInfo from './components/StoreInfo'
  import ProductDetail from './components/ProductDetail'
  import CarModel from './components/CarModel'
  import ServiceSafe from './components/ServiceSafe'
  import ProductParams from './components/ProductParams'
  import InstallationGuide from './components/InstallationGuide'
  import InvestEvaluate from './components/InvestEvaluate'

  export default {
    components: {
      CarInfo,
      ProductInfo,
      StoreInfo,
      ProductDetail,
      CarModel,
      ServiceSafe,
      ProductParams,
      InstallationGuide,
      InvestEvaluate,
    },
    data() {
      return {
        detailInfo: null,
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
        storeData: {
          storeName: '江陵动力官方旗舰店',
          productScore: '9.5',
          serviceScore: '8.5',
          logisticsScore: '5.5',
        },
        carModelList: ['大众全系', '宝马X5全系', '奔驰A级AMG全系', '保时捷（Panamere新能源全系）'],
        productDatalList: [
          '发动机型号：B15',
          '发动机型号：B15',
          '气缸容量：1.5L',
          '大众朗逸2022款1.5L手自一体视野版',
        ],
        ServiceData: [
          { title: '服务:', content: '7*24h人工技术支持' },
          { title: '售后:', content: '整机质保 质保周期长  赔付快' },
        ],
      }
    },
    onLoad(options) {
      if (!options?.id) {
        this.$u.toast('缺少参数')
        return
      }
      this.initDetail(options.id)
    },
    methods: {
      async initDetail(id) {
        try {
          const data = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentBuyerPreview({ id,companyId:this.userInfo.companyId })
          this.detailInfo = data.data
        } catch (e) {
          console.warn(e, 'InvestmentDetail')
          this.$u.toast(e?.message || e?.data?.message || '服务端错误')
        }
      },
      carModelLookMore() {
        this.$linkToEasy('/pagesSupplier/InvestmentInfo/InvestCarModel')
      },
      productParamsLookMore() {
        this.$linkToEasy('/pagesSupplier/InvestmentInfo/InvestProductParams')
      },
      evaluateLookMore() {
        this.$linkToEasy(
          '/pagesSupplier/InvestmentInfo/InvestEvaluate?goodsId=' + this.detailInfo.goodsId,
        )
      },
      storeInfoClick() {
        // this.$linkToEasy('/pagesSupplier/InvestmentInfo/ChooseWarehouse')
        this.$linkToEasy('/pagesSupplier/InvestmentInfo/InvestChooseGood')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .investment {
    width: 750rpx;
    min-height: 100vh;
    overflow-y: hidden;
  }
</style>
