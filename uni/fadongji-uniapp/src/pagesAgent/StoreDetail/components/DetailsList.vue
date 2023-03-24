<template>
  <view class="deList">
    <view class="deList-own">
      <view class="flex flex-vertical-c m-b-8 p-l-32">
        <view class="deList-own__rectangle m-r-16" />
        <view class="deList-own__warehouse">{{ title }}</view>
      </view>
      <view v-for="(info, index) of detailsList" :key="index" class="line">
        <view class="flex flex-vertical-c fz-28 color-block m-t-40">
          <view class="deList-own__warehouse">{{ info.warehouseName }}</view>
          <view
            v-if="info.warnLabel && info.warnLabel === '库存预警'"
            class="deList-own__warn m-l-16"
            >库存预警</view
          >
          <view v-if="info.warnLabel && info.warnLabel === '无货'" class="deList-own__btn m-l-16"
            >无货</view
          >
        </view>
        <view class="flex flex-vertical-c flex-justify-between m-t-26">
          <view class="fz-28 color-block">
            可用库存数：
            <!-- <text class="deList-own" :class="info.availableNumber?'blue': ''">{{ info.availableNumber }}</text> -->
          </view>
          <view class="flex flex-vertical-c">
            <view class="fz-28 fz-b">
              {{ info.availableNumber }}
            </view>
            <view
              v-if="info.type == 'plat' || info.type == 'factory'"
              class="deList-own__button fz-24 m-l-28"
              @click="goApplyReplenishment(info)"
              >申请调拨</view
            >
          </view>
        </view>
        <view class="deList-own__color45 m-t-16 fz-20 m-b-24">
          {{
            info.type === 'own'
              ? '可用库存数=库存总数-订单占用-补货待发货'
              : '可用库存数=库存总数-订单占用-调拨待发货'
          }}
          <!--          <text v-if="info.onWayNumber">+入库在途</text>-->
        </view>
        <VoLine color="#F7F7F8" />
        <view class="deList-own__stock m-t-24">
          <!-- <view class="flex flex-justify-between flex-vertical-c">
            <view>总库存：</view>
            <view>{{ info.number }}</view>
          </view> -->
          <view
            class="flex flex-justify-between flex-vertical-c m-t-24"
            @click="goIdentificationCode"
          >
            <view class="flex flex-vertical-c">
              <view>总库存：</view>
              <VoTooltip :padding="8" class="fz-0" placement="bottom">
                <view slot="content">
                  <view class="tooltip-box">仓库中实际存在的商品数量。</view>
                </view>
                <VoIcon :opcaity="0.45" :size="16" color="#000000" name="question-line" />
              </VoTooltip>
            </view>
            <view class="color-blue">{{ info.number || 0 }}</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-t-24">
            <view class="flex flex-vertical-c">
              <view>订单占用：</view>
              <VoTooltip :padding="8" class="fz-0" placement="bottom">
                <view slot="content">
                  <view class="tooltip-box">买家已下单尚未支付、</view>
                  <view class="tooltip-box">及已支付未出库的商品</view>
                </view>
                <VoIcon :opcaity="0.45" :size="16" color="#000000" name="question-line" />
              </VoTooltip>
            </view>
            <view>{{ info.orderNumber }}</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-t-24">
            <view class="flex flex-vertical-c">
              <view>补货在途：</view>
              <VoTooltip :padding="8" class="fz-0" placement="bottom">
                <view slot="content">
                  <view class="tooltip-box">已申请调拨或购买，但尚未</view>
                  <view class="tooltip-box">入库的商品数量</view>
                </view>
                <VoIcon :opcaity="0.45" :size="16" color="#000000" name="question-line" />
              </VoTooltip>
            </view>
            <view>{{ info.onWayNumber || 0 }}</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-t-24">
            <view class="flex flex-vertical-c">
              <view>{{ info.type === 'own' ? '补货待发货：' : '调拨待发货：' }}</view>
              <VoTooltip :arrowStyleSelf="80" :padding="8" class="fz-0" placement="bottom">
                <view slot="content">
                  <block v-if="info.type === 'own'">
                    <view class="tooltip-box">已提交的补货单中，出库仓为该仓库，</view>
                    <view class="tooltip-box">但尚未发货商品数量。</view>
                  </block>
                  <block v-else>
                    <view class="tooltip-box">已提交的调拨单中，出库仓为该仓库，</view>
                    <view class="tooltip-box">但尚未发货商品数量。</view>
                  </block>
                </view>
                <VoIcon :opcaity="0.45" :size="16" color="#000000" name="question-line" />
              </VoTooltip>
            </view>
            <view>{{ info.allotNumber || 0 }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'DetailsList',
    props: {
      title: {
        type: String,
        default: '',
      },
      dataObj: {
        type: Object,
      },
      detailsList: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {}
    },
    methods: {
      /**
       * 去商品识别码页
       */
      goIdentificationCode() {
        console.log(this.dataObj, 555555555555555)
        this.$storage.set('storeGoodsData', this.dataObj)
        this.$linkToEasy('/pagesAgent/PublishProduct/IdentificationCode?id=' + this.dataObj.id)
      },
      /**
       * 点击申请调拨按钮
       */
      goApplyReplenishment(info) {
        this.$emit('goApplyReplenishment', info)
      },
      //编辑库存
      editNumber($event, info) {
        let api = ''
        if (info.type === 'own') {
          api = 'apiWarehouseOperSupplierSelfRefill'
        }
        if (info.type === 'plat') {
          api = 'apiWarehouseOperSupplierRefill'
        }
        this.$VoHttp[api]({
          goodsId: info.goodsId,
          warehouseId: info.warehouseId,
          changeNumber: $event.detail.value,
        })
          .then((res) => {
            uni.$u.toast('可用库存修改成功！')
            this.$emit('editNumberSucess')
          })
          .catch((err) => {
            uni.$u.toast('操作失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .deList {
    width: 750rpx;
    background: #ffffff;
    margin-top: 24rpx;
    color: $v-c0-85;
    .blue {
      color: #155bd4;
    }
    &-own {
      padding-top: 40rpx;

      &__rectangle {
        width: 6rpx;
        height: 32rpx;
        background: $color-primary-yellow;
      }
      &__warehouse {
        font-weight: bold;
        font-size: 32rpx;
        line-height: 150%;
      }
      &__btn {
        width: 80rpx;
        height: 36rpx;
        border: 2rpx solid #e50012;
        color: #e50012;
        line-height: 32rpx;
        text-align: center;
        border-radius: 36rpx;
        font-size: 24rpx;
      }
      &__warn {
        width: 128rpx;
        height: 28rpx;
        border: 2rpx solid #fda202;
        color: #fda202;
        line-height: 32rpx;
        text-align: center;
        border-radius: 36rpx;
        font-size: 24rpx;
      }
      &__no {
        color: #e50012;
      }
      &__error {
        color: #fda202;
      }
      &__input {
        width: 110rpx;
        height: 48rpx;
        text-align: center;
        line-height: 44rpx;
        color: rgba(0, 0, 0, 0.85);
        font-size: 24rpx;
        border-radius: 8rpx;
        border: 2rpx solid rgba(0, 0, 0, 0.65);
      }
      &__button {
        width: 148rpx;
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        background: $color-primary-yellow;
        border-radius: 30rpx;
        color: #ffffff;
      }
      &__color45 {
        color: $v-c0-45;
      }
      &__stock {
        background: $v-bg-light;
        padding: 24rpx;
        margin-bottom: 40rpx;
        color: $v-c0-65;
        font-size: 28rpx;
        line-height: 150%;
        border-radius: 16rpx;
      }
    }
  }
  .line {
    border-bottom: 2rpx solid $v-bg-light;
    padding: 0 32rpx;
    &:last-child {
      border-bottom: 2rpx solid transparent;
    }
  }
</style>
