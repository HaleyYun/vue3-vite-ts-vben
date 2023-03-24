<template>
  <view>
    <view class="invest flex flex-column">
      <!-- 搜索 -->
      <VoNav :is-fixed="false" :leftWidth="80" :rightWidth="80" is-have-more>
        <block slot="title">
          <view>
            <VoSearch
              v-model="keyword"
              :actionStyle="{ color: '#FF5319' }"
              class="invest-search"
              height="34"
              placeholder="请输入搜索"
              @custom="getData(true)"
              @search="getData(true)"
            >
            </VoSearch>
          </view>
        </block>
      </VoNav>
      <!-- 收藏 -->
      <view class="invest-shop flex flex-vertical-c border-box m-t-16 bg-white">
        <image :src="storeInfo.storeUrl" class="invest-shop__img" />
        <view class="flex-justify-c flex1 m-l-16" @click="goStoreDetail(shopId)">
          <view class="flex flex-row flex-vertical-c">
            <!--            <VoIcon name="smile-m" @click.native="toIm()" />-->
            <view class="invest-shop__name">{{ storeInfo.storeName }}</view>
            <VoIcon class="v-middle" name="right-arrow" size="20" />
          </view>
          <view class="invest-shop__collection m-t-6 m-l-8 flex">
            <text> {{ storeInfo.collectNum || '0' }}人收藏</text>
            <!--            <view class="flex align-vertical m-l-30" @click="goStoreDetail(shopId)"-->
            <!--              >店铺详情 <VoIcon class="v-middle" name="right-arrow" size="20"-->
            <!--            /></view>-->
          </view>
        </view>
        <view
          v-if="userInfo.companyId !== shopId"
          :class="storeInfo.isCollect ? 'selected' : 'unselected'"
          class="unselected"
          @click.stop="collectFn()"
        >
          {{ storeInfo.isCollect ? '已收藏' : '收藏' }}
        </view>
      </view>
      <!-- 固定选择车型：start H5端	-->
      <view
        v-if="fixedTop && (vehicleChoose.length || brandChoose.length || typeChoose.length)"
        :style="{ top: Number($systemInfo.statusBarHeight) + 90 + 'px' }"
        class="shop-slide__type fixed-car bg-white p-y-16"
      >
        <scroll-view class="flex1 type-scroll p-l-32" scroll-x>
          <view class="flex flex-vertical-c">
            <view
              v-for="item in vehicleChoose"
              v-show="vehicleChoose.length"
              :key="item.name"
              class="type-selected flex flex-vertical-c"
            >
              <view class="m-r-8">{{ item.name }}</view>
              <VoIcon
                :opacity="0.45"
                :size="12"
                color="#000000"
                name="close-c"
                @click="vehicleDel(item)"
              />
            </view>
            <view
              v-for="item in brandChoose"
              :key="item.id"
              class="type-selected flex flex-vertical-c"
            >
              <view class="m-r-8">{{ item.name }}</view>
              <VoIcon
                :opacity="0.45"
                :size="12"
                color="#000000"
                name="close-c"
                @click="brandDel(item, 'brandList')"
              />
            </view>
            <view
              v-for="item in typeChoose"
              :key="item.id"
              class="type-selected flex flex-vertical-c"
            >
              <view class="m-r-8">{{ item.name }}</view>
              <VoIcon
                :opacity="0.45"
                :size="12"
                color="#000000"
                name="close-c"
                @click="brandDel(item, 'typeList')"
              />
            </view>
          </view>
        </scroll-view>
        <view class="type-delete flex flex-vertical-c flex-justify-c" @click="clearFilter">
          <view class="m-r-4 color-block-45">清空</view>
          <VoIcon :opacity="0.45" :size="16" color="#000" name="delete" />
        </view>
      </view>
      <!-- 固定选择车型：end	-->
      <!-- <view class="shop-slide__type bg-white m-t-16">
        <scroll-view class="flex1 type-scroll" scroll-x>
          <view class="flex flex-vertical-c">
            <view
              v-for="info in orderList"
              :key="info.name"
              :class="info.choosed ? 'choosed' : ''"
              class="type-block"
              @click="orderChoosed(info)"
            >
              {{ info.name }}
            </view>
          </view>
        </scroll-view>
      </view> -->
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <scroll-view
        :refresher-threshold="10"
        :refresher-triggered="triggered"
        class="goods-list scroll-view overflow-y"
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
        <!--  3= 服务商首页、服务商进货列表/全国投放、服务商进货/全国店铺项目列表 结果页-/pagesAgent/VinTell/VinTell
            4= 服务商代客下单列表、服务商代客下单店铺主页 结果页-/pagesAgent/GlobalSearch/QueryResult
            5= 修理厂首页、买货列表、买货店铺主页  结果页-/pagesGarage/GlobalSearch/QueryResult -->
        <!--  当前为代客下单店铺页面origin=4 和 修理厂买货店铺页面origin=5 -->
        <VoGroupVinBtn
          :leftName="userInfo.roleCode === 'agent' ? 'VIN查询' : 'VIN找货'"
          background="#FEF9F1"
          borderColor="#FFE2B8"
          class="invest-group"
          @leftBtnFn="vin"
          @rightBtnFn="rightBtnFn"
        ></VoGroupVinBtn>
        <!--  左右可滑动区域  -->
        <view class="shop-slide">
          <!-- <scroll-view scroll-x>
            <view class="flex flex-vertical-c">
              <block v-for="(info, infoIndex) in vehicleList" :key="info.id">
                <view
                  v-if="infoIndex < 10"
                  class="flex flex-column flex-vertical-c m-r-40"
                  @click="vehicleChoosed(info)"
                >
                  <image :src="info.logo" class="shop-slide__img" />
                  <view class="shop-slide__name">{{ info.name }}</view>
                </view>
              </block>
              <view class="shop-slide__more" @click="toMore('vehicle')">
                <view>查看</view>
                <view class="m-b-4">更多</view>
                <VoIcon :size="12" name="left-right-arrow" />
              </view>
            </view>
          </scroll-view> -->
          <!--          <view class="shop-slide__type">-->
          <!--            <view class="type-tips">车型</view>-->
          <!--            <scroll-view class="flex1 type-scroll" scroll-x>-->
          <!--              <view class="flex flex-vertical-c">-->
          <!--                <block v-for="(info, infoIndex) in vehicleList" :key="info.id">-->
          <!--                  <view-->
          <!--                    v-if="infoIndex < 4"-->
          <!--                    :class="info.choosed ? 'choosed' : ''"-->
          <!--                    class="type-block"-->
          <!--                    @click="vehicleChoosed(info)"-->
          <!--                  >-->
          <!--                    {{ info.name }}-->
          <!--                  </view>-->
          <!--                </block>-->
          <!--                <view-->
          <!--                  v-if="vehicleList.length > 4"-->
          <!--                  class="flex flex-vertical-c shop-slide__more2"-->
          <!--                  @click="toMore('vehicle')"-->
          <!--                >-->
          <!--                  <view>查看更多</view>-->
          <!--                  <VoIcon :size="12" name="left-right-arrow" />-->
          <!--                </view>-->
          <!--              </view>-->
          <!--            </scroll-view>-->
          <!--          </view>-->
          <view class="shop-slide__type">
            <view class="type-tips">品牌</view>
            <scroll-view class="flex1 type-scroll" scroll-x>
              <view class="flex flex-vertical-c">
                <block v-for="(info, infoIndex) in brandList" :key="info.id">
                  <view
                    v-if="infoIndex < 3"
                    :class="info.choosed ? 'choosed' : ''"
                    class="type-block"
                    @click="brandChoosed(info)"
                  >
                    {{ info.name }}
                  </view>
                </block>
                <view
                  v-if="brandList.length > 3"
                  class="flex flex-vertical-c shop-slide__more2"
                  @click="toMore('brand')"
                >
                  <view>查看更多</view>
                  <VoIcon :size="12" name="left-right-arrow" />
                </view>
              </view>
            </scroll-view>
          </view>
          <view class="shop-slide__type m-t-32">
            <view class="type-tips">类型</view>
            <scroll-view class="flex1 type-scroll" scroll-x>
              <view v-if="typeList && typeList.length" class="flex flex-vertical-c">
                <block v-for="(info, infoIndex) in typeList" :key="info.id">
                  <view
                    v-if="infoIndex < 10"
                    :class="info.choosed ? 'choosed' : ''"
                    class="type-block"
                    @click="typeChoosed(info)"
                  >
                    {{ info.name }}
                  </view>
                </block>
              </view>
            </scroll-view>
          </view>
          <view class="shop-slide__type m-t-32 p-b-18">
            <view class="type-tips">排序</view>
            <scroll-view class="flex1 type-scroll" scroll-x>
              <view class="flex flex-vertical-c">
                <view
                  v-for="info in orderList"
                  :key="info.name"
                  :class="info.choosed ? 'choosed' : ''"
                  class="type-block"
                  @click="orderChoosed(info)"
                >
                  {{ info.name }}
                </view>
              </view>
            </scroll-view>
          </view>
          <view
            v-if="vehicleChoose.length || brandChoose.length || typeChoose.length"
            class="shop-slide__type m-t-14"
          >
            <scroll-view class="flex1 type-scroll" scroll-x>
              <view class="flex flex-vertical-c">
                <view
                  v-for="item in vehicleChoose"
                  v-show="vehicleChoose.length"
                  :key="item.name"
                  class="type-selected flex flex-vertical-c"
                >
                  <view class="m-r-8">{{ item.name }}</view>
                  <VoIcon
                    :opacity="0.45"
                    :size="12"
                    color="#000000"
                    name="close-c"
                    @click="vehicleDel(item)"
                  />
                </view>
                <view
                  v-for="item in brandChoose"
                  :key="item.id"
                  class="type-selected flex flex-vertical-c"
                >
                  <view class="m-r-8">{{ item.name }}</view>
                  <VoIcon
                    :opacity="0.45"
                    :size="12"
                    color="#000000"
                    name="close-c"
                    @click="brandDel(item, 'brandList')"
                  />
                </view>
                <view
                  v-for="item in typeChoose"
                  :key="item.id"
                  class="type-selected flex flex-vertical-c"
                >
                  <view class="m-r-8">{{ item.name }}</view>
                  <VoIcon
                    :opacity="0.45"
                    :size="12"
                    color="#000000"
                    name="close-c"
                    @click="brandDel(item, 'typeList')"
                  />
                </view>
              </view>
            </scroll-view>
            <view class="type-delete flex flex-vertical-c flex-justify-c" @click="clearFilter">
              <view class="m-r-4 color-block-45">清空</view>
              <VoIcon :opacity="0.45" :size="16" color="#000" name="delete" />
            </view>
          </view>
        </view>
        <block v-if="infoList.length > 0">
          <!-- 商品信息 -->
          <view class="line-16" />
          <BuyGoodsInfo
            v-for="(item, index) in infoList"
            :key="index"
            :class="!index ? 'no-margin' : ''"
            :good-info="item"
            :show-arrive="false"
            :showNew="showNew"
            @BuyNow="buyHandler(item)"
            @click.native="goGoodsDetail(item)"
          />
          <VoLoadingText :has-more="hasMore" :loading="loading" />
        </block>
        <VoNoData v-else-if="isLoadingOver" />
      </scroll-view>
    </view>
    <u-popup :round="10" :show="showBuyNow" closeable mode="bottom" @close="showBuyNow = false">
      <BuyNow :info="currentRow" :showNew="showNew" @confirm="confirm" />
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
  </view>
