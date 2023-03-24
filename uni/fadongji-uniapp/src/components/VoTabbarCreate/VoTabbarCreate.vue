<template>
  <view class="h-full">
    <view class="create-circle">
      <view class="fix-btn" @click.stop="chooseType">
        <!--        <VoIcon-->

        <!--          v-show="tabsValue === 'find' || tabsValue === 'question' || tabsValue === 'video'"-->

        <!--          :size="60"-->

        <!--          class=""-->

        <!--          name="plus-origin"-->

        <!--        />-->

        <image class="fix-btn__image" src="/static/common/release.png" />
      </view>

      <view :style="{ height: statusBarHeight + 'px' }" class="create-circle__status" />

      <view v-show="tabsValue === 'live'" class="fix-btn live" @click.stop="toLive()">
        发起直播
      </view>

      <!--    <view class="self-tootip" v-show="actionShow">-->

      <!--      <view class="row" v-for="(item, index) in actionList" :key="index" @click="selectClick(item)">-->

      <!--        {{ item.name }}-->

      <!--      </view>-->

      <!--    </view>-->

      <view class="fix-top">
        <view v-if="tabbarVal === 2" class="fix-top__tabs">
          <!--          <EraTabs-->

          <!--            :current="current"-->

          <!--            :list="tabs"-->

          <!--            activeStyle="font-size: 36rpx;color: rgba(0, 0, 0, 0.85);font-weight: bold"-->

          <!--            class="tabs"-->

          <!--            inactiveStyle="font-size: 32rpx;color: rgba(0, 0, 0, 0.45)"-->

          <!--            itemStyle="padding: 24rpx 28rpx"-->

          <!--            lineColor="transparent"-->

          <!--            @change="tabChange"-->

          <!--          />-->

          <EraTabs
            :current="current"
            :lineColor="'transparent'"
            :list="tabs"
            activeStyle="font-size: 40rpx;font-weight: bold;color: rgba(0, 0, 0, 0.85);"
            class="tabs"
            inactiveStyle="font-size: 32rpx;font-weight: 400; color: rgba(0,0,0,0.45)"
            itemStyle="flex:1;padding:20rpx;"
            @change="tabChange"
          />

          <VoIcon :size="24" class="icon1" name="customer-service-new" @click="showActionPop()" />

          <!--          <image-->
          <!--            :src="userInfo.photoUrl || '/static/default_avatar.png'"-->
          <!--            class="common-icon user-img"-->
          <!--            @click="toPersonHome()"-->
          <!--          />-->
        </view>

        <view class="top-search">
          <VoSearch
            v-model="content"
            :actionStyle="{ color: 'rgba(0, 0, 0, 0.85)' }"
            disabled
            placeholder="请输入关键字搜索"
            :height="34"
            @click="$linkToEasy('/pagesCommon/CreateSearchPage/CreateSearchPage')"
            @custom="searchFn"
          >
            <view slot="leftIcon"></view>
          </VoSearch>
          <!--          <VoSearch-->
          <!--            ref="search"-->
          <!--            v-model="content"-->
          <!--            :show-action="false"-->
          <!--            bgColor="#fff"-->
          <!--            borderColor="#373a4e"-->
          <!--            clearabled-->
          <!--            disabled-->
          <!--            placeholder="请输入您想搜索的内容"-->
          <!--            shape="square"-->
          <!--            @clear="refreshData(1)"-->
          <!--            @click="$linkToEasy('/pagesCommon/CreateSearchPage/CreateSearchPage')"-->
          <!--          >-->
          <!--            <view slot="suffix">-->
          <!--              <view @click.stop="clearFn">-->
          <!--                <VoIcon v-if="content" :opacity="0.85" color="#000000" name="close" size="20" />-->
          <!--              </view>-->
          <!--            </view>-->
          <!--          </VoSearch>-->
        </view>

        <!-- 筛选栏目 -->
        <FilterTags
          v-show="showNav && (tabsValue === 'question' || tabsValue === 'video')"
          :badge="fliterValue.length"
          :style="{ opacity: opacity }"
          :tagList="tagList"
          @rightClick="showFilter"
          @tagClick="tagClick"
        >
          <FilterPop
            ref="filterPop"
            :businessType="current === 1 ? 2 : 0"
            isTop
            @close="closeFilter"
            @confirm="filterConfirm"
            @reset="fliterValue = []"
          />
        </FilterTags>
      </view>

      <!-- <view class="main-content">

      <CreatedQuestion v-show="tabsValue === 'question'" />

      <CreatedVideoList v-show="tabsValue === 'video'" />

      <CreatedTicket v-show="tabsValue === 'ticket'" />

      <CreatedLive v-show="tabsValue === 'live'" />

    </view> -->

      <swiper :current="current" class="swiper" @change="swiperChange">
        <!--    注释发现相关    -->

        <!--        <swiper-item>-->

        <!--          <CreatedFind ref="createdFind" />-->

        <!--        </swiper-item>-->

        <swiper-item>
          <CreatedQuestion
            ref="createdQuestion"
            @onScroll="onScroll"
            @showReport="showReport"
            @showShare="showShare"
          />
        </swiper-item>

        <swiper-item>
          <CreatedVideoList  @showReport="showReport" ref="createdVideo" :show-nav="showNav" @onScroll="onScroll" />
        </swiper-item>

        <!-- <swiper-item>

          <CreatedLive />

        </swiper-item> -->
      </swiper>

      <!--      <VoSafetyArea :is-fixed="false" />-->

      <VoHelpAction ref="helpRef" />
    </view>

    <!--  底部悬浮start  -->

    <block v-if="isLogin">
      <view
        v-if="+currentUserFullInfo.checkStatus === -1 || +currentUserFullInfo.checkStatus === 0"
        class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
      >
        <view class="suspension__tips">当前为游客模式，体验更多功能，请先进行认证</view>

        <view class="suspension__button" @click="goApproveFn">立即认证</view>
      </view>

      <view
        v-else-if="Number(currentUserFullInfo.checkStatus) === 4"
        class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
      >
        <view class="suspension__tips">为保障认证信息是本人真实操作，请验证手机号</view>

        <view class="suspension__button" @click="goApproveFn">去验证</view>
      </view>

      <view
        v-else-if="Number(currentUserFullInfo.checkStatus) === 2"
        class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
      >
        <view class="suspension__tips m-l-16">认证未通过，请重新进行认证。</view>

        <view class="suspension__button" @click="goApproveFn">立即认证</view>
      </view>

      <view
        v-else-if="Number(currentUserFullInfo.checkStatus) === 1"
        class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
      >
        <view class="suspension__tips m-l-16">信息正在认证审核中，请耐心等待...</view>

        <view class="suspension__button bg" @click="goApproveFn">审核中</view>
      </view>
    </block>

    <!--  底部悬浮end  -->

    <u-popup :round="6" :safeAreaInsetBottom="false" :show="showPro" @close="close" @open="open">
      <VoHairProblem
        @clickIdea="goReleaseIdea"
        @clickQuestion="goReleaseQuestion"
        @clickVideo="goReleaseVideo"
        @close="close"
      />

      <!--      <VoSafetyArea :isFixed="false" bgColor="#f6f7f8"></VoSafetyArea>-->
    </u-popup>

    <!-- 举报弹层 -->

    <VoActionSheet
      v-show="showAction"
      :actions="actions"
      :show="showAction"
      cancelText="取消"
      class="action-sheet"
      @close="showAction = false"
      @select="actionSelect"
    />

    <!-- 分享 -->

    <VoShareView ref="shareView" @shareFn="shareFn" />

    <EraApproveModal :show.sync="showApprove" />
  </view>
