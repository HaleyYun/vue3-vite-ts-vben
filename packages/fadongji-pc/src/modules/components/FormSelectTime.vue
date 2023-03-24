<template>
  <a-row>
    <a-col :span="11">
      <AFormItem name="homeStartTimeTmp" style="margin-bottom: 0">
        <a-date-picker
                style="width: 100%"
                :disabled-date="startDisabledDate"
                v-model:value="formState.homeStartTimeTmp"
                valueFormat="YYYY-MM-DD"
                @change="startChange"
        />
      </AFormItem>
    </a-col>
    <a-col :span="2" class="text-center">-</a-col>
    <a-col :span="11">
      <AFormItem name="homeEndTimeTmp" style="margin-bottom: 0">
        <a-select
                placeholder="请选择时间段"
                class="!w-full"
                v-model:value="formState.homeEndTimeTmp"
                @change="selectChange"
                allow-clear
        >
          <a-select-option v-for="(item,index) of timeSelectOptions" :key="index"
                           :value="item.value" :disabled="endDisabledDate(item.value)">{{item.label}}</a-select-option>

        </a-select>
      </AFormItem>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import {defineComponent,watch, ref,reactive,defineProps,defineEmits,toRefs} from 'vue';
  import {assignedTime} from '/@/utils/dateUtil'
  import { VoUtils } from '@vocen/shared'
  import {timeSelectOptions} from '/@/api/model/dictionaryApi.ts'
  import { Form } from 'ant-design-vue';
  const emit = defineEmits(['update:homeTime'])
  const props = defineProps({
    homeTime:{
      type:Array,
      default:[]
    },
  })
  const formItemContext = Form.useInjectFormItemContext();
  const formState = reactive({
    homeStartTimeTmp:'',
    homeEndTimeTmp:''
  })
  // 时间处理
  const startChange = (val) => {
    if (!val) {
      emit('update:homeTime',[null,props.homeTime[1]])
      formItemContext.onFieldChange()
      return
    }
    formState.homeEndTimeTmp = ''
    emit('update:homeTime',[formState.homeStartTimeTmp,null])
    formItemContext.onFieldChange()
  }
  const selectChange = (val) => {
    if (!val) {
      emit('update:homeTime',[props.homeTime[0],null])
      formItemContext.onFieldChange()
      return;
    }

    const vArr = val.split('~')
    if (formState.homeStartTimeTmp) {
      let homeStartTime = formState.homeStartTimeTmp + ' ' + vArr[0]
      let homeEndTime = formState.homeStartTimeTmp + ' ' + vArr[1]
      emit('update:homeTime',[homeStartTime,homeEndTime])
      formItemContext.onFieldChange()
    }

  }
  const startDisabledDate = (current) => {
    let y = new Date(current.$d).getFullYear() <= new Date().getFullYear()
    let m = new Date(current.$d).getMonth() <= new Date().getMonth()
    let d = new Date(current.$d).getDate() < new Date().getDate()
    return y&&m&&d
  }
  const endDisabledDate = (endTime) => {
    if (!formState.homeStartTimeTmp) {
      return true
    }
    const vArr = endTime.split('~')
    const homeStartTime = formState.homeStartTimeTmp+ ' ' +vArr[0]
    const homeEndTime = formState.homeStartTimeTmp+ ' ' +vArr[1]
    let time = new Date().getTime()
    if(new Date(homeStartTime).getTime()<time){
      return true
    }else {
      return false
    }
  }

  watch(()=>props.homeTime,async (value)=>{
    if(value[0]&& value[1]){
      let start = VoUtils.timeFormat(new Date(value[0]), 'yyyy-mm-dd hh:MM:ss');
      let end = VoUtils.timeFormat(new Date(value[1]), 'yyyy-mm-dd hh:MM:ss')
      let time = assignedTime(start,end)
      if(new Date(value[0]).getTime() < new Date().getTime() ){
        formState.homeStartTimeTmp = ''
        formState.homeEndTimeTmp = ''
      }else {
        formState.homeStartTimeTmp = time[0]
        formState.homeEndTimeTmp = time[1]
      }
      return;
    }
    if(value[0]){
      const hsArr = value[0].split(' ')
      formState.homeStartTimeTmp = hsArr[0]
    }
    if(!props.homeTime[1]){
      formState.homeEndTimeTmp = ''
    }
    console.log(value)
    if(value.length == 0){
      formState.homeStartTimeTmp = ''
      formState.homeEndTimeTmp = ''
    }

    console.log(value)
  },{immediate:true})


</script>

<style scoped lang="less">

</style>
