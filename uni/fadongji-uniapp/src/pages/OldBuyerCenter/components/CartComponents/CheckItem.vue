<template>
  <view class="checkItem">
    <!--  失效  -->

    <view v-if="isExpired">
      <FailureGoodItem :good-data="cardList" @clear="clearFailGoods()" />
    </view>
    <block v-else>
      <view v-for="(orderData, orderDataIndex) of cardList" :key="orderDataIndex">
        <view class="checkItem-store flex m-l-16 m-r-32 p-t-24">
          <VoIcon
            v-if="orderData.selectEd"
            :size="24"
            color="#FF5319"
            name="select-right"
            @click="selectBizFn(false, orderDataIndex)"
          />
          <VoIcon
            v-else
            :size="24"
            name="address_select"
            @click="selectBizFn(true, orderDataIndex)"
          />

          <view>
            <!--          <view class="flex flex-vertical-c" @click="goImUrl(orderData)">-->
            <!--            <VoIcon :size="20" class="m-l-10" name="smile-s" />-->
            <view class="m-l-6 fz-28 overflow-ellipsis"> {{ orderData.shopName }} </view>
            <view class="m-l-6 fz-24 m-t-10 color-block-45">
              {{ orderData.warehouseAddress || '测试发货地点' }}
              <text class="m-l-16"
                >预计<text class="color-red"> {{ orderData.arrivalTime || '测试时间' }} </text
                >送达</text
              >
            </view>
          </view>
        </view>

        <view class="goodItem">
          <view
            v-if="orderData.resaleGoodsList && orderData.resaleGoodsList.length"
            class="goodItem-goods"
          >
            <view class="flex flex-vertical-c" />
            <view
              v-for="(good, goodIndex) in orderData.resaleGoodsList"
              :key="goodIndex"
              class="good-item"
            >
              <view class="flex flex-justify-between m-t-24">
                <view class="flex flex-vertical-c">
                  <VoIcon
                    v-if="good.selectEd"
                    :size="24"
                    color="#FF5319"
                    name="select-right"
                    @click="selectGoodFn(false, orderDataIndex, goodIndex)"
                  />
                  <VoIcon
                    v-else
                    :size="24"
                    name="address_select"
                    @click="selectGoodFn(true, orderDataIndex, goodIndex)"
                  />
                  <view class="goodItem-goods__imgBox m-l-8" @click="goGoodsDetails(good)">
                    <block v-if="good.picture">
                      <block v-if="good.picture[0].split('.').pop() === 'mp4'">
                        <image :src="`${good.picture}&type=3`" class="goods-img" />
                      </block>
                      <image v-else :src="good.picture[0] + '&type=1'" class="goods-img" />
                      <text v-show="good.isPreSale" class="goods-sign">预售</text>
                    </block>
                  </view>
                </view>
                <view class="flex1 m-l-16">
                  <view class="fz-b fz-32 overTwoEllipsis lh48 h96" @click="goGoodsDetails(good)">
                    <text class="type-sign">{{ good.level }}类</text>
                    <text>{{ good.resaleGoodsName }}</text>
                  </view>
                  <view class="flex">
                    <view class="goodItem-goods__postage">{{
                      Number(good.shippingType) === 1 ? '包邮' : '到付'
                    }}</view>
                  </view>
                </view>
              </view>
              <!--有库存情况下-->
              <view v-if="good.resaleGoodsNum !== '0'">
                <view class="goodItem-goods__price flex flex-justify-between flex-vertical-c">
                  <view class="flex">
                    <view class="flex">
                      <view class="price">现金</view>
                    </view>
                    <view class="color-red fz-24 flex m-l-8 flex-vertical-c">
                      <VoPointPrice :price="good.cashPrice" :show-unit="true" />
                    </view>
                  </view>
                  <view class="flex">
                    <u-number-box
                      v-model="good.resaleGoodsNum"
                      :max="good.isPreSale ? +good.count : +good.warehouseGoodsNum"
                      :min="+good.minOrderNumber || 1"
                      bgColor="#fff"
                      button-size="20"
                      iconStyle="background:#f6f7f8;padding:8rpx"
                      integer
                      @change="changeCount($event, good)"
                      @overlimit="overLimit"
                    >
                      <!-- <text slot="input" class="input">{{good.count}}</text> -->
                    </u-number-box>
                  </view>
                </view>
                <block v-if="good.isPreSale">
                  <view v-if="+good.count === 1" class="fz-24 flex flex-justify-r m-t-10 color-red">
                    库存紧张
                  </view>
                </block>
                <block v-else>
                  <view
                    v-if="+good.warehouseGoodsNum === 1"
                    class="fz-24 flex flex-justify-r m-t-10 color-red"
                  >
                    库存紧张
                  </view>
                </block>
                <!--                <view v-else>-->
                <!--                  <view-->
                <!--                    v-if="good.minOrderNumber"-->
                <!--                    class="fz-24 flex flex-justify-r m-t-10 color-red"-->
                <!--                    >{{ good.minOrderNumber }}件起批</view-->
                <!--                  >-->
                <!--                </view>-->
              </view>
              <!--无库存情况下-->
              <view v-else class="goodItem-goods__null">
                <view class="flex flex-justify-between flex-vertical-c">
                  <view class="fz-26 color-red">商品在该地区暂不支持购买</view>
                  <view class="btn flex" @click.stop="toSame(good)">找相似</view>
                </view>
              </view>
              <!--        <view v-show="index !== goodData.goodList.length - 1" class="goodItem-goods__line" />-->
            </view>
          </view>
          <view class="goodItem-topLine" />
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  import FailureGoodItem from './FailureGoodItem'
  import { decimalAddFn, decimalMulFn } from '@/common/helper'

  export default {
    name: 'CheckItem',
    components: {
      FailureGoodItem,
    },
    props: {
      isExpired: {
        type: Boolean,
        default: false,
      },
      cardList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        formData: {},
      }
    },
    methods: {
      /**
       * 步进器超过范围阈值时触发
       * @param e
       */
      overLimit(e) {
        console.log(e)
        if (e === 'plus') {
          this.$u.toast('库存不足')
        }
      },
      /**
       * 去商品详情页
       */
      goGoodsDetails(good) {
        if (!good.isPreSale) {
          this.$linkToEasy(
            '/pagesOldBuyer/HomeJumpPage/GoodsDetails?id=' + good.resaleGoodsId + '&source=false',
          )
          return
        }
        this.$linkToEasy(
          '/pagesOldBuyer/HomeJumpPage/GoodsDetails?id=' + good.resaleGoodsId + '&source=true',
        )
      },
      goImUrl(item) {
        const info = {
          targetId: item.shopUserId,
          type: 0,
          note: item.shopName,
          platformCode: item.platformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      toSame(good) {
        //相似项目
        this.$linkToEasy(
          '/pagesAgent/InvestmentList/InvestmentSimilarOrder?goodsNames=' +
            JSON.stringify(good.goodsNames),
        )
      },
      //清空失效商品之后，失效数据置空
      clearFailGoods() {
        this.$emit('clearFailGoods')
      },
      /**
       * @description 选择某个商品
       */
      selectGoodFn(boo, bizIndex, goodIndex) {
        this.cardList[bizIndex].resaleGoodsList[goodIndex].selectEd = boo
        this.totalCalculateFn()
        this.$forceUpdate()
      },
      /**
       * @description 选择仓库的全选中
       */
      selectWareFn(boo, bizIndex) {
        this.cardList[bizIndex].selectEd = boo
        this.cardList[bizIndex].resaleGoodsList.map((good) => {
          good.selectEd = boo
        })
        this.totalCalculateFn()
        this.$forceUpdate()
      },
      /**
       * 选择商户下的全部商品
       * @param boo
       */
      selectBizFn(boo, index) {
        console.log(boo, index, 'selectBizFn')
        console.log(this.cardList)
        this.cardList[index].selectEd = boo
        this.cardList[index].resaleGoodsList.map((good) => {
          good.selectEd = boo
        })
        this.totalCalculateFn()
        this.$forceUpdate()
      },
      /**
       * 选择全部商户
       */
      /**
       * 选择商户下的全部商品
       * @param boo
       */
      selectAllBizFn(bool) {
        console.log(bool, 'selectAllBizFn')
        console.log(this.cardList)
        this.cardList.forEach((item) => {
          item.selected = bool
          if (item.resaleGoodsList) {
            item.resaleGoodsList.forEach((good) => {
              good.selectEd = bool
            })
          }
        })
        this.totalCalculateFn()
        this.$forceUpdate()
      },
      /**
       * @description 全选
       */
      selectAllFn(boo) {
        console.log('1111111', this.cardList)
        if (this.cardList) {
          this.cardList.map((plat) => {
            plat.selectEd = boo
            if (plat.resaleGoodsList && plat.resaleGoodsList.length > 0) {
              plat.resaleGoodsList.map((good) => {
                good.selectEd = boo
              })
            }
          })
        }
        this.totalCalculateFn()
        this.$forceUpdate()
      },
      changeCount(e, good) {
        console.log(good)
        let param = {
          goodsNum: e.value,
          id: good.id,
        }
        this.carGoodCarEditNumberRequest(param)
      },
      /**
       * 计算价格
       */
      totalCalculateFn() {
        let totalPrice = 0 //合计
        let totalKind = 0 //几种商品
        let goodSelectNum = 0
        let totalNum = 0 //几件商品
        let cashPrice = 0 //现金金额
        let selectId = [] //选择的商品id
        // 遍历开始
        let totalGood = 0
        let totalSelectGood = 0

        this.cardList.map((item) => {
          if (item.resaleGoodsList) {
            item.resaleGoodsList.map((good) => {
              totalGood++
              if (good.selectEd) {
                selectId.push(good.id)
                goodSelectNum++
                totalSelectGood++
                totalKind++
                totalNum += good.resaleGoodsNum || 0
                //现金
                console.log(good)
                cashPrice = decimalAddFn(
                  cashPrice,
                  decimalMulFn(good.cashPrice || 0, good.resaleGoodsNum || 0),
                )
              }
            })
          }
          if (item.resaleGoodsList && goodSelectNum === item.resaleGoodsList.length) {
            item.selectEd = true
          } else {
            item.selectEd = false
          }
        })
        // 判读商家按钮选中
        this.cardList.map((item) => {
          let selectWareNum = 0
          if (item.resaleGoodsList) {
            item.resaleGoodsList.map((it) => {
              it.selectEd ? selectWareNum++ : ''
            })
            selectWareNum === item.resaleGoodsList.length
              ? (item.selectEd = true)
              : (item.selectEd = false)
          }
        })
        //遍历结束
        this.$emit('updateFn', {
          totalPrice: cashPrice,
          totalKind,
          totalNum,
          cashPrice,
          isAllSelect: totalGood === totalSelectGood, // 是否全选
          selectId,
        })
      },
      //购物车修改数量
      async carGoodCarEditNumberRequest(param) {
        try {
          let res = await this.$VoHttp.apiCartResaleUpdateGoodscount(param)
          if (res.success) {
            this.$forceUpdate()
            setTimeout(() => {
              this.totalCalculateFn()
            }, 100)
          }
        } catch (err) {
          this.$u.toast(err.message)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .checkItem {
    background-color: #ffffff;
    width: 750rpx;
  }

  .goodItem {
    &-topLine {
      margin-left: 32rpx;
      height: 2rpx;
      background-color: $v-bg-light;
    }
    &-goods {
      padding: 24rpx 32rpx 24rpx 16rpx;
      &__imgBox {
        position: relative;
        background: transparent;
        border-radius: 8rpx;
        width: 128rpx;
        height: 128rpx;
        flex-shrink: 0;
        overflow: hidden;
        margin-right: 16rpx;
      }
      .goods-img {
        position: absolute;
        left: 0;
        top: 0;
        width: 128rpx;
        height: 128rpx;
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
      .type-sign {
        font-size: 24rpx;
        font-weight: 400;
        color: #ff5319;
        background: #ffece5;
        border-radius: 8rpx;
        padding: 4rpx 16rpx;
        margin-right: 8rpx;
      }
      &__postage {
        margin-top: 8rpx;
        background-color: $v-bg-light;
        padding: 4rpx 16rpx;
        color: $v-c0-85;
        font-size: 24rpx;
        border-radius: 8rpx;
      }
      &__price {
        margin-left: 216rpx;
        margin-top: 20rpx;
        .price {
          padding: 0rpx 4rpx;
          background-color: $color-disabled-red;
          color: $color-clicked-red;
          font-size: 24rpx;
          border-radius: 4rpx;
          border: 2rpx solid $color-clicked-red;
        }
        .input {
          width: 76rpx;
          text-align: center;
          font-size: 28rpx;
        }
      }
      &__null {
        margin-left: 216rpx;
        margin-top: 20rpx;
        .btn {
          border: 2rpx solid $color-primary-yellow;
          border-radius: 24rpx;
          padding: 4rpx 32rpx;
          color: $color-primary-yellow;
          font-size: 24rpx;
        }
      }
      &__line {
        margin-left: 72rpx;
        height: 2rpx;
        margin-top: 24rpx;
        background-color: $v-bg-light;
      }
    }
  }
</style>
