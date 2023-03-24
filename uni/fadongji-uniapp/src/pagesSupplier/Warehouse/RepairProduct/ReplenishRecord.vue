<template>
  <view>
    <view class="record flex flex-column">
      <!--   顶部固定区域   -->
      <view class="record-fixed flex flex-column">
        <VoNav :is-fixed="false" is-have-more title="补货记录">

          <view slot="operation" @click="setTime">
            <view class="fz-32 color-block-65 lh150 m-r-16">筛选</view>
          </view>
        </VoNav>
        <view class="record-fixed__con">
          <view class="con-name overTwoEllipsis">
            <text v-show="categoryType" class="good-tips m-r-8">{{categoryType}}</text>
            {{ name }}</view>
          <view class="con-ware flex flex-vertical-c">
            <view class="con-ware__house m-t-8">仓库：</view>
            <scroll-view class="con-ware__right m-t-8 flex1" scroll-x>
              <view
                v-for="info of labelList"
                :key="info.id"
                :class="info.selected ? 'select' : 'no-select'"
                class="select-button"
                @click="chooseFn(info)"
              >
                {{ info.warehouseName }}
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
      <view class="line-bg" />
      <scroll-view :scroll-y="true" class="flex1 overflow-y" scroll-top="0">
        <block v-if="list.length > 0">
          <view
            v-for="(item, index) of list"
            :key="index"
            class="record-month"
            @click="salesVolume(index)"
          >
            <view class="record-month__tabs flex flex-vertical-c flex-justify-between">
              <view class="tabs-title flex flex-vertical-c">
                <view class="m-r-8">{{ item.operMonth }}</view>
              </view>
              <view
                v-if="item.refillGoodsStatisDTOS && item.refillGoodsStatisDTOS.length > 0"
                @click="isOpen(index)"
              >
                <view v-if="isOpenList[index]" class="tabs-right flex flex-vertical-c">
                  <view class="tabs-right__margin">收起</view>
                  <VoIcon :opacity="0.15" :size="16" name="arrow-top-line" />
                </view>
                <view v-else class="tabs-right flex flex-vertical-c">
                  <view class="tabs-right__margin">展开</view>
                  <VoIcon :opacity="0.15" :size="16" name="arrow-bottom-line" />
                </view>
              </view>
            </view>
            <!--        v-if="item.isShowAll ? index < item.refillGoodsStatisDTOS.length : index < 0"-->
            <block v-if="isOpenList[index]">
              <RecordInformation
                v-for="(info, index) of item.refillGoodsStatisDTOS"
                :key="index"
                :info="info"
              />
            </block>
          </view>
        </block>
        <VoNoData v-else img-url="/static/noData/noGoods.png" no-data-tips="暂无补货记录" />
      </scroll-view>
    </view>

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
</template>

