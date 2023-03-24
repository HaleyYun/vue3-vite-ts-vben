<template>
  <u-popup v-if="visible" :round="8" :show="visible" class="popup" mode="bottom" @close="close">
    <view class="popup-title">
      <view class="popup-title__text overTwoEllipsis">
        <text v-show="record.categoryType" class="good-tips m-r-8">{{ record.categoryType }}</text>
        <text class="fz-b">{{ record.name }}</text>
      </view>
      <view class="popup-title__right">
        <VoIcon :opacity="0.85" :size="20" color="#000000" name="close" @click="close" />
      </view>
    </view>
    <scroll-view class="overflow-y popup-scroll" scroll-y="true">
      <view v-if="ownWareHouse && ownWareHouse.length" class="popup-row">
        <view class="popup-row__title flex flex-justify-between">
          <view>自有仓库存</view>
          <!--        <view>{{ item.newAvailableNumber }}</view>-->
        </view>
        <view v-for="item in ownWareHouse" :key="item.id" class="popup-row__con">
          <view class="flex flex-vertical-c fz-24">
            <view class="color-block-45">可用库存：{{ item.availableNumber }}</view>
            <view class="color-block-45 m-l-40">总库存：{{ item.number }}</view>
          </view>
          <!--   识别码   -->
          <!--          <scroll-view-->
          <!--            class="overflow-y"-->
          <!--            scroll-top="0"-->
          <!--            scroll-y="true"-->
          <!--            style="max-height: 300px"-->
          <!--            @scrolltolower="scrolltolowerPop"-->
          <!--          >-->
          <view class="flex flex-wrap">
            <block v-for="(info, childIndex) in codeList" :key="childIndex">
              <view v-show="childIndex < 4 || openCode" class="fz-28 con-code">
                {{ info }}
              </view>
            </block>
          </view>
          <!--          </scroll-view>-->
          <view v-if="codeList && codeList.length > 4" class="con-open">
            <view
              v-if="openCode"
              class="flex flex-vertical-c flex-justify-r"
              @click.stop="closeCodeFn"
            >
              <view class="color-blue m-r-8">收起</view>
              <VoIcon color="#0D66FF" name="triangle-up" size="20" />
            </view>
            <view v-else class="flex flex-vertical-c flex-justify-r" @click.stop="openCodeFn">
              <view class="color-blue m-r-8">查看更多</view>
              <VoIcon color="#0D66FF" name="triangular" size="20" />
            </view>
          </view>
        </view>
        <!--      <view v-for="(item, index) in ownWareHouse" :key="item.id" class="popup-row__item">-->
        <!--        <view class="left">-->
        <!--          {{ item.warehouseName }}：-->
        <!--          <text :class="item.warnLabel ? 'red' : ''">{{ item.availableNumber }}</text>-->
        <!--          <view v-if="item.warnLabel" class="left-tag">{{ item.warnLabel }}</view>-->
        <!--        </view>-->
        <!--        <view v-if="!item.edit" @click="showNumBox(item, index)">-->
        <!--          {{ item.availableNumber }}-->
        <!--        </view>-->
        <!--        <view v-else class="right">-->
        <!--          {{ item.newAvailableNumber }}-->
        <!--          &lt;!&ndash;          <u-number-box v-model="item.newAvailableNumber" :min="0" integer />&ndash;&gt;-->
        <!--        </view>-->
        <!--      </view>-->
        <view class="popup-line" />
      </view>
      <!--  铺货库存  -->
      <!-- <block v-if="distributionWareHouse.length">
        <view v-for="item in distributionWareHouse" :key="item.id" class="popup-row">
          <view class="popup-row__title flex flex-justify-between">
            {{ item.warehouseName }}库存
          </view>
          <view class="popup-row__con color-block-45 fz-24"
            >可用库存：{{ item.availableNumber }}</view
          >
          <view class="popup-line" />
        </view>
      </block> -->
      <!-- <view class="popup-row" v-if="platWareHouse && platWareHouse.length"> -->
      <view v-if="platWareHouse && platWareHouse.length" class="popup-row">
        <view class="popup-row__title flex flex-justify-between">
          <view>平台仓库库存</view>
          <!--        <view>59</view>-->
        </view>
        <view v-for="item in platWareHouse" :key="item.id" class="popup-row__item">
          <view class="left">
            {{ item.warehouseName }}：
            <text :class="item.warnLabel ? 'red' : ''">{{ item.availableNumber }}</text>
            <view v-if="item.warnLabel" class="left-tag">{{ item.warnLabel }}</view>
          </view>
          <view>{{ item.availableNumber }}</view>
          <!--        <view class="right-btn round" @click="addGoods(item)">申请补货</view>-->
        </view>
        <view class="popup-line" />
      </view>
      <view v-if="factoryWareHouse && factoryWareHouse.length" class="popup-row">
        <view class="popup-row__title flex flex-justify-between">
          <view>工厂仓库库存</view>
          <!--        <view>59</view>-->
        </view>
        <view v-for="item in factoryWareHouse" :key="item.id" class="popup-row__item">
          <view class="left">
            {{ item.warehouseName }}：
            <text :class="item.warnLabel ? 'red' : ''">{{ item.availableNumber }}</text>
            <view v-if="item.warnLabel" class="left-tag">{{ item.warnLabel }}</view>
          </view>
          <view>{{ item.availableNumber }}</view>
        </view>
      </view>
    </scroll-view>
    <view class="popup-bottom flex flex-justify-between p-b-safe-area">
      <view class="popup-bottom__button" @click="goScan(1)">补货</view>
      <view class="popup-bottom__button" @click="goScan(2)">出库</view>
      <view class="popup-bottom__button orange" @click="confirm">申请调拨</view>
      <!--      <EraButton circle size="two-hundred" text="扫码补货" themeType="Default" @click="goScan(1)" />-->
      <!--      <EraButton circle size="two-hundred" text="手动出库" themeType="Default" @click="goScan(2)" />-->
      <!--      <EraButton :disabled="allotEdit" circle size="two-hundred" text="申请调拨" @click="confirm" />-->
    </view>
  </u-popup>
