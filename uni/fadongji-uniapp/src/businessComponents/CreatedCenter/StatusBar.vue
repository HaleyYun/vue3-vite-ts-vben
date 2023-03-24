<template>
  <view class="bar flex flex-vertical-c">
    <image class="bar-icon" src="/static/icons/img1.png" @click="openPhotoClick" />
    <image
      v-if="isVideo"
      class="bar-icon"
      src="/static/icons/camera.png"
      @click="openCamreaClick"
    />
    <image v-if="!isRecord" class="bar-icon" src="/static/icons/recording1.png" @click="recordFn" />
  </view>
</template>

<script>
  export default {
    name: 'StatusBar',
    props: {
      isRecord: {
        type: Boolean,
        default: false,
      },
      isVideo: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      recordFn() {
        this.$emit('clickRecord')
      },
      openPhotoClick() {
        this.$emit('openPhoto')
      },
      openCamreaClick() {
        this.$emit('openCamrea')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bar {
    width: 750rpx;
    height: 104rpx;
    border-top: 2rpx solid $v-bg-light;
    background: #ffffff;
    &-icon {
      margin-left: 48rpx;
      width: 56rpx;
      height: 56rpx;
    }
  }
</style>
