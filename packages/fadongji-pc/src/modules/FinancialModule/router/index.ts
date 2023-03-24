import { t } from '/@/hooks/web/useI18n'

export const FinancialAccountingRouter = [
  {
    // 销售台帐
    path: 'SalesParameterList',
    name: 'SalesParameterList',
    component: () =>
      import(
        '/@/modules/FinancialModule/FinancialAccounting/SalesParameter/SalesParameterList/SalesParameterList.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      hideChildrenInMenu: true,
      title: t('销售台账'),
    },
  },
  {
    path: 'taiDetail',
    name: 'SalesParameterDetail',
    component: () =>
      import(
        '/@/modules/FinancialModule/FinancialAccounting/SalesParameter/SalesParameterDetail/SalesParameterDetail.vue'
      ),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('台账详情'),
    },
  },
  {
    // 保证金台账
    path: 'depositAccount',
    name: 'DepositAccount',
    component: () =>
      import(
        '/@/modules/FinancialModule/FinancialAccounting/DepositBill/DepositAccount/DepositAccount.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      hideChildrenInMenu: true,
      title: t('保证金台账'),
    },
  },
  {
    path: 'detailed',
    name: 'DepositDetailed',
    component: () =>
      import(
        '/@/modules/FinancialModule/FinancialAccounting/DepositBill/DepositDetailed/DepositDetailed.vue'
      ),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      icon: 'ci:dot-03-m',
      title: t('明细'),
    },
  },
  {
    // 垫付台帐   
    path: 'paymentAccount',
    name: 'PaymentAccount',
    component: () =>
      import(
        '/@/modules/FinancialModule/FinancialAccounting/PaymentAccount/PaymentAccountList.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',
      hideChildrenInMenu: true,
      title: t('垫付台帐'),
    },
  },
  {
    // 账户台帐
    path: 'accountLedger',
    name: 'AccountLedger',
    component: () =>
      import(
        '/@/modules/FinancialModule/FinancialAccounting/AccountLedger/AccountLedger.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      hideChildrenInMenu: true,
      title: t('账户台帐'),
    },
  },
  {
    path: 'PaymentRefundDetail',
    name: 'PaymentRefundDetail',
    component: () =>
      import(
        '/@/modules/FinancialModule/FinancialAccounting/PaymentAccount/PaymentRefund/PaymentRefundDetail/PaymentRefundDetail.vue'
      ),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('退款垫付详情'),
    },
  },
  {
    path: 'PaymentRecyclingDetail',
    name: 'PaymentRecyclingDetail',
    component: () =>
      import(
        '/@/modules/FinancialModule/FinancialAccounting/PaymentAccount/PaymentRecycling/PaymentRecyclingDetail/PaymentRecyclingDetail.vue'
      ),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('回收垫付详情'),
    },
  },
  {
    path: 'AfterPayDetail',
    name: 'AfterPayDetail',
    component: () =>
      import(
        '/@/modules/FinancialModule/FinancialAccounting/PaymentAccount/AfterPay/AfterPayDetail/AfterPayDetail.vue'
      ),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('售后赔付详情'),
    },
  },
]
//结算管理
export const SettlementRouter = [
  {
    // 结算单列表
    path: 'StatementsList',
    name: 'StatementsList',
    component: () =>
      import(
        '/@/modules/FinancialModule/SettlementAdministration/StatementsList/List/StatementsList.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      hideChildrenInMenu: true,
      title: t('结算单列表'),
    },
  },
  {
    path: 'StatementsDetail',
    name: 'StatementsDetail',
    component: () =>
      import(
        '/@/modules/FinancialModule/SettlementAdministration/StatementsList/Detail/StatementsDetail.vue'
      ),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('结算单详情'),
    },
  },

  {
    // 结算单列表
    path: 'OutstandingOrderList',
    name: 'OutstandingOrderList',
    component: () =>
      import(
        '/@/modules/FinancialModule/SettlementAdministration/OutstandingOrder/OutstandingOrderList.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      hideChildrenInMenu: true,
      title: t('未结算订单'),
    },
  },

  {
    // 结算配置
    path: 'configure',
    name: 'CalculateConfigure',
    component: () =>
      import(
        '/@/modules/FinancialModule/SettlementAdministration/CalculateConfigure/CalculateConfigure.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      hideChildrenInMenu: true,
      title: t('结算配置'),
    },
  },
  {
    path: 'detailed',
    name: 'SettlementDetails',
    component: () =>
      import(
        '/@/modules/FinancialModule/SettlementAdministration/SettlementDetails/SettlementDetails.vue'
      ),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('明细'),
    },
  },
]

export const InvoiceRouter = [
  // 发票管理
  {
    path: 'invoiceList',
    name: 'InvoiceList',
    component: () =>
      import('/@/modules/FinancialModule/InvoiceAdministrationList/InvoiceList/InvoiceList.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      hideChildrenInMenu: true,
      title: t('发票列表'),
    },
  },
  {
    path: 'alreadyInvoiceDetail',
    name: 'AlreadyInvoiceDetail',
    component: () =>
      import(
        '/@/modules/FinancialModule/InvoiceAdministrationList/InvoiceDetail/AlreadyInvoiceDetail.vue'
      ),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('已开发票详情'),
    },
  },
  {
    path: 'waitInvoiceDetail',
    name: 'WaitInvoiceDetail',
    component: () =>
      import(
        '/@/modules/FinancialModule/InvoiceAdministrationList/InvoiceDetail/WaitInvoiceDetail.vue'
      ),
    meta: {
      hideChildrenInMenu: true,
      hideMenu: true,
      icon: 'ci:dot-03-m',

      title: t('待开发票详情'),
    },
  },
]
