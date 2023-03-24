import { t } from '/@/hooks/web/useI18n'

export const ChannelRouter = [
  {
    // 供应商 -- 修理厂RepairShopDetails
    path: 'ChannelManagerList',
    name: 'ChannelManagerList',
    component: () =>
      import('/@/modules/CustomerModule/ChannelManager/ChannelManagerList/ChannelManagerList.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('渠道经理列表'),
    },
  },
  {
    path: 'add',
    name: 'add',
    component: () =>
      import('/@/modules/CustomerModule/ChannelManager/AddChannelManager/AddChannelManager.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('新增渠道经理'),
    },
  },
  {
    path: 'administerAgent',
    name: 'administerAgent',
    component: () =>
      import('/@/modules/CustomerModule/ChannelManager/AdministErgarage/AdministErgarage.vue'),
    meta: {
      hideMenu: true,
      icon: 'ci:dot-03-m',
      title: t('管辖服务商'),
    },
  },
  {
    path: 'administerGarage',
    name: 'administerGarage',
    component: () =>
      import('/@/modules/CustomerModule/ChannelManager/AdministErgarage/AdministErgarage.vue'),
    meta: {
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('管辖修理厂'),
    },
  },
]
