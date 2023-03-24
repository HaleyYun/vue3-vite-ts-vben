<template>
  <view class="info">
    <view class="info-title flex flex-vertical-c flex-justify-between">
      <!--      <view class="flex flex-vertical-c">-->
      <!--        <VoIcon name="sell-goods" />-->
      <view class="lh42">{{ type ? returnGoodsList.shopName : returnGoodsList.buyerName }}</view>
      <!--      </view>-->
      <view v-show="showDetail" class="color-block-45 fz-28 lh150">
        {{ returnGoodsList.isRefundOnly ? '仅退款' : '退货退款' }}
      </view>
    </view>
    <view class="info-goods flex" @click.stop="goGoodDetail(returnGoodsList)">
      <image
        v-if="returnGoodsList.pic.indexOf('mp4') != -1 || returnGoodsList.pic.indexOf('MP4') != -1"
        :src="returnGoodsList.pic + '&type=3'"
        class="info-goods__img"
      />
      <image v-else :src="returnGoodsList.pic + '&type=1'" class="info-goods__img" />
      <view class="fz-28 info-goods__right">
        <view class="right-name color-block fz-b">
          <text v-show="returnGoodsList.categoryType" class="good-tips m-r-8">{{
            returnGoodsList.categoryType
          }}</text>
          {{ returnGoodsList.goodsName }}
        </view>
        <view class="flex flex-justify-between">
          <view class="flex color-gray flex-vertical-c">
            <view class="m-r-32"> {{ showDetail ? '申请台数' : '数量' }}</view>
            <view>{{ returnGoodsList.goodsCount }}</view>
          </view>
          <view v-if="type === ''" class="flex flex-vertical-c">
            <view class="color-gray m-r-8">退款</view>
            <view class="color-red">
              <VoPointPrice
                :price="returnGoodsList.amount"
                :show-unit="true"
                class="tag-text first"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- status 状态2110：待审核，2120：待发货，2130：待退款，2140:待签收,2150:已完成,2160:已关闭-->
    <!-- violationStatus 审核状态，1申请中，2-通过; 3-未通过,4-取消审核-->
    <!--returnGoodsList.isRefundOnly true 仅退款 false 退货退款 -->
    <!--type 有值.我发起的 否.我收到的-->
    <view v-if="type">
      <block v-if="!returnGoodsList.isCanRefund && !showDetail">
        <view class="m-t-40 flex flex-vertical-c" @click="goSaleService(returnGoodsList)">
          <view class="fz-28 color-block-65 m-r-8">该商品已申请售后</view>
          <VoIcon :opacity="0.45" color="#000000" name="arrow-right" size="16"></VoIcon>
        </view>
      </block>
      <!--售后超时-->
      <block v-else-if="returnGoodsList.isTimeOut && !showDetail">
        <view class="m-t-40 flex-vertical-c">
          <view class="fz-28 color-block-65">
            该商品已超出售后期限，请联系
            <text class="color-blue" @click="goOnlineCustomerFn">平台客服</text>
            处理
          </view>
        </view>
      </block>
      <block v-else>
        <!--待审核-->
        <view v-if="returnGoodsList.status === 2110">
          <view class="info-tips flex flex-vertical-c">
            <view class="fz-28 color-gray">
              {{ returnGoodsList.isRefundOnly ? '退货退款' : '退款' }} 进行中：</view
            >
            <view class="fz-24 color-red m-l-8">等待平台审核</view>
          </view>
        </view>
        <!--待发货-->
        <view v-if="returnGoodsList.status === 2120">
          <view class="info-tips flex flex-vertical-c">
            <view class="fz-28 color-gray">
              {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }} 进行中：</view
            >
            <view class="fz-24 color-red m-l-8">等待买家上传退货信息</view>
          </view>
        </view>
        <!--待退款-->
        <view v-if="returnGoodsList.status === 2130">
          <view class="info-tips flex flex-vertical-c">
            <view class="fz-28 color-gray">
              {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }} 进行中：</view
            >
            <view class="fz-24 color-red m-l-8"
              >{{ returnGoodsList.isRefundOnly ? '' : '退货已签收，' }}等待银行退款中</view
            >
          </view>
        </view>
        <!--待签收-->
        <view v-if="returnGoodsList.status === 2140">
          <view class="info-tips flex flex-vertical-c">
            <view class="fz-28 color-gray">
              {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }} 进行中：</view
            >
            <view v-if="returnGoodsList.isSuccess" class="fz-24 color-red m-l-8">
              退款成功{{ returnGoodsList.amount }}元{{
                !returnGoodsList.isRefundOnly ? ',退货待签收' : ''
              }}</view
            >
            <view v-else class="fz-24 color-red m-l-8">
              {{ !returnGoodsList.isRefundOnly ? '退货待签收' : '' }}</view
            >
          </view>
        </view>
        <!--已完成-->
        <view v-if="returnGoodsList.status === 2150">
          <view class="info-tips flex flex-vertical-c">
            <view class="fz-28 color-gray">
              {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}成功：</view
            >
            <view class="fz-24 color-red m-l-8">
              {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}成功{{
                returnGoodsList.amount
              }}元{{ returnGoodsList.isRefundOnly ? '' : '，退货已签收' }}</view
            >
          </view>
        </view>
        <!--已关闭-->
        <view v-if="returnGoodsList.status === 2160">
          <!-- violationStatus 审核状态，1申请中，2-通过; 3-未通过,4-取消审核-->
          <view v-if="returnGoodsList.violationStatus === 1">
            <view class="info-tips flex flex-vertical-c">
              <view class="fz-28 color-gray">
                {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}已关闭：</view
              >
              <view class="fz-24 color-red m-l-8">
                {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}审核申请中</view
              >
            </view>
          </view>
          <view v-if="returnGoodsList.violationStatus === 2">
            <view class="info-tips flex flex-vertical-c">
              <view class="fz-28 color-gray">
                {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}已关闭：</view
              >
              <view class="fz-24 color-red m-l-8">
                {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}审核通过</view
              >
            </view>
          </view>
          <view v-if="returnGoodsList.violationStatus === 3">
            <view class="info-tips flex flex-vertical-c">
              <view class="fz-28 color-gray">
                {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}已关闭：</view
              >
              <view class="fz-24 color-red m-l-8">
                {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}审核未通过</view
              >
            </view>
          </view>
          <view v-if="returnGoodsList.violationStatus === 4">
            <view class="info-tips flex flex-vertical-c">
              <view class="fz-28 color-gray">
                {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}已关闭：</view
              >
              <view class="fz-24 color-red m-l-8">
                {{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}取消审核</view
              >
            </view>
          </view>
        </view>
      </block>
    </view>
    <view v-else>
      <!--待审核-->
      <view v-if="returnGoodsList.status === 2110">
        <view class="info-tips flex flex-vertical-c">
          <view class="fz-28 color-gray"
            >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}进行中：</view
          >
          <view class="fz-24 color-red m-l-8">等待平台审核</view>
        </view>
      </view>
      <!--待发货-->
      <view v-if="returnGoodsList.status === 2120">
        <view class="info-tips flex flex-vertical-c">
          <view class="fz-28 color-gray"
            >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}进行中：</view
          >
          <view class="fz-24 color-red m-l-8">等待买家上传退货信息</view>
        </view>
      </view>
      <!--待签收-->
      <view v-if="returnGoodsList.status === 2140">
        <view class="info-tips flex flex-vertical-c">
          <view class="fz-28 color-gray"
            >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}进行中：</view
          >

          <view v-if="returnGoodsList.isSuccess" class="fz-24 color-red m-l-8">
            退款成功{{ returnGoodsList.amount }}元{{
              !returnGoodsList.isRefundOnly ? ',退货待签收' : ''
            }}</view
          >
          <view v-else class="fz-24 color-red m-l-8">
            {{ !returnGoodsList.isRefundOnly ? '退货待签收' : '' }}</view
          >
        </view>
      </view>
      <!--待退款-->
      <view v-if="returnGoodsList.status === 2130">
        <view class="info-tips flex flex-vertical-c">
          <view class="fz-28 color-gray"
            >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}进行中：</view
          >
          <view class="fz-24 color-red m-l-8"
            >{{ returnGoodsList.isRefundOnly ? '' : '退货已签收，' }}等待银行退款中</view
          >
        </view>
      </view>
      <!--已完成-->
      <view v-if="returnGoodsList.status === 2150">
        <view class="info-tips flex flex-vertical-c">
          <view class="fz-28 color-gray"
            >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}成功：</view
          >
          <view class="fz-24 color-red m-l-8"
            >{{ !returnGoodsList.isRefundOnly ? '退货退款' : '退款' }}成功{{
              returnGoodsList.amount
            }}元{{ returnGoodsList.isRefundOnly ? '' : '，退货已签收' }}</view
          >
        </view>
      </view>
      <!--已关闭-->
      <view v-if="returnGoodsList.status === 2160">
        <!--violationStatus 审核状态，1申请中，2-通过; 3-未通过,4-取消审核-->
        <view v-if="returnGoodsList.violationStatus === 1">
          <view class="info-tips flex flex-vertical-c">
            <view class="fz-28 color-gray"
              >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}失败：</view
            >
            <view class="fz-24 color-red m-l-8"
              >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}审核申请中</view
            >
          </view>
        </view>
        <view v-if="returnGoodsList.violationStatus === 2">
          <view class="info-tips flex flex-vertical-c">
            <view class="fz-28 color-gray"
              >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}失败：</view
            >
            <view class="fz-24 color-red m-l-8"
              >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}审核通过</view
            >
          </view>
        </view>
        <view v-if="returnGoodsList.violationStatus === 3">
          <view class="info-tips flex flex-vertical-c">
            <view class="fz-28 color-gray"
              >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}失败：</view
            >
            <view class="fz-24 color-red m-l-8">平台审核未通过</view>
          </view>
        </view>
        <view v-if="returnGoodsList.violationStatus === 4">
          <view class="info-tips flex flex-vertical-c">
            <view class="fz-28 color-gray"
              >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}失败：</view
            >
            <view class="fz-24 color-red m-l-8"
              >{{ returnGoodsList.isRefundOnly ? '退款' : '退货退款' }}取消审核</view
            >
          </view>
        </view>
      </view>
    </view>
    <view class="info-look flex flex-justify-r">
      <block v-if="type === ''">
        <view class="info-look__button" @click="checkDetails(returnGoodsList)">查看详情</view>
      </block>
      <block v-else>
        <view
          v-show="showDetail"
          class="info-look__button m-r-24"
          @click="checkDetails(returnGoodsList)"
          >查看详情</view
        >

        <block v-if="returnGoodsList.isCanRefund">
          <view
            v-if="returnGoodsList.payPrice > 0"
            class="info-look__button full"
            @click="returnGood(returnGoodsList)"
            >退货/退款</view
          >
        </block>
        <block v-else-if="returnGoodsList.isTimeOut">
          <view class="info-look__button disableBtn">退货/退款</view>
        </block>
      </block>
      <view
        v-show="returnGoodsList.violationStatus === 1 && type"
        class="info-look__button full m-l-32"
        @click.stop="cancelReturn = true"
        >取消申请</view
      >
      <view
        v-show="
          (returnGoodsList.violationStatus === 3 || returnGoodsList.status === 2160) &&
          type &&
          (returnGoodsList.isCanUpdateRefund || returnGoodsList.isCanUpdateRefund === null)
        "
        class="info-look__button full m-l-32"
        @click.stop="editReturn"
        >修改申请</view
      >
    </view>
    <VoModal
      :show="cancelReturn"
      :showCancelButton="true"
      cancelText="取消"
      confirmColor="#22284B"
      confirmText="确定"
      content="确认要取消售后申请吗？"
      @cancel="cancelReturn = false"
      @confirm="confirmCancel"
    />
  </view>
