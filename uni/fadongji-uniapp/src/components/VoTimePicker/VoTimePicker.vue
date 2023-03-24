<template>
  <u-popup :show="show" mode="bottom" @close="close" closeOnClickOverlay>
    <view class="time fz-28 color-block">
      <view class="time-nav fz-32 flex">
        <view class="color-block-45" @click="close">取消</view>
        <view class="flex1 text-center">选择时间</view>
        <view class="color-block" @click="confirm">确定</view>
      </view>
      <view class="flex1 overflow-y flex">
        <view class="left">
          <EraVtabs
            :current="currentTab"
            :list="dateList"
            @click="dateClick"
            tabsWidth="170"
            lineColor="#FF5319"
            :activeStyle="{ color: '#FF5319' }"
          />
        </view>

        <view class="flex1 h-full">
          <scroll-view class="h-full overflow-y" :scroll-y="true">
            <view
              class="time-item color-block-65"
              :class="{ choosed: item.choosed, disabled: item.disabled }"
              v-for="item in timeArr"
              :key="item.time"
              @click="timeClick(item)"
            >
              {{ item.time }}
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </u-popup>
</template>

<script>
  export default {
    name: 'TimePicker',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      defaultTime: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        currentTab: 0,
        dateList: [
          // {
          //   name: '6月22日(今天)',
          // },
          // {
          //   name: '6月23日(明天)',
          // },
        ],
        timeArr: [
          {
            time: '08:00-10:00',
            choosed: false,
            disabled: false,
          },
          {
            time: '10:00-12:00',
            choosed: false,
            disabled: false,
          },
          {
            time: '12:00-14:00',
            choosed: false,
            disabled: false,
          },
          {
            time: '14:00-16:00',
            choosed: false,
            disabled: false,
          },
          {
            time: '16:00-18:00',
            choosed: false,
            disabled: false,
          },
          {
            time: '18:00-20:00',
            choosed: false,
            disabled: false,
          },
        ],
        dateTime: '',
        date: this.$vocenApi.VoUtils.timeFormat(new Date().getTime(), 'yyyy-mm-dd'),
        time: '',
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
        today: '',
      }
    },
    watch: {
      date(val) {
        this.dateTime = val + ' ' + this.time
        this.timeHandle(val)
      },
      time(val) {
        this.dateTime = this.date + ' ' + val
      },
      show(val) {
        if (val) {
          this.initFn()
        }
      },
    },
    created() {
      // this.initFn()
    },
    methods: {
      //不能选择的时间段置灰
      timeHandle(date, defaultTime) {
        this.timeArr.forEach((item) => {
          let homeStartTime = date + ' ' + item.time.split('-')[0] + ':00'
          if (defaultTime) {
            item.choosed = defaultTime === item.time
          }
          if (item.choosed) {
            this.time = item.time
          }
          if (homeStartTime <= this.nowDate) {
            item.disabled = true
          } else {
            item.disabled = false
          }
        })
      },
      initFn() {
        //获取一周时间
        let nowDate = new Date()
        let numArr = [0, 1, 2, 3, 4, 5, 6]
        // 24小时毫秒数
        let dayStamp = 24 * 60 * 60 * 1000

        const time = this.$vocenApi.VoUtils.timeFormat(nowDate.getTime(), 'yyyy-mm-dd hh').split(
          ' ',
        )[1]
        // 太晚从明天开始
        if (time > 19) {
          numArr = [1, 2, 3, 4, 5, 6, 7]
        }

        const sArr = this.defaultTime ? this.defaultTime.split(' ') : null

        let dateDefault = null
        let timeDefault = null
        if (sArr) {
          dateDefault = sArr[0]
          timeDefault = sArr[1]
          this.time = timeDefault
        }

        numArr.forEach((num, index) => {
          let nextDate = new Date(nowDate.getTime() + num * dayStamp)
          let date = this.$vocenApi.VoUtils.timeFormat(nextDate.getTime(), 'yyyy-mm-dd')
          let dateNoyear = this.$vocenApi.VoUtils.timeFormat(nextDate.getTime(), 'mm-dd')
          let day = '星期' + '日一二三四五六'.charAt(new Date(date).getDay())
          let dateText = ''
          if (dateDefault === date) {
            this.currentTab = index
            this.date = date
          }
          if (num === 0) {
            dateText = `${dateNoyear}（今天） `
          } else if (num === 1) {
            dateText = `${dateNoyear}（明天） `
          } else {
            dateText = `${dateNoyear}（${day}）`
          }
          this.dateList.push({
            name: dateText,
            date: date,
          })
        })
        this.timeHandle(this.date, timeDefault)
      },
      //日期选择
      dateClick(e) {
        this.date = e.date
      },
      //时间段选择
      timeClick(e) {
        if (e.disabled) {
          return
        }
        let homeStartTime = this.date + ' ' + e.time.split('-')[0] + ':00'
        if (homeStartTime <= this.nowDate) {
          this.$u.toast('上门时间不能小于当前时间~~')
          return
        }
        this.time = e.time
        this.timeArr.forEach((item) => {
          if (item.time === e.time) {
            item.choosed = true
          } else {
            item.choosed = false
          }
        })
      },
      confirm() {
        if (!this.time) {
          this.$u.toast('请选择时间段')
          return
        }
        let obj = {
          date: this.date,
          time: this.time,
          dateTime: this.dateTime,
        }
        this.$emit('confirm', obj)
        this.$emit('update:defaultTime', obj.dateTime)
        this.reset()
      },
      close() {
        this.$emit('close')
        this.reset()
      },
      reset() {
        this.time = ''
        this.timeArr.forEach((item) => {
          item.choosed = false
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .time {
    height: 60vh;
    display: flex;
    flex-direction: column;
    &-nav {
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
    .left {
      background: #f7f7f8;
    }
    .time-item {
      height: 100rpx;
      line-height: 100rpx;
      padding: 0 48rpx;
      box-sizing: border-box;
      &.choosed {
        color: #ff5319;
      }
      &.disabled {
        color: rgb(192, 196, 204);
      }
    }
  }
</style>
