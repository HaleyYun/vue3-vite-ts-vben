<template>
  <view class="sales">
    <view v-for="sale in salesList" :key="sale.id" class="sales-item">
      <view class="sales-time fz-28 lh42 color-block">
        <view class="flex-row flex flex-justify-between flex-vertical-c">
          <view>服务单号：{{ sale.id }}</view>
          <!-- <view class="color-block-45">{{ applyList[sale.states] }}</view> -->
          <view class="color-block-45">{{ sale.typeName }}</view>
        </view>
        <view
          v-if="sale.statusName === '已补偿'"
          class="flex-row flex flex-justify-between flex-vertical-c m-t-8"
        >
          <view class="flex1" />
          <view class="sales-compensate flex flex-row flex-vertical-c">
            <view>已补偿：</view>
            <VoPointPrice
              :left-size="14"
              :price="sale.amount"
              :right-size="14"
              :show-unit="true"
              class="m-l-8"
              color="#FF5319"
              display="inline-block"
            />
          </view>
        </view>
      </view>
      <template v-for="(item, index) in sale.goodsDetail">
        <view class="m-t-16 flex flex-row">
          <image :src="item.pic[0]" class="sales-img" />
          <view class="flex1 flex flex-column">
            <span class="fz-b fz-28 lh150 color-block m-l-16">{{ item.goodsName }}</span>
            <view class="flex flex-row flex-vertical-c m-t-24">
              <span class="fz-26 lh150 color-block-45 m-l-16">商品识别码：</span>
              <span class="fz-26 lh150 color-block-45 m-l-4">{{ item.goodsCode }}</span>
            </view>
            <view class="flex flex-row flex-vertical-c m-t-4">
              <span class="fz-26 lh150 color-block-45 m-l-16">故障件：</span>
              <span class="fz-26 lh150 color-block-45 m-l-4">{{ sale.unit }}</span>
            </view>
          </view>
        </view>
      </template>
      <view class="sales-card m-t-16">
        <!-- <view class="sales-status">{{ statusList[sale.pos] }}</view> -->
        <view class="sales-status">{{ sale.statusName }}</view>
        <view class="lh150 fz-28 color-block-65 flex1 m-l-26">
          <!-- TODO: 判断条件不足，无法渲染 -->
          <template v-if="sale.typeName === '更换零部件'">
            <template v-if="sale.status === 4110"
              >{{ sale.typeName }}申请提交成功，等待平台审核</template
            >
            <template v-else-if="sale.status === 4120">审核通过，待买家上传寄回物流</template>
            <template v-else-if="sale.status === 4130">已寄出旧件，待卖家签收</template>
            <!--            <template v-else-if="sale.status === 4140">4140, "待新机签收"</template>-->
            <template v-else-if="sale.status === 4150"
              >更换零部件申请提交成功，等待平台审核</template
            >
            <template v-else-if="sale.status === 4160">审核通过，待平台发放补偿</template>
            <template v-else-if="sale.status === 4161">4161"已完成", </template>
            <template v-else-if="sale.status === 4170">4170 "已取消",</template>
            <template v-else-if="sale.status === 4180">4180 已关闭" </template>

            <template v-if="sale.statusName === '待审核'"> </template>
            <template v-else-if="sale.statusName === '待补偿'"> 审核通过，待平台发放补偿 </template>
            <template v-else-if="sale.statusName === '已完成'">
              审核通过，待买家上传寄回物流
            </template>
            <template v-else-if="sale.statusName === '待签收'"> 已寄出旧件，待卖家签收 </template>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ServiceAfterSales',
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
