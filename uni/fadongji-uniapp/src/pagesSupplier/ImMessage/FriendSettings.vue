<template>
  <view class="set">
    <VoNav is-fixed :title="title" is-have-more>
    </VoNav>
    <view class="set-head flex flex-vertical-c">
      <u-avatar
        class="set-head__img"
        default-url="/static/icons/defaultHead.png"
        :src="useSetting.photoUrl"
        shape="square"
        :size="48"
      />
      <view class="set-head__info flex1">
        <view class="info-up">{{ getUser.nickName || useSetting.targetName }}</view>
        <view class="info-down" v-if="useSetting.targetNickName">{{ useSetting.targetName }}</view>
      </view>
    </view>
    <view class="set-notice">
      <view
        v-if="useSetting.isMyAttention && useInfo.sameRole == 1"
        class="set-notice__list flex flex-justify-between flex-vertical-c"
        @click="goModifyRemarks"
      >
        <view>修改备注</view>
        <VoIcon name="right-arrow" :opacity="0.25" />
      </view>
      <view class="set-notice__list flex flex-justify-between flex-vertical-c" @click="goHome()">
        <view class="">逛逛主页</view>
        <VoIcon name="right-arrow" :opacity="0.25" />
      </view>
      <view class="set-notice__list flex flex-justify-between flex-vertical-c" @click="goReportingUsers">
        <view class="">举报该用户</view>
        <VoIcon name="right-arrow" :opacity="0.25" />
      </view>
    </view>
    <view class="set-fun" v-if="useInfo.isMe != 1">
      <view class="set-fun__switch flex flex-justify-between flex-vertical-c">
        <view class="fz-32 color-block">加入黑名单</view>
        <u-switch
          :value="useSetting.isBlack"
          activeColor="#22284b"
          size="30"
          @change="changeSet()"
        />
      </view>
    </view>
    <!--  陌生人时  -->
    <view
      class="set-attention m-b-16"
      v-if="!useSetting.isMyAttention && useInfo.isMe == 0 && useInfo.sameRole == 1"
      @click="follow"
      >关注他</view
    >
    <view
      class="set-attention flex flex-vertical-c flex-justify-c"
      v-if="useInfo.isMe == 0"
      @click="sendMessage"
    >
      <VoIcon name="smile-s" />
      <view class="m-l-4">发消息</view>
    </view>
    <view class="set-tips" v-if="useSetting.isBlack">已添加至黑名单，你将不再收到对方的消息。</view>
    <VoModal
      :show="showModalCancel"
      :content="content"
      :showCancelButton="true"
      :closeOnClickOverlay="true"
      @confirm="confirm"
      @cancel="close"
    />
  </view>
</template>

