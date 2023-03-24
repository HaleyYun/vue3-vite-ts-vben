<template>
  <div>
    <div class="my-24px mx-24px mb-82px bg-white">
    <div class="page-step">
      <div class="product-title text-xl">
        <div class="product-content">
          <div class="px-24px py-32px">
            <AForm
              ref="formRef"
              :label-col="{ span: 8 }"
              :model="formState"
              :wrapper-col="{ span: 14 }"
              autocomplete="off"
              name="basic"
            >
              <div class="template--title mb-20px">订单设置</div>
              <AFormItem
                :rules="[{ required: true }]"
                label="正常订单在线支付超过"
                name="normalExpire"
              >
                <div class="flex items-center">
                  <AInputNumber
                    :precision="0"
                    :min="0"
                    :max="99999999"
                    v-model:value="formState.normalExpire"
                    addon-after="分"
                    class="input-width"
                  />
                  <div class="w-250px pl-1">未付款，订单自动关闭</div>
                </div>
              </AFormItem>

              <!-- <AFormItem
                :rules="[{ required: true, message: '' }]"
                label="大额订单线下支付超过"
                name="deliveryExpire"
              >
                <div class="flex items-center">
                  <AInputNumber
                    :precision="0"
                    :min="0"
                    :max="99999999"
                    v-model:value="formState.seckillExpire"
                    addon-after="分"
                    class="input-width"
                  />
                  <div class="w-250px pl-1">未认款成功，订单自动关闭</div>
                </div>
              </AFormItem> -->

              <AFormItem
                :rules="[{ required: true, message: '' }]"
                label=" 距离发货超时"
                name="autoReceipt"
              >
                <div class="flex items-center">
                  <AInputNumber
                    :precision="0"
                    :min="0"
                    :max="99999999"
                    v-model:value="formState.deliveryExpire"
                    addon-after="小时"
                    class="input-width"
                  />
                  <div class="w-250px pl-1"> 前，平台通知卖家</div>
                </div>
              </AFormItem>
              <AFormItem
                :rules="[{ required: true, message: '' }]"
                label="发货超过"
                name="warnRepeat"
              >
                <div class="flex items-center">
                  <AInputNumber
                    :precision="0"
                    :min="0"
                    :max="99999999"
                    v-model:value="formState.autoReceipt"
                    addon-after="天"
                    class="input-width"
                  />
                  <div class="w-250px pl-1"> 未收货，订单自动完成</div>
                </div>
              </AFormItem>
              <AFormItem
                :rules="[{ required: true, message: '' }]"
                label=" 同一用户两次提醒发货间隔不少于"
                name="seckillExpire"
              >
                <div class="flex items-center">
                  <AInputNumber
                    :precision="0"
                    :min="0"
                    :max="99999999"
                    v-model:value="formState.warnRepeat"
                    addon-after="小时"
                    class="input-width"
                  />
                </div>
              </AFormItem>
              <div class="template--title mb-20px">退换货订单设置</div>
              <AFormItem
                :rules="[{ required: true, message: '' }]"
                label=" 退款申请超过工作时间"
                name="autoAudit"
              >
                <div class="flex items-center">
                  <AInputNumber
                    :precision="0"
                    :min="0"
                    :max="99999999"
                    v-model:value="formState.autoAudit"
                    addon-after="小时"
                    class="input-width"
                  />
                  <div class="w-250px pl-1"> 未审核，平台自动退款</div>
                </div>
              </AFormItem>
              <AFormItem
                :rules="[{ required: true, message: '' }]"
                label=" 买家退货超过"
                name="returnExpireNotice"
              >
                <div class="flex items-center">
                  <AInputNumber
                    :precision="0"
                    :min="0"
                    :max="99999999"
                    v-model:value="formState.returnExpireNotice"
                    addon-after="天"
                    class="input-width"
                  />
                  <div class="w-250px pl-1"> 未寄出，平台通知买家</div>
                </div>
              </AFormItem>
              <div class="template--title mb-20px">售后服务单设置</div>
              <AFormItem
                :rules="[{ required: true, message: '' }]"
                label="每个商品可自助申请售后"
                name="afterSaleLimit"
              >
                <div class="flex items-center">
                  <AInputNumber
                    :precision="0"
                    :min="0"
                    :max="99999999"
                    v-model:value="formState.afterSaleLimit"
                    addon-after="次"
                    class="input-width"
                  />
                </div>
              </AFormItem>
              <AFormItem
                :rules="[{ required: true, message: '' }]"
                label="旧件旧机发货超过"
                name="oldAutoReceipt"
              >
                <div class="flex items-center">
                  <AInputNumber
                    :precision="0"
                    :min="0"
                    :max="99999999"
                    v-model:value="formState.oldAutoReceipt"
                    addon-after="天"
                    class="input-width"
                  />
                  <div class="w-250px pl-1"> 未签收，服务单自动完成</div>
                </div>
              </AFormItem>
              <div class="template--title mb-20px">增值服务订单设置</div>
              <div class="mb-24px">
                <a-alert show-icon type="info">
                  <template #message
                    ><span class="text-14px text-black">安装服务违约金扣除标准设置</span></template
                  >
                  <template #description
                    ><span class="text-14px text-gray-600"
                      >说明：集师傅接单后修理厂取消订单，
                      根据订单取消时间和上门时间的间隔扣除不同比例的金额作为违约金补偿给集师傅</span
                    >
                  </template>
                </a-alert>
              </div>
              <a-row align="top" justify="center" type="flex">
                <a-col :offset="2" :span="14">
                  <a-space :size="50">
                    <AFormItem
                      :name="['installPenaltyFirst', '0']"
                      :rules="[{ required: true, message: '' }]"
                      label="时间间隔小于"
                    >
                      <a-input-number
                        :precision="0"
                        :min="0"
                        :max="99999999"
                        v-model:value="formState.installPenaltyFirst[0]"
                        addon-after="小时"
                        style="width: 200px"
                      />
                    </AFormItem>
                    <AFormItem
                      :name="['installPenaltyFirst', '1']"
                      :rules="[{ required: true, message: '' }]"
                      label="扣除比例"
                    >
                      <a-input-number
                        :precision="0"
                        v-model:value="formState.installPenaltyFirst[1]"
                        :max="100"
                        :min="0.1"
                        :parser="(value) => value.replace('%', '')"
                        style="width: 150px"
                        addon-after="%"
                        @input="(value) => `${value}%`"
                      />
                    </AFormItem>
                  </a-space>
                </a-col>
              </a-row>
              <a-row align="top" justify="center" type="flex">
                <a-col :offset="2" :span="14">
                  <a-space :offset="3" :size="50">
                    <AFormItem
                      :name="['installPenaltySecond', '0']"
                      :rules="[{ required: true, message: '' }]"
                      label="时间间隔小于"
                    >
                      <a-input-number
                        :precision="0"
                        :min="0"
                        :max="99999999"
                        v-model:value="formState.installPenaltySecond[0]"
                        addon-after="小时"
                        style="width: 200px"
                      />
                    </AFormItem>
                    <AFormItem
                      :name="['installPenaltySecond', '1']"
                      :rules="[{ required: true, message: '' }]"
                      label="扣除比例"
                    >
                      <a-input-number
                        v-model:value="formState.installPenaltySecond[1]"
                        :max="100"
                        :min="0.1"
                        :precision="0"
                        :parser="(value) => value.replace('%', '')"
                        style="width: 150px"
                        addon-after="%"
                        @input="(value) => `${value}%`"
                      />
                    </AFormItem>
                  </a-space>
                </a-col>
              </a-row>
              <a-row align="top" justify="center" type="flex">
                <a-col :offset="2" :span="14">
                  <a-space :offset="3" :size="50">
                    <AFormItem
                      :name="['installPenaltyThird', '0']"
                      :rules="[{ required: true, message: '' }]"
                      label="时间间隔小于"
                    >
                      <a-input-number
                        :precision="0"
                        :min="0"
                        :max="99999999"
                        v-model:value="formState.installPenaltyThird[0]"
                        addon-after="小时"
                        style="width: 200px"
                      />
                    </AFormItem>
                    <AFormItem
                      :name="['installPenaltyThird', '1']"
                      :rules="[{ required: true, message: '' }]"
                      label="扣除比例"
                    >
                      <a-input-number
                        v-model:value="formState.installPenaltyThird[1]"
                        :precision="0"
                        :max="100"
                        :min="0.1"
                        :parser="(value) => value.replace('%', '')"
                        style="width: 150px"
                        addon-after="%"
                        @input="(value) => `${value}%`"
                      />
                    </AFormItem>
                  </a-space>
                </a-col>
              </a-row>
              <a-row align="top" justify="center" type="flex">
                <a-col :offset="2" :span="14">
                  <a-space :offset="3" :size="50">
                    <AFormItem
                      :name="['installPenaltyFourth', '0']"
                      :rules="[{ required: true, message: '' }]"
                      label="时间间隔小于"
                    >
                      <a-input-number
                        v-model:value="formState.installPenaltyFourth[0]"
                        :precision="0"
                        :min="0"
                        :max="99999999"
                        addon-after="小时"
                        style="width: 200px"
                      />
                    </AFormItem>
                    <AFormItem
                      :name="['installPenaltyFourth', '1']"
                      :rules="[{ required: true, message: '' }]"
                      label="扣除比例"
                    >
                      <a-input-number
                        v-model:value="formState.installPenaltyFourth[1]"
                        :precision="0"
                        :max="100"
                        :min="0.1"
                        :parser="(value) => value.replace('%', '')"
                        style="width: 150px"
                        addon-after="%"
                        @input="(value) => `${value}%`"
                      />
                    </AFormItem>
                  </a-space>
                </a-col>
              </a-row>
              <AFormItem
                :rules="[{ required: true, message: '' }]"
                label="时间间隔大于等于"
                name="noInstallPenalty"
              >
                <div class="flex items-center">
                  <a-input-number
                    :precision="0"
                    :min="0"
                    :max="99999999"
                    v-model:value="formState.noInstallPenalty"
                    addon-after="小时"
                    style="width: 200px"
                  />
                  <div class="mx-8px mr-8px pl-1">不扣除违约金</div>
                </div>
              </AFormItem>
              <a-divider dashed style="border-width: 2px" />
              <AFormItem :rules="[{ required: true }]" label="服务订单超过" name="overtimeAssign">
                <div class="flex items-center">
                  <a-input-number
                    :min="0"
                    :max="99999999"
                    :precision="0"
                    v-model:value="formState.overtimeAssign"
                    addon-after="小时"
                    style="width: 400px"
                  />
                  <div class="mx-8px mr-8px pl-1">无集师傅接单时，该订单自动转为人工指派</div>
                </div>
              </AFormItem>
            </AForm>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed bg-white left-250px right-30px bottom-0 flex items-center justify-center p-15px"
  >
    <AButton v-auth="'/v1/order/setting/update/batch'" type="primary" @click="onFinish"
      >保存
    </AButton>
  </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, reactive, ref, toRaw } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { _ } from '/@/../../shared/src/index'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'
  const formState = reactive({
    normalExpire: '',
    deliveryExpire: '',
    autoReceipt: '',
    warnRepeat: '',
    seckillExpire: '',
    returnExpireNotice: '',
    autoAudit: '',
    afterSaleLimit: '', // 自助申请售后上限次数
    oldAutoReceipt: '', // 旧机订单自动收货时间,
    installPenaltyFirst: ['', ''], // 安装违约费配置规则第一条
    installPenaltySecond: ['', ''], // 安装违约费配置规则第二条
    installPenaltyThird: ['', ''], // 安装违约费配置规则第三条
    installPenaltyFourth: ['', ''], // 安装违约费配置规则第四条
    noInstallPenalty: '', // 安装违约费配置(不扣除违约费)
    overtimeAssign: '',
  })
  const formRef = ref()

  // normalExpire : 秒杀订单超时时间
  // seckillExpire : 秒杀订单超时时间
  // deliveryExpire : 发货超时时间
  // autoReceipt : 订单自动收货时间
  // warnRepeat : 重复提醒间隔
  // autoAudit ：退款自动审核时间
  // returnExpireNotice  ：退货超期未寄回
  const refuntConfigList = ref([])
  const orderConfigList = ref([])

  const totalFormArray = ref([])

  const onFinish = async (values: any) => {
    try {
      const res = await formRef.value.validate()
      if (!res) {
        return
      }
      const form = _.cloneDeep({ ...formState })
      form.installPenaltyFirst[1] = form.installPenaltyFirst[1] / 100
      form.installPenaltySecond[1] = form.installPenaltySecond[1] / 100
      form.installPenaltyThird[1] = form.installPenaltyThird[1] / 100
      form.installPenaltyFourth[1] = form.installPenaltyFourth[1] / 100
      form.installPenaltyFirst = form.installPenaltyFirst.join('|')
      form.installPenaltySecond = form.installPenaltySecond.join('|')
      form.installPenaltyThird = form.installPenaltyThird.join('|')
      form.installPenaltyFourth = form.installPenaltyFourth.join('|')
      console.log(form)
      const resultArr = totalFormArray.value.map((item: any) =>
        toRaw({
          ...item,
          value: form[item.code],
        }),
      )

      console.log(resultArr, 'xx')
      //v1/order/setting/update/batch
      try {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        // const arrowUpMap = [{ id: item.id, type: 3 }]
        const res = await adminHttp.ORDER.orderSettingUpdateBatch({ orderSettingBOs: resultArr })
        createMessage.success({ content: `保存成功`, key: loadingCtxkey })
      } catch (e: any) {
        console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
        createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  // normalExpire : 秒杀订单超时时间
  // seckillExpire : 秒杀订单超时时间
  // deliveryExpire : 发货超时时间
  // autoReceipt : 订单自动收货时间
  // warnRepeat : 重复提醒间隔
  // autoAudit ：退款自动审核时间
  // returnExpireNotice  ：退货超期未寄回
  const loadTableData = async () => {
    try {
      const res = await adminHttp.Order.orderSettingList()
      console.log(res, 'res')
      orderConfigList.value = res.data.orderConfigList
      refuntConfigList.value = res.data.refuntConfigList
      let supportConfigList = res.data.supportConfigList.map((item) => {
        if (item.value.indexOf('|') > 0) {
          item.value = item.value.split('|')
          item.value[1] = item.value[1] * 100
        }
        return item
      })
      totalFormArray.value = [
        ...orderConfigList.value,
        ...refuntConfigList.value,
        ...supportConfigList,
        ...res.data.aftersaleConfigList,
      ].map((item) => toRaw(item))

      totalFormArray.value.forEach((item: any) => {
        formState[item.code] = item.value
      })
      console.log(formState, totalFormArray.value)
    } catch (e: any) {
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
    }
  }
  onMountedOrActivated(() => {
    loadTableData()
  })
</script>

<style lang="less" scoped>
  ::v-deep(.ant-steps-item-description) {
    width: 127px !important;
  }

  ::v-deep(.ant-tabs-bar) {
    margin: 0 !important;
  }

  .page-step {
    background: #fff;
    margin-bottom: 10px;
  }

  .page-table {
    padding: 30px 0;
    background: #fff;

    .payment-Status {
      // display: flex;
      background-color: #fff;
    }
  }

  .input-width {
    width: 300px;
  }
</style>
