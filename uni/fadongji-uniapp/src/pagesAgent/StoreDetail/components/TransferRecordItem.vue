<template>
  <view class="info">
    <view v-if="recordList.status" class="flex flex-justify-between m-b-24">
      <view class="info-title overTwoEllipsis">
        <text v-show="recordList.categoryType" class="good-tips m-r-8">{{
          recordList.categoryType
        }}</text>
        {{ recordList.goodsName }}
      </view>
      <view class="info-status">订单出库</view>
    </view>
    <view v-else class="m-b-24 flex flex-justify-between">
      <view class="info-name overTwoEllipsis flex1">
        <text v-show="recordList.categoryType" class="good-tips m-r-8">{{
          recordList.categoryType
        }}</text>
        {{ recordList.goodsName }}
      </view>
      <view v-if="recordList.statusDTO.length < 3" class="underway m-l-40 info-genre">进行中</view>
      <block v-else>
        <block v-for="(item, index) of recordList.statusDTO">
          <block v-if="+item.operCode === 3">
            <view
              :key="index"
              :class="item.operTime ? 'done' : 'underway'"
              class="m-l-40 info-genre"
              >{{ item.operTime ? '已完成' : '进行中' }}</view
            >
          </block>
        </block>
      </block>
    </view>

    <view class="info-con">
      <view class="info-con__list">调入仓库：{{ recordList.inWarehouseName }}</view>

      <!--      <view class="flex">-->
      <!--        <view class="info-con__list">入库仓库：{{ recordList.inWarehouseName }}</view>-->
      <!--        <view class="info-con__time algin-top">商品数量：{{ recordList.changeNumber }}</view>-->
      <!--      </view>-->
      <view class="info-con__list m-r-60 m-t-16">调出仓库：{{ recordList.outWarehouseName }}</view>
      <view class="info-con__time algin-top m-t-16">商品数量：{{ recordList.changeNumber }}</view>
      <!--      <view class="info-con__list m-b-16 m-r-60 m-t-16">操作人：{{ recordList.creatorName }}</view>-->
      <!--      <view class="info-con__time">操作时间：{{ recordList.createTime }}</view>-->
    </view>
    <view v-if="recordList.statusDTO && recordList.statusDTO.length" class="info-receipt">
      <view class="info-receipt__title m-b-24">调拨回执：</view>
      <view v-for="(item, index) of recordList.statusDTO" :key="index" class="flex">
        <view class="flex flex-column flex-vertical-c m-t-2">
          <VoIcon
            v-if="Number(item.type) === 1 && index === 0"
            :size="16"
            color="#FF5319"
            name="success-fill"
          />
          <view v-else-if="Number(item.type) === 2 && index === 0" class="info-receipt__icon" />
          <view v-else-if="Number(item.type) === 3 && index === 0" class="info-receipt__error" />
          <!--   <VoIcon name="more-fill" :size="16" v-else-if="Number(item.type) === 2 && index === 0" />-->
          <!--   <VoIcon name="close-fill" :size="16" v-else-if="Number(item.type) === 3 && index === 0" />-->
          <VoIcon v-else :size="16" color="#00B359" name="dot-light" />
          <view v-if="index + 1 !== recordList.statusDTO.length" class="info-receipt__line flex1" />
        </view>
        <view class="info-receipt__info flex1 m-l-16">
          <view class="info-state flex flex-vertical-c flex-justify-between">
            <view :class="{ 'info-vice': Number(item.type) === 2 }" class="info-state__left">
              {{ item.operMsg }}
            </view>
            <view v-if="Number(item.type) !== 2" class="info-state__right">
              <view
                v-if="+item.operCode === 3 && recordList.inWarehouseType === 2 && !item.operTime"
                class="right-confirm"
                @click="confirmStorage"
              >
                确认入库
              </view>
              <view v-else>{{ item.operTime || '--' }}</view>
            </view>
          </view>
          <view v-if="item.operMsg === '商品出库' && recordList.goodsVin" class="info-code">
            <!--            <view class="info-code__item">{{ showContent ? recordList.goodsVin : content }}</view>-->
            <!--            <view-->
            <!--              v-if="showOpen"-->
            <!--              :class="{ changeBottom: showContent }"-->
            <!--              class="flex flex-vertical-c info-code__more"-->
            <!--              @click="showContent = !showContent"-->
            <!--            >-->
            <!--              <view>{{ showContent ? '查看更多' : '收起' }}</view>-->
            <!--              <VoIcon v-if="!showContent" :size="24" color="#d9d9d9" name="triangular" />-->
            <!--              <VoIcon v-else :size="24" color="#d9d9d9" name="triangle-up"></VoIcon>-->
            <!--            </view>-->
            <view
              v-for="(code, codeIndex) in goodsVin"
              v-show="!isShowAll ? codeIndex < 4 : codeIndex >= 0"
              :key="codeIndex"
              class="info-code__item"
            >
              {{ code }}
            </view>
            <block v-if="goodsVin && goodsVin.length > 4">
              <view
                v-if="!isShowAll"
                class="flex flex-vertical-c info-code__more"
                @click="isShowAll = true"
              >
                <view>查看更多</view>
                <VoIcon color="#0D66FF" name="triangular" size="20"></VoIcon>
              </view>
              <view v-else class="flex flex-vertical-c info-code__more" @click="isShowAll = false">
                <view>收起</view>
                <VoIcon color="#0D66FF" name="triangular" size="20"></VoIcon>
              </view>
            </block>
          </view>
          <view v-if="Number(item.type) === 3" class="info-vice m-t-8 m-b-28">
            {{ item.annotation }}
          </view>
        </view>
      </view>
    </view>

    <view v-if="recordList.operation" class="flex flex-justify-r flex-vertical-c m-t-32">
      <!--      <EraButton :width-btn="284" class="w284" size="mini" theme-type="Default" @click="updateNum"-->
      <!--        >修改数量并入库</EraButton-->
      <!--      >-->
      <view class="info-default" @click="updateNum">修改数量并入库</view>
      <EraButton class="m-l-28" size="mini" theme-type="Wire" @click="sureWareFn"
        >确认入库</EraButton
      >
    </view>
  </view>
