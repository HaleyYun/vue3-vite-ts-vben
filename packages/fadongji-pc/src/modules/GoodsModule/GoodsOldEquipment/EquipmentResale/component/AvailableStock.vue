<template>
  <div>
    <a @click="visible = true">{{ num || 0 }}</a>
  </div>
  <a-modal title="库存详情" v-model:visible="visible" ok-text="">
    <div class="px-30px">
      <div class="text-center py-30px font-bold text-18px text-gray-800">{{ name }}</div>
      <div class="text-gray-700 text-14px font-bold">总库存：{{ num || 0 }}</div>
      <div class="pt-20px">
        <a-table :columns="columns" :data-source="levelVos" :pagination="false">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'level'"> {{ record.level }} 类</template>
            <template v-if="column.dataIndex === 'availableNumber'">
              <a>{{ record.availableNumber || 0 }} </a>
            </template>
          </template>
        </a-table>
      </div>
    </div>
    <template #footer>
      <div class="align-right">
        <a-button type="primary" @click="visible = false">确定</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
  //

  import { ref, defineProps } from 'vue'

  defineProps({
    name: {
      type: String,
      default: '',
    },
    num: {
      type: [String, Number],
      default: 0,
    },
    levelVos: {
      type: Array,
      default() {
        return []
      },
    },
  })

  const visible = ref(false)
  const columns = [
    {
      title: '仓库名称',
      dataIndex: 'warehouseName',
      ellipsis: true,
    },
    {
      title: '商品成色',
      dataIndex: 'level',
      ellipsis: true,
    },
    {
      title: '可用库存',
      dataIndex: 'availableNumber',
      ellipsis: true,
    },
  ]
</script>

<style scoped lang="less"></style>
