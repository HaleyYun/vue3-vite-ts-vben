<template>
  <view class="content">
    <VoNav :isFixed="false" :title="title" is-have-more />
    <view>
      <view v-if="detailInfo.status === 6" class="flex flex-justify-between reason">
        <view>
          <view class="fz-b fz-32 p-b-24">审核不通过原因：</view>
          <view class="fz-28 reason_text">{{ detailInfo.result }}</view>
          <view class="reason_time p-t-8">{{ time }}</view>
        </view>
        <view>
          <image
            v-if="detailInfo.status === 6"
            class="content-img"
            src="/static/recovery/presell_audit_fair.png"
          />
          <image
            v-if="detailInfo.status === 7"
            class="content-img"
            src="/static/recovery/presell_audit_ing.png"
          />
        </view>
      </view>
      <view v-if="detailInfo.status === 1" class="flex flex-justify-between reason">
        <view>
          <view class="fz-b fz-32 p-b-24">审核中，请耐心等待...</view>
          <view class="fz-28 reason_text">{{ detailInfo.result }}</view>
          <view class="reason_time p-t-8">{{ time }}</view>
        </view>
        <view>
          <image
            v-if="detailInfo.status === 1"
            class="content-img"
            src="/static/recovery/presell_audit_ing.png"
          />
        </view>
      </view>
      <view class="product fz-32">
        <view class="product_name">
          <view>商品名称</view>
          <view @click="toGoodsDetail">
            <view>{{ detailInfo.name }}</view>
            <VoIcon class="m-l-18" color="#8C8C8C" name="right-arrow" size="20" />
          </view>
        </view>
        <view>预售信息</view>
      </view>
      <view class="types">
        <view v-for="(item, index) in detailInfo.levelInfoDTOS" :key="index">
          <view>{{ item.level }}类</view>
          <ProductTypes :data="item" :platform-price="detailInfo.platformPrice" />
          <view>
            <view class="presell fz-32 flex flex-justify-between">
              <text>预售进度</text>
              <text class="color-block-65">已售{{ item.sold || 0 }}/{{ item.count || 0 }}</text>
            </view>
            <view class="p-b-32 p-t-28">
              <u-line-progress :percentage="item.sold || 0" activeColor="#FF5319" />
            </view>
          </view>
        </view>
      </view>
      <view class="bottom">
        <!--快递类型 1包邮 2到付-->
        <view>
          <text>运费</text>
          <text>{{ detailInfo.shippingType === 1 ? '包邮' : '到付' }} </text>
        </view>
        <view class="flex flex-justify-between">
          <text>预售时间</text>
          <view>
            <text>{{ $vocenApi.VoUtils.timeFormat(detailInfo.startTime, 'mm月dd日 hh:MM') }}</text>
            <text class="m-l-24 m-r-24">至</text>
            <text>{{ $vocenApi.VoUtils.timeFormat(detailInfo.endTime, 'mm月dd日 hh:MM') }}</text>
          </view>
        </view>
        <view>
          <text>预计发货时间</text>
          <text>{{ $vocenApi.VoUtils.timeFormat(detailInfo.deliveryTime, 'mm月dd日') }}</text>
        </view>
      </view>
    </view>
    <!--//状态1：待审核   2：未开始 3：进行中 4：已暂停 5：已结束 6：审核不通过-->
    <view class="uploaded-footer flex flex-justify-r p-b-safe-area">
      <view v-if="detailInfo.status === 5">
        <u-button
          class="uploaded-footer__button"
          color="#FF5319"
          plain
          shape="circle"
          text="预览"
          @click="nextpage(2)"
        />
      </view>
      <view v-else-if="detailInfo.status === 6" class="flex">
        <u-button
          class="uploaded-footer__button m-r-24"
          shape="circle"
          text="预览"
          @click="nextpage(2)"
        />
        <u-button
          class="uploaded-footer__button"
          color="#FF5319"
          plain
          shape="circle"
          text="修改"
          @click="nextpage(1)"
        />
      </view>
      <block v-else>
        <u-button class="uploaded-footer__button" shape="circle" text="预览" @click="nextpage(2)" />
        <u-button
          class="uploaded-footer__button"
          shape="circle"
          text="暂停预售"
          @click="nextpage(3)"
        />
        <u-button
          class="uploaded-footer__button"
          color="#FF5319"
          plain
          shape="circle"
          text="修改"
          @click="nextpage(1)"
        />
      </block>
    </view>
  </view>
</template>