</template>

<script>
  export default {
    name: 'RepairRecordItem',
    props: {
      /**
       * type 1人工调整 2调拨 3申请补货
       * warehouse 仓库
       * afterNumber 修改后商品数量
       * operator 操作人
       * beforeNumber 修改前商品数量
       * time 操作时间
       */
      recordList: {
        type: Object,
        default: {},
      },
    },
    created() {
      console.log(this.recordList.goodsVin)
      if (this.recordList.goodsVin) {
        let goodsVin = this.recordList.goodsVin
        this.goodsVin = goodsVin.split(',')
        console.log('this.goodsVin', this.goodsVin)
        // this.content = this.recordList.goodsVin.slice(0, 100)
      }
      // if (this.recordList.goodsVin && this.recordList.goodsVin.length > 100) {
      //   this.showOpen = true
      //   this.content = this.content + '...'
      // }
    },
    data() {
      return {
        content: '',
        showOpen: false,
        showContent: false,
        isShowAll: false,
        goodsVin: [], // 识别码列表
      }
    },
    methods: {
      /**
       * 更改数量
       */
      updateNum() {
        this.$emit('updateNum')
      },
      /**
       * 确认入库
       */
      // sureWareFn() {
      //   this.$emit('sureWareFn')
      // },
      confirmStorage() {
        let param = {
          goodId: this.recordList.goodsId, // 商品id
          warehouseCode: this.recordList.inWarehouseId, // 仓库id
          stockLogId: this.recordList.id, // 库存日志id
        }
        this.$VoHttp.WAREHOUSE.apiWarehouseOperConfirmStock(param)
          .then((res) => {
            uni.$u.toast('确认入库成功')
            this.$emit('updateList')
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info {
    margin: 0 32rpx;
    box-sizing: border-box;
    padding: 40rpx 0;
    border-top: 2rpx solid $v-bg-light;
    &-name {
      width: 100%;
      font-weight: bold;
      font-size: 28rpx;
      line-height: 150%;
      color: $v-c0-85;
    }
    &-genre {
      height: 32rpx;
      line-height: 32rpx;
      margin-top: 6rpx;
      border-radius: 24rpx;
      padding: 0 16rpx;
      font-size: 24rpx;
    }
    .underway {
      color: #ff5319;
      background: #ffece5;
    }
    .done {
      background: $v-text-disabled;
      color: $v-btn-deep;
    }
    &-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 28rpx;
      line-height: 150%;
      width: 520rpx;
      font-weight: bold;
    }
    &-status {
      width: 128rpx;
      height: 36rpx;
      line-height: 36rpx;
      text-align: center;
      background-color: #d3d4db;
      border-radius: 24rpx;
      font-size: 24rpx;
      color: #6f738a;
    }
    &-item {
      display: flex;
      flex-wrap: wrap;
      line-height: 150%;
      position: relative;
      &__no {
        margin-bottom: 24rpx;
        margin-right: 32rpx;
        word-break: break-all;
      }
      &__fixed {
        //background-color: #ffffff;
        color: rgba(0, 0, 0, 0.45);
        font-size: 24rpx;
        position: absolute;
        bottom: 14rpx;
        right: 0rpx;
        &.changeBottom {
          bottom: -16rpx;
        }
      }
    }

    &-type {
      margin-top: 6rpx;
      height: 18px;
      background: $v-text-disabled;
      border-radius: 12px;
      padding: 0 16rpx;
      font-size: 12px;
      line-height: 150%;
      color: $v-btn-deep;
    }
    &-con {
      font-size: 24rpx;
      line-height: 150%;
      color: $v-c0-65;
      margin-top: 16rpx;
      &__list {
        //width: 314rpx;
      }
      // &__time {
      // }
    }
    &-receipt {
      margin-top: 32rpx;
      background: $v-bg-light;
      border-radius: 16rpx;
      padding: 24rpx;
      &__title {
        height: 36rpx;
        font-weight: bold;
        font-size: 24rpx;
        line-height: 150%;
        color: $v-c0-65;
      }
      &__icon {
        width: 32rpx;
        height: 32rpx;
        background: url('/static/created/product/ongoing.png') no-repeat;
        background-size: 100% 100%;
      }
      &__error {
        width: 32rpx;
        height: 32rpx;
        background: url('/static/created/product/error.png') no-repeat;
        background-size: 100% 100%;
      }
      &__line {
        width: 2rpx;
        background: #d3d4db;
      }
      &__info {
        font-size: 24rpx;
        min-height: 64rpx;
        line-height: 150%;
        .info-state {
          &__left {
            width: 338rpx;
            color: $v-c0-85;
          }
          &__right {
            color: $v-c0-65;
            .right-confirm {
              width: 148rpx;
              height: 56rpx;
              background: #ff5319;
              border-radius: 30rpx;
              font-size: 24rpx;
              font-weight: bold;
              color: #ffff;
              line-height: 56rpx;
              text-align: center;
            }
          }
        }
        .info-code {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 8rpx;
          &__item {
            margin: 8rpx 32rpx 0 0;
            line-height: 36rpx;
            color: $v-c0-45;
          }
          &__item:nth-child(2n) {
            margin-right: 0;
          }
          &__more {
            color: #0d66ff;
            margin-left: auto;
            margin-top: 12rpx;
          }
        }
        .info-vice {
          width: 338rpx;
          color: $v-c0-45;
        }
      }
    }
    .w284 {
      width: 284rpx;
    }
    &-default {
      padding: 0 32rpx;
      height: 64rpx;
      line-height: 64rpx;
      border: 2rpx solid #d3d4db;
      border-radius: 100rpx;
      font-size: 28rpx;
      color: $v-c0-85;
    }
    .algin-top {
      vertical-align: top;
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: #fff;
    padding: 2rpx 12rpx;
    background: #ff5319;
    border-radius: 24rpx;
  }
</style>
