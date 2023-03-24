<template>
  <view class="item" @click="goNext">
    <view class="item-no flex flex-vertical-c">
      商品编号：<span class="item-no__info">{{ item.goodsCode }}</span>
      <view class="fz-24 color-155bd4 m-l-12" @click.stop="copyHandler(item.goodsCode)">复制</view>
    </view>
    <block v-if="isSelf == 1">
      <view class="item-content">
        <view class="item-content__left">
          <block v-if="type === 1">
            <view v-if="item.warnLabel == '库存低'" class="left-error">库存预警</view>
            <view v-else-if="item.warnLabel" class="left-no">{{ item.warnLabel }}</view>
          </block>
          <image :src="item.pic[0] + '&type=1'" class="w-full h-full" />
        </view>
        <view class="item-content__right info">
          <view class="info-title overTwoEllipsis">
            <text v-show="item.categoryType" class="good-tips m-r-8">{{ item.categoryType }}</text>
            <text> {{ item.goodsName }}</text>
          </view>
          <block v-if="type === 1">
            <view class="info-stock">
              <view
                >可用库存：<span class="color-red color-error">{{
                  item.availableNumber
                }}</span></view
              >
              <view class="flex m-l-32 flex-vertical-c" @click.stop
                >总库存：
                <view v-if="!item.edit" class="info-stock__input" @click="showNumBox(item)">{{
                  item.number
                }}</view>
                <view v-else class="right">
                  <u-number-box
                    v-model="item.number"
                    :buttonSize="28"
                    :inputWidth="42"
                    :min="0"
                    bgColor="#F7F7F8"
                    color="rgba(0,0,0,0.85)"
                    integer
                    @blur="blurStock"
                    @change="onDelay"
                  />
                </view>
              </view>
              <!--              <view class="flex flex-vertical-c flex1 m-l-24">总库存：{{ item.number }}</view>-->
            </view>
            <view class="info-stock lh36 m-t-8">
              <view class="flex flex-vertical-c"
                >订单占用：<span>{{ item.orderNumber }}</span
                ><VoIcon :opacity="0.25" :size="12" color="#000" name="arrow-line-bottom"
              /></view>
              <view class="flex flex-vertical-c m-l-22"
                >补货待发货：<span>{{ item.allotNumber || 0 }}</span
                ><VoIcon :opacity="0.25" :size="12" color="#000" name="arrow-line-bottom"
              /></view>
            </view>
            <view class="info-formula"> 可用库存数=总库存-订单占用-补货待发货 </view>
          </block>
          <block v-else-if="type === 2">
            <view class="stock-line">入库仓库：{{ item.warehouseName }}</view>
            <view class="stock-line">商品数量：{{ item.onWayNumber }}</view>
          </block>
        </view>
      </view>
      <view v-if="type === 1" class="flex flex-justify-r m-t-32">
        <view @click.stop="warnFn">
          <view class="in-button m-l-20">预警设置</view>
        </view>
      </view>
    </block>
    <block v-else>
      <view class="item-content">
        <view class="item-content__left">
          <block v-if="type === 1">
            <view v-if="item.warnLabel == '库存低'" class="left-error">库存预警</view>
            <view v-else-if="item.warnLabel" class="left-no">{{ item.warnLabel }}</view>
          </block>
          <image :src="item.pic[0] + '&type=1'" class="w-full h-full" />
        </view>
        <view class="item-content__right info">
          <view class="info-title overTwoEllipsis">
            <text v-show="item.categoryType" class="good-tips m-r-8">{{ item.categoryType }}</text>
            {{ item.goodsName }}
          </view>
          <block v-if="type === 1">
            <view class="info-stock">
              <view
                >可用库存：<span class="color-red color-error">{{
                  item.availableNumber
                }}</span></view
              >
              <!--                <view class="flex flex-vertical-c">总库存：<input type="number" class="info-stock__input"></view>-->
              <view class="flex flex-vertical-c flex1 m-l-48">总库存：{{ item.number }}</view>
            </view>
            <view class="info-stock">
              <view class="flex flex-vertical-c"
                >订单占用：<span>{{ item.orderNumber }}</span
                ><VoIcon :opacity="0.25" :size="12" color="#000" name="arrow-line-bottom"
              /></view>
              <view class="flex flex-vertical-c flex1 m-l-24">
                入库在途：
                <view>{{ item.onWayNumber }}</view>
                <VoIcon :opacity="0.25" :size="12" color="#000" name="arrow-line-bottom" />
              </view>
            </view>
            <view class="info-stock">
              <view class="flex flex-vertical-c"
                >调拨待发货：<span>{{ item.allotNumber || 0 }}</span
                ><VoIcon :opacity="0.25" :size="12" color="#000" name="arrow-line-bottom"
              /></view>
            </view>
            <view class="info-formula"> 可用库存数=总库存-订单占用-调拨待发货 </view>
          </block>
          <block v-else-if="type === 2">
            <view class="stock-line">入库仓库：{{ item.warehouseName }}</view>
            <view class="stock-line">商品数量：{{ item.onWayNumber }}</view>
          </block>
        </view>
      </view>
      <view v-if="type === 1" class="flex flex-justify-r m-t-32">
        <view @click.stop="warnFn">
          <view class="in-button m-l-20">预警设置</view>
        </view>
        <view @click.stop="replenishmentFn">
          <view class="in-button m-l-20">补库</view>
        </view>
        <view @click.stop="allotFn">
          <view class="in-button m-l-20">调拨</view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  export default {
    name: 'InItem',
    props: {
      /**
       * 1是自有  2是平台
       */
      isSelf: {
        type: Number,
        default: 0,
      },
      /**
       * @description 描述 1为在库  2为在途
       */
      type: {
        type: Number,
        default: 1,
      },
      item: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        scrollTimer: null,
      }
    },
    methods: {
      //显示步进器
      showNumBox(item, index) {
        item.edit = true
        this.$forceUpdate()
      },
      goNext() {
        // this.$linkToEasy('/pagesSupplier/Warehouse/WarehouseList/WarehouseProDetail')
      },
      /**
       * 调拨
       */
      allotFn() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/WarehouseAllotPro?warehouseId=' +
            this.item.warehouseId +
            '&warehouseName=' +
            this.item.warehouseName +
            '&goodsName=' +
            this.item.goodsName +
            '&goodsId=' +
            this.item.goodsId,
        )
      },
      /**
       * 补库
       */
      replenishmentFn() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/WarehouseRepairPro?warehouseId=' +
            this.item.warehouseId +
            '&warehouseName=' +
            this.item.warehouseName +
            '&type=1' +
            '&isSelf=' +
            this.isSelf +
            '&goodsName=' +
            this.item.goodsName +
            '&goodsId=' +
            this.item.goodsId,
        )
      },
      /**
       * 预警设置
       */
      warnFn() {
        uni.$emit('warnFn', { item: this.item })
      },
      blurStock(e) {
        console.log(e.value, 'blurStock')
      },
      onDelay(e) {
        if (this.scrollTimer != null) {
          clearTimeout(this.scrollTimer)
        }
        this.scrollTimer = setTimeout(() => {
          console.log(e)
          this.changeStock(e)
          this.scrollTimer = null
        }, 2000)
      },
      changeStock(e) {
        console.log(e.value, 'changeStock')
        if (e.value <= 0 && e.value !== 0) {
          uni.$u.toast('输入有误')
          return
        }
        this.$VoHttp
          .apiWarehouseOperSupplierStockSelfRefill({
            goodsId: this.item.goodsId,
            warehouseId: this.item.warehouseId,
            changeNumber: e.value,
          })
          .then((res) => {
            uni.$u.toast('总库存修改成功！')
            this.$emit('updateFn')
          })
          .catch((err) => {
            uni.$u.toast(err.message || '操作失败')
          })
      },
      // 复制
      copyHandler(code) {
        // 复制操作
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this
        uni.setClipboardData({
          data: code,
          success: function () {
            _this.$u.toast('复制成功')
          },
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .item {
    margin-bottom: 24rpx;
    width: 750rpx;
    background-color: #ffffff;
    padding: 32rpx;
    box-sizing: border-box;
    &-no {
      font-size: 26rpx;
      color: $v-c0-45;
      margin-bottom: 22rpx;
      &__info {
        color: #155bd4;
      }
    }
    &-content {
      display: flex;
      justify-content: flex-start;

      &__left {
        width: 128rpx;
        height: 128rpx;
        position: relative;
        margin-right: 14rpx;
        border-radius: 8rpx;
        overflow: hidden;
        .left-no {
          width: 80rpx;
          height: 36rpx;
          text-align: center;
          line-height: 36rpx;
          border-radius: 8rpx 0rpx 16rpx;
          font-size: 24rpx;
          color: #ffffff;
          background-color: #f20014;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }
        .left-error {
          width: 128rpx;
          height: 36rpx;
          text-align: center;
          line-height: 36rpx;
          border-radius: 8rpx 0rpx 16rpx;
          font-size: 24rpx;
          color: #ffffff;
          background-color: #ff9e0d;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }
      }
      &__right {
        overflow-x: hidden;
      }
    }
    .info {
      &-title {
        color: $v-c0-85;
        font-size: 28rpx;
        font-weight: bold;
        line-height: 150%;
        margin-bottom: 18rpx;
      }
      &-stock {
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: $v-c0-65;
        .w192 {
          width: 192rpx;
        }
        .c4 {
          color: #c4c4c4;
        }
        &__input {
          padding: 0 16rpx;
          box-sizing: border-box;
          height: 52rpx;
          line-height: 52rpx;
          border: 2rpx solid $v-c0-65;
          border-radius: 8rpx;
        }
      }
      &-formula {
        height: 56rpx;
        width: 510rpx;
        background-color: #f7f7f8;
        border-radius: 8rpx;
        line-height: 56rpx;
        padding: 0rpx 16rpx;
        font-size: 20rpx;
        color: $v-c0-45;
        margin-top: 16rpx;
      }
    }
  }
  .stock-line {
    font-size: 26rpx;
    color: $v-c0-65;
    line-height: 150%;
    margin-bottom: 16rpx;
    &:last-child {
      margin-bottom: 0rpx;
    }
  }

  .color-red {
    color: #e50012;
  }
  .color-error {
    color: #ff9e0d;
  }
  .in-button {
    width: 148rpx;
    height: 56rpx;
    font-size: 24rpx;
    color: $v-c0-85;
    line-height: 56rpx;
    border: 2rpx solid #d3d4db;
    border-radius: 30rpx;
    align-items: center;
    text-align: center;
    justify-items: center;
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
  .color-155bd4 {
    color: #155bd4;
  }
</style>
