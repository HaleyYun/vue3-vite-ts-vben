<template>
  <view class="goods-item">
    <view class="flex flex-justify-between">
      <view class="goods-item__title">
        <view class="label">商品编号</view>
        <view class="value">{{ dataObj.code || '暂无编号' }}</view>
      </view>
    </view>
    <view class="goods-item__line" />
    <view class="goods-item__main">
      <image :src="$transferCosUrl(dataObj.pic, 1)" class="main-left" />
      <view class="main-right">
        <view class="main-right__name flex flex-wrap overTwoEllipsis">
          <text v-show="dataObj.categoryType" class="good-tips font-shu-hei-ti m-r-8">
            {{ dataObj.categoryType }}
          </text>
          <text
            v-for="(b, i) in (dataObj.name || '暂无名称').split('')"
            :key="i"
            class="fz-b"
          >
            {{ b }}
          </text>
        </view>
        <view class="fz-28 color-block-65">
        总可用库存：{{ dataObj.inventory || 0 }}
        </view>
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
      //商品状态
      goodStatus: {
        type: Number,
        default: 0,
      },
      //是否展示展开
      showExpand: {
        type: Boolean,
        default: true,
      },
      //是否查看识别码
      showCode: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        isSelect: false,
        openDetails: false,
        openCode: false, // 查看识别码
        ownWareHouse: [],
        distributionWareHouse: [], // 铺货仓
        platWareHouse: [],
        factoryWareHouse: [],
        codeList: [], // 识别码列表
        pageNo: 1, // 页数，默认值 1
        pageSize: 10, // 每页条数，默认值 10
      }
    },
    methods: {
      // 查看识别码
      openCodeFn() {
        console.log(this.ownWareHouse, 88888888888)
        this.openCode = true
      },
      // 关闭识别码
      closeCodeFn() {
        this.openCode = false
      },
      //获取仓库信息
      async getWareInfo() {
        await this.$VoHttp
          .apiWarehouseStockGoodsWarehouse({
            goodId: this.dataObj.id,
            isDistribution: this.dataObj.isDistribution,
            orgGoodsId: this.dataObj.orgGoodsId,
          })
          .then((res) => {
            // console.log(res);
            // let platWareHouse = res.data.factoryWareHouse.filter(item => {
            //   return item.id
            // })
            // console.log(platWareHouse);
            this.ownWareHouse = res.data.ownWareHouse
            this.distributionWareHouse = res.data.distributionWareHouse
            this.platWareHouse = res.data.platWareHouse
            this.factoryWareHouse = res.data.factoryWareHouse
            this.getData()
          })
          .catch((err) => {
            console.log(err)
          })
      },
      /**
       * 获取识别码列表数据
       */
      async getData() {
        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }
        if (this.dataObj) {
          params.goodsId = this.dataObj.id
        }
        if (this.ownWareHouse) {
          this.ownWareHouse.forEach((info) => {
            params.warehouseId = info.warehouseId
          })
        }
        await this.$VoHttp.WAREHOUSE.apiWarehouseOperAgentGoodsVinPage(params)
          .then((res) => {
            if (res.data) {
              this.codeList = res.data.sortGoodsVin
              console.log(this.codeList)
              this.total = res.data.total
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
      openDetailsFn() {
        this.openDetails = true
        this.getWareInfo()
      },
      closeDetailsFn() {
        this.openDetails = false
      },
      /**
       * 1.去商家仓扫码补货 2.去商家仓手动出库
       */
      goScan(index) {
        let url = `/pagesAgent/PublishProduct/ScanToAddGoods?id=${this.dataObj.id}&total=${this.dataObj.inventory}&index=${index}`
        if (index === 2) {
          url = url + '&hideGoods=true'
        }
        this.$linkToEasy(url)
      },
      // 申请调拨
      applyMove() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/WarehouseAllotPro?goodsId=' +
            this.dataObj.id +
            '&goodsName=' +
            this.dataObj.name +
            '&isSelectWarehouse=1',
        )
      },
      // 批量供货
      toSendInvestment() {
        console.log('SendInvestmentInfo')
        this.$linkToEasy('/pagesSupplier/SendInvestmentInfo/SendInvestmentInfo')
      },
      //发起投资
      toInvest() {
        uni.$SendInvestmentForm = {
          goodsId: this.dataObj.id, // 商品主键
          goodsName: this.dataObj.name, // 商品名称-回显使用
          name: '', // 项目名称
          cashPrice: '', // 现金价格
          accountPrice: '', // 账期价格
          accountPeriodDays: '', // 账期天数
          totalInvestment: '', // 总投资量
          warehouseId: '', // 发货仓库
          warehouseName: '', // 发货仓库名称-回显使用
          startNumber: '', // 起投量
          // profitSharing: '', // 商品分润
          investmentLimit: '', // 限投量
          shippingType: 1, // 快递类型 1包邮 2到付
          investableArea: [], // 可投资区域
          desc: [], // 商品详情图['url','url']
          productDetail: [], // 投资详情-回显使用
          status: '', // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架\
        }
        this.$linkToEasy(
          '/pagesSupplier/SendInvestmentInfo/SendInvestmentInfo?goodsId=' +
            this.dataObj.id +
            '&goodsName=' +
            this.dataObj.name,
        )
      },
      /**
       * 去商品库存详情
       */
      // goInventoryDetails() {
        // this.$storage.set('storeGoodsData', this.dataObj)
        // this.$linkToEasy('/pagesAgent/StoreDetail/InventoryDetails?id=' + this.dataObj.id)
      // },
      /**
       * 去商品识别码页
       */
      goIdentificationCode() {
        this.$storage.set('storeGoodsData', this.dataObj)
        this.$linkToEasy('/pagesAgent/PublishProduct/IdentificationCode?id=' + this.dataObj.id)
      },
      //去库存变化记录
      toRecord() {
        this.$linkToEasy(
          '/pagesAgent/StoreDetail/StoreChange?id=' +
            this.dataObj.id +
            '&name=' +
            this.dataObj.name +
            '&categoryType=' +
            this.dataObj.categoryType,
        )
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
    },
  }
</script>
<style lang="scss" scoped>
  .goods-item {
    position: relative;
    background: #ffffff;
    box-sizing: border-box;
    margin-bottom: 16rpx;
    
    color: $v-c0-85;

    .time-open {
      color: rgba(0, 0, 0, 0.45);
      font-size: 24rpx;
    }

    &__label {
      position: absolute;
      top: 72rpx;
      right: 32rpx;
      width: 100rpx;
      height: 100rpx;
    }
    &__line {
          height: 2rpx;
          margin: 0 32rpx;
          background-color: $v-bg-light;
        }
    &__title {
      padding: 24rpx 32rpx;
      line-height: 1.5;
      font-size: 28rpx;
      display: flex;
      align-items: center;

      .label {
        color: $v-c0-45;
      }

      .value {
        margin-left: 8rpx;
        color: $v-c0-45;
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
        // color: #e50012;
        font-size: 28rpx;
        line-height: 1.5;
      }
    }

    &__main {
      display: flex;
      padding: 0 32rpx;
      box-sizing: border-box;
      position: relative;
      

      .main-left {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8px;
        margin: 32rpx 0;
      }

      .mian-tag {
        position: absolute;
        left: 32rpx;
        top: 0;
        background: #e50012;
        border-radius: 8rpx 0px 16rpx;
        width: 80rpx;
        height: 36rpx;
        font-size: 24rpx;
        line-height: 36rpx;
        color: #fff;
        text-align: center;
        z-index: 9;

        &.green {
          background: #26bf26;
        }

        &.pray {
          background: #d3d4db;
        }

        &.red {
          background: #fa3243;
        }
      }

      .main-right {
        flex: 1;
        padding-left: 16rpx;
        margin-top: 32rpx;
        &__name {
        //   width: 418rpx;
          font-size: 32rpx;
          line-height: 1.5;
          color: $v-c0-85;
          margin-bottom: 4rpx;
        }
        &__labels{
          line-height: 36rpx;
          margin-bottom: 16rpx;
          .label-tips {
            margin-left: 8rpx;
            font-size: 24rpx;
            color: #FF5319;
          }
        }
      }
    }

    &__block {
      background: #f7f7f8;
      padding: 16rpx 40rpx;
      margin: 16rpx 32rpx 0;
      border-radius: 4rpx;
      font-size: 28rpx;
    }

    &__btn {
      display: flex;
      justify-content: flex-end;
      margin: 32rpx 32rpx 0;
      padding-bottom: 24rpx;
      border-bottom: 2rpx solid #f7f7f8;
      //padding: 0 32rpx 32rpx 32rpx;

      .btn-item {
        min-width: 120rpx;
        color: $v-c0-85;
        font-size: 24rpx;
        line-height: 1.5;
        text-align: center;
        background: #ffffff;
        border: 2rpx solid $v-c0-25;
        border-radius: 30rpx;
        padding: 10rpx 24rpx;
        margin-left: 24rpx;
        box-sizing: border-box;

        &.first {
          margin-left: 0;
        }

        &.last {
          margin-right: 0;
        }
      }
    }

    .ware-content {
      //padding: 40rpx 32rpx;
      //box-sizing: border-box;
      &__block {
        padding: 24rpx 32rpx;
        .block-line {
          width: 100%;
          height: 2rpx;
          background: #f7f7f8;
          margin: 24rpx 0 8rpx;
        }
      }
    }

    .more {
      width: 100%;
      height: 2rpx;
      background-color: #f7f7f8;
      margin: 40rpx auto 40rpx;

      &-item {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // margin-bottom: 40rpx;

        &:last-child {
          margin-bottom: 0rpx !important;
        }

        &__no {
          color: #e50012;
        }

        &__error {
          color: #fda202;
        }

        &__btn {
          width: 80rpx;
          height: 36rpx;
          border: 2rpx solid #e50012;
          color: #e50012;
          line-height: 32rpx;
          text-align: center;
          border-radius: 36rpx;
          font-size: 24rpx;
        }

        &__warn {
          width: 128rpx;
          height: 36rpx;
          border: 2rpx solid #fda202;
          color: #fda202;
          line-height: 32rpx;
          text-align: center;
          border-radius: 36rpx;
          font-size: 24rpx;
        }

        &__input {
          font-size: 24rpx;
          color: $v-c0-65;
        }
      }
      &-code {
        width: 332rpx;
        font-size: 28rpx;
        height: 46rpx;
        line-height: 46rpx;
        text-align: left;
        box-sizing: border-box;
        background: #f6f7f8;
        border-radius: 4rpx;
        margin: 16rpx 22rpx 0 0;
        padding: 0 4rpx;
      }
      &-code:nth-of-type(even) {
        margin-right: 0;
      }
      &-open {
        font-size: 24rpx;
        margin-top: 16rpx;
      }

      &-line {
        height: 8rpx;
        background-color: #f7f7f8;
        width: 100%;
      }
    }
  }

  .good-tips {
    //height: 38rpx;
    //line-height: 38rpx;
    font-size: 32rpx;
    color: #f20014;
    //padding: 2rpx 12rpx;
    //background: $color-primary-yellow;
    //border-radius: 24rpx;
  }
</style>
