<template>
  <div class="source-category w-280px">
    <a-tree
      v-if="treeData.length"
      block-node
      show-line
      defaultExpandAll
      :selectedKeys="treeDefaultSelectedKeys"
      :tree-data="treeData"
      :field-names="fieldNames"
      @select="selectTreeNode"
      ref="treeRefEl"
    >
      <template #title="{ key: treeKey, title, operate, pid }">
        <a-dropdown :trigger="['contextmenu']">
          <div class="tree flex justify-between">
            <div class="tree-title" v-if="renameTreeId !== treeKey">{{ title }}</div>
            <div v-if="isRename && renameTreeId === treeKey">
              <a-input
                ref="reNameInput"
                v-model:value="treeName"
                autofocus
                allow-clear
                @blur="treeInputBlur(treeKey, title)"
                placeholder="请输入"
              />
            </div>
            <!--<div v-else>-->
            <!--  <a-input-->
            <!--    autofocus-->
            <!--    v-model:value="treeName"-->
            <!--    size="small"-->
            <!--    placeholder="请输入"-->
            <!--    @blur="treeInputBlur(treeKey)"-->
            <!--    allow-clear-->
            <!--  ></a-input>-->
            <!--</div>-->
            <div class="pr-1 tree-operate pl-1" v-if="pid != 0 && !isRename">
              <a-space>
                <EditOutlined
                  v-auth="'/v1/goods/resource/library/update'"
                  @click.stop="editTreeNode(treeKey, title)"
                  :style="styleIcon"
                />
                <MinusCircleOutlined
                  v-auth="'/v1/goods/resource/library/delete'"
                  @click.stop="removeTreeNode(treeKey)"
                  :style="styleIcon"
                />
                <PlusCircleOutlined
                  v-auth="'/v1/goods/resource/library/add'"
                  @click.stop="addTreeNode(treeKey)"
                  :style="styleIcon"
                />
              </a-space>
            </div>
          </div>
          <template #overlay>
            <a-menu
              v-if="pid != 0 && !isRename"
              @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)"
            >
              <a-menu-item
                key="1"
                v-auth="'/v1/goods/resource/library/add'"
                @click.stop="addTreeNode(treeKey)"
                >新建分类
              </a-menu-item>
              <a-menu-item
                key="2"
                v-auth="'/v1/goods/resource/library/update'"
                @click.stop="editTreeNode(treeKey)"
              >
                重命名
              </a-menu-item>
              <a-menu-item
                key="3"
                v-auth="'/v1/goods/resource/library/delete'"
                @click.stop="removeTreeNode(treeKey)"
              >
                删除分类
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tree>
  </div>
</template>

