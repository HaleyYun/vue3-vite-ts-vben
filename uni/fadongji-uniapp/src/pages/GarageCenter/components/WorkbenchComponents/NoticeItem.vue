<template>
  <view class="notice">
    <view class="notice-bg">
      <!--      <view class="notice-bg__title flex flex-vertical-c">-->
      <!--        <image class="title-img" src="/static/supplier/home/announcement.png" />-->
      <!--        <view class="title-line" />-->
      <!--        <view class="flex1 lh36 fz-28 color-block">-->
      <!--          <u-notice-bar-->
      <!--            :text="announcementList"-->
      <!--            bgColor="#ffffff"-->
      <!--            color="rgba(0, 0, 0, 0.85)"-->
      <!--            direction="column"-->
      <!--            icon=""-->
      <!--            @click="noticeClick"-->
      <!--        /></view>-->
      <!--      </view>-->
      <view class="notice-bg__bottom">
        <u-line color="#F7F7F8" length="319" />
        <view class="bottom-swiper m-t-28">
          <view class="bottom-scroll" scroll-x="true">
            <block v-for="(item, index) in functionList" :key="index">
              <view
                v-if="item.show"
                class="flex flex-column flex-vertical-c flex-justify-between"
                @click="nextPage(item)"
              >
                <image :src="item.srcIcon" class="bottom-scroll__img" />
                <view class="lh36 fz-24 color-block white-space__nowrap">{{ item.funName }}</view>
              </view>
            </block>
          </view>
        </view>
        <!--        <swiper :current="current" class="bottom-swiper m-t-28" @change="changeCurrent">-->
        <!--          <swiper-item>-->
        <!--            <view class="bottom-scroll" scroll-x="true">-->
        <!--              <block v-for="(item, index) in functionList" :key="index">-->
        <!--                <view-->
        <!--                  v-if="item.show"-->
        <!--                  class="flex flex-column flex-vertical-c flex-justify-between"-->
        <!--                  @click="nextPage(item)"-->
        <!--                >-->
        <!--                  <image :src="item.srcIcon" class="bottom-scroll__img" />-->
        <!--                  <view class="lh36 fz-24 color-block white-space__nowrap">{{ item.funName }}</view>-->
        <!--                </view>-->
        <!--              </block>-->
        <!--            </view>-->
        <!--          </swiper-item>-->
        <!--          <swiper-item>-->
        <!--            <view class="bottom-scroll" scroll-x="true">-->
        <!--              <view-->
        <!--                v-for="(item, index) in functionList"-->
        <!--                :key="index"-->
        <!--                class="flex flex-column flex-vertical-c flex-justify-between"-->
        <!--                @click="nextPage(item)"-->
        <!--              >-->
        <!--                <image :src="item.srcIcon" class="bottom-scroll__img" />-->
        <!--                <view class="lh36 fz-24 color-block">{{ item.funName }}</view>-->
        <!--              </view>-->
        <!--            </view>-->
        <!--          </swiper-item>-->
        <!--        </swiper>-->
        <!--        <view class="bottom-indicator flex">-->
        <!--          <view v-if="current === 0" class="bottom-indicator__slider" />-->
        <!--          <view v-else-if="current === 1" class="bottom-indicator__slider m-l-16" />-->
        <!--        </view>-->
      </view>
    </view>
  </view>
</template>

