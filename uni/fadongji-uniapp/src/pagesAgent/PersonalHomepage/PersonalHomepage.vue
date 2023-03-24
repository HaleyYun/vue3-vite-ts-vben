<template>
  <view class="home">
    <view v-if="showActiveNav" class="home-active">
      <VoNav
        :is-fixed="false"
        :left-width="200"
        :title="userinfo.nickName || userinfo.userName"
        is-hack
        isHaveMore
      />
      <!-- <view class="nav white">
        <VoIcon :opacity="0.45" color="#000000" name="left-arrow" @click="showActiveNav = false" />
        <view class="nav-name">{{ userinfo.nickName }}</view>
        <view class="nav-right">
          <VoIcon :opacity="0.45" color="#000000" name="more" @click="showDirect = true" />
        </view>
      </view> -->
      <view class="tabs">
        <EraTabs
          :current="current"
          :itemStyle="{ padding: '24rpx', width: '50%' }"
          :list="tabList"
          :scrollable="false"
          @change="tabChange"
        />
      </view>
    </view>
    <view
      v-else
      :style="{
        height: $systemInfo.statusBarHeight * 2 + 634 + 'rpx',
      }"
      class="home-top"
    >
      <image class="home-top__bg" src="/static/common/home_bg.png" />
      <view class="home-top__content">
        <u-gap :height="$systemInfo.statusBarHeight" />
        <view class="nav">
          <VoIcon color="#ffffff" name="left-arrow" @click="toBack" />
          <view class="nav-right" @click.stop="showDirect = true">
            <VoIcon color="#ffffff" name="more" />
          </view>
        </view>
        <view class="user">
          <view class="user-ava">
            <image
              v-if="userinfo.checkStatus === 4"
              class="user-ava__frame"
              src="/static/icons/head.png"
            />
            <image :src="userinfo.photoUrl || '/static/default_avatar.png'" class="user-ava__img" />
            <VoIcon v-if="userinfo.checkStatus === 4" :size="16" class="v-icon" name="v-icon" />
          </view>
          <view class="user-right">
            <view class="user-right__name">{{ userinfo.nickName || userinfo.userName }}</view>
            <view class="user-right__btm">
              <view class="btm-text">
                <view class="address">{{ userinfo.areaFullName }}</view>
                <view class="fz-24 m-t-4">{{ userinfo.storeName || '' }}</view>
              </view>
              <view class="btm-btn">
                <view
                  v-if="!optionsId || optionsId === userInfo.id || focusStatus === -1"
                  class="btm-btn__item"
                  @click="toEdit"
                  >编辑资料</view
                >
                <block v-else>
                  <view v-if="focusStatus === 0" class="btm-btn__item yellow" @click.stop="toFocus"
                    >关注</view
                  >
                  <view
                    v-if="focusStatus === 1"
                    class="btm-btn__item"
                    @click.stop="confirmFocusCancel"
                    >已关注</view
                  >
                  <view
                    v-if="focusStatus === 2"
                    class="btm-btn__item"
                    @click.stop="confirmFocusCancel"
                    >互相关注</view
                  >
                  <view class="btm-btn__item" @click="toImRoom">
                    <VoIcon :size="16" color="#ffffff" name="commit" />
                  </view>
                </block>
              </view>
            </view>
          </view>
        </view>
        <view class="tip">{{ userinfo.synopsis || '暂无个性签名' }}</view>
        <view class="btns">
          <view v-for="item in btns" :key="item.text" class="btns-item" @click="goPage(item)">
            <view class="btns-item__num">{{ staticData[item.name] }}</view>
            <view class="btns-item__text">{{ item.text }}</view>
          </view>
          <view
            v-if="!optionsId || optionsId === userInfo.id || focusStatus === -1"
            class="btns-item"
            @click="goCollectPage()"
          >
            <view class="btns-item__num">{{ staticData.myselfCollectNum || 0 }}</view>
            <view class="btns-item__text">收藏</view>
          </view>
        </view>

        <view class="tabs">
          <EraTabs
            :current="current"
            :itemStyle="{ padding: '24rpx', width: '50%' }"
            :list="tabList"
            :scrollable="false"
            @change="tabChange"
          />
        </view>
      </view>
    </view>
    <block v-if="optionsId">
      <view v-if="focusStatus === 0" class="swiper border">
        <VoNoData no-data-tips="这位大咖很有趣，关注他有机会成为您的好友哦！ " />
      </view>
      <view v-else-if="focusStatus === 3" class="swiper border">
        <VoNoData no-data-tips="该用户已加入黑名单！ " />
      </view>
      <swiper v-else :current="current" class="swiper flex1" @change="swiperChange">
        <swiper-item class="swiper-item">
          <HomeQuestion
            v-if="userId"
            ref="homeQuestion"
            :userId="userId"
            @onScroll="onScroll"
            @showMorePop="showMorePop"
            @showShare="showShare"
          />
        </swiper-item>
        <swiper-item class="swiper-item">
          <HomeVideo
            v-if="userId"
            ref="homeVideo"
            :pageType="'homeVideo'"
            :userId="userId"
            @onScroll="onScroll"
          />
        </swiper-item>
      </swiper>
    </block>
    <swiper v-else :current="current" class="swiper flex1" @change="swiperChange">
      <swiper-item class="swiper-item">
        <HomeQuestion
          v-if="userId"
          ref="homeQuestion"
          :userId="userId"
          @onScroll="onScroll"
          @showMorePop="showMorePop"
          @showShare="showShare"
        />
      </swiper-item>
      <swiper-item class="swiper-item">
        <HomeVideo
          v-if="userId"
          ref="homeVideo"
          :pageType="'homeVideo'"
          :userId="userId"
          @onScroll="onScroll"
        />
      </swiper-item>
    </swiper>
    <!-- 举报 -->
    <ActionPopup
      ref="actionPopup"
      :focusStatus="focusStatus"
      @confirmFocusCancel="confirmFocusCancel"
      @toFocus="toFocus"
    />
    <!-- 分享 -->
    <view class="test">
      <VoShareView ref="shareView" @shareFn="shareFn" />
    </view>
    <!-- 获赞与收藏 -->
    <CenterPopup ref="centerPopup" :numData="numData" />
    <!-- 确认取消关注 -->
    <VoModal
      v-show="modalVisible"
      :show="modalVisible"
      showCancelButton
      @cancel="modalVisible = false"
      @confirm="toFocusCancel"
    >
      <view class="modal-content"> 确定不再关注？ </view>
    </VoModal>
    <VoHelpAction ref="helpRef" />
    <VoQuick :show.sync="showDirect" is-hack />
  </view>
