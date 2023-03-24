<template>
  <view>
    <u-popup
      :closeOnClickOverlay="true"
      :closeable="false"
      :round="10"
      :show="isShowPopup"
      class="popup"
      mode="bottom"
      @close="close"
    >
      <view class="p-b-safe-area">
        <view class="bottom flex flex-column">
          <view class="flex flex-row flex-vertical-c flex-justify-between">
            <view class="bottom-title">修理厂审核</view>
            <VoIcon :opacity="0.65" color="#000" name="close-x" size="11.2" @click="close" />
          </view>
          <view class="bottom-line m-t-24"></view>
          <view class="flex flex-row flex-vertical-c m-t-24">
            <view class="bottom-text1">修理厂名称:</view>
            <view class="bottom-text1 m-l-8">{{ info.storeName }}</view>
          </view>
          <view class="flex flex-row flex-vertical-c m-t-16">
            <view class="bottom-text1">审核：</view>
            <view class="bottom-text3" @click="pass">审核通过</view>
<!--            <view :class="isPass ? 'bottom-text3' : 'bottom-text2'" class="m-l-8" @click="pass"-->
<!--              >审核通过</view-->
<!--            >-->
<!--            <view :class="isNoPass ? 'bottom-text3' : 'bottom-text2'" class="m-l-48" @click="noPass"-->
<!--              >审核不通过</view-->
<!--            >-->
          </view>
          <template v-if="isNoPass">
            <view class="bottom-text1 m-t-16">拒绝原因:</view>
            <EraTextarea
              v-model.trim="remarks"
              border="none"
              class="bottom-textarea m-t-16"
              count
              height="268rpx"
              maxlength="450"
              placeholder="请输入备注信息"
              placeholderStyle="color:$v-c0-25;font-size:28rpx"
            />
          </template>
          <view class="bottom-text flex1 m-l-15 m-r-15 m-t-44" @click="submitInfo">确定</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name: 'PopupServiceManager',
    data() {
      return {
        name: '江陵动力',
        info: {},
        isShowPopup: false,
        isPass: true,
        isNoPass: false,
        remarks: '',
      }
    },
    methods: {
      showPop(info) {
        this.isShowPopup = true
        this.info = info
      },
      close() {
        this.isShowPopup = false
        // console.log('close');
      },
      pass() {
        this.isPass = true
        this.isNoPass = false
      },
      noPass() {
        this.isNoPass = true
        this.isPass = false
      },
      submitInfo() {
        let params = {}
        params.id = this.info.companyId
        if (this.pass) {
          params.status = 4
        } else {
          return
          if (!this.remarks) {
            uni.$u.toast('请填写审核拒绝原因！')
            return
          }
          params.status = 5
          params.result = this.remarks
        }
        console.log(params)
        this.$VoHttp.apiCompanyInfoAudit(params).then((res) => {
          console.log(res)
          this.$emit('changeStatus')
          this.close()
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bottom {
    background-color: #fff;
    font-size: 32rpx;
    width: 750rpx;
    padding: 20rpx 32rpx;
    box-sizing: border-box;
    &-line {
      width: 100%;
      height: 2rpx;
      background-color: #f7f7f8;
    }
    &-textarea {
      width: 100%;
      height: 168rpx;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      background-color: #f7f7f8;
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-85;
    }
    &-text {
      width: 100%;
      padding: 22rpx 0;
      box-sizing: border-box;
      border-radius: 48rpx;
      color: #fff;
      background-color: #ff5319;
      text-align: center;
    }
    &-title {
      font-size: 32rpx;
      font-weight: bold;
      color: $v-c0-85;
      line-height: 48rpx;
    }
    &-text1 {
      font-size: 28rpx;
      line-height: 42rpx;
      color: $v-c0-85;
    }
    &-text2 {
      font-size: 24rpx;
      color: $v-c0-85;
      padding: 14rpx 24rpx;
      box-sizing: border-box;
      border-radius: 40rpx;
      background-color: #f7f7f8;
    }
    &-text3 {
      font-size: 24rpx;
      color: #ff5319;
      padding: 14rpx 24rpx;
      box-sizing: border-box;
      border-radius: 40rpx;
      border: 2rpx solid #ff5319;
      background-color: #ffece5;
    }
  }
</style>
