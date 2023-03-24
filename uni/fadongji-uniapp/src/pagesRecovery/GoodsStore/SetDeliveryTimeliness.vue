<template>
  <view class="set">
    <VoNav is-fixed is-have-more title="设置发货时效">

    </VoNav>
    <view v-for="(item, index) of deliveryTimeList" :key="index" class="set-delivery">
      <view class="p-t-32 p-r-32 p-l-32">
        <span class="set-delivery__name color-block">{{ item.name }}</span>
        <span v-if="item.beDefault" class="set-delivery__default m-l-16">默认时效</span>
      </view>
      <view class="set-delivery__info">
        <view class="fz-28 color-block lh42 m-b-16"
          >当日订单截止时间：{{ item.orderStartTime }}时-{{ item.orderEndTime }}时</view
        >
        <view class="fz-28 color-block lh42 m-b-16"
          >预计发货：{{ estimatedDeliveryArr[item.estimatedDelivery] }}
          {{ item.deliveryStartTime }}时-{{ item.deliveryEndTime }}时</view
        >
        <view class="fz-28 color-block lh42">收货区域：{{ item.areaName }}</view>
      </view>
      <view class="set-delivery__footer flex flex-vertical-c flex-justify-between">
        <view class="flex flex-vertical-c" @click="onSelect(index)">
          <VoIcon
            v-if="!selectList[index]"
            :size="24"
            class="m-r-6"
            color="#d9d9d9"
            name="circle"
          />
          <VoIcon v-else :size="24" class="m-r-6" color="#FF5319" name="select-right" />
        </view>
        <view class="flex flex-justify-r flex-vertical-c">
          <view class="flex flex-vertical-c m-l-40" @click="editor(item, index === 0 ? 1 : 0)">
            <VoIcon :opacity="0.65" :size="20" name="edit" />
            <view class="fz-28 lh42 m-l-8">编辑</view>
          </view>
          <view v-if="index !== 0" class="flex flex-vertical-c m-l-40" @click="tagDelete(item)">
            <VoIcon :opacity="0.65" :size="20" name="delete" />
            <view class="fz-28 lh42 m-l-8">删除</view>
          </view>
        </view>
      </view>
    </view>
    <view class="tip-text">
      <view class="fz-28 font-weight-500 m-r-32 m-t-8">温馨提示</view>
      <view class="tip">除制定区域外，其余地区的运费采用默认规则 </view>
    </view>
    <view class="add-btn text-center p-t-24 p-b-24 fz-32" @click="goNewDeliveryTimeliness">
      增加规则
    </view>
    <view class="set-bottom">
      <EraButton circle text="完成" @click="finish" />
      <view class="p-b-safe-area" />
    </view>
    <view class="p-b-safe-area" />
  </view>
</template>

<script>
  export default {
    name: 'SetDeliveryTimeliness',
    data() {
      return {
        warehouseId: '', // 仓库id
        selectList: [],
        deliveryTimeList: [
          {
            beDefault: true,
            name: '11111111',
            orderStartTime: '2022',
            orderEndTime: '2023',
          },
        ],
        estimatedDeliveryArr: ['当日', '次日', '第三天', '第四天', '第五天', '第六天', '第七天'],
        pageSize: 10,
        pageNo: 1,
        total: 0,
      }
    },
    methods: {
      onSelect(index) {
        console.log(index, 'index')
        for (let i = 0; i < this.selectList.length; i++) {
          if (index === i) {
            this.selectList[i] = !this.selectList[i]
          } else {
            this.selectList[i] = false
          }
        }
        this.$forceUpdate()
      },
      finish() {
        this.$backFn()
      },
      /**
       * 去新增发货时效
       */
      goNewDeliveryTimeliness() {
        this.$linkToEasy(
          '/pagesRecovery/GoodsStore/NewDeliveryTimeliness?warehouseId=' + this.warehouseId,
        )
      },
      /**
       * 编辑发货时效
       * @param item
       */
      editor(item, canDel) {
        this.$linkToEasy(
          '/pagesRecovery/GoodsStore/NewDeliveryTimeliness?id=' +
            item.id +
            '&canDel=' +
            canDel +
            '&warehouseId=' +
            this.warehouseId,
        )
      },
      /**
       * 删除
       */
      tagDelete(item) {
        let that = this
        uni.showModal({
          title: '提示',
          content: '确定要删除该发货时效吗？',
          confirmColor: '#22284B',
          success: function (res) {
            if (res.confirm) {
              if (that.isLoading) return
              that.isLoading = true
              that.$VoHttp
                .apiWarehouseDelivery$Delete({ id: item.id })
                .then((res) => {
                  uni.$u.toast('删除成功！')
                  that.initFn('init')
                  that.isLoading = false
                })
                .catch((e) => {
                  that.isLoading = false
                  uni.$u.toast(e.message || '请求失败')
                })
            }
          },
        })
      },
      /**
       * 初始化接口
       */
      async initFn(init) {
        if (init === 'init') {
          this.pageNo = 1
          this.deliveryTimeList = []
        }
        let param = {
          warehouseId: this.warehouseId,
          pageSize: this.pageSize,
          pageNo: this.pageNo,
        }
        this.$VoHttp
          .apiWarehouseDeliveryPage(param)
          .then((res) => {
            console.log(res)
            this.total = res.data.pageInfo.total
            res.data.pageInfo.records.map((item, index) => {
              this.deliveryTimeList.push(item)
              if (index === 0) {
                this.selectList.push(true)
              } else {
                this.selectList.push(false)
              }
            })
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
    },
    onLoad(options) {
      if (options.warehouseId) {
        this.warehouseId = options.warehouseId
      }
    },
    onShow() {
      this.initFn('init')
    },
  }
</script>

<style lang="scss" scoped>
  .set {
    width: 750rpx;
    min-height: 100vh;
    box-sizing: border-box;
    padding-bottom: 132rpx;
    &-delivery {
      width: 750rpx;
      background: #ffffff;
      margin-top: 24rpx;
      &__name {
        font-weight: bold;
        font-size: 32rpx;
        line-height: 150%;
      }
      &__default {
        display: inline-block;
        background: $v-error-btn-disabled;
        border-radius: 24rpx;
        padding: 0 16rpx;
        height: 36rpx;
        font-size: 24rpx;
        line-height: 150%;
        color: $color-clicked-red;
        position: relative;
        top: -2rpx;
      }
      &__info {
        padding: 32rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
      }
      &__footer {
        padding: 32rpx;
        color: $v-c0-65;
      }
    }
    &-bottom {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
    .tip-text {
      font-size: 24rpx;
      padding: 8rpx 48rpx 16rpx 32rpx;
      line-height: 150%;
      box-sizing: border-box;
      width: 750rpx;
      background-color: #f7f7f8;
      .tip {
        color: #ee0a24;
      }
    }
    .add-btn {
      background: #fff;
      margin-top: 48rpx;
      color: #155bd4;
    }
  }
</style>