</template>

<script>
  import { goOnlineCustomerFn } from '@/common/helper'

  export default {
    name: 'ReturnGoods',
    props: {
      /**
       * garage 汽修厂名称
       * imageSrc 商品图片
       * afterSalesNum 申请台数
       * refundAmount 退款金额
       */
      returnGoodsList: {
        type: Object,
        default: {},
      },
      //用于判断是否是我发起申请的退货退款页面 有值则是 其他不是
      type: {
        type: String,
        default: '',
      },
      //用于判断是否显示查看详情
      showDetail: {
        type: String,
        default: '1',
      },
    },
    data() {
      return {
        cancelReturn: false,
      }
    },
    methods: {
      /**
       * 去平台客服
       */
      goOnlineCustomerFn() {
        goOnlineCustomerFn()
      },
      /**
       * 去查看详情
       */
      checkDetails(data) {
        this.$emit('checkDetails', data)
      },
      /**
       * 退款退货
       */
      returnGood(data) {
        let goodData = {
          orderId: data.id,
          shopId: data.shopId,
          shopPlatformCode: data.shopPlatformCode,
          whetherReceiptGoods: true,
          ...data,
        }
        console.log(goodData, 1111111111111)
        this.$linkToEasy(
          '/pagesAgent/Order/ReturnExchange/InitiateRefund?data=' + JSON.stringify(goodData),
        )
      },
      goGoodDetail(data) {
        console.log('data.isCanRefund22', data.isCanRefund, this.showDetail)
        if (!data.isCanRefund && !this.showDetail) {
          this.goSaleService(data)
          return
        }
        if (!this.showDetail) {
          // this.$linkToEasy(
          //   `/pagesAgent/GoodsList/GoodsDetail?id=${this.returnGoodsList.goodsId}&wid=${
          //     this.returnGoodsList.warehouseId || 0
          //   }&companyId=${this.returnGoodsList.companyId || 0}`,
          // )
          let goodData = {
            orderId: data.id,
            shopId: data.shopId,
            shopPlatformCode: data.shopPlatformCode,
            whetherReceiptGoods: true,
            ...data,
          }
          console.log(goodData, 2222222222222)
          this.$linkToEasy(
            '/pagesAgent/Order/ReturnExchange/InitiateRefund?data=' + JSON.stringify(goodData),
          )
        }
        this.checkDetails(this.returnGoodsList)
      },
      /**
       * 修改申请
       */
      editReturn() {
        this.$emit('editReturn', this.returnGoodsList)
      },
      confirmCancel() {
        this.cancelReturn = false
        this.$emit('confirmCancel', this.returnGoodsList)
      },
      //去售后详情
      goSaleService(data) {
        console.log('goSaleService', data)
        let saleServiceData = {}
        if (data.refundList && data.refundList.length > 0) {
          saleServiceData = data.refundList[0]
        }
        console.log('11111', saleServiceData)
        if (!saleServiceData.id) {
          // this.$u.toast('售后id获取失败')
          return
        }

        if (saleServiceData.isRefundOnly) {
          this.$linkToEasy(
            '/pagesAgent/Order/ReturnExchange/RefundDetails?id=' + saleServiceData.id,
          )
          return
        }
        this.$linkToEasy(
          '/pagesAgent/Order/ReturnExchange/ReturnRefundDetails?id=' +
            saleServiceData.id +
            '&type=0',
        )
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info {
    width: 750rpx;
    background: #ffffff;
    padding: 0 32rpx;
    margin-top: 16rpx;
    box-sizing: border-box;
    &-title {
      padding: 24rpx 0 20rpx 0;
      font-size: 28rpx;
      color: $v-c0-85;
      border-bottom: 2rpx solid $v-bg-light;
      &__red {
        color: $color-primary-red;
      }
    }
    &-goods {
      margin-top: 16rpx;
      overflow: hidden;
      &__img {
        width: 120rpx;
        height: 120rpx;
        margin-right: 16rpx;
      }
      &__right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-x: hidden;
        .right-name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    &-tips {
      width: 100%;
      height: 56rpx;
      line-height: 56rpx;
      background: #f7f7f8;
      margin-top: 18rpx;
      border-radius: 8rpx;
      padding: 0 24rpx;
      box-sizing: border-box;
    }
    &-look {
      padding: 32rpx 0;
      &__button {
        font-size: 24rpx;
        color: $v-c0-85;
        width: 160rpx;
        height: 52rpx;
        line-height: 52rpx;
        border: 2rpx solid $v-c0-25;
        text-align: center;
        border-radius: 30rpx;
        &.full {
          border: 2rpx solid $color-primary-yellow;
          color: $color-primary-yellow;
        }
        &.disableBtn {
          background: #f6f7f8;
          border: 2rpx solid #f6f7f8;
          color: $v-c0-25;
        }
      }
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
