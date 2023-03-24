<template>
<div>
  <AModal
          v-model:visible="multipleAuditDialog.visible"
          :title="multipleAuditDialog.title"
          centered
          destroy-on-close
          width="600px"
          :confirm-loading="multipleAuditDialog.confirmLoading"
          @ok="multipleAuditHandler"
          @cancel="restMultipleAuditDialog">
    <div class="p-5 flex justify-center	 ">
      <a-button class="mr-10px" v-for="(item,index) of qualificationList"
                :key="index+item.value" :type="item.selected?'primary':''" @click="selectedQualification(item)">{{item.label}}</a-button>
    </div>
  </AModal>
</div>

</template>

<script setup lang="ts">
  import { ref,reactive,defineProps,defineEmits,watch,} from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage'
  const { createMessage } = useMessage()
  const props = defineProps({
    visible:{
      type:Boolean,
      default:false
    },
    qualifyType:{
      type:Array,
      default:[]
    }
  })
  const emit = defineEmits(['update:visible', 'change'])
  // 认证类型  31:售后回收单 32:安装单 33:回收单；  多选逗号分隔
  const qualificationList = ref([
    {label:'安装单',value:32,selected:false},
    {label:'回收单',value:33,selected:false},
    {label:'售后单',value:31,selected:false}
  ]);
  let multipleAuditDialog = reactive({
    visible: false,
    title: '开通接单资质',
    qualifyType:[],
    // 认证类型  31:售后回收单 32:安装单 33:回收单
    confirmLoading: false,
  })

  const selectedQualification = (item)=>{
    if(props.qualifyType.includes(item.value)){
      return;
    }
     item.selected = !item.selected;
  }
  const multipleAuditHandler = async () =>{
    let selectedList = []
     qualificationList.value.forEach(item=>{
         if(item.selected){
           selectedList.push(item.value)
         }
     })
    if(selectedList.length == 0){
      createMessage.error('请选择接单资质');
      return;
    }
    try {
      emit('change',{qualifyType:selectedList.join(',')})
      emit('update:visible',false)
    }catch (e) {
      console.log(e)
    }
  };
  const restMultipleAuditDialog = () =>{
    emit('update:visible',false)
  }
  watch(()=>props.visible,(val)=>{
    console.log(props.qualifyType)

    qualificationList.value.forEach(item=>{
      if(props.qualifyType.includes(item.value)){
         item.selected = true
      }else {
        item.selected = false
      }
    })
    multipleAuditDialog.visible = val;
  })


</script>

<style scoped lang="less">

</style>
