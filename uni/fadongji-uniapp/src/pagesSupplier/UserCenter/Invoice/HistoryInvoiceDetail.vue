<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="invoiceDetail flex flex-column"
  >
    <VoNav isHaveMore title="发票详情" />
    <view class="flex1">
      <!-- ownerType 抬头类型(1企业; 2个人)-->
      <view
        v-for="(item, index) in list"
        v-show="detailData.ownerType === 2 ? item.content != 'buyerTaxpayerNum' : true"
        :key="index"
        class="invoiceDetail-item"
      >
        <view v-show="index === 1 || index === 0" class="line" />
        <view class="invoiceDetail-item__cell flex flex-justify-between flex-vertical-c">
          <view> {{ item.title }} </view>
          <view v-if="item.content === 'invoiceStatus'" class="right">
            {{ detailData['invoiceStatus'] === 1 ? '开票中' : '已开票' }}
          </view>
          <view v-else-if="item.content === 'invoiceKindCode'" class="right">
            {{
              detailData['invoiceKindCode'] === '1' ? '增值税普通发票(电子票)' : '增值税专用发票'
            }}
          </view>
          <view v-else class="right"> {{ detailData[item.content] }} </view>
        </view>
        <view class="invoiceDetail-item__line" />
      </view>
      <view class="line" />
      <view
        class="invoiceDetail-order flex flex-justify-between flex-vertical-c"
        @click="orderInfoClick"
      >
        <view>1张发票，包含{{ detailData.orderCount }}个订单</view>
        <view class="flex flex-vertical-c">
          <view class="arrow">查看</view>
          <VoIcon :size="24" color="#000000" name="right-arrow" />
        </view>
      </view>
      <view class="invoiceDetail-item__line" />
      <!--发票图片-->
      <view v-if="picUrlList && picUrlList.length > 0">
        <view class="line" />
        <view class="invoiceDetail-photo">
          <view class="invoiceDetail-photo__title">发票图片</view>
          <view class="invoiceDetail-photo__item">
            <image
              v-for="(item, index) in picUrlList"
              :key="index"
              :src="item + '&type=1'"
              class="img"
              @click="priviewImg(index)"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="bottom p-b-safe-area">
      <EraButton
        v-if="picUrlList && picUrlList.length > 0"
        class="m-t-20"
        text="下载全部发票"
        @click="downloadInvoice"
      />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        detailData: {},
        list: [
          { title: '电子发票', content: 'invoiceStatus' },
          { title: '发票类型', content: 'invoiceKindCode' },
          { title: '企业名称', content: 'buyerName' },
          { title: '纳税人识别号', content: 'buyerTaxpayerNum' },
          { title: '接收电子票手机号', content: 'buyerPhone' },
          { title: '申请时间', content: 'createTime' },
        ],
        picUrlList: [],
      }
    },
    onLoad(option) {
      let param = { id: option.id }
      this.invoiceDetailRequest(param)
    },
    methods: {
      /**
       * 预览图片
       */
      priviewImg(index) {
        uni.previewImage({
          urls: this.picUrlList,
          current: index,
        })
      },
      /**
       * 下载全部发票
       */
      async downloadInvoice() {
        const that = this
        uni.showLoading({ title: '下载中',mask: true, })
        let count = 0
        let total = this.picUrlList.length
        for (let i = 0; i < this.picUrlList.length; i++) {
          try {
            // #ifdef APP-PLUS
            await uni.saveImageToPhotosAlbum({
              filePath: this.picUrlList[i],
              success: function (res) {
                that.$u.toast('发票图片已保存至相册，请查看！')
              },
              fail: function (err) {
                console.log('保存失败', err)
              },
              complete: () => {
                count += 1
                if (count >= total) {
                  uni.hideLoading()
                }
              },
            })
            // #endif
            // #ifdef H5
            let img = new Image()
            img.setAttribute('crossOrigin', 'Anonymous')
            img.src = this.picUrlList[i]
            img.onload = await function () {
              let canvas = document.createElement('canvas')
              let context = canvas.getContext('2d')
              canvas.width = img.width
              canvas.height = img.height
              context.drawImage(img, 0, 0, img.width, img.height)
              canvas.toBlob((blob) => {
                let url = URL.createObjectURL(blob)
                let a = document.createElement('a')
                let event = new MouseEvent('click')
                a.download = '发票'
                a.href = url
                a.dispatchEvent(event)
                URL.revokeObjectURL(url)
                a.remove()
                count += 1
                if (count >= total) {
                  uni.hideLoading()
                }
              })
            }
            img.remove()
            this.$u.toast('发票图片已保存至相册，请查看！')
            // #endif
          } catch (e) {
            console.log(e)
          }
        }
        // uni.hideLoading()
      },
      /**
       * 订单信息
       */
      orderInfoClick() {
        this.$linkToEasy(
          '/pagesSupplier/UserCenter/Invoice/InvoiceOrderInfo?id=' + this.detailData.id,
        )
      },
      /**
       * 开票记录详情
       */
      invoiceDetailRequest(param) {
        this.$VoHttp
          .apiInvoiceDetailBuyer$Id(param)
          .then((res) => {
            console.log(res)
            if (res.code === '20001') {
              this.detailData = res.data
              if (res.data.billUrl) {
                this.picUrlList = this.detailData.billUrl.split(',')
              }
            } else {
              uni.$u.toast(res.message || '开票详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '开票详情获取失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .invoiceDetail {
    width: 750rpx;
    height: 100vh;
    &-item {
      background-color: #ffffff;
      &__cell {
        padding: 0rpx 32rpx;
        background-color: #ffffff;
        height: 96rpx;
        line-height: 96rpx;
        font-size: 32rpx;
        color: $v-c0-85;

        .right {
          color: $v-c0-65;
        }
      }
      &__line {
        margin-left: 32rpx;
        height: 2rpx;
        background-color: $v-bg-light;
      }
    }
    &-order {
      padding: 0rpx 32rpx;
      background-color: #ffffff;
      height: 96rpx;
      line-height: 96rpx;
      font-size: 32rpx;
      color: $v-c0-85;

      .arrow {
        color: $v-c0-65;
        padding-right: 8rpx;
      }
    }
    &-photo {
      padding: 32rpx;
      background-color: #ffffff;
      &__title {
        margin-top: 8rpx;
        padding-bottom: 32rpx;
        color: $v-c0-85;
        font-size: 32rpx;
        font-weight: bold;
      }
      &__item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: 16rpx;
        grid-column-gap: 16rpx;
        .img {
          border-radius: 8rpx;
          width: 218rpx;
          height: 218rpx;
        }
      }
    }
  }
  .line {
    background-color: #f8f8f8;
    height: 16rpx;
    width: 750rpx;
  }
  .bottom {
    height: 132rpx;
    background-color: #ffffff;
  }
</style>
