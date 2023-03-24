<template>
  <view class="now">
    <view class="now-close" @click="closeFn">
      <VoIcon size="14" color="#000" :opacity="0.65" name="close-x" />
    </view>
    <view class="now-padding">
      <view class="flex p-r-26">
        <block v-if="pic.indexOf('mp4') > -1 || pic.indexOf('MP4') > -1">
          <image
            v-if="pic.split('.').pop() === 'mp4' || pic.split('.').pop() === 'MP4'"
            :src="`${pic}&type=3`"
            class="now-img"
          />
        </block>
        <image v-else :src="pic + '&type=1'" class="now-img" />
        <!--        <image v-if="info.pic" :src="pic" class="now-img" />-->
        <view>
          <view class="now-name">
            <text v-show="info.categoryType" class="good-tips font-shu-hei-ti m-r-8">{{
              info.categoryType
            }}</text>
            <text class="buy-name__word">{{ info.name }}</text>
          </view>
          <!--          <view class="flex flex-vertical-c m-t-8">-->
          <!--            <view class="now-cash">现金</view>-->
          <!--            <view class="now-money">-->
          <!--              <VoPointPrice :price="info.cashPrice" :show-unit="true" display="inline-block" />-->
          <!--              &lt;!&ndash; <text class="fz-b">{{ info.cashPrice }}</text>-->
          <!--              <text v-if="false" class="fz-24">.00元</text> &ndash;&gt;-->
          <!--            </view>-->
          <!--          </view>-->
        </view>
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
              (info.accountPrice > 0 && info.accountPeriodDays && queryType === 'L')
            "
          >
            <text v-if="item.value === 1 && info.cashPrice > 0"
              >现金支付 ¥{{ fomatterPrice(info.cashPrice) }}</text
            >
            <text v-if="item.value === 0 && info.accountPeriodDays > 0 && queryType === 'L'"
              >{{ info.accountPeriodDays || 0 }}天账期 ¥{{ fomatterPrice(info.accountPrice) || 0 }}</text
            >
          </view>
        </view>
      </view>
      <view v-if="info.isCoding || info.isInstallation" class="lh42 fz-b fz-28 m-t-20">服务</view>
      <view class="flex flex-wrap">
        <view v-if="info.isCoding" class="flex m-t-16 m-r-24" @click="selecteClick(0)">
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
        <view v-if="info.isInstallation" class="flex m-t-16" @click="selecteClick(1)">
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
      </view>
      <!--      <view-->
      <!--        v-show="info.isTradeIn && info.tradeInFee > 0"-->
      <!--        class="flex m-t-24"-->
      <!--        @click="selecteClick(2)"-->
      <!--      >-->
      <!--        <view-->
      <!--          :class="newSelected ? 'now-line__selected' : ''"-->
      <!--          class="now-line__code flex flex-justify-c fitContent"-->
      <!--        >-->
      <!--          <view class="p-r-12">以旧换新</view>-->
      <!--&lt;!&ndash;          -<VoPointPrice&ndash;&gt;-->
      <!--&lt;!&ndash;            :color="newSelected ? '' : '$v-c0-85'"&ndash;&gt;-->
      <!--&lt;!&ndash;            :price="info.tradeInFee || 0"&ndash;&gt;-->
      <!--&lt;!&ndash;            :show-unit="true"&ndash;&gt;-->
      <!--&lt;!&ndash;          />&ndash;&gt;-->
      <!--          <text :class="newSelected ? '' : 'color-block'"> -¥{{ info.tradeInFee }}</text>-->
      <!--        </view>-->
      <!--      </view>-->
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
        <!--        <VoPointPrice :price="totalPrice" :show-unit="true" display="inline-block" />-->
        <VoPointPrice class="font-din-bold" :price="totalPrice" display="inline-block" :left-size="20" :right-size="14" />
        <!-- <text class="color-red fz-b">{{ info.cashPrice }}</text>
        <text v-if="false" class="color-red fz-24">.00元</text> -->
      </view>
    </view>
    <view class="now-bottom p-b-safe-area">
      <EraButton circle size="btn-modal" @click="confirm" />
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
      queryType: {
        type: String,
        default: '',
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
        pic: '',
      }
    },
    created() {
      console.log('this.info', this.info)
      let src = Array.isArray(this.info.pic) ? this.info.pic[0] : this.info.pic
      if (src.indexOf('mp4') > -1 || src.indexOf('MP4') > -1) {
        this.pic = src + '&type=3'
      } else {
        this.pic = src
      }
      // this.selected = this.info.isCoding || false
      // this.installSelected = this.info.isInstallation || false
      this.selected = false
      this.installSelected = false
      this.newSelected = false

      //代客下单没有回收服务
      // this.newSelected = this.info.isTradeIn || false
      this.totalPrice = this.info.cashPrice
      // if (this.info.isCoding) {
      //   this.serviceNumber = this.serviceNumber + 1
      //   this.totalPrice = this.decimalAddFn(this.totalPrice, this.info.codingPrice)
      // }
      // if (this.info.isInstallation) {
      //   this.serviceNumber = this.serviceNumber + 1
      //   this.totalPrice = this.decimalAddFn(this.totalPrice, this.info.installationFee)
      // }
      // if (this.info.isTradeIn) {
      //   this.serviceNumber = this.serviceNumber + 1
      //   this.totalPrice = this.decimalSubFn(this.totalPrice, this.info.tradeInFee)
      // }

      if (this.info.accountPeriodDays <= 0) {
        this.typeList.splice(1, 1)
      }

      if (this.info.accountPeriodDays <= 0) {
        this.typeList.splice(1, 1)
      }
    },
    methods: {
      fomatterPrice(price) {
        return floatTwo(price)
      },
      // 关闭弹框
      closeFn() {
        this.$emit('closeFn')
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
          isCoding: this.selected,
          isInstall: this.installSelected,
          isNew: false,
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
        // if (data === 2) {
        //   this.newSelected = !this.newSelected
        //   if (this.newSelected) {
        //     this.serviceNumber = this.serviceNumber + 1
        //     this.totalPrice = this.decimalSubFn(this.totalPrice, this.info.tradeInFee)
        //   } else {
        //     this.serviceNumber = this.serviceNumber - 1
        //     this.totalPrice = this.decimalAddFn(this.totalPrice, this.info.tradeInFee)
        //   }
        //   return
        // }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .now {
    &-close {
      padding: 24rpx 32rpx 0 32rpx;
      text-align: right;
    }
    &-padding {
      padding: 16rpx 32rpx 24rpx 0;
      margin-left: 32rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid $v-bg-light;
    }

    &-img {
      width: 180rpx;
      height: 180rpx;
      border-radius: 8rpx;
      margin-right: 16rpx;
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
