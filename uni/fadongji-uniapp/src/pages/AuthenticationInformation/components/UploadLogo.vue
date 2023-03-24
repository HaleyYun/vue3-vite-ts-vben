<template>
  <view>
    <image
      v-if="filePath"
      :src="filePath"
      class="logo-bg flex flex-vertical-c flex-justify-c"
      @click="chooseImgFn"
    />
    <view v-else class="logo-bg flex flex-vertical-c flex-justify-c" @click="chooseImgFn">
      <image class="logo-bg__icon" src="/static/common/upload_pictures.png" />
    </view>
  </view>
</template>

<script>
  import { chooseImageByPromise } from '@/common/helper'

  export default {
    name: 'UploadLogo',
    props: {
      defaultUrl: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        filePath: '',
      }
    },
    watch: {
      defaultUrl: {
        handler(val) {
          this.filePath = val
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      chooseImgFn() {
        chooseImageByPromise({ tip: '上传中', isTencentCloud: false, count: 1 }).then((res) => {
          if (res.length > 0) {
            this.filePath = res[0].fileNameUrl
            this.$emit('success', res[0].fileNameUrl)
          } else {
            this.$emit('success', '')
            this.filePath = ''
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .logo-bg {
    width: 180rpx;
    height: 180rpx;
    background: #f6f7f8;
    &__icon {
      width: 180rpx;
      height: 180rpx;
    }
  }
</style>
