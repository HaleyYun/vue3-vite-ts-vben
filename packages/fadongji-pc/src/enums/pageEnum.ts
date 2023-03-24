export enum PageEnum {
  // basic login path
  BASE_LOGIN = '/login',
  // basic home path
  BASE_HOME = '/dashboard/home/index',
  // error page path
  ERROR_PAGE = '/exception',
  // error log page path
  ERROR_LOG_PAGE = '/error-log/list',
  BASE_EDIT = '/SupplierPages/details',
  BASE_DTLD = '/CustomerModule/agent/detailed',
  brandSelectOptions = '/CustomerModule/agent/AgentOut',
  BASE_ADGE = '/CustomerModule/agent/newMent',
  GOOD_EDIT = '/goodsManage/goods/edit',
  GOOD_ADD = '/goodsManage/goodsTemplate/show',
  GOOD_DRAFT = '/goodsManage/goods/GoodsForm',
  GOOD_DETA = '/goodsManage/goods/goodsProfits',
  USER_DRAFT = '/userModule/user/details',
  SUP_ADD = '/customerModule/supplier/supplierNewAdd',
  //订单
  SUP_DETAILS = '/customerModule/supplier/supperDetail',
  ORDER_DETAILS = '/OrderModule/supplierOrder/salesDetails',
  INVEST_DETAILS = '/OrderModule/supplierOrder/investDetails',
  AFTER_DETAILS = '/OrderModule/supplierOrder/afterDetails',
  SALE_DETAILS = '/OrderModule/agentOrder/agentSaleDetails',
  INVESTMENT_DETAILS = '/OrderModule/agentOrder/agentInvestDetails',
  AGENT_DETAILS = '/OrderModule/agentOrder/agentAfterDetails',
  HANDLE_DETAILS = '/OrderModule/agentOrder/handleDetails',
  RETURN_DETAILS = '/OrderModule/repairShopOrder/reDetails',
  PURCHASE_DETAILS = '/OrderModule/repairShopOrder/purchaseDetails',
  INVOICING_DETAILS = 'FinancialNewInvoicingDetails',
  // 供应商
  EMPLOYEE_MANAGEMENT = 'EmployeeManagement',
  //服务商
  SERVICE_MANAGEMENT = 'agentOut',
}
