<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="add"
    >
      <VoNav
        :is-fixed="true"
        :is-have-more="true"
        :left-width="240"
        :right-width="240"
        :title="isEdit ? '编辑仓库' : '新建仓库'"
        placeBgColor="#f6f7f8"
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
          prop="name"
          required
        >
          <view class="flex flex1 flex-end flex-vertical-c">
            <!--   文本域-->
            <EraTextarea
              v-model.trim="formData.name"
              :autoHeight="true"
              :disabled="
                isEdit && userInfo.platformCode !== 'supplier' && userInfo.platformCode !== 'agent'
              "
              border="none"
              class="item-input flex1"
              disabledColor="#fff"
              fontSize="16px"
              inputAlign="right"
              maxlength="20"
              placeholder="请输入仓库名称,最多输入20位字符"
              placeholderClass="apply-form__placeholder color-block-25"
              textColor="rgba(0,0,0,0.65)"
              type="text"
              @input="inputFn($event, 'name')"
            />
            <VoIcon
              v-if="formData.name"
              :opacity="0.45"
              :size="20"
              class="m-l-16"
              color="#000"
              name="close-c"
              @click="clearEdit1"
            />
          </view>
        </EraFormItem>
        <EraFormItem
          class="apply-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="仓库地址"
          prop="areaName"
          required
          @click="selectAddressFn"
          required
        >
          <view class="flex flex-vertical-c flex-justify-r flex1">
            <view v-if="formData.areaName" class="flex1 apply-form__box color-block-65"
              >{{ formData.areaName }}
            </view>
            <view v-else class="flex1 apply-form__box color-block-25">请选择仓库地址</view>
            <VoIcon :opacity="0.45" :size="24" name="right-arrow" />
          </view>
        </EraFormItem>

        <EraFormItem
          class="apply-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="详细地址"
          prop="address"
          required
        >
          <view class="flex flex1 flex-end flex-vertical-c">
            <!--   文本域-->
            <EraTextarea
              v-model="formData.address"
              :autoHeight="true"
              :disabled="
                isEdit && userInfo.platformCode !== 'supplier' && userInfo.platformCode !== 'agent'
              "
              border="none"
              class="item-input flex1"
              color="rgba(0, 0, 0, 0.65)"
              disabledColor="#fff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入详细地址"
              placeholderClass="apply-form__placeholder color-block-25"
              textColor="rgba(0,0,0,0.65)"
              type="text"
            />
            <VoIcon
              v-if="formData.address"
              :opacity="0.45"
              :size="20"
              class="m-l-16"
              color="#000"
              name="close-c"
              @click="clearEdit2"
            />
          </view>
        </EraFormItem>

        <EraFormItem
          class="apply-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="仓库联系人"
          prop="contact"
          required
        >
          <u-input
            v-model.trim="formData.contact"
            :disabled="
              isEdit && userInfo.platformCode !== 'supplier' && userInfo.platformCode !== 'agent'
            "
            border="none"
            class="item-input"
            color="rgba(0, 0, 0, 0.65)"
            disabledColor="#fff"
            fontSize="16px"
            inputAlign="right"
            maxlength="6"
            placeholder="请输入仓库联系人"
            placeholderClass="apply-form__placeholder color-block-25"
            type="text"
            @input="inputFn($event, 'contact')"
          />
        </EraFormItem>
        <block v-if="userInfo.roleCode === 'agent'">
          <EraFormItem
            :labelWidth="130"
            class="apply-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="仓库负责人电话"
            prop="phone"
            required
          >
            <u-input
              v-model.trim="formData.phone"
              :disabled="
              isEdit && userInfo.platformCode !== 'supplier' && userInfo.platformCode !== 'agent'
            "
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.65)"
              disabledColor="#fff"
              fontSize="16px"
              inputAlign="right"
              maxlength="25"
              placeholder="请输入"
              placeholderClass="apply-form__placeholder color-block-25"
            />
          </EraFormItem>
        </block>
        <block v-else>
          <EraFormItem
            :labelWidth="130"
            class="apply-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="仓库负责人电话1"
            prop="phone"
            required
          >
            <u-input
              v-model.trim="formData.phone"
              :disabled="
              isEdit && userInfo.platformCode !== 'supplier' && userInfo.platformCode !== 'agent'
            "
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.65)"
              disabledColor="#fff"
              fontSize="16px"
              inputAlign="right"
              maxlength="25"
              placeholder="请输入"
              placeholderClass="apply-form__placeholder color-block-25"
            />
          </EraFormItem>
          <EraFormItem
            :labelWidth="130"
            class="apply-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="仓库负责人电话2"
          >
            <u-input
              v-model.trim="formData.alternativePhone"
              :disabled="
              isEdit && userInfo.platformCode !== 'supplier' && userInfo.platformCode !== 'agent'
            "
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.65)"
              disabledColor="#fff"
              fontSize="16px"
              inputAlign="right"
              maxlength="25"
              placeholder="请输入"
              placeholderClass="apply-form__placeholder color-block-25"
            />
          </EraFormItem>
          <EraFormItem
            class="apply-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="退货电话1"
            prop="refundPhone1"
            required
          >
            <u-input
              v-model.trim="formData.refundPhone1"
              :disabled="
              isEdit && userInfo.platformCode !== 'supplier' && userInfo.platformCode !== 'agent'
            "
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.65)"
              disabledColor="#fff"
              fontSize="16px"
              inputAlign="right"
              maxlength="25"
              placeholder="请输入"
              placeholderClass="apply-form__placeholder color-block-25"
            />
          </EraFormItem>
          <EraFormItem
            class="apply-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="退货电话2"
          >
            <u-input
              v-model.trim="formData.refundPhone2"
              :disabled="
              isEdit && userInfo.platformCode !== 'supplier' && userInfo.platformCode !== 'agent'
            "
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.65)"
              disabledColor="#fff"
              fontSize="16px"
              inputAlign="right"
              maxlength=25
              placeholder="请输入"
              placeholderClass="apply-form__placeholder color-block-25"
            />
          </EraFormItem>
        </block>
        <view class="h24 line-bg" />

        <EraFormItem
          v-if="isEdit"
          class="apply-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="设置发货时效"
          prop="code"
          @click="setDeliveryTimeFn"
        >
          <view class="flex flex-vertical-c flex-justify-r flex1">
            <view class="flex1 apply-form__box color-block-65" />
            <VoIcon :opacity="0.25" :size="24" name="right-arrow" />
          </view>
        </EraFormItem>

        <view v-if="isEdit" class="apply-form__text">
          若未设置发货时效，系统将默认预计7日内发货，并在商品和订单相关信息中展示
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
            <view class="flex1 apply-form__box color-block-65" />
            <VoIcon :opacity="0.25" :size="24" name="right-arrow" />
          </view>
        </EraFormItem>

        <view v-if="isEdit" class="apply-form__text">
          若未设置到货时效，系统将默认预计15日内到货，并在商品和订单相关信息中展示
        </view>

        <!--        <EraFormItem class="apply-form__item" color="rgba(0, 0, 0, 0.85)" label="是否支持定制">-->
        <!--          <switch-->
        <!--            :checked="formData.isCoding"-->
        <!--            class="m-l-auto"-->
        <!--            color="#00B359"-->
        <!--            @change="changeSwitchFn"-->
        <!--          />-->
        <!--        </EraFormItem>-->

        <!--        <EraFormItem-->
        <!--          v-if="formData.isCoding"-->
        <!--          class="apply-form__item"-->
        <!--          color="rgba(0, 0, 0, 0.85)"-->
        <!--          label="每台收取费用"-->
        <!--          prop="codingPrice"-->
        <!--        >-->
        <!--          <u-input-->
        <!--            v-model="formData.codingPrice"-->
        <!--            border="none"-->
        <!--            class="item-input"-->
        <!--            color="rgba(0, 0, 0, 0.65)"-->
        <!--            fontSize="16px"-->
        <!--            inputAlign="right"-->
        <!--            placeholder="请输入定制费用"-->
        <!--            placeholderClass="apply-form__placeholder"-->
        <!--            type="digit"-->
        <!--            :formatter="formatterMoney"-->
        <!--          />-->
        <!--          <view class="m-l-10">元</view>-->
        <!--        </EraFormItem>-->

        <!--        <view class="h24 line-bg" />-->

        <!--        <view-->
        <!--          v-if="isEdit && userInfo.platformCode != 'agent'"-->
        <!--          class="add-del"-->
        <!--          @click="delWarehouseFn"-->
        <!--          >删除</view-->
        <!--        >-->
      </EraForm>

      <VoSafetyArea>
        <template #group>
          <block v-if="userInfo.platformCode === 'agent'">
            <view class="add-group">
              <block v-if="formData.areaName && formData.areaCode && formData.name && formData.address && formData.contact
                    && formData.phone">
                <EraButton :font-size="32" size="lg" @click="addWarehouseFn"
                >{{ isEdit ? '保存仓库' : '创建仓库' }}
                </EraButton>
              </block>
              <block v-else>
                <EraButton :disabled="true" :font-size="32" size="lg" @click="addWarehouseFn"
                >{{ isEdit ? '保存仓库' : '创建仓库' }}
                </EraButton>
              </block>
            </view>
          </block>
          <block v-else>
            <view class="add-group">
              <block v-if="formData.areaName && formData.areaCode && formData.name && formData.address && formData.contact
                    && formData.phone && formData.refundPhone1">
                <EraButton :font-size="32" size="lg" @click="addWarehouseFn"
                >{{ isEdit ? '保存仓库' : '创建仓库' }}
                </EraButton>
              </block>
              <block v-else>
                <EraButton :disabled="true" :font-size="32" size="lg" @click="addWarehouseFn"
                >{{ isEdit ? '保存仓库' : '创建仓库' }}
                </EraButton>
              </block>
            </view>
          </block>
        </template>
      </VoSafetyArea>
    </view>
    <VoQuick :show.sync="showDirect" />
    <VoAddress :show.sync="showAddressBoo" @sureFn="sureAddressFn" />
  </view>
