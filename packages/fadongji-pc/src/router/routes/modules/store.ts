import type { AppRouteModule } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
import { StoreHouseRouter } from '/@/modules/StoreHouseModule/router/StoreHouseRouter'

const goods: AppRouteModule = {
  path: '/store',
  name: 'Store',
  component: LAYOUT,
  meta: {
    orderNo: 6,
    icon: 'ant-design:inbox-outlined',
    title: t('库存'),
  },
  children: [...StoreHouseRouter],
}

export default goods
