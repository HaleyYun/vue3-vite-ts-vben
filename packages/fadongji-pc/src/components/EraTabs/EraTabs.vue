<template>
  <div class="Er-tabs">
    <ATabs v-model:activeKey="activeKey" @change="tabsChange">
      <ATabPane v-for="item of tabsList" :key="item.key">
        <template #tab>
          <span>
            {{ item.name }}
          </span>
          <span v-if="item.totalCount">
            (
            <span :class="item.key === activeKey ? 'count-active' : 'count'">
              {{ item.totalCount }}
            </span>
            )
          </span>
        </template>
      </ATabPane>
    </ATabs>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineProps, defineEmits, watch } from 'vue'

  const props = defineProps({
    tabsActive: {
      type: [String, Number],
      default: 'one',
    },
    tabsList: {
      type: Array,
      default() {
        return []
      },
    },
  })
  const activeKey = ref(props.tabsActive)
  watch(
    () => props.tabsActive,
    () => {
      activeKey.value = props.tabsActive
    },
    { immediate: true, deep: true },
  )
  const emit = defineEmits(['tabsChange'])

  function tabsChange(key) {
    emit('tabsChange', key)
  }
</script>

<style scoped lang="less">
  ::v-deep(.ant-tabs-nav) {
    margin: 0 !important;
  }

  .Er-tabs {
    background: #fff;
    padding: 0 16px;
    position: fixed;
    z-index: 999;
    /* width: 100%; */
    width: calc(100% - 210px);
    top: 48px;
    flex: 0 0 auto;
    transition: width 0.2s;
  }

  .count {
    color: #f86060;
  }

  .count-active {
    color: #1890ff;
  }
</style>
