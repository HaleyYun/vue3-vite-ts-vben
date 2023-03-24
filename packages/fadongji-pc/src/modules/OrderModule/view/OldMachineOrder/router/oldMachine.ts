import { t } from '/@/hooks/web/useI18n'

export const MachineRouter = [
  {
    path: 'oldMachineOrder',
    name: 'OldMachineOrder',
    component: () => import('/@/modules/OrderModule/view/OldMachineOrder/OldMachineOrder.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('旧机订单'),
    },
  },
  {
    path: 'oldMachineDetails',
    name: 'OldMachineDetails',
    component: () => import('/@/modules/OrderModule/view/OldMachineOrder/OldMachineDetails.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('旧机订单详情'),
      hideTab: true,
      // 当前路由不再菜单显示
      hideMenu: true,
      ignoreKeepAlive: true,
    },
  },
]
