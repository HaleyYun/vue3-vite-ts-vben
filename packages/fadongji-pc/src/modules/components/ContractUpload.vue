<template>
  <a-modal
          v-model:visible="modalData.visible"
          :style="{ top: '40px' }"
          width="600px"
          title="上传/更换合同"
          @cancel="closeHandler"
          @ok="okHandler"
  >

    <div class="py-24px">
      <a-form  :model="modalData" ref="formRef" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="合同有效期"
                     name="filePath"
                     ref="filePath"
                     :rules="[{ required: true, message: '请选择合同',trigger: 'change' }]"
        >
          <a-upload
                  v-model:file-list="fileList"
                  :custom-request="uploadFile"
                  :before-upload="beforeUpload"
                  :max-count="1"
                  :accept="accept"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              选择文件
            </a-button>
            <template #itemRender="{ file, actions }">
              <a-space class="ml-10px filePath " v-if="modalData.filePath">
                <a  class="max-w-200px truncate inline-block	" :style="file.status === 'error' ? 'color: red' : ''">{{ modalData.fileName }}</a>
                <span  class="text-red-500 deleteFile"  @click="deleteFile">删除</span>
              </a-space>
            </template>
          </a-upload>

        </a-form-item>
        <a-form-item label="合同有效期"    :rules="[{ required: true, message: '请填写合同有效期' }]">
          <div class="flex ">
            <div>
              <a-form-item
                      name="validityStartTime"
                      :rules="[{ required: true, message: '请输入开始时间', trigger: 'change' }]"
              >
                <a-date-picker
                        :value-format="dateFormat"
                        :format="dateFormat"
                        :disabled-date="startDisabledDate"
                        style="width: 100%"
                        v-model:value="modalData.validityStartTime"
                />
              </a-form-item>
            </div>
            <div class="px-10px pt-5px">至</div>
            <div>
              <a-form-item
                      name="validityEndTime"
                      :rules="[{ required: true, message: '请输入结束时间', trigger: 'change' }]"
              >
                <a-date-picker
                        :value-format="dateFormat"
                        :format="dateFormat"
                        :disabled-date="endDisabledDate"
                        style="width: 100%"
                        v-model:value="modalData.validityEndTime"
                />
              </a-form-item>
            </div>
          </div>
        </a-form-item>
      </a-form>
    </div>

  </a-modal>


</template>

<script lang="ts" setup>
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import {defineComponent, ref,defineProps,watch} from 'vue';
  const emits = defineEmits(['success', 'update:contract'])
  const props = defineProps({
    contract: {
      type: Object,
      default: {filePath:'',fileName:'',visible:false,validityStartTime:null,
        validityEndTime:null,},
    },
    accept: {
      type: String,
      default: '.pdf,.PDF',
    },
  })

  const formRef = ref();
  const modalData = ref(props.contract);
  const fileList = ref([]);
  const dateFormat = 'YYYY-MM-DD'
  const startDisabledDate = (current) =>{
     if(modalData.value.validityEndTime){
        return new Date(current.$d).getTime() >=  new Date(modalData.value.validityEndTime).getTime()
     }else {
       return false
     }
  }
  const endDisabledDate = (current) =>{
    if(modalData.value.validityStartTime){
      return new Date(current.$d).getTime() <=  new Date(modalData.value.validityStartTime).getTime()
    }else {
      return false
    }
  }

  const closeHandler = () =>{
    modalData.value.visible = false;
  }
  const okHandler = async () =>{
    try {
      const res =  await formRef.value.validateFields();
      console.log(res)
      if(res){
        emits('success', modalData.value)
        emits('update:contract', modalData.value)
      }
    }catch (e) {
      console.log(e)
    }

  }

  // 上传文件
  const loading = ref(false);
  const beforeUpload = (file) => {
    console.log(file)
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('只允许PDF格式上传!')
    }

    return isPDF
  };
  const deleteFile = () => {
    modalData.value.filePath = ''
    modalData.value.fileName = ''
  }
  const uploadFile = async ({ file, onSuccess }) => {
    // 自定义上传
    const formData: any = new FormData()
    formData.append('file', file)
    console.log(file)
    try {
      loading.value = true
      const { data, code } = await AdminHttp.FILE.fileFileUpload(formData)
      loading.value = false
      if (+code === 20001) {
        message.success('文件上传成功')
        modalData.value.filePath = data.filePath;
        modalData.value.fileName = data.fileName;
        onSuccess({ url: data.filePath }, file)
      }
    } catch (e) {
      message.warning('上传失败')
    }
  }



  watch(
      () => props.contract,
      (val) => {
        modalData.value = val;
        if(modalData.value.filePath){
          fileList.value = [{name:modalData.value.fileName,url:modalData.value.filePath}]
        }
      },
  )

</script>

<style scoped lang="less">
  ::v-deep(.ant-form-item-control-input-content>span) {
    display: flex;
    align-items: center;
  }
  .filePath{

    .deleteFile{
      display: none;
    }
  }
  .filePath:hover{
    .deleteFile{
      display: inline-block;
    }
  }

</style>
