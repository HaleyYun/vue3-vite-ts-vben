<template>
  <u-popup v-if="visible" :round="8" :show="visible" class="popup" mode="bottom" @close="close">
    <view class="popup-title">
      <view class="popup-title__text fz-b">
        <text v-show="record.categoryType" class="good-tips m-r-8">{{ record.categoryType }}</text>
        <text> {{ record.name || '暂无名称' }} </text>
      </view>
      <view class="popup-title__right">
        <VoIcon :opacity="0.85" :size="20" color="#000000" name="close" @click="close" />
      </view>
    </view>
    <scroll-view class="popup-content" scroll-y>
      <view class="popup-row">
        <view class="popup-row__title fz-b flex-vertical-c flex">
          <view class="title-icon m-r-16" />
          <view>商家仓库存</view>
        </view>
        <view v-for="(item, index) in ownWareHouse" :key="item.id" class="popup-row__item">
          <view class="left">
            <view class="breakAll flex flex-vertical-c">
              <view class="fz-b">{{ item.warehouseName }}</view>
              <view
                v-if="item.warnLabel"
                :class="item.warnLabel === '库存预警' ? 'tag-orange' : ''"
                class="left-tag"
              >
                {{ item.warnLabel }}
              </view>
            </view>
            <view class="flex p-t-8">
              <view>可用库存：</view>
              <block v-if="item.warnLabel">
                <text :class="item.warnLabel === '无货' ? 'red' : 'color-orange'">
                  {{ item.availableNumber }}
                </text>
              </block>
              <block v-else>
                <text>{{ item.availableNumber }}</text>
              </block>
            </view>
          </view>
          <!-- <view v-if="!item.edit" class="right-btn" @click="showNumBox(item, index)">{{
            item.availableNumber
          }}</view>
          <view v-else class="right">
            <u-number-box
              v-model="item.newAvailableNumber"
              :buttonSize="20"
              :inputWidth="38"
              :min="0"
              bgColor="#F7F7F8"
              color="rgba(0,0,0,0.85)"
              integer
            />
          </view> -->
          <view class="flex p-t-16 border-box flex-justify-between">
            <view class="flex">
              <view class="fz-28 color-block-65">增加库存：</view>
              <u-number-box
                v-model="item.addNum"
                :buttonSize="20"
                :inputWidth="24"
                :min="0"
                bgColor="#F7F7F8"
                color="rgba(0,0,0,0.85)"
                integer
              />
            </view>
            <view class="flex">
              <view class="fz-28 color-block-65">减少库存：</view>
              <u-number-box
                v-model="item.subtractNum"
                :buttonSize="20"
                :inputWidth="24"
                :max="item.availableNumber"
                :min="0"
                bgColor="#F7F7F8"
                color="rgba(0,0,0,0.85)"
                integer
              />
            </view>
          </view>
        </view>

        <!-- <view class="popup-row__item border">
          <view class="left">郑州仓：<text>5</text></view>
          <view class="right">
            <u-number-box :min="1" :max="100" />
          </view>
        </view> -->
      </view>
      <view class="holder-line" />
      <view class="popup-row">
        <view class="popup-row__title fz-b flex-vertical-c flex">
          <view class="title-icon m-r-16" />
          <view>平台仓库存</view>
        </view>
        <view v-for="item in platWareHouse" :key="item.id" class="popup-row__item">
          <view class="left">
            <view class="breakAll fz-b flex flex-vertical-c">
              <view>{{ item.warehouseName }}</view>
              <view
                v-if="item.warnLabel"
                :class="item.warnLabel === '库存预警' ? 'tag-orange' : ''"
                class="left-tag"
              >
                {{ item.warnLabel }}
              </view>
            </view>
            <view class="flex p-t-8 flex-justify-between flex-vertical-c">
              <view>
                可用库存：
                <block v-if="item.warnLabel">
                  <text :class="item.warnLabel === '无货' ? 'red' : 'color-orange'">
                    {{ item.availableNumber }}
                  </text>
                </block>
                <block v-else>
                  <text>{{ item.availableNumber }}</text>
                </block>
              </view>
              <view class="right-btn round" @click="addGoods(item)">申请补货</view>
            </view>
          </view>
        </view>
      </view>
      <view class="color-block-45 fz-24 px-32 m-t-14 m-b-24">
        合作的平台仓库，您只能通过调拨修改库存
      </view>
    </scroll-view>
    <view class="popup-btn">
      <view class="popup-btn__item left" @click="close"> 取消 </view>
      <view class="popup-btn__item" @click="confirm()"> 确定 </view>
    </view>
  </u-popup>
