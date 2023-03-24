<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="recycle flex flex-column fz-28"
    >
      <view class="recycle-top">
        <VoNav :rightWidth="200" is-fixed isTransparent is-have-more>
          <block slot="title">
            <text class="color-white">回收商品</text>
          </block>
        </VoNav>
        <view class="recycle-top__search flex m-b-52">
          <VoSearch
            v-model.trim="keyword"
            height="34"
            :showAction="false"
            placeholder="输入型号名称"
            placeholderColor="rgba(0, 0, 0, 0.25)"
            @change="searchFn"
          />
          <view class="white-btn m-l-40" @click="toAdd">发布回收商品</view>
        </view>
        <view class="recycle-top__tabs flex relative">
          <view
            :class="current === 0 ? 'first' : 'second'"
            class="top-pos posl"
            @click="tabClick(0)"
          >
            <view :class="current === 0 ? 'left' : ''" class="tabs-left flex-vertical-c">
              <view :class="current === 0 ? 'select' : ''" class="flex1 flex top-text">
                {{ tabs[0].statisticName }}({{ tabs[0].statisticCount }})
              </view>
            </view>
            <view v-if="current === 0" class="active-line" />
          </view>
          <view
            :class="current === 1 ? 'first' : 'second'"
            class="top-pos posr"
            @click="tabClick(1)"
          >
            <view :class="current === 1 ? 'right' : ''" class="tabs-right flex-vertical-c">
              <view :class="current === 1 ? 'select' : ''" class="flex1 flex top-text">
                {{ tabs[1].statisticName }}({{ tabs[1].statisticCount }})
              </view>
            </view>
            <view v-if="current === 1" class="active-line" />
          </view>
          <!--          <view-->
          <!--            v-for="(item, index) in tabs"-->
          <!--            :key="index"-->
          <!--            :class="{ left: index === 0, right: index === 1, choosed: current === index }"-->
          <!--            class="tabs-item flex flex-column flex-jutify-c"-->
          <!--            @click="tabClick(index)"-->
          <!--          >-->
          <!--            <view class="flex1 flex flex-vertical-c">-->
          <!--              {{ item.statisticName }}({{ item.statisticCount }})-->
          <!--            </view>-->
          <!--            <view v-if="current === index" class="active-line" />-->
          <!--          </view>-->
        </view>
      </view>
      <scroll-view
        :refresher-threshold="10"
        :refresher-triggered="triggered"
        :scroll-y="true"
        class="scroll-list flex1 overflow-y bg-white"
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
        <view class="recycle-main m-t-16">
          <view
            v-for="(item, index) in infoList"
            :key="item.id"
            class="recycle-box m-b-32"
            @click="toDetail(item)"
          >
            <view class="flex m-b-24">
              <view class="flex1 text-nowrap fz-32 font-weight-500 c0">{{ item.model }}</view>
              <VoIcon :opacity="0.45" :size="20" color="#000000" name="arrow-right" />
            </view>
            <view class="flex flex-vertical-c">
              <text class="sign">回收价</text>
              <VoPointPrice :price="item.price" show-unit />
            </view>
            <view class="flex m-t-21 flex-justify-r">
              <view class="half-btn m-r-16" @click.stop="editPrice(item)"> 改价</view>
              <view class="half-btn color m-r-16" @click.stop="stopRecycle(item, index)">
                {{ item.status === 1 ? '暂停' : '启动' }}
              </view>
            </view>
          </view>
        </view>
        <view v-if="noMore && infoList.length" class="p-b-50 p-t-50">
          <u-loadmore
            color="rgba(0, 0, 0, 0.45)"
            line
            lineColor="rgba(0, 0, 0, 0.08)"
            nomore-text="暂无更多内容"
            status="nomore"
          />
        </view>
        <VoNoData
          v-if="!infoList.length && !refresh"
          imgUrl="/static/noData/noGoods.png"
          no-data-tips="暂无回收中的商品"
        />
      </scroll-view>
      <VoSafetyArea />
    </view>
    <VoQuick :show.sync="showDirect" />
    <EditPriceModal ref="editPriceModal" @success="getData(true)" />
  </view>
</template>

