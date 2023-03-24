<template>
  <view class="post-question p-b-safe-area">
    <VoNav
      :isBack="false"
      :isFixed="true"
      :rightWidth="200"
      :title="optionsAnswerId ? '修改回答' : '写回答'"
      is-have-more
      @backFn="backFn"
    >
      <view slot="operation">
        <view v-if="content" class="nav-btn" @click="toRelease">发布</view>
        <view v-else class="nav-btn disabled">发布</view>
      </view>
    </VoNav>
    <view class="post-question__main">
      <view class="main-top">
        <VoIcon :size="24" class="main-top__icon" name="w-tag" />
        <view v-if="info.title && !info.audio" class="main-top__text">
          <text v-if="info.title.length > 30 && !showAllTitle">
            {{ info.title.slice(0, 30) }}
          </text>
          <text v-else>{{ info.title }}</text>
          <u-icon
            v-if="info.title.length > 30"
            :name="showAllTitle ? 'arrow-up' : 'arrow-down'"
            class="right-icon m-l-8"
            color="rgba(0, 0, 0, 0.45)"
            size="14"
            @click="showAllTitle = !showAllTitle"
          />
        </view>
        <VoAudioVoice v-if="info.audio" :info="info" />
      </view>
      <view class="main-btm">
        <!--        <view class="main-btm__tool">-->
        <!--          <view class="tool-item first" @click="chooseColumn">-->
        <!--            <VoIcon name="category" :size="20" color="#22284B" />-->
        <!--            <view class="tool-item__name">选择栏目</view>-->
        <!--          </view>-->
        <!--          <view class="tool-item" @click="chooseCategory">-->
        <!--            <VoIcon name="category-o" :size="20" color="#22284B" />-->
        <!--            <view class="tool-item__name">选择品类</view>-->
        <!--          </view>-->
        <!--        </view>-->
        <view v-if="labelList.length > 0" class="idea-label flex">
          <view
            v-for="(item, index) in labelList"
            :key="index"
            class="idea-label__block flex flex-vertical-c"
          >
            <view class="block-name">{{ item.columnName }}</view>
            <image
              class="block-delete"
              src="/static/created/circle/delete.png"
              @click="tagDelete(index)"
            />
          </view>
        </view>
        <!-- <video :src="videoSrc"></video> -->
        <view id="content" class="main-btm__area">
          <editor
            id="editor"
            class="ql-container"
            placeholder="请输入回答内容"
            @blur="editorBlur"
            @focus="editorFocus"
            @input="editorInput"
            @ready="onEditorReady"
          />
          <!-- <button type="warn" @tap="undo">撤销</button> -->
        </view>
        <view class="tips">
          <view>图片最多上传9张 {{ imgCount }}/9</view>
          <view>{{ textLength }}/{{ maxLength }}</view>
        </view>
        <view class="toolbar">
          <image class="toolbar-icon" src="/static/icons/img.png" @click="insertImage('album')" />
          <!-- <image
              class="toolbar-icon"
              src="/static/icons/camrea.png"
              @click="insertImage('camera')"
            /> -->
          <image class="toolbar-icon" src="/static/icons/video.png" @click="insertVideo()" />
        </view>
      </view>
    </view>
    <ChooseColumnView
      v-show="showChooseView"
      ref="showFn"
      :businessType="3"
      :title="typeTitle"
      :type="type"
      @cancel="chooseViewCancel"
      @typeData="typeData"
    />
    <VoModal
      v-show="modalVisible"
      :show="modalVisible"
      buttonReverse
      showCancelButton
      @cancel="cancelExit"
      @confirm="confirmExit"
    >
      <view class="slot-content"> 您确定要退出编辑吗？退出后会清空编辑内容</view>
    </VoModal>
    <!-- <u-parse :content="test" /> -->
  </view>
</template>

