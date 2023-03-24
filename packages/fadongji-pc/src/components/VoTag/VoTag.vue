<template>
  <template v-for="(tag, index) in tags" :key="tag">
    <a-tooltip v-if="data.length > maxLength" :title="tag">
      <a-tag color="blue" :closable="index !== -1" @close="handleClose(tag, index)">
        {{ `${tag.slice(0, 20)}...` }}
      </a-tag>
    </a-tooltip>
    <a-tag v-else color="blue" :closable="index !== -1" @close="handleClose(tag, index)">
      {{ tag }}
    </a-tag>
  </template>
  <a-input
    v-if="state.inputVisible"
    ref="inputRef"
    v-model:value="state.inputValue"
    type="text"
    size="small"
    :maxlength="maxLength"
    :style="{ width: '78px' }"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
  />
  <a-tag
    v-if="!state.inputVisible && tags.length < maxLength"
    style="background: #fff; border-style: dashed"
    @click="showInput"
  >
    <plus-outlined />
    添加
  </a-tag>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, nextTick, watch } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { message } from 'ant-design-vue'
  import { Pattern } from '@vocen/shared'

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
      maxLength: {
        type: Number,
        default: 5,
      },
    },
    emits: ['refreshFather'],
    setup(props, { emit }) {
      let data = ref([props.tagData])
      let current = ref<any>(props.currentItem)
      console.log('data===', data)

      const inputRef = ref()
      let tags = ref<any>([])
      const state = reactive<any>({
        inputVisible: false,
        inputValue: '',
      })
      //删除
      const handleClose = (removedTag: string, index) => {
        tags.value.splice(index, 1)
        console.log(removedTag)
        let nameListValue: any = []
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
        // 校验
        if (!Pattern.isChinese(inputValue)) {
          return message.warning('请输入汉字')
        }

        if (!inputValue) {
          state.inputVisible = false
          return
        }
        let tags = state.tags

        Object.assign(state, {
          tags,
          inputVisible: false,
          inputValue: '',
        })
        let nameInputValue: any = []
        nameInputValue.push(inputValue)
        const changeSaveName = {
          categoryId: current.value.categoryId,
          keyWords: nameInputValue,
        }
        AdminHttp.goodsKeywordSave(changeSaveName)
          .then(({ code }) => {
            if (+code === 20001) {
              message.success('添加成功')
            }
            emit('refreshFather')
          })
          .catch((error) => {
            console.log('error===', error)
          })
      }
      watch(
        () => props.tagData,
        (value) => {
          console.log(value)
          tags.value = value ? value : []
        },
        { immediate: true },
      )
      return {
        tags,
        data,
        state,
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
