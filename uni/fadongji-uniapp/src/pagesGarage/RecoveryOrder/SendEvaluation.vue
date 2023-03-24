<template>
  <view>
    <view class="eva flex flex-column">
      <VoNav :is-back="false" is-fixed is-have-more title="评价" @backFn="reBack">

      </VoNav>
      <view class="flex1 overflow-y">
        <!--  商品评价  -->
        <view class="eva-evaluate">
          <view class="eva-evaluate__title">商品评价</view>
          <view class="flex flex-vertical-c m-t-16">
            <view class="lh42 fz-28 color-block">星级别：</view>
            <u-rate
              :value="selectNum"
              activeIcon="/static/created/evaluate/score_activate.png"
              gutter="12"
              inactiveIcon="/static/created/evaluate/score_not_active.png"
              @change="selectedQuantity"
            />
            <view class="fz-24 lh36 m-l-4">{{ levelText[selectNum] }}</view>
          </view>
        </view>
        <!--  内容和图片上传  -->
        <view class="eva-content">
          <view class="eva-content__title">内容</view>
          <view class="eva-content__textarea">
            <EraTextarea
              v-model="content"
              auto-height
              border="none"
              class="textarea-area"
              count
              height="134"
              maxlength="200"
              placeholder="请输入评价内容"
              placeholder-style="color: rgba(0, 0, 0, 0.25);font-size: 28rpx;"
              style="background: #f7f7f8"
            />
          </view>
          <view class="eva-content__upload">
            <view class="upload-name flex flex-justify-between flex-vertical-c">
              <view class="upload-name__left">图片上传</view>
              <view class="upload-name__right">{{ fileList1.length }}/6</view>
            </view>
            <view class="upload-pictures">
              <VoFormUpload
                :limit="6"
                :source.sync="fileList1"
                :video-limit="1"
                btnText="上传图片/视频"
              />
            </view>
          </view>
        </view>
      </view>
      <view class="eva-bottom p-b-safe-area" @click="confirmClick">
        <EraButton circle />
      </view>
    </view>
    <VoModal
      :closeOnClickOverlay="true"
      :content="contentModal"
      :show="showModalCancel"
      :showCancelButton="true"
      @cancel="cancelExit"
      @confirm="confirmExit"
    />
  </view>
</template>

<script>
  export default {
    name: 'SendEvaluation',
    data() {
      return {
        id: '',
        selectNum: 0, // 星级别默认0颗星
        content: '', // 输入框双向绑定
        fileList1: [],
        videoSrc: '',
        showModalCancel: false, // 返回弹框
        contentModal: '确定退出评价吗？',
        evaluateData: {},
        //评价来源 0.订单评价跳转 1.我的评价-待评价跳转
        levelText: { 1: '非常差', 2: '差', 3: '一般', 4: '好', 5: '非常好' },
      }
    },
    onLoad(option) {
      if (option.id) {
        this.id = option.id
      }
    },
    methods: {
      selectedQuantity(e) {
        this.selectNum = e
        console.log(e)
      },
      /**
       *  打开
       */
      open() {
        this.showModalCancel = true
      },
      /**
       * 关闭
       */
      close() {
        this.showModalCancel = false
      },
      /**
       * 模态框点击确认按钮时触发
       */
      confirmExit() {
        this.close()
        this.$backFn()
      },
      /**
       * 模态框点击取消按钮时触发
       */
      cancelExit() {
        this.close()
      },
      /**
       * 退出
       */
      reBack() {
        this.showModalCancel = true
      },
      uploadSuccess(e) {
        this.videoSrc = ''
      },
      confirmClick() {
        if (this.selectNum < 1) {
          this.$u.toast('请点亮星级进行打分')
          return
        }
        this.evaluateRequest({
          content: JSON.stringify({ content: this.content, fileList: this.fileList1 }),
          sourceType: '2',
          sourceId: this.id,
          starMark: this.selectNum * 2,
        })
      },
      //发送评价接口
      evaluateRequest(param) {
        this.$VoHttp
          .apiOrderRecycleSaveEvaluate(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('评价成功')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
            } else {
              uni.$u.toast(res.message || '评价失败')
            }
          })
          .catch((err) => {
            uni.$u.toast('评价失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .eva {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-evaluate {
      padding: 0 32rpx 20rpx;
      box-sizing: border-box;
      margin-top: 16rpx;
      background: #ffffff;
      &__title {
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
        padding: 24rpx 0;
        box-sizing: border-box;
        border-bottom: 2rpx solid $v-bg-light;
      }
      &__option {
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        text-align: center;
        padding: 6rpx 24rpx;
        margin-right: 32rpx;
        margin-bottom: 32rpx;
        border-radius: 80rpx;
      }
    }
    &-content {
      background: #fff;
      margin-top: 16rpx;
      &__title {
        padding: 24rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
      }
      &__textarea {
        margin: 16rpx 32rpx 8rpx;
        background: $v-bg-light;
        padding: 0 0 20rpx 0;
        box-sizing: border-box;
        font-size: 28rpx;
        .textarea-area {
          background: $v-bg-light;
          min-height: 200rpx;
          box-sizing: border-box;
        }
        .textarea-num {
          text-align: right;
          margin-top: 16rpx;
          padding: 0 32rpx;
        }
      }
      &__upload {
        .upload-name {
          width: 686rpx;
          height: 48rpx;
          line-height: 48rpx;
          margin: 40rpx 32rpx 0 32rpx;
          &__left {
            font-weight: bold;
            font-size: 32rpx;
            color: $v-c0-85;
          }
          &__right {
            font-size: 28rpx;
            color: $v-c0-85;
          }
        }
        .upload-pictures {
          padding: 32rpx 16rpx 24rpx 32rpx;
          box-sizing: border-box;
          &__img {
            width: 218rpx;
            height: 218rpx;
          }
        }
      }
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
  }
  .select {
    color: $color-primary-red;
    background: $v-error-btn-disabled;
    border: 2rpx solid $color-primary-red;
  }
  .uncheck {
    color: $v-c0-85;
    background: $v-btn-disabled;
    border: 2rpx solid transparent;
  }
  ::v-deep {
    .u-textarea__count {
      background-color: rgba(0, 0, 0, 0) !important;
      font-size: 28rpx;
    }
  }
</style>
