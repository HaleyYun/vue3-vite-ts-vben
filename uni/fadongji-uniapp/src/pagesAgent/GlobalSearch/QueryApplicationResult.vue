<template>
  <view class="search">
    <VoNav is-fixed is-have-more title="查询结果" />
    <!--  筛选栏  -->
    <!-- @scrolltolower="loadMore" -->

    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="flex1 overflow-y"
      refresher-background="#F7F7F8"
      refresher-default-style="none"
      refresher-enabled="true"
      scroll-top="0"
      scroll-y
      @refresherabort="onAbort"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @scroll="scrollHandler"
      @scrolltolower="scrolltolower"
    >
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />

      <view v-if="goodsInfo">
        <view class="h12 bg-F7F7F8" />
        <view class="flex bg-white p-32">
          <view class="w-80">
            <image class="w80 h80" :src="goodsInfo.brandInfo.logo" mode="aspectFit" />
          </view>
          <view class="w-400 m-l-24">
			<view class="color-block-85 fz-28 lh150 font-weight-500">
			  {{ goodsInfo.brandInfo.name }} {{ previewData.queryParams.series }} {{ goodsInfo.displacement }} {{ goodsInfo.transmissionDescription }}
			  <text v-if="goodsInfo.year" class="m-l-10">{{ goodsInfo.year }}款</text>
			</view>
			<view class="color-block-85 fz-28 lh150 m-t-5">
			  {{ goodsInfo.engineModel }}
			  <text v-if="goodsInfo.powerKw" class="mx-10">{{ goodsInfo.powerKw }}KW</text>
			  <text>{{ goodsInfo.emissionStandard }}</text>
			</view>
          </view>
          <view class="flex1 p-t-20 p-l-30">
            <u-button size="small" shape="circle" @click="retryQueryHandler">重新查询</u-button>
          </view>
        </view>
        <view class="h12 bg-F7F7F8" />
      </view>

      <!--  左右可滑动区域  -->
      <view v-if="isLoad" class="shop-slide">
        <view class="tab-nav">
          <EraTabs
            :current="current"
            :list="tabsList"
            activeStyle="color:#FF5319; fontWeight: bold;font-size: 32rpx"
            inactiveStyle="color: rgba(0, 0, 0, 0.45);font-size: 32rpx"
            :scrollable="false"
            @change="changeTabs"
          />
        </view>

        <view class="shop-slide__type m-t-32">
          <view class="type-tips">品牌</view>
          <scroll-view class="flex1 type-scroll" scroll-x>
            <view class="flex flex-vertical-c">
              <view
                v-for="info in brandList"
                :key="info.id"
                :class="info.choosed ? 'choosed' : ''"
                class="type-block"
                @click="brandChoosed(info)"
              >
                {{ info.name }}
              </view>
              <view class="flex flex-vertical-c shop-slide__more2" @click="toMore('brand')">
                <view>查看更多</view>
                <VoIcon :size="12" name="left-right-arrow" />
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="shop-slide__type m-t-42">
          <view class="type-tips">类型</view>
          <scroll-view class="flex1 type-scroll" scroll-x>
            <view v-if="typeList && typeList.length" class="flex flex-vertical-c">
              <view
                v-for="info in typeList"
                v-show="info.name"
                :key="info.id"
                :class="info.choosed ? 'choosed' : ''"
                class="type-block"
                @click="typeChoosed(info)"
              >
                {{ info.name }}
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
      <!--  商品信息列表区域  -->
      <block v-if="shopListData.length">
        <BuyGoodsInfo
          v-for="(item, index) in shopListData"
          :key="item.id"
          :good-info="item"
          @BuyNow="buyHandler(item)"
          @click.native="goGoodsDetail(item)"
        />
        <VoLoadingText :has-more="hasMore" :loading="loading" />
      </block>
      <block v-else-if="isOverLoading">
        <VoNoData :no-data-tips="['暂无匹配商品']" :paddingTop="0">
          <block slot="default">
            <EraButton @click="goConcatFn" size="small" theme-type="Wire" class="m-t-46">{{
              dockingPeopleData && dockingPeopleData.id ? '联系服务商' : '联系客服'
            }}</EraButton>
          </block>
        </VoNoData>
      </block>
    </scroll-view>
    <view class="position-f">
      <u-popup :round="10" :show="showBuyNow" closeable mode="bottom" @close="close">
        <BuyNow :info="currentRow" @confirm="confirm" />
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
      <!--修改code弹窗-->
      <VoModal
        :show="showHandle"
        closeOnClickOverlay
        confirmColor="#000000"
        confirmText="确定"
        showCancelButton
        title="输入发动机识别码"
        @cancel="closeHandler"
        @close="closeHandler"
        @confirm="handleInput"
      >
        <view class="slot-content w-full">
          <EraForm
            ref="scanForm"
            :model="formData"
            :rules="rules"
            class="modify-form"
            labelPosition="left"
            labelWidth="0"
          >
            <EraFormItem
              class="modify-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label=""
              prop="content"
            >
              <u-input v-model.trim="formData.content" clearable />
            </EraFormItem>
          </EraForm>
        </view>
      </VoModal>
    </view>
  </view>
