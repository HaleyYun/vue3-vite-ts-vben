<template>
  <view class="set">
    <VoNav is-fixed title="聊天设置" is-have-more>
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
        <view class="info-down" v-if="useSetting.targetNickName">{{
          useSetting.targetNickName
        }}</view>
        <view class="info-up" v-if="useSetting.targetName">{{ useSetting.targetName }}</view>
      </view>
    </view>
    <view
      v-if="useSetting.shopId"
      class="set-list fz-32 color-block flex flex-justify-between flex-vertical-c"
      @click="goShop()"
    >
      <view>进店逛逛</view>
      <VoIcon name="right-arrow" :opacity="0.25" />
    </view>
    <view class="set-fun">
      <view class="set-fun__switch flex flex-justify-between flex-vertical-c">
        <view class="fz-32 color-block">置顶聊天</view>
        <u-switch
          v-model="useSetting.top"
          activeColor="#00B359"
          size="30"
          @change="changeSet('top')"
        />
      </view>
      <view class="set-fun__switch flex flex-justify-between flex-vertical-c">
        <view class="fz-32 color-block">消息免打扰</view>
        <u-switch
          v-model="useSetting.disturb"
          activeColor="#00B359"
          size="30"
          @change="changeSet('disturb')"
        />
      </view>
      <!-- 和店铺聊天隐藏 -->
      <view
        class="set-fun__switch flex flex-justify-between flex-vertical-c"
        v-if="currentUserFullInfo.platformCode == useInfo.platformCode"
      >
        <view class="fz-32 color-block">加入黑名单</view>
        <u-switch
          :value="useSetting.isBlack"
          activeColor="#22284b"
          size="30"
          @change="changeSet('isBlack')"
        />
      </view>
    </view>
    <!-- 延期处理 -->
    <view class="set-list flex flex-vertical-c flex-justify-between" @click="goReportingUsers">
      <view class="fz-32 color-block">举报该用户</view>
      <VoIcon name="right-arrow" :opacity="0.25" />
    </view>
    <view
      class="set-list fz-32 color-block flex flex-justify-between flex-vertical-c"
      @click="clearMessageOpen()"
    >
      <view>清空聊天记录</view>
      <VoIcon name="right-arrow" :opacity="0.25" />
    </view>
    <VoModal
      :show="showModalCancel"
      :content="content"
      :showCancelButton="true"
      :closeOnClickOverlay="true"
      @confirm="confirm"
      @cancel="cancel"
    />
  </view>
</template>

