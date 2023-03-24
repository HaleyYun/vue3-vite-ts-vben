<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="record flex flex-column"
  >
    <VoNav
      :left-width="240"
      :right-width="240"
      is-have-more
      place-bg-color="#f7f7f8"
      title="补货记录"
    >
      <view slot="operation" @click="startShow = true">
        <view class="fz-32 color-block-65 lh150 m-r-16">筛选</view>
      </view>
    </VoNav>

    <view v-for="(item, index) of recordList" :key="index" class="record-item">
      <u-sticky offset-top="0">
        <view v-show="item.operMonth" class="record-item__title">
          <view class="flex flex-vertical-c fz-30">
            <view class="m-r-8">{{ item.operMonth }}</view>
            <!--            <VoIcon :size="12" name="open-arrow-b"></VoIcon>-->
            <!--            <VoIcon name="open-arrow-t" :size="12"></VoIcon>-->
          </view>

          <view class="fz-24">
            <view v-if="item.show" class="flex flex-vertical-c" @click="item.show = false">
              <view class="m-r-4 c-gray">收起</view>
              <VoIcon :size="16" color="#d9d9d9" name="arrow-top-line" />
            </view>
            <view v-else class="flex flex-vertical-c" @click="item.show = true">
              <view class="m-r-4 c-gray">展开</view>
              <VoIcon :size="16" color="#d9d9d9" name="arrow-bottom-line" />
            </view>
          </view>
        </view>
      </u-sticky>

      <block v-if="item.show">
        <RepairRecordItem
          v-for="(info, index) of item.refillGoodsStatisDTOS"
          :key="index"
          :record-list="info"
        />
      </block>
    </view>
    <VoNoData v-if="!recordList.length" no-data-tips="暂无更多内容" />
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
  import RepairRecordItem from '@/pagesSupplier/Warehouse/WarehouseList/components/RepairRecordItem'

  export default {
    name: 'WarehouseRepairRecordPro',
    components: { RepairRecordItem },
    data() {
      return {
        total: 0,
        pageSize: 10,
        pageNo: 1,
        recordList: [],
        startShow: false, // 开始日期选择器弹框
        startTime: '',
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm'),
        endShow: false, // 结束日期选择器弹框
        endTime: '',
        value1: Number(new Date()),
        monthList: [],
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
      /**
       * 请求数据
       */
      initFn(init) {
        if (init) {
          this.pageNo = 1
          this.recordList = []
        }
        let param = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        }
        if (this.warehouseId) {
          param.warehouseId = this.warehouseId
        }
        if (this.startTime) {
          param['selectMonth'] = this.startTime
        }

        this.$VoHttp
          .apiWarehouseStatisSupplierRefill(param)
          .then((res) => {
            res.data.records.map((item) => {
              item.show = true

              console.log('length', this.recordList.length)
              if (this.recordList && this.recordList.length > 0) {
                let beforeData = this.recordList[this.recordList.length - 1]

                if (beforeData.operMonth == item.operMonth) {
                  item.operMonth = ''
                  this.recordList.map((r) => {
                    r.refillGoodsStatisDTOS = r.refillGoodsStatisDTOS.concat(
                      item.refillGoodsStatisDTOS,
                    )
                  })
                } else {
                  this.recordList.push(item)
                }
              } else {
                this.recordList.push(item)
              }
            })
            console.log('res', this.recordList)
            this.total = res.data.total
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
            console.log(e)
          })
      },
    },
    onLoad(options) {
      this.warehouseId = options.warehouseId
      this.initFn('init')
    },
    onReachBottom() {
      if (this.recordList.length < this.total) {
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
    background-color: #f7f7f8;
    padding-top: 16rpx;
    box-sizing: border-box;
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
</style>
