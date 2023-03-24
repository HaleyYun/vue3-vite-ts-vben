<template>
  <scroll-view
    :class="isBottomShow ? 'hidden-img' : ''"
    :refresher-triggered="refresherTriggered"
    :scroll-y="!doorTimeVisible && !showGrab"
    class="home"
    refresher-enabled
    scroll-top="0"
    @refresherrefresh="refresherrefresh"
    @scroll="onScroll"
    @scrolltolower="scrolltolowerFn"
  >
    <view>
      <view :style="{ 'background-color': showActionNav ? '#F5F9FF' : '' }" class="home-bg">
        <VoBatteryBar bg-color="transparent" />
        <EngineerTitle :count="getMissMessageCount" class="m-t-20" />
        <!-- 悬浮区域 -->
        <view
          v-if="showActionNav"
          :style="{ paddingTop: $systemInfo.statusBarHeight + 'px', opacity: opacity }"
          class="home-action"
        >
          <EngineerTitle :count="getMissMessageCount" :sliding="true" />
          <view class="home-action__sift flex relative">
            <view class="flex flex-vertical-c lh42" @click="openPop">
              <block v-if="fixedVisible === true">
                <view class="fz-28 color-block-yellow m-r-8">上门时间</view>
                <VoIcon :size="16" class="transform" color="#FF5319" name="triangular" />
              </block>
              <block v-else>
                <view class="fz-28 color-block m-r-8">上门时间</view>
                <VoIcon :opacity="0.45" :size="16" color="#000000" name="triangular" />
              </block>
            </view>
            <view class="flex flex-vertical-c lh42 m-l-48" @click="serviceArea">
              <view class="fz-28 color-block m-r-8">服务区域</view>
              <VoIcon :opacity="0.45" :size="16" color="#000000" name="triangular" />
            </view>
            <DoorTimePop
              ref="DoorTimePop"
              :visible="fixedVisible"
              @close="fixedClose"
              @confirm="doorTimeConfirm"
            />
          </view>
          <view v-if="echoList.length">
            <EchoTime :echoList="echoList" @deleteFn="deleteTagFn" @emptyFn="clearFilter" />
          </view>
        </view>
        <view id="navTop" />
        <!--    头部    -->
        <view v-if="!doorTimeVisible" class="home-head flex flex-justify-between">
          <view class="flex flex-vertical-c">
            <image
              :src="userInfo.storeUrl || userInfo.photoUrl || '/static/default_avatar.png'"
              class="home-head__image"
              @click="goUser"
            />
            <view class="m-l-16">
              <view v-if="userInfo.realName" class="lh54 fz-34 fz-b color-block"
                >{{ userInfo.realName.substr(0, 1) }}师傅
                <view class="base-info__sub m-l-10">{{ currentUserFullInfo.level }}</view>
              </view>
              <view v-else class="lh54 fz-34 fz-b color-block"
                >集师傅
                <view class="base-info__sub m-l-10">{{ currentUserFullInfo.level }}</view>
              </view>
              <view
                class="flex flex-vertical-c m-t-16"
                @click="goTo('/pagesEngineer/Spread/SpreadSetting')"
              >
                <VoIcon :opacity="0.65" :size="16" color="#000000" name="setting-user" />
                <view class="m-l-8 lh42 fz-28 color-block-65">接单设置</view>
              </view>
            </view>
          </view>
          <view class="home-head__right flex">
            <view
              :class="{ selectedOrder: selectedOrder === true }"
              class="right-box"
              @click="orderFn"
              >接单</view
            >
            <view :class="{ selectedRest: selectedRest === true }" class="right-box" @click="restFn"
              >休息中</view
            >
          </view>
        </view>
        <!--    气泡    -->
        <view v-if="!doorTimeVisible" class="home-bubble">
          <view class="lh42">
            工作{{ infoSkill.workDay || '0' }}天，完成{{ infoSkill.count || '0' }}单，收益{{
              infoSkill.amount || '0'
            }}元
          </view>
          <view class="home-bubble__triangle" />
        </view>
        <!--    上门时间、服务区域    -->
        <view class="home-service flex relative">
          <view class="flex flex-vertical-c lh42" @click="chooseDoorTime">
            <block v-if="doorTimeVisible === true">
              <view class="fz-28 color-block-yellow m-r-8">上门时间</view>
              <VoIcon :size="16" class="transform" color="#FF5319" name="triangular" />
            </block>
            <block v-else>
              <view class="fz-28 color-block m-r-8">上门时间</view>
              <VoIcon :opacity="0.45" :size="16" color="#000000" name="triangular" />
            </block>
          </view>
          <view class="flex flex-vertical-c lh42 m-l-48" @click="serviceArea">
            <view class="fz-28 color-block m-r-8">服务区域</view>
            <VoIcon :opacity="0.45" :size="16" color="#000000" name="triangular" />
          </view>
          <DoorTimePop
            ref="DoorTimePop"
            :visible="doorTimeVisible"
            @close="doorTimeClose"
            @confirm="doorTimeConfirm"
          />
        </view>
        <view v-if="echoList.length" style="margin: 0 32rpx 24rpx">
          <EchoTime :echoList="echoList" @deleteFn="deleteTagFn" @emptyFn="clearFilter" />
        </view>

        <block v-if="orderList.length > 0">
          <order-item
            v-for="(item, index) in orderList"
            :key="index"
            :index="index"
            :info="item"
            :skiller-state="skillerState"
            @robFn="robFn"
            @skillApprove="skillApproveFn"
            @success="robOrder"
            @updateApprove="showApprove = true"
          />
          <VoLoadingText :has-more="orderList.length < total" :loading="loading" />
        </block>
        <vo-no-data v-else-if="!orderList.length && !loading" />
      </view>
      <view v-if="currentUserFullInfo.showStatus" v-show="showSpread" class="home-spread">
        <image
          class="home-spread__icon"
          src="/static/oldbuyer/technical_workers/clear.png"
          @click="showSpread = false"
        />
        <image
          class="home-spread__img"
          src="/static/oldbuyer/technical_workers/spread.png"
          @click="goSpreadHome"
        />
      </view>
    </view>
    <GrabSingle :row="row" :show.sync="showGrab" @updateFn="robOrder" />
    <!--  验证手机号  -->

    <view
      v-if="
        Number(currentUserFullInfo.checkStatus) === -1 ||
        Number(currentUserFullInfo.checkStatus) === 0
      "
      class="home-fixed flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="home-fixed__tips">当前为游客模式，体验更多功能，请先进行认证</view>
      <view class="home-fixed__button" @click="goApproveFn">立即认证</view>
    </view>

    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 4"
      class="home-fixed flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="home-fixed__tips">为保障认证信息是本人真实操作，请验证手机号</view>
      <view class="home-fixed__button" @click="goApproveFn">去验证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 2"
      class="home-fixed flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="home-fixed__tips m-l-16">认证未通过，请重新进行认证。</view>
      <view class="home-fixed__button" @click="goApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 1"
      class="home-fixed flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="home-fixed__tips m-l-16">信息正在认证审核中，请耐心等待...</view>
      <view class="home-fixed__button bg" @click="goApproveFn">审核中</view>
    </view>
    <view class="placeholder" />
    <vo-safety-area />
    <EraApproveModal :show.sync="showApprove" />
    <u-modal
      :show="showSkillApprove"
      cancel-text="暂不认证"
      confirm-text="联系客服"
      confirmColor="#22284B"
      show-cancel-button
      @cancel="close"
      @confirm="confirmHandler"
    >
      <view class="info-content">
        您还没有认证成为
        <text v-if="+skillInfo.supportType === 31">售后</text>
        <text v-if="+skillInfo.supportType === 32">安装</text>
        <text v-if="+skillInfo.supportType === 33">回收</text>
        师
      </view>
    </u-modal>
  </scroll-view>
