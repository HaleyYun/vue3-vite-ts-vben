<template>
  <div>
    <ATable
            :columns="tableColumns"
            :data-source="tableData"
            :pagination="false"
            size="small"
            bordered
    >
      <template #bodyCell="{ column, text, record }">
      </template>
    </ATable>
  </div>

</template>

<script lang="ts" setup>
  import {defineComponent, ref,watch,defineProps} from 'vue';
  import AdminHttp from '/@/utils/http/adminHttp'

  const props = defineProps({
    companyId: {
      type: String,
      default: '',
    },
  });
  const tableColumns = [
    {
      title: '收货人' ,
      dataIndex: 'name',
      ellipsis: true,
      align:'center',
      width:200,
    },
    {
      title: '电话',
      dataIndex: 'mobile',
      align:'center',
      ellipsis: true,
    },
    {
      title: '地址',
      dataIndex: 'address',
      align:'center',
      ellipsis: true,
      width:200
    },
  ]
  const tableData = ref([])
  const getAddress = async() => {
    try {
      let params = {companyId:props.companyId}
      const { code, data } = await AdminHttp.COMPANY.receiverAddressList(params)
      if (code === '20001') {
        tableData.value = data?data:[];
      }
    } catch (e) {
      console.log(e)
    }

  }
  watch(()=>props.companyId,(newValue)=>{

    getAddress()
  },{deep: true, immediate: true})




</script>

<style scoped lang="less">

</style>
