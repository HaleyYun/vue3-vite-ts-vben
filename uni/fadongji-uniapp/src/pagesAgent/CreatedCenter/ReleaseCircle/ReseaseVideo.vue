<template>
  <view
    class="video"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav title="发视频" is-have-more :isBack="false" :isFixed="true" @backFn="reback">
      <view slot="back" @click="reback">
        <VoIcon name="close" />
      </view>
      <view slot="operation">
        <view
          v-if="title && videoSrc && columnSelectList.length"
          class="video-release video-color"
          @click="release()"
          >发布</view
        >
        <view v-else class="video-release" @click="toasting">发布</view>
      </view>
    </VoNav>
    <EraLine />
    <view class="video-choose flex flex-vertical-c">
      <view class="video-choose__button flex flex-vertical-c flex-justify-c" @click="chooseColumn">
        <VoIcon name="category" :size="20" color="#22284B" />
        <view class="button-word m-l-8">选择栏目</view>
      </view>
      <!-- <view
        class="video-choose__button flex flex1 flex-vertical-c flex-justify-c m-l-16"
        @click="chooseCategory"
      >
        <VoIcon name="category-o" :size="20" color="#22284B" />
        <view class="button-word m-l-8">选择品类</view>
      </view> -->

      <!-- <view
        class="video-choose__button flex flex1 flex-vertical-c flex-justify-c m-l-16"
        @click="chooseProject"
      >
        <VoIcon name="category" />
        <view class="button-word m-l-8">共创项目</view>
      </view> -->
    </view>
    <view v-if="labelList.length > 0" class="video-label flex">
      <view
        class="video-label__block flex flex-vertical-c"
        v-for="(item, index) in labelList"
        :key="index"
      >
        <view class="block-name">{{ item.columnName || item.name }}</view>
        <image
          class="block-delete"
          src="/static/created/circle/delete.png"
          @click="tagDelete(item, index)"
        />
      </view>
    </view>
    <!--   输入问题标题 -->
    <view class="video-problem">
      <input
        class="video-problem__input"
        type="text"
        placeholder="有标题更容易让大家查看"
        placeholder-class="video-problem__placeholder"
        v-model="title"
        maxlength="50"
      />
      <view class="video-problem__line" />
    </view>
    <view class="video-upload">
      <view v-if="videoSrc">
        <!-- <image class="video-upload__upload" :src="videoSrc" /> -->
        <video
          id="myVideo"
          class="hidden"
          :src="videoSrc "
          object-fit="contain"
          :controls="false"
          :show-center-play-btn="false"
          @loadedmetadata="loadedmetadata"
          :poster="poster"
        ></video>
        <image
          mode="aspectFit"
          class="video-upload__upload"
          :disabled="false"
          :controls="false"
          :autoplay="false"
          :src="poster"
        />

        <!-- <VoIcon
          class="video-upload__close"
          name="close-fill"
          color="#000000"
          style="opacity: 0.3"
          @click="closeClick"
        /> -->
        <image
          class="video-upload__close"
          src="/static/created/circle/delete.png"
          @click="closeClick"
        />
        <view class="video-upload__poster" @click="editVideo()">
          <text class="text">修改封面</text>
        </view>
        <view class="video-upload__duration">
          <text>{{ durationTime }}</text>
        </view>
      </view>

      <view
        v-if="!videoSrc"
        class="video-upload__normal flex flex-justify-c flex-vertical-c"
        @click="uploadVideo"
      >
        <VoIcon name="plus" color="#000000" style="opacity: 0.15" :size="30" />
      </view>
    </view>
    <view class="video-tip">为保障观看的体验，建议您上传5分钟以内的视频。</view>
    <view
      class="video-bottom p-b-safe-area"
      :style="{
        bottom: keyboardHeight + 'px',
      }"
    >
      <StatusBar :isRecord="true" @openPhoto="editVideo()" @openCamrea="uploadVideo()" />
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
    <VoModal
      v-show="modalVisible"
      :show="modalVisible"
      showCancelButton
      @confirm="confirmExit"
      @cancel="cancelExit"
      buttonReverse
    >
      <view class="slot-content">
        您编辑的内容还未发布，退出则不保存本次编辑的内容，确定退出吗？
      </view>
    </VoModal>
    <ChooseColumnView
      :title="typeTitle"
      :businessType="2"
      :type="type"
      ref="showFn"
      @typeData="typeData"
    />
    <CircleChooseCategoryView
      title="选择品类"
      :type="type"
      ref="CircleChooseCategoryView"
      @typeData="typeDataCategory"
    />
  </view>
