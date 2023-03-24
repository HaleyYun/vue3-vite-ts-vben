<template>
  <view
    class="invoiceList flex flex-column"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoNav isHaveMore title="开票" />
    <view class="h16" />
    <view class="invoiceList-item">
      <view class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32">
        <view class="left">发票类型</view>
        <view v-if="detailData.invoiceKindCode === '1'" class="right">增值税普通发票(电子票)</view>
        <view v-else-if="detailData.invoiceKindCode === '2'" class="right">增值税专用发票</view>
      </view>
      <view class="invoiceList-item__line" />
    </view>
    <view>
      <view class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32">
        <view class="left">{{ ownerType === '1' ? '企业名称' : '名称' }}</view>
        <view class="right">{{ detailData.buyerName }}</view>
      </view>
      <view class="invoiceList-item__line" />
    </view>
    <view v-if="ownerType === '1'">
      <view class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32">
        <view class="left">纳税人识别号</view>
        <view class="right">{{ detailData.buyerTaxpayerNum }}</view>
      </view>
      <view class="invoiceList-item__line" />
    </view>
    <view>
      <view class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32">
        <view class="left">接收电子票手机号</view>
        <view class="right">{{ detailData.buyerPhone }}</view>
      </view>
      <view class="invoiceList-item__line" />
    </view>
    <!--    <view>-->
    <!--      <view class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32">-->
    <!--        <view class="left">开户行</view>-->
    <!--        <view class="flex flex-vertical-c">-->
    <!--          <view class="content">请选择开户行</view>-->
    <!--          <VoIcon name="right-arrow" color="#000000" :size="24" />-->
    <!--        </view>-->
    <!--      </view>-->
    <!--      <view class="invoiceList-item__line" />-->
    <!--    </view>-->
    <!--    <view>-->
    <!--      <view class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32">-->
    <!--        <view class="left">收款账号</view>-->
    <!--        <view class="flex flex-vertical-c">-->
    <!--          <view class="right">6889 9987 918289 100</view>-->
    <!--          <VoIcon name="photograph" :size="24" />-->
    <!--        </view>-->
    <!--      </view>-->
    <!--      <view class="invoiceList-item__line" />-->
    <!--    </view>-->
    <view>
      <view class="invoiceList-item__item flex flex-justify-between flex-vertical-c fz-32">
        <view class="left">申请时间</view>
        <view class="right">{{ detailData.createTime }}</view>
      </view>
      <view class="invoiceList-item__line" />
    </view>
    <view class="h16" />

    <view class="invoiceList-photo">
      <view class="flex flex-justify-between flex-vertical-c">
        <view class="invoiceList-photo__black fz-b fz-32">上传发票</view>
        <view class="invoiceList-photo__gay fz-32">{{ fileList.length }}/6</view>
      </view>
      <view class="invoiceList-photo__gay fz-28 p-t-12">最多上传6张</view>
      <view class="invoiceList-photo__pictures">
        <VoFormUpload
          :limit="6"
          :source.sync="fileList"
          :isUpload.sync="isUpload"
          btnText="上传图片"
        />
      </view>
    </view>
    <view class="invoiceList-bottom p-b-safe-area">
      <view class="invoiceList-bottom__confirm" @click="confirmClick">确定</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        detailData: {},
        invoiceId: '',
        uploadImg: [],
        isUpload: false,
        ownerType: '',
      }
    },
    watch: {
      uploadImg(newVal) {
        // val:{src:'',type:1,name:'asd'}
        let arr = []
        if (newVal.length) {
          newVal.forEach((item) => {
            let obj = {
              url: item.src,
              status: 'success',
              message: '',
              fileUrl: item.name,
            }
            arr.push(obj)
          })
        }
        this.fileList = arr
      },
    },
    onLoad(option) {
      this.invoiceId = option.id
      this.ownerType = option.ownerType || ''
      let param = { id: option.id }
      this.invoiceRecordDetailRequest(param)
    },
    methods: {
      uploadSuccess(res) {
        console.log(res);
        this.fileList = res
      },
      confirmClick() {
        if (this.isUpload) {
          this.$u.toast('请等待图片上传完毕')
          return
        }
        let param = { id: this.invoiceId }
        if (this.fileList.length > 0) {
          let billUrlArr = this.fileList.map((item) => item.src)
          param.billUrl = billUrlArr.join(',')
        }
        this.confirmInvoiceRequest(param)
      },
      /**
       * 开票记录详情
       */
      invoiceRecordDetailRequest(param) {
        console.log(param)
        this.$VoHttp
          .apiInvoiceDetailBuyer$Id(param)
          .then((res) => {
            if (res.code === '20001') {
              this.detailData = res.data
            } else {
              uni.$u.toast(res.message || '开票详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '开票详情获取失败')
          })
      },
      /**
       * 确认开票
       */
      confirmInvoiceRequest(param) {
        console.log(param)
        this.$VoHttp
          .apiInvoiceConfirmInvoice(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('开票成功')
              setTimeout(() => {
                uni.$emit('refresh')
                this.$backFn()
              }, 1500)
            } else {
              uni.$u.toast(res.message || '开票失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '开票失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invoiceList {
    width: 750rpx;
    height: 100vh;
    &-item {
      background-color: #ffffff;
      &__item {
        padding: 0rpx 32rpx;
        background-color: #ffffff;
        height: 96rpx;
        line-height: 96rpx;
        .left {
          color: $v-c0-85;
        }
        .right {
          color: $v-c0-65;
        }
        .content {
          color: $v-c0-25;
          padding-right: 8rpx;
        }
      }
      &__line {
        margin-left: 32rpx;
        height: 2rpx;
        background-color: $v-bg-light;
      }
    }
    &-photo {
      padding: 40rpx 32rpx;
      background-color: #ffffff;
      &__black {
        color: $v-c0-85;
      }
      &__gay {
        color: $v-c0-25;
      }
      &__pictures {
        margin: 32rpx 0rpx 0rpx;
        .pictures-img {
          border-radius: 8rpx;
          width: 214rpx;
          height: 214rpx;
        }
      }
    }
    &-bottom {
      position: fixed;
      left: 0rpx;
      bottom: 0rpx;
      height: 132rpx;
      width: 100%;
      background-color: #ffffff;

      &__confirm {
        margin: 20rpx 47rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background-color: $color-primary-yellow;
        color: #ffffff;
        font-size: 32rpx;
        border-radius: 48rpx;
      }
    }
  }
</style>