</template>

<script>
  import { formatterHandle } from '@/common/helper'

  export default {
    name: 'AddWarehouse',
    data() {
      return {
        warehouseId: '', // 编辑仓库id
        isEdit: false, // 是否是编辑
        showAddressBoo: false,
        isLoading: false,
        formatterMoney: (value) => formatterHandle(value, 'money', 5),
        formData: {
          areaName: '', // 省市区名字
          areaCode: '', // 省市区code
          name: '', // 仓库名称
          address: '', // 仓库地址
          isCoding: false, // 是否支持定制,1:支持,0：不支持,默认不支持0
          codingPrice: '', // 扫码每台收取价格
          contact: '', // 仓库联系人
          phone: '', // 仓库电话
          refundPhone1: '', // 退货电话1
          refundPhone2: '', // 退货电话2
          alternativePhone: '', // 仓库负责人电话2
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
          contact: [
            {
              required: true,
              message: '请输入仓库联系人',
              trigger: ['blur', 'change'],
            },
            {
              asyncValidator: (rule, value, callback) => {
                let reg =
                  /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/
                if (reg.test(value)) {
                  callback(new Error('仓库联系人不合法，不允许特殊字符和空格'))
                } else {
                  callback()
                }
              },
            },
          ],
          // 字段名称
          phone: [
            {
              required: true,
              message: '请输入负责人电话',
              trigger: ['change', 'blur'],
            },
            {
              // 自定义验证函数，见上说明
              // validator: (rule, value, callback) => {
              //   // 上面有说，返回true表示校验通过，返回false表示不通过
              //   // uni.$u.test.mobile()就是返回true或者false的
              //   return uni.$u.test.mobile(value)
              // },
              message: '手机号码不正确',
              // 触发器可以同时用blur和change
              trigger: ['change', 'blur'],
            },
          ],
          // 退货电话1
          refundPhone1: [
            {
              required: true,
              message: '请输入退货负责人电话',
              trigger: ['change', 'blur'],
            },
            {
              // 自定义验证函数，见上说明
              // validator: (rule, value, callback) => {
              //   // 上面有说，返回true表示校验通过，返回false表示不通过
              //   // uni.$u.test.mobile()就是返回true或者false的
              //   return uni.$u.test.mobile(value)
              // },
              message: '手机号码不正确',
              // 触发器可以同时用blur和change
              trigger: ['change', 'blur'],
            },
          ],
          // 退货电话2
          refundPhone2: [
            {
              required: true,
              message: '请输入售后联系人手机号',
              trigger: ['change', 'blur'],
            },
            {
              // 自定义验证函数，见上说明
              // validator: (rule, value, callback) => {
              //   // 上面有说，返回true表示校验通过，返回false表示不通过
              //   // uni.$u.test.mobile()就是返回true或者false的
              //   return uni.$u.test.mobile(value)
              // },
              message: '手机号码不正确',
              // 触发器可以同时用blur和change
              trigger: ['change', 'blur'],
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
      clearEdit1() {
        this.formData.name = ''
      },
      clearEdit2() {
        this.formData.address = ''
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
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/SetArrivalTimeliness?warehouseId=' +
            this.warehouseId,
        )
      },
      /**
       *  设置发货时效
       */
      setDeliveryTimeFn() {
        this.$linkToEasy(
          '/pagesSupplier/Warehouse/WarehouseList/SetDeliveryTimeliness?warehouseId=' +
            this.warehouseId,
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
       * 新建仓库
       */
      addWarehouseFn() {
        let reg =
          /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/
        if (reg.test(this.formData.name)) {
          uni.$u.toast('姓名不合法，不允许特殊字符和空格')
          return
        }
        this.$refs.form.validate().then((res) => {
          // if (
          //   this.formData.isCoding &&
          //   (Number(this.formData.codingPrice) <= 0 || !this.formData.codingPrice)
          // ) {
          //   uni.$u.toast('请输入定制费用')
          //   return
          // }

          if (this.isLoading) return
          this.isLoading = true
          let param = {
            type: 1,
            name: this.formData.name,
            areaCode: this.formData.areaCode,
            address: this.formData.address,
            isCoding: this.formData.isCoding,
            contact: this.formData.contact,
            phone: this.formData.phone,
          }
          
          if (this.userInfo.platformCode === 'supplier') {
            param.refundPhone1 = this.formData.refundPhone1
            param.refundPhone2 = this.formData.refundPhone2
            param.alternativePhone = this.formData.alternativePhone || ''
          }
          if (this.formData.isCoding) {
            param.codingPrice = Number(this.formData.codingPrice)
          }

          if (this.isEdit) {
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
                this.isLoading = false
              })
          } else {
            this.$VoHttp
              .apiWarehouse$Post(param)
              .then((res) => {
                uni.$u.toast('新增成功')
                setTimeout(() => {
                  this.$backFn()
                  this.$storage.set('warehouse-add', 1)
                }, 1500)
                this.isLoading = false
              })
              .catch((e) => {
                this.isLoading = false
              })
          }
        })
      },
      /**
       * 删除仓库
       */
      delWarehouseFn() {
        let that = this
        uni.showModal({
          title: '提示',
          content: '确定要删除该仓库吗？',
          confirmColor: '#22284B',
          success: function (res) {
            if (res.confirm) {
              if (that.isLoading) return
              that.isLoading = true
              that.$VoHttp
                .apiWarehouse$Delete({ id: that.warehouseId })
                .then((res) => {
                  uni.$u.toast('删除成功')
                  setTimeout(() => {
                    that.$backFn()
                  }, 1500)
                })
                .catch((e) => {
                  uni.$u.toast(e.message || '删除失败')
                })
                .finally(() => {
                  that.isLoading = false
                })
            }
          },
        })
      },
      /**
       * 初始化信息
       */
      initFn() {
        this.$VoHttp.apiWarehouse$Id({ id: this.warehouseId }).then((res) => {
          this.formData = res.data
        })
      },
    },
    onLoad(options) {
      if (options.isEdit) {
        // 如果是编辑
        this.isEdit = true
        this.warehouseId = options.warehouseId
        this.initFn()
      } else {
        // 如果是新增
        uni['deliveryTimeList'] = []
      }
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

  .item-input {
    padding: 0 !important;
  }
</style>
