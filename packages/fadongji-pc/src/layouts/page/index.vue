<template>
  <RouterView>
    <template #default="{ Component, route }">
      <keep-alive :exclude="excludeData">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </template>
  </RouterView>
  <FrameLayout v-if="getCanEmbedIFramePage" />
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'

  import FrameLayout from '/@/layouts/iframe/index.vue'

  import { useRootSetting } from '/@/hooks/setting/useRootSetting'

  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting'
  import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting'
  import { getTransitionName } from './transition'

  import { useMultipleTabStore } from '/@/store/modules/multipleTab'
  import { noCachePageData } from '/@/noCachePageData'

  export default defineComponent({
    name: 'PageLayout',
    components: { FrameLayout },
    setup() {
      const { getShowMultipleTab } = useMultipleTabSetting()
      const tabStore = useMultipleTabStore()

      const excludeData = noCachePageData

      const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting()

      const { getBasicTransition, getEnableTransition } = useTransitionSetting()

      const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab))

      const getCaches = computed((): string[] => {
        if (!unref(getOpenKeepAlive)) {
          return []
        }
        return tabStore.getCachedTabList
      })

      return {
        getTransitionName,
        openCache,
        excludeData,
        getEnableTransition,
        getBasicTransition,
        getCaches,
        getCanEmbedIFramePage,
      }
    },
  })
</script>
