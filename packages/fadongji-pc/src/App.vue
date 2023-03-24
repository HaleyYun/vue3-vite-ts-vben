<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
      <!-- <router-view :key="$route.fullPath" /> -->
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue'
  // import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import { AppProvider } from '/@/components/Application'
  import { useTitle } from '/@/hooks/web/useTitle'
  import { useLocale } from '/@/locales/useLocale'
  // support Multi-language
  const { getAntdLocale } = useLocale()

  // Listening to page changes and dynamically changing site title
  useTitle()
</script>
<style lang="less">
  .fun-table {
    width: 100%;
    border-left: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;

    tr {
    }

    td,
    tr {
      padding: 10px;
      border-right: 1px solid #e7e7e7;
      border-top: 1px solid #e7e7e7;
    }
  }
</style>
