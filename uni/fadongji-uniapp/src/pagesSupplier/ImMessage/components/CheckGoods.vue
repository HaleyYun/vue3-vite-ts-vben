<template>
  <view
    class="check"
    :class="{
      'wrap-bubble': checkGoodsList.direction === 'from',
      'wrap-bubble__main': checkGoodsList.direction === 'to',
    }"
    @click="check"
  >
    <view
      v-if="checkGoodsList.type == 'order'"
      class="check-head flex flex-vertical-c flex-justify-between"
    >
      <view>订单号:{{ checkGoodsList.content.id || '' }}</view>
      <view>{{ checkGoodsList.content.createTime | timeFilters }}</view>
    </view>
    <view class="check-info flex" v-if="checkGoodsList.content">
      <u--image
        :showLoading="true"
        class="check-info__img"
        width="68px"
        height="68px"
        :src="getImg(checkGoodsList.content.img)"
      >
        <template #loading>
          <u-loading-icon />
        </template>
      </u--image>
      <!--<image  :src="checkGoodsList.img" />-->
      <view class="check-info__right flex1 flex flex-column flex-justify-between">
        <view class="right-top">
          <text v-show="checkGoodsList.content.categoryType" class="good-tips m-r-8">{{checkGoodsList.content.categoryType}}</text>
          <text> {{ checkGoodsList.content.prod_name }}</text>
        </view>
        <view class="right-bottom flex flex-vertical-c">
          <view class="money-tips" v-if="checkGoodsList.content.periodDays"
            >{{ checkGoodsList.content.periodDays }}天账期</view
          >
          <view v-else class="money-tips">现金价</view>
          <VoPointPrice
            class="tag-text first"
            :price="checkGoodsList.content.price"
            :show-unit="true"
            display="inline-block"
          />
          <view v-if="checkGoodsList.type == 'order'" class="order-status">{{
            checkGoodsList.content.status | statusFilters
          }}</view>

          <!--<view class="right-bottom__grey">{{ checkGoodsList.originalPrice }}</view>-->
        </view>
      </view>
    </view>
    <!--businessCode  0：我是卖家   1：我是买家 2：普通聊天-->
    <view class="check-button" v-if="checkGoodsList.direction === 'from'" @click.stop="check"
      >查看</view
    >
    <view class="check-button" v-else @click.stop="toChoose">重新选择</view>
  </view>
