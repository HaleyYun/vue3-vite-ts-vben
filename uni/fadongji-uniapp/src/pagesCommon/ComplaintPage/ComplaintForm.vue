<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="idea p-b-safe-area flex flex-column"
  >
    <VoNav :isBack="false" :isFixed="true" :isHaveMore="true" title="我要投诉" @backFn="reback">
      <block slot="operation">
        <image class="record-icon" src="/static/icons/record.png" @click="toRecord" />
        <!-- <view v-if="content || videoVoicePath" class="idea-release idea-color" @click="releaseFn"
		  >发布</view
		>
		<view v-else class="idea-release">发布</view> -->
      </block>
    </VoNav>
    <view class="flex1 overflow-y m-t-16">
      <view class="idea-cells" @click="showPopup">
        <view class="idea-cells__left">投诉类型</view>
        <view class="idea-cells__right">
          <view v-if="complainType" class="value">{{ complainType }}</view>
          <view v-if="!complainType" class="placeholder">请选择</view>
          <VoIcon v-if="!complainType" :opacity="0.25" color="#000000" name="right-arrow" />
        </view>
      </view>
      <!--  语音上传  -->
      <view v-if="voice" class="idea-voice">
        <view class="idea-voice__name">语音上传</view>
        <view class="flex flex-vertical-c">
          <view class="idea-voice__wrap" @click.stop="audioPlayStart()">
            <view class="wrap-icon flex-vertical-c">
              <image class="wrap-icon__common" src="/static/icons/voice.png" />
              <view class="wrap-icon__timer">{{ durationVoice + 'S' }}</view>
            </view>
            <video
              v-if="videoVoicePath"
              id="myVoiceVideo"
              ref="myVoiceVideo"
              :src="videoVoicePath"
              class="hidden"
              @loadedmetadata="loadedmetadata"
            ></video>
          </view>
          <image
            class="idea-voice__image"
            src="/static/created/circle/delete.png"
            @click="voiceDelete"
          />
        </view>
      </view>
      <!--  文本域  -->
      <block v-if="!recording && !videoVoicePath">
        <view class="name-left top">投诉描述</view>
        <view class="idea-problem">
          <EraTextarea
            v-model="content"
            border="none"
            class="idea-problem__area"
            count
            countStyle="background: inherit;right: 32rpx;bottom: 16rpx;color: rgba(0, 0, 0, 0.25);font-size:32rpx"
            height="160"
            maxlength="150"
            placeholder="请输入需要投诉的内容"
            placeholderStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.25);"
            @input="inputFn"
          />
          <view class="idea-problem__line" />
        </view>
        <!-- <view class="idea-content">最多输入500字</view> -->
      </block>
      <view v-if="!videoSrc" class="idea-upload">
        <view class="idea-upload__name flex flex-justify-between flex-vertical-c">
          <view class="name-left">图片上传</view>
          <view class="name-right">{{ fileList1.length }}/9</view>
        </view>
        <view class="idea-upload__pictures">
          <VoFormUpload
            ref="VoFormUpload"
            :limit="9"
            :source.sync="fileList1"
            btnText="上传图片"
          />
        </view>
      </view>
      <view v-if="videoSrc" class="video-upload">
        <!-- <image class="video-upload__upload" :src="videoSrc" /> -->
        <video
          id="myVideo"
          :controls="false"
          :show-center-play-btn="false"
          :src="videoSrc + '&type=4'"
          class="hidden"
          object-fit="contain"
          @loadedmetadata="loadedmetadata"
        ></video>
        <image
          :autoplay="false"
          :controls="false"
          :disabled="false"
          :src="videoPoster"
          class="video-upload__upload"
          mode="aspectFit"
        />

        <VoIcon
          class="video-upload__close"
          color="#000000"
          name="close-fill"
          style="opacity: 0.3"
          @click="closeClick"
        />
        <view class="video-upload__poster" @click="editVideo">
          <text class="text">修改封面</text>
        </view>
        <view class="video-upload__duration">
          <text>{{ duration }}</text>
        </view>
      </view>
    </view>

    <VoModal
      v-show="modalVisible"
      :show="modalVisible"
      buttonReverse
      showCancelButton
      @cancel="cancelExit"
      @confirm="confirmExit"
    >
      <view class="slot-content">
        您编辑的内容还未发布，退出则不保存本次编辑的内容，确定退出吗？
      </view>
    </VoModal>
    <view class="safearea-box" />
    <!--    <view-->
    <!--      :style="{-->
    <!--        bottom: keyboardHeight + 'px',-->
    <!--      }"-->
    <!--      class="idea-bottom p-b-safe-area"-->
    <!--    >-->
    <view class="idea-bottom">
      <StatusBar
        :isRecord="false"
        :isVideo="false"
        @clickRecord="upspringFn"
        @openCamrea="openCamreaFn"
        @openPhoto="openPhotoFn"
      />
      <RecordingPanel v-show="recording" ref="recordingPanel" @confirm="confirmFn" @close="recording = false" />
      <view class="sumbit">
        <EraButton
          v-if="(content || videoVoicePath) && complainType"
          text="提交投诉"
          @click="releaseFn"
        />
        <EraButton v-else disabled text="提交投诉" />
      </view>
    </view>
    <ActionPopup ref="actionPopup" @select="selectType" />
  </view>
