import { t } from '/@/hooks/web/useI18n'

export const OldMachineBuyersRouter = [
  {
    // 供应商 -- 修理厂RepairShopDetails
    path: 'BuyersList',
    name: 'BuyersList',
    component: () => import('/@/modules/CustomerModule/OldMachineBuyers/BuyersList/BuyersList.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('旧机买家列表'),
    },
  },
  {
    path: 'OldMachineBuyersAdd',
    name: 'OldMachineBuyersAdd',
    component: () => import('/@/modules/CustomerModule/OldMachineBuyers/AddBuyers/AddBuyers.vue'),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('新增旧机买家'),
    },
  },
  {
    path: 'OldMachineBuyersDetail',
    name: 'OldMachineBuyersDetail',
    component: () =>
      import('/@/modules/CustomerModule/OldMachineBuyers/BuyersDetail/BuyersDetail.vue'),
    meta: {
      hideMenu: true,
      icon: 'ci:dot-03-m',
      title: t('旧机买家详情'),
    },
  },
  {
    path: 'BuyersCancellation',
    name: 'BuyersCancellation',
    component: () =>
      import(
        '/@/modules/CustomerModule/OldMachineBuyers/BuyersCancellation/BuyersCancellation.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('旧机买家注销'),
    },
  },
  {
    path: 'BuyersAsset',
    name: 'BuyersAsset',
    component: () =>
      import('/@/modules/CustomerModule/OldMachineBuyers/BuyersAsset/BuyersAsset.vue'),
    meta: {
      hideMenu: true,
      icon: 'ci:dot-03-m',
      hideChildrenInMenu: true,
      title: t('旧机买家资产'),
    },
    children: [
      {
        path: 'BuyersAssetReport',
        name: 'BuyersAssetReport',
        component: () =>
          import(
            '/@/modules/CustomerModule/OldMachineBuyers/BuyersAssetsReport/BuyersAssetReport.vue'
          ),
        meta: {
          icon: 'ci:dot-03-m',
          hideMenu: true,
          title: t('资产明细'),
        },
      },
    ],
  },
  // {
  //   path: 'BuyersIntegralGrowth',
  //   name: 'BuyersIntegralGrowth',
  //   component: () =>
  //     import(
  //       '/@/modules/CustomerModule/OldMachineBuyers/BuyersIntegralGrowth/BuyersIntegralGrowth.vue'
  //     ),
  //   meta: {
  //     icon: 'ci:dot-03-m',
  //     title: t('积分成长值'),
  //   },
  // },
]
