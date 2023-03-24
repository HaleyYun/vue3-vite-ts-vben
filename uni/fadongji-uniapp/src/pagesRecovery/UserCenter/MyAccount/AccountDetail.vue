<template>
  <view :class="list.length > 0 ? '' : 'bg-white'" class="record">
    <VoNav
      :left-width="240"
      :right-width="240"
      :z-index="10"
      is-have-more
      place-bg-color="#f6f7f8"
      title="账户明细"
    />
    <view class="scree">
      <text @click="show = true">筛选</text>
      <VoIcon :opacity="0.45" :size="20" color="#000" name="filter" @click="show = true" />
      <view class="wrapBox">
        <u-overlay :show="show" class="overlay-wrap" @click="show = false">
          <view class="screeBox" @tap.stop>
            <view class="screeBox-item color-block">
              <view class="title fz-28 font-weight-500 m-b-16">时间</view>
              <view class="flex flex-justify-between flex-vertical-c fz-24">
                <view
                  :class="selectList[0] ? 'select' : ''"
                  class="screeBox-scree flex1"
                  @click.stop="startClick"
                >
                  <block v-if="formData.startTime">
                    {{ formData.startTime || '请选择开始时间' }}
                  </block>
                  <block v-else>请选择开始时间</block>
                </view>
                <view class="line" />
                <view
                  :class="selectList[1] ? 'select' : ''"
                  class="screeBox-scree flex1"
                  @click.stop="endClick"
                >
                  <block v-if="formData.endTime">
                    {{ formData.endTime || '请选择结束时间' }}
                  </block>
                  <block v-else>请选择结束时间</block>
                </view>
              </view>
            </view>
            <view class="screeBox-line" />
            <view class="flex">
              <view class="screeBox-reset" @click="resetClick">重置</view>
              <view class="screeBox-right" @click="screenClick">筛选</view>
            </view>
          </view>
        </u-overlay>
      </view>
    </view>
    <!--    <view class="flex1">-->
    <!--      <scroll-view-->
    <!--        :refresher-threshold="10"-->
    <!--        :refresher-triggered="triggered"-->
    <!--        :scroll-y="true"-->
    <!--        class="scroll-list"-->
    <!--        refresher-background="#F7F7F8"-->
    <!--        refresher-default-style="none"-->
    <!--        refresher-enabled="true"-->
    <!--        scroll-top="0"-->
    <!--        @refresherabort="onAbort"-->
    <!--        @refresherpulling="onPulling"-->
    <!--        @refresherrefresh="onRefresh"-->
    <!--        @refresherrestore="onRestore"-->
    <!--        @scroll="onScroll"-->
    <!--        @scrolltolower="scrolltolower"-->
    <!--      >-->
    <!--        &lt;!&ndash; 下拉刷新组件 &ndash;&gt;-->
    <!--        <VoListFresh :show="loadingStatus" />-->
    <!--        <template v-if="list.length > 0">-->
    <!--          <view v-for="(item, index) of list" :key="index" class="record-item">-->
    <!--            <u-sticky offset-top="0">-->
    <!--              <view class="record-item__title" @click="changeFn(index)">-->
    <!--                <view class="flex flex-vertical-c fz-30">-->
    <!--                  <view class="m-r-8">{{ item.date }}</view>-->
    <!--                  <VoIcon :size="12" name="open-arrow-b" />-->
    <!--                  &lt;!&ndash;            <VoIcon name="open-arrow-t" :size="12"></VoIcon>&ndash;&gt;-->
    <!--                </view>-->

    <!--                <view class="fz-24">-->
    <!--                  <view v-if="item.show" class="flex flex-vertical-c">-->
    <!--                    <view class="m-r-4 c-gray">收起</view>-->
    <!--                    <VoIcon :size="16" color="#d9d9d9" name="arrow-top-line" />-->
    <!--                  </view>-->
    <!--                  <view v-else class="flex flex-vertical-c">-->
    <!--                    <view class="m-r-4 c-gray">展开</view>-->
    <!--                    <VoIcon :size="16" color="#d9d9d9" name="arrow-bottom-line" />-->
    <!--                  </view>-->
    <!--                </view>-->
    <!--              </view>-->
    <!--            </u-sticky>-->
    <!--            <view v-show="item.show">-->
    <!--              <view v-for="(it, i) in item.list" :key="i" class="bill-detail">-->
    <!--                <view class="bill-detail__line" />-->
    <!--                <view class="bill-detail__detail">-->
    <!--                  <view class="flex flex-justify-between">-->
    <!--                    <view class="fz-28 fz-b black">订单{{ it.orderId }}</view>-->
    <!--                    <view v-if="it.amountType === '2'" class="red flex flex-vertical-c fz-24">-->
    <!--                      <view>+</view>-->
    <!--                      <VoPointPrice :price="it.amount" />-->
    <!--                      <view>元</view>-->
    <!--                    </view>-->
    <!--                    <view v-else class="green flex flex-vertical-c fz-24">-->
    <!--                      <view>-</view>-->
    <!--                      <VoPointPrice :price="it.amount" color="#07C160" />-->
    <!--                      <view>元</view>-->
    <!--                    </view>-->
    <!--                  </view>-->
    <!--                  <view class="fz-28 gay m-t-18">变动时间：{{ it.arriveTime }}</view>-->
    <!--                </view>-->
    <!--              </view>-->
    <!--            </view>-->
    <!--          </view>-->
    <!--          <VoLoadingText :has-more="list.length < total" :loading="loading" />-->
    <!--        </template>-->
    <!--        <VoNoData v-else />-->
    <!--        <VoSafetyArea :is-fixed="false" />-->
    <!--      </scroll-view>-->
    <!--    </view>-->
    <view class="flex1">
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
        <view v-if="list.length > 0">
          <view v-for="(item, index) in list" :key="index">
            <view class="h16" />
            <!--            <AccountBillItem :bill-data="item" :detail-type="detailType" />-->
            <AccountBillItem :bill-data="item" @click.native="invoiceDetailClick" />
          </view>
          <VoLoadingText :has-more="list.length < total" :loading="loading" />
        </view>
        <VoNoData v-else />
      </scroll-view>
    </view>
    <u-datetime-picker
      v-if="showPickerStart"
      v-model="dateStart"
      :maxDate="formData.endTime ? dateEnd : 3740967920000"
      :minDate="1640966400000"
      :show="showPickerStart"
      closeOnClickOverlay
      confirmColor="rgba(0,0,0,0.85)"
      mode="year-month"
      placeholder="请选择开始时间"
      title="选择月份"
      @cancel="showPickerStart = false"
      @close="showPickerStart = false"
      @confirm="confirmStart"
    />
    <u-datetime-picker
      v-if="showPickerEnd"
      v-model="dateEnd"
      :maxDate="3740967920000"
      :minDate="formData.startTime ? dateStart : 1640966400000"
      :show="showPickerEnd"
      closeOnClickOverlay
      confirmColor="rgba(0,0,0,0.85)"
      mode="year-month"
      placeholder="请选择结束时间"
      title="选择月份"
      @cancel="showPickerEnd = false"
      @close="showPickerEnd = false"
      @confirm="confirmEnd"
    />
  </view>
