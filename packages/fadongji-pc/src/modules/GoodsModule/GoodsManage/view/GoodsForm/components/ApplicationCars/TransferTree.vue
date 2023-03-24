<template>
  <div class="tree-transfer">
    <a-transfer
      v-if="dataSourceTransfer.length"
      v-model:target-keys="targetKeys"
      class="tree-transfer"
      :data-source="dataSourceTransfer"
      :render="(item) => item.title"
      show-select-all
      @change="transferChangeHandler"
    >
      <template #children="{ direction, selectedKeys, onItemSelect }">
        <a-tree
          ref="leftTreeRef"
          :height="500"
          v-if="direction === 'left' && treeData.length"
          block-node
          checkable
          check-strictly
          :checked-keys="[...selectedKeys, ...targetKeys]"
          default-expand-all
          :tree-data="treeData"
          @check="
            (_, props) => {
              onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect)
            }
          "
          @select="
            (_, props) => {
              onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect)
            }
          "
        />
      </template>
    </a-transfer>
  </div>
</template>

<script setup lang="ts">
  //
  import { computed, nextTick, ref, toRaw, watch } from 'vue'
  import { _ } from '/@/../../shared/src/index'
  // 左侧树控制
  const leftTreeRef = ref<any>(null)

  const props = defineProps({
    dataSource: {
      type: Array,
      default() {
        return []
      },
    },
  })

  const emits = defineEmits(['select'])

  // 检测是否已经选中
  function isChecked(selectedKeys, eventKey) {
    return selectedKeys.indexOf(eventKey) !== -1
  }

  // 处理树形数据-判断是否已经选中
  function handleTreeData(data, targetKeys: any = []) {
    data.forEach((item) => {
      item['disabled'] = targetKeys.includes(item.key)

      if (item.children) {
        handleTreeData(item.children, targetKeys)
      }
    })
    return data
  }

  const historyMap = new Map()

  //
  const targetKeys = ref([])
  const dataSourceTransfer = ref([])
  const treeData = computed(() => {
    return handleTreeData(_.cloneDeep(props.dataSource), targetKeys.value)
  })

  const transferChangeHandler = (targetKeys, direction, moveKeys) => {
    console.log('targetKeys', targetKeys)
    console.log('direction', direction)
    console.log('moveKeys', moveKeys)
    if (direction === 'left') {
      // 减去
      putEmitHandler(targetKeys, moveKeys)
    } else {
      putEmitHandler(targetKeys, [])
    }
  }

  const onChecked = (e, checkedKeys, onItemSelect) => {
    // console.log(leftTreeRef.value.halfCheckedKeys)
    // console.log(leftTreeRef.value.checkedKeys)
    // const tmpTargetKeys =
    const { eventKey } = e.node
    onItemSelect(eventKey, !isChecked(checkedKeys, eventKey))
  }
  watch(
    () => props.dataSource,
    () => {
      const transferDataSource: any = []

      function flatten(list = []) {
        list.forEach((item: any) => {
          transferDataSource.push(item)
          flatten(item.children)
        })
      }

      // 扁平化数据
      flatten(JSON.parse(JSON.stringify(props.dataSource)))
      dataSourceTransfer.value.length = 0
      nextTick(() => {
        dataSourceTransfer.value = transferDataSource
      })
    },
    {
      deep: true,
    },
  )

  const calcHistoryData = (cData, moveKeys) => {
    cData.forEach((item) => {
      console.log(item)
      const h = historyMap.get(item.hierarchy)
      if (h) {
        const r = h.concat(item.carModels)
        historyMap.set(item.hierarchy, [...new Set(r)])
      } else {
        historyMap.set(item.hierarchy, item.carModels)
      }
    })
    if (Array.isArray(moveKeys) && moveKeys.length) {
      // 去除目标
      historyMap.forEach((value, key) => {
        historyMap.set(
          key,
          value.filter((item) => !moveKeys.includes(item)),
        )
      })
    }

    const list: any = []
    historyMap.forEach((value, key) => {
      const item = {
        hierarchy: key,
        carModels: value,
      }
      list.push(item)
    })
    console.log(list)
	emits('select', list)
  }

  const putEmitHandler = (newValKeys, moveKeys) => {
    const list = dataSourceTransfer.value.map((item) => toRaw(item))
    const result = list.filter((item: any) => newValKeys.includes(item.key))
    const retMap = new Map()
    result.forEach((item: any) => {
      const $key = item.level
      const tmpData = retMap.get($key) || []
      tmpData.push(item.key)
      retMap.set($key, tmpData)
    })
    const putData: any = []
    retMap.forEach(($val, $key) => {
      putData.push({
        hierarchy: $key,
        carModels: $val,
      })
    })
    console.log(putData, 'putDataList')
    calcHistoryData(putData, moveKeys)
  }

  // 监控最终输出合格的数据
  watch(targetKeys, (newValKeys: any) => {
    // const list = dataSourceTransfer.value.map((item) => toRaw(item))
    // const result = list.filter((item: any) => newValKeys.includes(item.key))
    // const retMap = new Map()
    // result.forEach((item: any) => {
    //   const $key = item.level
    //   const tmpData = retMap.get($key) || []
    //   tmpData.push(item.key)
    //   retMap.set($key, tmpData)
    // })
    // const putData: any = []
    // retMap.forEach(($val, $key) => {
    //   putData.push({
    //     hierarchy: $key,
    //     carModels: $val,
    //   })
    // })
    // console.log(putData, 'putDataList')
    // emits('select', putData)
  })
</script>

<style lang="less">
  .tree-transfer {
    .tree-transfer {
      .ant-transfer-list:first-child {
        width: 45% !important;
        flex: none;
        min-height: 485px;
      }
    }
  }
</style>
