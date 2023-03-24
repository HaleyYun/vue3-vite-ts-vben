<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="shop"
  >
    <!-- #ifdef H5 --><!-- #endif -->
    <!-- 固定选择车型：start H5端	-->
    <view
      v-if="fixedTop && (vehicleChoose.length || brandChoose.length || typeChoose.length)"
      :style="{ top: Number($systemInfo.statusBarHeight) * 2 + 176 + 'rpx' }"
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
              :opacity="0.25"
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
              :opacity="0.25"
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
              :opacity="0.25"
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

    <!-- #ifdef APP-PLUS -->
    <!-- 固定选择车型：start APP端	-->
    <!-- <view v-if="fixedTop" class="shop-slide__type fixed-car-app bg-white p-y-16">
      <scroll-view scroll-x class="flex1 type-scroll p-l-32">
        <view class="flex flex-vertical-c">
          <view class="type-selected flex flex-vertical-c" v-if="vehicleChoose.id">
            <view class="m-r-8">{{ vehicleChoose.name }}</view>
            <VoIcon
              name="close-c"
              :size="12"
              color="#000000"
              :opacity="0.25"
              @click="vehicleChoose = ''"
            />
          </view>
          <view
            class="type-selected flex flex-vertical-c"
            v-for="item in brandChoose"
            :key="item.id"
          >
            <view class="m-r-8">{{ item.name }}</view>
            <VoIcon
              name="close-c"
              :size="12"
              color="#000000"
              :opacity="0.25"
              @click="brandDel(item, 'brandList')"
            />
          </view>
          <view
            class="type-selected flex flex-vertical-c"
            v-for="item in typeChoose"
            :key="item.id"
          >
            <view class="m-r-8">{{ item.name }}</view>
            <VoIcon
              name="close-c"
              :size="12"
              color="#000000"
              :opacity="0.25"
              @click="brandDel(item, 'typeList')"
            />
          </view>
        </view>
      </scroll-view>
      <view class="type-delete flex flex-vertical-c flex-justify-c">
        <view class="m-r-4 color-block-45">清空</view>
        <VoIcon :opacity="0.45" :size="16" color="#000" name="delete" />
      </view>
    </view> -->
    <!-- 固定选择车型：end	-->
    <!-- #endif -->

    <view class="vh-full flex flex-column overflow-hidden relative">
      <!--  顶部固定区域  -->

      <view>
        <VoNav is-fixed is-have-more title="买货" />
        <view class="shop-search">
          <VoSearch
            v-model="queryForm.name"
            :actionStyle="{ color: '#fff' }"
            :focus="focusState"
            :showInsideAction="true"
            bgColor="#fff"
            borderColor="#FF5319"
            height="34"
            placeholder="商品名称/品牌/车型"
            @custom="searchHandler"
            @search="searchHandler"
          >
            <view slot="suffix" class="flex flex-vertical-c"                 @click="upspringFn"
            >
              <VoIcon
                :opacity="0.45"
                class="m-r-14"
                color="#000"
                name="voice-icon"
              />
            </view>
          </VoSearch>
        </view>
      </view>

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
        <!--  3= 服务商首页、服务商进货列表/全国投放、服务商进货/全国店铺项目列表 结果页-/pagesAgent/VinTell/VinTell
              4= 服务商代客下单列表、服务商代客下单店铺主页 结果页-/pagesAgent/GlobalSearch/QueryResult
              5= 修理厂首页、买货列表、买货店铺主页  结果页-/pagesGarage/GlobalSearch/QueryResult -->
        <!--  当前为修理厂买货列表origin=5 结果页 /pagesGarage/GlobalSearch/QueryResult -->
        <VoGroupVinBtn
          background="#FEF9F1"
          borderColor="#FFE2B8"
          class="shop-group"
          rightToUrl="/pagesProduct/ApplicationCar/ApplicationCarNew?origin=5"
          @leftBtnFn="vin"
        ></VoGroupVinBtn>
        <!--  左右可滑动区域  -->
        <view class="shop-slide">
          <!--          <scroll-view scroll-x>-->
          <!--            <view class="flex flex-vertical-c">-->
          <!--              <block v-for="(info, infoIndex) in vehicleList">-->
          <!--                <view-->
          <!--                  v-if="infoIndex < 10"-->
          <!--                  :key="info.id"-->
          <!--                  class="flex flex-column flex-vertical-c m-r-40"-->
          <!--                  @click="vehicleChoosed(info)"-->
          <!--                >-->
          <!--                  <image :src="info.logo" class="shop-slide__img" />-->
          <!--                  <view class="shop-slide__name">{{ info.name }}</view>-->
          <!--                </view>-->
          <!--              </block>-->
          <!--              <view class="shop-slide__more" @click="toMore('vehicle')">-->
          <!--                <view>查看</view>-->
          <!--                <view class="m-b-4">更多</view>-->
          <!--                <VoIcon :size="12" name="left-right-arrow" />-->
          <!--              </view>-->
          <!--            </view>-->
          <!--          </scroll-view>-->
          <view class="shop-slide__type">
            <view class="type-tips">品牌</view>
            <scroll-view class="flex1 type-scroll" scroll-x>
              <view class="flex flex-vertical-c">
                <block v-for="(info, infoIndex) in brandList">
                  <view
                    v-if="infoIndex < 10"
                    :key="info.id"
                    :class="info.choosed ? 'choosed' : ''"
                    class="type-block"
                    @click="brandChoosed(info)"
                  >
                    {{ info.name }}
                  </view>
                </block>
              </view>
            </scroll-view>
            <view
              class="flex flex-vertical-c shop-slide__more2 flex-justify-r"
              @click="toMore('brand')"
            >
              <view class="color-block-65">查看更多</view>
              <VoIcon :size="12" name="left-right-arrow" />
            </view>
          </view>
          <view class="shop-slide__type m-t-32">
            <view class="type-tips">类型</view>
            <scroll-view class="flex1 type-scroll" scroll-x>
              <view v-if="typeList && typeList.length" class="flex flex-vertical-c">
                <block v-for="(info, infoIndex) in typeList">
                  <view
                    v-if="infoIndex < 10"
                    :key="info.id"
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
          <view class="shop-slide__type m-t-32">
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
            v-if="dockingPeopleData && dockingPeopleData.id"
            class="shop-slide__type m-t-32 p-b-18"
          >
            <view class="type-tips">货源</view>
            <scroll-view class="flex1 type-scroll" scroll-x>
              <view class="flex flex-vertical-c">
                <view
                  v-for="info in originList"
                  :key="info.name"
                  :class="info.choosed ? 'choosed' : ''"
                  class="type-block"
                  @click="originChoosed(info)"
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
                    :opacity="0.25"
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
                    :opacity="0.25"
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
                    :opacity="0.25"
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
        <!--  商品信息列表区域  -->
        <block v-if="shopListData.length > 0">
          <BuyGoodsInfo
            v-for="(item, index) in shopListData"
            :key="index"
            :good-info="item"
            @BuyNow="buyHandler(item)"
            @click.native="goGoodsDetail(item)"
          />
          <VoLoadingText :has-more="hasMore" :loading="loading" />
        </block>
        <VoNoData v-else-if="isLoadingOver" />
      </scroll-view>
    </view>

    <u-popup :round="10" :show="showBuyNow" closeable mode="bottom" @close="close" @open="open">
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
    <!-- 录音展示 -->
    <view v-show="recording" class="position-f">
      <RecordingPanel ref="recordingPanel" @close="recording = false" @confirm="confirmFn" />
      <view class="safearea-box" />
    </view>
  </view>
