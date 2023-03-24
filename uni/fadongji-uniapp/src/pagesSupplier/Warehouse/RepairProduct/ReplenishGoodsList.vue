<template>
  <view class="replenish flex flex-column">
    <VoNav is-fixed is-have-more title="补货">

    </VoNav>
    <view class="replenish-label flex flex-vertical-c">
      <view
        v-for="info of labelList"
        :key="info.id"
        :class="info.selected ? 'select' : 'no-select'"
        class="replenish-label__choose"
        @click="chooseFn(info)"
      >
        {{ info.name }}
        <view>
          <VoIcon
            v-if="info.icon"
            :color="info.selected ? '#FF5319' : '#000000'"
            :name="info.icon"
            :opacity="info.selected ? 1 : 0.45"
            :size="12"
            class="m-l-4"
          />
        </view>
      </view>
      <!-- <view class="search-pop" :show="showTopPop"> -->
      <u-overlay
        :show="showTopPop"
        class="search-pop"
        opacity="0.45"
        style="position: absolute; top: 96rpx; left: 0; z-index: 99; width: 750rpx; height: 100vh"
        @click="close"
      >
        <view class="search-pop__main" @tap.stop>
          <view class="btns">
            <view
              v-for="item in btnList"
              :key="item.name"
              :class="item.selected ? 'select' : ''"
              class="btn-item"
              @click="btnsClick(item)"
            >
              {{ item.name }}
            </view>
          </view>
        </view>
      </u-overlay>
      <!-- </view> -->
    </view>
    <view class="replenish-search flex flex-vertical-c">
      <VoSearch
        v-model="keyword"
        :actionStyle="{ color: '#fff' }"
        :showInsideAction="true"
        bgColor="#fff"
        borderColor="#FF5319"
        height="34"
        placeholder="输入商品名称搜索"
        @custom="searchFn"
        @search="searchFn"
      />
    </view>

    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      class="replenish-rest flex1"
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
      <!-- 下拉刷新组件 -->
      <VoListFresh :show="loadingStatus" />
      <!--   空状态时的组件样式   -->
      <!--      <NullState />-->
      <!--      <view class="replenish-rest__num">商品数量：{{ total }}</view>-->
      <block v-if="infoList.length">
        <ReplenishList
          v-for="(info, index) of infoList"
          :key="index"
          :replenish-list="info"
          @updateFn="getData(true)"
        />
        <VoLoadingText :has-more="infoList < total" :loading="loading" />
      </block>
      <VoNoData v-else :img-url="'/static/noData/noGoods.png'" noDataTips="暂无补货商品" />
    </scroll-view>
  </view>
</template>

