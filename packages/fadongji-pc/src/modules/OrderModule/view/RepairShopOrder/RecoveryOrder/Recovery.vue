<template>
 <div>
  <div>
    <EraTabs :tabsList="tabsList" :tabsactive="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="mx-24px mt-72px mb-24px">
    <div class="my-24px bg-white p-24px pb-4px">
      <RecoveryFilterForm @rest="handlerRest" @submit="handlerSubmit" />
    </div>
    <div class="p-24px bg-white">
      <EraTableTitle :total="paginations.total" />
      <div>
        <table class="w-full">
          <tbody>
            <tr class="flex">
              <th class="flex-1" style="flex: 2">回收服务名称</th>
              <th class="flex-1">服务价格</th>
              <th class="flex-1">上门时间</th>
              <th class="flex-1">修理厂</th>
              <th class="flex-1">集师傅</th>
              <th class="flex-1">回收公司</th>
              <th class="flex-1">订单状态</th>
              <th class="flex-1">操作</th>
            </tr>
          </tbody>
        </table>
        <div v-for="(item, index) in tableData" :key="index" class="order-body">
          <table class="body_top">
            <tbody>
              <div class="body_top_con">
                <div class="top_con_shop">
                  <span class="ml-4">订单号：{{ item['id'] }}</span>
                  <span class="top_con_time ml-4">下单时间：{{ item['createTime'] }}</span>
                  <span
                    v-if="item.supportType === 33 && item.relationOrderId != '0'"
                    class="top_con_time ml-30"
                  >
                    关联订单号：<a @click="goRelation(item)">{{ item['relationOrderId'] }}</a>
                  </span>
                </div>
              </div>
            </tbody>
          </table>
          <table style="width: 100%">
            <tbody>
              <tr class="body_content">
                <!-- <template v-for="order in item.goodsDetail" :key="order.id"> -->
                <td
                  class="flex justify-center items-center"
                  colspan=""
                  headers=""
                  rowspan=""
                  style="flex: 2"
                >
                  <div>{{ item.supportName }}</div>
                </td>
                <td :rowspan="1" class="body_content_handle" colspan="" headers="">
                  <div>{{ item.supportAmount }}元</div>
                </td>
                <td colspan="" :rowspan="1" headers="" class="body_content_handle">
                  <div v-html="doorTime(item.homeStartTime, item.homeEndTime)"></div>
                </td>
                <!-- </template> -->

                <td :rowspan="1" class="body_content_handle" colspan="" headers="">
                  <div>{{ item['buyerName'] }}</div>
                </td>
                <td :rowspan="1" class="body_content_handle" colspan="" headers="">
                  <div>{{ item.orderTechnicianVO?.masterName }}</div>
                  <div>{{ item.orderTechnicianVO?.phone }}</div>
                </td>
                <td :rowspan="1" class="body_content_handle" colspan="" headers="">
                  <div>{{ item['shopName'] }}</div>
                </td>
                <td colspan="" :rowspan="1" headers="" class="body_content_handle">
                  <template v-if="item.status === 3310">
                    <div>待付款</div>
                  </template>
                  <template v-else-if="item.status === 3320">
                    <div>待质检</div>
                  </template>
                  <template v-else-if="item.status === 3330">
                    <div>待接单</div>
                  </template>
                  <template v-else-if="item.status === 3331">
                    <div>待指派</div>
                  </template>
                  <template v-else-if="item.status === 3340">
                    <div>待上门</div>
                  </template>
                  <template v-else-if="item.status === 3350">
                    <div>回收中</div>
                  </template>
                  <template v-else-if="item.status === 3351">
                    <div>待寄回</div>
                  </template>
                  <template v-else-if="item.status === 3352">
                    <div>待收货</div>
                  </template>
                  <template v-else-if="item.status === 3360">
                    <div>已完成</div>
                  </template>
                  <template v-else-if="item.status === 3370">
                    <div>已取消</div>
                  </template>
                  <template v-else-if="item.status === 3380">
                    <div>已关闭</div>
                  </template>
                </td>
                <td :rowspan="1" class="body_content_handle" colspan="" headers="">
                  <div style="flex-direction: column">
                    <template v-if="item.status === 3331">
                      <AButton
                        v-auth="'/v1/order/assign/assign'"
                        type="link"
                        @click="goDetails(item)"
                        >指派接单</AButton
                      >
                      <AButton
                        v-auth="'/v1/order/recycle/update'"
                        type="link"
                        @click="goDetails(item)"
                        >修改订单</AButton
                      >
                      <AButton
                        v-auth="'/v1/order/recycle/detail'"
                        type="link"
                        @click="goDetails(item)"
                        >详情</AButton
                      >
                    </template>
                    <template v-else-if="item.status === 3330">
                      <AButton
                        v-auth="'/v1/order/assign/assign'"
                        type="link"
                        @click="goDetails(item)"
                        >指派接单</AButton
                      >
                      <AButton
                        v-auth="'/v1/order/recycle/detail'"
                        type="link"
                        @click="goDetails(item)"
                        >详情</AButton
                      >
                    </template>
                    <template v-else-if="item.status === 3340">
                      <AButton
                        v-auth="'/v1/order/assign/assign'"
                        type="link"
                        @click="goDetails(item)"
                        >改派</AButton
                      >
                      <AButton
                        v-auth="'/v1/order/recycle/update'"
                        type="link"
                        @click="goDetails(item)"
                        >修改订单</AButton
                      >
                      <!-- <AButton type="link" @click="goDetails(item)">取消订单</AButton> -->
                      <AButton
                        v-auth="'/v1/order/recycle/detail'"
                        type="link"
                        @click="goDetails(item)"
                        >详情</AButton
                      >
                    </template>
                    <template v-else>
                      <AButton
                        v-auth="'/v1/order/recycle/detail'"
                        type="link"
                        @click="goDetails(item)"
                        >详情</AButton
                      >
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex justify-end py-15px bg-white">
        <VoPagination
          :current="paginations.pageNo"
          :page-size="paginations.pageSize"
          :size="'default'"
          :total="paginations.total"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
 </div>
