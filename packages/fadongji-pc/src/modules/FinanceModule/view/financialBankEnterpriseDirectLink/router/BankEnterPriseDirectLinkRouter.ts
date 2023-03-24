import {getParentLayout} from "/@/router/constant";
import {t} from "/@/hooks/web/useI18n";
export const BankEnterPriseDirectLinkRouter = [
    {
        path: 'BankEnterPriseDirectLink/view',
        name: 'BankEnterPriseDirectLink',
        component: getParentLayout('view'),
        meta: {
            icon: 'ant-design:paper-clip-outlined',
            title: '银企直连',
        },
        redirect: '/financialBankEnterpriseDirectLink/view/financialBankEnterpriseDirectLink.vue',
        children: [
            {
                path: 'financialBankEnterpriseDirectLink',
                name: 'FinancialBankEnterpriseDirectLink',
                component: () =>
                    import('/@/modules/FinanceModule/view/financialBankEnterpriseDirectLink/view/financialBankEnterpriseDirectLink/view/financialBankEnterpriseDirectLink.vue'),
                meta: {
                    icon: 'ant-design:paper-clip-outlined',
                    title: t('银企直连'),
                },
            },
            {
                path: 'financialBankEnterpriseSettlement',
                name: 'FinancialBankEnterpriseSettlement',
                component: () =>
                    import('/@/modules/FinanceModule/view/financialBankEnterpriseDirectLink/view/financialBankEnterpriseSettlement/view/financialBankEnterpriseSettlement.vue'),
                meta: {
                    icon: 'ant-design:setting-outlined',
                    title: t('银企结算'),
                },
            },
            {
                path: 'financialAccountRecord',
                name: 'FinancialAccountRecord',
                component: () =>
                    import('/@/modules/FinanceModule/view/financialBankEnterpriseDirectLink/view/financialAccountRecord/view/financialAccountRecord.vue'),
                meta: {
                    icon: 'ant-design:robot-outlined',
                    title: t('账户记录'),
                },
            },
        ],
    },
]