<template>
  <view class="collect flex flex-column p-b-safe-area">
    <!--  头部  -->
    <VoNav :isHaveMore="editOpen" :title="'我的收藏(' + storeList.length + ')'" is-fixed>

      <view v-show="showOperation" slot="operation" class="operation">
        <span v-if="editOpen" class="collect-edit" @click="openEditMode">管理</span>
        <span v-else class="collect-done" @click="editDone">完成</span>
      </view>
    </VoNav>
    <view class="collect-tabs">
      <EraTabs :current="currentTab" :list="tabsList" @change="changeTabs" @click="tabClick" />
    </view>
    <!--  搜索  -->
    <!--    <view class="collect-search flex flex-vertical-c">-->
    <!--      <VoSearch v-model="keyword" placeholder="请输入搜索" @change="getStoreData(1)" />-->
    <!--    </view>-->
    <scroll-view
      :refresher-enabled="false"
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      :scroll-y="true"
      class="flex1 overflow-y"
      refresher-background="#F7F7F8"
      refresher-default-style="none"
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
      <block v-if="storeList.length">
        <ShopItem
          v-for="(item, index) of storeList"
          :key="index"
          ref="shopItem"
          :info="item"
          :show-icon="showIcon"
          @cancel="getStoreData(1)"
          @setSelectList="storeSelectClick"
          @showShare="showSharePop"
        />
        <VoLoadingText :has-more="storeList.length < total" :loading="isLoading" />
      </block>
      <VoNoData v-else-if="!storeList.length && !isLoading" bgColor="" />
    </scroll-view>
    <view
      v-show="showIcon"
      class="collect-bottom flex flex-row flex-vertical-c flex-justify-between bg-white"
    >
      <view class="flex flex-row flex-vertical-c" @click="setSelected()">
        <VoIcon
          :color="selected ? '#FF5319' : '#22284B'"
          :name="selected ? 'select-right' : 'circle'"
          :opacity="selected ? 1 : 0.15"
          :size="24"
        />
        <view class="collect-bottom__text m-l-8">全选</view>
      </view>

      <view class="collect-bottom__button" @click="cancelCollection">取消收藏</view>
    </view>
    <!-- 分享 -->
    <VoShareView ref="sharePop" @shareFn="shareFn" />
  </view>
</template>

