<template>
  <u-popup v-if="show" :round="10" :show="show" class="buy" closeable mode="bottom" @close="close">
    <view class="buy-top">
      <view class="flex">
        <view class="relative">
          <block v-if="goodData && goodData.picture">
            <image
              v-if="goodData.picture.split('.').pop() === 'mp4'"
              :src="`${goodData.picture}&type=3`"
              class="goods-list__img"
            />
            <image v-else :src="goodData.picture + '&type=1'" class="goods-list__img" />
          </block>
          <text v-if="+current === 1" class="goods-sign">预售</text>
        </view>
        <view class="flex1">
          <view class="buy-top__name">
            <text class="goods-list__type">{{ goodData.level }}类</text>
            {{ goodData.name }}</view
          >
          <view class="flex m-t-10 flex-vertical-c color-block-85 text-24">
             {{ goodData.model }}
          </view>
          <view class="m-t-8 flex flex-vertical-c">
            <view class="buy-top__cash">现金</view>
            <VoPointPrice
              :leftSize="14"
              :price="goodData.price"
              :showUnit="true"
              class="lh42"
              color="#E50012"
            />
          </view>
        </view>
      </view>
      <view class="lh42 m-t-42 flex flex-justify-between">
        <view>
          <view class="fz-b fz-28">购买数量</view>
          <view class="m-t-8 lh36 fz-24 color-red">1件起批</view>
        </view>
        <view class="text-right">
          <u-number-box
            v-model="datas.num"
            :max="
              (goodData.inventory || goodData.margin) <= 200
                ? goodData.inventory || goodData.margin
                : 200
            "
            button-size="20"
            integer
            @change="changeCount"
            @overlimit="overLimit"
          >
            <!-- <text slot="input" class="input">{{good.investmentNum}}</text> -->
          </u-number-box>
          <view class="m-t-10 lh36 fz-24 color-block-65"
            >可用库存：{{ isPress ? goodData.margin : goodData.inventory }}</view
          >
          <view v-if="goodData.inventory < 1" class="lh36 m-t-6 fz-24 color-red">
            {{ isPress ? '预售商品' : '商品' }} 库存不足</view
          >
          <view v-else class="lh36 m-t-6 fz-24 color-red">
            {{
              goodData.orderNumber && goodData.orderNumber > 0
                ? `${goodData.orderNumber}个库存锁定中`
                : ''
            }}</view
          >
        </view>
      </view>
    </view>
    <view class="flex flex-justify-r flex-vertical-c m-r-32 p-t-24 p-b-24">
      <view class="fz-24">共{{ datas.num }}台</view>
      <view class="lh48 fz-28 m-l-8">商品金额：</view>
      <VoPointPrice
        :leftSize="14"
        :price="datas.sum"
        :showUnit="true"
        class="lh42"
        color="#E50012"
      />
    </view>
    <view class="buy-bottom">
      <view
        v-if="isPress ? goodData.margin : goodData.inventory"
        class="buy-bottom__button"
        @click="confirmClick"
        >确定</view
      >
      <view v-else class="buy-bottom__button1" @click="notEnough">确定</view>
<!--      <view v-if="systemInfo.osName == 'ios' && showHight" class="heightBox" />-->
      <vo-safety-area :is-fixed="false" />
    </view>
  </u-popup>
</template>

