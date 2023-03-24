<template>
  <view class="info relative">
    <u-swiper
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
    </u-swiper>
    <image
      v-if="userInfo.platformCode === 'supplier'"
      class="water-img"
      src="/static/icons/buyer.png"
    />
    <view class="info-desc">
      <view class="info-desc__row">
        <text class="price-name">现金支付：</text>
        <VoPointPrice
          :leftSize="20"
          :price="info.cashPrice"
          :show-unit="true"
          color="#FF5319"
          display="inline-block"
        />
        <block v-if="info.accountPeriodDays && info.accountPrice">
          <text class="price-name m-l-32">{{ info.accountPeriodDays }}天账期：</text>
          <VoPointPrice
            :leftSize="20"
            :price="info.accountPrice"
            :show-unit="true"
            color="#FF5319"
            display="inline-block"
          />
        </block>
      </view>
      <view
        v-if="info.isInstallation || info.isTradeIn || info.isCoding"
        class="info-desc__row p-t-10"
      >
        <view v-if="info.isInstallation" class="btn-tag fz-25 m-r-10">
          安装 +{{ info.installationFee }}元
        </view>
        <view v-if="info.isTradeIn" class="btn-tag fz-25 m-r-10">
          以旧换新 -{{ info.tradeInFee }}元
        </view>
        <view v-if="info.isCoding" class="btn-tag fz-25">定制 +{{ info.codingPrice }}元</view>
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
        <text v-if="info.categoryType" class="texts-tag">{{ info.categoryType }}</text>
        <text class="texts-name">
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
      </view>
      <view class="info-desc__row nopadding">
        <view v-if="info.warehouseName" class="info-desc__time"
          >{{ info.warehouseName }}发货 预计{{ formateTime(info.arrivalTime) }}送达
        </view>
      </view>
      <!--      <view class="right flex fz-24 color-block-45 m-t-24">-->
      <!--        <view class="flex flex1 flex-vertical-c flex-justify-c" @click="showSharePop">-->
      <!--          <VoIcon class="m-r-8" :opacity="0.45" size="16" color="#000000" name="share" />-->
      <!--          分享-->
      <!--        </view>-->
      <!--        &lt;!&ndash; 供应商没有商品收藏功能 &ndash;&gt;-->
      <!--        &lt;!&ndash; 服务山商没有商品收藏功能 bug：ENG-6771 &ndash;&gt;-->
      <!--        <view-->
      <!--          class="flex flex1 flex-vertical-c flex-justify-c"-->
      <!--          v-if="userInfo.platformCode !== 'supplier' && userInfo.platformCode !== 'agent'"-->
      <!--        >-->
      <!--          <view>{{ userInfo.platformCode }}</view>-->
      <!--          <VoIcon-->
      <!--            v-if="isCollect"-->
      <!--            :size="16"-->
      <!--            color="#FDA202"-->
      <!--            name="star"-->
      <!--            @click="collectCancel()"-->
      <!--          />-->
      <!--          <VoIcon-->
      <!--            v-else-->
      <!--            :opacity="0.45"-->
      <!--            size="16"-->
      <!--            color="#000000"-->
      <!--            name="collect-none"-->
      <!--            @click="collect()"-->
      <!--          />-->
      <!--          <view class="m-l-8">收藏</view>-->
      <!--        </view>-->
      <!--      </view>-->
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
      preview: {
        type: [String, Number],
        default: 0,
      },
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
      }
    },
    created() {},
    methods: {
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
        if (!this.info.warehouseId) {
          this.$u.toast('商品的仓库id为空')
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
        // console.log('shareFn', type)
        this.$refs.sharePop.cancle()
        this.recordAdd(this.info.id, 'share')
        helpUtil
          .shareWeixin({
            scene: type,
            title: this.info.name,
            path: `${devConf.shareBaseUrl}/#/pagesSupplier/ShopList/GoodsDetail?id=${this.info.id}&preview=1`,
            desc: '',
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
    .water-img {
      width: 160rpx;
      height: 140rpx;
      position: absolute;
      right: 36rpx;
      top: 490rpx;
      z-index: 10;
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
      box-sizing: border-box;
      background: #fff;

      &__row {
        display: flex;
        padding-bottom: 16rpx;
        align-items: flex-end;

        &.nopadding {
          padding: 0;
        }

        .row-box {
          padding: 8rpx 28rpx;
          margin-right: 32rpx;
          box-sizing: border-box;
          border: 1px solid #d3d4db;
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
            border: 1px solid #f95865;

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
            font-weight: bold;
            color: $color-primary-yellow;
            margin-bottom: 4rpx;

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
          border: 1px solid #f95865;
          border-radius: 100px;
          font-size: 24rpx;
          line-height: 1.5;
          text-align: center;
          color: #e50012;
          padding: 8rpx 16rpx;
        }

        .btn-tag {
          height: 36rpx;
          border-radius: 4rpx;
          background: #e6efff;
          padding: 0 8rpx;
          color: #0d66ff;
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
      }

      &__texts {
        position: relative;

        .texts-tag {
          background: $v-tags-btn-disabled;
          border-radius: 12px;
          padding: 0 12rpx;
          text-align: center;
          color: $color-primary-yellow;
          font-size: 20rpx;
          line-height: 1.5;
          margin-right: 10rpx;
        }

        .texts-name {
          color: $v-c0-85;
          font-size: 32rpx;
          line-height: 1.5;
          word-break: break-all;
          font-weight: bold;
        }

        .texts-operation {
          color: $v-c0-45;
          font-size: 24rpx;
          line-height: 1.5;
          display: flex;
          align-items: center;
          position: absolute;
          right: 0;
          bottom: 6rpx;
          background-color: rgba(255, 255, 255, 0);
          z-index: 10;
          padding-left: 20rpx;
        }
      }

      &__time {
        color: $v-c0-65;
        font-size: 24rpx;
        line-height: 1.5;
        padding-top: 16rpx;
        // padding-bottom: 24rpx;
      }
    }
  }
</style>
