<template>
  <view>
    <view v-if="loading" class="text-center fz-25 py-20 color-gray">
      <text>{{ loadingText }}</text>
    </view>

    <view v-else class="text-center fz-25 py-20 color-gray">
      <text v-if="hasMore">{{ hasMoreText }}</text>
      <!--      <text v-else>暂无更多数据</text>-->
      <view v-else class="flex-vertical-c">
        <image v-if="noMoreSrc" :src="noMoreSrc" class="h48 w48"></image>
        <view>{{ noMoreText }}</view>
        <view class="h30"></view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'VoLoadingText',
    props: {
      noMoreSrc: {
        type: String,
        defaule: '',
      },
      loading: {
        type: Boolean,
        default: false,
      },
      hasMore: {
        type: Boolean,
        default: true,
      },
      noMoreText: {
        type: String,
        default: '已经到底了',
      },
      loadingText: {
        type: String,
        default: '数据加载中',
      },
      hasMoreText: {
        type: String,
        default: '加载更多',
      },
    },
  }
</script>

<style scoped></style>
