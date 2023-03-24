<template>
  <view class="search">
    <VoNav is-fixed is-have-more title="查询结果" />
    <view v-if="code" class="code">
      <view class="fz-36 color-block-85 fz-b"
        >VIN码：<text v-for="(item, index) of codeArr" :key="index" class="m-r-2">{{
          item
        }}</text></view
      >
      <view class="code-btn" @click="openEdit">修改</view>
    </view>

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

      <view class="p-l-32 p-r-32 bg-white p-b-32">
        <image
          v-if="imageInfoVO"
          :src="imageInfoVO"
          class="w-full block"
          mode="widthFix"
          @click="previewFn"
        ></image>
      </view>
      <view v-if="modelCar && modelCar.length" class="search-result">
       <block  v-for="(item, index) in modelCar"
               :key="index">
         <view

             class=" flex "
         >
           <image v-if="item.brandLogo" :src="item.brandLogo" class="search-result__photo m-t-6 m-r-24" />
           <view class="flex1 color-block-85">
             <view class="fz-b fz-28 lh150 ">
               <text v-if="item.brandName" class="m-r-8">{{ item.brandName }}</text>
               <text v-if="item.model" class="m-r-8">{{ item.model }}</text>
               <text v-if="item.year" class="m-r-8">{{ item.year }}年</text>
               <text v-if="item.displacement" class="m-r-8">{{ item.displacement }}</text>
               <text v-if="item.transmissionType" class="m-r-8">{{ item.transmissionType }}</text>
               <text v-if="item.emissionStandard" class="m-r-8">{{ item.emissionStandard }}</text>
               <text v-if="item.driveModel" class="m-r-8">{{ item.driveModel }}</text>
             </view>
             <view v-if="item.engineModel" class="m-t-4 fz-28 lh150"
             >发动机型号：{{ item.engineModel }}</view
             >
           </view>
           <view class="search-result__again m-t-18" @click="goDetailFn(item)">查看详情</view>
         </view>

         <view class="remarks" v-if="item.remark">
           备注：{{ item.remark }}
         </view>
       </block>


      </view>


      <block >
        <view  class="divider_c">
          <u-divider text="匹配商品" textSize="10" />
        </view>

      </block>

      <!--  左右可滑动区域  -->
      <view  class="shop-slide">

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
            <VoIcon :size="16" name="delete" />
            <view class="m-l-4">清除</view>
          </view>
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
            <EraButton class="m-t-46" size="small" theme-type="Wire" @click="goConcatFn">{{
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
  import BuyGoodsInfo from '../ShopList/components/BuyGoodsInfo'
  import BuyNow from '../ShopList/components/BuyNow'
  import VoModal from '@/components/VoModal/VoModal'
  import {error, getUserCheckStatus, goOnlineCustomerFn, showLoading} from '@/common/helper'
  import EraButton from '@/uni_modules/era-ui/components/EraButton/EraButton'
  // import { mapGetters } from 'vuex'

  export default {
    name: 'QueryResult',
    components: { EraButton, VoModal, BuyGoodsInfo, BuyNow },
    data() {
      return {
        isLoad:false,
        isOverLoading: false,
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
          queryType: 'A',
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
      }
    },
    onLoad(options) {
      // 页面参考shopList
      this.code = options.code || null
      if (this.code) {
        this.codeArr = this.code.split('')
      }
      this.type = options.type || 'scan'
      this.imageInfoVO = options.imageInfoVO
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
        console.log('brandChooseonLoad', result)
            this.queryListData(true)
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
              data.shopInfo = {
                type: 'text',
                content: '车架号是' + this.code + '，未找到对应商品，请帮我找一下',
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
        this.$VoHttp.apiCompanyInvitationAgentByGarage({}, { noLoading: true }).then((res) => {
          this.dockingPeopleData = res.data
        })
      },
      openEdit() {
        // this.formData.content = this.code
        // this.showHandle = true
        //新业务 跳转去新页面修改
        this.$linkToEasy(
          '/pagesGarage/GlobalSearch/UpdateVin?imageInfoVO=' +
            this.imageInfoVO +
            '&code=' +
            this.code,
        )
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
        //热门车型
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
        await this.queryListData(true,true)
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

        }else if (listName === 'typeList') {
          this.typeChoose.forEach((item, index) => {
            if (item.id === info.id) {
              this.typeChoose.splice(index, 1)
            }
          })

        }

        this.queryListData(true)

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
      async queryListData(init,first) {
        if (this.loading) return
        this.loading = true
        try {
          if (init) {
            this.pageQuery.pageNo = 1
          }
          let brandIds = this.brandChoose.length ? this.brandChoose.map((item) => item.id) : []
          let categoryTypes = this.typeChoose.length ? this.typeChoose.map((item) => item.name) : []
          let params = {
            vin: this.code,
            brandIds: brandIds,
            categoryTypes: categoryTypes,
            orderProperty: this.orderProperty,
            orderType: this.orderProperty ? this.orderType : '',
            valetVehicleBrandQOList: this.valetVehicleBrandQOList,
            isBind: this.origin,
            // salesArea: '12',
          }
          console.log(params)
          if(first){
            this.isLoad=true
          }else{
            this.isLoad=false
          }
          const res = await this.$VoHttp.apiBusinessVehicleScanGetgoodsbyvin({
            ...this.pageQuery,
            ...this.queryForm,
            ...params,
          }).catch(e=>{
            error(e.message||'暂无数据')
            this.isOverLoading = true
          })

          this.isOverLoading = true

          console.log(res, '接口返回数据')

          if (!res || !res.data) {
            this.loading = false
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            this.closeHandler()
            return
          }
          const { data } = res
          console.log(data)
          this.total = data.total || 0

          if (init) {
            this.shopListData = []
          }
          this.shopListData = this.shopListData.concat(data.goodsVOList)
          this.modelCar = data.vehicleModelVOList
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
        const proDetailInfo = await this.$VoHttp.GOODS.apiGoodsGarageDetail({
          goodsId: this.currentRow.goodId,
          warehouseId: this.currentRow.warehouseId,
        })
          .then()
          .catch((e) => {
            this.$u.toast(e.message || '获取详情失败')
            return
          })

        // 存储商品信息，并带到提交订单页面
        // 组装需要的数据
        console.log(this.currentRow)
        console.log('1111', this.currentRow)
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
      padding: 28rpx 32rpx;
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
  .remarks{
    background: #F7F7F8;
    font-size: 28rpx;
    line-height: 150%;
    color: rgba(0, 0, 0, 0.65);
    border-radius: 4rpx;
    padding: 16rpx 28rpx;
    box-sizing: border-box;
    margin-top: 32rpx;
  }
  .divider_c ::v-deep .u-divider{
    margin: 24rpx auto 24rpx;
  }
</style>