</template>
<script>
  export default {
    name: 'CheckGoods',
    filters: {
      statusFilters(val) {
        //1100：创建，1110：待付款，1120：待发货，1130：待收货，1140：已完成，1150：已取消，1160:已关
        let status = ''
        switch (val) {
          case 1110:
            status = '待付款'
            break
          case 1120:
            status = '待发货'
            break
          case 1130:
            status = '待收货'
            break
          case 1140:
            status = '已完成'
            break
          case 1150:
            status = '已取消'
            break
          case 1160:
            status = '已关闭'
            break
        }
        return status
      },
      timeFilters(time) {
        if (time) {
          let date = new Date(time.replace(/-/g, '/'))
          console.log(date,time,"********")
          let m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
          let d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
          return m + '-' + d
        }
      },
    },
    props: {
      /**
       * goodsTitle 商品名称
       * bubbleType 等于left时是左边气泡样式 等于right时是右边气泡样式
       * goodsImage 商品图片
       * price 售价
       * originalPrice 原价
       */
      checkGoodsList: {
        type: Object,
        default() {
          return { content: {} }
        },
      },
    },
    data() {
      return {}
    },

    methods: {
      check() {
        let roomInfo = this.$storage.get('temp_im_room_info')
        if (this.checkGoodsList.type === 'order') {
          //订单跳转到订单详情
          console.log('this.TargetInfo', roomInfo)
          // console.log('this.checkGoodsList.content',this.checkGoodsList.content)
          if (this.userInfo.platformCode === 'supplier') {
            if (roomInfo.platformCode === 'agent') {
              //服务商跳投资订单
              this.$linkToEasy(
                `/pagesSupplier/Order/OrderDetail/InvestDetail?id=${this.checkGoodsList.content.id}`,
              )
            } else {
              //修理厂跳销售订单
              this.$linkToEasy(
                `/pagesSupplier/Order/OrderDetail/OrderDetail?id=${this.checkGoodsList.content.id}`,
              )
            }
            return
          }
          if (this.userInfo.platformCode === 'agent') {
            if (roomInfo.platformCode === 'garage') {
              this.$linkToEasy(
                `/pagesAgent/Order/OrderDetail/OrderDetail?id=${this.checkGoodsList.content.id}`,
              )
            } else {
              this.$linkToEasy(
                `/pagesAgent/Order/OrderDetail/InvestDetail?data=${this.checkGoodsList.content.id}`,
              )
            }
            return
          }
          if (this.userInfo.platformCode === 'garage') {
            this.$linkToEasy(
              `/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=${this.checkGoodsList.content.id}`,
            )
            return
          }


          if (this.userInfo.platformCode === 'oldMachine') {
            this.$linkToEasy(
                `/pagesOldBuyer/MyOrder/MarkerOrderDetail?id=${this.checkGoodsList.content.id}`,
            )
            return
          }

          if (this.userInfo.platformCode === 'recycling') {
            this.$linkToEasy(
                `/pagesRecovery/SellOrder/OrderDetail/OrderDetail?data=${this.checkGoodsList.content.id}`,
            )
            return
          }
        }


        if (this.checkGoodsList.type === 'prod') {
          if (this.userInfo.platformCode === 'oldMachine') {
            this.$linkToEasy(
                `/pagesOldBuyer/HomeJumpPage/GoodsDetails?id=${this.checkGoodsList.content.id}&source=false`,
            )
            return
          }

          if (this.userInfo.platformCode === 'recycling') {
            // 回收公司
            console.log(this.checkGoodsList,"checkGoodsList")
            this.$linkToEasy(
              `/pagesOldBuyer/HomeJumpPage/GoodsDetails?id=${this.checkGoodsList.content.id}&source=false&hideBtn=true`,
            )
            return
          }
        }

        this.$emit('checkClick', this.checkGoodsList)
      },
      toChoose() {
        uni.$emit('toChoose', { type: this.checkGoodsList.type })
      },
      getImg(url) {
        if (this.$vocenApi.Pattern.isVideoUrl(url.toLocaleLowerCase())) {
          return url + '&type=3'
        } else {
          return url + '&type=1'
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .wrap-bubble {
    background: #fff;
    font-size: 28rpx;
    padding: 24rpx;
    border-radius: 10rpx;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -16rpx;
      top: 22rpx;
      border-top: 14rpx solid transparent;
      border-bottom: 14rpx solid transparent;
      border-right: 16rpx solid #fff;
      border-radius: 8rpx;
    }
  }
  .wrap-bubble__main {
    background: #fff;
    color: #ffffff;
    font-size: 28rpx;
    padding: 24rpx;
    border-radius: 10rpx;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      right: -16rpx;
      top: 22rpx;
      border-top: 14rpx solid transparent;
      border-bottom: 14rpx solid transparent;
      border-left: 16rpx solid #fff;
      border-radius: 8rpx;
    }
  }
  .check {
    background: #fff;
    padding: 26rpx 30rpx;
    border-radius: 20rpx;
    max-width: 100%;
    display: inline-block;
    &-head {
      line-height: 1.5;
      padding-bottom: 16rpx;
      width: 100%;
      view:nth-of-type(1) {
        color: rgba(0, 0, 0, 0.85);
        font-size: 28rpx;
        font-weight: 500;
        width: calc(100% - 84rpx);
        margin-right: 10rpx;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        word-break: break-all;
      }
      view:nth-of-type(2) {
        font-weight: 400;
        font-size: 24rpx;
        width: 74rpx;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    &-info {
      &__img {
        width: 136rpx;
        height: 136rpx;
      }
      &__right {
        margin-left: 16rpx;
        .right-top {
          line-height: 42rpx;
          font-size: 28rpx;
          color: #000;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          /* 这里是超出几行省略 */
          -webkit-line-clamp: 2;
          overflow: hidden;
          word-break: break-all;
          text-align: left;
        }
        .right-bottom {
          .money-tips {
            height: 28rpx;
            line-height: 28rpx;
            font-size: 24rpx;
            color: $color-clicked-red;
            padding: 2rpx 4rpx;
            border: 2rpx solid $color-clicked-red;
            background: $color-disabled-red;
            border-radius: 4rpx;
            margin-right: 8rpx;
          }
          &__price {
            font-size: 28rpx;
            line-height: 150%;
            color: $color-primary-red;
            //color: $v-btn-disabled;
          }
          &__grey {
            font-size: 24rpx;
            color: $v-c0-15;
            text-decoration: line-through;
          }
          .order-status {
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.85);
            margin-left: 20rpx;
          }
        }
      }
    }
    &-button {
      width: 128rpx;
      height: 48rpx;
      line-height: 48rpx;
      background: $color-primary-yellow;
      border-radius: 30rpx;
      text-align: center;
      color: #ffffff;
      font-size: 26rpx;
      margin-top: 20rpx;
      margin-left: auto;
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
</style>
