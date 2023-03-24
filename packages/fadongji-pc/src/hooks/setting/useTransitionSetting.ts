import type { TransitionSetting } from '/#/config'

import { computed } from 'vue'

import { useAppStore } from '/@/store/modules/app'

/**
 * 把动画配置return出去
 */
export function useTransitionSetting() {
  const appStore = useAppStore()
  // 是否打开页面切换动画
  const getEnableTransition = computed(() => appStore.getTransitionSetting?.enable)
  // 是否打开顶部进度条
  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress)
  // 是否打开页面切换加载
  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading
  })
  // 路由基本切换动画
  const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition)

  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting })
  }
  return {
    setTransitionSetting,

    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  }
}
