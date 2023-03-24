import { ComponentInternalInstance, ComponentPublicInstance, getCurrentInstance } from 'vue'
export default function useCurrentInstance() {
  const { proxy, ctx } = getCurrentInstance() as ComponentInternalInstance
  const proxy = ctx.config.globalProperties
  console.log('proxyproxy====', proxy)

  return {
    proxy,
  }
}
