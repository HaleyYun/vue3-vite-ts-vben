<template>
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
    :maxlength="50"
    :style="{ width: '78px' }"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
  />
  <a-tag
    v-if="tagData.length < 10 && !inputVisible"
    style="background: #fff; border-style: dashed"
    @click="showInput"
  >
    <plus-outlined />
    添加
  </a-tag>
  <a-tag v-if="!data.length" style="background: #fff; border-style: dashed" @click="showInput">
    <plus-outlined />
    添加
  </a-tag>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, nextTick, watch } from 'vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { Pattern } from '@vocen/shared'

  const { createMessage } = useMessage()
  export default defineComponent({
    components: {
      PlusOutlined,
    },
    props: {
      pattern: {
        type: Boolean,
        default: true,
      },
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
      let oldData: any = props.tagData
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
        let nameListValue = []
        nameListValue.push(removedTag)
        const changeDeleteName = {
          categoryId: current.value.categoryId,
          nameList: nameListValue,
        }
        AdminHttp.goodsTypeDeleteName(changeDeleteName)
          .then((res) => {
            if (+res.code === 20001) {
              createMessage.success('删除成功')
            } else {
              data.value = []
              nextTick(() => {
                data.value = oldData
              })
              console.log(data.value)
            }
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
        state.inputVisible = false
        if (!inputValue) return

        if (!Pattern.isChinese(inputValue) && props.pattern) {
          state.inputValue = ''
          createMessage.error('只允许输入汉字')
          return
        }
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
          typeList: nameInputValue,
        }
        // /goods/type/save
        AdminHttp.goodsTypeSave(changeSaveName)
          .then((res) => {
            createMessage.success('添加商品类型成功')
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
