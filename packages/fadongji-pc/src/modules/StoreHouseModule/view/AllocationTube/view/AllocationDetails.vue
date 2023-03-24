<template>
  <div>
  <div class="bg-white m-24px p-24px">
    <div class="text-18px pb-24px">
      <a-alert type="error" showIcon>
          <template #icon><exclamation-circle-outlined /></template>
          <template #message>
            <div class="py-10px text-15px"
              >当前商品状态：
              <span class="text-15px cursor-pointer">
                {{ detail.statusName }}
              </span>              
              </div>
          </template>
        </a-alert>
    </div>
      <div class="flex p-20px items-center justify-between">
        <!-- labelPlacement="vertical" -->
        <ASteps :current="currentStatus.length - 1"  >
          <AStep disabled title="发起申请">
            <template #description>
              <div class="text-14px py-2px">调入仓库：{{ detail.inWarehouseName }}</div>
              <div>
                {{ detail.createTime }}
              </div>
            </template>
          </AStep>
          <AStep disabled title="商品出库">
            <template #description>
              <div class="text-14px py-2px">调出仓库：{{ detail.outWarehouseName }}</div>
              <div>
                {{ detail.outTime }}
              </div>
            </template>
          </AStep>
          <AStep disabled title="商品入库">
            <template #description>
              <div class="text-14px py-2px">{{ detail.updateTime }}</div>
              <div>
                {{ detail.inTime }}
              </div>
            </template>
          </AStep>
        </ASteps>
      </div>
    <!-- bg-white -->
    <div class="m-20px pb-100px bg-white">
      <div class="flex p-20px items-center justify-between">
        <span class="text-2xl text-15px cursor-pointer">{{ detail.goodsName }}</span>
        <span class="text-2xl text-15px cursor-pointer">商品数量：{{ detail.changeNumber }}</span>
      </div>
      <!-- 商品名称 -->
      <div>
        <div class="p-20px">
          <div v-if="goodsVinList">
            <div class="flex flex-wrap">
              <div
                v-for="(item, index) of goodsVinList"
                v-show="index < displayNum"
                class="w-full sm:w-1/2 md:w-1/4 lg:w-1/8 my-5px"
              >
                <div class="text-2xl">{{ item }}</div>
              </div>
            </div>
            <div class="flex flex-row-reverse pt-15px">
              <div v-if="goodsVinList.length > 7">
                <AButton
                  type="primary"
                  v-if="displayNum === 8"
                  @click="displayNum = goodsVinList.length"
                  >展开
                </AButton>
                <AButton v-else @click="displayNum = 8">关闭</AButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onBeforeMount } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRoute } from 'vue-router'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

  const { createMessage } = useMessage()
  const detail = ref<any>({})
  const goodsVinList = ref<any>([])
  const loadingCtxkey = 'handlerRow'
  const route = useRoute()
  const displayNum = ref<number>(8)
  const currentStatus = ref<any>(0)
  const loadTableData = async () => {
    await adminHttp.WAREHOUSE.warehouseTransfer({
      id: route.query.id as string,
    })
      .then((res) => {
        detail.value = res.data
        if (res.data?.statusList) {
          currentStatus.value = res.data.statusList
        }

        if (res.data?.goodsVinList) {
          goodsVinList.value = res.data.goodsVinList
        }
      })
      .catch((err) => {
        createMessage.error({ content: `获取列表失败:${err.message}`, key: loadingCtxkey })
      })
  }

  onMountedOrActivated(() => {
    // 初始化数据
    loadTableData()
  })
  // const current = data.map((item) => {
  //   const t = Object.keys(item)
  //   console.log(t)
  //   return +t[0]
  // })
  // currentStatus.value = current.slice(-1)[0]
</script>

<style lang="less" scoped></style>
