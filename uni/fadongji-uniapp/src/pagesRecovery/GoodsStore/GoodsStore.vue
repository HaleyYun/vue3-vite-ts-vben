<template>
  <view>
    <view class="good">
      <VoNav :rightWidth="200" is-fixed is-have-more title="商品库存">
      </VoNav>
      <view class="top-search flex">
        <view class="flex1">
          <VoSearch
            v-model="keyword"
            height="34"
            borderColor="#FF5319"
            bgColor="#fff"
            :actionStyle="{color:'#fff'}"
            :showInsideAction="true"
            placeholder="请输入搜索"
            @change="change"
          />
        </view>
        <view
          class="flex flex-vertical-c m-l-48"
          @click="$linkToEasy('/pagesRecovery/GoodsStore/AddWarehouse')"
        >
          <view class="fz-26 color-block-45 m-r-8">仓库设置</view>
          <VoIcon :opacity="0.85" :size="20" color="#000000" name="setting-user" />
        </view>
      </view>
      <view class="good-tabs">
        <EraTabs
          :current="current"
          :list="tabsList"
          activeStyle="font-size: 32rpx;color: #FF5319;font-weight:bold;"
          class="tabs"
          inactiveStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.45);"
          itemStyle="padding: 24rpx 24rpx 30rpx 24rpx;"
          @change="tabChange"
        />
      </view>

      <swiper :current="current" class="swiper" @change="swiperChange">
        <swiper-item v-for="(item, index) in tabsList" :key="index" class="swiper-item">
          <scroll-view
            :refresher-threshold="10"
            :refresher-triggered="triggered"
            :scroll-y="true"
            class="scroll-list"
            refresher-background="#F7F7F8"
            refresher-default-style="none"
            refresher-enabled="true"
            scroll-top="0"
            @refresherabort="onAbort"
            @refresherpulling="onPulling"
            @refresherrefresh="onRefresh"
            @refresherrestore="onRestore"
            @scroll="onScroll"
            @scrolltolower="scrolltolower"
          >
            <!-- 下拉刷新组件 -->
            <VoListFresh :show="loadingStatus" />
            <GoodsStoreItem
              v-for="listItem in goodDataList"
              :key="listItem.id"
              :dataObj="listItem"
              @enterWare="enterWare(listItem)"
              @outWare="outWare(listItem)"
            />
            <view class="p-b-50 p-t-50">
              <u-loadmore
                v-if="noMore"
                color="rgba(0, 0, 0, 0.45)"
                line
                lineColor="rgba(0, 0, 0, 0.08)"
                nomore-text="暂无更多内容"
                status="nomore"
              />
            </view>

            <VoNoData v-if="!goodDataList.length && !refresh" no-data-tips="暂无数据" />
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
    <VoModal
      v-if="modalVisible"
      v-show="modalVisible"
      :show="modalVisible"
      showCancelButton
      @cancel="cancelHandler"
      @confirm="confirmFn"
    >
      <view v-if="operationData" class="modal-content color-block">
        <view class="font-weight-500 p-b-48 text-center fz-32">{{ operationData.name }}</view>
        <block v-for="(item, index) in operationData.levelVOS" :key="index">
          <view class="modal-content__row">
            <view class="flex">
              <view class="font-weight-500 m-r-48 fz-32">{{ item.level || 0 }}类</view>
              <!-- #ifdef H5 -->
              <u--input
                type="number"
                maxlength="10"
                border="none"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                v-model="item.changeNumber"
                class="border-bottom fz-32"
                placeholder="请输入"
                placeholder-class="color-block-45"
                @input="checkedVal"
                :formatter="formatterInt"
              />
              <!-- #endif -->
              <!-- #ifdef APP-PLUS -->
              <u--input
                type="number"
                maxlength="10"
                border="none"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                v-model="item.changeNumber"
                class="border-bottom fz-32"
                placeholder="请输入"
                placeholder-class="color-block-45"
                @input="checkedVal"
              />
              <!-- #endif -->
            </view>
            <view class="text-right fz-28">总库存：{{ item.availableNumber || 0 }}</view>
          </view>
        </block>
        <!--        <view v-if="operationType === 'out'" class="fz-28 tip">请至少填写一个成色商品出库数量</view>-->
        <!--        <view v-if="operationType === 'in'" class="fz-28 tip">出库数量不能大于仓库总库存</view>-->
        <view v-if="operationType === 'out' && showTips" class="fz-28 tip">
          <block v-if="!+operationData.levelVOS[0].changeNumber && !+operationData.levelVOS[1].changeNumber && !+operationData.levelVOS[2].changeNumber">
            请至少填写一个成色商品出库数量
          </block>
          <block v-else> 出库数量不能大于仓库总库存 </block>
        </view>
        <view v-if="operationType === 'in' && showTips" class="fz-28 tip">请至少填写一个成色商品入库数量</view>
      </view>
    </VoModal>
  </view>