<script>
  import helpUtil from '@/common/helper'
  import ChooseColumnView from '@/pagesAgent/CreatedCenter/ReleaseCircle/components/CircleChooseColumnView.vue'

  export default {
    name: 'QuestionPost',
    components: {
      ChooseColumnView,
    },
    props: {},
    data() {
      return {
        isLoading: false,
        info: '',
        content: '',
        statusBarHeight: 0,
        showStatusBar: false,
        editable: true,
        modalVisible: false,
        isRelease: false,

        videoSrc: '',
        typeTitle: '',
        type: '',
        columnSelectList: [],
        categorySelectList: [],
        labelList: [],
        showChooseView: false,
        answerInfo: '',
        // 上传图片数量
        imgCount: 0,
        // 编写文字长度
        textLength: 0,
        maxLength: 5000,
        optionsAnswerId: '',
        showAllTitle: false,
      }
    },
    created() {
      const res = uni.getSystemInfoSync()
      this.statusBarHeight = res.statusBarHeight
    },
    onLoad(options) {
      if (options.id) {
        // let data = JSON.parse(options.data)
        // this.info = data
        this.getDetail(options.id)
      }
      if (options.answerId) {
        this.optionsAnswerId = options.answerId
        this.getAnswerDeatil(options.answerId)
      }
    },
    methods: {
      //获取回答详情，回显到页面
      getAnswerDeatil(id) {
        this.$VoHttp
          .apiCreateQuestionsAnswer$Id({
            id: id,
          })
          .then((res) => {
            this.info = res.data
            //回答内容
            this.answerInfo = res.data.communityCommentVOList[0]
            setTimeout(() => {
              this.editorCtx.setContents({
                html: JSON.parse(this.answerInfo.comment).json,
              })
            }, 1000)
          })
      },
      //获取问题详情
      getDetail(id) {
        let param = {
          // businessType: this.info.businessType,
          id: id,
        }
        if (this.userInfo && this.userInfo.id) {
          param.userId = this.userInfo.id
        }
        this.$VoHttp.apiCreateQuestionsQuestion$Id(param).then((res) => {
          helpUtil.regroupFileData(res.data)
          this.info = res.data
        })
      },
      toRelease() {
        if (this.isLoading) return
        uni.showLoading({
          title: '发布中',
          mask: true,
        })

        let obj = { json: this.content }
        let comment = JSON.stringify(obj)

        // if (this.columnId) {
        //   params['columnId'] = this.columnId
        // }
        // if (this.categoryId) {
        //   params['categoryId'] = this.categoryId
        // }
        this.isLoading = true
        if (this.answerInfo) {
          let params = {
            businessType: 3,
            comment: comment,
            id: this.answerInfo.id,
          }
          //编辑提交
          this.$VoHttp
            .apiCreateQuestionsAnswerUpdate(params)
            .then((res) => {
              if (res.code === '20001') {
                uni.$u.toast('编辑成功')
                this.editorCtx.clear()
                this.content = ''
                setTimeout(() => {
                  uni.$emit('refresh')
                  uni.$emit('answerRefresh', true)
                  this.$backFn()
                }, 1000)
                // this.isLoading = false
                uni.hideLoading()
              } else {
                uni.$u.toast(res.message || '编辑失败')
              }
            })
            .catch((err) => {
              console.log(err)
              uni.$u.toast(err.message || '发布失败')
              this.isLoading = false
              uni.hideLoading()
            })
        } else {
          let params = {
            businessType: 3,
            comment: comment,
            contentId: this.info.id,
          }
          this.$VoHttp
            .apiCreateQuestionsAnswerSave(params)
            .then((res) => {
              if (res.code === '20001') {
                uni.$u.toast('发布成功')
                this.editorCtx.clear()
                this.content = ''
                setTimeout(() => {
                  uni.$emit('refresh')
                  uni.$emit('answerRefresh', true)
                  this.$backFn()
                }, 1000)
                // this.isLoading = false
                uni.hideLoading()
              } else {
                uni.$u.toast(res.message || '发布失败')
              }
            })
            .catch((err) => {
              console.log(err)
              uni.$u.toast(err.message || '发布失败')
              this.isLoading = false
              uni.hideLoading()
            })
        }
      },
      backFn() {
        if (this.content || this.categoryId || this.columnId) {
          this.modalVisible = true
        } else {
          this.$backFn()
        }
      },
      confirmExit() {
        this.modalVisible = false
        this.editorCtx.clear()
        uni.navigateBack()
      },
      cancelExit() {
        this.modalVisible = false
      },
      chooseColumn() {
        this.typeTitle = '选择栏目'
        this.type = 'column'
        this.$refs.showFn.showType(this.columnSelectList)
        this.showChooseView = true
      },
      chooseCategory() {
        this.typeTitle = '选择品类'
        this.type = 'category'
        this.$refs.showFn.showType(this.categorySelectList)
        this.showChooseView = true
      },
      chooseViewCancel() {
        this.showChooseView = false
      },
      typeData(itemData, type) {
        console.log(itemData)
        let itemList = itemData['data']
        console.log(itemList)
        console.log(type)
        if (type === 'column') {
          this.columnSelectList = itemList
          this.columnId = this.columnSelectList[0].id
        }
        if (type === 'category') {
          this.categorySelectList = itemList
          this.categoryId = this.categorySelectList[0].id
        }

        this.labelList = this.columnSelectList.concat(this.categorySelectList)
        // console.log(this.categorySelectList + '111112')
        // console.log(this.columnSelectList + '111113')
        // console.log(this.labelList + '111114')
      },
      /**
       * 删除标签
       * @param index
       */
      tagDelete(index) {
        this.labelList.splice(index, 1)
      },
      //富文本渲染完成
      onEditorReady() {
        // #ifdef APP-PLUS || H5 ||MP-WEIXIN
        uni
          .createSelectorQuery()
          .select('#editor')
          .context((res) => {
            this.editorCtx = res.context
            this.editor
            if (!res) return
            console.log('this.editorCtx', this.editorCtx)
          })
          .exec()
        // #endif
      },
      //富文本编辑
      editorInput(e) {
        let _this = this
        // console.log(e.detail)
        if (e.detail.text) {
          let textContent = e.detail.text.replace(/\n/g, '')
          if (textContent.length >= this.maxLength) {
            _this.editorCtx.clear()
            _this.editorCtx.insertText({
              text: textContent.slice(0, 5000),
            })
            this.textLength = 5000
          } else {
            this.textLength = e.detail.text.replace(/\n/g, '').length
          }
        }

        this.content = e.detail.html
        this.imgCount = 0
        if (e.detail.delta && e.detail.delta.ops) {
          e.detail.delta.ops.forEach((item) => {
            if (item.insert.image) {
              this.imgCount += 1
            }
          })
        }
        // if (e.detail.text) {
        //   this.textLength = e.detail.text.replace(/\n/g, '').length
        // }
      },
      //富文本聚焦
      editorFocus() {
        // this.showStatusBar = true
      },
      //富文本失焦
      editorBlur() {
        // this.showStatusBar = false
      },
      //富文本撤销
      undo() {
        this.editorCtx.undo()
      },
      //富文本插入图片
      insertImage() {
        let _this = this
        if (this.imgCount >= 9) {
          return
        }
        // _this.$refs.article.insertImg()
        helpUtil
          .chooseImageByPromise({ tip: '上传中' })
          .then((res) => {
            console.log('上传图片', res)
            if (res && res.length) {
              res.forEach((item) => {
                _this.editorCtx.insertImage({
                  extClass: 'rich-image',
                  src: item.fileNameUrl,
                  alt: '图像',
                  width: '100%',
                  mode: 'widthFix',
                  // data: {
                  //   video:
                  //     'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
                  // },
                  success: function () {
                    console.log('insert image success')
                  },
                })
              })
            }
          })
          .catch((err) => {
            console.log('err', err)
          })
      },
      //富文本插入视频
      insertVideo() {
        let _this = this
        // helper.showLoading()
        helpUtil
          .chooseVideoByPromise({ tip: '上传中' })
          .then((res) => {
            console.log('uploadVideo', res)
            // helper.hideLoading()
            _this.editorCtx.insertImage({
              extClass: 'video-poster',
              src: res[0].shotUrl, //视频封面图，第一帧图片
              alt: '图像',
              width: '100%',
              mode: 'widthFix',
              data: {
                video: res[0].fileNameUrl,
              },
              success: function () {
                console.log('insert image success')
              },
            })
          })
          .catch((err) => {
            // helper.hideLoading()
          })
        // _this.$refs.article.insertVideo()
        // uni.chooseVideo({
        //   sourceType: ['camera', 'album'],
        //   success: function (res) {
        //     console.log('res.tempFilePath', res.tempFilePath)
        //     _this.videoSrc = res.tempFilePath
        //     let videoPoster = '/static/logo-2.png'
        //   },
        // })
      },
      // 删除图片/视频/音频标签事件
      remove(e) {
        // 删除线上资源
        // remove(e.src)
        console.log('remove')
        this.editable = true
      },
    },
  }
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
  .post-question {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    font-size: 14px;
    background: #fff;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;

    .nav-btn {
      padding: 10rpx 28rpx;
      margin-right: 16rpx;
      color: #ff5319;
      border-radius: 200rpx;
      border: 2rpx solid #ff5319;
      text-align: center;
      line-height: 1.5;
      font-size: 24rpx;

      &.disabled {
        border: 2rpx solid #f6f7f8;
        color: $v-c0-25;
      }
    }

    &__main {
      flex: 1;
      display: flex;
      flex-direction: column;

      .main-top {
        display: flex;
        flex-direction: row;
        border-bottom: 16rpx solid #f7f7f8;
        padding: 24rpx 32rpx;

        &__icon {
          width: 48rpx;
          height: 48rpx;
          margin-top: 6rpx;
          margin-right: 6rpx;
        }

        &__text {
          flex: 1;
          font-size: 18px;
          line-height: 1.5;
          color: $v-c0-85;
          font-weight: bold;
        }
      }

      .main-btm {
        flex: 1;
        display: flex;
        flex-direction: column;

        &__tool {
          display: flex;
          flex-direction: row;
          padding: 32rpx 32rpx 24rpx 32rpx;

          .tool-item {
            flex: 1;
            padding: 12rpx 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f7f7f8;
            border-radius: 16px;

            &.first {
              margin-right: 22rpx;
            }

            &__icon {
              width: 40rpx;
              height: 40rpx;
            }

            &__name {
              font-size: 13px;
              line-height: 1.5;
              color: $v-c0-85;
            }
          }
        }

        &__area {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-top: 32rpx;

          .ql-container {
            width: 100%;
            flex: 1;
            padding: 0 32rpx;
            word-break: break-all;
          }
        }
        .tips {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18rpx 32rpx;
          font-size: 24rpx;
          color: rgba(0, 0, 0, 0.45);
        }
        .toolbar {
          padding: 16rpx 32rpx;
          border-top: 1px solid #f0f0f0;
          display: flex;
          align-items: center;

          &-icon {
            width: 72rpx;
            height: 72rpx;
            margin-right: 32rpx;
          }
        }
      }
    }

    &__tip {
      padding: 15px;
      font-size: 16px;
      border: 1px solid #eee;
      margin: 10px 0;
    }

    &__btn {
      font-weight: bold;
      text-align: right;
    }

    &__area {
      flex: 1;
      border: 1px solid #eee;

      .area-box {
        border: 0;
      }
    }

    .slot-content {
      font-size: 14px;
      line-height: 1.5;
      text-align: center;
      color: $v-c0-65;
    }

    .hidden {
      display: none;
    }
    .idea-label {
      padding-left: 32rpx;
      padding-right: 16rpx;
      margin-bottom: 48rpx;
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
  }
  .ql-container {
    font-size: 32rpx;
    line-height: 52rpx;
  }
  .right-icon {
    display: inline-block;
  }
</style>
