<template>
  <u-overlay
    :show="visible"
    class="pop"
    opacity="0.45"
    style="position: absolute; top: 90rpx; left: 0; z-index: 99; width: 750rpx; height: 100vh"
    @click="clickOver"
  >
    <view class="pop-line" />
    <view class="overflow-y" @tap.stop>
      <view class="pop-box flex flex-vertical-c">
        <view
          v-for="info of labelInfo"
          :key="info.id"
          :class="{ selected: info.selected === true, 'un-selected': info.selected === false }"
          class="pop-box__label"
          @click.stop="chooseFn(info)"
          >{{ info.name }}</view
        >
      </view>
      <view v-if="labelInfo[3].selected" class="pop-main">
        <view class="flex flex-vertical-c">
          <u-input
            v-model="homeStartTime"
            :class="borderStart"
            border="surround"
            class="picker-input"
            placeholder="选择开始时间"
            placeholderStyle="font-size: 24rpx;color: rgba(0, 0, 0, 0.25)"
            @blur="borderStart = ''"
            @focus="borderStart = 'border-input'"
            @click.native="showPicker('homeStartTime')"
          />

          <view class="r-line" />
          <u-input
            v-model="homeEndTime"
            :class="borderEnd"
            border="surround"
            class="picker-input"
            placeholder="选择结束时间"
            placeholderStyle="font-size: 24rpx;color: rgba(0, 0, 0, 0.25)"
            @blur="borderEnd = ''"
            @focus="borderEnd = 'border-input'"
            @click.native="showPicker('homeEndTime')"
          />
        </view>
        <DateTimePicker @change="dateChange" @getDate="getInitDate" />
      </view>
      <view class="pop-bottom">
        <view class="pop-bottom__reset" @click="resetFn">重置</view>
        <view class="pop-bottom__sift" @click.stop="siftFn()">筛选</view>
      </view>
    </view>
    <!-- <u-datetime-picker
      :value="nowDate"
      :show="pickerShow"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="datetime"
      title="时间选择"
      @cancel="pickerShow = false"
      @confirm="confirmDate"
    /> -->
  </u-overlay>
</template>

<script>
  import DateTimePicker from './DateTimePicker'

  export default {
    name: 'DoorTimePop',
    components: { DateTimePicker },
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
        labelInfo: [
          {
            id: 1,
            name: '今天',
            selected: false,
            value: 1,
          },
          {
            id: 2,
            name: '三天内',
            selected: false,
            value: 3,
          },
          {
            id: 3,
            name: '一周内',
            selected: false,
            value: 7,
          },
          {
            id: 4,
            name: '自定义',
            selected: false,
            value: '',
          },
        ],
        borderStart: '',
        borderEnd: '',
        days: '',
        daysName: '',
        homeStartTime: '',
        homeEndTime: '',
        nowDate: Number(new Date()),
        pickerShow: false,
        datekey: 'homeStartTime',
        dateChoose: '',
        initDate: '',
        tabData: '',
      }
    },
    methods: {
      clickOver() {
        this.resetFn()
        this.$emit('close')
      },
      chooseFn(e) {
        this.tabData = e
        this.days = e.value
        this.daysName = e.name === '自定义' ? '' : e.name
        if (e.name === '自定义') {
          this.homeStartTime = this.$vocenApi.VoUtils.timeFormat(
            new Date().getTime() + 60 * 60 * 1000,
            'yyyy-mm-dd hh:00:00',
          )
        } else {
          this.homeStartTime = ''
          this.homeEndTime = ''
        }
        this.labelInfo.forEach((info) => {
          if (e.id === info.id) {
            info.selected = true
          } else {
            info.selected = false
          }
        })
      },
      getInitDate(date) {
        // console.log('initDate', date)
        // this.initDate = date
        // this.homeStartTime = this.initDate
      },
      //日期选择
      showPicker(datekey) {
        this.datekey = datekey
        this.pickerShow = true
      },
      //日期选择
      confirmDate(e) {
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')

        if (this.datekey === 'homeEndTime' && this.homeStartTime && date < this.homeStartTime) {
          uni.$u.toast('开始时间不能大于结束时间！')
          return
        }
        if (this.datekey === 'homeStartTime' && this.homeEndTime && date > this.homeEndTime) {
          uni.$u.toast('开始时间不能大于结束时间2！')
          return
        }
        this.pickerShow = false
        this[this.datekey] = date
      },
      //日期选择
      dateChange(date) {
        console.log('date', date)
        if (this.datekey === 'homeEndTime' && this.homeStartTime && date < this.homeStartTime) {
          uni.$u.toast('开始时间不能大于结束时间！')
          return
        }
        if (this.datekey === 'homeStartTime' && this.homeEndTime && date > this.homeEndTime) {
          uni.$u.toast('开始时间不能大于结束时间！')
          return
        }
        this[this.datekey] = date
        this.pickerShow = false
      },
      /**
       * 重置
       */
      resetFn() {
        this.labelInfo.forEach((item) => {
          item.selected = false
        })
        this.homeStartTime = ''
        this.homeEndTime = ''
        this.daysName = ''
        this.days = ''
        this.$emit('confirm', {})
      },
      /**
       * 筛选
       */
      siftFn() {
        let data = {
          days: this.days,
          daysName: this.daysName,
          homeStartTime: this.homeStartTime,
          homeEndTime: this.homeEndTime,
        }
        this.$emit('confirm', data)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pop {
    width: 750rpx;
    height: 100vh;
    &-line {
      background: #f7f7f8;
      height: 16rpx;
    }
    &-box {
      background: #fff;
      padding: 48rpx 0 48rpx 32rpx;
      border-top: 2rpx solid $v-bg-light;
      &__label {
        width: 152rpx;
        height: 64rpx;
        line-height: 64rpx;
        text-align: center;
        font-size: 24rpx;
        border-radius: 32rpx;
        box-sizing: border-box;
        margin-right: 28rpx;
      }
    }
    &-main {
      background: #fff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
    &-bottom {
      background: #fff;
      padding: 20rpx 32rpx;
      border-top: 2rpx solid $v-bg-light;
      display: flex;
      align-items: center;
      font-size: 32rpx;
      text-align: center;
      &__reset {
        flex: 1;
        height: 92rpx;
        line-height: 82rpx;
        border: 2rpx solid #d3d4db;
        border-radius: 90rpx;
        box-sizing: border-box;
        color: $v-c0-85;
      }
      &__sift {
        flex: 1;
        margin-left: 36rpx;
        height: 92rpx;
        line-height: 82rpx;
        background: #ff5319;
        border-radius: 84rpx;
        color: #ffffff;
      }
    }
  }
  .selected {
    background: #ffece5;
    border: 2rpx solid #ffb299;
    color: #ff5319;
  }
  .un-selected {
    color: $v-c0-85;
    background: #f7f7f8;
    border: 2rpx solid #f7f7f8;
  }
  .picker-input {
    background: #f6f7f8;
    border-radius: 8rpx;
    font-size: 24rpx;
    color: rgba(0, 0, 0, 0.85);
    line-height: 36rpx;
    flex: 1;
    border: 0;
    padding: 0 18rpx !important;
    align-items: center;
    height: 80rpx;
  }
  .r-line {
    width: 18px;
    height: 1px;
    margin: 0 16rpx;
    background: #d3d4db;
  }
  .border-input {
    border: 2rpx solid rgba(0, 0, 0, 0.25);
  }
</style>
