import type {AppRouteModule} from '/@/router/types'

import {LAYOUT, getParentLayout} from '/@/router/constant'
import {t} from '/@/hooks/web/useI18n'


const statistical: AppRouteModule = {
  path: '/statistical',
  name: 'statistical',
  component: LAYOUT,
  meta: {
    orderNo: 10,
    icon: 'ant-design:pie-chart-outlined',
    title: t('统计'),
  },
  children: [
    {
      path: 'account',
      name: 'Account',
      component: getParentLayout('view'),
      meta: {
        title: '服务商统计',
      },
      children: [
        {
          path: 'customerStatistics',
          name: 'CustomerStatistics',
          component: () => import('/@/modules/Statistical/customerStatistics/customerStatistics.vue'),
          meta: {
            icon: 'ci:dot-03-m',
            title: t('客户统计'),
          },
        },
        {
          path: 'agentStatistical',
          name: 'AgentStatistical',
          component: () => import('/@/modules/Statistical/agentStatistical/agentStatistical.vue'),
          meta: {
            icon: 'ci:dot-03-m',
            // 当前路由不再菜单显示
            hideMenu: true,
            title: t('服务商统计详情'),
          },
        },
        {
          path: 'commodityStatistics',
          name: 'CommodityStatistics',
          component: () => import('/@/modules/Statistical/CommodityStatistics/CommodityStatistics.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('商品统计'),
          },
        },
        {
          path: 'orderStatistics',
          name: 'OrderStatistics',
          component: () => import('/@/modules/Statistical/OrderStatistics/OrderStatistics.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('订单统计'),
          },
        },
        {
          path: 'accountStatistics',
          name: 'AccountStatistics',
          component: () => import('/@/modules/Statistical/AccountStatistics/AccountStatistics.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('账户统计'),
          },
        },

      ],
    },

  ],
}

export default statistical
