<template>
  <view>
    <view class="good">
      <!-- <VoNav :leftWidth="250" :rightWidth="250" is-fixed is-have-more title="库存明细">

        <block slot="operation">
          <view class="good-guide" @click="goTransferRecord">调拨记录</view>
        </block>
      </VoNav> -->
      <view class="order-top">
        <VoNav :is-fixed="false" isHaveMore>
          <block slot="title">
            <view class="flex">
              <EraTabs
                :current="navCurrent"
                :list="navList"
                activeStyle="color:rgba(0, 0, 0, 0.85);font-size: 36rpx;"
                class="flex flex-justify-c"
                inactiveStyle="color: rgba(0, 0, 0, 0.45);font-weight: 400;"
                lineColor="transparent"
                @click="navTab"
              />
            </view>
          </block>
        </VoNav>
      </view>
      <view class="top-search">
        <VoSearch
          v-model="keyword"
          height="34"
          bgColor="#fff"
          placeholder="请输入搜索"
          borderColor="#FF5319"
          :showInsideAction="true"
          @custom="getData(true)"
          @search="getData(true)"
        />
      </view>
      <view v-show="navCurrent === 0" class="good">
        <view class="good-tabs bg-white flex-justify-around">
          <!-- <view v-for="(item, index) of tabs" :key="index">
            <view
              :class="index === current ? 'selected' : 'un-selected'"
              class="good-tabs__item"
              @click="tabsClick(item)"
            >
              {{ item.name }}
            </view>
          </view> -->
          <EraTabs
            :current="current"
            :scrollable="false"
            :list="tabs"
            activeStyle="font-size: 32rpx;color: #FF5319;"
            class="tabs"
            inactiveStyle="font-size: 28rpx;rgba(0,0,0,0.45)"
            itemStyle="height:96rpx;"
            @change="tabChange"
          />
        </view>
        <view v-if="current === 3" class="fliter-tags">
          <view class="tags">
            <!-- <view
        v-for="(item, index) in tagList"
        v-show="current === 2"
        :key="item.name"
        :class="item.choosed ? 'choosed' : ''"
        class="tag-item"
        @click="tagClick(item)"
        >
        {{ item.name }}
            </view> -->
            <view
              v-for="item in tagListOut"
              v-show="current === 3"
              :key="item.value"
              :class="item.choosed ? 'choosed' : ''"
              class="tag-item"
              @click="tagRuleClick(item)"
            >
              {{ item.name }}
            </view>
          </view>
        </view>
        <view class="flex flex-vertical-c flex-justify-between">
          <view class="m-l-32 m-r-32 fz-24 m-t-16 m-b-16 color-block-65">{{ goodCount }}</view>
          <view class="good-guide m-t-16 m-b-16" @click="goTransferRecord">调拨记录</view>
        </view>
        <swiper :current="current" class="swiper" @change="swiperChange">
          <swiper-item v-for="(item, index) of tabs" :key="index" class="swiper-item">
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
              <GoodsItem
                v-for="(listItem, listItemIndex) of infoList"
                :key="listItemIndex"
                ref="goodsItem"
                :dataObj="listItem"
                :selectAll="isSelectAll"
                :selectAllCancel="isSelectAllCancel"
                @click="toDetail(listItem)"
              />
              <VoNoData v-if="!infoList.length && !refresh" no-data-tips="暂无数据" />
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
      <view v-show="navCurrent === 1" class="good">
        <view class="flex flex-vertical-c">
          <view class="m-l-32 m-r-32 fz-24 m-t-16 m-b-16 color-block-65">{{ goodCount }}</view>
        </view>
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
          <GoodsItemDis
            v-for="(listItem, listItemIndex) of infoList"
            :key="listItemIndex"
            ref="goodsItem"
            :dataObj="listItem"
            :selectAll="isSelectAll"
            :selectAllCancel="isSelectAllCancel"
          />
          <VoNoData v-if="!infoList.length && !refresh" no-data-tips="暂无寄售商品" />
        </scroll-view>
      </view>

      <GoodsPop ref="goodsPop" />
    </view>
    <!-- <BottomOperation
	  ref="bottomOperation"
	  :status="goodStatus"
	  @select="selectAll"
	  @selectAllCancel="selectAllCancel"
	  @deleteFn="deleteFn"
	  @soldOut="soldOut"
	  @soldUp="soldOut('up')"
	/> -->
    <SuccessPop ref="successPop" />
    <ReasonModal ref="reasonModal" />
  </view>
