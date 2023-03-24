<template>
  <view class="padding">
    <view v-for="item of accountOrder" :key="item.id" class="account">
      <view class="account-line">
        <view class="flex flex-vertical-c lh48">
          <view class="h48" @click="selectOrder(item)">
            <VoIcon v-if="item.selected" name="address_no"></VoIcon>
            <VoIcon v-else name="address_select"></VoIcon>
          </view>
          <view class="lh42 fz-b fz-28 color-block flex1 m-l-8">订单编号：{{ item.number }}</view>
          <!--  展开/收起  -->
          <view @click="openHidden(item)">
            <view v-if="item.hidden" class="account-hidden flex flex-vertical-c">
              <view class="lh36 fz-24 color-block-45 m-r-2">展开</view>
              <VoIcon :opacity="0.25" :size="16" color="#000000" name="arrow-bottom-line"></VoIcon>
            </view>
            <view v-else class="account-hidden flex flex-vertical-c">
              <view class="lh36 fz-24 color-block-45 m-r-2">收起</view>
              <VoIcon :opacity="0.25" :size="16" color="#000000" name="arrow-top-line"></VoIcon>
            </view>
          </view>
        </view>
        <view class="flex flex-vertical-c m-t-8 m-l-56">
          <view v-if="item.repay" class="account-label">{{ item.repay }}</view>
          <view v-if="item.partOverdue" class="account-label">{{ item.partOverdue }}</view>
          <view v-if="item.overdue" class="account-label">{{ item.overdue }}</view>
          <view v-if="item.unpaid" class="account-label">{{ item.unpaid }}</view>
        </view>
        <view class="flex flex-justify-between m-l-56">
          <view>
            <view class="account-grey">含{{ item.individual }}个商品，共{{ item.piece }}件</view>
            <view class="account-grey">还款时间：{{ item.time }}</view>
          </view>
          <VoPointPrice
            :leftSize="16"
            :price="item.priceAll"
            :showUnit="true"
            class="lh48 m-t-50"
            color="#E50012"
          ></VoPointPrice>
        </view>
      </view>
      <view v-if="item.hidden === false">
        <view v-for="(info, index) in secondaryOrder" :key="index" class="account-secondary">
          <view class="account-secondary__name">{{ info.goodsName }}</view>
          <view class="flex flex-vertical-c flex-justify-between m-t-16">
            <view class="fz-26 color-block-65">数量：{{ info.piece }}件</view>
            <VoPointPrice
              :leftSize="16"
              :price="info.unitPrice"
              :showUnit="true"
              class="lh48"
              color="#E50012"
            ></VoPointPrice>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom flex flex-justify-between flex-vertical-c">
      <view v-if="allSelect" class="flex flex-vertical-c" @click="checkAllCancel">
        <VoIcon name="address_no"></VoIcon>
        <view class="fz-28 color-block-45">全选</view>
      </view>
      <view v-else class="flex flex-vertical-c" @click="checkAll">
        <VoIcon name="address_select"></VoIcon>
        <view class="fz-28 color-block-45">全选</view>
      </view>
      <view class="flex flex-vertical-c">
        <view class="lh42 fz-28 color-block">合计：</view>
        <VoPointPrice
          :leftSize="16"
          :price="totalPrice"
          :showUnit="true"
          class="lh48"
          color="#E50012"
        ></VoPointPrice>
        <view class="bottom-button">确认收款</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'AccountOrder',
    props: {},
    data() {
      return {
        allSelect: false, // 全选
        totalPrice: 0, // 总价
        // 账款信息
        accountOrder: [
          {
            id: 1,
            priceAll: 100,
            number: 'ETL99883928392',
            repay: '部分还款',
            partOverdue: '部分逾期',
            individual: 3,
            piece: 100,
            time: '2021-01-01 12:00:00',
            hidden: true, // 展开收起
            selected: false,
            // overdue: '已逾期',
            // unpaid: '未还款',
          },
          {
            id: 2,
            priceAll: 100,
            number: 'ETL99883928392',
            overdue: '已逾期',
            individual: 3,
            piece: 100,
            time: '2021-01-01 12:00:00',
            hidden: true, // 展开收起
            selected: false,
            // unpaid: '未还款',
          },
          {
            id: 3,
            priceAll: 100,
            number: 'ETL99883928392',
            repay: '部分还款',
            individual: 3,
            piece: 100,
            time: '2021-01-01 12:00:00',
            hidden: true, // 展开收起
            selected: false,
          },
          {
            id: 4,
            priceAll: 100,
            number: 'ETL99883928392',
            unpaid: '未还款',
            individual: 3,
            piece: 100,
            time: '2021-01-01 12:00:00',
            hidden: true, // 展开收起
            selected: false,
          },
        ],
        // 二级账款信息
        secondaryOrder: [
          {
            goodsName: '商品名称商品名称商品名称',
            piece: 36,
            unitPrice: '11500',
          },
          {
            goodsName: '商品名称商品名称商品名称',
            piece: 30,
            unitPrice: '11500',
          },
          {
            goodsName: '商品名称商品名称商品名称',
            piece: 87,
            unitPrice: '11500',
          },
        ],
      }
    },
    watch: {
      accountOrder: {
        deep: true,
        handler(newValue, oldValue) {
          let ids = newValue.map((item) => item.collectionId)
          let arr = newValue.filter((item) => item.selected)
          this.ids = arr.map((item) => item.collectionId)
          console.log(this.ids)
          console.log(ids)
          if (
            this.ids.length == ids.length &&
            this.ids.every(function (v, i) {
              return v === ids[i]
            })
          ) {
            this.allSelect = true
          } else {
            this.allSelect = false
          }
          this.countTotal()
        },
      },
    },
    methods: {
      /**
       * 展开收起
       * @param e
       */
      openHidden(e) {
        this.accountOrder.forEach((item) => {
          if (e.id === item.id) {
            item.hidden = !item.hidden
          }
        })
      },
      /**
       * 选择订单
       */
      selectOrder(e) {
        this.accountOrder.forEach((item) => {
          if (e.id === item.id) {
            item.selected = !item.selected
          }
        })
      },
      /**
       * 全选
       */
      checkAll() {
        console.log(3333)
        this.allSelect = true
        this.accountOrder.forEach((item) => {
          item.selected = true
        })
      },
      /**
       * 取消全选
       */
      checkAllCancel() {
        console.log(44444)
        this.allSelect = false
        this.accountOrder.forEach((item) => {
          item.selected = false
        })
      },
      /**
       * 计算总价
       */
      countTotal() {
        let total = 0
        this.accountOrder.forEach((item) => {
          if (item.selected) {
            total = this.decimalAddFn(total, item.priceAll)
          }
        })
        this.totalPrice = total
      },
    },
  }
