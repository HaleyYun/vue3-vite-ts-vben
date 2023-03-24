<template>
  <view>
    <view :style="uploadStyle" class="upload">
      <view
        v-for="(s, i) in list"
        :key="i"
        :style="{ width: iconWidth || '33.33333%' }"
        class="upload-item"
      >
        <view class="upload-inner relative">
          <view class="preview">
            <view v-if="!preview && !readonly" class="close-icon" @click="delHandler(i)">
              <image class="close-icon__icon" src="/static/supplier/clear.png" />
            </view>
            <view v-if="s.type === 2" class="play-icon" @click="previewVideoFn(s)">
              <image class="play-icon__image" src="/static/supplier/play.png" />
            </view>
            <image
              :ref="'imagesRef' + i"
              v-if="s.type === 1 && s.src"
              :src="transferCosUrlFn(s.src, 1)"
              class="img"
              mode="aspectFill"
              @click.stop="previewImageFn(i)"
              @error="errorRefHandler('imagesRef' + i)"
            />
            <image
              v-if="s.type === 2 && s.src"
              :src="s.poster + (isTencentCloud ? '' : '&type=3')"
              class="img"
              mode="aspectFill"
              @click="previewVideoFn(s)"
            />
          </view>
          <div v-if="replace" class="absolute replace-upload" @click.stop="replaceUpload(i)">
            更换
          </div>
        </view>
      </view>
      <view
        v-if="!preview && list.length < limit"
        :style="{ width: iconWidth || '33.33333%' }"
        class="upload-item"
      >
        <view v-if="disabled">
          <view class="upload-inner">
            <view class="upload-plus--action" @click="uploadHandler">
              <view class="fz-0">
                <VoIcon :opacity="0.25" :size="30" color="#000" name="plus" />
              </view>
              <view class="upload-text">{{ btnText }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <VoActionSheet
      :actions="action"
      :round="20"
      :show="show"
      cancel-text="取消"
      closeOnClickOverlay
      safe-area-inset-bottom
      style="z-index: 999999"
      @close="close"
      @select="selectUploadHandler"
    />
    <EraPreviewVideo ref="previewVideo" :videoSrc="videoSrc" :poster="poster" autoplay />
  </view>
</template>

<script>
  import permission from '@/common/permission'
  import { chooseImageByPromise, chooseVideoByPromise, transferCosUrl } from '@/common/helper'

  export default {
    name: 'Upload',
    props: {
      replace: {
        type: Boolean,
        default: false,
      },
      // 是否上传中
      isUpload: {
        type: Boolean,
        default: false,
      },
      // 是否仅预览
      preview: {
        type: Boolean,
        default: false,
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
          return []
        },
      },
      //  上传类型 image图片video视频
      uploadType: {
        type: String,
        default: '',
      },
      //  按钮文字
      btnText: {
        type: String,
        default: '上传',
      },
      //上传图标宽度
      iconWidth: {
        type: String,
        default: '',
      },
      //上传style
      uploadStyle: {
        type: String,
        default: '',
      },
      // 只读属性（不触发上传事件）
      isTencentCloud: {
        type: Boolean,
        default: false,
      },
      // 只读属性（不触发上传事件）
      readonly: {
        type: Boolean,
        default: false,
      },
      // 缩略图是否不配置type属性
      isNoMini: {
        type: Boolean,
        default: false,
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
        videoSrc: '', // 视频地址
        poster: '', // 海报地址
        isLoading: false,
        replaceIndex: -1,
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
      source: {
        deep: true,
        handler(newVal) {
          this.list = newVal
            .filter((item) => item.src)
            .map((item) => {
              return {
                ...item,
                src: this.isNoMini ? item.src : item.src,
                poster: item.type === 1 ? '' : item.poster,
              }
            })
        },
      },
    },
    created() {
      this.list = this.source
      if (this.uploadType === 'image') {
        this.action = [
          {
            name: '图片',
            color: '#666',
            fontSize: '20',
            type: 1,
          },
        ]
      } else if (this.uploadType === 'video') {
        this.action = [
          {
            name: '视频',
            color: '#666',
            fontSize: '20',
            type: 2,
          },
        ]
      } else {
        this.action = [
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
        ]
      }
      console.log(this.action)
    },
    mounted() {
      this.list = this.source
    },
    methods: {
      delParam(url, paramKey) {
        const urlParam = url.substr(url.indexOf('?') + 1)
        const beforeUrl = url.substr(0, url.indexOf('?'))
        let nextUrl = ''

        let arr = []
        if (urlParam !== '') {
          let urlParamArr = urlParam.split('&')

          for (let i = 0; i < urlParamArr.length; i++) {
            let paramArr = urlParamArr[i].split('=')
            if (paramArr[0] !== paramKey) {
              arr.push(urlParamArr[i])
            }
          }
        }

        if (arr.length > 0) {
          nextUrl = '?' + arr.join('&')
        }
        url = beforeUrl + nextUrl
        return url
      },
      errorRefHandler(refName) {
        console.log(this.list)
        const list = []
        const targetSrc = this.$refs[refName][0].src
        this.list.forEach((item) => {
          item.src = this.delParam(item.src, 't') + '&t=' + new Date().getTime()
          list.push(item)
        })
        this.list.length = 0
        this.$nextTick(() => {
          this.list = list
        })
        console.log(list)
        // this.$refs[refName][0].src = this.$refs[refName][0].src + '&t=' + new Date().getTime()
      },
      replaceUpload(index) {
        this.replaceIndex = index
        this.uploadHandler()
      },
      transferCosUrlFn: transferCosUrl,
      close() {
        this.show = false
        this.$emit('action', this.show)
      },
      /**
       * 视频预览
       * @param item 当前点击对象
       */
      previewVideoFn(item) {
        this.videoSrc = item.src
        this.poster = item.poster
        this.$refs.previewVideo.show(this.videoSrc)
      },
      /**
       * 预览图片
       * @param i  当前点击下标
       */
      previewImageFn(i) {
        let urls = []
        this.list.map((item) => {
          urls.push(item.src)
        })
        uni.previewImage({
          urls: urls,
          current: i,
        })
      },
      delHandler(i) {
        // this.list.splice(i, 1)
        this.source.splice(i, 1)
      },
      async selectUploadHandler(res) {
        if (this.isLoading) return
        if (this.readonly) return
        if (this.list.length >= this.limit) {
          this.$u.toast('不能再上传更多了~~')
          return
        }
        this.isLoading = true
        const count = this.limit - this.source.length
        let uploadResource = []
        this.$emit('update:isUpload', true)
        if (res.type === 1) {
          this.isLoading = false
          // 上传图片
          const uploadData = await chooseImageByPromise({
            count,
            tip: '上传中...',
            isTencentCloud: this.isTencentCloud,
          })
          uploadResource = uploadData.map((item) => {
            return {
              type: 1,
              name: item.fileName,
              src: item.fileNameUrl,
              filePatLocation: item.filePatLocation || '',
            }
          })
        }
        if (res.type === 2) {
          this.isLoading = false
          // 上传视频
          // 上传图片
          const uploadData = await chooseVideoByPromise({
            count,
            tip: '上传中...',
            isTencentCloud: this.isTencentCloud,
          })
          console.log(uploadData, 'uploadDatauploadDatauploadDatauploadData')
          uploadResource = uploadData.map((item) => {
            return {
              type: 2,
              name: item.fileName,
              src: item.fileNameUrl,
              poster: item.shotUrl,
              duration: item.duration,
            }
          })
        }
        setTimeout(() => {
          if (this.replaceIndex > -1) {
            const preList = this.list.slice(0, this.replaceIndex)
            const suffixList = this.list.splice(this.replaceIndex + 1)
            this.list = preList.concat(uploadResource).concat(suffixList)
          } else {
            this.list = this.list.concat(uploadResource)
          }
          this.$emit('update:isUpload', false)
          this.$emit('update:source', this.list)
          this.$emit('action', this.show)
          this.isLoading = false
          this.replaceIndex = -1
        }, 500)
        setTimeout(() => {
          this.$forceUpdate()
        }, 1000)
      },
      uploadHandler() {
        // let a
        // if (uni.getSystemInfoSync().platform === 'ios') {
        //   a = this.getPromission()
        // } else {
        //   a = this.getPromission()
        // }
        // if (!a) return
        if (this.readonly) return
        if (this.list.length >= this.limit) return
        if (!this.videoFlag) {
          // 判断是否已有选择视频的个数
          this.show = true
          this.$emit('action', this.show)
        } else {
          this.selectUploadHandler({
            type: 1,
          })
        }
      },
      async getPromission(type) {
        let a
        if (uni.getSystemInfoSync().platform === 'ios') {
          var avaudiosession = plus.ios.import(type)
          var avaudio = avaudiosession.sharedInstance()
          avaudio.requestRecordPermission((res) => {})
          var permissionStatus = avaudio.recordPermission()
          // a = await permission.judgeIosPermission('record')
          a = !(permissionStatus === 1684369017 || permissionStatus == 1970168948)
        } else {
          a = await permission.requestAndroidPermission(type)
          // 永久拒绝
          if (a === -1) {
            permission.gotoAppPermissionSetting()
            return false
          }
        }
        return a
      },
    },
  }
</script>

<style lang="scss" scoped>
  .upload {
    .replace-upload {
      bottom: 0;
      right: 0;
      z-index: 9;
      position: absolute;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      color: #fff;
      font-size: 26rpx;
      background: rgba(17, 17, 17, 0.7);
      padding: 0 20rpx 0 30rpx;
      border-top-left-radius: 25rpx;
      border-bottom-left-radius: 25rpx;
    }

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

          &__image {
            width: 120rpx;
            height: 120rpx;
            display: block;
          }
        }

        .close-icon {
          position: absolute;
          right: 0rpx;
          top: 8rpx;
          z-index: 9;
          border-radius: 50%;
          font-size: 0;

          &__icon {
            width: 40rpx;
            height: 40rpx;
            display: block;
          }
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

  .videoWarp {
    position: absolute;
    left: 0;
    top: 450rpx;
    width: 750rpx;
  }

  .video {
    width: 750rpx;
  }
</style>
