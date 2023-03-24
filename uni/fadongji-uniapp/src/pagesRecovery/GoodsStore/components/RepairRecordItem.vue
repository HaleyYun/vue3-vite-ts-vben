<template>
  <view class="info color-block fz-28">
    <view class="padding-box flex flex-justify-between m-b-24">
      <view class="info-status">{{ recordList.typeName }}</view>
      <view class="info-title flex1 text-right">出库数量：{{ recordList.changeNumber }}</view>
    </view>
    <view class="info-name px-32 overTwoEllipsis m-b-24">{{ recordList.goodsName }}</view>

    <view class="info-con flex flex-wrap">
      <!-- 订单出库 -->
      <view
        class="info-con__list flex"
        v-show="Number(recordList.type) === 3 || Number(recordList.type) === 4"
        v-for="(item, i) in outLabelArr"
        :key="i"
      >
        <view>{{ item.name }}</view>
        <view class="flex1">{{ recordList[item.value] }}</view>
      </view>
      <!-- 手动出库 -->
      <view
        class="info-con__list flex"
        v-show="Number(recordList.type) === 0 || Number(recordList.type) === 1"
        v-for="item in outHandLabelArr"
        :key="item.id"
      >
        <view>{{ item.name }}</view>
        <view class="flex1">{{ recordList[item.value] }}</view>
      </view>
      <!-- 手动入库 -->
      <view
        class="info-con__list flex"
        v-show="Number(recordList.type) === 2"
        v-for="item in inHandLabelArr"
        :key="item.id"
      >
        <view>{{ item.name }}</view>
        <view class="flex1">{{ recordList[item.value] }}</view>
      </view>
      <!-- 分拣入库 -->
      <!--      <view-->
      <!--        class="info-con__list flex"-->
      <!--        v-show="Number(recordList.type) === 6"-->
      <!--        v-for="item in changeInLabelArr"-->
      <!--        :key="item.id"-->
      <!--      >-->
      <!--        <view>{{ item.name }}</view>-->
      <!--        <view class="flex1">{{ recordList[item.value] }}</view>-->
      <!--      </view>-->
      <!-- 退货出库 -->
      <view class="info-con__list flex">
        <view>仓库：</view>
        <view class="flex1">{{ recordList.warehouseName }}</view>
      </view>
      <view class="info-con__list flex">
        <view>出库商品：</view>
        <view class="flex1">{{ recordList.level }}类</view>
      </view>
      <view class="info-con__list flex">
        <view>销售前库存：</view>
        <view class="flex1">{{ recordList.originNumber }}</view>
      </view>
      <view class="info-con__list flex">
        <view>销售后库存：</view>
        <view class="flex1">{{ recordList.newNumber }}</view>
      </view>
    </view>

    <view class="last padding-box color-block-45">
      <view class="p-t-16">订单编号：{{ recordList.id }}</view>
      <view class="p-t-16">出库时间：{{ recordList.createTime }}</view>
      <view class="p-t-16">入库人：{{ recordList.creatorName }}</view>
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
            id: 'c',
            name: '出库商品：',
            value: 'goodsName',
          },
          {
            id: 'b',
            name: '销售前库存：',
            value: 'originNumber',
          },
          {
            id: 'd',
            name: '销售后库存：',
            value: 'newNumber',
          },
          {
            id: 'e',
            name: '订单编号：',
            value: 'typeId',
          },
          {
            id: 'e1',
            name: '出库时间：',
            value: 'createTime',
          },
        ],
        outHandLabelArr: [
          {
            id: 'a',
            name: '仓库：',
            value: 'warehouseName',
          },
          {
            id: 'c',
            name: '出库商品：',
            value: 'goodsName',
          },
          {
            id: 'b',
            name: '销售前库存：',
            value: 'originNumber',
          },
          {
            id: 'd',
            name: '销售后库存：',
            value: 'newNumber',
          },
          // {
          //   id: 'e',
          //   name: '出库人：',
          //   value: 'typeId',
          // },
          // {
          //   id: 'e1',
          //   name: '出库时间：',
          //   value: 'createTime',
          // },
        ],
        //手动入库
        inHandLabelArr: [
          {
            id: 'f',
            name: '仓库：',
            value: 'warehouseName',
          },
          {
            id: 'c1',
            name: '商品：',
            value: 'goodsName',
          },
          {
            id: 'g',
            name: '入库前库存：',
            value: 'originNumber',
          },
          {
            id: 'u',
            name: '入库数量：',
            value: 'changeNumber',
          },
          {
            id: 'i',
            name: '入库后库存：',
            value: 'newNumber',
          },
          {
            id: 'i1',
            name: '入库商品成色：',
            value: '',
          },
          {
            id: 'ii',
            name: '入库人：',
            value: '',
          },
          {
            id: 't',
            name: '订单编号：',
            value: 'typeId',
          },
          //入库数量
        ],
        //分拣入库
        changeInLabelArr: [
          {
            id: 'h',
            name: '仓库：',
            value: 'warehouseName',
          },
          {
            id: 'cc',
            name: '商品：',
            value: 'goodsName',
          },
          {
            id: 'gg',
            name: '入库前库存：',
            value: 'originNumber',
          },
          {
            id: 'hh',
            name: '入库数量：',
            value: 'changeNumber',
          },
          {
            id: 's',
            name: '入库后库存：',
            value: 'newNumber',
          },
          {
            id: 'jj',
            name: '入库商品成色：',
            value: '',
          },
          {
            id: 'k',
            name: '订单编号：',
            value: 'typeId',
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
    },
  }
</script>

<style lang="scss" scoped>
  .info {
    box-sizing: border-box;
    padding: 40rpx 0;
    border-top: 2rpx solid $v-bg-light;
    margin-bottom: 16rpx;

    &-name {
      width: 100vw;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 28rpx;
      line-height: 150%;
      color: $v-c0-85;
    }

    &-title {
      color: #e50012;
      line-height: 150%;
      font-weight: 500;
      word-break: break-all;
    }

    &-status {
      padding: 0 16rpx;
      height: 42rpx;
      line-height: 42rpx;
      text-align: center;
      background: linear-gradient(96.72deg, #f20014 -13.61%, #fa6419 104.67%);
      border-radius: 8rpx;
      font-size: 24rpx;
      color: #fff;

      &.type2 {
        background: linear-gradient(96.72deg, #0d66ff -13.61%, #498ff2 104.67%);
      }
    }

    .padding-box {
      padding: 0 32rpx;
      box-sizing: border-box;
    }

    .last {
      border-top: 1px solid #f7f7f8;
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
      padding: 0 32rpx 8rpx 32rpx;
      box-sizing: border-box;
      line-height: 1.5;
      color: $v-c0-65;
      margin-top: 16rpx;

      &__list {
        width: 50%;
        margin-bottom: 16rpx;
        word-break: break-all;
        padding-right: 8rpx;
        box-sizing: border-box;
      }

      &__time {
      }
    }

    .w284 {
      width: 284rpx;
    }
  }
</style>
