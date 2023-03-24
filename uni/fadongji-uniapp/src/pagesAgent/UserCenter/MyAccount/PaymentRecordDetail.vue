<template>
  <view class="container flex flex-column">
    <VoNav :rightWidth="200" is-fixed is-have-more title="还款记录详情">

      <!--      <template #operation>-->
      <!--        <view @click="showPicker = true" class="fz-24 m-r-36">筛选</view>-->
      <!--      </template>-->
    </VoNav>
    <block v-if="list.length">
      <view v-for="(item, index) in list" :key="index" class="m-t-16 fz-28">
        <view class="p-32 border-bottom color-block-65 bg-white">
          <view class="m-b-16 flex flex-justify-between" @click="item.show = !item.show">
            <view class="font-weight-500 color-block flex1">订单编号：{{ item.orderId }}</view>
            <view class="fz-24 color-block-45">
              <view v-if="item.show" class="flex flex-vertical-c">
                <view>收起</view>
                <VoIcon :size="16" color="#d9d9d9" name="arrow-top-line" />
              </view>
              <view v-else class="flex flex-vertical-c">
                <view>展开</view>
                <VoIcon :size="16" color="#d9d9d9" name="arrow-bottom-line" />
              </view>
            </view>
          </view>
          <view class="flex flex-vertical-c flex-justify-between">
            <view>含{{ item.goodsNum }}个商品，共{{ item.goodsTotalNum }}件</view>
            <VoPointPrice :price="item.amount" showUnit :left-size="16" />
          </view>
          <view class="m-t-8">还款时间：{{ item.createTime }}</view>
        </view>
        <view
          v-for="(it, idx) in item.repaymentGoodsLogVOList"
          :key="`${index}${idx}`"
          class="group fz-28 color-block bg-white"
          v-show="item.show"
        >
          <view class="group-cell font-weight-500">
            <view class="flex1 overTwoEllipsis m-r-16">
              <text v-show="it.categoryType" class="good-tips m-r-8">{{
                  it.categoryType
                }}</text>
              {{ it.goodsName }}</view>
            <VoPointPrice :price="it.goodsPrice" showUnit :left-size="16" />
          </view>
          <view class="group-cell fz-26 color-block-65 m-t-16">还款数量：{{ it.goodsNum }}</view>
          <view class="line" />
        </view>
      </view>
    </block>
    <VoNoData v-else />
  </view>
</template>
<script>
  import { hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'PaymentRecordDetail',
    data() {
      return {
        show: false,
        list: [
          // {
          //   id: '166252601317392384',
          //   recordId: '166252601036374016',
          //   orderId: '148723697623105536',
          //   orderNumber: null,
          //   amount: 0.02,
          //   repayAmount: 0.02,
          //   goodsNum: 1,
          //   goodsTotalNum: 2,
          //   show: false,
          //   repaymentGoodsLogVOList: [
          //     {
          //       createTime: '',
          //       goodsId: '',
          //       goodsName: '',
          //       goodsNum: '',
          //       goodsPrice: '',
          //       id: '',
          //       isDeleted: '',
          //       licenseId: '',
          //       orderId: '',
          //       orderRecordId: '',
          //       updateTime: '',
          //     },
          //   ],
          //   creator: '160817148749545472',
          //   modifier: '160817148749545472',
          //   licenseId: '133960256299597825',
          // },
        ],
        recordId: null,
      }
    },
    methods: {
      async initFn() {
        showLoading()
        try {
          const { data } = await this.$VoHttp.apiRepaymentLogInfoList({ recordId: this.recordId })
          data.records.forEach((item) => {
            item.show = true
            this.list.push(item)
          })
        } catch (e) {
          this.$u.toast(e.message || '网络错误')
        }
        hideLoading()
      },
    },
    //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object
    onLoad(options) {
      this.recordId = options.id || null
      this.initFn()
    },
    //监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {},
    //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    //监听页面隐藏
    onHide() {},
    //监听页面卸载
    onUnload() {},
    //监听用户下拉动作，一般用于下拉刷新
    onPullDownRefresh() {},
    //页面滚动到底部的事件（不是scroll-view滚到底）
    onReachBottom() {},
  }
</script>
<style scoped lang="scss">
  .container {
    width: 100vw;
    height: 100vh;
  }
  .group {
    padding: 32rpx 0;
    &-cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 64rpx;
      padding-right: 32rpx;
    }
    .line {
      height: 2rpx;
      width: 100%;
      background-color: $v-bg-light;
      margin-left: 64rpx;
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
</style>
