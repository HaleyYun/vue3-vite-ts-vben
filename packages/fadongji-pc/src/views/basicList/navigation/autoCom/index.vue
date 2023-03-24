<template>
  <div class="autoCom">
    <h1 class="titleAutoCom">AutoComplete 自动完成 · Cascaded 级联选择</h1>
    <h2>AutoComplete:需要一个输入框而不是选择器。 需要输入建议/辅助提示</h2>
    <h2>Cascaded :需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。</h2>
  </div>
  <div class="autoComList">
    <h2>AutoComplete 是一个带提示的文本输入框，用户可以自由输入，关键词是辅助输入。</h2>
    <br />
    <br />
    <AutoComplete
      v-model:value="value"
      :options="options"
      style="width: 200px"
      placeholder="输入内容"
      @select="onSelect"
      @search="onSearch"
    />
    <br />
    <br />
    <br />
    <h1> 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。 </h1>
    <br />
    <br />
    <cascaded />
  </div>
</template>

<script lang="ts">
  import cascaded from '../../../../components/VoCascader/cascaded.vue'
  import { defineComponent, ref, watch } from 'vue'

  interface MockVal {
    value: string
  }
  const mockVal = (str: string, repeat = 1): MockVal => {
    return {
      value: str.repeat(repeat),
    }
  }
  export default defineComponent({
    components: { cascaded },
    setup() {
      console.log('111111')

      const value = ref('')
      const options = ref<MockVal[]>([])
      const onSearch = (searchText: string) => {
        console.log('searchText')
        options.value = !searchText
          ? []
          : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
      }
      const onSelect = (value: string) => {
        console.log('onSelect', value)
      }
      watch(value, () => {
        console.log('value', value.value)
      })
      return {
        value,
        options,
        onSearch,
        onSelect,
      }
    },
  })
</script>

<style scoped>
  .autoCom {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleAutoCom {
    font-size: 30px;
  }

  .autoComList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