</template>

<script>
  import ChooseColumnView from './components/CircleChooseColumnView.vue'
  import CircleChooseCategoryView from './components/CircleChooseCategoryView.vue'
  import StatusBar from '@/businessComponents/CreatedCenter/StatusBar.vue'
  import helpUtil from '@/common/helper'

  export default {
    name: 'TicketExPage',
    components: { ChooseColumnView, StatusBar, CircleChooseCategoryView },
    data() {
      return {
        isLoading: false,
        typeTitle: '',
        type: '',
        videoSrc: '',
        duration: 0,
        durationTime: '00:00',
        labelList: [],
        videoList: [],
        columnSelectList: [],
        categorySelectList: [],
        projectSelectList: [],
        typeList: [],
        modalVisible: false,

        //formData
        title: '',
        content: '',
        categoryId: '',
        columnId: '',
        fileUrls: [],
        poster: '',
        // 键盘高度
        keyboardHeight: 0,
        optionsId: '',
        selectImg: 'address_select',
        isAccept: false,
      }
    },
    onLoad(options) {
      if (options.id) {
        this.optionsId = options.id
        // 底部位置固定
        this.keyboardFn()
        //数据回显
        this.$VoHttp
          .apiCreateVideo$Id({
            id: options.id,
          })
          .then((res) => {
            let data = res.data
            this.title = data.title
            this.duration = data.duration
            this.durationTime = this.formatSeconds(data.duration)
            if (data.columnName) {
              this.columnSelectList.push({
                columnName: data.columnName,
                id: data.columnId,
              })
              this.labelList = this.columnSelectList
            }
            // if (data.categoryName) {
            //   this.categorySelectList.push({
            //     categoryName: data.categoryName,
            //     id: data.categoryId,
            //   })
            // }
            helpUtil.regroupFileData(data)
            //回显视频
            if (data.video && data.video.length) {
              this.videoSrc = this.$getDomain(data.video[0])
              this.poster = this.$getDomain(data.image[0])
              this.fileUrls[1] = data.image[0]
              this.fileUrls[0] = data.video[0]
            }
          })
      }
    },
    methods: {
      toasting() {
        // v-if="(content || videoVoicePath) && columnSelectList.length"
        if (!this.columnSelectList.length) {
          this.$u.toast('栏目不能为空，请选择！')
        } else if (!this.title) {
          this.$u.toast('请输入标题')
        } else if (!this.videoSrc) {
          this.$u.toast('请上传要发布的视频')
        }
        // title && videoSrc && columnSelectList.length

        // if (!this.content && !this.videoVoicePath) {
        //   if (!this.videoVoicePath) {
        //     this.$u.toast('栏目不能为空，请选择！')
        //   } else if (!this.content) {
        //     this.$u.toast('栏目不能为空，请选择！')
        //   }
        // }
      },
      reback() {
        if (this.title || this.categoryId || this.columnId || this.videoSrc) {
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
      chooseProject() {
        this.typeTitle = '选择项目'
        this.type = 'project'
        this.$refs.showFn.showType(this.projectSelectList)
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

        // if (type === 'project') {
        //   this.projectSelectList = itemList
        // }

        this.labelList = this.columnSelectList.concat(this.categorySelectList)
        // this.labelList = this.labelList.concat(this.projectSelectList)
      },
      typeDataCategory(itemData, type) {
        let itemList = itemData['data']
        this.categorySelectList = itemList
        this.categoryId = this.categorySelectList[0].id
        this.labelList = this.columnSelectList.concat(this.categorySelectList)
      },
      tagDelete(item, index) {
        this.labelList.splice(index, 1)

        if (item.type === 'column') {
          this.columnSelectList = []
        }
        if (item.type === 'category') {
          this.categorySelectList = []
        }
        if (item.type === 'project') {
          this.projectSelectList = []
        }
      },
      //上传视频
      uploadVideo() {
        console.log('上传视频')
        let that = this
        helpUtil
          .chooseVideoByPromise({ tip: '上传中' })
          .then((res) => {
            console.log('uploadVideo', res)
            this.durationTime = this.formatSeconds(res[0].baseData.duration)
            this.duration = Math.trunc(res[0].baseData.duration)
            that.videoSrc = res[0].fileNameUrl
            that.poster = res[0].shotUrl
            that.fileUrls[0] = res[0].fileNameUrl
            that.fileUrls[1] = res[0].shotUrl
            // uni.hideLoading()
          })
          .catch((err) => {
            // uni.hideLoading()
            console.log('上传视频err', err)
          })
      },
      // 删除视频
      closeClick() {
        this.videoSrc = ''
      },
      loadedmetadata(data) {
        //获取语音秒数，取整
        let duration = Math.trunc(data.detail.duration)
        this.duration = duration
        this.durationTime = this.formatSeconds(duration)
        console.log('duration', data.detail)
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
      //切换封面
      editVideo() {
        console.log('11111');
        let that = this
        if (!that.videoSrc) {
          uni.$u.toast('上传视频后才可以修改封面~')
          return false
        }

        helpUtil
          .chooseImageByPromise({ tip: '上传中', count: 1 })
          .then((res) => {
            console.log('chooseImageByPromise', res)
            that.poster = res[0].fileNameUrl
            that.fileUrls[1] = res[0].fileNameUrl
            uni.hideLoading()
          })
          .catch((err) => {
            uni.hideLoading()
          })
      },
      // 发布
      release() {
        if (!this.isAccept) {
          this.$u.toast('请勾选协议')
          return;
        }
        if (this.isLoading) return
        uni.showLoading({
          title: '发布中',
          mask: true,
        })

        let params = {
          businessType: 2,
          //content: '测试', //this.content
          fileUrl: this.fileUrls.join('|'),
          title: this.title,
          duration: this.duration,
        }
        if (this.columnId) {
          params['columnId'] = this.columnId
        }
        if (this.categoryId) {
          params['categoryId'] = this.categoryId
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
            .apiCreateVideoSave(params)
            .then((res) => {
              console.log('res.data', res.message)
              if (res.code === '20001') {
                uni.$u.toast('发布成功')
                ////发布之后会给circleCurrent复制，发布之后返回对应模块
                uni.$emit('releaseCompleteFn', { current: 2 })
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
              console.log('err', err)
              uni.$u.toast(err.message || '发布失败')
              this.isLoading = false
              uni.hideLoading()
            })
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
        //
        // // #ifdef H5
        // this.$linkToEasy(url + '?show=1')
        // // #endif
        // // #ifndef H5
        // this.$linkToWebView(devConf.shareBaseUrl + url)
        // // #endif
      },
    },
    onUnload() {
      uni.offKeyboardHeightChange()
    },
  }
</script>

<style lang="scss" scoped>
  .video {
    width: 750rpx;
    min-height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: $v-bg-white;
    .hidden {
      display: none;
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
    .video-color {
      background: $color-primary-yellow !important;
      color: #ffffff !important;
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
    &-problem {
      margin-left: 28rpx;
      margin-right: 20rpx;
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
      margin-right: 38rpx;
      margin-top: 24rpx;
    }
    &-upload {
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
        z-index: 100;
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
    &-cell {
      margin-top: 24rpx;
    }
    &-border {
      border-bottom: 2rpx solid $v-bg-light;
      margin: 0 32rpx;
    }
    &-tip {
      color: $v-c0-25;
      font-size: 24rpx;
      margin: 40rpx 32rpx;
    }
    &-bottom {
      position: fixed;
      left: 0;
    }
  }
  .slot-content {
    font-size: 28rpx;
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
