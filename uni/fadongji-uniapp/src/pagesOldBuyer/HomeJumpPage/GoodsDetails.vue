<template>
  <view>
    <view class="goods">
      <view class="flex1 overflow-y">
        <VoNav :is-fixed="false" title="商品详情" />
        <!-- <u-swiper
          :autoplay="false"
          :height="375"
          :list="pic"
          indicatorMode="line"
          indicatorStyle="right: 32rpx"
          radius="0"
          @change="(e) => (currentNum = e.current)"
          @click="lookPreviewImage"
        >
          <view slot="indicator" class="goods-num">
            <text class="goods-num__text">{{ currentNum + 1 }}/{{ pic.length }}</text>
          </view>
        </u-swiper> -->
        <VoImgsBanner
          :imgList="imgList"
          :currentImg="currentNum"
          :isShowSmallImgs="false"
          customizeDisplayField="url"
          @imgClick="bannerClick"
        />
        <!--   预售结束时间   -->
        <view v-if="preSell === true" class="goods-preSell flex flex-justify-between">
          <view>
            <view class="goods-preSell__bubble flex flex-vertical-c">
              <view class="goods-price__color m-r-8 fz-b fz-24">现金</view>
              <VoPointPrice
                :leftSize="20"
                :price="goodDetail.price"
                :showUnit="true"
                class="lh60"
                color="#FF5319"
              />
            </view>
            <view class="goods-preSell__color flex flex-vertical-c m-t-6">
              <view class="fz-24 m-r-8">原价</view>
              <view class="fz-28 lh42">{{ goodDetail.originalSalePrice }}元</view>
              <view class="fz-24 m-l-32">库存</view>
              <view class="fz-28 m-l-8">{{
                preSell ? goodDetail.margin : goodDetail.inventory
              }}</view>
            </view>
          </view>

          <view class="goods-preSell__color">
            <view
              class="fz-28 fz-b"
              v-if="
                $vocenApi.dayjs().isBefore(goodDetail.endTime) &&
                $vocenApi.dayjs(goodDetail.startTime).isBefore(new Date())
              "
              >距离预售结束</view
            >
            <view class="fz-28 fz-b" v-if="$vocenApi.dayjs().isBefore(goodDetail.startTime)"
              >距离预售开始</view
            >
            <view class="flex flex-vertical-b m-t-12">
              <view class="fz-24"
                >还剩<text class="fz-28">{{ timeData.days }}</text
                >天</view
              >
              <u-count-down :time="downData" @change="onChange">
                <view class="color-count font-din-bold">
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
        <view v-if="preSell === true" class="presell_goods">
          <view class="goods-price__name">
            <text class="name-type">{{ goodDetail.level }}类</text>
            <text class="name-text">
              {{ goodDetail.name }}
            </text>
          </view>
          <view class="flex flex-vertical-c m-t-5 color-block-85 text-28">
             {{ goodDetail.model }}
          </view>
          <view class="goods-price__state flex flex-vertical-c">
            <view class="m-r-20">{{ goodDetail.deliveryAreaName }}发货</view>
            <view class="m-r-24">{{ goodDetail.shippingType === 1 ? '包邮' : '' }}</view>
          </view>
        </view>
        <view v-else class="goods-price">
          <view class="flex flex-vertical-c">
            <view class="goods-price__color m-r-8 fz-b fz-24">现金</view>
            <VoPointPrice
              :leftSize="20"
              :price="goodDetail.price"
              :showUnit="true"
              class="lh60"
              color="#FF5319"
            />
          </view>
          <view class="flex flex-vertical-c color-block-85 text-28">
             {{ goodDetail.model }}
          </view>
          <view class="m-t-10 flex color-block-45 fz-28">
            <view
              >已销:<text class="m-l-10">{{ goodDetail.saleCount }}</text></view
            >
            <view class="m-l-56"
              >库存:<text class="m-l-10">{{ goodDetail.inventory }}</text></view
            >
          </view>
          <view class="goods-price__name">
            <text class="name-type">{{ goodDetail.level }}类</text>
            <text class="name-text">
              {{ goodDetail.name }}
            </text>
          </view>
          <view class="goods-price__state flex flex-vertical-c">
            <view class="m-r-20">{{ goodDetail.deliveryAreaName }}发货</view>
            <view class="m-r-24">{{ goodDetail.shippingType === 1 ? '包邮' : '' }}</view>
            <view>预计{{ goodDetail.arrivalTime }}小时内发货</view>
          </view>
        </view>
        <!--   预售时间、发货时间   -->
        <view v-if="preSell === true" class="goods-pre">
          <view class="flex flex-vertical-c lh42">
            <view class="fz-28 color-block-45">预售时间</view>
            <view class="fz-28 color-block m-l-32"
              >{{ $vocenApi.VoUtils.timeFormat(goodDetail.startTime, 'mm-dd hh:MM') }} 至
              {{ $vocenApi.VoUtils.timeFormat(goodDetail.endTime, 'mm-dd hh:MM') }}</view
            >
          </view>
          <view class="flex flex-vertical-c lh42 m-t-24">
            <view class="fz-28 color-block-45">发货时间</view>
            <view class="fz-28 color-block m-l-32"
              >预计{{
                $vocenApi.VoUtils.timeFormat(goodDetail.deliveryTime, 'mm-dd hh:MM')
              }}开始发货</view
            >
          </view>
        </view>
      </view>
      <view v-if="state === 1" class="goods-shelves">商品库存不足，快去联系卖家补货吧</view>
      <view v-else-if="state === 2" class="goods-shelves"
        >商品已下架，去看看其他商品吧，点击查>></view
      >
      <view class="goods-bottom flex flex-vertical-c flex-justify-between" v-if="+noBuy !== 1 && !hideBtn">
        <view class="flex">
          <view class="flex flex-column flex-vertical-c m-l-40" @click="toIm()">
            <VoIcon :size="24" name="customer-service-new" />
            <view class="m-t-8 lh30 fz-22 color-block-main">客服</view>
          </view>
          <view
            class="goods-bottom__shopping flex flex-column flex-vertical-c m-l-56"
            @click="goodCarClick"
          >
            <VoIcon :size="24" name="car-new" />
            <VoBadge :value="carNumber" class="shopping-badge" max="99" />
            <view class="m-t-8 lh30 fz-22 color-block-main">购物车</view>
          </view>
        </view>
        <view
          v-if="goodDetail.status == 3 && (goodDetail.margin || goodDetail.inventory)"
          class="flex flex-vertical-c"
        >
          <view class="goods-bottom__car" @click="addGoodCar">加入购物车</view>
          <view class="goods-bottom__buy m-l-16" @click="confirmOrder">立即购买</view>
        </view>
        <!--   禁用状态   -->
        <view v-else class="flex flex-vertical-c">
          <view class="goods-bottom__disable">加入购物车</view>
          <view class="goods-bottom__disable m-l-16">立即购买</view>
        </view>
      </view>
    </view>
    <BuyNowPopup ref="buyNowRef" @addCarSuccess="addCarSuccess" />
    <EraPreviewVideo ref="EraPreviewVideo" :poster="videoPoster + '&type=3'" />
  </view>
