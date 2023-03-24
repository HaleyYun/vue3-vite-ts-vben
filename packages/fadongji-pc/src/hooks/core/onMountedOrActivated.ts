import { nextTick, onMounted, onActivated, onBeforeMount } from 'vue'

export function onMountedOrActivated(hook: Fn) {
  let mounted: boolean

  onMounted(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })

  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}

export function onBeforeMountedOrActivated(hook: Fn) {
  let mounted: boolean

  onBeforeMount(() => {
    hook()
    nextTick(() => {
      mounted = true
    })
  })

  onActivated(() => {
    if (mounted) {
      hook()
    }
  })
}
