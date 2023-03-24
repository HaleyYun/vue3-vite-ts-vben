<template>
  <div class="resorce-pool-column">
    <div class="form-title-area">
      <div class="form-title-svg"></div>
      <div class="form-title">认证信息</div>
    </div>
    <div class="resorce-pool-horizon" v-for="item of editData" :key="item.key">
      <div class="svg-title">{{ item.key }}</div>
      <div style="display: flex">
        <div class="resource-pool-row">
          <div v-for="srcItem of item.src" :key="srcItem.key">
            <div class="svg-div"></div>
            <div :class="srcItem.mark ? 'svg-div-sub-title' : ''">{{ srcItem.mark }}</div>
          </div>
        </div>
        <div class="resource-pool-form">
          <voForms ref="ruleFormsss" :itemData="item.formItem" />
        </div>
      </div>
    </div>
  </div>
  <div class="submit-layout">
    <Button color="primary" class="resource-store-btn" @click="submitForm">保存</Button>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import voForms from '/@/modules/CustomerModule/AgentPages/component/ResourcePool/voForms.vue'
  import { Button } from '/@/components/Button'
  interface FormItem {
    rule: string
    label: string
    value: string
    placeholder: string
    ruleName: string
    id: number
  }
  interface FormSrcItem {
    src: string
  }
  export default defineComponent({
    name: 'ResourcePool',
    components: { voForms, Button },
    props: {
      attestationInfoData: Object,
    },
    setup(props) {
      const ObjectType: Object = reactive({})
      let judgeArr: Boolean[] = reactive([])
      let arraysObj: Object = reactive({})

      let caculateNum = ref(0)

      const ruleFormsss = ref()
      const formStateData = reactive<{ domains: FormItem[]; domainSrc: FormSrcItem[] }>({
        domains: [],
        domainSrc: [],
      })
      const editData = reactive(props.attestationInfoData)
      const submitForm = () => {
        getObjectType()
        console.log('ObjectType===', ObjectType)
      }
      function getObjectType() {
        caculateNum.value = 0
        for (const [key, val] of Object.entries(ruleFormsss.value)) {
          console.log(val)
          ruleFormsss.value[key]
            .submitForm()
            .then(() => {
              caculateNum.value++
              if (caculateNum.value === Object.entries(ruleFormsss.value).length) {
                console.log('已经全部校验完成，次数是====', editData)
              }
            })
            .catch(() => {})
        }
      }
      return {
        formStateData, // form数据集
        ruleFormsss,
        editData,
        submitForm,
        judgeArr,
        ObjectType,
        arraysObj,
        caculateNum,
      }
    },
  })
</script>
<style scoped>
  .form-title-area {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .form-title {
    width: 40%;
    font-size: 19px;
    padding-left: 10px;
  }

  .form-title-svg {
    width: 19px;
    height: 26px;
    background: url('/@/assets/svg/agent-form-title.svg') no-repeat center;
    flex-shrink: 0; /*去除flex子元素宽度均分问题*/
    margin-left: 20px;
  }

  .resorce-pool-column {
    display: flex;
    flex-direction: column;
  }

  .resorce-pool-horizon {
    margin-bottom: 30px;
  }

  .resource-pool-row {
    display: flex;
    flex-direction: row;
    max-width: 40vw;
    flex-wrap: wrap;
  }

  .resource-pool-pic-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .resource-pool-form {
    display: flex;
    flex-grow: 1;
    align-items: center;
    padding-left: 50px;
  }

  .svg-div {
    width: 300px;
    height: 180px;
    background: url('/@/assets/icons/idCardFront.svg') no-repeat center / 70%;
    flex-shrink: 0; /*去除flex子元素宽度均分问题*/
    box-sizing: border-box;
    border: 1px solid gray;
    margin-left: 40px;
  }

  .svg-title {
    margin-left: 40px;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
  }

  .svg-div-sub-title {
    width: 300px;
    margin-top: 30px;
    margin-left: 40px;
    text-align: center;
    color: #333333d8;
  }

  .submit-layout {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }

  .resource-store-btn {
    width: 242px;
    height: 35px;
    color: white;
  }
</style>
