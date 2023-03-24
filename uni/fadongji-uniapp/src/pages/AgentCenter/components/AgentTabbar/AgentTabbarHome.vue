<template>
  <scroll-view
    :class="{ 'bg-f5f9ff': showActionNav }"
    class="workbench"
    scroll-top="0"
    scroll-y="true"
    @scroll="onScroll"
  >
    <view :class="{ 'bg-f5f9ff': showActionNav }" @click="scrollViewFn">
      <VoBatteryBar bg-color="transparent" />

      <vo-qi-mo-customer ref="qiMoRef" />

      <view class="workbench-search flex flex-vertical-c">
        <!--        <view class="workbench-search__box flex flex-vertical-c">-->
        <!--          <view class="flex flex1 flex-vertical-c" @click="goSearch">-->
        <!--            <VoIcon :opacity="0.65" class="m-l-16 m-r-14" color="#000000" name="search" />-->
        <!--            <view class="fz-24 color-block-25 flex1">请输入关键字搜索</view>-->
        <!--          </view>-->
        <!--          <VoIcon-->
        <!--            :opacity="0.65"-->
        <!--            class="m-r-14"-->
        <!--            color="#000"-->
        <!--            name="voice-line"-->
        <!--            @click="upspringFn"-->
        <!--          />-->
        <!--          <u-line color="#B9B9BA" direction="col" length="12" />-->
        <!--          <VoIcon-->
        <!--            :opacity="0.65"-->
        <!--            class="m-l-14 m-r-20"-->
        <!--            color="#000000"-->
        <!--            name="scan-new"-->
        <!--            @click="vin"-->
        <!--          />-->
        <!--        </view>-->
        <image class="workbench-title__img" src="/static/supplier/home/slogan_agent.png" />
        <view class="flex flex-vertical-c flex1 m-l-4">
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
              <view class="tooltip-box__item" @click="addRoleFn"> 新增角色</view>
            </view>
            <view
              class="workbench-action__switch background-transparent flex flex-vertical-c flex-justify-c"
            >
              <view class="switch-name">{{ getRoleName(userInfo.roleCode, roleArrGet) }}</view>
              <VoIcon :size="20" color="#373A4E" name="switch-to" />
            </view>
          </VoTooltip>
        </view>
        <view
          class="workbench-search__news m-l-16 m-r-10"
          @click="goTo('/pagesCommon/serviceMessagePage/MessageNotification')"
        >
          <VoIcon color="#373A4E" name="message-bell" />
          <VoBadge
            v-if="getMissMessageCount"
            :value="getMissMessageCount"
            class="news-badge"
            max="99"
          />
        </view>
      </view>
      <!-- 滑动显示nav -->
      <view v-if="showActionNav" :style="{ opacity: opacity }" class="workbench-action">
        <VoBatteryBar />
        <view class="flex flex-vertical-c">
          <view class="workbench-action__box flex flex-vertical-c">
            <view class="flex1 flex flex-vertical-c" @click="goSearch">
              <VoIcon :opacity="0.65" class="m-l-16 m-r-14" color="#000000" name="search" />
              <view class="fz-24 color-block-25 flex1">请输入关键字搜索</view>
            </view>
            <VoIcon
              :opacity="0.65"
              class="m-r-14"
              color="#000"
              name="voice-line"
              @click="upspringFn"
            />
            <u-line color="#B9B9BA" direction="col" length="12" />
            <VoIcon
              :opacity="0.65"
              class="m-l-14 m-r-20"
              color="#000000"
              name="scan-new"
              @click="vin"
            />
          </view>
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
              <view class="tooltip-box__item" @click="addRoleFn"> 新增角色</view>
            </view>
            <view class="workbench-action__switch flex flex-vertical-c flex-justify-c">
              <view class="switch-name">{{ getRoleName(userInfo.roleCode, roleArrGet) }}</view>
              <VoIcon :size="20" color="#373A4E" name="switch-to" />
            </view>
          </VoTooltip>
          <view
            class="workbench-action__news m-l-12 m-r-10"
            @click="goTo('/pagesCommon/serviceMessagePage/MessageNotification')"
          >
            <VoIcon color="#373A4E" name="message-bell" />
            <VoBadge
              v-if="getMissMessageCount"
              :value="getMissMessageCount"
              class="news-badge"
              max="99"
            />
          </view>
        </view>
      </view>
      <view id="navTop" />
      <!--      <view class="workbench-title flex flex-vertical-c flex-justify-between">-->
      <!--        <image class="workbench-title__img" src="/static/supplier/home/slogan_agent.png" />-->
      <!--        <view class="flex flex-vertical-c">-->
      <!--          <VoTooltip-->
      <!--            :is-padding-top="false"-->
      <!--            :padding="8"-->
      <!--            class="fz-0"-->
      <!--            color="rgba(17, 17, 17)"-->
      <!--            placement="bottom-start"-->
      <!--          >-->
      <!--            <view slot="content" class="tooltip-box">-->
      <!--              <view-->
      <!--                v-for="(role, roleIndex) of myRoleArr"-->
      <!--                :key="roleIndex"-->
      <!--                class="tooltip-box__item"-->
      <!--                @click="switchRoleFn(role)"-->
      <!--              >-->
      <!--                {{ role.roleName }}-->
      <!--              </view>-->
      <!--              <view class="tooltip-box__item" @click="addRoleFn"> 新增角色</view>-->
      <!--            </view>-->
      <!--            <view-->
      <!--              class="workbench-action__switch background-transparent flex flex-vertical-c flex-justify-c"-->
      <!--            >-->
      <!--              <view class="switch-name">{{ getRoleName(userInfo.roleCode, roleArrGet) }}</view>-->
      <!--              <VoIcon :size="20" color="#373A4E" name="switch-to" />-->
      <!--            </view>-->
      <!--          </VoTooltip>-->
      <!--        </view>-->
      <!--      </view>-->
      <view class="workbench-newSearch">
        <VoSearch
          :showInsideAction="true"
          bgColor="#fff"
          borderColor="#FF5319"
          height="34"
          placeholder="请输入关键字搜索"
          @custom="goSearch"
          @click.native="goSearch"
        >
          <view slot="suffix" class="flex flex-vertical-c">
            <VoIcon :opacity="0.45" class="m-r-14" color="#000" name="voice-icon" />
          </view>
        </VoSearch>
      </view>
      <!--  3= 服务商首页、服务商进货列表/全国投放、服务商进货/全国店铺项目列表 结果页-/pagesAgent/VinTell/VinTell
            4= 服务商代客下单列表、服务商代客下单店铺主页 结果页-/pagesAgent/GlobalSearch/QueryResult
            5= 修理厂首页、买货列表、买货店铺主页  结果页-/pagesGarage/GlobalSearch/QueryResult -->
      <!--  当前为服务商首页origin=3  结果页 /pagesAgent/VinTell/VinTell -->
      <VoGroupVinBtn
        class="m-t-24"
        leftName="VIN查询"
        rightToUrl="/pagesProduct/ApplicationCar/ApplicationCarNew?origin=3"
        @leftBtnFn="vin"
      ></VoGroupVinBtn>
      <block v-if="getUserRoleFn('账款钱数')">
        <!--  总销售额、销售待发货、客户待付款、总收益  -->
        <view class="workbench-state flex flex-vertical-c">
          <view class="workbench-state__center flex1" @click="toPage('0')">
            <view class="lh60 fz-b fz-40 color-block">
              <block v-if="statisticObj.grossSales || statisticObj.grossSales === 0">
                <text class="font-din-bold">
                  {{
                    statisticObj.grossSales >= 10000
                      ? (statisticObj.grossSales / 10000).toFixed(2)
                      : statisticObj.grossSales
                  }}
                </text>
                <text class="fz-24 m-l-4">{{
                  statisticObj.grossSales >= 10000 ? '万' : '元'
                }}</text>
              </block>
              <text v-else class="font-din-bold">--</text>
            </view>
            <view class="m-t-8 lh36 fz-24 color-block-65">总销售额</view>
          </view>
          <view class="workbench-state__center flex1" @click="toPage('1')">
            <view class="lh60 fz-b fz-40 color-block font-din-bold">
              {{ statisticObj.waitingDelivery }}
            </view>
            <view class="m-t-8 lh36 fz-24 color-block-65">销售待发货</view>
          </view>
          <view class="workbench-state__center flex1" @click="toPage('2')">
            <view class="lh60 fz-b fz-40 color-block font-din-bold">
              {{ statisticObj.waitingPay }}
            </view>
            <view class="m-t-8 lh36 fz-24 color-block-65">客户待付款</view>
          </view>
          <view class="workbench-state__center flex1" @click="toPage('3')">
            <view class="lh60 fz-b fz-40 color-block">
              <block v-if="statisticObj.totalRevenue || statisticObj.totalRevenue === 0">
                <text class="font-din-bold">
                  {{
                    statisticObj.totalRevenue >= 10000
                      ? (statisticObj.totalRevenue / 10000).toFixed(2)
                      : statisticObj.totalRevenue
                  }}
                </text>
                <text class="fz-24 m-l-4">{{
                  statisticObj.totalRevenue >= 10000 ? '万' : '元'
                }}</text>
              </block>
              <text v-else class="font-din-bold">--</text>
            </view>
            <view class="m-t-8 lh36 fz-24 color-block-65">总收益</view>
          </view>
        </view>

        <!--  品质优选  -->
        <view class="workbench-channel flex flex-vertical-b">
          <image class="workbench-channel__img" src="/static/supplier/home/quality.png" />
          <view class="workbench-channel__explain flex1">供方多，品类全，赚钱多样化</view>
        </view>
      </block>
      <block v-if="loadOver">
        <view v-if="listData.length > 0" class="workbench-padding m-t-32">
          <block v-for="(item, index) of listData" :key="index">
            <!--  进货区  -->
            <StockArea
              v-if="item == '进货区'"
              :info="profitData"
              @updateApprove="showApprove = true"
            />
            <!-- 轮播图 -->
            <SwiperFigure v-else-if="item == '运营支持区'" :list="swiperList" />
            <!-- 公告 -->
            <NoticeItem
              v-else-if="item == '仓储区'"
              ref="noticeRef"
              :info="storeData"
              :type-of="typeOf"
              @updateApprove="showApprove = true"
              @updateshowHandle="updateshowHandleFn"
            />
            <!-- 销售区 -->
            <SalesRegion
              v-else-if="item == '销售区'"
              :count="sellOrder[0] ? sellOrder[0].statusCount : 0"
              @updateApprove="showApprove = true"
            />
            <!-- 拓客区 -->
            <TalkArea
              v-else-if="item == '拓客区' && currentUserFullInfo.showStatus"
              :info="tokerData"
              @showShare="showShare"
              @updateApprove="showApprove = true"
            />
          </block>
        </view>
        <image v-else class="w-full" mode="widthFix" src="/static/agent/role.png" />
      </block>
    </view>
    <!--  底部悬浮start  -->
    <!-- 录音展示 -->
    <view v-show="recording" class="position-f">
      <RecordingPanel ref="recordingPanel" @close="recording = false" @confirm="confirmFn" />
      <view class="safearea-box" />
    </view>
    <view
      v-if="
        Number(currentUserFullInfo.checkStatus) === -1 ||
        Number(currentUserFullInfo.checkStatus) === 0
      "
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">当前为游客模式，体验更多功能，请先进行认证</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 4"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">为保障认证信息是本人真实操作，请验证手机号</view>
      <view class="suspension__button" @click="agentApproveFn">去验证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 2"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">认证未通过，请重新进行认证。</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 1"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">信息正在认证审核中，请耐心等待...</view>
      <view class="suspension__button bg" @click="agentApproveFn">审核中</view>
    </view>
    <!--  底部悬浮end  -->
    <!--    <VoComplaintAction ref="complaintRef" />-->
    <EraApproveModal :show.sync="showApprove" />
    <!-- 分享弹框 -->
    <!--    <VoShareQrCodeView ref="sharePop" :params="params" />-->
  </scroll-view>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import StockArea from '@/pages/SupplierCenter/components/WorkbenchComponents/StockArea'
  import SwiperFigure from '@/pages/SupplierCenter/components/WorkbenchComponents/SwiperFigure'
  import NoticeItem from '@/pages/SupplierCenter/components/WorkbenchComponents/NoticeItem'
  import SalesRegion from '@/pages/SupplierCenter/components/WorkbenchComponents/SalesRegion'
  import TalkArea from '@/pages/SupplierCenter/components/WorkbenchComponents/TalkArea'
  import VoDragButton from '@/components/VoDragButton/VoDragButton'
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import helpUtil, {
    checkIsApproveFn,
    chooseImageOcrByPromise,
    goOnlineCustomerFn,
    hideLoading,
    linkToEasy,
    showLoading,
    toRoleHome,
    uploadMp3,
    vocenCameraFn,
  } from '@/common/helper'
  import devConf from '@/common/env'
  import store from '@/store'
  import permission from '@/common/permission'

  export default {
    name: 'TabbarWorkbench',
    components: {
      StockArea,
      SwiperFigure,
      NoticeItem,
      SalesRegion,
      TalkArea,
      VoDragButton,
      RecordingPanel,
    },
    data() {
      return {
        loadOver: false, //权限是否加载完全
        recording: false, // 录音功能展示
        listData: [], // 首页排序
        sellOrder: [
          {
            statusCount: 0,
          },
        ],
        showApprove: false, // 认证弹窗
        animationSpaceData: {},
        animationData: {},
        value: 8,
        hidden: true,
        typeOf: 'agent',
        showActionNav: false, //滑动显示nav
        animate: false,
        opacity: 0, // 滑动显示导航的透明度
        currentUserFullInfo: {},
        swiperList: [],
        params: {},
        tokerData: {},
        profitData: {},
        storeData: {},
        statisticObj: {
          grossSales: 0,
          totalRevenue: 0,
          waitingDelivery: 0,
          waitingPay: 0,
        },
        shareCode: '',
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
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
    async created() {
      showLoading('加载中')
      try {
        await this.initData()
        hideLoading()
        this.params = {
          inviteUserId: this.userInfo.id,
          companyId: this.userInfo.companyId,
          userName: this.userInfo.userName,
          roleCode: 'garage',
        }
      } catch (e) {
        hideLoading()
      }
    },
    methods: {
      ...mapActions('serviceNotification', ['reqMissMessageCount']),
      updateshowHandleFn(boo) {
        this.$emit('updateshowHandle', boo)
      },
      async initData() {
        await this.initFn()
        await this.initHomeStatisticsData()
        await this.reqMissMessageCount()
      },
      async refreshData() {
        await this.getOrderList()
        await this.initHomeStatisticsData()
        await this.reqMissMessageCount()
        if (+this.currentUserFullInfo.checkStatus === 3) {
          await this.getInviterData()
        }
      },
      /**
       * @description 我的用户相关
       */
      getUserRoleFn(name) {
        let boo = false
        this.listData.map((item) => {
          if (item == name) {
            boo = true
          }
        })
        return boo
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
          console.log(res.data, '识别数据')
          this.goResult(res.data.join(''))
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
            this.RecordAudioText(res.fileNameUrl)
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
      // 弹起录音
      async upspringFn() {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
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
          } else {
            if (!this.recording && this.$refs.recordingPanel) {
              this.$refs.recordingPanel.reset()
            }
            this.recording = !this.recording
          }
          // 永久拒绝
          if (a === -1) {
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
          }
        }
      },
      // 跳转搜索结果
      goResult(keyword) {
        if (keyword) {
          console.log('keyword', keyword)
          let historyList = []
          if (this.$storage.get('investment_list_histery')) {
            historyList = JSON.parse(this.$storage.get('investment_list_histery'))
          }
          if (historyList.indexOf(this.keyword) === -1) {
            historyList.push(keyword)
          }
          this.$storage.set('investment_list_histery', JSON.stringify(historyList))
          this.$linkToEasy(`/pagesAgent/VinTell/VinTell?vin=${keyword}`)
        }
      },
      async initHomeStatisticsData() {
        const res = await this.$VoHttp.apiOrderStatisticsRevenueColumn({}, { noLoading: true })
        if (!res || !res.data) return
        if (+res.code === 20001) {
          this.statisticObj = res.data
        }
      },
      async showShare() {
        // let router = '/pagesAgent/TokerDistrict/RegisterMobilePage'
        // this.$linkToEasy(`/pagesCommon/SharePoste/SharePoste?params=${JSON.stringify(this.params)}&router=${router}`)
        // this.$refs.sharePop.showShare('/pagesAgent/TokerDistrict/RegisterMobilePage')
        let router = '/pages/ShareRegister'
        if (!this.shareCode) {
          try {
            const res = await this.$VoHttp.apiShareLinkAdd({
              shareInfo: JSON.stringify(this.params),
            })
            if (!res || !res.data) {
              this.$u.toast(res.message || '网络请求失败')
              return
            }
            this.shareCode = res.data
          } catch (e) {
            this.$u.toast(e.message || '网络请求失败')
            return
          }
        }
        this.$linkToEasy(
          `/pagesCommon/SharePoste/SharePoste?code=${this.shareCode}&router=${router}`,
        )
      },
      goTo(val) {
        this.$linkToEasy(val)
      },
      getBannerList() {
        this.$VoHttp
          .apiContentSwiperList(
            { location: 'homeBanner', platformCode: 'agent' },
            { noLoading: true },
          )
          .then((res) => {
            this.swiperList = res.data
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请检查网络')
          })
      },
      /**
       * @description 服务商认证跳转
       */

      /**
       * @description 服务商认证跳转
       */
      agentApproveFn() {
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {
          //companyType   企业类型（2：企业会员, 3：个人会员）
          if (Number(this.userInfo.companyType) === 2) {
            linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
          } else if (Number(this.userInfo.companyType) === 3) {
            linkToEasy('/pages/AuthenticationInformation/AgentAccount')
          }
          // 如果是服务商
          linkToEasy('/pages/AuthenticationInformation/PublicAccounts')
        } else if (+this.userInfo.checkStatus === 4) {
          linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
        } else if (this.userInfo.checkStatus === -1) {
          this.showApprove = true
          return
        }
        this.$linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      getOrderList() {
        this.$VoHttp.apiOrderSellStatus({},{noLoading:true}).then((res) => {
          this.sellOrder = res.data.filter((res) => {
            return res.statusCode == 1120
          })
        })
      },
      //顶部菜单跳转
      toPage(key) {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        if (key === '0') {
          this.$linkToEasy(`/pagesAgent/Order/MarketOrder/MarkerOrderList`)
        } else if (key === '1') {
          this.$linkToEasy(`/pagesAgent/Order/MarketOrder/MarkerOrderList?orderStatus=1120`)
        } else if (key === '2') {
          this.$linkToEasy(`/pagesAgent/Order/MarketOrder/MarkerOrderList?orderStatus=1110`)
        } else if (key === '3') {
          let ids = JSON.stringify([2, 3, 4, 5])
          this.$linkToEasy(`/pagesSupplier/UserCenter/Invoice/AccountBill?ids=${ids}`)
        }
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
            uni.$u.toast(e.message || '请检查网络')
          })
      },
      scrollViewFn() {
        this.$refs.qiMoRef?.close()
      },
      onScroll(e) {
        this.$refs.qiMoRef?.close()
        if (e.detail.scrollTop > 0) {
          this.showActionNav = true
          this.gapBgColor = '#fff'
        } else {
          this.showActionNav = false
          this.gapBgColor = 'transparent'
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
        if (scrollTop < 0) {
          // 当滚动距离小于150时，计算导航透明度，可以考虑修改为每20增加0.1
          this.opacity = -scrollTop / 150
        } else {
          this.opacity = 0
        }
      },
      openHidden() {
        this.animate = true
        this.hidden = !this.hidden
        let height = 0
        let heightSpace = 0
        if (!this.hidden) {
          height = 73
          heightSpace = 20
        }

        let animation = uni.createAnimation({
          // 必须设置为true，否则会到面板收起或展开时，页面其他元素不会随之调整它们的布局
          needLayout: true,
          timingFunction: 'ease-in-out',
        })

        let animationSpace = uni.createAnimation({
          // 必须设置为true，否则会到面板收起或展开时，页面其他元素不会随之调整它们的布局
          needLayout: true,
          timingFunction: 'ease-in-out',
        })
        animation
          .height(height)
          .step({
            duration: 400,
          })
          .step()

        animationSpace
          .height(heightSpace)
          .step({
            duration: 400,
          })
          .step()
        this.animationData = animation.export()

        this.animationSpaceData = animationSpace.export()
      },
      addRoleFn() {
        const userName = this.userInfo.userName
        this.$store.dispatch('user/setUseInfo', {})
        this.$store.dispatch('im/closeIMCTX')

        // uni.reLaunch({
        //   url: '/pages/SelectRole/SelectRole',
        // })
        uni.reLaunch({
          url: '/pages/CommonLogin/UserLogin?userName=' + userName,
        })
      },
      async initFn() {
        await store.dispatch('user/getFullUserInfo').then((res) => {
          this.currentUserFullInfo = res
          this.$store.dispatch('user/setUseInfoItem', res)
        })
        await this.getBannerList({}, { noLoading: true })
        this.loadOver = false
        await this.$VoHttp
          .apiMenuTree(
            {
              orgCode: this.userInfo.roleCode,
            },
            { noLoading: true },
          )
          .then((res) => {
            let result = []
            res.data.map((item) => {
              if (item.name === '工作台') {
                result = item.children || []
              }
            })

            this.listData = result.map((item) => item.name)
            this.loadOver = true
          })
          .catch((e) => {
            this.loadOver = true
            uni.$u.toast(e.message || '请检查网络')
          })
        if (+this.currentUserFullInfo.checkStatus === 3) {
          await this.getInviterData()
        }
      },
      /**
       * 获取服务商拓客数据
       */
      async getInviterData() {
        try {
          const res = await this.$VoHttp.apiOrderStatisticsCompanyInvitation(
            {},
            { noLoading: true },
          )
          if (!res || !res.data) return
          this.tokerData = res.data
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
        try {
          const res = await this.$VoHttp.apiOrderStatisticsWholesaleDistrict(
            {},
            { noLoading: true },
          )
          if (!res || !res.data) return
          this.profitData = res.data
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
        try {
          const res = await this.$VoHttp.apiOrderStatisticsWarehouseDistrict(
            {},
            { noLoading: true },
          )
          if (!res || !res.data) return
          this.storeData = res.data
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
      },
      /**
       * 在线客服
       */
      toOnlineService() {
        goOnlineCustomerFn()
      },
      /**
       * 致电客服
       */
      toCall() {
        this.$VoHttp.apiExtraCustomerMoor().then((res) => {
          this.$cellPhone('400-893-5518')
        })
      },
      /**
       * 投诉建议
       */
      toComplaint() {
        this.$emit('toComplaint')
        // this.$refs.complaintRef.open()
      },
      /**
       * 搜索页面跳转
       */
      goSearch() {
        if (!checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        this.$linkToEasy('/pagesAgent/Home/SearchPage')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .workbench {
    .position-f {
      position: fixed;
      padding-bottom: 130rpx;
      left: 0;
      bottom: 0;
      z-index: 10;
    }
    // #ifdef H5
    padding-top: 20rpx;
    // #endif
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
    background: #f5f9ff;
    background-image: url('/static/supplier/home/home_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 930rpx;

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
    &-newSearch {
      margin-top: 12rpx;
      padding: 0 32rpx;
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
        }
      }
    }

    &-action {
      position: fixed;
      top: 0;
      width: 750rpx;
      z-index: 99;
      background: #fff;
      padding: 0 32rpx 20rpx;
      box-sizing: border-box;
      // #ifdef H5
      padding-top: 20rpx;
      // #endif
      &__box {
        width: 426rpx;
        height: 68rpx;
        background: #f7f7f8;
        border-radius: 8rpx;
      }

      &__switch {
        width: 152rpx;
        height: 54rpx;
        border-radius: 38rpx;
        background: #f7f7f8;
        border: 2rpx solid #f7f7f8;
        margin-left: 24rpx;

        .switch-name {
          height: 42rpx;
          line-height: 42rpx;
          font-size: 28rpx;
          color: #22284b;
        }
      }

      &__news {
        position: relative;
        width: 48rpx;
        height: 48rpx;
        margin-left: 24rpx;

        .news-badge {
          position: absolute;
          top: -6rpx;
          right: -10rpx;
        }
      }
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
        width: 152rpx;
        height: 54rpx;
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

    .animation-class {
      height: 0rpx;
      overflow: hidden;
    }

    &-state {
      box-sizing: border-box;
      margin-top: 40rpx;

      &__center {
        text-align: center;
      }

      &.more {
        height: 0;
        overflow: hidden;
        margin-top: 0;
      }
    }

    &-open {
      width: 750rpx;
      //margin-top: 40rpx;
    }

    &-channel {
      margin-top: 40rpx;
      padding: 0 32rpx;
      box-sizing: border-box;

      &__img {
        width: 256rpx;
        height: 104rpx;
      }

      &__explain {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: rgba(254, 243, 239, 0.7);
        backdrop-filter: blur(8rpx);
        border-top-right-radius: 200rpx;
        border-bottom-right-radius: 200rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: #f87020;
      }
    }

    &-padding {
      padding: 0 32rpx 32rpx;
    }

    &-paddings {
      padding: 0 32rpx 32rpx;
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

  .background-transparent {
    background: rgba(255, 255, 255, 0.45) !important;
    border: 2rpx solid #ffffff !important;
  }

  .background-gray {
    background: #f7f7f8 !important;
    border: 2rpx solid #f7f7f8 !important;
  }

  .suspension {
    z-index: 99;
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

  ::v-deep .zb_tooltip__popper {
    left: -60rpx !important;
  }
  .bg-f5f9ff {
    background-color: #f5f9ff !important;
  }
</style>