<script>
  export default {
    name: 'ChatSettings',
    data() {
      return {
        currentUserFullInfo: {},
        stickyValue: false, // 置顶聊天开关选择器
        notDisturbValue: false, // 消息免打扰开关选择器
        showModalCancel: false, // 删除模态框
        showModalType: 1, // 1删除 2黑名单
        content: '确定删除和杨老板的聊天记录吗？',
        useInfo: {},
        useSetting: {
          top: false,
          disturb: false,
          blackList: false,
        },
      }
    },
    onLoad(options) {
      // platformCode 用户平台，用户id friendId,用户头像 note
      console.log(options)
      this.useInfo = options
      this.getUserInfo()
      this.initInfo()
    },
    methods: {
      async initInfo() {
        await this.$store.dispatch('user/getFullUserInfo').then((res) => {
          this.currentUserFullInfo = res
        })
      },
      /**
       *  去好友设置
       */
      goFriendSettings() {
        this.$linkToEasy('/pagesSupplier/ImMessage/FriendSettings')
      },
      /**
       *  打开
       */
      open() {
        this.showModalCancel = true
        this.content = `确定删除和${this.useSetting.targetName}的聊天记录吗？`
        this.showModalType = 1
      },
      /**
       * 关闭
       */
      close() {
        this.showModalCancel = false
      },
      /**
       * 模态框点击确认按钮时触发
       */
      confirm() {
        if (this.showModalType == 1) {
          this.close()
          this.clearMessage()
        } else {
          this.close()
          this.updateBlack()
        }
      },
      /**
       * 模态框点击取消按钮时触发
       */
      cancel() {
        this.close()
      },
      /**
       * 去消息-举报页
       */
      goReportingUsers() {
        this.$linkToEasy('/pagesSupplier/ImMessage/ReportingUsers')
      },
      // 去店铺页面
      goShop() {
        if (this.userInfo.roleCode == 'garage') {
          // 看对方角色，跳转店铺详情 假如是汽修厂看的是普通商品详情，是服务商看的是项目详情
          this.$linkToEasy('/pagesGarage/ShopList/ShopGoodsList?shopId=' + this.useSetting.shopId)
        } else {
          // 看对方角色，跳转店铺详情 假如是汽修厂看的是普通商品详情，是服务商看的是项目详情
          this.$linkToEasy(
            '/pagesAgent/InvestmentList/InvestmentShop?shopId=' + this.useSetting.shopId,
          )
        }
      },
      changeSet(type) {
        switch (type) {
          case 'top':
            this.udateTopChange(this.useSetting[type], this.useSetting.messageListId)
            break
          case 'disturb':
            this.UpdateDisturb(this.useSetting[type], this.useSetting.messageListId)
            break
          case 'isBlack':
            this.showModalCancel = true
            this.content = this.useSetting[type] ? '是否移除黑名单' : '是否加入黑名单'
            this.showModalType = 2
            break
        }
        //刷新聊天列表
        this.$storage.set('refreshIm', 1)
      },
      async udateTopChange(top, id) {
        try {
          let params = {
            top: top,
            targetId: this.useInfo.friendId,
            targetPlatformCode: this.useInfo.platformCode,
          }
          const { code } = await this.$VoHttp.IM.apiImMessageListUdateTop(params)
          if (code == '20001') {
            this.$store.dispatch('im/updateDisturb', { ...this.useSetting, udateTop: true })
          }
        } catch (e) {
          this.useSetting.top = !this.useSetting.top
          this.$u.toast(e?.message || e?.data?.message || '服务端错误')
        }
      },
      async UpdateDisturb(disturb, id) {
        try {
          let params = { disturb: disturb, id: id }
          const { code } = await this.$VoHttp.IM.apiImMessageListUpdateDisturb(params)
          if (code == '20001') {
            this.$store.dispatch('im/updateDisturb', { ...this.useSetting, updateDisturb: true })
          }
        } catch (e) {
          this.useSetting.disturb = !this.useSetting.disturb
          this.$u.toast(e?.message || e?.data?.message || '服务端错误')
        }
      },
      async updateBlack() {
        // 解除黑名单 apiImFriendBlackSave   加入黑名单 apiImFriendBlackSave
        try {
          if (this.useSetting.isBlack) {
            const { code } = await this.$VoHttp.IM.apiImFriendBlackRelieve({
              id: this.useInfo.friendId,
            })
            this.useSetting.isBlack = false
          } else {
            const { code } = await this.$VoHttp.IM.apiImFriendBlackSave({
              targetUserId: this.useInfo.friendId,
            })
            this.useSetting.isBlack = true
          }
        } catch (e) {
          this.$u.toast(e?.message || e?.data?.message || '服务端错误')
        }
      },

      async getUserInfo() {
        try {
          let params = {
            targetPlatformCode: this.useInfo.platformCode,
            targetUserId: this.useInfo.friendId,
          }
          const { code, data } = await this.$VoHttp.IM.apiImMessageListMessageUserInfo(params)
          console.log(data)
          if (code == '20001') {
            this.useSetting = data
            data.top == 1 ? (this.useSetting.top = true) : (this.useSetting.top = false)
            data.disturb == 1 ? (this.useSetting.disturb = true) : (this.useSetting.disturb = false)
            data.isBlack == 1 ? (this.useSetting.isBlack = true) : (this.useSetting.isBlack = false)
          }
        } catch (e) {
          console.log(e)
        }
      },
      clearMessageOpen() {
        this.content = `确定清除和${
          this.useSetting.targetNickName || this.useSetting.targetName
        }  的聊天记录吗？`
        this.showModalCancel = true
      },
      async clearMessage() {
        try {
          let params = {
            recipientId: this.useSetting.targetId,
            recipientPlatformCode: this.useSetting.targetPlatformCode,
          }
          const { code } = await this.$VoHttp.IM.apiMessageRecordClearMessage(params)
          if (code == '20001') {
            uni.$u.toast('删除成功')
          }
        } catch (e) {}
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
    &-fun {
      background: #ffffff;
      margin-top: 16rpx;
      &__switch {
        padding: 16rpx 32rpx 16rpx 0;
        margin-left: 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        &:last-child {
          border-bottom: 2rpx solid transparent;
        }
      }
    }
    &-list {
      background: #ffffff;
      margin-top: 8rpx;
      padding: 24rpx 32rpx;
    }
  }
</style>
