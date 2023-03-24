<template>
 <div>
  <template v-for="(tag, index) in tags" :key="tag">
    <a-tooltip v-if="data.length > 5" :title="tag">
      <a-tag color="blue" :closable="index !== -1" @close="handleClose(tag)">
        {{ `${tag.slice(0, 20)}...` }}
      </a-tag>
    </a-tooltip>
    <a-tag v-else color="blue" :closable="index !== -1" @close="handleClose(tag)">
      {{ tag }}
    </a-tag>
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
    添加
  </a-tag>
 </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs, nextTick, watch } from 'vue'
import AdminHttp from '/@/utils/http/adminHttp'
import { PlusOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    PlusOutlined,
  },
  props: {
    currentItem: {
      type: Object,
    },
    tagData: {
      type: Array,
    },
  },
  emits: ['refreshFather'],
  setup(props, { emit }) {
    let data = ref([props.tagData])
    let current = ref(props.currentItem)
    console.log('data===', data)

    const inputRef = ref()
    let tags = ref([])
    const state = reactive({
      inputVisible: false,
      inputValue: '',
    })
    //删除
    const handleClose = (removedTag: string) => {
      console.log(removedTag)
      let nameListValue = []
      nameListValue.push(removedTag)
      const changeDeleteName = {
        categoryId: current.value.categoryId,
        nameList: nameListValue,
      }
      AdminHttp.goodsKeywordDeleteName(changeDeleteName)
        .then((res) => {
          console.log(res, '成功')
        })
        .catch((error) => {
          console.log('error===', error)
        })
    }

    const showInput = () => {
      state.inputVisible = true
      nextTick(() => {
        inputRef.value.focus()
      })
    }
    //添加
    const handleInputConfirm = () => {
      let inputValue = state.inputValue
      console.log(inputValue, '1111')
      let tags = state.tags

      Object.assign(state, {
        tags,
        inputVisible: false,
        inputValue: '',
      })
      let nameInputValue = []
      nameInputValue.push(inputValue)
      const changeSaveName = {
        categoryId: current.value.categoryId,
        keyWords: nameInputValue,
      }
      AdminHttp.goodsKeywordSave(changeSaveName)
        .then((res) => {
          emit('refreshFather')
        })
        .catch((error) => {
          console.log('error===', error)
        })
    }
    watch(
      () => props.tagData,
      (value) => {
        tags.value = value
      },
      { immediate: true },
    )
    return {
      tags,
      data,
      current,
      ...toRefs(state),
      handleClose,
      showInput,
      handleInputConfirm,
      inputRef,
    }
  },
})
</script>
