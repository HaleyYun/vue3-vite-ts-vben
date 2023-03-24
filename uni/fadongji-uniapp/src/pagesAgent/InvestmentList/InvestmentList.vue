<template>
  <view>
    <view
      :class="{
        'theme-blue': appTheme === 'blue',
        'theme-red': appTheme === 'red',
      }"
      class="invest flex flex-column"
      @click="scrollViewFn"
    >
      <vo-qi-mo-customer ref="qiMoRef"></vo-qi-mo-customer>

      <view>
        <VoNav :is-fixed="false" is-have-more title="进货到店/全国投放">
          <view slot="title">
            <EraTabs
              :current="current"
              :list="tabsList"
              :scrollable="false"
              activeStyle="color:rgba(0, 0, 0, 0.85); fontWeight: bold;font-size: 18px"
              inactiveStyle="color: rgba(0, 0, 0, 0.45);fontWeight: 400;"
              lineColor="#ffffff"
              @change="changeTabs"
            />
          </view>
        </VoNav>
        <view class="invest-search flex flex-vertical-c">
          <VoSearch
            v-model="keyword"
            :showInsideAction="true"
            bgColor="#fff"
            borderColor="#FF5319"
            class="p-r-24"
            height="34"
            placeholder="搜索商品/项目名称"
            @custom="searchFn"
            @search="searchFn"
          >
            <!--            <block slot="leftIcon">-->
            <!--              <VoIcon class="m-r-20" color="#FF5319" name="scan" @click="vin" />-->
            <!--            </block>-->
            <block slot="suffix">
              <view class="flex flex-vertical-c" @click="upspringFn">
                <VoIcon :opacity="0.65" class="mx-14" color="#000" name="voice-line" />
              </view>
            </block>
          </VoSearch>
          <u-line color="#6F738A" direction="col" length="16" />
          <view class="p-l-32 invest-my" @click="toMyInvest">我的项目</view>
        </view>
      </view>
      <!--      <swiper :current="current" class="swiper flex1" @change="swiperChange">-->
      <!--        <swiper-item v-for="swiper in tabsList" :key="swiper.name">-->
      <!--  中间内容区域  -->
      <scroll-view
        :refresher-enabled="!fliterVisible && !fliterVisiblePay"
        :refresher-threshold="10"
        :refresher-triggered="triggered"
        :scroll-y="!fliterVisible && !fliterVisiblePay"
        class="scroll-view overflow-y"
        refresher-background="#F7F7F8"
        refresher-default-style="none"
        scroll-top="0"
        @refresherabort="onAbort"
        @refresherpulling="onPulling"
        @refresherrefresh="onRefresh"
        @refresherrestore="onRestore"
        @scroll="onScroll"
        @scrolltolower="scrolltolower"
      >
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <!--  3= 服务商首页、服务商进货列表/全国投放、服务商进货/全国店铺项目列表 结果页-/pagesAgent/VinTell/VinTell
            4= 服务商代客下单列表、服务商代客下单店铺主页 结果页-/pagesAgent/GlobalSearch/QueryResult
            5= 修理厂首页、买货列表、买货店铺主页  结果页-/pagesGarage/GlobalSearch/QueryResult -->
        <!--  当前为服务商进货/全国投放列表origin=3 结果页 /pagesAgent/VinTell/VinTell -->
        <VoGroupVinBtn
          background="#FEF9F1"
          borderColor="#FFE2B8"
          class="invest-group"
          leftName="VIN查询"
          rightToUrl="/pagesProduct/ApplicationCar/ApplicationCarNew?origin=3"
          @leftBtnFn="vin"
        ></VoGroupVinBtn>
        <!--  左右可滑动区域  -->
        <view class="invest-slide">
          <!-- 进货到店筛选 -->
          <scroll-view v-if="current === 0" scroll-x>
            <view class="flex flex-vertical-c">
              <view
                v-for="item in brandList"
                :key="item.id"
                :class="item.choosed ? 'choosed' : ''"
                class="invest-slide__item flex flex-column flex-vertical-c"
                @click="brandClick(item)"
              >
                <image :src="item.logoUrl + '&type=1'" class="item-img" />
                <view class="item-name">{{ item.name }}</view>
              </view>
            </view>
          </scroll-view>
          <!-- 仓库筛选 -->
          <scroll-view v-if="current === 1" scroll-x>
            <view class="ware flex m-l-32">
              <view
                v-for="(item, i) in wareList"
                :key="i + item.id"
                :class="item.choosed ? 'choosed' : ''"
                class="ware-item"
                @click="wareClick(item)"
              >
                <view class="ware-item__name">{{ item.name }}</view>
                <view class="time">周转率:{{ item.turnoverRate || '--' }}天</view>
              </view>
            </view>
          </scroll-view>
          <!-- 排序 -->
          <view class="order-nav">
            <view
              v-for="order in orderList"
              :key="order.name"
              :class="order.choosed ? 'choosed' : ''"
              class="order-nav__item flex1 flex-justify-c"
              @click="orderData(order)"
            >
              <view class="item-text">{{ order.name }}</view>
              <VoIcon
                :name="
                  order.orderType
                    ? order.orderType === 'ASC'
                      ? 'direction'
                      : order.orderType === 'DESC'
                      ? 'direction-down'
                      : 'default-gray'
                    : 'default-gray'
                "
                :size="16"
              />
              <view class="right-line" />
            </view>
          </view>
          <!-- 类型、型号筛选 -->
          <view class="fl">
            <scroll-view scroll-x>
              <view class="flex flex-vertical-c m-t-24 fl-fit">
                <view
                  v-for="item of filterList"
                  :key="item.name"
                  :class="item.choosed ? 'select' : 'no-select'"
                  class="invest-slide__sift flex flex-vertical-c"
                  @click="filterClick(item)"
                >
                  <view class="fz-24 m-r-4">{{ item.name }}</view>
                  <VoIcon
                    :color="item.choosed ? '#FF5319' : '#000'"
                    :name="item.choosed ? 'close-arrow-t' : 'arrow-bottom-fill'"
                    :size="8"
                  />
                </view>
              </view>
            </scroll-view>
            <FliterPop
              ref="fliterPop"
              :list="typeList"
              :visible="fliterVisible"
              @close="filterClose"
              @confirm="filterConfirm"
              @reset="categoryType = ''"
            />
            <FliterPopPay
              ref="fliterPopPay"
              :visible="fliterVisiblePay"
              @close="fliterVisiblePay = false"
              @confirm="filterConfirmPay"
              @reset="resetPayType"
            />
          </view>
        </view>

        <!--  商品信息  -->
        <block v-if="infoList.length > 0">
          <InvestmentGoodsInfo
            v-for="info of infoList"
            :key="info.id"
            :dataObj="info"
            @addShop="showInvestmentPop('加入备货车', info)"
            @buyShop="showInvestmentPop('订购', info)"
            @goProjectDetails="goProjectDetails"
            @updateFn="scrollViewFn"
          />
          <VoLoadingText :has-more="infoList.length < total" :loading="loading" />
        </block>
        <VoNoData v-else-if="!infoList.length && !loading" noDataTips="暂无匹配商品" />
      </scroll-view>
      <!--        </swiper-item>-->
      <!--      </swiper>-->
    </view>
    <!-- 加购弹框 -->
    <u-popup :round="8" :show="showInvestment" mode="bottom" @close="showInvestment = false">
      <InvestmentPopup
        :btnText="btnText"
        :info="dataObj"
        :is-my-self-goods="true"
        :queryType="dataObj.queryType"
        @closeFn="InvestmentPopupClose()"
      />
    </u-popup>
    <view v-show="recording" class="fixed recording bg-white">
      <RecordingPanel ref="recordingPanel" @close="recording = false" @confirm="confirmFn" />
    </view>
    <!--  底部悬浮end  -->
    <VoComplaintAction ref="complaintRef" />
    <view class="fixed-icon" @click="goCartFn">
      <image class="fixed-icon__img" src="/static/icons/contract_icon.png" />
      <VoBadge v-if="cartNum" :value="cartNum" class="badge_number" max="99" />
    </view>
  </view>
