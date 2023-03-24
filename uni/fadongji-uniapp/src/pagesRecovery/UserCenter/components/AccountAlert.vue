<template>
  <view>
    <u-overlay
      :show="show"
      class="overlay-wrap"
      style="position: absolute; top: -94rpx; left: 0; z-index: 99; width: 750rpx; height: 100vh"
      @click="show = false"
    >
      <view class="scree" @tap.stop>
        <view class="color-block-85 fz-28 fz-b m-t-24 m-l-32">时间</view>
        <view class="flex flex-vertical-c">
          <view class="m-l-32 m-t-16 scree-time" @click="startShow = true">
            <view class="fz-24 color-block-85 m-l-16">{{ startTime ? startTime : nowDate }}</view>
          </view>
          <view class="scree-timeLine" />
          <view class="m-l-18 m-t-16 scree-time" @click="endShow = true">
            <view class="fz-24 color-block-85 m-l-16">{{ endTime ? endTime : nowDate }}</view>
          </view>
        </view>
        <view class="flex m-t-48">
          <view class="scree-reset" @click="resetClick">重置</view>
          <view class="scree-right" @click="screenClick">筛选</view>
        </view>
      </view>
    </u-overlay>
    <u-datetime-picker
      :show="startShow"
      :value="startTime ? startTime : nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="cancelStart"
      @confirm="confirmStart"
    />
    <u-datetime-picker
      :show="endShow"
      :value="endTime ? endTime : nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="cancelEnd"
      @confirm="confirmEnd"
    />
  </view>
</template>

<script>
  export default {
    name: 'AccountAlert',
    data() {
      return {
        startShow: false, // 开始日期选择器弹框
        startTime: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd'),
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd'),
        endShow: false, // 结束日期选择器弹框
        endTime: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd'),
        show: false,
        list: [
          { name: '未知', selected: false, id: 0 },
          { name: '提现', selected: false, id: 1 },
          { name: '货款', selected: false, id: 2 },
          { name: '投资收益', selected: false, id: 3 },
          { name: '拓客收益', selected: false, id: 4 },
          { name: '仓储费用', selected: false, id: 5 },
          { name: '提现失败退回', selected: false, id: 6 },
        ],
        detailType: '',
      }
    },
    methods: {
      orderScree() {},
      /**
       * 重置
       */
      resetClick() {
        this.startTime = this.nowDate
        this.endTime = this.nowDate
      },
      /**
       * 筛选
       */
      screenClick() {
        this.showShare(false)
        let data = {
          startTime: this.startTime + ' 00:00:00',
          endTime: this.endTime + ' 23:59:59',
          detailType: this.detailType,
        }
        this.$emit('screening', data)
      },
      OrderScreen(e) {
        console.log(e.data)
        this.detailType = e.data[0].id
      },
      showShare(e) {
        this.show = e
      },
      cancle() {
        this.show = false
      },
      /**
       * confirm  点击开始时间的取消按钮
       * @param e
       */
      cancelStart() {
        this.startShow = false
      },
      /**
       * confirm  选择开始时间
       * @param e
       */
      confirmStart(e) {
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        if (this.endTime && date > this.endTime) {
          uni.$u.toast('开始时间不能大于结束时间！')
        } else {
          this.startShow = false
          this.startTime = date
        }
      },
      cancelEnd() {
        this.endShow = false
      },
      /**
       * 选择结束时间
       * @param e
       */
      confirmEnd(e) {
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        if (this.startTime && date < this.startTime) {
          uni.$u.toast('结束时间不能小于开始时间！')
        } else {
          this.endShow = false
          this.endTime = date
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .scree {
    background-color: #ffffff;
    width: 750rpx;
    z-index: 10071;
    &-time {
      background-color: $v-bg-light;
      border-radius: 8rpx;
      width: 308rpx;
      height: 80rpx;
      line-height: 80rpx;
    }
    &-timeLine {
      margin-left: 16rpx;
      height: 2rpx;
      width: 36rpx;
      background-color: #d3d4db;
    }
    &-reset {
      margin: 20rpx 0 20rpx 32rpx;
      width: 325rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 50rpx;
      border: 2rpx solid $color-primary-yellow;
      background-color: #ffffff;
      color: $color-primary-yellow;
      font-size: 32rpx;
      box-sizing: border-box;
    }
    &-right {
      margin: 20rpx 32rpx 20rpx 36rpx;
      width: 325rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 50rpx;
      color: #ffffff;
      background-color: $color-primary-yellow;
      font-size: 32rpx;
    }
  }
</style>
