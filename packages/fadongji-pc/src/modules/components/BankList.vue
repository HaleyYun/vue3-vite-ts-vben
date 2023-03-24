<template>
  <a-drawer v-model:visible="show" width="650px" @close="emits('update:visible', false)">
    <div>
      <a-input-search
        v-model:value="value"
        placeholder="请输入银行名称"
        enter-button
        @search="onSearch"
        allow-clear
      />
    </div>
    <div class="pt-10px">
      <div class="text-gray-500">共： {{ total }} 条</div>
      <a-radio-group style="width: 100%; display: block" v-model:value="checkedValue">
        <a-list
          class="demo-loadmore-list"
          :loading="loading"
          item-layout="horizontal"
          :data-source="list"
        >
          <template #renderItem="{ item }">
            <a-list-item class="cursor-pointer">
              <div>
                <a-radio v-if="type === 1" :value="item">{{ item }}</a-radio>
                <a-radio v-if="type === 2" :value="item.bankName">{{ item.bankName }}</a-radio>
              </div>
            </a-list-item>
          </template>
        </a-list>
      </a-radio-group>
      <div>
        <VoPagination
          :total="total"
          :current="pageQuery.pageNo"
          :page-size="pageQuery.pageSize"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
  //
  import { onMounted, ref, reactive, watch } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: Number,
      default: 1,
    },
    value: {
      type: [String, Number],
      default: '中国',
    },
  })

  const emits = defineEmits(['update:visible', 'select'])

  const show = ref(false)
  watch(
    () => props.visible,
    (val) => {
      show.value = val
    },
  )

  // watch(
  //   () => props.value,
  //   (val) => {
  //     value.value = val || '中国'
  //     loadData()
  //   },
  // )

  watch(show, (val) => {
    emits('update:visible', val)
  })

  const value = ref(props.value || '中国')
  const loading = ref(false)
  const list = ref([])
  const checkedValue = ref('')
  const total = ref(0)
  const pageQuery = reactive({
    pageNo: 1,
    pageSize: 12,
  })
  import AdminHttp from '/@/utils/http/adminHttp'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  onMountedOrActivated(() => {
    loadData()
  })

  const loadData = async () => {
    console.log(value.value)
    if (!value.value) return
    loading.value = true

    if (props.type === 1) {
      const ret = await AdminHttp.CUSTOMER.apiExtraBankInfoFuzzy({
        ...pageQuery,
        bankName: value.value,
      })
      loading.value = false
      list.value = ret.data.records
      total.value = ret.data.total
    } else {
      const ret = await AdminHttp.CUSTOMER.apiExtraBankFuzzy({
        ...pageQuery,
        bankName: value.value,
      })
      loading.value = false
      list.value = ret.data.records
      total.value = ret.data.total
    }
  }

  watch(checkedValue, (val) => {
    if (props.type === 2) {
      const target = list.value.find((item: any) => item.bankName === val)
      emits('select', target)
    } else {
      emits('select', val)
    }
    emits('update:visible', false)
  })

  const paginationChange = ({ current, pageSize }) => {
    pageQuery.pageNo = current
    pageQuery.pageSize = pageSize
    loadData()
  }
  const onSearch = (val) => {
    console.log(val)
    value.value = val
    pageQuery.pageNo = 1
    loadData()
  }
</script>

<style scoped lang="less"></style>