</template>
<script>
  import GoodsStoreItem from './components/GoodsStoreItem.vue'
  import { formatterHandle } from "@/common/helper";

  export default {
    name: 'MyGoods',
    components: { GoodsStoreItem },
    data() {
      return {
        showTips: false, // 校验提示
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        noMore: false,
        isLoading: false,
        keyword: '',
        current: 0,
        tabsList: [],
        goodDataList: [],
        tabData: {},
        operationData: {},
        operationType: '',
        modalVisible: false,
        //出入库弹框数据
        alertData: {},
        formData: {
          typeA: '',
          typeB: '',
          typeC: '',
        },
      }
    },
    watch: {},
    onLoad() {
      this.getSaleGoodList()
    },
    methods: {
      formatterInt: (value) => formatterHandle(value, 'int'),
      cancelHandler() {
        this.modalVisible = false

        const tmpOperate = {
          ...this.operationData,
          levelVOS: this.operationData.levelVOS.map((l) => {
            return {
              ...l,
              changeNumber: '',
            }
          }),
        }
        this.operationData = null
        this.operationData = tmpOperate
        console.log(this.operationData)
      },
      toDetail(item) {
        this.$linkToEasy('/pagesSupplier/GoodsManage/GoodsDetail?id=' + item.id)
      },
      //tab点击
      tabChange(tab) {
        this.current = tab.index
      },
      //swiper切换
      swiperChange(event) {
        this.current = event.detail.current
        this.tabData = this.tabsList[this.current]
        this.refresh = true
        this.getSaleGoodList()
      },
      //搜索框
      change(value) {
        this.keyword = value
        this.refresh = true
        this.getSaleGoodList()
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
      },
      onScroll(e) {
        this.scrollTop = e.detail.scrollTop
      },
      //自定义下拉刷新被触发
      onRefresh() {
        console.log('onRefresh下拉刷新')
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.getSaleGoodList()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.goodDataList.length >= this.total) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.getSaleGoodList()
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
      //商品列表请求
      getSaleGoodList() {
        let isfresh = this.refresh
        if (isfresh) {
          this.goodDataList = []
          this.pageNo = 1
        }
        console.log(123);
        let param = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          orderProperty: 'update_time',
          orderType: 'DESC',
        }
        param.keyword = this.keyword
        if (this.tabData.statisticCode) {
          param.status = this.tabData.statisticCode
        }
        this.$VoHttp
          .apiGoodsRecycleResaleForSaleList(param)
          .then((res) => {
            if (res.code === '20001') {
              this.processTabData(res.data.statistics)
              let resultData = res.data.pageResult.records
              this.total = res.data.pageResult.total
              this.goodDataList = this.goodDataList.concat(resultData)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
            } else {
              uni.$u.toast(res.message || '预售商品获取失败')
              this.loadingStatus = false
              this.triggered = false
              this.refresh = false
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '预售商品失败')
            this.loadingStatus = false
            this.triggered = false
            this.refresh = false
          })
      },
      //处理顶部tab栏显示数据
      processTabData(data) {
        this.tabsList = []
        let totalCount = ''
        data.forEach((item) => {
          if (item.statisticName) {
            let count = 0
            if (item.statisticCount && item.statisticCount > 0) {
              count = item.statisticCount
            }
            totalCount = Number(totalCount) + Number(item.statisticCount)
            let name = item.statisticName
            let param = { name: name, statisticCode: item.statisticCode, count: count }
            this.tabsList.push(param)
          }
        })
        this.tabsList.splice(0, 0, { name: '全部' + '(' + totalCount + ')' })
      },
      //出库
      outWare(listItem) {
        this.operationData = {
          ...listItem,
          levelVOS: listItem.levelVOS.map((item) => {
            return {
              ...item,
              changeNumber: '',
            }
          }),
        }
        this.operationType = 'out'
        this.modalVisible = true
        this.checkedVal()
      },
      //ru库
      enterWare(listItem) {
        this.operationData = listItem
        this.operationType = 'in'
        this.modalVisible = true
        this.checkedVal()
      },

      // 检查出入库数据
      checkedVal() {
        const item1 = this.operationData.levelVOS[0]
        const item2 = this.operationData.levelVOS[1]
        const item3 = this.operationData.levelVOS[2]
        // #ifdef APP-PLUS
        this.operationData.levelVOS.forEach((item) => {
          if (item.changeNumber && +item.changeNumber > 0) {
            let val = item.changeNumber.toString().replace(/[^\d^\.]+/g, '')
            val = val.replace(/\b(0+)/gi, '')
            item.changeNumber = parseInt(val)
          }
        })
        // #endif
        console.log(item1);
        console.log(item2);
        console.log(item3);
        this.showTips = !+item1.changeNumber && !+item2.changeNumber && !+item3.changeNumber
        if (this.operationType === 'out') {
          // <view v-if="operationType === 'out'" className="fz-28 tip">出库数量不能大于仓库总库存</view>
          // <view v-if="operationType === 'in'" className="fz-28 tip">请至少填写一个成色商品出库数量</view>
          if (+item1.changeNumber + +item2.changeNumber + +item3.changeNumber > 0) {
            this.showTips =
              item1.changeNumber > item1.availableNumber ||
              item2.changeNumber > item2.availableNumber ||
              item3.changeNumber > item3.availableNumber
          }
        }
      },
      confirmFn() {
        if (this.showTips) {
          this.$u.toast('请输入正确的出入库数量')
          return
        }
        this.modalVisible = false
        let boList = []
        let count = 0
        this.operationData.levelVOS.forEach((item) => {
          let param = {
            goodsId: item.id,
            changeNumber: item.changeNumber,
          }
          count = count + Number(item.changeNumber)
          boList.push(param)
        })
        const levelVOS = this.operationData.levelVOS
        const flag = levelVOS.every((item) => {
          return +item.changeNumber <= item.number
        })
        if (!flag) {
          this.modalVisible = true
          this.$u.toast('出库数量不能大于仓库物理库存')
          return
        }
        if (count <= 0) {
          this.$u.toast('请填写至少一个成色商品数量')
          return
        }
        if (this.operationType === 'in') {
          this.getInWarehouseRequest(boList)
          return
        }
        if (this.operationType === 'out') {
          this.getOutWarehouseRequest(boList)
          return
        }
      },
      //入库请求
      getInWarehouseRequest(param) {
        this.$VoHttp
          .apiWarehouseOperRecyclingSelfRefillBatch({ boList: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast(res.message || '商品入库成功')
              this.refresh = true
              this.getSaleGoodList()
            } else {
              uni.$u.toast(res.message || '商品入库失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '商品入库失败')
          })
      },
      //出库请求
      getOutWarehouseRequest(param) {
        this.$VoHttp
          .apiWarehouseOperRecyclingSelfOutBatch({ boList: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast(res.message || '商品出库成功')
              this.refresh = true
              this.getSaleGoodList()
            } else {
              uni.$u.toast(res.message || '商品出库失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '商品出库失败')
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .good {
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    background: #f7f7f8;

    .nav-right {
      display: flex;
      width: auto;

      &__btn {
        background: #22284b;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        color: #ffffff;
        padding: 14rpx 36rpx;
        text-align: center;
        margin-right: 24rpx;
      }
    }

    &-tabs {
      background-color: #ffffff;
    }

    .top-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }

    .swiper {
      flex: 1;

      &-item,
      .scroll-list {
        height: 100%;
      }
    }
  }

  .modal-content {
    // padding: 40rpx 64rpx;
    box-sizing: border-box;

    &__row {
      padding-bottom: 48rpx;
    }

    .tip {
      color: #ee0a24;
    }
  }
</style>