</template>
<script>
  import helper from '@/common/helper'

  export default {
    name: 'GoodsPop',
    data() {
      return {
        visible: false,
        record: '',
        ownWareHouse: [],
        platWareHouse: [],
      }
    },
    methods: {
      show(data) {
        this.record = data
        this.visible = true
        helper.showLoading()
        this.$VoHttp
          .apiWarehouseStockCompanyGoodsWarehouse({
            goodId: data.id,
          })
          .then((res) => {
            this.ownWareHouse = res.data.ownWareHouse
            this.platWareHouse = res.data.platWareHouse
            this.ownWareHouse.forEach((item) => {
              item.edit = false
              item.newAvailableNumber = item.availableNumber
              item.addNum = 0
              item.subtractNum = 0
            })
            this.platWareHouse.forEach((item) => {
              item.edit = false
            })
            helper.hideLoading()
          })
          .catch((err) => {
            helper.hideLoading()
          })
      },
      close() {
        this.visible = false
      },
      confirm() {
        console.log('this.ownWareHouse', this.ownWareHouse)
        // let editArr = this.ownWareHouse.filter(
        //   (item) => item.newAvailableNumber != item.availableNumber,
        // )
        let arr = []
        this.ownWareHouse.forEach((item) => {
          // //加库存
          let num = this.decimalAddFn(item.availableNumber, item.addNum)
          // //减库存
          let val = this.decimalSubFn(num, item.subtractNum)
          if (item.addNum) {
            arr.push({
              goodsId: item.goodsId,
              warehouseId: item.warehouseId,
              changeNumber: num,
            })
          }
          if (item.subtractNum) {
            arr.push({
              goodsId: item.goodsId,
              warehouseId: item.warehouseId,
              changeNumber: val,
            })
          }
        })
        // let arr = editArr.map((item) => {
        //   return {
        //     goodsId: this.record.id,
        //     warehouseId: item.warehouseId,
        //     changeNumber: item.newAvailableNumber,
        //   }
        // })
        console.log('arr', arr)
        this.$VoHttp
          .apiWarehouseOperSupplierSelfRefillMultiter({
            boList: arr,
          })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('操作成功')
            }
            this.$emit('confirm')
          })
      },
      //显示步进器
      showNumBox(item, index) {
        this.ownWareHouse[index].edit = true
        this.$forceUpdate()
      },
      //跳转平台仓补货
      addGoods(item) {
        this.$linkToEasy(
          `/pagesSupplier/Warehouse/WarehouseList/WarehouseRepairPro?warehouseId=${item.warehouseId}&warehouseName=${item.warehouseName}&type=1&isSelf=0&goodsName=${this.record.name}&goodsId=${this.record.id}`,
        )
      },
    },
  }
</script>
<style lang="scss" scoped>
  .popup {
    &-title {
      padding: 24rpx 0;
      display: flex;
      border-bottom: 2rpx solid #f7f7f8;
      &__text {
        flex: 1;
        color: $v-c0-85;
        font-size: 32rpx;
        line-height: 1.5;
        padding-left: 32rpx;
        padding-right: 38rpx;
      }
      &__right {
        width: 40rpx;
        padding-right: 24rpx;
      }
    }
    &-row {
      &__title {
        padding: 24rpx 32rpx 0 32rpx;
        font-weight: bold;
        color: $v-c0-85;
        font-size: 32rpx;
        line-height: 1.5;
      }
      &__item {
        padding: 20rpx 32rpx 24rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #f7f7f8;
        &:last-child {
          border-bottom: 0;
        }
        &.border {
          border-bottom: 8rpx solid #f7f7f8;
        }
        .left {
          color: $v-c0-85;
          font-size: 28rpx;
          line-height: 1.5;
          .red {
            color: #f20014;
          }
          &-tag {
            height: 36rpx;
            border: 2rpx solid #f20014;
            border-radius: 22rpx;
            padding: 0 16rpx;
            box-sizing: border-box;
            color: #f20014;
            font-size: 24rpx;
            line-height: 34rpx;
            margin-left: 16rpx;
          }
          .tag-orange {
            border: 2rpx solid #ff9b05;
            color: #ff9b05;
          }
        }
        .right {
          &-btn {
            border: 2rpx solid rgba(0, 0, 0, 0.65);
            border-radius: 4px;
            text-align: center;
            height: 48rpx;
            width: 116rpx;
            font-size: 24rpx;
            color: $v-c0-85;
            line-height: 48rpx;
            margin-left: 64rpx;
            &.round {
              border: 2rpx solid $color-primary-yellow;
              border-radius: 30rpx;
              color: $color-primary-yellow;
              padding: 0 26rpx;
            }
          }
        }
      }
    }
    &-btn {
      display: flex;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
      &__item {
        padding: 16rpx 0rpx;
        flex: 1;
        background: $color-primary-yellow;
        border-radius: 64rpx;
        text-align: center;
        color: #ffffff;
        font-size: 32rpx;
        line-height: 150%;
        &.left {
          margin-right: 40rpx;
          background: #fff;
          border: 2rpx solid $v-c0-25;
          color: $v-c0-85;
        }
      }
    }
  }
  .popup-content {
    max-height: 70vh;
    overflow-y: scroll;
  }
  .holder-line {
    height: 8rpx;
    background-color: $v-bg-light;
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
  .title-icon {
    background-color: #ff5319;
    border-radius: 200rpx;
    width: 6rpx;
    height: 32rpx;
  }
</style>
