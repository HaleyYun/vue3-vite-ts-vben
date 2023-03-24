<template>
  <a-drawer
    :title="areaInfo.treeTitle"
    :visible="areaInfo.treeVisible"
    @close="viewBack"
    :width="720"
  >
    <template #extra>
      <a-button style="margin-right: 8px" @click="viewBack">关闭</a-button>
    </template>
    <div>
      <div class="mb-10px text-lg">{{ areaInfo.name }}</div>
      <div class="mb-10px" v-if="areaInfo.isNationwide">支持在全国销售</div>
      <a-divider />
      <div class="flex flex-justify-between mb-10px">
        <a-input
          v-model:value="treeSearchValue"
          style="margin-bottom: 8px; width: 70%"
          placeholder="请输入"
        />
        <div>
          <a-button class="mr-10px" type="primary" @click="treeSearch">查询</a-button>
          <a-button :disabled="treeSearchValue == ''" @click="treeReset">重置</a-button>
        </div>
      </div>
      <a-spin :spinning="loading" tip="Loading...">
        <a-tree
          disabled
          :expanded-keys="expandedKeys"
          v-model:checkedKeys="checkedKeys"
          v-model:selectedKeys="selectedKeys"
          :auto-expand-parent="autoExpandParent"
          checkable
          :tree-data="treeData"
          :fieldNames="{ children: 'children', title: 'name', key: 'id' }"
          @expand="onExpand"
        />
      </a-spin>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
  import {
    defineComponent,
    ref,
    reactive,
    defineProps,
    watch,
    onBeforeMount,
    defineEmits,
    nextTick,
  } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import type { TreeProps } from 'ant-design-vue'
  import { treeMap } from '/@/utils/helper/treeHelper'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const emit = defineEmits(['update:areaInfo'])
  const props = defineProps({
    areaInfo: {
      default: {
        name: '',
        treeTitle: '',
        treeVisible: false,
        isNationwide: false,
      },
      type: Object,
    },
    salesCode: {
      default: [],
      type: Array,
    },
  })

  //投资区域
  const loading = ref(false)
  const treeData = ref<TreeProps['treeData']>([])
  const treeSearchValue = ref('')
  const autoExpandParent = ref(false)
  const expandedKeys = ref<string[]>([])
  const selectedKeys = ref<string[]>([])
  let checkedKeys = ref<string[]>([])
  const treeList = ref([])
  // let areaInfo = reactive({
  //   name:'',
  //   treeTitle:'',
  //   treeVisible:false,
  //   isNationwide:false,
  // })

  const setAreaData = () => {
    treeSearchValue.value = ''
    expandedKeys.value = []
    selectedKeys.value = []
    treeList.value = []
    const ret = []
    treeMap(treeData.value, {
      children: 'children',
      conversion(item) {
        treeList.value.push({ key: item.code, title: item.name })
        ret.push(item.code)
      },
    })
    if (props.salesCode && ['1', '86'].includes(props.salesCode[0])) {
      checkedKeys.value = ret
      props.areaInfo.isNationwide = true
    } else {
      checkedKeys.value = props.salesCode ? props.salesCode : []
      props.areaInfo.isNationwide = false
    }
  }

  const onExpand = (keys: string[]) => {
    expandedKeys.value = keys
    autoExpandParent.value = false
  }
  // 查询
  const getParentKey = (key: string | number, tree): string | number | undefined => {
    let parentKey
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some((item) => item.code === key)) {
          parentKey = node.code
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }
  const treeSearch = () => {
    const expanded = treeList.value
      .map((item) => {
        console.log(item.title, item.title.indexOf(treeSearchValue.value))
        if (item.title.indexOf(treeSearchValue.value) != -1) {
          selectedKeys.value.push(item.key)
          return getParentKey(item.key, treeData.value)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    console.log(treeList.value, expanded)
    expandedKeys.value = expanded
    autoExpandParent.value = true
  }
  // 重置
  const treeReset = () => {
    treeSearchValue.value = ''
    expandedKeys.value = []
    selectedKeys.value = []
  }

  const viewBack = () => {
    props.areaInfo.treeVisible = false
  }

  watch(
    () => props.areaInfo.treeVisible,
    async (value) => {
      if (value) {
        await initArea()
        setAreaData()
      }
    },
    { deep: true },
  )
  onMountedOrActivated(async () => {
    await initArea()
    setAreaData()
  })

  //省市区
  const initArea = async () => {
    loading.value = true
    await adminHttp
      .sixHotAreaTree()
      .then((res) => {
        loading.value = false
        treeData.value = res.data
        console.log('data')
      })
      .catch((err) => {
        loading.value = false
        console.log(err)
      })
  }
</script>

<style scoped lang="less"></style>
