import { t } from '/@/hooks/web/useI18n'
import { getParentLayout } from '/@/router/constant'

export const PromotionRouter = [
  {
    path: 'oldMachine',
    name: 'OldMachine',
    component: getParentLayout('view'),
    meta: {
      title: '预售活动管理',
    },
    redirect: '/PromotionModule/view/OldMachineAnticipate/OldMachineAnticipate.vue',
    children: [
      {
        path: 'oldMachineAnticipate',
        name: 'OldMachineAnticipate',
        component: () =>
          import('/@/modules/PromotionModule/view/OldMachineAnticipate/OldMachineAnticipate.vue'),
        meta: {
          icon: 'ci:dot-03-m',

          title: t('回收公司旧机预售'),
        },
      },
      {
        path: 'machineDetails',
        name: 'MachineDetails',
        component: () =>
          import('/@/modules/PromotionModule/view/OldMachineAnticipate/MachineDetails.vue'),
        meta: {
          icon: 'ci:dot-03-m',
          title: t('详情'),
          hideTab: true,
          // 当前路由不再菜单显示
          hideMenu: true,
          ignoreKeepAlive: true,
        },
      },
    ],
  },
]
