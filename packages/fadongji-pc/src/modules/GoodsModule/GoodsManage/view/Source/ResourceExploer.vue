<template>
  <EraTabs :tabsList="tabsList" :tabs-active="currentResourceType" @tabsChange="tabsChange" />
  <div class="page-wrap m-24px mt-72px">
    <div class="page-container source">
      <div class="source-content flex">
        <!--  左侧分类树：start    -->
        <!--@select="treeSelectHandler"-->
        <FoldersTree
          ref="treeRef"
          @register="registerTree"
          @openAddModal="handlerOpenAddModal"
          @removeTreeNode="removeTreeNode"
        />
        <!--  左侧分类树：end    -->

        <!--  右侧文件列表：start    -->
        <FileExploer
          ref="exploerRef"
          @register="registerExploer"
          @openAddModal="handlerOpenAddModal"
          @done="callBackUpload"
        />
        <!--  右侧文件列表：end    -->
      </div>
    </div>

    <AModal
      title="新增文件夹"
      v-model:visible="addNodeModal.visible"
      :confirm-loading="addNodeModal.confirmLoading"
      @ok="handlerAddTreeNode"
    >
      <div class="padding-10">
        <a-input
          :maxlength="30"
          v-model:value="addNodeModal.tempNodeTitle"
          placeholder="请输入名称"
        />
      </div>
    </AModal>
  </div>
</template>

<script setup lang="ts">
  // 资源库管理
  import {
    createVNode,
    ref,
    watch,
    reactive,
    toRaw,
    unref,
    nextTick,
    onMounted,
    onBeforeUnmount,
    computed,
  } from 'vue'
  import { Modal } from 'ant-design-vue'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

  import {
    useExploer,
    useFolderTree,
  } from '/@/modules/GoodsModule/GoodsManage/view/Source/hooks/hooks'
  import FoldersTree from '/@/modules/GoodsModule/GoodsManage/view/Source/components/FoldersTree/FoldersTree.vue'
  import FileExploer from '/@/modules/GoodsModule/GoodsManage/view/Source/components/FileExploer/FileExploer.vue'
  import { useResourceTreeStoreWithOut } from '/@/store/modules/resourceTreeStore'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { ContentTypeEnum } from '/@/enums/httpEnum'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const resourceTreeStore = useResourceTreeStoreWithOut()
  const [registerTree, { getTreeRef, loadTreeData, reSetSelectKey }] = useFolderTree()
  const [registerExploer, { getExploerRef, loadExploerList }] = useExploer()
  import { storage } from '/@/components/VoGlobalRegister/VoGlobalRegister'
  import { TREE_ID } from '/@/enums/VoCacheEnum'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const currentFolderId = computed(() => resourceTreeStore.getCurrentFloderId)

  // const currentFolderId = ref(0)

  const currentResourceType = computed({
    get: () => resourceTreeStore.getCurrentResrouceMode,
    set: (nval) => resourceTreeStore.setCurrentResrouceMode(nval),
  })
  const tabsList = ref([
    { key: 'img', name: '图片库', totalCount: 0 },
    { key: 'video', name: '视频库', totalCount: 0 },
  ])
  const tabsChange = (key) => {
    resourceTreeStore.setCurrentResrouceMode(key)
  }

  // 切换资源类型的变化
  // watch(currentResourceType, (newVal) => {
  //   // console.log(`currentResourceType 变化 ${newVal}`)
  //   // loadExploerList()
  // })

  const loadingCtxkey = 'handlerNode'
  let zeroStr = '0'
  let addNodeModal = reactive({
    visible: false,
    tempNodeTitle: '',
    confirmLoading: false,
    pid: null,
  })
  const handlerOpenAddModal = ({ pid }) => {
    console.log(pid)
    addNodeModal.pid = pid
    addNodeModal.visible = true
  }

  const callBackUpload = (content) => {
    console.log(content, '===ContentContent')
  }

  const restAddModel = () => {
    addNodeModal.visible = false
    addNodeModal.pid = null
    addNodeModal.tempNodeTitle = ''
    addNodeModal.confirmLoading = false
  }
  // 添加树节点
  const handlerAddTreeNode = async () => {
    try {
      if (!addNodeModal.tempNodeTitle) {
        throw Error('名称必填必填')
      }
      addNodeModal.confirmLoading = true
      console.log(addNodeModal.pid)
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      await adminHttp.goodsResourceLibraryAdd(
        {
          name: addNodeModal.tempNodeTitle,
          parentId: addNodeModal.pid,
          type: currentResourceType.value === 'img' ? 1 : 2,
        },
        {
          options: {
            //临时hack
            headers: { 'Content-Type': ContentTypeEnum.JSON },
          },
        },
      )

      createMessage.success({ content: `操作成功`, key: loadingCtxkey })
      loadTreeData()
      loadExploerList()

      //rest
      restAddModel()
    } catch (e: any) {
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    } finally {
      addNodeModal.confirmLoading = false
    }
  }

  const removeTreeNode = ({ id, isReSet }) => {
    Modal.confirm({
      title: '确认删除',
      icon: createVNode(ExclamationCircleOutlined),
      content: '确定要删除吗？删除后该文件夹中的内容素材都会被删除。',
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        const { code } = await adminHttp.goodsResourceLibraryDelete({ id: id })
        if (code == '20001') {
          if (isReSet) {
            loadTreeData(isReSet)
          } else {
            loadTreeData()
          }
          loadExploerList()
          Modal.destroyAll()
        } else {
          Modal.destroyAll()
        }
      },
      onCancel() {
        Modal.destroyAll()
      },
    })
  }

  onMountedOrActivated(() => {
    storage.set(TREE_ID, zeroStr)
    // 初始化只加载three数据,设置默认选中的值，放在store中，根据store的变化，去请求文件夹的内容
    loadTreeData()
  })
  onBeforeUnmount(() => {
    storage.set(TREE_ID, zeroStr)
  })
</script>
<style lang="less">
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .page-wrap {
  }

  .source {
    height: calc(100vh - 100px);
    overflow-y: hidden;

    .source-content {
      height: 100%;
    }
  }
</style>
