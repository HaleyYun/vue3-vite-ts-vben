<template>
  <div class="sku-box">
    <table class="sku-table">
      <tr>
        <th v-for="item of ableSpecNames" :key="item">{{ item }}</th>
        <th style="width: 200px" v-if="ableSpecNames.length > 0"> 商品名称</th>
        <th style="width: 240px">
          <span class="mr-10px"><span class="text-danger">*</span>价格上限(元)</span>
          <a-input-number v-model:value="priceCeiling" :precision="2" :min="0" :max="1000000" />
          <ApplicationDropdow
            :menuList="priceList"
            @change="
              (data) => {
                priceChange(data.item.value, 'priceCeiling')
              }
            "
          />
        </th>
        <th style="width: 240px">
          <span class="mr-10px"><span class="text-danger">*</span>价格下限(元)</span>
          <a-input-number :max="1000000" :precision="2" v-model:value="PriceFloor" />
          <ApplicationDropdow
            :menuList="priceList"
            @change="
              (data) => {
                priceChange(data.item.value, 'PriceFloor')
              }
            "
          />
        </th>
        <!-- <th style="width: 233px">OE码</th> -->
        <!-- <th><span class="text-danger">*</span>适配车型</th> -->
        <th>参数设置</th>
        <th>商品分润</th>
        <th style="width: 100px">操作</th>
      </tr>
      <tr v-for="(sku, idx) in skuList" :key="idx">
        <td v-for="(item, index) of sku.specs" :key="item + index">
          <div style="white-space: pre-wrap">{{ item }}</div>
        </td>
        <td style="width: 200px" v-if="sku.specs.length > 0">
          <div v-if="editableData[idx]" class="editable-cell-input-wrapper">
            <a-input
              style="width: 70%"
              v-model:value="editableData[idx].name"
              @pressEnter="saveName(idx)"
            />
            <check-outlined class="ml-5px editable-cell-icon-check" @click="saveName(idx)" />
            <close-outlined @click="closeName(idx)" />
          </div>
          <div v-else class="editable-cell-text-wrapper flex items-center">
            <div class="w-135px">{{ sku.name || ' ' }}</div>
            <div class="w-60px ml-3px">
              <edit-outlined
                style="color: #1890ff"
                class="editable-cell-icon"
                @click="editName(idx)"
              />
              <span class="ml-2px" style="color: #1890ff">编辑</span>
            </div>
          </div>
        </td>
        <td>
          <div>
            <a-input-number
              :precision="2"
              :min="sku.priceFloor ? sku.priceFloor : 0"
              :max="1000000"
              style="width: 70%"
              v-model:value="sku.priceCap"
              allow-clear
            />
            <ApplicationDropdow
              :type="2"
              :menuList="specList"
              @change="
                (data) => {
                  attributeChange(data.item, sku, data.index, 'priceCap')
                }
              "
            >
              <template #title>应用</template>
            </ApplicationDropdow>
          </div>
        </td>
        <td>
          <div>
            <a-input-number
              :precision="2"
              :min="0"
              :max="sku.priceCap ? sku.priceCap : 1000000"
              style="width: 70%"
              v-model:value="sku.priceFloor"
              allow-clear
            />
            <ApplicationDropdow
              :type="2"
              :menuList="specList"
              @change="
                (data) => {
                  attributeChange(data.item, sku, data.index, 'priceFloor')
                }
              "
            >
              <template #title>应用</template>
            </ApplicationDropdow>
          </div>
        </td>
        <!-- <td style="width: 233px; white-space: pre-wrap">
          <div>
            <EntryTag v-model:oeCodes="sku.oeCodes" />
          </div>
        </td> -->
        <!-- <td>
          <div>
            <a-button type="link" @click="setApplicationCarsHandler(idx)">
              {{ sku.vehicleModelBOS && sku.vehicleModelBOS.length > 0 ? '点击修改' : '点击选择' }}
            </a-button>
          </div>
        </td> -->
        <td>
          <a-button type="link" @click="goodsParamsApiEventApi(idx)">
            {{ sku.pramProperties && sku.pramProperties.length > 0 ? '修改sku属性' : 'sku属性' }}
          </a-button>
        </td>
        <td>
          <div class="flex" style="align-items: center">
            <a-button type="link" @click="goodsTemplateProfit(idx)">
              {{ sku.profitShare && sku.profitShare.length > 0 ? '修改sku分润' : 'sku分润' }}
            </a-button>
          </div>
        </td>
        <td style="width: 100px">
          <AButton type="link" :disabled="disabled" @click="removeHandler(idx)">删除商品</AButton>
        </td>
      </tr>
    </table>
    <VoBenefit
      @finish="profitFinish"
      title="设置分润信息"
      :goodsName="profitGoodsName"
      :profit-Share="profitShare"
      :props-data="profitPostData"
      v-model:visible="profitVisible"
    />
    <ParamColumnForm
      @finish="pramaFinishData"
      :title="profitGoodsName"
      :pram-properties="pramProperties"
      :props-data="paramPostData"
      v-model:visible="paramVisibile"
    />
    <ApplicationCars
      v-if="applicationCarVisible"
      v-model:visible="applicationCarVisible"
      @confirm="applicationCarConfirmHandler"
    />
  </div>
