<template>
  <view class="record flex flex-column">
    <VoNav
      :left-width="240"
      :right-width="240"
      :z-index="10"
      is-have-more
      place-bg-color="#f6f7f8"
      title="出入库记录"
    >
      <view slot="operation" @click="startShow = true">
        <view class="fz-32 color-block-65 lh150 m-r-16">筛选</view>
      </view>
    </VoNav>

    <view v-if="warehouseName" class="record-title">
      {{ warehouseName }}
    </view>

    <view
      v-for="(item, index) of list"
      :key="index"
      :class="index > 0 ? 'm-t-24' : ''"
      class="record-item"
    >
      <u-sticky offset-top="0">
        <view class="record-item__title">
          <view class="flex flex-vertical-c fz-30">
            <view class="m-r-8">{{ item.operMonth }}</view>
            <!--            <VoIcon :size="12" name="open-arrow-b" />-->
            <!--            <VoIcon name="open-arrow-t" :size="12"></VoIcon>-->
          </view>

          <view class="fz-24">
            <view v-if="item.show" class="flex flex-vertical-c" @click="changeFn(index, false)">
              <view class="m-r-4 c-gray">收起</view>
              <VoIcon :size="16" color="#d9d9d9" name="arrow-top-line" />
            </view>
            <view v-else class="flex flex-vertical-c" @click="changeFn(index, true)">
              <view class="m-r-4 c-gray">展开</view>
              <VoIcon :size="16" color="#d9d9d9" name="arrow-bottom-line" />
            </view>
          </view>
        </view>
      </u-sticky>

      <RecordItem
        v-for="(it, itIndex) of item.inOutLog"
        v-show="item.show"
        :key="itIndex"
        :item="it"
      />
    </view>
    <VoNoData v-if="!list.length" no-data-tips="暂无更多内容" />
    <view style="position: fixed">
      <u-datetime-picker
        v-model="value1"
        :formatter="formatter"
        :maxDate="3740967920000"
        :minDate="332747120000"
        :show="startShow"
        :value="startTime ? startTime : nowDate"
        cancelColor="rgba(0, 0, 0, 0.45)"
        confirmColor="#22284B"
        mode="year-month"
        title="日期选择器"
        @cancel="cancelStart"
        @confirm="confirmStart"
      />
    </view>
  </view>
</template>

<script>
  import RecordItem from '@/pagesSupplier/Warehouse/WarehouseList/components/RecordItem'

  export default {
    name: 'WarehouseRecordList',
    components: { RecordItem },
    data() {
      return {
        warehouseName: '',
        warehouseId: '',
        pageNo: 1,
        pageSize: 20,
        total: 0,
        list: [],
        startShow: false, // 开始日期选择器弹框
        startTime: '',
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm'),
        endShow: false, // 结束日期选择器弹框
        endTime: '',
        value1: Number(new Date()),
      }
    },
    methods: {
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`
        }
        if (type === 'month') {
          return `${value}月`
        }
        return value
      },
      cancelStart() {
        this.startShow = false
      },
      /**
       * confirm  选择开始时间
       * @param e
       */
      confirmStart(e) {
        this.isChooseTime = true
        this.startShow = false
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm')
        this.startTime = date
        console.log(this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm'), 'sss', this.startTime)
        this.initFn(true)
      },
      changeFn(index, boo) {
        this.list[index].show = boo
      },
      initFn(init) {
        if (init) {
          this.list = []
          this.pageNo = 1
        }
        let param = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          warehouseId: this.warehouseId,
        }
        if (this.startTime) {
          param['selectMonth'] = this.startTime
        }
        this.$VoHttp.apiWarehouseOperSupplierInout(param).then((res) => {
          res.data.records.map((item) => {
            item.show = true
            this.list.push(item)
          })
          console.log(this.list, '000000')

          this.total = res.data.total
        })
      },
    },
    onLoad(options) {
      this.warehouseName = options.warehouseName
      this.warehouseId = options.warehouseId
      this.initFn('init')
    },
    onReachBottom() {
      if (this.total > this.list.length) {
        this.pageNo++
        this.initFn()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .record {
    width: 750rpx;
    min-height: 100vh;
    background-color: #f6f7f8;
    padding-bottom: 40rpx;
    box-sizing: border-box;

    &-title {
      width: 750rpx;
      height: 90rpx;
      padding: 0rpx 32rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
    }
    &-item {
      background-color: #ffffff;
      position: sticky;
      &__title {
        background-color: #ffffff;
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
  .c-gray {
    color: rgba(0, 0, 0, 0.45);
  }
</style>
