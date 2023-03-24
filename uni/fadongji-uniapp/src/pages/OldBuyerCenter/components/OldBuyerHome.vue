<template>
  <scroll-view
    :refresher-enabled="!colourVisible && !modelVisible && !colourActiveSticky"
    :refresher-threshold="10"
    :refresher-triggered="triggered"
    :scroll-y="!colourVisible && !modelVisible && !colourActiveSticky"
    class="home"
    lower-threshold="50"
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
    <view @click="scrollViewFn">
      <VoBatteryBar bg-color="transparent" />
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />

      <vo-qi-mo-customer ref="qiMoRef" />
      <view class="home-search flex flex-vertical-c">
        <view class="home-search__box flex flex-vertical-c">
          <VoIcon :size="24" class="m-l-16 m-r-14" name="search" />
          <u--input
            v-model="keyword"
            border="none"
            placeholder="输入商品名称"
            @confirm="confirmSearch"
          />
          <VoIcon :size="24" class="m-r-20" name="scan-new" />
        </view>
        <view
          class="home-search__news"
          @click="goTo('/pagesCommon/serviceMessagePage/MessageNotification')"
        >
          <VoIcon :size="24" name="message-bell" />
          <VoBadge
            v-if="getMissMessageCount"
            :value="getMissMessageCount"
            class="news-badge"
            max="99"
          />
        </view>
      </view>
      <view class="home-title flex flex-vertical-c flex-justify-between">
        <image class="home-title__img" src="/static/supplier/home/slogan_agent.png" />
        <view class="flex flex-vertical-c">
          <VoTooltip
            :is-padding-top="false"
            :padding="8"
            class="fz-0"
            color="rgba(17, 17, 17)"
            placement="bottom-start"
          >
            <view slot="content" class="tooltip-box">
              <view
                v-for="(role, roleIndex) of myRoleArr"
                :key="roleIndex"
                class="tooltip-box__item"
                @click="switchRoleFn(role)"
              >
                {{ role.roleName }}
              </view>
              <view class="tooltip-box__item" @click="addRoleFn"> 新增角色 </view>
            </view>
            <view
              class="home-title__switch background-transparent flex flex-vertical-c flex-justify-c"
            >
              <view class="switch-name">{{ getRoleName(userInfo.roleCode, roleArrGet) }}</view>
              <VoIcon :size="20" name="switch-to" />
            </view>
          </VoTooltip>
        </view>
      </view>
      <!--    <view class="home-state flex">-->
      <!--      <view class="flex1 text-center">-->
      <!--        <view class="home-state__top font-din-bold">80</view>-->
      <!--        <view class="home-state__bottom">待发货</view>-->
      <!--      </view>-->
      <!--      <view class="flex1 text-center">-->
      <!--        <view class="home-state__top font-din-bold">100</view>-->
      <!--        <view class="home-state__bottom">待收货</view>-->
      <!--      </view>-->
      <!--      <view class="flex1 text-center">-->
      <!--        <view class="home-state__top font-din-bold">10,009</view>-->
      <!--        <view class="home-state__bottom">累计收货量</view>-->
      <!--      </view>-->
      <!--    </view>-->
      <!--  搜索  -->
      <!--  <view class="home-search2 flex flex-vertical-c">  -->
      <!--   <VoSearch v-model="keyword" placeholder="请输入搜索" />   -->
      <!--  </view>  -->
      <view class="home-tab m-t-40">
        <EraTabs :current="current" :list="tabList" class="detail-tab" @click="changeTabFn" />
        <view class="home-tab__secondary flex flex-vertical-c relative fz-28 color-block-45">
          <view
            :class="current === 0 ? 'secondary-item' : 'secondary-activite'"
            class="flex flex-vertical-c flex-justify-c flex1"
            @click="priceSort('money')"
          >
            <view :class="cur === 'money' ? 'selectedColor' : ''" class="m-r-4">价格</view>
            <block v-if="cur === 'money'">
              <VoIcon v-if="salesState" :size="16" name="direction" />
              <VoIcon v-else :size="16" class="transform" name="direction" />
            </block>
            <VoIcon v-else :size="16" name="default-gray" />
          </view>
          <view
            :class="current === 0 ? 'secondary-item' : 'secondary-activite'"
            class="flex flex-vertical-c flex-justify-c flex1"
            @click="salesSort('sales')"
          >
            <view :class="cur === 'sales' ? 'selectedColor' : ''" class="m-r-4">销量</view>
            <block v-if="cur === 'sales'">
              <VoIcon v-if="defaultState" :size="16" name="direction" />
              <VoIcon v-else :size="16" class="transform" name="direction" />
            </block>
            <VoIcon v-else :size="16" name="default-gray" />
          </view>
          <view
            :class="current === 0 ? 'secondary-item' : 'secondary-activite'"
            class="flex flex-vertical-c flex-justify-c flex1"
            @click="openColourVisible('colour')"
          >
            <view :class="cur === 'colour' ? 'selectedColor' : ''" class="m-r-4">成色</view>
            <image v-if="cur === 'colour'" class="h32 w32" src="/static/icons/triangle_up.png" />
            <image v-else class="h32 w32" src="/static/icons/triangle_down.png" />
            <!--          <VoIcon :size="16" name="triangular" />-->
          </view>
          <view
            :class="current === 0 ? 'secondary-item' : 'secondary-activitec'"
            class="flex flex-vertical-c flex-justify-c flex1"
            @click="openModelVisible('model')"
          >
            <view :class="cur === 'model' ? 'selectedColor' : ''" class="m-r-4">型号</view>
            <image v-if="cur === 'model'" class="h32 w32" src="/static/icons/triangle_up.png" />
            <image v-else class="h32 w32" src="/static/icons/triangle_down.png" />
          </view>
          <view
            v-if="current === 1"
            :class="current === 0 ? 'secondary-item' : 'secondary-activite'"
            class="flex flex-vertical-c flex-justify-c flex1"
            @click="openColourActiveSticky('all')"
          >
            <view :class="cur === 'all' ? 'selectedColor' : ''">全部活动</view>
            <VoIcon :size="16" name="triangular" />
          </view>
          <!--   成色   -->
          <ColourPop
            ref="colourPop"
            :labelInfo="labelInfo"
            :visible="colourVisible"
            @close="colourClose"
            @confirm="colourConfirm"
            @levelType="colourScreening"
          />
          <!--   型号   -->
          <ModelPop
            ref="modelPop"
            :modelList="modelList"
            :visible="modelVisible"
            @close="modelClose"
            @confirm="modelConfirm"
            @modelScreen="modelScreening"
          />
          <!--   活动   -->
          <ActiveStatusPop
            ref="activitePop"
            :visible="colourActiveSticky"
            @activeType="activeScreen"
            @close="activeClose"
            @confirm="activeConfirm"
          />
        </view>
      </view>
      <view v-if="showSticky" :class="hideBar ? 'hideBar' : ''" class="sticky bg-white">
        <VoBatteryBar bg-color="transparent" />
        <!--      <view class="sticky-search flex flex-vertical-c">-->
        <!--        <view class="sticky-search__box flex flex-vertical-c" @click="goSearchPage">-->
        <!--          <VoIcon :opacity="0.65" class="m-l-16 m-r-14" color="#000000" name="search" />-->
        <!--          <view class="fz-24 color-block-25 flex1">请输入关键字搜索</view>-->
        <!--          <VoIcon :opacity="0.65" class="m-r-20" color="#000000" name="scan-new" />-->
        <!--        </view>-->
        <!--        <view class="sticky-search__news">-->
        <!--          <VoIcon name="smile-m" />-->
        <!--          <VoBadge :value="value" class="news-badge" max="99" />-->
        <!--        </view>-->
        <!--      </view>-->
        <view class="home-search2 flex flex-vertical-c">
          <VoSearch
            v-model="keyword"
            :actionStyle="{ color: '#fff' }"
            :showInsideAction="true"
            bgColor="#fff"
            borderColor="#FF5319"
            height="34"
            placeholder="输入商品名称"
            @search="confirmSearch"
          />
        </view>

        <!--   顶部悬浮区域   -->
        <view class="sticky-tab">
          <EraTabs :current="current" :list="tabList" class="detail-tab" @click="changeTabFn" />
          <view class="home-tab__secondary flex flex-vertical-c relative fz-28 color-block-45">
            <view
              :class="current === 0 ? 'secondary-item' : 'secondary-activite'"
              class="flex flex-vertical-c flex-justify-c flex1"
              @click="priceSort('money')"
            >
              <view :class="cur === 'money' ? 'selectedColor' : ''" class="m-r-4">价格</view>
              <block v-if="cur === 'money'">
                <VoIcon v-if="salesState" :size="16" name="direction" />
                <VoIcon v-else :size="16" class="transform" name="direction" />
              </block>
              <VoIcon v-else :size="16" name="default-gray" />
            </view>
            <view
              :class="current === 0 ? 'secondary-item' : 'secondary-activite'"
              class="flex flex-vertical-c flex-justify-c flex1"
              @click="salesSort('sales')"
            >
              <view :class="cur === 'sales' ? 'selectedColor' : ''" class="m-r-4">销量</view>
              <block v-if="cur === 'sales'">
                <VoIcon v-if="defaultState" :size="16" name="direction" />
                <VoIcon v-else :size="16" class="transform" name="direction" />
              </block>
              <VoIcon v-else :size="16" name="default-gray" />
            </view>
            <view
              :class="current === 0 ? 'secondary-item' : 'secondary-activite'"
              class="flex flex-vertical-c flex-justify-c flex1"
              @click="openColourSticky('colour')"
            >
              <view :class="cur === 'colour' ? 'selectedColor' : ''" class="m-r-4">成色</view>
              <VoIcon :size="16" name="triangular" />
            </view>
            <view
              :class="current === 0 ? 'secondary-item' : 'secondary-activitec'"
              class="flex flex-vertical-c flex-justify-c flex1"
              @click="openModelSticky('model')"
            >
              <view :class="cur === 'model' ? 'selectedColor' : ''" class="m-r-4">型号</view>
              <VoIcon :size="16" name="triangular" />
            </view>
            <view
              v-if="current === 1"
              :class="current === 0 ? 'secondary-item' : 'secondary-activite'"
              class="flex flex-vertical-c flex-justify-c flex1"
              @click="openActiveSticky('all')"
            >
              <view :class="cur === 'all' ? 'selectedColor' : ''">全部活动</view>
              <VoIcon :size="16" name="triangular" />
            </view>
            <!--   成色   -->
            <ColourPop
              ref="colourPop"
              :labelInfo="labelInfo"
              :visible="colourSticky"
              @close="colourStickyClose"
              @confirm="colourStickyConfirm"
              @levelType="colourStickyScreening"
            />
            <!--   型号   -->
            <ModelPop
              ref="modelPop"
              :modelList="modelList"
              :visible="modelSticky"
              @close="modelStickyClose"
              @confirm="modelStickyConfirm"
              @modelScreen="modelStickyScreening"
            />
            <!--   活动   -->
            <ActiveStatusPop
              ref="activePop"
              :visible="activeSticky"
              @activeType="activeScreenFixed"
              @close="activeCloseFixed"
              @confirm="activeConfirmFixed"
            />
          </view>
        </view>
      </view>
      <!--  商品  -->
      <view class="bg-white p-b-100">
        <!-- 下拉刷新组件 -->
        <VoListFresh :show="loadingStatus" />
        <block v-if="goodDataList && goodDataList.length">
          <GoodsList
            v-for="(good, goodIndex) in goodDataList"
            :key="goodIndex"
            :current="current"
            :goods-info="good"
            @addGoodCar="addGoodCar"
            @buyNow="buyNow"
          />
          <VoLoadingText :has-more="goodDataList.length < total" :loading="loading" />
        </block>
        <VoNoData v-else no-data-tips="暂无商品" />
      </view>

      <BuyNowPopup ref="buyNowRef" :current="current" showHight @hide="hide" />
      <view
        v-if="
          Number(currentUserFullInfo.checkStatus) === -1 ||
          Number(currentUserFullInfo.checkStatus) === 0
        "
        class="home-fixed flex flex-vertical-c flex-justify-between"
      >
        <view class="home-fixed__tips">当前为游客模式</view>
      </view>

      <view
        v-else-if="Number(currentUserFullInfo.checkStatus) === 4"
        class="home-fixed flex flex-vertical-c flex-justify-between"
      >
        <view class="home-fixed__tips">为保障认证信息是本人真实操作，请验证手机号</view>
        <view class="home-fixed__button" @click="goApproveFn">去验证</view>
      </view>
      <view
        v-else-if="Number(currentUserFullInfo.checkStatus) === 2"
        class="home-fixed flex flex-vertical-c flex-justify-between"
      >
        <view class="home-fixed__tips m-l-16">认证未通过，请重新进行认证。</view>
        <view class="home-fixed__button" @click="goGarageAccounts">立即认证</view>
      </view>
      <view
        v-else-if="Number(currentUserFullInfo.checkStatus) === 1"
        class="home-fixed flex flex-vertical-c flex-justify-between"
      >
        <view class="home-fixed__tips m-l-16">信息正在认证审核中，请耐心等待...</view>
        <view class="home-fixed__button bg">审核中</view>
      </view>
      <!--  底部悬浮end  -->
      <EraApproveModal :show.sync="showApprove" />
      <vo-safety-area :is-fixed="false" />
    </view>
  </scroll-view>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import GoodsList from './HomeComponents/GoodsList'
  import ColourPop from './HomeComponents/ColourPop'
  import ModelPop from './HomeComponents/ModelPop'
  import BuyNowPopup from './HomeComponents/BuyNowPopup'
  import ActiveStatusPop from './HomeComponents/ActiveStatusPop'
  import store from '@/store'
  import helpUtil, { showLoading, toRoleHome } from '@/common/helper'

  import devConf from '@/common/env'

  export default {
    name: 'OldBuyerHome',
    components: { GoodsList, ColourPop, ModelPop, BuyNowPopup, ActiveStatusPop },
    data() {
      return {
        modelList: [],
        labelInfo: [
          {
            id: 1,
            name: 'A类',
            level: 'A',
            selected: false,
          },
          {
            id: 2,
            name: 'B类',
            level: 'B',
            selected: false,
          },
          {
            id: 3,
            name: 'C类',
            level: 'C',
            selected: false,
          },
        ],
        currentUserFullInfo: {},
        showApprove: false,
        defaultState: false,
        salesState: false,
        safeTopHeight: '', // 顶部安全距离
        showSticky: false, // 是否展示吸顶
        value: 8,
        keyword: '', // 搜索双向绑定
        current: 0,
        tabList: [
          {
            name: '商品',
          },
          {
            name: '预售',
          },
        ],
        colourVisible: false, // 成色筛选弹框
        modelVisible: false, // 型号筛选弹框
        colourSticky: false, // 吸顶的成色筛选弹框
        modelSticky: false, // 吸顶的型号筛选弹框
        colourActiveSticky: false, // 全部活动筛选弹框
        activeSticky: false, // 吸顶的全部活动筛选弹框
        showBuy: false, // 立即购买弹框
        type: 4, // 0：正常状态，1：验证手机号，2：认证未通过，3：认证审核中，4：游客模式
        //下拉刷新上拉加载
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        loading: false,
        pageNo: 1,
        pageSize: 10,
        goodDataList: [],
        //成色 A:上等 B:中等  C:下等
        levels: [],
        //型号id   goods_model.id
        modelId: [],
        //排序属性(价格：price 销量：saleCount )
        orderProperty: '',
        //排序类型 DESC 降序 ASC 升序
        orderType: '',
        //立即下单 和 加入购物车 弹框使用数据
        carGoodData: {},
        carType: 0,
        activiteStstus: '',
        cur: null,
        hideBar: false,
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
        roleArrGet: 'role/roleArrGetter',
        getMissMessageCount: 'serviceNotification/getMissMessageCount',
      }),
      myRoleArr: function () {
        if (this.userInfo && this.userInfo.roleCodeList) {
          return this.userInfo.roleCodeList.filter((item) => {
            return String(item.roleCode) !== String(this.userInfo.roleCode)
          })
        }
        return []
      },
    },
    created() {
      this.initInfo()
      console.log(this.$systemInfo)
      //   const res = uni.getSystemInfoSync()
      //   this.safeTopHeight = res.statusBarHeight
      //   this.showSticky = true
    },
    methods: {
      scrollViewFn() {
        this.$refs.qiMoRef?.close()
      },
      hide(bool) {
        console.log(bool)
        this.hideBar = bool
        this.$emit('hideBar', bool)
      },
      ...mapActions('serviceNotification', ['reqMissMessageCount']),
      async goodsModelList() {
        console.log(111)
        try {
          let res = await this.$VoHttp.apiGoodsModelRecycleList()
          if (res.success) {
            this.modelList = res.data.map((item) => {
              return {
                selected: false,
                ...item,
              }
            })
          }
        } catch (err) {
          this.$u.toast(err.message)
        }
      },
      goTo(url) {
        this.$linkToEasy(url)
      },
      /**
       * 去认证
       */
      goGarageAccounts() {
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {
          this.$linkToEasy('/pagesOldBuyer/HomeJumpPage/GarageAccounts')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus === -1) {
          this.showApprove = true
          return
        }

        this.$linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      /**
       * 点击价格
       */
      priceSort(e) {
        this.defaultState = false
        this.setDefalt()
        this.cur = e
        this.salesState = !this.salesState
        console.log(this.salesState)
        this.orderProperty = 'price'
        if (this.salesState) {
          this.orderType = 'DESC'
        } else {
          this.orderType = 'ASC'
        }
        this.refresh = true
        this.getPresellGoodListRequest()
      },
      /**
       * 点击销量
       */
      salesSort(e) {
        this.salesState = false
        this.setDefalt()
        this.cur = e
        this.defaultState = !this.defaultState
        this.orderProperty = 'saleCount'
        if (this.defaultState) {
          this.orderType = 'DESC'
        } else {
          this.orderType = 'ASC'
        }
        this.refresh = true
        this.getPresellGoodListRequest()
      },
      /**
       * 滚动监听
       * @param e
       */
      onScroll(e) {
        this.scrollViewFn()
        // console.log(e)
        this.showSticky = e.detail.scrollTop >= 100
      },
      /**
       * 搜索
       */
      confirmSearch() {
        this.refresh = true
        this.getPresellGoodListRequest()
      },
      switchRoleFn(role) {
        const refreshToken = this.$storage.get('refresh_token')
        let param = {
          terminalSource: helpUtil.appSource(),
          refreshToken,
          roleCode: role.roleCode,
          clientId: devConf.clientId,
          clientSecret: this.$encrypt.encrypt(devConf.clientSecret),
        }
        showLoading('切换中')
        this.$VoHttp
          .switchRole(param, { noPrefix: true })
          .then((res) => {
            uni.$u.toast('切换成功')
            store.dispatch('user/setUseInfo', res.data)
            setTimeout(() => {
              toRoleHome()
            }, 1000)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
      addRoleFn() {
        const userName = this.userInfo.userName
        this.$store.dispatch('user/setUseInfo', {})
        this.$store.dispatch('im/closeIMCTX')

        uni.reLaunch({
          url: '/pages/CommonLogin/UserLogin?userName=' + userName,
        })
      },
      /**
       * 点击tab事件
       * @param e  触发的事件
       */
      changeTabFn(e) {
        this.current = e.index
        this.refresh = true
        this.getPresellGoodListRequest()
      },
      //swiper切换
      swiperChange(event) {
        this.current = event.detail.current
      },
      /**
       * 打开成色
       */
      openColourVisible(e) {
        this.setDefalt()
        this.modelClose()
        this.activeClose()
        this.cur = e
        this.colourVisible = true
        this.$emit('updatepops', true)
      },
      /**
       * 打开型号
       */
      openModelVisible(e) {
        this.setDefalt()
        this.colourClose()
        this.activeClose()
        this.cur = e
        this.modelVisible = true
        this.$emit('updatepops', true)
      },
      setDefalt() {
        this.colourVisible =
          this.modelSticky =
          this.modelVisible =
          this.colourSticky =
          // this.salesState =
          // this.defaultState =
          this.activeSticky =
          this.colourActiveSticky =
            false
        this.$emit('updatepops', false)
      },
      /**
       * 打开全部活动
       */
      openColourActiveSticky(e) {
        this.setDefalt()
        this.colourClose()
        this.modelClose()
        this.cur = e
        this.colourActiveSticky = true
        this.$emit('updatepops', true)
      },
      // 打开吸顶的成色
      openColourSticky(e) {
        this.modelStickyClose()
        this.activeCloseFixed()
        this.setDefalt()
        this.cur = e
        this.colourSticky = true
        this.$emit('updatepops', true)
      },
      // 打开吸顶的型号
      openModelSticky(e) {
        this.colourClose()
        this.activeCloseFixed()
        this.setDefalt()
        this.cur = e
        this.modelSticky = true
        this.$emit('updatepops', true)
      },
      // 打开吸顶的全部活动
      openActiveSticky(e) {
        this.colourClose()
        this.modelStickyClose()
        this.setDefalt()
        this.cur = e
        this.activeSticky = true
        this.$emit('updatepops', true)
      },
      //成色筛选弹框关闭
      colourClose() {
        this.colourVisible = false
        this.$emit('updatepops', false)
      },
      //成色筛选弹框确认
      colourConfirm(colourData) {
        this.$emit('confirm', colourData)
        this.colourVisible = false
        this.$emit('updatepops', false)
      },
      //成色筛选按钮
      colourScreening(levelType) {
        this.colourVisible = false
        this.levels = levelType
        this.refresh = true
        this.$emit('updatepops', false)
        this.getPresellGoodListRequest()
      },
      // 吸顶的成色筛选弹框关闭
      colourStickyClose() {
        this.colourSticky = false
        this.$emit('updatepops', false)
      },
      // 吸顶的成色筛选弹框确认
      colourStickyConfirm(colourData) {
        this.$emit('confirm', colourData)
        this.colourSticky = false
        this.$emit('updatepops', false)
      },
      // 吸顶的成色筛选按钮
      colourStickyScreening(levelType) {
        this.colourSticky = false
        this.levels = levelType
        this.refresh = true
        this.$emit('updatepops', false)
        this.getPresellGoodListRequest()
      },
      // 型号筛选弹框关闭
      modelClose() {
        this.modelVisible = false
        this.$emit('updatepops', false)
      },
      // 型号筛选弹框确认
      modelConfirm(modelData) {
        this.$emit('confirm', modelData)
        this.modelVisible = false
        this.$emit('updatepops', false)
      },
      // 型号筛选按钮
      modelScreening(model) {
        this.modelVisible = false
        this.modelId = model
        this.refresh = true
        this.$emit('updatepops', false)
        this.getPresellGoodListRequest()
      },
      // 吸顶的型号筛选弹框关闭
      modelStickyClose() {
        this.modelSticky = false
      },
      // 吸顶的型号筛选弹框确认
      modelStickyConfirm(modelData) {
        this.$emit('confirm', modelData)
        this.modelSticky = false
        this.$emit('updatepops', false)
      },
      // 吸顶的型号筛选按钮
      modelStickyScreening(model) {
        // this.modelSticky = false
        this.modelId = model
        this.refresh = true
        this.$emit('updatepops', false)
        this.getPresellGoodListRequest()
      },
      // 全部活动筛选弹框关闭
      activeClose() {
        this.$emit('updatepops', false)
        this.colourActiveSticky = false
      },
      // 全部活动筛选弹框确认
      activeConfirm(activeData) {
        this.$emit('confirm', activeData)
        this.$emit('updatepops', false)
        this.activeClose()
      },
      // 全部活动的筛选按钮
      activeScreen(status) {
        this.$emit('updatepops', false)
        this.activeClose()
        this.activiteStstus = status
        this.refresh = true
        this.getPresellGoodListRequest()
      },
      // 吸顶全部活动筛选弹框关闭
      activeCloseFixed() {
        this.$emit('updatepops', false)
        this.activeSticky = false
      },
      // 吸顶全部活动筛选弹框确认
      activeConfirmFixed(activeData) {
        this.$emit('confirm', activeData)
        this.$emit('updatepops', false)
        this.activeCloseFixed()
      },
      // 吸顶全部活动筛选按钮
      activeScreenFixed(status) {
        this.$emit('updatepops', false)
        this.activeCloseFixed()
        this.activiteStstus = status
        this.refresh = true
        this.getPresellGoodListRequest()
      },
      /**
       * 立即购买
       */
      buyNow(good) {
        console.log(this.hideBar)
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        this.hideBar = true
        console.log(this.hideBar)
        this.$emit('hideBar')
        this.$forceUpdate()
        this.$refs.buyNowRef.showClick(good, 2, this.current === 0 ? false : true, false)
      },
      //加入购物车
      addGoodCar(good) {
        console.log(this.hideBar)
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        this.hideBar = true
        console.log(this.hideBar)
        this.$emit('hideBar')
        this.$forceUpdate()
        this.$refs.buyNowRef.showClick(good, 1, this.current === 0 ? false : true, false)
      },
      /**
       * @description 去认证
       */
      goApproveFn() {
        this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
      },
      async initInfo() {
        this.$refs.buyNowRef?.close()
        this.setDefalt()
        await store.dispatch('user/getFullUserInfo').then((res) => {
          this.currentUserFullInfo = res
        })
        await this.reqMissMessageCount()
        await this.goodsModelList()
        this.refresh = true
        await this.getPresellGoodListRequest()
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
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
          this.getPresellGoodListRequest()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.goodDataList.length >= this.total) {
            if (this.goodDataList.length) {
              uni.$u.toast('已经到底了')
            }
            return false
          }
          this.pageNo++
          this.getPresellGoodListRequest()
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
      //获取列表请求
      getPresellGoodListRequest() {
        if (this.loading) return
        this.loading = !this.loading
        let isfresh = this.refresh
        if (isfresh) {
          this.goodDataList = []
          this.pageNo = 1
        }
        let param = {
          pageNo: this.pageNo,
          pageSize: 10,
        }
        if (this.orderProperty) {
          param.orderProperty = this.orderProperty
        }
        if (this.orderType) {
          param.orderType = this.orderType
        }
        if (this.levels && this.levels.length > 0) {
          param.levels = this.levels
        }
        if (this.modelId.length) {
          param.modelIds = this.modelId
        }
        if (this.keyword) {
          param.keyword = this.keyword
        }
        if (this.current === 1) {
          param.status = this.activiteStstus
        }

        let api =
          this.current === 0
            ? 'apiGoodsRecyleResaleBuyerSaleList'
            : 'apiGoodsRecycleResaleBuyerPreSaleList'
        this.$VoHttp[api](param)
          .then((res) => {
            console.log('商品数据', res)
            let resultData = res.data.records
            this.total = res.data.total
            //计算倒计时
            if (this.current === 1 && resultData.length) {
              resultData.forEach((item) => {
                if (this.$vocenApi.dayjs().isBefore(item.startTime)) {
                  item.timeDownText = '距离预售开始:'
                  let Time = new Date(item.startTime.replaceAll(/-/g, '/'))
                  let timestemp = Time.getTime()
                  let newData = new Date().getTime()
                  item.downData = timestemp - newData
                } else {
                  item.timeDownText = '距离预售结束:'
                  let Time = new Date(item.endTime.replaceAll(/-/g, '/'))
                  let timestemp = Time.getTime()
                  let newData = new Date().getTime()
                  item.downData = timestemp - newData
                }
              })
            }
            this.goodDataList = this.goodDataList.concat(resultData)
            console.log(resultData)
            console.log(this.goodDataList, 'xxxxxxxxxxxxxxx')
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '商品数据获取失败')
          })
          .finally(() => {
            this.loading = !this.loading
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
          })
      },
    },

    //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {
      this.showSticky = false
    },
    //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    //监听页面隐藏
    onHide() {},
    //监听页面卸载
    onUnload() {},
    //监听用户下拉动作，一般用于下拉刷新
    onPullDownRefresh() {},
    //页面滚动到底部的事件（不是scroll-view滚到底）
    onReachBottom() {},
  }
</script>
<style lang="scss" scoped>
  .sticky {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    &.hideBar {
      z-index: 0;
    }
    &-search {
      padding: 0 32rpx 20rpx;
      &__box {
        width: 590rpx;
        height: 68rpx;
        background: #fff;
        border-radius: 8rpx;
        margin-right: 40rpx;
      }
      &__news {
        position: relative;
        width: 48rpx;
        height: 48rpx;
        .news-badge {
          position: absolute;
          top: -6rpx;
          right: -10rpx;
          display: inline-block;
        }
      }
    }

    &-tab {
      background: #fff;
      padding-left: 10rpx;
      box-sizing: border-box;
      border-top-left-radius: 26rpx;
      border-top-right-radius: 26rpx;
      &__secondary {
        padding: 8rpx 8rpx 12rpx 8rpx;
        box-sizing: border-box;
        .secondary-item {
          width: 186rpx;
          height: 56rpx;
        }
      }
    }
  }
  .home {
    // #ifdef H5
    padding-top: 20rpx;
    // #endif
    width: 750rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
    background-image: url('/static/supplier/home/home_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 930rpx;
    &-search {
      padding: 0 32rpx 20rpx;
      &__box {
        width: 590rpx;
        height: 68rpx;
        background: #fff;
        border-radius: 8rpx;
        margin-right: 40rpx;
      }
      &__news {
        position: relative;
        width: 48rpx;
        height: 48rpx;
        .news-badge {
          position: absolute;
          top: -6rpx;
          right: -10rpx;
          display: inline-block;
        }
      }
    }
    &-search2 {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-title {
      padding: 20rpx 32rpx 0;
      box-sizing: border-box;
      &__img {
        width: 404rpx;
        height: 84rpx;
        display: block;
      }
      &__switch {
        width: 184rpx;
        height: 58rpx;
        background: rgba(255, 255, 255, 0.45);
        border: 2rpx solid #ffffff;
        border-radius: 38rpx;
        .switch-name {
          height: 42rpx;
          line-height: 42rpx;
          font-size: 28rpx;
          color: $v-c0-85;
        }
      }
    }
    &-state {
      padding: 40rpx 40rpx;
      &__top {
        font-weight: bold;
        font-size: 40rpx;
        color: $v-c0-85;
        height: 60rpx;
        line-height: 60rpx;
      }
      &__bottom {
        font-size: 24rpx;
        color: $v-c0-65;
        margin-top: 8rpx;
      }
    }
    &-tab {
      background: #fff;
      padding-left: 10rpx;
      box-sizing: border-box;
      border-top-left-radius: 26rpx;
      border-top-right-radius: 26rpx;
      &__secondary {
        padding: 8rpx 8rpx 12rpx 8rpx;
        box-sizing: border-box;
        .secondary-item {
          //width: 186rpx;
          height: 56rpx;
        }
        .secondary-activite {
          //width: 160rpx;
          height: 56rpx;
        }
      }
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
      z-index: 9999;
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
  .tooltip-box {
    width: 208rpx;
    font-size: 28rpx;
    color: #ffffff;
    &__item {
      height: 98rpx;
      line-height: 98rpx;
      text-align: center;
      border-bottom: 2rpx solid #bfbfbf;
      &:last-child {
        border-bottom: 0rpx;
      }
    }
  }
  .selectedColor {
    color: #ff5319;
    font-weight: bold;
  }
  .transform {
    transform: rotate(180deg);
  }
  .back-view {
    height: 100vh;
  }
  ::v-deep .zb_tooltip__popper {
    left: -80rpx !important;
  }
</style>