</template>

<script>
  // import InvestmentGoods from './components/InvestmentGoods'
  // import InvestmentPopup from './components/InvestmentPopup'
  // import FliterPop from './components/FliterPop'
  // import FliterPopPay from './components/FliterPopPay'
  import {
    chooseImageOcrByPromise,
    floatTwo,
    hideLoading,
    showLoading,
    vocenCameraFn,
  } from '@/common/helper'
  import BuyGoodsInfo from './components/BuyGoodsInfo'
  import BuyNow from './components/BuyNow'
  import VoLoadingText from '@/components/VoLoadingText/VoLoadingText'

  export default {
    name: 'ShopGoodsList',
    components: { BuyGoodsInfo, BuyNow, VoLoadingText },
    data() {
      return {
        salesArea: '',
        isLoadingOver: false,
        shopDetail: {
          shopId: '',
          shopName: '',
          startNumber: '',
          storeUrl: '',
        },
        shopId: '', //商铺id
        keyword: '', // 搜索双向绑定
        current: 0, // 横向tabs默认

        infoList: [],
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        isSelect: false,
        isCheckedPrice: false,
        isCheckedReturn: false,
        isCheckedNum: false,
        detailInfo: null,
        hasMore: true,
        loading: false,

        showInvestment: false, // 弹出层
        btnText: '',
        dataObj: {},
        storeInfo: '',
        isLoading: false,
        showBuyNow: false,
        fixedTop: false, // 锁定到顶部车系
        confirmModal: false, //确认下单弹框控制
        currentRow: null,

        vehicleList: [], //热门车型
        brandList: [], //热门品牌
        typeList: [], //商品类型
        orderList: [
          {
            name: '销量高',
            value: 'saleCount',
            orderType: 'DESC',
            choosed: false,
          },
          // { name: '到货快', value: 'deliveryTime', orderType: 'DESC', choosed: false },
          { name: '价格低', value: 'cashPrice', orderType: 'ASC', choosed: false },
        ],
        vehicleChoose: [], // 选中车型
        brandChoose: [], //选中品牌
        typeChoose: [], //选中类型
        orderProperty: '', //选中排序属性cashPrice：价格 ；deliveryTime ：到货快；saleCount：销量
        orderType: 'ASC', //"ASC", "升序" "DESC", "降序"
        valetVehicleBrandQOList: [], //车品牌下所有车系
        isBrandChoose: false, //是否进行品牌选择操作
        isTypeChoose: false, //是否进行类型选择操作
        currentType: null, // 代客下单跳转参数  L 我的商品 A 全网商品
        companyId: null, // 代客下单参数
        isCash: 1,
        scanCount: 0,
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
            this.getData(true)
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
            this.getData(true)
          }

          console.log('typeChoose', this.typeChoose)
        },
        deep: true,
        salesArea: '',
      },
    },
    onLoad(options) {
      this.salesArea = options.salesArea
      this.shopId = options.shopId
      this.companyId = options.companyId
      this.currentType = options.current || null
      if (this.currentType) {
        this.showNew = false
      }
      console.log(this.$storage.get('garageArea'))
      this.salesArea = this.$storage.get('garageArea') || ''
      this.initData()
      this.getStoreDetailRequest()
      this.getData(true)
      uni.$off('shopCollect')
      uni.$on('shopCollect', (row) => {
        this.getStoreDetailRequest()
      })
      uni.$off('select')
      uni.$off('selectVehicle')
      uni.$on('select', (row) => {
        let obj = {}
        let result = row.reduce((item, next) => {
          obj[next.id] ? '' : (obj[next.id] = true && item.push(next))
          return item
        }, [])
        this.brandChoose = result
        this.brandChoose.forEach((item) => {
          this.brandList.find((value) => value.id == item.id).choosed = true
        })
        console.log('brandChooseonLoad', result)
        setTimeout(() => {
          if (this.brandChoose.length) {
            this.getData(true)
          }
        }, 1000)
      })
      //获取选择车型
      uni.$on('selectVehicle', (row) => {
        // console.log('info=====', row)
        this.vehicleChoose = row
        this.vehicleList.forEach((item) => {
          item.choosed = false
        })
        this.vehicleChoose.forEach((item) => {
          if (this.vehicleList.find((value) => value.name == item.name)) {
            this.vehicleList.find((value) => value.name == item.name).choosed = true
          }
        })
        // this.valetVehicleBrandQOList = row.map((item) => {
        //   return {
        //     id: item.id,
        //     level: item.level,
        //     parentName: item.parentName,
        //   }
        // })
        let arr = []
        row.forEach((item) => {
          item.child.forEach((it) => {
            arr.push({
              id: it.id,
              level: it.level,
              parentName: it.parentName,
            })
          })
        })
        this.valetVehicleBrandQOList = arr
        console.log('valetVehicleBrandQOListonLoad', this.valetVehicleBrandQOList)
        if (this.valetVehicleBrandQOList.length) {
          this.getData(true)
        }
      })
    },
    methods: {
      //获取店铺详情数据
      getStoreDetailRequest() {
        let params = {
          companyId: this.shopId,
        }
        this.$VoHttp
          .apiCompanyInfoStore(params, { noLoading: true })
          .then((res) => {
            console.log(res)
            this.storeInfo = res.data
          })
          .catch((err) => {
            this.$u.toast(err.message || '店铺详情获取失败')
          })
      },
      collectFn() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        // 收藏
        if (!this.storeInfo.isCollect) {
          console.log('收藏===>', this.shopId)
          let params = {
            contentId: this.shopId,
            collectionType: 3,
          }
          this.$VoHttp.GOODS.apiGoodsCollectionCollectionStore(params)
            .then((res) => {
              if (+res.code === 20001) {
                this.$toast('收藏成功', 'success', '/static/icons/success_icon.png', 1500)
                this.storeInfo.isCollect = true
                this.getStoreDetailRequest()
              }
              this.isLoading = false
            })
            .catch((err) => {
              console.log('err', err)
              uni.$u.toast(err.message || '收藏失败')
              this.isLoading = false
            })
        } else if (this.storeInfo.isCollect) {
          // 取消收藏
          this.$VoHttp.GOODS.apiGoodsCollectionCancelStore$Id({ id: this.shopId })
            .then((res) => {
              console.log(res.data)
              this.storeInfo.isCollect = false
              uni.$u.toast('已取消收藏')
              this.getStoreDetailRequest()
              this.isLoading = false
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
              this.isLoading = false
            })
        }
      },
      buyHandler(row) {
        if (row.warnLabel === '无货') {
          this.$u.toast('商品暂不支持购买，请购买其他商品')
          return
        }
        this.currentRow = Object.assign({}, row)
        this.showBuyNow = true
      },
      /**
       * 去商品详情
       */
      goGoodsDetail(item) {
        console.log(this.userInfo)
        // 代客下单跳转
        if (this.userInfo.roleCode === 'agent') {
          this.$linkToEasy(
            `/pagesAgent/GoodsList/GoodsDetail?id=${item.goodId}&wid=${item.warehouseId}&companyId=${this.companyId}&current=${this.currentType}`,
          )
        } else {
          this.$linkToEasy(
            `/pagesGarage/ShopList/GoodsDetail?id=${item.goodId}&wid=${item.warehouseId}`,
          )
        }
      },
      /**
       *  车辆查询
       */
      rightBtnFn() {
        // origin=4代客下单店铺跳转
        if (this.userInfo.roleCode === 'agent') {
          this.$linkToEasy('/pagesProduct/ApplicationCar/ApplicationCarNew?origin=4')
        } else {
          // origin=5汽修厂买货店铺跳转
          this.$linkToEasy('/pagesProduct/ApplicationCar/ApplicationCarNew?origin=5')
        }
      },
      /**
       *  VIN找货
       */
      async vin() {
        // 服务商代客下单
        if (this.userInfo.roleCode === 'agent') {
          let res = null
          // #ifdef APP-PLUS
          res = await vocenCameraFn('/v1/api/business/vehicle/scan/vinoreno')
          // #endif
          // #ifndef APP-PLUS
          res = await chooseImageOcrByPromise({
            count: 1,
            sizeType: ['compressed'],
            tip: '正在识别',
            apiUrl: '/v1/api/business/vehicle/scan/vinoreno',
          })
          // #endif

          if (res && res.data) {
            let data = JSON.parse(res.data)

            if (+data.data.scanResultType === 1) {
              // 商品
              if (data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath) {
                this.$storage.set('imageInfoVO', data.data.imageInfoVO)
              }
              this.$linkToEasy(
                `/pagesAgent/GlobalSearch/QueryResult?salesArea=${this.salesArea}&code=${
                  data.data.code
                }&companyId=${this.companyId}&userName=${this.userName}&imType=${
                  this.imType
                }&queryType=${this.dataObj.queryType}&type=${res.type}&imageInfoVO=${
                  data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath
                    ? data.data.imageInfoVO.filePath
                    : ''
                }`,
              )
              return
            }
          }

          this.$u.toast('识别失败')
        } else {
          // 修理厂买货店铺
          if (!this.$checkIsApproveFn()) {
            this.showApprove = true
            return
          }
          let res = null

          // #ifdef APP-PLUS
          res = await vocenCameraFn('/v1/api/business/vehicle/scan/vinoreno')
          // #endif
          // #ifndef APP-PLUS
          res = await chooseImageOcrByPromise({
            count: 1,
            sizeType: ['compressed'],
            tip: '正在识别',
            apiUrl: '/v1/api/business/vehicle/scan/vinoreno',
          })
          res.type = 'scan'
          // #endif

          if (res && res.data) {
            let data = JSON.parse(res.data)
            console.log(data)
            this.scanData = data
            this.voiceTurnText = data.data.code
            // this.getLink(this.voiceTurnText)
            // 走另一个接口，判断是否有订单
            // let rec = await this.$VoHttp.apiBusinessVehicleBrandOcrGoods({
            //   code: data.data.code,
            // })
            if (+data.data.scanResultType === 1) {
              // 商品
              if (data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath) {
                this.$storage.set('imageInfoVO', data.data.imageInfoVO)
              }
              this.$linkToEasy(
                `/pagesGarage/GlobalSearch/QueryResult?code=${data.data.code}&type=${
                  res.type
                }&imageInfoVO=${
                  data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath
                    ? data.data.imageInfoVO.filePath
                    : ''
                }`,
              )
            } else if (+data.data.scanResultType === 2) {
              // 售后
              this.$linkToEasy(`/pagesGarage/GlobalSearch/AfterSalesService?code=${data.data.code}`)
            } else {
              this.$linkToEasy(
                '/pagesGarage/GlobalSearch/UpdateVin?imageInfoVO=' +
                  (data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath
                    ? data.data.imageInfoVO.filePath
                    : '') +
                  '&type=2',
              )
            }
          }
        }
      },
      // 初始化头部数据
      async initData() {
        //热门车型
        let vehicleRes = await this.$VoHttp.apiGoodsqueryVehicleModelList(
          { shopId: this.shopId },
          { noLoading: true },
        )
        let vehicleList = []
        if (vehicleRes.data && vehicleRes.data.length) {
          vehicleRes.data.forEach((item) => {
            item.list.forEach((listItem) => {
              listItem.initials = item.initials
            })
            vehicleList = vehicleList.concat(item.list)
          })
          this.vehicleList = vehicleList.map((item) => {
            return {
              ...item,
              choosed: false,
            }
          })
        }

        //热门品牌
        let brandRes = await this.$VoHttp.apiGoodsqueryBrandList(
          { shopId: this.shopId },
          { noLoading: true },
        )
        let brandList = []
        if (brandRes.data && brandRes.data.length) {
          brandRes.data.forEach((item) => {
            brandList = brandList.concat(item.list)
          })
          this.brandList = brandList.map((item) => {
            return {
              ...item,
              choosed: false,
            }
          })
        }

        //商品类型 修改2022-10-09 13:28:43 林宗宗让 0 改成 1000000001
        let typeRes = await this.$VoHttp.apiGoodsqueryGoodsTypeList(
          { shopId: this.shopId },
          { noLoading: true },
        )
        if (typeRes.data && typeRes.data.length) {
          const typeList = typeRes.data.map((item, index) => {
            return {
              id: index,
              name: item,
              choosed: false,
            }
          })
          typeList.map((item) => {
            if (item.name) {
              this.typeList.push(item)
            }
          })
        }
      },
      toMore(name) {
        //存储已选定品牌
        this.$storage.set('shopBrandChoosed', this.brandChoose)
        let path = ''
        if (name === 'vehicle') {
          let arr = []
          path = `/pagesGarage/ShopList/VehicleType?origin=shop&shopId=${this.shopId}`
          if (this.vehicleChoose.length) {
            console.log('this.vehicleChoose', this.vehicleChoose)
            this.vehicleChoose.forEach((item) => {
              const { id, initials } = item
              arr.push({ id, initials })
            })
            path = `/pagesGarage/ShopList/VehicleType?brandId=${JSON.stringify(
              arr,
            )}&origin=shop&shopId=${this.shopId}`
          }
        } else {
          path = `/pagesGarage/ShopList/ShopBrandList?shopId=${this.shopId}`
        }
        this.$linkToEasy(path)
      },

      //车型选择
      async vehicleChoosed(info) {
        let val = info.choosed
        this.vehicleList.forEach((item) => {
          if (item.id === info.id) {
            item.choosed = !item.choosed
          }
        })
        this.vehicleChoose = this.vehicleList.filter((item) => item.choosed)
        if (val) {
          this.vehicleDel(info)
          return
        }
        // let valetVehicleBrandQOList = []
        // for (let i = 0; i < this.vehicleChoose.length; i++) {
        //获取车系列表
        let res = await this.$VoHttp.BUSINESS.businessVehicleBrandSelectSeries({
          brandid: info.id,
        })
        let resArr = res.data.map((item) => {
          return {
            id: item.id,
            level: item.level,
            brandId: info.id,
            parentName: info.name,
          }
        })

        // }
        // valetVehicleBrandQOList = valetVehicleBrandQOList.concat(resArr)

        this.valetVehicleBrandQOList = this.valetVehicleBrandQOList.concat(resArr)
        this.getData(true)
      },
      //品牌选择
      brandChoosed(info) {
        this.isBrandChoose = true
        this.brandList.forEach((item) => {
          if (item.id === info.id) {
            item.choosed = !item.choosed
          }
        })
        // this.getData(true)
      },
      //类型选择
      typeChoosed(info) {
        this.isTypeChoose = true
        this.typeList.forEach((item) => {
          if (item.id === info.id) {
            item.choosed = !item.choosed
          }
        })
        // this.getData(true)
      },
      //排序选择
      orderChoosed(info) {
        if (info.value === this.orderProperty) {
          this.orderProperty = ''
          this.orderType = ''
          this.orderList.forEach((item) => {
            item.choosed = false
          })
          this.getData(true)
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
        this.getData(true)
      },
      //删除已选tag
      brandDel(info, listName) {
        this[listName].forEach((item) => {
          if (item.id === info.id) {
            item.choosed = false
          }
        })
      },
      //车型已选tag
      vehicleDel(data) {
        console.log('vehicleDel', data.id)
        this.vehicleChoose.forEach((item, index) => {
          if (item.id === data.id) {
            this.vehicleChoose.splice(index, 1)
          }
        })
        this.vehicleList.forEach((item) => {
          if (item.name === data.name) {
            item.choosed = false
          }
        })
        this.valetVehicleBrandQOList = this.valetVehicleBrandQOList.filter(
          (item) => item.parentName != data.name,
        )
        console.log('valetVehicleBrandQOList', this.valetVehicleBrandQOList)
        this.getData(true)
      },
      //清空筛选
      clearFilter() {
        this.vehicleChoose = []
        this.brandChoose = []
        this.typeChoose = []
        this.valetVehicleBrandQOList = []
        this.brandList.forEach((item) => {
          item.choosed = false
        })
        this.typeList.forEach((item) => {
          item.choosed = false
        })
        this.vehicleList.forEach((item) => {
          item.choosed = false
        })
        this.getData(true)
      },
      //确认下单点击事件
      confirm(data) {
        this.showBuyNow = false
        this.isCoding = data.isCoding
        this.isInstall = data.isInstall
        this.isNew = data.isNew
        this.isCash = data.isCash || data.isCash === 0 ? data.isCash : 1
        // if (!data.isCoding && data.proIsCoding) {
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
      /**
       * 去提交订单
       */
      async goConfirmOrder() {
        // 存储商品信息，并带到提交订单页面
        // 组装需要的数据
        console.log(this.currentRow)
        const proDetailInfo = await this.$VoHttp.GOODS.apiGoodsGarageDetail({
          goodsId: this.currentRow.goodId,
          warehouseId: this.currentRow.warehouseId,
        })
          .then()
          .catch((e) => {
            this.$u.toast(e.message || '获取详情失败')
            return
          })

        const orderProductInfo = {
          shopInfo: {
            shopName: this.currentRow.shopName,
            buyerId: this.companyId ? this.companyId : null,
          },
          goodsInfo: {
            orgGoodsId: proDetailInfo.data.orgGoodsId || '',
            addedServices: [],
            goodsCount: 1,
            goodsId: this.currentRow.goodId,
            isCash: Number(this.isCash) === 1 ? true : false,
            originalPrice:
              Number(this.isCash) === 1 ? this.currentRow.cashPrice : this.currentRow.accountPrice,
            periodDays: this.currentRow.accountPeriodDays || 0,
            projectId: '',
            shippingType: this.currentRow.shippingType || 2, // 1 包邮 2 到付
            codingPrice: this.currentRow.codingPrice,
            isCoding: this.isCoding,
            originCoding: this.currentRow.isCoding,
            isInstall: this.isInstall,
            installationFee: this.currentRow.installationFee, //安装费用
            isNew: this.isNew,
            tradeInFee: this.currentRow.tradeInFee, //回收费用
            shopId: this.currentRow.shopId,
            skuProperty: JSON.stringify(this.currentRow.skuProperty || {}),
            warehouseId: this.currentRow.warehouseId,
            warehouseName: this.currentRow.warehouseName,
            deliveryAreaName: this.currentRow.deliveryAreaName,
            arrivalTime: this.currentRow.arrivalTime,
            pic: this.currentRow.pic,
            name: this.currentRow.name,
            modelName: this.currentRow.modelName || '',
            categoryType: this.currentRow.categoryType,
          },
        }
        // 代客下单跳转
        if (this.companyId) {
          this.$storage.set('OrderPayInfoAgent', orderProductInfo)
          this.$linkToEasy(
            `/pagesAgent/SubmitOrder/SubmitOrder?isValet=1&queryType=${this.currentType}`,
          )
        } else {
          this.$storage.set('ProductInfo', orderProductInfo)
          this.$linkToEasy(`/pagesGarage/ShopList/SubmitOrders`)
        }
        this.showBuyNow = false
      },
      ////
      goCartFn() {
        this.$linkToEasy('/pagesAgent/InvestmentList/InvestmentCheckList')
      },
      changeTabs(e) {
        this.fliterVisible = false
        this.current = e.index
      },
      goStoreDetail(id) {
        this.$linkToEasy('/pagesAgent/InvestmentList/ShopDetails?companyId=' + id)
      },
      // 跳转到客服聊天界面
      toIm() {
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本
        const info = {
          targetId: this.storeInfo.userId,
          type: 0,
          note: this.storeInfo.shopName,
          platformCode: this.storeInfo.platformCode, // 1供应商  2服务商
          isProject: true,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      //获取列表数据
      getData(refresh) {
        this.loading = true
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let brandIds = this.brandChoose.length ? this.brandChoose.map((item) => item.id) : []
        let categoryTypes = this.typeChoose.length ? this.typeChoose.map((item) => item.name) : []
        let valetVehicleBrandQOList = this.valetVehicleBrandQOList.map((item) => {
          return {
            id: item.id,
            level: item.level,
          }
        })
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          shopId: this.shopId,
          valetVehicleBrandQOList: valetVehicleBrandQOList,
          brandIds: brandIds,
          categoryTypes: categoryTypes,
          salesArea: this.salesArea,
        }
        if (this.orderType) {
          params['orderType'] = this.orderType
        }
        if (this.orderProperty) {
          params['orderProperty'] = this.orderProperty
        }
        if (this.keyword) {
          params['name'] = this.keyword
        }

        this.$VoHttp.GOODS.apiGoodsQueryWarehousesGoodsList(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records
              data.forEach((item) => {
                item.queryType = this.current === 1 ? 'A' : 'L'
                item.cashPrice = floatTwo(item.cashPrice)
                item.codingPrice = floatTwo(item.codingPrice)
                item.installationFee = floatTwo(item.installationFee)
                item.accountPrice = floatTwo(item.accountPrice)
                item.tradeInFee = floatTwo(item.tradeInFee)
              })
              this.total = res.data.total
              this.infoList = this.infoList.concat(data)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              this.hasMore = this.infoList.length < data.total
              // if (this.infoList.length > 0) {
              //   this.shopDetail = this.infoList[0]
              // }
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.isLoadingOver = true
            this.loading = false
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
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
        if (this.scrollTop >= 205 && !this.fixedTop) {
          this.fixedTop = true
        }
        if (this.scrollTop < 205 && this.fixedTop) {
          this.fixedTop = false
        }
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
      onCheckPrice() {
        this.isCheckedPrice = !this.isCheckedPrice
        this.isCheckedReturn = false
        this.isCheckedNum = false
        let orderProperty = {
          name: '价格',
        }
        this.orderData(orderProperty)
      },
      onCheckReturn() {
        this.isCheckedPrice = false
        this.isCheckedReturn = !this.isCheckedReturn
        this.isCheckedNum = false
        let orderProperty = {
          name: '回报率',
        }
        this.orderData(orderProperty)
      },
      onCheckNum() {
        this.isCheckedPrice = false
        this.isCheckedReturn = false
        this.isCheckedNum = !this.isCheckedNum
        let orderProperty = {
          name: '持有人数',
        }
        this.orderData(orderProperty)
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
    &-search {
      font-weight: 400;
    }
    &-group {
      background: #fff;
      padding: 0 32rpx 16rpx 32rpx;
    }
    &-shop {
      padding: 24rpx 48rpx 24rpx 32rpx;
      &__name {
        margin-left: 8rpx;
        font-size: 28rpx;
        font-weight: bold;
        line-height: 42rpx;
        color: rgba(0, 0, 0, 0.85);
      }
      &__collection {
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.65);
        line-height: 36rpx;
        align-items: center;
      }
      &__img {
        width: 96rpx;
        height: 96rpx;
        border-radius: 8rpx;
      }
    }
  }
  .unselected {
    border: 2rpx solid #ff5319;
    border-radius: 200rpx;
    padding: 0 24rpx;
    height: 56rpx;
    line-height: 54rpx;
    font-size: 24rpx;
    color: #ff5319;
    box-sizing: border-box;
  }

  .selected {
    //background-color: $color-disabled-yellow;
    //border-width: 0;
    padding: 0 24rpx;
    border: 2rpx solid #f7f7f8;
    border-radius: 200rpx;
    height: 56rpx;
    line-height: 54rpx;
    font-size: 24rpx;
    color: $v-c0-45;
    box-sizing: border-box;
  }
  .scroll-view {
    height: 100%;
  }
  ::v-deep .u-search__action--active {
    height: auto;
  }
  .fixed-icon {
    width: 36px;
    height: 36px;
    position: fixed;
    bottom: 240rpx;
    right: 32rpx;
    border-radius: 50%;
    overflow: hidden;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    &__img {
      width: 20px;
      height: 20px;
    }
  }
  .shop-slide__type {
    display: flex;
    align-items: center;
    white-space: nowrap;
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
      box-shadow: inset 2rpx 0 0 #f7f7f8;
    }

    .type-selected {
      height: 36rpx;
      color: #ff5319;
      font-size: 24rpx;
      background: #ffece5;
      border: 2rpx solid #ff5319;
      border-radius: 32rpx;
      margin-right: 24rpx;
      padding: 0 6rpx 0 16rpx;
    }

    .type-scroll {
      overflow-x: auto;
    }

    .type-block {
      height: 64rpx;
      line-height: 64rpx;
      background: #f6f7f8;
      border: 2rpx solid #f6f7f8;
      border-radius: 80rpx;
      margin-right: 24rpx;
      padding: 0 40rpx;
      font-size: 24rpx;
      color: $v-c0-85;
      &.choosed {
        background: #ffece5;
        border: 2rpx solid #ff8c66;
        color: #ff5319;
      }
    }
  }
  .no-margin {
    margin-top: 0 !important;
  }
  .v-middle {
    vertical-align: middle;
  }
  .align-vertical {
    align-items: center;
  }
  .shop {
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
          color: #ff5319;
          font-size: 24rpx;
          background: #ffece5;
          border: 2rpx solid #ff5319;
          border-radius: 32rpx;
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
            background: #ffece5;
            border: 2rpx solid #ff5319;
            color: #ff5319;
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
