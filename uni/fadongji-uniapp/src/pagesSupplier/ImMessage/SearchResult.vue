<template>
  <view class="search">
    <!--  搜索  -->
    <VoBatteryBar />
    <view class="search-search flex flex-vertical-c">
      <VoIcon :size="24" name="left-arrow" @click="$backFn" />
      <VoSearch
        v-model.trim="param.userName"
        placeholder="请输入搜索"
        height="34"
        @change="getData"
        @search="getData"
        @custom="getData"
        @clear="param.userName = ''"
      />
    </view>
    <view v-if="contactList.length > 0" class="search-contact">
      <view class="search-contact__tips">联系人</view>
      <view  v-for="(concern, index) of contactList"
             :key="index" @click.capture.stop="goChatPage(concern)">
        <MyConcernList
                :my-concern-list="concern"
        />
      </view>
      <view v-if="contactTotal > 5">
        <u-cell title="更多联系人" isLink @click="more(2)"></u-cell>
      </view>
    </view>
    <view v-if="chatRecord.length > 0" class="search-contact">
      <view class="search-contact__tips">好友列表</view>
      <view v-for="(concern, index) of chatRecord" :key="index"
            @click.capture.stop="goChatPage(concern)">
        <MyConcernList :my-concern-list="concern"/>
      </view>
      <view v-if="chatTotal > 5">
        <u-cell title="更多好友" isLink @click="more(1)"></u-cell>
      </view>
    </view>
    <VoNoData v-if="chatRecord.length === 0 && contactList.length === 0" />
    <!-- <view class="search-more">
      <view class="search-more__list flex flex-vertical-c flex-justify-between">
        <view>更多聊天记录</view>
        <VoIcon :opacity="0.25" name="right-arrow" />
      </view>
    </view> -->
  </view>
</template>

<script>
  import MyConcernList from './components/MyConcernList'
  import { hideLoading, showLoading, toRoleHome } from '@/common/helper'

  export default {
    name: 'SearchResult',
    components: { MyConcernList },
    data() {
      return {
        contactList: [
          // {
          //   headImage: '/static/demo/IMG_3839.JPG',
          //   note: '汽配技术大咖',
          //   content: '大咖',
          //   noLine: true,
          // },
        ],
        chatRecord: [
          // {
          //   headImage: '/static/demo/IMG_3839.JPG',
          //   note: '汽配技术大咖',
          //   content: '大咖',
          //   noLine: true,
          // },
        ],
        param: {
          userName: '', // 搜索双向绑定
          pageNo:1,
          pageSize:10,
          type:0, // 搜索类型(0:全部  1:好友列表  2:消息列表 3:聊天记录)
        },
        contactTotal:0,
        chatTotal:0,


      }
    },
    onLoad(option) {
      if (option.keyword) {
        this.param.userName = option.keyword
      }
      // if (option.type) {
      //   this.param.type = +option.type
      // } else {
      //   this.param.type = 2
      // }
      this.getData()
    },
    methods: {
      // clear() {
      //   this.$storage.set('toIm', 1)
      //   toRoleHome()
      // },
      /**
       * 获取搜索结果
       */
      getData() {
        if (!this.param.userName) return
        showLoading()
        this.$VoHttp.IM.apiImMessageListSearch(this.param)
          .then((res) => {
            this.contactList = res.data.messageList.records?res.data.messageList.records.splice(0,5):res.data.messageList.records;
            this.contactTotal = res.data.messageList.total;
            this.chatTotal = res.data.myFriend.total;
            this.chatRecord = res.data.myFriend.records?res.data.myFriend.records.splice(0,5):res.data.myFriend.records
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络请求失败')
          })
          .finally(() => {
            hideLoading()
          })
      },
      /**
       * 去聊天详情页
       */
      goChatPage(data) {
        console.log(data, '聊天列表页面进入')
        const info = {
          targetId: data.targetId || data.friendId,
          type: 0,
          note: data.targetName,
          platformCode: data.targetPlatformCode || data.platformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      // 点击更多
      more(type){
        this.$linkToEasy(`/pagesSupplier/ImMessage/SearchMore?keyword=${this.param.userName}&type=${type}`)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .search {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-contact {
      margin-top: 16rpx;
      background: #ffffff;
      &__tips {
        height: 42rpx;
        line-height: 42rpx;
        font-size: 28rpx;
        font-weight: bold;
        padding: 24rpx 0 0 32rpx;
      }
    }
    &-more {
      background: #ffffff;
      &__list {
        padding: 24rpx 32rpx 24rpx 0;
        margin-left: 32rpx;
        font-size: 28rpx;
        color: $v-c0-85;
        border-top: 2rpx solid $v-bg-light;
        border-bottom: 2rpx solid $v-bg-light;
      }
    }
  }
</style>