<script>
  import RecordInformation from './components/RecordInformation'

  export default {
    name: 'ReplenishRecord',
    components: { RecordInformation },
    data() {
      return {
        name: '',
        categoryType: '',
        id: '',
        pageSize: 999,
        pageNo: 1,
        total: 0,
        list: [],
        isOpenList: [],
        labelList: [],
        warehouseId: '',
        recordInformation: [
          {
            month: '2022年3月',
            isShowAll: true, //有数据收起
          },
          {
            month: '2022年2月',
            isShowAll: true, //有数据收起
          },
          {
            month: '2022年1月',
            isShowAll: true, //有数据收起
          },
          {
            month: '2021年12月',
            isShowAll: true, //有数据收起
          },
        ],
        recordList: [
          // {
          //   name: '江陵动力发动机-B15-黑色OCV专用发动机 江陵动力发动机-B15',
          //   type: 1,
          //   warehouse: '郑州仓',
          //   afterNumber: 300,
          //   operator: '李海',
          //   beforeNumber: 180,
          //   time: '2022-03-30 14:26',
          // },
        ],
        startShow: false, // 开始日期选择器弹框
        startTime: '',
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm'),
        endShow: false, // 结束日期选择器弹框
        endTime: '',
        value1: Number(new Date()),
      }
    },
    onReady() {
      // 微信小程序需要用此写法
      this.$refs.datetimePicker?.setFormatter(this.formatter)
    },
    onLoad(options) {
      this.id = options.id
      this.name = options.name
      this.categoryType = options.categoryType
      this.initFn('init')
      this.getWare()
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
      setTime() {
        this.startShow = true
      },
      isOpen(index) {
        this.isOpenList[index] = !this.isOpenList[index]
        console.log('index:', index)
        console.log('isOpen:', this.isOpenList[index])
        this.$forceUpdate()
      },
      getWare() {
        let arr = [
          {
            id: 'all',
            warehouseName: '全部',
            selected: true,
          },
        ]
        this.$VoHttp.WAREHOUSE.apiWarehouseMyWarehouses().then((res) => {
          let labelList = res.data.ownWareHouse.concat(res.data.platWareHouse)
          labelList.forEach((item) => {
            item.selected = false
          })
          this.labelList = arr.concat(labelList)
        })
      },
      initFn(init) {
        if (init) {
          this.pageNo = 1
          this.list = []
        }
        let param = {
          goodsId: this.id,
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        }
        if (this.warehouseId) {
          param['warehouseId'] = this.warehouseId
        }
        if (this.startTime) {
          param['selectMonth'] = this.startTime
        }
        this.$VoHttp.apiWarehouseStatisSupplierRefill(param).then((res) => {
          console.log(res, '11111111111111111')
          this.list = this.list.concat(res.data.records)
          this.total = res.data.total
          let i = 0
          this.list.forEach((item) => {
            this.isOpenList.push(false)
            if (i === 0) {
              this.isOpenList[0] = true
            }
            i++
          })
        })
      },
      chooseFn(e) {
        if (e.id === 'all') {
          this.warehouseId = ''
        } else {
          this.warehouseId = e.warehouseId
        }
        // 多选
        // this.labelList.forEach((info) => {
        //   if (e === info.id) {
        //     info.selected = !info.selected
        //   }
        // })
        // 单选
        this.labelList.forEach((info) => {
          if (e.id === info.id) {
            info.selected = true
          } else {
            info.selected = false
          }
        })
        this.initFn(true)
      },
      /**
       * 展开、收起数据
       */
      salesVolume(index) {
        let data = this.recordInformation[index]
        data.isShowAll = !data.isShowAll
      },
    },
    onReachBottom() {
      if (this.list.length < this.total) {
        this.pageNo++
        this.initFn()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .record {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    background: $v-bg-white;

    &-fixed {
      &__con {
        background: #ffffff;
        .con-name {
          padding: 40rpx 32rpx 24rpx;
          border-bottom: 2rpx solid $v-bg-light;
          line-height: 150%;
          font-weight: bold;
          font-size: 32rpx;
        }
        .con-ware {
          width: 750rpx;
          box-sizing: border-box;
          &__house {
            padding: 26rpx 0rpx 24rpx 32rpx;
            font-size: 30rpx;
            line-height: 150%;
            color: $v-c0-85;
            border-right: 2rpx solid $v-bg-light;
          }
          &__right {
            overflow-x: scroll;
            white-space: nowrap;
          }
        }
      }
    }
    &-month {
      border-bottom: 16rpx solid #f6f7f8;
      margin-top: 24rpx;
      background: #ffffff;
      &__tabs {
        height: 96rpx;
        margin: 0 32rpx;
        .tabs-title {
          height: 46rpx;
          font-size: 30rpx;
          line-height: 150%;
          color: $v-c0-85;
        }
        .tabs-right {
          height: 18rpx;
          line-height: 18rpx;
          font-size: 24rpx;
          color: $v-c0-45;
          &__margin {
            margin-right: 4rpx;
          }
        }
      }
    }
  }
  .select-button {
    line-height: 150%;
    font-size: 24rpx;
    padding: 14rpx 28rpx;
    margin-left: 28rpx;
    border-radius: 100rpx;
    display: inline-block;
  }
  .no-select {
    background: #f2f2f2;
    color: #262626;
    border: 2rpx solid transparent;
  }
  .select {
    background: $v-tags-btn-disabled;
    border: 1px solid $color-primary-yellow;
    color: $color-primary-yellow;
  }
  .line-bg {
    height: 16rpx;
    background-color: #f6f7f8;
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
