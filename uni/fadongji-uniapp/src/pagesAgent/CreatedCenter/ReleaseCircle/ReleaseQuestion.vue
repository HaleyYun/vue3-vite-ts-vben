<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="idea flex flex-column"
    >
      <VoNav
        :isBack="false"
        :left-width="220"
        :right-width="220"
        is-have-more
        title="发问题"
        @backFn="reback"
      >
        <view slot="back" @click="reback">
          <VoIcon :opacity="0.45" color="#000" name="close"  />
        </view>
        <view slot="operation">
          <view
            v-if="(title || videoVoicePath) && columnSelectList.length"
            class="idea-release idea-color"
            @click="submitOperation"
            >发布</view
          >
          <view v-else class="idea-release" @click="toasting">发布</view>
        </view>
      </VoNav>
      <view class="flex1 overflow-y">
        <view class="idea-choose flex flex-justify-between flex-vertical-c">
          <view
            class="idea-choose__button flex flex-vertical-c flex-justify-c"
            @click="chooseColumn"
          >
            <VoIcon name="category" />
            <view class="button-word m-l-8">选择栏目</view>
          </view>
          <!-- <view class="idea-choose__button flex flex-vertical-c flex-justify-c" @click="chooseCategory">
        <VoIcon name="category" />
        <view class="button-word m-l-8">选择品类</view>
      </view> -->
        </view>
        <!--  v-if="labelList.length > 0" -->
        <view class="idea-label flex">
          <!-- <view
        class="idea-label__block flex flex-vertical-c"
        v-for="(item, index) in labelList"
        :key="index"
      >
        <view v-if="type === 'column'" class="block-name">{{ item.columnName }}</view>
        <view v-if="type === 'category'" class="block-name">{{ item.name }}</view>
        <image
          class="block-delete"
          src="/static/created/circle/delete.png"
          @click="tagDelete(item, index)"
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
              <!--              <video-->
              <!--                id="myVoiceVideo"-->
              <!--                :src="videoVoicePath"-->
              <!--                class="hidden"-->
              <!--                ref="myVoiceVideo"-->
              <!--                @ended="test"-->
              <!--                @play="test"-->
              <!--              ></video>-->
            </view>
            <image
              class="idea-voice__image"
              src="/static/created/circle/delete.png"
              @click="voiceDelete"
            />
          </view>
        </view>
        <view v-if="!recording && !videoVoicePath">
          <!--   输入问题标题 -->
          <view class="idea-problem">
            <input
              v-model="title"
              class="idea-problem__input"
              placeholder="请输入问题以问号结尾"
              placeholder-class="idea-problem__placeholder"
              type="text"
            />
            <view class="idea-problem__line" />
          </view>
          <!--  详情文本域-->
          <view class="idea-content">
            <EraTextarea
              v-model="content"
              :autoHeight="true"
              border="none"
              maxlength="500"
              placeholder="对问题补充说明，便于回答者更准确的解答"
              placeholderStyle="color:rgba(0, 0, 0, 0.25);font-size:26rpx;"
            />
            <view class="idea-content__num">{{ content.length }}/500</view>
          </view>
        </view>

        <view v-if="!videoSrc" class="idea-upload">
          <view class="idea-upload__name flex flex-justify-between flex-vertical-c">
            <view class="name-left">图片上传</view>
            <view class="name-right">{{ fileList1.length }}/9</view>
          </view>
          <view class="idea-upload__tips">图片上传提示</view>
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
            <!--            <VoUpload-->
            <!--              :fileList="fileList1"-->
            <!--              :maxCount="9"-->
            <!--              :previewFullImage="true"-->
            <!--              :upload-text="'上传图片'"-->
            <!--              height="109"-->
            <!--              multiple-->
            <!--              name="1"-->
            <!--              width="109"-->
            <!--              @success="uploadSuccess"-->
            <!--            >-->
            <!--              <view class="pictures">-->
            <!--                <image-->
            <!--                  class="pictures-img"-->
            <!--                  src="/static/created/circle/upload_pictures.png"-->
            <!--                  mode="widthFix"-->
            <!--                />-->
            <!--                <view class="tips">上传图片</view>-->
            <!--              </view>-->
            <!--            </VoUpload>-->
            <!--            <VoFormUpload-->
            <!--              isTencentCloud-->
            <!--              ref="VoFormUpload"-->
            <!--              :limit="9"-->
            <!--              :source.sync="uploadImg"-->
            <!--              btn-text="上传图片"-->
            <!--              isNoMini-->
            <!--            />-->
          </view>
        </view>
        <view v-if="videoSrc" class="video-upload">
          <!-- <image class="video-upload__upload" :src="videoSrc" /> -->
          <video
            id="myVideo"
            :controls="false"
            :show-center-play-btn="false"
            :src="videoSrc"
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
        <!-- <VoCellGroup class="idea-cell" :border="false">
        <VoCell
          class="idea-border"
          title="选择商品"
          :isLink="true"
          value="请选择商品"
          :border="false"
          rightIconStyle="color:rgba(0, 0, 0, 0.85);"
        />
      </VoCellGroup> -->
      </view>

      <view
        :style="{
          bottom: keyboardHeight + 'px',
        }"
        class="p-b-safe-area"
      >
        <StatusBar
          :isRecord="false"
          @clickRecord="upspringFn"
          @openCamrea="openCamreaFn"
          @openPhoto="openPhotoFn"
        />
        <RecordingPanel
          v-if="recording"
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
    </view>
    <ChooseColumnView
      ref="showFn"
      :businessType="0"
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
    <ChooseCategoryView
      ref="showCategoryFn"
      :title="typeTitle"
      :type="typeCategory"
      @typeData="categoryData"
    />
    <VoModal
      v-show="modalVisible"
      :confirmWeight="400"
      :show="modalVisible"
      confirmColor="rgba(0,0,0,0.85)"
      showCancelButton
      @cancel="cancelExit"
      @confirm="confirmExit"
    >
      <view class="slot-content"
        >您编辑的内容还未发布，退出则不保存本次编辑的内容，确定退出吗？</view
      >
    </VoModal>
  </view>
