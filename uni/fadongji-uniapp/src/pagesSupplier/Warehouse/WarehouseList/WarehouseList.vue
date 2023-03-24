<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="ware flex"
    >
      <VoNav :is-fixed="false" :left-width="240" :right-width="240" is-have-more>
        <template #title>仓储</template>
        <template #operation>
          <view class="ware-operate">
            <VoTooltip
              :arrowStyleSelf="{ left: '36px' }"
              :padding="8"
              class="fz-0"
              placement="bottom"
            >
              <view slot="content">
                <view
                  class="tooltip-box"
                  @click="
                    $linkToEasy('/pagesSupplier/Warehouse/WarehouseList/WarehouseAllotRecordList')
                  "
                  >调拨记录</view
                >
                <view
                  class="tooltip-box"
                  @click="
                    $linkToEasy('/pagesSupplier/Warehouse/WarehouseList/WarehouseRepairRecordList')
                  "
                  >补货记录</view
                >
                <view
                  class="tooltip-box"
                  @click="$linkToEasy('/pagesSupplier/Warehouse/WarehouseList/WarehouseRecordList')"
                  >库存操作记录</view
                >
              </view>
              <view class="ware-btn m-r-24 fz-b">仓库日志</view>
              <!--              <EraButton :font-size="24" class="p-zero m-r-28" size="nav-mini" them-type="Default"-->
              <!--                >仓库日志</EraButton-->
              <!--              >-->
            </VoTooltip>
          </view>
        </template>
      </VoNav>

      <EraTabs
        :current="current"
        :lineBottom="0"
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
          <BizWarehouse
            v-if="bizInfo.list.length > 0"
            :bizList="bizInfo.list"
            @initData="initDataFn"
            @reachBottom="reachBottomFn"
          />
          <vo-no-data v-else img-url="/static/noData/noWarehouse.png" no-data-tips="暂无仓库" />
        </swiper-item>
        <swiper-item>
          <PlatWarehouse v-if="platInfo.list.length > 0" :plat-list="platInfo.list"  @reachBottom="reachBottomFn" />
          <vo-no-data v-else img-url="/static/noData/noWarehouse.png" no-data-tips="暂无仓库" />
        </swiper-item>
      </swiper>

      <VoSafetyArea :is-fixed="false" v-if="+current===0">
        <block slot="group">
          <view class="ware-group">
            <EraButton :font-size="32" size="lg" theme-type="Wire" @click.native="addWarehouseFn"
              >新建仓库</EraButton
            >
<!--            <EraButton :font-size="32" size="small" theme-type="Wire" @click="goReceipt"-->
<!--              >退货入库单</EraButton-->
<!--            >-->
          </view>
        </block>
      </VoSafetyArea>
    </view>
  </view>
</template>

<script>
  import BizWarehouse from '@/pagesSupplier/Warehouse/WarehouseList/components/BizWarehouse'
  import PlatWarehouse from '@/pagesSupplier/Warehouse/WarehouseList/components/PlatWarehouse'

  export default {
    name: 'WarehouseList',
    components: { PlatWarehouse, BizWarehouse },
    data() {
      return {
        bizInfo: {
          list: [],
          pageNo: 1,
          pageSize: 10,
          total: 0,
          type: '1',
        },
        platInfo: {
          list: [],
          pageNo: 1,
          pageSize: 10,
          total: 0,
          type: '0',
        },
        current: 0,
        tabList: [{ name: '我的仓库' }, { name: '平台仓' }],
      }
    },
    methods: {
      /**
       * 删除之后初始化
       */
      initDataFn() {
        this.initBizFn('init')
      },
      /**
       * 我的仓库列表
       */
      initBizFn(init) {
        if (init === 'init') {
          this.bizInfo.list = []
        }
        let param = {
          type: this.bizInfo.type,
          pageSize: this.bizInfo.pageSize,
          pageNo: this.bizInfo.pageNo,
        }

        this.$VoHttp.apiWarehousePage(param).then((res) => {
          res.data.records.map((item) => {
            this.bizInfo.list.push(item)
          })
          this.bizInfo.total = res.data.total
        })
      },
      /**
       * 平台仓
       */
      initPlatFn(init) {
        if (init === 'init') {
          this.platInfo.list = []
        }
        let param = {
          type: this.platInfo.type,
          pageSize: this.platInfo.pageSize,
          pageNo: this.platInfo.pageNo,
        }

        this.$VoHttp.apiWarehousePage(param).then((res) => {
          res.data.records.map((item) => {
            this.platInfo.list.push(item)
          })
          this.platInfo.total = res.data.total
        })
      },
      /**
       *  退货入库单
       */
      goReceipt() {
        this.$linkToEasy('/pagesSupplier/Warehouse/WarehouseList/WarehouseReturnReceipt')
      },
      /**
       *  新建仓库
       */
      addWarehouseFn() {
        //暂存当前页面信息，方便跳转
        this.$storage.set('AddWarehouseOriginPath', this.getCurrentPageRoute())
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
      },
      reachBottomFn(){
        if (this.current === 0) {
          //我的仓库加载更多
          if (this.bizInfo.list.length < this.bizInfo.total) {
            this.bizInfo.pageNo++
            this.initBizFn()
          }
        } else {
          //平台仓加载更多
          if (this.platInfo.list.length < this.platInfo.total) {
            this.platInfo.pageNo++
            this.initPlatFn()
          }
        }
      }
    },
    async onShow() {
      await this.initBizFn('init')
      await this.initPlatFn('init')
    }
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
      padding: 20rpx 32rpx;
      display: flex;
      box-sizing: border-box;
      align-items: center;
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
  .ware-btn {
    padding: 10rpx 24rpx;
    font-size: 24rpx;
    color: #ff5319;
    border: 2rpx solid #ffa98c;
    border-radius: 200rpx;
    line-height: 150%;
  }
</style>