</template>
<script>
  import BuyGoodsInfo from './components/BuyGoodsInfo'
  import BuyNow from './components/BuyNow'
  import VoLoadingText from '@/components/VoLoadingText/VoLoadingText'
  import VoModal from '@/components/VoModal/VoModal'
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import {
    chooseImageOcrByPromise,
    floatTwo,
    getUserCheckStatus,
    uploadMp3,
    vocenCameraFn,
  } from '@/common/helper'
  import permission from '@/common/permission'
  export default {
    name: 'ShopList',
    components: { VoModal, BuyGoodsInfo, BuyNow, VoLoadingText, RecordingPanel },
    data() {
      return {
        isLoadingOver: false,
        dockingPeopleData: null,
        recording: false, // 录音功能展示
        hasMore: true,
        loading: false,
        keyword: '', // 搜索双向绑定
        showBuyNow: false,
        fixedTop: false, // 锁定到顶部车系
        confirmModal: false, //确认下单弹框控制
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
            orderType: 'DESC',
            choosed: false,
          },
          // { name: '到货快', value: 'deliveryTime', orderType: 'DESC', choosed: false },
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
        orderProperty: '', //选中排序属性cashPrice：价格 ；deliveryTime ：到货快；saleCount：销量
        origin: 0, // 选中货源
        originName: '', // 选中货源name
        orderType: 'DESC', //"ASC", "升序" "DESC", "降序"
        valetVehicleBrandQOList: [], //车品牌下所有车系
        isBrandChoose: false, //是否进行品牌选择操作
        isTypeChoose: false, //是否进行类型选择操作

        //安装服务和以旧换新服务
        isCoding: false,
        isInstall: false,
        isNew: false,

        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        total: 0,
        scanCount: 0,
        voiceLoading: false,
        voiceParam: null,
        focusState: false, //搜索框聚焦状态
        fromOrigin: '', // 跳转来源
        loaded: false, // 是否加载过万能喊数据
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
    async onLoad(options) {
      this.focusState = !!options.state
      // 初始化头部数据
      this.initData()
      console.log(options.origin)
      if (options.origin == 'voice') {
        this.fromOrigin = 'voice'
      }

      await this.getDockingPeopleRequest()

      uni.$off('select')
      uni.$off('selectVehicle')
      //选择品牌
      uni.$on('select', (row) => {
        let obj = {}
        let result = row.reduce((item, next) => {
          obj[next.id] ? '' : (obj[next.id] = true && item.push(next))
          return item
        }, [])
        this.brandChoose = result
        console.log('brandChooseonLoad', result)
        this.voiceParam = null
        setTimeout(() => {
          if (this.brandChoose.length) {
            this.queryData(true)
          }
        }, 1000)
      })
      //获取选择车型
      uni.$on('selectVehicle', (row) => {
        // this.vehicleChoose = [
        //   {
        //     id: row[0].parentId || row[0].id,
        //     name: row[0].parentName || row[0].name,
        //   },
        // ]
        this.vehicleChoose = row
        // this.valetVehicleBrandQOList = row.map((item) => {
        //   return {
        //     id: item.id,
        //     level: item.level,
        //   }
        // })
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
        this.voiceParam = null
        console.log('valetVehicleBrandQOListonLoad', this.valetVehicleBrandQOList)
        if (this.valetVehicleBrandQOList.length) {
          this.queryData(true)
        }
      })
    },
    onShow() {
      if (this.fromOrigin === 'voice') {
        //万能喊返回的数据
        let dataVoice = this.$storage.get('voiceRecords')
        console.log(dataVoice)
        this.$storage.remove('voiceRecords')
        // console.log(JSON.parse(dataVoice.param))
        if (dataVoice.records && dataVoice.records.records && dataVoice.records.records.length) {
          console.log('dataVoice', dataVoice.records)
          this.voiceParam = dataVoice.param
          dataVoice.records.records.forEach((item) => {
            item.cashPrice = floatTwo(item.cashPrice)
            item.codingPrice = floatTwo(item.codingPrice)
            item.installationFee = floatTwo(item.installationFee)
            item.accountPrice = floatTwo(item.accountPrice)
            item.tradeInFee = floatTwo(item.tradeInFee)
          })
          this.shopListData = dataVoice.records.records
          this.total = dataVoice.records.total
          this.hasMore = this.shopListData.length < this.total
          console.log(this.hasMore)
        } else if (!this.loaded) {
          this.voiceParam = null
          this.$u.toast('未检索到相关商品')
          setTimeout(() => {
            this.queryData(true)
          }, 1000)
        }
        this.loaded = true
      } else {
        this.queryData(true)
      }
    },
    methods: {
      //获取对接人信息
      getDockingPeopleRequest() {
        this.$VoHttp
          .apiCompanyInvitationAgentByGarage({}, { noLoading: true })
          .then((res) => {
            this.dockingPeopleData = res.data || null
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请检查网络')
          })
      },
      // 初始化头部数据
      async initData() {
        //热门车型
        let vehicleRes = await this.$VoHttp.BUSINESS.businessVehicleBrandSelectOne(
          {},
          { noLoading: true },
        )
        if (!vehicleRes || !vehicleRes.data) return
        this.vehicleList = vehicleRes.data.hotList

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
        const nameArr = this.typeList.map((item) => item.name)
        typeList.map((item) => {
          if (item.name && !nameArr.includes(item.name)) {
            this.typeList.push(item)
          }
        })
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
        this.voiceParam = null
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
        await this.queryData(true)
      },
      //品牌选择
      brandChoosed(info) {
        this.isBrandChoose = true
        this.voiceParam = null
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
        this.voiceParam = null
        this.typeList.forEach((item) => {
          if (item.id === info.id) {
            item.choosed = !item.choosed
          }
        })
        // this.queryData(true)
      },
      //排序选择
      orderChoosed(info) {
        this.voiceParam = null
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
          item.choosed = item.name === info.name
        })
        this.queryData(true)
      },
      // 货源选择
      originChoosed(info) {
        this.voiceParam = null
        // 取消选中
        if (info.name === this.originName) {
          this.origin = 0
          this.originName = ''
          this.originList.forEach((item) => {
            item.choosed = false
          })
          this.queryData(true)
          return
        }
        this.origin = info.value
        this.originName = info.name
        this.originList.forEach((item) => {
          item.choosed = item.name === info.name
        })
        this.queryData(true)
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
          this.queryData(true)
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
        this.queryData(true)
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
        this.queryData(true)
      },
      buyHandler(row) {
        if (row.warnLabel === '无货') {
          this.$u.toast('商品暂不支持购买，请购买其他商品')
          return
        }
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
        this.voiceParam = null
        this.queryData(true)
        console.log(res)
        if (!res) return
        // 执行搜索逻辑
      },
      // 加载商品列表数据
      async queryData(init) {
        if (this.loading) return
        this.loading = true
        try {
          if (init || this.refresh) {
            this.pageQuery.pageNo = 1
            this.shopListData = []
          }
          let params

          if (this.voiceParam) {
            params = JSON.parse(this.voiceParam)
            params.pageNo = this.pageQuery.pageNo
          } else {
            let brandIds = this.brandChoose.length ? this.brandChoose.map((item) => item.id) : []
            let categoryTypes = this.typeChoose.length
              ? this.typeChoose.map((item) => item.name)
              : []
            params = {
              brandIds: brandIds,
              categoryTypes: categoryTypes,
              orderProperty: this.orderProperty,
              orderType: this.orderProperty ? this.orderType : '',
              valetVehicleBrandQOList: this.valetVehicleBrandQOList,
              isBind: this.origin,
              // salesArea: '12',
              ...this.pageQuery,
              ...this.queryForm,
            }
            // 买货本地有货  绑定服务商得本地 要传L
            if (+this.origin === 1) {
              params.queryType = 'L'
            }
          }

          // const { data } = await new Promise(() => {})
          const res = await this.$VoHttp.GOODS.apiGoodsQueryWarehousesGoodsList(params)
          if (!res || !res.data) return
          const { data } = res
          this.isLoadingOver = true
          this.total = data.total
          this.loading = false
          data.records.forEach((item) => {
            item.cashPrice = floatTwo(item.cashPrice)
            item.codingPrice = floatTwo(item.codingPrice)
            item.installationFee = floatTwo(item.installationFee)
            item.accountPrice = floatTwo(item.accountPrice)
            item.tradeInFee = floatTwo(item.tradeInFee)
          })
          this.shopListData = this.shopListData.concat(data.records)
          console.log('this.shopListData22222222', this.shopListData)
          this.hasMore = this.shopListData.length < data.total
          this.triggered = false
          this.refresh = false
          this.loadingStatus = false
        } catch (e) {
          this.loading = false
          this.hasMore = false
          this.triggered = false
          this.refresh = false
          this.loadingStatus = false
          console.warn(e, 'TargetFile=>>ShopList')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
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
          this.queryData()
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
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.shopListData.length >= this.total) {
            return
          }
          this.pageQuery.pageNo += 1
          this.queryData()
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
      // 滑动触发判断是否固定
      scrollHandler({ detail: { scrollTop } }) {
        this.scrollTop = scrollTop
        if (scrollTop >= 245 && !this.fixedTop) {
          this.fixedTop = true
        }
        if (scrollTop < 245 && this.fixedTop) {
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
      // 弹起录音
      async upspringFn() {
        console.log(this.recording)
        let a
        if (uni.getSystemInfoSync().platform == 'ios') {
          // console.log(permissionStatus)
          console.log(a)
          var avaudiosession = plus.ios.import('AVAudioSession')
          var avaudio = avaudiosession.sharedInstance()
          await avaudio.requestRecordPermission((res) => {
            console.log('回调完成', res)
            const status = avaudio.recordPermission()
            if (+status !== 1684369017 && +status !== 1970168948) {
              this.recording = true
              setTimeout(() => {
                this.$refs.recordingPanel?.reset()
                this.$refs.recordingPanel?.onMonitorEvents()
              }, 200)
            }
          })
          a = await permission.judgeIosPermission('record')
          if (!a) {
            return
          } else {
            this.recording = true
            setTimeout(() => {
              this.$refs.recordingPanel?.reset()
              this.$refs.recordingPanel?.onMonitorEvents()
            }, 200)
          }
        } else {
          a = await permission.requestAndroidPermission('android.permission.RECORD_AUDIO')
          console.log(a)
          if (!a) {
            return
          } else if (a === -1) {
            uni.showModal({
              title: '提示',
              content: '请去设置打开麦克风权限',
              success: function (res) {
                if (res.confirm) {
                  permission.gotoAppPermissionSetting()
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              },
            })
          } else {
            this.recording = true
            setTimeout(() => {
              this.$refs.recordingPanel?.reset()
              this.$refs.recordingPanel?.onMonitorEvents()
            }, 200)
          }
        }
      },
      /**
       * 上传语音文件
       * @param path
       * @param duration
       */
      confirmFn(path, duration) {
        console.log('duration', duration)
        if (this.voiceLoading) return
        if (Math.trunc(duration) < 1) {
          uni.$u.toast('录入语音时长过短~~')
          return
        }
        this.voiceLoading = true

        uploadMp3({ url: path, name: 'audio.mp3', isPath: true, tip: '上传中' })
          .then((res) => {
            console.log('语音path', res.fileNameUrl)
            this.RecordAudioText(res.fileNameUrl)
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络错误')
          })
          .finally(() => {
            this.voiceLoading = false
            this.recording = false
          })
      },
      /**
       * 语音转文字
       * @returns {Promise<void>}
       * @constructor
       */
      async RecordAudioText(mp3) {
        console.log('语音转文字')
        uni.showLoading({
          title: '识别中...',
        })
        try {
          const res = await this.$VoHttp.IM.apiMessageRecordAudioToTextFromUrl(
            {
              filePath: mp3,
            },
            { noLoading: true },
          )
          if (!res || !res.data) return
          console.log('识别数据', res.data)
          this.queryForm.name = res.data.join('')
          this.voiceParam = null
          this.queryData(true)
        } catch (e) {
          uni.hideLoading()
          console.log('语音转文字失败', e)
          uni.$u.toast(e.message || '暂未匹配到相关数据~~')
        }
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
      },
      // 跳转搜索结果
      goResult(keyword) {
        if (keyword) {
          this.queryForm.name = keyword
          this.searchHandler(keyword)
        }
      },
      /**
       * 去商品详情
       */
      goGoodsDetail(item) {
        this.$linkToEasy(
          `/pagesGarage/ShopList/GoodsDetail?id=${item.goodId}&wid=${item.warehouseId}`,
        )
      },
      //确认下单点击事件
      async confirm(data) {
        this.showBuyNow = false
        this.isCoding = data.isCoding
        this.isInstall = data.isInstall
        this.isNew = data.isNew
        // if (!data.isCoding && data.proIsCoding) {
        //   this.confirmModal = true
        // } else {
        //   this.goConfirmOrder()
        // }
        this.goConfirmOrder()
        // //检查是否可以下单
        // let val = await getUserCheckStatus()
        // console.log('getUserCheckStatus()', val)
        // if (val) {
        //   this.goConfirmOrder()
        // } else {
        //   this.$u.toast('当前用户禁止下单~~')
        // }
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
        this.currentRow.goodId
        const proDetailInfo = await this.$VoHttp.GOODS.apiGoodsGarageDetail({
          goodsId: this.currentRow.goodId,
          warehouseId: this.currentRow.warehouseId,
        })
          .then()
          .catch((e) => {
            this.$u.toast(e.message || '获取详情失败')
            return
          })
        console.log(proDetailInfo, 'proDetailInfo')
        const orderProductInfo = {
          shopInfo: {
            shopName: this.currentRow.shopName,
          },
          goodsInfo: {
            orgGoodsId: proDetailInfo.data.orgGoodsId || '',
            addedServices: [],
            goodsCount: 1,
            goodsId: this.currentRow.goodId,
            isCash: true,
            originalPrice: this.currentRow.cashPrice,
            periodDays: 0,
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
            modelName: this.currentRow.modelName,
            categoryType: this.currentRow.categoryType,
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
      padding: 8rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-group {
      background: #fff;
      padding: 16rpx 32rpx;
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
        padding: 0 24rpx;
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
  .position-f {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
</style>