</template>

<script>
  import ChooseColumnView from './components/CircleChooseColumnView.vue'
  import CircleChooseCategoryView from './components/CircleChooseCategoryView.vue'
  import ChooseCategoryView from './components/CircleChooseCategoryView.vue'
  import StatusBar from '@/businessComponents/CreatedCenter/StatusBar.vue'
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import helpUtil, { upload } from '@/common/helper'
  import devConf from '@/common/env'
  import permission from '@/common/permission'
  // import { showCosUrl } from '@/common/env'

  export default {
    name: 'TicketExPage',
    components: {
      ChooseColumnView,
      ChooseCategoryView,
      StatusBar,
      RecordingPanel,
      CircleChooseCategoryView,
    },
    data() {
      return {
        keyboardHeight: 0,
        isLoading: false,
        modalVisible: false, // 返回提醒模态框
        typeTitle: '', // 选择品类或选择栏目标题
        columnId: '', // 栏目id
        categoryId: '', // 商品类别
        title: '', // 标题
        content: '', // 内容
        type: 'column', // column栏目 category品类
        typeCategory: 'category', // column栏目 category品类
        recording: false,
        labelList: [],
        fileList1: [],
        uploadImg: [],
        disabled: false,
        columnSelectList: [],
        categorySelectList: [],
        typeList: [],
        fileUrl: '', //存放图片路径传给后台
        videoSrc: '',
        duration: '', //语音，视频秒数（语音和视频不同时存在，共用一个字段）
        videoPoster: '',
        fileUrls: [], ////视频传给后台数据
        voice: false, // 语音
        videoVoicePath: '',
        playStatus: 1, // 1暂停 2播放
        videoContextVoice: null,
        durationVoice: 0, //语音秒数
        optionsId: '',
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
            let obj = { url: item.src, poster: item.poster }
            arr.push(obj)
          })
        }
        this.fileList1 = arr
      },
    },
    onLoad(options) {
      this.keyboardFn()
      this.isAccept = !!options?.id
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
          console.log(res)
          let data = res.data
          this.title = data.title
          this.content = data.content
          this.duration = this.formatSeconds(data.duration)
          this.durationVoice = Math.trunc(data.duration)
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
            this.voice = true
            this.resetContent()
          }
        })
      }
    },
    methods: {
      selectChange() {
        if (this.selectImg === 'address_select') {
          this.selectImg = 'success-fill'
          this.isAccept = true
        } else {
          this.selectImg = 'address_select'
          this.isAccept = false
        }
      },
      toasting() {
        // v-if="(content || videoVoicePath) && columnSelectList.length"
        if (!this.columnSelectList.length) {
          this.$u.toast('栏目不能为空，请选择！')
        } else if (!this.title) {
          this.$u.toast('请输入标题！')
        }
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
      /**
       * 点击返回按钮触发（如果编辑弹出模态框，否则直接返回）
       */
      reback() {
        if (
          this.title ||
          this.content ||
          this.fileUrl ||
          this.categorySelectList.length ||
          this.columnSelectList.length
        ) {
          this.modalVisible = true
        } else {
          this.$backFn()
        }
      },
      // 删除图片
      deleteImg(index) {
        this.fileList1.splice(index, 1)
      },
      // 确定
      confirmExit() {
        this.modalVisible = false
        this.$backFn()
      },
      // 取消
      cancelExit() {
        this.modalVisible = false
      },
      uploadSuccess() {
        this.videoSrc = ''
      },
      submitOperation() {
        this.releaseFn()
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
          // this.fileList1.map((item) => {
          //   if (item.poster) {
          //     fileArr.push(item.poster)
          //   }
          //   fileArr.push(item.url)
          // })
        }

        if (this.videoVoicePath) {
          fileArr.push(this.videoVoicePath)
        }
        this.fileUrl = fileArr.join('|')
        console.log('this.fileUrl', this.fileUrl)

        let param = {
          businessType: 0,
          content: this.content,
          fileUrl: this.fileUrl,
          title: this.title,
          // categoryId: this.categorySelectList[0].id, // 商品类别
          // columnId: this.columnSelectList[0].id, // 栏目
        }
        if (this.columnSelectList.length) {
          param['columnId'] = this.columnSelectList[0].id
        }
        if (this.categorySelectList.length) {
          param['categoryId'] = this.categorySelectList[0].id
        }
        if (this.durationVoice) {
          param.duration = this.durationVoice
        }
        this.isLoading = true
        if (this.optionsId) {
          //编辑
          param.id = this.optionsId
          this.$VoHttp
            .apiCreateQuestionsQuestionUpdate(param)
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
              console.log(err)
              this.isLoading = false
              uni.hideLoading()
            })
        } else {
          //发布
          this.$VoHttp
            .apiCreateQuestionsQuestionSave(param)
            .then((res) => {
              uni.showToast({
                title: '发布成功',
                duration: 2000,
              })
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
              uni.$u.toast(err.message || '发布失败')
              console.log(err)
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
        // console.log(itemData, 'sssssssssssssssssss')
        // console.log(type, 'bbbbbbbbbbbbbbb')
        let itemList = itemData['data']

        if (type === 'column') {
          this.columnSelectList = itemList
          this.columnId = this.columnSelectList[0].id
        }
        if (type === 'category') {
          this.categorySelectList = itemList
          this.categoryId = this.categorySelectList[0].id
        }

        this.labelList = this.columnSelectList.concat(this.categorySelectList)
      },
      typeDataCategory(itemData, type) {
        let itemList = itemData['data']
        this.categorySelectList = itemList
        this.categoryId = this.categorySelectList[0].id
        this.labelList = this.columnSelectList.concat(this.categorySelectList)
      },
      categoryData(itemData, type) {
        let itemList = itemData['data']
        if (type === 'column') {
          this.columnSelectList = itemList
          this.columnId = this.columnSelectList[0].id
        }
        if (type === 'category') {
          this.categorySelectList = itemList
          this.categoryId = this.categorySelectList[0].id
        }
        this.labelList = this.columnSelectList.concat(this.categorySelectList)
      },
      tagDelete(item, index) {
        // this.labelList.splice(index, 1)

        if (item.id) {
          this.columnSelectList = []
        }
        if (item.categoryId) {
          this.categorySelectList = []
        }
      },
      // 删除图片
      deletePic(event) {
        this[`fileList${event.name}`].splice(event.index, 1)
      },

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
        console.log('上传图片11')
        let that = this
        helpUtil
          .chooseImageByPromise({ tip: '上传中', count: 1 })
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
            this.uploadImg.push({ type: 1, src: that.videoSrc, name: '' })
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络错误')
          })
      },
      // 上传图片
      openPhotoFn() {
        // this.openVoPhotoFn()
        // return
        let that = this
        if (that.fileList1.length === 9) {
          return
        }
        // uni.showLoading({
        //   title: '上传中',
        // })
        helpUtil
          .chooseImageByPromise({ tip: '上传中', count: 9 - that.fileList1.length })
          .then((res) => {
            console.log('图片上传', res)
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
        console.log('vvvvvvv', this.playStatus)
        this.playInnerAudioContext(this.videoVoicePath)
        // if (this.playStatus === 1) {
        //   this.play()
        // } else {
        //   this.stop()
        // }
      },
      // 播放
      play() {
        console.log(this.videoContextVoice)
        this.videoContextVoice.play()
        this.playStatus = 2
      },
      // 暂停
      stop() {
        this.videoContextVoice.pause()
        this.playStatus = 1
      },
      // video加载完成
      loadedmetadataVoice(data) {
        //获取语音秒数，取整
        this.duration = this.formatSeconds(data.detail.duration)
        this.durationVoice = Math.trunc(data.detail.duration)
      },
      confirmFn(path, duration) {
        console.log('duration', duration)
        if (this.isLoading) return
        if (Math.trunc(duration) < 1) {
          uni.$u.toast('录入语音时长过短~~')
          return
        }
        this.isLoading = true

        upload({ url: path, name: 'audio.mp3', isPath: true, tip: '上传中' })
          .then((res) => {
            console.log('rrrrr', res)
            this.videoVoicePath = res.fileNameUrl
            //给video创建一个动态的id
            // if (!this.videoContextVoice) {
            //   this.videoContextVoice = uni.createInnerAudioContext()
            // }
            // this.videoContextVoice.src = this.videoVoicePath
            // this.videoContextVoice.onEnded(() => {
            //   this.playStatus = 1
            // })
            this.duration = this.formatSeconds(duration)
            this.durationVoice = Math.trunc(duration)
            this.voice = true
            this.resetContent()
          })
          .catch((err) => {
            console.log('err', err)
            this.$u.toast(err.message || '网络错误')
          })
          .finally(() => {
            this.isLoading = false
            this.recording = false
          })
      },
      /**
       * 删除语音
       */
      voiceDelete() {
        this.voice = false
        this.videoVoicePath = ''
      },
      //重置表单
      resetContent() {
        this.title = ''
        this.content = ''
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
    .hidden {
      display: none;
    }
    &-release {
      width: 144rpx;
      height: 56rpx;
      line-height: 56rpx;
      border: 2rpx solid #f6f7f8;
      border-radius: 32rpx;
      font-size: 24rpx;
      color: $v-c0-25;
      //margin-left: auto;
      text-align: center;
      margin-right: 24rpx;
      box-sizing: border-box;
    }
    .idea-color {
      border: 2rpx solid $color-primary-yellow;
      color: $color-primary-yellow;
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
        background-color: #ffece5;
        border: 2rpx solid $v-tags-one;
        border-radius: 32rpx;
        margin-right: 16rpx;
        padding: 0 8rpx 0 16rpx;
        box-sizing: border-box;
        .block-name {
          font-size: 24rpx;
          color: $v-tags;
          margin-right: 8rpx;
        }
        .block-delete {
          width: 24rpx;
          height: 24rpx;
        }
      }
    }
    &-problem {
      margin-left: 32rpx;
      margin-right: 32rpx;
      margin-top: 48rpx;
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
        margin-top: 16rpx;
        background-color: $v-bg-light;
        width: 100%;
        height: 1px;
      }
    }
    &-content {
      margin-left: 16rpx;
      margin-right: 16rpx;
      margin-top: 4rpx;
      &__num {
        font-size: 28rpx;
        color: $v-c0-45;
        text-align: right;
        margin: 24rpx 16rpx 0 16rpx;
        padding-bottom: 16rpx;
        border-bottom: 2rpx solid $v-bg-light;
      }
    }
    &-upload {
      margin-top: 48rpx;
      margin-bottom: 20rpx;
      &__name {
        width: 686rpx;
        height: 48rpx;
        line-height: 48rpx;
        margin: 0 32rpx 0 32rpx;
        .name-left {
          font-weight: bold;
          font-size: 32rpx;
          color: $v-c0-85;
        }
        .name-right {
          font-size: 28rpx;
          color: $v-c0-45;
        }
      }
      &__tips {
        margin: 12rpx 0 0 32rpx;
        font-size: 28rpx;
        color: $v-c0-25;
      }
      &__pictures {
        margin-top: 32rpx;
        padding: 0 32rpx;
        box-sizing: border-box;
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
      margin-top: 24rpx;
    }
    &-border {
      border-bottom: 2rpx solid $v-bg-light;
      margin: 0 32rpx;
    }
    .video-upload {
      margin-top: 64rpx;
      padding-left: 32rpx;
      padding-right: 16rpx;
      width: 344rpx;
      height: 456rpx;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
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
        //height: 456rpx;
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
    .idea-voice {
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
  }
  .slot-content {
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
    color: $v-c0-65;
    padding: 28px 3px 15px 3px;
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
