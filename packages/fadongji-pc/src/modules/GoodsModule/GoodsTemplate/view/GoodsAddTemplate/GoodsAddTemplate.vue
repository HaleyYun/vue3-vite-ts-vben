<template>
  <div class="box-all">
    <div class="box-space">
      <div class="box">
        <div class="box-select">
          <span style="padding: 5px">商品类别：</span>
          <ACascader
            v-model:value="selectCategoryValue"
            :options="options"
            :load-data="loadData"
            :field-names="{ label: 'name', value: 'id' }"
            :display-render="displayRender"
            placeholder="请选择商品类别"
            change-on-select
            @change="temporaryCategoryVariableEvent"
          />
          <template v-if="formState.data.recently">
            <span class="box-recent__name">最近使用的类别：</span>
            <span class="box-recent__value">{{ formState.data.recently }}</span>
            <span class="box-choice__initvalue" @click="choiceInitClassfy">选择</span>
          </template>
        </div>
        <div class="box-btn">
          <Button type="primary" @click="goodSEditInfo"> 下一步,填写商品信息</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { useMessage } from '/@/hooks/web/useMessage'
  import { transmitEnum } from '/@/modules/GoodsModule/GoodsTemplate/data/data'
  import { defineComponent, reactive, ref, onMounted } from 'vue'
  import { Button } from 'ant-design-vue'
  import type { CascaderProps } from 'ant-design-vue'
  import { useRouter } from 'vue-router'
  import adminHttp from '/@/utils/http/adminHttp'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const options = ref<CascaderProps[any]>([])
  const seconedOptions = ref<CascaderProps['options']>([])
  const seconedCategoryId = ref('')

  export default defineComponent({
    name: 'GoodsAddTemplate',
    components: {
      Button,
    },
    setup() {
      // 传递给“子级”的内容
      const transChildCategory = ref<any>()
      const transChildCategoryID = ref<any>()
      const go = useRouter()
      // 设置的【类别】临时变量  方便 “选择”触发时 显示先前选中的options
      const temporaryCategoryVariable = ref('')
      const isEditGoodsPage = ref(false)
      const selectCategoryValue = ref<any>()
      const formState = reactive({
        data: {
          id: '',
          recently: '',
        },
      })

      const loadData: CascaderProps['loadData'] = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1]
        console.log(targetOption, 'ss')
        if (!targetOption.id) {
          seconedCategoryId.value = targetOption.id
        }
        targetOption.loading = true
        const seconedMap = { id: targetOption.id }
        let seconedCategoryData = []
        adminHttp
          .goodsCategorySecondCategory(seconedMap)
          .then((res) => {
            console.log(res, 'xx')
            seconedCategoryData = res.data
            targetOption.loading = false
            targetOption.children = seconedCategoryData
            options.value = [...options.value]
          })
          .catch((err) => {
            console.log(`获取二级页面失败:${err.message}`)
          })
      }
      const choiceInitClassfy = () => {
        console.log(temporaryCategoryVariable.value)
        selectCategoryValue.value = temporaryCategoryVariable.value
      }
      /**
       *@desc 渲染，只显示最后的一级展示
       *@param name [String] 空值
       *@return list
       */
      const displayRender = ({ labels, selectedOptions }) => {
        transChildCategory.value = labels
        transChildCategoryID.value = selectedOptions[labels.length - 1]
        return labels[labels.length - 1]
      }
      const goodSEditInfo = () => {
        const { createMessage } = useMessage()
        if (
          selectCategoryValue.value === '' ||
          selectCategoryValue.value === null ||
          selectCategoryValue.value === undefined
        ) {
          createMessage.error({ content: `商品类别不能为空`, key: '' })
          return false
        }
        if (transChildCategory.value.length < 2) {
          createMessage.error(`请选择二级商品类别，一级不存在商品类别`)
          return false
        }
        const categoryLabel = transChildCategory.value.join('>')
        go.push({
          path: '/goodsManage/goods/goodsForm',
          query: {
            categoryId: transChildCategoryID.value.id,
            categoryName: categoryLabel,
            type: transmitEnum.Add,
            t: new Date().getTime(),
            from: 0,
          },
        })
      }
      const initRecentyCategory = () => {
        adminHttp.goodsTemplateCategoryRecently().then((res) => {
          formState.data.recently = res.data.name
          if (res.data.categoryId) {
            console.log(res.data.categoryId)
            selectCategoryValue.value = res.data.categoryId.split('-')
          }
        })
      }
      /**
       *@desc 获取列表
       *@param name [String] 空值
       *@return list
       */
      const initGoodsAddCategory = async (map) => {
        adminHttp
          .goodsCategoryCategorySelect(map)
          .then((res) => {
            options.value = res.data.filter((item) => item.children && item.children.length)
          })
          .catch((err) => {
            console.log(err.message, '选择记录')
          })
      }

      // 处理数据的初始化函数
      const initData = () => {
        const map = { name: '' }
        initGoodsAddCategory(map)
        initRecentyCategory()
      }
      // 切换类别列表，赋值temporaryCategoryVariable ，用来触发“选择”时回显原来选中的值
      const temporaryCategoryVariableEvent = (optionItem) => {
        console.log(optionItem, 'xx')
        if (optionItem !== undefined && optionItem !== '' && optionItem !== null) {
          temporaryCategoryVariable.value = optionItem
        }
      }
      onMountedOrActivated(() => {
        initData()
      })
      return {
        transChildCategory,
        transChildCategoryID,
        choiceInitClassfy,
        temporaryCategoryVariableEvent,
        adminHttp,
        goodSEditInfo,
        isEditGoodsPage,
        options,
        formState,
        seconedCategoryId,
        seconedOptions,
        selectCategoryValue,
        temporaryCategoryVariable,
        displayRender,
        loadData,
        initData,
      }
    },
  })
</script>
<style scoped lang="less">
  .box-all {
    position: absolute;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    margin-left: 24px;
    background-color: #fff;

    .box-space {
      flex-grow: 1;

      .box {
        padding-top: 140px;

        .box-select {
          display: flex;
          width: 800px;
          align-content: center;
          justify-content: center;
          margin-left: calc(50% - 400px);

          .box-recent__name {
            display: flex;
            align-items: center;
            margin-left: 10px;
            color: #999999;
          }

          .box-recent__value {
            display: flex;
            align-items: center;
            color: #f04844;
          }

          .box-choice__initvalue {
            display: flex;
            align-items: center;
            margin-left: 10px;
            color: #0285bd;
          }
        }

        .box-btn {
          margin-top: 200px;
          margin-left: calc(50% - 81px);
        }
      }
    }
  }

  ::v-deep(form-item .ant-cascader-picker) {
    width: 240px !important;
  }

  ::v-deep(.ant-btn) {
    height: 40px;
    list-style: none;
    border-radius: 5px;
    font-size: 14px;
  }
</style>
