<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="shop"
  >
    <!-- 固定选择车型：start H5端	-->
    <view
      v-if="fixedTop && (vehicleChoose.length || brandChoose.length || typeChoose.length)"
      :style="{ top: Number($systemInfo.statusBarHeight) * 2 + 178 + 'rpx' }"
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
              :opacity="0.45"
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
              :opacity="0.45"
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
              :opacity="0.45"
              @click="brandDel(item, 'typeList')"
            />
          </view>
        </view>
      </scroll-view>
      <view class="type-delete flex flex-vertical-c flex-justify-c">
        <VoIcon name="delete" :size="16" />
        <view class="m-l-4">清除</view>
      </view>
    </view> -->
    <!-- 固定选择车型：end	-->
    <!-- #endif -->

    <view class="vh-full flex flex-column overflow-hidden relative">
      <!--  顶部固定区域  -->
      <!-- <VoBatteryBar /> -->
      <view>
        <VoNav is-fixed is-have-more>
          <block slot="title">
            <u-tabs
              :current="current"
              :list="[
                { name: '我的商品', type: 'L' },
                { name: '全网商品', type: 'A' },
              ]"
              activeStyle="color: rgba(0, 0, 0, 0.85);font-size: 18px;font-weight: bold;"
              inactiveStyle="color: rgba(0, 0, 0, 0.45);font-weight: 400;font-size: 16px;"
              lineColor="transparent"
              @click="clickTabHandler"
            />
          </block>
        </VoNav>
        <view class="shop-search flex flex-vertical-c">
          <!-- <VoSearch
            v-model="queryForm.name"
            placeholder="请输入搜索"
            height="34"
            @custom="searchHandler"
            @search="searchHandler"
          >
            <view slot="suffix" class="flex flex-vertical-c">
              <VoIcon
                :opacity="0.45"
                class="m-r-24"
                color="#000"
                name="voice-line"
                size="26"
                @click="upspringFn"
              />
              <u-line color="#B9B9BA" direction="col" length="12" />
              <VoIcon class="m-l-24" color="#EE0A24" name="scan" @click="vin" />
            </view>
          </VoSearch> -->
          <VoSearch
            v-model="queryForm.name"
            :actionStyle="{ color: '#fff' }"
            :showInsideAction="true"
            bgColor="#fff"
            borderColor="#FF5319"
            height="34"
            placeholder="请输入搜索"
            @custom="searchHandler"
            @search="searchHandler"
          >
            <!--            <block slot="leftIcon">-->
            <!--              <VoIcon class="m-r-20" color="#FF5319" name="scan-new" @click="vin" />-->
            <!--            </block>-->
            <block slot="suffix">
              <view class="flex flex-vertical-c" @click="upspringFn">
                <VoIcon
                  :opacity="0.45"
                  class="m-r-14"
                  color="#000"
                  name="voice-icon"

                />
              </view>
            </block>
          </VoSearch>
        </view>
      </view>

      <scroll-view
        class="flex1 overflow-hidden"
        scroll-y
        @scroll="scrollHandler"
        @scrolltolower="loadMore"
      >
        <!--  3= 服务商首页、服务商进货列表/全国投放、服务商进货/全国店铺项目列表 结果页-/pagesAgent/VinTell/VinTell
            4= 服务商代客下单列表、服务商代客下单店铺主页 结果页-/pagesAgent/GlobalSearch/QueryResult
            5= 修理厂首页、买货列表、买货店铺主页  结果页-/pagesGarage/GlobalSearch/QueryResult -->
        <!--  当前为服务商代客下单列表origin=4  结果页 pagesAgent/GlobalSearch/QueryResult -->
        <VoGroupVinBtn
          background="#FEF9F1"
          borderColor="#FFE2B8"
          class="shop-group"
          leftName="VIN查询"
          rightToUrl="/pagesProduct/ApplicationCar/ApplicationCarNew?origin=4"
          @leftBtnFn="vin"
        ></VoGroupVinBtn>
        <!--  左右可滑动区域  -->
        <view class="shop-slide">
          <!--          <scroll-view scroll-x>-->
          <!--            <view class="flex flex-vertical-c">-->
          <!--              <view-->
          <!--                v-for="info in vehicleList"-->
          <!--                :key="info.id"-->
          <!--                class="shop-slide__info flex flex-column flex-vertical-c m-r-40"-->
          <!--                @click="vehicleChoosed(info)"-->
          <!--              >-->
          <!--                <image :src="info.logo" class="shop-slide__img" />-->
          <!--                <view class="shop-slide__name">{{ info.name }}</view>-->
          <!--              </view>-->
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
                <block v-for="(info, infoIndex) in brandList" :key="info.id">
                  <view
                    v-if="infoIndex < 10"
                    :class="info.choosed ? 'choosed' : ''"
                    class="type-block"
                    @click="brandChoosed(info)"
                  >
                    {{ info.name }}
                  </view>
                </block>
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
            v-if="vehicleChoose.length || brandChoose.length || typeChoose.length"
            class="shop-slide__type m-t-16"
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
              <view class="m-r-4">清空</view>
              <VoIcon :opacity="0.45" :size="16" color="#000" name="delete" />
            </view>
          </view>
        </view>
        <!--  商品信息列表区域  -->
        <BuyGoodsInfo
          v-for="(item, index) in shopListData"
          :key="index"
          :company-id="companyId"
          :good-info="item"
          :queryType="queryForm.queryType"
          @BuyNow="buyHandler(item)"
          @click.native="goGoodsDetail(item)"
        />
        <!--        <VoLoadingText :has-more="hasMore" :loading="loading" />-->
        <view v-if="loading" class="text-center fz-25 py-20 color-gray">
          <text>数据加载中</text>
        </view>
        <view v-else class="text-center fz-25 py-20 color-gray">
          <text v-if="hasMore">加载更多</text>
          <text v-if="!hasMore && shopListData.length">暂无更多数据</text>
          <VoNoData
            v-if="!shopListData.length"
            :padding-top="10"
            bgColor="transparent"
            no-data-tips="暂无数据"
          />
          <view
            v-show="queryForm.queryType === 'L'"
            class="flex flex-vertical-c m-t-15 flex-justify-c"
            @click="changeTab"
          >
            <text>没找到想要的商品，去看看</text>
            <text style="color: #0d66ff">全网商品</text>
            <VoIcon :size="12" color="#0D66FF" name="right-arrow" />
          </view>
        </view>
      </scroll-view>
    </view>

    <u-popup :round="10" :show="showBuyNow" mode="bottom" @close="close" @open="open">
      <BuyNow
        :info="currentRow"
        :queryType="queryForm.queryType"
        @closeFn="close"
        @confirm="confirm"
      />
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
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import { chooseImageOcrByPromise, floatTwo, uploadMp3, vocenCameraFn } from '@/common/helper'
  import permission from '@/common/permission'

  export default {
    name: 'ShopList',
    components: { BuyGoodsInfo, BuyNow, RecordingPanel },
    data() {
      return {
        salesArea:'',
        imType: '',
        recording: false, // 录音功能展示
        current: 0,
        hasMore: true,
        loading: false,
        keyword: '', // 搜索双向绑定
        showBuyNow: false,
        fixedTop: false, // 锁定到顶部车系
        pageQuery: {
          pageNo: 1,
          pageSize: 10,
        },
        queryForm: {
          name: '',
          queryType: 'L',
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
          // { name: '发货快', value: 'deliveryTime', orderType: 'ASC', choosed: false },
          { name: '价格低', value: 'cashPrice', orderType: 'ASC', choosed: false },
        ],
        vehicleChoose: [], // 选中车型
        brandChoose: [], //选中品牌
        typeChoose: [], //选中类型
        orderProperty: '', //选中排序属性cashPrice：价格 ；deliveryTime ：发货快；saleCount：销量
        orderType: '', //"ASC", "升序" "DESC", "降序"
        valetVehicleBrandQOList: [], //车品牌下所有车系
        isBrandChoose: false, //是否进行品牌选择操作
        isTypeChoose: false, //是否进行类型选择操作
        companyId: '',
        userName: '',

        confirmModal: false,
        //定制，安装服务和以旧换新服务
        isCoding: false,
        isInstall: false,
        isNew: false,
        isCash: 1,
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
      this.salesArea=options.salesArea
      this.companyId = options.companyId
      this.userName = options.userName
      this.imType = options.imType
      // 初始化头部数据
      this.initData()
      this.queryData(true)
      uni.$off('select')
      uni.$off('selectVehicle')
      uni.$on('select', (row) => {
        //去除id重复数据
        let obj = {}
        let result = row.reduce((item, next) => {
          obj[next.id] ? '' : (obj[next.id] = true && item.push(next))
          return item
        }, [])
        this.brandChoose = result
        console.log('brandChooseonLoad', result)
        this.queryData(true)
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
        this.queryData(true)
      })
    },
    methods: {
      /**
       * 语音转文字
       * @returns {Promise<void>}
       * @constructor
       */
      async recordAudioText(mp3) {
        console.log('语音转文字')
        uni.showLoading({
          title: '识别中...',
        })
        try {
          const { data } = await this.$VoHttp.IM.apiMessageRecordAudioToTextFromUrl(
            {
              filePath: mp3,
            },
            { noLoading: true },
          )
          console.log(data, '识别数据')
          this.goResult(data.join(''))
        } catch (e) {
          uni.hideLoading()
          console.log('语音转文字失败', e)
          uni.$u.toast(e.message || '暂未匹配到相关数据~~')
        }
      },
      /**
       * 上传语音文件
       * @param path
       * @param duration
       */
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
            console.log('语音path', res.fileNameUrl)
            this.recordAudioText(res.fileNameUrl)
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络错误')
          })
          .finally(() => {
            this.loading = false
            this.recording = false
          })
      },
      // 扫一扫
      async vin() {
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
              `/pagesAgent/GlobalSearch/QueryResult?salesArea=${this.salesArea}&code=${data.data.code}&companyId=${
                this.companyId
              }&userName=${this.userName}&imType=${this.imType}&queryType=${
                this.queryForm.queryType
              }&type=${res.type}&imageInfoVO=${
                data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath
                  ? data.data.imageInfoVO.filePath
                  : ''
              }`,
            )
            return
          }
        }

        this.$u.toast('识别失败')
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
      // 跳转搜索结果
      goResult(keyword) {
        if (keyword) {
          this.queryForm.name = keyword
          this.searchHandler(keyword)
        }
      },
      changeTab() {
        this.current = 1
        this.clickTabHandler({ type: 'A' })
      },
      clickTabHandler(res) {
        this.queryForm.queryType = res.type
        this.shopListData = []
        this.pageQuery.pageNo = 1
        this.queryData()
      },
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
        let arr = []
        arr = typeRes.data.map((item, index) => {
          return {
            id: index,
            name: item,
            choosed: false,
          }
        })
        arr.map((item) => {
          if (item.name) {
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
        let arr = this.vehicleChoose.length ? this.vehicleChoose.map((item) => item.id) : []
        if (arr.indexOf(info.id) < 0) {
          this.vehicleChoose.push(info)
        }
        //获取车系列表
        let res = await this.$VoHttp.BUSINESS.businessVehicleBrandSelectSeries({
          brandid: info.id,
        })
        let resArr = res.data.map((item) => {
          return {
            id: item.id,
            level: item.level,
            brandId: info.id,
          }
        })

        this.valetVehicleBrandQOList = this.valetVehicleBrandQOList.concat(resArr)
        this.queryData(true)
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
      //删除已选tag
      brandDel(info, listName) {
        if (listName == 'vehicleList') {
          this.valetVehicleBrandQOList = []
          this.vehicleChoose = []
        } else {
          this[listName].forEach((item) => {
            if (item.id === info.id) {
              item.choosed = false
            }
          })
        }
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
        console.log(row)
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
            salesArea: this.salesArea || '',
          }
          // const { data } = await new Promise(() => {})
          const { data } = await this.$VoHttp.GOODS.apiGoodsQueryWarehousesGoodsList({
            ...this.pageQuery,
            ...this.queryForm,
            ...params,
          })
          this.loading = false
          let records = data.records
          records.forEach((item) => {
            item.queryType = this.queryForm.queryType
            item.cashPrice = floatTwo(item.cashPrice)
            item.codingPrice = floatTwo(item.codingPrice)
            item.installationFee = floatTwo(item.installationFee)
            item.accountPrice = floatTwo(item.accountPrice)
            item.tradeInFee = floatTwo(item.tradeInFee)
          })
          this.shopListData = this.shopListData.concat(records)
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
        if (scrollTop >= 228 && !this.fixedTop) {
          this.fixedTop = true
        }
        if (scrollTop < 228 && this.fixedTop) {
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
          `/pagesAgent/GoodsList/GoodsDetail?salesArea=${this.salesArea}&id=${item.goodId}&wid=${item.warehouseId}&companyId=${this.companyId}&userName=${this.userName}&current=${this.queryForm.queryType}&imType=${this.imType}`,
        )
      },
      /**
       * 确认下单点击事件
       */
      confirm(data) {
        this.isCoding = data.isCoding
        this.isInstall = data.isInstall
        this.isNew = data.isNew
        this.isCash = data.isCash
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
      /**
       * 去提交订单
       */
      async goConfirmOrder() {
        const res = await this.$VoHttp.GOODS.apiGoodsGarageDetail({
          goodsId: this.currentRow.goodId,
          warehouseId: this.currentRow.warehouseId,
          companyId: this.companyId,
        })
        console.log(res, '**********')
        // 存储商品信息，并带到提交订单页面
        // 组装需要的数据
        const orderProductInfo = {
          shopInfo: {
            shopName: this.currentRow.shopName,
            userName: this.userName,
            buyerId: this.companyId,
          },
          goodsInfo: {
            orgGoodsId: res.data.orgGoodsId || '',
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
            this.queryForm.queryType +
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
    left: 0;
    bottom: 0;
    z-index: 10;
  }
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
      height: 90rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-group {
      padding: 16rpx 32rpx;
      background: #fff;
    }

    &-slide {
      padding: 16rpx 0 16rpx 0;
      box-sizing: border-box;
      background: #fff;
      //overflow-x: scroll;
      &__info {
        &:first-child {
          padding-left: 32rpx;
        }
      }
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
        padding-left: 32rpx;
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
          border: 2rpx solid #ff6633;
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
            background: #ffece5;
            border: 2rpx solid #ff6633;
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
          background: #ffece5;
          border: 2rpx solid #ff6633;
        }

        &.no-select {
          background: #f6f7f8;
          border: 2rpx solid transparent;
        }
      }
    }
  }
</style>
