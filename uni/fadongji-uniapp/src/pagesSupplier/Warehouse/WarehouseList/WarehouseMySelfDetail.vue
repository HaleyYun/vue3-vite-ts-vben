<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="ware flex"
    >
      <VoNav :is-fixed="false" :left-width="88" :right-width="88" is-have-more>
        <template #title>
          <view class="text-left overEllipsis">
            {{ warehouseName }}
          </view>
        </template>
      </VoNav>

      <view class="ware-search">
        <VoSearch v-model="keyword" height="34" @custom="updateFn" @search="updateFn" />
      </view>

      <EraTabs
        :current="current"
        :list="tabList"
        :scrollable="false"
        activeStyle="font-weight: bold;color: #FF5319;"
        class="ware-tab"
        inactiveStyle="font-weight: 400;font-size: 14px;color: rgba(0, 0, 0, 0.45);"
        line-color="#FF5319"
        @click="changeTabFn"
      />

      <swiper :current="current" class="flex1" @change="changeSwiperFn">
        <swiper-item>
          <InStock :is-self="isSelf" :list="tabList[0].list" @reachBottom="reachBottom" />
        </swiper-item>
        <swiper-item>
          <InTransit :is-self="isSelf" :list="tabList[1].list" @reachBottom="reachBottom" />
        </swiper-item>
      </swiper>
    </view>

    <WarnSetting :editData="editData" :show.sync="showSettingVal" @updateFn="updateFn" />
  </view>
</template>

<script>
  import InStock from '@/pagesSupplier/Warehouse/WarehouseList/components/InStock'
  import InTransit from '@/pagesSupplier/Warehouse/WarehouseList/components/InTransit'
  import WarnSetting from '@/pagesSupplier/Warehouse/WarehouseList/components/WarnSetting'

  export default {
    name: 'WarehouseDetail',
    components: { WarnSetting, InTransit, InStock },
    data() {
      return {
        keyword: '',
        isSelf: '',
        warehouseName: '',
        warehouseId: '', // 仓库id
        // 是否展示预警设置
        showSettingVal: false,
        current: 0,
        tabList: [
          {
            name: '库存',
            pageNo: 1,
            pageSize: 10,
            total: 0,
            list: [],
          },
          {
            name: '在途',
            pageNo: 1,
            pageSize: 10,
            total: 0,
            list: [],
          },
        ],
        editData: {},
      }
    },
    methods: {
      /**
       *  新建仓库
       */
      addWarehouseFn() {
        console.log('555555555555555')
        this.$linkToEasy('/pagesSupplier/Warehouse/WarehouseList/AddWarehouse')
      },
      /**
       * swiper滑动事件
       */
      changeSwiperFn(e) {
        this.current = e.detail.current
      },
      /**
       * 点击tab事件
       * @param e  触发的事件
       */
      changeTabFn(e) {
        this.current = e.index
        if (this.current === 0) {
          this.initStockFn('init')
        } else {
          this.initTransitFn('init')
        }
      },
      /**
       * 获取在库商品
       */
      initStockFn(init) {
        if (init) {
          this.tabList[0].list = []
          this.tabList[0].pageNo = 1
        }
        let param = {
          keyword: this.keyword,
          logisticsStatus: 2,
          warehouseId: this.warehouseId,
          pageSize: this.tabList[0].pageSize,
          pageNo: this.tabList[0].pageNo,
        }
        this.$VoHttp.apiWarehouseStockAppPage(param).then((res) => {
          this.tabList[0].total = res.data.total
          res.data.records.map((item) => {
            item.pic = JSON.parse(item.pic)
            this.tabList[0].list.push(item)
          })
          if (init) {
            this.tabList[0].name = '库存' + '(' + this.tabList[0].total + ')'
          }
        })
      },
      /**
       * 获取在途商品
       */
      initTransitFn(init) {
        if (init) {
          this.tabList[1].list = []
          this.tabList[1].pageNo = 1
        }
        let param = {
          keyword: this.keyword,
          logisticsStatus: 1,
          warehouseId: this.warehouseId,
          pageSize: this.tabList[1].pageSize,
          pageNo: this.tabList[1].pageNo,
        }
        this.$VoHttp.apiWarehouseStockAppPage(param).then((res) => {
          console.log(res.data.records, 'sss')
          this.tabList[1].total = res.data.total
          res.data.records.map((item) => {
            item.pic = JSON.parse(item.pic)
            this.tabList[1].list.push(item)
          })

          if (init) {
            this.tabList[1].name = '在途' + '(' + this.tabList[1].total + ')'
          }
        })
      },
      /**
       * 分页
       */
      reachBottom() {
        if (this.tabList[this.current].total > this.tabList[this.current].list.length) {
          this.tabList[this.current].pageNo++
          if (this.current === 0) {
            this.initStockFn()
          } else {
            this.initTransitFn()
          }
        }
      },
      /**
       * 操作预警设置
       */
      updateFn() {
        this.showSettingVal = false
        if (this.current === 0) {
          this.initStockFn('init')
        } else {
          this.initTransitFn('init')
        }
      },
    },
    onLoad(options) {
      this.isSelf = Number(options.isSelf)
      this.warehouseId = options.warehouseId
      this.warehouseName = options.warehouseName

      uni.$on('warnFn', (res) => {
        this.editData = res.item
        this.showSettingVal = true
      })
    },
    async onShow() {
      await this.initStockFn('init')
      await this.initTransitFn('init')
    },
    onUnLoad() {
      uni.$off('warnFn')
    },
  }
</script>

<style lang="scss" scoped>
  .ware {
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    &-search {
      width: 750rpx;
      height: 88rpx;
      padding: 0rpx 32rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }
    &-operate {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .p-zero {
        padding: 0rpx !important;
      }
      .more-icon {
        margin-left: 28rpx;
      }
    }
    &-tab {
      width: 750rpx;
      background-color: #ffffff;
      z-index: 2;
    }
    &-group {
      width: 750rpx;
      height: 128rpx;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      padding: 0rpx 16rpx;
      justify-content: space-between;
    }
  }
  .tooltip-box {
    font-size: 28rpx;
    color: #ffffff;
    text-align: center;
    height: 80rpx;
    line-height: 80rpx;
    border-bottom: 2rpx solid #7a7a7a;
    &:last-child {
      border-bottom: 0rpx !important;
    }
  }
</style>