</template>

<script lang="ts" setup>
  import ParamColumnForm from '/@/modules/GoodsModule/GoodsManage/component/paramColumnForm.vue'
  import ApplicationCars from '../ApplicationCars/ApplicationCars.vue'
  import VoBenefit from '../VoBenefit/VoBenefit.vue'
  import ApplicationDropdow from './ApplicationDropdow.vue'
  import { CheckOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons-vue'
  import EntryTag from './entryTag.vue'
  import { descartes } from '/@/utils/lib/goods'
  import { useGoodsFormStore } from '/@/store/modules/goodsFormStore'
  import { defineExpose, toRaw } from 'vue'
  import { _ } from '@vocen/shared'

  const goodsFormStore: any = useGoodsFormStore()
  import { computed, ref, watch, reactive, defineEmits } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'

  // 控制适配车型组件显示
  const applicationCarVisible = ref(false)

  let paramPostData = ref([])
  const tableOperateIndex = ref(0)
  const skuList = ref<any>([])
  const allSpecOptions = ref([])
  const ableSpecNames = ref([])
  const specList = computed(() => goodsFormStore.getGoodsSpecList)
  const emit = defineEmits(['removeGoods'])
  const props = defineProps({
    id: [String, Array],
    templateData: {
      type: Array,
      default() {
        return []
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  })

  const removeHandler = (idx) => {
    // 商品删除属性联动
    let specList = goodsFormStore.getGoodsSpecList
    let specs = skuList.value[idx]['specs']
    specList.forEach((item, index) => {
      let specsIndex = item.checks.findIndex((item) => {
        if (item && item.model) {
          return item.model == specs[index]
        } else {
          return item == specs[index]
        }
      })
      let hasSpecs = skuList.value.filter((item) => {
        return item.specs.includes(specs[index])
      })
      if (specsIndex != -1 && hasSpecs.length < 2) {
        item.checks.splice(specsIndex, 1)
      }
    })
    // console.log(specList,skuList.value[idx]['specs'])
    skuList.value.splice(idx, 1)
    //  goodsFormStore.setGoodsSpecsList(list)
  }

  const paramVisibile = ref(false)
  const profitVisible = ref(false)
  const profitGoodsName = ref('')
  const profitPostData = ref([])
  const pramProperties = ref([])
  const profitShare = ref([])
  const profitFinish = (res) => {
    skuList.value[tableOperateIndex.value]['profitShare'] = res
  }
  const goodsTemplateProfit = async (idx) => {
    tableOperateIndex.value = idx
    const categoryIds = props.id
    if (!categoryIds) {
      return new Error('类别id为空')
    }
    const map = { id: categoryIds }
    const { data } = await adminHttp.goodsTemplateGetProfit(map)
    profitPostData.value = data.map((item) => {
      return {
        ...item,
        isRequired: true,
      }
    })
    profitShare.value = skuList.value[idx]['profitShare']
    profitGoodsName.value = skuList.value[idx]['name']
    // console.log(skuList.value[idx]['profitShare'])
    profitVisible.value = true
  }
  const pramaFinishData = (res) => {
    skuList.value[tableOperateIndex.value]['pramProperties'] = res
  }

  const goodsParamsApiEventApi = async (inx) => {
    // goodsTemplateParamProperty
    tableOperateIndex.value = inx
    console.log('pramProperties', skuList.value[inx]['pramProperties'])
    const categoryIds = props.id
    if (!categoryIds) {
      return new Error('类别id为空')
    }
    const map = { categoryId: categoryIds }
    const { data } = await adminHttp.goodsTemplateParamProperty(map)
    data.map((item) => {
      item.realValue = null
      if (item.entryMethod === 1) {
        item.values = item.values.map((innerItem) => {
          return { label: innerItem, value: innerItem }
        })
      }

      return item
    })
    pramProperties.value = skuList.value[inx]['pramProperties']
    profitGoodsName.value = skuList.value[inx]['name']
    paramPostData.value = data
    paramVisibile.value = true
  }

  // // 批量设置适配车型
  // const setApplicationCarsHandler = (idx) => {
  //   tableOperateIndex.value = idx
  //   console.log(skuList.value[idx]['vehicleModelBOS'])
  //   applicationCarVisible.value = true
  // }

  // 适配车型确认
  // const applicationCarConfirmHandler = (res) => {
  //   skuList.value[tableOperateIndex.value]['vehicleModelBOS'] = res
  //   console.log(skuList.value[tableOperateIndex.value]['vehicleModelBOS'])
  // }

  // ---批量设置价格上线 价格下限
  const priceCeiling = ref(null) // 价格上限
  const PriceFloor = ref(null) // 价格下限
  const priceList = ref([
    { label: '应用到全部sku', value: 1 },
    { label: '应用到未填写sku', value: 2 },
  ])
  // 价格上线应用
  const priceChange = (type, key) => {
    if (type == 1) {
      if (key == 'priceCeiling') {
        skuList.value.forEach((item) => {
          item.priceCap = priceCeiling.value
        })
      } else {
        skuList.value.forEach((item) => {
          item.priceFloor = PriceFloor.value
        })
      }
    } else if (type == 2) {
      if (key == 'priceCeiling') {
        skuList.value.forEach((item) => {
          if (!item.priceCap) {
            item.priceCap = priceCeiling.value
          }
        })
      } else {
        skuList.value.forEach((item) => {
          if (!item.priceFloor) {
            item.priceFloor = PriceFloor.value
          }
        })
      }
    }
  }
  // 属性价格应用
  const attributeChange = (item, sku, index, key) => {
    console.log(item.checks, sku.specs[index], index)
    if (item.checks.includes(sku.specs[index])) {
      console.log(sku[key])
      skuList.value.forEach((item) => {
        console.log(item.specs[index])
        if (sku.specs[index] == item.specs[index]) {
          item[key] = sku[key]
        }
      })
    }
  }

  // 修改商品名称
  const editableData = reactive({})

  const editName = (key) => {
    editableData[key] = _.cloneDeep(skuList.value[key])
  }
  const saveName = (key) => {
    skuList.value[key]['name'] = editableData[key]['name']
    delete editableData[key]
  }
  const closeName = (key) => {
    delete editableData[key]
  }

  watch(
    specList,
    (list) => {
      let allSpecOptionsArr: any = []
      let ableSpecNamesArr: any = []
      for (let row of list) {
        if (row.checks.length > 0) {
          allSpecOptionsArr.push([...row.checks])
          ableSpecNamesArr.push(row.name)
        }
      }

      allSpecOptions.value = allSpecOptionsArr
      ableSpecNames.value = ableSpecNamesArr
      const skuTmplList = descartes(allSpecOptionsArr)
      const skus: any = []
      for (var i in skuTmplList) {
        const sku = _.cloneDeep(skuTmplList[i])
        let modalIndex = sku.findIndex((item) => item.model)
        let modelId
        if (modalIndex != -1) {
          sku[modalIndex] = sku[modalIndex].model
          modelId = skuTmplList[i][modalIndex].id
        }
        const spec_text = sku
          .map((text, index) => {
            const name = ableSpecNamesArr[index]
            const id = goodsFormStore.getGoodsSpecList.find((item: any) => item.name === name)?.id
            return `${id != 0 ? id : modelId}::${text}`
          })
          .sort()
          .join('##') //按照字母排序顺序
        const skuStr = sku.join('-')
        const templateItem = props.templateData.find((item: any) => {
          if (item.name === skuStr) {
            return true
          }
          let templateSkus = item.templateSkus.map((item) => {
            return item.value
          })
          if (templateSkus.sort().toString() == _.cloneDeep(sku).sort().toString()) {
            return true
          }
        })
        const skuListItem =
          skuList.value &&
          skuList.value.find((item) => {
            if (item.specs.length == sku.length) {
              return item.specs.sort().toString() === _.cloneDeep(sku).sort().toString()
            } else {
              return false
            }
          })
        const listRow: any = templateItem || skuListItem
        console.log(listRow && listRow.pramProperties)
        var row = {
          spec_text,
          specs: sku,
          modelId: modelId,
          id: listRow && listRow.id ? listRow.id : new Date().getTime(),
          name: listRow && listRow.name ? listRow.name : skuStr,
          priceFloor: listRow ? listRow.priceFloor : 0,
          priceCap: listRow ? listRow.priceCap : 0,
          // oeCodes: listRow ? listRow.oeCodes : [],
          carModels: listRow ? listRow.carModels : [],
          pramProperties: listRow ? listRow.paramProperties || listRow.pramProperties : [],
          profitShare: listRow ? listRow.profitShare : [],
          // vehicleModelBOS: listRow ? listRow.vehicleModelBOS : [],
          status: 1,
        }
        skus.push(row)
      }
      skuList.value = skus
      console.log(skuList)
    },
    {
      deep: true,
    },
  )

  const saveSkuDataFunc = () => {
    let goodsTemplateList: any = []
    console.log(skuList.value)
    skuList.value.filter((item) => {
      const keyOneArr = item.spec_text.split('##')
      let templateSkusList = [] as any[]

      keyOneArr.forEach((item) => {
        const tmpArr = item.split('::')
        const tmpObj = {
          key: tmpArr[0],
          value: tmpArr[1],
        }
        templateSkusList.push(tmpObj)
      })
      let getName = item.specs.join('-')

      goodsTemplateList.push({
        templateSkus: templateSkusList,
        name: item.name,
        modelId: item.modelId,
        priceFloor: item.priceFloor,
        priceCap: item.priceCap,
        // oeCodes: item.oeCodes,
        pramProperties: toRaw(item.pramProperties),
        profitShare: toRaw(item.profitShare),
        // vehicleModelBOS: item.vehicleModelBOS,
      })
    })
    return goodsTemplateList
  }
  defineExpose({ saveSkuDataFunc })
</script>

<style lang="scss" scoped>
  .spec-show-title {
    white-space: nowrap;
  }

  .sku-box {
    width: 100%;
    max-width: 100%;
    overflow: auto;
  }

  .sku-table {
    width: 100%;
    max-width: 100%;
    table-layout: fixed;
    border-left: 1px solid #e7e7e7;
    border-top: 1px solid #e7e7e7;

    thead tr th {
      position: sticky;
      top: 0;
    }

    td:last-child,
    th:last-child {
      position: sticky;
      left: 0; /* 首行永远固定在左侧 */
      z-index: 1;
      width: 120px;
    }

    th:first-child {
      z-index: 2;
    }

    tr {
      td,
      th {
        width: 120px;
        white-space: pre-wrap;
        word-break: break-all;
        padding: 10px;
        border-right: 1px solid #e7e7e7;
        border-bottom: 1px solid #e7e7e7;
        text-align: center;
      }
    }
  }

  .input_class {
    width: 100px;
  }

  .text-danger {
    color: #ff4d4f;
    margin-right: 3px;
  }
</style>
