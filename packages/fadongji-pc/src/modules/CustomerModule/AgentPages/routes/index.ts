import { t } from '/@/hooks/web/useI18n'

export const agentRouter = [
  {
    path: 'manage',
    name: 'Manage',
    component: () =>
      import('/@/modules/CustomerModule/AgentPages/view/AgentManage/AgentManage.vue'),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('服务商列表'),
    },
  },
  {
    path: 'newMent',
    name: 'NewMent',
    component: () => import('/@/modules/CustomerModule/AgentPages/view/NewMent/NewMent.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('新增服务商'),
    },
  },
  {
    path: 'cancellation',
    name: 'Cancellation',
    component: () =>
      import('/@/modules/CustomerModule/AgentPages/view/AgentCancellation/AgentCancellation.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('服务商注销'),
    },
  },
  {
    path: 'assets',
    name: 'Assets',
    component: () =>
      import('/@/modules/CustomerModule/AgentPages/view/AgentAssets/AgentAssets.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('服务商资产'),
      hideMenu: true,
      hideChildrenInMenu: true,
    },
  },

  {
    path: 'AssetsReport',
    name: 'AgentAssetsReport',
    component: () =>
      import('/@/modules/CustomerModule/AgentPages/view/AssetsReport/AssetsReport.vue'),
    meta: {
      icon: 'ci:dot-03-m',
      hideMenu: true,
      title: t('服务商资产明细'),
    },
  },

  {
    path: 'AgentGrowth',
    name: 'AgentGrowth',
    component: () =>
      import('/@/modules/CustomerModule/AgentPages/view/AgentGrowth/AgentGrowth.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('积分成长值'),
    },
  },
  {
    path: 'AgentOut',
    name: 'agentOut',
    component: () => import('/@/modules/CustomerModule/AgentPages/view/AgentOut/AgentOut.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('服务商详情'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  // AssociatedWithGarage
  {
    path: 'AssociatedWithGarage',
    name: 'AssociatedWithGarage',
    component: () =>
      import(
        '/@/modules/CustomerModule/AgentPages/view/AssociatedWithGarage/AssociatedWithGarage.vue'
      ),
    meta: {
      title: t('关联的修理厂'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
]
