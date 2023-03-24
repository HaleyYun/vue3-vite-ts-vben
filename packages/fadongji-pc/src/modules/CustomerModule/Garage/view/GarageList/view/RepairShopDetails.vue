<template>
  <div>
    <EraTabs :tabsList="tabsList" :tabs-active="activeKey" @tabsChange="tabsChange" />
  </div>
  <div class="bg-white m-24px p-24px mt-72px">
    <div>
      <BasiceInfo v-if="+activeKey === 1" :data="resultData" @update="loadTableData" />
      <StaffManagement v-if="+activeKey === 2" ref="staffRef" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import StaffManagement from './component/StaffManagement.vue'
  import BasiceInfo from './component/BasicsInfo.vue'
  import { createFromIconfontCN } from '@ant-design/icons-vue'
  import { ref, onBeforeMount, watch } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRoute } from 'vue-router'
  import EraTabs from '/@/components/EraTabs/EraTabs.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3417860_o9xftpwv6ss.js',
  })
  const loadingCtxkey = 'handlerRow'
  const route = useRoute()
  onMountedOrActivated(() => {
    loadTableData()
  })
  const activeKey = ref(Number(route.query?.status) || 1)
  const staffRef = ref(null)
  const bindInfoType = ref(1)
  let resultData = ref({})
  const tabsList = ref([
    { key: 1, name: '修理厂详情', totalCount: 0 },
    { key: 2, name: '员工管理', totalCount: 0 },
  ])
  const tabsChange = (Key) => {
    activeKey.value = Key
  }

  //修理厂详情
  const loadTableData = async () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    const res = await adminHttp.CUSTOMER.companyInfoGarageGet({
      id: route.query?.id,
    })
      .then((res) => {
        createMessage.success({ content: `获取详情成功`, key: loadingCtxkey })
        resultData.value = res.data
      })
      .catch((e) => {
        createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
      })
  }

  watch(
    () => activeKey,
    (value) => {
      value.value === 2 && staffRef.value && staffRef.value.initFn()
      console.log(value, 'sNum即刻监听', staffRef)
    },
    { immediate: true, deep: true },
  )
</script>

<style lang="less" scoped>
  .page-wrap {
    margin: 10px;
    background-color: #ffffff;

    .page-table {
      padding: 10px;
      background: #fff;
    }

    .product-data {
      width: 1000px;
    }

    .table {
      width: 100%;
      border: 1px solid #eeeeee;
      border-bottom: 0px;
      border-right: 0px;
      margin-left: 10px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;

      &-item {
        width: 499px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eeeeee;
        border-right: 1px solid #eeeeee;
        display: flex;

        &__left {
          text-align: right;
          width: 120px;
          padding: 0px 10px;
          border-right: 1px solid #eeeeee;
        }

        &__right {
          flex: 1;
          padding: 0px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;

          .image-show {
            width: 88px;
            height: 40px;
            opacity: 0;
            position: absolute;
            bottom: 0;
            right: 10px;
          }
        }
      }
    }
  }

  .w120 {
    width: 120px;
  }

  .w200 {
    width: 200px;
  }
</style>
