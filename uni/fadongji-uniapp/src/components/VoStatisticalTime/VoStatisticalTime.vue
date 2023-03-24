<template>
  <view>
    <!--  头部  -->
<!--    <view class="zIndex9999">-->
<!--      <VoBatteryBar />-->
<!--      <view class="vo">-->
<!--        <view class="vo-nav__title"> 统计 </view>-->
<!--      </view>-->
<!--    </view>-->
    <VoNav :is-fixed="false" title="统计" :isBack="false">
      <view slot="back"/>
    </VoNav>
    <view class="zIndex9999 statistical flex flex-justify-between flex-vertical-c">
      <view>统计日期</view>
      <view class="flex" @click="timeOpen">
        <u-icon color="rgba(0, 0, 0, 0.45)" name="arrow-left" size="12" />
        <view class="time">{{ statustiCalDateFormat }}</view>
        <u-icon color="rgba(0, 0, 0, 0.45)" name="arrow-right" size="12" />
      </view>
    </view>
    <EraTabs
      v-if="showTab"

      :current="current"
      :list="typeList"
      activeStyle="color: #FF5319;font-size: 16px;font-weight: bold;padding-bottom:16px;padding-top:9px;"
      class="zIndex9999"
      inactiveStyle="font-size: 14px;font-weight: 400;padding-bottom:16px;padding-top:9px;color:rgba(0, 0, 0, 0.45)"
      style="background: #fff"
      @click="tabsClick"
    />
    <u-popup :show="isTimeOpen" @close="isTimeOpen = false" mode="top" :zoom="false" duration="0">
      <VoNav :is-fixed="false" title="统计" />
      <view class="zIndex9999 statistical flex flex-justify-between flex-vertical-c">
        <view>统计日期</view>
        <view class="flex" @click="timeOpen">
          <u-icon color="rgba(0, 0, 0, 0.45)" name="arrow-left" size="12" />
          <view class="time">{{ statustiCalDateFormat }}</view>
          <u-icon color="rgba(0, 0, 0, 0.45)" name="arrow-right" size="12" />
        </view>
      </view>
      <EraTabs
        v-if="showTab"
        :current="current"
        :list="typeList"
        activeStyle="color: #FF5319;font-size: 16px;font-weight: bold;padding-bottom:16px;padding-top:9px;"
        class="zIndex9999"
        inactiveStyle="font-size: 14px;font-weight: 400;padding-bottom:16px;padding-top:9px;color:rgba(0, 0, 0, 0.45)"
        style="background: #fff"
        @click="tabsClick"
      />
      <view class="selectTimePage">
        <!--    <view v-if="isTimeOpen" :style="{ top: top + 'rpx' }" class="selectTime">-->
        <view v-if="isTimeOpen" class="selectTime">
          <!--        <view class="mask" />-->
          <view class="selectCard">
            <view class="selectTime-title">已选择：{{ selectTimeFormat }}</view>
            <view class="flex blockList">
              <view
                v-for="(item, index) of timeList"
                :key="index"
                :class="timeCurrent == item.value ? 'selectBlockA' : ''"
                class="selectBlock"
                @click="timeChange(item.value)"
                >{{ item.label }}</view
              >
            </view>
            <view class="buttons flex">
              <u-button
                class="flex-1 margin-r-18"
                shape="circle"
                text="取消"
                @click.native="selectTimeCancel"
              />
              <u-button
                class="flex-1 margin-r-18"
                color="#FF5319"
                shape="circle"
                text="确认"
                @click.native="selectTimeConfirm"
              />
            </view>
          </view>
        </view>
        <u-datetime-picker
          ref="datetimePicker"
          v-model="customizeTime"
          :formatter="formatter"
          :maxDate="maxDate()"
          :minDate="minDate()"
          :show="pickerShow"
          mode="date"
          @cancel="pickerCancel"
          @confirm="pickerConfirm"
        />
      </view>
    </u-popup>

  </view>
