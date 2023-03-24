<template>

  <div class="mx-24px  mb-24px pt-70px">
    <div class="mb-24px bg-white p-24px pb-4px">
      <div class="mb-20px text-l ">
        <a-form
                layout="inline"
                :model="formState"
                name="basic"
                :label-col="{ style: { width: '100px' } }"
                :wrapper-col="{ span: 20 }"
                autocomplete="off"
        >
          <a-form-item label="账期额度" >
            <a-input-group compact>
              <a-input-number v-model:value="formState.amount" min="0" max="99999999.99"  style="width: calc(100% - 100px)" />
              <a-button @click="save('amount')" >保存</a-button>
            </a-input-group>
          </a-form-item>
          <a-form-item label="账期系数" >
            <a-input-group compact>
              <a-input-number v-model:value="formState.coefficient" min="0" max="1" style="width: calc(100% - 100px)" />
              <a-button  @click="save('coefficient')">保存</a-button>
            </a-input-group>
          </a-form-item>
          <a-form-item label="状态" >
             {{formState.statusStr}}
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total"></EraTableTitle>
      <div>
        <div class=" mt-10px">
          <a-radio-group  v-model:value="subType" @change="radioChange">
            <a-radio-button :value="1">账期额度</a-radio-button>
            <a-radio-button :value="2">账期系数</a-radio-button>
          </a-radio-group>
        </div>

        <ATable
                :loading="tableLoading"
                :columns="paymentDaysColumns"
                :data-source="tableData"
                :pagination="false"
                size="small"
                :scroll="{ x: 1200 }"
                bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'type'">
              <p>{{subType == 1?'账期额度':'账期系数'}}</p>
            </template>
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

  </div>

</template>

<script lang="ts" setup>
  import {defineComponent, ref, reactive, createVNode, onBeforeMount} from 'vue';
  import {Modal} from 'ant-design-vue';
  import {useRoute} from 'vue-router'
  import {useMessage} from '/@/hooks/web/useMessage'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import {paymentDaysColumns, MockTableData} from '../data/configuration'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const {createMessage} = useMessage();

  // --------公用参数---------------
  const route = useRoute(); // 获取传过来参数
  const Form = ref();

  // 账期设置
  const formState = reactive({
    amount:0,
    coefficient:1, // todo 系数暂时先不做等产品确认
    companyId:route.query.id,

    statusStr:''
  })
  const save =  (type) =>{
    if(type == 'amount'){
      quotaAdd()
    }else {
      quotaCoefficientSave()
    }
  }
  const quotaAdd = async ()=>{
    try {
      const params = {
        amount:formState.amount,
        companyId:formState.companyId
      }
      const {code} = await AdminHttp.QUOTA.quotaAdd(params);
      if(code === '20001'){
        createMessage.success('保存成功');
        paginations.current = 1;
        loadTableData()
      }
    }catch (e) {
      console.log(e)
    }
  }
  const quotaCoefficientSave = async ()=>{
    try {
      const params = {
        coefficient:formState.coefficient,
        companyId:formState.companyId
      }
      const {code} = await AdminHttp.QUOTA.quotaCoefficientSave(params);
      if(code === '20001'){
        createMessage.success('保存成功');
        paginations.current = 1;
        loadTableData()
      }
    }catch (e) {
      console.log(e)
    }
  }

  const getDetail = async () =>{
    // quotaGetBy$CompanyId
    try {
      const params = {
        companyId:formState.companyId
      }
      const {code,data} = await AdminHttp.QUOTA.quotaGetBy$CompanyId(params);
      if(code === '20001'){
        formState.amount = data.amount
        formState.coefficient = data.coefficient
        formState.statusStr = data.status?'逾期':'正常'


      }
    }catch (e) {
      console.log(e)
    }
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
  const subType = ref(1)
  const loadTableData = async () => {
    try {
      tableLoading.value = true;
      let params = {
        companyId:route.query['id'],
        subType:subType.value, // 主体类型（1-额度；2-系数）
        pageNo:paginations.current,
        pageSize:paginations.pageSize,
      };
      const {code, data} = await AdminHttp.QUOTA.quotaRecordPage(params);
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
  const radioChange = ()=>{
    paginations.current = 1;
    loadTableData()
  }
  onMountedOrActivated(() => {
    getDetail()
    loadTableData()
    // 初始化数据
    //let key = 'one';
    // route.query['type'] === '1'?key = 'one':key = 'two';
    // tabsChange(key)
    // console.log(route.query['type'])
  })


</script>

<style scoped lang="less">

</style>
