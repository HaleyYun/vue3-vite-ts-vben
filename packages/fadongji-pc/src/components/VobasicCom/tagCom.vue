<template>
  <template v-for="(tag, index) in tags" :key="tag">
    <Tooltip v-if="tag.length > 20" :title="tag">
      <Tag :closable="index !== 0" @close="handleClose(tag)">
        {{ `${tag.slice(0, 20)}...` }}
      </Tag>
    </Tooltip>
    <Tag v-else :closable="index !== 0" @close="handleClose(tag)">
      {{ tag }}
    </Tag>
  </template>
  <Input
    v-if="inputVisible"
    ref="inputRef"
    type="text"
    size="small"
    :style="{ width: '78px' }"
    v-model:value="inputValue"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
  />
  <Tag v-else @click="showInput" style="background: #fff; border-style: dashed">
    <plus-outlined />
    新添加
  </Tag>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, nextTick } from 'vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { Tooltip, Tag, Input } from 'ant-design-vue'
  export default defineComponent({
    components: {
      PlusOutlined,
      Tooltip,
      Tag,
      Input,
    },
    setup() {
      const inputRef = ref()
      const state = reactive({
        tags: ['不可删除', '标签1', '标签2'],
        inputVisible: false,
        inputValue: '',
      })

      const handleClose = (removedTag: string) => {
        const tags = state.tags.filter((tag) => tag !== removedTag)
        console.log(tags)
        state.tags = tags
      }

      const showInput = () => {
        state.inputVisible = true
        nextTick(() => {
          inputRef.value.focus()
        })
      }

      const handleInputConfirm = () => {
        const inputValue = state.inputValue
        let tags = state.tags
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue]
        }
        console.log(tags)
        Object.assign(state, {
          tags,
          inputVisible: false,
          inputValue: '',
        })
      }
      return {
        ...toRefs(state),
        handleClose,
        showInput,
        handleInputConfirm,
        inputRef,
      }
    },
  })
</script>
