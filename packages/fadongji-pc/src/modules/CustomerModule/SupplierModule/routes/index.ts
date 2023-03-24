import { t } from '/@/hooks/web/useI18n'

export const SuppierData = [
  {
    // 供应商 -- 供应商列表
    path: 'supplierList',
    name: 'SupplierList',
    component: () =>
      import('/@/modules/CustomerModule/SupplierModule/SupplierList/SupplierList.vue'),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('供应商列表'),
    },
  },
  {
    // 供应商 -- 员工管理
    path: 'employeeManagement',
    name: 'EmployeeManagement',
    component: () =>
      import('/@/modules/CustomerModule/SupplierModule/conponents/employeeManagement.vue'),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('员工管理'),
    },
  },
  {
    // 供应商 -- 新增供应商
    path: 'supplierNewAdd',
    name: 'SupplierNewAdd',
    component: () =>
      import('/@/modules/CustomerModule/SupplierModule/SuppierNewAdd/SuppierNewAdd.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('新增供应商'),
    },
  },
  {
    path: 'supplierBusinessCategory',
    name: 'SupplierBusinessCategory',
    component: () =>
      import(
        '/@/modules/CustomerModule/SupplierModule/SuppierNewAdd/child/SupplierBusinessCategory.vue'
      ),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      title: t('xxx'),
    },
  },
  {
    // 供应商 -- 供应商经营品牌   
    path: 'suppierBrankOperation',
    name: 'SuppierBrankOperation',
    component: () =>
      import(
        '/@/modules/CustomerModule/SupplierModule/SuppierBrandOperation/SupperBrandOperation.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('经营品牌审核'),
    },
  },
  {
    // 供应商 -- 供应商注销
    path: 'suppierCancel',
    name: 'SuppierCancel',
    component: () =>
      import('/@/modules/CustomerModule/SupplierModule/SupperCancel/SupperCancel.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('供应商注销'),
    },
  },
  {
    // 供应商 -- 供应商资产  产品暂时隐藏该功能    
    path: 'SuppierAsset', 
    name: 'SuppierAsset',
    component: () =>
      import('/@/modules/CustomerModule/SupplierModule/SuppierAsset/SuppierAsset.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      hideChildrenInMenu: true,
      hideMenu: true,
      title: t('供应商资产'),
    },
  },

  {
    path: 'SuppieAssetReport',
    name: 'SuppieAssetReport',
    component: () =>
      import(
        '/@/modules/CustomerModule/SupplierModule/SuppierAssetsReport/SuppierAssetsReport.vue'
      ),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      title: t('供应商资产明细'),
    },
  },

  {
    // 供应商 -- 积分成长值
    path: 'suppierGrowthValue',
    name: 'SuppierGrowthValue',
    component: () =>
      import('/@/modules/CustomerModule/SupplierModule/SuppierGrowth/SuppierGrowth.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('积分成长值'),
    },
  },
  {
    //详情
    path: 'supperDetail',
    name: 'SupperDetail',
    component: () =>
      import('/@/modules/CustomerModule/SupplierModule/SupplierList/SupplierDetails.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('详情'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  {
    //自营服务商
    path: 'serviceProvider',
    name: 'ServiceProvider',
    component: () =>
      import('/@/modules/CustomerModule/SupplierModule/SupplierList/ServiceProvider.vue'),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('自营服务商'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
]