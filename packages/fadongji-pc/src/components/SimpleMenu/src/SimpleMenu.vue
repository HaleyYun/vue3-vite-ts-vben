<template>
  <Menu
    v-bind="getBindValues"
    :activeName="activeName"
    :openNames="getOpenKeys"
    :class="prefixCls"
    :activeSubMenuNames="activeSubMenuNames"
    @select="handleSelect"
  >
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu
        :item="item"
        :parent="true"
        :collapsedShowTitle="collapsedShowTitle"
        :collapse="collapse"
      />
    </template>
  </Menu>
</template>
<script lang="ts">
  import type { MenuState } from './types'
  import type { Menu as MenuType } from '/@/router/types'
  import type { RouteLocationNormalizedLoaded } from 'vue-router'
  import { defineComponent, computed, ref, unref, reactive, toRefs, watch } from 'vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import Menu from './components/Menu.vue'
  import SimpleSubMenu from './SimpleSubMenu.vue'
  import { listenerRouteChange } from '/@/logics/mitt/routeChange'
  import { propTypes } from '/@/utils/propTypes'
  import { REDIRECT_NAME } from '/@/router/constant'
  import { useRouter } from 'vue-router'
  import { isFunction, isUrl } from '/@/utils/is'
  import { openWindow } from '/@/utils'
  import { treeMap } from '/@/utils/helper/treeHelper'

  import { useOpenKeys } from './useOpenKeys'

  export default defineComponent({
    name: 'SimpleMenu',
    components: {
      Menu,
      SimpleSubMenu,
    },
    inheritAttrs: false,
    props: {
      items: {
        type: Array as PropType<MenuType[]>,
        default: () => [],
      },
      collapse: propTypes.bool,
      mixSider: propTypes.bool,
      theme: propTypes.string,
      accordion: propTypes.bool.def(true),
      collapsedShowTitle: propTypes.bool,
      beforeClickFn: {
        type: Function as PropType<(key: string) => Promise<boolean>>,
      },
      isSplitMenu: propTypes.bool,
    },
    emits: ['menuClick'],
    setup(props, { attrs, emit }) {
      const currentActiveMenu = ref('')
      const isClickGo = ref(false)

      const menuState = reactive<MenuState>({
        activeName: '',
        openNames: [],
        activeSubMenuNames: [],
      })

      const { currentRoute } = useRouter()
      const { prefixCls } = useDesign('simple-menu')
      const { items, accordion, mixSider, collapse } = toRefs(props)

      const { setOpenKeys, getOpenKeys, setDefaultKey } = useOpenKeys(
        menuState,
        items,
        accordion,
        mixSider,
        collapse,
      )

      const getBindValues = computed(() => ({ ...attrs, ...props }))

      watch(
        () => props.collapse,
        (collapse) => {
          if (collapse) {
            menuState.openNames = []
          } else {
            setOpenKeys(currentRoute.value.path)
          }
        },
        { immediate: true },
      )

      watch(
        () => props.items,
        () => {
          if (!props.isSplitMenu) {
            setTimeout(() => {
              setAllOpenKey(props.items)
            }, 300)
          } else {
            setOpenKeys(currentRoute.value.path)
            console.log('setOpenKeys')
          }
        },
        { deep: true },
      )

      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return

        currentActiveMenu.value = route.meta?.currentActiveMenu as string
        handleMenuChange(route)

        if (unref(currentActiveMenu)) {
          menuState.activeName = unref(currentActiveMenu)
          setOpenKeys(unref(currentActiveMenu))
          console.log('listenerRouteChange')
        }
      })

      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false
          return
        }
        const path = (route || unref(currentRoute)).path

        menuState.activeName = path

        //setOpenKeys(path)
      }

      async function handleSelect(key: string) {
        if (isUrl(key)) {
          openWindow(key)
          return
        }
        const { beforeClickFn } = props
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key)
          if (!flag) return
        }

        emit('menuClick', key)

        isClickGo.value = true
        // 去掉点击，收起其他页面
        //setOpenKeys(key);
        menuState.activeName = key
      }

      function setAllOpenKey(data) {
        let keyList = getChildren(data, [])
        setDefaultKey(keyList)
      }

      function getChildren(data, keyList) {
        data.forEach((item, index) => {
          if (item.children && item.children.length > 0) {
            keyList.push(item.path)
            getChildren(item.children, keyList)
          }
        })
        return keyList
      }

      return {
        prefixCls,
        getBindValues,
        handleSelect,
        getOpenKeys,
        ...toRefs(menuState),
      }
    },
  })
</script>
<style lang="less">
  @import './index.less';
</style>
