<template>
  <view class="search flex flex-column">
    <!--  搜索  -->
    <VoBatteryBar />
    <view class="search-search flex flex-vertical-c">
      <VoSearch v-model="keyword" height="34" placeholder="请输入搜索" @search="goResult" />
    </view>
    <view class="search-con flex1">
      <!--      <view class="search-con__appoint">-->
      <!--        <view class="appoint-title">搜索指定内容</view>-->
      <!--        <view class="flex flex-vertical-c flex-wrap">-->
      <!--          <view-->
      <!--            v-for="(item, index) of appointList"-->
      <!--            :key="index"-->
      <!--            class="appoint-box"-->
      <!--            @click="goSearchResult(item)"-->
      <!--          >-->
      <!--            {{ item }}-->
      <!--          </view>-->
      <!--        </view>-->
      <!--      </view>-->
      <view class="search-con__appoint">
        <view class="appoint-title flex flex-justify-between flex-vertical-c p-r-32">
          <view>搜索历史</view>
          <VoIcon :opacity="0.45" :size="20" name="delete" @click="emptyFn" />
        </view>
        <view class="flex flex-vertical-c flex-wrap">
          <view
            v-for="(info, index) of historyList"
            :key="index"
            class="appoint-box"
            @click="goSearchResult(info)"
          >
            {{ info }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SearchPage',
    data() {
      return {
        keyword: '', // 搜索双向绑定
        appointList: ['联系人', '联天记录'],
        historyList: ['4A13M1  1.5T', '4G15DVVT', '475', '4A13M1  1.5T德尔福', '4G15DVVT'],
      }
    },
    methods: {
      goResult() {
        this.historyList.push(this.keyword)
        // Storage.set('historyList', this.historyList)
        console.log(this.historyList, 'sss')
        this.$linkToEasy('/pagesOldBuyer/HomeJumpPage/SearchResult?search=' + this.keyword)
      },
      /**
       * 去搜索结果页
       */
      goSearchResult(info) {
        this.$linkToEasy('/pagesOldBuyer/HomeJumpPage/SearchResult?search=' + info)
      },
      /**
       * 清空历史搜索
       */
      emptyFn() {
        this.historyList = []
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
          height: 42rpx;
          line-height: 42rpx;
          font-size: 28rpx;
          color: $v-c0-85;
          font-weight: bold;
          margin-bottom: 40rpx;
        }
        .appoint-box {
          padding: 0 24rpx;
          height: 48rpx;
          line-height: 48rpx;
          text-align: center;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 64rpx;
          font-size: 32rpx;
          margin-right: 32rpx;
          margin-bottom: 48rpx;
          color: $v-c0-45;
          overflow: hidden;
          white-space: nowrap;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
