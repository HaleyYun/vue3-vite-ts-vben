<template>
  <view class="sales">
    <ServiceRegiste v-if="state === 1" />
    <VoNoData v-if="state === 2" :no-data-tips="['该服务商未完成信息认证，', '暂无该模块数据']" />
    <block v-if="state === 3">
      <block v-if="tab === 0">
        <view v-for="sale in salesList" :key="sale.id" class="sales-item">
          <view class="sales-time fz-28 lh42 color-block">
            <view class="flex-row flex flex-justify-between flex-vertical-c">
              <view>服务单号：{{ sale.orderNum }}</view>
              <view class="color-block-45">{{ applyList[sale.states] }}</view>
            </view>
            <view
              v-if="sale.states !== 0"
              class="flex-row flex flex-justify-between flex-vertical-c m-t-8"
            >
              <view class="flex1"></view>
              <view class="sales-compensate flex flex-row flex-vertical-c">
                <view>已补偿：</view>
                <VoPointPrice
                  :left-size="14"
                  :price="sale.price"
                  :right-size="14"
                  :show-unit="true"
                  class="m-l-8"
                  color="#FF5319"
                  display="inline-block"
                />
              </view>
            </view>
          </view>
          <view class="m-t-16 flex flex-row">
            <image :src="sale.img" class="sales-img"></image>
            <view class="flex1 flex flex-column">
              <span class="fz-b fz-28 lh150 color-block m-l-16">{{ sale.title }}</span>
              <view class="flex flex-row flex-vertical-c m-t-24">
                <span class="fz-26 lh150 color-block-45 m-l-16">商品识别码：</span>
                <span class="fz-26 lh150 color-block-45 m-l-4">{{ sale.code }}</span>
              </view>
              <view class="flex flex-row flex-vertical-c m-t-4">
                <span class="fz-26 lh150 color-block-45 m-l-16">故障件：</span>
                <span class="fz-26 lh150 color-block-45 m-l-4">{{ sale.thing }}</span>
              </view>
            </view>
          </view>
          <view class="sales-card m-t-16">
            <view class="sales-status">{{ statusList[sale.pos] }}</view>
            <view class="lh150 fz-28 color-block-65 flex1 m-l-26">{{ sale.result }}</view>
          </view>
        </view>
      </block>
      <block v-else-if="tab === 1">
        <!--    todo根据接口调整sale.pos === 0 || sale.pos === 1    -->
        <view
          v-for="sale in salesList"
          v-if="sale.pos === 0 || sale.pos === 1"
          :key="sale.id"
          class="sales-item"
        >
          <view class="sales-time fz-28 lh42 color-block">
            <view class="flex-row flex flex-justify-between flex-vertical-c">
              <view>服务单号：{{ sale.orderNum }}</view>
              <view class="color-block-45">{{ applyList[sale.states] }}</view>
            </view>
            <view
              v-if="sale.states !== 0"
              class="flex-row flex flex-justify-between flex-vertical-c m-t-8"
            >
              <view class="flex1"></view>
              <view class="sales-compensate flex flex-row flex-vertical-c">
                <view>已补偿：</view>
                <VoPointPrice
                  :left-size="14"
                  :price="sale.price"
                  :right-size="14"
                  :show-unit="true"
                  class="m-l-8"
                  color="#FF5319"
                  display="inline-block"
                />
              </view>
            </view>
          </view>
          <view class="m-t-16 flex flex-row">
            <image :src="sale.img" class="sales-img"></image>
            <view class="flex1 flex flex-column">
              <span class="fz-b fz-28 lh150 color-block m-l-16">{{ sale.title }}</span>
              <view class="flex flex-row flex-vertical-c m-t-24">
                <span class="fz-26 lh150 color-block-45 m-l-16">商品识别码：</span>
                <span class="fz-26 lh150 color-block-45 m-l-4">{{ sale.code }}</span>
              </view>
              <view class="flex flex-row flex-vertical-c m-t-4">
                <span class="fz-26 lh150 color-block-45 m-l-16">故障件：</span>
                <span class="fz-26 lh150 color-block-45 m-l-4">{{ sale.thing }}</span>
              </view>
            </view>
          </view>
          <view class="sales-card m-t-16">
            <view class="sales-status">{{ statusList[sale.pos] }}</view>
            <view class="lh150 fz-28 color-block-65 flex1 m-l-26">{{ sale.result }}</view>
          </view>
        </view>
      </block>
      <block v-else-if="tab === 2">
        <view
          v-for="sale in salesList"
          v-if="sale.pos === 2 || sale.pos === 3"
          :key="sale.id"
          class="sales-item"
        >
          <view class="sales-time fz-28 lh42 color-block">
            <view class="flex-row flex flex-justify-between flex-vertical-c">
              <view>服务单号：{{ sale.orderNum }}</view>
              <view class="color-block-45">{{ applyList[sale.states] }}</view>
            </view>
            <view
              v-if="sale.states !== 0"
              class="flex-row flex flex-justify-between flex-vertical-c m-t-8"
            >
              <view class="flex1"></view>
              <view class="sales-compensate flex flex-row flex-vertical-c">
                <view>已补偿：</view>
                <VoPointPrice
                  :left-size="14"
                  :price="sale.price"
                  :right-size="14"
                  :show-unit="true"
                  class="m-l-8"
                  color="#FF5319"
                  display="inline-block"
                />
              </view>
            </view>
          </view>
          <view class="m-t-16 flex flex-row">
            <image :src="sale.img" class="sales-img"></image>
            <view class="flex1 flex flex-column">
              <span class="fz-b fz-28 lh150 color-block m-l-16">{{ sale.title }}</span>
              <view class="flex flex-row flex-vertical-c m-t-24">
                <span class="fz-26 lh150 color-block-45 m-l-16">商品识别码：</span>
                <span class="fz-26 lh150 color-block-45 m-l-4">{{ sale.code }}</span>
              </view>
              <view class="flex flex-row flex-vertical-c m-t-4">
                <span class="fz-26 lh150 color-block-45 m-l-16">故障件：</span>
                <span class="fz-26 lh150 color-block-45 m-l-4">{{ sale.thing }}</span>
              </view>
            </view>
          </view>
          <view class="sales-card m-t-16">
            <view class="sales-status">{{ statusList[sale.pos] }}</view>
            <view class="lh150 fz-28 color-block-65 flex1 m-l-26">{{ sale.result }}</view>
          </view>
        </view>
      </block>
    </block>
  </view>
