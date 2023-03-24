import type { AppRouteModule } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
import { OperateRouter } from '/@/modules/OperateModule/router/OperateRouter'

const operate: AppRouteModule = {
  path: '/operate',
  name: 'Operate',
  component: LAYOUT,
  meta: {
    orderNo: 20,
    icon: 'ant-design:fund-projection-screen-outlined',
    title: t('运营'),
  },
  children: [...OperateRouter],
}

export default operate
