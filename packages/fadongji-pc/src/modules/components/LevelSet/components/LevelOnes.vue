<template>
  <div class="w-800px my-0 mx-auto" >
    <a-form  :model="formState"
             name="formRef"
             :label-col="{ span: 6 }"
             :wrapper-col="{ span: 18 }"
             autocomplete="off"
             ref="formRef">
      <a-form-item label="请输入用户等级阶段数量" name="levelNumber" :rules="[{ required: true, message: '请输入用户等级阶段数量', trigger: 'blur' }]">
        <a-input-number style="width: 100%"
                        v-model:value="formState.levelNumber" :min="1" :max="99" placeholder="请输入" allow-clear
        />
        <p class="text-red-600 py-15px">输入相应的数值，则系统会自动生成对应数量的等级</p>
      </a-form-item>
      <a-form-item label="用户等级说明" name="levelInstructions" :rules="[{ required: true, message: '请输入用户等级说明', trigger: 'blur' }]" >
        <a-textarea v-model:value="formState.levelInstructions"
                    placeholder="请输入用户等级说明"
                    :maxlength="1000"
                    :rows="10"
                    allow-clear
        />
      </a-form-item>
    </a-form>
  </div>

</template>

<script lang="ts" setup>
  import { ref,defineProps,defineExpose} from 'vue';
  const  props = defineProps({
    formState:{
      type:Object,
      default:{}
    }
  })
  const formRef = ref();

  const formValidation = async ()=>{
    try {
      const values = await formRef.value.validateFields();
      console.log(values);
      return values;
    }catch (e) {
      return false;
    }


  };

  defineExpose({formValidation})



</script>

<style scoped lang="less">

</style>