</template>
<script>
  import helper from '@/common/helper'

  export default {
    name: 'GoodsPop',
    props: {},
    data() {
      return {
        visible: false,
        record: '',
        ownWareHouse: [],
        distributionWareHouse: [], // 铺货库存
        platWareHouse: [],
        factoryWareHouse: [],
        total: 0, // 商家仓总库存
        availableNumber1: 0,
        allotEdit: true,
        openCode: false, // 查看识别码
        codeList: [], // 识别码列表
        pageNo: 1, // 页数，默认值 1
        pageSize: 100000, // 每页条数，默认值 10
      }
    },
    methods: {
      async show(data) {
        console.log('show ------->',data)
        this.codeList = [] // 每次库存弹框显示时识别码列表置空
        this.record = data
        this.visible = true
        helper.showLoading()
        await this.$VoHttp
          .apiWarehouseStockGoodsWarehouse({
            goodId: data.id,
            isDistribution: data.isDistribution, // 是否铺货
            orgGoodsId: data.orgGoodsId,
          })
          .then((res) => {
            console.log(res, 'res')
            this.total = res.data.total
            this.ownWareHouse = res.data.ownWareHouse
            this.distributionWareHouse = res.data.distributionWareHouse
            this.platWareHouse = res.data.platWareHouse
            this.factoryWareHouse = res.data.factoryWareHouse
            if (this.ownWareHouse.length > 0) {
              this.ownWareHouse.forEach((item) => {
                item.edit = false
                item.newAvailableNumber = item.availableNumber
              })
            }
            this.platWareHouse.forEach((item) => {
              item.edit = false
            })
            this.factoryWareHouse.forEach((item) => {
              item.edit = false
            })
            helper.hideLoading()

            if (
              (this.ownWareHouse.length > 0 && this.platWareHouse.length > 0) ||
              (this.ownWareHouse.length > 0 && this.factoryWareHouse.length > 0) ||
              (this.ownWareHouse.length > 0 && this.distributionWareHouse.length > 0) ||
              (this.factoryWareHouse.length > 0 && this.platWareHouse.length > 0)
            ) {
              this.allotEdit = false
            } else {
              this.allotEdit = true
            }
          })
          .catch((err) => {
            helper.hideLoading()
          })
        this.pageNo = 1
        await this.getData(data)
      },
      async getData(data) {
        // 获取识别码列表数据
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          goodsId: data.id,
        }
        if (this.ownWareHouse) {
          this.ownWareHouse.forEach((info) => {
            params.warehouseId = info.warehouseId
          })
        }
        await this.$VoHttp.WAREHOUSE.apiWarehouseOperAgentGoodsVinPage(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.sortGoodsVin
              // this.total = res.data.total
              this.codeList = this.codeList.concat(data)
              console.log(this.codeList)
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
          .finally(() => {
            this.loading = !this.loading
            this.loadingStatus = false
          })
      },
      // 查看识别码
      openCodeFn() {
        this.openCode = true
      },
      // 关闭识别码
      closeCodeFn() {
        this.openCode = false
      },
      //滚到底部加载
      // scrolltolowerPop() {
      //   console.log('底部加载')
      //   if (this.codeList.length >= this.total) {
      //     uni.$u.toast('没有更多了')
      //     return false
      //   }
      //   this.pageNo++
      //   this.getData(this.record)
      // },
      close() {
        this.visible = false
      },
      /**
       * 1.去商家仓扫码补货 2.去商家仓手动出库
       */
      goScan(index) {
        console.log('this.ownWareHouse', this.ownWareHouse[0])
        if (this.ownWareHouse.length < 1) {
          console.log(111111111111)
          this.availableNumber1 = 0
        } else {
          console.log(222222222222222)
          this.availableNumber1 = this.ownWareHouse[0].availableNumber
        }
        let url = `/pagesAgent/PublishProduct/ScanToAddGoods?id=${this.record.id}&total=${this.availableNumber1}&index=${index}`
        if (index === 2) {
          url = url + '&hideGoods=true'
        }
        this.$linkToEasy(url)
      },
      confirm() {
        // let arr = this.ownWareHouse.map((item) => {
        //   return {
        //     goodsId: this.record.id,
        //     warehouseId: item.warehouseId,
        //     changeNumber: item.newAvailableNumber,
        //   }
        // })
        // console.log('arr22', arr)
        // this.$VoHttp
        //   .apiWarehouseOperSupplierSelfRefillBatch({
        //     boList: arr,
        //   })
        //   .then((res) => {
        //     if (res.code === '20001') {
        //       uni.$u.toast('操作成功')
        //     }
        //     this.$emit('confirm')
        //   })
        //修改2022年11月12日11:29:36  bug：6637
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/WarehouseAllotPro?goodsId=' +
            this.record.id +
            '&goodsName=' +
            this.record.name +
            '&isSelectWarehouse=1',
        )
      },
      //显示步进器
      showNumBox(item, index) {
        this.ownWareHouse[index].edit = true
        this.$forceUpdate()
      },
      //跳转平台仓补货
      addGoods(item) {
        this.$linkToEasy(
          `/pagesSupplier/Warehouse/WarehouseList/WarehouseRepairPro?warehouseId=${item.warehouseId}&warehouseName=${item.warehouseName}&type=1&isSelf=0&goodsName=${this.record.name}&goodsId=${this.record.id}`,
        )
      },
    },
  }
