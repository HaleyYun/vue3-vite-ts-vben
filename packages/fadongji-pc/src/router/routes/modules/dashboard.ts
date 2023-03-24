import type { AppRouteModule } from '/@/router/types'

import { getParentLayout, LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/home/index',
  meta: {
    orderNo: 1,
    icon: 'ant-design:home-outlined',
    title: t('首页'),
  },
  children: [
    {
      path: 'home',
      name: 'UserList',
      component: getParentLayout('view'),
      meta: {
        title: '系统首页',
      },
      redirect: '/dashboard/home/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('/@/modules/Dashboard/view/HomePage.vue'),
          meta: {
            affix: true,
            icon: 'ci:dot-03-m',
            title: t('首页'),
          },
        },
        {
          path: 'data',
          name: 'data',
          component: () => import('/@/modules/Dashboard/view/HomeData.vue'),
          meta: {
            affix: true,
            icon: 'ci:dot-03-m',
            title: t('数据看板'),
          },
        },
        {
          path: 'loginLog',
          name: 'LoginLog',
          component: () => import('/@/modules/LoginLog/view/LogList.vue'),
          meta: {
            affix: true,
            icon: 'ph:telegram-logo',
            title: t('登录日志'),
            hideMenu: true,
          },
        },
      ],
    },
  ],
}

export default dashboard