</template>

<script>
  import BuyNowPopup from '@/pages/OldBuyerCenter/components/HomeComponents/BuyNowPopup'

  export default {
    name: 'GoodsDetails',
    components: { BuyNowPopup },
    data() {
      return {
        noBuy: 0,
        currentNum: 0,
        pic: [],
        imgList: [],
        goodDetail: {},
        state: 0, // 0：正常状态，1：库存不足，2：商品已下架，预售未开始
        preSell: false, // 是否预售
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),
        carNumber: '',
        videoPoster: '',
        hideBtn: false,
      }
    },
    onLoad(option) {
      this.noBuy = option.noBuy
      this.preSell = JSON.parse(option.source)
      this.hideBtn = option.hideBtn || false
      //预售商品详情
      if (this.preSell) {
        this.pellGoodCarRequest({ id: option.id })
        return
      }
      this.sellGoodCarRequest({ id: option.id })
    },
    onShow() {
      this.carNumber = ''
      this.initAddrss()
    },
    methods: {
      //轮播点击
      bannerClick(item) {
        // if (item.url.indexOf('mp4') > -1 || item.url.indexOf('MP4') > -1) {
        //   this.videoPoster = item.url
        //   this.$refs.EraPreviewVideo.show(item.url)
        // } else {
        //   uni.previewImage({
        //     urls: [item.url],
        //     current: 0,
        //   })
        // }
      },
      // 跳转到客服聊天界面
      toIm() {
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本
        const info = {
          targetId: this.goodDetail.userId,
          type: 0,
          platformCode: 'recycling', //回收公司
          isShop: true, //是否是店铺聊天
          //   goods: {
          //     name: this.goodDetail.name,
          //     pic: this.goodDetail.picture[0],
          //     id: this.goodDetail.id,
          //     cashPrice: this.goodDetail.price,
          //     accountPrice: this.goodDetail.originalSalePrice,
          //     accountPeriodDays: this.goodDetail.accountPeriodDays,
          //   },
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      onChange(e) {
        this.timeData = e
      },
      lookPreviewImage(index) {
        // 预览图片
        uni.previewImage({
          urls: this.pic,
          current: index,
        })
      },
      addGoodCar() {
        const param = Object.assign({}, this.goodDetail)
        param.picture = param.picture[0]
        this.$refs.buyNowRef.showClick(param, 1, this.preSell, true)
      },
      goodCarClick() {
        this.$linkToEasy('/pages/OldBuyerCenter/OldBuyerTabbar?tabbarVal=1')
      },
      confirmOrder() {
        const param = Object.assign({}, this.goodDetail)
        param.picture = param.picture[0]
        this.$refs.buyNowRef.showClick(param, 2, this.preSell, true)
      },
      addCarSuccess() {
        this.initAddrss()
        this.carNumber = ''
      },
      //获取销售商品详情
      async sellGoodCarRequest(param) {
        try {
          let res = await this.$VoHttp.apiGoodsRecyleResaleBuyerInfo(param)
          if (res.success) {
            this.goodDetail = res.data
            if (this.goodDetail.picture) {
              this.pic = this.goodDetail.picture
              this.imgList = this.goodDetail.picture.map((item) => {
                return {
                  url:
                    item.indexOf('mp4') > -1 || item.indexOf('MP4') > -1 ? item + '&type=3' : item,
                  originUrl: item, //播放视频使用
                }
              })
            }
            //判断此商品的状态 状态 1：待审核 2：审核不通过 3：上架   4：下架
            if (this.goodDetail.status === 4) {
              this.state = 2
              return
            }
            //判断库存充足否
            if (this.goodDetail.inventory < 1) {
              this.state = 1
              return
            }
          }
        } catch (err) {
          this.$u.toast(err.message)
        }
      },
      //获取预售商品详情
      async pellGoodCarRequest(param) {
        this.$VoHttp
          .apiGoodsRecylePreSaleQueryBuyerInfo(param)
          .then((res) => {
            if (res.code === '20001') {
              if (res.data.picture && res.data.picture.length) {
                this.imgList = res.data.picture.map((item) => {
                  return {
                    url:
                      item.indexOf('mp4') > -1 || item.indexOf('MP4') > -1
                        ? item + '&type=3'
                        : item,
                    originUrl: item, //播放视频使用
                  }
                })
              }

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
        this.goodDetail = data
        this.pic = this.goodDetail.picture
        if (this.$vocenApi.dayjs().isBefore(this.goodDetail.startTime)) {
          let Time = new Date(this.goodDetail.startTime.replace(/-/g, '/'))
          let timestemp = Time.getTime()
          this.downData = timestemp - this.newData
        } else if (
          this.$vocenApi.dayjs().isBefore(this.goodDetail.endTime) &&
          this.$vocenApi.dayjs(this.goodDetail.startTime).isBefore(new Date())
        ) {
          let Time = new Date(this.goodDetail.endTime.replace(/-/g, '/'))
          let timestemp = Time.getTime()
          this.downData = timestemp - this.newData
        }
        if (this.goodDetail.status === 4) {
          //判断此商品的状态 1：待审核   2：未开始 3：进行中 4：已暂停（已下架） 5：已结束 6：审核不通过
          this.state = 2
          return
        }
        //判断库存充足否
        if (this.goodDetail.margin < 1) {
          this.state = 1
          return
        }
        console.log(this.state)
      },
      // 获取默认地址
      initAddrss() {
        this.$VoHttp.USER.apiReceiverAddressDefault().then((res) => {
          if (res.data) {
            this.initFn(res.data.areaCode)
          }
        })
      },
      /**
       * 获取购物车详情
       */
      initFn(areaCode) {
        this.$VoHttp
          .apiCartResaleDetailst({
            areaCode: areaCode,
          })
          .then((res) => {
            let cartList = (res.data && res.data.noExpiredList) || []
            cartList.forEach((item) => {
              let number = 0
              if (item.resaleGoodsList && item.resaleGoodsList.length > 0) {
                number = item.resaleGoodsList.length
              }
              this.carNumber = this.decimalAddFn(Number(this.carNumber), number)
            })
          })
      },
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
    &-nav {
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 100;
      &__back {
        width: 48rpx;
        height: 48rpx;
        display: block;
        background: rgba(0, 0, 0, 0.45);
        border-radius: 50%;
      }
    }
    &-num {
      height: 48rpx;
      line-height: 48rpx;
      padding: 0 18rpx;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.45);
      border-radius: 100rpx;
      color: #fff;
      font-size: 28rpx;
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
        .color-count {
          font-size: 32rpx;
          font-weight: 700;
          width: 130rpx;
        }
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
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      border-top: 2rpx solid $v-bg-light;
      &__shopping {
        position: relative;
        .shopping-badge {
          position: absolute;
          top: -6rpx;
          right: 0;
        }
      }
      &__disable {
        width: 200rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: #f6f7f8;
        border-radius: 48rpx;
        font-size: 32rpx;
        color: $v-c0-25;
      }
      &__car {
        width: 200rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: #ff9b05;
        border-radius: 48rpx;
        font-size: 32rpx;
        color: #fff;
      }
      &__buy {
        width: 200rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: #ff5319;
        border-radius: 48rpx;
        font-size: 32rpx;
        color: #fff;
      }
    }
  }
  .presell_goods {
    background: #fff;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    .goods-price__name {
      margin-top: 0;
    }
  }
</style>