</template>
<script>
  import GoodsItem from './components/GoodsItem.vue'
  import GoodsItemDis from './components/GoodsItemDis.vue'
  import GoodsPop from './components/GoodsPop.vue'
  import BottomOperation from './components/BottomOperation.vue'
  import SuccessPop from './components/SuccessPop.vue'
  import ReasonModal from './components/ReasonModal.vue'
  import helper from '@/common/helper'
  // import ModifyPopup from './components/ModifyPopup.vue'

  export default {
    name: 'MyGoods',
    components: {
      GoodsItem,
      GoodsItemDis,
      GoodsPop,
      BottomOperation,
      SuccessPop,
      ReasonModal,
    },
    data() {
      return {
        showModify: false,
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,

        isLoading: false,
        keyword: '',
        current: 0,
        navCurrent: 0,
        tabSelected: 0,
        tabs: [
          {
            name: '全部',
            num: '',
            value: '',
            index: 0,
          },
          {
            name: '在售',
            num: '',
            value: 1,
            index: 1,
          },
          // {
          //   name: '待审核',
          //   num: '',
          //   value: 2,
          //   index: 1,
          // },
          {
            name: '待售',
            num: '',
            value: 3,
            index: 2,
          },
          {
            name: '违规',
            num: '',
            value: 4,
            index: 3,
          },
        ],
        tagList: [
          {
            name: '全部商品',
            choosed: true,
          },
          {
            name: '审核中',
            choosed: false,
            value: 1,
          },
          {
            name: '审核未通过',
            choosed: false,
            value: 2,
          },
        ],
        tagListOut: [
          {
            name: '全部商品',
            choosed: true,
          },
          {
            name: '待整改',
            choosed: false,
            value: 3,
          },
          {
            name: '审核中',
            choosed: false,
            value: 4,
          },
          {
            name: '审核未通过',
            choosed: false,
            value: 5,
          },
        ],
        infoList: [
          // {
          //   id: '11',
          //   status: 1,
          // },
          // {
          //   id: '22',
          //   status: 2,
          // },
          // {
          //   id: '33',
          //   status: 3,
          // },
          // {
          //   id: '44',
          //   status: 4,
          // },
        ],
        navList: [{ name: '我的库存' }, { name: '寄售库存' }],
        selectList: [],
        isSelectAll: false,
        isSelectAllCancel: false,
        goodApprovalStatus: '',
        postData: {},
        goodStatus: '',
        goodCount: '共0个商品，总库存0，可用库存0，订单占用0',
      }
    },
    watch: {
      // selectList(val) {
      //   //如果没有选择，隐藏全选弹层
      //   if (val.length === 0) {
      //     this.$refs.bottomOperation.close()
      //   }
      // },
    },
    onLoad(options) {},
    onShow() {
      this.getData(true)
    },
    methods: {
      //切换tabbar
      navTab(e) {
        this.navCurrent = e.index
        this.getData(true)
      },
      goTransferRecord() {
        this.$linkToEasy('/pagesAgent/StoreDetail/TransferRecord')
      },
      tabsClick(tab) {
        this.current = tab.index
        this.goodStatus = tab.value
        this.goodApprovalStatus = ''
      },
      toDetail(item) {
        // this.$linkToEasy('/pagesSupplier/GoodsManage/GoodsDetail?id=' + item.id)
        this.$linkToEasy('/pagesSupplier/GoodsManage/GoodsDetail?id=' + item.id)
      },
      //选择事件
      select(data) {
        this.isSelectAllCancel = false
        this.selectList.push(data)
        console.log('this.selectList', this.selectList)
        this.$refs.bottomOperation.show()
      },
      //选择取消
      selectCancel(data) {
        this.selectList.forEach((item, index) => {
          if (item.id === data.id) {
            this.selectList.splice(index, 1)
          }
        })
        console.log('this.selectListdel', this.selectList)
      },
      // //选择全部
      // selectAll() {
      //   this.isSelectAllCancel = false
      //   this.isSelectAll = true
      //   this.selectList = this.infoList
      // },
      // selectAllCancel() {
      //   this.isSelectAll = false
      //   this.selectReset()
      // },
      // //重置
      // selectReset() {
      //   this.selectList = []
      //   this.$refs.bottomOperation.close()
      //   this.isSelectAll = false
      //   this.isSelectAllCancel = true
      // },
      //tab点击
      tabChange(tab) {
        console.log('tab', tab)
        this.current = tab.index
        this.goodStatus = tab.value
        this.goodApprovalStatus = ''
      },
      //swiper切换
      swiperChange(event) {
        this.current = event.detail.current
        this.goodApprovalStatus = ''
        this.getData(true)
      },
      //获取列表数据
      getData(refresh) {
        helper.showLoading('加载中')
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          name: this.keyword,
        }
        params['distributionStatus'] = this.navCurrent
        params['goodStatus'] = this.goodStatus
        if (this.goodApprovalStatus) {
          params['goodApprovalStatus'] = this.goodApprovalStatus
        }
        console.log('param ---->', params)
        this.$VoHttp
          .apiGoodsQueryMyGoods(params)
          .then((res) => {
            if (res.code === '20001') {
              let data = res.data.pageResult.records || []
              this.total = res.data.pageResult.total
              let totalNum = 0
              this.tabs.forEach((item) => {
                ;(res.data?.statistics || []).forEach((sta) => {
                  if (item.value === sta.order) {
                    item.name = item.name.split('(')[0]
                    // item.name = item.name + '(' + sta.statisticCount + ')'
                  }
                })
              })
              //获取全部
              res.data.statistics.forEach((item) => {
                totalNum = totalNum + parseInt(item.statisticCount)
              })
              // this.tabs[0].name = '全部(' + totalNum + ')'
                this.tabs[0].name = '全部'
              this.infoList = this.infoList.concat(data)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              helper.hideLoading()
            } else {
              uni.$u.toast(res.message)
              helper.hideLoading()
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
            helper.hideLoading()
          })
        this.getDataCount(params)
      },
      getDataCount(params) {
        //
        this.$VoHttp
          .apiGoodsQueryMyGoodsCount(params)
          .then((res) => {
            if (res.code === '20001') {
              console.log('res ---->', res)
              this.goodCount =
                '共' +
                (res.data.goodsTotal != null ? res.data.goodsTotal : '0') +
                '个商品，总库存' +
                (res.data.number != null ? res.data.number : '0') +
                '，可用库存' +
                (res.data.availableNumber != null ? res.data.availableNumber : '0') +
                '，订单占用' +
                (res.data.orderNumber != null ? res.data.orderNumber : '0')
            } else {
              uni.$u.toast(res.message)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
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
          if (this.infoList.length >= this.total) {
            uni.$u.toast('没有更多了')
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
      //显示弹框
      showPopup() {},
      //补货
      addGoods(data) {
        this.$refs.goodsPop.show(data)
      },
      //删除
      deleteFn() {
        this.$refs.successPop.show()
        setTimeout(() => {
          this.$refs.successPop.close()
        }, 1000)
      },
      //批量上、下架
      soldOut(key) {
        let ids = this.selectList.map((item) => {
          return item.id
        })
        let params = {}
        if (key === 'up') {
          params = {
            status: 1,
            violationStatus: 3,
            ids: ids,
          }
        } else {
          params = {
            status: 4,
            violationStatus: 3,
            ids: ids,
          }
        }
        this.$VoHttp
          .apiGoodsStatusUpdate(params)
          .then((res) => {
            this.soldOutGoods()
          })
          .catch((err) => {
            uni.$u.toast('操作失败')
          })
      },
      //审核状态筛选事件
      tagClick(detail) {
        console.log('detail', detail)
        this.tagList.forEach((tag) => {
          tag.choosed = detail.name === tag.name ? true : false
        })
        this.goodApprovalStatus = detail.value || ''
        this.getData(true)
      },
      //违规状态筛选事件
      tagRuleClick(detail) {
        this.tagListOut.forEach((tag) => {
          tag.choosed = detail.name === tag.name ? true : false
        })
        this.goodApprovalStatus = detail.value || ''
        this.getData(true)
      },
      //查看原因
      viewReason(detail, status) {
        this.$VoHttp
          .apiGoodsQueryReason({
            id: detail.id,
            status: status,
          })
          .then((res) => {
            this.$refs.reasonModal.show(res.data)
          })
          .catch((err) => {
            uni.$u.toast('操作失败')
          })
      },
      //下架
      soldOutGoods() {
        this.$refs.successPop.show()
        setTimeout(() => {
          this.$refs.successPop.close()
        }, 1000)
        this.getData(true)
      },
      //编辑
      goodsEdit(data) {
        this.showModify = true
        this.$refs.modifyPopup.init(data)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .good {
    height: 100vh;
    // background: #fff;
    overflow-x: hidden;
    // padding: 40rpx 32rpx;
    // box-sizing: border-box;
    display: flex;
    flex-direction: column;

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
    &-guide {
      width: 160rpx;
      height: 56rpx;
      text-align:center;
      box-sizing: border-box;
      background-color: #ffffff;
      border-radius: 200rpx;
      border: 2rpx solid #d3d4db;
      font-size: 24rpx;
      color: $v-c0-85;
      line-height: 56rpx;
      margin-right: 24rpx;
    }

    &-tabs {
      background-color: #ffffff;

      &__item {
        border-radius: 200rpx;
        border: 2rpx solid #ff5319;
        width: 144rpx;
        height: 64rpx;
        line-height: 68rpx;
        justify-content: center;
        align-items: center;
        font-size: 24rpx;
        text-align: center;

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
    }

    .top-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    .scroll-list {
      height: 100%;
    }
    .swiper {
      flex: 1;

      &-item,
      .scroll-list {
        height: 100%;
      }
    }

    .fliter-tags {
      width: 100%;
      height: 100rpx;
      display: flex;
      background: #fff;
      align-items: center;
      // border-top: 1px solid $v-c0-08;
      box-shadow: inset 0px 1px 0px #f7f7f8;

      .tags {
        flex: 1;
        display: flex;
        white-space: nowrap;
        overflow: hidden;
      }

      .tag-item {
        display: inline-block;
        font-size: 10px;
        background-color: #f7f7f8;
        padding: 8rpx 16rpx;
        text-align: center;
        margin: 22rpx 0 22rpx 32rpx;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        color: $v-c0-85;

        &.choosed {
          background: #FFECE5;
          border: 1px solid #FF5319;
          color: #FF5319;
        }
      }
    }
  }
</style>