</template>

<script lang="ts" setup>
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import RecoveryFilterForm from './component/RecoveryFilterForm.vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import { onBeforeMount, reactive, ref } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { clearObjectUnalbeAttr } from '/@/utils/helper/formHelper'
  import { doorTime } from '/@/utils/dateUtil'

  import { useRouter } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const go = useRouter()
  const goDetails = (record) => {
    console.log(record, 'record')
    go.push({
      path: '/OrderModule/repairShopOrder/recoveryDetails',
      query: {
        id: record.id,
      },
    })
  }
  //关联订单
  const goRelation = (record) => {
    go.push({
      path: '/OrderModule/repairShopOrder/purchaseDetails',
      query: {
        id: record.relationOrderId,
      },
    })
  }
  //----- 加载列表数据 ---------
  let tableData = ref<any>([])
  // 查全部时传0,1待处理,2待查验,3待接单,4待上门,5待寄回,6待收货,7已完成,9已取消
  const statusAttrs = {
    one: 0,
    two: 1,
    three: 2,
    four: 3,
    five: 4,
    six: 5,
    seven: 6,
    eight: 7,
    nine: 9,
  }
  const loadTableData = async () => {
    await handlerStatus()
    const filterParams = {
      ...filterData.value,
      ...paginations,
      orderStatus: statusAttrs[activeKey.value],
    }
    try {
      const { code, data } = await adminHttp.ORDER.orderRecyclePage(
        clearObjectUnalbeAttr(filterParams),
      )
      console.log(tableData)
      if (code == '20001') {
        paginations.total = data.total
        // paginations.current = data.pages
        tableData.value = data.records

        // 这个判断当删除数据最后一条的时候，但是分页不在第一页，加载上一页的数据
        if (paginations.pageNo > 1 && tableData.value.length == 0) {
          paginations.pageNo = paginations.pageNo - 1
          loadTableData()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  //------tabs页签配置-------
  const activeKey = ref('one')
  const tabsList = ref([
    { key: 'one', name: '全部订单', totalCount: 0 },
    { key: 'two', name: '待处理', totalCount: 0 },
    { key: 'three', name: '待查验', totalCount: 0 },
    { key: 'four', name: '待接单', totalCount: 0 },
    { key: 'five', name: '待上门', totalCount: 0 },
    { key: 'six', name: '待寄回', totalCount: 0 },
    { key: 'seven', name: '待收货', totalCount: 0 },
    { key: 'eight', name: '已完成', totalCount: 0 },
    { key: 'nine', name: '已取消', totalCount: 0 },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
    paginations.pageNo = 1
    paginations.pageSize = 10

    loadTableData()
  }
  // ------form列表---------
  const filterData = ref({})
  // 重置
  const handlerRest = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
      ...paginations,
    }
    loadTableData()
  }
  // 搜索
  const handlerSubmit = (values) => {
    paginations.pageNo = 1
    filterData.value = {
      ...values,
    }
    loadTableData()
  }
  //------ 分页查询 -----------------
  const paginations = reactive({
    pageNo: 1,
    pageSize: 10,
    total: 0,
  }) // 分页配置
  const paginationChange = ({ current, pageSize }) => {
    paginations.pageNo = current
    paginations.pageSize = pageSize
    loadTableData()
  }
  //页签数量
  const handlerStatus = async () => {
    const { data } = await adminHttp.ORDER.orderRecycleListCount()
    tabsList.value = [
      { key: 'one', name: '全部订单', totalCount: data.total },
      { key: 'two', name: '待处理', totalCount: data.pending },
      { key: 'three', name: '待查验', totalCount: data.waitingQa },
      { key: 'four', name: '待接单', totalCount: data.waitingOrders },
      { key: 'five', name: '待上门', totalCount: data.waitingVisit },
      { key: 'six', name: '待寄回', totalCount: data.waitingDelivery },
      { key: 'seven', name: '待收货', totalCount: data.delivered },
      { key: 'eight', name: '已完成', totalCount: data.finished },
      { key: 'nine', name: '已取消', totalCount: data.canceled },
    ]
  }
  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
</script>

<style lang="less" scoped>
  td,
  th {
    padding: 10px 0;
    border: 1px solid #e5e5e5;
    vertical-align: top;
    text-align: center;
  }

  ::v-deep(.table-inner-space) {
    padding: 0 !important;
  }

  // 表格数据
  .order-body {
    .body_top {
      width: 100%;

      .body_top_con {
        margin-top: 10px;
        background: #f5f5f5;
        border: 1px solid #e5e5e5;
        width: 100%;
        padding: 5px;
        display: flex;
        justify-content: space-between;
      }
    }

    .body_content {
      display: flex;

      .body_content_info {
        border-top: unset;
      }

      //商品操作
      .body_content_handle {
        flex: 1;
        text-align: center;
        // border-top: unset;
        // align-items: center;
        // justify-content: center;
      }
    }
  }
</style>
