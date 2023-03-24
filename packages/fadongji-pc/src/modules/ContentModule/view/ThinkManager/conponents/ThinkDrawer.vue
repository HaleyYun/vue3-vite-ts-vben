<template>
  <Drawer
      v-model:visible="visibleRef"
      class="custom-class"
      size="large"
      :title="title"
      :closable="closeBtnRef"
      placement="right"
      @after-visible-change="afterVisibleChange">
      <template #extra>
        <a-button  style="margin-right: 8px" @click="closeDrawer()">取消</a-button>
        <slot name="confirmBtn"></slot>
      </template>
    <slot></slot>
  </Drawer>
</template>
<script lang="ts">
import { Drawer } from 'ant-design-vue'
import {defineComponent, ref, watch} from 'vue';
export default defineComponent({
  name: 'ThinkDrawer',
  components: {
    Drawer
  },
  props: {
    showHandleArea: {
      type: Boolean,
      default: true,
    },
    closeBtn: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: {}
    },
    title: {
      type: String,
      default: ''
    },
  },
  emits: ['checkDetails'],
  setup(props, { emit }) {
    // 是否显示“抽屉” 操作区域
    const showHandleAreaRef = ref<boolean>()
    // 是否显示“抽屉” 左上角 隐藏按钮
    const closeBtnRef = ref<boolean>()
    // 是否显示“抽屉”弹框
    const visibleRef = ref<boolean>(false);
    const afterVisibleChange = (bool: boolean) => {
      console.log('visible', bool);
    };
    const closeDrawer = () => {
      emit('checkDetails', 'close')
    }
    watch(
        () => props.visible,
        (newVal, oldVal) => {
          if (newVal !== oldVal) visibleRef.value = newVal
        },
        { deep: true },
    )
    // 监听 是否 显示左上角“隐藏”按钮
    watch(
        () => props.closeBtn,
        (newVal, oldVal) => {
          if (newVal !== oldVal) closeBtnRef.value = newVal
        },
    { deep: true },
    )
    // 监听 是否 显示 操作 区域
    watch(
        () => props.showHandleArea,
        (newVal, oldVal) => {
          if (newVal !== oldVal) showHandleAreaRef.value = newVal
        },
        { deep: true },
    )

    return {
      visibleRef,
      closeBtnRef,
      showHandleAreaRef,
      closeDrawer,
      afterVisibleChange,
    };
  },
});
</script>