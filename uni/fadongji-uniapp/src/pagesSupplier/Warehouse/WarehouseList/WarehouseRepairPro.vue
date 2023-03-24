<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="repair"
  >
    <VoNav :left-width="240" :right-width="240" is-have-more title="申请补货">
      <block slot="operation">
        <view class="repair-btn m-r-28" @click="goRepairRecord">补货记录</view>
      </block>
    </VoNav>
    <view class="line-bg h16" />
    <!--    <view-->
    <!--      class="bg-white overTwoEllipsis fz-b fz-32 lh150 color-block p-t-22 p-b-18 p-l-32 p-r-32"-->
    <!--      >{{ formData.goodsName }}</view-->
    <!--    >-->
    <EraForm ref="form" class="repair-form" labelPosition="left" labelWidth="100">
      <EraFormItem
        class="repair-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="选择商品"
        prop="name"
        @click="goSelectFn"
      >
        <view class="flex flex-vertical-c flex-justify-r flex1">
          <view v-if="formData.goodsName" class="flex1 repair-form__box text-right">{{
            formData.goodsName
          }}</view>
          <view v-else class="flex1 repair-form__box text-right color-gray">请选择商品</view>
          <!--          <VoIcon :opacity="0.25" :size="24" name="right-arrow" />-->
        </view>
      </EraFormItem>
      <!-- <EraFormItem class="repair-form__item" color="rgba(0, 0, 0, 0.85)" label="扫描发动机识别码">
        <view class="flex flex-vertical-c flex-justify-r flex1" @click="chooseFn">
          <VoIcon :size="24" color="#F20014" name="scan" />
        </view>
      </EraFormItem>

      <view class="repair-list__code flex flex-wrap">
        <view
          v-for="(item, index) of goodsVin"
          :key="index"
          class="code-block flex flex-vertical-c"
        >
          <image
            @click="delFn(index)"
            class="code-block__icon"
            src="/static/created/product/delete.png"
          />
          <view class="fz-28 m-l-8">{{ item }}</view>
        </view>
      </view> -->

      <EraFormItem
        class="repair-form__item m-l-8"
        color="rgba(0, 0, 0, 0.85)"
        label="补货仓库"
        required
        @click="selectWarehouseFn"
      >
        <view class="flex flex-vertical-c flex-justify-r flex1">
          <view v-if="formData.warehouseName" class="flex1 repair-form__box text-right">{{
            formData.warehouseName
          }}</view>
          <view v-else class="flex1 repair-form__box text-right color-gray flex"
            >请选择补货仓库
            <VoIcon :opacity="0.25" :size="24" name="right-arrow" />
          </view>
        </view>
      </EraFormItem>

      <EraFormItem
        class="repair-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="出货仓库"
        @click="selectOutWarehouseFn"
      >
        <view class="flex flex-vertical-c flex-justify-r flex1">
          <view v-if="formData.outWarehouseName" class="flex1 repair-form__box text-right">{{
            formData.outWarehouseName
          }}</view>

          <view v-else class="flex1 repair-form__box text-right color-gray">请选择出货仓库</view>
          <VoIcon :opacity="0.25" :size="24" name="right-arrow" />
        </view>
      </EraFormItem>

      <EraFormItem
        class="repair-form__item m-l-8"
        color="rgba(0, 0, 0, 0.85)"
        label="补货数量"
        required
      >
        <view class="flex flex-vertical-c flex-justify-r flex1" @click="toToast()">
          <!-- 校验补货数量 -->
          <!--  :disabled="warehouseType === '1' || !formData.outWarehouseName" -->
          <u-input
            v-model="formData.changeNumber"
            border="none"
            class="item-input"
            color="rgba(0, 0, 0, 0.85)"
            disabledColor="#ffffff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入补货数量"
            placeholderClass="repair-form__placeholder"
            type="number"
            @input="inputChange"
          />
        </view>
      </EraFormItem>
      <!-- 扫码组件 -->
      <view class="content">
        <ScanList :list.sync="scanList" :total-count="scanList.length || 0" />
      </view>
    </EraForm>

    <VoSafetyArea>
      <template #group>
        <view class="repair-group">
          <!--          formData.outWarehouseId &&-->

          <EraButton
            v-if="formData.warehouseId && formData.goodsId && formData.changeNumber"
            :font-size="32"
            size="lg"
            @click="sureFn"
            >确定</EraButton
          >
          <EraButton v-else :font-size="32" disabled size="lg">确定</EraButton>
        </view>
      </template>
    </VoSafetyArea>
  </view>
