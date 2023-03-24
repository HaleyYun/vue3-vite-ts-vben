<template>
  <view class="lines">
    <VoNav :title="id ? '编辑到货时效' : '新增到货时效'" is-fixed is-have-more>

    </VoNav>
    <EraForm
      ref="form"
      :model="formData"
      :rules="rules"
      class="lines-form m-t-24"
      labelPosition="left"
      labelWidth="140"
    >
      <EraFormItem
        class="lines-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="到货地区"
        prop="code"
        @click="goSelectAddressFn"
      >
        <view
          v-if="formData.areaCode !== '' && formData.name !== null && formData.name.length > 0"
          class="flex1 lines-form__box m-r-8"
        >
          <text v-for="(item, index) of formData.name" :key="index">{{
            item === '86' ? '全国' : item
          }}</text>
        </view>
        <view v-else class="flex1 lines-form__box color-gray m-r-8">请选择到货地区</view>
        <VoIcon :opacity="0.25" name="right-arrow" />
      </EraFormItem>
      <EraFormItem
        class="lines-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="设置到货时间"
        prop="faRenName"
      >
        <u-input
          v-model="formData.arrivalTime"
          autoHeight
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          inputAlign="right"
          maxlength="2"
          placeholder="请输入到货时间"
          placeholderClass="lines-form__placeholder"
          type="number"
          @input="formatterInt"
        />
        <view class="m-l-20">天</view>
      </EraFormItem>
    </EraForm>
    <view class="lines-bottom p-b-safe-area">
      <EraButton circle text="完成" @click="complete" />
      <view class="p-b-safe-area" />
    </view>
    <view class="p-b-safe-area" />
  </view>
</template>

<script>
  import { formatterHandle } from '@/common/helper'

  export default {
    name: 'ArrivalTimeliness',
    data() {
      return {
        areaName: '',
        id: '', // 到货时效id
        isLoading: false,
        warehouseId: '', // 仓库id
        formData: {
          arrivalTime: '', // 到货时间
          areaCode: [],
          name: [],
        },
        rules: {
          warehouseName: {
            type: 'string',
            required: true,
            message: '请输入到货时间',
            trigger: ['blur', 'change'],
          },
        },
      }
    },
    methods: {
      formatterInt(value) {
        return formatterHandle(value, 'int')
      },
      inputFn(e) {
        console.log('this.formData.arrivalTime', this.formData.arrivalTime, '3333', e)
      },
      goSelectAddressFn() {
        this.$storage.set('defaultArea', this.formData.areaCode)
        this.$linkToEasy('/pagesProduct/SaleArea/SaleArea?type=2&title=设置收货地区')
      },
      complete() {
        let that = this
        if (this.formData.areaCode.length <= 0) {
          uni.$u.toast('请设置到货地区')
          return
        }
        if (that.formData.arrivalTime === '') {
          uni.$u.toast('请设置到货时间')
          return
        }
        if (this.isLoading) return
        this.isLoading = true
        let param = {
          warehouseId: this.warehouseId,
          areaCode: this.formData.areaCode,
          arrivalTime: this.formData.arrivalTime,
        }
        // if (this.id) {
        //   param.id = this.id
        //   this.$VoHttp
        //     .apiWarehouseArrival$Put(param)
        //     .then((res) => {
        //       uni.$u.toast('编辑到货时效成功！')
        //       setTimeout(() => {
        //         this.$backFn()
        //       }, 1500)
        //       this.isLoading = false
        //     })
        //     .catch((e) => {
        //       uni.$u.toast(e.message || '请求失败')
        //       this.isLoading = false
        //     })
        // }
        this.$VoHttp
          .apiWarehouseArrival$Post(param)
          .then((res) => {
            uni.$u.toast('操作成功！')
            setTimeout(() => {
              this.$backFn()
            }, 1500)
            this.isLoading = false
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
            this.isLoading = false
          })
      },
      initFn() {
        this.$VoHttp.apiWarehouseArrival$Id({ id: this.id }).then((res) => {
          this.formData = res.data ? res.data : { arrivalTime: '', areaCode: '' }
          this.formData.areaCode =
            typeof this.formData.areaCode == 'string' && this.formData.areaCode != ''
              ? [this.formData.areaCode]
              : this.formData.areaCode
          this.formData.name = [this.areaName]
        })
      },
    },
    onLoad(options) {
      if (options.areaName) {
        this.areaName = options.areaName
      }
      if (options.warehouseId) {
        this.warehouseId = options.warehouseId
      }
      if (options.id) {
        this.id = options.id
        this.initFn()
      }
    },
    onShow() {
      uni.$on('addressFn', (res) => {
        console.log(res, 'addressFn')
        this.formData.areaCode = res
      })
      uni.$on('addressNames', (res) => {
        this.formData.name = res
        console.log(this.formData.name, 'addressNames')
      })
    },
  }
</script>

<style lang="scss" scoped>
  .lines {
    width: 750rpx;
    min-height: 100vh;
    box-sizing: border-box;
    &-form {
      padding: 0 32rpx;
      background: #ffffff;
      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        .item-code {
          margin-left: 24rpx;
        }
        .item-input {
          height: 48rpx;
          line-height: 150%;
        }
      }
      &__box {
        width: 215px;
        font-size: 32rpx;
        color: $v-c0-65;
        line-height: 150%;
        height: 48rpx;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
        font-size: 32rpx;
      }
    }
    &-bottom {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }
  .color-gray {
    color: $v-c0-25 !important;
  }
</style>
