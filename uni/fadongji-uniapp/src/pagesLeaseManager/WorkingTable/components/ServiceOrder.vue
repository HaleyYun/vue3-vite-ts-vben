<template>
  <view class="order">
    <view v-for="info in orderList" :key="info.id" class="order-item bg-white">
      <view class="flex flex-row flex-vertical-c flex-justify-between">
        <view class="flex flex-row flex-vertical-c">
          <view class="fz-28 lh42 color-block">订单号：{{ info.id }}</view>
          <view class="order-copy m-l-10" @click="copyThis(info.id)">复制</view>
        </view>
        <view class="order-state">{{ info.statusName }}</view>
      </view>
      <view class="fz-28 lh42 color-block m-t-8">下单时间：{{ info.createTime }} </view>
      <view class="line-bg order-line m-t-16" />
      <view class="flex flex-vertical-c m-t-16">
        <VoIcon color="#22284B" name="smile-m" size="24" />
        <view class="m-l-8 fz-28 lh42 order-title">{{ info.shopName }}</view>
      </view>
      <block v-for="(item, index) in info.goodsDetail">
        <view :key="index" class="flex flex-row m-t-16">
          <image :src="item.pic[0]" class="order-img" />
          <view class="flex1">
            <view class="fz-32 fz-b color-block m-l-16">{{ item.goodsName }}</view>
            <view class="m-t-16 m-l-16 flex flex-row flex-vertical-c flex-justify-between">
              <view class="flex flex-row flex-vertical-c">
                <view class="order-price">最终售价</view>
                <VoPointPrice
                  :left-size="14"
                  :price="item.originalPrice"
                  :right-size="12"
                  :show-unit="true"
                  class="m-l-8"
                  color="#F20014"
                  display="inline-block"
                />
              </view>
              <view class="fz-28 lh42 color-block-45">x{{ item.goodsCount }}</view>
            </view>
            <view class="m-t-16 m-l-16 flex flex-row flex-vertical-c">
              <view class="order-price">投资价</view>
              <VoPointPrice
                :left-size="14"
                :price="item.originalPrice"
                :right-size="12"
                :show-unit="true"
                class="m-l-8"
                color="#F20014"
                display="inline-block"
              />
            </view>
          </view>
        </view>
      </block>
      <view class="flex flex-justify-between flex-vertical-c m-t-24">
        <view class="fz-28 lh42 color-block">
          共{{ info.goodsDetail.length }}种 1件商品{{ info.totalCount }}
        </view>
        <view class="flex flex-row flex-vertical-c">
          <view class="fz-28 lh42 color-block-45">应付款</view>
          <VoPointPrice
            :left-size="14"
            :price="info.payAmount"
            :right-size="12"
            :show-unit="true"
            class="lh40 m-l-8"
            color="rgba(0,0,0,0.85)"
            display="inline-block"
          />
        </view>
      </view>
      <view class="flex flex-justify-between flex-vertical-c m-t-8">
        <view class="fz-28 lh42 color-block-45">扣除服务费{{ info.serviceAmount || 0 }}元</view>
        <view class="flex flex-row flex-vertical-c">
          <view class="fz-28 lh42 color-block-45">可入账</view>
          <VoPointPrice
            :left-size="14"
            :price="info.canObtainAmount"
            :right-size="12"
            :show-unit="true"
            class="lh40 m-l-8"
            color="#F20014"
            display="inline-block"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ServiceOrder',
    props: {
      // 卡片展示信息
      infoList: {
        type: Array,
        default: function () {
          return []
        },
      },
    },
    computed: {
      orderList: function () {
        let arr = []
        this.infoList.forEach((item) => {
          let count = 0
          item.goodsDetail.forEach((it) => {
            count += it.goodsCount
          })
          item.totalCount = count
          arr.push(item)
        })
        return arr
      },
    },
    data() {
      return {
        // infoList: [
        //   {
        //     id: 1,
        //     orderNum: '订单号：202293841884563456',
        //     state: '待付款',
        //     time: '下单时间：2022-04-28 13:22:43',
        //     name: '郑州安途服务商',
        //     title: '江陵动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)',
        //     img: '/static/demo/rectangle.png',
        //     price: 99990,
        //     investment: 99980,
        //     num: '共1种 1件商品',
        //     fees: 100,
        //   },
        //   {
        //     id: 2,
        //     orderNum: '订单号：202293841884563456',
        //     state: '已发货',
        //     time: '下单时间：2022-04-28 13:22:43',
        //     name: '郑州安途服务商',
        //     title: '江陵动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)',
        //     img: '/static/demo/rectangle.png',
        //     price: 99990,
        //     investment: 99980,
        //     num: '共1种 1件商品',
        //     fees: 100,
        //   },
        //   {
        //     id: 3,
        //     orderNum: '订单号：202293841884563456',
        //     state: '已完成',
        //     time: '下单时间：2022-04-28 13:22:43',
        //     name: '郑州安途服务商',
        //     title: '江陵动力 全EA888发动机总成适用于奥迪1.8T 二代发动机(升级款)',
        //     img: '/static/demo/rectangle.png',
        //     price: 99990,
        //     investment: 99980,
        //     num: '共1种 1件商品',
        //     fees: 100,
        //   },
        // ],
      }
    },
    methods: {
      /**
       * 复制
       */
      copyThis(data) {
        uni.setClipboardData({
          data: data,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .order {
    width: 750rpx;
    &-item {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
      margin-bottom: 16rpx;
    }
    &-line {
      width: 100%;
      height: 2prx;
      background: #f7f7f8;
    }
    &-copy {
      font-size: 28rpx;
      line-height: 42rpx;
      color: #155bd4;
    }
    &-state {
      font-size: 28rpx;
      line-height: 42rpx;
      color: #ff5319;
    }
    &-title {
      color: #22284b;
    }
    &-img {
      width: 128rpx;
      height: 128rpx;
      border-radius: 8rpx;
    }
    &-price {
      box-sizing: border-box;
      padding: 2rpx 4rpx;
      border-radius: 4rpx;
      border: 2rpx solid #f20014;
      background: #ffe5e8;
      font-size: 24rpx;
      line-height: 28rpx;
      color: #f20014;
    }
  }
</style>
