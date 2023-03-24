import type { AppRouteModule } from '/@/router/types'

import { LAYOUT, getParentLayout } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
import { circleModuleData, contentModuleData } from '/@/modules/ContentModule/routers/routers'

const content: AppRouteModule = {
  path: '/contentModule',
  name: 'ContentModule',
  component: LAYOUT,
  meta: {
    orderNo: 7,
    icon: 'ant-design:appstore-outlined',
    title: t('内容'),
  },
  children: [
    {
      path: 'circleManage',
      name: 'CircleManage',
      component: getParentLayout('view'),
      meta: {
        title: '圈子管理',
      },
      redirect: '/ContentModule/view/CircleManage/SalesOrder/ProblemManage.vue',
      children: [...circleModuleData],
    },
    {
      path: 'content',
      name: 'ContentModule',
      component: getParentLayout('view'),
      meta: {
        title: '内容管理',
      },
      redirect: '/ContentModule/view/ContentManage/ManualUse/ManualUse.vue',
      children: [...contentModuleData],
    },
  ],
}
export default content
