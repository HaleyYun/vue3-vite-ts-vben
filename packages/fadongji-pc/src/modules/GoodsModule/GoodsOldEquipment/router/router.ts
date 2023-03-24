import { t } from '/@/hooks/web/useI18n'

export const GoodsOldEquipment = [
  {
    path: 'equipmentRecovery',
    name: 'EquipmentRecovery',
    component: () =>
      import('/@/modules/GoodsModule/GoodsOldEquipment/EquipmentRecovery/EquipmentRecovery.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('旧机回收'),
    },
  },
  {
    path: 'equipmentDetails',
    name: 'EquipmentDetails',
    component: () =>
      import('/@/modules/GoodsModule/GoodsOldEquipment/EquipmentRecovery/EquipmentDetails.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('旧机回收详情'),
      hideTab: true,
      // 当前路由不再菜单显示
      hideMenu: true,
      ignoreKeepAlive: true,
    },
  },
  {
    path: 'equipmentResale',
    name: 'EquipmentResale',
    component: () =>
      import('/@/modules/GoodsModule/GoodsOldEquipment/EquipmentResale/EquipmentResale.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('旧机再销售'),
    },
  },
  {
    path: 'resaleDetails',
    name: 'ResaleDetails',
    component: () =>
      import('/@/modules/GoodsModule/GoodsOldEquipment/EquipmentResale/ResaleDetails.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('再销售详情'),
      hideTab: true,
      // 当前路由不再菜单显示
      hideMenu: true,
      ignoreKeepAlive: true,
    },
  },
]
