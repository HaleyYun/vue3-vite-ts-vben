<template>
  <view class="info">
    <!-- <u-swiper
      :autoplay="false"
      :height="375"
      :list="info.pic"
      indicatorMode="line"
      indicatorStyle="right: 32rpx"
      radius="0"
      @change="(e) => (currentNum = e.current)"
      @click="lookPhoto"
    >
      <view slot="indicator" class="indicator-num">
        <text class="indicator-num__text">{{ currentNum + 1 }}/{{ info.pic.length }}</text>
      </view>
    </u-swiper> -->

    <VoImgsBanner
      :imgList="imgList"
      :currentImg="currentNum"
      :isShowSmallImgs="false"
      customizeDisplayField="url"
    >
      <image
        v-if="info.labelList && info.labelList.indexOf('爆款') !== -1"
        class="hotBg"
        src="/static/garage/pro/hotBorderBig.png"
      />
    </VoImgsBanner>
    <view class="info-desc">
      <view
        class="info-desc__row"
        :class="
          (info.labelList && info.labelList.indexOf('秒杀') !== -1) ||
          (info.isTradeIn && info.tradeInFee > 0)
            ? 'info-desc__bg m-b-24'
            : 'm-b-8'
        "
      >
        <view class="flex flex-vertical-base lh150">
          <text
            v-if="
              (info.labelList && info.labelList.indexOf('秒杀') !== -1) ||
              (info.isTradeIn && info.tradeInFee > 0)
            "
            class="price-name color-white"
            >预计到手</text
          >
          <text class="price-name" v-else>现金支付</text>
          <view
            :class="
              (info.labelList && info.labelList.indexOf('秒杀') !== -1) ||
              (info.isTradeIn && info.tradeInFee > 0)
                ? 'color-white'
                : 'color-orange'
            "
          >
            ¥
            <VoPointPrice
              v-if="info.isTradeIn && info.tradeInFee > 0"
              :price="decimalSubFn(info.cashPrice, info.tradeInFee)"
              display="inline-block"
              class="font-din-bold"
              color="#ffffff"
              :leftSize="28"
              :right-size="16"
            />
            <VoPointPrice
              v-else-if="info.labelList && info.labelList.indexOf('秒杀') !== -1"
              :leftSize="28"
              class="font-din-bold"
              :right-size="16"
              :price="info.cashPrice"
              color="#ffffff"
              display="inline-block"
            />
            <VoPointPrice
              v-else
              class="font-din-bold"
              :leftSize="28"
              :right-size="16"
              :price="info.cashPrice"
              color="#FF5319"
              display="inline-block"
            />
            <text v-if="info.isTradeIn && info.tradeInFee > 0" class="fz-24 text-through m-l-16">
              ¥{{ fomatterPrice(info.cashPrice) }}
            </text>
          </view>
        </view>
        <text v-if="info.isTradeIn && info.tradeInFee > 0" class="priceTag font-shu-hei-ti"
          >以旧换新价</text
        >
        <text
          v-else-if="info.labelList && info.labelList.indexOf('秒杀') !== -1"
          class="priceTag font-shu-hei-ti"
          >秒杀价</text
        >
        <!-- <block v-if="info.accountPeriodDays">
          <text class="price-name m-l-32">{{ info.accountPeriodDays }}天账期：</text>
          <VoPointPrice
            :leftSize="20"
            :price="info.accountPrice"
            :show-unit="true"
            color="#FF5319"
            display="inline-block"
          />
        </block> -->
      </view>
      <view
        v-if="
          (info.isTradeIn && info.tradeInFee > 0) ||
          info.isInstallation ||
          info.isCoding ||
          (info.labelList && info.labelList.indexOf('秒杀') !== -1) ||
          (info.labelList && info.labelList.indexOf('质保时长') !== -1 && info.warrantyDays)
        "
        class="info-desc__row"
        :class="info.isTradeIn && info.tradeInFee > 0 ? '' : 'm-b-8'"
      >
        <view v-if="info.isTradeIn && info.tradeInFee > 0" class="btn-tag blue" :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''">
          以旧换新 -{{ fomatterPrice(info.tradeInFee) }}
        </view>
        <view v-if="info.isInstallation && info.installationFee > 0" class="btn-tag" :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''">
          安装 +{{ fomatterPrice(info.installationFee) }}
        </view>
        <view v-if="info.isCoding && info.codingPrice > 0" class="btn-tag" :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''">定制 +{{ fomatterPrice(info.codingPrice) }}</view>
        <view
          v-if="
            info.isTradeIn &&
            info.tradeInFee > 0 &&
            info.labelList &&
            info.labelList.indexOf('秒杀') !== -1
          "
          class="btn-tag"
          :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''"
        >
          秒杀
        </view>
        <view
          v-if="info.labelList && info.labelList.indexOf('质保时长') !== -1 && info.warrantyDays"
          class="btn-tag black"
          :class="systemInfo.platform === 'android' ? 'b-radius-8' : ''"
        >
          {{ info.warrantyDays }}个月质保
        </view>
      </view>
      <view v-if="info.isTradeIn && info.tradeInFee > 0" class="info-desc__row m-b-24">
        <view class="btn-tag gray">用于重生之翼再制造</view>
      </view>
      <!-- <view class="info-desc__row">
		<view class="col">
		  <text class="label">建议零售价：</text>
		  <text class="price else">0 <text class="unit">.00元</text></text>
		</view>
		<view>
		  <text class="label">预计利润：</text>
		  <text class="price else">280000 <text class="unit">.00元</text></text>
		</view>
	  </view> -->
      <view class="info-desc__texts">
        <text class="texts-name">
          <text v-if="info.categoryType" class="texts-tag font-shu-hei-ti">
            {{ info.categoryType }}
          </text>
          {{ info.name.length > 18 && !isExpand ? info.name.slice(0, 18) : info.name }}
        </text>
        <view
          v-if="info.name.length > 18 && !isExpand"
          class="texts-operation"
          @click="isExpand = true"
        >
          展开
          <VoIcon :opacity="15" :size="16" color="#000000" name="arrow-bottom-line" />
        </view>
        <view v-else-if="isExpand" class="texts-operation" @click="isExpand = false">
          收起
          <VoIcon :opacity="15" :size="16" color="#000000" name="arrow-top-line" />
        </view>
      </view>
      <view class="info-desc__row nopadding">
        <view v-if="info.deliveryAreaName" class="info-desc__time m-r-20">
          {{ `${info.deliveryAreaName}发货` }}
          <!--         注释到货时效 -->
          <!--          预计{{ formateTime(info.arrivalTime) }}送达-->
        </view>
        <view class="info-desc__time">
          月销量：
          <block v-if="info.monthlySalesVolume">
            <block v-if="+info.monthlySalesVolume > 10000">
              {{ Math.ceil(+info.monthlySalesVolume / 1000) / 10 }}万台
            </block>
            <block v-else>{{ info.monthlySalesVolume }}台</block>
          </block>
          <block v-else>0台</block>
        </view>
      </view>
      <view class="right flex fz-24 color-block-45 m-t-24">
        <view class="flex flex1 flex-vertical-c flex-justify-c" @click="showSharePop">
          <VoIcon size="14" :opacity="0.45" color="#000000" name="share" class="m-r-10" />
          分享
        </view>
        <view class="flex flex1 flex-vertical-c flex-justify-c">
          <VoIcon
            v-if="isCollect"
            :size="14"
            color="#FDA202"
            name="star"
            class="m-r-10"
            @click="collectCancel()"
          />
          <VoIcon
            v-else
            :opacity="0.45"
            class="m-r-10"
            color="#000000"
            name="collect-none"
            size="14"
            @click="collect()"
          />
          收藏
        </view>
      </view>
    </view>
    <!-- 分享 -->
    <VoShareView ref="sharePop" @shareFn="shareFn" />
  </view>
