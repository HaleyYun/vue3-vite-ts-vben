<template>
  <view class="good-item">
    <view class="flex flex-vertical-c m-b-24">
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

      <view class="color-block-45 fz-28">项目编号：</view>
      <view class="color-block fz-28 m-r-8"> {{ data.code }}</view>
      <view class="fz-28 color-155bd4" @click.stop="copyHandler(data.code)">复制</view>
      <view v-if="data.approvalName" class="fz-28 color-red m-l-auto">{{ data.approvalName }}</view>
    </view>

    <view class="good-item__content flex" @click.stop="toDetail">
      <view v-if="data.warnLabel" class="mian-tag">{{ data.warnLabel }}</view>
      <image
        v-if="data.desc.split('.').pop() === 'mp4'"
        :src="data.desc + '&type=3'"
        class="content-img"
      />
      <image v-else :src="data.desc + '&type=1'" class="content-img" />
      <view class="flex1">
        <view class="content-title overTwoEllipsis m-b-8">
          <text v-show="data.categoryType" class="good-tips m-r-8">{{ data.categoryType }}</text>
          <text class="fz-b">{{ data.name }}</text>
        </view>
        <view class="flex info">
          <view class="flex1">
            <view class="flex flex-vertical-c">
              <view class="info-number"> {{ data.alreadyInvestedNum || 0 }}</view>
              <view>/{{ data.totalInvestment }}</view>
            </view>
            <view>已售量/总量</view>
          </view>
          <view class="flex1">
            <view class="flex flex-vertical-c">
              <view class="info-number"> {{ data.cashPrice }}</view>
              <view v-if="false" class="info-point">.{{ backPrice }}</view>
            </view>
            <view>现金价</view>
          </view>
          <view v-if="data.accountPrice && data.accountPeriodDays" class="flex1">
            <view class="flex flex-vertical-c">
              <view class="info-number"> {{ data.accountPrice }}</view>
              <view v-if="false" class="info-point">{{ paymentBackPrice }}</view>
            </view>
            <view>{{ data.accountPeriodDays }}天账期</view>
          </view>
          <view v-else class="flex1" />
        </view>
        <!--        <view-->
        <!--          v-if="data.minPredictProfit"-->
        <!--          class="main-right__tags"-->
        <!--          @click.stop="toProjectServiceCost(data.id, data.name)"-->
        <!--        >-->
        <view v-if="data.minPredictProfit" class="main-right__tags">
          <view class="tag black">预计收益</view>
          <view class="tag-text black">
            <VoPointPrice
              :price="data.minPredictProfit || 0"
              class="tag-text"
              color="rgba(0, 0, 0, 0.65)"
            />
          </view>
          <text class="color-block-65">-</text>
          <view class="tag-text black">
            <VoPointPrice
              :price="data.maxPredictProfit || 0"
              class="tag-text"
              color="rgba(0, 0, 0, 0.65)"
            />
          </view>
          <!--          <VoIcon :size="16" class="tag-icon" name="question-line" />-->
        </view>
        <!--        <view-->
        <!--          v-else-->
        <!--          class="main-right__tags"-->
        <!--          @click.stop="toProjectServiceCost(data.id, data.name)"-->
        <!--        >-->
        <view v-else class="main-right__tags">
          <view class="tag black">预计收益</view>
          <text class="color-block-65">-</text>
          <!--          <VoIcon :size="16" class="tag-icon" name="question-line" />-->
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
          <view class="btn-full" @click.stop="bottomBtnClick('edit', data)">修改</view>
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
          <view class="btn-full" @click.stop="bottomBtnClick('edit', data)">修改</view>
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
          <view class="btn-full" @click.stop="bottomBtnClick('edit', data)">修改</view>
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
          <view class="btn-title" @click.stop="bottomBtnClick('put-apply', data)">申请上架</view>
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
          <view class="btn-title" @click.stop="bottomBtnClick('put-apply', data)">申请上架</view>
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
      //跳转商品服务费用
      toProjectServiceCost(id, name) {
        this.$linkToEasy('/pagesAgent/GoodsManage/ProjectServiceCost?id=' + id + '&name=' + name)
      },
      clickSelect(id, status) {
        this.$emit('select', { id, status })
      },
      // 查看状态
      toDetail() {
        this.$emit('toDetail')
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
        console.log(2222222222222222, type, data)
        let param = { type, data, isViolation }
        this.$emit('goodBottomBtnFn', param)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .good-item {
    margin-top: 16rpx;
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
      position: relative;
      .content-img {
        width: 128rpx;
        height: 128rpx;
        display: block;
        border-radius: 8rpx;
        overflow: hidden;
        margin-right: 16rpx;
      }

      .content-title {
        width: 100%;
        line-height: 48rpx;
        font-size: 32rpx;
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
      padding-top: 18rpx;
      box-sizing: border-box;

      .btn {
        background-color: #ffffff;

        &-title {
          border: 2rpx solid $v-c0-25;
          padding: 10rpx 36rpx;
          font-size: 24rpx;
          border-radius: 30rpx;
        }

        &-full {
          padding: 10rpx 36rpx;
          font-size: 24rpx;
          border-radius: 30rpx;
          border: 2rpx solid $color-primary-yellow;
          color: $color-primary-yellow;
        }
      }

      .padding-left {
        margin-left: 40rpx;
      }
    }

    .main-right__tags {
      display: flex;
      padding-bottom: 14rpx;
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
  .mian-tag {
    position: absolute;
    left: 32rpx;
    top: 16rpx;
    background: rgba(0, 0, 0, 0.65);
    border-radius: 50%;
    width: 96rpx;
    height: 96rpx;
    font-size: 28rpx;
    line-height: 96rpx;
    color: #fff;
    text-align: center;
    z-index: 99;
  }
  .good-tips {
    line-height: 36rpx;
    font-size: 24rpx;
    color: #fff;
    padding: 2rpx 12rpx;
    background: #ff5319;
    border-radius: 24rpx;
  }
</style>
