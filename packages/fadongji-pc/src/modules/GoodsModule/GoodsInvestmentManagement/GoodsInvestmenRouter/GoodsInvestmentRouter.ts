import { t } from '/@/hooks/web/useI18n'

export const GoodsInvestmentRouter = [
  {
    path: 'goodsInvestmentProject',
    name: 'GoodsInvestmentProject',
    component: () =>
      import(
        '/@/modules/GoodsModule/GoodsInvestmentManagement/view/GoodsInvestmentProject/GoodsInvestmentProject.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('投资项目'),
    },
  },
  {
    path: 'goodsViolationsProjectToOnline',
    name: 'GoodsViolationsProjectToOnline',
    component: () =>
      import(
        '/@/modules/GoodsModule/GoodsInvestmentManagement/view/GoodsViolationsProjectToOnline/GoodsViolationsProjectToOnline.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('违规项目上线'),
    },
  },
  {
    path: 'projectProfit',
    name: 'ProjectProfit',
    component: () =>
      import(
        '/@/modules/GoodsModule/GoodsInvestmentManagement/view/ProjectProfit/ProjectProfit.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',
      title: t('项目分润'),
    },
  },
]