<script>
  import { checkIsApproveFn } from '@/common/helper'
  import devConf from '@/common/env'

  export default {
    name: 'NoticeItem',
    props: {
      menuList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        current: 0,
        //公告列表
        announcementList: [],
        //公告列表用于传到详情页面的数据
        announcementDataList: [],
        functionList: [
          {
            srcIcon: '/static/garage/home/group1.png',
            funName: '买货',
            path: '/pagesGarage/ShopList/ShopList',
            show: true,
            noAuth: false, // 是否校验实名认证
          },
          // {
          //   srcIcon: '/static/garage/home/group2.png',
          //   funName: '发起回收',
          //   path: '/pagesGarage/RecoveryOrder/RecoveryValuation',
          //   show: true,
          //   noAuth: false, // 是否校验实名认证
          // },
          {
            srcIcon: '/static/garage/home/group3.png',
            funName: '申请售后',
            path: '/pagesGarage/PostSaleService/ApplyPostSaleService',
            show: true,
            noAuth: false, // 是否校验实名认证
          },
          {
            srcIcon: '/static/garage/home/group4.png',
            funName: '申请安装',
            path: '/pagesGarage/InstallOrder/InstallSupport',
            show: true,
            noAuth: false, // 是否校验实名认证
          },
          {
            srcIcon: '/static/garage/home/group5.png',
            funName: '技术指导',
            show: true,
            noAuth: false, // 是否校验实名认证
            path: '/pagesGarage/TechnicalGuidance/TechnicalGuidance',
          },
          {
            srcIcon: '/static/garage/home/group6.png',
            funName: '安装订单',
            show: true,
            noAuth: false, // 是否校验实名认证
            path: '/pagesGarage/InstallOrderUser/OrderList',
          },
          {
            srcIcon: '/static/garage/home/group7.png',
            funName: '回收订单',
            show: true,
            noAuth: false, // 是否校验实名认证
            path: '/pagesGarage/RecoveryOrder/RecoveryOrderList',
          },
          {
            srcIcon: '/static/supplier/home/menu_icon11.png',
            funName: '退货/退款',
            show: true,
            noAuth: false, // 是否校验实名认证
            path: '/pagesGarage/Order/ReturnExchange/RefundAfterSales',
          },
        ],
      }
    },
    created() {
      // this.getAnnouncementListRequest()
      this.initInfo()
    },
    methods: {
      initInfo() {
        let newVal = this.menuList.join(',')
        if (newVal.indexOf('买货') < 0) {
          this.functionList[0].show = false
        }
        if (newVal.indexOf('发起回收') < 0) {
          this.functionList[1].show = false
        }
        if (newVal.indexOf('申请售后') < 0) {
          this.functionList[2].show = false
        }
        if (newVal.indexOf('申请安装') < 0) {
          this.functionList[3].show = false
        }
        if (newVal.indexOf('技术指导') < 0) {
          this.functionList[4].show = false
        }
        if (newVal.indexOf('安装订单') < 0) {
          this.functionList[5].show = false
        }
        if (newVal.indexOf('回收订单') < 0) {
          this.functionList[6].show = false
        }
        if (newVal.indexOf('退货/退款') < 0) {
          this.functionList[7].show = false
        }
      },

      goUrl(url) {
        if (!checkIsApproveFn()) {
          this.$emit('updateApprove', true)
          return
        }
        this.$linkToEasy(url)
      },
      /**
       * 切换swiper
       */
      changeCurrent(e) {
        this.current = e.detail.current
      },
      nextPage(item) {
        // 为了清空万能喊数据
        this.$storage.remove('voiceRecords')
        if (!checkIsApproveFn() && !item.noAuth) {
          this.$emit('updateApprove', true)
          return
        }
        if (item.path === '/pagesGarage/InstallOrder/InstallSupport') {
          let info = this.$storage.get('noInstallNotice')
          if (info && info.userId === this.userInfo.id && info.noInstallNotice) {
            this.$linkToEasy('/pagesGarage/InstallOrder/InstallOrderList?origin=home')
          } else {
            this.$linkToEasy(item.path)
          }
        } else if (item.path === '/pagesGarage/RecoveryOrder/RecoveryValuation' && devConf.isPro) {
          uni.$u.toast('正在建设中，敬请期待')
        } else {
          this.$linkToEasy(item.path)
        }
      },
      noticeClick(index) {
        if (this.announcementList && this.announcementList.length > 0) {
          let data = this.announcementDataList[index]
          this.$linkToEasy(
            '/pagesGarage/UserCenter/AnnouncementDetail?data=' + JSON.stringify(data),
          )
          return
        }
        console.log('没有公告')
      },
      //获取公告列表
      getAnnouncementListRequest() {
        let params = {
          type: 4,
        }
        this.$VoHttp
          .apiContentMessageLogAnnouncementList(params)
          .then((res) => {
            if (res.code === '20001') {
              let data = res.data.records
              this.announcementDataList = data
              data.forEach((item) => {
                this.announcementList.push(item.title)
              })
            } else {
              console.log('获取公告列表失败', res.message)
            }
          })
          .catch((err) => {
            console.log('获取公告列表失败', err.message)
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .notice {
    width: 750rpx;
    padding: 0 32rpx 32rpx;
    box-sizing: border-box;

    &-bg {
      //border-radius: 16rpx;
      border-bottom-left-radius: 16rpx;
      border-bottom-right-radius: 16rpx;
      overflow: hidden;
      background: #fff;

      &__title {
        width: 100%;
        padding: 22rpx 18rpx;
        box-sizing: border-box;

        .title-img {
          width: 78rpx;
          height: 32rpx;
          margin-right: 10rpx;
        }

        .title-line {
          width: 2rpx;
          height: 24rpx;
          background: rgba(0, 0, 0, 0.08);
        }
      }

      &__agent {
        .agent-line {
          margin: auto !important;
        }

        .agent-padding {
          padding: 24rpx 32rpx 36rpx;
          box-sizing: border-box;

          &__whole {
            width: 192rpx;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
            mix-blend-mode: normal;
            border-radius: 200rpx;
            color: #ffffff;
            font-size: 28rpx;
          }
        }
      }

      &__bottom {
        //height: 398rpx;
        padding: 0 24rpx 32rpx 24rpx;
        box-sizing: border-box;

        .bottom-swiper {
          height: 296rpx;
        }

        .bottom-scroll {
          height: 100%;
          display: grid;
          grid-template-columns: 96rpx 96rpx 96rpx 108rpx;
          grid-template-rows: 132rpx 132rpx;
          grid-column-gap: 82rpx;
          grid-row-gap: 32rpx;

          &__img {
            width: 88rpx;
            height: 88rpx;
          }
        }

        .bottom-indicator {
          width: 32rpx;
          height: 6rpx;
          background: rgba(0, 0, 0, 0.15);
          border-radius: 20rpx;
          overflow: hidden;
          margin: 24rpx auto;

          &__slider {
            width: 16rpx;
            height: 6rpx;
            background: #ff5c26;
            border-radius: 20rpx;
            overflow: hidden;
          }
        }
      }
    }
  }

  .white-space__nowrap {
    white-space: nowrap;
  }
</style>