<script>
  import { decimalMulFn } from '@/common/helper'

  export default {
    name: 'ButNow',
    props: {
      current: {
        type: Number,
        default: 0, // 0:商品 1：预售
      },
      showHight: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        show: false,
        //type 1.加入购物车 2.立即购买
        carType: 0,
        //isPress true.是 false.否
        isPress: false,
        isDeatail: false,
        goodData: {
          picture: [],
        },
        picture: '',
        datas: {
          num: 1,
          sum: '',
        },
        systemInfo: {},
      }
    },
    created() {
      this.systemInfo = this.$systemInfo
      console.log(this.systemInfo)
    },
    methods: {
      notEnough() {
        this.$u.toast('库存不足')
      },
      /**
       * 步进器超过范围阈值时触发
       * @param e
       */
      overLimit(e) {
        console.log(e)
        if (e === 'plus') {
          if ((this.goodData.inventory || this.goodData.margin) > 200) {
            this.$u.toast('单个商品的数量最多加购200个')
          } else {
            this.$u.toast('不可超过商品库存')
          }
        }
      },
      close() {
        this.show = false
        this.$emit('hide', false)
      },
      showClick(good, carType, isPress, isDeatail) {
        this.show = true
        this.$emit('hide', true)
        this.isDeatail = isDeatail
        this.carType = carType
        this.goodData = good
        this.datas.sum = this.goodData.price
        this.isPress = isPress
        this.datas.num = 1
        this.changeCount()
      },
      changeCount() {
        this.$forceUpdate()
        setTimeout(() => {
          this.datas.sum = decimalMulFn(this.goodData.price, this.datas.num)
        }, 100)
      },
      //carType 1.加入购物车 2.立即下单
      confirmClick() {
        console.log('1111111')
        if (this.carType === 1) {
          let param = {
            shopId: this.goodData.shopId,
            resaleGoodsId: this.goodData.id,
            resaleGoodsNum: this.datas.num,
            warehouseId: this.goodData.warehouseId,
          }
          this.addGoodCarRequest(param)
          return
        }
        //立即下单
        if (this.carType === 2) {
          // 存储商品信息，并带到提交订单页面
          // 组装需要的数据
          let orderProductInfo = [
            {
              shopId: this.goodData.shopId || this.userInfo.id,
              shopName: this.goodData.shopName,
              cartWarehouseList: [
                {
                  warehouseName: this.goodData.shopName,
                  warehouseId: this.goodData.warehouseId,
                  arrivalTime: this.goodData.arrivalTime,
                  deliveryAreaName: this.goodData.deliveryAreaName,
                  cartDetailstList: [
                    {
                      ...this.goodData,
                      businessId: this.isPress ? this.goodData.businessId : '',
                      goodsCount: this.datas.num,
                      isCash: true,
                      isPress: this.isPress,
                    },
                  ],
                },
              ],
            },
          ]
          this.$storage.set('OrderPayInfoOldBuyer', orderProductInfo)
          this.$linkToEasy('/pagesOldBuyer/CartModule/SubmitOrders?isCartInit=false')
          return
        }
      },
      //加入购物车接口
      async addGoodCarRequest(param) {
        try {
          this.close()

          let res = await this.$VoHttp.apiCartResaleSave(param)
          if (res.success) {
            this.close()
            this.$u.toast('加入购物车成功')
            this.$emit('addCarSuccess')
          }
        } catch (err) {
          this.$u.toast(err.message)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .buy {
    width: 750rpx;
    background: #fff;
    overflow-x: hidden;
    .heightBox {
      height: 140rpx;
    }
    &-top {
      padding: 40rpx 32rpx 24rpx;
      border-bottom: 2rpx solid $v-bg-light;

      &__name {
        width: 466rpx;
        line-height: 42rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: $v-c0-85;
      }
      &__cash {
        height: 28rpx;
        line-height: 28rpx;
        color: #ec404d;
        font-size: 24rpx;
        padding: 2rpx 4rpx;
        background: #fdf2f3;
        border: 2rpx solid #ec404d;
        border-radius: 4rpx;
        margin-right: 8rpx;
      }
    }
    &-bottom {
      position: relative;
      padding: 20rpx 46rpx;
      box-sizing: border-box;
      z-index: 99;
      &__button {
        background: #ff5319;
        border-radius: 48rpx;
        padding: 16rpx 0;
        text-align: center;
        color: #ffffff;
        font-size: 32rpx;
      }
      &__button1 {
        border-radius: 48rpx;
        border: 2rpx solid #f5f6f8;
        color: #999999;
        padding: 16rpx 0;
        text-align: center;
        font-size: 32rpx;
      }
    }
  }
  .goods-list__type {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: #ff5319;
    padding: 0 12rpx;
    background: #ffece5;
    border-radius: 8rpx;
    margin-bottom: 6rpx;
    margin-right: 8rpx;
  }
  .goods-list__img {
    width: 128rpx;
    height: 128rpx;
    margin-right: 16rpx;
  }
  .goods-sign {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: #e50012;
    font-size: 24rpx;
    color: #fff;
    width: 80rpx;
    height: 36rpx;
    line-height: 36rpx;
    border-radius: 8rpx 0 16rpx;
    text-align: center;
  }
</style>
