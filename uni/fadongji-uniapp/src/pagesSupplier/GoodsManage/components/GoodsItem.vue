<template>
  <view class="goods-item" @click="itemClick">
    <image
      v-if="dataObj.isDistribution"
      class="goods-item__label"
      src="/static/icons/mask_group.png"
    ></image>
    <view class="goods-item__title">
      <!--  v-if="(!isSelect && !selectAll) || selectAllCancel" -->
      <view v-if="!dataObj.select" class="icon-wrap" @click.stop="select()">
        <VoIcon
          :name="current === 1 || current === 3 ? 'disable' : 'circle'"
          :opacity="0.45"
          :size="24"
          class="radio"
          color="#000000"
        />
      </view>
      <!--  v-if="!selectAllCancel && (isSelect || selectAll)" -->
      <view v-else class="icon-wrap" @click.stop="selectCancel()">
        <VoIcon :size="24" class="radio" color="#FF5319" name="select-right" />
      </view>
      <view class="label">商品编号：</view>
      <view class="value">{{ dataObj.code || '暂无编号' }}</view>
      <view class="copy" @click.stop="copyCode(dataObj.code)">复制</view>
      <view class="right">{{ dataObj.approvalName || '' }}</view>
    </view>
    <view class="goods-item__main">
      <!-- <view v-if="dataObj.warnLabel" class="mian-tag">{{ dataObj.warnLabel }}</view> -->
      <view
        v-if="dataObj.warnLabel"
        :class="dataObj.warnLabel === '库存低' ? 'warn' : ''"
        class="main-label"
      >
        {{ dataObj.warnLabel }}
      </view>
      <image
        v-if="dataObj.pic.indexOf('.mp4') > -1 || dataObj.pic.indexOf('.MP4') > -1"
        :src="dataObj.pic + '&type=3'"
        class="main-left"
      />
      <image v-else :src="dataObj.pic + '&type=1'" class="main-left" />
      <view class="main-right">
        <view class="main-right__name overTwoEllipsis">
          <text v-show="dataObj.categoryType" class="good-tips m-r-8">{{
            dataObj.categoryType
          }}</text>
          <text class="fz-b"> {{ dataObj.name || '暂无名称' }} </text>
        </view>
        <view class="main-right__tags">
          <view class="tag">现金价</view>
          <VoPointPrice :price="dataObj.cashPrice.toFixed(2)" class="tag-text first" />
          <block v-if="dataObj.accountPeriodDays && dataObj.accountPrice">
            <view class="tag">{{ dataObj.accountPeriodDays }}天账期</view>
            <VoPointPrice :price="dataObj.accountPrice.toFixed(2)" class="tag-text first" />
          </block>
        </view>
<!--        <view class="main-right__tags">-->
<!--          <view class="tag black">预计收益</view>-->
<!--          <view class="tag-text black">-->
<!--            <VoPointPrice-->
<!--              v-if="dataObj.minPredictProfit"-->
<!--              :price="dataObj.minPredictProfit || 0"-->
<!--              class="tag-text"-->
<!--              color="rgba(0, 0, 0, 0.65)"-->
<!--            />-->
<!--            <view v-else>-</view>-->
<!--          </view>-->
<!--          <text v-if="dataObj.minPredictProfit" class="color-block-65">-</text>-->
<!--          <view class="tag-text black">-->
<!--            <VoPointPrice-->
<!--              v-if="dataObj.maxPredictProfit"-->
<!--              :price="dataObj.maxPredictProfit || 0"-->
<!--              class="tag-text"-->
<!--              color="rgba(0, 0, 0, 0.65)"-->
<!--            />-->
<!--            <view v-else>-</view>-->
<!--          </view>-->
<!--          &lt;!&ndash;          <VoIcon&ndash;&gt;-->
<!--          &lt;!&ndash;            :opacity="0.45"&ndash;&gt;-->
<!--          &lt;!&ndash;            :size="16"&ndash;&gt;-->
<!--          &lt;!&ndash;            class="tag-icon"&ndash;&gt;-->
<!--          &lt;!&ndash;            color="#000"&ndash;&gt;-->
<!--          &lt;!&ndash;            name="account-question"&ndash;&gt;-->
<!--          &lt;!&ndash;            @click="toShopServiceCost(dataObj.id, dataObj.name)"&ndash;&gt;-->
<!--          &lt;!&ndash;          />&ndash;&gt;-->
<!--        </view>-->
      </view>
    </view>
    <view v-if="dataObj.approvalName !== '审核中'" class="goods-item__btn">
      <!-- <view class="btn-item" @click.stop="toDelete()">删除</view> -->
      <view v-if="current === 0" class="btn-item" @click.stop="soldOut">下架</view>
      <view v-if="current === 0" class="btn-item last full" @click.stop="addGoods"
        >补货({{ dataObj.inventory || 0 }})
      </view>
      <!-- 待审核 -->
      <view
        v-if="current === 1 && dataObj.approvalName === '审核未通过'"
        class="btn-item"
        @click.stop="applySale()"
        >修改
      </view>
      <view
        v-if="current === 1 && dataObj.approvalName === '审核未通过'"
        class="btn-item last"
        @click.stop="viewReason(false)"
        >查看原因
      </view>
      <!-- 待售 -->
      <view v-if="current === 2" class="btn-item" @click.stop="soldOut">上架</view>
      <view v-if="current === 2" class="btn-item full" @click.stop="addGoods"
        >库存({{ dataObj.inventory || 0 }})
      </view>
      <!-- 违规 -->
      <view
        v-if="dataObj.violationStatus === 1 && (dataObj.status === 4 || dataObj.status === 3)"
        class="btn-item"
        @click.stop="applySale()"
        >申请上架
      </view>
      <view v-if="current === 3" class="btn-item last" @click.stop="viewReason(true)"
        >查看原因
      </view>
    </view>
    <view class="h2" />
  </view>