</template>

<script>
  import StatusBar from '@/businessComponents/CreatedCenter/StatusBar.vue'
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import ActionPopup from './components/ActionPopup.vue'
  import helpUtil, { upload } from '@/common/helper'
  import permission from "@/common/permission";

  export default {
    name: 'TicketExPage',
    components: { StatusBar, RecordingPanel, ActionPopup },
    data() {
      return {
        isUpload: false,
        keyboardHeight: 0,
        isLoading: false,
        voice: false, // 语音
        videoVoicePath: '',
        playStatus: 1, // 1暂停 2播放
        videoContextVoice: '',
        durationVoice: 0, //语音秒数
        typeTitle: '',
        type: '',
        fileList1: [],
        fileUrl: '', //存放图片路径传给后台
        recording: false, // 录音
        content: '',
        categoryId: '',
        columnId: '',
        modalVisible: false,

        videoSrc: '',
        duration: '',
        videoPoster: '',
        fileUrls: [], //视频传给后台数据
        optionsId: '',

        complainType: '', //投诉类型
        complainTypeId: '',
      }
    },
    onLoad(options) {
      // 底部位置固定
      this.keyboardFn()
    },
    methods: {
      inputFn(value) {
        //过滤空格
        this.content = value.replace(/\s+/g, '')
      },
      //跳转投诉记录
      toRecord() {
        this.$linkToEasy(`/pagesCommon/ComplaintPage/ComplaintRecord`)
      },
      // 选择投诉类型
      showPopup() {
        this.$refs.actionPopup.show()
      },
      // 选择投诉类型
      selectType(item) {
        this.complainType = item.name
        this.complainTypeId = item.code
        this.$refs.actionPopup.close()
      },
      reback() {
        if (this.content || this.complainType || this.fileUrl || this.videoVoicePath) {
          this.modalVisible = true
        } else {
          this.$backFn()
        }
      },
      confirmExit() {
        this.modalVisible = false
        this.$backFn()
      },
      cancelExit() {
        this.modalVisible = false
      },
      uploadSuccess(e) {
        // console.warn(e, "9999999999")
        // let arr = e.map((item) => {
        //   return item.fileUrl
        // })
        this.videoSrc = ''
      },
      /**
       * 发布
       */
      releaseFn() {
        if (this.isUpload) {
          uni.$u.toast('图片正在上传中，请稍后再试')
          return
        }
        if (this.isLoading) return
        uni.showLoading({
          title: '发布中',
          mask: true,
        })

        let fileArr = []
        if (this.videoSrc) {
          fileArr = this.fileUrls
        } else {
          fileArr = this.fileList1.map((item) => {
            return item.src
          })
        }
        if (this.videoVoicePath) {
          fileArr.push(this.videoVoicePath)
        }
        this.fileUrl = fileArr.join('|')
        let obj = { json: this.fileUrl }
        let params = {
          fileUrl: JSON.stringify(obj),
          content: this.content,
          categoryId: Number(this.complainTypeId),
          duration: this.durationVoice,
        }
        this.isLoading = true
        this.$VoHttp
          .apiContentComplaintCommitContent(params)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('提交投诉成功')
              setTimeout(() => {
                uni.redirectTo({
                  url: '/pagesCommon/ComplaintPage/ComplaintRecord',
                })
              }, 1000)
              uni.hideLoading()
            } else {
              uni.$u.toast(res.message || '发布失败')
            }
            // this.isLoading = false
          })
          .catch((err) => {
            console.log(err)
            uni.$u.toast(err.message || '发布失败')
            this.isLoading = false
            uni.hideLoading()
          })
      },
      //视频加载完成
      loadedmetadata(data) {
        //获取语音秒数，取整
        let duration = Math.trunc(data.detail.duration)
        this.durationVoice = duration
        this.duration = this.formatSeconds(duration)
        // console.log('duration', data.detail)
      },
      // 根据秒获取时间
      formatSeconds(a) {
        var hh = parseInt(a / 3600)
        var mm = parseInt((a - hh * 3600) / 60)
        if (mm < 10) mm = '0' + mm
        var ss = parseInt((a - hh * 3600) % 60)
        if (ss < 10) ss = '0' + ss
        if (hh < 10) hh = hh == 0 ? '' : `0${hh}:`
        var length = hh + mm + ':' + ss
        if (a >= 0) {
          return length
        } else {
          return '00:00'
        }
      },
      // 删除视频
      closeClick() {
        this.videoSrc = ''
      },
      //切换封面
      editVideo() {
        let that = this
        helpUtil
          .chooseImageByPromise({ tip: '上传中' })
          .then((res) => {
            console.log('上传图片', res)
            that.videoPoster = res[0].fileNameUrl
            that.fileUrls[1] = res[0].fileNameUrl
          })
          .catch((err) => {
            console.log('err', err)
          })
      },
      //上传视频
      openCamreaFn() {
        // uni.showLoading({
        //   title: '上传中',
        // })
        let that = this
        if (that.videoVoicePath) {
          uni.$u.toast('不能同时上传语音和视频')
          return false
        }
        helpUtil
          .chooseVideoByPromise({ tip: '上传中' })
          .then((res) => {
            // console.log('uploadVideo', res.fileName)
            that.videoSrc = res[0].fileNameUrl
            setTimeout(() => {
              that.videoPoster = res[0].shotUrl
            }, 5000)
            that.fileUrls[0] = res[0].fileNameUrl
            that.fileUrls[1] = res[0].shotUrl
            that.fileList1 = []
            // uni.hideLoading()
          })
          .catch((err) => {
            // uni.hideLoading()
          })
      },
      openPhotoFn() {
        console.log(this.fileList1);
        this.$refs.VoFormUpload.uploadHandler()
        return;
        if (this.fileList1.length === 9) {
          return
        }
        let that = this
        // uni.showLoading({
        //   title: '上传中',
        // })
        helpUtil
          .chooseImageByPromise({ tip: '上传中', count: 9 - this.fileList1.length })
          .then((res) => {
            console.log(res);
            that.videoSrc = ''
            // res.forEach((item) => {
            //   that.fileList1.push({
            //     name: "uQRCode.png",
            //     src: "http://testgate.fdjcyl.com/vocen-wolverine/v1/api/file/operations/getImage?fileName=temporary/20221201/391db9708d0e444d80b4b2bf3368539d.png",
            //     type: 1,
            //     status: 'success',
            //     message: '',
            //     fileUrl: item.fileName,
            //     url: item.fileNameUrl,
            //   })
            // })
            // uni.hideLoading()
          })
          .catch((err) => {
            console.log('err', err)
            // uni.hideLoading()
          })
      },

      // 弹起录音
      async upspringFn() {
        if (this.videoSrc) {
          uni.$u.toast('不能同时上传语音和视频')
          return false
        }
        let a
        if (uni.getSystemInfoSync().platform == 'ios') {
          // console.log(permissionStatus)
          console.log(a)
          var avaudiosession = plus.ios.import('AVAudioSession')
          var avaudio = avaudiosession.sharedInstance()
          await avaudio.requestRecordPermission((res) => {
            console.log('回调完成', res)
            const status = avaudio.recordPermission()
            if (+status !== 1684369017 && +status !== 1970168948) {
              if (!this.recording && this.$refs.recordingPanel) {
                this.$refs.recordingPanel.reset()
              }
              this.recording = !this.recording
            }
          })
          a = await permission.judgeIosPermission('record')
          if (!a) {
            return
          } else {
            if (!this.recording && this.$refs.recordingPanel) {
              this.$refs.recordingPanel.reset()
            }
            this.recording = !this.recording
          }
        } else {
          a = await permission.requestAndroidPermission('android.permission.RECORD_AUDIO')
          console.log(a)
          if (!a) {
            return
          } else if (a === -1) {
            uni.showModal({
              title: '提示',
              content: '请去设置打开麦克风权限',
              success: function (res) {
                if (res.confirm) {
                  permission.gotoAppPermissionSetting()
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              },
            })
          } else {
            if (!this.recording && this.$refs.recordingPanel) {
              this.$refs.recordingPanel.reset()
            }
            this.recording = !this.recording
          }
        }
      },

      /**
       * 播放录音
       */
      audioPlayStart() {
        this.playInnerAudioContext(this.videoVoicePath)
        // if (this.playStatus === 1) {
        //   this.play()
        // } else {
        //   this.stop()
        // }
      },
      // 播放
      play() {
        this.playStatus = 2
        this.videoContextVoice.play()
      },
      // 暂停
      stop() {
        this.videoContextVoice.pause()
        this.playStatus = 1
      },
      // video加载完成
      loadedmetadataVoice(data) {
        //获取语音秒数，取整
        this.durationVoice = Math.trunc(data.detail.duration)
        this.duration = this.formatSeconds(data.detail.duration)
      },
      confirmFn(path, duration) {
        if (this.isLoading) return
        this.isLoading = true
        console.log('duration', duration)
        upload({ url: path, name: 'audio.mp3', isPath: true, tip: '上传中' })
          .then((res) => {
            this.isLoading = false
            this.recording = false
            this.videoVoicePath = res.fileNameUrl
            //给video创建一个动态的id
            // if (!this.videoContextVoice) {
            //   this.videoContextVoice = uni.createInnerAudioContext()
            // }
            // this.videoContextVoice.onEnded(() => {
            //   this.playStatus = 1
            // })
            // this.videoContextVoice.src = this.videoVoicePath
            this.durationVoice = Math.trunc(duration)
            this.duration = this.formatSeconds(duration)
            this.voice = true
            this.content = ''
          })
          .catch((err) => {
            this.isLoading = false
            console.log('err', err)
          })
      },
      /**
       * 删除语音
       */
      voiceDelete() {
        this.voice = false
        this.videoVoicePath = ''
      },
      async keyboardFn() {
        // #ifdef APP-PLUS
        // screenHeight（屏幕高度）、windowHeight（可使用窗口高度） 　两者相减即为虚拟键位高度
        let _sysInfo = await uni.getSystemInfoSync()
        let _heightDiff = _sysInfo.screenHeight - _sysInfo.windowHeight

        uni.onKeyboardHeightChange((res) => {
          // 为了兼容ios和安卓  app
          if (res.height > 0 && _sysInfo.platform == 'ios') {
            this.keyboardHeight = res.height - _heightDiff
          } else {
            this.keyboardHeight = 0
          }
          console.log(this.keyboardHeight, '9999999999')
        })
        // #endif
      },
    },
  }