<script>
  import ProductTypes from './components/ProductTypes2.vue'

  export default {
    components: {
      ProductTypes,
    },
    data() {
      return {
        title: '订单详情',
        detailInfo: {
          levelInfoDTOS: [],
        },
        time: '',
      }
    },
    onLoad(option) {
      this.getOrderDetailRequest(option.id)
    },
    methods: {
      toGoodsDetail() {
        this.$linkToEasy(
          '/pagesRecovery/PresellActivity/presellActivitySelectGoodsDetail?id=' +
            this.detailInfo.resaleId,
        )
      },
      nextpage(index) {
        //1.修改 2.预览 3.暂停预售
        if (index === 1) {
          this.$linkToEasy(
            '/pagesRecovery/PresellActivity/PresellReleaseActivity?id=' +
              this.detailInfo.id +
              '&sourceType=2',
          )
          return
        }
        if (index === 2) {
          //遍历商品 排序 去成色高的商品
          let goodArray = []
          let id = ''
          if (this.detailInfo.levelInfoDTOS && this.detailInfo.levelInfoDTOS.length > 0) {
            this.detailInfo.levelInfoDTOS.forEach((item) => {
              if (item.price) {
                goodArray.push(item)
              }
            })
          }
          if (!goodArray) {
            this.$u.toast('暂无商品')
            return
          }
          if (goodArray && goodArray.length > 1) {
            goodArray.sort((a, b) => (a.level < b.level ? -1 : a.level > b.level ? 1 : 0))
          }
          id = goodArray[0].levelId
          this.$linkToEasy('/pagesRecovery/PresellActivity/presellActivityGoodsDetail?id=' + id)
          return
        }
        if (index === 3) {
          this.saleUpdateStatus(index)
          return
        }
      },
      //获取订单详情
      getOrderDetailRequest(id) {
        this.$VoHttp
          .apiGoodsRecyclePreSaleQueryInfo({ id: id })
          .then((res) => {
            if (res.code === '20001') {
              console.log('订单详情', res)
              this.processDetail(res.data)
              this.time = res.time
            } else {
              uni.$u.toast(res.message || '订单详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '订单详情获取失败')
          })
      },
      processDetail(data) {
        //处理标题
        //状态1：待审核   2：未开始 3：进行中 4：已暂停 5：已结束 6：审核不通过
        if (data.status === 1) {
          this.title = '审核中'
        }
        if (data.status === 2) {
          this.title = '未开始'
        }
        if (data.status === 3) {
          this.title = '进行中'
        }
        if (data.status === 4) {
          this.title = '已暂停'
        }
        if (data.status === 5) {
          this.title = '已结束'
        }
        if (data.status === 6) {
          this.title = '审核不通过'
        }

        this.detailInfo = data
      },
      //修改预售活动状态
      saleUpdateStatus(index) {
        let status
        let info = ''
        if (index === 3) {
          status = 4
          info = '暂停预售成功'
        }
        if (index === 4) {
          status = 3
          info = '启动预售成功'
        }
        let param = {
          ids: [this.detailInfo.id],
          status: status,
        }
        console.log(param)
        this.$VoHttp
          .apiGoodsRecyclePreSaleUpdateStatus(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast(info)
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '启动预售失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .content {
    height: 100vh;
    display: flex;
    flex-direction: column;
    > :nth-child(2) {
      flex-grow: 1;
      overflow: auto;
    }
    &-img {
      width: 176rpx;
      height: 176rpx;
    }
    .reason {
      display: flex;
      justify-content: space-between;
      padding: 32rpx;
      background-color: #fff;
      margin-top: 16rpx;

      > :nth-child(1) {
        flex-grow: 1;
        .reason_text {
          color: rgba(0, 0, 0, 0.85);
        }
        .reason_time {
          color: rgba(0, 0, 0, 0.65);
          font-size: 28rpx;
        }
      }
      > :nth-child(2) {
        flex-shrink: 0;
        margin-left: 48rpx;
        > :nth-child(1) {
          width: 144rpx;
          height: 144rpx;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }
    .product {
      background-color: #fff;
      padding: 0 32rpx 32rpx 32rpx;
      margin-top: 16rpx;
      &_name {
        display: flex;
        justify-content: space-between;
        > :nth-child(2) {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
      > :nth-child(n) {
        border-bottom: 1rpx solid #f7f7f8;
        padding: 24rpx 0;
      }
    }
    .types {
      > :nth-child(n + 1) {
        background-color: #fff;
        margin-bottom: 16rpx;
        padding: 32rpx 32rpx 0 32rpx;
      }
      > :nth-child(n) {
        > :nth-child(1) {
          font-size: 32rpx;
          font-weight: bold;
        }
        > :nth-child(3) {
          .presell {
            color: rgba(0, 0, 0, 0.85);
            padding: 24rpx 0;
            border-bottom: 1rpx solid #f7f7f8;
          }
        }
      }
    }
    .bottom {
      background-color: #fff;
      margin-top: 16rpx;
      font-size: 32rpx;
      color: rgba(0, 0, 0, 0.85);
      padding: 0 32rpx;
      margin-bottom: 50rpx;
      > :nth-child(n) {
        display: flex;
        justify-content: space-between;
        padding: 24rpx 0;
        border-bottom: 1rpx solid #f7f7f8;
      }
    }
    .uploaded-footer {
      width: 100%;
      height: 184rpx;
      line-height: 184rpx;
      box-sizing: border-box;
      padding: 24rpx 32rpx 0rpx 24rpx;
      background: $v-bg-white;

      &__button {
        width: 192rpx;
        height: 80rpx;
      }
    }
  }
</style>
