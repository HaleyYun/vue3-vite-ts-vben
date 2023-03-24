<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="idea flex flex-column"
  >
    <VoNav
      :isBack="false"
      :isFixed="true"
      :left-width="230"
      :right-width="230"
      is-have-more
      title="发想法"
      @backFn="reback"
    >
      <view slot="back" @click="reback">
        <VoIcon name="close" />
      </view>
      <view slot="operation">
        <view
          v-if="(content || videoVoicePath) && columnSelectList.length"
          class="idea-release idea-color"
          @click="releaseFn"
          >发布
        </view>
        <view v-else class="idea-release" @click="toasting">发布</view>
      </view>
    </VoNav>
    <view class="flex1 overflow-y">
      <view class="idea-choose flex flex-justify-between flex-vertical-c">
        <view class="idea-choose__button flex flex-vertical-c flex-justify-c" @click="chooseColumn">
          <VoIcon :size="20" color="#22284B" name="category" />
          <view class="button-word m-l-8">选择栏目</view>
        </view>
        <!-- <view
          class="idea-choose__button flex flex-vertical-c flex-justify-c"
          @click="chooseCategory"
        >
          <VoIcon name="category-o" :size="20" color="#22284B" />
          <view class="button-word m-l-8">选择品类</view>
        </view> -->
      </view>
      <!-- v-if="labelList.length > 0" -->
      <view class="idea-label flex">
        <!-- <view
          class="idea-label__block flex flex-vertical-c"
          v-for="(item, index) in labelList"
          :key="index"
          >
          <view class="block-name">{{ item.columnName }}</view>
          <image
            class="block-delete"
            src="/static/created/circle/delete.png"
            @click="tagDelete(index)"
          />
        </view> -->
        <view v-if="columnSelectList.length" class="idea-label__block flex flex-vertical-c">
          <view class="block-name">{{ columnSelectList[0].columnName }}</view>
          <image
            class="block-delete"
            src="/static/created/circle/delete.png"
            @click="tagDelete(columnSelectList[0])"
          />
        </view>
        <view v-if="categorySelectList.length" class="idea-label__block flex flex-vertical-c">
          <view class="block-name">{{ categorySelectList[0].name }}</view>
          <image
            class="block-delete"
            src="/static/created/circle/delete.png"
            @click="tagDelete(categorySelectList[0])"
          />
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
              :src="videoVoicePath + '&type=4'"
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
        <view class="idea-problem">
          <EraTextarea
            v-model="content"
            border="none"
            confirmType="return"
            count
            height="160"
            maxlength="500"
            placeholder="记录每时每刻的惊奇想法"
            placeholderStyle="font-size: 30rpx;color: rgba(0, 0, 0, 0.25);"
          />
          <view class="idea-problem__line" />
        </view>
        <!-- <view class="idea-content">最多输入500字</view> -->
      </block>
      <view v-if="!videoSrc" class="idea-upload">
        <view class="idea-upload__name flex flex-justify-between flex-vertical-c">
          <view class="name-left">图片上传</view>
          <view class="name-right color-block-45">{{ fileList1.length }}/9</view>
        </view>
        <view class="idea-upload__pictures">
          <view class="pictures-box">
            <view v-for="(item, index) in fileList1" :key="'img' + index" class="pictures">
              <image :src="item.url" class="pictures-img" />
              <image
                class="deleteIcon"
                src="/static/created/circle/delete.png"
                @click="deleteImg(index)"
              />
            </view>
            <view v-if="fileList1.length < 9" class="pictures" @click="openPhotoFn">
              <image
                class="pictures-img"
                mode="widthFix"
                src="/static/created/circle/upload_pictures.png"
              />
              <view class="tips">上传图片</view>
            </view>
          </view>
          <!--          <VoUpload-->
          <!--            :upload-text="'上传图片'"-->
          <!--            @success="uploadSuccess"-->
          <!--            :fileList="fileList1"-->
          <!--            name="1"-->
          <!--            multiple-->
          <!--            :maxCount="9"-->
          <!--            :previewFullImage="true"-->
          <!--            width="109"-->
          <!--            height="109"-->
          <!--          >-->
          <!--            <view class="pictures">-->
          <!--              <image-->
          <!--                class="pictures-img"-->
          <!--                src="/static/created/circle/upload_pictures.png"-->
          <!--                mode="widthFix"-->
          <!--              />-->
          <!--              <view class="tips">上传图片</view>-->
          <!--            </view>-->
          <!--          </VoUpload>-->
          <!--          <VoFormUpload-->
          <!--            ref="VoFormUpload"-->
          <!--            :limit="9"-->
          <!--            :source.sync="uploadImg"-->
          <!--            btn-text="上传图片"-->
          <!--            isNoMini-->
          <!--            isTencentCloud-->
          <!--          />-->
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
      <view v-if="userInfo.platformCode === 'supplier'" class="idea-cell">
        <VoCell
          :border="false"
          :isLink="true"
          class="idea-border"
          rightIconStyle="color:rgba(0, 0, 0, 0.45);"
          url="/pagesAgent/CreatedCenter/ReleaseCircle/IdeaChooseGood"
        >
          <view slot="title" class="cell-label"> 选择商品 </view>
          <view slot="value">
            <view class="cell-value">
              <view v-if="goodsData.goodsName" class="color-block-65 fz-32">{{
                goodsData.goodsName
              }}</view>
              <text v-else class="color-block-25 fz-32">请选择商品</text>
            </view>
          </view>
        </VoCell>
      </view>
      <view v-if="userInfo.platformCode === 'supplier'" class="idea-line" />
    </view>
    <view
      :style="{
        bottom: keyboardHeight + 'px',
      }"
      class="idea-bottom"
    >
      <StatusBar
        :isRecord="false"
        @clickRecord="upspringFn"
        @openCamrea="openCamreaFn"
        @openPhoto="openPhotoFn"
      />
      <RecordingPanel
        v-show="recording"
        ref="recordingPanel"
        @close="recording = false"
        @confirm="confirmFn"
      />
      <view class="main-checkbox">
        <view class="main-checkbox__input" @click="selectChange">
          <VoIcon v-if="isAccept" :size="24" color="#FF5319" name="select-right" />
          <VoIcon v-else :name="selectImg" :size="24" />
        </view>
        <view class="main-checkbox__text">
          本人同意并遵守
          <span class="text-a" @click="goWebView('/pages/CommonWeb/DiscoverPolicy')"
            >《社区管理制度》</span
          >内所涉及的服务和使用须知及注意事项。
        </view>
      </view>
    </view>
    <view class="safearea-box" />
    <ChooseColumnView
      ref="showFn"
      :businessType="1"
      :title="typeTitle"
      :type="type"
      @typeData="typeData"
    />
    <CircleChooseCategoryView
      ref="CircleChooseCategoryView"
      :type="type"
      title="选择品类"
      @typeData="typeDataCategory"
    />
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
  </view>
