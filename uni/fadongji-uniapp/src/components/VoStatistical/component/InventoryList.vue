<template>
  <scroll-view
    :refresher-enabled="!isMore"
    :refresher-triggered="triggered"
    class="workbench h-full"
    refresher-background="#F7F7F8"
    refresher-default-style="none"
    scroll-top="0"
    scroll-y="true"
    @refresherabort="onAbort"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @scrolltolower="scrolltolower"
  >
    <VoListFresh :show="loadingStatus" />
    <view class="commoditiesList">
      <view class="title">仓库统计</view>
      <scroll-view :scroll-x="true">
        <view class="flex selectList">
          <view
            v-for="(item, index) of selectList"
            :key="index"
            :class="selectCurrent == item.warehouseId ? 'selectBlockA' : ''"
            class="selectBlock"
            @click="timeChange(item.warehouseId)"
            >{{ item.warehouseName }}</view
          >
        </view>
      </scroll-view>
      <view class="card-head">
        <view
          v-for="(item, index) of headList"
          :key="index"
          :class="'card-Item' + item.value"
          class="flex flex-vertical-c"
          @click="headClick(item)"
        >
          {{ item.label }}
          <view v-if="item.value == 3" class="flex flex-vertical-c">
            <block v-if="outStock == undefined">
              <VoIcon :size="16" name="default-gray" />
            </block>
            <block v-else>
              <VoIcon v-if="outStock" :size="16" name="direction" />
              <VoIcon v-else :size="16" class="transform" name="direction" />
            </block>
          </view>
          <view v-if="item.value == 4" class="flex flex-vertical-c">
            <block v-if="inStock == undefined">
              <VoIcon :size="16" name="default-gray" />
            </block>
            <block v-else>
              <VoIcon v-if="inStock" :size="16" name="direction" />
              <VoIcon v-else :size="16" class="transform" name="direction" />
            </block>
          </view>
        </view>
      </view>
      <view v-if="dataList.length > 0">
        <vo-statistical-list
          v-for="(item, index) of dataList"
          :key="index + 'statistical'"
          :dataList="item"
          :type="3"
        >
          <view slot="views">
            {{ item.outNumber }}
          </view>
          <view slot="dayBefore">
            {{ item.inNumber }}
          </view>
        </vo-statistical-list>
        <VoLoadingText :has-more="dataList.length < total" :loading="loading" />
      </view>
      <view v-if="!loading && dataList.length == 0" class="p-20">
        <VoNoData no-data-tips="暂无数据" />
      </view>
    </view>
  </scroll-view>
</template>

<script>
  import VoStatisticalList from '../../VoStatisticalList/VoStatisticalList'

  export default {
    name: 'InventoryList',
    components: { VoStatisticalList },
    props: {
      isMore: {
        type: Boolean,
        default: true,
      },
      timeParams: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        loading: false,
        selectCurrent: null,
        //下拉刷新上拉加载
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        outStock: undefined, // 排序字段-出库量,true 生效
        inStock: undefined, // 排序字段-入库量,true 生效
        pages: {
          pageNo: 1,
          pageSize: 10,
        },
        total: 0,
        selectList: [],
        headList: [
          { label: '商品信息', value: 2 },
          { label: '出库量', value: 3 },
          { label: '入库量', value: 4 },
        ],
        dataList: [],
      }
    },
    watch: {
      timeParams: {
        deep: true,
        handler(newVal) {
          this.pages.pageNo = 1
          this.dataList = []
          this.getData()
        },
      },
    },
    mounted() {
      this.getMyWarehouses()
    },
    methods: {
      timeChange(index) {
        this.selectCurrent = index
        this.dataList = []
        this.pages.pageNo = 1
        this.getData()
      },
      headClick(item) {
        if (item.value == 3) {
          this.inStock = undefined
          if (this.outStock == undefined) {
            this.outStock = true
          } else {
            this.outStock = !this.outStock
          }
        }
        if (item.value == 4) {
          this.outStock = undefined
          if (this.inStock == undefined) {
            this.inStock = true
          } else {
            this.inStock = !this.inStock
          }
        }
        this.dataList = []
        this.pages.pageNo = 1
        this.getData()
      },
      // apiWarehouseStatisAgentStockChange
      async getData() {
        try {
          let isfresh = this.refresh
          if (isfresh) {
            this.dataList = []
            this.pages.pageNo = 1
          }
          this.loading = true
          let params = {
            startTime: this.timeParams.selectTime[0],
            endTime: this.timeParams.selectTime[1],
            warehouseId: this.selectCurrent,
            outStock: this.outStock || false,
            inStock: this.inStock || false,
            ...this.pages,
          }
          const { code, data } = await this.$VoHttp.WAREHOUSE.apiWarehouseStatisAgentStockChange(
            params,
          )
          if (code == '20001') {
            this.dataList = this.dataList.concat(data.records ? data.records : [])
            this.total = data.total
          }
          this.loading = false
        } catch (e) {
          console.log(e)
          this.loading = false
        } finally {
          this.loading = false
          this.loadingStatus = false
          this.triggered = false
          this.refresh = false
        }
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新', this.scrollTop)
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getData()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.dataList.length >= this.total) {
            // uni.$u.toast('已经到底了')
            return false
          }
          this.pages.pageNo++
          this.getData()
        }, 2000)
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },

      // 获取仓库详情
      async getMyWarehouses() {
        try {
          this.selectList = []
          const { code, data } = await this.$VoHttp.WAREHOUSE.apiWarehouseAgentStatisMy()
          if (code == '20001') {
            this.selectList = [...data.ownWareHouse, ...data.platWareHouse]
            this.selectCurrent = this.selectList[0]['warehouseId']
            this.getData()
          }
        } catch (e) {
          console.log(e)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .commoditiesList {
    background: #fff;
    overflow: auto;
    margin-top: 16rpx;
    height: 100%;
    .title {
      font-size: 32rpx;
      padding: 24rpx 32rpx 8rpx 32rpx;
    }
    .selectList {
      padding: 16rpx 32rpx;
    }
  }
  .card-head {
    font-style: normal;
    font-weight: 400;
    font-size: 28rpx;
    line-height: 150%;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
    border-bottom: 2rpx solid #f7f7f8;
    border-top: 2rpx solid #f7f7f8;
    display: flex;
    padding: 22rpx 20rpx 24rpx 20rpx;
    .card-Item1 {
      width: 60rpx;
    }
    .card-Item2 {
      width: 426rpx;
      text-align: center;
    }
    .card-Item3 {
      width: 144rpx;
    }
    .card-Item4 {
      width: 144rpx;
    }
  }

  .selectBlock {
    height: 56rpx;
    flex-basis: 1;
    flex-shrink: 0;
    padding: 0 20rpx;
    text-align: center;
    background: #f6f7f8;
    border-radius: 32rpx;
    margin-right: 40rpx;
    font-weight: 400;
    font-size: 24rpx;
    line-height: 2.5;
    border: 2rpx solid #f6f7f8;
    color: rgba(0, 0, 0, 0.85);
  }
  .selectBlockA {
    background: #ffece5;
    border: 2rpx solid #ff6633;
    border-radius: 32rpx;
    color: #ff5319;
  }
  .more {
    font-size: 24rpx;
    display: flex;
    text-align: center;
    padding: 24rpx;
    color: rgba(0, 0, 0, 0.45);
    align-items: center;
    justify-content: center;
  }
  .transform {
    transform: rotate(180deg);
  }
  ::v-deep .page-img {
    padding-top: 0;
  }
  .p-20 {
    padding-bottom: 40rpx;
  }
</style>
