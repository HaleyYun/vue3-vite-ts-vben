import { t } from '/@/hooks/web/useI18n'

export const CommodityRouter = [
  {
    // 供应商 -- 修理厂RepairShopDetails
    path: 'CommodityManagerList',
    name: 'CommodityManagerList',
    component: () =>
      import(
        '/@/modules/CustomerModule/CommodityManager/CommodityManagerList/CommodityManagerList.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('招商经理列表'),
    },
  },
  {
    path: 'CommodityAdd',
    name: 'CommodityAdd',
    component: () =>
      import(
        '/@/modules/CustomerModule/CommodityManager/AddCommodityManager/AddCommodityManager.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('新增招商经理'),
    },
  },
  {
    path: 'manageSuppliers',
    name: 'manageSuppliers',
    component: () =>
      import('/@/modules/CustomerModule/CommodityManager/ManageSuppliers/ManageSuppliersList.vue'),
    meta: {
      hideMenu: true,
      title: t('管辖供应商'),
    },
  },
]
