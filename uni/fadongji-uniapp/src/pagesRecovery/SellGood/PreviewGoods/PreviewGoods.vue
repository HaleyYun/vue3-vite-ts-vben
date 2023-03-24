<template>
  <view class="goods">
    <view class="flex1 overflow-y relative">
      <view class="goods-nav">
        <VoNav :isHaveMore="true" is-back is-fixed isTransparent />
      </view>
      <image class="goods-stamp" src="/static/recovery/stamp.png"></image>


      <u-swiper
        :autoplay="false"
        :height="375"
        :list="pic"
        indicatorMode="line"
        indicatorStyle="right: 32rpx"
        radius="0"
        @change="(e) => (currentNum = e.current)"
        @click="lookPreviewImage"
      >
        <view slot="indicator" class="indicator-num">
          <text class="indicator-num__text">{{ currentNum + 1 }}/{{ pic.length }}</text>
        </view>
      </u-swiper>
      <view class="goods-price">
        <view class="flex flex-vertical-c">
          <view class="goods-price__color m-r-8 fz-b fz-24">现金</view>
          <VoPointPrice
            :leftSize="20"
            :price="goodData.price"
            :showUnit="true"
            class="lh60"
            color="#FF5319"
          />
        </view>
        <view class="m-t-10 flex color-block-45 fz-28">
          <view
            >已销:<text class="m-l-10">{{ goodData.saleCount || 0 }}</text></view
          >
          <view class="m-l-56"
            >库存:<text class="m-l-10">{{ goodData.inventory }}</text></view
          >
        </view>
        <view class="goods-price__name">
          <text class="name-type">{{ goodData.level }}类</text>
          <text class="name-text">
            {{ goodData.name }}
          </text>
        </view>
        <view class="goods-price__state flex flex-vertical-c">
          <view class="m-r-20">{{ goodData.deliveryAreaName }}发货</view>
<!--          <view class="m-r-24">{{ goodData.shippingType === 1 ? '包邮' : '到付' }}</view>-->
          <view class="m-r-24" v-if="goodData.shippingType === 1">包邮</view>
          <view>预计{{ goodData.arrivalTime }}小时内送达</view>
        </view>
      </view>
    </view>
    <view class="goods-bottom">
      <EraButton circle text="返回" @click.native="$backFn()" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'PreviewGoods',
    data() {
      return {
        list1: [
          'https://cdn.uviewui.com/uview/swiper/swiper1.png',
          'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        ],
        value: 8,
        currentNum: 0,
        goodData: {
          pricture: [],
        },
        pic: [],
        arrivalTime: '',
      }
    },
    methods: {
      lookPreviewImage(index) {
        // 预览图片
        uni.previewImage({
          urls: this.pic,
          current: index,
        })
      },
      //获取商品详情
      //   apiGoodsRecycleResaleBuyerInfo
      getGoodDetailRequest(id) {
        this.$VoHttp
          .apiGoodsRecycleResalePreviewInfo({ id: id })
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
        this.goodData = data
        if (this.goodData.picture) {
          this.pic = this.goodData.picture
        }

        // let newTime = this.$vocenApi.VoUtils.timeFormat(new Date().getTime(), 'yyyy-mm-dd hh:MM:ss')
        // this.arrivalTime = this.getHour(newTime, this.goodData.deliveryTime)

        // this.pic = JSON.parse(this.goodData.picture[0])
      },
      getHour(s1, s2) {
        var reDate = /\d{4}-\d{1,2}-\d{1,2} /
        s1 = new Date((reDate.test(s1) ? s1 : '2018-1-1 ' + s1).replace(/-/g, '/'))
        s2 = new Date((reDate.test(s2) ? s2 : '2018-1-1 ' + s2).replace(/-/g, '/'))
        var ms = s2.getTime() - s1.getTime()
        if (ms < 0) return 0
        return Math.floor(ms / 1000 / 60 / 60) //小时
      },
    },
    onLoad(option) {
		console.log(option.id)
      this.getGoodDetailRequest(option.id)
    },
  }
</script>

<style lang="scss" scoped>
  .goods {
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    &-stamp {
      position: absolute;
      top: 0;
      right: 14rpx;
      width: 160rpx;
      height: 160rpx;
      z-index: 3;
    }
    &-nav {
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 100;
    }
    &-preSell {
      background-image: url('/static/oldbuyer/pre_sell_bg.png');
      background-repeat: no-repeat;
      background-size: 100% 160rpx;
      padding: 24rpx 32rpx;
      &__bubble {
        background: #fff;
        padding: 0 24rpx;
        border-top-left-radius: 34rpx;
        border-top-right-radius: 34rpx;
        border-bottom-right-radius: 34rpx;
      }
      &__color {
        color: #fff;
      }
    }
    &-price {
      background: #fff;
      padding: 32rpx 32rpx 24rpx;
      &__color {
        color: #ff5319;
      }
      &__name {
        margin-top: 16rpx;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        .name-type {
          background: #ffece5;
          border-radius: 24rpx;
          height: 36rpx;
          line-height: 36rpx;
          padding: 0 16rpx;
          font-size: 24rpx;
          margin-right: 16rpx;
          color: #ff5319;
        }
        .name-text {
          line-height: 48rpx;
          font-weight: bold;
          font-size: 32rpx;
        }
      }
      &__state {
        line-height: 36rpx;
        font-size: 24rpx;
        color: $v-c0-45;
        margin-top: 8rpx;
      }
    }
    &-pre {
      margin-top: 16rpx;
      background: #fff;
      padding: 24rpx 32rpx;
    }
    &-shelves {
      width: 750rpx;
      height: 80rpx;
      line-height: 80rpx;
      background: #feecee;
      text-align: center;
      font-size: 24rpx;
      color: #e50012;
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
  }
</style>
