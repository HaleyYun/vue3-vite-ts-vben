<template>
  <div class="wrap">
    <view class="wrap-nav">
      <view class="wrap-nav__input">
        <image class="input-img" src="/static/icons/search.png" />
        <u-input
          v-model="search"
          confirm-type="search"
          @confirm="goSearchResult"
          type="text"
          class="m-l-10 fz-28 c3"
          placeholder="请输入搜索内容"
          placeholder-class="fz-28 c9"
          clearable="true"
          border="none"
        />
      </view>
      <view class="fz-30 c3 wrap-nav__cancel" @click="returnFn">取消</view>
    </view>
    <view class="fz-30 c3 m-t-30 m-b-30">搜索指定内容</view>
    <view class="wrap-tags">
      <view class="wrap-tags__item" v-for="(info, index) of specify" :key="index">{{ info }}</view>
    </view>
    <view class="fz-30 c3 m-t-30 m-b-30 flex flex-justify-between flex-vertical-c">
      <view>历史搜索</view>
      <image class="wrap-tags__img" @click="delHis" src="/static/icons/delete.png" />
    </view>
    <view class="wrap-tags">
      <view
        class="wrap-tags__item"
        @click="goSearch(item)"
        v-for="(item, index) of searchHistory"
        :key="index"
        >{{ item }}</view
      >
    </view>
  </div>
</template>

<script>
  export default {
    name: 'Inquiry',
    data() {
      return {
        search: '',
        specify: ['777', '888', '999'],
        searchHistory: ['111', '2222'],
      }
    },
    methods: {
      goSearchResult() {
        this.searchHistory.push(this.search)
        // Storage.set('searchHistory', this.searchHistory)
        this.$linkToEasy('/pagesAgent/ImCenter/ImSearch/SearchResult?search=' + this.search)
      },
      // 去搜索结果页
      goSearch(item) {
       this.$linkToEasy('/pagesAgent/ImCenter/ImSearch/SearchResult?search=' + item)
      },
      // 删除搜索历史
      delHis() {
        this.searchHistory = []
        // Storage.set('searchHistory', this.searchHistory)
      },
      // 取消搜素返回上一页
      returnFn() {
        this.$backFn()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 750rpx;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 30rpx;
    &-nav {
      width: 100%;
      height: 72rpx;
      display: flex;
      justify-content: space-between;
      &__cancel {
        height: 72rpx;
        line-height: 72rpx;
      }
      &__input {
        padding: 0rpx 20rpx;
        box-sizing: border-box;
        width: 606rpx;
        height: 72rpx;
        background: #fff;
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        .input-img {
          width: 32rpx;
          height: 32rpx;
        }
      }
    }
    &-tags {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      &__item {
        width: auto;
        padding: 0rpx 30rpx;
        height: 54rpx;
        line-height: 54rpx;
        font-size: 24rpx;
        color: #333333;
        border-radius: 40rpx;
        text-align: center;
        background: #fff;
        margin-right: 20rpx;
        margin-bottom: 20rpx;
      }
      &__img {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
</style>
