<template>
  <div class="mx-24px  mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <SearchForm @rest="handlerRest" @submit="handlerSubmit"></SearchForm>
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total"></EraTableTitle>

      <div >
        <ATable
                :loading="tableLoading"
                :columns="tableColumns"
                :data-source="tableData"
                :pagination="false"
                size="small"
                :scroll="{ x: 1200 }"
                bordered
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'operation'">
              <APopconfirm
                      title="确定取消关联？"
                      ok-text="是"
                      cancel-text="否"
                      @confirm="cancelBinding(record)"
              >
                <AButton type="link" size="small" >取消绑定关系</AButton>
              </APopconfirm>


            </template>
          </template>
        </ATable>
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

<script>
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import {useRouter,useRoute} from 'vue-router'
  import {tableAgentColumns,tableGarageColumns} from './data/configuration.ts'
  import SearchForm from "./component/SearchForm.vue";
  import AdminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  const { createMessage } = useMessage()

  export default {
    name: "AdministErgarage",
    components: {SearchForm, EraTabs, VoPagination, EraTableTitle},
    data() {
      return {
        activeKey: 'one',
        selectedRow: [],
        confirmLoading:false,
        tableLoading: false,
        tableColumns: [],
        tableData: [],
        filterData:{},
        router: useRouter(),
        route:useRoute(),
        paginations: {
          total: 0,
          pageNo: 1,
          pageSize: 10
        },
      }
    },
    methods: {


      // 取消绑定
      async cancelBinding (record) {
        try {
          // inviteeId 被绑定人企业ID  被绑定人是当前列表的 服务商 修理厂等角色
          // inviterId 绑定人企业ID 绑定人是招商经理渠道经理等角色
          let params = {inviteeId:record.companyId,inviterId:this.route.query['id']}
          const {code} = await AdminHttp.COMPANY.CompanyInfoManagerUnbind(params);
          if(code === '20001'){
            createMessage.success('操作成功');
            this.loadTableData();
          }
        }catch (e) {
          console.log(e)
        }
      },



      // 重置
      handlerRest(values) {
        this.paginations.pageNo = 1;
        this.filterData = {
          ...values,
        };
        this.loadTableData()
      },
      // 搜索
      handlerSubmit (values) {
        this.paginations.pageNo = 1;
        console.log(values)
        this.filterData = {
          ...values,
        };
        this.loadTableData()
      },
      // 分页查询
      paginationChange({ current, pageSize }) {
        this.paginations.pageNo = current;
        this.paginations.pageSize = pageSize;
        this.loadTableData()
      },

      async loadTableData () {
        try {
          this.tableLoading = true;
          // supplier  供应商 agent  服务商  garage  修理厂
          let platformCode = this.route.query['type']
          let params = {
            platformCode:platformCode,
            companyId:this.route.query['id'],
            ...this.filterData,
            ...this.paginations,
          };
          const { code, data } = await AdminHttp.COMPANY.CompanyInfoManagerRelationPage(params)

          if (code === '20001') {
            this.tableData = data.records?data.records:[];
            this.paginations.total = data.total;

            // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
            if (this.paginations.pageNo > 1 && this.tableData.length === 0) {
              this.paginations.pageNo = this.paginations.pageNo - 1;
              this.loadTableData()
            }
          }
          this.tableLoading = false
        } catch (e) {
          console.log(e)
          this.tableLoading = false
        }
      },

    },
    mounted(){
      this.tableColumns = this.route.query['type'] == 'garage'?tableGarageColumns:tableAgentColumns;
      this.loadTableData()
    }
  }
</script>

<style scoped lang="scss">


</style>