<script setup lang="ts">
  import { storage } from '/@/components/VoGlobalRegister/VoGlobalRegister'
  import { TREE_ID } from '/@/enums/VoCacheEnum'
  // 分类树
  import {
    nextTick,
    ref,
    toRaw,
    unref,
    getCurrentInstance,
    watch,
    onMounted,
    defineEmits,
    computed,
    defineExpose,
  } from 'vue'
  import type { TreeProps } from 'ant-design-vue'
  // import { _ } from '@vocen/shared'
  import { _ } from '../../../../../../../../../shared/src/index'
  // @ts-ignore
  import {
    EditOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
    ExclamationCircleOutlined,
  } from '@ant-design/icons-vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { forEach } from '/@/utils/helper/treeHelper'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useResourceTreeStoreWithOut } from '/@/store/modules/resourceTreeStore'
  import { treeMap } from '/@/utils/helper/treeHelper'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const resourceTreeStore = useResourceTreeStoreWithOut()

  const { createMessage } = useMessage()

  const emits = defineEmits(['select', 'update:current-dir-id', 'register', 'openAddModal'])

  const currentResourceType = computed(() => resourceTreeStore.getCurrentResrouceMode)
  const props = defineProps({
    // currentResourceType: {
    //   type: String,
    //   default: 'img',
    // },

    selectList: {
      type: Array,
      default() {
        return []
      },
    },
  })
  const reNameInput = ref()
  const isRename = ref(false)
  const renameTreeId = ref('')
  const tmplTreeData = []
  let treeData = ref<TreeProps['treeData']>(tmplTreeData)
  const fieldNames: TreeProps['fieldNames'] = {
    children: 'goodsResourceFolderVOList',
  }
  const loadTreeData = async (reset) => {
    const channel = currentResourceType.value
    try {
      const { data } = await adminHttp.goodsResourceLibraryList(
        { type: channel === 'img' ? 1 : 2 },
        { options: {} },
      )
      forEach(
        data,
        (item) => {
          item.key = item.id
          item.title = item.name
          item.pid = item.parentId
          item.children = [].concat(item.goodsResourceFolderVOList)
        },
        { children: 'goodsResourceFolderVOList' },
      )

      treeData.value = data
      console.log(reset, 'reset')
      console.log(treeDefaultSelectedKeys.value, 'treeDefaultSelectedKeys')
      if (!treeDefaultSelectedKeys.value.length || reset) {
        treeDefaultSelectedKeys.value = [treeData.value[0].key]
        resourceTreeStore.setCurrentFloderId(treeData.value[0].key)
        const sl = [{ title: treeData.value[0].title, id: treeData.value[0].key }]
        resourceTreeStore.setSelectFolderList(sl)
      }
    } catch (e) {
      console.log(e)
    }
  }

  watch(currentResourceType, () => {
    treeDefaultSelectedKeys.value = []
    loadTreeData()
  })

  const treeRefEl = ref(null)

  const treeActions = {
    loadTreeData,
    expandAll: () => {},
    getTreeRefEl: () => unref(treeRefEl),
  }
  onMountedOrActivated(() => {
    emits('register', treeActions)
  })

  const vm = getCurrentInstance()

  const styleIcon = {
    color: '#888585',
  }

  const addNewNode = ref(false)
  const treeName = ref('')

  const defaultTMp: any = treeData.value
  const treeDefaultSelectedKeys = ref([])

  // 构建树形
  const buildTree = (data, start) => {
    const idMapping = data.reduce((acc, el, i) => {
      acc[el.key] = i
      return acc
    }, {})
    let root
    console.log(idMapping)
    data.forEach((el) => {
      // 判断根节点
      if (el.pid === start) {
        root = el
        return
      }
      // 用映射表找到父元素
      const parentEl: any = data[idMapping[el.pid]]
      console.log(parentEl)
      // 把当前元素添加到父元素的`children`数组中
      parentEl['children'] = [...(parentEl['children'] || []), el]
    })
    return root
  }

  // 将数据转为扁平化数组
  const treeToList = (tree, key = 'children') => {
    let data = tree
    let newData: any = []

    const callback = (item: any, key = 'children') => {
      if (item[key] && key == 'children') {
        ;(item[key] || (item[key] = [])).map((v) => {
          callback(v, key)
        })
      } else if (item[key] && key == 'parent') {
        for (let i in item[key]) {
          console.log(item[key], 'Object')
          if (i == key) {
            callback(item[key], key)
          }
        }
      }

      //delete item[key]
      newData.push(item)
    }
    if (key == 'children') {
      data.map((v) => callback(v, key))
    } else {
      callback(tree, key)
    }
    return newData
  }

  // 将数组转成树形数组

  const listToTree = (data, start = 0) => {
    // * 先生成parent建立父子关系
    const obj = {}
    data.forEach((item) => {
      obj[item.key] = item
    })
    // * obj -> {1001: {id: 1001, parentId: 0, name: 'AA'}, 1002: {...}}
    // console.log(obj, "obj")
    const parentList: any = []
    data.forEach((item) => {
      const parent = obj[item.pid]
      if (parent) {
        // * 当前项有父节点
        parent.children = parent.children || []
        parent.children.push(item)
      } else {
        // * 当前项没有父节点 -> 顶层
        parentList.push(item)
      }
    })
    return parentList
  }

  const onContextMenuClick = (treeKey, menuKey) => {
    console.log(treeKey, menuKey)
  }

  // 编辑树节点
  const editTreeNode = (treeKey, name) => {
    treeName.value = name
    renameTreeId.value = treeKey
    isRename.value = true
    nextTick(() => {
      reNameInput.value && reNameInput.value.focus()
    })
    //reNameInput.value &&reNameInput.value.focus();
  }
  const reSetSelectKey = () => {
    treeDefaultSelectedKeys.value = []
  }

  // 删除树节点
  const removeTreeNode = (treeKey) => {
    let resetSelectedKeys = treeKey == treeDefaultSelectedKeys.value[0]
    console.log(resetSelectedKeys, treeDefaultSelectedKeys.value)
    emits('removeTreeNode', {
      id: treeKey,
      isReSet: resetSelectedKeys,
    })
  }

  // 新增树节点
  const addTreeNode = (parentId) => {
    emits('openAddModal', {
      pid: parentId,
      // tempNodeTitle: '',
      // confirmLoading: false,
      // visible: true,
    })
  }

  // 输入框失去焦点
  const treeInputBlur = async (treeKey, title) => {
    if (isRename.value && (!treeName.value || treeName.value == title)) {
      isRename.value = false
      renameTreeId.value = ''
      return false
    }

    try {
      const { code } = await adminHttp.goodsResourceLibraryUpdate({
        id: treeKey,
        name: treeName.value,
      })
      if (code == '20001') {
        treeMap(treeData.value, {
          conversion(item) {
            console.log(item)
            if (item.id === treeKey) {
              item.title = treeName.value
            }
            return item
          },
        })

        createMessage.success('修改成功')
        renameTreeId.value = ''
        treeName.value = ''
        isRename.value = false
      }
    } catch (e) {
      console.log(e)
    }
  }

  onMountedOrActivated(() => {
    const tmp: any = toRaw(treeData.value)
    emits('select', {
      node: tmp[0],
      selectListNodes: tmp,
    })

    emits('update:current-dir-id', 0)
  })

  // 选择树节点
  const selectTreeNode = (selectedKeys, e) => {
    storage.set(TREE_ID, selectedKeys[0])

    console.log(e)
    if (!selectedKeys.length) return
    const { selectedNodes, node } = e
    let b: any = []
    if (node.parent) {
      b = _.concat(node.parent.nodes, selectedNodes)
    } else {
      b = selectedNodes
    }
    treeDefaultSelectedKeys.value = selectedKeys

    resourceTreeStore.setCurrentFloderId(selectedKeys[0])

    // 循环node 的parent 找到他的层级
    let crumbsData = treeToList(e.node, 'parent')
    console.log(crumbsData)
    let selectFolderList = crumbsData.map((item) => {
      return { title: item.node ? item.node.name : item.name, id: item.key }
    })
    resourceTreeStore.setSelectFolderList(selectFolderList)
  }

  const currentFolderId = computed(() => resourceTreeStore.getCurrentFloderId)
  defineExpose({ loadTreeData })

  watch(
    currentFolderId,
    (val) => {
      treeDefaultSelectedKeys.value = [val]
      // 默认值变化后，进行导出
      // const tmp: any = toRaw(treeData)
      // delete tmp.chilren
      // emits('select', {
      //   node: tmp[0],
      //   selectListNodes: tmp.value,
      // })
    },
    { deep: true },
  )
</script>
<style lang="less">
  .source-category {
    padding: 15px;
    margin-right: 15px;
    background: #fff;
    height: 100%;

    .source-category .ant-tree-treenode {
      width: 100%;
      flex: 1;
    }
  }
</style>
<style scoped lang="less">
  .tree {
    .tree-title {
      max-width: 114px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden; //溢出内容隐藏
      text-overflow: ellipsis; //文本溢出部分用省略号表示
      display: -webkit-box; //特别显示模式
      -webkit-line-clamp: 1; //行数
      line-clamp: 1;
      -webkit-box-orient: vertical; //盒子中内容竖直排列
    }

    &:hover {
      .tree-operate {
        display: block;
      }
    }

    .tree-operate {
      display: none;

      &:hover {
      }
    }
  }
</style>