<script>
  import { hideLoading, showLoading } from '@/common/helper'
  import EditPriceModal from './components/EditPriceModal'

  export default {
    name: 'AddWarehouse',
    components: { EditPriceModal },
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        pageNo: 1,
        pageSize: 20,
        total: 0,
        noMore: false,
        infoList: [],
        showDirect: false,
        keyword: '', // 型号名称模糊查询
        status: 1,
        current: 0,
        tabs: [
          {
            name: '回收中（0）',
            value: 0,
            choosed: true,
            left: true,
          },
          {
            name: '暂停回收（0）',
            value: 1,
            choosed: false,
            right: true,
          },
        ],
      }
    },
    onShow() {
      this.getData(true)
    },
    methods: {
      // 详情跳转
      toDetail(item) {
        this.$storage.set('goodsAddInfo', item)
        this.$linkToEasy(`/pagesRecovery/GoodsRecycle/GoodsAdd?info=${JSON.stringify(item)}`)
      },
      toAdd() {
        this.$storage.set('goodsAddInfo',null)
        this.$linkToEasy('/pagesRecovery/GoodsRecycle/GoodsAdd')
      },
      //搜索
      searchFn(e) {
        this.keyword = e
        this.getData(true)
      },
      //tab点击
      tabClick(index) {
        console.log('index', index)
        this.current = index
        this.getData(true)
      },
      editPrice(data) {
        this.$refs.editPriceModal.show(data)
      },
      // 改变商品状态
      async stopRecycle(item, index) {
        showLoading()
        const { id } = item
        let status = item.status == 1 ? 2 : 1
        try {
          const data = await this.$VoHttp.apiGoodsRecycleModelUpdateStatus({ id, status })
          this.$u.toast('修改成功')
          if (item.status == 1) {
            this.tabs[0].statisticCount = this.tabs[0].statisticCount * 1 - 1
            this.tabs[1].statisticCount = this.tabs[1].statisticCount * 1 + 1
          } else if (item.status == 2) {
            this.tabs[0].statisticCount = this.tabs[0].statisticCount * 1 + 1
            this.tabs[1].statisticCount = this.tabs[1].statisticCount * 1 - 1
          }
          this.infoList.splice(index, 1)
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
      },
      //获取列表数据
      getData(refresh) {
        showLoading()
        let isfresh = refresh || this.refresh
        if (isfresh) {
          this.infoList = []
          this.pageNo = 1
        }
        let params = {
          orderProperty: 'update_time',
          orderType: 'DESC',
          keyword: this.keyword,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          status: this.current ? 2 : 1,
        }
        this.$VoHttp
          .apiGoodsRecycleModelQuery(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.pageResult.records || []
              this.total = res.data.pageResult.total
              this.infoList = this.infoList.concat(data)
              console.log('this.infoList', this.infoList)
              this.triggered = false
              this.refresh = false
              this.loadingStatus = false
              this.tabs = res.data.statistics
              hideLoading()
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
            hideLoading()
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
            // uni.$u.toast('没有更多了')
            this.noMore = true
            return false
          }
          this.noMore = false
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
    },
  }
</script>

<style lang="scss" scoped>
  .recycle {
    width: 750rpx;
    height: 100vh;
    background-image: url('/static/common/bj.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    &-top {
      &__search {
        padding: 12rpx 32rpx;
        box-sizing: border-box;

        .white-btn {
          border: 1px solid #ffffff;
          border-radius: 64rpx;
          color: #fff;
          padding: 10rpx 16rpx;
          box-sizing: border-box;
          font-size: 24rpx;
          line-height: 40rpx;
        }
      }

      &__tabs {
        height: 88rpx;

        .active-line {
          width: 40rpx;
          height: 6rpx;
          background: #ff5319;
          border-radius: 200rpx;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    &-main {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      width: 750rpx;
    }

    &-box {
      background: #ffffff;
      box-shadow: 0 4rpx 16rpx rgba(34, 40, 75, 0.15);
      border-radius: 16rpx;
      padding: 24rpx;
      box-sizing: border-box;
    }

    .sign {
      font-size: 24rpx;
      padding: 2rpx 4rpx;
      background: #ffe6e8;
      color: #f20014;
      border: 2rpx solid #f20014;
      border-radius: 4rpx;
      margin-right: 8rpx;
    }

    .half-btn {
      border: 1px solid rgba(0, 0, 0, 0.25);
      border-radius: 32px;
      font-size: 24rpx;
      width: 152rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;

      &.color {
        border: 1px solid #ff5319;
        color: #ff5319;
      }
    }
  }

  .tabs-left {
    background-image: url('/static/icons/tab-left.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 396rpx;
    font-weight: 400;
    height: 88rpx;

    &.left {
      background-image: url('/static/icons/tab-active-left.png');
    }
  }

  .tabs-right {
    background-image: url('/static/icons/tab-right.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 396rpx;
    font-weight: 400;
    height: 88rpx;

    &.right {
      background-image: url('/static/icons/tab-active-right.png');
    }
  }

  .top-text {
    justify-content: center;
    color: #fff;
    font-size: 28rpx;
    overflow-x: visible;
    line-height: 88rpx;
    font-weight: 400;

    &.select {
      color: #ff5319;
      font-size: 32rpx;
      font-weight: bold;
    }
  }

  .top-pos {
    position: absolute;
    z-index: 9;

    &.posl {
      left: 0;
    }

    &.posr {
      right: 0;
    }
  }

  .first {
    z-index: 10;
  }

  .second {
    z-index: 9;
  }
</style>