</template>
<script>
  import helpUtil from '@/common/helper'
  import devConf from '@/common/env'
  export default {
    name: 'GoodsInfo',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        currentNum: 0,
        isCollect: this.info.isCollect === 1 ? true : false,
        isLoading: false,
        isExpand: false,
        swiperList: [],
        imgList: [],
        systemInfo: {},
      }
    },
    created() {
      this.systemInfo = this.$systemInfo
      let pics = this.info.pic
      pics.forEach((item) => {
        if (item.indexOf('mp4') > -1 || item.indexOf('MP4') > -1) {
          item = item + '&type=3'
        }
      })
      this.swiperList = pics
      this.imgList = this.info.pic.map((item) => {
        return {
          url: item.indexOf('mp4') > -1 || item.indexOf('MP4') > -1 ? item + '&type=3' : item,
          originUrl: item, //播放视频使用
        }
      })
    },
    methods: {
      fomatterPrice(price) {
        return helpUtil.floatTwo(price)
      },
      formateTime(day) {
        let val = day * 24
        if (val <= 12) {
          return '12小时内'
        } else if (val <= 24) {
          return '24小时内'
        } else if (val <= 36) {
          return '36小时内'
        } else if (val <= 48) {
          return '48小时内'
        } else {
          return this.$vocenApi.dayjs().add(parseInt(day), 'day').format('MM月DD日')
        }
      },
      //付款方式选择
      typeClick(val) {
        this.typeList.forEach((item) => {
          if (item.text === val.text) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
      },
      lookPhoto(e) {
        uni.previewImage({
          urls: this.info.pic,
          current: e,
        })
      },
      //收藏
      collect() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        let params = [
          {
            goodsId: this.info.id,
            warehouseId: this.info.warehouseId,
            goodsType: 1,
            shopId: this.info.goodsGoodsShopInfoVO.shopId,
            // userId: this.userInfo.id,
          },
        ]
        this.$VoHttp.GOODS.apiGoodsCollectionCollection(params)
          .then((res) => {
            if (+res.code === 20001) {
              this.$toast('收藏成功', 'success', '/static/icons/success_icon.png')
              this.isCollect = true
            }
            this.isLoading = false
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '收藏失败')
            this.isLoading = false
          })
      },
      //取消收藏
      collectCancel() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        this.$VoHttp.GOODS.apiGoodsCollectionCancel$Id({
          id: this.info.id,
          shopId: this.info.goodsGoodsShopInfoVO.shopId,
        })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('已取消收藏')
              this.isCollect = false
            }
            this.isLoading = false
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('取消失败')
            this.isLoading = false
          })
      },
      //分享
      showSharePop() {
        this.$refs.sharePop.showShare(true)
      },
      //分享
      shareFn(type) {
        console.log('shareFn', type)
        this.$refs.sharePop.cancle()
        this.recordAdd(this.info.id, 'share')
        helpUtil
          .shareWeixin({
            scene: type,
            title: this.info.name,
            path: `${devConf.shareBaseUrl}/#/pagesGarage/ShopList/GoodsDetail?id=${this.info.id}&wid=${this.info.warehouseId}`,
            imageUrl: this.info.pic && this.info.pic.length ? this.info.pic[0] : '',
          })
          .then((res) => {
            console.log('res分享', res)
          })
          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
      },
      // 增加分享量
      recordAdd(id, type) {
        try {
          this.$VoHttp.GOODS.apiGoodsVisitRecordAdd({ goodsId: id, visitType: type })
        } catch (e) {
          console.log(e)
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .info {
    position: relative;
    .hotBg {
      position: absolute;
      z-index: 98;
      left: 0;
      top: 0;
      width: 750rpx;
      height: 750rpx;
    }
    .indicator-num {
      padding: 0 18rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.45);
      border-radius: 100px;

      &__text {
        color: #ffffff;
        line-height: 48rpx;
        font-size: 28rpx;
      }
    }

    &-desc {
      padding: 32rpx;
      padding-top: 16rpx;
      box-sizing: border-box;
      background: #fff;

      &__row {
        display: flex;
        align-items: baseline;

        &.nopadding {
          padding: 0;
        }

        .row-box {
          padding: 8rpx 28rpx;
          margin-right: 32rpx;
          box-sizing: border-box;
          border: 2rpx solid #d3d4db;
          border-radius: 8px;
          background: #f7f7f8;
          position: relative;

          &__text {
            font-size: 24rpx;
            line-height: 1.5;
          }

          &__icon {
            position: absolute;
            right: 8rpx;
            bottom: 12rpx;
          }

          &.choosed {
            background: #fdf2f3;
            border: 2rpx solid #f95865;

            .row-box__text {
              color: #e50012;
            }
          }
        }
        .price {
          color: #e50012;
          font-weight: 600;
          font-size: 40rpx;
          line-height: 1.5;

          &-name {
            font-size: 24rpx;
            color: $color-primary-yellow;
            margin-right: 16rpx;
            height: 36rpx;
            display: block;
            line-height: 1.5;

            &.two {
              margin-left: 32rpx;
            }
          }

          .unit {
            font-size: 24rpx;
            font-weight: 400;
          }

          &.else {
            font-size: 28rpx;

            .unit {
              font-size: 20rpx;
            }
          }
        }

        .label {
          font-size: 20rpx;
          line-height: 1.5;
          color: $v-c0-45;
        }

        .col {
          margin-right: 24rpx;
        }

        .btn {
          background: #feecee;
          border: 2rpx solid #f95865;
          border-radius: 100px;
          font-size: 24rpx;
          line-height: 1.5;
          text-align: center;
          color: #e50012;
          padding: 8rpx 16rpx;
        }

        .btn-tag {
          height: 32rpx;
          line-height: 32rpx;
          border-radius: 4rpx;
          border: 2rpx solid #ff5319;
          //background: #e6efff;
          margin-bottom: 16rpx;
          padding: 0 4rpx;
          color: #ff5319;
          font-size: 20rpx;
          margin-right: 20rpx;
          &.blue {
            border-color: #2676ff;
            color: #2676ff;
          }
          &.black {
            background: #ffe2b8;
            border-color: transparent;
            color: #262626;
          }
          &.gray {
            padding: 2rpx 16rpx;
            border-color: transparent;
            background: #f7f7f8;
            border-radius: 40rpx;
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.65);
          }
        }

        .right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 24rpx;
          line-height: 1.5;
          color: $v-c0-45;
        }

        .color {
          &-orange {
            font-size: 24rpx;
            color: $color-primary-yellow;
          }
          &-white {
            font-size: 24rpx;
            color: #fff;
          }
        }
      }
      &__bg {
        margin-right: -16rpx;
        margin-left: -16rpx;
        padding: 16rpx 20rpx;
        background: linear-gradient(88.1deg, #ff5319 28.47%, #ffad33 91.89%);
        border-radius: 8rpx;
        justify-content: space-between;
        align-items: center;
        .priceTag {
          color: #fff;
          font-weight: 700;
          font-size: 16px;
        }
        .color {
          &-orange {
            font-size: 24rpx;
            color: $color-primary-yellow;
          }
          &-white {
            font-size: 24rpx;
            color: #fff;
          }
        }
      }
      &__texts {
        position: relative;
        display: flex;
        .texts-tag {
          //background: $v-tags-btn-disabled;
          //border-radius: 12px;
          //padding: 0 12rpx;
          //text-align: center;
          //color: $color-primary-yellow;
          font-size: 36rpx;
          //line-height: 1.5;
          margin-right: 10rpx;
          color: #f20014;
          font-weight: 700;
        }

        .texts-name {
          color: $v-c0-85;
          font-size: 32rpx;
          line-height: 1.5;
          font-weight: 700;
          word-break: break-all;
        }

        .texts-operation {
          color: $v-c0-45;
          font-size: 24rpx;
          line-height: 1.5;
          display: flex;
          //align-items: center;
          //position: absolute;
          //right: 0;
          //bottom: 6rpx;
          background-color: #fff;
          //z-index: 10;
          //padding-left: 20rpx;
          flex-shrink: 0;
          margin-left: 16rpx;
        }
      }

      &__time {
        color: $v-c0-45;
        font-size: 24rpx;
        line-height: 1.5;
        padding-top: 16rpx;
        // padding-bottom: 24rpx;
      }
    }
  }
</style>
