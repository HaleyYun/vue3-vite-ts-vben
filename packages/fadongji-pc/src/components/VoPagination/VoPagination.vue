<template>
  <a-pagination
    v-model:current="currentPage"
    :total="total"
    :size="size"
    :page-size="pageSize"
    show-size-changer
    show-less-items
    :hideOnSinglePage="hideOnSinglePage"
    showQuickJumper
    @change="changeHandler"
    @showSizeChange="showSizeChange"
  />
</template>

<script lang="ts">
  // 定义全局通用分页组件
  import { defineComponent, ref, watch } from 'vue'

  export default defineComponent({
    name: 'VoPagination',
    props: {
      size: {
        type: String,
        default: 'default',
      },
      hideOnSinglePage: {
        type: Boolean,
        default: false,
      },
      // 总条目
      total: {
        required: true,
        type: Number,
        default: 0,
      },
      // 当前页码
      current: {
        type: Number,
        default: 1,
      },
      // 每页展示条目数量
      pageSize: {
        type: Number,
        default: 20,
      },
    },
    emits: ['pagination'],
    setup(props, { emit }) {
      const currentPage = ref(props.current)
      const pageTotal = ref(props.total)
      const pageItemSize = ref(props.pageSize)
      const showTotal = (total) => {
        return `共${Math.ceil(+(total / props.pageSize)).toFixed(0)}页/${total}条数据`
      }

      const changeHandler = (current, pageSize) => {
        emit('pagination', { current: +current || 1, pageSize })
      }

      const showSizeChange = (current, pageSize) => {
        emit('pagination', { current: +current || 1, pageSize })
      }

      watch(
        props,
        (res) => {
          currentPage.value = res.current
          pageTotal.value = res.total
          pageItemSize.value = res.pageSize
        },
        {
          deep: true,
          immediate: true,
        },
      )
      return {
        pageItemSize,
        pageTotal,
        currentPage,
        showTotal,
        changeHandler,
        showSizeChange,
      }
    },
  })
</script>

<style scoped></style>
