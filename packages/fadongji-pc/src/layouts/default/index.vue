<template>
  <Layout :class="prefixCls" v-bind="lockEvents">
    <LayoutFeatures />
    <LayoutHeader fixed v-if="getShowFullHeaderRef" />
    <Layout :class="[layoutClass]">
      <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      <Layout :class="`${prefixCls}-main`">
        <LayoutMultipleHeader />
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { Layout } from 'ant-design-vue'
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent'

  import LayoutHeader from './header/index.vue'
  import LayoutContent from './content/index.vue'
  import LayoutSideBar from './sider/index.vue'
  import LayoutMultipleHeader from './header/MultipleHeader.vue'

  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useLockPage } from '/@/hooks/web/useLockPage'

  import { useAppInject } from '/@/hooks/web/useAppInject'

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      LayoutFeatures: createAsyncComponent(() => import('/@/layouts/default/feature/index.vue')),
      LayoutFooter: createAsyncComponent(() => import('/@/layouts/default/footer/index.vue')),
      LayoutHeader,
      LayoutContent,
      LayoutSideBar,
      LayoutMultipleHeader,
      Layout,
    },
    setup() {
      const { prefixCls } = useDesign('default-layout')
      const { getIsMobile } = useAppInject()
      const { getShowFullHeaderRef } = useHeaderSetting()
      const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting()

      // Create a lock screen monitor
      const lockEvents = useLockPage()

      const layoutClass = computed(() => {
        let cls: string[] = ['ant-layout']
        if (unref(getIsMixSidebar) || unref(getShowMenu)) {
          cls.push('ant-layout-has-sider')
        }
        return cls
      })

      return {
        getShowFullHeaderRef,
        getShowSidebar,
        prefixCls,
        getIsMobile,
        getIsMixSidebar,
        layoutClass,
        lockEvents,
      }
    },
  })
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }

  .vben-layout-mix-sider-menu-list{
    background: #fff !important;
    width: 146px;
  }

  .vben-menu-dark.vben-menu-vertical{
    background: #fff !important;
  }

  .vben-layout-mix-sider.dark .vben-layout-mix-sider-menu-list__title{
    border-bottom: none;
  }
  /*8C8C8C*/
  .vben-layout-mix-sider-menu-list__title{
    background: #474C5A;
    justify-content: center;
  }

  .vben-menu-submenu-title{
    font-size: 12px !important;
    color: #8C8C8C !important;
    background: #fff !important;
  }
  .vben-menu-dark.vben-menu-vertical .vben-simple-menu__parent{
    background: #fff;
  }

  .vben-simple-menu__children{
    background: #fff !important;
    color: #262626 !important;
    font-size: 13px;
  }

  .vben-menu-dark.vben-menu-vertical .vben-menu-item-active:not(.vben-menu-submenu), .vben-menu-dark.vben-menu-vertical .vben-menu-submenu-title-active:not(.vben-menu-submenu){
    background: rgba(24,144,255,0.1) !important;
    border-right: 2px solid #1890FF;
    color: #1890FF !important;
    font-weight: bold !important;


  }

  .vben-layout-mix-sider.dark.open > .scrollbar{
    border-right: none;
  }

  .vben-layout-mix-sider{
    background: #474C5A !important;
    padding: 0 10px;

  }

  .vben-layout-mix-sider-module__item {
    color: #fff;
    display: flex;
    padding:10px  5px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
  }

  .vben-layout-mix-sider-module__icon{
    margin-bottom: 0;
    margin-right: 3px;
  }

  .vben-layout-mix-sider-module__item--active{
    color: #fff;
    background: #1890FF;
    border-radius: 5px;

  }

  .vben-layout-mix-sider-module__item--active::before{
    display: none;

  }

  .vben-layout-mix-sider-menu-list__title{
    .pushpin{
      display: none !important;
      font-size: 16px;
    }

    .text{
      display: none !important;
    }
  }

  .vben-layout-multiple-header--fixed,.vben-layout-header--light{
    background: #474C5A !important;
    border-left: none;

  }

  .vben-layout-header--light{
    border-bottom: 1px solid #474C5A

  }
  .vben-layout-header--light .vben-layout-header-action span[role='img']{
     color: #fff;
  }


</style>
