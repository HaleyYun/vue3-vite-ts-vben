<template>
  <div>
    <div class="flex items-center p-15px w-800px my-0 mx-auto" v-if="info">
      <div class="flex-1">
        {{info.label||info.name}}
      </div>
      <div class="flex-1 flex items-center">
         <a-input-number style="width: 200px" :defaultValue="0" :precision="0" v-model:value="info.score" :placeholder="placeholder" :min="0" :max="maxLength"  ></a-input-number>
         <span class="ml-10px">分</span>
      </div>
      <div class="flex-1 text-right">
        <!--状态  0-关闭 1-开启-->
        <a-switch v-model:checked="info.status" :unCheckedValue="0" :checkedValue="1" checked-children="开" un-checked-children="关" @change="switchChange"  />
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
  import { ref,defineProps, defineEmits,computed,watch} from 'vue';
  const emit = defineEmits(['switchChange'])
  const props = defineProps({
    info:{
      type:Object,
      default:{}
    },
    maxLength:{
      type:Number,
      default: 999999999
    },
    placeholder:{
      type:String,
      default:'请输入积分值'
    }

  });

  watch(() => props.info,()=>{
    console.log(props.info)
  },{deep:true})


  const switchChange = (value)=>{
    console.log(value)
    emit('switchChange',value)
  }

</script>

<style scoped lang="less">

</style>
