import { t } from '/@/hooks/web/useI18n'

export const parameterConfigurationChildRouter = [
  {
    path: 'commitKey',
    name: 'CommitKey',
    component: () =>
      import('/@/modules/GoodsModule/GoodsConfigation/GoodsCommitKey/view/GoodsCommitKey.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('评论关键词'),
    },
  },
  {
    path: 'goodsCategoryManager',
    name: 'GoodsCategoryManager',
    component: () =>
      import('/@/modules/GoodsModule/GoodsConfigation/CategoryManager/view/CategoryManager.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('类别管理'),
    },
  },
  {
    path: 'categoryAttribute',
    name: 'CategoryAttribute',
    component: () =>
      import(
        '/@/modules/GoodsModule/GoodsConfigation/CategoryAttribute/view/CategoryAttribute.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('属性管理'),
    },
  },
  // /Users/hantingting/a--vocen/vocen-front-monorepo/packages/fadongji-pc/src/modules/GoodsModule/GoodsConfigation/ModelManagement/ModelManagement.vue
  {
    path: 'ModelManagement',
    name: 'ModelManagement',
    component: () =>
      import('/@/modules/GoodsModule/GoodsConfigation/ModelManagement/ModelManagement.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('型号管理'),
    },
  },
  {
    path: 'paramGoodsType',
    name: 'ParamGoodsType',
    component: () =>
      import('/@/modules/GoodsModule/GoodsConfigation/ParameterGoodsType/view/ParamGoodsType.vue'),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('商品类型'),
    },
  },

  {
    path: 'modelConfiguration',
    name: 'ModelConfiguration',
    component: () =>
      import('/@/modules/GoodsModule/GoodsConfigation/ModelConfiguration/ModelConfiguration.vue'),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('车型库配置'),
    },
  },

  {
    path: 'configurationDetails',
    name: 'ConfigurationDetails',
    component: () =>
      import('/@/modules/GoodsModule/GoodsConfigation/ModelConfiguration/ConfigurationDetails.vue'),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('车型库配置详情'),
    },
  },

  {
    path: 'codeConfiguration',
    name: 'CodeConfiguration',
    component: () =>
      import('/@/modules/GoodsModule/GoodsConfigation/CodeConfiguration/CodeConfiguration.vue'),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('打码费用配置'),
    },
  },
  // {
  //     path: 'paramViolationTypeAssets', 
  //     name: 'ParamViolationTypeAssets',
  //     component: () =>
  //         import(
  //             '/@/modules/GoodsModule/GoodsConfigation/ParamViolationTypeAssets/view/ParamViolationTypeAssets.vue'
  //             ),
  //     meta: {
  //         icon: 'ant-design:edit-outlined',
  //         title: t('违规类型配置'),
  //     },
  // },
]
