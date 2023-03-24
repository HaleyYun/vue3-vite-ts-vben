<template>
  <view class="search flex flex-column">
    <!--  搜索  -->
    <VoBatteryBar />
    <view class="search-search flex flex-vertical-c">
      <VoIcon
        :opacity="0.45"
        :size="24"
        class="m-r-24"
        color="#000"
        name="left-arrow"
        @click="back"
      />
      <VoSearch
        v-model.trim="keyword"
        :actionStyle="{ color: '#FF5319' }"
        placeholder="请输入搜索"
        :focus="true" 
        height="34"
        @custom="goResult"
        @search="goResult"
      />
    </view>
    <view class="search-con flex1">
      <!--      <view class="search-con__appoint">-->
      <!--        <view class="appoint-title">搜索指定内容</view>-->
      <!--        <view class="flex flex-vertical-c flex-wrap">-->
      <!--          <view-->
      <!--            class="appoint-box"-->
      <!--            v-for="(item, index) of appointList"-->
      <!--            :key="index"-->
      <!--            @click="goSearchResult(item)"-->
      <!--          >-->
      <!--            {{ item }}-->
      <!--          </view>-->
      <!--        </view>-->
      <!--      </view>-->
      <view class="search-con__appoint">
        <view class="appoint-title flex flex-justify-between flex-vertical-c">
          <view class="fz-b">历史搜索</view>
          <view class="flex flex-vertical-c" @click="showDeleteHistory = true">
            <view class="fz-28 color-block-45 lh150 m-r-4">清空</view>
            <VoIcon :opacity="0.45" :size="16" color="#000" name="delete" />
          </view>
        </view>
        <view v-if="historyList.length > 0" class="flex flex-vertical-c flex-wrap m-t-40">
          <template v-for="(info, index) of historyList">
            <view v-if="index < 6" :key="index" class="appoint-box" @click="goSearchResult(info)">
              {{ info }}
            </view>
            <template v-else>
              <view v-if="show" :key="index" class="appoint-box" @click="goSearchResult(info)">
                {{ info }}
              </view>
            </template>
          </template>
          <template v-if="historyList.length > 6 && show">
            <template v-if="historyList.length % 3 === 1">
              <view class="leftBox" />
              <view class="leftBox" />
            </template>
            <template v-if="historyList.length % 3 === 2">
              <view class="leftBox" />
            </template>
          </template>
          <template v-if="historyList.length < 6">
            <template v-if="historyList.length % 3 === 1">
              <view class="leftBox" />
              <view class="leftBox" />
            </template>
            <template v-if="historyList.length % 3 === 2">
              <view class="leftBox" />
            </template>
          </template>
        </view>
        <view v-else class="fz-28 color-block-65 text-center m-t-40">无历史搜索记录</view>
        <view
          v-if="historyList.length > 6 && !show"
          class="fz-28 color-block-65 text-right"
          @click="show = true"
          >...</view
        >
      </view>
    </view>
    <u-modal
      v-if="showDeleteHistory"
      closeOnClickOverlay
      show
      showCancelButton
      width="640rpx"
      @cancel="showDeleteHistory = false"
      @close="showDeleteHistory = false"
      @confirm="emptyFn"
    >
      <view class="phone-modal">确定要删除历史搜索记录吗？</view>
    </u-modal>
  </view>
</template>

<script>
  export default {
    name: 'CreateSearchPage',
    data() {
      return {
        show: false,
        showDeleteHistory: false,
        keyword: '', // 搜索双向绑定
        // appointList: ['联系人', '联天记录'],
        historyList: [
          // '汽配技术大咖',
          // '王老板',
          // '汽配技术大咖',
          // '汽配技术大咖',
          // '汽配技术大咖',
          // '汽配技术大咖',
        ],
      }
    },
    onLoad() {
      // this.$storage.set('temp_im_room_info', info)
      if (this.$storage.get('create_history')) {
        this.historyList = JSON.parse(this.$storage.get('create_history'))
      }
    },
    methods: {
      back() {
        uni.navigateBack()
        this.$emit('backFn')
      },
      goResult() {
        if (this.historyList.indexOf(this.keyword) === -1) {
          if (this.keyword) {
            this.historyList.unshift(this.keyword)
          }
        }
        this.$storage.set('create_history', JSON.stringify(this.historyList))
        console.log(this.keyword)
        uni.$emit('searchCreate', this.keyword)
        this.$backFn()
      },
      /**
       * 去搜索结果页
       */
      goSearchResult(info) {
        //this.$storage.set('searchCreate', info)
        uni.$emit('searchCreate', info)
        this.$backFn()
      },
      /**
       * 清空历史搜索
       */
      emptyFn() {
        this.historyList = []
        this.$storage.remove('create_history')
        this.showDeleteHistory = false
      },
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
    &-con {
      width: 750rpx;
      overflow-y: scroll;
      background: #ffffff;
      margin-top: 16rpx;
      &__appoint {
        padding: 16rpx 0 0 32rpx;
        .appoint-title {
          height: 48rpx;
          line-height: 48rpx;
          font-size: 32rpx;
          color: #373a4e;
          margin-right: 32rpx;
        }
        .appoint-box {
          box-sizing: border-box;
          padding: 0 24rpx;
          height: 56rpx;
          line-height: 56rpx;
          text-align: center;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 64rpx;
          font-size: 28rpx;
          overflow: hidden;
          color: $v-c0-65;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 0 24rpx 40rpx 0;
        }
        .leftBox {
          width: 192rpx;
          height: 64rpx;
        }
      }
    }
  }
</style>