</template>
<script>
  import HomeQuestion from './components/HomeQuestion.vue'
  import HomeVideo from './components/HomeVideo.vue'
  import ActionPopup from './components/ActionPopup.vue'
  import CenterPopup from './components/CenterPopup.vue'
  import voShareView from '@/components/VoShareView/VoShareView'
  import { shareWeixin } from '@/common/helper'
  import devConf from '@/common/env'

  let isMySelf = { status: false }
  export default {
    name: 'PersonalHomepage',
    components: { HomeQuestion, ActionPopup, HomeVideo, CenterPopup, voShareView },
    provide() {
      return {
        isMySelf,
      }
    },
    data() {
      return {
        showDirect: false,
        numData: {},
        btns: [
          {
            text: '关注',
            num: 0,
            detailPage: '/pagesAgent/PersonalHomepage/AttentionList?title=关注',
            name: 'myAttentionNum',
          },
          {
            text: '粉丝',
            num: 0,
            detailPage: '/pagesAgent/PersonalHomepage/AttentionList?title=粉丝',
            name: 'attentionMeNum',
          },
          {
            text: '好友数',
            num: 0,
            name: 'myFriendsNum',
          },
          {
            text: '获赞与收藏',
            num: 0,
            name: 'twoNum',
          },
          // {
          //   text: '收藏',
          //   num: 0,
          //   detailPage: '/pagesAgent/PersonalHomepage/CollectList',
          // },
        ],
        tabList: [
          {
            name: '问答',
          },
          {
            name: '视频',
          },
        ],
        current: 0,
        optionsUserid: '',
        userinfo: '',
        userId: '',
        staticData: '', // 统计数据
        showActiveNav: false,
        optionsId: '',
        platformCode: '',
        focusStatus: -2, //是否关注该用户
        modalVisible: false,
        scrollTop: 0,
        shareData: {},
      }
    },
    onShow() {
      // if (!this.optionsId) {
      //   this.userinfo = this.userInfo
      //   this.userId = this.userInfo.id
      //   this.getUserInfo()
      //   // console.log('this.userInfo', this.userInfo)
      // }
      //   setTimeout(() => {
      //     this.$refs.homeQuestion.getData('', true)
      //     this.$refs.homeVideo.getData('', true)
      //   }, 500)
      if (this.userinfo.id) {
        this.getNum()
      }
    },
    onLoad(options) {
      if (options.userId) {
        if (options.userId == this.userinfo.id) {
          isMySelf.status = true
        } else {
          isMySelf.status = false
        }
        this.userId = options.userId
        this.optionsId = options.userId
        this.platformCode = options.platformCode
        this.getUserInfo()
        this.getFocusInfo()
      } else {
        isMySelf.status = true
        this.userinfo = this.userInfo
        this.userId = this.userInfo.id
        this.getUserInfo()
      }
      uni.$off('takephoto')
      uni.$on('takephoto', (callback) => {
        this.getUserInfo()
      })
    },
    // mounted() {
    //   if (this.focusStatus !== 0 || this.focusStatus !== 3) {
    //     this.$refs.homeQuestion.getData('', true)
    //     this.$refs.homeVideo.getData('', true)
    //   }
    // },
    onPullDownRefresh() {
      console.log('下拉刷新')
      setTimeout(() => {
        uni.stopPullDownRefresh()
      }, 2000)
      if (this.optionsId) {
        this.init()
      } else {
        this.$refs.homeQuestion.getData('', true)
        this.$refs.homeVideo.getData('', true)
      }
    },
    methods: {
      //分享
      showShare(obj) {
        console.log(obj)
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

        shareWeixin({
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
      async init() {
        await this.getUserInfo()
        await this.getFocusInfo()
        // this.$refs.homeQuestion.getData('', true)
        // this.$refs.homeVideo.getData('', true)
      },
      //点击问题回答想法更多事件
      showMorePop(data) {
        // console.log(data)
        if (data.userId === this.userInfo.id) {
          this.$refs.actionPopup.show(data, 'edit')
        } else {
          this.$refs.actionPopup.show(data)
        }
      },
      toImRoom() {
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本
        const info = {
          targetId: this.userId,
          type: 0,
          note: this.userinfo.nickName,
          platformCode: this.userinfo.platformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      toBack() {
        this.$backFn()
      },
      showPopup() {
        // if (!this.optionsId || this.optionsId === this.userInfo.id || this.focusStatus === -1) {
        //   return
        // }
        // this.$refs.actionPopup.show()
        this.$refs.helpRef.open()
      },
      //页面滚动事件
      onScroll(e) {
        // TODO 后期整体优化，暂时定位此样式
        // if (+e === 1) {
        //   this.showActiveNav = true
        // } else if (+e === 2) {
        //   this.showActiveNav = false
        // }
        // if (e.detail.scrollTop >= this.scrollTop) {
        //   this.scrollTop = e.detail.scrollTop
        //   this.showActiveNav = true
        // } else {
        //   this.scrollTop = e.detail.scrollTop
        //   this.showActiveNav = false
        // }
      },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
        this.showActiveNav = false
      },
      //swiper切换
      swiperChange(event) {
        this.current = event.detail.current
        this.showActiveNav = false
      },
      //页面跳转
      goPage(item) {
        if (item.text === '获赞与收藏') {
          this.$refs.centerPopup.show()
        } else {
          if (this.optionsId && this.optionsId != this.userInfo.id) {
            return
          }
          if (item.detailPage) {
            this.$linkToEasy(item.detailPage)
          }
        }
      },
      //跳转收藏页面
      goCollectPage() {
        this.$linkToEasy(
          '/pagesAgent/PersonalHomepage/CollectList?total=' + this.staticData.myselfCollectNum,
        )
      },
      //编辑资料
      toEdit() {
        let storeName = this.userinfo.storeName || ''
        let nickName = this.userinfo.nickName || ''
        let synopsis = this.userinfo.synopsis || ''
        this.$linkToEasy(
          '/pagesAgent/PersonalHomepage/EditInfo?name=' +
            storeName +
            '&nickName=' +
            nickName +
            '&synopsis=' +
            synopsis,
        )
      },
      //获取当前用户信息
      getUserInfo() {
        let params = {
          id: this.userId,
        }
        if (this.optionsId) {
          params['platformCode'] = this.platformCode
        } else {
          params['platformCode'] = this.userinfo.platformCode
        }
        this.$VoHttp.apiCreateQuestionsHomeGetUserInfo(params).then((res) => {
          this.userinfo = res.data
          this.getNum()
          if (!this.userinfo.nickName) {
            this.userinfo.nickName = `新用户${this.userId}`
          }
          if (this.userId === this.userInfo.id) {
            this.$storage.set('personalInfo', this.userinfo)
          }
          if (!this.optionsId) {
            this.$refs.homeQuestion.getData('', true)
            this.$refs.homeVideo.getData('', true)
          }
        })
      },
      //获取统计数据
      getNum() {
        this.$VoHttp.apiCreateQuestionsHomeGetInfoById({ id: this.userinfo.id }).then((res) => {
          this.staticData = res.data
          this.staticData.twoNum = parseInt(res.data.likeNum) + parseInt(res.data.collectNum)
          this.numData.likeNum = res.data.likeNum
          this.numData.collectNum = res.data.collectNum
        })
      },
      //判断是否已关注
      getFocusInfo() {
        this.$VoHttp
          .apiCreateQuestionsHomeGetFollowTypeById$Id({ id: this.optionsId })
          .then((res) => {
            this.focusStatus = res.data
            if (this.focusStatus !== 0 || this.focusStatus !== 3) {
              this.$refs.homeQuestion.getData('', true)
              this.$refs.homeVideo.getData('', true)
            }
          })
      },
      //关注
      toFocus() {
        this.$VoHttp
          .apiCreateQuestionsHomeUpdateFollow({
            platformCode: this.userinfo.platformCode,
            id: this.userId,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('已关注该用户')
              this.focusStatus = 1
              this.getNum()
              this.getFocusInfo()
            } else {
              uni.$u.toast(res.message || '关注失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(res.message || '关注失败')
          })
      },
      confirmFocusCancel() {
        this.modalVisible = true
      },
      //取消关注
      toFocusCancel() {
        this.$VoHttp
          .apiCreateQuestionsHomeCancelFollow({
            platformCode: this.userinfo.platformCode,
            id: this.userId,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('已取消关注')
              this.focusStatus = 0
              this.getNum()
              this.modalVisible = false
            } else {
              uni.$u.toast(res.message || '取消失败')
              this.modalVisible = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '取消失败')
            this.modalVisible = false
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .home {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .nav {
      display: flex;
      padding: 20rpx 32rpx;
      &-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
      &-name {
        font-weight: 500;
        font-size: 32rpx;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.85);
      }
      &.white {
        background-color: #ffffff;
      }
    }
    &-active {
      .tabs {
        background: #ffffff;
        border-radius: 8px 8px 0px 0px;
        width: 100%;
      }
    }
    &-top {
      position: relative;
      height: 634rpx;
      &__bg {
        width: 750rpx;
        height: 100%;
      }
      &__content {
        position: absolute;
        width: 750rpx;
        height: 100%;
        top: 0;
        .user {
          display: flex;
          &-ava {
            width: 210rpx;
            height: 210rpx;
            position: relative;
            &__frame {
              width: 100%;
              height: 100%;
              position: absolute;
              z-index: 10;
            }
            &__img {
              width: 138rpx;
              height: 138rpx;
              border-radius: 50%;
              position: absolute;
              z-index: 9;
              top: 36rpx;
              left: 36rpx;
            }
            .v-icon {
              position: absolute;
              z-index: 10;
              right: 38rpx;
              top: 38rpx;
            }
          }
          &-right {
            flex: 1;
            padding-right: 32rpx;
            padding-top: 38rpx;
            &__name {
              font-weight: 500;
              font-size: 36rpx;
              line-height: 1.5;
              color: #ffffff;
              margin-bottom: 16rpx;
            }
            &__btm {
              display: flex;
              .btm-text {
                font-size: 20rpx;
                line-height: 1.5;
                color: #fff;
                .address {
                  font-size: 24rpx;
                  color: $v-cf-65;
                }
              }
              .btm-btn {
                flex-shrink: 0;
                flex-grow: 1;
                display: flex;
                justify-content: flex-end;
                &__item {
                  text-align: center;
                  color: #ffffff;
                  font-size: 24rpx;
                  line-height: 52rpx;
                  height: 52rpx;
                  background: rgba(255, 255, 255, 0.15);
                  border: 1px solid rgba(255, 255, 255, 0.65);
                  border-radius: 100px;
                  padding: 0 16rpx;
                  margin-left: 16rpx;
                  display: flex;
                  align-items: center;
                  &.yellow {
                    background: $color-primary-yellow;
                    border: 1px solid $color-primary-yellow;
                    padding: 0 24rpx;
                  }
                }
              }
            }
          }
        }
        .tip {
          color: #ffffff;
          font-size: 24rpx;
          line-height: 1.5;
          padding: 10rpx 32rpx;
        }
        .btns {
          display: flex;
          padding-top: 38rpx;
          &-item {
            flex: 1;
            text-align: center;
            line-height: 1.5;
            &__num {
              color: #ffffff;
              font-size: 32rpx;
            }
            &__text {
              font-size: 24rpx;
              color: $v-cf-65;
            }
          }
        }
        .tabs {
          background: #ffffff;
          border-radius: 8px 8px 0px 0px;
          width: 100%;
          position: absolute;
          bottom: -1px;
        }
      }
    }
    .swiper {
      flex: 1;
      &-item {
        height: 100%;
      }
    }
    .border {
      border-top: 16rpx solid #f7f7f8;
    }
    .modal-content {
      color: $v-c0-85;
      font-size: 32rpx;
      line-height: 1.5;
    }
  }
</style>
