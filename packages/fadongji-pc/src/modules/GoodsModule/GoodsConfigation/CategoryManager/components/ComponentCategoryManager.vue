<template>
  <div class="component-warp">
    <AButton  class="table-operations__button" :disabled="disabledDelete" @click.stop="deleteAll()"
    >批量删除</AButton
    >
    <AButton class="table-operations__button" v-if='false' @click="onExpand()">全部展开</AButton>
    <AButton class="table-operations__button" @click="closeAll">全部收起</AButton>
    <AButton type="primary" @click="opFormDialog(false)">{{addTypeStr}}</AButton>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, watch} from 'vue'
  export default defineComponent( {
    name: 'CategoryManager',
    props: {
      data: {
        type: Array,
        default: [],
      },
      addType: {
        type: String,
        default: '添加新分类',
      },
      disabled: {
        type: Boolean,
        default: true
      }
    },
    setup (props, { emit }) {
      let addTypeStr = props.addType
      let disabledDelete = ref<Boolean>(props.disabled)
      const onExpand = () => {
        emit('expand')
      }
      const closeAll = () => {
        emit('close')
      }
      const opFormDialog = () => {
        emit('propsCreate', false)
      }
      const deleteAll = () => {
        emit('batch')
      }
      watch(() => props.disabled,
          (newValue) => {
            disabledDelete.value = newValue
      }
      )
      return {
        onExpand,
        closeAll,
        opFormDialog,
        deleteAll,
        addTypeStr,
        disabledDelete,
      }
    }
  })
</script>
<style scoped lang="less">
  .table-operations__button {
  margin-right: 8px;
}
</style>