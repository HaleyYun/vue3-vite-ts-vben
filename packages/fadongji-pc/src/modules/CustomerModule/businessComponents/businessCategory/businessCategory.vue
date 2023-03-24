<template>
    <div class="category">
        <div class="category-item">
            <div class="category-label">已授权品类：</div>
            <div class="category-content">
               <a-button @click="addCategory">
                   <template #icon><plus-outlined /></template>
                   添加授权品类
               </a-button>
               <ACard :loading="loading" size="small"  class="card-style">
                   <a-tag v-for="(item,index) of info.certificationCategory" :key="index">{{item.name}}</a-tag>
               </ACard>
            </div>
        </div>
        <div class="category-item">
            <div class="category-label">已授权品牌：</div>
            <div class="category-content">
                <a-button @click="addBand" class="mb-24px">
                    <template #icon><plus-outlined /></template>
                    添加授权品牌
                </a-button>
                <a-table :columns="brandColumns" bordered :data-source="info.certificationBrand" :pagination="false">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'logoUrl'">
                            <a-image  :preview="{src: record.logoUrl}" :width="40" :height="40" :src="record.logoUrl+'&type=2'"></a-image>
                        </template>
                    </template>
                </a-table>

            </div>
        </div>
        <a-modal
                v-model:visible="visible"
                title="添加品类"
                centered
                destroy-on-close
                :confirmLoading="loading"
                @cancel="modalCloseHandler"
                width="550px"
                @ok="submitHandler"
        >
            <div class="p-3">
                <a-form
                        :model="postForm"
                        name="postForm"
                        :label-col="{ span: 6 }"
                        :wrapper-col="{ span: 16 }"
                        autocomplete="off"
                        ref="postFormRef"
                >
                    <a-form-item
                            label="品类名称"
                            name="categoryId"
                            :rules="[{ required: true, message: '请选择品类名称', trigger: 'change' }]"
                    >
                        <a-cascader
                                v-model:value="postForm.categoryId"
                                style="width: 100%"
                                :field-names="{ label: 'name', value: 'id',children: 'children', }"
                                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                placeholder="请选择品类名称"
                                :options="treeCateFormData"
                        />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
        <a-modal
                v-model:visible="bandVisible"
                title="添加品牌"
                centered
                destroy-on-close
                :confirmLoading="loading"
                @cancel="bandCloseHandler"
                width="550px"
                @ok="bandSubmitHandler"
        >
            <div class="p-3">
                <a-form
                        :model="bandForm"
                        name="bandForm"
                        :label-col="{ span: 6 }"
                        :wrapper-col="{ span: 16 }"
                        autocomplete="off"
                        ref="bandFormRef"
                >
                    <a-form-item
                            label="品类名称"
                            name="categoryId"
                            :rules="[{ required: true, message: '请选择品类名称', trigger: 'change' }]"
                    >
                        <a-select
                                v-model:value="bandForm.categoryId"
                                style="width: 100%"
                                placeholder="请选择品类名称"
                                option-label-prop="children"
                        >
                            <a-select-option v-for="(item,index) of bandData" :key="'select'+index" :value="item.id" :label="item.name">
                                <div class="flex items-center" :aria-label="item.id">
                                    <img style="width: 20px;height: 20px"  :src="item.logoUrl+'&type=2'" />
                                    &nbsp;&nbsp;{{ item.name }}
                                </div>
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>

</template>