</template>

<script>
  import CreatedQuestion from './components/CreatedQuestion'

  import CreatedFind from './components/CreatedFind'

  import CreatedVideoList from './components/CreatedVideoList'

  import CreatedTicket from './components/CreatedTicket'

  import CreatedLive from './components/CreatedLive'

  import FilterPop from './components/FilterPop.vue'

  import FilterTags from './components/FilterTags.vue'

  import devConf from '@/common/env'

  import helpUtil, {
    checkIsApproveFn,
    checkIsLogin,
    getUserCheckStatus,
    linkToEasy,
  } from '@/common/helper'

  import store from '@/store'

  import { hideLoading, showLoading } from '../../common/helper'

  export default {
    name: 'AgentTabbarCreate',

    components: {
      CreatedQuestion,

      CreatedVideoList,

      CreatedTicket,

      CreatedLive,

      FilterPop,

      CreatedFind,

      FilterTags,
    },

    props: {
      tabbarVal: {
        type: Number,

        default: 0,
      },
    },

    data() {
      return {
        showApprove: false,

        currentUserFullInfo: {},

        showPro: false,

        tabsValue: 'question',

        current: 0,

        tabs: [
          // {

          //   name: '发现',

          //   value: 'find',

          //   choosed: false,

          //   index: 0,

          // },

          {
            name: '问答',

            value: 'question',

            choosed: true,

            index: 0,
          },

          {
            name: '视频',

            value: 'video',

            choosed: false,

            index: 1,
          },

          // {

          //   name: '直播',

          //   value: 'live',

          //   choosed: false,

          //   index: 3,

          // },
        ],

        showAction: false,

        actions: [
          {
            name: '举报作者',

            color: 'rgba(0, 0, 0, 0.85)',

            fontSize: '14',
          },

          {
            name: '举报内容',

            color: 'rgba(0, 0, 0, 0.85)',

            fontSize: '14',
          },

          {
            name: '拉黑用户',

            color: 'rgba(0, 0, 0, 0.85)',

            fontSize: '14',
          },
        ],

        tagList: [
          {
            name: '全部',

            choosed: true,
          },
        ],

        actionList: [
          {
            name: '发问题',

            value: '1',
          },

          {
            name: '发想法',

            value: '2',
          },

          {
            name: '发视频',

            value: '3',
          },
        ],

        actionShow: false,

        //筛选组件显隐

        showNav: true,

        //筛选组件显隐

        filterVisible: false,

        // 顶部安全距离

        statusBarHeight: 0,

        // 筛选值

        fliterValue: [],

        columnId: '', //筛选栏目Id

        reportData: '', //被举报数据

        shareData: '', //分享数据

        opacity: 1, //筛选栏透明度

        timer: null,

        content: '',

        isLogin: false,
      }
    },

    created() {
      this.isLogin = checkIsLogin()

      if (this.isLogin) {
        store.dispatch('user/getFullUserInfo').then((res) => {
          this.currentUserFullInfo = res
        })
      }

      this.tabsValue = 'question'

      const res = uni.getSystemInfoSync()

      console.log('safeArea', res.statusBarHeight)

      this.statusBarHeight = res.statusBarHeight

      uni.$off('releaseCompleteFn')

      uni.$on('releaseCompleteFn', (data) => {
        //发布之后会给circleCurrent复制，发布之后返回对应模块

        console.log(data, '9999999999')

        if (data && data.current) {
          this.current = data.current - 1
        }

        this.refreshData()
      })
    },

    mounted() {
      console.log('请求数据')

      uni.$off('searchCreate')

      uni.$on('searchCreate', (data) => {
        this.content = data

        this.$storage.set('searchCreate', data || '')

        console.log(this.content)

        this.refreshData()
      })
      console.log('uni.getSystemInfoSync().platform', uni.getSystemInfoSync().platform)
      this.refreshData()

      // #ifdef APP-PLUS
      // 此处使用!==无法得到想要的结果
      // if (uni.getSystemInfoSync().platform != 'android') {
      //   console.log('非安卓平台')

      //   this.refreshData()
      // }
      // #endif
    },

    methods: {
      searchFn() {
        this.$linkToEasy('/pagesCommon/CreateSearchPage/CreateSearchPage')
      },
      clearFn() {
        this.$refs.search.clear()
      },
      /**
       * 刷新问答
       */
      answerRefresh() {
        this.$refs.createdQuestion.onRefresh()
      },
      /**
       * @description 技术工认证跳转
       */
      skillApproveFn() {
        if (this.userInfo.checkStatus == 0) {
          this.$linkToEasy('/pagesEngineer/AuthenticationInformation/EngineerAccounts')
          return
        } else if (this.userInfo.checkStatus == 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus == -1) {
          this.$linkToEasy('/pages/CommonLogin/CompleteInfo?roleCode=' + this.userInfo.roleCode)
          return
        }
        this.$linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
      },
      /**
       * @description 汽修厂认证跳转
       */
      garageApproveFn() {
        if (+this.userInfo.checkStatus === 0) {
          this.$linkToEasy('/pages/AuthenticationInformation/GarageAccounts')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          this.$linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus == -1) {
          this.$linkToEasy('/pages/CommonLogin/CompleteInfo?roleCode=' + this.userInfo.roleCode)
          return
        }

        this.$linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
      },
      /**
       * @description 服务商认证跳转
       */
      agentApproveFn() {
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {
          //companyType   企业类型（2：企业会员, 3：个人会员）
          if (Number(this.userInfo.companyType) === 2) {
            linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
            return
          } else if (Number(this.userInfo.companyType) === 3) {
            linkToEasy('/pages/AuthenticationInformation/AgentAccount')
            return
          }
          // 如果是服务商
          linkToEasy('/pages/AuthenticationInformation/PublicAccounts')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus === -1) {
          this.showApprove = true
          return
        }
        if (this.userInfo.roleCode == 'garage') {
          linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
          return
        }

        linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      /**
       * @description 供应商认证跳转
       */
      supplierApproveFn() {
        console.log(this.userInfo.checkStatus)
        if (+this.userInfo.checkStatus === 0 || this.userInfo.checkStatus == -1) {
          linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus == -1) {
          this.$linkToEasy('/pages/CommonLogin/CompleteInfo?roleCode=supplier')
          return
        }

        linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },

      /**
       * @description 旧机买家认证跳转
       **/
      oldMachineFn() {
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {
          linkToEasy('/pagesOldBuyer/HomeJumpPage/GarageAccounts')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus === -1) {
          this.showApprove = true
          return
        }

        linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      },
      goApproveFn() {
        if (this.userInfo.platformCode === 'supplier') {
          // 供应商
          this.supplierApproveFn()
        } else if (this.userInfo.platformCode === 'agent') {
          // 服务商
          this.agentApproveFn()
        } else if (this.userInfo.platformCode === 'garage') {
          // 汽修厂
          this.garageApproveFn()
        } else if (this.userInfo.platformCode === 'skilledWorker') {
          // 技术工
          this.skillApproveFn()
        } else if (this.userInfo.platformCode === 'oldMachine') {
          // 旧机买家
          this.oldMachineFn()
        }
      },

      // agentApproveFn() {
      //   // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
      //   if (+this.userInfo.checkStatus === 0) {
      //     //companyType   企业类型（2：企业会员, 3：个人会员）
      //     if (Number(this.userInfo.companyType) === 2) {
      //       linkToEasy('/pages/AuthenticationInformation/FirstStepDefault')
      //       return
      //     } else if (Number(this.userInfo.companyType) === 3) {
      //       linkToEasy('/pages/AuthenticationInformation/AgentAccount')
      //       return
      //     }
      //     // 如果是服务商
      //     linkToEasy('/pages/AuthenticationInformation/PublicAccounts')
      //     return
      //   } else if (+this.userInfo.checkStatus === 4) {
      //     linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
      //     return
      //   } else if (this.userInfo.checkStatus === -1) {
      //     this.showApprove = true
      //     return
      //   }
      //   if (this.userInfo.roleCode == 'garage') {
      //     linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
      //     return
      //   }
      //   linkToEasy('/pagesCommon/StoreInfo/ApproveInfo')
      // },

      //刷新数据

      refreshData(isClear) {
        console.log('刷新数据')

        // console.log(this.$storage.get('searchCreate'))

        // if (this.$storage.get('searchCreate')) {

        //   this.content = this.$storage.get('searchCreate')

        // }

        if (isClear) {
          this.content = null

          this.$storage.remove('searchCreate')
        }

        console.log(this.current)

        // if (this.content > 0) {

        //   this.getTagList()

        // }

        // if (this.current === 0) {

        //   this.$refs.createdFind?.getData(true)

        // }

        // let columnId = this.fliterValue.length ? this.fliterValue[0].id : this.columnId

        // if (this.current === 1) {

        //   this.$refs.createdQuestion?.getData(columnId, true)

        // }

        // if (this.current === 2) {

        //   this.$refs.createdVideo?.getData(columnId, true)

        // }

        // 配合注释发现

        this.getTagList()

        let columnId = this.fliterValue.length ? this.fliterValue[0].id : this.columnId

        if (this.current === 0) {
          this.$refs.createdQuestion?.getData(columnId, true)
        }

        if (this.current === 1) {
          this.$refs.createdVideo?.getData(columnId, true)
        }
      },

      reachBottom() {
        console.log('触底')
      },

      tabChange(tab) {
        console.log(tab)

        this.tabsValue = tab.value

        this.tabs.forEach((item) => {
          if (item.value === tab.value) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })

        this.current = tab.index

        if (tab.value === 'creat') {
          this.$linkToEasy('/pagesAgent/CreatedCenter/CreatedProject/CreatedProject')
        }

        // if (tab.index > 0) {

        //   this.getTagList()

        // }

        this.getTagList()
      },

      selectClick(item) {
        if (item.value === '3') {
          uni.chooseVideo({
            sourceType: ['camera', 'album'],

            success: function (res) {
              console.log(res.tempFilePath)
            },
          })
        } else {
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/CreatedQuestion/PostQuestion?type=' + item.value,
          )
        }
      },

      async chooseType() {
        if (!this.isLogin) return

        if (!checkIsApproveFn()) {
          this.showApprove = true
          return
        }

        //检查是否可以发表评论

        let val = await getUserCheckStatus()

        console.log('getUserCheckStatus()', val)

        if (val) {
          this.showPro = true
        } else {
          this.$u.toast('当前用户禁止发布言论~~')
        }
      },

      open() {
        // console.log('open');
      },

      /**

       * 关闭发布弹框

       */

      close() {
        this.showPro = false
      },

      /**

       * 去发想法

       */

      goReleaseIdea() {
        this.showPro = false

        this.$linkToEasy('/pagesAgent/CreatedCenter/ReleaseCircle/ReleaseIdea')
      },

      /**

       * 去发问题

       */

      goReleaseQuestion() {
        this.showPro = false

        this.$linkToEasy('/pagesAgent/CreatedCenter/ReleaseCircle/ReleaseQuestion')
      },

      /**

       * 去发视频

       */

      goReleaseVideo() {
        this.showPro = false

        this.$linkToEasy('/pagesAgent/CreatedCenter/ReleaseCircle/ReseaseVideo')
      },

      toLive() {
        this.$linkToEasy('/pagesAgent/CreatedCenter/CreatedLive/LiveCreate')
      },

      //swiper切换

      swiperChange(event) {
        console.log(event)

        this.current = event.detail.current

        this.fliterValue = []

        // if (this.current > 0) {
        //   this.getTagList()
        // }
        this.getTagList()

        // if (this.current === 0) {

        //   this.tabsValue = 'find'

        //   this.$refs.createdFind.getData(true)

        // } else if (this.current === 1) {

        //   this.tabsValue = 'question'

        //   this.$refs.createdQuestion.getData('', true)

        // } else if (this.current === 2) {

        //   this.tabsValue = 'video'

        //   this.$refs.createdVideo.getData('', true)

        // }

        // 先注释发现

        if (this.current === 0) {
          this.tabsValue = 'question'

          this.$refs.createdQuestion.getData('', true)
        } else if (this.current === 1) {
          this.tabsValue = 'video'

          this.$refs.createdVideo.getData('', true)
        }

        this.showNav = true

        this.$refs.filterPop?.close()

        this.closeInnerAudioContext()
      },

      //页面滚动事件

      onScroll(e) {
        if (e.detail.scrollTop <= 0) {
          this.showNav = true

          return false
        }

        //2秒之内不滚动视为停止滚动

        clearTimeout(this.timer)

        // uni.$u.throttle(() => {}, 500)

        this.showNav = false

        //滚动停止显示筛选栏
        this.timer = null
        this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          this.showNav = true
        }, 2000)

        // if (e.detail.deltaY < 0) {

        //   //如果在两秒内进行了多次操作，只触发一次

        //   uni.$u.throttle(() => {

        //     this.showNav = false

        //   }, 500)

        // } else {

        //   uni.$u.throttle(() => {

        //     this.showNav = true

        //   }, 500)

        //   this.opacity = 1

        // }
      },

      //筛选栏显示

      showFilter() {
        this.filterVisible = !this.filterVisible

        if (this.filterVisible) {
          this.$refs.filterPop.show(this.fliterValue)

          this.$emit('updatepops', true)
        } else {
          this.$refs.filterPop.close()

          this.$emit('updatepops', false)
        }
      },

      //点击遮罩层关闭筛选弹框

      closeFilter() {
        this.$emit('updatepops', false)

        this.filterVisible = false
      },

      //获取栏目数据只取前三个

      getTagList() {
        this.$VoHttp

          .apiCreateColumnList({ businessType: this.current === 1 ? 2 : 0 }, { noLoading: true })

          .then((res) => {
            let columnList = res.data

            this.tagList = [
              {
                name: '全部',

                choosed: true,
              },
            ]

            columnList.forEach((item, index) => {
              if (index < 3) {
                this.tagList.push({
                  name: item.columnName,

                  choosed: false,

                  id: item.id,
                })
              }
            })
          })
      },

      //重置外层筛选数据

      resetFilter() {
        this.tagList.forEach((item) => {
          if (item.name === '全部') {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
      },

      //外层筛选点击事件

      tagClick(detail) {
        //重置内层筛选

        // this.$refs.filterPop.reset()

        // console.log('detail', detail)

        if (detail.id) {
          this.columnId = detail.id

          this.$refs.createdQuestion.getData(detail.id, true)

          this.$refs.createdVideo.getData(detail.id, true)
        } else {
          this.columnId = ''

          this.$refs.createdQuestion.getData('', true)

          this.$refs.createdVideo.getData('', true)
        }
      },

      //内部筛选事件

      filterConfirm(detail) {
        console.log('detail', detail)

        if (detail.selectList1.length) {
          this.fliterValue = detail.selectList1

          console.log('bage', this.fliterValue)

          this.$refs.createdQuestion.getData(detail.selectList1[0].id, true)

          this.$refs.createdVideo.getData(detail.selectList1[0].id, true)

          this.resetFilter()
        } else {
          this.$refs.createdQuestion.getData(this.columnId, true)

          this.$refs.createdVideo.getData(this.columnId, true)
        }

        this.$refs.filterPop.close()
      },

      //举报弹层选择

      actionSelect(e) {
        console.log(e.name)

        if (e.name === '举报作者') {
          showLoading()

          setTimeout(() => {
            hideLoading()

            this.$u.toast('举报成功')
          }, 1500)

          return
        }

        if (e.name === '拉黑用户') {
          showLoading()

          setTimeout(() => {
            hideLoading()

            this.$u.toast('拉黑成功')
          }, 1000)

          return
        }

        if (e.name === '举报内容') {
          this.$linkToEasy(
            '/pagesAgent/CreatedCenter/AnswerAll/CircleReport?data=' +
              JSON.stringify(this.reportData),
          )

          return
        }
      },

      showActionPop() {
        if (!this.isLogin) return

        // this.showAction = true

        this.$refs.helpRef.open()
      },

      //举报

      showReport(obj) {
        // console.log('举报33')
        this.$emit('showReport', obj)
        // this.showAction = true

        // this.reportData = obj
      },

      //分享

      showShare(obj) {
        this.shareData = obj

        this.$refs.shareView.showShare(true)
      },

      //分享

      shareFn(type) {
        console.log('shareFn', type)

        this.$refs.shareView.cancle()

        let path = ''

        if (this.shareData.businessType === 0) {
          //问题

          path = '/pagesAgent/CreatedCenter/AnswerAll/NonAuthorAnswer?id=' + this.shareData.id
        } else if (this.shareData.businessType === 3) {
          //回答

          path =
            '/pagesAgent/CreatedCenter/CircleDetail/AnswerDetail?id=' +
            this.shareData.id +
            '&businessType=' +
            this.shareData.businessType
        } else {
          //想法

          path =
            '/pagesAgent/CreatedCenter/CircleDetail/CircleDetail?id=' +
            this.shareData.id +
            '&businessType=' +
            this.shareData.businessType
        }

        helpUtil

          .shareWeixin({
            scene: type,

            title: this.shareData.title,

            path: devConf.shareBaseUrl + path,

            imageUrl: this.shareData.image ? this.shareData.image[0] : '',
          })

          .then((res) => {
            console.log('res分享', res)
          })

          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
      },

      toPersonHome() {
        if (!this.isLogin) return

        this.$linkToEasy('/pagesAgent/PersonalHomepage/PersonalHomepage')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .create-circle {
    width: 750rpx;

    height: 100%;

    overflow: hidden;

    position: relative;

    display: flex;

    flex-direction: column;

    background: #f7f7f8;

    font-size: 28rpx;

    &__status {
      background-color: #ffffff;
    }

    .swiper {
      flex: 1;
    }

    .main-content {
      flex: 1;

      // padding-bottom: 65px;
    }

    .fix-btn {
      position: fixed;

      bottom: 330rpx;

      right: 20px;

      z-index: 99;

      &__image {
        width: 120rpx;

        height: 120rpx;
      }

      &.live {
        // line-height: 25px;

        // font-size: 18px;

        // padding: 5px;
      }
    }

    .self-tootip {
      position: fixed;

      bottom: 150px;

      right: 10px;

      z-index: 99;

      line-height: 20px;

      text-align: center;

      background: #fff;

      width: 80px;
    }

    .fix-top {
      background: #fff;

      &__tabs {
        display: flex;

        align-items: center;

        .tabs {
          flex: 1;
        }

        .icon1 {
          position: absolute;
          right: 32rpx;
        }
      }

      .top-search {
        padding: 12rpx 32rpx;

        box-sizing: border-box;

        background: #fff;

        position: relative;

        .deleteIcon {
          position: absolute;

          top: 22rpx;

          right: 40rpx;
        }

        .suffix-icon {
          width: 48rpx;

          height: 48rpx;
        }
      }
    }

    .common-icon {
      width: 48rpx;

      height: 48rpx;
    }

    .user-img {
      border-radius: 50%;
    }

    .self-tabs {
      width: 100%;

      display: flex;

      border-bottom: 1px solid #eee;

      .self-tabs-item {
        text-align: center;

        line-height: 26px;

        width: 20%;
      }

      .self-tabs-item.choosed {
        border-bottom: 1px solid #999;
      }
    }

    .action-sheet {
      color: $v-c0-85 !important;
    }
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
  ::v-deep .u-tabs__wrapper__nav {
    justify-content: center;
  }
  ::v-deep .u-tabs__wrapper__nav__item__text {
    padding: 0 12rpx;
  }
</style>
