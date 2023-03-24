<template>
  <view class="data">
    <!-- title -->
    <VoNav is-have-more title="商品识别码">
    </VoNav>
    <view class="data-top">
      <image :src="goodsData.pic" class="data-top__left" />
      <view class="data-top__right">
        <view class="right-name overTwoEllipsis">
          <text v-show="goodsData.categoryType" class="good-tips font-shu-hei-ti m-r-8">
            {{ goodsData.categoryType }}
          </text>
          <text class="fz-b"> {{ goodsData.name || '暂无名称' }}</text>
        </view>
        <view class="flex">
          <view class="m-r-32 color-block-65 fz-26">
            总库存：{{ goodsData.inventory || 0 }}
          </view>
          <view class="m-r-32 color-block-65 fz-26">本地：{{ goodsData.localNumber || 0 }}</view>
        </view>
        <view class="m-t-8 color-block-65 fz-26">其他仓：{{ goodsData.otherNumber || 0 }}</view>
      </view>
    </view>
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="scroll-view overflow-y flex1"
      refresher-background="#F7F7F8"
      refresher-default-style="none"
      refresher-enabled="true"
      scroll-top="0"
      scroll-y="true"
      @refresherabort="onAbort"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @scroll="onScroll"
      @scrolltolower="scrolltolower"
    >
      <view class="data-house">
        <view class="fz-26 color-block-65">仓库：</view>
        <scroll-view
          v-if="warehouseList.length"
          class="data-house__tags"
          scroll-left="0"
          scroll-x="true"
        >
          <view
            v-for="(item, index) in warehouseList"
            :key="index"
            :class="item.choose ? 'selected' : 'un-selected'"
            class="tags-item"
            @click="warehouseClick(item)"
          >
            {{ item.warehouseName }}
          </view>
        </scroll-view>
      </view>
      <view class="data-source">
        <view class="fz-26 color-block-65">来源：</view>
        <view v-for="(info, index) in typeList" :key="index">
          <view
            :class="index === current ? 'selected' : 'un-selected'"
            class="tags-item"
            @click="typeClick(info)"
          >
            {{ info.typeName }}
          </view>
        </view>
      </view>
      <view class="data-total">
        <text>共计：</text>
        <text class="color-block-yellow">{{ dataList.length || 0 }}</text>
      </view>
      <view v-if="dataList.length" class="p-l-32 flex flex-wrap flex-vertical-c">
        <view v-for="(item, index) in dataList" :key="index" class="data-item overEllipsis"
          >{{ item }}
        </view>
      </view>
      <div v-else class="" style="margin-top: -100px; z-index: -1">
        <VoNoData no-data-tips="暂无记录" />
      </div>
    </scroll-view>
    <VoSafetyArea :is-fixed="false" />
  </view>
</template>

