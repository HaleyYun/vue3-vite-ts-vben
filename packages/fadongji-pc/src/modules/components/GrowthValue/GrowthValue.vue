<template>
  <div>
    <div v-for="(obj, key) of setData" :key="'set' + key">
      <div class="template--title mb-20px">{{ key }}</div>
      <EraIntegralSetBar
        :info="item"
        v-for="(item, index) of obj"
        placeholder="请输入成长值"
        :key="index + 'order'"
      />
    </div>
  </div>
  <div
    class="fixed bg-white left-250px right-30px bottom-0 flex items-center justify-center p-15px"
  >
    <a-button type="primary w-200px" @click="save" v-auth="'/v1/integral/rule/update'"
      >保存</a-button
    >
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, ref, defineProps } from 'vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import EraIntegralSetBar from '/@/components/EraIntegralSetBar/EraIntegralSetBar.vue'
  import adminHttp from '/@/utils/http/adminHttp'

  const { createMessage } = useMessage()
  const setData = ref([]) // 订单
  const props = defineProps({
    platformCode: {
      type: String,
      default: '0',
    },
    operationType: {
      type: Number,
      default: 1,
    },
  })

  // 查询积分成长值 初始化
  const getIntegralRuleList = async () => {
    try {
      let params = { platformCode: props.platformCode, operationType: props.operationType }
      const { code, data } = await adminHttp.INTEGRAL.integralRuleList(params)
      if (code === '20001') {
        setData.value = data
      }
    } catch (e) {
      console.log(e)
    }
  }

  getIntegralRuleList()

  console.log(setData)

  const save = () => {
    getRuleUpdate()
  }
  // 积分成长值保存
  const getRuleUpdate = async () => {
    try {
      let params = []
      for (let key in setData.value) {
        let setItem = setData.value[key].find((item) => item.status == 1 && !item.score)
        if (setItem) {
          createMessage.error('开启状态下积分成长值不能为空')
          return
        }
        let obj = setData.value[key].map((item) => {
          return { id: item.id, score: item.score ? item.score : 0, status: item.status }
        })
        params = params.concat(obj)
      }

      const { code } = await adminHttp.INTEGRAL.integralRuleUpdate(params)
      if (code === '20001') {
        createMessage.success('保存成功')
      }
    } catch (e) {
      createMessage.error(e.message)
    }
  }
</script>

<style scoped lang="less"></style>
