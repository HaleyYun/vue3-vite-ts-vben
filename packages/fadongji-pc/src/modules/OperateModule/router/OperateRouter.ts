import { t } from '/@/hooks/web/useI18n'
import { getParentLayout } from '/@/router/constant'

export const OperateRouter = [
  {
    path: 'operateManagerList',
    name: 'OperateManagerList',
    component: getParentLayout('view'),
    meta: {
      title: '激活保修',
    },
    redirect: '/OperateModule/view/OperateList/OperateList.vue',
    children: [
      {
        path: 'operateList',
        name: 'OperateList',
        component: () => import('/@/modules/OperateModule/view/OperateList/OperateList.vue'),
        meta: {
          icon: 'ci:dot-03-m',

          title: t('激活列表'),
        },
      },
    ],
  },
]