<script>
  import ShopItem from './components/ShopItem'
  import devConf from '@/common/env'
  import { shareWeixin } from '@/common/helper'
  import { toast } from '../../../common/helper'

  export default {
    name: 'GoodsCollection',
    components: { ShopItem },
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 20,
        total: 0,
        isLoading: false,
        showOperation: false,
        selectList: [
          {
            isSelect: false,
          },
          {
            isSelect: false,
          },
          {
            isSelect: false,
          },
        ],
        selected: false,
        showIcon: false,
        editOpen: true,
        keyword: '', // 搜索双向绑定
        tabsList: [
          // {
          //   name: '全国投资',
          // },
          // {
          //   name: '本地投资',
          // },
          {
            name: '店铺',
          },
        ],
        currentTab: 0, // 横向tabs默认
        options2: [
          {
            text: '收藏',
            style: {
              backgroundColor: '#3c9cff',
            },
          },
          {
            text: '删除',
            style: {
              backgroundColor: '#f56c6c',
            },
          },
        ],
        storeList: [],
        comIds: [],
      }
    },
    watch: {
      storeList: {
        deep: true,
        handler(newValue, oldValue) {
          console.log('newValue', newValue)
          let comIds = newValue.map((item) => item.companyId)
          let arr = newValue.filter((item) => item.select)
          this.comIds = arr.map((item) => item.companyId)
          console.log(this.comIds, '6666666')
          console.log(comIds)
          if (
            this.comIds.length === comIds.length &&
            this.comIds.every(function (v, i) {
              return v === comIds[i]
            })
          ) {
            this.selected = true
          } else {
            this.selected = false
          }
          if (newValue.length > 0) {
            this.showOperation = true
          } else {
            this.showOperation = false
            this.showIcon = false
          }
        },
      },
    },
    onLoad() {
      this.getStoreData(true)
    },
    methods: {
      //分享
      showSharePop(cur) {
        this.curClick = cur
        this.$refs.sharePop.showShare(true)
      },
      //分享
      shareFn(type) {
        console.log('shareFn', type)
        this.$refs.sharePop.cancle()
        shareWeixin({
          scene: type,
          title: this.info.storeName || null,
          path: `${devConf.shareBaseUrl}/pagesAgent/InvestmentList/ShopDetails?companyId=${this.curClick.companyId}`,
          imageUrl: this.info.storeUrl || '',
        })
          .then((res) => {
            console.log('res分享', res)
          })
          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
      },
      /**
       * tabs
       * @param item
       */
      tabClick(item) {
        console.log('item', item)
      },
      changeTabs(e) {
        // console.log(e.index, 1111111111111)
        this.currentTab = e.index
        this.getStoreData(true)
      },
      openEditMode() {
        this.editOpen = false
        this.showIcon = true
      },
      editDone() {
        this.editOpen = true
        this.showIcon = false
      },
      /**
       * 选中店铺
       * @param storeSelect 选中状态
       * @param companyId 店铺id
       */
      storeSelectClick(storeSelect, companyId) {
        console.log('选中状态', 'storeSelect:' + storeSelect + ',companyId:' + companyId)
        this.storeList.forEach((item) => {
          if (item.companyId === companyId) {
            item.select = storeSelect
          }
        })
      },
      // 获取店铺收藏列表数据
      getStoreData(refresh) {
        console.log('获取店铺收藏列表数据')
        if (this.isLoading) return
        this.isLoading = !this.isLoading
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.storeList = []
          this.pageNo = 1
        }
        this.$VoHttp.GOODS.apiGoodsCollectionStoreCollectionList()
          .then((res) => {
            console.log(res)
            if (res.data && res.data.records && res.data.records.length) {
              console.log(res.data.records)
              let arr = res.data.records.map((item) => {
                return {
                  select: false,
                  ...item,
                }
              })
              this.storeList.push(...arr)
              this.total = res.data.total
            } else {
              this.storeList = []
            }
            console.log(this.storeList)
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.isLoading = false
            this.refresh = false
            this.triggered = false
            this.loadingStatus = false
          })
      },
      /**
       * 全选
       */
      setSelected() {
        this.selected = !this.selected
        if (this.selected) {
          this.storeList.forEach((item) => {
            item.select = true
          })
          this.$forceUpdate()
        } else {
          this.storeList.forEach((item) => {
            item.select = false
          })
          this.$forceUpdate()
        }
      },
      // goodSelectClick(select, index) {
      //   console.log('选中状态', 'select:' + select + ',index:' + index)
      // },
      /**
       * 取消收藏
       */
      cancelCollection() {
        if (this.comIds.length <= 0) {
          toast('请选择取消收藏的店铺', 'none')
          return
        }
        this.$VoHttp.GOODS.apiGoodsCollectionCancelStoreBatch(this.comIds)
          .then((res) => {
            console.log(res.data)
            // this.info = res.data
            this.getStoreData(true)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        // console.log('onpulling')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
        setTimeout(() => {
          this.loadingStatus = false
        }, 2000)
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
          this.getStoreData(1)
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          if (this.storeList.length >= this.total) {
            return false
          }
          this.refresh = false
          this.pageNo++
          this.getListData()
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
    },
  }
</script>

<style lang="scss" scoped>
  .collect {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    ::v-deep .u-popup {
      flex: inherit;
    }
    &-done {
      color: #22284b;
      font-size: 32rpx;
      margin-right: 36rpx;
    }
    &-edit {
      font-size: 32rpx;
      color: rgba(0, 0, 0, 0.65);
      margin-right: 36rpx;
    }
    &-tabs {
      width: 100%;
      background: #ffffff;
      height: 96rpx;
      padding: 0 32rpx;
      box-sizing: border-box;
    }
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-bottom {
      padding: 0 32rpx;
      box-sizing: border-box;
      height: 136rpx;
      width: 750rpx;
      &__text {
        font-size: 26rpx;
        color: $v-c0-45;
        line-height: 39rpx;
      }
      &__button {
        font-size: 32rpx;
        color: #ffffff;
        line-height: 48rpx;
        padding: 20rpx 24rpx;
        box-sizing: border-box;
        background-color: $color-primary-yellow;
        border-radius: 48rpx;
      }
    }
  }
</style>
