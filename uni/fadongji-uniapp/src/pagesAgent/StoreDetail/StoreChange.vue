<template>
  <view class="store-log">
    <view class="store">
      <VoNav :leftWidth="160" :rightWidth="160" is-fixed is-have-more title="库存变更记录">
        <view slot="operation">
          <view class="fz-32 m-r-32 color-block-65" @click="showPicker = true">筛选</view>
        </view>
      </VoNav>
      <view class="bg-white m-b-16">
        <view class="store-name color-block fz-32">
          <text v-show="categoryType" class="good-tips m-r-8">{{ categoryType }}</text>
          <text class="fz-b">{{ goodsName }}</text>
        </view>
        <view class="flex store-top">
          <view class="label flex flex-vertical-c color-block fz-30">仓库：</view>
          <view class="line" />
          <scroll-view v-if="tagList.length" class="tags" scroll-left="0" scroll-x="true">
            <view
              v-for="(item, index) in tagList"
              :key="index"
              :class="item.choosed ? 'choosed' : ''"
              class="tag-item"
              @click="tagClick(item)"
            >
              {{ item.warehouseName }}
            </view>
          </scroll-view>
        </view>
        <u-datetime-picker
          v-model="dateValue"
          :maxDate="3740967920000"
          :minDate="1640966400000"
          :show="showPicker"
          closeOnClickOverlay
          mode="year-month"
          title="选择月份"
          @cancel="showPicker = false"
          @close="showPicker = false"
          @confirm="dateConfirm"
        />
      </view>
      <view class="scroll-box bg-white border-box overflow-y">
        <scroll-view
          v-if="recordList.length > 0"
          :refresher-threshold="10"
          :refresher-triggered="triggered"
          :scroll-y="!showCode"
          class="scroll-list"
          refresher-background="#F7F7F8"
          refresher-default-style="none"
          refresher-enabled="true"
          scroll-top="0"
          @refresherabort="onAbort"
          @refresherpulling="onPulling"
          @refresherrefresh="onRefresh"
          @scroll="onScroll"
          @scrolltolower="scrolltolower"
        >
          <!-- 下拉刷新组件 -->
          <VoListFresh :show="loadingStatus" />
          <view v-for="(item, index) of recordList" :key="item.id" class="record-item">
            <u-sticky style="top: 0">
              <view class="record-item__title" @click="item.show = !item.show">
                <view class="flex flex-vertical-c fz-30">
                  <view class="m-r-8">{{ item.operMonth }}</view>
                  <!--              <VoIcon :size="12" name="open-arrow-b" />-->
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
                v-for="info of item.inOutLog"
                :key="info.id"
                :record-list="info"
                @codePopup="codePopup"
              />
            </block>
            <VoNoData v-else no-data-tips="暂无数据" />
          </view>
          <!--          <VoLoadingText :has-more="arrCount < total" :loading="loading" />-->
        </scroll-view>
        <VoNoData v-else no-data-tips="暂无数据" />
      </view>
    </view>
    <u-popup :round="10" :show="showCode" closeable mode="bottom" @close="popupClose">
      <view class="popup">
        <view class="popup-title">发动机识别码</view>
        <!-- <u-icon class="close-icon" name="close-circle" color="#333" size="28" @click="popupClose()" /> -->
      </view>
      <scroll-view
        v-if="codeList.length"
        class="popup-scroll overflow-y"
        refresher-background="#F7F7F8"
        refresher-default-style="none"
        refresher-enabled="true"
        scroll-top="0"
        scroll-y="true"
        @scrolltolower="scrolltolowerPop"
      >
        <view class="flex flex-wrap flex-vertical-c">
          <view
            v-for="(info, index) in codeList"
            :key="index + info"
            class="popup-scroll__item overEllipsis"
          >
            {{ info }}
          </view>
        </view>
      </scroll-view>
      <view v-else class="popup-box">
        <view class="popup-box__no">
          <VoNoData no-data-tips="暂无数据" />
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
  import RepairRecordItem from './components/RepairRecordItem'

  export default {
    name: 'StoreChange',
    components: { RepairRecordItem },
    data() {
      return {
        loading: false,
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        goodsName: '',
        categoryType: '',
        tagList: [
          {
            id: 0,
            warehouseName: '全部',
            choosed: true,
          },
        ],
        warehouseId: '',
        total: 0,
        pageSize: 10,
        pageNo: 1,
        recordList: [],
        goodsId: '', // 商品id
        dateValue: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm'),
        chooseDate: '',
        showPicker: false,
        showCode: false, // 发动机识别码弹出层
        codeList: [], // 发动机识别码列表
        listId: '', // 列表商品id
        arrCount: 0,
      }
    },
    onLoad(options) {
      this.goodsName = options.name || ''
      this.goodsId = options.id
      this.categoryType = options.categoryType
      this.initFn(true)
      this.getWareInfo()
    },
    methods: {
      /**
       * 点击弹出发动机识别码弹出层
       */
      codePopup(name, id) {
        console.log(this.codeList, 12121212121)
        if (name === '出库数量：' || name === '入库数量：' || name === '商品数量：') {
          this.showCode = true
          this.listId = id
          this.getData()
        }
        // if (this.codeList.length > 0 && name) {
        // }
      },
      /**
       * 发动机识别码弹出层关闭事件
       */
      popupClose() {
        this.showCode = false
        console.log('close')
      },
      dateConfirm(e) {
        this.chooseDate = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm')
        console.log(e, this.chooseDate)
        this.showPicker = false
        this.initFn(true)
      },
      tagClick(item) {
        console.log('tagClick=======', item)
        this.warehouseId = item.warehouseId
        this.tagList.forEach((tag) => {
          tag.choosed = item.warehouseId === tag.warehouseId ? true : false
        })
        this.initFn(true)
      },
      //获取仓库信息
      getWareInfo() {
        let param = {
          goodId: this.goodsId,
        }
        this.$VoHttp
          .apiWarehouseStockCompanyGoodsWarehouse(param)
          .then((res) => {
            let ownWareHouse = res.data.ownWareHouse || []
            let platWareHouse = res.data.platWareHouse || []
            let factoryWareHouse = res.data.factoryWareHouse || []
            let arr = ownWareHouse.concat(platWareHouse).concat(factoryWareHouse)
            let tagList = arr.map((item) => {
              return {
                ...item,
                choosed: false,
              }
            })
            tagList.unshift({
              warehouseId: 0,
              warehouseName: '全部',
              choosed: true,
            })
            this.tagList = tagList
          })
          .catch((err) => {
            console.log(err)
          })
      },
      /**
       * 获取发动机识别码列表数据
       */
      getData() {
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        if (this.listId) {
          params.id = this.listId
        }
        this.$VoHttp.WAREHOUSE.apiWarehouseOper$Id(params)
          .then((res) => {
            if (res.data) {
              this.codeList = res.data.sortGoodsVin || []
              // this.total = res.data.total
              // this.triggered = false
              // this.refresh = false
              // this.loadingStatus = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            // this.triggered = false
            // this.refresh = false
            // this.loadingStatus = false
          })
      },
      initFn(init) {
        if (this.loading) return
        if (init) {
          this.pageNo = 1
          this.recordList = []
        }
        let param = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          logisticsStatus: 2,
        }
        if (this.goodsId) {
          param.goodsId = this.goodsId
        }
        if (this.warehouseId) {
          param.warehouseId = this.warehouseId
        }
        if (this.chooseDate) {
          param.selectMonth = this.chooseDate
        }
        this.loading = true
        this.$VoHttp.WAREHOUSE.apiWarehouseOperSupplierLogisticsInout(param)
          .then((res) => {
            if (res.data.records.length < 1 && param.selectMonth) {
              let selectMonth = param.selectMonth.replace('-', '月') + '日'
              this.recordList.push({
                operMonth: selectMonth,
              })
            } else
              res.data.records.map((item) => {
                item.show = true
                if (this.recordList && this.recordList.length > 0) {
                  let beforeData = this.recordList[this.recordList.length - 1]

                  if (beforeData.operMonth == item.operMonth) {
                    item.operMonth = ''
                    this.recordList.map((r) => {
                      r.inOutLog = r.inOutLog.concat(item.inOutLog)
                    })
                  } else {
                    this.recordList.push(item)
                  }
                } else {
                  this.recordList.push(item)
                }
              })
            this.total = res.data.total
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
            console.log(e)
          })
          .finally(() => {
            this.loading = false
            this.refresh = false
            this.triggered = false
            this.loadingStatus = false
          })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        // this.loadingStatus = true
        // if (this.loadingStatus) return
        // if (this.scrollTop === 0) {
        if (this.refresh) return
        this.refresh = true
        this.triggered = true
        this.loadingStatus = true
        this.initFn(true)
        // }
      },
      //滚到底部加载
      scrolltolower() {
        if (this.loadingStatus) return
        this.loadingStatus = true
        console.log('底部加载', this.recordList)
        this.refresh = false
        this.recordList.forEach((item) => {
          this.arrCount = this.arrCount + item.inOutLog.length
        })
        console.log(this.arrCount)
        if (this.arrCount >= this.total) {
          uni.$u.toast('没有更多了')
          return false
        }
        this.pageNo++
        this.initFn()
      },
      //滚到底部加载
      scrolltolowerPop() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.codeList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.getData()
        }, 2000)
      },
      //自定义下拉刷新被复位

      //自定义下拉刷新被中止
      onAbort() {
        this.triggered = false // 需要重置
        this.loadingStatus = false
        console.log('onAbort')
      },
      onScroll(e) {
        // console.log(111, e.detail)
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
    },
  }
