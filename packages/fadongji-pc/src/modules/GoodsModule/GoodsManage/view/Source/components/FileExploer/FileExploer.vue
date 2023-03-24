<template>
  <div class="comp-wrap exploer source-category flex-1 border-gray-200 h-full">
    <div class="flex justify-between items-center">
      <div class="text-14px flex items-center"
        ><span>当前位置： </span>
        <a-breadcrumb v-if="selectTreeList.length">
          <a-breadcrumb-item v-if="selectTreeList.length > 1">
            <span class="text-green-600 cursor-pointer" @click.stop="backHandler"
              >返回上一级 <span class="mx-8px">/</span></span
            >
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-breadcrumb v-if="selectTreeList.length">
          <a-breadcrumb-item v-for="(c, idx) in selectTreeList" :key="idx">
            <span
              class="text-green-600 cursor-pointer"
              :class="{ 'text-gray-600': idx === selectTreeList.length - 1 }"
              @click.stop="toTargetNode(c, idx)"
            >
              {{ c.title }}
            </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div>
        <a-space>
          <EraUpload
            v-auth="'/v1/file/imgUpload'"
            v-if="currentResourceType === 'img'"
            list-type="text"
            :maxSize="50"
            :maxNumber="9"
            :multiple="true"
            :upload-type="currentResourceType"
            uploadFuncChannel="localStore"
            @done="handlerAllUploadDone"
            @delete="handerUpDel"
            :accept="uploadAcceptConfig[currentResourceType]"
            :show-help-text="false"
            :show-upload-list="false"
          >
            <template #target>
              <a-button type="primary">
                <template #icon>
                  <CloudUploadOutlined />
                </template>
                上传图片
              </a-button>
            </template>
          </EraUpload>

          <EraUpload
            v-auth="'/v1/file/videoUpload'"
            v-if="currentResourceType === 'video'"
            upload-tip="点击上传视频"
            :maxSize="200"
            :maxNumber="1"
            list-type="text"
            uploadType="video"
            uploadFuncChannel="localStore"
            :multiple="false"
            help-text="最多插入1个视频(一分钟以内)。"
            @done="handlerAllUploadDone"
            @delete="handerUpDel"
            :accept="['mp4']"
            :show-help-text="false"
            :show-upload-list="false"
          >
            <template #target>
              <a-button type="primary">
                <template #icon>
                  <CloudUploadOutlined />
                </template>
                上传视频
              </a-button>
            </template>
          </EraUpload>
          <a-button v-auth="'/v1/goods/resource/library/add'" @click="openAddModal">
            <template #icon>
              <file-add-outlined />
            </template>
            新建文件夹
          </a-button>
        </a-space>
      </div>
    </div>
    <div class="pt-2">
      <a-form layout="inline" v-bind="formItemLayout" :model="formState">
        <a-form-item label="输入搜索">
          <a-input v-model:value="formState.name" placeholder="输入关键字" />
        </a-form-item>
        <a-form-item label="上传日期">
          <a-range-picker v-model:value="formState.rangeTime" valueFormat="YYYY-MM-DD" />
        </a-form-item>
        <a-form-item :wrapper-col="buttonItemLayoutWrapperCol">
          <a-button type="primary" html-type="submit" @click="handleFinish">
            <template #icon>
              <search-outlined />
            </template>
            查询
          </a-button>
          <a-button type="default" class="margin-l-r-10" @click="handleReset"> 重置</a-button>
        </a-form-item>
      </a-form>
      <div class="mt-5">
        <div class="bg-hex-f2f2f2 h-50px rounded-md px-3 flex items-center justify-between">
          <div class="text-18px font-bold">素材列表</div>
          <div class="cursor-pointer text-0px">
            <VoIcon v-if="mode === 'list'" :size="35" @click="mode = 'block'" name="category" />
            <VoIcon v-else :size="38" name="category-o" @click="mode = 'list'" />
          </div>
        </div>
      </div>
      <div class="pt-3">
        <template v-if="fileFolderList.length > 0">
          <div class="img-list pt-20px flex flex-wrap">
            <FileOrFolderItem v-for="(item, idx) in fileFolderList" :key="idx" :vo="item" />
          </div>
          <div class="paginator flex">
            <div class="flex-1"></div>
            <VoPagination
              :total="paginatorConfig.total"
              :current="paginatorConfig.current"
              :page-size="paginatorConfig.pageSize"
              @pagination="paginationChange"
            />
          </div>
        </template>
        <template v-else>
          <AEmpty />
        </template>

        <!--<div class="file-list">-->
        <!--  <FileOrFolderItem-->
        <!--    v-for="(item, idx) in fileFolderList"-->
        <!--    :key="idx"-->
        <!--    :vo="item"-->
        <!--  ></FileOrFolderItem>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import dayjs, { Dayjs } from 'dayjs'
  import VoIcon from '/@/components/VoIcon/VoIcon.vue'
  import { CloudUploadOutlined, FileAddOutlined, SearchOutlined } from '@ant-design/icons-vue'
  import { computed, defineEmits, onMounted, reactive, ref, toRaw, watch } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { ContentTypeEnum } from '/@/enums/httpEnum'
  import { forEach } from '/@/utils/helper/treeHelper'
  import FileOrFolderItem from '/@/modules/GoodsModule/GoodsManage/view/Source/components/FileExploer/components/FileOrFolderItem.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'

  import { useResourceTreeStoreWithOut } from '/@/store/modules/resourceTreeStore'
  import { uploadFileFn, uploadFileFnByTencentCos } from '/@/api/sys/upload'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { buildUUID } from '/@/utils/uuid'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'

  const resourceTreeStore = useResourceTreeStoreWithOut()
  const currentFolderId = computed(() => resourceTreeStore.getCurrentFloderId)
  const currentResourceType = computed(() => resourceTreeStore.getCurrentResrouceMode)
  const emits = defineEmits(['register', 'openAddModal'])
  const { createMessage } = useMessage()

  const uploadAcceptConfig = {
    img: ['jpg', 'jpeg', 'png'],
    video: ['mp4'],
  }
  const formState = reactive({
    name: '',
    rangeTime: [],
  })

  const formItemLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 18,
    },
  }

  const buttonItemLayoutWrapperCol = {
    span: 24,
    offset: 4,
  }

  const handlerAllUploadDone = async ({ info, file }) => {
    const currentFloderId = resourceTreeStore.getCurrentFloderId
    console.log(file)
    const params = [
      {
        name: file.fileName,
        resourceSuffix: file.resourceSuffix,
        size: file.fileSize,
        measurement: `${file.width}*${file.height}`,
        folderId: currentFolderId.value,
        videoPicUrl: file.picUrl ? file.picUrl : undefined,
        duration: file.duration ? file.duration : undefined,
        type: resourceTreeStore.getCurrentResrouceMode === 'img' ? 1 : 2,
        url: file.filePath,
      },
    ]
    console.log(params)

    try {
      const { code } = await adminHttp.goodsResourceAdd(params)
      if (code == '20001') {
        createMessage.success('添加成功')
        loadExploerData()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handerUpDel = (record) => {
    console.log({
      record,
    })
  }

  const openAddModal = () => {
    emits('openAddModal', { pid: currentFolderId.value })
  }

  const paginatorConfig = reactive({
    total: 0,
    current: 1,
    pageSize: 10,
  })

  let fileFolderList = ref([])

  const loadExploerData = async ({ opts = {} } = {}) => {
    let filterParams: any = {
      type: currentResourceType.value === 'img' ? 1 : 2,
      pageSize: paginatorConfig.pageSize,
      pageNo: paginatorConfig.current,
      ...opts,
    }
    if (currentFolderId.value) filterParams.folderId = currentFolderId.value
    const list = await adminHttp
      .goodsResourceList(
        {
          ...filterParams,
        },
        {
          options: {
            //临时hack
            // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
          },
        },
      )
      .then((res) => {
        paginatorConfig.total = Number(res.data.total)
        return res.data.records
      })
      .catch((err) => {
        return []
      })

    fileFolderList.value = list
    console.log({ fileFolderList: list })
  }

  // 分页
  const paginationChange = ({ current, pageSize }) => {
    paginatorConfig.current = current
    paginatorConfig.pageSize = pageSize
    loadExploerData()
  }

  const props = defineProps({
    currentFolderId: {
      type: String,
      default: '',
    },
  })

  watch(currentResourceType, () => {
    console.log('改变了currentResourceType')
    formState.name = ''
    formState.rangeTime = []
    //loadExploerData()
  })
  watch(
    currentFolderId,
    () => {
      formState.name = ''
      formState.rangeTime = []
      loadExploerData()
      console.log('改变了currentFolderId')
    },
    { deep: true, immediate: true },
  )

  const mode = ref('list')
  const dateFormat = 'YYYY-MM-DD'
  const selectTreeList = computed(() => resourceTreeStore.getSelectFolderList)

  // // 选择分类进行触发
  // const treeSelectHandler = ({ node, selectListNodes }) => {
  //   selectKey.value = node.key
  //   selectTreeList.value = selectListNodes
  // }
  // 重置
  const handleReset = () => {
    formState.name = ''
    formState.rangeTime = []
    const filterParamas = {
      startTime: '',
      endTime: '',
      name: '',
    }
    loadExploerData({ opts: clearObjectUnalbeAttr(filterParamas) })
  }

  // 查询
  const handleFinish = () => {
    let startTimeStr = ''
    let endTimeStr = ''
    if (formState.rangeTime.length > 0) {
      startTimeStr = dayjs(formState.rangeTime[0]).format(dateFormat) + ' ' + '00:00:00'
      endTimeStr = dayjs(formState.rangeTime[1]).format(dateFormat) + ' ' + '23:59:59'
    }
    const filterParamas = {
      startTime: startTimeStr,
      endTime: endTimeStr,
      name: formState.name,
    }
    console.log('handleFinish')
    loadExploerData({ opts: clearObjectUnalbeAttr(filterParamas) })
    // console.log(values, formState);
  }

  // 返回上一层
  const backHandler = () => {
    const sl: [] = [...selectTreeList.value]
    sl.pop()
    resourceTreeStore.setSelectFolderList(sl)
    const nextNode = [...sl].pop()
    const nextFloderId = nextNode.id

    resourceTreeStore.setCurrentFloderId(nextFloderId)
    // sl.splice(sl.length - 1, 1)
    // if (sl.length === 1) {
    //   const currentNode: any = sl[0]
    //   selectKey.value = currentNode.key || ''
    // } else {
    //   const currentNode: any = sl[sl.length - 1]
    //   selectKey.value = currentNode.key || ''
    // }

    // console.log(selectKey.value)
  }

  // 跳转到指定的层级
  const toTargetNode = (c, index) => {
    const sl: [] = [...selectTreeList.value]
    sl.splice(index + 1)
    resourceTreeStore.setSelectFolderList(sl)

    // console.log(c.key, '点选的key')
    // if (selectKey.value === c.key) return
    // selectKey.value = c.key || ''
    // selectTreeList.value.splice(index + 1, selectTreeList.value.length)
    // console.log('点选的key', selectKey)
    const nextFloderId = c.id
    resourceTreeStore.setCurrentFloderId(nextFloderId)
  }
  defineExpose({ loadExploerData })
  emits('register', {
    loadExploerData,
  })
</script>

<style lang="less" scoped>
  .exploer {
    padding: 15px;
    height: 100%;
  }

  .file-list {
    display: flex;
    flex-wrap: wrap;
  }

  .pt-2 {
    height: calc(100% - 40px);
  }

  .pt-3 {
    overflow: hidden;
    height: calc(100% - 112px);
  }

  .img-list {
    overflow-y: auto;
    height: calc(100% - 32px);
  }
</style>