</template>

<script>
  import ServiceRegiste from './ServiceRegiste'

  export default {
    name: 'ServiceAfterSales',
    components: { ServiceRegiste },
    props: {
      salesList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        state: 3,
        tab: 0, //0全部 1进行中 2已完成
        statusList: ['待审核', '待补偿', '已完成', '待签收'],
        applyList: ['运输损坏', '更换零部件', '换机'],
      }
    },
    methods: {
      setType(res) {
        console.log('as', res.pos)
        this.tab = res.pos
      },
    },
  }
</script>

<style lang="scss" scoped>
  .sales {
    width: 750rpx;
    background-color: #f7f7f8;
    &-time {
      padding-bottom: 16rpx;
      border-bottom: 2rpx solid $v-bg-light;
    }
    &-item {
      background-color: #fff;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      margin-bottom: 16rpx;
      &:first-child {
        margin-top: 16rpx;
      }
    }
    &-compensate {
      font-size: 28rpx;
      color: #ff3f00;
      line-height: 150%;
    }
    &-des {
      font-weight: 400;
    }
    &-img {
      width: 160rpx;
      height: 160rpx;
      border-radius: 8rpx;
      &__more {
        position: absolute;
        font-size: 36rpx;
        line-height: 54rpx;
        font-weight: bold;
        color: white;
        right: 8rpx;
        bottom: 8rpx;
      }
    }
    &-card {
      padding: 26rpx 24rpx 28rpx 24rpx;
      background-color: #f6f7f8;
      border-radius: 8rpx;
      align-items: center;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    &-status {
      font-weight: bold;
      font-size: 28rpx;
      color: #ff5319;
      line-height: 150%;
    }
  }
</style>
