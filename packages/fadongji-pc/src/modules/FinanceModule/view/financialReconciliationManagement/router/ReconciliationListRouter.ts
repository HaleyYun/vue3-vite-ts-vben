import { getParentLayout } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
export const ReconciliationListRouter = [
  {
    path: 'reconciliationList/view',
    name: 'reconciliationList',
    component: getParentLayout('view'),
    meta: {
      icon: 'uil-grids',
      title: '对账列表',
      hideMenu: true,
    },
    redirect: '/finance/view/financeModuleReconciliationList.vue',
    children: [
      {
        path: 'financeModuleReconciliationList',
        name: 'FinanceModuleReconciliationList',
        component: () =>
          import(
            '/@/modules/FinanceModule/view/financialReconciliationManagement/financeModuleReconciliationList/view/financeModuleReconciliationList.vue'
          ),
        meta: {
          icon: 'carbon-dns-services',
          title: t('对账列表'),
        },
      },
    ],
  },
]
