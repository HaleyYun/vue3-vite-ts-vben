<template>
  <div class='margin-t-10 margin-b-10 margin-l-10'>
    <BasicForm @register="registerForm" @submit='filterSearchEvent' />
  </div>
  <div>
    <a-tree
      :show-line="showLine"
      :show-icon="showIcon"
      :default-expanded-keys="['0-0-0']"
      :tree-data="treeData"
      @select="onSelect"
    >
      <template #icon></template>
      <template #title="{ dataRef }">
        <template v-if="dataRef.key === '0-0-0-1'">
          <div>multiple line title</div>
        </template>
        <template v-else>{{ dataRef.title }}</template>
      </template>
      <template #switcherIcon="{ dataRef, defaultIcon }">
        <component :is="defaultIcon"/>
      </template>
    </a-tree>
  </div>
</template>
<script lang="ts">
import {SmileTwoTone } from '@ant-design/icons-vue';
import type { TreeProps } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { BasicForm, useForm } from '/@/components/Form'
import adminHttp from '/@/utils/http/adminHttp'
export default defineComponent({
  components: {
    BasicForm,
    SmileTwoTone,
  },
  props: {
    filterData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props) {
    let filterList: any = ref(props.filterData)
    const [registerForm] = useForm({
      labelWidth: 120,
      schemas: filterList.value,
      showResetButton: false,
      showSubmitButton: true

    })
    const showLine = ref<boolean>(true);
    const showIcon = ref<boolean>(false);
    const treeData = ref<TreeProps['treeData']>([
      {
        title: 'parent 1',
        key: '0-0',
        children: [
          {
            title: 'parent 1-0',
            key: '0-0-0',
            children: [
              { title: 'leaf', key: '0-0-0-0' },
              {
                key: '0-0-0-1',
              },
              { title: 'leaf', key: '0-0-0-2' },
            ],
          },
          {
            title: 'parent 1-1',
            key: '0-0-1',
            children: [{ title: 'leaf', key: '0-0-1-0' }],
          },
          {
            title: 'parent 1-2',
            key: '0-0-2',
            children: [
              { title: 'leaf 1', key: '0-0-2-0' },
              {
                title: 'leaf 2',
                key: '0-0-2-1',
              },
            ],
          },
        ],
      },
      {
        title: 'parent 2',
        key: '0-1',
        children: [
          {
            title: 'parent 2-0',
            key: '0-1-0',
            children: [
              { title: 'leaf', key: '0-1-0-0' },
              { title: 'leaf', key: '0-1-0-1' },
            ],
          },
        ],
      },
    ]);
    const filterSearchEvent = (item) => {
      console.log(item, '==item')
    }
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
    };
    const initGetAreaList = () => {
      //
      // adminHttp.Store.sixHotArea()
    }
    initGetAreaList()
    return {
      onSelect,
      filterSearchEvent,
      registerForm,
      showLine,
      showIcon,
      treeData,
    };
  },
});
</script>