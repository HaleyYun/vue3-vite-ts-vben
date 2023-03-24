<template>
  <view class="popup">
    <view class="popup-info flex relative">
      <image :src="info.pic + '&type=1'" class="popup-info__img" />
      <view class="popup-info__right m-l-16 fz-28">
        <view class="lh42 fz-b">
          <text v-show="info.categoryType" class="good-tips m-r-8">{{ info.categoryType }}</text>
          <text>
            {{ info.goodsName }}
            <text class="color-block-yellow p-l-20">{{ info.remainingAvailable || 0 }}台</text>
          </text>
        </view>
        <view v-if="isMySelfGoods" class="m-t-8 lh42"
          >我的库存：
          <text class="fz-b color-block-yellow">{{ info.myWarehouseNum || 0 }}</text>
        </view>
      </view>
      <VoIcon :size="20" class="pop-close" name="close" @click="$emit('closeFn')" />
    </view>
    <view class="popup-way">
      <view class="fz-b fz-28 color-block lh42">付款方式</view>
      <view class="flex m-t-16">
        <!--    选中    -->
        <!-- <view class="popup-way__public selected">现金支付 {{ info.cashPrice }}.00元</view> -->
        <!--    未选中    -->
        <block v-for="item in typeList" :key="item.value">
          <view
            v-if="item.value === 1 && info.cashPrice > 0"
            :class="item.choosed ? 'selected' : 'no-selected'"
            class="popup-way__public m-l-24"
            @click="chooseType(item)"
          >
            <text>现金支付 {{ info.cashPrice }}元</text>
          </view>
          <view
            v-if="item.value === 0 && info.accountPrice && info.accountPeriodDays"
            :class="item.choosed ? 'selected' : 'no-selected'"
            class="popup-way__public m-l-24"
            @click="chooseType(item)"
          >
            <text>{{ info.accountPeriodDays }}天账期 {{ info.accountPrice }}元</text>
          </view>
        </block>
      </view>
    </view>
    <u-line class="popup-line" color="#F7F7F8" />
    <view class="popup-way">
      <view class="flex flex-justify-between">
        <view>
          <view class="fz-b fz-28 color-block lh42">购买数量</view>
          <view class="fz-24 color-red lh36 m-t-8">{{ info.startNumber }}件起批</view>
        </view>
        <view class="popup-way__right">
          <view>
            <!-- 已投量到达限投量时禁用 -->
            <u-number-box
                :disabled="(info.investmentLimit-info.myAlreadyInvestedNum)<info.startNumber"
              v-model="numberValue"
              :max="maxNum"
              :min="info.startNumber"
              button-size="20"
              integer
              @change="valChange"
            >
              <!-- <input slot="input" type="number" class="popup-way__input" v-model="numberValue" /> -->
            </u-number-box>
          </view>
          <!-- <view v-if="isMySelfGoods" class="fz-24 color-block-65 lh36 m-t-10"
          >可用库存：{{ info.warehouseNum || 0 }}</view
          > -->
          <view v-if="info.orderNumber" class="fz-24 color-red lh36 m-t-8">
            {{ info.orderNumber }}个库存锁定中
          </view>
          <!-- 预计10min后释放 -->
        </view>
      </view>
    </view>
    <u-line class="popup-line" color="#F7F7F8" />
    <view class="popup-money flex flex-vertical-c flex-justify-r">
      <view class="lh36 fz-24 color-block-65 m-r-8">共{{ numberValue }}台</view>
      <view class="fz-28 lh48"
        >商品金额：
        <VoPointPrice
          :price="
            isCash === 1
              ? decimalMulFn(info.cashPrice, numberValue).toFixed(2)
              : decimalMulFn(info.accountPrice, numberValue).toFixed(2)
          "
          :show-unit="true"
          display="inline-block"
        />
      </view>
    </view>
    <view class="popup-bottom p-b-safe-area">
      <EraButton   :text="btnText" circle @click="toOrder" />
    </view>
  </view>
</template>

