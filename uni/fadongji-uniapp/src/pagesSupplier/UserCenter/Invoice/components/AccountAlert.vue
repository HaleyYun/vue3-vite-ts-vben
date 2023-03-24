<template>
  <view>
    <u-overlay
      v-show="show"
      :show="true"
      :style="{ marginTop: 84 + $systemInfo.statusBarHeight * 2 + 'rpx' }"
      class="overlay-wrap"
      @click="show = false"
    >
      <view class="scree" @tap.stop>
        <view class="color-block-85 fz-28 fz-b m-t-24 m-l-32">时间</view>
        <view class="flex flex-vertical-c">
          <view class="m-l-32 m-t-16 scree-time" @click="startShow = true">
            <view class="fz-24 color-block-85 m-l-16">{{
              formData.startTime || '请选择开始时间'
            }}</view>
          </view>
          <view class="scree-timeLine" />
          <view class="m-l-18 m-t-16 scree-time" @click="endShow = true">
            <view class="fz-24 color-block-85 m-l-16">{{
              formData.endTime || '请选择结束时间'
            }}</view>
          </view>
        </view>
        <AccountAlertItem ref="accountRef" :radio="false" title="类型" @OrderScreen="OrderScreen" />
        <view class="scree-line" />
        <view class="flex flex-justify-between">
          <view class="scree-reset flex1" @click="resetClick">重置</view>
          <view class="scree-right flex1" @click="screenClick">筛选</view>
        </view>
      </view>
    </u-overlay>
    <u-datetime-picker
      v-model="startTime"
      :maxDate="formData.endTime ? endTime : 3740967920000"
      :minDate="1640966400000"
      :show="startShow"
      cancelColor="rgba(0, 0, 0, 0.45)"
      closeOnClickOverlay
      confirmColor="rgba(0, 0, 0, 0.85)"
      mode="date"
      placeholder="请选择开始时间"
      title="日期选择器"
      @cancel="startShow = false"
      @confirm="confirmStart"
    />
    <u-datetime-picker
      v-model="endTime"
      :maxDate="3740967920000"
      :minDate="formData.startTime ? startTime : 1640966400000"
      :show="endShow"
      cancelColor="rgba(0, 0, 0, 0.45)"
      closeOnClickOverlay
      confirmColor="rgba(0, 0, 0, 0.85)"
      mode="date"
      placeholder="请选择结束时间"
      title="日期选择器"
      @cancel="endShow = false"
      @confirm="confirmEnd"
    />
  </view>
</template>

<script>
  import AccountAlertItem from './AccountAlertItem'

  export default {
    name: 'AccountAlert',
    components: {
      AccountAlertItem,
    },
    props: {
      //已选中数据
      selectData: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        startShow: false, // 开始日期选择器弹框
        startTime: '',
        endTime: '',
        endShow: false, // 结束日期选择器弹框
        show: false,
        formData: {
          startTime: '',
          endTime: '',
          detailType: null,
        },
      }
    },
    watch: {
      show(val) {
        if (val) {
          this.$nextTick(() => {
            this.$refs.accountRef.setValue(this.selectData.detailType)
          })
        }
      },
    },
    methods: {
      //回显数据
      setValues(data) {
        console.log('222222222222', data)
        this.$refs.accountRef.setValue(data)
      },
      /**
       * 重置
       */
      resetClick() {
        this.$refs.accountRef.reset()
        this.formData.detailType = null
        this.startTime = this.endTime = null
        this.formData.startTime = this.formData.endTime = null
      },
      /**
       * 筛选
       */
      screenClick() {
        this.showShare(false)
        let range = this.formData.endTime ? this.formData.endTime.split('-') : []
        let date = this.formData.endTime ? this.mGetDate(range[0], range[1]) : ''
        let data = {
          startTime: this.formData.startTime ? `${this.formData.startTime} 00:00:00` : '',
          endTime: this.formData.endTime ? `${this.formData.endTime} 23:59:59` : '',
          detailType: this.formData.detailType,
        }
        this.$emit('screening', data)
      },
      OrderScreen(e) {
        console.log('OrderScreen', e.data)
        this.formData.detailType = e.data.filter(function(item,index){
            return e.data.indexOf(item) === index;  
        });
      },
      /**
       * 数组去重
       */
      unique(arr) {
        // const res = new Map()
        // return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
      },
      showShare(e) {
        this.show = e
      },
      cancle() {
        this.show = false
      },
      /**
       * confirm  选择开始时间
       * @param e
       */
      confirmStart(e) {
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        if (this.endTime && date > this.endTime) {
          uni.$u.toast('开始时间不能大于结束时间！')
          return
        }
        this.startShow = false
        this.formData.startTime = date
        console.log('this.formData', this.formData)
      },
      mGetDate(year, month) {
        const d = new Date(year, month, 0)
        return d.getDate()
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
          this.formData.endTime = date
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .overlay-wrap {
    height: 100vh;
    width: 750rpx;
  }
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
      background-color: $v-bg-light;
    }
    &-line {
      background-color: $v-bg-light;
      margin-top: 64rpx;
      padding: 0 32rpx;
      height: 2rpx;
    }

    &-reset {
      margin: 22rpx 0 24rpx 36rpx;
      height: 80rpx;
      line-height: 76rpx;
      text-align: center;
      border-radius: 50rpx;
      border: 2rpx solid $v-c0-25;
      background-color: #ffffff;
      color: $v-c0-85;
      font-size: 32rpx;
      box-sizing: border-box;
    }
    &-right {
      margin: 22rpx 32rpx 24rpx 36rpx;
      height: 80rpx;
      line-height: 76rpx;
      text-align: center;
      border-radius: 50rpx;
      color: #ffffff;
      font-size: 32rpx;
      background-color: $color-primary-yellow;
      border: 2rpx solid $color-primary-yellow;
      box-sizing: border-box;
    }
  }
</style>