<script lang="ts" setup>
    import {ref,reactive,onBeforeMount} from 'vue';
    import adminHttp from '/@/utils/http/adminHttp'
    import { PlusOutlined} from '@ant-design/icons-vue';
    import {useMessage} from '/@/hooks/web/useMessage'
	import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
    const { createMessage } = useMessage();
    const brandColumns =  [
      {
        title: '品牌名称',
        dataIndex: 'name',
      },
      {
        title: '品牌logo',
        dataIndex: 'logoUrl',
      },
      // {
      //   title: '资质文件',
      //   dataIndex: 'action',
      //   width: '250px',
      // },
    ]

    const info = ref({certificationCategory:[],certificationBrand:[]})
    const loading = ref(false);

    // GoodsCertificationBrandInfo
    const props = defineProps({
        id: {
            type: String,
            default: '',
        },
    });
    const getInfo = async ()=>{
      const {code,data}  = await adminHttp.CUSTOMER.GoodsCertificationBrandInfo({id:props.id});
      if(code == '20001'){
        info.value = data;
      }
    };


    // -----添加品类---------
    const postFormRef = ref();
    const visible = ref(false)
    const treeCateFormData = ref([])
    const postForm = reactive({categoryId:null})
    const addCategory = ()=>{
      postForm.categoryId = null
      goodsCategoryCategoryAdd()
      visible.value = true;
    }
    const goodsCategoryCategoryAdd = async ()=>{
      try {
        const {code,data}  = await adminHttp.GOODS.goodsCategoryCategoryAdd({shopId:props.id});
        if(code == '20001'){
          treeCateFormData.value = data;
        }
        console.log(data)
      }catch (e) {
        console.log(e)
      }
    }
    //关闭弹出框
    const modalCloseHandler = ()=>{
      visible.value = false
    }
    const submitHandler = async ()=>{
      try {
        const values = await postFormRef.value.validateFields();
        console.log(values)
        if(values){
          CategoryAdd()
        }
      } catch (errorInfo) {
        console.log('Failed:', errorInfo);
      }

    }
    // goodsCategoryCertificationCategoryAdd
    const CategoryAdd = async ()=>{
      try {
        let ids = postForm.categoryId[postForm.categoryId.length -1]
        let params = {ids:[ids],shopId:props.id}
        const {code,data} = await adminHttp.GOODS.goodsCategoryCertificationCategoryAdd(params)
        if(code == '20001'){
          visible.value = false
          createMessage.success('添加成功')
          getInfo()

        }
      }catch (e) {
        console.log(e)
      }
    }

    // -----添加品牌-------
    const bandFormRef = ref();
    const bandVisible = ref(false)
    const bandData = ref([])
    const bandForm = reactive({categoryId:null})
    const addBand = ()=>{
      bandForm.categoryId = null
      goodsBandAdd()
      bandVisible.value = true;
    }
    const goodsBandAdd = async ()=>{
      try {
        const {code,data}  = await adminHttp.GOODS.goodsBrandBrandAdd({shopId:props.id});
        if(code == '20001'){
          bandData.value = data;
        }
        console.log(data)
      }catch (e) {
        console.log(e)
      }
    }
    //关闭弹出框
    const bandCloseHandler = ()=>{
      bandVisible.value = false
    }
    const bandSubmitHandler = async ()=>{
      try {
        const values = await bandFormRef.value.validateFields();
        console.log(values)
        if(values){
          BnadAdd()
        }
      } catch (errorInfo) {
        console.log('Failed:', errorInfo);
      }

    }
    // goodsCategoryCertificationCategoryAdd
    const BnadAdd = async ()=>{
      try {
        let params = {ids:[bandForm.categoryId],shopId:props.id}
        const {code,data} = await adminHttp.GOODS.goodsCertificationBrandBrandAdd(params)
        if(code == '20001'){
          bandVisible.value = false
          createMessage.success('添加成功')
          getInfo()

        }
      }catch (e) {
        console.log(e)
      }
    }

	onMountedOrActivated(()=>{
      getInfo();
    })



</script>

<style scoped lang="less">

    .category{
       width: 80%;
        .card-style{
          margin-top: 24px;
          min-height: 70px;
        }
        .grid{
            width: 25%;
            text-align: center;
            margin: 15px;
        }
        .category-item{
            display: flex;
            margin-bottom: 30px;
            .category-label{
                font-weight: 400;
                font-size: 14px;
                line-height: 22px;
                text-align: right;
                color: #262626;
                width: 90px;
            }
            .category-content{
                width: calc(100% - 90px);
                text-align: left;
            }
        }

    }

</style>
