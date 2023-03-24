<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="shop"
  >
    <VoNav is-fixed is-have-more title="相似商品" />
    <view class="vh-full flex flex-column overflow-hidden relative">
      <!--  顶部固定区域  -->
      <scroll-view
        class="flex1 overflow-hidden"
        scroll-y
        @scroll="scrollHandler"
        @scrolltolower="loadMore"
      >
        <!--  商品信息列表区域  -->
        <BuyGoodsInfo
          v-for="(item, index) in shopListData"
          :key="index"
          :good-info="item"
          @BuyNow="buyHandler(item)"
          :show-new="showNew"
          @click.native="goGoodsDetail(item)"
        />
        <VoLoadingText :has-more="hasMore" :loading="loading" />
      </scroll-view>
    </view>

    <u-popup :round="10" :show="showBuyNow" closeable mode="bottom" @close="close" @open="open">
      <BuyNow :info="currentRow" @confirm="confirm" :show-new="showNew" />
    </u-popup>
  </view>
</template>
<script>
  import BuyGoodsInfo from './components/BuyGoodsInfo'
  import BuyNow from './components/BuyNow'
  import VoLoadingText from '@/components/VoLoadingText/VoLoadingText'

  export default {
    name: 'SimilarPro',
    components: { BuyGoodsInfo, BuyNow, VoLoadingText },
    data() {
      return {
        hasMore: true,
        loading: false,
        keyword: '', // 搜索双向绑定
        showBuyNow: false,
        fixedTop: false, // 锁定到顶部车系
        pageQuery: {
          pageNo: 1,
          pageSize: 10,
          queryType: 'A',
        },
        queryForm: {
          name: '',
        },
        shopListData: [],
        currentRow: null,
        vehicleList: [], //热门车型
        brandList: [], //热门品牌
        typeList: [], //商品类型
        orderList: [
          {
            name: '销量高',
            value: 'saleCount',
            orderType: 'ASC',
            choosed: false,
          },
          // { name: '到货快', value: 'deliveryTime', orderType: 'ASC', choosed: false },
          { name: '价格低', value: 'cashPrice', orderType: 'ASC', choosed: false },
        ],
        vehicleChoose: '', // 选中车型
        brandChoose: [], //选中品牌
        typeChoose: [], //选中类型
        orderProperty: '', //选中排序属性cashPrice：价格 ；deliveryTime ：到货快；saleCount：销量
        orderType: 'ASC', //"ASC", "升序" "DESC", "降序"
        valetVehicleBrandQOList: [], //车品牌下所有车系
        isBrandChoose: false, //是否进行品牌选择操作
        isTypeChoose: false, //是否进行类型选择操作
        analyzerNames: '',
        showNew: true, //是否展示以旧换新
      }
    },
    watch: {
      brandList: {
        handler(newValue, oldValue) {
          if (newValue.length) {
            this.brandChoose = newValue.filter((item) => item.choosed)
          } else {
            this.brandChoose = []
          }
          if (this.isBrandChoose) {
            this.queryData(true)
          }

          console.log('brandChoose', this.brandChoose)
        },
        deep: true,
      },
      typeList: {
        handler(newValue, oldValue) {
          if (newValue.length) {
            this.typeChoose = newValue.filter((item) => item.choosed)
          } else {
            this.typeChoose = []
          }
          if (this.isTypeChoose) {
            this.queryData(true)
          }

          console.log('typeChoose', this.typeChoose)
        },
        deep: true,
      },
    },
    onLoad(options) {
      // 初始化头部数据
      this.analyzerNames = JSON.parse(options.goodsNames)
      this.showNew = this.userInfo.platformCode === 'agent'
      this.initData()
      this.queryData(true)
      uni.$off('select')
      uni.$off('selectVehicle')
      uni.$on('select', (row) => {
        console.log('brandChooseonLoad', row)
        this.brandChoose = row
        this.queryData(true)
      })
      //获取选择车型
      uni.$on('selectVehicle', (row) => {
        this.vehicleChoose = {
          id: row[0].parentId,
          name: row[0].parentName,
        }
        this.valetVehicleBrandQOList = row.map((item) => {
          return {
            id: item.id,
            level: item.level,
          }
        })
        console.log('valetVehicleBrandQOListonLoad', this.valetVehicleBrandQOList)
        this.queryData(true)
      })
    },
    methods: {
      // 初始化头部数据
      async initData() {
        //热门车型
        let vehicleRes = await this.$VoHttp.BUSINESS.businessVehicleBrandSelectOne()
        this.vehicleList = vehicleRes.data.hotList

        //热门品牌
        let brandRes = await this.$VoHttp.GOODS.apiGoodsBrandQueryListHot()
        this.brandList = brandRes.data.map((item) => {
          return {
            ...item,
            choosed: false,
          }
        })
        //商品类型
        let typeRes = await this.$VoHttp.GOODS.apiGoodsTypeQueryList({ categoryId: 1000000001 })
        this.typeList = typeRes.data.map((item, index) => {
          return {
            id: index,
            name: item,
            choosed: false,
          }
        })
      },
      toMore(name) {
        let path = ''
        if (name === 'vehicle') {
          path = '/pagesGarage/ShopList/VehicleType?brandId=' + this.vehicleChoose.id
        } else {
          path = '/pagesGarage/ShopList/BrandList'
        }
        this.$linkToEasy(path)
      },

      //车型选择
      vehicleChoosed(info) {
        this.vehicleChoose = info
        //获取车系列表
        this.$VoHttp.BUSINESS.businessVehicleBrandSelectSeries({ brandid: info.id }).then((res) => {
          this.valetVehicleBrandQOList = res.data.map((item) => {
            return {
              id: item.id,
              level: item.level,
            }
          })
          this.queryData(true)
        })
      },
      //品牌选择
      brandChoosed(info) {
        this.isBrandChoose = true
        this.brandList.forEach((item) => {
          if (item.id === info.id) {
            item.choosed = !item.choosed
          }
        })
        // this.queryData(true)
      },
      //类型选择
      typeChoosed(info) {
        this.isTypeChoose = true
        this.typeList.forEach((item) => {
          if (item.id === info.id) {
            item.choosed = !item.choosed
          }
        })
        // this.queryData(true)
      },
      //排序选择
      orderChoosed(info) {
        if (info.value === this.orderProperty) {
          this.orderProperty = ''
          this.orderType = ''
          this.orderList.forEach((item) => {
            item.choosed = false
          })
          this.queryData(true)
          return
        }
        this.orderProperty = info.value
        this.orderType = info.orderType
        this.orderList.forEach((item) => {
          if (item.name === info.name) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
        this.queryData(true)
      },
      //删除已选tag
      brandDel(info, listName) {
        this[listName].forEach((item) => {
          if (item.id === info.id) {
            item.choosed = false
          }
        })
      },
      //清空筛选
      clearFilter() {
        this.vehicleChoose = ''
        this.brandChoose = []
        this.typeChoose = []
        this.brandList.forEach((item) => {
          item.choosed = false
        })
        this.typeList.forEach((item) => {
          item.choosed = false
        })
        this.queryData(true)
      },
      buyHandler(row) {
        this.currentRow = Object.assign({}, row)
        this.showBuyNow = true
      },
      // 滑动到底部-加载更多
      loadMore() {
        if (this.hasMore && !this.loading) {
          this.pageQuery.pageNo += 1
          this.queryData()
        }
      },
      // 搜索触发
      searchHandler(res) {
        this.queryData(true)
        console.log(res)
        if (!res) return
        // 执行搜索逻辑
      },
      // 加载商品列表数据
      async queryData(init) {
        try {
          this.loading = true
          if (init) {
            this.pageQuery.pageNo = 1
            this.shopListData = []
          }
          let brandIds = this.brandChoose.length ? this.brandChoose.map((item) => item.id) : []
          let categoryTypes = this.typeChoose.length ? this.typeChoose.map((item) => item.name) : []
          let params = {
            brandIds: brandIds,
            categoryTypes: categoryTypes,
            orderProperty: this.orderProperty,
            orderType: this.orderProperty ? this.orderType : '',
            valetVehicleBrandQOList: this.valetVehicleBrandQOList,
            // salesArea: '12',
          }
          if (this.analyzerNames) {
            params.analyzerNames = this.analyzerNames
          }
          // const { data } = await new Promise(() => {})
          const { data } = await this.$VoHttp.GOODS.apiGoodsQueryWarehousesGoodsList({
            ...this.pageQuery,
            ...this.queryForm,
            ...params,
          })
          this.loading = false
          this.shopListData = this.shopListData.concat(data.records)
          console.log('this.shopListData22222222', this.shopListData)
          this.hasMore = this.shopListData.length < data.total
        } catch (e) {
          this.loading = false
          this.hasMore = false
          console.warn(e, 'TargetFile=>>ShopList')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      // 滑动触发判断是否固定
      scrollHandler({ detail: { scrollTop } }) {
        if (scrollTop >= 205 && !this.fixedTop) {
          this.fixedTop = true
        }
        if (scrollTop < 205 && this.fixedTop) {
          this.fixedTop = false
        }
      },
      open() {
        // console.log('open');
      },
      close() {
        this.showBuyNow = false
        // console.log('close');
      },
      /**
       * 去商品详情
       */
      goGoodsDetail(item) {
        this.$linkToEasy(
          `/pagesGarage/ShopList/GoodsDetail?id=${item.goodId}&wid=${item.warehouseId}`,
        )
      },
      /**
       * 去提交订单
       */
      confirm() {
        // 存储商品信息，并带到提交订单页面
        // 组装需要的数据
        console.log(this.currentRow)
        const orderProductInfo = {
          shopInfo: {
            shopName: this.currentRow.shopName,
          },
          goodsInfo: {
            addedServices: [],
            goodsCount: 1,
            goodsId: this.currentRow.goodId,
            isCash: true,
            originalPrice: this.currentRow.cashPrice,
            periodDays: 0,
            projectId: '',
            shippingType: this.currentRow.shippingType || 2, // 1 包邮 2 到付
            codingPrice: this.currentRow.codingPrice,
            isCoding: this.currentRow.isCoding,
            shopId: this.currentRow.shopId,
            skuProperty: JSON.stringify(this.currentRow.skuProperty || {}),
            warehouseId: this.currentRow.warehouseId,
            warehouseName: this.currentRow.warehouseName,
            arrivalTime: this.currentRow.arrivalTime,
            pic: this.currentRow.pic,
            name: this.currentRow.name,
          },
        }
        this.$storage.set('ProductInfo', orderProductInfo)
        this.$linkToEasy(`/pagesGarage/ShopList/SubmitOrders`)
        this.showBuyNow = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .fixed-car {
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    z-index: 3;
  }

  .fixed-car-app {
    position: fixed;
    left: 0;
    right: 0;
    top: 142px;
    z-index: 3;
  }

  .shop {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;

    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }

    &-slide {
      padding: 16rpx 0 16rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      //overflow-x: scroll;
      &__img {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        overflow: hidden;
      }

      &__name {
        line-height: 28rpx;
        font-size: 24rpx;
        margin-top: 4rpx;
        white-space: nowrap;
        color: $v-c0-65;
      }

      &__more {
        width: 80rpx;
        //height: 112rpx;
        font-size: 24rpx;
        white-space: nowrap;
        display: flex;
        flex-direction: column;
        align-items: center;
        //justify-content: center;
        padding-right: 32rpx;
        box-sizing: border-box;
      }

      &__more2 {
        font-size: 24rpx;
        white-space: nowrap;
        padding-right: 24rpx;
      }

      &__type {
        display: flex;
        align-items: center;
        white-space: nowrap;
        //margin-top: 32rpx;
        .type-tips {
          font-size: 28rpx;
          color: $v-c0-85;
          margin-right: 40rpx;
        }

        .type-delete {
          width: 128rpx;
          height: 64rpx;
          font-size: 28rpx;
          color: $v-c0-45;
        }

        .type-selected {
          height: 36rpx;
          color: #e50012;
          font-size: 24rpx;
          background: #feecee;
          border: 2rpx solid #f7909c;
          border-radius: 16px;
          margin-right: 24rpx;
          padding: 0 6rpx 0 16rpx;
        }

        .type-scroll {
          overflow-x: auto;
        }

        .type-block {
          height: 32rpx;
          line-height: 32rpx;
          background: #f6f7f8;
          border: 2rpx solid #f6f7f8;
          border-radius: 80rpx;
          margin-right: 16rpx;
          padding: 6rpx 24rpx;
          font-size: 24rpx;
          color: $v-c0-85;
          &.choosed {
            background: #feecee;
            border: 2rpx solid #f7909c;
            color: #e50012;
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
        }

        &.no-select {
          background: #f6f7f8;
          border: 2rpx solid transparent;
        }
      }
    }
  }
</style>