</template>
<script>
  export default {
    name: 'VoStatisticalTime',
    props: {
      showTab:{
        default: true,
        type:Boolean
      },
      statustiCalDate: {
        default: [new Date().getTime()],
        type: Array,
      },
      top: {
        default: 170,
        type: Number,
      },
      current: {
        default: 0,
        type: [Number, String],
      },
    },
    watch: {
      isTimeOpen(newVal) {
        console.log("变了");
        this.$emit('updatepops', newVal)
      },
    },
    data() {
      return {
        typeList: [
          { id: '0', name: '流量' },
          { id: '1', name: '销售' },
          { id: '2', name: '进货' },
          { id: '3', name: '投放' },
          { id: '4', name: '库存' },
          { id: '5', name: '客户' },
        ],
        isTimeOpen: false,
        timeCurrent: 1,
        pickerShow: false,
        minDate: () => {
          let year = new Date().getFullYear()
          let minyear = new Date().setFullYear(year - 5)
          console.log(year, minyear)
          return minyear
        },
        maxDate: () => {
          return new Date().getTime()
        },
        selectTime: [],
        customizeTime: Number(new Date()), // 自定义默认时间
        timeList: [
          { label: '今天', value: 1 },
          { label: '本周', value: 2 },
          { label: '本月', value: 3 },
          { label: '自定义', value: 4 },
        ],
      }
    },
    onReady() {
      // 微信小程序需要用此写法
      this.$refs.datetimePicker.setFormatter(this.formatter)
    },
    computed: {
      statustiCalDateFormat() {
        if (this.statustiCalDate.length == 2) {
          let startTime = this.$vocenApi.VoUtils.timeFormat(this.statustiCalDate[0], 'mm月dd日')
          let endTime = this.$vocenApi.VoUtils.timeFormat(this.statustiCalDate[1], 'mm月dd日')
          return startTime + '-' + endTime
        } else {
          return this.$vocenApi.VoUtils.timeFormat(this.statustiCalDate[0], 'yyyy年mm月dd日')
        }
      },
      selectTimeFormat() {
        if (this.selectTime.length > 0) {
          if (this.timeCurrent == 2 || this.timeCurrent == 3) {
            return this.selectTime[0] + ' 至 ' + this.selectTime[1]
          } else if (this.timeCurrent == 1) {
            return this.selectTime[0]
          } else if (this.timeCurrent == 4) {
            return this.selectTime[0]
            // if (this.pickerShow == false && this.selectTime[0] == this.selectTime[1]) {
            //   return this.selectTime[0]
            // } else {
            //   return this.selectTime[0] + ' 至 ' + this.selectTime[1]
            // }
          }
        }
        return '--'
      },
    },
    created() {
      const current = uni.getStorageSync('VoStatisticalTime')
      if (current) {
        this.timeCurrent = current
        this.timeChange(this.timeCurrent)
        this.selectTimeConfirm()
      } else {
        this.timeCurrent = 1
      }
      let nowDate = this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd')
      this.selectTime = [nowDate, nowDate]
    },

    methods: {
      tabsClick(item) {
        console.log(item)
        this.$emit('changeTab', item)
      },
      timeOpen() {
        this.isTimeOpen = !this.isTimeOpen
        // if(this.isTimeOpen){
        //   this.timeCurrent = 1;
        //   this.selectTime[0] = this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd')
        // }
      },
      timeChange(index) {
        uni.setStorageSync('VoStatisticalTime', index)
        this.timeCurrent = index
        this.setSelectTime(index)
        if (this.timeCurrent == 4) {
          this.pickerShow = true
        }
      },
      setSelectTime(index) {
        if (index == 1) {
          let time = this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd')
          this.selectTime = [time, time]
        } else if (index == 2) {
          this.getWeek()
        } else if (index == 3) {
          this.getMonth()
        }
      },
      getWeek() {
        let oneDayTime = 24 * 60 * 60 * 1000
        let day = new Date().getDay()
        var nowTime = new Date().getTime()
        //显示周一
        let MondayTime = nowTime - (day - 1) * oneDayTime
        //显示周日
        let SundayTime = nowTime + (7 - day) * oneDayTime
        let monday = this.$vocenApi.VoUtils.timeFormat(new Date(MondayTime), 'yyyy-mm-dd')
        let sunday = this.$vocenApi.VoUtils.timeFormat(new Date(SundayTime), 'yyyy-mm-dd')
        this.selectTime = [monday, sunday]
      },
      getMonth() {
        let firstDate = new Date()
        firstDate.setDate(1) //第一天

        let endDate = new Date(firstDate)
        endDate.setMonth(firstDate.getMonth() + 1)
        endDate.setDate(0)
        let startTime = this.$vocenApi.VoUtils.timeFormat(firstDate, 'yyyy-mm-dd')
        let endTime = this.$vocenApi.VoUtils.timeFormat(endDate, 'yyyy-mm-dd')
        this.selectTime = [startTime, endTime]
        console.log(this.selectTime)
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`
        }
        if (type === 'month') {
          return `${value}月`
        }
        if (type === 'day') {
          return `${value}日`
        }
        return value
      },
      pickerConfirm(e) {
        let time = this.$vocenApi.VoUtils.timeFormat(new Date(e.value), 'yyyy-mm-dd')
        this.selectTime = [time, time]
        this.$forceUpdate()
        console.log(e.value, new Date(e.value), this.selectTime[0])
        this.pickerShow = false
      },
      pickerCancel() {
        this.pickerShow = false
      },
      // 取消
      selectTimeCancel() {
        this.isTimeOpen = false
      },
      // 确认
      selectTimeConfirm() {
        this.$emit('timeConfirm', { timeType: this.timeCurrent, selectTime: this.selectTime })
        this.isTimeOpen = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .statistical {
    font-weight: 400;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    padding: 20rpx 40rpx;
    background: #fff;
    .time {
      font-style: normal;
      font-weight: 500;
      font-size: 28rpx;
      line-height: 150%;
      text-align: center;
      margin: 0 34rpx;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .selectTimePage {
    //position: relative;
  }
  .selectTime {
    //position: absolute;
    //left: 0;
    width: 100%;
    //z-index: 9;
    background: #fff;
    .mask {
      transition-duration: 350ms;
      transition-timing-function: ease-out;
      position: fixed;
      inset: 0px;
      top: 200rpx;
      z-index: -100;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .selectCard {
      z-index: 9999;
      background: #fff;
    }

    .selectBlock {
      width: 144rpx;
      height: 56rpx;
      text-align: center;
      background: #f6f7f8;
      border-radius: 32rpx;
      margin-right: 40rpx;
      font-weight: 400;
      font-size: 24rpx;
      line-height: 2.5;
      border: 2rpx solid #f6f7f8;
      color: rgba(0, 0, 0, 0.85);
    }
    .selectBlockA {
      background: #ffece5;
      border: 2rpx solid #ff6633;
      border-radius: 32rpx;
      color: #ff5319;
    }
    .blockList {
      height: 168rpx;
      padding: 32rpx 24rpx;
    }
  }
  .selectTime-title {
    font-style: normal;
    font-weight: 500;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    padding: 24rpx 32rpx 16rpx 32rpx;
    border-bottom: 2rpx solid #f7f7f8;
  }
  .zIndex9999 {
    z-index: 9999;
  }
  .buttons {
    border-top: 2rpx solid #f7f7f8;
    padding: 32rpx 24rpx;
  }
  .margin-r-18 {
    margin-right: 36rpx;
  }
  .mb-70px {
    margin-bottom: 140rpx;
  }
</style>
