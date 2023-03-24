import { t } from '/@/hooks/web/useI18n'
import { getParentLayout } from '/@/router/constant'

const StoreHouseRouter = [
  {
    path: 'storeManagerList',
    name: 'StoreManagerList',
    component: getParentLayout('view'),
    meta: {
      title: '库存管理',
    },
    redirect: '/StoreHouseModule/view/StoreManager/view/StoreManager.vue',
    children: [
      {
        path: 'storeManager',
        name: 'StoreManager',
        component: () =>
          import('/@/modules/StoreHouseModule/view/StoreManager/view/StoreManager.vue'),
        meta: {
          icon: 'ci:dot-03-m',

          title: t('仓库'),
        },
      },
      {
        path: 'storeDeliverGoods',
        name: 'StoreDeliverGoods',
        component: () =>
          import('/@/modules/StoreHouseModule/view/StoreManager/view/StoreDeliverGoods.vue'),
        meta: {
          icon: 'ci:dot-03-m',

          hideChildrenInMenu: true,
          hideMenu: true,
          title: t('发货时效'),
        },
      },
    ],
  },
  {
    path: 'allocationManager',
    name: 'AllocationManager',
    component: getParentLayout('view'),
    meta: {
      title: '调拨管理',
    },
    redirect: '/StoreHouseModule/view/AllocationTube/view/AllocationTube.vue',
    children: [
      {
        path: 'allocationTube',
        name: 'AllocationTube',
        component: () =>
          import('/@/modules/StoreHouseModule/view/AllocationTube/view/AllocationTube.vue'),
        meta: {
          icon: 'ci:dot-03-m',

          title: t('调拨管理'),
        },
      },
      {
        path: 'allocationDetails',
        name: 'AllocationDetails',
        component: () =>
          import('/@/modules/StoreHouseModule/view/AllocationTube/view/AllocationDetails.vue'),
        meta: {
          hideChildrenInMenu: true,
          hideMenu: true,
          icon: 'ci:dot-03-m',

          title: t('调拨详情'),
        },
      },
    ],
  },
  {
    path: 'timeOfArrivalManager',
    name: 'TimeOfArrivalManager',
    component: getParentLayout('view'),
    meta: {
      title: '到货时效管理',
    },
    redirect: '/StoreHouseModule/view/TimeOfArrival/view/TimeOfArrival.vue',
    children: [
      {
        path: 'timeOfArrival',
        name: 'TimeOfArrival',
        component: () => import('/@/modules/StoreHouseModule/view/TimeOfArrival/view/TimeOfArrival.vue'),
        meta: {
          icon: 'ci:dot-03-m',

          title: t('到货时效'),
        },
      },
    ],
  },
]
export { StoreHouseRouter }
