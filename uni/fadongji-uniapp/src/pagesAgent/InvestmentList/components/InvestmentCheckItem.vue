<template>
  <view class="checkItem">
    <!--  失效  -->

    <view v-if="isExpired">
      <InvestFailureGoodItem :good-data="cardList" @clear="clearFailGoods()" />
    </view>
    <block v-else>
      <view v-for="(orderData, orderDataIndex) of cardList" :key="orderDataIndex">
        <view class="checkItem-store flex flex-vertical-c m-l-16 m-r-32">
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

          <view class="flex flex-vertical-c" @click="goImUrl(orderData)">
            <VoIcon :size="20" class="m-l-10" name="smile-m" />
            <view class="m-l-4 fz-28 fz-b color-block-85"> {{ orderData.shopName }}</view>
            <VoIcon :size="16" name="right-arrow" />
          </view>
        </view>

        <view
          v-for="(bizData, bizIndex) in orderData.cartWarehouseList"
          :key="bizIndex"
          class="goodItem"
        >
          <view class="goodItem-topLine" />
          <view class="goodItem-goods">
            <view class="flex flex-vertical-c">
              <VoIcon
                v-if="bizData.selectEd"
                :size="24"
                color="#FF5319"
                name="select-right"
                @click="selectWareFn(false, orderDataIndex, bizIndex)"
              />
              <VoIcon
                v-else
                :size="24"
                name="address_select"
                @click="selectWareFn(true, orderDataIndex, bizIndex)"
              />
              <view class="m-l-16 fz-28 fz-b">
                {{ bizData.cityName || bizData.warehouseName }}
              </view>
              <!--              <view class="m-l-16 fz-24 color-block-45"-->
              <!--                >预计-->
              <!--                <text class="color-red"> {{ bizData.arrivalTime }}</text>-->
              <!--                送达-->
              <!--              </view>-->
            </view>
            <view
              v-for="(good, goodIndex) in bizData.cartDetailstList"
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
                    @click="selectGoodFn(false, orderDataIndex, bizIndex, goodIndex)"
                  />
                  <VoIcon
                    v-else
                    :size="24"
                    name="address_select"
                    @click="selectGoodFn(true, orderDataIndex, bizIndex, goodIndex)"
                  />
                  <view class="goodItem-goods__view relative m-l-8">
                    <image
                      v-if="good.pricture && good.pricture.length"
                      :src="
                        good.pricture[0] +
                        (good.pricture[0].indexOf('.mp4') > -1 ||
                        good.pricture[0].indexOf('.MP4') > -1
                          ? '&type=3'
                          : '&type=1')
                      "
                      class="goodItem-goods__image"
                      @click="goDetail(good)"
                    />
                    <view
                      v-if="good.status === 2 || good.status === 3 || good.status === 4"
                      class="goodItem-goods__mask m-l-8"
                      >{{ getStatus(good) }}
                    </view>
                  </view>
                </view>
                <view class="flex1 m-l-16" @click="goDetail(good)">
                  <view class="fz-32 overTwoEllipsis lh48 h96">
                    <text v-show="good.categoryType" class="good-tips m-r-8">
                      {{ good.categoryType }}
                    </text>
                    <text class="fz-b">{{ good.goodsName }}</text>
                    <text class="color-block-yellow p-l-20 fz-b">
                      {{ good.remainingAvailable }}台
                    </text>
                  </view>
                  <view class="flex">
                    <view class="goodItem-goods__postage"
                      >{{ Number(good.shippingType) === 1 ? '包邮' : '到付' }}
                    </view>
                  </view>
                </view>
              </view>
              <!--有库存情况下-->
              <view v-if="good.investmentNum !== '0'">
                <view class="goodItem-goods__price flex flex-justify-between flex-vertical-c">
                  <view class="flex">
                    <view class="flex">
                      <view class="price"
                        >{{
                          Number(good.isCash) === 1 ? '现金价' : `${good.accountPeriodTime}天账期`
                        }}
                      </view>
                    </view>
                    <view class="color-red fz-24 flex m-l-8 flex-vertical-c">
                      <VoPointPrice
                        :price="Number(good.isCash) === 1 ? good.cashPrice : good.accountPrice"
                        :show-unit="true"
                      />
                    </view>
                  </view>
                  <view class="flex">
                    <u-number-box
                      v-model="good.investmentNum"
                      :max="
                        good.investmentLimit > good.remainingAvailable
                          ? good.remainingAvailable
                          : good.investmentLimit
                      "
                      :min="good.minOrderNumber"
                      button-size="20"
                      integer
                      @blur="blurCount($event, good, orderDataIndex, bizIndex, goodIndex)"
                      @change="changeCount($event, good)"
                    >
                      <!-- <text slot="input" class="input">{{good.investmentNum}}</text> -->
                    </u-number-box>
                  </view>
                </view>
                <view
                  v-if="+good.investmentNum > good.remainingAvailable"
                  class="fz-24 flex flex-justify-r m-t-10 color-red"
                >
                  库存不足
                </view>
                <view class="fz-24 flex flex-justify-r m-t-10 color-red">
                  {{ good.minOrderNumber }}件起批
                </view>
                <view
                  v-if="good.remainingAvailable < good.minOrderNumber"
                  class="fz-24 flex flex-justify-r m-t-10 color-red"
                >
                  项目剩余可投量不足
                </view>
                <view
                  v-if="+good.investmentNum > good.investmentLimit"
                  class="fz-24 flex flex-justify-r m-t-10 color-red"
                  >超过限投量，您已投{{ +good.investmentNum }}，项目限投{{
                    good.investmentLimit
                  }}</view
                >
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
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  import InvestFailureGoodItem from './InvestFailureGoodItem'
  import {decimalAddFn, decimalMulFn, error, getStoreImUserIdFn} from '@/common/helper'

  export default {
    name: 'InvestmentCheckItem',
    components: {
      InvestFailureGoodItem,
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
      getStatus(info) {
        switch (info.status) {
          case 1: {
            return '已上架'
          }
          case 2: {
            return '待审核'
          }
          case 3: {
            return '审核未通过'
          }
          case 4: {
            return '已下架'
          }
          case 5: {
            return '已完成'
          }
          default: {
            return ''
          }
        }
      },
      getViolationStatus(info) {
        switch (info.violationStatus) {
          case 1: {
            return '已违规'
          }
          case 2: {
            return '违规项目'
          }
          case 3: {
            return '未违规'
          }
        }
      },
      goDetail(good) {
        this.$linkToEasy(
          '/pagesAgent/InvestmentList/ProjectDetails?queryType=L&id=' + good.investmentId,
        )
      },
      goImUrl(item) {
        getStoreImUserIdFn({
          companyId:item.shopId
        }).then(res=>{
          const info = {
            targetId: res,
            type: 0,
            note: item.shopName,
            platformCode: item.platformCode,
          }
          this.$storage.set('temp_im_room_info', info)
          this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
        }).catch(e=>{

          error(e.message||"未找到店铺客服")
        })

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
      selectGoodFn(boo, bizIndex, wareIndex, goodIndex) {
        this.cardList[bizIndex].cartWarehouseList[wareIndex].cartDetailstList[goodIndex].selectEd =
          boo
        this.totalCalculateFn()
        this.$forceUpdate()
      },
      /**
       * @description 选择仓库的全选中
       */
      selectWareFn(boo, bizIndex, wareIndex) {
        this.cardList[bizIndex].cartWarehouseList[wareIndex].selectEd = boo
        this.cardList[bizIndex].cartWarehouseList[wareIndex].cartDetailstList.map((good) => {
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
        this.cardList[index].selectEd = boo
        this.cardList[index].cartWarehouseList.map((item) => {
          item.selectEd = boo
          item.cartDetailstList.map((good) => {
            good.selectEd = boo
          })
        })
        this.totalCalculateFn()
        this.$forceUpdate()
      },
      /**
       * @description 全选
       */
      selectAllFn(boo) {
        console.log(this.cardList, '===========')
        this.cardList.map((plat) => {
          plat.selectEd = boo
          plat.cartWarehouseList.map((item) => {
            item.selectEd = boo
            item.cartDetailstList.map((good) => {
              good.selectEd = boo
            })
          })
        })
        this.totalCalculateFn()
        this.$forceUpdate()
      },
      blurCount(e, item, index, bizIndex, goodIndex) {
        let param = {
          id: item.id,
          goodsNum: e.value || item.minOrderNumber,
        }

        this.$VoHttp
          .apiCartBasisUpdateGoodscount(param)
          .then((res) => {
            item.investmentNum = e.value || item.minOrderNumber
            uni.$u.toast('操作成功')
          })
          .catch((e) => {
            uni.$u.toast(e.message || '添加失败')
          })
        if (!item.investmentNum) {
          item.investmentNum = 0
        }

        if (e.value == '') {
          setTimeout(() => {
            this.cardList[index].cartWarehouseList[bizIndex].cartDetailstList[
              goodIndex
            ].investmentNum = 0
            this.cardList[index].cartWarehouseList[bizIndex].cartDetailstList[
              goodIndex
            ].investmentNum = item.minOrderNumber
          }, 100)
        }
        this.$forceUpdate()
        setTimeout(() => {
          this.totalCalculateFn()
        }, 100)
      },
      changeCount(e, item) {
        console.log('item.remainingAvailable', item.remainingAvailable, e.value)
        if (e.value - item.investmentNum == 1 || item.investmentNum - e.value == 1) {
          let param = {
            id: item.id,
            goodsNum: e.value,
          }
          this.$VoHttp
            .apiCartBasisUpdateGoodscount(param)
            .then((res) => {
              // uni.$u.toast('操作成功')
              //加数量
              if (e.value === item.remainingAvailable) {
                this.$u.toast('已到达最大订购量')
              }
            })
            .catch((e) => {
              uni.$u.toast(e.message || '添加失败')
            })
        }
        if (!item.investmentNum) {
          item.investmentNum = 0
        }
        this.$forceUpdate()
        setTimeout(() => {
          this.totalCalculateFn()
        }, 100)
      },
      /**
       * 计算价格
       */
      totalCalculateFn() {
        let totalPrice = 0 //合计
        let totalKind = 0 //几种商品
        let totalNum = 0 //几件商品
        let paymentPrice = 0 // 账期金额
        let cashPrice = 0 //现金金额
        let selectId = [] //选择的商品id
        // 遍历开始
        let totalGood = 0
        let totalSelectGood = 0
        this.cardList.map((item) => {
          item.cartWarehouseList.map((it) => {
            let goodSelectNum = 0
            it.cartDetailstList.map((good) => {
              totalGood++
              if (good.selectEd) {
                console.log(good)
                selectId.push(good.id)
                goodSelectNum++
                totalSelectGood++
                totalKind++
                totalNum = decimalAddFn(totalNum, good.investmentNum)

                if (good.isCash) {
                  //现金
                  cashPrice = decimalAddFn(
                    cashPrice,
                    decimalMulFn(good.cashPrice, good.investmentNum),
                  )
                } else {
                  //账期
                  paymentPrice = decimalAddFn(
                    paymentPrice,
                    decimalMulFn(good.accountPrice, good.investmentNum),
                  )
                }
              }
            })
            if (goodSelectNum === it.cartDetailstList.length) {
              it.selectEd = true
            } else {
              it.selectEd = false
            }
          })
          this.$forceUpdate()
        })
        // 判读商家按钮选中
        this.cardList.map((item) => {
          let selectWareNum = 0
          item.cartWarehouseList.map((it) => {
            it.selectEd ? selectWareNum++ : ''
          })
          selectWareNum === item.cartWarehouseList.length
            ? (item.selectEd = true)
            : (item.selectEd = false)
        })

        //遍历结束
        this.$emit('updateFn', {
          totalPrice: decimalAddFn(paymentPrice, cashPrice),
          totalKind,
          totalNum,
          paymentPrice,
          cashPrice,
          isAllSelect: totalGood === totalSelectGood, // 是否全选
          selectId,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .checkItem {
    background-color: #ffffff;
    width: 750rpx;

    &-store {
      height: 88rpx;
      line-height: 88rpx;
    }
  }

  .goodItem {
    &-topLine {
      margin-left: 32rpx;
      height: 2rpx;
      background-color: $v-bg-light;
    }

    &-goods {
      padding: 24rpx 32rpx 24rpx 16rpx;

      &__view {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
      }

      &__image {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
      }

      &__mask {
        left: 0;
        top: 0;
        position: absolute;
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
        background: rgba(0, 0, 0, 0.65);
        color: #fff;
        font-size: 28rpx;
        line-height: 128rpx;
        align-items: center;
        text-align: center;
        font-weight: bold;
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
        margin-left: 200rpx;
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
  .good-tips {
    line-height: 36rpx;
    font-size: 24rpx;
    color: #fff;
    padding: 2rpx 12rpx;
    background: #ff5319;
    border-radius: 24rpx;
  }
</style>
