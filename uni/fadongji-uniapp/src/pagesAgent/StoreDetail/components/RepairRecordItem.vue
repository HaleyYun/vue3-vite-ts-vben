<template>
  <view class="info">
    <view class="flex flex-justify-between m-b-24">
      <view class="info-title flex1 p-r-40">
        <text v-show="recordList.categoryType" class="good-tips m-r-8">
          {{ recordList.categoryType }}
        </text>
        <text class="fz-b"> {{ recordList.goodsName }}</text>
      </view>
      <view class="info-status">{{ recordList.typeName }}</view>
    </view>
    <!-- <view class="info-name overTwoEllipsis m-b-24" v-else>{{ recordList.name }}</view> -->

    <view class="info-con flex flex-wrap">
      <!-- 订单出库 -->
      <view
        v-for="item of outLabelArr"
        v-show="
          Number(recordList.type) === 3 ||
          Number(recordList.type) === 4 ||
          Number(recordList.type) === 11 ||
          Number(recordList.type) === 12 ||
          Number(recordList.type) === 22
        "
        :key="item.id"
        :class="item.name === '仓库：' ? 'w-full' : ''"
        class="info-con__list flex"
        @click="codePopup(item)"
      >
        <view :class="item.name === '出库数量：' ? 'fz-b' : ''">{{ item.name }}</view>
        <view :class="item.name === '出库数量：' ? 'color-blue ' : ''" class="flex1">
          {{ recordList[item.value] }}
        </view>
      </view>
      <!-- <view class="info-con__list1 flex">
        <view>订单编号：</view>
        <view class="flex1">{{ recordList.typeId }}</view>
      </view> -->
      <!-- 投资入库 -->
      <view
        v-for="item in inLabelArr"
        v-show="
          Number(recordList.type) === 0 ||
          Number(recordList.type) === 1 ||
          Number(recordList.type) === 10
        "
        :key="item.id"
        :class="item.name === '仓库：' ? 'w-full' : ''"
        class="info-con__list flex"
        @click="codePopup(item)"
      >
        <view :class="item.name === '入库数量：' ? 'fz-b' : ''">{{ item.name }}</view>
        <view :class="item.name === '入库数量：' ? 'color-blue ' : ''" class="flex1">
          {{ recordList[item.value] }}
        </view>
      </view>
      <!-- 调拨入库 -->
      <view
        v-for="item in changeinLabelArr"
        v-show="Number(recordList.type) === 2 || Number(recordList.type) === 9"
        :key="item.id"
        :class="item.name === '仓库：' ? 'w-full' : ''"
        class="info-con__list flex"
        @click="codePopup(item)"
      >
        <view :class="item.name === '入库数量：' ? 'fz-b' : ''">{{ item.name }}</view>
        <view :class="item.name === '入库数量：' ? 'color-blue ' : ''" class="flex1">
          {{ recordList[item.value] }}
        </view>
      </view>
      <!-- 调拨出库 -->
      <view
        v-for="item in changeoutLabelArr"
        v-show="Number(recordList.type) === 6 || Number(recordList.type) === 13"
        :key="item.id"
        :class="item.name === '仓库：' ? 'w-full' : ''"
        class="info-con__list flex"
        @click="codePopup(item)"
      >
        <view :class="item.name === '出库数量：' ? 'fz-b' : ''">{{ item.name }}</view>
        <view :class="item.name === '出库数量：' ? 'color-blue ' : ''" class="flex1">
          {{ recordList[item.value] }}
        </view>
      </view>
      <!-- 退货出库 -->
      <view
        v-for="item in exitLabelArr"
        v-show="Number(recordList.type) === 5"
        :key="item.id"
        :class="item.name === '仓库：' ? 'w-full' : ''"
        class="info-con__list flex"
        @click="codePopup(item)"
      >
        <view :class="item.name === '商品数量：' ? 'fz-b' : ''">{{ item.name }}</view>
        <view :class="item.name === '商品数量：' ? 'color-blue ' : ''" class="flex1">
          {{ recordList[item.value] }}
        </view>
      </view>
      <!-- 手动入库 -->
      <view
        v-for="item in manualEntryStorage"
        v-show="Number(recordList.type) === 19"
        :key="item.id"
        :class="item.name === '仓库：' ? 'w-full' : ''"
        class="info-con__list flex"
        @click="codePopup(item)"
      >
        <view :class="item.name === '入库数量：' ? 'fz-b' : ''">{{ item.name }}</view>
        <view :class="item.name === '入库数量：' ? 'color-blue ' : ''" class="flex1">
          {{ recordList[item.value] }}
        </view>
      </view>
      <!-- 手动出库 -->
      <view
        v-for="item in anualWarehousing"
        v-show="[20, 22].includes(Number(recordList.type))"
        :key="item.id"
        :class="item.name === '仓库：' ? 'w-full' : ''"
        class="info-con__list flex"
        @click="codePopup(item)"
      >
        <view :class="item.name === '出库数量：' ? 'fz-b' : ''">{{ item.name }}</view>
        <view :class="item.name === '出库数量：' ? 'color-blue ' : ''" class="flex1">
          {{ recordList[item.value] }}
        </view>
      </view>
      <!-- 调拨入库和调拨出库和退货出库有调拨单据 -->
      <view
        v-show="
          Number(recordList.type) === 2 ||
          Number(recordList.type) === 9 ||
          Number(recordList.type) === 6 ||
          Number(recordList.type) === 13 ||
          Number(recordList.type) === 5
        "
        class="info-con__list1 flex"
      >
        <view>调拨单据：</view>
        <view class="flex1">{{ recordList.typeId }}</view>
      </view>
      <!-- 订单出库和投资入库有订单编号 -->
      <view
        v-show="
          Number(recordList.type) === 3 ||
          Number(recordList.type) === 4 ||
          Number(recordList.type) === 11 ||
          Number(recordList.type) === 12 ||
          Number(recordList.type) === 0 ||
          Number(recordList.type) === 1 ||
          Number(recordList.type) === 10
        "
        class="info-con__list1 flex"
      >
        <view>订单编号：</view>
        <view class="flex1">{{ recordList.typeId }}</view>
      </view>
      <!-- 所有状态都有操作时间 -->
      <view class="info-con__list1 flex">
        <view>操作时间：</view>
        <view class="flex1">{{ recordList.endTime || recordList.createTime }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'RepairRecordItem',
    props: {
      /**
       * type 1人工调整 2调拨 3申请补货
       * warehouse 仓库
       * afterNumber 修改后商品数量
       * operator 操作人
       * beforeNumber 修改前商品数量
       * time 操作时间
       * 库存操作类型：
        0-服务商-投资入库,
        1-服务商-销售退货入库,
        2-服务商-调拨入库
        3-服务商-投资订单出库,
        4-服务商-销售订单出库,
        5-服务商-投资退货出库,
        6-服务商-调拨出库，
        19-服务商手动入库，
        20-服务商-手动出库，

        7-供应商-手动修改,
        8-供应商-补货入库,
        9-供应商-调拨入库,
        10-供应商-退货入库
        11-供应商-投资订单出库,
        12-供应商-销售订单出库,
        13-供应商-调拨出库
       */
      recordList: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        outLabelArr: [
          {
            id: 'a',
            name: '仓库：',
            value: 'warehouseName',
          },
          {
            id: 'b',
            name: '销售前库存：',
            value: 'originNumber',
          },
          {
            id: 'c',
            name: '销售后库存：',
            value: 'newNumber',
          },
          {
            id: 'd',
            name: '出库数量：',
            value: 'changeNumber',
          },
          // {
          //   id: 'e',
          //   name: '订单编号：',
          //   value: 'typeId',
          // },
        ],
        inLabelArr: [
          {
            id: 'f',
            name: '仓库：',
            value: 'warehouseName',
          },
          {
            id: 'g',
            name: '入库前库存：',
            value: 'originNumber',
          },
          {
            id: 'i',
            name: '入库后库存：',
            value: 'newNumber',
          },
          {
            id: 'h',
            name: '入库数量：',
            value: 'changeNumber',
          },
          // {
          //   id: 'j',
          //   name: '订单编号：',
          //   value: 'typeId',
          // },
        ],
        changeinLabelArr: [
          {
            id: 'k',
            name: '仓库：',
            value: 'warehouseName',
          },
          {
            id: 'l',
            name: '入库前库存：',
            value: 'originNumber',
          },
          {
            id: 'n',
            name: '入库后库存：',
            value: 'newNumber',
          },
          {
            id: 'm',
            name: '入库数量：',
            value: 'changeNumber',
          },
          // {
          //   id: 'o',
          //   name: '入库单据：',
          //   value: 'typeId',
          // },
          // {
          //   id: 'p',
          //   name: '调拨单据：',
          //   value: 'typeId',
          // },
        ],
        changeoutLabelArr: [
          {
            id: 'q',
            name: '仓库：',
            value: 'warehouseName',
          },
          {
            id: 'r',
            name: '调入仓库：',
            value: 'inWarehouseName',
          },
          {
            id: 't',
            name: '调出仓库：',
            value: 'outWarehouseName',
          },
          {
            id: 's',
            name: '出库数量：',
            value: 'changeNumber',
          },
          // {
          //   id: 'u',
          //   name: '出库单：',
          //   value: 'warehouseName',
          // },
          // {
          //   id: 'v',
          //   name: '调拨单据：',
          //   value: 'typeId',
          // },
        ],
        exitLabelArr: [
          {
            id: 'w',
            name: '调入仓库：',
            value: 'inWarehouseName',
          },
          {
            id: 'x',
            name: '调出仓库：',
            value: 'outWarehouseName',
          },
          {
            id: 'y',
            name: '商品数量：',
            value: 'changeNumber',
          },
          // {
          //   id: 'z',
          //   name: '调拨单据：',
          //   value: 'typeId',
          // },
        ],
        manualEntryStorage: [
          {
            id: '0',
            name: '仓库：',
            value: 'warehouseName',
          },
          {
            id: '1',
            name: '入库前库存：',
            value: 'originNumber',
          },
          {
            id: '2',
            name: '入库后库存：',
            value: 'newNumber',
          },
          {
            id: '3',
            name: '入库数量：',
            value: 'changeNumber',
          },
          {
            id: '8',
            name: '操作人：',
            value: 'creatorName',
          },
        ],
        anualWarehousing: [
          {
            id: '4',
            name: '仓库：',
            value: 'warehouseName',
          },
          {
            id: '5',
            name: '出库前库存：',
            value: 'originNumber',
          },
          {
            id: '6',
            name: '出库后库存：',
            value: 'newNumber',
          },
          {
            id: '7',
            name: '出库数量：',
            value: 'changeNumber',
          },
          {
            id: '9',
            name: '操作人：',
            value: 'creatorName',
          },
        ],
      }
    },
    methods: {
      /**
       * 更改数量
       */
      updateNum() {
        this.$emit('updateNum')
      },
      /**
       * 确认入库
       */
      sureWareFn() {
        this.$emit('sureWareFn')
      },
      /**
       * 点击弹出发动机识别码弹出层
       */
      codePopup(item) {
        this.$emit('codePopup', item.name, this.recordList.id)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info {
    margin: 0 32rpx;
    box-sizing: border-box;
    padding: 40rpx 0;
    border-top: 2rpx solid $v-bg-light;
    &-name {
      width: 100%;
      font-weight: bold;
      font-size: 28rpx;
      line-height: 150%;
      color: $v-c0-85;
    }
    &-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 28rpx;
      line-height: 150%;
      width: 520rpx;
      font-weight: 500;
      word-break: break-all;
    }
    &-status {
      padding: 0 16rpx;
      height: 36rpx;
      line-height: 36rpx;
      text-align: center;
      background-color: #d3d4db;
      border-radius: 24rpx;
      font-size: 24rpx;
      color: #6f738a;
    }
    &-item {
      display: flex;
      flex-wrap: wrap;
      line-height: 150%;
      position: relative;
      &__no {
        margin-bottom: 24rpx;
        margin-right: 32rpx;
      }
      &__fixed {
        background-color: #ffffff;
        color: rgba(0, 0, 0, 0.45);
        font-size: 24rpx;
        position: absolute;
        bottom: 24rpx;
        right: 0rpx;
      }
    }

    &-type {
      margin-top: 6rpx;
      height: 18px;
      background: $v-text-disabled;
      border-radius: 12px;
      padding: 0 16rpx;
      font-size: 12px;
      line-height: 150%;
      color: $v-btn-deep;
    }
    &-con {
      width: 686rpx;
      font-size: 24rpx;
      line-height: 1.5;
      color: $v-c0-65;
      margin-top: 16rpx;
      &__list {
        width: 50%;
        min-height: 36rpx;
        word-break: break-all;
        padding-top: 16rpx;
        &.w-full {
          width: 100%;
        }
      }
      &__list1 {
        width: 100%;
        min-height: 36rpx;
        word-break: break-all;
        padding-top: 16rpx;
      }
      &__time {
        height: 36rpx;
      }
    }
    .w284 {
      width: 284rpx;
    }
  }
  .good-tips {
    font-weight: normal;
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: #fff;
    padding: 0 12rpx;
    background: $color-primary-yellow;
    border-radius: 24rpx;
  }
</style>
