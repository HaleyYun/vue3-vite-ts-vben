<template>
  <view>
    <view v-if="type == 4" class="goods-card">
      <view class="goods-warehouse">
        <view class="goodsInfo flex">
          <view class="goodsName">
            <view class="overTwoEllipsis">
              <text v-show="dataList.goodsDetail.categoryType" class="good-tips m-r-8">{{
                dataList.goodsDetail.categoryType
              }}</text>
              {{ dataList.goodsDetail.goodsName }}
            </view>
            <view class="SerialNumber">编号：{{ dataList.goodsDetail.goodsCode }}</view>
          </view>
        </view>
      </view>
      <view class="card-salesVolume">
        <slot name="views">
          {{ dataList.views }}
        </slot>
      </view>
      <view class="card-salesVolume">
        <slot name="dayBefore">
          {{ dataList.dayBefore }}
        </slot>
      </view>
      <view class="card-5">
        <slot name="warehouse">
          <view class="overEllipsis">
            {{ dataList.warehouseName }}
          </view>
          <text class="warehouse-more" @click="warehouseMore">更多</text>
        </slot>
      </view>
    </view>
    <view v-else-if="type == 6" class="goods-card">
      <view class="card-ranking">
        <slot name="ranking">
          {{ dataList.ranking }}
        </slot>
      </view>
      <view class="card-customer">
        <view class="overEllipsis">{{ dataList.agentName || dataList.buyerName }}</view>
      </view>
      <view class="card-salesVolume">
        <slot name="salesVolume">
          {{ dataList.salesVolume }}
        </slot>
      </view>
      <view class="card-sales">
        <slot name="sales">
          {{ dataList.sales }}
        </slot>
      </view>
    </view>
    <view v-else class="goods-card">
      <view v-if="type != 3" class="card-1">
        <slot name="ranking">
          {{ dataList.ranking }}
        </slot>
      </view>
      <view class="card-2">
        <view v-if="dataList && dataList.goodsDetail" class="goodsInfo flex">
          <view class="goodsPic">
            <image :src="getPic(dataList.goodsDetail.pic)" />
          </view>
          <view class="goodsName">
            <view class="overTwoEllipsis">
              <text v-show="dataList.goodsDetail.categoryType" class="good-tips m-r-8">{{
                dataList.goodsDetail.categoryType
              }}</text>
              {{ dataList.goodsDetail.goodsName }}
            </view>
            <view class="SerialNumber">编号：{{ dataList.goodsDetail.goodsCode }}</view>
          </view>
        </view>
        <view v-else-if="type == 1" class="modelName">
          <view class="overTwoEllipsis">
            <text v-show="dataList.categoryType" class="good-tips m-r-8">{{
              dataList.categoryType
            }}</text>
            {{ dataList.modelName || dataList.goodsName }}
          </view>
          <!-- <view class="SerialNumber">编号：{{ dataList.modelId || dataList.goodsCode }}</view> -->
        </view>
        <view v-else class="goodsInfo flex">
          <view class="goodsPic">
            <image :src="getPic(dataList.picture || dataList.pic)" />
          </view>
          <view class="goodsName">
            <view class="overTwoEllipsis">
              <text v-show="dataList.categoryType" class="good-tips m-r-8">{{
                dataList.categoryType
              }}</text>
              {{ dataList.name || dataList.goodsName }}
            </view>
            <view class="SerialNumber">编号：{{ dataList.code || dataList.goodsCode }}</view>
          </view>
        </view>
      </view>
      <view :class="type == 3 ? 'card-salesVolume' : 'card-3'">
        <slot name="views">
          {{ dataList.currentNum }}
        </slot>
      </view>
      <view :class="type == 3 ? 'card-sales' : 'card-4'">
        <slot name="dayBefore">
          {{ dataList.lastNum }}
        </slot>
      </view>
    </view>
    <u-modal :closeOnClickOverlay="true" :show="showModal" title="仓库名称" @confirm="confirm">
      <view class="wareHouseText">{{ warehouseName }}</view>
    </u-modal>
  </view>
</template>

<script>
  export default {
    name: 'VoStatisticalList',
    props: {
      dataList: {
        type: Object,
        default: () => {
          goodsDetail: {
          }
        },
      },
      type: {
        default: 0,
        type: Number,
      },
    },
    data() {
      return {
        showModal: false,
        warehouseName: '',
      }
    },
    methods: {
      getPic(pic) {
        if (Array.isArray(pic)) {
          try {
            if (JSON.parse(pic[0])) {
              let img = JSON.parse(pic[0])
              return this.getPicType(img[0])
            } else {
              return this.getPicType(pic[0])
            }
          } catch (e) {
            console.log(e)
          }
        } else if (this.checkJSON(pic)) {
          return this.getPicType(JSON.parse(pic)[0])
        } else {
          return this.getPicType(pic)
        }
      },
      checkJSON(x) {
        try {
          return JSON.parse(x)
        } catch (e) {
          return false
        }
      },
      getPicType(url) {
        if (url) {
          if (this.$vocenApi.Pattern.isVideoUrl(url.toLocaleLowerCase())) {
            return url + '&type=3'
          } else {
            return url
          }
        } else {
          return ''
        }
      },
      // 更多 查看仓库弹出框
      warehouseMore() {
        this.warehouseName = this.dataList.warehouseName
        this.showModal = true
      },
      confirm() {
        this.showModal = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .goods-card {
    display: flex;
    padding: 24rpx 16rpx;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.65);
    align-items: center;
    border-bottom: 2rpx solid #f7f7f8;
    .card-1,
    .card-ranking {
      width: 60rpx;
      font-style: normal;
      font-weight: 500;
      font-size: 32rpx;
      line-height: 150%;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
      margin-right: 40rpx;
    }
    .card-2 {
      width: 426rpx;
    }
    .goods-warehouse {
      width: 304rpx;
    }

    .goodsInfo {
      .goodsPic {
        width: 96rpx;
        height: 96rpx;
        margin-right: 16rpx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 8rpx;
        }
      }
      .goodsName {
        width: 264rpx;
        font-weight: 500;
        font-size: 32rpx;
        word-break: break-all;
        color: rgba(0, 0, 0, 0.85);
        .SerialNumber {
          font-weight: 400;
          font-size: 28rpx;
          line-height: 150%;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 8rpx;
        }
      }
      .good-tips {
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        color: $color-primary-yellow;
        padding: 0 12rpx;
        background: $v-tags-btn-disabled;
        border-radius: 24rpx;
      }
    }
    .card-3 {
      width: 124rpx;
      text-align: center;
    }
    .card-4 {
      width: 124rpx;
      text-align: center;
    }
    .card-5 {
      width: 144rpx;
    }
    .card-customer {
      width: 358rpx;
    }
    .card-salesVolume {
      width: 144rpx;
      text-align: center;
    }
    .card-sales {
      width: 144rpx;
      text-align: center;
    }
    .warehouse-more {
      font-weight: 400;
      font-size: 28rpx;
      text-decoration-line: underline;
      color: #ff5319;
    }
  }
  .wareHouseText {
    font-size: 32rpx;
    line-height: 150%;
    color: rgba(0, 0, 0, 0.85);
  }
  .modelName {
    line-height: 96rpx;
    height: 96rpx;
    margin: 0 auto;
    text-align: center;
  }
</style>
