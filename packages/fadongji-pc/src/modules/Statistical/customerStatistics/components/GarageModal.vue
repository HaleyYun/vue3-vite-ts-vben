<template>
  <div>
    <AModal
      v-model:visible="show"
      title="关联修理厂"
      centered
      :footer="null"
      :width="572"
      @cancel="cancelHandler"
    >
      <div class="padding-24 max-h-70vh overflow-y-auto">
        <ATable :dataSource="dataSource" :pagination="false" :columns="columns" />
      </div>
    </AModal>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, defineProps, defineEmits, watch } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'

  const props = defineProps({
    companyId: {
      type: String,
      default: '',
    },
    visible: {
      default: false,
      type: Boolean,
    },
  })

  const show = ref(props.visible)
  const emits = defineEmits(['update:visible'])

  const columns = [
    {
      title: '修理厂名称',
      dataIndex: 'companyName',
      width: '20%',
    },
    {
      title: '修理厂投资量',
      dataIndex: 'investment',
      width: '30%',
    },
  ]
  const dataSource = ref([])
  const getData = async () => {
    try {
      const { code, data } = await adminHttp.COMPANY.companyInfoGarageList({
        companyId: props.companyId,
      })
      if (code == '20001') {
        dataSource.value = data
      }
    } catch (e) {
      console.log(e)
    }
  }

  const cancelHandler = () => {
    emits('update:visible', false)
  }

  watch(
    () => props.visible,
    (val) => {
      show.value = val
      if (val) {
        dataSource.value = []
        getData()
      }
    },
    { immediate: true },
  )
</script>

<style scoped></style>
