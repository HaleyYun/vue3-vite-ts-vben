<template>
  <div class="page-wrap">
    <div class="page-containner">
      <div class="bg-blue-100 h-8 w-full mb-2 flex">
        <span class="leading-7 text-lg ml-2">区域</span>
        <AButton class="flex-grow-0" @click="viewBack()">关闭</AButton>
        <AButton class="flex-grow-1" @click="viewRefresh()">刷新</AButton>
      </div>
      <div class="page-container">
        <a-tree
          v-model:expandedKeys="expandedKeys"
          v-model:selectedKeys="selectedKeys"
          v-model:checkedKeys="checkedKeys"
          checkable
          :tree-data="treeData"
        >
          <template #title="{ name, key }">
            <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ name }}</span>
            <template v-else>{{ name }}</template>
          </template>
        </a-tree>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { TreeProps } from 'ant-design-vue'
  import { ref, watch } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { router } from '/@/router'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const treeData = ref<TreeProps['treeData']>([])
  const expandedKeys = ref<string[]>(['0-0-0', '0-0-1'])
  const selectedKeys = ref<string[]>(['0-0-0', '0-0-1'])
  const checkedKeys = ref<string[]>(['0-0-0', '0-0-1'])
  watch(expandedKeys, () => {
    console.log('expandedKeys', expandedKeys)
  })
  watch(selectedKeys, () => {
    console.log('selectedKeys', selectedKeys)
  })
  watch(checkedKeys, () => {
    console.log('checkedKeys', checkedKeys)
  })
  const loadTableData = () => {
    adminHttp
      .sixHotAreaTree()
      .then((res) => {
        console.log('省市区信息=>', res)
        treeData.value = res.data
        createMessage.success({ content: `获取列表成功` })
      })
      .catch((err) => {
        createMessage.error({ content: `获取列表失败:${err.message}` })
      })
  }
  //关闭
  const viewBack = () => {
    router.go(-1)
  }
  //刷新
  const viewRefresh = () => {
    loadTableData()
  }
  loadTableData()
</script>
<style lang="less" scoped>
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .page-wrap {
    margin: 24px;
  }

  .filter-form {
    background: #fff;
    margin-bottom: 15px;
    padding: 10px 10px 0;
  }

  .page-container {
    background-color: white;
  }
</style>