</template>
<script>
  import EngineerTitle from './HomeComponents/EngineerTitle'
  import OrderItem from '@/pages/EngineerCenter/components/HomeComponents/OrderItem'
  import DoorTimePop from '@/pages/EngineerCenter/components/HomeComponents/DoorTimePop'
  import EchoTime from '@/pages/EngineerCenter/components/HomeComponents/EchoTime'
  import GrabSingle from '@/pages/EngineerCenter/components/HomeComponents/GrabSingle'
  import store from '@/store'
  import { mapActions, mapGetters } from 'vuex'
  import { getLocation, goOnlineCustomerFn } from '@/common/helper'

  export default {
    name: 'EngineerHome',
    components: {
      EngineerTitle,
      OrderItem,
      DoorTimePop,
      EchoTime,
      GrabSingle,
    },
    data() {
      return {
        refresherTriggered: false,
        skillInfo: {},
        showSkillApprove: false, // 是否资格认证
        showApprove: false,
        row: {
          list: [],
          row: [],
        }, // 多个单列表
        currentUserFullInfo: {},
        type: 4, // 0：正常状态，1：验证手机号，2：认证未通过，3：认证审核中，4：游客模式
        showSpread: true, // 是否显示推广
        content: '您还没有认证安装师',
        showGrab: false, // 抢单弹框
        doorTimeVisible: false, // 上门时间筛选框
        fixedVisible: false, // 固定顶部上门时间筛选框
        isBottomShow: true,
        opacity: 0, // 滑动显示导航的透明度
        showActionNav: false, //滑动显示nav
        selectedOrder: true, // 选中接单
        selectedRest: false, // 选中休息中
        orderList: [
          // {
          //   id: 1,
          //   type: 1, //类型 回收、售后
          //   orderName: '江陵动力发动机-B15-黑色OCV江陵江陵动力发动机-B15-黑色OCV江陵', // 订单名称
          //   storeName: '新明汽配新明汽配新明汽新明汽配新明汽配新明汽', // 店铺名称
          //   space: '16.6', // 距离
          //   address:
          //     '郑州市-金水区-龙子湖街道正商木华广场A座正商木华正商木华广场A座正商木华A座郑州市-金水区-龙子湖街道正商木华广场A座正商木华正商木华广场A座正商木华A座', // 地址
          //   time: '2022-08-12 08:30-12:00', // 预计时间
          //   price: '160', // 价格
          // },
        ],
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        loading: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        //参数
        orderStartTimeSection: '', //上门时间区间，一天内，三天内
        homeStartTime: '',
        homeEndTime: '',
        areaCode: [],
        distance: '', //直线距离,单位:公里
        supportTypes: 1, //接单类型,1:全部类型 31:售后回收单 32:安装单 33:回收单
        majorCarSeries: '', //车系（1:日系，2:国产，3:韩系，4:德系，5:其他）,多选

        echoList: [],
        timeList: [],
        areaList: [],
        locData: '',
        orderSetting: '',
        infoSkill: '', // 技术工收益工作天数信息
        skillerState: [],
        engineerArea: {},
        LocationInfo: null,
        timer: null,
        locationgTips: {
          message: '为更好的为您推送服务单，请尽快打开位置开关。',
          cancel: '再想想',
          confirm: '去打开',
        },
      }
    },
    computed: {
      ...mapGetters('serviceNotification', ['getMissMessageCount']),
      // ...mapGetters({
      //   locationInfo: 'mapDrag/getLocationInfo',
      // }),
    },
    // watch: {
    //   locationInfo: {
    //     deep: true,
    //     handler(newVal) {
    //       console.log(newVal, '更新了')
    //       this.LocationInfo = newVal
    //     },
    //   },
    // },
    async mounted() {
      await this.init()
    },
    methods: {
      clearTimer() {
        console.log('销毁了')
        try {
          clearInterval(this.timer)
          this.timer = null
        } catch (e) {
          console.log(e)
        }
      },
      /**
       * 设置获取定位轮巡
       */
      setLocationTerval() {
        console.log(this.timer, 'this.timer')
        if (!this.timer) {
          this.timer = setInterval(() => {
            console.log('asd')
            getLocation(this.locationgTips)
              .then((res) => {
                this.$store.dispatch('mapDrag/setLocation', res)
                this.LocationInfo = res
                const { latitude, longitude } = res
                this.$VoHttp.apiOrderRecycleTechnologyMapLocation({ latitude, longitude })
              })
              .catch(() => {
                this.LocationInfo = null
              })
          }, 31000)
        }
      },
      async init() {
        await this.getSetting()
        await this.initInfo()
        await this.getSkillInfo()
        if (this.currentUserFullInfo.checkStatus === 3) {
          // 如果已认证，获取是否可接单
          await this.getSkillerState()
        }
        await this.reqMissMessageCount()
        uni.$on('addressFn', (res) => {
          this.engineerArea = res
          if (res.areaData) {
            this.areaCode = res.areaData.map((item) => item.code)
            this.areaList = res.areaData.map((item) => {
              return {
                delete: true,
                type: 'area',
                ...item,
              }
            })
            this.echoList = this.areaList
          }
          if (res.locData) {
            this.echoList = []
            this.locData = res.locData
            this.echoList.push({
              delete: true,
              type: 'distance',
              name: this.locData.label,
              value: this.locData.value,
            })
            console.log('echoList', this.echoList)
            // this.getData(true)
          }
        })
        await this.getData(true, 1)
      },
      ...mapActions('serviceNotification', ['reqMissMessageCount']),
      // 获取集师傅是否具有抢单资格
      async getSkillerState() {
        if (this.loading) return
        this.loading = !this.loading
        try {
          const res = await this.$VoHttp.apiContentLearningTasksInitialize()
          if (!res || !res.data) return
          this.skillerState = res.data
        } catch (e) {
          console.log(e)
          uni.$u.toast(e.message || '请检查网络')
        }
        this.loading = !this.loading
      },
      /**
       * 点击头像跳到我的页
       */
      goUser() {
        uni.redirectTo({
          url: '/pages/EngineerCenter/EngineerTabbar?tabbarVal=4',
        })
      },
      // 抢单成功
      robOrder(info) {
        this.$emit('updatepops', false)
        this.getData(true)
        if (this.selectedRest) {
          this.orderFn()
        }
        // this.orderList.forEach((item) => {
        //   if (item.id === info.id) {
        //     item.orderStatus = 3140
        //   }
        // })
      },
      // 获取技术工收益工作天数信息
      getSkillInfo() {
        this.$VoHttp
          .apiCompanyInfoSkillInfo()
          .then((res) => {
            if (res.data) {
              console.log(res.data)
              this.infoSkill = res.data
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
      },
      //获取接单设置
      getSetting() {
        this.$VoHttp
          .apiOrdertakesettingDetail()
          .then((res) => {
            console.log(res, '=====================')
            if (res.data) {
              this.orderSetting = res.data
              if (this.orderSetting.workerStatus === 1) {
                this.selectedOrder = true
                this.selectedRest = false
              } else {
                this.selectedRest = true
                this.selectedOrder = false
              }
            }
            // this.getData(true)
          })
          .catch((err) => {
            uni.$u.toast(err.message || '请检查网络')
          })
      },
      skillApproveFn(row) {
        this.skillInfo = row
        this.showSkillApprove = true
        this.$emit('updatepops', true)
      },
      close() {
        this.showSkillApprove = false
        this.$emit('updatepops', false)
      },
      /**
       * @description 去认证
       */
      confirmHandler() {
        this.showSkillApprove = false
        this.$emit('updatepops', false)
        goOnlineCustomerFn(2)
        // this.$linkToEasy(
        //   '/pagesEngineer/pagesQualification/RecyclingQualification/CourseList?qualifyType=' +
        //     this.skillInfo.supportType,
        // )
      },
      /**
       * @description 去认证
       */
      goApproveFn() {
        if (this.currentUserFullInfo.checkStatus == 0) {
          this.$linkToEasy('/pagesEngineer/AuthenticationInformation/EngineerAccounts')
          return
        } else if (this.currentUserFullInfo.checkStatus == 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        }
        this.$linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
      },
      // 抢单回调
      robFn(data) {
        console.log(data)
        this.row = data
        this.showGrab = true
        this.$emit('updatepops', true)
      },
      //获取列表数据
      async getData(refresh, isLocation) {
        if (!this.LocationInfo && isLocation) {
          console.log(isLocation, 'isLocation')
          try {
            this.LocationInfo = await getLocation(this.locationgTips)
            if (this.LocationInfo) {
              if (!this.timer) {
                this.setLocationTerval()
              }
            }
          } catch (e) {
            console.log(e)
          }
        }
        if (this.loading) return
        this.loading = !this.loading
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.orderList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          supportType: this.orderSetting ? this.orderSetting.supportType : 1,
          majorCarSeries: this.orderSetting ? this.orderSetting.majorCarSeries : '',
          distance: this.locData ? this.locData.value : '', //直线距离,单位:公里
          areaCode: this.areaCode,
          longitude: this.LocationInfo ? this.LocationInfo.longitude : '', // 距离筛选时必传
          latitude: this.LocationInfo ? this.LocationInfo.latitude : '', // 距离筛选时必传
        }
        if (this.orderStartTimeSection) {
          params.orderStartTimeSection = this.orderStartTimeSection
        }
        if (this.homeStartTime) {
          params.homeStartTime = this.homeStartTime
        }
        if (this.homeEndTime) {
          params.homeEndTime = this.homeEndTime
        }
        this.$VoHttp
          .apiGraborderQuerycantakeorders(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records
              this.total = res.data.total
              data.forEach((item) => {
                //组装时间段
                if (item.homeStartTime && item.homeEndTime) {
                  item.time =
                    this.$vocenApi.VoUtils.timeFormat(item.homeStartTime, 'yyyy-mm-dd hh:MM') +
                    '-' +
                    this.$vocenApi.VoUtils.timeFormat(item.homeEndTime, 'hh:MM')
                }
              })
              this.orderList = this.orderList.concat(data)
              console.log('this.orderListhome', this.orderList)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.refresherTriggered = false
            this.refresh = false
            this.loadingStatus = false
            this.loading = !this.loading
          })
      },
      refresherrefresh() {
        if (this.refresherTriggered) return
        this.getData(true)
        this.refresherTriggered = true
      },
      /**
       * 滚动监听
       * @param e
       */
      onScroll(e) {
        this.showRightBtn = true
        if (e.detail.scrollTop > 0) {
          this.showActionNav = true
        } else {
          this.showActionNav = false
        }
        let query = uni.createSelectorQuery().in(this)
        query
          .select('#navTop')
          .boundingClientRect((data) => {
            this.handleScroll(data.top)
          })
          .exec()
      },
      // 监听页面滚动
      handleScroll(scrollTop) {
        // 获取当前的滚动距离
        if (scrollTop < 120) {
          // 当滚动距离小于150时，计算导航透明度，可以考虑修改为每20增加0.1
          this.opacity = -(scrollTop + 120) / 20
        } else {
          this.opacity = 0
        }
      },
      goTo(url) {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        this.$linkToEasy(url)
      },
      async orderFn() {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        try {
          this.LocationInfo = await getLocation(this.locationgTips)
        } catch (e) {
          console.log(e)
          return
        }
        if (this.selectedOrder) return
        this.selectedOrder = true
        this.selectedRest = false
        this.statusChange()
      },
      restFn() {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        if (this.selectedRest) return
        this.selectedRest = true
        this.selectedOrder = false
        this.statusChange()
      },
      //接单，休息状态更改
      statusChange() {
        if (this.loading) return
        this.loading = !this.loading
        let param = {
          supportType: this.orderSetting.supportType,
          id: this.orderSetting.id,
          companyId: this.orderSetting.companyId,
          workerStatus: this.selectedOrder ? 1 : 2, //技术工状态(1:接单,2:休息)
        }
        this.$VoHttp
          .apiOrdertakesettingUpdate(param)
          .then((res) => {
            uni.$u.toast('修改成功')
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请检查网络')
          })
          .finally(() => {
            this.loading = !this.loading
          })
      },
      //选择上门时间
      chooseDoorTime() {
        this.doorTimeVisible = true
        this.$emit('updatepops', true)
        // this.isBottomShow = false
      },
      // 上门时间筛选弹框关闭
      doorTimeClose() {
        this.doorTimeVisible = false
        this.$emit('updatepops', false)
        this.isBottomShow = true
      },
      // 上门时间筛选弹框确认
      doorTimeConfirm(data) {
        this.$emit('confirm', data)
        console.log(data)
        this.orderStartTimeSection = data.days || ''
        this.homeStartTime = data.homeStartTime
        this.homeEndTime = data.homeEndTime
        this.doorTimeClose()
        this.fixedClose()
        if (data.daysName) {
          this.timeList = [
            {
              name: data.daysName,
              type: 'time',
              delete: true,
            },
          ]
        } else {
          this.timeList = []
        }
        let arr = this.echoList.filter((item) => item.type !== 'time')
        this.echoList = arr.concat(this.timeList)
        console.log(this.echoList)
        this.$emit('updatepops', false)
        this.getData(true)
      },
      openPop() {
        console.log('qwe')
        this.fixedVisible = true
        this.$emit('updatepops', true)
      },
      // 上门时间筛选弹框关闭
      fixedClose() {
        this.fixedVisible = false
        this.isBottomShow = true
        this.$emit('updatepops', false)
      },
      // 上门时间筛选弹框确认
      fixedConfirm(resultData) {
        this.$emit('confirm', resultData)
        this.fixedVisible = false
        this.isBottomShow = true
        this.$emit('updatepops', false)
      },
      /**
       * 服务区域
       */
      serviceArea() {
        // this.$storage.set('engineerArea', this.engineerArea)
        this.$linkToEasy('/pagesEngineer/SaleArea/SaleArea')
      },
      /**
       * 去我要推广页面
       */
      goSpreadHome() {
        const status = this.currentUserFullInfo.checkStatus
        if (status <= 0) {
          this.$u.toast('当前为游客模式，体验更多功能，请先进行认证后再分享')
        } else if (status === 2) {
          this.$u.toast('认证未通过，请重新进行认证后再分享')
        } else if (status === 1) {
          this.$u.toast('信息正在认证审核中，审核通过后可分享，请耐心等待...')
        } else if (status === 4) {
          this.$u.toast('为保障认证信息是本人真实操作，请验证手机号后再分享')
        } else {
          this.$linkToEasy('/pagesEngineer/Spread/SpreadHome')
        }
      },
      async initInfo() {
        await store.dispatch('user/getFullUserInfo').then((res) => {
          console.log(res)
          this.currentUserFullInfo = res
        })
      },
      scrolltolowerFn() {
        if (this.orderList.length < this.total) {
          this.pageNo++
          this.getData()
        }
      },
      //删除筛选选项
      deleteTagFn(e) {
        this.echoList.forEach((item) => {
          if (e.name === item.name) {
            item.delete = false
          }
        })
        //删除的是时间选项
        if (e.type === 'time') {
          this.orderStartTimeSection = ''
          this.getData(true)
        }
        //删除的是区域选项
        if (e.type === 'area') {
          this.areaCode.map((item, index) => {
            if (item === e.code) {
              this.areaCode.splice(index, 1)
            }
          })
          this.getData(true)
        }
        //删除的是距离选项
        if (e.type === 'distance') {
          this.locData = ''
          this.getData(true)
        }
      },
      //清空筛选选项
      clearFilter() {
        console.log('清空筛选选项')
        this.echoList = []
        this.orderStartTimeSection = ''
        this.areaCode = []
        this.locData = ''
        this.getData(true)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .hidden-img {
    background-image: url('/static/supplier/home/home_bg.png');
    background-size: 100% 930rpx;
  }
  .home {
    width: 750rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
    background-repeat: no-repeat;
    background-color: #fff;
    &-action {
      position: fixed;
      top: 0;
      width: 750rpx;
      z-index: 99;
      background: #fff;
      &__sift {
        padding: 24rpx 56rpx;
      }
    }
    &-bg {
      width: 100%;
    }
    &-head {
      margin-top: 40rpx;
      margin-bottom: 12rpx;
      padding: 0 32rpx;
      box-sizing: border-box;
      &__image {
        width: 136rpx;
        height: 136rpx;
        border-radius: 50%;
        overflow: hidden;
        display: block;
        border: 4rpx solid #ffffff;
      }
      &__right {
        margin-top: auto;
        width: 288rpx;
        height: 64rpx;
        background: rgba(255, 255, 255, 0.45);
        border: 2rpx solid #ffffff;
        border-radius: 156rpx;
        box-sizing: border-box;
        padding: 2rpx;
        .right-box {
          width: 140rpx;
          height: 56rpx;
          line-height: 56rpx;
          text-align: center;
          font-size: 28rpx;
          border-radius: 46rpx;
          overflow: hidden;
          color: $v-c0-45;
        }
      }
    }
    &-bubble {
      position: relative;
      background: #fff;
      border-radius: 20rpx;
      margin: 32rpx 32rpx 36rpx;
      padding: 24rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      color: $v-c0-85;
      &__triangle {
        position: absolute;
        left: 60rpx;
        top: -32rpx;
        width: 0;
        height: 0;
        border-width: 16rpx;
        border-style: solid dashed dashed;
        border-color: transparent transparent #fff transparent;
        font-size: 0;
        line-height: 0;
        z-index: 99;
      }
    }
    &-spread {
      position: fixed;
      bottom: 380rpx;
      right: 16rpx;
      &__icon {
        position: absolute;
        width: 40rpx;
        height: 40rpx;
        top: -48rpx;
        right: 0;
        z-index: 99;
      }
      &__img {
        position: relative;
        width: 120rpx;
        height: 120rpx;
      }
    }
    &-service {
      padding: 24rpx 56rpx;
    }
    &-fixed {
      position: fixed;
      bottom: 172rpx;
      left: 32rpx;
      width: 686rpx;
      height: 88rpx;
      background: rgba(0, 0, 0, 0.65);
      border-radius: 62rpx;
      padding: 0 16rpx;
      box-sizing: border-box;
      &__tips {
        font-size: 24rpx;
        color: #ffffff;
      }
      &__button {
        color: #fff;
        background: #ff5319;
        border-radius: 30rpx;
        font-size: 24rpx;
        width: 130rpx;
        height: 56rpx;
        line-height: 56rpx;
        text-align: center;
        &.bg {
          background: #ff9b05;
        }
      }
    }
  }
  .selectedOrder {
    background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
    color: #fff !important;
  }
  .selectedRest {
    background: rgba(0, 0, 0, 0.08);
    border-radius: 46rpx;
    color: $v-c0-85 !important;
  }
  .transform {
    transform: rotate(180deg);
  }
  .placeholder {
    height: 130rpx;
  }
  .base-info__sub {
    display: inline-block;
    background: #ffece5;
    border-radius: 24rpx;
    padding: 2rpx 16rpx;
    font-weight: bold;
    font-size: 24rpx;
    line-height: 36rpx;
    color: #ff5319;
  }
</style>
