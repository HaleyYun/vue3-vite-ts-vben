<template>
  <view class="good-item">
    <view class="flex flex-vertical-c m-b-28">
      <view v-if="(data.status === 1 || data.status === 4) && !data.approvalName" class="fz-0">
        <VoIcon
          v-if="!data.selected"
          :size="24"
          class="m-r-6"
          color="#d9d9d9"
          name="circle"
          @click="clickSelect(data.id, true)"
        />
        <VoIcon
          v-else
          :size="24"
          class="m-r-6"
          color="#FF5319"
          name="select-right"
          @click="clickSelect(data.id, false)"
        />
      </view>
      <view v-else class="fz-0">
        <VoIcon v-if="!data.selected" :size="24" class="m-r-6" name="disable-choose" />
      </view>

      <view class="color-block-45 fz-26">项目编号：</view>
      <view class="color-block fz-26 m-r-8"> {{ data.code }}</view>
      <view class="fz-28 color-155bd4" @click.stop="copyHandler(data.code)">复制</view>
      <view v-if="data.approvalName" class="fz-26 color-block-45 m-l-auto"
        >{{ data.approvalName }}
      </view>
    </view>

    <view class="good-item__content flex" @click.stop="toDetail">
      <image :src="data.desc + '&type=1'" class="content-img" />
      <view class="flex1">
        <view class="content-title overTwoEllipsis fz-b">
          <text v-show="data.categoryType" class="good-tips m-r-8">{{data.categoryType}}</text>
          {{ data.name }}
        </view>
        <view class="flex info m-b-8">
          <view class="flex flex-vertical-c">
            <view class="good-label fz-24 m-r-8">现金价</view>
            <VoPointPrice
              :leftSize="14"
              :price="data.cashPrice"
              :rightSize="12"
              :show-unit="true"
            />
          </view>
          <view v-if="data.accountPeriodDays && data.accountPrice" class="flex flex-vertical-c">
            <view class="good-label fz-24 lh150 m-r-8 m-l-48"
              >{{ data.accountPeriodDays }}天账期
            </view>
            <VoPointPrice
              :leftSize="14"
              :price="data.accountPrice"
              :rightSize="12"
              :show-unit="true"
            />
          </view>
        </view>
        <view class="flex flex-vertical-c m-b-8">
          <view class="good-label__gray fz-24">预计收益</view>
          <block
            v-if="
              data.minPredictProfit &&
              data.maxPredictProfit &&
              +data.minPredictProfit > 0 &&
              +data.maxPredictProfit > 0
            "
          >
            <VoPointPrice
              :left-size="14"
              :price="data.minPredictProfit || 0"
              :right-size="12"
              class="tag-text m-l-8"
              color="rgba(0, 0, 0, 0.65)"
            />

            <text class="color-block-45 m-l-4" style="height: 50rpx">~</text>
            <VoPointPrice
              :left-size="14"
              :price="data.maxPredictProfit || 0"
              :right-size="12"
              class="tag-text m-l-8"
              color="rgba(0, 0, 0, 0.65)"
            />
          </block>
          <block v-else-if="data.minPredictProfit">
            <VoPointPrice
              :left-size="14"
              :price="data.minPredictProfit || 0"
              :right-size="12"
              class="tag-text m-l-8"
              color="rgba(0, 0, 0, 0.65)"
            />
          </block>
          <block v-else-if="data.maxPredictProfit">
            <VoPointPrice
              :left-size="14"
              :price="data.maxPredictProfit || 0"
              :right-size="12"
              class="tag-text m-l-8"
              color="rgba(0, 0, 0, 0.65)"
            />
          </block>
          <block v-else>
            <VoPointPrice
              :left-size="14"
              :price="0"
              :right-size="12"
              class="tag-text m-l-8"
              color="rgba(0, 0, 0, 0.65)"
            />
          </block>
