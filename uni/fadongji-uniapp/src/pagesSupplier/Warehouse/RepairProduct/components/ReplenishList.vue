<template>
  <view class="replenishList">
    <image
      v-if="replenishList.isDistribution"
      class="replenishList-label"
      src="/static/icons/mask_group.png"
    ></image>
    <view class="replenishList-title flex flex-justify-between flex-vertical-c">
      <view class="flex flex-vertical-c">
        <view class="replenishList-title__num" @click.stop="goInventoryDetails"
          >商品编号：{{ replenishList.code }}</view
        >
        <view class="color-155bd4 m-l-12" @click.stop="copyHandler(replenishList.code)">复制</view>
      </view>
    </view>
    <view class="replenishList-details flex">
      <view class="replenishList-details__img" @click.stop="goInventoryDetails">
        <image :src="JSON.parse(replenishList.pic)[0] + '&type=1'" class="details-img" />
        <view
          v-if="
            +replenishList.queryStatus === 1 ||
            +replenishList.queryStatus === 3 ||
            +replenishList.queryStatus === 4 ||
            +replenishList.queryStatus === 2
          "
          :class="`tag-${replenishList.queryStatus}`"
          class="replenishList-details__sale replenishList-details__wait"
          >{{
            replenishList.queryStatus === 1
              ? '在售'
              : replenishList.queryStatus === 3
              ? '待售'
              : replenishList.queryStatus === 2
              ? '库存预警'
              : replenishList.queryStatus === 4
              ? '无货'
              : ''
          }}</view
        >
      </view>
      <view class="replenishList-details__right flex1">
        <view class="name" @click.stop="goInventoryDetails">
          <text v-show="replenishList.categoryType" class="good-tips m-r-8 font-shu-hei-ti">{{
            replenishList.categoryType
          }}</text>
          <text> {{ replenishList.name }}</text>
        </view>
      </view>
    </view>
    <view class="replenishList-time flex flex-justify-between flex-vertical-c">
      <view class="flex flex-wrap" style="width: 100%">
        <view class="time-stock m-r-48" @click.stop="goInventoryDetails"
          >可用库存：<text class="time-stock__red">
            {{ availableNumber || replenishList.availableNumber || 0 }}
          </text></view
        >
        <view class="time-stock text-center m-r-48" @click.stop="goInventoryDetails">
          总库存：
          <text>{{ sum || replenishList.sum || 0 }}</text>
        </view>
        <view
          class="replenishList-title__record flex flex-vertical-c flex-justify-r"
          @click="goReplenishFn"
        >
          <view class="record-word">补货记录</view>
          <VoIcon :opacity="0.45" :size="16" name="right-arrow" />
        </view>
      </view>

      <!--      <view v-if="openDetails" class="flex flex-vertical-c" @click.stop="closeDetailsFn">-->
      <!--        <view class="time-open">收起</view>-->
      <!--        <VoIcon :opacity="0.15" :size="16" name="arrow-top-line" />-->
      <!--      </view>-->
      <!--      <view v-else class="flex flex-vertical-c" @click.stop="openDetailsFn">-->
      <!--        <view class="time-open">展开</view>-->
      <!--        <VoIcon :opacity="0.15" :size="16" name="arrow-bottom-line" />-->
      <!--      </view>-->
    </view>
    <view v-if="ownWareHouse.length || platWareHouse.length" v-show="openDetails">
      <view class="view-line m-t-36" />
      <!-- <view class="more" v-if="ownWareHouse.length" /> -->
      <!--      <view v-if="ownWareHouse.length" class="fz-32 color-block fz-b m-b-32 m-t-40">商家仓</view>-->
      <view class="h32"></view>
      <view v-for="item in ownWareHouse" :key="item.id" class="more-item">
        <view class="flex flex-vertical-c flex-wrap fz-28 color-block flex1">
          <view class="fz-b"
            >{{ item.warehouseName }}：<text
              :class="
                item.availableNumber === 0
                  ? 'more-item__no'
                  : item.warnLabel === '库存预警'
                  ? 'more-item__error '
                  : ''
              "
              class="m-r-16"
            >
              {{ item.availableNumber }}
            </text>
            <!--            <view class="more-item__btn">无货</view>-->
            <text
              v-if="item.warnLabel"
              :class="item.warnLabel === '库存预警' ? 'more-item__warn' : 'more-item__btn'"
            >
              {{ item.warnLabel }}
            </text>
          </view>
        </view>
        <!--          <EraButton size="mini" >申请补货</EraButton>-->
        <!--        <input-->
        <!--          :value="item.availableNumber"-->
        <!--          class="more-item__input"-->
        <!--          type="number"-->
        <!--          @blur="editNumber($event, item)"-->
        <!--        />-->
        <!-- <view v-if="!item.edit" class="more-item__input" @click="showNumBox(item)">{{
          item.number
        }}</view>
        <view v-else class="right">
          <u-number-box
            v-model="item.availableNumber"
            :buttonSize="28"
            :inputWidth="42"
            :min="0"
            bgColor="#F7F7F8"
            color="rgba(0,0,0,0.85)"
            integer
            @change="onDelay(item)"
          />
        </view> -->
        <view class="vo-btn color" @click="changeStore(item)"> 调整库存 </view>
      </view>

      <!--      <view v-if="platWareHouse.length" class="more-line" />-->

      <!--      <view v-if="platWareHouse.length" class="fz-32 color-block fz-b m-b-32">平台仓</view>-->
      <view v-for="item in platWareHouse" :key="item.id" class="more-item">
        <view class="flex flex-vertical-c fz-28 color-block flex1">
          <view class="fz-b"> {{ item.warehouseName }}： </view>
          <text
            :class="
              item.availableNumber === 0
                ? 'more-item__no'
                : item.warnLabel === '库存预警'
                ? 'more-item__error '
                : ''
            "
            class="m-r-16"
          >
            {{ item.availableNumber }}
          </text>
          <!--            <view class="more-item__btn">无货</view>-->
          <text
            v-if="item.warnLabel"
            :class="item.warnLabel === '库存预警' ? 'more-item__warn' : 'more-item__btn'"
          >
            {{ item.warnLabel }}
          </text>
        </view>
        <!-- <EraButton size="mini" @click="addGoods(item)">申请补货</EraButton> -->
        <view class="vo-btn" @click="addGoods(item)"> 申请补货 </view>
        <!--        <input type="number" class="more-item__input" />-->
      </view>
    </view>
    <VoModal
      v-if="modalVisible"
      :contentStyle="{ paddingLeft: '32rpx', paddingRight: '32rpx' }"
      :show="modalVisible"
      contentClass="modal-content"
      showCancelButton
      @cancel="modalVisible = false"
      @confirm="changeStoreConfirm"
    >
      <view class="color-block">
        <view class="fz-32 font-weight-500 text-center">调整库存</view>
        <view class="flex p-t-48">
          <view class="fz-28 font-weight-500">增加库存：</view>
          <u-number-box
            v-model="addNum"
            :buttonSize="20"
            :inputWidth="42"
            :min="0"
            bgColor="#F7F7F8"
            color="rgba(0,0,0,0.85)"
            integer
          />
        </view>
        <view class="flex p-t-48">
          <view class="fz-28 font-weight-500">减少库存：</view>
          <u-number-box
            v-model="subtractNum"
            :buttonSize="20"
            :inputWidth="42"
            :max="operationData.availableNumber"
            :min="0"
            bgColor="#F7F7F8"
            color="rgba(0,0,0,0.85)"
            integer
          />
          <view class="fz-24 color-block-45 p-l-16">
            (最多可减少{{ operationData.availableNumber }}件)
          </view>
        </view>
      </view>
    </VoModal>
  </view>
