<template>
  <view class="wrap">
    <!--  头部  -->
    <VoBatteryBar />
    <view class="wrap-tabs flex flex-justify-between flex-vertical-c">
      <EraTabs
        v-if="tabbarVal === 3"
        :current="currentTab"
        :list="tabsList"
        activeStyle="font-size: 18px;font-weight: bold;color: rgba(0, 0, 0, 0.85);"
        inactiveStyle="font-size: 16px;font-weight: 400;color: rgba(0, 0, 0, 0.45);"
        lineColor="transparent"
        @change="changeTabs"
        @click="tabClick"
      />
      <VoIcon name="setting-user" @click="goSettings" />
    </view>
    <!--  搜索  -->
    <view class="wrap-search flex flex-vertical-c" @click="goSearch">
      <VoSearch v-model="keyword" :height="34" :actionStyle="{ color: 'rgba(0, 0, 0, 0.85)' }" placeholder="请输入搜索" />
    </view>
    <!--  消息列表  -->
    <!-- 修复 ENG-5864 所改 -->
    <view v-show="currentTab === 0" class="wrap-scroll flex1">
      <ChatConainter ref="chatConainter" />
    </view>
    <scroll-view v-show="currentTab === 1" :scroll-y="true" class="wrap-scroll flex1">
      <IndexList ref="indexList" />
    </scroll-view>
    <!-- 修复 ENG-5864 所改 -->
<!--    <swiper :autoplay="false" :current="currentTab" class="flex1" @change="changeSwiper">-->
<!--      <swiper-item>-->
<!--        <view class="wrap-scroll flex1">-->
<!--          <ChatConainter ref="chatConainter" />-->
<!--        </view>-->
<!--      </swiper-item>-->
<!--      <swiper-item>-->
<!--        <scroll-view :scroll-y="true" class="wrap-scroll flex1">-->
<!--          <IndexList ref="indexList" />-->
<!--        </scroll-view>-->
<!--      </swiper-item>-->
<!--    </swiper>-->
  </view>
</template>

