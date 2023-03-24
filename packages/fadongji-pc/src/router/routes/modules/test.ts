import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const dashboard: AppRouteModule = {
  path: '/test',
  name: 'Test',
  component: LAYOUT,
  redirect: '/test/com',
  meta: {
    orderNo: 9,
    icon: 'ion:grid-outline',
    title: t('组件展示'),
    hideTab: true,
    // 当前路由不再菜单显示
    hideMenu: true,
  },
  children: [
    {
      path: 'eraPropForm',
      name: 'EraPropForm',
      component: () => import('/@/modules/DemoModule/view/index.vue'),
      meta: {
        affix: true,
        icon: 'ant-design:home-outlined',
        title: t('EraPropForm'),
      },
    },
    {
      path: 'com',
      name: 'ComPage',
      component: () => import('/@/views/test/test.vue'),
      meta: {
        affix: true,
        icon: 'ant-design:home-outlined',
        title: t('组件列表'),
      },
    },
    {
      path: 'md',
      name: 'MdPage',
      component: () => import('/@/views/test/testm.vue'),
      meta: {
        affix: true,
        icon: 'mdi:send-outline',
        title: '锚点跳转',
      },
    },
  ],
}

export default dashboard