<!--          <view class="inline-block" @click.stop="toProjectServiceCost(data.id, data.name)">-->
<!--            <VoIcon :opacity="0.45" :size="15" class="m-l-8" name="account-question" />-->
<!--          </view>-->
        </view>
        <view class="flex flex-vertical-c">
          <view class="good-label__gray fz-24">已售量/总量</view>
          <view class="color-block-65 fz-28 m-l-8"> {{ data.alreadyInvestedNum || 0 }}</view>
          <view class="color-block-45 fz-24">/{{ data.totalInvestment || '--' }}</view>
        </view>
      </view>
    </view>
    <!--bottom-->
    <!--进行中-->
    <view v-if="data.status === 1">
      <view class="good-item__bottom flex flex-justify-r">
        <view class="btn">
          <view class="btn-title" @click.stop="bottomBtnClick('offline', data)">下架</view>
        </view>

        <view class="btn padding-left">
          <view class="btn-title yellow" @click.stop="bottomBtnClick('edit', data)">修改</view>
        </view>
      </view>
    </view>
    <!--  未违规待审核状态	 不展示内容  -->

    <!--  未违规审核未通过状态	 展示内容  -->
    <view v-if="data.status === 3 && data.violationStatus === 3">
      <view class="good-item__bottom flex flex-justify-r">
        <view class="btn">
          <view class="btn-title" @click.stop="bottomBtnClick('reason', data, false)"
            >查看原因
          </view>
        </view>

        <view class="btn padding-left">
          <view class="btn-title yellow" @click.stop="bottomBtnClick('edit', data)">修改</view>
        </view>
      </view>
    </view>

    <!--已下架并未违规-->
    <view v-if="data.status === 4 && data.violationStatus === 3">
      <view class="good-item__bottom flex flex-justify-r">
        <view class="btn padding-left">
          <view class="btn-title" @click.stop="bottomBtnClick('put', data)">上架</view>
        </view>

        <view class="btn padding-left">
          <view class="btn-title yellow" @click.stop="bottomBtnClick('edit', data)">修改</view>
        </view>
      </view>
    </view>

    <!--已下架和为已违规-->
    <view v-if="data.status === 4 && data.violationStatus === 1">
      <view class="good-item__bottom flex flex-justify-r">
        <view class="btn padding-left">
          <view class="btn-title" @click.stop="bottomBtnClick('reason', data, true)">查看原因</view>
        </view>
        <view class="btn padding-left">
          <view class="btn-title yellow" @click.stop="bottomBtnClick('put-apply', data)"
            >申请上架
          </view>
        </view>
      </view>
    </view>

    <!--违规 - 审核中 只展示查看原因-->
    <view v-if="data.status === 2 && data.violationStatus === 2">
      <view class="good-item__bottom flex flex-justify-r">
        <view class="btn padding-left">
          <view class="btn-title" @click.stop="bottomBtnClick('reason', data, true)">查看原因</view>
        </view>
      </view>
    </view>

    <!--已违规审核未通过-->
    <view v-if="data.status === 3 && data.violationStatus === 1">
      <view class="good-item__bottom flex flex-justify-r">
        <view class="btn padding-left">
          <view class="btn-title" @click.stop="bottomBtnClick('reason', data, true)">查看原因</view>
        </view>
        <view class="btn padding-left">
          <view class="btn-title yellow" @click.stop="bottomBtnClick('put-apply', data)"
            >申请上架
          </view>
        </view>
      </view>
    </view>

    <!--已完成-->
    <view v-if="data.status === '5'" />
  </view>