</template>
<script>
  import AccountBillItem from '../components/AccountBillItem'
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'AccountDetail',
    components: { AccountBillItem },
    data() {
      return {
        loading: false,
        triggered: false,
        scrollTop: 0,
        loadingStatus: false,
        refresh: false,
        noMore: false,
        pageNo: 1,
        pageSize: 20,
        total: 0,
        list: [],
        dateStart: Number(new Date()),
        dateEnd: Number(new Date()),
        formData: {
          startTime: null,
          endTime: null,
        },
        showPickerStart: false,
        showPickerEnd: false,
        show: false,
        selectList: [false, false],
        detailType: [
          '未知',
          '提现',
          '货款',
          '批发收益',
          '拓客收益',
          '仓储费用',
          '提现失败退回',
          '',
          '违约金',
          '退款',
        ],
      }
    },
    methods: {
      endClick() {
        this.showPickerEnd = true
        this.selectList[0] = false
        this.selectList[1] = true
      },
      startClick() {
        this.showPickerStart = true
        this.selectList[1] = false
        this.selectList[0] = true
      },
      initFn(init) {
        if (init) {
          this.list = []
          this.pageNo = 1
        }
        showLoading()
        this.loading = true
        let param = {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          companyId: this.userInfo.companyId,
          detailType: [2, 9],
        }
        if (this.formData.startTime && this.formData.endTime) {
          let range = this.formData.endTime.split('-')
          let data = this.mGetDate(range[0], range[1])
          param.startTime = this.formData.startTime + '-01 00:00:00'
          param.endTime = this.formData.endTime + '-' + data + ' 23:59:59'
        }
        this.$VoHttp.USER.apiAccountDetailsPage(param)
          .then((res) => {
            let data = res.data.records
            data.forEach((item) => {
              item.isOpen = true
              item.list.forEach((i) => {
                i.title = this.detailType[i.detailType]
              })
            })
            this.list.push(...data)
            this.total = res.data.total
            this.noMore = this.list.length >= this.total
          })
          .catch((e) => {
            console.log(e)
            uni.$u.toast(e.message || '请求失败')
          })
          .finally(() => {
            hideLoading()
            this.loading = this.refresh = this.triggered = this.loadingStatus = false
          })
      },
      confirmStart(e) {
        this.formData.startTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm')
        this.showPickerStart = false
      },
      confirmEnd(e) {
        this.formData.endTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm')
        this.showPickerEnd = false
      },
      /**
       * 展开
       * @param index
       */
      changeFn(index) {
        this.list[index].show = !this.list[index].show
      },
      // 重置
      resetClick() {
        this.formData.endTime = this.formData.startTime = null
        this.show = false
        this.initFn(true)
      },
      mGetDate(year, month) {
        const d = new Date(year, month, 0)
        return d.getDate()
      },
      // 筛选
      screenClick() {
        if (!this.formData.startTime) {
          this.$u.toast('请选择开始时间')
          return
        }
        if (!this.formData.endTime) {
          this.$u.toast('请选择结束时间')
          return
        }
        this.show = false
        this.initFn(true)
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
        if (this.loadingStatus) return
        this.loadingStatus = true
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
    onLoad() {
      this.initFn(true)
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
  .scroll-list {
    height: 100%;
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
      &.select {
        border: 2rpx solid #5f616e;
      }
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
