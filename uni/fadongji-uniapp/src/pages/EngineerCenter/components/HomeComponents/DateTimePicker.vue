<template>
  <view>
    <picker-view
      v-if="visible"
      :indicator-style="indicatorStyle"
      :value="value"
      @change="bindChange"
      class="picker-view"
    >
      <!-- <picker-view-column>
        <view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
      </picker-view-column> -->
      <picker-view-column>
        <view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
      </picker-view-column>
      <picker-view-column>
        <view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
      </picker-view-column>
      <picker-view-column>
        <view class="item" v-for="(item, index) in hours" :key="index">{{ item }}:00</view>
      </picker-view-column>
    </picker-view>
  </view>
</template>
<script>
  export default {
    data() {
      const date = new Date()
      const years = []
      const year = date.getFullYear()
      const months = []
      const month = date.getMonth() + 1
      const days = []
      const day = date.getDate()
      const hour = date.getHours()
      const hours = []
      for (let i = 1990; i <= date.getFullYear(); i++) {
        years.push(i)
      }
      for (let i = 0; i <= 12 - month; i++) {
        months.push(month + i)
      }
      for (let i = 0; i <= this.mGetDate(month) - day; i++) {
        days.push(day + i)
      }
      for (let i = 8; i <= 23; i++) {
        hours.push(i)
      }
      const dateChoose = ''
      return {
        title: '时间选择',
        years,
        year,
        months,
        month,
        days,
        day,
        hours,
        value: [0, 0, 0],
        visible: true,
        indicatorStyle: `height: 50px;`,
        dateChoose,
      }
    },
    watch: {
      month(val) {
        this.days = []
        let date = new Date()
        let dayNum = this.mGetDate(val)
        console.log(new Date().getMonth() + 1, val)
        if (val === date.getMonth() + 1) {
          dayNum = this.mGetDate(val) - date.getDate()
          for (let i = 0; i <= dayNum; i++) {
            this.days.push(date.getDate() + i)
          }
          console.log('watch', this.days, this.day)
        } else {
          for (let i = 1; i <= dayNum; i++) {
            this.days.push(i)
          }
        }
        this.day = this.days[0]
      },
      // day(val) {
      //   let arr = []
      //   let hourNum = new Date().getHours()
      //   if (val === hourNum) {
      //     for (let i = 1; i <= 23 - hourNum; i++) {
      //       arr.push(hourNum + i)
      //     }
      //   } else {
      //     for (let i = 1; i <= 23; i++) {
      //       arr.push(i)
      //     }
      //   }
      //   this.days = arr
      // },
    },
    mounted() {
      this.value = [0, 0, 0]
      this.$emit('getDate', this.dateChoose)
    },
    methods: {
      close() {
        this.$emit('close')
      },
      //获取每月天数
      mGetDate(month) {
        let year = new Date().getFullYear()
        var d = new Date(year, month, 0)
        return d.getDate()
      },
      //选择日期
      bindChange: function (e) {
        const val = e.detail.value
        console.log(e.detail.value)
        // this.year = this.years[val[0]]
        this.month = this.months[val[0]]
        this.day = this.days[val[1]]
        this.hour = this.hours[val[2]]
        // this.setDays(this.month)
        // this.setHours(this.hour)
        setTimeout(() => {
          let month = this.month < 10 ? '0' + this.month : this.month
          let day = this.day < 10 ? '0' + this.day : this.day
          let hour = this.hour < 10 ? '0' + this.hour : this.hour
          console.log('this.day', this.day, day)
          let dateValue = `${this.year}-${month}-${day}` + ' ' + `${hour}:00:00`
          this.dateChoose = dateValue
          console.log('dateValue', dateValue)
          this.$emit('change', dateValue)
        }, 500)
      },
      dateConfirm() {
        this.$emit('confirm', this.dateChoose)
      },
      //计算日期
      setDays(val) {
        this.days = []
        let date = new Date()
        let dayNum = this.mGetDate(val)
        let month = new Date().getMonth() + 1
        console.log(month, val)
        if (val === month) {
          dayNum = this.mGetDate(val) - date.getDate()
          for (let i = 0; i <= dayNum; i++) {
            this.days.push(date.getDate() + i)
          }
          this.day = this.days[0]
          console.log(this.days, this.day)
        } else {
          for (let i = 1; i <= dayNum; i++) {
            this.days.push(i)
          }
          this.day = this.days[0]
        }
      },
      //计算小时
      setHours(val) {
        let arr = []
        let hourNum = new Date().getHours()
        if (val === hourNum) {
          for (let i = 1; i <= 23 - hourNum; i++) {
            arr.push(hourNum + i)
          }
        } else {
          for (let i = 1; i <= 23; i++) {
            arr.push(i)
          }
        }
        this.days = arr
      },
    },
  }
</script>
<style lang="scss" scoped>
  .picker-view {
    width: 686rpx;
    height: 300rpx;
    margin-bottom: 40rpx;
  }
  .item {
    height: 100rpx !important;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
  }
  .color-blue {
    color: #0d66ff;
  }
  .padding-box {
    padding: 24rpx 32rpx;
    box-sizing: border-box;
  }
</style>
