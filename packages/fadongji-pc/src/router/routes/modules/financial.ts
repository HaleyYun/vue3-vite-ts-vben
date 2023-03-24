import type { AppRouteModule } from '/@/router/types'

import { LAYOUT, getParentLayout } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
import {
  FinancialAccountingRouter,
  InvoiceRouter,
  SettlementRouter,
} from '/@/modules/FinancialModule/router'

const financial: AppRouteModule = {
  path: '/financial',
  name: 'financial',
  component: LAYOUT,
  meta: {
    orderNo: 8,
    icon: 'ant-design:pay-circle-outlined',
    title: t('财务'),
  },
  children: [
    {
      path: 'account',
      name: 'Account',
      component: getParentLayout('view'),
      meta: {
        title: '财务台帐',
      },
      redirect: '/UserModule/view/UserList/UserList.vue',
      children: [...FinancialAccountingRouter],
    },
    {
      path: 'settlement',
      name: 'Settlement',
      component: getParentLayout('view'),
      meta: {
        title: '结算管理',
      },
      redirect:
        '/@/modules/FinancialModule/FinancialAccounting/SettlementAdministration/CalculateConfigure/CalculateConfigure.vue',
      children: [...SettlementRouter],
    },
    {
      path: 'ticket',
      name: 'Ticket',
      component: getParentLayout('view'),
      meta: {
        title: '发票管理',
      },
      children: [...InvoiceRouter],
    },
  ],
}

export default financial