</template>

<script>
  import { chooseImageOcrByPromise } from '@/common/helper'
  import ScanList from './components/ScanList'

  export default {
    name: 'WarehouseRepairPro',
    components: {
      ScanList,
    },
    data() {
      return {
        goodsVin: [],
        scanList: [],
        isSelectPro: true, // 是否可以选择商品
        isLoading: false,
        isSelf: -1, //1是自有仓库   2是平台仓库
        type: '', // 1是补货  2是调拨
        warehouseType: '', //出货仓库类型 1商家仓
        formData: {
          warehouseId: '', // 入库id
          warehouseName: '', // 入库仓库名称
          outWarehouseId: '', // 出库仓库id
          outWarehouseName: '', // 出库仓库名称
          goodsId: '', // 商品id
          goodsName: '', // 商品名称
          changeNumber: '', //变化数量
        },
      }
    },
    watch: {
      scanList: {
        deep: true,
        handler(newVal) {
          if (newVal.length === 0) {
            this.formData.changeNumber = ''
          } else {
            this.formData.changeNumber = newVal.length
          }
        },
      },
    },
    methods: {
      toToast() {
        // if (this.warehouseType === '1' || !this.formData.outWarehouseName) {
        //   this.$u.toast('请通过扫码添加')
        // }
      },
      inputChange(e) {
        if (this.formData.changeNumber.length === 1) {
          if (Number(e) === 0) {
            this.formData.changeNumber = '1'
            return
          }
          this.formData.changeNumber = this.formData.changeNumber.replace(/[^1-9]/g, '')
        } else {
          this.formData.changeNumber = this.formData.changeNumber.replace(/\D/g, '')
        }
      },
      delFn(index) {
        this.goodsVin.splice(index, 1)
      },
      chooseFn() {
        chooseImageOcrByPromise({
          apiUrl: '/v1/api/business/vehicle/brand/ocr',
          tip: '识别中',
          formData: {
            type: 'qrcode',
          },
        })
          .then((res) => {
            console.log(res, 'ssss')
            const result = JSON.parse(res.data)
            if (+result.code === 20001) {
              this.goodsVin.push(result.data)
            } else {
              uni.$u.toast(result.message || '识别失败')
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
      },
      /**
       * 发起补货
       */
      sureFn() {
        let availableNumber = this.$storage.get('availableNumber')
        if (
          this.formData.outWarehouseId &&
          Number(this.formData.changeNumber) > Number(availableNumber)
        ) {
          this.$u.toast('当前仓库数量不足，请重新设置。')
          return
        }
        if (this.formData.warehouseId === this.formData.outWarehouseId) {
          this.$u.toast('出库仓库和入库仓库不能是同一个')
          return
        }
        // if (!this.scanList.length) {
        //   this.$u.toast('请至少录入1个发动机识别码')
        //   return
        // }
        let arr = this.scanList.map((item) => item.value)
        if (this.isLoading) return
        this.isLoading = false
        let param = this.formData
        if (arr && arr.length) {
          param.goodsVin = arr.join(',')
        }

        // console.log('param', param)

        if (this.isSelf === 1) {
          //自有仓库补货
          this.$VoHttp
            .apiWarehouseOperSupplierSelfRefill(param)
            .then((res) => {
              uni.$u.toast('补货成功')
              this.$storage.remove('availableNumber')
              setTimeout(() => {
                this.$backFn()
                uni.$emit('allowanceSuccess')
                this.isLoading = false
              }, 1500)
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
              this.isLoading = false
            })
        } else {
          // 平台仓库补货
          this.$VoHttp
            .apiWarehouseOperSupplierRefill(param)
            .then((res) => {
              uni.$u.toast('补货成功')
              setTimeout(() => {
                this.$backFn()
                uni.$emit('allowanceSuccess')
                this.isLoading = false
              }, 1500)
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
              this.isLoading = false
            })
        }
      },
      /**
       * @description 选择出货仓库
       */
      selectOutWarehouseFn() {
        if (!this.formData.goodsId) {
          uni.$u.toast('请先选择商品')
          return
        }
        if (this.formData.outWarehouseId) {
          console.log(this.formData, '------------------------')
          this.$storage.set('InvestmentWarehouse', this.formData.outWarehouseId)
        }
        if (this.formData.warehouseId) {
          this.$storage.set('InvestmentWarehouseId', this.formData.warehouseId)
        }

        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/SelectWarehouse?goodsId=' +
            this.formData.goodsId +
            '&type=2',
        )
      },
      /**
       * @description 选择入货仓库
       */
      selectWarehouseFn() {
        if (this.type === 1) return
        if (!this.formData.goodsId) {
          uni.$u.toast('请先选择商品')
          return
        }
        if (this.formData.warehouseId) {
          this.$storage.set('InvestmentWarehouse', this.formData.warehouseId)
        }

        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/SelectWarehouse?goodsId=' +
            this.formData.goodsId +
            '&type=1',
        )
      },
      /**
       * @description 补货记录
       */
      goRepairRecord() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/WarehouseRepairRecordList?warehouseId=' +
            this.formData.warehouseId,
        )
      },
      goSelectFn() {
        if (!this.isSelectPro) return
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/WarehouseSelectPro?warehouseId=' +
            this.formData.warehouseId,
        )
      },
    },
    onLoad(options) {
      this.type = Number(options.type)
      this.isSelf = Number(options.isSelf)
      if (this.type === 1) {
        // 补货
        this.formData.warehouseId = options.warehouseId
        this.formData.warehouseName = options.warehouseName
      }
      if (options.goodsId) {
        this.formData.goodsId = options.goodsId
        this.formData.goodsName = options.goodsName
        this.isSelectPro = false
      }

      this.$storage.remove('InvestmentWarehouse')
      uni.$on('selectFn', (res) => {
        this.formData.goodsId = res.goodsId
        this.formData.goodsName = res.goodsName
        this.$storage.set('availableNumber', res.availableNumber)
      })
      uni.$on('chooseWarehouse', (res) => {
        // 补货1   出货2   type
        if (res.type == 1) {
          this.formData.warehouseName = res.warehouseName
          this.formData.outWarehouseId = res.warehouseId
        } else if (res.type == 2) {
          this.formData.outWarehouseName = res.warehouseName
          this.formData.outWarehouseId = res.warehouseId
          this.warehouseType = res.wareHouseType //1商家仓
          this.$storage.set('availableNumber', res.availableNumber)
        }
      })
    },
  }
