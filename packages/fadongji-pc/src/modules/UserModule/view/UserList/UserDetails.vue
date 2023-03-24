<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />

    <div class="bg-white p-24px m-24px mt-72px">
      <div class="list-content">
        <BasicsInfo v-if="activeKey == '1'" :data="userContent" />
        <div v-else class="identity">
          <Table
            class="identity-table"
            :columns="userColumns"
            :data-source="identityData"
            :pagination="false"
            size="small"
            :scroll="{ x: 'calc(700px + 50%)', y: 650 }"
            bordered
          >
            <template #parent="{ record }">
              <a-switch
                @change="stateEnable(record)"
                :checked="!record.status"
                checked-children="开"
                un-checked-children="关"
              />
            </template>
            <template #bodyCell="{ column, index }">
              <template v-if="column.dataIndex === 'index'">
                {{ index + 1 }}
              </template>
            </template>
            <template #operation>
              <a-popconfirm
                title="确定要删除吗？"
                @confirm="confirm"
                ok-text="确定"
                cancel-text="取消"
              >
                <a href="#">删除</a>
              </a-popconfirm>
            </template>
          </Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { useRoute } from 'vue-router'
  import { createFromIconfontCN, VerifiedOutlined } from '@ant-design/icons-vue'

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3417860_o9xftpwv6ss.js',
  })
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import BasicsInfo from './component/BasicsInfo.vue'

  import { defineComponent, ref, reactive, onMounted } from 'vue'
  import { Table } from 'ant-design-vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { userColumns } from '/@/modules/UserModule/view/data/data'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  let tableData2 = [
    {
      title: 'ID',
      content: '',
      title1: '头像',
      content1: '',
    },
    {
      title: '昵称',
      content: '',
      title1: '用户名',
      content1: '',
    },
    {
      title: '微信号',
      content: '',
      title1: 'openid',
      content1: '',
    },
    {
      title: '抖音名',
      content: '',
      title1: '抖音ID',
      content1: '',
    },
    {
      title: '状态',
      content: '',
      title1: '首次加入时间',
      content1: '',
    },
    {
      title: '注册设备ID',
      content: '12313123131312',
      title1: '',
      content1: '',
    },
  ]
  export default defineComponent({
    name: 'Details',
    components: { EraTabs, Table, FileUrlPrase, VerifiedOutlined, IconFont, BasicsInfo },
    setup() {
      const identityData = ref([])
      // 详情进度条
      let tableLoading = ref(false)
      // 详情内容
      const userContent = ref()
      const activeKey = ref('1')
      const tabsList = ref([
        { key: '1', name: '基础信息', totalCount: 0 },
        { key: '2', name: '身份信息', totalCount: 0 },
      ])
      const tabsChange = (Key) => {
        activeKey.value = Key
      }

      // 路由
      const router = useRoute()
      // 缓存 用户详情id
      const userDetailId = ref(router.query.userId)
      const confirm = () => {
        alert('删除成功')
      }
      // 用户信息 -- 数据集
      const idInformation = reactive([])
      const initData = async () => {
        try {
          tableLoading.value = true
          const res = await adminHttp.USER.userInfoDetail({ userId: userDetailId.value })
          userContent.value = res.data
          identityData.value = userContent.value['identityList']
          console.log(identityData, '333332222')
        } catch (e) {
          console.log(`获取用户列表失败`)
          return []
        } finally {
          tableLoading.value = false
        }
      }
      const initIdInformationFunc = () => {
        // adminHttp.USER.
      }
      onMountedOrActivated(() => {
        router.query.type == 2 ? (activeKey.value = '2') : (activeKey.value = '1')
        initData()
        initIdInformationFunc()
      })
      //启用状态/user/company/status
      const stateEnable = (record) => {
        const changeSwitchMap = {
          identityId: record.identityId,
          status: !record.status,
        }
        adminHttp.USER.userCompanyStatus(changeSwitchMap)
          .then(() => {
            initData()
          })
          .catch((error) => {
            console.log('error=', error)
          })
      }

      return {
        stateEnable,
        initIdInformationFunc,
        router,
        tableData2,
        tableLoading,
        userContent,
        activeKey: activeKey,
        userColumns,
        idInformation,
        userDetailId,
        confirm,
        IconFont,
        identityData,
        tabsList,
        tabsChange,
      }
    },
  })
</script>

<style lang="less" scoped>
  .page-wrap {
    margin: 24px;
  }

  .edit-table td:nth-child(even) {
    background: #f6f7f8;
  }

  .edit-table td,
  .edit-table th {
    border: 1px solid #cad9ea;
    color: #0a0b06;
    height: 35px;
    text-align: center;
  }

  .identity {
    background: #fff;
  }

  .identity-table {
    padding: 10px;
  }

  .identity-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .edit-table-column {
    width: 30%;
    /* width: 10%; */
    text-align: center;
    background-color: aqua;
  }

  .list-content {
    padding: 10px;
    background: #fff;
  }

  .edit-table-field {
    width: 10%;
  }

  .edit-table-column {
    width: 20%;
  }

  .edit-table {
    width: 100%;
  }
</style>
