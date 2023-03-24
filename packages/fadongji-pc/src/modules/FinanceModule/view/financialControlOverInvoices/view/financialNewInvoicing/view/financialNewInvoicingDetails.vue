<template>
  <div class="page-wrap">
    <div class="page-right p-3" id="container">
      <!-- 抬头提醒 -->
      <section>
        <GoodsAlert :message="message" :description="description" :error="error"></GoodsAlert>
      </section>
      <section>
        <div id="seller-list">
          <div class="border-assets margin-t-10">
            <div class="bg-section padding-l-10"
              ><BarChartOutlined class="margin-r-5" />基本开票信息</div
            >
            <div class="basic-content">
              <ATable
                :columns="baseInvoicingInformationColumn"
                :dataSource="serviceProviderDetailsBasicInfoMockData"
                size="small"
                :pagination="false"
                bordered
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div id="goods-list">
          <div class="border-assets margin-t-10">
            <div class="bg-section padding-l-10"
              ><BarChartOutlined class="margin-r-5" />收票人信息</div
            >
            <div class="price-content">
              <div class="margin-t-10">
                <ATable
                  :dataSource="InvoicingReceiveInformationMockData"
                  :columns="InvoicingReceiverInformationColumn"
                  size="small"
                  :pagination="false"
                  bordered
                ></ATable>
              </div>
            </div>
          </div>
        </div>
      </section>
    <!--  供应商列表 -->
      <section>
        <div>
          <div class="border-assets margin-t-10">
            <div class="bg-section padding-l-10"
            ><BarChartOutlined class="margin-r-5" />供应商信息</div
            >
            <div class="basic-content">
              <ATable
                :columns="supplierInformationColumn"
                :dataSource="supplierInformationData"
                size="small"
                :pagination="false"
                bordered
              />
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="handle-btn">
      <Button type="primary" class="margin-r-10">上架</Button>
      <Button type="primary" class="margin-r-10">下架</Button>
    </div>
  </div>
</template>

<script lang="ts">
  import VoGoodsHeaderImage from '/@/components/VoGoodsHeaderImage/VoGoodsHeaderImage.vue'
  import { detailList } from '/@/modules/GoodsModule/GoodsManage/component'
  import { parameterList } from '/@/modules/GoodsModule/GoodsManage/component'
  import { detailSource } from '/@/modules/GoodsModule/GoodsManage/mock'
  // 根据不同状态 顶部提醒样式  不同
  import GoodsAlert from '/@/modules/GoodsModule/GoodsManage/component/GoodsAlert.vue'
  import { useRoute } from 'vue-router'
  //  服务商商品列表详情-基础信息--table （column《=》serviceProviderDetailsBasicInfoColumn ； data<=> serviceProviderDetailsBasicInfoMockData  ）
  import {
    serviceProviderDetailsBasicInfoColumn,
    serviceProviderDetailsBasicInfoMockData,
    serviceProviderDetailsSaleColumn,
    serviceProviderDetailsSaleMockData,
    serviceProviderProfitSharing,
    serviceProviderProfitSharingMockData,
    serviceProviderWarehouseOperationManagementColumn,
    serviceProviderWarehouseOperationManagementMockData,
    serviceProviderWarehouseInformationColumn,
    serviceProviderWarehouseInformationMockData,
    serviceProviderParamColumn,
    serviceProviderParamMockData,
    serviceProviderApplicableModelsColumn,
    serviceProviderApplicableModelsMockData,
    personData,
    personSchema,
  } from '/@/modules/GoodsModule/GoodsManage/view/GoodsServiceProvider/data/serviceProviderDetailsAssets'

  import { ginsengSource } from '/@/modules/GoodsModule/GoodsManage/mock'
  import { modelsSource } from '/@/modules/GoodsModule/GoodsManage/mock' //过滤
  import { modelsList } from '/@/modules/GoodsModule/GoodsManage/component'
  import SupplyTotal from '/@/modules/SupplierPages/component/SupplyTotal.vue'
  import { useAppStore } from '/@/store/modules/app'
  import { defineComponent, ref, reactive, toRefs } from 'vue'
  import { Form, Table, Button } from 'ant-design-vue'
  import { BarChartOutlined } from '@ant-design/icons-vue'
  import { Description } from '/@/components/Description/index'

  import {
    baseInvoicingInformationColumn,
    InvoicingReceiverInformationColumn,
    supplierInformationColumn,
  } from '/@/modules/FinanceModule/view/financialControlOverInvoices/view/financialNewInvoicing/data/financialNewInvoicingData'
  import {
    InvoicingReceiveInformationMockData,
    supplierInformationData
  } from '/@/modules/FinanceModule/view/financialControlOverInvoices/view/financialNewInvoicing/mock/financialNewInvoicingMock'

  interface Option {
    value: string
    label: string
    children?: Option[]
  }
  const options: Option[] = [
    {
      value: '发动机系列',
      label: '发动机系列',
      children: [
        {
          value: '发动机',
          label: '发动机',
        },
      ],
    },
  ]
  export default defineComponent({
    name: 'FinancialNewInvoicingDetails',
    components: {
      VoGoodsHeaderImage,
      Form,
      FormItem: Form.Item,
      Table,
      SupplyTotal,
      Button,
      BarChartOutlined,
      Description,
      GoodsAlert,
    },
    setup() {
      // 动态 显示顶部提醒样式
      const router = useRoute()
      const message = ref<String>(router.params.message)
      const description = ref<String>(router.params.description)
      const error = ref<String>(router.params.error)
      //--滑动--
      const appStore = useAppStore()
      const current = ref(0)
      const visible = ref(false)
      const target = ref('#basic-list')
      const style = reactive({})
      const menuSetting = appStore.getMenuSetting

      const dingHandler = (targetEl) => {
        target.value = targetEl
        visible.value = true
      }
      //--以上滑动--
      const stateDetail = reactive({ detailSource })
      const stateGinseng = reactive({ ginsengSource })
      const stateModels = reactive({ modelsSource })
      // const stateFenRun = reactive({ FenRunList })
      const onChange = (current: number) => {
        console.log(current)
      }

      const state = reactive({
        value1: [],
      })
      interface formValue {
        goodsClassfy: string[]
        initClassfy: string
      }
      const formState = reactive<formValue>({
        goodsClassfy: [],
        initClassfy: '机油>润滑油',
      })
      const choiceInitClassfy = () => {
        console.log('选中问题====', formState.goodsClassfy)
        formState.goodsClassfy = ['machine-oil', 'runhua-oil']
      }
      return {
        baseInvoicingInformationColumn,
        InvoicingReceiverInformationColumn,
        supplierInformationColumn,
        InvoicingReceiveInformationMockData,
        supplierInformationData,

        serviceProviderDetailsBasicInfoColumn,
        serviceProviderDetailsBasicInfoMockData,
        serviceProviderDetailsSaleColumn,
        serviceProviderDetailsSaleMockData,
        serviceProviderProfitSharing,
        serviceProviderProfitSharingMockData,
        serviceProviderWarehouseOperationManagementColumn,
        serviceProviderWarehouseOperationManagementMockData,
        serviceProviderWarehouseInformationColumn,
        serviceProviderWarehouseInformationMockData,
        serviceProviderParamColumn,
        serviceProviderParamMockData,
        serviceProviderApplicableModelsColumn,
        serviceProviderApplicableModelsMockData,
        personData,
        personSchema,
        //以下滑动
        current,
        visible,
        menuSetting,
        style,
        target,
        message,
        description,
        error,
        dingHandler,
        //以上滑动
        ...toRefs(stateDetail),
        ...toRefs(stateGinseng),
        ...toRefs(stateModels),
        // ...toRefs(stateFenRun),
        detailList,
        parameterList,
        modelsList,
        // FenRunTitle,
        onChange,
        choiceInitClassfy,
        formState,
        activeKey: ref('1'),
        ...toRefs(state),
        options,
        category: ref<string[]>(['发动机系列']),
      }
    },
  })
