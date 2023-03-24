<template>
  <view class="cost">
    <VoNav is-have-more title="项目服务费" />
    <view class="flex1 m-t-16 p-b-safe-area cost-content">
      <view class="fz-28 lh150 fz-b color-block"> {{ name }} 服务费明细</view>
      <view class="m-t-24 cost-table flex flex-vertical-c m-l-4 m-r-4">
        <view class="cost-table__text1">角色</view>
        <view class="cost-table__line1" />
        <view class="cost-table__text2">服务费</view>
      </view>
      <view v-for="(item, index) in costList" :key="index">
        <view class="cost-table flex flex-vertical-c m-l-4 m-r-4">
          <view class="cost-table__text3">{{ item.roleName }}</view>
          <view class="cost-table__line2" />
          <view class="cost-table__text4">{{ item.serveFee }}元</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'ShopServiceCost',
    data() {
      return {
        name: '',
        costList: [],
      }
    },
    onLoad(options) {
      const id = options.id
      console.log(id)
      this.name = options.name
      this.initServiceData(id)
    },
    methods: {
      async initServiceData(id) {
        const { code, data } = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentGetProjectServeFee(
          {
            id,
          },
        )
        if (+code === 20001) {
          this.costList = data
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .cost {
    display: flex;
    flex-direction: column;
    width: 750rpx;
    height: 100vh;
    background: #f6f7f8;

    &-content {
      padding: 24rpx 46rpx;
      background: white;
    }

    &-table {
      width: 648rpx;

      &__line1 {
        width: 2rpx;
        height: 72rpx;
        background: rgb(0, 0, 0, 0.08);
      }

      &__text1 {
        background: #f7f7f8;
        border-radius: 8rpx 0rpx 0rpx 0rpx;
        color: rgba(0, 0, 0, 0.85);
        align-items: center;
        justify-items: center;
        text-align: center;
        padding: 14rpx 0;
        font-weight: bold;
        font-size: 28rpx;
        line-height: 150%;
        width: 432rpx;
      }

      &__text2 {
        background: #f7f7f8;
        border-radius: 0rpx 8rpx 0rpx 0rpx;
        color: rgba(0, 0, 0, 0.85);
        align-items: center;
        justify-items: center;
        text-align: center;
        padding: 14rpx 0;
        font-weight: bold;
        font-size: 28rpx;
        line-height: 150%;
        width: 216rpx;
      }

      &__line2 {
        width: 2rpx;
        height: 72rpx;
        background: #f7f7f8;
      }

      &__text3 {
        background: #fff;
        border-radius: 8rpx 0rpx 0rpx 0rpx;
        color: rgba(0, 0, 0, 0.85);
        align-items: center;
        justify-items: center;
        padding: 14rpx 0rpx 14rpx 24rpx;
        font-size: 24rpx;
        line-height: 150%;
        width: 408rpx;
        border-left: 2rpx solid #f7f7f8;
        border-bottom: 2rpx solid #f7f7f8;
      }

      &__text4 {
        background: #fff;
        border-radius: 0rpx 8rpx 0rpx 0rpx;
        color: rgba(0, 0, 0, 0.85);
        align-items: center;
        justify-items: center;
        text-align: center;
        padding: 14rpx 0;
        font-size: 24rpx;
        line-height: 150%;
        width: 216rpx;
        border-right: 2rpx solid #f7f7f8;
        border-bottom: 2rpx solid #f7f7f8;
      }
    }
  }
</style>
