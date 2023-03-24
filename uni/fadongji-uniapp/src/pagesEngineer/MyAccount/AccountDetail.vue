<template>
  <view :class="list.length > 0 ? '' : 'bg-white'" class="record">
    <VoNav
      :is-fixed="false"
      :left-width="240"
      :right-width="240"
      :z-index="10"
      is-have-more
      place-bg-color="#f6f7f8"
      title="我的收益"
    />
    <scroll-view
      :refresher-threshold="10"
      :refresher-triggered="triggered"
      :scroll-y="true"
      class="scroll-list flex1"
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
      <view class="flex flex-column flex-vertical-c bg-white p-28 my-16">
        <view class="fz-28 color-block-45">总金额</view>
        <VoPointPrice v-if="amount" :leftSize="20" :price="amount" :rightSize="14" show-unit />
        <view v-else style="color: #e50012">-- 元</view>
      </view>
      <view v-if="list.length > 0" class="p-b-safe-area">
        <view v-for="(it, i) in list" :key="i" class="bill-detail">
          <view class="bill-detail__line" />
          <view class="bill-detail__detail">
            <view class="flex flex-justify-between">
              <view class="fz-28 fz-b black">
                <block v-if="+it.detailType === 7">
                  <block v-if="it.remark">
                    <block v-if="+it.remark === 71">安装服务费</block>
                    <block v-else-if="+it.remark === 72">回收服务费</block>
                    <block v-else-if="+it.remark === 73">售后服务费</block>
                  </block>
                  <block v-else>服务费</block>
                </block>
                <block v-else-if="+it.detailType === 4">拓客收益</block>
                <block v-else>违约金</block>
              </view>
              <view v-if="+it.amountType === 2" class="red flex flex-vertical-c fz-24">
                <view>+</view>
                <VoPointPrice :price="it.amount || 0" show-unit />
              </view>
              <view v-else class="green flex flex-vertical-c fz-24">
                <view>-</view>
                <VoPointPrice :price="it.amount || 1" color="#07C160" show-unit />
              </view>
            </view>
            <view class="fz-28 gay m-t-18">变动时间：{{ it.createTime || 45641321 }}</view>
          </view>
        </view>
        <VoLoadingText :has-more="list.length < total" :loading="loading" />
      </view>
      <VoNoData v-else />
    </scroll-view>
  </view>