<script>
  import IndexList from '@/components/VoTabbarIm/components/IndexList'
  import ChatConainter from '@/components/VoTabbarIm/components/ChatConainter'

  export default {
    name: 'VoTabbarIm',
    components: { IndexList, ChatConainter },
    props: {
      tabbarVal: {
        type: Number,
        default: 0,
      },
      tabsList: {
        type: Array,
        default: function () {
          return [
            {
              name: '聊天',
            },
            {
              name: '通讯录',
            },
          ]
        },
      },
    },
    data() {
      return {
        keyword: '', // 搜索双向绑定

        currentTab: 0, // 横向tabs默认

        letterList: ['A', 'B', 'C'],
        itemArr: [
          ['列表A1', '列表A2', '列表A3'],
          ['列表B1', '列表B2', '列表B3'],
          ['列表C1', '列表C2', '列表C3'],
        ],
        // src: '/static/tabbar/user.png',
        indexList: [
          {
            url: '/static/tabbar/user.png',
            title: '我的服务商',
            label: '你问的这个发动机我们有货',
            time: '10:30',
            badge: true,
          },
          {
            url: '/static/icons/me.png',
            title: '互动消息',
            label: '向你求助',
            time: '10:30',
            src: '/static/icons/close-remind.png',
            badge: true,
          },
          {
            url: '/static/icons/me.png',
            title: '交易物流',
            label: '您的订单已签收',
            time: '10:30',
            src: '/static/icons/close-remind.png',
            badge: true,
          },
          {
            url: '/static/tabbar/user.png',
            title: 'XXX技术大咖2',
            label: '不会安装的话你看下我给你发的视频',
            time: '10:30',
            badge: true,
          },
        ],
        weakenList: [
          {
            url: '/static/tabbar/user.png',
            title: 'XXX技术大咖',
            label: '帮忙看下这个问题咋处理呀',
            time: '10:30',
            badge: false,
          },
          {
            url: '/static/icons/me.png',
            title: '服务通知',
            label: '3月钜惠活动开始了',
            time: '10:30',
            src: '/static/icons/close-remind.png',
            badge: false,
          },
          {
            url: '/static/icons/me.png',
            title: '陌生人消息',
            label: '方便吗，想咨询你一个问题',
            time: '10:30',
            src: '/static/icons/close-remind.png',
            badge: false,
          },
        ],
      }
    },
    computed: {
      keywords: () => {
        console.log(this.$storage.get('searchIm'))
        return this.$storage.get('searchIm')
      },
    },
    methods: {
      //刷新数据
      refreshData() {
        this.$refs.chatConainter._init_func(true)
      },
      /**
       * tabs
       * @param item
       */
      tabClick(item) {
        console.log('item', item)
      },
      changeTabs(e) {
        // console.log(e.index, 1111111111111)
        this.currentTab = e.index
        if (this.currentTab === 1) {
          this.$refs.indexList.getIndexList()
          this.$refs.indexList.initData()
        }
      },
      changeSwiper(e) {
        this.currentTab = e.detail.current
        console.log(this.currentTab)
        if (this.currentTab === 1) {
          this.$refs.indexList.getIndexList()
          this.$refs.indexList.initData()
        }
      },

      /**
       * 去我的关注页
       */
      goDetailsPage(index) {
        console.log(index, 'index')
        //去我的关注页
        if (index === 0) {
          this.$linkToEasy('/pagesSupplier/ImMessage/MyConcern')
        } else if (index === 1) {
          // 去关注我的页
          this.$linkToEasy('/pagesSupplier/ImMessage/AttentionToMy')
        } else if (index === 2) {
          // 去群聊页
          this.$linkToEasy('/pagesSupplier/ImMessage/GroupChat')
        }
      },
      /**
       * 去关注我的页
       */
      // 去搜索页面
      goSearch() {
        this.$linkToEasy('/pagesSupplier/ImMessage/SearchPage')
      },
      // 去聊天页面
      goChat() {
        this.$linkToEasy('/pagesAgent/ImCenter/ImMessage/ChatPage')
      },
      // 去互动消息
      goInteraction() {
        this.$linkToEasy('/pagesCommon/serviceMessagePage/InteractionPage')
      },
      // 去通知设置
      goSettings() {
        this.$linkToEasy('/pagesSupplier/ImMessage/NotificationSettings')
      },
      // 去交易物流
      goTransaction() {
        this.$linkToEasy('/pagesAgent/ImCenter/ImNotice/TransactionPage')
      },
      // 去服务通知
      goServiceNotification() {
        this.$linkToEasy('/pagesAgent/ImCenter/ImNotice/ServiceNotification')
      },
      // 去陌生人消息
      goStrangerMessage() {
        this.$linkToEasy('/pagesAgent/ImCenter/ImMessage/StrangerMessage')
      },
      // 去陌生人消息
      goDemo() {
        this.$linkToEasy('/pagesAgent/ImCenter/ImMessage/goDemo')
      },
      // 返回上一页
      returnFn() {
        this.$backFn()
      },
      initList() {},
    },
    onLoad(options) {
      this.initList()
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 750rpx;
    height: 100vh;
    padding-bottom: 130rpx;
    overflow-x: hidden;
    background-color: #f8f8f8;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    &-tabs {
      width: 100%;
      background: #ffffff;
      height: 96rpx;
      padding: 0 32rpx;
      box-sizing: border-box;
    }
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-scroll {
      height: calc(100% - 130rpx);
      overflow: scroll;
    }
    &-navigation {
      height: 100rpx;
      background-color: #fff;
      &__left {
        .left-return {
          width: 50rpx;
          height: 50rpx;
          margin: 0 20rpx;
        }
        .left-msg {
          font-size: 34rpx;
          margin: 0 16rpx;
        }
        .left-num {
          font-size: 26rpx;
        }
      }
      &__right {
        margin-right: 20rpx;
        .right-book {
          width: 40rpx;
          height: 40rpx;
          margin: 0 10rpx;
        }
      }
    }
    &-time {
      font-size: 30rpx;
      color: #c6c6c6;
      margin-bottom: 10rpx;
    }
    &-msg {
      &__close {
        width: 36rpx;
        height: 36rpx;
      }
      &__badge {
        margin-left: 10rpx;
      }
    }
    &-weaken {
      background-color: #fff;
      padding: 10rpx;
      border-radius: 10rpx;
      border-bottom: 2rpx solid rgb(214, 215, 217);
      &__icon {
        width: 30rpx;
        height: 30rpx;
        margin: 0 10rpx;
      }
      &__remind {
        font-size: 30rpx;
        color: #c6c6c6;
      }
    }

    &-list {
      padding: 20rpx;
      background-color: #fff;
      border-bottom: 2rpx solid rgb(214, 215, 217);
      &__photo {
        width: 80rpx;
        height: 80rpx;
        margin-right: 20rpx;
      }
      &__info {
        .info-title {
          &__name {
            font-size: 36rpx;
          }
          &__time {
            font-size: 36rpx;
            color: #c6c6c6;
          }
        }
        .info-msg {
          margin-top: 10rpx;
          &__con {
            font-size: 34rpx;
            color: #c6c6c6;
          }
          &__close {
            width: 36rpx;
            height: 36rpx;
          }
          &__badge {
            margin-left: 10rpx;
          }
        }
      }
    }
  }
</style>
