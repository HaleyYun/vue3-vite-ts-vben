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
          <view class="fz-28 color-block flex flex-vertical-c">
            可用库存数：
            <text v-if="info.warnLabel && info.warnLabel === '无货'" class="deList-own__no">
              {{ info.availableNumber }}
            </text>
            <text v-if="info.warnLabel && info.warnLabel === '库存预警'" class="deList-own__error">
              {{ info.availableNumber }}
            </text>
            <text v-if="info.warnLabel && info.warnLabel === '库存低'" class="deList-red">
              {{ info.availableNumber }}
            </text>
            <text v-if="!info.warnLabel" class="deList-red">{{ info.availableNumber }}</text>
          </view>
          <view
            v-if="info.type == 'plat'"
            class="deList-own__button fz-24"
            @click="goApplyReplenishment(info)"
            >申请补货</view
          >
          <!-- <input
            v-else
            :value="info.availableNumber"
            class="deList-own__input"
            type="number"
            @blur="editNumber($event, info)"
          /> -->
          <view v-else class="deList-own__button color fz-24" @click="changeStore(info)">
            调整库存
          </view>
        </view>
        <view class="deList-own__color45 m-t-16 fz-20 m-b-24">
          {{
            info.type === 'own'
              ? '可用库存数=总库存-订单占用-补货待发货'
              : '可用库存数=总库存-订单占用-调拨待发货'
          }}
          <!--          <text v-if="info.onWayNumber">+入库在途</text>-->
        </view>
        <VoLine color="#F7F7F8" />
        <view class="deList-own__stock">
          <!-- <view class="flex flex-justify-between flex-vertical-c">
            <view>总库存：</view>
            <view>{{ info.number }}</view>
          </view> -->
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="flex flex-vertical-c">
              <view>总库存：</view>
              <VoTooltip :padding="8" class="fz-0" placement="bottom">
                <view slot="content">
                  <view class="tooltip-box">仓库中实际存在的商品数量。</view>
                </view>
                <VoIcon :opacity="0.45" :size="16" color="#000" name="question-line" />
              </VoTooltip>
            </view>
            <view>{{ info.number || 0 }}</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-t-24">
            <view class="flex flex-vertical-c">
              <view>订单占用：</view>
              <VoTooltip :padding="8" class="fz-0" placement="bottom">
                <view slot="content">
                  <view class="tooltip-box">已下单尚未支付，及已支付</view>
                  <view class="tooltip-box">未出库的商品</view>
                </view>
                <VoIcon :opacity="0.45" :size="16" color="#000" name="question-line" />
              </VoTooltip>
            </view>
            <view>{{ info.orderNumber || 0 }}</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-t-24">
            <view class="flex flex-vertical-c">
              <view>入库在途：</view>
              <VoTooltip :padding="8" class="fz-0" placement="bottom">
                <view slot="content">
                  <view class="tooltip-box">已申请过补货，但尚未</view>
                  <view class="tooltip-box">入库的商品数量</view>
                </view>
                <VoIcon :opacity="0.45" :size="16" color="#000" name="question-line" />
              </VoTooltip>
            </view>
            <view>{{ info.onWayNumber || 0 }}</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-t-24">
            <view class="flex flex-vertical-c">
              <view>{{ info.type === 'own' ? '补货待发货：' : '调拨待发货：' }}</view>
              <VoTooltip
                :arrowStyleSelf="{ left: '160rpx' }"
                :padding="8"
                class="fz-0"
                placement="bottom"
              >
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
                <VoIcon :opacity="0.45" :size="16" color="#000" name="question-line" />
              </VoTooltip>
            </view>
            <view>{{ info.allotNumber || 0 }}</view>
          </view>
        </view>
      </view>
    </view>
    <VoModal
      v-if="modalVisible"
      :contentStyle="{ paddingLeft: '32rpx', paddingRight: '32rpx' }"
      :show="modalVisible"
      contentClass="modal-content"
      showCancelButton
      @cancel="modalVisible = false"
      @confirm="changeStoreConfirm"
    >
      <view class="color-block">
        <view class="fz-32 font-weight-500 text-center">调整库存</view>
        <view class="flex p-t-48">
          <view class="fz-28 font-weight-500">增加库存：</view>
          <u-number-box
            v-model="addNum"
            :buttonSize="20"
            :inputWidth="42"
            :min="0"
            bgColor="#F7F7F8"
            color="rgba(0,0,0,0.85)"
            integer
          />
        </view>
        <view class="flex p-t-48">
          <view class="fz-28 font-weight-500">减少库存：</view>
          <u-number-box
            v-model="subtractNum"
            :buttonSize="20"
            :inputWidth="42"
            :max="operationData.availableNumber"
            :min="0"
            bgColor="#F7F7F8"
            color="rgba(0,0,0,0.85)"
            integer
          />
          <view class="fz-24 color-block-45 p-l-16">
            (最多可减少{{ operationData.availableNumber }}件)
          </view>
        </view>
      </view>
    </VoModal>
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
      detailsList: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        modalVisible: false,
        operationData: '',
        addNum: 0,
        subtractNum: 0,
        availableNumber: 0, //可用库存
        sum: 0, //总库存
      }
    },
    methods: {
      //调整库存
      changeStore(item) {
        this.addNum = 0
        this.subtractNum = 0
        this.operationData = item
        this.modalVisible = true
      },
      //处理
      checkNumber(val) {
        if (val < 0) {
          val = 0
        } else {
          let input = val.replace(/[^\d]/g, '')
          val = input
        }
      },
      //调整库存
      changeStoreConfirm() {
        if (!this.subtractNum && !this.addNum) {
          this.$u.toast('请设置数值')
          return
        }
        //加库存
        let num = this.decimalAddFn(this.operationData.availableNumber, this.addNum)
        //减库存
        let val = this.decimalSubFn(num, this.subtractNum)
        console.log('changeStoreConfirm', this.addNum, this.subtractNum, val)
        // this.editNumber(this.operationData, val)
        let arr = []
        if (this.addNum) {
          arr.push({
            goodsId: this.operationData.goodsId,
            warehouseId: this.operationData.warehouseId,
            changeNumber: num,
          })
        }
        if (this.subtractNum) {
          arr.push({
            goodsId: this.operationData.goodsId,
            warehouseId: this.operationData.warehouseId,
            changeNumber: val,
          })
        }
        this.$VoHttp
          .apiWarehouseOperSupplierSelfRefillMultiter({
            boList: arr,
          })
          .then((res) => {
            uni.$u.toast('可用库存修改成功！')
            this.$emit('editNumberSucess')
            this.modalVisible = false
          })
          .catch((err) => {
            uni.$u.toast(err.message || '操作失败')
            this.modalVisible = false
            if (err.code === 'WG40006') {
              let that = this
              setTimeout(function () {
                that.$emit('editNumberSucess')
              }, 1000)
            }
          })
      },
      /**
       * 点击申请补货按钮
       */
      goApplyReplenishment(info) {
        this.$emit('goApplyReplenishment', info)
      },
      //编辑库存
      editNumber(info, val) {
        if (val <= 0 && val !== 0) {
          uni.$u.toast('输入有误')
          return
        }
        // if ($event.detail.value < 0) {
        //   info.availableNumber = 0
        // } else {
        //   let input = $event.detail.value.replace(/[^\d]/g, '')
        //   info.availableNumber = input
        // }
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
          changeNumber: val,
        })
          .then((res) => {
            uni.$u.toast('可用库存修改成功！')
            this.$emit('editNumberSucess')
            this.modalVisible = false
          })
          .catch((err) => {
            uni.$u.toast(err.message || '操作失败')
            this.modalVisible = false
            if (err.code === 'WG40006') {
              let that = this
              setTimeout(function () {
                that.$emit('editNumberSucess')
              }, 1000)
            }
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .deList {
    width: 750rpx;
    background: #ffffff;
    margin-top: 2rpx;
    &-red {
      color: #f20014;
    }
    &-own {
      padding-top: 40rpx;
      &__rectangle {
        width: 6rpx;
        height: 32rpx;
        border-radius: 200rpx;
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
        border: 2rpx solid #f20014;
        color: #f20014;
        line-height: 32rpx;
        text-align: center;
        border-radius: 36rpx;
        font-size: 24rpx;
      }
      &__warn {
        width: 128rpx;
        height: 28rpx;
        border: 2rpx solid #ff9b05;
        color: #ff9b05;
        line-height: 32rpx;
        text-align: center;
        border-radius: 36rpx;
        font-size: 24rpx;
      }
      &__no {
        color: #e50012;
      }
      &__error {
        color: #ff9b05;
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
        border: 1px solid #ff5319;
        border-radius: 30rpx;
        color: #ff5319;
        &.color {
          background: #ff5319;
          color: #fff;
        }
      }
      &__color45 {
        color: $v-c0-45;
      }
      &__stock {
        background: $v-bg-light;
        padding: 24rpx;
        color: $v-c0-65;
        font-size: 28rpx;
        line-height: 150%;
        border-radius: 16rpx;
        margin-bottom: 40rpx;
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
  .vo-btn {
    height: 56rpx;
    padding: 0 26rpx;
    border: 1px solid #ff5319;
    border-radius: 15px;
    font-weight: 500;
    font-size: 24rpx;
    line-height: 56rpx;
    color: #ff5319;
    &.color {
      background: #ff5319;
      color: #fff;
    }
  }
</style>
