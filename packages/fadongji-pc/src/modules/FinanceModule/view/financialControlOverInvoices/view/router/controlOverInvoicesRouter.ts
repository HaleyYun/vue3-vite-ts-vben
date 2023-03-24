import { getParentLayout } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
export const controlOverInvoicesRouter = [
    {
        path: 'controlOverInvoices/view',
        name: 'controlOverInvoices',
        component: getParentLayout('view'),
        meta: {
            icon: 'ant-design:folder-outlined',
            title: '发票管理',
        },
        redirect: '/controlOverInvoices/view/financialNewInvoicing.vue',
        children: [
            {
                path: 'financeModuleComprehensiveStatistics',
                name: 'FinanceModuleComprehensiveStatistics',
                component: () =>
                    import(
                        '/@/modules/FinanceModule/view/financialControlOverInvoices/view/financialNewInvoicing/view/financialNewInvoicing.vue'
                    ),
                meta: {
                    icon: 'ant-design:edit-outlined',
                    title: t('新开发票'),
                    hideMenu: true,
                },
            },
            {
                path: 'financialNewInvoicingDetails',
                name: 'FinancialNewInvoicingDetails',
                component: () =>
                    import(
                        '/@/modules/FinanceModule/view/financialControlOverInvoices/view/financialNewInvoicing/view/financialNewInvoicingDetails.vue'
                    ),
                meta: {
                    icon: 'ant-design:unordered-list-outlined',
                    hideChildrenInMenu: true,
                    hideMenu: true,
                    title: t('详情'),
                },
            },
            {
                path: 'financeModuleMembershipStatistics',
                name: 'FinanceModuleMembershipStatistics',
                component: () =>
                    import(
                        '/@/modules/FinanceModule/view/financialControlOverInvoices/view/financialProcessRefund/view/financialProcessRefund.vue'
                    ),
                meta: {
                    icon: 'ant-design:exclamation-outlined',
                    title: t('处理退票'),
                },
            },
        ],
    },
]
