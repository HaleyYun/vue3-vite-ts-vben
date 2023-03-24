<template>
  <view class="concern flex flex-column">
    <VoNav is-fixed title="群聊" is-have-more>
    </VoNav>
    <view class="concern-search flex flex-vertical-c">
      <VoSearch placeholder="请输入搜索" height="34" v-model="keyword" />
    </view>
    <view class="concern-list flex1">
      <view class="concern-list__empty" />
      <MyConcernList
        :my-concern-list="concern"
        v-for="(concern, index) of myConcernList"
        :key="index"
      />
      <view class="concern-list__num"> {{ myConcernList.length }}个群组 </view>
    </view>
  </view>
</template>

<script>
  import MyConcernList from './components/MyConcernList'
  export default {
    name: 'GroupChat',
    components: { MyConcernList },
    data() {
      return {
        keyword: '', // 搜索双向绑定
        myConcernList: [
          {
            note: '汽配技术大咖',
            content: '30人',
            type: 'groupChat',
          },
          {
            note: '汽配技术大咖',
            content: '30人',
            type: 'groupChat',
          },
          {
            note: '汽配技术大咖',
            content: '30人',
            type: 'groupChat',
          },
          {
            note: '汽配技术大咖',
            content: '30人',
            type: 'groupChat',
          },
          {
            note: '汽配技术大咖',
            content: '30人',
            type: 'groupChat',
          },
          {
            note: '汽配技术大咖',
            content: '30人',
            type: 'groupChat',
          },
          {
            note: '汽配技术大咖',
            content: '30人',
            type: 'groupChat',
          },
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
  .concern {
    height: 100vh;
    background: #ffffff;
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-list {
      height: 100%;
      overflow-y: scroll;
      &__empty {
        width: 750rpx;
        height: 16rpx;
        background: #f6f7f8;
      }
      &__num {
        width: 750rpx;
        height: 42rpx;
        line-height: 42rpx;
        font-size: 28rpx;
        color: $v-c0-25;
        margin-top: 16rpx;
        text-align: center;
      }
    }
  }
</style>
