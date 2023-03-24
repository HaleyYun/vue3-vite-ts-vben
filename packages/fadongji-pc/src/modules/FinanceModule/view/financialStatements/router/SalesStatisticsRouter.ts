import { getParentLayout } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
export const SalesStatisticsRouter = [
    {
        path: 'salesStatistics/view',
        name: 'salesStatistics',
        component: getParentLayout('view'),
        meta: {
            icon: 'uil-grids',
            title: '综合统计',
            hideMenu: true,
        },
        redirect: '/salesStatistics/view/financeModuleComprehensiveStatistics.vue',
        children: [
            {
                path: 'financeModuleComprehensiveStatistics',
                name: 'ComprehensiveStatistics',
                component: () =>
                    import(
                        '/@/modules/FinanceModule/view/financialStatements/financeModuleComprehensiveStatistics/view/financeModuleComprehensiveStatistics.vue'
                    ),
                meta: {
                    icon: 'carbon-dns-services',
                    title: t('综合统计'),
                },
            },
            {
                path: 'financeModuleMembershipStatistics',
                name: 'MembershipStatistics',
                component: () =>
                    import(
                        '/@/modules/FinanceModule/view/financialStatements/financeModuleMembershipStatistics/view/financeModuleMembershipStatistics.vue'
                    ),
                meta: {
                    icon: 'carbon-dns-services',
                    title: t('会员排行'),
                },
            },
            {
                path: 'financeModuleSalesStatistics',
                name: 'FinanceModuleSalesStatistics',
                component: () =>
                    import(
                        '/@/modules/FinanceModule/view/financialStatements/financeModuleSalesStatistics/view/financeModuleSalesStatistics.vue'
                    ),
                meta: {
                    icon: 'carbon-dns-services',
                    title: t('销售统计'),
                },
            },
        ],
    },
]
