<template>
  <view>
    <view class="invest flex flex-column">
      <!-- 搜索 -->
      <VoNav :is-fixed="false" :left-width="48" :right-width="48" is-have-more>
        <block slot="title">
          <view>
            <VoSearch
              v-model="keyword"
              height="34"
              placeholder="请输入搜索"
              @custom="getData(true)"
              @search="getData(true)"
            />
          </view>
        </block>
      </VoNav>
      <VoDragButton :existTabBar="true" :isDock="true" @btnClick="dragBtnFn" />

      <!-- 收藏 -->
      <view
        class="invest-shop flex flex-vertical-c border-box m-t-16 bg-white"
        @click="goStoreDetail(shopDetail.shopId)"
      >
        <image :src="shopDetail.storeUrl" class="invest-shop__img" />
        <view class="flex-justify-c flex1 m-l-16">
          <view class="flex flex-row flex-vertical-c">
            <view @click.stop="toIm()">
              <VoIcon name="smile-m" />
            </view>
            <view class="invest-shop__name">{{ shopDetail.shopName }}</view>
          </view>
          <view class="flex flex-vertical-c m-t-6" @click.stop="goStoreDetail(shopDetail.shopId)">
            <view class="invest-shop__collection m-l-8">
              {{ storeInfo.collectNum || '0' }}人收藏
            </view>
            <view class="flex flex-vertical-c fz-24 color-block-65 m-l-32">
              <view>店铺详情</view>
              <VoIcon :size="12" name="arrow-right" />
            </view>
          </view>
        </view>
        <view
          :class="storeInfo.isCollect ? 'selected' : 'unselected'"
          class="unselected"
          @click.stop="collectFn()"
        >
          {{ storeInfo.isCollect ? '已收藏' : '收藏' }}
        </view>
      </view>
      <!--  3= 服务商首页、服务商进货列表/全国投放、服务商进货/全国店铺项目列表 结果页-/pagesAgent/VinTell/VinTell
            4= 服务商代客下单列表、服务商代客下单店铺主页 结果页-/pagesAgent/GlobalSearch/QueryResult
            5= 修理厂首页、买货列表、买货店铺主页  结果页-/pagesGarage/GlobalSearch/QueryResult -->
      <!--  当前为服务商进货/全国店铺页面origin=3  结果页 /pagesAgent/VinTell/VinTell -->
      <VoGroupVinBtn
        background="#FEF9F1"
        borderColor="#FFE2B8"
        class="invest-group"
        leftName="VIN查询"
        rightToUrl="/pagesProduct/ApplicationCar/ApplicationCarNew?origin=3"
        @leftBtnFn="vin"
      ></VoGroupVinBtn>
      <EraTabs
        :current="current"
        :list="tabsList"
        :scrollable="false"
        class="bg-white m-t-16"
        @change="changeTabs"
      />
      <view
        class="invest-tags bg-white m-t-2 flex flex-justify-around flex-vertical-c p-l-50 p-r-50"
      >
        <view class="invest-tags__item1 flex flex-row flex-vertical-c" @click="onCheckPrice()">
          <view :class="isCheckedPrice ? 'isChecked' : 'color-block-45'" class="invest-tags__text">
            价格
          </view>
          <VoIcon
            v-if="isCheckedPrice"
            :name="orderType === 'ASC' ? 'top-filter-new' : 'down-filter'"
            :size="25.6"
            class="m-l-4"
            color="#FF5319"
            opacity="0.65"
          />
          <VoIcon v-else :size="25.6" class="m-l-4" color="#000" name="no-filter" opacity="0.25" />
        </view>
        <view class="invest-tags__item2 flex flex-row flex-vertical-c" @click="onCheckReturn()">
          <view :class="isCheckedReturn ? 'isChecked' : 'color-block-45'" class="invest-tags__text">
            回报率
          </view>
          <VoIcon
            v-if="isCheckedReturn"
            :name="orderType === 'ASC' ? 'top-filter-new' : 'down-filter'"
            :size="25.6"
            class="m-l-4"
            color="#FF5319"
            opacity="0.65"
          />
          <VoIcon v-else :size="25.6" class="m-l-4" color="#000" name="no-filter" opacity="0.25" />
        </view>
        <view class="invest-tags__item1 flex flex-row flex-vertical-c" @click="onCheckNum()">
          <view :class="isCheckedNum ? 'isChecked' : 'color-block-45'" class="invest-tags__text">
            参与人数
          </view>
          <VoIcon
            v-if="isCheckedNum"
            :name="orderType === 'ASC' ? 'top-filter-new' : 'down-filter'"
            :size="25.6"
            class="m-l-4"
            color="#FF5319"
            opacity="0.65"
          />
          <VoIcon v-else :size="25.6" class="m-l-4" color="#000" name="no-filter" opacity="0.25" />
        </view>
      </view>
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <swiper :current="current" class="flex1" @change="swiperChange">
        <swiper-item v-for="(swiper, swiperIndex) of tabsList" :key="swiperIndex">
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
            <block v-if="infoList && infoList.length">
              <InvestmentGoods
                v-for="(info, infoIndex) of infoList"
                :key="infoIndex"
                :dataObj="info"
                @addShop="showInvestmentPop('加入备货车', info)"
                @buyShop="showInvestmentPop('订购', info)"
                @goProjectDetails="goProjectDetails"
              />
            </block>
            <block v-else>
              <VoNoData />
            </block>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 加购弹框 -->
    <u-popup :show="showInvestment" mode="bottom" @close="showInvestment = false">
      <InvestmentPopup
        :btnText="btnText"
        :info="dataObj"
        :is-my-self-goods="current === 0 ? true : false"
        :queryType="dataObj.queryType"
        @closeFn="showInvestment = false"
        @finishFn="freshCar()"
      />
    </u-popup>

    <view class="fixed-icon" @click="goCartFn">
      <image class="fixed-icon__img" src="/static/icons/contract_icon.png" />
      <VoBadge v-if="cartNum" :value="cartNum" class="badge_number" max="99" />
    </view>
  </view>
