<template>
  <view class="fixed relative">
    <view class="fixed-box flex flex-row w-full bg-white">
      <view
        :class="repairScreen[0].isSelected ? 'fixed-screen' : 'fixed-screen1'"
        @click="toRepairScreen(0)"
        >全部</view
      >
      <view
        :class="repairScreen[1].isSelected ? 'fixed-screen' : 'fixed-screen1'"
        @click="toRepairScreen(1)"
        >未认证</view
      >
      <view
        :class="repairScreen[2].isSelected ? 'fixed-screen' : 'fixed-screen1'"
        class="flex flex-vertical-c flex-justify-c"
        @click="toRepairScreen(2)"
        >待审核
        <view class="fixed-tips">
          <u-badge :value="count" bgColor="#e50012" max="99" type="warning" />
        </view>
      </view>
      <view
        :class="repairScreen[3].isSelected ? 'fixed-screen' : 'fixed-screen1'"
        class="flex flex-vertical-c flex-justify-c"
        @click="toRepairScreen(3)"
        >已认证
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SalesFixed',
    props: {
      count: {
        type: Number || String,
        default: 0,
      },
    },
    data() {
      return {
        repairScreen: [
          {
            name: '全部',
            isSelected: true,
          },
          {
            name: '未认证',
            isSelected: false,
          },
          {
            name: '待审核',
            isSelected: false,
          },
          {
            name: '已认证',
            isSelected: false,
          },
        ],
      }
    },
    methods: {
      toRepairScreen(pos) {
        let i = -1
        this.repairScreen.forEach((item, index) => {
          if (item.isSelected) {
            i = index
          }
          item.isSelected = false
        })
        if (i !== pos) {
          this.repairScreen[pos].isSelected = true
          this.fliterVisible = false
        }
        console.log(pos)
        this.$emit('RepairFixed', { pos: pos })
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
