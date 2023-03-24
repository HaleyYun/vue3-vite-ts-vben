<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="receivable flex flex-column overflow-hidden"
  >
    <VoNav isHaveMore title="应收账款">
      <block slot="operation">
        <view class="fz-28 p-r-20" @click="changeShow">
          {{ rightShow ? '日历' : '列表' }}
        </view>
      </block>
    </VoNav>
    <u-overlay :show="filterVisible" class="overlay-wrap" @click="filterVisible = false">
      <view class="top" @tap.stop>
        <VoNav isHaveMore title="应收账款">
          <block slot="operation">
            <view class="fz-28 p-r-20" @click="rightShow = !rightShow">
              {{ rightShow ? '日历' : '列表' }}
            </view>
          </block>
        </VoNav>
        <view class="h16" />
        <view class="bg-white scree">
          <view class="scree-bottom">
            <view class="flex flex-vertical-c flex-justify-between">
              <view class="color-block-45 fz-28">剩余应收还款</view>
              <FilterTags :style="{ width: 'initial' }" :tag-list="[]" />
            </view>
            <view class="fz-b fz-28 m-b-16">还款日</view>
            <view class="flex flex-vertical-c p-r-32">
              <view
                :class="showBorder === 1 ? 'scree-border' : ''"
                class="scree-time"
                @click="
                  showPickerStart = true
                  showBorder = 1
                "
              >
                <view class="fz-24 color-block-85 m-l-16">{{
                  formData.startTime || '请选择开始时间'
                }}</view>
              </view>
              <view class="scree-timeLine" />
              <view
                :class="showBorder === 2 ? 'scree-border' : ''"
                class="m-l-18 scree-time"
                @click="
                  showPickerEnd = true
                  showBorder = 2
                "
              >
                <view class="fz-24 color-block-85 m-l-16">{{
                  formData.endTime || '请选择结束时间'
                }}</view>
              </view>
            </view>
          </view>
          <view class="flex m-t-48 scree-button">
            <view class="scree-reset" @click.stop="reset">重置</view>
            <view class="scree-right" @click.stop="confirm">筛选</view>
          </view>
        </view>
      </view>
    </u-overlay>
    <ReceivableList
      v-show="rightShow"
      ref="ReceivableList"
      :time-range="formData"
      @showFilter="showFilter"
    />
    <receivableListCalendar
      v-show="!rightShow"
      ref="receivableListCalendar"
    />
    <u-datetime-picker
      v-if="showPickerStart"
      v-model="dateStart"
      :maxDate="formData.endTime ? dateEnd : 3740967920000"
      :minDate="1640966400000"
      :show="showPickerStart"
      closeOnClickOverlay
      mode="date"
      placeholder="请选择开始时间"
      title="选择月份"
      @cancel="showPickerStart = false"
      @confirm="confirmStart"
    />
    <u-datetime-picker
      v-if="showPickerEnd"
      v-model="dateEnd"
      :maxDate="3740967920000"
      :minDate="formData.startTime ? dateStart : 1640966400000"
      :show="showPickerEnd"
      closeOnClickOverlay
      mode="date"
      placeholder="请选择结束时间"
      title="选择月份"
      @cancel="showPickerEnd = false"
      @confirm="confirmEnd"
    />
  </view>
</template>

<script>
  import ReceivableList from './components/ReceivableList'
  import ReceivableListCalendar from './components/ReceivableListCalendar'
  import FilterTags from '@/components/VoTabbarCreate/components/FilterTags'

  export default {
    components: {
      ReceivableList,
      ReceivableListCalendar,
      FilterTags,
    },
    data() {
      return {
        showBorder: 0,
        rightShow: false,
        filterVisible: false,
        dateStart: Number(new Date()),
        dateEnd: Number(new Date()),
        formData: {
          startTime: null,
          endTime: null,
        },
        showPickerStart: false,
        showPickerEnd: false,
      }
    },
    onLoad() {
      // this.getData()
    },
    methods: {
      /**
       * 切换展示类型
       */
      changeShow() {
        this.rightShow = !this.rightShow
        if (this.rightShow) {
          this.$refs.ReceivableList.initList(true)
          this.$refs.ReceivableList.getTopData()
        } else {
          this.$refs.receivableListCalendar.getCalendar()
          this.$refs.receivableListCalendar.getTopData()
        }
      },
      confirmStart(e) {
        this.formData.startTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        this.showPickerStart = false
      },
      confirmEnd(e) {
        this.formData.endTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        this.showPickerEnd = false
      },
      // 确认筛选条件
      confirm() {
        if (this.formData.startTime && this.formData.endTime) {
          this.$refs.ReceivableList.getTopData(this.formData)
          this.$refs.ReceivableList.initList(true)
        }
        this.filterVisible = false
      },
      // 重置筛选条件
      reset() {
        this.formData.startTime = this.formData.endTime = ''
        this.$refs.ReceivableList.initList(true)
        this.$refs.ReceivableList.getTopData()
      },
      // 展示筛选框
      showFilter() {
        this.filterVisible = true
      },
    },
  }
</script>

<style lang="scss" scoped>
  .receivable {
    width: 100vw;
    height: 100vh;
    ::v-deep .page {
      width: initial;
      height: initial;
    }
  }
  .overlay-wrap {
    // margin-top: 288rpx;
    height: 100vh;
    .top {
      background-color: #f7f7f8;
    }
    .scree {
      &-bottom {
        padding: 0 0 34rpx 32rpx;
      }
      &-time {
        background-color: #f6f7f8;
        border-radius: 8rpx;
        width: 308rpx;
        height: 80rpx;
        line-height: 80rpx;
        color: $v-c0-65;
        box-sizing: border-box;
        border: 2rpx solid #f6f7f8;
      }
      &-border {
        border: 2rpx solid $v-c0-25;
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
        border: 2rpx solid #d3d4db;
        background-color: #ffffff;
        color: $v-c0-85;
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
      &-button {
        border-top: 2rpx solid $v-bg-light;
      }
    }
  }
</style>