</script>

<style lang="scss" scoped>
  .repair {
    width: 750rpx;
    min-height: 100vh;
    overflow: hidden;
    background-color: #f6f7f8;
    box-sizing: border-box;
    &-list {
      margin-top: 24rpx;
      margin-bottom: 100rpx;
      height: 100%;
      overflow-y: scroll;
      &__title {
        font-weight: bold;
        font-size: 32rpx;
        line-height: 150%;
        color: $v-c0-85;
        background: #ffffff;
        padding: 20rpx 32rpx;
      }
      &__identify {
        background: #ffffff;
        .identify-line {
          font-size: 32rpx;
          line-height: 150%;
          color: $v-c0-85;
          padding: 24rpx 0;
          border-bottom: 2rpx solid $v-bg-light;
        }
      }
      &__code {
        padding: 24rpx 0 0 32rpx;
        background: #ffffff;
        .code-block {
          width: 331rpx;
          height: 42rpx;
          line-height: 42rpx;
          margin-right: 24rpx;
          margin-bottom: 24rpx;
          &__icon {
            width: 32rpx;
            height: 32rpx;
          }
        }
      }
    }
    &-form {
      background: #ffffff;
      margin-bottom: 128rpx;
      &__text {
        color: rgba(0, 0, 0, 0.45);
        font-size: 24rpx;
        padding: 8rpx 48rpx 16rpx 32rpx;
        line-height: 150%;
        box-sizing: border-box;
        width: 750rpx;
        background-color: #f7f7f8;
      }
      &__box {
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        line-height: 24px;
      }
      &__item {
        padding: 0rpx 32rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;

        .item-code {
          margin-left: 24rpx;
        }
      }
    }
    &-group {
      width: 750rpx;
      height: 128rpx;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      padding: 0rpx 16rpx;
      justify-content: center;
    }
  }
  .repair-btn {
    color: #ff5319;
    border: 2rpx solid #ffa98c;
    border-radius: 200rpx;
    font-size: 24rpx;
    line-height: 36rpx;
    font-weight: bold;
    padding: 10rpx 24rpx;
  }
  .content {
    min-height: 674rpx;
    padding-bottom: 156rpx;
    background-color: #fff;
    border-bottom: 1rpx solid transparent;
  }
</style>