</script>
<style lang="scss" scoped>
  .popup {
    &-scroll {
      min-height: 400rpx;
      max-height: 1000rpx;
    }
    &-title {
      padding: 24rpx 0;
      display: flex;
      border-bottom: 1px solid #f7f7f8;
      &__text {
        flex: 1;
        font-weight: 500;
        color: $v-c0-85;
        font-size: 32rpx;
        line-height: 1.5;
        padding-left: 32rpx;
        padding-right: 38rpx;
        .text-label {
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
      &__right {
        width: 40rpx;
        padding-right: 24rpx;
      }
    }
    &-line {
      height: 8rpx;
      background: $v-bg-light;
    }
    &-row {
      &__title {
        padding: 24rpx 32rpx 16rpx 32rpx;
        font-weight: bold;
        color: $v-c0-85;
        font-size: 32rpx;
        line-height: 1.5;
      }
      &__con {
        padding: 0 32rpx 24rpx;
        .con-code {
          width: 332rpx;
          font-size: 28rpx;
          height: 46rpx;
          line-height: 46rpx;
          text-align: left;
          box-sizing: border-box;
          background: #f6f7f8;
          border-radius: 4rpx;
          margin: 16rpx 22rpx 0 0;
          padding: 0 8rpx;
          box-sizing: border-box;
        }
        .con-code:nth-of-type(even) {
          margin-right: 0;
        }
        .con-open {
          font-size: 24rpx;
          margin-top: 16rpx;
        }
      }
      &__item {
        padding: 0 32rpx 34rpx 32rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #f7f7f8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28rpx;
        color: $v-c0-85;
        line-height: 42rpx;
        &.border {
          border-bottom: 8rpx solid #f7f7f8;
        }
        .left {
          flex: 1;
          display: flex;
          align-items: center;
          color: $v-c0-85;
          font-size: 28rpx;
          line-height: 1.5;
          .red {
            color: #e50012;
          }
          &-tag {
            height: 36rpx;
            border: 1px solid #e50012;
            border-radius: 11px;
            padding: 0 16rpx;
            color: #e50012;
            font-size: 24rpx;
            line-height: 36rpx;
            margin-left: 16rpx;
          }
        }
        .right {
          padding-right: 16rpx;
          &-btn {
            border: 1px solid rgba(0, 0, 0, 0.65);
            border-radius: 4px;
            text-align: center;
            height: 48rpx;
            width: 96rpx;
            font-size: 24rpx;
            color: $v-c0-85;
            line-height: 48rpx;
            &.round {
              border: 1px solid #22284b;
              border-radius: 15px;
              color: #22284b;
              padding: 0 26rpx;
            }
          }
        }
      }
    }
    &-btn {
      display: flex;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      &__item {
        flex: 1;
        background: #22284b;
        border-radius: 32px;
        text-align: center;
        color: #ffffff;
        font-size: 32rpx;
        line-height: 92rpx;
        &.left {
          margin-right: 40rpx;
          background: #fff;
          border: 1px solid #22284b;
          color: #22284b;
        }
      }
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      &__button {
        font-size: 32rpx;
        width: 200rpx;
        height: 80rpx;
        line-height: 80rpx;
        color: $v-c0-85;
        border: 2rpx solid #d3d4db;
        border-radius: 64rpx;
        text-align: center;
        box-sizing: border-box;
        &.orange {
          background: #ff5319;
          color: #fff;
          border: 2rpx solid #ff5319;
        }
      }
    }
  }
  .good-tips {
    font-weight: normal;
    font-size: 24rpx;
    color: #fff;
    padding: 2rpx 12rpx;
    background: $color-primary-yellow;
    border-radius: 24rpx;
  }
</style>
