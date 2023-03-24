<template>
  <view class="ship">
    <view>
      <VoNav is-fixed title="出货仓库" :z-index="10" is-have-more>
        <template #back>
          <VoIcon name="left-arrow" color="#000000" :opacity="0.45" />
        </template>
      </VoNav>
      <view class="ship-list" v-for="(info, index) of shipList" :key="index">
        <u-sticky offset-top="0">
          <view class="ship-list__title">{{ info.title }}</view>
        </u-sticky>
        <shipList
          v-for="item of info.shipCell"
          :key="item.id"
          :ship-cell="item"
          @selectFn="selectFn(item.id)"
        />
      </view>
    </view>
    <VoQuick :show.sync="showDirect" />
  </view>
</template>

<script>
import shipList from "./components/shipList";

export default {
    name: 'ShipmentWarehouse',
    components: { shipList },
    data() {
      return {
        showDirect: false,
        shipList: [
          {
            title: '我的仓库',
            shipCell: [
              {
                id: 1,
                name: '郑州仓',
                select: false,
                available: 500,
                physical: 488,
                onRoute: 50,
                occupy: 6,
              },
              {
                id: 2,
                name: '广州仓',
                select: false,
                available: 500,
                physical: 488,
                onRoute: 50,
                occupy: 6,
              },
              {
                id: 3,
                name: '云南仓',
                select: false,
                available: 500,
                physical: 488,
                onRoute: 50,
                occupy: 6,
              },
              {
                id: 4,
                name: '上海仓',
                select: false,
                available: 500,
                physical: 488,
                onRoute: 50,
                occupy: 6,
              },
            ],
          },
          {
            title: '平台仓',
            shipCell: [
              {
                id: 5,
                name: '北京仓',
                select: false,
                available: 500,
                physical: 488,
                onRoute: 50,
                occupy: 6,
              },
              {
                id: 6,
                name: '海南仓',
                select: false,
                available: 500,
                physical: 488,
                onRoute: 50,
                occupy: 6,
              },
              {
                id: 7,
                name: '湖南仓',
                select: false,
                available: 500,
                physical: 488,
                onRoute: 50,
                occupy: 6,
              },
              {
                id: 8,
                name: '郑州仓',
                select: false,
                available: 500,
                physical: 488,
                onRoute: 50,
                occupy: 6,
              },
            ],
          },
          {
            title: '自有仓',
            shipCell: [
              {
                id: 13,
                name: '北京仓',
                select: false,
                available: 500,
                physical: 488,
                onRoute: 50,
                occupy: 6,
              },
              {
                id: 14,
                name: '海南仓',
                select: false,
                available: 500,
                physical: 488,
                onRoute: 50,
                occupy: 6,
              },
            ],
          },
        ],
      }
    },
    methods: {
      selectFn(e) {
        let data = {}
        this.shipList.forEach((info) => {
          info.shipCell.forEach((item) => {
            if (e === item.id) {
              data = item
              item.select = true
            } else {
              item.select = false
            }
          })
        })
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/RepairProduct/ApplyReplenishment?data=' + JSON.stringify(data),
        )
      },
    },
    onLoad(options) {
      if (options.id) {
        this.shipList.forEach((info) => {
          info.shipCell.forEach((item) => {
            if (Number(options.id) === item.id) {
              item.select = true
            }
          })
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .ship {
    width: 750rpx;
    min-height: 100vh;
    box-sizing: border-box;
    &-list {
      background: #ffffff;
      margin-top: 24rpx;
      &__title {
        margin: 0 32rpx;
        width: 375px;
        height: 88rpx;
        font-weight: bold;
        font-size: 32rpx;
        line-height: 88rpx;
        color: $v-c0-85;
        background: #ffffff;
      }
    }
  }
</style>
