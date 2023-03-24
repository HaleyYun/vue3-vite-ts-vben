<template>
  <view class="search flex flex-column">
    <!--  搜索  -->
    <VoBatteryBar />
    <view class="search-search flex flex-vertical-c">
      <VoIcon :size="24" name="left-arrow" @click="$backFn" />
      <VoSearch
        v-model.trim="keyword"
        :actionStyle="{ color: '#FF5319' }"
        :focus="true"
        height="34"
        placeholder="请输入搜索"
        @blur="goResult"
        @clear="keyword = ''"
        @custom="goResult"
        @search="goResult"
      />
    </view>
    <view class="search-con flex1">
      <view class="search-con__appoint">
        <view class="appoint-title">搜索指定内容</view>
        <view class="flex flex-vertical-c flex-justify-between">
          <view
            v-for="(item, index) of appointList"
            :key="index"
            :class="{ checked: item.checked }"
            class="appoint-box"
            @click="changeType(item)"
          >
            {{ item.value }}
          </view>
          <view class="leftBox"></view>
        </view>
      </view>
      <view class="search-con__appoint m-t-24">
        <view class="appoint-title flex flex-justify-between flex-vertical-c">
          <view>搜索历史</view>
          <view class="flex flex-vertical-c" @click="showDeleteHistory = true">
            <view class="fz-28 color-block-45 m-l-4">清空</view>
            <VoIcon :opacity="0.45" :size="16" color="#000" name="delete" />
          </view>
        </view>
        <view
          v-if="historyList.length > 0"
          class="flex flex-vertical-c flex-wrap flex-justify-between m-t-40"
        >
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
        <view v-else class="fz-28 color-block-65 text-center m-t-40">暂无历史搜索记录</view>
        <view
          v-if="historyList.length > 6 && !show"
          class="fz-28 color-block-65 text-right border-box"
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
    name: 'SearchPage',
    data() {
      return {
        keyword: '', // 搜索双向绑定
        appointList: [
          {
            checked: false,
            value: '联系人',
          },
          {
            checked: false,
            value: '好友列表',
          },
        ],
        historyList: [
          // '汽配技术大咖',
          // '王老板',
          // '汽配技术大咖',
          // '汽配技术大咖',
          // '汽配技术大咖',
          // '汽配技术大咖',
        ],
        current: null,
        showDeleteHistory: false,
        show: false,
      }
    },
    onLoad() {
      if (this.$storage.get('im_search_histery')) {
        this.historyList = JSON.parse(this.$storage.get('im_search_histery'))
      }
    },
    methods: {
      changeType(item) {
        item.checked = !item.checked
      },
      /**
       * 跳转详情页
       */
      goResult() {
        if (this.keyword) {
          if (this.historyList.indexOf(this.keyword) === -1) {
            this.historyList.unshift(this.keyword)
          }
          this.$storage.set('im_search_histery', JSON.stringify(this.historyList))
          // this.$storage.set('searchCreate', this.keyword)
          // this.$backFn()
          if (this.appointList[0].checked) {
            if (this.appointList[1].checked) {
              this.$linkToEasy(
                `/pagesSupplier/ImMessage/SearchResult?keyword=${this.keyword}&type=2`,
              )
            }
            this.$linkToEasy(`/pagesSupplier/ImMessage/SearchResult?keyword=${this.keyword}&type=0`)
          } else if (this.appointList[1].checked) {
            this.$linkToEasy(`/pagesSupplier/ImMessage/SearchResult?keyword=${this.keyword}&type=1`)
          } else {
            this.$linkToEasy(`/pagesSupplier/ImMessage/SearchResult?keyword=${this.keyword}&type=2`)
          }
        }
      },
      /**
       * 去搜索结果页
       */
      goSearchResult(info) {
        if (this.appointList[0].checked) {
          if (this.appointList[1].checked) {
            this.$linkToEasy(`/pagesSupplier/ImMessage/SearchResult?keyword=${info}&type=2`)
          }
          this.$linkToEasy(`/pagesSupplier/ImMessage/SearchResult?keyword=${info}&type=0`)
        } else if (this.appointList[1].checked) {
          this.$linkToEasy(`/pagesSupplier/ImMessage/SearchResult?keyword=${info}&type=1`)
        } else {
          this.$linkToEasy(`/pagesSupplier/ImMessage/SearchResult?keyword=${info}&type=2`)
        }
      },
      /**
       * 清空历史搜索
       */
      emptyFn() {
        this.historyList = []
        this.$storage.remove('im_search_histery')
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
        padding: 12rpx 30rpx;
        box-sizing: border-box;
        .appoint-title {
          line-height: 48rpx;
          font-size: 32rpx;
          color: rgba(0, 0, 0, 0.85);
          font-weight: bold;
          margin-bottom: 16rpx;
        }
        .appoint-box {
          width: 192rpx;
          height: 64rpx;
          line-height: 64rpx;
          box-sizing: border-box;
          padding: 0 32rpx;
          text-align: center;
          background: rgba(0, 0, 0, 0.08);
          color: rgba(0, 0, 0, 0.65);
          border-radius: 30rpx;
          font-size: 28rpx;
          margin: 16rpx 0;
          overflow: hidden;
          border: 2rpx solid transparency;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: bold;
          &.checked {
            line-height: 60rpx;
            color: #ff5319;
            border: 2rpx solid #ff5319;
            background: #fff;
          }
        }
        .leftBox {
          width: 192rpx;
          height: 64rpx;
        }
      }
    }
  }
</style>