</template>

<script>
  import BuyGoodsInfo from '../GoodsList/components/BuyGoodsInfo'
  import BuyNow from '../GoodsList/components/BuyNow'
  import VoModal from '@/components/VoModal/VoModal'
  import { goOnlineCustomerFn, showLoading } from '@/common/helper'
  import EraButton from '@/uni_modules/era-ui/components/EraButton/EraButton'
  import { error } from '@/common/helper'
  // import { mapGetters } from 'vuex'

  export default {
    name: 'QueryResult',
    components: { EraButton, VoModal, BuyGoodsInfo, BuyNow },
    data() {
      return {
        current: 0, // 横向tabs默认
        tabsList: [
          {
            name: '我的商品',
          },
          {
            name: '全网商品',
          },
        ],
        isLoad: false,
        isOverLoading: false,
        companyId: '',
        userName: '',
        isCash: '',
        imType: '',
        isSendIm: false,
        codeArr: [],
        imageInfoVO: '', // imageInfoVO
        type: '', // scan 拍照 相册     handInput 手动输入
        dockingPeopleData: null,
        hasMore: true,
        loading: false,
        keyword: '', // 搜索双向绑定
        showBuyNow: false,
        fixedTop: false, // 锁定到顶部车系
        confirmModal: false, //确认下单弹框控制
        pageQuery: {
          pageNo: 1,
          pageSize: 10,
          queryType: 'L',
        },
        queryForm: {
          name: '',
        },
        modelCar: [],
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
        originList: [
          {
            name: '全部货品',
            value: 0,
            orderType: 'DESC',
            choosed: false,
          },
          // { name: '到货快', value: 'deliveryTime', orderType: 'DESC', choosed: false },
          { name: '本地有货', value: 1, orderType: 'ASC', choosed: false },
        ],
        vehicleChoose: [], // 选中车型
        brandChoose: [], //选中品牌
        typeChoose: [], //选中类型
        origin: 0, // 选中货源
        orderProperty: '', //选中排序属性cashPrice：价格 ；deliveryTime ：到货快；saleCount：销量
        orderType: 'ASC', //"ASC", "升序" "DESC", "降序"
        valetVehicleBrandQOList: [], //车品牌下所有车系

        //安装服务和以旧换新服务
        isCoding: false,
        isInstall: false,
        isNew: false,

        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        total: 0,
        code: '',

        showHandle: false,
        formData: {
          content: '',
        },
        rules: {
          content: [
            {
              type: 'string',
              required: true,
              message: '不可为空',
              trigger: ['blur'],
            },
            {
              type: 'string',
              len: 17,
              required: true,
              message: 'VIN码长度需为17位',
              trigger: ['blur'],
            },
          ],
        },
        goodsIdList: [],
        goodsInfo: null,
        previewData: null,
      }
    },
    onLoad(options) {
      this.previewData = this.$storage.get('CarTypeChooseProgress')
      this.goodsIdList = this.$storage.get('ApplicationResultGoodsIdList')
      this.goodsInfo = this.$storage.get('ApplicationResultGoodBrandInfo')
      this.code = this.$storage.get('garageArea')
      // 页面参考shopList
      this.companyId = options.companyId
      this.userName = options.userName
      this.imType = options.imType
      // 初始化头部数据
      this.initData()
      this.getDockingPeopleRequest()
      //   this.queryListData(true)
      uni.$off('select')
      uni.$off('selectVehicle')
      uni.$on('select', (row) => {
        console.log('brandChooseonLoad', row)
        let obj = {}
        let result = row.reduce((item, next) => {
          obj[next.id] ? '' : (obj[next.id] = true && item.push(next))
          return item
        }, [])
        this.brandChoose = result
		this.queryListData(true)
		// this.queryListData(true)
      })
      //获取选择车型
      uni.$on('selectVehicle', (row) => {
        this.vehicleChoose = row
        let arr = []
        row.forEach((item) => {
          item.child.forEach((it) => {
            arr.push({
              id: it.id,
              level: it.level,
            })
          })
        })
        this.valetVehicleBrandQOList = arr
        console.log('valetVehicleBrandQOListonLoad', this.valetVehicleBrandQOList)
        if (this.valetVehicleBrandQOList.length) {
          this.queryListData(true)
        }
      })
    },
    methods: {
      retryQueryHandler() {
		uni.navigateBack({ delta: this.previewData.routeInfoList.length })
	  },
      changeTabs(e) {
        this.current = e.index
        if (this.current == 0) {
          this.pageQuery.queryType = 'L'
        } else {
          this.pageQuery.queryType = 'A'
        }
        this.queryListData(true)
      },
      goDetailFn(item) {
        this.$linkToEasy('/pagesGarage/GlobalSearch/VehicleDetail?levelId=' + item.levelId)
      },
      previewFn() {
        uni.previewImage({
          urls: [this.imageInfoVO],
        })
      },
      goConcatFn() {
        // 有对接联系服务商 无对接人联系客服
        if (this.dockingPeopleData && this.dockingPeopleData.id) {
          let data = {
            targetId: this.dockingPeopleData.userId,
            type: 0,
            note: this.dockingPeopleData.storeName,
            platformCode: this.dockingPeopleData.platformCode,
          }
          if (this.type == 'scan') {
            if (!this.isSendIm) {
              const imageInfoVO = this.$storage.get('imageInfoVO')
              // 拍照相册识别
              data.shopInfo = {
                type: 'image',
                content: {
                  fileNameUrl: this.imageInfoVO,
                  ...imageInfoVO,
                },
              }
              data.shopInfoTwo = {
                type: 'text',
                content: '未找到VIN码对应商品，请帮我找一下',
              }
            }
          } else {
            if (!this.isSendIm) {
              // 手动输入
              // 手动输入
              const dataText = []
			  // 我想要适合【品牌+车系+车型+排量+变速器描述+年款+发动机+功率+排放标准】的发动机，请帮我找一下。
              dataText.push(this.previewData.navData.name)
              dataText.push(this.previewData.queryParams['series'])
              dataText.push(this.goodsInfo['model'])
              dataText.push(this.previewData.queryParams['displacement'])
              dataText.push(this.previewData.queryParams['year'])
              dataText.push(this.previewData.queryParams['engineModel'])
              dataText.push(this.goodsInfo['powerKw'] + 'KW')
              dataText.push(this.goodsInfo['emissionStandard'])
              const msg = dataText.join(' ')
              data.shopInfo = {
                type: 'text',
                content: '我想要适合【' + msg + '】的发动机，请帮我找一下',
              }
            }
          }
          this.$storage.set('temp_im_room_info', data)
          this.isSendIm = true
          this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
        } else {
          goOnlineCustomerFn()
        }
      },
      //获取对接人信息
      getDockingPeopleRequest() {
        this.$VoHttp.apiCompanyInvitationAgentByGarage().then((res) => {
          this.dockingPeopleData = res.data
        })
      },
      /**
       * 确认事件
       */
      async handleInput() {
        if (this.showHandle) {
          let res
          try {
            res = await this.$refs.scanForm.validate()
          } catch (e) {
            console.log(e)
          }
          console.log(res)
          if (!res) return
        }
        this.code = JSON.parse(JSON.stringify(this.formData.content))
        this.queryListData(true)
      },
      /**
       * 关闭弹窗
       */
      closeHandler() {
        this.formData.content = ''
        this.showHandle = false
      },
      // 初始化头部数据
      async initData() {
        showLoading()
        // //热门车型
        // let vehicleRes = await this.$VoHttp.BUSINESS.businessVehicleBrandSelectOne(
        //   {},
        //   { noLoading: true },
        // )
        // if (!vehicleRes || !vehicleRes.data) return
        // this.vehicleList = vehicleRes.data.hotList

        //热门品牌
        let brandRes = await this.$VoHttp.GOODS.apiGoodsBrandQueryListHot({}, { noLoading: true })
        if (!brandRes || !brandRes.data) return
        this.brandList = brandRes.data.map((item) => {
          return {
            ...item,
            choosed: false,
          }
        })
        //商品类型 修改2022-10-09 13:28:43 林宗宗让 0 改成 1000000001
        let typeRes = await this.$VoHttp.GOODS.apiGoodsTypeQueryList(
          { categoryId: 1000000001 },
          { noLoading: true },
        )
        if (!typeRes || !typeRes.data) return
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
        await this.queryListData(true, true)
      },
      toMore(name) {
        let path = ''
        if (name === 'vehicle') {
          let arr = []
          path = `/pagesGarage/ShopList/VehicleType`
          if (this.vehicleChoose.length) {
            this.vehicleChoose.forEach((item) => {
              console.log(item)
              const { id, initials } = item
              arr.push({ id, initials })
            })
            path = `/pagesGarage/ShopList/VehicleType?brandId=${JSON.stringify(arr)}`
          }
        } else {
          this.brandList.forEach((item) => {
            item.choosed = false
          })
          path = '/pagesGarage/ShopList/BrandList'
        }
        this.$linkToEasy(path)
      },

      //车型选择
      async vehicleChoosed(info) {
        console.log(info)
        let arr = this.vehicleChoose.length ? this.vehicleChoose.map((item) => item.id) : []
        if (arr.indexOf(info.id) < 0) {
          this.vehicleChoose.push(info)
        }
        // let valetVehicleBrandQOList = []
        // for (let i = 0; i < this.vehicleChoose.length; i++) {
        //获取车系列表
        let res = await this.$VoHttp.BUSINESS.businessVehicleBrandSelectSeries({
          brandid: info.id,
        })
        if (!res || !res.data) return
        let resArr = res.data.map((item) => {
          return {
            id: item.id,
            level: item.level,
            brandId: info.id,
          }
        })

        // }
        // valetVehicleBrandQOList = valetVehicleBrandQOList.concat(resArr)

        this.valetVehicleBrandQOList = this.valetVehicleBrandQOList.concat(resArr)
        // this.queryListData(true)
      },
      //品牌选择
      brandChoosed(info) {
		this.isBrandChoose = true
		this.brandList.forEach((item) => {
          if (item.id === info.id) {
            item.choosed = !item.choosed
          }
        })
		this.brandChoose = this.brandList.filter((item) => item.choosed)
		this.queryListData(true)
      },
      //类型选择
      typeChoosed(info) {
		this.isTypeChoose = true
		this.typeList.forEach((item) => {
          if (item.id === info.id) {
            item.choosed = !item.choosed
          }
        })
		this.typeChoose = this.typeList.filter((item) => item.choosed)
		this.queryListData(true)
      },
      //排序选择
      orderChoosed(info) {
        if (info.value === this.orderProperty) {
          this.orderProperty = ''
          this.orderType = ''
          this.orderList.forEach((item) => {
            item.choosed = false
          })
          this.queryListData(true)
          return
        }
        this.orderProperty = info.value
        this.orderType = info.orderType
        this.orderList.forEach((item) => {
          item.choosed = item.name === info.name
        })
        this.queryListData(true)
      },
      // 货源选择
      originChoosed(info) {
        // 取消选中
        if (info.value === this.origin) {
          this.origin = 0
          this.originList.forEach((item) => {
            item.choosed = false
          })
          this.queryListData(true)
          return
        }
        this.origin = info.value
        this.originList.forEach((item) => {
          item.choosed = item.name === info.name
        })
        this.queryListData(true)
      },
      //删除已选tag
	  brandDel(info, listName) {
		console.log('info', info)
		this[listName].forEach((item) => {
		  if (item.id === info.id) {
			item.choosed = false
		  }
		})
		if (listName === 'brandList') {
		  this.brandChoose.forEach((item, index) => {
			if (item.id === info.id) {
			  this.brandChoose.splice(index, 1)
			}
		  })
		  this.queryListData(true)
		}
	  },
	  //车型已选tag
      vehicleDel(data) {
        console.log('vehicleDel', data.id)
        this.vehicleChoose.forEach((item, index) => {
          if (item.id === data.id) {
            this.vehicleChoose.splice(index, 1)
          }
        })
        this.valetVehicleBrandQOList = this.valetVehicleBrandQOList.filter(
          (item) => item.brandId != data.id,
        )
        console.log('valetVehicleBrandQOList', this.valetVehicleBrandQOList)
        this.queryListData(true)
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
        this.queryListData(true)
      },
      buyHandler(row) {
        this.currentRow = Object.assign({}, row)
        this.showBuyNow = true
      },
      //   // 滑动到底部-加载更多
      loadMore() {
        if (this.hasMore && !this.loading) {
          this.pageQuery.pageNo += 1
          this.queryListData()
        }
      },
      // 搜索触发
      searchHandler(res) {
        this.queryListData(true)
        console.log(res)
        if (!res) return
        // 执行搜索逻辑
      },
      // 加载商品列表数据
      async queryListData(init, first) {
        if (this.loading) return
        this.loading = true
        try {
          if (init) {
            this.pageQuery.pageNo = 1
          }
          let brandIds = this.brandChoose.length ? this.brandChoose.map((item) => item.id) : []
          let categoryTypes = this.typeChoose.length ? this.typeChoose.map((item) => item.name) : []
          let params = {
            salesArea: this.code,
            brandIds: brandIds,
            categoryTypes: categoryTypes,
            orderProperty: this.orderProperty,
            orderType: this.orderProperty ? this.orderType : '',
            valetVehicleBrandQOList: this.valetVehicleBrandQOList,
            isBind: this.origin,
            // salesArea: '12',
          }
          if (first) {
            this.isLoad = true
          }
          console.log(params)
          const res = await this.$VoHttp.GOODS.apiGoodsQueryWarehousesGoodsList({
            ...this.pageQuery,
            ...this.queryForm,
            ...params,
            sourceType: 1,
            goodsIdList: this.goodsIdList,
          }).catch((e) => {
            error(e.message || '暂无数据')
            this.isOverLoading = true
          })
          this.isOverLoading = true


          if (!res || !res.data) {
            this.loading = false
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            this.closeHandler()
            return
          }
          const { data } = res
          this.total = data.total || 0

          if (init) {
            this.shopListData = []
          }
          this.shopListData = this.shopListData.concat(data.records || [])
          this.modelCar = data.records
          // console.log('this.shopListData22222222', this.shopListData)
          this.hasMore = this.shopListData.length < data.total
          this.$forceUpdate()
        } catch (e) {
          console.warn(e, 'TargetFile=>>ShopList')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
        this.loading = false
        this.triggered = false
        this.refresh = false
        this.loadingStatus = false
        if (init) {
          this.scrollTop = 0
        }
        this.closeHandler()
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
        setTimeout(() => {
          this.loadingStatus = false
        }, 2000)
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.queryListData(1)
          // this.initData()
          // this.initData()
          // setTimeout(() => {
          //   this.triggered = false
          //   this.refresh = false
          //   this.loadingStatus = false
          // }, 500)
        }
        // console.log('this.triggered', this.triggered)
      },
      //滚到底部加载
      scrolltolower() {
        // uni.$u.throttle(() => {
        // }, 2000)
        console.log('底部加载')
        this.refresh = false
        if (this.shopListData.length >= this.total) {
          return
        }
        this.pageQuery.pageNo += 1
        this.queryListData()
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
      // 滑动触发判断是否固定
      scrollHandler({ detail: { scrollTop } }) {
        this.scrollTop = scrollTop
        if (scrollTop >= 205 && !this.fixedTop) {
          this.fixedTop = true
        }
        if (scrollTop < 205 && this.fixedTop) {
          this.fixedTop = false
        }
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
          `/pagesAgent/GoodsList/GoodsDetail?id=${item.goodId}&wid=${item.warehouseId}&companyId=${this.companyId}&userName=${this.userName}&current=${this.pageQuery.queryType}&imType=${this.imType}`,
        )
      },
      //确认下单点击事件
      async confirm(data) {
        this.isCoding = data.isCoding
        this.isInstall = data.isInstall
        this.isNew = data.isNew
        this.isCash = data.isCash
        // if (this.currentRow.isCoding && !data.isCoding) {
        //   this.confirmModal = true
        // } else {
        //   this.goConfirmOrder()
        // }
        await this.goConfirmOrder()
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
        const orderProductInfo = {
          shopInfo: {
            shopName: this.currentRow.shopName,
            userName: this.userName,
            buyerId: this.companyId,
          },
          goodsInfo: {
            addedServices: [],
            goodsCount: 1,
            goodsId: this.currentRow.goodId,
            isCash: Number(this.isCash) === 1 ? true : false,
            originalPrice:
              Number(this.isCash) === 1 ? this.currentRow.cashPrice : this.currentRow.accountPrice,
            periodDays: this.currentRow.accountPeriodDays || 0,
            projectId: '',
            shippingType: this.currentRow.shippingType, // 1 包邮 2 到付
            codingPrice: this.currentRow.codingPrice,
            isCoding: this.isCoding,
            isInstall: this.isInstall,
            installationFee: this.currentRow.installationFee, //安装费用
            isNew: this.isNew,
            tradeInFee: this.currentRow.tradeInFee, //回收费用
            shopId: this.currentRow.shopId,
            skuProperty: JSON.stringify(this.currentRow.skuProperty || {}),
            warehouseId: this.currentRow.warehouseId,
            warehouseName: this.currentRow.warehouse,
            deliveryAreaName: this.currentRow.deliveryAreaName,
            arrivalTime: this.currentRow.arrivalTime,
            pic: this.currentRow.pic,
            name: this.currentRow.name,
            modelName: this.currentRow.modelName,
            categoryType: this.currentRow.categoryType,
          },
        }
        console.log(orderProductInfo, 'xxxx')

        this.$storage.set('OrderPayInfoAgent', orderProductInfo)
        this.$linkToEasy(
          `/pagesAgent/SubmitOrder/SubmitOrder?isValet=1&queryType=` +
            this.pageQuery.queryType +
            '&imType=' +
            this.imType,
        )
        this.showBuyNow = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .position-f {
    position: fixed;
  }
  .search {
    box-sizing: border-box;
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    &-result {
      background: #fff;
      padding: 32rpx;
      margin: 16rpx 0 16rpx;
      &__photo {
        width: 80rpx;
        height: 80rpx;
      }
      &__again {
        width: 160rpx;
        height: 56rpx;
        line-height: 52rpx;
        text-align: center;
        box-sizing: border-box;
        font-size: 24rpx;
        color: #22284b;
        border: 2rpx solid #d3d4db;
        border-radius: 200rpx;
        color: rgba(0, 0, 0, 0.85);
        margin-left: 24rpx;
      }
    }
  }
  .code {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    padding: 32rpx 32rpx 24rpx 32rpx;
    color: rgba(0, 0, 0, 0.85);
    font-size: 32rpx;
    &-btn {
      color: #0d66ff;
      font-size: 28rpx;
    }
  }
  .divider_c {
    width: 360rpx;
    margin: 0 auto;
  }
  .shop {
    width: 750rpx;
    //height: 100vh;
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
  .no_data {
    height: 400rpx;
  }
  .block {
    display: block;
  }
  .remarks {
    background: #f7f7f8;
    font-size: 28rpx;
    line-height: 150%;
    color: rgba(0, 0, 0, 0.65);
    border-radius: 4rpx;
    padding: 16rpx 28rpx;
    box-sizing: border-box;
    margin-top: 32rpx;
  }
  .tab-nav {
    width: 750rpx;
    padding: 0rpx 180rpx;
    box-sizing: border-box;
  }
</style>