</template>
<script>
  export default {
    name: 'GoodItem',
    props: {
      data: {
        type: Object,
        data: {},
        img: '',
      },
      //tab状态值 0进行中1待审核2已下架3.违规4已完成
      type: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        frontPrice: '',
        backPrice: '',
        paymentFrontPrice: '',
        paymentBackPrice: '',
      }
    },
    created() {
      const descArr = this.data.desc ? this.data.desc.split(',') : ''
      this.img = descArr.length ? descArr[0] : ''
    },
    mounted() {},
    methods: {
      toProjectServiceCost(id, name) {
        this.$linkToEasy('/pagesAgent/GoodsManage/ProjectServiceCost?id=' + id + '&name=' + name)
      },
      clickSelect(id, status) {
        this.$emit('select', { id, status })
      },
      // 查看状态
      toDetail() {
        this.$u.route({
          url: '/pagesSupplier/SendInvestmentInfo/CheckInvestmentInfo',
          params: {
            id: this.data.id,
            type: this.type,
          },
        })
      },
      // 复制
      copyHandler(code) {
        // 复制操作
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this
        uni.setClipboardData({
          data: code,
          success: function () {
            _this.$u.toast('复制成功')
          },
        })
      },
      // 按钮点击触发
      bottomBtnClick(type, data, isViolation) {
        let param = { type, data, isViolation }
        this.$emit('goodBottomBtnFn', param)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .good-item {
    width: 100%;
    padding: 28rpx 32rpx 28rpx 16rpx;
    box-sizing: border-box;
    background-color: #ffffff;

    .color-155bd4 {
      color: #155bd4;
    }

    &__content {
      width: 100%;
      padding-left: 16rpx;
      box-sizing: border-box;
      display: flex;

      .content-img {
        width: 160rpx;
        height: 160rpx;
        display: block;
        border-radius: 8rpx;
        overflow: hidden;
        margin-right: 16rpx;
      }

      .content-title {
        width: 100%;
        line-height: 150%;
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.85);
      }

      .info {
        color: $v-c0-45;
        font-size: 24rpx;
        margin-top: 8rpx;

        &-number {
          font-size: 28rpx;
          color: $color-primary-red;
        }

        &-point {
          color: $color-primary-red;
        }
      }
    }

    &__bottom {
      padding-top: 32rpx;
      box-sizing: border-box;

      .btn {
        background-color: #ffffff;
        border-radius: 36rpx;

        &-full {
          border: 2rpx solid $color-clicked-yellow;
          color: $color-clicked-yellow;
        }

        &-title {
          padding: 10rpx 56rpx;
          font-size: 24rpx;
          border: 2rpx solid $v-c0-25;
          color: $v-c0-85;
          border-radius: 36rpx;

          &.yellow {
            border: 2rpx solid $color-primary-yellow;
            color: $color-primary-yellow;
          }
        }
      }

      .padding-left {
        margin-left: 32rpx;
      }
    }

    .main-right__tags {
      display: flex;
      padding-bottom: 8rpx;
      align-items: center;

      .tag {
        background: #fdf2f3;
        border: 1px solid #ec404d;
        border-radius: 4rpx;
        color: #ec404d;
        text-align: center;
        font-size: 24rpx;
        line-height: 28rpx;
        padding: 2rpx 4rpx;
        margin-right: 8rpx;

        &.black {
          background: #f6f7f8;
          border: 1px solid #d3d4db;
          color: $v-c0-65;
        }
      }

      .tag-text {
        color: #e50012;
        font-size: 28rpx;
        line-height: 1.5;
        font-weight: 500;

        &.first {
          margin-right: 44rpx;
        }

        &.black {
          color: $v-c0-65;
        }

        &__right {
          font-weight: 400;
          font-size: 24rpx;
        }
      }

      .tag-icon {
        margin-left: 8rpx;
      }
    }
  }

  .good-label {
    color: #f20014;
    padding: 2rpx 4rpx;
    border: 2rpx solid #f20014;
    background-color: #ffe5e8;
    border-radius: 4rpx;
    line-height: 24rpx;

    &__gray {
      color: $v-c0-65;
      padding: 2rpx 4rpx;
      border: 2rpx solid #d3d4db;
      background-color: #f6f7f8;
      border-radius: 4rpx;
      line-height: 24rpx;
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