</script>

<style lang="scss" scoped>
  .idea {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: $v-bg-white;
    // padding-bottom: 104rpx;

    .record-icon {
      width: 48rpx;
      height: 48rpx;
      margin-right: 32rpx;
    }

    &-release {
      width: 120rpx;
      height: 56rpx;
      line-height: 56rpx;
      background: $v-btn-disabled;
      border-radius: 56rpx;
      font-size: 24rpx;
      color: $v-c0-15;
      font-weight: bold;
      border: none;
      margin-left: auto;
      text-align: center;
    }

    .idea-color {
      background: $color-primary-yellow !important;
      color: #ffffff !important;
    }

    &-label {
      margin: 24rpx 0 0;
      padding-left: 32rpx;
      padding-right: 16rpx;
      flex-wrap: wrap;

      &__block {
        height: 36rpx;
        line-height: 36rpx;
        background: $v-error-btn-disabled;
        border: 2rpx solid $v-error-light-two;
        border-radius: 32rpx;
        margin-right: 16rpx;
        padding: 0 8rpx 0 16rpx;

        .block-name {
          font-size: 24rpx;
          color: $color-primary-red;
          margin-right: 8rpx;
        }

        .block-delete {
          width: 24rpx;
          height: 24rpx;
        }
      }
    }

    &-cells {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      display: flex;

      &__left {
        color: rgba(0, 0, 0, 0.85);
        font-size: 32rpx;
        line-height: 1.5;
      }

      &__right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        line-height: 1.5;

        .placeholder {
          color: rgba(0, 0, 0, 0.25);
          font-size: 32rpx;
        }

        .value {
          color: rgba(0, 0, 0, 0.85);
          font-size: 32rpx;
        }
      }
    }

    &-problem {
      margin-left: 32rpx;
      margin-right: 32rpx;
      margin-top: 24rpx;

      &__area {
        background: #f7f7f8;
        border-radius: 4px;
      }

      &__input {
        width: 100%;
        height: 46rpx;
        line-height: 46rpx;
        color: $v-c0-85;
      }

      &__placeholder {
        width: 100%;
        height: 46rpx;
        line-height: 46rpx;
        color: $v-c0-25;
      }

      &__line {
        background-color: $v-bg-light;
        width: 686rpx;
        height: 2rpx;
        margin-left: 18rpx;
      }
    }

    &-content {
      height: 40rpx;
      font-size: 26rpx;
      line-height: 40rpx;
      color: $v-c0-25;
      margin-top: 24rpx;
      margin-left: 32rpx;
      margin-right: 32rpx;
    }

    &-voice {
      width: 100%;
      padding: 0 32rpx;
      box-sizing: border-box;
      margin-top: 64rpx;
      margin-bottom: 16rpx;

      &__name {
        font-size: 32rpx;
        height: 48rpx;
        line-height: 48rpx;
        font-weight: bold;
        margin-bottom: 32rpx;
      }

      &__wrap {
        background: #ffffff;
        box-shadow: 0px 2px 8px rgba(34, 40, 75, 0.15);
        border-radius: 8rpx;
        width: 520rpx;
        height: 80rpx;
        line-height: 80rpx;
        box-sizing: border-box;
        padding: 0 24rpx;
        margin-right: 40rpx;

        .wrap-icon {
          height: 100%;
          display: flex;

          &__common {
            width: 48rpx;
            height: 48rpx;
          }

          &__timer {
            flex: 1;
            font-weight: bold;
            font-size: 24rpx;
            line-height: 1.5;
            color: --color-primary;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
        }
      }

      &__image {
        width: 32rpx;
        height: 32rpx;
      }
    }

    .name-left {
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;

      &.top {
        padding: 24rpx 32rpx;
        box-sizing: border-box;
      }
    }

    &-upload {
      &__name {
        width: 686rpx;
        height: 48rpx;
        line-height: 48rpx;
        margin: 48rpx 32rpx 0 32rpx;

        .name-right {
          font-size: 28rpx;
          color: $v-c0-25;
        }
      }

      &__pictures {
        margin-top: 32rpx;
        padding-left: 32rpx;
        padding-right: 32rpx;
        box-sizing: border-box;
        //display: flex;

        .pictures-img {
          width: 218rpx;
          height: 218rpx;
        }
      }
    }

    &-cell {
      margin-top: 40rpx;
      margin-bottom: 120rpx;
    }

    &-border {
      border-bottom: 2rpx solid $v-bg-light;
      margin: 0 32rpx;
    }

    &-bottom {
      // position: fixed;
      // left: 0;
      // bottom: 0;
      // background: #ffffff;
      // z-index: 99;
    }

    .video-upload {
      margin-top: 64rpx;
      padding-left: 32rpx;
      padding-right: 16rpx;
      width: 344rpx;
      height: 456rpx;
      position: relative;

      &__close {
        position: absolute;
        top: 16rpx;
        right: 32rpx;
        width: 32rpx;
        height: 32rpx;
        z-index: 66;
      }

      &__normal {
        width: 344rpx;
        height: 456rpx;
        border-radius: 8rpx;
        background-color: $v-bg-light;
      }

      &__upload {
        width: 344rpx;
        height: 456rpx;
        border-radius: 8rpx;
      }

      &__poster {
        position: absolute;
        bottom: 56rpx;
        left: 132rpx;
        width: 144rpx;
        height: 56rpx;
        line-height: 56rpx;
        text-align: center;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 32rpx;
        font-size: 24rpx;
        z-index: 66;
      }

      &__duration {
        position: absolute;
        width: 344rpx;
        height: 96rpx;
        right: 16rpx;
        bottom: 0;
        box-sizing: border-box;
        padding: 16rpx;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        color: #ffffff;
        font-size: 24rpx;
        z-index: 66;
        background: linear-gradient(
          360deg,
          rgba(40, 41, 45, 0.7) 0%,
          rgba(255, 255, 255, 0) 95.26%
        );
      }
    }
  }

  .p-b-safe-area {
    background: #ffffff;
  }

  .hidden {
    display: none;
  }

  .slot-content {
    font-size: 28rpx;
    line-height: 1.5;
    text-align: center;
    color: $v-c0-65;
    padding: 28px 3px 15px 3px;
  }

  .sumbit {
    padding: 18rpx 32rpx;
    box-sizing: border-box;
    border-top: 16rpx solid #f7f7f8;

    &-btn {
      height: 92rpx;
      background: #22284b;
      border-radius: 48rpx;
      color: #ffffff;
      text-align: center;
      font-size: 32rpx;
      line-height: 92rpx;

      &.disabled {
        background: #f6f7f8;
        color: rgba(0, 0, 0, 0.25);
      }
    }
  }
</style>