</template>

<script>
  import ChooseColumnView from './components/CircleChooseColumnView.vue'
  import CircleChooseCategoryView from './components/CircleChooseCategoryView.vue'
  import StatusBar from '@/businessComponents/CreatedCenter/StatusBar.vue'
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import helpUtil, { upload } from '@/common/helper'
  import permission from '@/common/permission'

  export default {
    name: 'TicketExPage',
    components: { ChooseColumnView, StatusBar, RecordingPanel, CircleChooseCategoryView },
    data() {
      return {
        keyboardHeight: 0,
        isLoading: false,
        voice: false, // 语音
        videoVoicePath: '',
        playStatus: 1, // 1暂停 2播放
        videoContextVoice: '',
        durationVoice: 0, //语音秒数
        typeTitle: '',
        type: '',
        columnSelectList: [],
        categorySelectList: [],
        labelList: [],
        fileList1: [],
        uploadImg: [],
        fileUrl: '', //存放图片路径传给后台
        recording: false, // 录音
        content: '',
        categoryId: '',
        columnId: '',
        modalVisible: false,

        videoSrc: '',
        duration: '', //语音，视频秒数（语音和视频不同时存在，共用一个字段）
        videoPoster: '',
        fileUrls: [], ////视频传给后台数据
        optionsId: '',
        goodsData: {
          goodsId: '',
          goodsName: '',
        },
        selectImg: 'address_select',
        isAccept: false,
      }
    },
    watch: {
      uploadImg(newVal) {
        // val:{src:'',type:1,name:'asd'}
        let arr = []
        if (newVal.length) {
          newVal.forEach((item) => {
            let obj = { url: item.src }
            arr.push(obj)
          })
        }
        this.fileList1 = arr
      },
    },
    onLoad(options) {
      // 底部位置固定
      this.isAccept = !!options?.id
      this.keyboardFn()
      // 捕获选择的商品
      uni.$on('chooseGoodsHandler', ({ id, name }) => {
        this.goodsData.goodsId = id
        this.goodsData.goodsName = name
        console.log('data', this.goodsData)
      })
      if (options.id) {
        this.optionsId = options.id

        let param = {
          id: options.id,
        }
        if (this.userInfo && this.userInfo.id) {
          param.userId = this.userInfo.id
        }
        //数据回显
        this.$VoHttp.apiCreateQuestionsQuestion$Id(param).then((res) => {
          let data = res.data
          this.content = data.content
          this.duration = this.formatSeconds(data.duration)
          this.durationVoice = data.duration
          this.goodsData.goodsId = data.goodsId
          this.goodsData.goodsName = data.goodsName
          if (data.columnName) {
            this.columnSelectList.push({
              columnName: data.columnName,
              id: data.columnId,
            })
          }
          if (data.categoryName) {
            this.categorySelectList.push({
              categoryName: data.categoryName,
              id: data.categoryId,
            })
          }
          helpUtil.regroupFileData(data)
          //回显图片
          if (data.image && data.image.length && !data.video) {
            data.image.forEach((img) => {
              this.fileList1.push({
                status: 'success',
                message: '',
                fileUrl: img,
                url: this.$getDomain(img),
              })
            })
          }
          //回显视频
          if (data.video && data.video.length) {
            this.videoSrc = this.$getDomain(data.video[0])
            this.videoPoster = this.$getDomain(data.image[0])
            that.fileUrls[1] = data.image[0]
            that.fileUrls[0] = data.video[0]
          }
          //回显音频
          if (data.audio && data.audio.length) {
            this.videoVoicePath = this.$getDomain(data.audio[0])
            //给video创建一个动态的id
            // this.videoContextVoice = uni.createInnerAudioContext()
            // this.videoContextVoice.src = this.videoVoicePath
            // this.videoContextVoice.onEnded(() => {
            //   this.playStatus = 1
            // })
            // this.voice = true
            // this.content = ''
          }
        })
      }
    },
    methods: {
      toasting() {
        // v-if="(content || videoVoicePath) && columnSelectList.length"
        if (!this.columnSelectList.length) {
          this.$u.toast('栏目不能为空，请选择！')
        } else if (!this.content && !this.videoVoicePath) {
          this.$u.toast('请输入内容')
        }
        // (content || videoVoicePath) && columnSelectList.length
      },
      reback() {
        if (this.content || this.categoryId || this.columnId || this.fileUrl) {
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
        if (!this.isAccept) {
          this.$u.toast('请勾选协议')
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
            return item.url
          })
        }
        if (this.videoVoicePath) {
          fileArr.push(this.videoVoicePath)
        }
        this.fileUrl = fileArr.join('|')
        console.log('this.fileUrl', this.fileUrl)
        let params = {
          businessType: 1,
          fileUrl: this.fileUrl,
          content: this.content,
          goodsId: this.goodsData.goodsId,
        }
        if (this.columnId) {
          params['columnId'] = this.columnId
        }
        if (this.categoryId) {
          params['categoryId'] = this.categoryId
        }

        if (+this.durationVoice) {
          params.duration = this.durationVoice
          params.content = ''
        }
        this.isLoading = true
        if (this.optionsId) {
          //编辑
          params.id = this.optionsId
          this.$VoHttp
            .apiCreateQuestionsQuestionUpdate(params)
            .then((res) => {
              uni.showToast({
                title: '保存成功',
                duration: 2000,
              })
              setTimeout(() => {
                this.$backFn()
              }, 1000)
              uni.$emit('releaseCompleteFn', { current: 1 })
              uni.$emit('refresh')
              // this.isLoading = false
              uni.hideLoading()
            })
            .catch((err) => {
              this.isLoading = false
              console.log(err)
              uni.hideLoading()
            })
        } else {
          this.$VoHttp
            .apiCreateIdeasSave(params)
            .then((res) => {
              if (res.code === '20001') {
                uni.$u.toast('发布成功')
                ////发布之后会给circleCurrent复制，发布之后返回对应模块
                uni.$emit('releaseCompleteFn', { current: 1 })
                setTimeout(() => {
                  this.$backFn()
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
        }
      },
      chooseColumn() {
        this.typeTitle = '选择栏目'
        this.type = 'column'
        this.$refs.showFn.showType(this.columnSelectList)
      },
      chooseCategory() {
        this.typeTitle = '选择品类'
        this.type = 'category'
        this.$refs.CircleChooseCategoryView.showType(this.categorySelectList)
      },
      typeData(itemData, type) {
        let itemList = itemData['data']
        if (type === 'column') {
          this.columnSelectList = itemList
          this.columnId = this.columnSelectList[0].id
        }
        // if (type === 'category') {
        //   this.categorySelectList = itemList
        //   this.categoryId = this.categorySelectList[0].id
        // }

        this.labelList = this.columnSelectList.concat(this.categorySelectList)
      },
      typeDataCategory(itemData, type) {
        let itemList = itemData['data']
        this.categorySelectList = itemList
        this.categoryId = this.categorySelectList[0].id
        this.labelList = this.columnSelectList.concat(this.categorySelectList)
      },
      /**
       * 删除标签
       * @param index
       */
      tagDelete(item, index) {
        // this.labelList.splice(index, 1)
        if (item.id) {
          this.columnSelectList = []
          this.columnId = ''
        }
        if (item.categoryId) {
          this.categorySelectList = []
        }
      },
      //视频加载完成
      loadedmetadata(data) {
        //获取语音秒数，取整
        this.durationVoice = Math.trunc(data.detail.duration)
        // let duration = Math.trunc(data.detail.duration)
        this.duration = this.formatSeconds(data.detail.duration)
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
        this.duration = ''
        this.fileList1 = []
        this.durationVoice = ''
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
        // this.openVoCameraFn()
        // return
        let that = this
        if (that.videoVoicePath) {
          uni.$u.toast('不能同时上传语音和视频')
          return false
        }
        // uni.showLoading({
        //   title: '上传中',
        // })
        helpUtil
          .chooseVideoByPromise({ tip: '上传中', durationLimit: 60 })
          .then((res) => {
            console.log('uploadVideo', res)
            that.videoSrc = res[0].fileNameUrl
            that.videoPoster = res[0].shotUrl
            that.fileUrls[0] = res[0].fileNameUrl
            that.fileUrls[1] = res[0].shotUrl
            that.fileList1 = []
            that.durationVoice = res[0].baseData.duration
            that.duration = this.formatSeconds(res[0].baseData.duration)
            console.log(that.duration)
            // uni.hideLoading()
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络错误')
            uni.hideLoading()
          })
      },
      // 上传图片
      openPhotoFn() {
        // this.openVoPhotoFn()
        // return
        const that = this
        // uni.showLoading({
        //   title: '上传中',
        // })
        if (that.fileList1.length === 9) {
          return
        }
        helpUtil
          .chooseImageByPromise({ tip: '上传中', count: 9 - that.fileList1.length })
          .then((res) => {
            console.log(res)
            that.videoSrc = ''
            res.forEach((item) => {
              that.fileList1.push({
                status: 'success',
                message: '',
                fileUrl: item.fileName,
                url: item.fileNameUrl,
              })
            })
            // uni.hideLoading()
          })
          .catch((err) => {
            console.log('err', err)
            // uni.hideLoading()
          })
      },
      // 删除图片
      deleteImg(index) {
        this.fileList1.splice(index, 1)
      },
      // 调用VoFormUpload组件方法
      openVoCameraFn() {
        this.$refs.VoFormUpload.selectUploadHandler({ type: 2 })
      },
      openVoPhotoFn() {
        this.$refs.VoFormUpload.selectUploadHandler({ type: 1 })
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
          } else {
            if (!this.recording && this.$refs.recordingPanel) {
              this.$refs.recordingPanel.reset()
            }
            this.recording = !this.recording
          }
          // 永久拒绝
          if (a === -1) {
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
            return
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
        console.log('语音播放')
        this.playStatus = 2
        this.videoContextVoice.play()
      },
      // 暂停
      stop() {
        console.log('语音暂停')
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
        console.log('duration', duration, path)
        if (this.isLoading) return
        if (Math.trunc(duration) < 1) {
          uni.$u.toast('录入语音时长过短~~')
          return
        }
        this.isLoading = true

        upload({ url: path, name: 'audio.mp3', isPath: true, tip: '上传中' })
          .then((res) => {
            console.log(res)
            this.isLoading = false
            this.recording = false
            this.videoVoicePath = res.fileNameUrl
            console.log('语音path', this.videoVoicePath)
            //给video创建一个动态的id
            // if (!this.videoContextVoice) {
            //   this.videoContextVoice = uni.createInnerAudioContext()
            // }
            // this.videoContextVoice.src = this.videoVoicePath
            // this.videoContextVoice.onEnded(() => {
            //   this.playStatus = 1
            // })
            this.durationVoice = Math.trunc(duration)
            this.duration = this.formatSeconds(duration)
            this.voice = true
            // this.content = ''
          })
          .catch((err) => {
            this.isLoading = false
            console.log('err语音', err)
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
      selectChange() {
        if (this.selectImg === 'address_select') {
          this.selectImg = 'success-fill'
          this.isAccept = true
        } else {
          this.selectImg = 'address_select'
          this.isAccept = false
        }
      },
      goWebView(url) {
        this.$linkToEasy(url + '?show=1')
        // // #ifdef H5
        // this.$linkToEasy(url + '?show=1')
        // // #endif
        // // #ifndef H5
        // this.$linkToWebView(devConf.shareBaseUrl + url)
        // // #endif
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .u-textarea__count {
    color: rgba(0, 0, 0, 0.45);
  }
  .idea {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: $v-bg-white;

    &-release {
      margin-right: 24rpx;
      background: #fff;
      border: 2rpx solid #f6f7f8;
      padding: 10rpx 46rpx;
      box-sizing: border-box;
      border-radius: 56rpx;
      font-size: 24rpx;
      color: $v-c0-25;
      font-weight: bold;
      margin-left: auto;
      text-align: center;
    }

    .idea-color {
      border: 2rpx solid #ff5319;
      color: #ff5319;
    }

    &-choose {
      margin: 32rpx 32rpx 0;

      &__button {
        width: 332rpx;
        height: 64rpx;
        line-height: 64rpx;
        background: $v-btn-disabled;
        border-radius: 32rpx;

        .button-word {
          font-size: 26rpx;
          color: $v-c0-85;
        }
      }
    }

    &-label {
      margin: 24rpx 0 0;
      padding-left: 32rpx;
      padding-right: 16rpx;
      flex-wrap: wrap;

      &__block {
        height: 36rpx;
        line-height: 36rpx;
        background: #ffece5;
        border: 2rpx solid #ff6633;
        border-radius: 32rpx;
        margin-right: 16rpx;
        padding: 0 8rpx 0 16rpx;

        .block-name {
          font-size: 24rpx;
          color: #ff5319;
          margin-right: 8rpx;
        }

        .block-delete {
          width: 24rpx;
          height: 24rpx;
        }
      }
    }

    &-problem {
      margin-left: 16rpx;
      margin-right: 16rpx;
      margin-top: 30rpx;

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

    &-upload {
      &__name {
        width: 686rpx;
        height: 48rpx;
        line-height: 48rpx;
        margin: 48rpx 32rpx 0 32rpx;

        .name-left {
          font-weight: bold;
          font-size: 32rpx;
          color: $v-c0-85;
        }

        .name-right {
          font-size: 28rpx;
          color: $v-c0-85;
        }
      }

      &__pictures {
        margin-top: 32rpx;
        padding-left: 32rpx;
        padding-right: 16rpx;
        .pictures-box {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        .pictures {
          border: 1rpx solid transparent;
          position: relative;
          width: 218rpx;
          height: 218rpx;
          margin-right: 16rpx;
          margin-bottom: 16rpx;
          border-radius: 16rpx;
          overflow: hidden;
        }
        .pictures:nth-of-type(3n) {
          margin-right: 0;
        }
        .pictures-img {
          position: absolute;
          left: 0;
          top: 0;
          width: 218rpx;
          height: 218rpx;
        }
        .tips {
          position: relative;
          z-index: 10;
          text-align: center;
          font-size: 28rpx;
          line-height: 1.5;
          margin-top: 144rpx;
          color: #bfbfbf;
        }
        .deleteIcon {
          position: absolute;
          z-index: 10;
          width: 32rpx;
          height: 32rpx;
          top: 8rpx;
          right: 8rpx;
        }
      }
    }

    &-cell {
      margin-top: 40rpx;
      box-sizing: border-box;
    }
    &-line {
      height: 2rpx;
      border-bottom: 2rpx solid $v-bg-light;
      margin: 0 32rpx;
    }

    &-border {
      // border-bottom: 2rpx solid $v-bg-light;
    }

    &-bottom {
      // position: fixed;
      // left: 0;
      // bottom: 0;
      background: #ffffff;
      z-index: 99;
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
        z-index: 67;
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
  .cell-value {
    word-break: break-all;
    flex: 1;
    white-space: normal;
  }
  .cell-label {
    width: 160rpx;
  }
  .main-checkbox {
    display: flex;
    padding: 0 50rpx;
    margin-top: 10rpx;
    margin-bottom: 16rpx;

    &__input {
      .input-img {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
      }
    }
    &__text {
      font-weight: 400;
      font-size: 24rpx;
      line-height: 1.5;
      color: $v-c0-45;

      .text-a {
        color: $v-btn-weight;
      }
    }
  }
</style>
