<template>
  <view class="now" v-if="info">
    <view class="now-padding">
      <view class="flex relative overflow-hidden">
        <div class="relative text-0">
          <block v-if="imgUrl.indexOf('mp4') > -1 || imgUrl.indexOf('MP4') > -1">
            <image
              v-if="imgUrl.split('.').pop() === 'mp4' || imgUrl.split('.').pop() === 'MP4'"
              :src="`${imgUrl}&type=3`"
              class="now-img"
            />
          </block>
          <image v-else :src="imgUrl + '&type=1'" class="now-img" />
          <view
            v-if="
              info.warnLabel && info.warnLabel === '无货' && info.inventory && +info.inventory < 1
            "
            class="mian-tag"
            >无货</view
          >
          <view v-else-if="info.warnLabel && info.warnLabel !== '无货'" class="mian-tag">
            {{ info.warnLabel }}
          </view>
        </div>
        <!--        <view>-->
        <view class="flex1 m-r-24 p-l-15 fz-32 now-name">
          <text v-show="info.categoryType" class="good-tips font-shu-hei-ti m-r-8">{{
            info.categoryType
          }}</text>
          <text> {{ info.name || '' }}</text>
        </view>
        <!--          <view class="flex flex-vertical-c m-t-8">-->
        <!--            <view class="now-cash">现金价</view>-->
        <!--            <view class="now-money">-->
        <!--              <VoPointPrice :price="info.cashPrice || 0" :show-unit="true" display="inline-block" />-->
        <!-- <text class="fz-b">{{ info.cashPrice }}</text>
              <text v-if="false" class="fz-24">.00元</text> -->
        <!--            </view>-->
        <!--          </view>-->
        <!--        </view>-->
      </view>
    </view>
    <view class="now-line">
      <view class="lh42 fz-b fz-28">支付形式</view>
      <view class="flex">
        <view class="flex m-t-16">
          <view
            v-for="item in typeList"
            :key="item.value"
            :class="item.choosed ? 'now-line__selected' : ''"
            class="now-line__code flex flex-justify-c m-r-32 fitContent"
            @click="chooseType(item)"
            v-show="
              item.value === 1 ||
              (info.accountPrice > 0 && info.accountPeriodDays && info.queryType === 'L' && userInfo.platformCode === 'agent')
            "
          >
            <text v-if="item.value === 1 && info.cashPrice > 0"
              >现金支付 ¥{{ fomatterPrice(info.cashPrice) }}</text
            >
            <text v-if="item.value === 0 && info.accountPeriodDays > 0 && info.queryType === 'L'"
              >{{ info.accountPeriodDays || 0 }}天账期 ¥{{ fomatterPrice(info.accountPrice) || 0 }}</text
            >
          </view>
        </view>
      </view>
    </view>
    <view class="now-line">
      <view v-if="info.isCoding || info.isInstallation || info.isTradeIn" class="lh42 fz-b fz-28"
        >服务</view
      >
      <view class="flex flex-wrap">
        <view v-if="info.isCoding">
          <view class="flex m-t-16 m-r-24" @click="selecteClick(0)">
            <view
              :class="selected ? 'now-line__selected' : ''"
              class="now-line__code flex flex-justify-c fitContent"
            >
              <view class="p-r-12">定制服务</view>
              <!--              <VoPointPrice-->
              <!--                :color="selected ? '' : '$v-c0-85'"-->
              <!--                :price="info.codingPrice"-->
              <!--                :show-unit="true"-->
              <!--              />-->
              <text :class="selected ? '' : 'color-block'"> +¥{{ fomatterPrice(info.codingPrice) }}</text>
            </view>
          </view>
        </view>
        <view v-if="info.isInstallation" class="flex m-t-16 m-r-24" @click="selecteClick(1)">
          <view
            :class="installSelected ? 'now-line__selected' : ''"
            class="now-line__code flex flex-justify-c fitContent"
          >
            <view class="p-r-12">安装</view>
            <!--            +<VoPointPrice-->
            <!--              :color="installSelected ? '' : '$v-c0-85'"-->
            <!--              :price="info.installationFee || 0"-->
            <!--              :show-unit="true"-->
            <!--            />-->
            <text :class="installSelected ? '' : 'color-block'"> +¥{{ fomatterPrice(info.installationFee) }}</text>
          </view>
        </view>
        <view
          v-if="info.isTradeIn && info.tradeInFee > 0 && showNew"
          class="flex m-t-16"
          @click="selecteClick(2)"
        >
          <view
            :class="newSelected ? 'now-line__selected' : ''"
            class="now-line__code flex flex-justify-c fitContent"
          >
            <view class="p-r-12">以旧换新</view>
            <!--          -<VoPointPrice-->
            <!--            :color="newSelected ? '' : '$v-c0-85'"-->
            <!--            :price="info.tradeInFee || 0"-->
            <!--            :show-unit="true"-->
            <!--          />-->
            <text :class="newSelected ? '' : 'color-block'"> -¥{{ fomatterPrice(info.tradeInFee) }}</text>
          </view>
        </view>
      </view>
      <view class="flex flex-justify-between m-t-48 lh42 fz-28">
        <view class="fz-b">购买数量</view>
        <view>X1</view>
      </view>
    </view>

    <view class="now-line flex flex-justify-between flex-vertical-c">
      <view class="now-line__left">
        共
        <text class="color-red">1</text>
        件商品
        <text v-if="serviceNumber > 0" class="c-required">{{ serviceNumber }}</text>
        <text v-if="serviceNumber > 0">个服务</text>
      </view>
      <view class="lh48 fz-28 color-block">
        商品金额：
        <VoPointPrice class="font-din-bold" :price="totalPrice" display="inline-block" :left-size="20" :right-size="14" />
        <!-- <text class="color-red fz-b">{{ info.cashPrice }}</text>
        <text v-if="false" class="color-red fz-24">.00元</text> -->
      </view>
    </view>
    <view class="now-bottom p-b-safe-area">
      <EraButton circle size="btn-modal" @click="confirm" text="确定" />
    </view>
  </view>