</template>
<script>
  export default {
    name: 'AccountDetail',
    data() {
      return {
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        noMore: false,
        loading: false,
        pageNo: 1,
        pageSize: 20,
        total: 0,
        list: [],
        amount: 0,
        promotion: null, // promotion=2是从推广页面进入
      }
    },
    methods: {
      initFn(init) {
        if (this.loading) return
        this.loading = true
        if (init) {
          this.list = []
          this.pageNo = 1
        }
        let param = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          companyId: this.userInfo.companyId,
          detailType: [4, 7, 8],
        }
        this.$VoHttp.USER.apiAccountDetailsPage(param)
          .then((res) => {
            let arr = []
            if (res.data && res.data.records && res.data.records.length) {
              res.data.records.forEach((item) => {
                item.list.forEach((it) => {
                  // 如果从推广页面进来只展示it.detailType === 4（拓客收益）数据，从我的账户跳进来则展示所有收益数据
                  this.promotion ? it.detailType === 4 && arr.push(it) : arr.push(it)
                })
              })
            }
            this.list.push(...arr)
            this.total = res.data.total
          })
          .catch((e) => {
            console.log(e)
            uni.$u.toast(e.message || '网络错误')
          })
          .finally(() => {
            this.loading = this.refresh = this.triggered = this.loadingStatus = false
          })
      },
      /**
       * 展开
       * @param index
       */
      changeFn(index) {
        this.list[index].show = !this.list[index].show
      },
      //自定义下拉刷新控件被下拉
      onPulling(e) {
        console.log('被拉了')
        if (e.detail.deltaY < 0) return // 防止上滑页面也触发下拉
        this.loadingStatus = true
        // setTimeout(() => {
        //   this.loadingStatus = false
        // }, 2000)
      },
      //自定义下拉刷新被触发
      onRefresh() {
        // this.loadingStatus = true
        if (this.loading) return
        if (this.scrollTop === 0) {
          if (this.refresh) return
          this.refresh = true
          this.triggered = true
          this.loadingStatus = true
          this.initFn(true)
        }
      },
      //滚到底部加载
      scrolltolower() {
        console.log('到底了')
        // if (this.loadingStatus) return
        // this.loadingStatus = true
        uni.$u.throttle(() => {
          console.log('底部加载')
          this.refresh = false
          if (this.noMore) {
            uni.$u.toast('没有更多了')
            return false
          }
          this.pageNo++
          this.initFn()
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
    //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object
    onLoad(option) {
      if (option) {
        this.amount = option.amount
        this.promotion = option.type
        console.log('promotion', this.promotion)
      }
      this.initFn()
    },
    //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onshow() {},
    //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    //监听页面隐藏
    onHide() {},
    //监听页面卸载
    onUnload() {},
    //监听用户下拉动作，一般用于下拉刷新
    onPullDownRefresh() {},
    //页面滚动到底部的事件（不是scroll-view滚到底）
    onReachBottom() {},
  }
</script>
<style lang="scss" scoped>
  .record {
    width: 750rpx;
    height: 100vh;
    background-color: #f6f7f8;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .scroll-list {
      overflow: scroll;
    }
    &-title {
      width: 750rpx;
      height: 90rpx;
      padding: 0rpx 32rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
    }
    &-item {
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
  }
  .bill-detail {
    background-color: #ffffff;
    &__line {
      height: 2rpx;
      width: 100%;
      background-color: $v-bg-light;
    }
    &__detail {
      padding: 32rpx;
      .black {
        color: $v-c0-85;
      }
      .red {
        color: $color-primary-red;
      }
      .green {
        color: $v-success;
      }
      .gay {
        color: $v-c0-65;
      }
    }
  }
  .c-gray {
    color: rgba(0, 0, 0, 0.45);
  }
  .scree {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 26rpx;
    color: rgba(0, 0, 0, 0.85);
    padding: 22rpx 32rpx;
    box-sizing: border-box;
    .wrapBox {
      position: absolute !important;
      width: 100vw;
      top: 84rpx !important;
      z-index: 99;
      left: 0;
    }
    .overlay-wrap {
      height: 100vh;
      width: 100vw;
      position: relative !important;
    }
    &-icon {
      width: 48rpx;
      height: 48rpx;
    }
  }
  .screeBox {
    background-color: #ffffff;
    width: 750rpx;
    z-index: 10071;
    .line {
      width: 36rpx;
      height: 2rpx;
      background: #d3d4db;
      margin: 16rpx;
    }
    &-scree {
      background: #f6f7f8;
      border-radius: 8rpx;
      padding: 22rpx 32rpx;
    }
    &-item {
      padding: 24rpx 32rpx 48rpx;
    }
    &-line {
      background-color: $v-bg-light;
      margin-left: 32rpx;
      margin-right: 32rpx;
      height: 2rpx;
    }

    &-reset {
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      margin-left: 32rpx;
      width: 325rpx;
      height: 92rpx;
      line-height: 92rpx;
      text-align: center;
      border-radius: 50rpx;
      border: 2rpx solid $color-primary-yellow;
      background-color: #ffffff;
      color: $color-primary-yellow;
    }

    &-right {
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      margin-right: 32rpx;
      margin-left: 36rpx;
      width: 325rpx;
      height: 92rpx;
      line-height: 92rpx;
      text-align: center;
      border-radius: 50rpx;
      color: #ffffff;
      background-color: $color-primary-yellow;
    }
  }
</style>
