<template>
  <view class="goods-item">
    <view class="goods-item__title">
      <view class="flex flex-vertical-c">
        <view class="label">商品编号：</view>
        <view class="value">{{ dataObj.code || '暂无编号' }}</view>
      </view>
      <template v-if="dataObj.status === 1">
        <view class="color-block-65">审核中</view>
      </template>
      <template v-else-if="dataObj.status === 2">
        <view class="right">审核不通过</view>
      </template>
    </view>
    <view class="goods-item__main">
      <view class="main-right">
        <!--        dataObj.model +  4476 让去掉-->
        <view @click="itemClick">
          <view class="main-right__name">{{ dataObj.name }}</view>
          <view class="flex">
            <template v-for="(item, index) in dataObj.levelVOS">
              <view
                v-if="item.price > 0"
                :key="index"
                :class="index > 0 ? 'm-l-80' : ''"
                class="main-right__tags"
              >
                <VoPointPrice :price="item.price" />
                <view class="tag">{{ item.level }}类价格</view>
              </view>
            </template>
          </view>
        </view>
        <view class="flex flex-vertical-c">
          <view class="color-block-45 fz-26">服务费</view>

          <VoTooltip
            class="fz-0"
            color="rgba(17, 17, 17)"
            :arrowStyleSelf="{ left: 0 }"
            placement="right"
          >
            <view slot="content" class="fz-24">
              <view>每销售出1件商品，平台收</view>
              <view>取{{ dataObj.platformPrice }}元的服务费。</view>
            </view>
            <VoIcon
              :opacity="0.45"
              :size="16"
              class="m-l-8"
              color="#000000"
              name="question-line"
            />
          </VoTooltip>

          <view class="color-block-45 fz-26 m-l-16"> {{ dataObj.platformPrice }}元</view>
          <!--          <VoPointPrice-->
          <!--            :price="dataObj.maxPredictProfit || 0"-->
          <!--            :show-unit="true"-->
          <!--            class="m-l-20"-->
          <!--            color="rgba(0, 0, 0, 0.65)"-->
          <!--            display="inline-block"-->
          <!--          />-->
        </view>
      </view>
    </view>
    <!-- type : 1审核中;2未通过;3=4修改; -->
    <view v-if="dataObj.status !== 1" class="goods-item__btn">
      <!-- <view class="btn-item" @click.stop="toDelete()">删除</view> -->
      <!--      <view v-if="current === 0" class="btn-item" @click.stop="soldOut">下架</view>-->
      <!--      <view-->
      <!--        v-if="current === 0"-->
      <!--        class="btn-item"-->
      <!--        @click.stop="addGoods"-->
      <!--      >-->
      <!--        补货({{ dataObj.availableNumber || 0 }})-->
      <!--      </view>-->
      <!-- 在售 -->
      <template v-if="dataObj.status === 3">
        <view class="btn-item" @click.stop="addGoods">
          库存({{ dataObj.availableNumber || 0 }})
        </view>
        <view class="btn-item last" @click.stop="soldOut">下架</view>
      </template>
      <!-- 待审核 -->
      <template v-if="dataObj.status === 2">
        <view class="btn-item" @click.stop="viewReason(true)">查看原因</view>
        <view class="btn-item last" @click.stop="toEdit">修改</view>
      </template>
      <!-- 待售 -->
      <template v-else-if="dataObj.status === 4">
        <view class="btn-item" @click.stop="toEdit">改价</view>
        <view class="btn-item" @click.stop="addGoods">
          库存({{ dataObj.availableNumber || 0 }})
        </view>
        <view class="btn-item last" @click.stop="soldOut">上架</view>
      </template>

      <!-- 违规 -->
      <!--      <view-->
      <!--        v-if="dataObj.violationStatus === 1 && dataObj.status === 4"-->
      <!--        class="btn-item"-->
      <!--        @click.stop="applySale()"-->
      <!--      >-->
      <!--        申请上架-->
      <!--      </view>-->
    </view>
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
      //全选
      selectAll: {
        type: Boolean,
        default: false,
      },
      //全不选
      selectAllCancel: {
        type: Boolean,
        default: false,
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
      //item点击事件
      itemClick() {
        this.$emit('click')
      },
      //选择事件
      select() {
        this.$emit('select', this.dataObj)
        this.isSelect = true
      },
      //选择取消
      selectCancel() {
        this.$emit('selectCancel', this.dataObj)
        this.isSelect = false
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
        let params = { id: this.dataObj.id }
        if (this.dataObj.status === 3) {
          params.status = 4
        } else {
          params.status = 3
        }
        this.$VoHttp
          .apiGoodsRecycleResaleUpdateStatus(params)
          .then((res) => {
            this.$emit('soldOutSuccess', this.dataObj)
          })
          .catch((err) => {
            uni.$u.toast('操作失败')
          })
      },
      //编辑
      toEdit() {
        this.$emit('toEdit', this.dataObj)
      },
      //申请上架
      applySale() {
        // this.$linkToEasy('/pagesProduct/PutProduct/EditProduct?id=' + this.dataObj.id)
        this.$emit('applySale', this.dataObj)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .goods-item {
    background: #ffffff;
    box-sizing: border-box;
    margin-bottom: 16rpx;
    margin-top: 16rpx;
    &__title {
      padding: 24rpx 32rpx;
      line-height: 1.5;
      font-size: 26rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label {
        color: $v-c0-85;
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
        left: 32rpx;
        top: 0;
        background: #e50012;
        border-radius: 8rpx 0px;
        width: 80rpx;
        height: 36rpx;
        font-size: 24rpx;
        line-height: 36rpx;
        color: #fff;
        text-align: center;
        z-index: 99;
      }
      .main-right {
        flex: 1;
        padding-left: 16rpx;
        &__name {
          font-size: 32rpx;
          line-height: 1.5;
          color: $v-c0-85;
          font-weight: bold;
          padding-bottom: 22rpx;
        }
        &__tags {
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
            display: inline-block;
            &.black {
              background: #f6f7f8;
              border: 1px solid #d3d4db;
              color: $v-c0-65;
            }
          }
          .tag-text {
            // color: #e50012;
            // font-size: 28rpx;
            // line-height: 1.5;
            // font-weight: 500;
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
      padding: 0 32rpx 32rpx 32rpx;
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
        margin-right: 40rpx;
        &.last {
          margin-right: 0;
        }
      }
    }
  }
</style>
