<template>
  <view class="publish">
    <view v-if="!isAuthor" class="flex flex1 flex-vertical-c flex-justify-c" @click="goAnswer">
      <VoIcon :size="20" class="publish-icon" color="#155BD4" name="edit" />
      <view class="publish-title">写回答</view>
    </view>
    <view v-else class="flex flex-vertical-c flex-justify-c">
      <view class="flex flex1 flex-vertical-c flex-justify-c" @click="editAnswer">
        <VoIcon :size="24" class="publish-icon" color="#155BD4" name="edit-line" />
        <view class="publish-title">修改问题</view>
      </view>

      <view class="flex flex1 flex-vertical-c flex-justify-c" @click="goAnswer">
        <VoIcon :size="20" class="publish-icon" color="#155BD4" name="edit" />
        <view class="publish-title">写回答</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'CircleBottomPublishView',

    props: {
      /**
       * isAuthor 是否是作者 默认false
       */
      isAuthor: {
        type: Boolean,
        default: false,
      },
      info: {
        type: Object,
      },
    },
    data() {
      return {
        safeareaShow: true,
      }
    },
    methods: {
      goAnswer() {
        this.$emit('goAnswer')
      },
      editAnswer() {
        this.$emit('editAnswer')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .publish {
    background-color: #ffffff;
    width: calc(100% - 64rpx);
    margin: 0rpx 32rpx 20rpx 32rpx;
    /* Shadows阴影/shadow - 卡片模块阴影 */
    box-shadow: 0rpx 4rpx 16rpx rgba(34, 40, 75, 0.15);
    border-radius: 14rpx;
    height: 98rpx;
    line-height: 98rpx;
    &-icon {
      padding-right: 16rpx;
    }
    &-title {
      color: #155bd4;
      font-size: 28rpx;
    }
  }
</style>
