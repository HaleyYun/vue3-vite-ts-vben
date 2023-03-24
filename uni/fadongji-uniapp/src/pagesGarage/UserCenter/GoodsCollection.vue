<template>
  <view class="collect flex flex-column p-b-safe-area">
    <!--  头部  -->
    <VoNav :title="'我的收藏(' + total + ')'" :is-fixed="false" isHaveMore>
      <!--    <VoNav :title="'我的收藏(' + (goodsList.length + storeList.length) + ')'" is-fixed isHaveMore>-->

      <view slot="operation" class="operation">
        <span v-if="editOpen" class="collect-edit" @click="openEditMode">管理</span>
        <span v-else class="collect-done" @click="editDone">完成</span>
      </view>
    </VoNav>
    <view class="collect-tabs">
      <EraTabs :current="currentTab" :list="tabsList" @change="changeTabs" @click="tabClick" />
    </view>
    <scroll-view
      :refresher-enabled="false"
      :scroll-y="true"
      class="flex1 overflow-y"
      scroll-top="0"
      :refresher-triggered="triggered"
      refresher-background="#F7F7F8"
      :refresher-threshold="10"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
      @scroll="onScroll"
      @scrolltolower="scrolltolower"
      refresher-default-style="none"
    >
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <template v-if="list.length > 0">
        <template v-if="currentTab === 0">
          <GoodsItem
            v-for="(info, index) of list"
            :key="index"
            ref="GoodsItem"
            :index="index"
            :info="info"
            :show-icon="showIcon"
            @setSelectList="selectClick"
            @cancel="getListData(1)"
            @showShare="showSharePop"
          />
        </template>
        <template v-else-if="currentTab === 1">
          <ShopItem
            v-for="(item, index) of list"
            :key="index"
            ref="shopItem"
            :info="item"
            :show-icon="showIcon"
            @setSelectList="selectClick"
            @cancel="getListData(1)"
            @showShare="showSharePop"
          />
        </template>
        <VoLoadingText :loading="isLoading" :has-more="list.length < total" />
      </template>
      <VoNoData v-else-if="list.length <= 0 && !isLoading" />
    </scroll-view>

    <!--    <view v-if="currentTab === 0" class="flex1 overflow-y">-->
    <!--      <GoodsItem-->
    <!--        v-for="(info, index) of list"-->
    <!--        :key="index"-->
    <!--        ref="GoodsItem"-->
    <!--        :index="index"-->
    <!--        :info="info"-->
    <!--        :show-icon="showIcon"-->
    <!--        @setSelectList="goodSelectClick"-->
    <!--        @click.native="goGoodsDetail(info)"-->
    <!--      />-->
    <!--    </view>-->
    <!--    <view v-else-if="currentTab === 1" class="flex1 overflow-y">-->
    <!--      <GoodsItem-->
    <!--        v-for="(info, index) of selectList"-->
    <!--        :key="index"-->
    <!--        ref="GoodsItem"-->
    <!--        :index="index"-->
    <!--        :show-icon="showIcon"-->
    <!--        @setSelectList="goodSelectClick"-->
    <!--      />-->
    <!--    </view>-->
    <!--    <view v-else-if="currentTab === 1" class="flex1 overflow-y">-->
    <!--      <template v-if="storeList.length > 0">-->
    <!--        <ShopItem-->
    <!--          v-for="(item, index) of storeList"-->
    <!--          :key="index"-->
    <!--          ref="shopItem"-->
    <!--          :info="item"-->
    <!--          :show-icon="showIcon"-->
    <!--          @setSelectList="storeSelectClick"-->
    <!--          @click.native="goShopDetails(item)"-->
    <!--        />-->
    <!--      </template>-->
    <!--      <VoNoData v-else />-->
    <!--    </view>-->
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
  import GoodsItem from './components/GoodsItem'
  import ShopItem from './components/ShopItem'
  import { shareWeixin } from '@/common/helper'
  import devConf from '@/common/env'

  export default {
    name: 'GoodsCollection',
    components: { GoodsItem, ShopItem },
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 10,
        total: 0,
        isLoading: false,
        list: [],
        selected: false, // 全选
        showIcon: false,
        editOpen: true,
        tabsList: [
          {
            name: '商品',
          },
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
        goodsList: [],
        ids: [],
        storeList: [],
        curClick: {}, //当前选中商品、店铺
      }
    },
    watch: {
      list: {
        deep: true,
        handler(newValue, oldValue) {
          let ids = newValue.map((item) => (this.currentTab === 1 ? item.companyId : item.goodsId))
          let arr = newValue.filter((item) => item.select)
          this.ids = arr.map((item) => (this.currentTab === 1 ? item.companyId : item.goodsId))
          this.selected = !!(
            this.ids.length === ids.length &&
            this.ids.every(function (v, i) {
              return v === ids[i]
            })
          )
        },
      },
    },
    onLoad() {
      // this.getGoodsData(true)
      // this.getStoreData(true)
      this.getListData(1)
    },
    onShow() {
      this.getListData(1)
    },
    methods: {
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
        this.getListData(1)
        // if (this.currentTab === 0) {
        //   this.getGoodsData(true)
        // } else if (this.currentTab === 1) {
        //   this.getStoreData(true)
        // }
      },
      openEditMode() {
        this.editOpen = false
        this.showIcon = true
      },
      editDone() {
        this.editOpen = true
        this.showIcon = false
      },
      //分享
      showSharePop(cur) {
        this.curClick = cur
        this.$refs.sharePop.showShare(true)
      },
      //分享
      shareFn(type) {
        console.log('shareFn', type)
        this.$refs.sharePop.cancle()
        let path, name, pic
        if (this.currentTab === 0) {
          path = `${devConf.shareBaseUrl}/#/pagesGarage/ShopList/GoodsDetail?id=${this.curClick.goodsId}&wid=${this.curClick.warehouseId}`
          name = this.curClick.name || ''
          pic = this.curClick.pic || ''
        } else {
          path = `${devConf.shareBaseUrl}/pagesAgent/InvestmentList/ShopDetails?companyId=${this.curClick.companyId}`
          name = this.curClick.storeName || ''
          pic = this.curClick.storeUrl || ''
        }
        shareWeixin({
          scene: type,
          title: name,
          path: path,
          imageUrl: pic,
        })
          .then((res) => {
            console.log('res分享', res)
          })
          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
      },
      /**
       * 全选
       */
      setSelected() {
        this.selected = !this.selected
        this.list.forEach((item) => {
          item.select = this.selected
        })
        this.$forceUpdate()
      },
      /**
       * 选中商品
       * @param select 选中状态
       * @param goodsId 商品id
       */
      selectClick(current) {
        current.select = !current.select
      },
      async getListData(refresh) {
        if (this.isLoading) return
        this.isLoading = true
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.list = []
		  this.total = 0
          this.pageNo = 1
        }
        let param = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        }
        try {
          let data
          if (this.currentTab === 0) {
            data = await this.$VoHttp.GOODS.apiGoodsCollectionCollectionList(param)
          } else if (this.currentTab === 1) {
            data = await this.$VoHttp.GOODS.apiGoodsCollectionStoreCollectionList(param)
          }
          console.log(data)
          if (data && data.data && data.data.records && data.data.records.length) {
            const arr = data.data.records.map((item) => {
              return {
                select: false,
                ...item,
              }
            })
            this.list.push(...arr)
            this.total = data.data.total
          }
        } catch (err) {
          console.log('err', err)
          uni.$u.toast(err.message || '请检查网络')
        }
        this.isLoading = false
        this.refresh = false
        this.triggered = false
        this.loadingStatus = false
      },
      /**
       * 取消收藏
       */
      async cancelCollection() {
        if (this.ids.length > 0) {
          let data
          try {
            if (this.currentTab === 0) {
              data = await this.$VoHttp.GOODS.apiGoodsCollectionCancelBatch(this.ids)
            } else if (this.currentTab === 1) {
              data = await this.$VoHttp.GOODS.apiGoodsCollectionCancelStoreBatch(this.ids)
            }
            console.log(data)
            this.$toast('操作成功', 'success', '/static/icons/success_icon.png')
            this.getListData(1)
            this.selected = false
          } catch (e) {
            uni.$u.toast(e.message || '请求失败')
          }
        } else {
          uni.$u.toast('请选择您要取消收藏的数据')
        }
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
          this.getListData()
        }
      },
      //滚到底部加载
      scrolltolower() {
        uni.$u.throttle(() => {
          console.log('底部加载')
          if (this.list.length >= this.total) {
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
    ::v-deep .u-popup {
      flex: inherit;
    }
    width: 750rpx;
    height: 100vh;
    overflow: hidden;
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
    .fixed {
      width: 100vw;
      height: 100vh;
      z-index: 100;
    }
  }
</style>