</template>

<script>
  import InvestmentGoodsInfo from './components/InvestmentGoodsInfo'
  import InvestmentPopup from './components/InvestmentPopup'
  import FliterPop from './components/FliterPop'
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import FliterPopPay from './components/FliterPopPay'
  import {
    chooseImageOcrByPromise,
    hideLoading,
    showLoading,
    uploadMp3,
    vocenCameraFn,
  } from '@/common/helper'
  import permission from '@/common/permission'
  // import NoData from '@/pagesProduct/components/NoData'

  export default {
    name: 'InvestmentList',
    components: { InvestmentGoodsInfo, FliterPop, FliterPopPay, InvestmentPopup, RecordingPanel },
    data() {
      return {
        recording: false,
        keyword: '', // 搜索双向绑定
        current: 0, // 横向tabs默认
        tabsList: [
          {
            name: '进货到店',
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
            value: 'type',
          },
          {
            id: 1,
            name: '品牌',
            value: 'brand',
            choosed: false,
          },
          {
            id: 2,
            name: '型号',
            choosed: false,
            value: 'size',
          },
          // {
          //   id: 3,
          //   name: '适配车型',
          //   value: 'car',
          //   choosed: false,
          // },
          {
            id: 4,
            name: '付款方式',
            choosed: false,
            value: 'pay',
          },
        ],
        orderList: [
          {
            name: '价格',
            choosed: false,
            icon: '',
            orderType: '',
            orderProperty: 'cashPrice',
          },
          {
            name: '回报率',
            choosed: false,
            icon: '',
            orderType: '',
            orderProperty: 'rol',
          },
          {
            name: '参与人数',
            choosed: false,
            icon: '',
            orderType: '',
            orderProperty: 'holderNumber',
          },
        ],
        wareList: [
          // {
          //   name: '广州平台仓',
          //   choosed: false,
          // },
          // {
          //   name: '杭州平台仓',
          //   choosed: false,
          // },
          // {
          //   name: '济南平台仓',
          //   choosed: false,
          // },
          // {
          //   name: '长沙平台仓',
          //   choosed: false,
          // },
          // {
          //   name: '成都平台仓',
          //   choosed: false,
          // },
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
        skuProperties: [], //商品sku值
        modelIds: [], //型号id集合
        infoList: [],
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        chooseWareData: '',
        showInvestment: false, // 弹出层
        btnText: '',
        dataObj: {},
        loading: false,
        videoVoicePath: {},
        cartNum: 0,
        canRecorde: false,
        hasMore: true,
      }
    },
    onShow() {
      this.$refs.qiMoRef?.close()
      if (this.brandIds.length <= 0) {
        this.filterList[1].choosed = false
      }
      this.getCartNumRequest()
      uni.$off('refresh')
      uni.$on('refresh', () => {
        console.log('refreshrefresh========')
        this.getData(true)
      })
    },
    onLoad(options) {
      if (options.type && options.type === 'all') {
        this.current = 1
      }
      if (options.keyword) {
        this.keyword = options.keyword
      }
      this.getBrandData()
      this.getWarePlat()
      if (options.vin) {
        this.keyword = options.vin
        this.resultFn(options.vin)
      } else {
        this.getData(true)
      }
      uni.$off('select')
      uni.$off('selectVehicle')
      //筛选品牌
      uni.$on('select', (row) => {
        console.log('select', row)

        this.brandList.forEach((item) => {
          item.choosed = false
        })
        this.brandIds = row.map((item) => {
          return item.id
        })
        if (this.brandIds.length <= 0) {
          this.filterList[1].choosed = false
        }
        this.getData(true)
      })
      //获取选择车型
      uni.$on('selectVehicle', (row) => {
        this.valetVehicleBrandQOList = row.map((item) => {
          return {
            id: item.id,
            level: item.level,
          }
        })
        console.log('valetVehicleBrandQOList', this.valetVehicleBrandQOList)
        this.getData(true)
      })
      //获取选择型号id集合
      uni.$on('obj', (row) => {
        let skus = row.skuProperties.map((item) => {
          return item
        })
        let models = row.modelList.map((item) => {
          return item
        })
        this.skuProperties = skus
        this.modelIds = models
        console.log('modelIds ==>> ', this.modelIds)
        console.log('skuProperties ==>> ', this.skuProperties)
        this.getData(true)
      })
    },
    methods: {
      //订购弹框关闭
      InvestmentPopupClose() {
        this.showInvestment = false
        this.getCartNumRequest()
      },
      // 去备货车
      goCartFn() {
        this.$linkToEasy('/pagesAgent/InvestmentList/InvestmentCheckList')
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
      resultFn(vin) {
        this.getData(true)
        // vin识别无效
        // this.$VoHttp
        //   .apiBusinessVehicleScanGetgoodsbyvin({
        //     vin: vin,
        //   })
        //   .then((res) => {
        //     if (res.data && res.data.length > 0) {
        //       this.getData(true, res.data)
        //     }
        //   })
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
      confirmFn(path, duration) {
        console.log('duration', duration)
        if (this.loading) return
        if (Math.trunc(duration) < 1) {
          uni.$u.toast('录入语音时长过短~~')
          return
        }
        this.loading = true

        uploadMp3({ url: path, name: 'audio.mp3', isPath: true, tip: '上传中' })
          .then((res) => {
            console.log(res.fileNameUrl)
            this.videoVoicePath = res.fileNameUrl
            console.log('语音path', this.videoVoicePath)
            this.RecordAudioText()
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络错误')
          })
          .finally(() => {
            this.loading = false
            this.recording = false
          })
      },
      async RecordAudioText() {
        console.log('语音转文字')
        uni.showLoading({
          title: '识别中...',
        })
        try {
          const res = await this.$VoHttp.IM.apiMessageRecordAudioToTextFromUrl(
            {
              filePath: this.videoVoicePath,
            },
            { noLoading: true },
          )
          if (!res || !res.data) return
          console.log(res.data, '识别数据')
          let keyword = res.data.join('')
          this.keyword = keyword.replace(
            /[\[\]{};',./:"<>?!@#$%^&*()_+【】、；‘，。、{}|：”“《》？！@#￥%……&*（）——+]*/g,
            '',
          ) //特殊字符均替换掉
          this.searchFn()
        } catch (e) {
          uni.hideLoading()
          console.log('语音转文字失败', e)
          uni.$u.toast('暂未匹配到相关数据~~')
        }
      },
      // 弹起录音
      async upspringFn() {
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
              if (!this.recording && this.$refs.recordingPanel) {
                this.$refs.recordingPanel.reset()
              }
              this.recording = !this.recording
            }
          })
          a = await permission.judgeIosPermission('record')
          if (!a) {
            return
          } else {
            if (!this.recording && this.$refs.recordingPanel) {
              this.$refs.recordingPanel.reset()
            }
            this.recording = !this.recording
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
            if (!this.recording && this.$refs.recordingPanel) {
              this.$refs.recordingPanel.reset()
            }
            this.recording = !this.recording
          }
        }
      },
      //跳转我的项目
      toMyInvest() {
        this.$linkToEasy('/pagesAgent/MyInvest/MyInvest')
      },
      /**
       * 重置所有筛选项
       */
      setDefault() {
        this.fliterVisible = false
        this.brandIds = []
        this.valetVehicleBrandQOList = []
        this.skuProperties = []
        this.modelIds = []
        this.keyword = ''
        this.orderType = ''
        this.orderProperty = ''
        this.payType = ''
        this.categoryType = []
        this.orderList.forEach((item) => {
          item.orderType = ''
          item.orderProperty = ''
          item.choosed = false
        })
        this.filterList.forEach((item) => {
          item.choosed = false
        })
        this.brandList.forEach((item) => {
          item.choosed = false
        })
        this.wareList.forEach((item) => {
          //取消选中
          item.choosed = false
          this.chooseWareData = ''
        })
      },
      changeTabs(e) {
        // this.setDefault()
        this.current = e.index
        this.getData(true)
      },
      //swiper切换
      swiperChange(event) {
        this.fliterVisible = false
        this.current = event.detail.current
        this.getData(true)
      },
      //搜索
      searchFn() {
        this.getData(true)
      },
      //筛选
      filterClick(data) {
        console.log(data)
        this.fliterVisible = false
        this.fliterVisiblePay = false

        if (data.id === 0) {
          this.fliterVisible = !data.choosed
          if (data.choosed) {
            this.categoryType = ''
            this.getData(true)
          }
        } else if (data.id === 4) {
          this.fliterVisiblePay = !data.choosed
          if (data.choosed) {
            this.payType = ''
            this.getData(true)
          }
        } else if (data.id === 1) {
          if (data.choosed) {
            this.brandIds = []
            this.getData(true)
          } else {
            this.$linkToEasy('/pagesAgent/InvestmentList/BrandList')
          }
        } else if (data.id === 3) {
          // 适配车型
          if (data.choosed) {
            this.valetVehicleBrandQOList = []
            this.getData(true)
          } else {
            this.$linkToEasy('/pagesAgent/InvestmentList/VehicleType')
          }
        } else if (data.id === 2) {
          if (data.choosed) {
            this.skuProperties = []
            this.modelIds = ''
            this.getData(true)
          } else {
            this.$linkToEasy('/pagesAgent/InvestmentList/ProductSize')
          }
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
        if (data && data.length) {
          this.categoryType = data.map((item) => item.name)
        } else {
          this.categoryType = []
        }
        this.fliterVisible = false
        this.getData(true)
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
          //取消选中
          if (this.chooseWareData && this.chooseWareData.id === item.id) {
            item.choosed = false
            this.chooseWareData = ''
            return
          }
          if (item.id === data.id) {
            item.choosed = true
            this.chooseWareData = data
          } else {
            item.choosed = false
          }
        })
        this.getData(true)
      },
      /**
       * 去项目详情
       */
      goProjectDetails() {
        // this.$linkToEasy('/pagesAgent/InvestmentList/ProjectDetails')
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
      //获取仓库
      getWarePlat() {
        this.$VoHttp.apiWarehousePlat().then((res) => {
          this.wareList = res.data.map((item) => {
            return {
              ...item,
              choosed: false,
            }
          })
        })
      },

      //排序选择
      orderData(order) {
        console.log('order', order)
        console.log('this.orderType111', this.orderType)
        //取消选中
        if (
          (order.orderType === 'DESC' && order.orderProperty === 'cashPrice') ||
          (order.orderType === 'ASC' && order.orderProperty != 'cashPrice')
        ) {
          this.orderList.forEach((item) => {
            if (item.name === order.name) {
              item.choosed = false
              item.orderType = ''
            }
          })
          this.orderType = ''
          this.orderProperty = ''
          this.getData(true)
          return
        }

        this.orderList.forEach((item) => {
          if (item.name === order.name) {
            item.choosed = true
            this.orderProperty = item.orderProperty
            if (item.orderType === 'ASC') {
              item.orderType = 'DESC'
              this.orderType = 'DESC'
              this.getData(true)
            } else if (item.orderType === '' && order.orderProperty != 'cashPrice') {
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
      //获取列表数据
      getData(refresh, valetVehicleBrandQOList) {
        if (this.loading) return
        this.loading = !this.loading
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
          modelIds: this.modelIds,
        }
        if (this.current === 1 && this.chooseWareData.areaCode) {
          params.salesArea = this.chooseWareData.areaCode || ''
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
          // if (this.minPeriodDays) {
          //   params['minPeriodDays'] = this.minPeriodDays
          // }
          // if (this.maxPeriodDays) {
          //   params['maxPeriodDays'] = this.maxPeriodDays
          // }
        }
        if (this.categoryType) {
          params['categoryType'] = this.categoryType
        }
        // 如果是扫码适配出来的车型
        if (valetVehicleBrandQOList) {
          params.valetVehicleBrandQOList = valetVehicleBrandQOList
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
              this.hasMore = this.infoList.length < this.total
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.loading = !this.loading
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
          // this.getBrandData()
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
          if (this.hasMore) {
            this.refresh = false
            this.pageNo++
            this.getData()
          }
        }, 1000)
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
      scrollViewFn() {
        this.$refs.qiMoRef?.close()
      },
      onScroll(e) {
        this.$refs.qiMoRef?.close()
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
      //重置付款方式
      resetPayType() {
        this.payType = ''
      },
      /**
       * 打开弹出层
       */
      async showInvestmentPop(text, data) {
        this.scrollViewFn()
        showLoading('加载中')
        let res = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentBuyerPreview({
          id: data.id,
          companyId: this.userInfo.companyId,
        })
        if (!res || !res.data) return
        if (res.data) {
          this.dataObj = res.data
          this.dataObj.queryType = data.queryType

          if (
            this.dataObj.totalInvestment - this.dataObj.alreadyInvestedNum <
            this.dataObj.startNumber
          ) {
            // 这个商品总的可投达不到起投
            uni.$u.toast('剩余可批量不足，联系客服再开放些余量吧~')
            return
          }

          if (
            this.dataObj.investmentLimit - this.dataObj.myAlreadyInvestedNum <
            this.dataObj.startNumber
          ) {
            //个人可投达不到起投
            if (this.dataObj.investmentLimit - this.dataObj.myAlreadyInvestedNum <= 0) {
              uni.$u.toast(
                '超出限投量，项目限投' +
                  this.dataObj.investmentLimit +
                  ',您已投资' +
                  this.dataObj.myAlreadyInvestedNum,
              )
              return
            } else {
              uni.$u.toast(
                '该项目您已批发' +
                  this.dataObj.myAlreadyInvestedNum +
                  '，剩余可批发量' +
                  (this.dataObj.investmentLimit - this.dataObj.myAlreadyInvestedNum) +
                  '小于项目起批量' +
                  this.dataObj.startNumber,
              )

              return
            }
          }

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
    &-fixbtns {
      position: fixed;
      right: 32rpx !important;
      bottom: 0;
      z-index: 99;
      height: 264rpx;
      width: 190rpx;
      &__item {
        color: #ffffff;
        font-size: 26rpx;
        height: 64rpx;
        line-height: 64rpx;
        background: linear-gradient(90.22deg, #ff7321 2.68%, #ff5622 99.81%);
        mix-blend-mode: normal;
        display: flex;
        align-items: center;
        padding-left: 12rpx;
        padding-right: 16rpx;
        border-radius: 100rpx;
        margin-bottom: 24rpx;
      }
    }

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
      padding: 16rpx 0;
      box-sizing: border-box;
      background: #fff;
      //overflow-x: scroll;
      &__item {
        &:first-child {
          margin-left: 32rpx;
        }
        &:last-child {
          padding-right: 32rpx;
        }
        margin-right: 40rpx;
        &.choosed {
          .item-name {
            color: $color-primary-yellow;
            font-weight: 500;
          }
          .item-img {
            width: 96rpx;
            height: 96rpx;
          }
        }
        .item-img {
          width: 72rpx;
          height: 72rpx;
          border-radius: 50%;
          overflow: hidden;
        }

        .item-name {
          line-height: 28rpx;
          font-weight: 400;
          font-size: 24rpx;
          margin-top: 4rpx;
          white-space: nowrap;
          color: $v-c0-45;
        }
      }

      &__sift {
        padding: 10rpx 24rpx;
        box-sizing: border-box;
        border-radius: 80rpx;
        margin-right: 16rpx;
        white-space: nowrap;
        &:first-child {
          margin-left: 32rpx;
        }
        &:last-child {
          margin-right: 32rpx;
        }

        &.select {
          background: $v-tags-btn-disabled;
          border: 2rpx solid $v-tags-one;
          color: $v-tags !important;
        }

        &.no-select {
          background: #f7f7f8;
          border: 2rpx solid transparent;
          color: $v-c0-85;
        }
      }
    }

    .scroll-view {
      height: 100%;
    }

    .order-nav {
      display: flex;
      margin: 16rpx 32rpx 0;

      &__item {
        display: flex;
        align-items: center;
        height: 56rpx;
        color: rgba(0, 0, 0, 0.45);
        font-size: 28rpx;
        //padding: 0 34rpx;
        box-sizing: border-box;
        position: relative;

        &.choosed {
          color: $color-primary-yellow;
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

    .ware {
      &-item {
        padding: 8rpx 0;
        margin-right: 16rpx;
        box-sizing: border-box;
        line-height: 1.5;
        min-width: 196rpx;
        text-align: center;
        border: 1px solid #d3d4db;
        background: #f7f7f8;
        border-radius: 8rpx;

        &__name {
          color: $v-c0-85;
          font-size: 28rpx;
        }

        .time {
          color: $v-c0-45;
          font-size: 24rpx;
        }

        &.choosed {
          background: $v-tags-btn-disabled;
          border: 1px solid $color-primary-yellow;

          .ware-item__name {
            color: $color-primary-yellow;
            font-weight: 500;
          }

          .time {
            color: $color-primary-yellow;
          }
        }
      }
    }
    .fl {
      position: relative;
      &-fit {
        width: fit-content;
      }
    }
  }

  .invest-my {
    width: 48rpx;
    height: 64rpx;
    font-size: 24rpx;
  }
  .overflow-y-hidden {
    overflow-y: hidden;
  }
  .fixed {
    position: fixed;
    bottom: 0;
    left: 0;
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
  .recording {
    z-index: 100;
  }
</style>
