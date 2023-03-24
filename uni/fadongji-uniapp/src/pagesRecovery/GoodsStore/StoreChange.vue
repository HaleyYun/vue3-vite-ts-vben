<template>
  <view>
    <view class="store color-block fz-28 flex flex-column">
      <VoNav :rightWidth="200" is-fixed is-have-more title="库存变更记录">
        <block slot="operation">
          <view class="fz-32 color-block-65 lh150 m-r-36" @click="showPicker = true">筛选</view>
        </block>
      </VoNav>
      <view class="store-title flex flex-vertical-c m-t-16 m-b-16">
        <VoIcon :size="24" name="good-my" />
        <view class="font-weight-500 fz-32 m-l-8">
          {{ goodsName }}
        </view>
      </view>
      <!-- <view class="month flex flex-vertical-c bg-white border-bottom">
        <view class="font-weight-500 fz-32"> 2022年3月 </view>
        <VoIcon name="open-arrow-b" :size="12" :opacity="0.85" color="#000000" />
      </view> -->
      <view class="flex1 border-box overflow-y">
        <view v-for="(item, index) of recordList" :key="index" class="record-item">
          <u-sticky style="top: 0">
            <view class="record-item__title" @click="item.show = !item.show">
              <view class="flex flex-vertical-c fz-30">
                <view class="m-r-8">{{ item.operMonth }}</view>
                <!--                <VoIcon :size="12" name="open-arrow-b" />-->
                <!--            <VoIcon name="open-arrow-t" :size="12"></VoIcon>-->
              </view>

              <view class="fz-24">
                <view v-if="item.show" class="flex flex-vertical-c">
                  <view class="m-r-4 c-gray">收起</view>
                  <VoIcon :size="16" color="#d9d9d9" name="arrow-top-line" />
                </view>
                <view v-else class="flex flex-vertical-c">
                  <view class="m-r-4 c-gray">展开</view>
                  <VoIcon :size="16" color="#d9d9d9" name="arrow-bottom-line" />
                </view>
              </view>
            </view>
          </u-sticky>

          <block v-if="item.show">
            <RepairRecordItem
              v-for="(info, index) of item.inOutLog"
              :key="index"
              :record-list="info"
            />
          </block>
        </view>
        <VoNoData v-if="!recordList.length" no-data-tips="暂无库存变更记录" />
      </view>
    </view>
    <u-datetime-picker
      v-model="dateValue"
      :maxDate="+new Date()"
      :show="showPicker"
      closeOnClickOverlay
      confirmColor="rgba(0, 0, 0, 0.85)"
      mode="year-month"
      title="选择月份"
      @cancel="showPicker = false"
      @close="showPicker = false"
      @confirm="dateConfirm"
    />
  </view>
</template>
<script>
  import RepairRecordItem from './components/RepairRecordItem'

  export default {
    components: { RepairRecordItem },
    data() {
      return {
        goodsName: '',
        tagList: [
          {
            id: 0,
            name: '全部',
            choosed: true,
          },
        ],
        warehouseId: '',
        total: 0,
        pageSize: 12,
        pageNo: 1,
        goodsId: '',
        recordList: [],
        dateValue: new Date().getTime(),
        chooseDate: '',
        showPicker: false,
      }
    },
    onLoad(options) {
      this.goodsName = options.name || ''
      this.goodsId = options.id || ''
      this.initFn()
    },
    methods: {
      dateConfirm(e) {
        this.chooseDate = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm')
        console.log(e.value, this.chooseDate)
        this.showPicker = false
        this.initFn(true)
      },
      tagClick(item) {
        this.tagList.forEach((tag) => {
          tag.choosed = item.id === tag.id ? true : false
        })
      },
      initFn(init) {
        if (init) {
          this.pageNo = 1
          this.recordList = []
        }
        let param = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        }
        if (this.goodsId) {
          param.goodsId = this.goodsId
        }
        if (this.warehouseId) {
          param.warehouseId = this.warehouseId
        }
        param.operMonth = init
          ? this.chooseDate || this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm')
          : ''

        this.$VoHttp
          .apiWarehouseStatisRecyclingInout(param)
          .then((res) => {
            res.data.records.map((item) => {
              item.show = true
              this.recordList.push(item)
            })
            this.total = res.data.total
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .store {
    height: 100vh;
    &-title {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    .month {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }
    .record-item {
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
