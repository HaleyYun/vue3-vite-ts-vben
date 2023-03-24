<template>
  <view class="fz-24 p-t-52 p-b-60 order">
    <view class="fz-28 order_title">
      <view>
        <!--        <text class="green" :class="itemData.type">{{ itemData.typeDesc }}</text>-->
        <!--    todo 添加状态图标    -->
        <block v-if="itemData.supportType === 33">
          <text class="order-title__sign flex-shark-0 m-r-16 green">回收</text>
        </block>
        <block v-else-if="itemData.supportType === 31">
          <text class="order-title__sign flex-shark-0 m-r-16 yellow">售后</text>
        </block>
        <block v-else-if="itemData.supportType === 32">
          <text class="order-title__sign flex-shark-0 m-r-16">安装</text>
        </block>
        <text class="fz-b fz-32 m-l-16">{{ itemData.title }}</text>
      </view>
      <view
        ><text class="fz-40">{{ itemData.price }}</text
        >元</view
      >
    </view>
    <view class="m-t-26 order_name">
      <text>{{ itemData.name }}</text>
      <text class="m-l-24"
        >距离<text class="order_name-distance">{{ itemData.distance }}</text
        >公里</text
      >
    </view>
    <view class="m-t-16">
      <VoIcon name="address" size="14" />
      <text class="m-l-13">{{ itemData.address }}</text>
    </view>
    <view class="order_time m-t-8">
      <text>上门时间：</text>
      <text>{{ itemData.workTime }}</text>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      itemData: {
        type: Object,
        default() {
          return {
            type: 'recovery',
            typeDesc: '回收',
            title: '郑州市-金水区-龙子湖街道正商木华广场A座郑州市-金水区-龙子湖街道正商木华广场A座',
            price: '120',
            name: '新明汽配',
            distance: '12.6',
            address: '郑州市-金水区-龙子湖街道正商木华广场A座',
            workTime: '08:30-12:00 08:30-12:00',
          }
        },
      },
    },
    data() {
      return {}
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    border-bottom: 1rpx solid $v-bg-light;
    box-sizing: border-box;

    &_title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      > :nth-child(1) {
        flex-grow: 1;
        display: flex;
        align-items: center;

        .green {
          display: inline-block;
          width: 80rpx;
          height: 36rpx;
          font-size: 24rpx;
          line-height: 36rpx;
          border-radius: 8rpx;
          color: white;
          text-align: center;
          padding: 0rpx 16rpx;
        }

        > :nth-child(2) {
          display: inline-block;
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      > :nth-child(2) {
        color: #ee0a24;
      }
      &__sign {
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        padding: 0 16rpx;
        border-radius: 8rpx;
        background: linear-gradient(96.72deg, #f20014 -13.61%, #fa6419 104.67%);
        color: #fff;
        &.green {
          background: linear-gradient(96.72deg, #00b259 -13.61%, #29d446 104.67%);
        }
        &.yellow {
          background: linear-gradient(96.72deg, #ff9b05 -13.61%, #ffbe0d 104.67%);
        }
      }
    }

    &_name {
      color: rgba(0, 0, 0, 0.85);

      &-distance {
        color: #ff5319;
      }
    }

    &_time {
      color: rgba(0, 0, 0, 0.65);
      padding: 14rpx 16rpx;
      background-color: #f7f7f8;
      border-radius: 8rpx;
    }
  }

  // green
  .recovery {
    background-color: #00b259;
  }

  // red
  .exect {
    background-color: #f20014;
  }

  .postsale {
    background-color: #ff9b05;
  }
</style>
