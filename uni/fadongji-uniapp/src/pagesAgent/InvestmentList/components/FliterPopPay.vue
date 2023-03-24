<template>
  <u-overlay
    :show="visible"
    class="search-pop"
    opacity="0.45"
    style="position: absolute; top: 98rpx; left: 0rpx; z-index: 99; width: 750rpx; height: 100vh"
    @click="clickover"
  >
    <view class="search-pop__main flex flex-column" @tap.stop>
      <view>
        <view class="btns">
          <view
            v-for="item in btnListPay"
            :key="item.name"
            :class="item.selected ? 'select' : ''"
            class="btn-item"
            @click="btnsPayClick(item)"
          >
            {{ item.name }}
          </view>
        </view>
        <!-- <view v-if="selectData.name === '账期支付'" class="range flex">
          <input
            v-model="minDay"
            :class="isFocus ? 'focus' : ''"
            class="range-input"
            placeholder="最短账期天数"
            type="number"
            @blur="isFocus = false"
            @focus="isFocus = true"
          />
          <view class="line" />
          <input
            v-model="maxDay"
            :class="isFocusmax ? 'focus' : ''"
            class="range-input"
            placeholder="最长账期天数"
            type="number"
            @blur="isFocusmax = false"
            @focus="isFocusmax = true"
          />
        </view> -->
      </view>

      <view class="btm-btn">
        <view class="btn-item" @click.stop="reset"> 重置 </view>
        <view class="btn-item primary" @click.stop="confirm"> 确定 </view>
      </view>
    </view>
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
        // visible: false,
        btnListPay: [
          {
            name: '现金支付',
            selected: false,
            value: 1,
          },
          {
            name: '账期支付',
            selected: false,
            value: 2,
          },
        ],
        selectList: [],
        selectData: '',
        minDay: '',
        maxDay: '',
        isFocus: false,
        isFocusmax: false,
      }
    },
    watch: {
      visible(val) {
        this.selectData = ''
        this.btnListPay.forEach((item) => {
          item.selected = false
        })
        this.minDay = ''
        this.maxDay = ''
      },
    },
    methods: {
      show() {
        // this.visible = true
      },
      clickover() {
        console.log('close')
        this.$emit('close')
      },
      btnsPayClick(data) {
        this.selectData = data
        this.btnListPay.forEach((item) => {
          if (item.value === data.value) {
            item.selected = true
          } else {
            item.selected = false
          }
        })
      },
      reset() {
        this.$emit('reset')
        this.selectData = ''
        this.btnListPay.forEach((item) => {
          item.selected = false
        })
        this.minDay = ''
        this.maxDay = ''
      },
      confirm() {
        let arr = this.btnListPay.filter((item) => item.selected === true)
        this.$emit('confirm', arr[0])
      },
    },
  }
</script>
<style lang="scss" scoped>
  .filter {
    position: absolute;
    top: 260rpx;
    left: 0;
    z-index: 99;
    width: 750rpx;
    height: 100vh;
  }
  .search-pop {
    // height: 100vh;
    // width: 750rpx;
    // position: absolute;
    // top: 96rpx;
    // left: 0;
    // z-index: 99;
    display: flex;
    flex-direction: column;
    &__main {
      // border-top: 16rpx solid #f7f7f8;
      max-height: 600rpx;
    }
    .btm-btn {
      border-top: 2rpx solid #f7f7f8;
      padding: 18rpx 32rpx;
      box-sizing: border-box;
      display: flex;
      background: #fff;
      .btn-item {
        width: 50%;
        height: 80rpx;
        border: 2rpx solid #d3d4db;
        color: $v-c0-85;
        border-radius: 90rpx;
        font-size: 32rpx;
        line-height: 80rpx;
        text-align: center;
        box-sizing: border-box;
        &.primary {
          background: $color-primary-yellow;
          color: #fff;
          margin-left: 36rpx;
          border: 2rpx solid $color-primary-yellow;
        }
      }
    }
    .btns {
      background: #fff;
      padding: 32rpx;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      .btn-item {
        border-radius: 8px;
        height: 60rpx;
        padding: 0 16rpx;
        background: #f7f7f8;
        color: rgba(0, 0, 0, 0.85);
        text-align: center;
        font-size: 24rpx;
        line-height: 60rpx;
        margin-right: 28rpx;
        border: 1px solid #f7f7f8;
        &.select {
          background: $v-tags-btn-disabled;
          border: 1px solid $color-primary-yellow;
          color: $color-primary-yellow;
        }
      }
    }
    .range {
      background: #fff;
      align-items: center;
      padding: 0 32rpx 16rpx 32rpx;
      box-sizing: border-box;
      &-input {
        flex: 1;
        border-radius: 8rpx;
        height: 76rpx;
        font-size: 28rpx;
        line-height: 76rpx;
        background: #f7f7f8;
        border: 1px solid #f7f7f8;
        padding: 18rpx 32rpx;
        box-sizing: border-box;
        &.focus {
          background: #f6f7f8;
          border: 1px solid #6f738a;
        }
      }
      .line {
        width: 36rpx;
        height: 1px;
        background: #d3d4db;
        margin: 0 16rpx;
      }
    }
  }
</style>
