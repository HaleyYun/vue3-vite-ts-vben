<template>
  <u-overlay
    :show="visible"
    class="search-pop"
    opacity="0.45"
    style="position: absolute; top: 42rpx; left: -32rpx; z-index: 99; width: 750rpx; height: 100vh"
    @click="clickOver"
  >
    <view class="search-pop__main" @tap.stop>
      <view class="main-title">还款日</view>
      <view class="flex flex-vertical-c m-l-32 m-b-14">
        <view class="main-box" @click="startShow = true">
          <view v-if="startRepayment">{{ startRepayment }}</view>
          <view v-else>请输入开始时间</view>
        </view>
        <view class="main-line"></view>
        <view class="main-box" @click="endShow = true">
          <view v-if="endRepayment">{{ endRepayment }}</view>
          <view v-else>请输入结束时间</view>
        </view>
      </view>
      <view class="main-title">下单日</view>
      <view class="flex flex-vertical-c m-l-32 m-b-14">
        <view class="main-box" @click="startOrderShow = true">
          <view v-if="startOrdering"> {{ startOrdering }} </view>
          <view v-else>请输入开始时间</view>
        </view>
        <view class="main-line"></view>
        <view class="main-box" @click="endOrderShow = true">
          <view v-if="endOrdering">{{ endOrdering }}</view>
          <view v-else>请输入结束时间</view>
        </view>
      </view>
      <view class="btm-btn">
        <view class="btn-item" @click.stop="reset"> 重置 </view>
        <view class="btn-item primary" @click.stop="confirm"> 确定 </view>
      </view>
    </view>
    <u-datetime-picker
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="startShow"
      :value="startRepayment"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="cancelStart"
      @confirm="confirmStart"
    />
    <u-datetime-picker
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="endShow"
      :value="startRepayment"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="cancelEnd"
      @confirm="confirmEnd"
    />
    <u-datetime-picker
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="startOrderShow"
      :value="startOrdering"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="startOrderShow = false"
      @confirm="confirmOrderStart"
    />
    <u-datetime-picker
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="endOrderShow"
      :value="endOrdering"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="endOrderShow = false"
      @confirm="confirmOrderEnd"
    />
  </u-overlay>
</template>
<script>
  export default {
    name: 'FliterPop',
    props: {
      list: {
        type: Array,
      },
      visible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        startRepayment: '', // 还款日开始时间
        endRepayment: '', // 还款日结束时间
        startOrdering: '', // 下单日开始时间
        endOrdering: '', // 下单日结束时间
        startShow: false, //  还款日开始时间日期选择器弹框
        endShow: false, //  还款日结束时间日期选择器弹框
        startOrderShow: false, // 下单日开始时间日期选择器弹框
        endOrderShow: false, // 下单日结束时间日期选择器弹框
      }
    },
    methods: {
      show() {
        // this.visible = true
      },
      clickOver() {
        this.$emit('close')
      },
      /**
       * 重置
       */
      reset() {
        this.startRepayment = ''
        this.endRepayment = ''
        this.startOrdering = ''
        this.endOrdering = ''
      },
      /**
       * 确定
       */
      confirm() {
        let resultData = {
          startRepayment: this.startRepayment,
          endRepayment: this.endRepayment,
          startOrdering: this.startOrdering,
          endOrdering: this.endOrdering,
        }
        this.$emit('confirm', resultData)
      },
      /**
       * 关闭还款日开始时间日期选择器
       */
      cancelStart() {
        this.startShow = false
      },
      /**
       * confirm  选择还款日开始时间开始时间
       * @param e
       */
      confirmStart(e) {
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        if (this.endRepayment && date > this.endRepayment) {
          this.$u.toast('开始时间不能大于结束时间')
        } else {
          this.startShow = false
          console.log(this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd'), 'sss', date)

          this.startRepayment = date
        }
      },
      /**
       * 关闭还款日结束时间日期选择器
       */
      cancelEnd() {
        this.endShow = false
      },
      /**
       * 选择还款日结束时间结束时间
       * @param e
       */
      confirmEnd(e) {
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        if (this.startRepayment && date < this.startRepayment) {
          this.$u.toast('结束时间不能小于开始时间')
        } else {
          this.endShow = false
          this.endRepayment = date
        }
      },
      /**
       * 选择下单日开始时间结束时间
       * @param e
       */
      confirmOrderStart(e) {
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        if (this.endOrdering && date > this.endOrdering) {
          this.$u.toast('开始时间不能大于结束时间')
        } else {
          this.startOrderShow = false
          this.startOrdering = date
        }
      },
      /**
       * 选择下单日结束时间结束时间
       * @param e
       */
      confirmOrderEnd(e) {
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        if (this.startOrdering && date < this.startOrdering) {
          this.$u.toast('结束时间不能小于开始时间')
        } else {
          this.endOrderShow = false
          this.endOrdering = date
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .search-pop {
    width: 750rpx;
    height: 100vh;
    &__main {
      background: #fff;
      .main-title {
        padding: 24rpx 32rpx 16rpx;
        line-height: 42rpx;
        font-weight: bold;
        font-size: 28rpx;
      }
      .main-box {
        width: 308rpx;
        background: #f6f7f8;
        padding: 22rpx 32rpx;
        box-sizing: border-box;
        border-radius: 8rpx;
        font-size: 24rpx;
        color: $v-c0-65;
      }
      .main-line {
        width: 36rpx;
        height: 2rpx;
        background: #d3d4db;
        margin: 0 16rpx;
      }
    }
    .btm-btn {
      border-top: 2rpx solid #f7f7f8;
      padding: 18rpx 32rpx;
      box-sizing: border-box;
      display: flex;
      background: #fff;
      margin-top: 66rpx;
      .btn-item {
        width: 50%;
        height: 88rpx;
        border: 1px solid #22284b;
        border-radius: 90rpx;
        font-size: 32rpx;
        line-height: 88rpx;
        text-align: center;
        &.primary {
          background: #22284b;
          color: #fff;
          margin-left: 36rpx;
        }
      }
    }
  }
</style>
