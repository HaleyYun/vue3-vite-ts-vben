import { SalesStatisticsRouter } from "/@/modules/FinanceModule/view/financialStatements/router/SalesStatisticsRouter";
import {
    ReconciliationListRouter
} from "/@/modules/FinanceModule/view/financialReconciliationManagement/router/ReconciliationListRouter";
import {
    controlOverInvoicesRouter
} from "/@/modules/FinanceModule/view/financialControlOverInvoices/view/router/controlOverInvoicesRouter";
import {
    PaymentManagementRouter
} from "/@/modules/FinanceModule/view/financialPaymentManagement/router/PaymentManagementRouter";
import {
    AccountManagementRouter
} from "/@/modules/FinanceModule/view/financialAccountManagement/router/AccountManagementRouter";
import {
    BankEnterPriseDirectLinkRouter
} from "/@/modules/FinanceModule/view/financialBankEnterpriseDirectLink/router/BankEnterPriseDirectLinkRouter";
export const financeRouter = [
    ...SalesStatisticsRouter,
    ...ReconciliationListRouter,
    ...controlOverInvoicesRouter,
    ...PaymentManagementRouter,
    ...BankEnterPriseDirectLinkRouter,
    ...AccountManagementRouter,

]