</template>

<script>
  import { floatTwo } from '@/common/helper'
  export default {
    name: 'BuyNow',
    props: {
      info: {
        type: Object,
        default() {
          return {}
        },
      },
      showNew: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        //定制服务
        selected: false,
        //安装服务
        installSelected: false,
        //以旧换新服务
        newSelected: false,
        //记录服务选项
        serviceArray: [],
        //服务数量
        serviceNumber: 0,
        //图片地址
        imgUrl: '',
        totalPrice: 0,
        typeList: [
          {
            value: 1,
            choosed: true,
          },
          {
            value: 0,
            choosed: false,
          },
        ],
        isCash: 1, //1现金0账期
      }
    },
    created() {
      console.log('this.info', this.info)
      this.totalPrice = this.info.cashPrice
      this.selected = false
      this.installSelected = false
      this.newSelected = false
      // if (this.info.isCoding) {
      //   this.serviceNumber = this.serviceNumber + 1
      //   this.totalPrice = this.decimalAddFn(this.totalPrice, this.info.codingPrice)
      // }
      // if (this.info.isInstallation) {
      //   this.serviceNumber = this.serviceNumber + 1
      //   this.totalPrice = this.decimalAddFn(this.totalPrice, this.info.installationFee)
      // }
      // if (this.info.isTradeIn && this.info.tradeInFee > 0) {
      //   this.serviceNumber = this.serviceNumber + 1
      //   this.totalPrice = this.decimalSubFn(this.totalPrice, this.info.tradeInFee)
      // }
      //详情里pic返回的是数组
      if (this.info.pic && Array.isArray(this.info.pic)) {
        this.imgUrl = this.info.pic[0]
      } else {
        this.imgUrl = this.info.pic
      }
    },
    methods: {
      fomatterPrice(price) {
        return floatTwo(price)
      },
      //选择付款类型
      chooseType(data) {
        if (data.choosed) {
          return
        }
        this.isCash = data.value
        this.typeList.forEach((item) => {
          if (item.value === data.value) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
        if (this.isCash === 1) {
          this.totalPrice = this.decimalAddFn(
            this.decimalSubFn(this.totalPrice, this.info.accountPrice),
            this.info.cashPrice,
          )
        } else {
          this.totalPrice = this.decimalAddFn(
            this.decimalSubFn(this.totalPrice, this.info.cashPrice),
            this.info.accountPrice,
          )
        }
      },
      confirm() {
        this.$emit('confirm', {
          proIsCoding: this.info.isCoding,
          isCoding: this.selected,
          isInstall: this.installSelected,
          isNew: this.newSelected,
          isCash: this.isCash,
        })
      },
      selecteClick(data) {
        if (data === 0) {
          this.selected = !this.selected
          if (this.selected) {
            this.serviceNumber = this.serviceNumber + 1
            this.totalPrice = this.decimalAddFn(this.totalPrice, this.info.codingPrice)
          } else {
            this.serviceNumber = this.serviceNumber - 1
            this.totalPrice = this.decimalSubFn(this.totalPrice, this.info.codingPrice)
          }
          return
        }
        if (data === 1) {
          this.installSelected = !this.installSelected
          if (this.installSelected) {
            this.serviceNumber = this.serviceNumber + 1
            this.totalPrice = this.decimalAddFn(this.totalPrice, this.info.installationFee)
          } else {
            this.serviceNumber = this.serviceNumber - 1
            this.totalPrice = this.decimalSubFn(this.totalPrice, this.info.installationFee)
          }
          return
        }
        if (data === 2) {
          this.newSelected = !this.newSelected
          if (this.newSelected) {
            this.serviceNumber = this.serviceNumber + 1
            this.totalPrice = this.decimalSubFn(this.totalPrice, this.info.tradeInFee)
          } else {
            this.serviceNumber = this.serviceNumber - 1
            this.totalPrice = this.decimalAddFn(this.totalPrice, this.info.tradeInFee)
          }
          return
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .now {
    &-padding {
      padding: 40rpx 32rpx 24rpx 0;
      margin-left: 32rpx;
      box-sizing: border-box;
      //border-bottom: 2rpx solid $v-bg-light;
      .mian-tag {
        position: absolute;
        z-index: 99;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 28rpx;
        width: 96rpx;
        height: 96rpx;
        text-align: center;
        line-height: 96rpx;
        background: rgba(0, 0, 0, 0.65);
        border-radius: 50%;
        font-weight: 400;
      }
    }

    &-img {
      width: 180rpx;
      height: 180rpx;
      border-radius: 8rpx;
      flex-shrink: 0;
    }

    &-name {
      width: 466rpx;
      line-height: 1.5;
      font-weight: bold;
      font-size: 32rpx;
    }

    &-cash {
      height: 28rpx;
      line-height: 28rpx;
      font-size: 24rpx;
      color: #ec404d;
      padding: 2rpx 4rpx;
      background: #fdf2f3;
      border: 2rpx solid #ec404d;
      border-radius: 4rpx;
      margin-right: 8rpx;
    }

    &-money {
      height: 42rpx;
      line-height: 42rpx;
      font-size: 28rpx;
      color: #e50012;
    }

    &-line {
      padding: 24rpx 32rpx 24rpx 0;
      margin-left: 32rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid $v-bg-light;

      &__code {
        width: 280rpx;
        text-align: center;
        height: 56rpx;
        line-height: 56rpx;
        font-size: 24rpx;
        color: $v-c0-85;
        background: #f6f7f8;
        border-radius: 80rpx;
        box-sizing: border-box;
        border: 2rpx solid #f6f7f8;
        &.fitContent {
          width: fit-content;
          padding: 0 24rpx;
        }
      }
      &__selected {
        color: $color-primary-yellow;
        background: $v-tags-btn-disabled;
        border: 2rpx solid $v-tags-one;
      }
      &__left {
        line-height: 36rpx;
        font-size: 24rpx;
        color: $v-c0-65;
        margin-right: 16rpx;
      }
    }

    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      ::v-deep .u-button--normal {
        font-size: 32rpx;
      }
    }
  }
  .good-tips {
    //height: 36rpx;
    //line-height: 36rpx;
    //font-size: 24rpx;
    //color: $color-primary-yellow;
    color: #f20014;
    font-size: 36rpx;
    //padding: 0 12rpx;
    //background: $v-tags-btn-disabled;
    //border-radius: 24rpx;
  }
</style>
