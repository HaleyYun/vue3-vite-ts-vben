<template>
    <div>
        <AModal
                v-model:visible="brandModal.visible"
                title="填写审核未通过原因"
                destroy-on-close
                :confirm-loading="brandModal.confirmLoading"
                @ok="Ok"
                @cancel="Cancel"
        >
            <div class="padding-24">
                <AForm :label-col="{ span: 4 }"
                       ref="formRef"
                       :wrapper-col="{ span: 20 }" :model="form">
                    <AFormItem
                            class="text-current"
                            label="审核未通过原因"
                            name="cause"
                            :rules="[{ required: true, message: '请填写审核未通过原因' }]"
                    >
                        <ATextarea
                                v-model:value="form.cause"
                                placeholder="请填写审核未通过原因"
                                :showCount="true"
                                :rows="6"
                                :maxlength="20"
                        />
                    </AFormItem>
                </AForm>


            </div>

        </AModal>
    </div>


</template>

<script setup lang="ts">
    import {  reactive, ref,defineEmits } from 'vue'
    const brandModal = reactive({
        visible: false,
        id:null,
        confirmLoading:false,
    });
    const formRef = ref();
    const form = reactive({cause:''});
    const dataSource = ref([]);
    const  emit = defineEmits(['submit'])

    const showModal = () => {
        form.cause = '';
        brandModal.visible = true;
    };
    const Ok = ()=>{
        formRef.value
        if(formRef.value){
            formRef.value.validateFields(res=>{
                if(res){
                  emit('submit',form.cause)
                }

            })
        }


    };
    const Cancel = ()=>{
        brandModal.visible = false;
    };
    defineExpose({showModal})


</script>

<style scoped>

</style>
