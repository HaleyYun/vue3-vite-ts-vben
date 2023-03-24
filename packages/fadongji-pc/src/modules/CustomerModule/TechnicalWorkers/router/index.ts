import { t } from '/@/hooks/web/useI18n'

export const TechnicalWorkersRouter = [
  {
    // 供应商 -- 修理厂RepairShopDetails
    path: 'TechnicalWorkersList',
    name: 'TechnicalWorkersList',
    component: () =>
      import(
        '/@/modules/CustomerModule/TechnicalWorkers/TechnicalWorkersList/TechnicalWorkersList.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('集师傅列表'),
    },
  },
  {
    path: 'TechnicalWorkersAdd',
    name: 'TechnicalWorkersAdd',
    component: () =>
      import(
        '/@/modules/CustomerModule/TechnicalWorkers/AddTechnicalWorkers/AddTechnicalWorkers.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('新增集师傅'),
    },
  },
  {
    path: 'TechnicalWorkersDetail',
    name: 'TechnicalWorkersDetail',
    component: () =>
      import(
        '/@/modules/CustomerModule/TechnicalWorkers/TechnicalWorkersDetail/TechnicalWorkersDetail.vue'
      ),
    meta: {
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('集师傅详情'),
    },
  },
  {
    path: 'WorkersCustomers',
    name: 'WorkersCustomers',
    component: () =>
      import('/@/modules/CustomerModule/TechnicalWorkers/WorkersCustomers/WorkersCustomers.vue'),
    meta: {
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('集师傅拓客'),
    },
  },
  {
    path: 'GarageCustomer',
    name: 'GarageCustomer',
    component: () =>
      import('/@/modules/CustomerModule/TechnicalWorkers/GarageCustomer/GarageCustomer.vue'),
    meta: {
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('修理厂拓客'),
    },
  },
  {
    path: 'WorkerCancellation',
    name: 'WorkerCancellation',
    component: () =>
      import(
        '/@/modules/CustomerModule/TechnicalWorkers/WorkerCancellation/WorkerCancellation.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('集师傅注销'),
    },
  },
  {
    path: 'TechnicalAsset',
    name: 'TechnicalAsset',
    component: () =>
      import('/@/modules/CustomerModule/TechnicalWorkers/TechnicalAsset/TechnicalAsset.vue'),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('集师傅资产'),
    },
  },
  {
    path: 'Report',
    name: 'Report',
    component: () =>
      import('/@/modules/CustomerModule/TechnicalWorkers/AssetsReport/AssetReport.vue'),
    meta: {
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('资产明细'),
    },
  },

  {
    path: 'IntegralGrowth',
    name: 'IntegralGrowth',
    component: () =>
      import('/@/modules/CustomerModule/TechnicalWorkers/IntegralGrowth/IntegralGrowth.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('积分成长值'),
    },
  },
]
