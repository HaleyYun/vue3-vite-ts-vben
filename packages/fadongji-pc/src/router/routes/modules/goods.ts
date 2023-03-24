import type { AppRouteModule } from '/@/router/types'
import { LAYOUT, getParentLayout } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
import { goodManager } from '/@/modules/GoodsModule/GoodsManage/goodsManagerRouter/index'
import { parameterConfigurationChildRouter } from '/@/modules/GoodsModule/GoodsConfigation/parameterConfigurationRouter/parameterConfigurationRouter'
import { GoodsInvestmentRouter } from '/@/modules/GoodsModule/GoodsInvestmentManagement/GoodsInvestmenRouter/GoodsInvestmentRouter'
import { GoodsOldEquipment } from '/@/modules/GoodsModule/GoodsOldEquipment/router/router'

const goods: AppRouteModule = {
  path: '/goodsManage',
  name: 'GoodsManage',
  component: LAYOUT,
  meta: {
    orderNo: 4,
    icon: 'ant-design:shopping-outlined',
    title: t('商品'),
  },
  children: [
    {
      path: 'goods',
      name: 'GoodsModule',
      component: getParentLayout('view'),
      meta: {
        title: '商品管理',
      },
      redirect: '/GoodsManage/goods/goodsApply',
      children: [
        ...goodManager,
        {
          path: 'goodsEvaluationDetail',
          name: 'GoodsEvaluationDetail',
          component: () =>
            import(
              '/@/modules/GoodsModule/GoodsManage/view/GoodsEvaluation/view/GoodsEvaluationDetail.vue'
            ),
          meta: {
            hideChildrenInMenu: true,
            hideMenu: true,
            title: t('商品评价详情'),
          },
        },
        {
          path: 'goodsForm',
          name: 'GoodsForm',
          component: () =>
            import('/@/modules/GoodsModule/GoodsManage/view/GoodsForm/GoodsForm.vue'),
          meta: {
            ignoreKeepAlive: true,
            icon: 'ant-design:unordered-list-outlined',
            hideChildrenInMenu: true,
            hideMenu: true,
            title: t('编辑'),
          },
        },
        {
          path: 'goodsProfits',
          name: 'GoodsProfits',
          component: () =>
            import('/@/modules/GoodsModule/GoodsManage/view/GoodsProfits/GoodsProfits.vue'),
          meta: {
            icon: 'ant-design:unordered-list-outlined',
            hideChildrenInMenu: true,
            hideMenu: true,
            title: t('详情'),
          },
        },
      ],
    },
    {
      path: 'goods',
      name: 'GoodsInvestment',
      component: getParentLayout('view'),
      meta: {
        title: '投资管理',
      },
      redirect: '/goodsManage/view/GoodsInvestmentProject.vue',
      children: [...GoodsInvestmentRouter],
    },
    {
      path: 'oldEquipment',
      name: 'OldEquipment',
      component: getParentLayout('view'),
      meta: {
        title: '旧机管理',
      },
      children: [...GoodsOldEquipment],
    },
    {
      path: 'goods',
      name: 'BrandManagement',
      component: getParentLayout('view'),
      meta: {
        title: '品牌管理',
      },
      redirect: '/goodsManage/view/GoodsBrand.vue',
      children: [
        {
          path: 'goodsBrand',
          name: 'GoodsBrand',
          component: () => import('/@/modules/GoodsModule/GoodsBrand/GoodsBrand.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('品牌管理'),
          },
        },
        {
          path: 'goodsForm',
          name: 'GoodsForm',
          component: () =>
            import('/@/modules/GoodsModule/GoodsManage/view/GoodsForm/GoodsForm.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            hideChildrenInMenu: true,
            hideMenu: true,
            title: t('编辑'),
          },
        },

        {
          path: 'goodsProfits',
          name: 'GoodsProfits',
          component: () =>
            import('/@/modules/GoodsModule/GoodsManage/view/GoodsProfits/GoodsProfits.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            hideChildrenInMenu: true,
            hideMenu: true,
            title: t('详情'),
          },
        },
      ],
    },
    {
      path: 'goodsTemplate',
      name: 'GoodsTemplate',
      component: getParentLayout('view'),
      meta: {
        title: '商品模板',
      },
      redirect: '/GoodsTemplate/view/GoodsTemplate.vue',
      children: [
        {
          path: 'show',
          name: 'Show',
          component: () =>
            import(
              '/@/modules/GoodsModule/GoodsTemplate/view/GoodsAddTemplate/GoodsAddTemplate.vue'
            ),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('新增商品模板'),
          },
        },
        {
          path: 'goodsCase',
          name: 'GoodsCase',
          component: () =>
            import('/@/modules/GoodsModule/GoodsManage/view/GoodsCase/GoodsCase.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('商品模板列表'),
          },
        },
        {
          path: 'draftBox',
          name: 'DraftBox',
          component: () => import('/@/modules/GoodsModule/GoodsManage/view/DraftBox/DraftBox.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('草稿箱'),
          },
        },
        {
          path: 'source',
          name: 'Source',
          component: () =>
            import('/@/modules/GoodsModule/GoodsManage/view/Source/ResourceExploer.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('资源库管理'),
          },
        },
      ],
    },
    {
      path: 'goodsConfigation',
      name: 'GoodsConfigation',
      component: getParentLayout('view'),
      meta: {
        title: '参数配置',
      },
      redirect: '/GoodsConfigation/GoodsCommitKey.vue',
      children: [...parameterConfigurationChildRouter],
    },
  ],
}

export default goods