</template>
<script>
  export default {
    name: 'CourseBox',
    props: {
      dataObj: {
        type: Object,
      },
      //显示radio
      showRadio: {
        type: Boolean,
        default: true,
      },
      //当前tab
      current: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        isSelect: false,
      }
    },
    methods: {
      //跳转商品服务费用
      toShopServiceCost(id, name) {
        this.$linkToEasy('/pagesAgent/GoodsManage/ShopServiceCost?id=' + id + '&name=' + name)
      },
      //item点击事件
      itemClick() {
        this.$emit('click')
      },
      //选择事件
      select() {
        this.$emit('select', this.dataObj)
      },
      //选择取消
      selectCancel() {
        this.$emit('selectCancel', this.dataObj)
      },
      //复制
      copyCode(value) {
        uni.setClipboardData({
          data: value,
          success: () => {
            uni.$u.toast('复制成功')
          },
        })
      },
      //补货
      addGoods() {
        this.$emit('addGoods', this.dataObj)
      },
      //查看原因
      viewReason(status) {
        this.$emit('viewReason', this.dataObj, status)
      },
      //删除
      toDelete() {},
      //上架、下架
      soldOut() {
        this.$VoHttp
          .apiGoodsStatusUpdate({
            status: this.dataObj.status === 4 ? 1 : 4,
            violationStatus: this.dataObj.violationStatus,
            ids: [this.dataObj.id],
          })
          .then((res) => {
            this.$emit('soldOutSuccess', this.dataObj)
          })
          .catch((err) => {
            uni.$u.toast('操作失败')
          })
      },
      applySale() {
        this.$linkToEasy('/pagesProduct/PutProduct/EditProduct?id=' + this.dataObj.id)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .goods-item {
    position: relative;
    background: #ffffff;
    box-sizing: border-box;
    margin-bottom: 16rpx;
    margin-top: 16rpx;

    &__label {
      position: absolute;
      top: 72rpx;
      right: 32rpx;
      width: 100rpx;
      height: 100rpx;
    }

    &__title {
      padding: 24rpx 32rpx 24rpx 16rpx;
      font-size: 26rpx;
      line-height: 1.5;
      display: flex;
      align-items: center;

      .label {
        color: $v-c0-45;
      }

      .value {
        color: $v-c0-85;
      }

      .copy {
        color: #155bd4;
        margin-left: 8rpx;
      }

      .icon-wrap {
        height: 48rpx;
      }

      .right {
        flex: 1;
        text-align: right;
        color: #e50012;
        font-size: 26rpx;
        line-height: 1.5;
      }
    }

    &__main {
      display: flex;
      padding: 0 32rpx 32rpx 32rpx;
      box-sizing: border-box;
      position: relative;

      .main-left {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8px;
      }

      .mian-tag {
        position: absolute;
        left: 46rpx;
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
      .main-label {
        position: absolute;
        left: 32rpx;
        top: 0;
        background: #f20014;
        border-radius: 4px 0px 8px;
        height: 36rpx;
        line-height: 36rpx;
        padding: 0 16rpx;
        color: #fff;
        font-size: 24rpx;
        z-index: 99;
        &.warn {
          background: #ff9b05;
        }
      }

      .main-right {
        flex: 1;
        padding-left: 16rpx;

        &__name {
          width: 418rpx;
          font-size: 32rpx;
          line-height: 1.5;
          color: $v-c0-85;
          margin-bottom: 16rpx;
        }

        &__tags {
          display: flex;
          padding-bottom: 8rpx;
          align-items: center;

          .tag {
            background: #ffe6e8;
            border: 2rpx solid #f20014;
            border-radius: 4rpx;
            color: #f20014;
            text-align: center;
            font-size: 24rpx;
            height: 32rpx;
            line-height: 28rpx;
            padding: 0 4rpx;
            box-sizing: border-box;
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
    }

    &__btn {
      display: flex;
      justify-content: flex-end;
      margin: 0 32rpx 32rpx 0rpx;

      .btn-item {
        min-width: 120rpx;
        color: $v-c0-85;
        font-size: 24rpx;
        line-height: 1.5;
        text-align: center;
        background: #ffffff;
        border: 1px solid $v-c0-25;
        border-radius: 30rpx;
        padding: 10rpx 24rpx;
        margin-right: 24rpx;

        &.last {
          margin-right: 0;
        }

        &.full {
          color: $color-primary-yellow;
          border: 2rpx solid $color-primary-yellow;
        }
      }
    }
  }
  .good-tips {
    height: 38rpx !important;
    line-height: 38rpx !important;
    font-size: 24rpx;
    color: #fff;
    padding: 0 14rpx;
    background: $color-primary-yellow;
    border-radius: 24rpx;
  }
</style>
