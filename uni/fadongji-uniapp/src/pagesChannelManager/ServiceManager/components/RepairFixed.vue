<template>
  <view class="fixed relative">
    <view class="fixed-box flex flex-row w-full bg-white">
      <block v-for="(item, index) in tabList">
        <view
          :key="index"
          :class="curTab == index ? 'fixed-screen' : 'fixed-screen1'"
          @click="toRepairScreen(index)"
        >
          {{ item.name }}
          <view v-if="item.status === 1" class="fixed-tips">
            <u-badge :value="item.count || 0" bgColor="#e50012" max="99" type="warning" />
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SalesFixed',
    props: {
      tabList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        curTab: 0,
      }
    },
    methods: {
      /**
       * 筛选数据
       * @param index  当前点击下标
       */
      toRepairScreen(index) {
        this.curTab = index
        this.$emit('ChangeRepairStatus', this.tabList[index].status)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fixed {
    width: 750rpx;
    &-box {
      width: 100%;
      white-space: nowrap;
      overflow-x: scroll;
      padding: 34rpx 0 18rpx 46rpx;
      box-sizing: border-box;
    }
    &-screen {
      //width: 176rpx;
      //height: 64rpx;
      //line-height: 64rpx;
      //text-align: center;
      font-size: 24rpx;
      padding: 14rpx 48rpx;
      box-sizing: border-box;
      line-height: 36rpx;
      color: #ff5319;
      background-color: #ffece5;
      border: 2rpx solid #ff6633;
      border-radius: 200rpx;
      margin-right: 28rpx;
      position: relative;
    }
    &-screen1 {
      //width: 176rpx;
      //height: 64rpx;
      //line-height: 64rpx;
      //text-align: center;
      font-size: 24rpx;
      padding: 14rpx 48rpx;
      box-sizing: border-box;
      line-height: 36rpx;
      color: $v-c0-85;
      background-color: #f7f7f8;
      border: 2rpx solid #f7f7f8;
      border-radius: 200rpx;
      margin-right: 28rpx;
      position: relative;
    }
    &-tips {
      position: absolute;
      border-radius: 16rpx;
      right: 0rpx;
      top: -32rpx;
    }
  }
</style>
