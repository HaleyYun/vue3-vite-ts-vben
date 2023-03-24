import type { AppRouteModule } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
import { PromotionRouter } from '/@/modules/PromotionModule/router/PromotionRouter'

const promotion: AppRouteModule = {
  path: '/promotion',
  name: 'Promotion',
  component: LAYOUT,
  meta: {
    orderNo: 15,
    icon: 'ant-design:tags-outlined',
    title: t('促销'),
  },
  children: [...PromotionRouter],
}

export default promotion