</script>

<style lang="scss" scoped>
  .padding {
    padding-bottom: 120rpx;
  }
  .account {
    width: 750rpx;
    background: #fff;
    &:first-child {
      margin-top: 16rpx;
    }
    &-line {
      border-bottom: 2rpx solid $v-bg-light;
      padding: 24rpx 32rpx 20rpx 24rpx;
      box-sizing: border-box;
    }
    &-label {
      height: 36rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: #ec404d;
      padding: 0 16rpx;
      background: #feecee;
      border-radius: 24rpx;
      margin-right: 8rpx;
    }
    &-money {
      line-height: 48rpx;
      font-size: 24rpx;
    }
    &-grey {
      font-size: 28rpx;
      color: $v-c0-65;
      margin-top: 8rpx;
      line-height: 42rpx;
    }
    &-secondary {
      margin-left: 88rpx;
      padding: 24rpx 32rpx 24rpx 0;
      box-sizing: border-box;
      border-bottom: 2rpx solid $v-bg-light;
      &__name {
        width: 396rpx;
        line-height: 42rpx;
        font-weight: bold;
        font-size: 28rpx;
        color: $v-c0-85;
      }
    }
  }
  .bottom {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    padding: 20rpx 32rpx;
    box-sizing: border-box;
    &-button {
      width: 240rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      margin-left: 24rpx;
      background: #22284b;
      border-radius: 48rpx;
      font-size: 32rpx;
      color: #ffffff;
    }
  }
</style>
