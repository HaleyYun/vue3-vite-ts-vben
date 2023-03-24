<template>
  <template v-for="(tag, index) in oeCodes" :key="tag" >
    <a-tooltip  :title="tag" >
      <a-tag closable @close="handleClose(tag)" style="margin-bottom: 3px">
        {{ `${tag.slice(0, 20)}...` }}
      </a-tag>
    </a-tooltip>
  </template>
  <a-input
          v-if="inputVisible"
          ref="inputRef"
          v-model:value="inputValue"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
  />
  <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
    <plus-outlined />
    录入
  </a-tag>

</template>

<script lang="ts" setup>
  import { ref,nextTick,defineEmits,defineProps} from 'vue';
  import {PlusOutlined} from '@ant-design/icons-vue'
  const emits = defineEmits(['update:oeCodes'])
  const props = defineProps({
    oeCodes:{
      type:Array,
      default:[],
    },
  })
  const inputVisible = ref(false)
  const inputRef = ref()
  const inputValue = ref('')
  const handleClose = (removedTag: string) => {
    const tags = props.oeCodes.filter(tag => tag !== removedTag);
    console.log(tags);
    emits('update:oeCodes',tags)
  };

  const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
      inputRef.value.focus();
    });
  };
  const handleInputConfirm = () => {
    let tags = props.oeCodes;
    if (inputValue.value && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue.value];
    }
    emits('update:oeCodes',tags)

    inputVisible.value = false
    inputValue.value = ''
  };


</script>

<style scoped lang="less">

</style>
