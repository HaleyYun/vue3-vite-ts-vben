<template>
  <view
    class="record"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >


    <VoNav place-bg-color="#f7f7f8" :left-width="240" title="操作记录"  is-have-more  :right-width="240"></VoNav>

    <view class="record-item">
      <u-sticky offset-top="0">
        <view class="record-item__title">
          <view class="flex flex-vertical-c fz-30">
            <view class="m-r-8">2022年3月</view>
            <VoIcon name="open-arrow-b" :size="12"></VoIcon>
            <!--            <VoIcon name="open-arrow-t" :size="12"></VoIcon>-->
          </view>

          <view class="flex flex-vertical-c fz-24">
            <view class="m-r-4 c-gray">收起</view>
            <VoIcon name="arrow-top-line" :size="16" color="#d9d9d9"></VoIcon>
            <!--            <VoIcon name="arrow-bottom-line" :size="16" color="#d9d9d9"></VoIcon>-->
          </view>
        </view>
      </u-sticky>

      <RepairRecordItem
        v-for="(info, index) of recordList"
        :key="index"
        :record-list="info"
      ></RepairRecordItem>

    </view>


  </view>
</template>

<script>
import RepairRecordItem from "@/pagesSupplier/Warehouse/WarehouseList/components/RepairRecordItem";

export default {
  name: 'WarehouseOperationRecord',
  components: { RepairRecordItem },
  data() {
    return {
      recordList: [
        {
          status:1,
          name: '江陵动力发动机-B15-黑色OCV专用发动机 江陵动力发动机-B15',
          type: 1,
          warehouse: '郑州仓',
          afterNumber: 300,
          operator: '李海',
          beforeNumber: 180,
          time: '2022-03-30 14:26',
        },
        {
          name: '江陵动力发动机-B15-黑色OCV专用发动机 江陵动力发动机-B15',
          type: 2,
          warehouse: '郑州仓',
          afterNumber: 300,
          operator: '李海',
          beforeNumber: 180,
          time: '2022-03-30 14:26',
        },
        {
          name: '江陵动力发动机-B15-黑色OCV专用发动机 江陵动力发动机-B15',
          type: 3,
          warehouse: '郑州仓',
          afterNumber: 300,
          operator: '李海',
          beforeNumber: 180,
          time: '2022-03-30 14:26',
          receiptList: [
            {
              type: 1,
              state: '商品入库-河北仓',
              time: '2022-03-23 14:26',
              annotation: '无法入库，商品码无法识别，无法入库，商品码无法识别',
            },
            {
              state: '商品出库-郑州仓',
              time: '2022-03-23 12:02',
            },
            {
              state: '补货申请',
              time: '2022-03-23 10:36',
            },
          ],
        },
        {
          name: '江陵动力发动机-B15-黑色OCV专用发动机 江陵动力发动机-B15',
          type: 3,
          warehouse: '郑州仓',
          afterNumber: 300,
          operator: '李海',
          beforeNumber: 180,
          time: '2022-03-30 14:26',
          receiptList: [
            {
              type: 2,
              state: '商品入库-河北仓',
              time: '2022-03-23 14:26',
              annotation: '无法入库，商品码无法识别，无法入库，商品码无法识别',
            },
            {
              state: '商品出库-郑州仓',
              time: '2022-03-23 12:02',
            },
            {
              state: '补货申请',
              time: '2022-03-23 10:36',
            },
          ],
        },
        {
          name: '江陵动力发动机-B15-黑色OCV专用发动机 江陵动力发动机-B15',
          type: 3,
          warehouse: '郑州仓',
          afterNumber: 300,
          operator: '李海',
          beforeNumber: 180,
          time: '2022-03-30 14:26',
          receiptList: [
            {
              type: 3,
              state: '商品入库-河北仓',
              time: '2022-03-23 14:26',
              annotation: '无法入库，商品码无法识别，无法入库，商品码无法识别',
            },
            {
              state: '商品出库-郑州仓',
              time: '2022-03-23 12:02',
            },
            {
              state: '补货申请',
              time: '2022-03-23 10:36',
            },
          ],
        },
      ],
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.record{
  width: 750rpx;
  min-height: 100vh;
  background-color:#f7f7f8 ;
  padding-top: 16rpx;
  box-sizing: border-box;
  &-item{
    background-color: #FFFFFF;
    position: sticky;
    &__title{
      background-color: #FFFFFF;
      width: 686rpx;
      height: 96rpx;
      margin: 0rpx auto 0rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(0, 0, 0, 0.85);
    }

  }

}

</style>
