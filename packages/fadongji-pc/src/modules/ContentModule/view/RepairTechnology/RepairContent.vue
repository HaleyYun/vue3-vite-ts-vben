<template>
  <div>
    <div class="detail-bg m-24px single-page-verticalAllInner">
      <BasicForm ref="opForm" @register="register" @submit="handleSubmit">
        <template #titleSlot="{ model, field, schema }">
          <AInput
            :placeholder="schema.componentProps.placeholder"
            v-model="model[field]"
            class="col-assets"
          />
        </template>
        <template #slotCode="{ model, field }">
          <a-select
            style="width: 25%"
            v-model:value="model[field]"
            placeholder="请选择角色"
            disabled
          >
            <a-select-option value="garage">修理厂</a-select-option>
          </a-select>
        </template>

        <template #slotCategory="{ model, field }">
          <a-select
            v-if="routeId"
            style="width: 25%"
            :options="classData"
            v-model:value="model[field]"
            placeholder="请选择类别"
          />
          <a-select
            v-else
            style="width: 25%"
            :options="classData"
            v-model:value="model[field]"
            mode="multiple"
            placeholder="请选择类别"
          />
        </template>
        <template #applicable="{ model, field }">
          <a-select
            style="width: 25%"
            v-model:value="model[field]"
            :options="modelData"
            mode="multiple"
            placeholder="请选择型号"
          />
        </template>
        <template #keyWordSlot="{ model, field }">
          <template v-for="(tag, index) in tagsList" :key="tag">
            <a-tooltip v-if="tag.length > 10" :title="tag">
              <a-tag color="blue" :closable="index !== -1" @close="handleClose(tag)">
                {{ `${tag.slice(0, 20)}...` }}
              </a-tag>
            </a-tooltip>
            <a-tag v-else color="blue" :closable="index !== -1" @close="handleClose(tag)">
              {{ tag }}
            </a-tag>
          </template>
          <a-input
            v-if="state.inputVisible"
            ref="inputRef"
            v-model:value="state.inputValue"
            type="text"
            size="small"
            :maxlength="10"
            :style="{ width: '78px' }"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag
            v-if="!state.inputVisible && tagsList.length < 10"
            style="background: #fff; border-style: dashed"
            @click="showInput"
          >
            <plus-outlined />
            添加
          </a-tag>
        </template>

        <template #resourceSlot="{ model, field }">
          <div class="margin-b-10">
            <a-radio-group v-model:value="resrouceType" @change="radioChange">
              <a-radio value="img">图片</a-radio>
              <a-radio value="video">视频</a-radio>
            </a-radio-group>
          </div>
          <div style="width: 80%">
            <AFormItem>
              <EraUpload
                v-if="resrouceType === 'img'"
                :uploadType="resrouceType"
                :fileListData="fileUrl"
                :maxSize="10"
                :maxNumber="1"
                uploadFuncChannel="localStore"
                :multiple="false"
                upload-tip="点击上传图片"
                help-text="建议上传 375*200px， jpg/png/jpge格式图片。"
                @done="handleDone"
                @delete="handerUpDel"
              />
              <EraUpload
                v-if="resrouceType === 'video'"
                :uploadType="resrouceType"
                :fileListData="fileUrlVideo"
                :showUploadList="true"
                upload-tip="点击上传视频"
                uploadFuncChannel="localStore"
                :maxSize="200"
                :maxNumber="1"
                :multiple="false"
                help-text="建议上传 16:9 、mp4格式视频"
                @done="handleDoneVideo"
                @delete="handerUpDel"
              />
            </AFormItem>
          </div>
        </template>
        <template #contentSlot="{ model, field }">
          <div style="width: 80%">
            <EraEditor :height="300" :width="400" ref="VoWangEditorRef" />
          </div>
        </template>
      </BasicForm>
    </div>
    <div class="detail-bottom">
      <AButton type="primary" class="margin-r-10" @click="cancelStepBeforePageFunc">取消</AButton>
      <AButton type="primary" @click="createStudyCenterEvent" v-auth="'/v1/content/technical/save'"
        >提交
      </AButton>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, watch, onMounted, reactive, nextTick, toRefs } from 'vue'
  import RepairTag from './component/RepairTag.vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { useForm, BasicForm } from '/@/components/Form'
  import { filterFormConfig } from './data/RepairData'
  import { useContentWithOut } from '/@/store/modules/content'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import { fileImgUploadInfo, fileVideoUploadInfo } from '/@/api/sys/upload'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRoute } from 'vue-router'
  import { router } from '/@/router'
  import { message } from 'ant-design-vue'
  import { Pattern } from '@vocen/shared'

  const userStore = useContentWithOut()
  const { createMessage } = useMessage()

  import adminHttp from '/@/utils/http/adminHttp'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  export default defineComponent({
    name: 'RepairContent',
    components: {
      BasicForm,
      EraUpload,
      RepairTag,
      PlusOutlined,
    },
    setup() {
      //关键词
      const tagsList = ref<any>([])
      const nameInput = ref<any>([])
      const addList = ref<any>([])
      const inputRef = ref()
      const model = ref<any>()
      const state = reactive<any>({
        inputVisible: false,
        inputValue: '',
      })
      const handleClose = (removedTag: string) => {
        console.log(removedTag, 'removedTag')

        const tags = tagsList.value.filter((tag) => tag !== removedTag)
        console.log(tags)
        tagsList.value = tags
      }

      const showInput = () => {
        state.inputVisible = true
        nextTick(() => {
          inputRef.value.focus()
        })
      }
      //添加
      const handleInputConfirm = () => {
        const inputValue = state.inputValue
        // 校验
        // if (!Pattern.isChinese(inputValue)) {
        //   return message.warning('请输入汉字')
        // }

        if (!inputValue) {
          state.inputVisible = false
          return
        }
        // let tags = tagsList.value
        if (inputValue && tagsList.value.indexOf(inputValue) === -1) {
          tagsList.value = [...tagsList.value, inputValue]
        } else {
          message.error('关键词重复，请重新输入')
        }
        Object.assign(state, {
          tagsList,
          inputVisible: false,
          inputValue: '',
        })
        nameInput.value.push(inputValue)
        addList.value = [...new Set(nameInput.value)]
      }
      //以上关键词
      const route = useRoute()
      const routeId = route.query.id
      let classData = ref([] as any[])
      let modelData = ref([] as any[])
      const fileUrl = ref([])
      const fileUrlVideo = ref([])
      const VoWangEditorRef = ref()
      const fileDuration = ref()
      let imgs = ref<string[]>([])
      let video = ref('')
      const uploadCommonParams = {}
      const resrouceType = ref('img')
      let detail = userStore.getDetail
      const [register, { submit: opFormSbumitFunc, setFieldsValue, updateSchema }] = useForm({
        schemas: filterFormConfig.filterManualCenterDetailsForm,
        labelWidth: 120,
        showSubmitButton: false,
        showResetButton: false,
        autoSubmitOnEnter: true,
      })
      watch(
        fileUrl,
        (val) => {
          setFieldsValue({
            fileUrl: val.join(','),
          })
        },
        { deep: true },
      )
      watch(
        fileUrlVideo,
        (val) => {
          setFieldsValue({
            fileUrl: val.join(','),
          })
        },
        { deep: true },
      )

      watch(
        fileUrlVideo,
        (val) => {
          setFieldsValue({
            fileUrl: val.join(','),
          })
        },
        { deep: true, immediate: true },
      )

      watch(
        tagsList,
        (val) => {
          setFieldsValue({
            keyword: val.join(','),
          })
        },
        { deep: true },
      )
      onMountedOrActivated(() => {
        console.log(detail.model, 'detail.modeldetail.modeldetail.model')

        // console.log(JSON.parse(detail.model),'11111');
        const map = { platformCode: 'garage' }
        getClassDataEvent(map)
        getModelDataDataEvent()
        console.log(route.query)
        if (route.query.id) {
          detail.fileUrl && (fileUrl.value = detail.fileUrl.split(','))

          console.log('1111', detail.keyword, 'baiyun')

          if (!detail.keyword.length) {
            tagsList.value = []
          } else {
            tagsList.value = detail.keyword.split(',')
          }
          if (detail.type == 2) {
            resrouceType.value = 'video'
            detail.fileUrl && (fileUrlVideo.value = detail.fileUrl.split(','))
          }
          setTimeout(() => {
            detail.content && VoWangEditorRef.value?.setHtml(JSON.parse(detail.content).json)
          }, 300)
          setFieldsValue({
            categoryId: detail.categoryId,
            name: detail.name,
            isEnable: detail.isEnable,
            type: detail.type,
            model: JSON.parse(detail.model),
          })
        }

        if (route.query.id) {
          updateSchema({
            field: 'categoryId',
            ifShow: true,
          })
          updateSchema({
            field: 'categoryIds',
            ifShow: false,
          })

          if (resrouceType.value === 'video') {
            updateSchema({
              field: 'content',
              ifShow: false,
            })
          } else {
            updateSchema({
              field: 'content',
              ifShow: true,
            })
          }
        } else {
          updateSchema({
            field: 'categoryIds',
            ifShow: true,
          })
          updateSchema({
            field: 'categoryId',
            ifShow: false,
          })
        }
        if (resrouceType.value === 'video') {
          updateSchema({
            field: 'content',
            ifShow: false,
          })
        } else {
          updateSchema({
            field: 'content',
            ifShow: true,
          })
        }
      })

      const toggleTheme = () => {
        const markDown = unref(markDownRef)
        if (!markDown) return
        const vditor = markDown.getVditor()
        vditor.setTheme('dark')
      }
      const radioChange = () => {
        if (resrouceType.value === 'video') {
          updateSchema({
            field: 'content',
            ifShow: false,
          })
        } else {
          updateSchema({
            field: 'content',
            ifShow: true,
          })
        }
        // fileUrl.value = []
      }

      const handleDoneVideo = (info) => {
        if (resrouceType.value === 'img') {
          fileUrlVideo.value.push(info.file.filePath)
        } else {
          fileUrlVideo.value = [info.file.filePath, info.file.picUrl]
        }
        fileDuration.value = info.file.duration
        console.log(fileUrl, 'url地址')
      }
      const handleDone = (info) => {
        if (resrouceType.value === 'img') {
          fileUrl.value.push(info.file.filePath)
        } else {
          fileUrl.value = [info.file.filePath, info.file.picUrl]
        }

        console.log(fileUrl, 'url地址')
      }
      const handerUpDel = (record) => {
        if (resrouceType.value === 'img') {
          console.log(record, 'img地址')
          fileUrl.value = fileUrl.value.filter((item) => item != record.url)
          // console.log(fileUrl.value)
        } else {
          fileUrlVideo.value = []
        }
      }

      const initCreateStudyCenterData = async () => {
        await opFormSbumitFunc()
        // const { code } adminHttp.CONTENTMENT.contentContentSave()
      }
      const handleSubmit = async (values: any) => {
        if (resrouceType.value === 'img') {
          if (!VoWangEditorRef.value.getHtml()) {
            createMessage.error('编辑器不能为空值')
            return false
          }
        }
        // 新增
        let map = {
          categoryIds: values.categoryIds,
          model: JSON.stringify(values.model),
          keyword: addList.value.toString(),
          duration: fileDuration.value,
          content:
            resrouceType.value === 'img'
              ? JSON.stringify({ json: VoWangEditorRef.value.getHtml() })
              : '{}',
          fileUrl:
            resrouceType.value === 'img' ? fileUrl.value.join(',') : fileUrlVideo.value.join(','),
          name: values.name,
          platformCode: values.platformCode,
          type: resrouceType.value === 'img' ? 1 : 2,
          isEnable: values.isEnable,
        }
        //编辑
        let editMap = {
          categoryId: values.categoryId,
          duration: fileDuration.value,
          model: JSON.stringify(values.model),
          keyword: tagsList.value.toString(),
          content:
            resrouceType.value === 'img'
              ? JSON.stringify({ json: VoWangEditorRef.value.getHtml() })
              : '{}',
          fileUrl:
            resrouceType.value === 'img' ? fileUrl.value.join(',') : fileUrlVideo.value.join(','),
          name: values.name,
          platformCode: values.platformCode,
          type: resrouceType.value === 'img' ? 1 : 2,
          isEnable: values.isEnable,
          id: route.query.id,
        }

        try {
          if (route.query.id) {
            map.id = route.query.id
            const { code } = await adminHttp.CONTENT.contentTechnicalModify(editMap)
            if (code == '20001') {
              createMessage.success('编辑成功')
              router.go(-1)
            } else {
              createMessage.error('编辑失败')
            }
          } else {
            const { code } = await adminHttp.CONTENT.contentTechnicalSave(map)
            if (code == '20001') {
              createMessage.success('创建成功')
              router.go(-1)
            } else {
              createMessage.error('创建失败')
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
      const createStudyCenterEvent = () => {
        initCreateStudyCenterData()
      }
      const cancelStepBeforePageFunc = () => {
        router.go(-1)
      }
      const getClassDataEvent = async () => {
        try {
          const map = { platformCode: 'garage', isEnable: true }
          const res = await adminHttp.CONTENT.contentTechnicalCategoryCondition(map)
          if (res.code === '20001') {
            classData.value = []
            classData.value = res.data.records.map((item) => ({
              label: item.name,
              value: item.id,
            }))
          } else {
            createMessage.error('操作失败')
          }
        } catch (err: any) {}
      }
      // const changeCodeEvent = (item, model) => {
      //   const map = { platformCode: 'garage' }
      //   model.categoryId = ''
      //   console.log(model.categoryId)
      //   getClassDataEvent(map)
      // }modelData
      const getModelDataDataEvent = async () => {
        try {
          const res = await adminHttp.GOODS.goodsModelSelectList({ pageSize: 999999 })
          if (res.code === '20001') {
            modelData.value = []
            modelData.value = res.data.map((item) => ({
              label: item.model,
              value: item.id,
            }))
          } else {
            createMessage.error('操作失败')
          }
        } catch (err: any) {}
      }
      return {
        handleDone,
        handleDoneVideo,
        handerUpDel,
        radioChange,
        register,
        createStudyCenterEvent,
        cancelStepBeforePageFunc,
        handleSubmit,
        // changeCodeEvent,
        fileImgUploadInfo,
        fileVideoUploadInfo,
        classData,
        fileUrl,
        resrouceType,
        uploadCommonParams,
        imgs,
        video,
        detail,
        VoWangEditorRef,
        toggleTheme,
        routeId,
        fileUrlVideo,
        fileDuration,
        modelData,
        inputRef,
        state,
        handleClose,
        showInput,
        nameInput,
        addList,
        handleInputConfirm,
        ...toRefs(state),
        tagsList,
        model,
      }
    },
  })
</script>
<style lang="less">
  .col-assets {
    width: 30%;
  }

  .detail-bg {
    overflow: scroll;
    height: calc(100vh - 126px);
    background: #fff;
    padding: 15px;
  }

  .detail-bg::-webkit-scrollbar-track {
    background-color: #fff;
  }

  .detail-bottom {
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    background: #fff;
    padding: 15px 0;
  }
</style>
