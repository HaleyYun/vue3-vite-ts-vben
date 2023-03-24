<template>
    <AModal
      v-if="show"
      v-model:visible="show"
      title="修改项目分润"
      width="950px"
      @cancel="handleClose"
      destroy-on-close
      @ok="confirmSave"
    >
      <div v-if="profitColumn.length" class="dialog-inner pt-20px px-20px">
        <div class="template--title">项目分润</div>
        <a-table :data-source="[{}]" :columns="profitColumn" :pagination="false">
          <template #bodyCell="{ column }">
            <div v-if="profitColumn.length" class="flex justify-between items-center">
              <a-input-number
                type="number"
                style="width: 100%"
                :precision="2"
                :min="0"
                :max="999999999"
                v-model:value="inputForm[column.key]"
              />
              <div class="ml-10px">元</div>
            </div>
          </template>
        </a-table>
        <div class="template--title">仓库运营费用</div>
        <a-table :data-source="[{}]" :columns="storeColumn" :pagination="false">
          <template #bodyCell="{ column }">
            <div v-if="storeColumn.length" class="flex justify-between items-center">
              <a-input-number
                type="number"
                style="width: 100%"
                :precision="2"
                :min="0"
                :max="999999999"
                v-model:value="inputForm[column.key]"
              />
              <div class="ml-10px">元</div>
            </div>
          </template>
        </a-table>
      </div>
    </AModal>
  </template>
  
  <script lang="ts" setup>
    // 2022/12/2
    // bannerChooseDialog
    import { defineEmits, reactive, ref, watch, toRaw } from 'vue'
    import adminHttp from '/@/utils/http/adminHttp'
    import { message } from 'ant-design-vue'
  
    const props = defineProps({
      visible: {
        type: Boolean,
        default: false,
      },
      id: {
        type: String,
        default: '',
      },
      shareProfitInfo: {
        type: Array,
        default() {
          return []
        },
      },
      cashPrice: {
        type: [String, Number],
        default: 0,
      },
    })
  
    const profitColumn = ref<any>([])
    const storeColumn = ref<any>([])
  
    const shareProfit = ref<any>([])
  
    const emits = defineEmits(['update:visible', 'success'])
  
    const show = ref(props.visible)
  
    const inputForm = reactive<any>({})
  
    // 删除之前
    const handleClose = () => {
      show.value = false
      emits('update:visible', false)
    }
  
    // 转化table-column
    const transferColumn = (list) => {
      profitColumn.value.length = 0
      storeColumn.value.length = 0
      const p: any = []
      const s: any = []
      list.forEach(({ key, name, type, value }) => {
        // inputForm[key] = profitMap.get(key) != undefined ? profitMap.get(key) : null
        // fenrunItem[key] = profitMap.get(key) != undefined ? profitMap.get(key) : null
        // testKeys.push(key)
  
        inputForm[key] = value || 0
  
        const c: any = {
          title: name,
          dataIndex: key,
          key: key,
          align: 'center',
        }
        if (type === 1) {
          p.push(c)
        } else {
          s.push(c)
        }
      })
      profitColumn.value = p
      storeColumn.value = s
    }
  
    const confirmSave = async () => {
      const postForm: any = {
        id: props.id,
        profitSharing: [],
      }
      console.log(toRaw(inputForm))
      const profit = shareProfit.value
      let total = 0
      postForm.profitSharing = profit.map((item: any) => {
        total = total + inputForm[item.key] * 1
        return {
          ...item,
          value: inputForm[item.key],
        }
      })
      const flag = postForm.profitSharing.every((item) => item.value = 0)
      if (!flag) {
        return message.warn('项目分润不可为空或0')
      }
      if (total > +props.cashPrice) {
        return message.warn('项目分润不能大于商品总价')
      }
      const { code } = await adminHttp.GOODS.goodsInvestmentProfit(postForm)
      if (+code === 20001) {
        handleClose()
        message.success('设置成功')
        emits('success')
      }
    }
  
    const goodsTemplateGetProfit = async () => {
      try {
        const { code, data } = await adminHttp.GOODS.goodsTemplateGetProfit()
        if (code === '20001') {
          transferColumn(data)
          shareProfit.value = data
        }
      } catch (e) {}
    }
  
    watch(
      () => props.visible,
      (val) => {
        show.value = val
        if (val) {
          if (props.shareProfitInfo && props.shareProfitInfo.length) {
            transferColumn(props.shareProfitInfo)
            shareProfit.value = props.shareProfitInfo
          } else {
            goodsTemplateGetProfit()
          }
        }
      },
    )
  </script>
  
  <style scoped lang="less"></style>
  