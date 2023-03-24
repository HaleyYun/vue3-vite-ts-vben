<template>
  <div>
    <a-spin :spinning="loading">
      <LevelOne v-if="steps === 1" :formState="formState" ref="LevelOneRef" />
      <div class="edit pb-24px pr-24px text-right" v-if="isEdit === 1">
        <a class="mr-20px" @click="opinionLeaderOpen">意见领袖设置</a>
        <a @click="levelInfoOpen">修改用户等级说明</a>
      </div>
      <LevelTwo
        v-if="steps === 2"
        :formState="formState"
        :tableData="tableData"
        ref="LevelTwoRef"
      />
      <div>
        <div class="flex items-center flex-justify-c pt-40px py-24px" v-if="steps === 1">
          <a-button type="primary w-200px" @click="next">下一步</a-button>
        </div>
        <div
          class="fixed bg-white left-250px right-30px bottom-0 flex items-center justify-center p-15px"
          v-if="steps === 2"
        >
          <a-button type="primary w-200px mr-15px" v-if="isEdit !== 1" @click="previous"
            >上一步
          </a-button>
          <a-button type="primary w-200px" @click="save" v-auth="'/v1/integral/userlevel/update'"
            >保存</a-button>
        </div>
      </div>
    </a-spin>
  </div>
  <a-modal
    v-model:visible="levelexplainModal.visible"
    title="等级说明"
    centered
    okText="修改"
    @ok="levelexplainOK"
  >
    <div style="padding: 20px">
      <a-textarea
        :rows="10"
        v-model:value="levelexplainModal.levelInstructions"
        :maxlength="1000"
      />
    </div>
  </a-modal>
  <a-modal
    v-model:visible="opinionLeaderModal.visible"
    title="意见领袖设置"
    centered
    okText="设置"
    :width="800"
    @ok="opinionLeaderOK"
  >
    <div style="padding: 20px">
      <div class="mb-24px leading-normal">
        <span>请设置等级条件</span>
        <span class="ml-50px text-gray-500"
          >设置等级条件后，若该角色到达该等级则自动拥有“意见领袖”标识</span
        >
      </div>
      <a-radio-group v-model:value="opinionLeaderModal.check">
        <a-radio class="radio-style" v-for="(item, index) of tableData" :key="index" :value="index">
          {{ item.name }}
        </a-radio>
      </a-radio-group>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, unref, defineProps } from 'vue'
  import LevelOne from './components/LevelOnes.vue'
  import LevelTwo from './components/LevelTwos.vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'

   const { createMessage } = useMessage()
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

  const LevelOneRef = ref()
  const LevelTwoRef = ref()
  const steps = ref(1)

  // 下一步
  const next = async () => {
    let isNext = await LevelOneRef.value.formValidation()
    if (isNext) {
      let levelNumber = unref(formState.value.levelNumber)
      console.log(levelNumber)
      getData(levelNumber)
      steps.value++
    }
  }
  // 上一步
  const previous = () => {
    steps.value--
  }

  // 设置数据保存数据
  const isEdit = ref(0)
  const formState = ref({ levelNumber: null, levelInstructions: '' })
  const save = () => {
    const isSave = LevelTwoRef.value.formValidation()
    console.log(isSave)
    if (isSave) {
      if (isEdit.value === 0) {
        addData()
      } else {
        editData()
      }
    }
  }
  // 新增
  const addData = async () => {
    try {
      let params = tableData.value
      params[0]['gradeExplain'] = formState.value.levelInstructions
      const { code } = await AdminHttp.INTEGRAL.integralUserLevelAdd(params)
      if (code === '20001') {
        createMessage.success('保存成功')
        isEdit.value = 1
        getLevelList()
      }
    } catch (e) {
      console.log(e)
    }
  }
  // 编辑
  const editData = async () => {
    try {
      let params = tableData.value

      const { code } = await AdminHttp.INTEGRAL.integralUserLevelUpdate(params)
      if (code === '20001') {
        createMessage.success('保存成功')
        levelexplainModal.visible = false
        opinionLeaderModal.visible = false
        getLevelList()
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 等级说明
  const levelexplainModal = reactive({
    visible: false,
    levelInstructions: '',
  })
  const levelInfoOpen = () => {
    levelexplainModal.levelInstructions = tableData.value[0]['gradeExplain']
    levelexplainModal.visible = true
  }
  const levelexplainOK = () => {
    if (levelexplainModal.levelInstructions.trim() === '') {
      createMessage.error('请填写等级说明')
      return
    }
    tableData.value[0]['gradeExplain'] = levelexplainModal.levelInstructions
    editData()
  }
  // 意见领袖说明
  const opinionLeaderModal = reactive<any>({
    visible: false,
    check: null,
  })
  const opinionLeaderOpen = () => {
    opinionLeaderModal.check = tableData.value.findIndex((item) => item.opinionLeader === 1)
    console.log(opinionLeaderModal.check)
    opinionLeaderModal.visible = true
  }
  // 意见领袖设置
  const opinionLeaderOK = () => {
    if (opinionLeaderModal.check === null) {
      createMessage.error('请选择意见领袖！')
      return
    }
    console.log(opinionLeaderModal.check)
    tableData.value[opinionLeaderModal.check]['opinionLeader'] = 1
    tableData.value.forEach((item: any, index) => {
      if (item.id != tableData.value[opinionLeaderModal.check]['id']) {
        item.opinionLeader = 0
      }
    })

    editData()
  }

  // 获取等级设置表格数据
  const tableData = ref<any>([])
  const getData = (levelNumber) => {
    let data: any = []
    for (let i = 0; i < levelNumber; i++) {
      let item = {
        name: 'LV' + (i + 1),
        alias: '',
        growthMin: null,
        growthMax: null,
        opinionLeader: 0,
        gradeExplain: '',
        platformCode: props.platformCode,
      }
      data.push(item)
    }
    tableData.value = data
    console.log(tableData.value)
  }
  // 接口获取等级设置值 integralUserLevelList
  const loading = ref(false)
  const getLevelList = async () => {
    try {
      loading.value = true
      let params = { platformCode: props.platformCode }
      const { code, data } = await AdminHttp.INTEGRAL.integralUserLevelList(params)
      if (code === '20001') {
        if (data.length > 0) {
          isEdit.value = 1
          steps.value = 2
          tableData.value = data
        } else {
          isEdit.value = 0
        }
        loading.value = false
      }
    } catch (e) {
      console.log(e)
      loading.value = false
    }
  }
  getLevelList()
</script>

<style scoped lang="less">
  .radio-style {
    margin-right: 20px;
    margin-bottom: 10px;
  }
</style>
