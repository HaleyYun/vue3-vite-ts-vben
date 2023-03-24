import { t } from '/@/hooks/web/useI18n'

const goodManager = [
  {
    path: 'goodsApply',
    name: 'GoodsApply',
    component: () => import('/@/modules/GoodsModule/GoodsManage/view/GoodsApply/GoodsApply.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('供应商商品列表'),
    },
  },
  {
    path: 'goodsServiceProviderList',
    name: 'GoodsServiceProviderList',
    component: () =>
      import(
        '/@/modules/GoodsModule/GoodsManage/view/GoodsServiceProvider/GoodsServiceProviderList.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('服务商商品列表'),
    },
  },
  {
    path: 'goodsOfIllegalOnTheShelves',
    name: 'GoodsOfIllegalOnTheShelves',
    component: () =>
      import(
        '/@/modules/GoodsModule/GoodsManage/view/GoodsOfIllegalOnTheShelves/GoodsOfIllegalOnTheShelves.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('违规商品上架'),
    },
  },
  {
    path: 'consignmentGoods',
    name: 'ConsignmentGoods',
    component: () =>
      import(
        '/@/modules/GoodsModule/GoodsManage/view/ConsignmentGoods/ConsignmentGoods.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('寄售商品管理'),
    },
  },

  {
    path: 'goodsProfitSharing',
    name: 'GoodsProfitSharing',
    component: () =>
      import('/@/modules/GoodsModule/GoodsManage/view/GoodsProfitSharing/GoodsProfitSharing.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('商品分润'),
    },
  },
  {
    path: 'goodsInvestment',
    name: 'GoodsInvestmentManage',
    component: () =>
      import(
        '/@/modules/GoodsModule/GoodsInvestmentManagement/view/GoodsInvestmentProject/components/GoodsInvestment.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      hideChildrenInMenu: true,
      hideMenu: true,
      title: t('详情'),
    },
  },
  {
    path: 'goodsEvaluation',
    name: 'GoodsEvaluation',
    component: () =>
      import('/@/modules/GoodsModule/GoodsManage/view/GoodsEvaluation/view/GoodsEvaluation.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('商品评价'),
    },
  },
  // {
  //   path: 'goodsEvaluationDetail',
  //   name: 'GoodsEvaluationDetail',
  //   component: () =>
  //     import(
  //       '/@/modules/GoodsModule/GoodsManage/view/GoodsEvaluation/view/GoodsEvaluationDetail.vue'
  //     ),
  //   meta: {
  //     icon: 'ant-design:unordered-list-outlined',
  //     hideChildrenInMenu: true,
  //     hideMenu: true,
  //     title: t('详情'),
  //   },
  // },
  {
    path: 'goodsDetailsAssets',
    name: 'GoodsDetailsAssets',
    component: () =>
      import(
        '/@/modules/GoodsModule/GoodsManage/view/GoodsServiceProvider/components/GoodsDetailsAssets.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',
      hideChildrenInMenu: true, 
      hideMenu: true,
      title: t('详情/审核'),
    },
  },
  {
    path: 'salesArea',
    name: 'SalesArea',
    component: () =>
      import(
        '/@/modules/GoodsModule/GoodsManage/view/GoodsServiceProvider/components/SalesArea.vue'
      ),
    meta: {
      icon: 'ant-design:unordered-list-outlined',
      hideChildrenInMenu: true,
      hideMenu: true,
      title: t('销售区域'),
    },
  },
]
export { goodManager }