</script>
<style lang="scss">
  .store-log {
    .u-popup__content {
      overflow: hidden !important;
    }
  }
</style>
<style lang="scss" scoped>
  .close-icon {
    position: absolute;
    right: 20rpx;
    top: 20px;
  }

  .store {
    display: flex;
    flex-direction: column;
    height: 100vh;

    &-name {
      padding: 40rpx 32rpx 24rpx 32rpx;
      box-sizing: border-box;
      border-bottom: 1px solid #f7f7f8;
    }

    .line {
      width: 1px;
      margin: 8rpx 0;
      background-color: #f7f7f8;
      margin-right: 28rpx;
    }

    &-top {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }

    .tags {
      flex: 1;
      display: flex;
      white-space: nowrap;
      overflow: hidden;

      &-right {
        padding-left: 16rpx;
        padding-right: 16rpx;
        border-left: 1px solid #f7f7f8;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        &__icon {
          width: 48rpx;
          height: 48rpx;
        }

        &__badge {
          position: absolute;
          width: 30rpx;
          height: 30rpx;
          right: 16rpx;
          top: -10rpx;
          background: #e50012;
          border-radius: 8px;
          font-size: 20rpx;
          line-height: 30rpx;
          color: #ffffff;
          text-align: center;
        }

        &__text {
          font-size: 26rpx;
          line-height: 1.5;
          color: $v-c0-45;
          padding-right: 8rpx;
        }
      }
    }

    .tag-item {
      display: inline-block;
      background-color: #f7f7f8;
      padding: 7rpx 16rpx;
      text-align: center;
      border-radius: 100px;
      font-size: 24rpx;
      line-height: 1.5;
      color: $v-c0-85;
      border: 1px solid #f7f7f8;
      margin-right: 28rpx;

      &.choosed {
        background: $v-tags-btn-disabled;
        border: 1px solid $color-primary-yellow;
        color: $color-primary-yellow;
      }

      .item-title {
        font-weight: bold;
      }
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

    .scroll-box {
      flex: 1;
      flex-shrink: 0;
    }

    .scroll-list {
      height: 100%;
      background: #fff;
    }
  }

  .popup {
    position: relative;

    &-title {
      padding: 24rpx 0;
      text-align: center;
      border-bottom: 2rpx solid $v-bg-light;
      font-size: 32rpx;
      font-weight: bold;
      color: $v-c0-85;
    }

    &-scroll {
      // height: 100%;
      margin-top: 32rpx;
      padding-left: 32rpx;
      height: 600rpx;
      // flex: 1;
      &__item {
        font-size: 28rpx;
        width: 336rpx;
        height: 58rpx;
        line-height: 58rpx;
        text-align: center;
        box-sizing: border-box;
        border: 2rpx solid $v-btn-disabled;
        border-radius: 8px;
        margin: 0 16rpx 16rpx 0;
      }
    }

    &-box {
      height: 600rpx;
      overflow: hidden;
      padding-bottom: 60rpx;

      &__no {
        margin-top: -200rpx;
      }
    }
  }

  .good-tips {
    font-weight: normal;
    font-size: 24rpx;
    color: #fff;
    padding: 2rpx 12rpx;
    background: $color-primary-yellow;
    border-radius: 24rpx;
  }
</style>
