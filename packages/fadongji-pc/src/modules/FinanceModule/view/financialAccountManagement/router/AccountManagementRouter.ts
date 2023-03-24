import {getParentLayout} from "/@/router/constant";
import {t} from "/@/hooks/web/useI18n";
export const AccountManagementRouter = [
    {
        path: 'finance/view',
        name: 'Finance',
        component: getParentLayout('view'),
        meta: {
            icon: 'uil-grids',
            title: '账户管理',
        },
        redirect: '/accountManagement/view/financialVirtualAccount.vue',
        children: [
            {
                path: 'financialVirtualAccount',
                name: 'FinancialVirtualAccount',
                component: () =>
                    import('/@/modules/FinanceModule/view/financialAccountManagement/view/financialVirtualAccount/view/financialVirtualAccount.vue'),
                meta: {
                    icon: 'ant-design:star-outlined',
                    title: t('虚拟账户'),
                },
            },
            {
                path: 'financialUserAccount',
                name: 'FinancialUserAccount',
                component: () =>
                    import('/@/modules/FinanceModule/view/financialAccountManagement/view/financialUserAccount/view/financialUserAccount.vue'),
                meta: {
                    icon: 'ant-design:tags-outlined',
                    title: t('用户账号'),
                },
            },
        ],
    },
]