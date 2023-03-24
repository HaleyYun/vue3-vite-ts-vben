<template>
  <BasicModal
          v-bind="$attrs"
          @register="register"
          title="关联修理厂"
          :width="1000"
          :canFullscreen="false"
          @visible-change="handleVisibleChange"
          @ok="handleOK"
  >
    <div class="pt-3px pr-3px ">
      <BasicForm @register="registerForm" :model="model"  @submit="handlerSubmit"
                 @reset="handlerRest" />
      <div >
        <ATable
                :loading="tableLoading"
                :row-selection="{ selectedRowKeys: selectedRow, onChange: onSelectChange }"
                :rowKey="(record) => record.companyId"
                :columns="aboutColumns"
                :data-source="tableData"
                :pagination="false"
                size="small"
                bordered
        >
          <template #bodyCell="{ column, text, record }">
          </template>
        </ATable>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
                :size="'default'"
                :total="paginations.total"
                :current="paginations.current"
                :page-size="paginations.pageSize"
                @pagination="paginationChange"
        />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref,reactive, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import AdminHttp from '/@/utils/http/adminHttp'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import {useMessage} from '/@/hooks/web/useMessage'
  const {createMessage} = useMessage();
  const schemas: FormSchema[] = [
    {
      field: 'companyId',
      component: 'Input',
      label: '修理厂id',
      componentProps: {
        placeholder: '请输入修理厂id',
      },
    },
    {
      field: 'companyName',
      component: 'Input',
      label: '修理厂名称',
      componentProps: {
        placeholder: '请输入修理厂名称',
      },
    },
  ];
  const aboutColumns = [
    {
      title: '修理厂ID' ,
      dataIndex: 'companyId',
      ellipsis: true,
    },
    {
      title: '修理厂名称',
      dataIndex: 'storeName',
      ellipsis: true,
    },
  ];
  export default defineComponent({
    components: { BasicModal, BasicForm,VoPagination },
    emits: ['update'],
    setup(props, { emit }) {
      const propsId = ref<string>('');
      const bindingType = ref(3) // 绑定类型（1：从属关系（渠道经理，招商经理），2：分佣关系（服务商邀请修理厂），3：普通邀请关系（通用二维码邀请））
      const modelRef = ref({});
      const [registerForm, {getFieldsValue}
      ] = useForm({
        labelWidth: 90,
        schemas,
        baseColProps: { span: 9 },
        actionColOptions: {
          span: 6,
        },
      });

      const [register, { closeModal, setModalProps }]= useModalInner((data) => {
        propsId.value = data.id
        bindingType.value = data.bindingType
        selectedRow.value = []
        loadTableData()
      });

      function handleOK(v) {
        console.log('333333')
        if(selectedRow.value.length == 0){
          createMessage.error('请选择修理厂！');
          return;
        }
        bindingCompany()
      }
      const bindingCompany = async ()=> {
        try {
          // inviteeId 被绑定人企业ID 列表选择的那个  inviterId	绑定人企业ID
          let params = {bindingType:bindingType.value,inviteeId:selectedRow.value[0],inviterId:propsId.value}
          const {code} = await AdminHttp.COMPANY.companyInfoBind(params);
          if(code === '20001'){
            createMessage.success('绑定成功');
            closeModal()
            emit('update')
          }
        }catch (e) {
          console.log(e)
        }
      }

      const handleVisibleChange =(v) => {
        console.log(v)
      }

      //---- 全选 复选框选择 ------
      const selectedRow = ref([])
      const onSelectChange = (selectedRowKeys: string[], selectedRows: object[]) => {
        selectedRow.value = selectedRowKeys.length > 0?[selectedRowKeys[selectedRowKeys.length-1]]:[]
      }
      // 搜索
      const filterData = ref({});
      const handlerRest = () => {
        filterData.value = {}
        loadTableData()
      };
      const handlerSubmit = (values) => {
        filterData.value = values;
        loadTableData()

      }
      //--- 分页查询 ------
      const paginations = reactive({
        current: 1,
        pageSize: 10,
        total: 0
      });
      const paginationChange = ({current, pageSize}) => {
        paginations.current = current
        paginations.pageSize = pageSize
        loadTableData()
      };

      // 加载数据
      const tableLoading = ref(false);
      const tableData = ref([]);
      const loadTableData = async () => {
        try {
          tableLoading.value = true;
          let params = {
            ...filterData.value,
            platformCode:'garage',
            pageNo: paginations.current,
            pageSize:paginations.pageSize
          };
          const {code, data} = await AdminHttp.COMPANY.companyInfoGarageNotBindPage(params);
          console.log(tableData)
          if (code === '20001') {
            tableData.value = data.records?data.records:[];
            paginations.total = data.total;
            // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
            if (paginations.current > 1 && tableData.value.length === 0) {
              paginations.current = paginations.current - 1;
              loadTableData()
            }
          }
          tableLoading.value = false;

        } catch (e) {
          console.log(e)
          tableLoading.value = false;
        }
      };

      return {
        schemas,
        register,
        registerForm,
        model: modelRef,
        handlerRest,
        handlerSubmit,
        handleVisibleChange,
        handleOK,
        tableLoading,
        tableData,
        paginations,
        aboutColumns,
        selectedRow,
        onSelectChange,

        paginationChange,
      };
    },
  });
</script>
