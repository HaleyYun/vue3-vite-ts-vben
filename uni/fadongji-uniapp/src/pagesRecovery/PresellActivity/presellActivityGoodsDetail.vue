<template>
  <view class="goods">
    <view class="goods_swiper">
      <swiper circular class="swiper" @change="swiperChange">
        <swiper-item
          v-for="(item, index) in goodsData.images"
          :key="index"
          class="swiper__item"
          @click="lookPreviewImage(index)"
        >
          <u--image :src="item" height="750rpx" width="100%"  mode="aspectFit"/>
        </swiper-item>
      </swiper>
      <view class="goods_swiper_addr">{{ current }}/{{ goodsData.images.length }}</view>
    </view>
    <view class="goods_head">
      <view>
        <view class="fz-24 goods_head_now_price">
          <view class="fz-b flex flex-justify-c">
            <view class="m-r-8">现金</view>
            <VoPointPrice :left-size="20" :price="goodsData.price" :showUnit="true" />
          </view>
        </view>
        <view class="flex fz-24 m-t-16 flex-vertical-c">
          <view class="m-r-8">原价</view>
          <VoPointPrice :price="goodsData.originalSalePrice" :showUnit="true" color="#ffffff" />
          <view class="m-l-32">库存</view>
          <view class="m-l-8 inventory">{{ goodsData.inventory || goodsData.margin }}</view>
        </view>
      </view>
      <view>
        <view class="fz-24 textAlign_right">距离预售结束</view>
        <view class="flex">
          <view class="fz-28 m-t-12">{{ timeData.days }}天</view>
          <u-count-down :time="downData" @change="onChange">
            <view class="fz-28 m-t-12">
              <!--时-->
              <text v-if="timeData.hours" class="m-l-12">
                {{ timeData.hours > 9 ? timeData.hours : '0' + timeData.hours }}:</text
              >
              <text v-else class="time__item m-l-12">00:</text>
              <!--分-->
              <text v-if="timeData.minutes">
                {{ timeData.minutes > 9 ? timeData.minutes : '0' + timeData.minutes }}:
              </text>
              <text v-else class="m-l-12">00:</text>
              <!--秒-->
              <text class="time__item">
                {{ timeData.seconds > 9 ? timeData.seconds : '0' + timeData.seconds }}
              </text>
            </view>
          </u-count-down>
        </view>
      </view>
    </view>
    <view class="goods_content m-b-16">
      <view class="fz-32 goods_content_title">
        <text class="fz-24 m-r-16">{{ goodsData.level }}类</text>
        {{ goodsData.name }}
      </view>
      <view class="fz-24 m-t-20">
        <text>{{ goodsData.deliveryAreaName }}发货</text>
        <text class="m-l-20">{{ goodsData.shippingType === 1 ? '包邮' : '到付' }}</text>
      </view>
    </view>
    <view class="goods_bottom">
      <view class="flex">
        <view>预售时间：</view>
        <view class="color-block"
          >{{ $vocenApi.VoUtils.timeFormat(goodsData.startTime, 'mm-dd hh:MM') }} 至
          {{ $vocenApi.VoUtils.timeFormat(goodsData.endTime, 'mm-dd hh:MM') }}</view
        >
      </view>
      <view class="flex">
        <view class="m-t-24">发货时间：</view>
        <view class="m-t-24 color-block">
          预计{{ $vocenApi.VoUtils.timeFormat(goodsData.deliveryTime, 'mm-dd hh:MM') }}
          开始发货
        </view>
      </view>
    </view>
    <view class="uploaded-footer flex p-b-safe-area">
      <u-button
        class="uploaded-footer__button"
        color="#FF5319"
        shape="circle"
        text="返回"
        @click="pageBack"
      />
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        current: 1,
        goodsData: {
          images: [],
        },
        time: '',
        hour: '',
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),
      }
    },
    methods: {
      onChange(e) {
        this.timeData = e
      },
      swiperChange(e) {
        this.current = e.detail.current + 1
      },
      lookPreviewImage(index) {
        // 预览图片
        uni.previewImage({
          urls: this.goodsData.images,
          current: index,
        })
      },
      pageBack() {
        this.$backFn()
      },
      //获取商品详情
      getGoodDetailRequest(id) {
        this.$VoHttp
          .apiGoodsRecyclePreSaleQueryBuyerInfo({ id: id })
          .then((res) => {
            if (res.code === '20001') {
              console.log('商品详情', res)
              this.processDetail(res.data)
            } else {
              uni.$u.toast(res.message || '商品详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '商品详情获取失败')
          })
      },
      processDetail(data) {
        this.goodsData = data
        this.goodsData.images = this.goodsData.picture
        let newTime = this.$vocenApi.VoUtils.timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss')
        this.hour = this.getHour(newTime, this.goodsData.endTime)
        let Time = new Date(this.goodsData.endTime)
        let timestemp = Time.getTime()
        this.downData = timestemp - this.newData
      },
      getHour(s1, s2) {
        var reDate = /\d{4}-\d{1,2}-\d{1,2} /
        s1 = new Date((reDate.test(s1) ? s1 : '2018-1-1 ' + s1).replace(/-/g, '/'))
        s2 = new Date((reDate.test(s2) ? s2 : '2018-1-1 ' + s2).replace(/-/g, '/'))
        var ms = s2.getTime() - s1.getTime()
        if (ms < 0) return 0
        return Math.floor(ms / 1000 / 60 / 60 / 24) //天
      },
    },
    onLoad(option) {
      this.getGoodDetailRequest(option.id)
    },
  }
</script>

<style lang="scss" scoped>
  .goods {
    &_swiper {
      position: relative;
      .swiper {
        width: 750rpx;
        height: 752rpx;
        &__item {
          background-color: #ccc;
        }
      }
      &_addr {
        position: absolute;
        font-size: 28rpx;
        color: #fff;
        padding: 4rpx 18rpx;
        background-color: rgba(0, 0, 0, 0.45);
        border-radius: 200rpx;
        bottom: 26rpx;
        right: 26rpx;
      }
    }
    &_head {
      width: 750rpx;
      height: 160rpx;
      padding: 32rpx 24rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      background: linear-gradient(270.27deg, #ff5622 8.32%, #ff8640 93.91%);
      .goods_head_now_price {
        display: block;
        width: 236rpx;
        height: 64rpx;
        background-color: #fff;
        color: #ff8640;
        border-radius: 32rpx 32rpx 32rpx 0;
        text-align: center;
        line-height: 64rpx;
      }
    }
    .goods_content {
      background-color: #fff;
      padding: 32rpx 24rpx 16rpx 24rpx;

      &_title {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-weight: bold;
        > text {
          display: inline-block;
          color: #ff5319;
          background: #ffece5;
          padding: 6rpx 16rpx;
          border-radius: 24rpx;
        }
      }
      > :nth-child(2) {
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .goods_bottom {
      width: 750rpx;
      height: 156rpx;
      padding: 24rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      background-color: #fff;
      > view {
        color: rgba(0, 0, 0, 0.45);
        > text {
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
    .textAlign_right {
      text-align: right;
    }
    .uploaded-footer {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 3;
      height: 132rpx;
      line-height: 132rpx;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
      width: 100%;
      background: $v-bg-white;

      &__button {
        width: 656rpx;
        height: 80rpx;
        margin: auto;
      }
    }
  }
  .inventory {
    vertical-align: middle;
  }
</style>
