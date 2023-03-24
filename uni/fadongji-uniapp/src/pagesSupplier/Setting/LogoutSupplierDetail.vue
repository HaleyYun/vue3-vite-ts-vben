<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="workbench flex flex-column"
    >
      <VoNav is-fixed is-have-more title="注销供应商" />
      <view class="flex1 overflow-y">
        <view class="workbench-top">
          <view v-if="info.checkStatus === 1">
            <view class="workbench-top__title">您的注销信息一提交成功，工作人员正在审核中</view>
            <view class="workbench-top__des"
              >预计<text style="color: #e50012">20小时40</text
              >分后处理结束，请及时接听工作人员电话</view
            >
          </view>

          <view v-if="info.checkStatus === 3">
            <view class="workbench-top__title">您的注销信息审核已拒绝，如有疑问请联系平台客服</view>
            <view class="workbench-top__desrefuse"
              >审核拒绝原因：存在订单未处理完毕，请处理完毕后重新发起</view
            >
          </view>
        </view>
        <view class="workbench-line" />
        <view class="workbench-reason flex flex-justify-between flex-vertical-c">
          <view class="workbench-reason__title"><text style="color: #e50012">*</text>注销理由</view>
          <view class="workbench-reason__right"> {{ info.reasonType }}</view>
        </view>
        <view class="workbench-reasonLine" />
        <!--详情藐视-->
        <view class="workbench-detail">
          <view class="workbench-detail__title"><text style="color: #e50012">*</text>详情描述</view>
          <EraTextarea
            v-model="info.remark"
            :disabled="disabled"
            border="none"
            count
            height="326rpx"
            maxlength="500"
            placeholder="请输入详情描述"
          />
        </view>
        <view class="workbench-reasonLine" />

        <!--上传图片-->
        <view class="workbench-uploadPhoto" v-if="info.url !== '[]'">
          <view class="flex flex-justify-between">
            <view class="workbench-uploadPhoto__title">上传图片</view>
          </view>
          <view class="workbench-uploadPhoto__des">支持png.jpg.jpge.格式</view>

          <view class="workbench-uploadPhoto__pictures">
            <VoUpload
              :deletable="!disabled"
              :disabled="true"
              :fileList="fileList"
              :maxCount="fileList.length"
              :previewFullImage="true"
              height="108"
              multiple
              name="1"
              width="108"
            >
              <image
                class="pictures-img"
                mode="widthFix"
                src="/static/created/circle/upload_pictures.png"
              />
            </VoUpload>
          </view>
        </view>
      </view>

      <view class="workbench-bottom p-b-safe-area">
        <EraLine />
        <view
          v-if="info.checkStatus === 1"
          class="workbench-bottom__confirm workbench-bottom__select"
          @click="confirmClickFn"
          >撤销申请</view
        >
        <view
          v-else-if="info.checkStatus === 3"
          class="workbench-bottom__confirm workbench-bottom__select"
          >重新发起</view
        >
      </view>
    </view>

    <VoModal
      :content="content"
      :show="submitShow"
      confirmColor="#22284B"
      showCancelButton
      @cancel="submitShow = false"
      @confirm="confirmSubmit"
    />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        submitShow: false,
        disabled: false,
        content: '',
        maxCount: '9',
        dataInfo: '',
        fileList: [], // 图片地址（json数组形式 比如：['3434343','1e23232']）
        info: {},
      }
    },
    onLoad(options) {
      this.info = JSON.parse(options.data)
      const url = JSON.parse(this.info.url)
      url.map((item) => {
        this.fileList.push({
          url: item,
        })
      })
      if (this.info.checkStatus === 1) {
        this.disabled = true
        this.maxCount = '2'
        this.content = '确认要撤销吗？'
      } else {
        this.disabled = false
        this.maxCount = '9'
        this.content = '确认要提交吗？'
      }
      // this.initFn()
    },
    methods: {
      initFn() {
        this.$VoHttp
          .apiCompanyCancellationWait()
          .then((res) => {
            console.log(res)
            this.dataInfo = res.data
            const url = JSON.parse(this.dataInfo.url)
            url.map((item) => {
              this.fileList.push({
                url: item,
              })
            })
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
      // 确认提交事件
      confirmClickFn() {
        this.submitShow = true
      },
      //提交弹框确认事件
      confirmSubmit() {
        this.$VoHttp
          .apiCompanyCancellation$Delete()
          .then((res) => {
            console.log(res)
            this.submitShow = false
            uni.$u.toast('撤销成功')
            setTimeout(() => {
              this.$backFn()
            }, 1000)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .workbench {
    width: 750rpx;
    height: 100vh;
    background-color: #ffffff;
    overflow-x: hidden;
    &-top {
      width: 750rpx;
      text-align: center;
      padding-bottom: 86rpx;
      &__title {
        margin-top: 86rpx;
        color: $v-c0-85;
        font-size: 28rpx;
        font-weight: bold;
      }
      &__des {
        margin-top: 24rpx;
        color: $v-c0-65;
        font-size: 24rpx;
      }

      &__desrefuse {
        margin-top: 24rpx;
        color: $color-primary-red;
        font-size: 24rpx;
      }
    }

    &-reason {
      padding: 0rpx 32rpx;
      height: 96rpx;
      &__title {
        color: $v-c0-85;
        font-size: 32rpx;
      }
      &__right {
        color: $v-c0-65;
        font-size: 32rpx;
      }
    }
    &-reasonLine {
      margin: 0rpx 32rpx;
      height: 2rpx;
      background-color: $v-bg-light;
    }

    &-detail {
      padding: 0rpx 32rpx;
      margin-top: 40rpx;
      margin-bottom: 16rpx;
      color: $v-c0-85;

      &__title {
        color: $v-c0-85;
        font-size: 32rpx;
      }
      &__right {
        color: $v-c0-25;
        font-size: 32rpx;
      }
    }

    &-uploadPhoto {
      margin: 16rpx 0 28rpx 32rpx;

      &__title {
        color: $v-c0-85;
        font-size: 32rpx;
        padding-top: 24rpx;
      }
      &__des {
        color: $v-c0-25;
        font-size: 28rpx;
        margin-top: 12rpx;
      }
      &__pictures {
        margin-top: 24rpx;
        .pictures-img {
          width: 218rpx;
          height: 218rpx;
        }
      }
    }

    &-line {
      width: 750rpx;
      height: 16rpx;
      background-color: #f8f8f8;
    }

    &-bottom {
      height: 132rpx;
      width: 100%;
      background-color: #ffffff;

      &__confirm {
        margin: 20rpx 47rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background-color: $color-disabled-yellow;
        color: $v-c0-25;
        font-size: 32rpx;
        border-radius: 48rpx;
      }

      &__select {
        background-color: $color-primary-yellow;
        color: #ffffff;
      }
    }
  }
</style>
