<template>
  <view class="goods-item" @click="itemClick">
    <!-- <image
      v-if="dataObj.isDistribution"
      class="goods-item__label"
      src="/static/icons/mask_group.png"
    ></image> -->
    <view class="goods-item__title">
      <view v-if="dataObj.isSelect" class="icon-wrap" @click.stop="selectCancel()">
        <VoIcon :size="24" class="radio" color="#FF5319" name="select-right" />
      </view>

      <view v-else class="icon-wrap" @click.stop="select()">
        <VoIcon :opacity="0.15" :size="24" class="radio" color="#000000" name="circle" />
      </view>
      <view class="label">商品编号</view>
      <view class="value">{{ dataObj.code || '暂无编号' }}</view>
      <view class="copy" @click.stop="copyCode(dataObj.code)">复制</view>
      <view class="right">{{ dataObj.approvalName || '' }}</view>
    </view>
    <view class="goods-item__main">
      <view v-if="dataObj.warnLabel && dataObj.warnLabel != '库存低'" :class="dataObj.warnLabel == '库存预警' ? 'main-label warn' :'main-label'">
        {{ dataObj.warnLabel }}
      </view>
      <!--      <view v-if="dataObj.warnLabel" class="mian-tag">{{ dataObj.warnLabel }}</view>-->
      <image :src="$transferCosUrl(dataObj.pic)" class="main-left" />
      <view class="main-right">
        <view class="main-right__name overTwoEllipsis">
          <text v-show="dataObj.categoryType" class="good-tips font-shu-hei-ti m-r-8">
            {{ dataObj.categoryType }}
          </text>
          {{ dataObj.name || '暂无名称' }}
        </view>
        <view v-if="dataObj.isDistribution && current !== 3" class="main-right__labels flex flex-vertical-c">
          <VoIcon :size="12" class="label-icon" color="#FF5319" name="consignment-label" />
          <text class="label-tips">该商品存在寄售</text>
        </view>
        <view v-if="current === 3" class=" main-right__tags">
          <view class="tag">库存：{{dataObj.inventory}}</view>
        </view>
        <view v-if="dataObj.isDistribution && dataObj.accountPeriodDays && dataObj.accountPrice > 0">
            <view class="main-right__tags">
              <view class="tag">售价</view>
              <VoPointPrice
                :price="dataObj.cashPrice.toFixed(2)"
                class="tag-text first"
                :leftSize="16"
                :rightSize="14"
                display="inline-block"
              />
              <block v-if="dataObj.accountPeriodDays && dataObj.accountPrice > 0">
                <view class="tag">{{ dataObj.accountPeriodDays }}天账期价</view>
                <VoPointPrice  :leftSize="16"
                :rightSize="14" :price="dataObj.accountPrice.toFixed(2)" display="inline-block" />
              </block>
            </view>
            <view v-if="dataObj.isDistribution" class="main-right__tags" >
             <view class="tag black">进价</view>
                <VoPointPrice
                  :price="dataObj.distributionPrice || 0"
                  color="rgba(0, 0, 0, 0.85)"
                  :leftSize="16"
                  :rightSize="14"
                  display="inline-block"
                />
            </view>
        </view>
        <view v-else-if="dataObj.isDistribution && !dataObj.accountPeriodDays">
            <view class="main-right__tags">
              <view class="tag">售价</view>
              <VoPointPrice
                :price="dataObj.cashPrice.toFixed(2)"
                class="tag-text first"
                :leftSize="16"
                :rightSize="14"
                display="inline-block"
              />
              <block v-if="dataObj.isDistribution" class="main-right__tags">
               <view class="tag black">进价</view>
                <VoPointPrice
                  :price="dataObj.distributionPrice || 0"
                  color="rgba(0, 0, 0, 0.85)"
                  :leftSize="16"
                  :rightSize="14"
                  display="inline-block"
                />
              </block>
            </view>
        </view>
        <view v-else-if="!dataObj.isDistribution && dataObj.accountPeriodDays && dataObj.accountPrice > 0">
            <view class="main-right__tags">
              <view class="tag">售价</view>
              <VoPointPrice
                :price="dataObj.cashPrice.toFixed(2)"
                class="tag-text first"
                :leftSize="16"
                :rightSize="14"
                display="inline-block"
              />
              <block v-if="dataObj.accountPeriodDays && dataObj.accountPrice > 0" class="main-right__tags">
                <view class="tag">{{ dataObj.accountPeriodDays }}天账期价</view>
                <VoPointPrice  :leftSize="16"
                :rightSize="14" :price="dataObj.accountPrice.toFixed(2)" display="inline-block" />
              </block>
            </view>
        </view>
        <view v-else>
            <view class="main-right__tags">
              <view class="tag">售价</view>
              <VoPointPrice
                :price="dataObj.cashPrice.toFixed(2)"
                class="tag-text first"
                :leftSize="16"
                :rightSize="14"
                display="inline-block"
              />
            </view>
        </view>
      </view>
    </view>
    <view class="goods-item__btn" v-if="current !== 3">
      <!-- <view class="btn-item" @click.stop="toDelete()">删除</view> -->
      <view v-if="current === 0" class="btn-item" @click.stop="soldOut">下架</view>
      <!-- 待审核 -->
      <!-- dataObj.approvalName === '审核未通过' -->
      <view v-if="current !== 2" class="btn-item" @click.stop="toEdit()">修改</view>
      <view v-if="current === 0" class="btn-item last full" @click.stop="addGoods"
        >库存({{ dataObj.inventory || 0 }})
      </view>
      <view
        v-if="current === 1 && dataObj.approvalName === '审核未通过'"
        class="btn-item"
        @click.stop="viewReason(false)"
        >查看原因
      </view>
      <!-- 待售 -->
      <view v-if="current === 1" class="btn-item" @click.stop="soldOut">上架</view>
      <view v-if="current === 1" class="btn-item last full" @click.stop="addGoods"
        >库存({{ dataObj.inventory || 0 }})
      </view>
      <!-- 违规 -->
      <view v-if="current === 2" class="btn-item" @click.stop="viewReason(true)">查看原因 </view>
      <view
        v-if="dataObj.violationStatus === 1 && (dataObj.status === 4 || dataObj.status === 3)"
        class="btn-item"
        @click.stop="applySale()"
        >申请上架
      </view>
      <view
        v-if="dataObj.violationStatus === 1 && (dataObj.status === 4 || dataObj.status === 3)"
        class="btn-item last full"
        @click.stop="addGoods"
        >库存({{ dataObj.inventory || 0 }})
      </view>
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
      //编辑
      toEdit() {
        this.$emit('toEdit', this.dataObj)
      },
      //申请上架
      applySale() {
        this.$emit('applySale', this.dataObj)
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
      padding: 24rpx 16rpx;
      line-height: 1.5;
      font-size: 26rpx;
      line-height: 1.5;
      display: flex;
      align-items: center;

      .label {
        margin-right: 4rpx;
        color: $v-c0-45;
      }

      .value {
        color: $v-c0-45;
      }

      .copy {
        color: #0D66FF;
        margin-left: 26rpx;
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

      .main-right {
        flex: 1;
        padding-left: 16rpx;

        &__name {
          // width: 418rpx;
          font-size: 32rpx;
          line-height: 1.5;
          font-weight: bold;
          color: $v-c0-85;
          margin-bottom: 16rpx;
          .name-label {
            font-size: 24rpx;
            height: 36rpx;
            line-height: 40rpx;
            padding: 0 12rpx;
            background: $v-tags;
            box-sizing: border-box;
            border-radius: 24rpx;
            color: #fff;
            font-weight: normal;
            margin-right: 12rpx;
            display: inline-block;
          }
        }
        &__labels{
          line-height: 36rpx;
          margin-bottom: 16rpx;
          .label-tips {
            margin-left: 8rpx;
            font-weight: 500;
            font-size: 24rpx;
            color: #FF5319;
          }
        }

        &__tags {
          display: flex;
          padding-bottom: 8rpx;
          align-items: center;
          line-height: 42rpx;

          .tag {
            color: $v-c0-65;
            text-align: center;
            font-size: 24rpx;
            line-height: 28rpx;
            padding: 2rpx 4rpx;
            margin-right: 8rpx;

            // &.black {
            //   background: #f6f7f8;
            //   border: 1px solid #d3d4db;
            //   color: $v-c0-65;
            // }
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
        border: 1px solid #D3D4DB;
        border-radius: 30rpx;
        padding: 10rpx 24rpx;
        margin-right: 24rpx;

        &.last {
          margin-right: 0;
        }

        &.full {
          border: 1px solid $color-primary-yellow;
          color: $color-primary-yellow;
        }
      }
    }
  }

  .good-tips {
    // font-family: ;
    font-size: 32rpx;
    color: #F20014;
    // padding: 2rpx 12rpx;
    // background: $color-primary-yellow;
    // border-radius: 24rpx;
  }
</style>
