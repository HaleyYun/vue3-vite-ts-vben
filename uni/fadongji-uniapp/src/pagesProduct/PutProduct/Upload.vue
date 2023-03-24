<template>
  <view>
    <view class="upload">
      <view v-for="(s, i) in list" :key="i" class="upload-item">
        <view class="upload-inner">
          <view class="preview">
            <view class="close-icon" @click="delHandler(i)">
              <VoIcon name="close" :size="16" color="#FFFFFF" />
            </view>
            <view v-if="s.type === 2" class="play-icon">
              <VoIcon name="play" :size="40" color="#ffffff" />
            </view>
            <image class="img" mode="aspectFill" :src="s.src" />
          </view>
        </view>
      </view>
      <view v-if="disabled" class="upload-item">
        <view class="upload-inner">
          <view class="upload-plus--action" @click="uploadHandler">
            <view class="fz-0">
              <VoIcon name="plus" color="#888585" :size="25" />
            </view>
            <view class="upload-text">上传</view>
          </view>
        </view>
      </view>
    </view>
    <VoActionSheet
      style="z-index: 999999"
      closeOnClickOverlay
      cancel-text="取消"
      :round="20"
      :actions="action"
      :show="show"
      safe-area-inset-bottom
      @close="show = false"
      @select="selectUploadHandler"
    />
  </view>
</template>

<script>
  import { chooseImageByPromise, chooseVideoByPromise } from '@/common/helper'

  export default {
    name: 'Upload',
    props: {
      isTencentCloud:{
        type: Boolean,
        default: false
      },
      videoLimit: {
        type: Number,
        default: 0,
      },
      limit: {
        type: Number,
        default: 9,
      },
      source: {
        type: Array,
        default() {
          return [

          ]
        },
      },
    },
    data() {
      return {
        show: false,
        action: [
          {
            name: '视频',
            color: '#666',
            fontSize: '20',
            type: 2,
          },
          {
            name: '图片',
            color: '#666',
            fontSize: '20',
            type: 1,
          },
        ],
        list: [],
      }
    },
    computed: {
      disabled() {
        return this.list.length < this.limit
      },
      videoFlag() {
        const video = this.list.filter((item) => item.type === 2)
        return video.length >= this.videoLimit
      },
    },
    watch: {
      show(newVal) {
        this.$emit('action', newVal)
      },
      source: {
        deep: true,
        handler(newVal) {
          this.list = newVal
        },
      },
    },
    mounted() {
      this.list = this.source
    },
    methods: {
      delHandler(i) {
        this.list.splice(i, 1)
      },
      async selectUploadHandler(res) {
        console.log(res)
        const count = this.limit - this.source.length
        let uploadResource = []
        if (res.type === 1) {
          // 上传图片
          console.log(count, 'count')
          const uploadData = await chooseImageByPromise({
            count,
            tip: '上传中...',
            isTencentCloud:this.isTencentCloud
          })
          uploadResource = uploadData.map((item) => {
            return {
              type: 1,
              name: item.fileName,
              src: item.filePath,
            }
          })
        }
        if (res.type === 2) {
          // 上传视频
          // 上传图片
          const uploadData = await chooseVideoByPromise({
            count,
            tip: '上传中...',
            isTencentCloud:this.isTencentCloud
          })
          uploadResource = uploadData.map((item) => {
            return {
              type: 2,
              name: item.fileName,
              src: item.filePath,
            }
          })
        }
        this.list = this.list.concat(uploadResource)
        this.$emit('update:source', this.list)
      },
      uploadHandler() {
        if (this.list.length >= this.limit) return
        if (!this.videoFlag) {
          // 判断是否已有选择视频的个数
          this.show = true
        } else {
          this.selectUploadHandler({
            type: 1,
          })
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .upload {
    margin: -20rpx -8rpx 0;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;

    ::v-deep {
      .u-popup__content {
        z-index: 999 !important;
      }

      .u-transition {
        z-index: 999 !important;
      }

      .u-popup {
        z-index: 999999;
        position: fixed;
      }
    }

    .upload-item {
      width: 33.333333%;
      padding: 0 8rpx;
      box-sizing: border-box;
      padding-top: 20rpx;

      .preview {
        height: 220rpx;
        width: 100%;

        .play-icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 9;
        }

        .close-icon {
          position: absolute;
          right: 10rpx;
          top: 10rpx;
          z-index: 9;
          border: 1rpx solid #fff;
          border-radius: 50%;
          font-size: 0;
        }

        .img {
          height: 220rpx;
          width: 100%;
        }
      }

      .upload-inner {
        overflow: hidden;
        background-color: #f7f7f8;
        height: 220rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8rpx;
        position: relative;

        .upload-plus--action {
          text-align: center;
        }
      }
    }

    .upload-text {
      color: #bfbfbf;
      font-size: 28rpx;
      margin-top: 15rpx;
    }
  }
</style>
