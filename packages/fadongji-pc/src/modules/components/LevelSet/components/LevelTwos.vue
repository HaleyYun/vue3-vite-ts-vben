<template>
  <div class=" my-0 mx-auto">
    <ATable
      :columns="tableColumns"
      :data-source="tableData"
      :pagination="false"
      size="small"
      bordered
    >
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="column.dataIndex === 'aliasName'">
          <a-input v-model:value="record.alias" placeholder="例如：青铜" maxLength="30" />
        </template>
        <template v-if="column.dataIndex === 'grow_value'">
          <div>
            <a-input-number
              style="width: 240px; margin-right: 10px"
              v-model:value="record.growthMin"
              placeholder="请输入"
              :min="growMin(index, 'growthMin')"
              @blur="inputChange(index, 'growthMin', record)"
              :max="max"
            />
            <a-input-number
              style="width: 240px"
              v-model:value="record.growthMax"
              placeholder="请输入"
              :min="growMin(index, 'growthMax')"
              @blur="inputChange(index, 'growthMax', record)"
              :max="max"
            />
          </div>
        </template>
      </template>
    </ATable>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, watch, unref, onMounted, defineExpose } from 'vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()

  const props = defineProps({
    tableData: {
      type: Array,
      default: [],
    },
  })
  const max = ref(100000)
  const min = ref(0)

  // 验证数据，返回数据
  const formValidation = () => {
    let noValue = props.tableData.find((item) => !item.growthMin || !item.growthMax)
    let noAliasName = props.tableData.find((item) => !item.alias.trim())
    console.log(
      props.tableData,
      props.tableData.find((item) => !item.alias.trim()),
    )
    if (noAliasName) {
      createMessage.error('等级别名不能为空')
      return false
    }
    // if (noValue) {
    //   createMessage.error('成长值不能为空；')
    //   return false
    // }
    let errorValue = props.tableData.find((item, index) => {
      return warnValue(index) == false
    })
    if (errorValue) {
      return false
    }
    return true
  }

  // 获取data 数据
  const tableColumns = ref([
    {
      title: '等级名称',
      dataIndex: 'name',
      width: '33%',
    },
    {
      dataIndex: 'aliasName',
      title: '等级别名',
      width: '33%',
    },
    {
      dataIndex: 'grow_value',
      title: '成长值',
      width: '33%',
    },
  ])

  const growMin = (index, key) => {
    if (index > 0 && key == 'growthMin' && props.tableData) {
      let preMax =
        props.tableData[index - 1]['growthMax'] || props.tableData[index - 1]['growthMin']
      if (preMax) {
        return preMax + 1
      } else {
        return min.value
      }
    } else if (key == 'growthMax' && props.tableData) {
      let minValue = props.tableData[index]['growthMin']
      if (minValue) {
        return minValue + 1
      } else {
        return min.value
      }
    } else {
      return min.value
    }
  }

  const inputChange = (index, key, record) => {
    console.log(warnValue(index), index, key)
  }
  const warnValue = (index) => {
    console.log(index)
    let growthMin = props.tableData[index]['growthMin']
    let growthMax = props.tableData[index]['growthMax']
    if (index > 0 && growthMin) {
      let preMax =
        props.tableData[index - 1]['growthMax'] || props.tableData[index - 1]['growthMin']
      if (growthMin <= preMax) {
        console.log(preMax, growthMin)
        createMessage.error(`lvx（${index + 1}） 初始值不能小于lx（${index}）的上限值`)
        return false
      }
    }
    if (growthMax) {
      let minValue = props.tableData[index]['growthMin']
      console.log(minValue, growthMax)
      if (growthMax <= minValue) {
        createMessage.error(`lV${index + 1} 的起始值不能大于上限值！`)
        return false
      }
    }
  }

  onMountedOrActivated(() => {})

  defineExpose({ formValidation })
</script>

<style scoped lang="less"></style>