<script>
  export default {
    name: 'InvestmentPopup',
    props: {
      info: {
        type: Object,
      },
      btnText: {
        type: String,
        default: '立即投资',
      },
      //A全国L本地
      queryType: {
        type: String,
      },
      isMySelfGoods: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        numberValue: 0,
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
        isCash: 1,
        maxNum: 0,
      }
    },
    created() {
      this.numberValue = this.info.startNumber || 0
      if (this.info.remainingAvailable >= this.info.investmentLimit-this.info.myAlreadyInvestedNum) {
        this.maxNum =this.info.investmentLimit-this.info.myAlreadyInvestedNum
      } else if (this.info.remainingAvailable < this.info.investmentLimit-this.info.myAlreadyInvestedNum) {
        this.maxNum = this.info.remainingAvailable
      }

    },
    methods: {
      //选择付款类型
      chooseType(data) {
        this.isCash = data.value
        this.typeList.forEach((item) => {
          if (item.value === data.value) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
      },
      valChange(e) {
        console.log('当前值为: ' + e.value)
        if (e.value >= this.info.remainingAvailable) {
          uni.$u.toast('已到达最大订购量')
        }
      },
      toOrder() {

        if (this.info.remainingAvailable < this.info.startNumber) {
          uni.$u.toast('库存不足')
          return
        }
        if (this.numberValue < this.info.startNumber) {
          uni.$u.toast(this.info.startNumber + '件起批')
          return
        }
        if((this.info.totalInvestment-this.info.alreadyInvestedNum)<this.info.startNumber){
          // 这个商品总的可投达不到起投
          uni.$u.toast('剩余可批量不足，联系客服再开放些余量吧~')
          return
        }

        if((this.info.investmentLimit-this.info.myAlreadyInvestedNum)<this.info.startNumber){
          //个人可投达不到起投

          if(this.info.investmentLimit-this.info.myAlreadyInvestedNum<=0){
            uni.$u.toast('超出限投量，项目限投'+this.info.investmentLimit+',您已投资'+this.info.myAlreadyInvestedNum)
            return
          }else{
            uni.$u.toast('该项目您已批发'+this.info.myAlreadyInvestedNum+'，剩余可批发量'+(this.info.investmentLimit-this.info.myAlreadyInvestedNum)+'小于项目起批量'+this.info.startNumber)

            return
          }


        }



        if (this.btnText === '订购') {
          let data = [
            {
              shopUserId: this.info.userId,
              platformCode: this.info.platformCode,
              shopId: this.info.goodsGoodsShopInfoVO.shopId,
              shopName: this.info.goodsGoodsShopInfoVO.name,
              cartWarehouseList: [
                {
                  warehouseName: this.info.warehouseName,
                  warehouseId: this.info.warehouseId,
                  cartDetailstList: [
                    {
                      ...this.info,
                      investmentNum: this.numberValue,
                      pricture: this.info.detailPic,
                      isCash: this.isCash,
                      investmentId: this.info.id,
                    },
                  ],
                },
              ],
            },
          ]

          this.$storage.set('investGoodsData', data)
          this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrders?queryType=' + this.queryType)
          this.$emit('closeFn')
        }
        if (this.btnText === '加入备货车') {
          let params = {
            investmentId: this.info.id,
            investmentNum: this.numberValue,
            isCash: this.isCash,
            shopId: this.info.goodsGoodsShopInfoVO.shopId,
            warehouseId: this.info.warehouseId,
          }
          this.$VoHttp
            .apiCartBasisSave(params)
            .then((res) => {
              uni.$u.toast('添加成功')
              this.$emit('finishFn')
              this.$emit('closeFn')
            })
            .catch((err) => {
              uni.$u.toast(err.message || '添加失败')
            })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .popup {
    &-info {
      padding: 40rpx 0 0 32rpx;
      box-sizing: border-box;
      &__img {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
      }
      &__right {
        width: 466rpx;
      }
    }
    &-way {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      &__public {
        font-size: 24rpx;
        padding: 6rpx 24rpx;
        text-align: center;
        line-height: 42rpx;
        box-sizing: border-box;
        &.selected {
          background: $v-tags-btn-disabled;
          border: 2rpx solid $color-primary-yellow;
          border-radius: 80rpx;
          color: $color-primary-yellow;
        }
        &.no-selected {
          background: #f6f7f8;
          border-radius: 80rpx;
          border: 2rpx solid transparent;
          color: $v-c0-85;
        }
      }
      &__right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      &__input {
        width: 76rpx;
        text-align: center;
        font-size: 28rpx;
      }
    }
    &-line {
      margin-left: 24rpx;
    }
    &-money {
      padding: 20rpx 32rpx 32rpx 0;
      box-sizing: border-box;
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }
  .pop-close {
    position: absolute;
    right: 24rpx;
    top: 24rpx;
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