<script>
  export default {
    name: 'FriendSettings',
    data() {
      return {
        title: '',
        loading: false,
        blacklistValue: true, // 加入黑名单开关选择器
        isStranger: true, // 是否为陌生人,
        useSetting: {},
        useInfo: {},
        showModalCancel: false, // 删除模态框
        content: '',
      }
    },
    onLoad(options) {
      this.useInfo = options
      this.getUserInfo(options)
    },
    computed: {
      getUser() {
        let TargetInfo = this.$store.getters['im/getTargetInfo']
        if(TargetInfo.targetId == this.useSetting.targetId){
          return TargetInfo
        }else {
          let nickName = this.useSetting.targetNickName || this.useSetting.targetName
          console.log('getUserName')
          return {...this.useSetting,nickName}
        }
      },
    },
    methods: {
      /**
       * 去消息-举报页
       */
      goReportingUsers() {
        this.$linkToEasy('/pagesSupplier/ImMessage/ReportingUsers')
      },
      /**
       * 去修改备注
       */
      goModifyRemarks() {
        let targetNickName = this.useSetting.targetNickName ? this.useSetting.targetNickName : ''
        this.$linkToEasy(
          '/pagesSupplier/ImMessage/ModifyRemarks?userRemarks=' +
            targetNickName +
            '&targetUserId=' +
            this.useSetting.targetId +
            '&targetName=' +
            this.useSetting.targetName,
        )
      },
      async getUserInfo(info) {
        try {
          let params = { targetPlatformCode: info.platformCode, targetUserId: info.friendId }
          const { code, data } = await this.$VoHttp.IM.apiImMyAttentionUserInfo(params)
          if (code == '20001') {
            this.useSetting = data
            let TargetInfo = this.$store.getters['im/getTargetInfo']
            if((TargetInfo.targetId == data.targetId) && (data.targetNickName != TargetInfo.nickName)){
              this.$store.commit('im/setTargetInfo', {
                photoUrl: data.photoUrl,
                nickName: data.targetNickName || data.targetName,
                targetId: data.targetId,
              })
              console.log('设置')
            }


            this.title = this.useSetting.isMyAttention ? '好友详情' : '陌生人详情'
            if (this.useInfo.isMe == 1) {
              this.title = ''
            }
          }
        } catch (e) {
          console.log(e)
        }
      },
      // 发消息
      sendMessage() {
        const info = {
          targetId: this.useSetting.targetId,
          type: 0,
          note: this.useSetting.targetNickName || this.useSetting.targetName,
          platformCode: this.useSetting.targetPlatformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      goHome() {
        this.$linkToEasy(
          '/pagesAgent/PersonalHomepage/PersonalHomepage?userId=' +
            this.useSetting.targetId +
            '&platformCode=' +
            this.useSetting.targetPlatformCode,
        )
      },

      // 关注
      async follow() {
        try {
          if (this.loading) return
          this.loading = true
          const { code } = await this.$VoHttp.IM.apiImMyAttentionAdd({
            targetUserId: this.useSetting.targetId,
          })
          if (code === '20001') {
            uni.$u.toast('已关注该用户')
            this.useSetting.isMyAttention = true
            this.title = '好友详情'
          }
          this.loading = false
        } catch (e) {
          uni.$u.toast(e.message || '关注失败')
          this.loading = false
        }
      },
      changeSet() {
        this.showModalCancel = true
        this.content = !this.useSetting.isBlack ? '是否加入黑名单' : '是否移除黑名单'
      },
      close() {
        this.showModalCancel = false
      },
      /**
       * 模态框点击确认按钮时触发
       */
      confirm() {
        this.close()
        this.updateBlack()
      },
      async updateBlack() {
        // 解除黑名单 apiImFriendBlackSave   加入黑名单 apiImFriendBlackSave
        try {
          if (!this.useSetting.isBlack) {
            const { code } = await this.$VoHttp.IM.apiImFriendBlackSave({
              targetUserId: this.useInfo.friendId,
            })
            if (code == '20001') {
              this.useSetting.isBlack = !this.useSetting.isBlack
              console.log('updateMessageList')
              uni.$emit('updateMessageList')
            }
          } else {
            const { code } = await this.$VoHttp.IM.apiImFriendBlackRelieve({
              id: this.useInfo.friendId,
            })
            if (code == '20001') {
              this.useSetting.isBlack = !this.useSetting.isBlack
              console.log('updateMessageList')
              uni.$emit('updateMessageList')
            }
          }
        } catch (e) {
          this.$u.toast(e?.message || e?.data?.message || '服务端错误')
          this.useSetting.isBlack = !this.useSetting.isBlack
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .set {
    width: 750rpx;
    height: 100vh;
    &-head {
      width: 750rpx;
      background: #ffffff;
      padding: 32rpx;
      box-sizing: border-box;
      &__img {
        width: 96rpx;
        height: 96rpx;
        display: block;
      }
      &__info {
        margin-left: 24rpx;
        .info-up {
          height: 48rpx;
          font-weight: bold;
          font-size: 32rpx;
          line-height: 48rpx;
          color: $v-c0-85;
        }
        .info-down {
          margin-top: 8rpx;
          height: 42rpx;
          font-size: 28rpx;
          line-height: 42rpx;
          color: $v-c0-65;
        }
      }
    }
    &-notice {
      background: #ffffff;
      margin-top: 16rpx;
      &__list {
        padding: 24rpx 32rpx 24rpx 0;
        margin-left: 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        font-size: 32rpx;
        color: $v-c0-85;
        .list-right {
          color: $v-c0-65;
          margin-right: 4rpx;
        }
      }
    }
    &-fun {
      background: #ffffff;
      margin-top: 8rpx;
      margin-bottom: 40rpx;
      &__switch {
        padding: 16rpx 32rpx 16rpx 0;
        margin-left: 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
      }
    }
    &-attention {
      width: 750rpx;
      height: 112rpx;
      line-height: 112rpx;
      background: #ffffff;
      text-align: center;
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
    }
    &-tips {
      margin-top: 16rpx;
      color: $v-c0-45;
      font-size: 28rpx;
      text-align: center;
      height: 42rpx;
      line-height: 42rpx;
    }
  }
</style>
