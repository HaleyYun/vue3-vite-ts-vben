<template>
  <div class="mx-24px mb-20px">
    <div class="my-20px bg-white p-10px">
      <div>
        <a-descriptions title="保证金明细">
          <a-descriptions-item :label="companyInfo.platformName" :span="1">
            {{ companyInfo.companyName }}
          </a-descriptions-item>
          <a-descriptions-item label="总金额">
            <div class="text-red-500 text-18px"> {{ companyInfo.totalAmount }}元</div>
          </a-descriptions-item>
          <a-descriptions-item label="最后更新时间">
            {{ companyInfo.lastUpdateTime }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total">
        <template #tableEdit></template>
      </EraTableTitle>
      <div>
        <ATable
          :loading="tableLoading"
          :columns="tableColumns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :scroll="{ x: 1200 }"
          bordered
        >
          <!-- <template #bodyCell="{ column, text, record }">
			<template v-if="column.dataIndex === 'operation'">
	  
			</template>
		  </template> -->
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
  import { ref, reactive, onBeforeMount } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { tableColumns } from './data/configuration'
  import { useRoute } from 'vue-router'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  const route = useRoute()
  // ------操作按钮----------
  //------ 分页查询 -----------------
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
  })

  const companyInfo = reactive({
    platformName: '',
    companyName: '',
    totalAmount: '',
    lastUpdateTime: '',
  })

  // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //----- 加载列表数据 ---------
  const tableLoading = ref(false)
  const tableData = ref([])
  // const platformCode = 'investmentManager'
  const loadTableData = async () => {
    try {
      tableLoading.value = true
      let params = {
        companyId: route.query?.id,
        ...paginations,
        pageSize: paginations.pageSize,
        pageNo: paginations.pageNo,
      }
      const { code, data } = await AdminHttp.FINANCE.financeMarginDetail(params)
      console.log(tableData)
      if (code === '20001') {
        tableData.value = data.mariginItems.records
        paginations.total = data.mariginItems.total
        companyInfo.companyName = data.companyName
        companyInfo.platformName = data.platformName
        companyInfo.totalAmount = data.totalAmount
        companyInfo.lastUpdateTime = data.lastUpdateTime

        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.pageNo > 1 && tableData.value.length === 0) {
          paginations.pageNo = paginations.pageNo - 1
          await loadTableData()
        }
      }
      tableLoading.value = false
    } catch (e) {
      console.log(e)
      tableLoading.value = false
    }
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style scoped lang="less">
  .orderTitle {
    padding: 0 16px;
    position: fixed;
    z-index: 999;
    /* width: 100%; */
    width: calc(100% - 210px);
    top: 48px;
    flex: 0 0 auto;
    transition: width 0.2s;
  }
</style>