</template>

<script>
  import EraButton from '@/uni_modules/era-ui/components/EraButton/EraButton'

  export default {
    name: 'ReplenishList',
    components: { EraButton },
    props: {
      /**
       * productId 商品编号
       * marque 商品型号
       * stockNum 可用库存
       */
      replenishList: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        openDetails: true,
        ownWareHouse: [],
        platWareHouse: [],
        scrollTimer: null,
        modalVisible: false,
        operationData: '',
        addNum: 0,
        subtractNum: 0,
        availableNumber: 0, //可用库存
        sum: 0, //总库存
      }
    },
    created() {
      // this.getWareInfo()
      this.ownWareHouse = this.replenishList.goodStockListDTO.ownWareHouse
      this.platWareHouse = this.replenishList.goodStockListDTO.platWareHouse
      if (this.ownWareHouse && this.ownWareHouse.length) {
        this.ownWareHouse.forEach((item) => {
          item.newAvailableNumber = item.availableNumber
        })
      }
    },
    methods: {
      //调整库存
      changeStore(item) {
        this.addNum = 0
        this.subtractNum = 0
        this.operationData = item
        this.modalVisible = true
      },
      changeStoreConfirm() {
        if (!this.subtractNum && !this.addNum) {
          this.$u.toast('请设置数值')
          return
        }
        // //加库存
        let num = this.decimalAddFn(this.operationData.availableNumber, this.addNum)
        // //减库存
        let val = this.decimalSubFn(num, this.subtractNum)
        // console.log('changeStoreConfirm', this.addNum, this.subtractNum, val)
        // this.editNumber(this.operationData, val)
        let arr = []
        if (this.addNum) {
          arr.push({
            goodsId: this.operationData.goodsId,
            warehouseId: this.operationData.warehouseId,
            changeNumber: num,
          })
        }
        if (this.subtractNum) {
          arr.push({
            goodsId: this.operationData.goodsId,
            warehouseId: this.operationData.warehouseId,
            changeNumber: val,
          })
        }
        console.log('arr', arr)
        this.$VoHttp
          .apiWarehouseOperSupplierSelfRefillMultiter({
            boList: arr,
          })
          .then((res) => {
            uni.$u.toast('可用库存修改成功！')
            this.modalVisible = false
            // this.getWareInfo()
            // this.ownWareHouse.forEach((item) => {
            //   if (item.id === this.operationData.id) {
            //     item.availableNumber = val
            //   }
            // })
            this.$emit('updateFn')
          })
          .catch((err) => {
            uni.$u.toast(err.message || '操作失败')
            this.modalVisible = false
          })
      },
      //显示步进器
      showNumBox(item, index) {
        item.edit = true
        this.$forceUpdate()
      },
      onDelay(item) {
        if (this.scrollTimer != null) {
          clearTimeout(this.scrollTimer)
        }
        this.scrollTimer = setTimeout(() => {
          this.editNumber(item)
          this.scrollTimer = null
        }, 500)
      },
      goReplenishFn() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/RepairProduct/ReplenishRecord?id=' +
            this.replenishList.id +
            '&name=' +
            this.replenishList.name +
            '&categoryType=' +
            this.replenishList.categoryType,
        )
      },
      closeDetailsFn() {
        this.openDetails = false
      },
      openDetailsFn() {
        this.openDetails = true
      },
      //获取仓库信息
      getWareInfo() {
        this.$VoHttp
          .apiWarehouseStockCompanyGoodsWarehouse({
            goodId: this.replenishList.id,
          })
          .then((res) => {
            this.ownWareHouse = res.data.ownWareHouse
            this.platWareHouse = res.data.platWareHouse
            if (this.ownWareHouse && this.ownWareHouse.length) {
              this.ownWareHouse.forEach((item) => {
                item.newAvailableNumber = item.availableNumber
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      //编辑库存
      editNumber(item, val) {
        if (val <= 0 && val !== 0) {
          uni.$u.toast('输入有误')
          return
        }
        // console.log(item)
        this.$VoHttp
          .apiWarehouseOperSupplierSelfRefill({
            goodsId: item.goodsId,
            warehouseId: item.warehouseId,
            changeNumber: val,
          })
          .then((res) => {
            uni.$u.toast('可用库存修改成功！')
            this.modalVisible = false
            // this.getWareInfo()
            this.ownWareHouse.forEach((item) => {
              if (item.id === this.operationData.id) {
                item.availableNumber = val
              }
            })
            this.$emit('updateFn')
            // this.inventoryTotal()
          })
          .catch((err) => {
            uni.$u.toast(err.message || '操作失败')
            this.modalVisible = false
          })
      },
      //计算可用库存总数
      inventoryTotal() {
        // console.log(this.inventoryDetails)
        this.availableNumber = 0
        this.sum = 0
        let arr = []
        arr = arr.concat(this.platWareHouse, this.ownWareHouse)
        arr.forEach((item) => {
          this.availableNumber = this.decimalAddFn(this.availableNumber, item.availableNumber)
          this.sum = this.decimalAddFn(this.sum, item.number)
        })
        console.log('changeStoreConfirm', arr, this.availableNumber, this.sum)
      },
      //跳转平台仓补货
      addGoods(item) {
        this.$linkToEasy(
          `/pagesSupplier/Warehouse/WarehouseList/WarehouseRepairPro?warehouseId=${item.warehouseId}&warehouseName=${item.warehouseName}&type=1&isSelf=0&goodsName=${this.replenishList.name}&goodsId=${this.replenishList.id}`,
        )
      },
      /**
       * 去商品库存详情
       */
      goInventoryDetails() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/RepairProduct/InventoryDetails?id=' +
            this.replenishList.id +
            '&goodsData=' +
            JSON.stringify(this.replenishList),
        )
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
    },
  }
</script>

<style lang="scss" scoped>
  .replenishList {
    position: relative;
    width: 750rpx;
    background: #ffffff !important;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    margin-top: 16rpx;
    &-label {
      position: absolute;
      top: 72rpx;
      right: 32rpx;
      width: 100rpx;
      height: 100rpx;
    }
    &-title {
      height: 40rpx;
      line-height: 40rpx;
      font-size: 28rpx;
      &__num {
        color: $v-c0-45;
      }
      &__record {
        .record-word {
          font-size: 28rpx;
          color: $v-c0-65;
        }
      }
    }
    &-details {
      margin-top: 22rpx;
      &__img {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
        margin-right: 16rpx;
        position: relative;
      }
      &__sale {
        width: 80rpx;
        height: 36rpx;
        line-height: 36rpx;
        text-align: center;
        background: #26bf26;
        border-radius: 8rpx 0px 16rpx;
        font-size: 24rpx;
        color: #ffffff;
        position: absolute;
        top: 0rpx;
        left: 0rpx;
      }
      &__wait {
        // background: #d3d4db;
        // color: #6f738a;
        border-radius: 8rpx 0px 16rpx;
        &.tag-1 {
          background: #26bf26;
        }
        &.tag-3 {
          background: #d3d4db;
        }
        &.tag-4 {
          background: #f20014;
        }
        &.tag-2 {
          background: #ff9b05;
          width: 128rpx;
          text-align: center;
        }
      }
      &__right {
        .name {
          width: 418rpx;
          font-weight: bold;
          font-size: 32rpx;
          line-height: 150%;
          color: $v-c0-85;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    &-time {
      padding: 16rpx 24rpx 16rpx 28rpx;
      margin-top: 16rpx;
      background: #f7f7f8;
      font-size: 28rpx;
      border-radius: 4rpx;
      .time-stock {
        height: 40rpx;
        line-height: 150%;
        color: $v-c0-65;
        &__red {
          color: $v-error;
        }
      }
      .time-open {
        line-height: 150%;
        color: $v-c0-45;
        margin-right: 4rpx;
      }
    }
  }
  .more {
    width: 100%;
    height: 2rpx;
    background-color: #f7f7f8;
    margin: 40rpx auto 40rpx;
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 32rpx;
      &:last-child {
        margin-bottom: 0rpx !important;
      }
      &__no {
        font-weight: bold;
        color: #e50012;
      }
      &__error {
        font-weight: bold;
        color: #fda202;
      }
      &__btn {
        display: inline-block;
        width: 80rpx;
        height: 36rpx;
        border: 2rpx solid #f20014;
        color: #f20014;
        line-height: 32rpx;
        text-align: center;
        border-radius: 22rpx;
        font-size: 24rpx;
        box-sizing: border-box;
      }
      &__warn {
        width: 128rpx;
        height: 36rpx;
        border: 2rpx solid #ff9b05;
        color: #ff9b05;
        line-height: 32rpx;
        text-align: center;
        border-radius: 36rpx;
        font-size: 24rpx;
        padding: 0rpx 16rpx;
      }

      &__input {
        width: 110rpx !important;
        height: 48rpx;
        text-align: center;
        line-height: 44rpx;
        color: rgba(0, 0, 0, 0.85);
        font-size: 24rpx;
        border-radius: 8rpx;
        border: 2rpx solid rgba(0, 0, 0, 0.65);
      }
    }
    &-line {
      height: 2rpx;
      background-color: #f7f7f8;
      width: 100%;
      margin-bottom: 40rpx;
    }
  }
  .view-line {
    background: #f7f7f8;
    height: 2rpx;
  }
  .details-img {
    width: 128rpx;
    height: 128rpx;
    border-radius: 8rpx;
  }
  .good-tips {
    //height: 36rpx;
    //line-height: 36rpx;
    font-size: 32rpx;
    color: #f20014;
    //padding: 0 12rpx;
    //background: $v-tags-btn-disabled;
    //border-radius: 24rpx;
  }
  .vo-btn {
    height: 56rpx;
    padding: 0 26rpx;
    box-sizing: border-box;
    border: 2rpx solid #ff5319;
    border-radius: 15px;
    font-weight: 500;
    font-size: 24rpx;
    line-height: 54rpx;
    color: #ff5319;
    &.color {
      background: #ff5319;
      color: #fff;
    }
  }
  .modal-content {
    padding-left: 32rpx !important;
    padding-right: 32rpx !important;
  }
  .color-155bd4 {
    color: #155bd4;
  }
</style>
