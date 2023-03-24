<template>
  <div class="page-wrap">
    <div class="page-step">
      <div class="product-title text-xl">
        <div class="product-content">
          <div class="page-table">
            <div class="template--title mb-20px">结算周期</div>
            <AForm
              ref="formRef"
              :model="formState"
              name="basic"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 6 }"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <AFormItem label=" 现金订单结算周期" name="cashPeriod">
                <div class="flex items-center">
                  <AInputNumber :min="1" v-model:value="formState.cashPeriod" addon-after="天" />
                </div>
              </AFormItem>
              <AFormItem label=" 账期订单结算周期" name="accountPeriod">
                <div class="flex items-center">
                  <AInputNumber :min="1" v-model:value="formState.accountPeriod" addon-after="天" />
                </div>
              </AFormItem>

              <AFormItem :label-col="{ span: 0 }" :wrapper-col="{ span: 0 }">
                <div class="flex items-center p-5">
                  <a-list size="large">
                    <a-list-item>
                      <div class="text-red-600">
                        ①结算周期默认实时结算,既订单确认收货、账期订单到期(还款日)等订单数据,会在当日实时结算至卖家可提现余额账户中;(周期设置为空或0(不能为负数)，均为实时结算。)
                      </div>
                    </a-list-item>
                    <a-list-item>
                      <div class="text-red-600">
                        ②结算周期滞后结算,根据设置的周期N,订单确认收货、账期订单到期(还款日)等订单数据会在T+N天结算至卖家可提现余额账户中;(例:结算周期设置为3,确认收货日期为7月9日,结算日期为7月12日即到卖家可提现余额。)
                      </div>
                    </a-list-item>
                    <a-list-item>
                      <div class="text-red-600">③结算周期,不做上限配置;</div>
                    </a-list-item>
                    <template #header>
                      <div class="text-red-600">注意事项:</div>
                    </template>
                  </a-list>
                </div>
              </AFormItem>
              <AFormItem :label-col="{ span: 0 }" :wrapper-col="{ span: 0 }">
                <div>
                  <div class="template--title mb-20px">退款周期</div>
                </div>
              </AFormItem>
              <AFormItem label=" 发货后退款周期" name="afterDeliveryPeriod">
                <div class="flex items-center">
                  <AInputNumber
                    :min="1"
                    v-model:value="formState.afterDeliveryPeriod"
                    addon-after="天"
                  />
                </div>
              </AFormItem>
              <AFormItem label="发货前退款周期" name="beforeDeliveryPeriod">
                <div class="flex items-center">
                  <AInputNumber
                    :min="1"
                    v-model:value="formState.beforeDeliveryPeriod"
                    addon-after="天"
                  />
                </div>
              </AFormItem>
              <AFormItem :label-col="{ span: 0 }" :wrapper-col="{ span: 0 }">
                <div class="flex items-center p-5">
                  <a-list size="large">
                    <a-list-item>
                      <div class="text-red-600">
                        ①发货前退款,按照整单取消的规则进行退款,默认实时结算,既取消订单钱款返回原有支付渠道和账户;若设置发货退款周期,则会在T+N天退款至买家原支付账号中。
                      </div>
                    </a-list-item>
                    <a-list-item>
                      <div class="text-red-600">
                        ②发货后退款,无论是发货后部分退款或是确认收货后整单退款,卖家点击确认收货后默认实时结算,既取消订单钱款返回原有支付渠道和账户;若设置发货周期,则会在T+N天退款至买家原支付账号中。
                      </div>
                    </a-list-item>
                    <template #header>
                      <div class="text-red-600">注意事项:</div>
                    </template>
                  </a-list>
                </div>
              </AFormItem>

              <AForm-item :wrapper-col="{ offset: 10, span: 16 }">
                <AButton
                  v-auth="'/v1/finance/bill/config'"
                  class="mt-6"
                  type="primary"
                  html-type="submit"
                  >保存</AButton
                >
              </AForm-item>
            </AForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, reactive, ref } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { message } from 'ant-design-vue'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const loading = ref(false)
  const configInfo = ref()
  const formState = reactive<FormState>({
    cashPeriod: '',
    accountPeriod: '',
    beforeDeliveryPeriod: '',
    afterDeliveryPeriod: '',
  })

  interface FormState {
    cashPeriod: string
    accountPeriod: any
    beforeDeliveryPeriod: any
    afterDeliveryPeriod: any
  }

  const onFinish = async (values: any) => {
    const postForm = {
      ...configInfo.value,
      ...values,
    }
    const { code } = await adminHttp.FINANCE.financeBillConfig(postForm)
    if (+code === 20001) {
      message.success('设置成功')
      await initOrderConfig()
    }
  }

  // 初始化配置信息
  const initOrderConfig = async () => {
    loading.value = true
    const { data } = await adminHttp.FINANCE.financeBillConfigDefault()
    loading.value = false
    configInfo.value = data
    formState.cashPeriod = data.cashPeriod
    formState.accountPeriod = data.accountPeriod
    formState.afterDeliveryPeriod = data.afterDeliveryPeriod
    formState.beforeDeliveryPeriod = data.beforeDeliveryPeriod
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  //初始化
  onMountedOrActivated(() => {
    // loadTableData()
    initOrderConfig()
  })
</script>

<style lang="less" scoped>
  ::v-deep(.ant-steps-item-description) {
    width: 127px !important;
  }

  ::v-deep(.ant-tabs-bar) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 24px;

    .page-step {
      background: #fff;
      margin-bottom: 10px;
    }

    .page-table {
      padding: 24px;
      background: #fff;

      .payment-Status {
        // display: flex;
        background-color: #fff;
      }
    }
  }
</style>
