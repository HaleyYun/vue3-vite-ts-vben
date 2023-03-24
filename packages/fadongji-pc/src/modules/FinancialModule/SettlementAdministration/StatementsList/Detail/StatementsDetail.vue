<template>
  <div class="bg-white  h-100vh m-24px p-24px overflow-y-auto">
    <div>
      <div class="p-20px">
        <PayInfo :descData="payInfoDesc" :payInfo="payInfo"></PayInfo>
      </div>
    </div>
    <div>
      <div class="template--title mb-20px ">关联订单</div>
      <div>
       <div class="w-full flex items-contents head-style">
         <div class="p-16px headItem" v-for="(item,index) of tableColumns" :key="index+'order'"
              :style="{ width: item.width}" >
           {{item.title}}
         </div>
       </div>
        <TableList v-for="(item,index) of tableData" :key="index+'order'" :tab-data="item" :type="payInfo.type"  ></TableList>
        <a-empty class="pt-40px" v-if="tableData.length == 0" />

      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
                :size="'default'"
                :total="paginations.total"
                :current="paginations.pageNo"
                :page-size="paginations.pageSize"
                @pagination="paginationChange"
        />
      </div>

    </div>
  </div>

</template>

<script lang="ts" setup>
  import {defineComponent, ref,reactive,onBeforeMount} from 'vue';
  import PayInfo from './components/PayInfo.vue'
  import TableList from './components/tableList.vue'
  import {payInfoDesc} from './data/configuration'
  import AdminHttp from '/@/utils/http/adminHttp'
  import {tableColumns,MockTableData} from './data/configuration'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import {useRoute} from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";
  const route = useRoute(); // 获取参数



  //--- 分页查询 ------
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0
  });
  const paginationChange = ({current, pageSize}) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadTableData()
  };

  // 加载数据
  const tableLoading = ref(false);
  const tableData = ref([]);
  const payInfo = ref({})
  const loadTableData = async () => {
    try {
      tableLoading.value = true;
      let params = {
        id:route.query.id,
        ...paginations,
      };
      const {code, data} = await AdminHttp.FINANCE.financeBillManageBy$id(params);
      if (code === '20001') {
        // type 11销售 orderSellPage 12投资 billOrderInvestVOPage 13旧机 billOrderOldVOPage
        if(data.type == 11){
          tableData.value = data.orderSellPage?data.orderSellPage.records:[];
          paginations.total = data.orderSellPage.total;
        }else if(data.type == 12){
          tableData.value = data.billOrderInvestVOPage?data.billOrderInvestVOPage.records:[];
          paginations.total = data.billOrderInvestVOPage.total;
        }else {
          tableData.value = data.billOrderOldVOPage?data.billOrderOldVOPage.records:[];
          paginations.total = data.billOrderOldVOPage.total;
        }

        // 这个是mock数据
        //tableData.value = MockTableData;
        payInfo.value = data;
      }
      tableLoading.value = false;

    } catch (e) {
      console.log(e)
      tableLoading.value = false;
    }
  };

  onMountedOrActivated(() => {
    loadTableData()
  })



</script>

<style scoped lang="less">
  .head-style{
    text-align: left;
    border: 1px solid #f0f0f0;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    .headItem{
      border-right: 1px solid #f0f0f0;
      border-top-left-radius: 2px;
      position: relative;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      font-weight: bold;
      text-align: left;
      background: #fafafa;
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.3s ease;
      overflow-wrap:break-word;

    }
  }

</style>
