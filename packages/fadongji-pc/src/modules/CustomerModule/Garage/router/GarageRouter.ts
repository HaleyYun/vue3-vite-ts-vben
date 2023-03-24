import { t } from '/@/hooks/web/useI18n'

export const GarageRouter = [
  {
    // 供应商 -- 修理厂RepairShopDetails
    path: 'garageList',
    name: 'GarageList',
    component: () => import('/@/modules/CustomerModule/Garage/view/GarageList/view/GarageList.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('修理厂列表'),
    },
  },
  {
    path: 'repairShopDetails',
    name: 'RepairShopDetails',
    component: () =>
      import('/@/modules/CustomerModule/Garage/view/GarageList/view/RepairShopDetails.vue'),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      title: t('修理厂详情'),
    },
  },
  {
    // 供应商 -- 修理厂__新增
    path: 'garageNew',
    name: 'GarageNew',
    component: () => import('/@/modules/CustomerModule/Garage/view/GarageNew/view/GarageNew.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('修理厂新增'),
    },
  },
  {
    // 供应商 -- 修理厂__注销
    path: 'garageCancellation',
    name: 'GarageCancellation',
    component: () =>
      import(
        '/@/modules/CustomerModule/Garage/view/GarageCancellation/view/GarageCancellation.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('修理厂注销'),
    },
  },
  // 客户管理/资产管理，不做页面需求，已输出的UI留档，前后端不用做相关需求了 产品暂时去掉相关需求
  // {
  //   // 供应商 -- 修理厂__资产
  //   path: 'garageAssets',
  //   name: 'GarageAssets',
  //   component: () =>
  //     import('/@/modules/CustomerModule/Garage/view/GarageAssets/view/GarageAssets.vue'),
  //   meta: {
  //     icon: 'carbon:car',
  //     title: t('修理厂资产'),
  //   },
  // },
  {
    path: 'GarageReport',
    name: 'GarageReport',
    component: () =>
        import('/@/modules/CustomerModule/Garage/view/GarageAssetsReport/GarageAssetsReport.vue'),
    meta: {
      icon: 'ci:dot-03-m',
      hideMenu: true,
      title: t('资产明细'),
    },
  },
  {
    path: 'IntegralGrowth',
    name: 'GarageIntegralGrowth',
    component: () =>
      import('/@/modules/CustomerModule/Garage/view/IntegralGrowth/IntegralGrowth.vue'),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('积分成长值'),
    },
  },
]
