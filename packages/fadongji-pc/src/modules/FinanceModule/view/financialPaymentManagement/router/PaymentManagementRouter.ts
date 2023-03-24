import { getParentLayout } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
export const PaymentManagementRouter = [
    {
        path: 'paymentManagement/view',
        name: 'PaymentManagement',
        component: getParentLayout('view'),
        meta: {
            icon: 'ant-design:qrcode-outlined',
            title: '支付管理',
        },
        redirect: '/finance/view/financeModuleReconciliationList.vue',
        children: [
            {
                path: 'financialPaymentAggregate',
                name: 'FinancialPaymentAggregate',
                component: () =>
                    import(
                        '/@/modules/FinanceModule/view/financialPaymentManagement/financialPaymentAggregate/view/financialPaymentAggregate.vue'
                    ),
                meta: {
                    icon: 'ant-design:apartment-outlined',
                    title: t('聚合支付'),
                },
            },
            {
                path: 'financialPaymentCash',
                name: 'FinancialPaymentCash',
                component: () =>
                    import(
                        '/@/modules/FinanceModule/view/financialPaymentManagement/financialPaymentCash/view/financialPaymentCash.vue'
                    ),
                meta: {
                    icon: 'ant-design:format-painter-outlined',
                    title: t('现金支付'),
                },
            },
            {
                path: 'financialPaymentInAccountingPeriod',
                name: 'FinancialPaymentInAccountingPeriod',
                component: () =>
                    import(
                        '/@/modules/FinanceModule/view/financialPaymentManagement/financialPaymentInAccountingPeriod/view/financialPaymentInAccountingPeriod.vue'
                    ),
                meta: {
                    icon: 'ant-design:euro-circle-outlined',
                    title: t('账期支付'),
                },
            },
            {
                path: 'financialLiquidation',
                name: 'FinancialLiquidation',
                component: () =>
                    import(
                        '/@/modules/FinanceModule/view/financialPaymentManagement/financialLiquidation/view/financialLiquidation.vue'
                    ),
                meta: {
                    icon: 'ant-design:file-search-outlined',
                    title: t('清算'),
                },
            },
            {
                path: 'financialCashSettlement',
                name: 'FinancialCashSettlement',
                component: () =>
                    import(
                        '/@/modules/FinanceModule/view/financialPaymentManagement/financialCashSettlement/view/financialCashSettlement.vue'
                    ),
                meta: {
                    icon: 'ant-design:inbox-outlined',
                    title: t('现金结算'),
                },
            },
        ],
    },
]