</template>

<script>
  import {
    chooseImageOcrByPromise,
    error,
    getStoreImUserIdFn,
    hideLoading,
    showLoading,
    vocenCameraFn,
  } from '@/common/helper'
  import InvestmentGoods from './components/InvestmentGoods'
  import InvestmentPopup from './components/InvestmentPopup'
  import FliterPop from './components/FliterPop'
  import FliterPopPay from './components/FliterPopPay'

  export default {
    name: 'InvestmentShop',
    components: { InvestmentGoods, FliterPop, FliterPopPay, InvestmentPopup },
    data() {
      return {
        shopDetail: {
          shopId: '',
          shopName: '',
          startNumber: '',
          storeUrl: '',
        },
        shopId: '', //商铺id
        companyId: '',
        keyword: '', // 搜索双向绑定
        current: 0, // 横向tabs默认
        tabsList: [
          {
            name: '进货到家',
          },
          {
            name: '全国投放',
          },
        ],
        filterList: [
          {
            id: 0,
            name: '商品类型',
            choosed: false,
          },
          {
            id: 1,
            name: '品牌',
            choosed: false,
          },
          {
            id: 2,
            name: '型号',
            choosed: false,
          },
          {
            id: 3,
            name: '适配车型',
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
            name: '回报率',
            choosed: false,
            icon: '',
            orderType: 'ASC',
            orderProperty: 'rol',
          },
          {
            name: '持有人数',
            choosed: false,
            icon: '',
            orderType: 'ASC',
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
        orderType: '', //排序类型
        orderProperty: '', //排序属性
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
        isSelect: false,
        isCheckedPrice: false,
        isCheckedReturn: false,
        isCheckedNum: false,
        detailInfo: null,

        showInvestment: false, // 弹出层
        btnText: '',
        dataObj: {},
        storeInfo: '',
        isLoading: false,
        cartNum: 0,
      }
    },
    onShow() {
      if (this.shopId) {
        this.getStoreDetailRequest()
      }
    },
    onLoad(options) {
      this.shopId = options.shopId
      this.companyId = options.shopId
      this.getStoreDetailRequest()
      this.getCartNumRequest()
      this.getData(true)
    },
    methods: {
      //加购之后刷新购物车
      freshCar() {
        console.log('1111111111111111')
        this.getCartNumRequest()
      },
      dragBtnFn() {
        this.toIm()
      },
      // 扫一扫
      async vin() {
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
          if (+data.data.scanResultType === 1) {
            // 商品
            if (data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath) {
              this.$storage.set('imageInfoVO', data.data.imageInfoVO)
            }
            this.$linkToEasy(
              `/pagesAgent/VinTell/VinTell?code=${data.data.code}&type=${res.type}&imageInfoVO=${
                data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath
                  ? data.data.imageInfoVO.filePath
                  : ''
              }`,
            )
          } else {
            this.$linkToEasy(
              '/pagesAgent/VinTell/UpdateVin?imageInfoVO=' +
                (data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath
                  ? data.data.imageInfoVO.filePath
                  : '') +
                '&type=2',
            )
          }
        }
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
      //获取店铺详情数据
      getStoreDetailRequest() {
        let params = {
          companyId: this.companyId,
        }
        this.$VoHttp
          .apiCompanyInfoStore(params)
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
                this.$toast('收藏成功', 'success', '/static/icons/success_icon.png')
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
      //品牌筛选
      brandClick(data) {
        console.log('this.data', data)
        if (data.choosed) {
          this.brandIds.forEach((item, index) => {
            if (item === data.id) {
              this.brandIds.splice(index, 1)
            }
          })
        } else {
          this.brandIds.push(data.id)
        }
        console.log('this.brandIds', this.brandIds)
        this.brandList.forEach((item) => {
          if (item.id === data.id) {
            item.choosed = !item.choosed
          }
        })
        this.getData(true)
      },
      //仓库筛选
      wareClick(data) {
        this.wareList.forEach((item) => {
          if (item.name === data.name) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
      },
      //排序选择
      orderData(order) {
        console.log('order', order)
        console.log('this.orderType111', this.orderType)
        this.orderList.forEach((item) => {
          if (item.name === order.name) {
            this.orderProperty = item.orderProperty
            item.choosed = true
            if (item.orderType === 'ASC') {
              item.orderType = 'DESC'
              this.orderType = 'DESC'
              this.getData(true)
            } else {
              item.orderType = 'ASC'
              this.orderType = 'ASC'
              this.getData(true)
            }
          } else {
            item.choosed = false
            item.orderType = ''
          }
        })
      },
      //付款方式筛选确认
      filterConfirmPay(data, min, max) {
        console.log('filterConfirm', data)
        if (data && data.value) {
          this.payType = data.value
        } else {
          this.payType = ''
        }
        if (min) {
          this.minPeriodDays = min
        }
        if (max) {
          this.maxPeriodDays = max
        }
        this.fliterVisiblePay = false
        this.getData(true)
      },
      //筛选
      filterClick(data) {
        this.fliterVisible = false
        this.fliterVisiblePay = false
        if (data.id === 3) {
          this.fliterVisible = !data.choosed
        } else if (data.id === 4) {
          this.fliterVisiblePay = !data.choosed
        } else if (data.id === 0) {
          this.$linkToEasy('/pagesAgent/InvestmentList/BrandList')
        } else if (data.id === 1) {
          this.$linkToEasy('/pagesAgent/InvestmentList/VehicleType')
        } else if (data.id === 2) {
          this.$linkToEasy('/pagesAgent/InvestmentList/ProductSize')
        }

        this.filterList.forEach((item) => {
          if (item.name === data.name) {
            item.choosed = !item.choosed
          }
        })
      },
      //商品类型筛选关闭
      filterClose() {
        console.log('filterClose')
        this.fliterVisible = false
      },
      //商品类型筛选确认
      filterConfirm(data) {
        console.log('filterConfirm', data)
        if (data && data.name) {
          this.categoryType = data.name
        } else {
          this.categoryType = ''
        }
        this.fliterVisible = false
        this.getData(true)
      },
      //获取品牌列表
      getBrandData() {
        this.$VoHttp.GOODS.apiGoodsBrandQueryListHot().then((res) => {
          this.brandList = res.data.map((item) => {
            return {
              ...item,
              choosed: false,
            }
          })
        })
      },
      // 跳转到客服聊天界面
      toIm() {
        getStoreImUserIdFn({
          companyId: this.shopDetail.shopId,
        })
          .then((res) => {
            const info = {
              targetId: res,
              type: 0,
              note: this.shopDetail.shopName,
              platformCode: this.shopDetail.role == 1 ? 'supplier' : 'agent', // 1供应商  2服务商
              isProject: true,
              goods: {
                name: this.shopDetail.goodsName,
                pic: this.shopDetail.storeUrl,
                id: this.shopDetail.id,
                cashPrice: this.shopDetail.cashPrice,
                accountPrice: this.shopDetail.accountPrice,
                accountPeriodDays: this.shopDetail.accountPeriodDays,
              },
            }
            this.$storage.set('temp_im_room_info', info)
            this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
          })
          .catch((e) => {
            error(e.message || '未找到店铺客服')
          })
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
        if (this.shopId) {
          params['shopId'] = this.shopId
        }
        if (this.keyword) {
          params['keyword'] = this.keyword
        }
        if (this.orderType) {
          params['orderType'] = this.orderType
        }
        if (this.orderProperty) {
          params['orderProperty'] = this.orderProperty
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

        this.$VoHttp.GOODS.apiGoodsProjectInvestmentSpList(params)
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
              if (this.infoList.length > 0) {
                this.shopDetail = this.infoList[0]
                console.log(this.shopDetail, 666666666666666)
              }
            }
          })
          .catch((err) => {
            console.log('err', err)
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            uni.$u.toast(err.message || '请检查网络')
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
          this.getBrandData()
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
      // 恢复默认状态
      toDefault() {
        this.isCheckedPrice = false
        this.isCheckedReturn = false
        this.isCheckedNum = false
        this.orderType = ''
        this.orderList.forEach((item) => {
          item.orderType = 'ASC'
        })
      },
      onCheckPrice() {
        if (!this.isCheckedPrice) {
          this.toDefault()
          this.isCheckedPrice = true
        }
        let orderProperty = {
          name: '价格',
        }
        this.orderData(orderProperty)
      },
      onCheckReturn() {
        if (!this.isCheckedReturn) {
          this.toDefault()
          this.isCheckedReturn = true
        }
        let orderProperty = {
          name: '回报率',
        }
        this.orderData(orderProperty)
      },
      onCheckNum() {
        if (!this.isCheckedNum) {
          this.toDefault()
          this.isCheckedNum = true
        }
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
    &-shop {
      padding: 24rpx 40rpx 24rpx 32rpx;
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
      }
      &__img {
        width: 96rpx;
        height: 96rpx;
        border-radius: 8rpx;
      }
    }
    &-group {
      background: #fff;
      padding-bottom: 24rpx;
    }
    &-tags {
      padding: 12rpx 0;
      &__item1 {
        padding: 8rpx 0rpx;
        width: 218rpx;
        justify-content: center;
      }
      &__item2 {
        padding: 8rpx 0rpx;
        width: 218rpx;
        justify-content: center;
      }
      &__text {
        font-size: 28rpx;
        line-height: 40rpx;
        height: 40rpx;
        color: rgba(0, 0, 0, 0.85);
      }
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
  .unselected {
    border: 2rpx solid #ff5319;
    border-radius: 200rpx;
    padding: 10rpx 44rpx;
    font-size: 24rpx;
    color: #ff5319;
  }

  .selected {
    background-color: $color-disabled-yellow;
    border-width: 0;
    padding: 0 24rpx;
    border-radius: 200rpx;
    height: 56rpx;
    line-height: 56rpx;
    font-size: 24rpx;
    color: $v-c0-25;
  }
  .scroll-view {
    height: 100%;
  }
  ::v-deep .u-search__action--active {
    height: auto;
  }
  .fixed-icon {
    width: 104rpx;
    height: 104rpx;
    position: fixed;
    bottom: 240rpx;
    right: 32rpx;
    border-radius: 50%;
    // overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    &__img {
      width: 104rpx;
      height: 104rpx;
    }
  }
  .badge {
    &_number {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 99;
    }
  }
  .isChecked {
    color: #ff5319;
    font-weight: bold;
  }
</style>