</script>
<style>
  html,
  body {
    overflow-x: visible !important;
  }
</style>
<style lang="less" scoped>
  /* For demo */
  .page-wrap {
    background-color: #fff;
    min-height: calc(100vh - 50px);
    padding: 15px;

    .wrap-tabs {
      position: fixed;
    }
    .page-right {
      position: relative;
      overflow-y: scroll;
      .basic {
        & {
          margin-top: 15px;
          border: 1px solid #c1c1c1;
          // background: #ff6400;
          &--title {
            padding: 10px;
            font-size: 24px;
            font-weight: bold;
            background: #c1c1c1;
            border-bottom: 1px solid #c1c1c1;
          }
          &-content {
            padding: 10px;
            background: #fff;
          }
        }
      }
      .price {
        & {
          margin-top: 15px;
          border: 1px solid #c1c1c1;
          &--title {
            padding: 10px;
            font-size: 24px;
            font-weight: bold;
            background: #c1c1c1;
            border-bottom: 1px solid #c1c1c1;
          }
          &-content {
            padding: 0 10px;
            // height: 200px;
            background: #fff;
            &--title {
              padding: 10px;
              font-size: 16px;
              color: #c1c1c1;
              &--wild {
                color: red;
              }
            }
            &--parameter {
              padding: 10px;
              font-size: 16px;
              color: #c1c1c1;
              &--wild {
                color: red;
              }
            }
            &-ginseng {
              width: 500px;
            }
            &-filter {
              padding: 10px;
              font-size: 16px;
              color: #c1c1c1;
              &--wild {
                color: red;
              }
            }
            &-FenRun {
              padding: 10px;
              font-size: 16px;
              color: #c1c1c1;
              &--wild {
                color: red;
              }
            }
            &-list {
              margin-bottom: 30px;
            }
          }
        }
      }
      .clothing {
        & {
          margin-top: 15px;
          border: 1px solid #c1c1c1;
          &-title {
            padding: 10px;
            font-size: 24px;
            font-weight: bold;
            background: #c1c1c1;
            border-bottom: 1px solid #c1c1c1;
          }
          &-content {
            padding: 10px;
            background: #fff;
            &-support {
              // color: #c1c1c1;
              padding: 10px;
              font-size: 16px;
            }
            &-install {
              padding: 10px;
              font-size: 16px;
            }
            &-installation {
              // padding: 10px 0;
            }
          }
        }
      }
      .figure {
        margin-top: 15px;
        border: 1px solid #c1c1c1;
        &--title {
          padding: 10px;
          font-size: 24px;
          font-weight: bold;
          background: #c1c1c1;
          border-bottom: 1px solid #c1c1c1;
        }
        &-content {
          background: #fff;
          padding: 10px;
          &-header {
            margin-bottom: 20px;
          }
        }
      }
      .operation {
        &-button {
          display: flex;
          justify-content: center;
          align-items: center;
          &-item {
            margin: 70px;
            width: 120px;
          }
        }
      }
    }
    .page-mobile {
      position: relative;

      padding-left: 200px;
      height: calc(100vh - 10px);
      overflow-y: scroll;
      .price-mobile {
        // width: 749px;
      }
    }
  }
  .handle-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100vw;
    bottom: 10px;
    left: 0;
    height: 40px;
  }
</style>