<script>
  import NullState from './components/NullState'
  import ReplenishList from './components/ReplenishList'

  export default {
    name: 'ReplenishGoodsList',
    components: { NullState, ReplenishList },
    data() {
      return {
        keyword: '', // 搜索双向绑定
        currentTab: 1,
        labelList: [
          // {
          //   id: 1,
          //   name: '全部',
          //   selected: true,
          // },
          {
            id: 1,
            name: '在售',
            selected: true,
            value: 1,
          },
          {
            id: 2,
            name: '待售',
            selected: false,
            value: 3,
          },
          {
            id: 3,
            name: '库存预警',
            selected: false,
            value: 2,
            showPop: false,
            icon: 'open-arrow-b',
          },
          {
            id: 4,
            name: '无货',
            selected: false,
            value: 4,
            showPop: false,
            icon: 'open-arrow-b',
          },
        ],
        btnList: [
          {
            name: '使用WMS仓库',
            selected: false,
            value: 1,
          },
          {
            name: '未使用WMS仓库',
            selected: false,
            value: 2,
          },
        ],
        infoList: [],
        productList: {
          page: 1,
          size: 10,
          list: [],
        },
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 5,
        total: 0,
        loading: false,
        queryStatus: 1,
        showTopPop: false,
        useWms: '',
      }
    },
    onLoad(options) {
      //首页跳转该页面
      if (options.queryStatus) {
        this.chooseFn(this.labelList[2])
      } else {
        this.getData(true)
      }
    },
    onShow() {
      this.getData(true)
    },
    methods: {
      close() {
        console.log('close')
        this.showTopPop = false
        this.useWms = ''
        this.labelList.forEach((item) => {
          item.showPop = false
          if (item.icon) {
            item.icon = 'open-arrow-b'
          }
        })
      },
      async loadProductList() {},
      chooseFn(e) {
        console.log(e, '000000000')
        //重置
        this.useWms = ''
        this.btnList.forEach((item) => {
          item.selected = false
        })

        this.queryStatus = e.value
        this.currentTab = e.id
        if (e.icon) {
          // this.showTopPop = !this.showTopPop
          this.labelList.forEach((item) => {
            if (item.id === e.id) {
              if (item.showPop) {
                item.icon = 'open-arrow-b'
                item.showPop = false
                this.showTopPop = false
              } else {
                item.icon = 'close-arrow-t'
                item.showPop = true
                this.showTopPop = true
              }
            }
          })
        } else {
          this.showTopPop = false
        }
        this.labelList.forEach((info) => {
          if (e.id === info.id) {
            info.selected = true
          } else {
            if (info.icon) {
              info.icon = 'open-arrow-b'
            }
            info.selected = false
          }
        })
        this.getData(true)
      },
      //
      iconClick(data) {},
      //选择wms仓库
      btnsClick(data) {
        this.useWms = data.value
        this.btnList.forEach((item) => {
          if (item.name === data.name) {
            item.selected = true
          } else {
            item.selected = false
          }
        })
        if (this.currentTab === 3 || this.currentTab === 4) {
          this.labelList[this.currentTab - 1].showPop = false
          this.labelList[this.currentTab - 1].icon = 'open-arrow-b'
          this.$forceUpdate()
        }
        this.showTopPop = false
        this.getData(true)
      },
      //搜索
      searchFn(value) {
        this.getData(true)
      },
      //获取列表数据
      getData(refresh) {
        if (this.loading) return
        this.loading = !this.loading
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          queryStatus: this.queryStatus,
        }
        if (this.useWms) {
          params.useWms = this.useWms === 1 ? true : false
        }
        if (this.keyword) {
          params['name'] = this.keyword
        }
        this.$VoHttp
          .apiGoodsQueryReplenishList(params)
          .then((res) => {
            if (res && res.data) {
              let data = res.data.records
              this.total = res.data.total
              data.forEach((item) => {
                item.queryStatus = this.queryStatus
              })
              this.infoList = this.infoList.concat(data)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.triggered = false
            this.refresh = false
            this.loadingStatus = false
            this.loading = !this.loading
          })
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
        this.scrollTop = e.detail.scrollTop
        this.$emit('onScroll', e)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .replenish {
    height: 100vh;
    background-color: #f6f7f8;
    //&-operate {
    //  display: flex;
    //  align-items: center;
    //  justify-content: flex-end;
    //  &__icon {
    //    margin-left: 28rpx;
    //  }
    //}
    &-search {
      padding: 8rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-label {
      width: 750rpx;
      height: 96rpx;
      padding-left: 36rpx;
      box-sizing: border-box;
      background: #ffffff;
      position: relative;
      &__choose {
        //height: 64rpx;
        font-size: 24rpx;
        border-radius: 200rpx;
        line-height: 64rpx;
        text-align: center;
        margin-right: 16rpx;
        width: 160rpx;
        height: 64rpx;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    &-rest {
      overflow-y: scroll;
      &__num {
        height: 36rpx;
        line-height: 36rpx;
        padding: 16rpx 32rpx;
        font-size: 24rpx;
        color: $v-c0-45;
      }
    }
  }
  .no-select {
    color: $v-c0-85;
    background: $v-bg-light !important;
    border: 2rpx solid transparent;
  }
  .select {
    background: $v-tags-btn-disabled;
    border: 1px solid $color-primary-yellow;
    color: $color-primary-yellow;
    box-sizing: border-box;
    //line-height: 60rpx !important;
  }
  .search-pop {
    // height: 100vh;
    // width: 750rpx;
    // position: absolute;
    // top: 96rpx;
    // left: 0;
    // z-index: 99;
    &__main {
      border-top: 2rpx solid #f6f7f8;
    }
    .lay {
      flex: 1;
    }
    .btns {
      background: #fff;
      padding: 32rpx 0 32rpx 32rpx;
      box-sizing: border-box;
      display: flex;
      .btn-item {
        border-radius: 8rpx;
        height: 64rpx;
        padding: 0 28rpx;
        background: #f7f7f8;
        color: rgba(0, 0, 0, 0.85);
        text-align: center;
        font-size: 24rpx;
        line-height: 64rpx;
        margin-right: 28rpx;
        box-sizing: border-box;
        border: 2rpx solid #f7f7f8;
        &.select {
          background: $v-tags-btn-disabled;
          border: 2rpx solid $color-primary-yellow;
          color: $color-primary-yellow;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
