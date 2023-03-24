<template>
  <div class="bg-white">
    <EraTableTitle :total="paginations.total" />
    <div>
      <ATable
        :loading="tableLoading"
        :columns="userColumn"
        :data-source="data"
        :pagination="false"
        :row-key="(record) => record.id"
        size="small"
        :scroll="{ x: 'calc(700px + 50%)' }"
        bordered
      >
        <template #bodyCell="{ column, text, record }">
          <!--{{nickName}}-->
          <template v-if="column.dataIndex == 'nickName'">
            {{ record.nickName ? record.nickName : desensitization(record.userName) }}
          </template>
          <template v-if="column.dataIndex == 'roleNum'">
            <a @click="goIdentity(record)">{{ record.roleNum }}</a>
          </template>
        </template>
        <template #parent="{ record }">
          <!--:loading="circleLoading"-->
          <ASwitch
            :checked="record.status"
            checked-children="开"
            un-checked-children="关"
            :unCheckedValue="false"
            :checkedValue="true"
            @change="switchStatusEvent($event, record)"
          />
        </template>
        <template #operation="{ record }">
          <AButton
            v-auth="'/v1/user/info/password'"
            type="link"
            class="submit-btn"
            @click="resettingModalShowEvent(record)"
            >重置密码
          </AButton>
          <AButton
            type="link"
            v-auth="'/v1/user/info/detail'"
            class="submit-btn"
            @click="handleUserDetail(record)"
            :loading="record.id === userHandleModal.currentId ? goUserDetailLoading : false"
            >详情
          </AButton>
        </template>
      </ATable>
    </div>
    <div class="flex justify-end pt-15px bg-white">
      <VoPagination
        :total="paginations.total"
        :current="paginations.current"
        :page-size="paginations.pageSize"
        @pagination="paginationChange"
      />
    </div>
  </div>
  <AModal
    v-model:visible="userHandleModal.visible"
    :title="userHandleModal.title"
    @ok="resettingConfirmCloseModalEvent"
    :confirm-loading="userHandleModal.confirmLoading"
  >
    <div style="padding: 20px">
      <p>确定要重置密码吗？</p>
      <p>密码将被重置为手机号后６位。</p>
    </div>
  </AModal>
</template>

<script lang="ts">
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { Modal } from 'ant-design-vue'
  import { defineComponent, onMounted, reactive, ref, createVNode } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import { Table } from 'ant-design-vue'
  import EraTableTitle from '/@/components/EraTableTitle/EraTableTitle.vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { userColumn } from '/@/modules/UserModule/view/data/data'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter } from 'vue-router'
  import { usePermission } from '/@/hooks/web/usePermission'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  export default defineComponent({
    components: { EraTableTitle, Table, VoPagination },
    setup() {
      let goUserDetailLoading = ref(false)
      const { createMessage } = useMessage()
      const loadingCtxkey = 'handlerRow'
      const userHandleModal = reactive({
        visible: false,
        title: '',
        currentItem: null,
        rejectReason: '',
        confirmLoading: false,
        currentId: '',
      })
      const filterData = ref()
      let tableLoading = ref(false)
      let circleLoading = ref(false)
      let totalNum = ref<Number>(50)
      const go = useRouter()
      const paginations = reactive({
        total: 0,
        current: 1,
        pageSize: 10,
      })
      const { hasPermission } = usePermission() // 判断有没有权限
      // 分页
      const paginationChange = ({ current, pageSize }) => {
        paginations.current = current
        paginations.pageSize = pageSize
        initData()
      }

      const modal2Visible = ref<boolean>(false)
      //【以上是问题抽屉】
      const data = ref([])
      onMountedOrActivated(() => {
        initData()
      })
      /**
       *@desc 改变状态
       *@return config [Object] 配置对象
       * @param value
       * @param record
       */
      const switchStatusEvent = async (value, record) => {
        if (!hasPermission('/v1/user/info/status')) {
          createMessage.error('暂无该操作权限！')
          return
        }
        circleLoading.value = true
        await adminHttp.USER.userInfoStatus({ status: !value, id: record.id })
          .then((res) => {
            // initData()
            // record.status = !changeSwitch.status
            data.value = data.value.map((item) => {
              return {
                ...item,
                status: item.id === record.id ? !record.status : item.status,
              }
            })
          })
          .catch((err) => {
            console.log(err)
            console.log(`获取想法列表失败:${err.message}`)
            return []
          })
          .finally(() => {
            circleLoading.value = false
          })
      }
      const initData = async () => {
        tableLoading.value = true
        const filterParams = {
          ...filterData.value,
          pageSize: paginations.pageSize,
          pageNo: paginations.current,
        }
        await adminHttp.USER.userInfoPage(filterParams)
          .then((res) => {
            paginations.total = res.data.total
            data.value = res.data.records
              ? res.data.records.map((item) => {
                  return {
                    ...item,
                    status: !item.status,
                  }
                })
              : []
            return res
          })
          .catch((err) => {
            console.log(err)
            console.log(`获取想法列表失败:${err.message}`)
            return []
          })
          .finally(() => {
            tableLoading.value = false
          })
      }

      /**
       *@desc 进入详情
       *@param id [String] 改变对象的id
       *@param status [String] 改变对象的status
       *@return config [Object] 配置对象
       */
      const handleUserDetail = (filterTableItem) => {
        userHandleModal.currentId = filterTableItem.id
        goUserDetailLoading.value = true
        go.push({
          path: '/userModule/user/details',
          query: { userId: filterTableItem.id, type: 1 },
        })
      }
      // 查看身份信息
      const goIdentity = (filterTableItem) => {
        go.push({
          path: '/userModule/user/details',
          query: { userId: filterTableItem.id, type: 2 },
        })
      }
      // 重置密码（点击，重置密码，弹出modal）
      const resettingModalShowEvent = (filterTableItem) => {
        Modal.confirm({
          title: '确定要重置密码吗？。',
          icon: createVNode(ExclamationCircleOutlined),
          content: createVNode('div', { style: 'color:red;' }, '密码将被重置为手机号后６位'),
          onOk() {
            resettingConfirmCloseModalEvent()
          },
          onCancel() {
            console.log('Cancel')
          },
          class: 'test',
        })
        userHandleModal.currentItem = { ...filterTableItem }
        userHandleModal.title = '重置密码确认'
        userHandleModal.currentId = filterTableItem.id
        // userHandleModal.visible = true
      }
      // 重置密码
      const resettingConfirmCloseModalEvent = () => {
        try {
          userHandleModal.confirmLoading = true
          createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
          adminHttp.USER.userInfoPassword({ userId: userHandleModal.currentId })
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          userHandleModal.visible = false
          userHandleModal.title = ''
          userHandleModal.currentId = ''
        } catch (e) {
          createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
        } finally {
          userHandleModal.confirmLoading = false
        }
      }
      const refreshUpdateChildTable = (filterMap) => {
        filterData.value = filterMap
        paginations.current = 1
        console.log(filterMap)
        initData()
      }
      // 脱敏
      const desensitization = (userName) => {
        return '用户' + userName.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
      }

      return {
        loadingCtxkey,
        userHandleModal,
        goUserDetailLoading,
        refreshUpdateChildTable,
        resettingModalShowEvent,
        modal2Visible,
        handleUserDetail,
        resettingConfirmCloseModalEvent,
        paginations,
        totalNum,
        paginationChange,
        switchStatusEvent,
        circleLoading,
        data,
        userColumn,
        goIdentity,
        desensitization,
        tableLoading,
        filterData,
      }
    },
  })
</script>

<style lang="less" scoped></style>
