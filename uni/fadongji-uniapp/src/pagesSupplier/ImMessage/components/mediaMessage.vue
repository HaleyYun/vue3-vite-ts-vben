<template>
  <view class="media">
    <view v-if="type == 'image'">
      <!--<u&#45;&#45;image :showLoading="true" :src="videoMessageList.content.filePath"-->
      <!--:width="getMediaInfo('width')"-->
      <!--:height="getMediaInfo('height')" ></u&#45;&#45;image>-->
      <!--<u-album :showLoading="true" :urls="[videoMessageList.content.filePath+'&type=1']" ></u-album>-->

      <u-tooltip-era :direction="direction"   @click="withdrawFn('rollbackPic',15)" v-if="checkIsWithdrawFn()"  :showCopy="false" :buttons="['撤回']">

        <u--image
          slot="content"
          :height="getMediaInfo('height')"
          :src="videoMessageList.content.filePath + '&type=1'"
          :width="getMediaInfo('width')"
          mode="widthFix"
          @click="proViewImage(videoMessageList)"
        >
          <block slot="loading">
            <u-loading-icon />
          </block>
        </u--image>

      </u-tooltip-era>
      <u--image
        v-else
        :height="getMediaInfo('height')"
        :src="videoMessageList.content.filePath + '&type=1'"
        :width="getMediaInfo('width')"
        mode="widthFix"
        @click="proViewImage(videoMessageList)"
      >
        <block slot="loading">
          <u-loading-icon />
        </block>
      </u--image>

    </view>
    <view v-else>

      <u-tooltip-era :direction="direction"   @click="withdrawFn('rollbackVideo',16)" v-if="checkIsWithdrawFn()"  :showCopy="false" :buttons="['撤回']">

        <view
          slot="content"
          :style="{ width: getMediaInfo('width') + 'px', height: getMediaInfo('height') + 'px' }"
          class="video"
          @click="playVideo"
        >
          <image class="video-playback" src="/static/created/im/video_playback.png" />
          <image
            :src="videoMessageList.content.picUrl + '&type=3'"
            style="width: 100%; height: 100%"
          />
          <view class="video-time">{{ videoMessageList.content.duration | durationFilte }}</view>
        </view>

      </u-tooltip-era>

      <view
        v-else
        :style="{ width: getMediaInfo('width') + 'px', height: getMediaInfo('height') + 'px' }"
        class="video"
        @click="playVideo"
      >
        <image class="video-playback" src="/static/created/im/video_playback.png" />
        <image
          :src="videoMessageList.content.picUrl + '&type=3'"
          style="width: 100%; height: 100%"
        />
        <view class="video-time">{{ videoMessageList.content.duration | durationFilte }}</view>
      </view>
    </view>
    <EraPreviewVideo
      ref="EraPreviewVideo"
      :autoplay="true"
      :isFullScreen="true"
      :poster="videoMessageList.content.picUrl + '&type=3'"
      :videoSrc="videoMessageList.content.fileNameUrl"
    />
  </view>
</template>
<script>
import { error, isCanWithdrawFn, toast } from "@/common/helper";

export default {
    name: 'MediaMessage',
    components: {},
    filters: {
      durationFilte(val) {
        if (val) {
          let time = Number(val)
          let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
          let seconds = ((time % (1000 * 60)) / 1000).toFixed(0)
          return (
            (minutes > 10 ? minutes : '0' + minutes) +
            ':' +
            (seconds > 10 ? seconds : '0' + seconds)
          )
        } else {
          return '00:00'
        }
      },
    },
    props: {
      /**
       * bubbleType 等于left时是左边气泡样式 等于right时是右边气泡样式
       * videoStyle vertical竖屏 landscape横屏
       * verticalSrc 竖屏视频封面
       * landscapeSrc 横屏视频封面
       * lengthTime 语音时长
       */
      type: { type: String, default: 'image' },
      videoMessageList: {
        type: Object,
        default: {
          content: {},
        },
      },
      direction:{
        type:String,
        default:'top'
      }
    },
    data() {
      return {}
    },
    created() {},
    OnShow() {},
    methods: {
      checkIsWithdrawFn(){
        return this.videoMessageList.direction==='to'&&isCanWithdrawFn(this.videoMessageList.createTime)
      },
      withdrawFn(type,messageType){
        let param={
          id:this.videoMessageList.id,
          message:this.videoMessageList.message,
          messageId:this.videoMessageList.messageId,
          messageType:this.videoMessageList.messageType,
          otherId:this.videoMessageList.otherId,
          recipientId:this.videoMessageList.friendId,
          recipientPlatformCode:this.videoMessageList.friendPlatformCode
        }
        this.$VoHttp.apiMessageRecordRollbackMessage(param).then(res=>{
          toast('撤回成功','none')
          this.$emit('rollbackFn',{type:type,messageType:messageType,id:this.videoMessageList.id,
            message:this.videoMessageList.message,})

        }).catch(e=>{
          error(e.message||'撤回失败')
        })
      },
      getMediaInfo(type) {
        let width = this.videoMessageList.content.width / 2
        let height = this.videoMessageList.content.height / 2
        let maxWidth = uni.getWindowInfo().windowWidth * 0.46

        if (width > height) {
          if (width > maxWidth) {
            let scale = (maxWidth / width).toFixed(2)
            width = width * scale > maxWidth ? maxWidth : width * scale
            height = height * scale
          }
        } else {
          if (height > maxWidth) {
            let scale = (maxWidth / height).toFixed(2)
            width = width * scale > maxWidth ? maxWidth : width * scale
            height = height * scale
          }
        }
        console.log(width, height)
        if (type == 'width') {
          return width ? width.toFixed(2) : maxWidth
        } else {
          return height ? height.toFixed(2) : maxWidth
        }
      },

      playVideo() {
        this.$refs.EraPreviewVideo.show(this.videoMessageList.content.fileNameUrl)
      },
      // video播放失败
      videoErrorCallback() {},
      // 预览图片
      proViewImage(list) {
        uni.previewImage({ current: 1, urls: [list.content.filePath] })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .wrap-bubble {
    margin-left: 16rpx;
  }
  .wrap-bubble__main {
    margin-right: 16rpx;
  }
  .media {
    display: inline-block;
  }
  .video {
    position: relative;
    box-sizing: border-box;
    width: 156rpx;
    height: 338rpx;
    .myVideo {
      width: 100%;
      height: 100%;
    }
    &-playback {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 99;
      width: 88rpx;
      height: 88rpx;
    }
    &-time {
      position: absolute;
      bottom: 8rpx;
      right: 16rpx;
      color: #ffffff;
      font-size: 24rpx;
      height: 36rpx;
      line-height: 36rpx;
    }
  }
  .videos {
    position: relative;
    box-sizing: border-box;
    width: 338rpx;
    height: 156rpx;
    &-landscape {
      width: 100%;
      height: 100%;
      transform: matrix(-1, 0, 0, 1, 0, 0);
      border-radius: 8rpx;
    }
    &-playback {
      display: block;
      position: absolute;
      top: 34rpx;
      left: 124rpx;
      width: 88rpx;
      height: 88rpx;
    }
    &-time {
      position: absolute;
      bottom: 8rpx;
      right: 16rpx;
      color: #ffffff;
      font-size: 24rpx;
      height: 36rpx;
      line-height: 36rpx;
    }
  }
</style>
