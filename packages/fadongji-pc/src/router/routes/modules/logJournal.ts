import type { AppRouteModule } from '/@/router/types'

import { LAYOUT, getParentLayout } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const logJournal: AppRouteModule = {
  path: '/journalModule',
  name: 'JournalModule',
  component: LAYOUT,
  meta: {
    orderNo: 20,
    icon: 'material-symbols:folder-copy-sharp',
    title: t('日志'),
    hideTab: true,
    // 当前路由不再菜单显示
    hideMenu: true,
  },
  children: [
    {
      path: 'logModule',
      name: 'LogModule',
      component: getParentLayout('view'),
      meta: {
        icon: 'material-symbols:vertical-split-rounded',
        title: '操作日志',
      },
      redirect: '/JournalModule/view/LogModule/LogSystem/LogSystem.vue',
      children: [
        {
          path: 'logSystem',
          name: 'LogSystem',
          component: () =>
            import('/@/modules/JournalModule/view/LogModule/LogSystem/LogSystem.vue'),
          meta: {
            icon: 'mdi:calendar-text',
            title: t('系统日志'),
          },
        },
        {
          path: 'logTripartite',
          name: 'LogTripartite',
          component: () =>
            import('/@/modules/JournalModule/view/LogModule/LogTripartite/LogTripartite.vue'),
          meta: {
            icon: 'ant-design:unordered-list-outlined',
            title: t('第三方日志'),
          },
        },
        {
          path: 'logUser',
          name: 'LogUser',
          component: () => import('/@/modules/JournalModule/view/LogModule/LogUser/LogUser.vue'),
          meta: {
            icon: 'mdi:format-indent-increase',
            title: t('用户日志'),
          },
        },
        {
          path: 'logCustomer',
          name: 'LogCustomer',
          component: () =>
            import('/@/modules/JournalModule/view/LogModule/LogCustomer/LogCustomer.vue'),
          meta: {
            icon: 'ant-design:unordered-list-outlined',
            title: t('客户日志'),
          },
        },
      ],
    },
  ],
}
export default logJournal
