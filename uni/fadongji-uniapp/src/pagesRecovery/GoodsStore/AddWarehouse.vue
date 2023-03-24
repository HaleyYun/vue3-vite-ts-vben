<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="add"
    >
      <VoNav
        :is-fixed="true"
        :is-have-more="true"
        placeBgColor="#f6f7f8"
        title="设置库存信息"
      />

      <EraForm
        ref="form"
        :model="formData"
        :rules="rules"
        class="apply-form"
        labelPosition="left"
        labelWidth="120"
      >
        <EraFormItem
          class="apply-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="仓库名"
          labelWidth="80"
          prop="name"
          required
        >
          <u-input
            v-model.trim="formData.name"
            :disabled="isEdit && userInfo.platformCode !== 'supplier'"
            border="none"
            class="item-input"
            color="rgba(0, 0, 0, 0.85)"
            disabledColor="#fff"
            fontSize="16px"
            inputAlign="right"
            maxlength="20"
            placeholder="请输入仓库名称，最多输入20位字符"
            placeholderClass="apply-form__placeholder color-block-25"
            type="text"
            @input="inputFn($event, 'name')"
          />
        </EraFormItem>

        <EraFormItem
          class="apply-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="仓库地址"
          prop="address"
          required
        >
          <u-input
            v-model="formData.address"
            :disabled="isEdit && userInfo.platformCode !== 'supplier'"
            border="none"
            class="item-input"
            color="rgba(0, 0, 0, 0.85)"
            disabledColor="#fff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入详细地址"
            placeholderClass="apply-form__placeholder"
            type="text"
          />
        </EraFormItem>
        <view class="h24 line-bg" />

        <EraFormItem
          class="apply-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="设置发货时效"
          prop="code"
          @click="setDeliveryTimeFn"
        >
          <view class="flex flex-vertical-c flex-justify-r flex1">
            <view class="flex1 apply-form__box" />
            <VoIcon :opacity="0.25" :size="24" name="right-arrow" />
          </view>
        </EraFormItem>
        <view class="apply-form__text">
          <view class="fz-28 font-weight-500 m-r-32 m-t-8">温馨提示</view>
          <view class="tip"
            >若未设置发货时效，系统将默认预计7日内发货，并在商品和订单相关信息中展示
          </view>
        </view>

        <EraFormItem
          v-if="isEdit"
          class="apply-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="设置到货时效"
          prop="code"
          @click="setArrivalTimeFn"
        >
          <view class="flex flex-vertical-c flex-justify-r flex1">
            <view class="flex1 apply-form__box" />
            <VoIcon :opacity="0.25" :size="24" name="right-arrow" />
          </view>
        </EraFormItem>

        <view v-if="isEdit" class="apply-form__text">
          若未设置到货时效，系统将默认预计15日内到货，并在商品和订单相关信息中展示
        </view>
      </EraForm>

      <view class="safearea-box" />
      <VoSafetyArea>
        <template #group>
          <view class="add-group">
            <EraButton size="lg" @click="editWarehouseFn">保存</EraButton>
          </view>
        </template>
      </VoSafetyArea>
    </view>

    <VoQuick :show.sync="showDirect" />
    <VoAddress :show.sync="showAddressBoo" @sureFn="sureAddressFn" />
  </view>
</template>

<script>
  export default {
    name: 'AddWarehouse',
    data() {
      return {
        warehouseId: '', // 编辑仓库id
        isEdit: false, // 是否是编辑
        showAddressBoo: false,
        isLoading: false,
        formData: {
          areaName: '', // 省市区名字
          areaCode: '', // 省市区code
          name: '', // 仓库名称
          address: '', // 仓库地址
        },
        showDirect: false,
        rules: {
          name: [
            {
              required: true,
              message: '请输入仓库名',
              trigger: ['blur', 'change'],
            },
            {
              // TODO 自定义验证不生效，暂用另一种方案进行验证
              asyncValidator: (rule, value, callback) => {
                let reg =
                  /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/
                if (reg.test(value)) {
                  callback(new Error('姓名不合法，不允许特殊字符和空格'))
                } else {
                  callback()
                }
              },
            },
          ],
          areaName: {
            required: true,
            message: '请选择地址',
          },
          address: {
            required: true,
            message: '请输入详细地址',
          },
        },
      }
    },
    methods: {
      inputFn($event, key) {
        //过滤空格
        this.formData[key] = $event.replace(/\s+/g, '')
      },
      /**
       * 确认选中的地址
       */
      sureAddressFn(data) {
        this.formData.areaName = data[0].name + data[1].name + data[2].name
        this.formData.areaCode = data[2].code
      },
      /**
       * 设置到货时效
       */
      setArrivalTimeFn() {
        // this.$linkToEasy(
        //   '/pagesSupplier/Warehouse/WarehouseList/SetArrivalTimeliness?warehouseId=' +
        //     this.warehouseId,
        // )
      },
      /**
       *  设置发货时效
       */
      setDeliveryTimeFn() {
        this.$linkToEasy(
          '/pagesRecovery/GoodsStore/SetDeliveryTimeliness?warehouseId=' + this.warehouseId,
        )
      },
      /**
       * 支持定制开关该改变
       */
      changeSwitchFn(e) {
        this.formData.isCoding = e.detail.value
      },
      /**
       *  选择地址
       */
      selectAddressFn() {
        if (this.isEdit && this.userInfo.platformCode !== 'supplier') return
        this.showAddressBoo = true
      },
      /**
       * 修改仓库
       */
      editWarehouseFn() {
        let reg =
          /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/
        if (reg.test(this.formData.name)) {
          uni.$u.toast('姓名不合法，不允许特殊字符和空格')
          return
        }
        this.$refs.form.validate().then((res) => {
          if (this.isLoading) return
          this.isLoading = true
          let param = {
            type: 1,
            name: this.formData.name,
            areaCode: this.formData.areaCode,
            address: this.formData.address,
          }
          param.id = this.formData.id
          this.$VoHttp
            .apiWarehouse$Put(param)
            .then((res) => {
              uni.$u.toast('保存成功')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
              this.isLoading = false
            })
            .catch((e) => {
              this.$u.toast(e.message || '网络请求失败')
              this.isLoading = false
            })
        })
      },
      /**
       * 初始化信息
       */
      initFn() {
        this.$VoHttp
          .apiWarehouseRecycling()
          .then((res) => {
            if (res.code === '20001') {
              this.formData = res.data
              this.warehouseId = this.formData.id
            } else {
              uni.$u.toast(res.message || '仓库获取失败')
            }
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络请求失败')
          })
      },
    },
    onLoad() {
      this.initFn()
    },
  }
</script>

<style lang="scss" scoped>
  .add {
    width: 750rpx;
    min-height: 100vh;
    background-color: #f6f7f8;
    box-sizing: border-box;
    padding-bottom: 128rpx;
    padding-top: 24rpx;

    &-del {
      width: 750rpx;
      height: 96rpx;
      text-align: center;
      line-height: 96rpx;
      font-size: 32rpx;
      color: rgba(0, 0, 0, 0.45);
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

    .apply-form {
      background: #ffffff;

      &__text {
        font-size: 24rpx;
        padding: 8rpx 48rpx 16rpx 32rpx;
        line-height: 150%;
        box-sizing: border-box;
        width: 750rpx;
        background-color: #f7f7f8;

        .tip {
          color: #ee0a24;
        }
      }

      &__box {
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        line-height: 24px;
      }

      &__placeholder {
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
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
  }
</style>
