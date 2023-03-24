<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="report"
  >
    <VoNav :isHaveMore="true" title="举报">
    </VoNav>

    <!--    提示-->
    <view v-show="isTipShow" class="report-tip flex flex-vertical-c" @click="tipClose">
      <VoIcon :size="20" color="#FF9B05" name="error-full" />
      <view class="flex1 report-tip__text">您的举报将会尽快处理，请尽量提交详细举报说明</view>
      <VoIcon :opacity="0.45" :size="16" color="#000" name="close" />
    </view>
    <!--   文本域-->
    <EraTextarea
      v-model="textModel"
      :autoHeight="true"
      border="none"
      class="report-content"
      count
      countStyle="background: inherit;right: 28rpx;bottom: 16rpx;color: rgba(0, 0, 0, 0.25);font-size:28rpx"
      maxlength="100"
      placeholder="平台为大家提供一个和谐、友善、公平、公正的互动环境（100字）"
      placeholderStyle="color:$v-c0-25;font-size:28rpx;"
      @input="inputChange"
    />

    <view class="report-agreement flex">
      <VoIcon v-if="isSeleted" :size="24" color="#FF5319" name="right-fill" @click="agreeClick" />
      <VoIcon
        v-else
        :size="24"
        :style="{ opacity: 0.15 }"
        color="#000000"
        name="circle"
        @click="agreeClick"
      />
      <view class="report-agreement__text flex1"
        >本人同意并遵守
        <text class="agreement" @click="agreementClick">《发动集举报规则协议》</text>
        内所涉及的服务使用须知及使用注意事项。</view
      >
    </view>

    <view
      :class="isConfirmSeleted ? 'report-selected' : ''"
      class="report-confirm"
      @click="confirmClick"
      >提交</view
    >
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isLoading: false,
        isTipShow: true,
        isSeleted: false,
        isConfirmSeleted: false,
        textModel: '',
        info: '',
        pageName: '', //区分举报页面
      }
    },
    onLoad(options) {
      if (options.data) {
        let data = JSON.parse(options.data)
        this.info = data
        console.log('this.info', this.info )
      }
      if (options.page) {
        this.pageName = options.page
      }
    },
    methods: {
      agreementClick() {
        this.$u.toast('《发动集举报规则协议》')
      },
      tipClose() {
        this.isTipShow = false
      },
      agreeClick() {
        this.isSeleted = !this.isSeleted
        if (this.isSeleted && this.textModel.length > 0) {
          this.isConfirmSeleted = true
        }
      },
      inputChange() {
        if (this.isSeleted && this.textModel.length > 0) {
          this.isConfirmSeleted = true
        }
      },
      confirmClick() {
        if (this.isLoading) return
        this.isLoading = true
        if (this.isConfirmSeleted) {
          this.$u.toast('你举报的内容为' + this.textModel)
          if (this.pageName === 'comment') {
            //举报评论
            this.$VoHttp
              .apiCreateQuestionsCommentTipoff({
                businessType: this.info.businessType,
                contentId: this.info.id,
                antherUserId: this.info.userId,
                content: this.textModel,
              })
              .then((res) => {
                if (res.code === '20001') {
                  uni.$u.toast('举报成功')
                  setTimeout(() => {
                    this.$backFn()
                  }, 1000)
                } else {
                  uni.$u.toast(res.message || '举报失败')
                }
              })
              .catch((err) => {
                console.log('err', err)
                uni.$u.toast('举报失败')
              })
          } else {
            this.$VoHttp
              .apiCreateQuestionsQuestionTipoff({
                businessType: this.info.businessType,
                contentId: this.info.id,
                antherUserId: this.info.userId,
                content: this.textModel,
              })
              .then((res) => {
                if (res.code === '20001') {
                  uni.$u.toast('举报成功')
                  setTimeout(() => {
                    this.$backFn()
                  }, 1000)
                } else {
                  uni.$u.toast(res.message || '举报失败')
                }
              })
              .catch((err) => {
                console.log('err', err)
                uni.$u.toast('举报失败')
              })
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .report {
    background-color: #ffffff;
    height: 100vh;

    &-tip {
      background-color: $v-warning-btn-disabled;
      padding-left: 32rpx;
      padding-right: 32rpx;
      height: 80rpx;
      line-height: 80rpx;

      &__text {
        color: $v-warning;
        font-size: 24rpx;
        padding-left: 4rpx;
        padding-right: 10rpx;
      }
    }
    &-content {
      padding: 20rpx 32rpx;
      margin: 50rpx 32rpx;
      background-color: $v-bg-light;
      height: 288rpx;
      border-radius: 8rpx;
      color: $v-c0-45;
    }

    &-agreement {
      margin: 40rpx 32rpx 34rpx 44rpx;

      &__text {
        font-size: 24rpx;
        color: $v-c0-45;
        .agreement {
          color: #373a4e;
        }
      }
    }
    &-confirm {
      margin: 0rpx 32rpx;
      border-radius: 48rpx;
      background-color: $v-bg-light;
      color: $v-c0-25;
      height: 92rpx;
      font-size: 32rpx;
      line-height: 92rpx;
      text-align: center;
    }
    &-selected {
      background-color: $color-primary-yellow;
      color: #ffffff;
    }
  }
</style>
