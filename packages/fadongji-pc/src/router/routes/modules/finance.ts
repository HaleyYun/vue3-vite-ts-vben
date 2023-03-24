import type { AppRouteModule } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
import { financeRouter } from '/@/modules/FinanceModule/router/financeRouter'
const finance: AppRouteModule = {
    path: '/finance',
    name: 'Finance',
    component: LAYOUT,
    meta: {
        orderNo: 12,
        icon: 'ep-goods-filled',
        title: t('财务'),
        hideMenu: true,
    },
    children: [...financeRouter],
}

export default finance
