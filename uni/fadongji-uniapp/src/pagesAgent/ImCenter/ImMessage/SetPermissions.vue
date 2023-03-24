<template>
  <view class="wrap">
    <VoNav title="" :isFixed="false">
      <view slot="back" />
      <view slot="operation" />
    </VoNav>
    <view class="wrap-name">好友权限</view>
    <view>
      <view
        class="wrap-permissions flex flex-justify-between flex-vertical-c"
        v-for="(info, index) of list"
        :key="index"
        @click="checkFn(index)"
      >
        <view class="wrap-permissions__name">{{ info.name }}</view>
        <image v-if="info.check" class="wrap-permissions__check" src="/static/icons/check.png" />
      </view>
    </view>
    <view class="wrap-name">个人主页（公开的问答、视频、直播）</view>
    <view>
      <view
        class="wrap-permissions flex flex-justify-between flex-vertical-c"
        v-for="(item, index) of auth"
        :key="index"
      >
        <view class="wrap-permissions__name">{{ item.name }}</view>
        <u-switch v-model="item.value" @change="change" />
      </view>
    </view>
    <view class="wrap-blacklist flex flex-justify-between flex-vertical-c">
      <view class="wrap-blacklist__join">加入黑名单</view>
      <u-switch v-model="value" @change="change" />
    </view>
    <u-button class="wrap-button" text="删除"></u-button>
  </view>
</template>

<script>
  export default {
    name: 'SetPermissions',
    data() {
      return {
        value: false,
        list: [
          {
            check: true,
            name: '收发消息、查看个人主页',
          },
          {
            check: false,
            name: '仅收发消息',
          },
        ],
        auth: [
          {
            value: true,
            name: '不让TA看',
          },
          {
            value: false,
            name: '不看TA的',
          },
        ],
      }
    },
    methods: {
      // 点击单选
      checkFn(index) {
        if (!this.list[index].check) {
          this.list.map((info) => (info.check = false))
          this.list[index].check = true
        }
      },
      change(e) {
        console.log('change', e)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 750rpx;
    min-height: 100vh;
    &-name {
      height: 100rpx;
      line-height: 100rpx;
      padding-left: 30rpx;
      font-size: 34rpx;
      color: #666;
    }
    &-permissions {
      height: 100rpx;
      line-height: 100rpx;
      background: #fff;
      border-bottom: 2rpx solid rgb(214, 215, 217);
      padding: 0 30rpx;
      &:first-child {
        border-top: 2rpx solid rgb(214, 215, 217);
      }
      &__name {
        font-size: 34rpx;
      }
      &__check {
        width: 50rpx;
        height: 50rpx;
      }
    }
    &-blacklist {
      height: 100rpx;
      line-height: 100rpx;
      background: #fff;
      border-top: 2rpx solid rgb(214, 215, 217);
      border-bottom: 2rpx solid rgb(214, 215, 217);
      margin-top: 20rpx;
      padding: 0 30rpx;
      &__join {
        font-size: 34rpx;
      }
    }
    &-button {
      margin-top: 30rpx;
      width: 450rpx;
    }
  }
</style>