<script>
  // import CouponItem from './components/CouponItem'
  export default {
    name: 'IdentificationCode',
    // components: { CouponItem },
    data() {
      return {
        optionsId: '', // 商品id
        goodsData: {},
        current: 0,
        pageNo: 1, // 页数，默认值 1
        pageSize: 10, // 每页条数，默认值 10
        dataList: [], // 识别码列表
        triggered: false, // 设置当前下拉刷新状态，true下拉刷新已经被触发，false下拉刷新未被触发
        // 仓库列表
        warehouseList: [
          {
            id: 0,
            warehouseName: '全部',
            choose: true,
          },
        ],
        warehouseId: '', // 仓库id
        // 来源列表
        typeList: [
          {
            typeName: '全部',
            type: '',
            index: 0,
          },
          {
            type: 1,
            typeName: '手动入库',
            index: 1,
          },
          {
            type: 2,
            typeName: '采购入库',
            index: 2,
          },
        ],
        type: '', // 来源类型：1手动入库，2采购入库
      }
    },
    onLoad(options) {
      this.optionsId = options.id
      this.goodsData = this.$storage.get('storeGoodsData')
      console.log('11111', this.goodsData)
      this.getData(true) // 获取列表数据
      this.getWareInfo() // 获取仓库信息
    },
    methods: {
      warehouseClick(item) {
        this.warehouseId = item.warehouseId
        this.warehouseList.forEach((tag) => {
          tag.choose = item.warehouseId === tag.warehouseId ? true : false
        })
        this.getData(true)
      },
      typeClick(info) {
        console.log(info, 1111111111111111111111)
        this.current = info.index
        this.type = info.type
        this.getData(true)
      },
      //获取仓库信息
      getWareInfo() {
        let param = {
          goodId: this.optionsId,
        }
        this.$VoHttp
          .apiWarehouseStockCompanyGoodsWarehouse(param)
          .then((res) => {
            let ownWareHouse = res.data.ownWareHouse || []
            let platWareHouse = res.data.platWareHouse || []
            let factoryWareHouse = res.data.factoryWareHouse || []
            let arr = ownWareHouse.concat(platWareHouse).concat(factoryWareHouse)
            let warehouseList = arr.map((item) => {
              return {
                ...item,
                choose: false,
              }
            })
            warehouseList.unshift({
              warehouseId: 0,
              warehouseName: '全部',
              choose: true,
            })
            this.warehouseList = warehouseList
          })
          .catch((err) => {
            console.log(err)
          })
      },
      /**
       * 获取列表数据
       * @param refresh 是否刷新
       */
      getData(refresh) {
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.dataList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        if (this.optionsId) {
          params.goodsId = this.optionsId
        }
        if (this.warehouseId) {
          params.warehouseId = this.warehouseId
        }
        params['type'] = this.type
        if (this.type) {
          params.type = this.type
        }
        this.$VoHttp.WAREHOUSE.apiWarehouseOperAgentGoodsVinPage(params)
          .then((res) => {
            if (res.data) {
              this.dataList = this.dataList.concat(res.data.sortGoodsVin)
              this.total = res.data.total
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.loading = !this.loading
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
          })
      },
      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
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
            return false
          }
          this.pageNo++
          this.getData()
        }, 2000)
      },
      //自定义下拉刷新被复位
      onRestore() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onRestore下拉复位')
      },
      onScroll(e) {
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .data {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;

    &-top {
      padding: 24rpx 32rpx;
      background: #fff;
      margin-top: 16rpx;
      display: flex;

      &__left {
        width: 128rpx;
        height: 128rpx;
        border-radius: 16rpx;
        display: block;
      }

      &__right {
        flex: 1;
        margin-left: 16rpx;

        .right-name {
          font-size: 32rpx;
          line-height: 1.5;
          color: $v-c0-85;
          margin-bottom: 8rpx;
        }
      }
    }

    &-house {
      position: relative;
      z-index: 10;
      padding: 32rpx 32rpx 0 32rpx;
      display: flex;
      align-items: center;

      &__tags {
        flex: 1;
        display: flex;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    &-source {
      position: relative;
      z-index: 10;
      padding: 24rpx 32rpx 0 32rpx;
      display: flex;
      align-items: center;
    }

    &-total {
      position: relative;
      z-index: 10;
      padding: 40rpx 32rpx 0 32rpx;
      font-size: 28rpx;
      color: $v-c0-65;
    }

    &-item {
      font-size: 28rpx;
      width: 336rpx;
      height: 58rpx;
      line-height: 58rpx;
      text-align: center;
      box-sizing: border-box;
      border: 2rpx solid $v-btn-disabled;
      border-radius: 16rpx;
      margin: 16rpx 16rpx 0 0;
    }
  }

  .tags-item {
    border-radius: 200rpx;
    border: 2rpx solid #ff5319;
    height: 56rpx;
    line-height: 56rpx;
    padding: 0 24rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    margin-right: 8rpx;
    display: inline-block;

    &.selected {
      color: #ff5319;
      background-color: #ffece5;
      border: 2rpx solid #ff5319;
    }

    &.un-selected {
      background-color: #f7f7f8;
      border: 2rpx solid #f7f7f8;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .scroll-view {
    height: 100%;
    margin-top: 16rpx;
    background: #fff;
  }

  .good-tips {
    font-weight: 700;
    height: 38rpx;
    line-height: 38rpx;
    font-size: 32rpx;
    color: #F20014;
    padding: 0 4rpx;
    // background: $color-primary-yellow;
    // border-radius: 24rpx;
  }
</style>
