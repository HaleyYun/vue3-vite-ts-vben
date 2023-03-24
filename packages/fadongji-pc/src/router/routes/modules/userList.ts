import type { AppRouteModule } from '/@/router/types'

import { LAYOUT, getParentLayout } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const userList: AppRouteModule = {
  path: '/userModule',
  name: 'UserModule',
  component: LAYOUT,
  meta: {
    orderNo: 3,
    icon: 'ant-design:user-outlined',
    title: t('用户'),
  },
  children: [
    {
      path: 'user',
      name: 'UserList',
      component: getParentLayout('view'),
      meta: {
        title: '用户管理',
      },
      redirect: '/UserModule/view/UserList/UserList.vue',
      children: [
        {
          path: 'list',
          name: 'List',
          component: () => import('/@/modules/UserModule/view/UserList/UserList.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('用户列表'),
          },
        },
        {
          path: 'userComplaintsList',
          name: 'UserComplaintsList',
          component: () =>
            import('/@/modules/UserModule/view/userComplaints/userComplaintsList.vue'),
          meta: {
            icon: 'ci:dot-03-m',

            title: t('用户投诉'),
          },
        },
        {
          path: 'details',
          name: 'Details',
          component: () => import('/@/modules/UserModule/view/UserList/UserDetails.vue'),
          meta: {
            icon: 'ci:dot-03-m',
            title: t('详情'),
            hideChildrenInMenu: true,
            hideMenu: true,
          },
        },
        {
          path: 'UserGrowth',
          name: 'UserGrowth',
          component: () => import('/@/modules/UserModule/view/UserGrowth/UserGrowth.vue'),
          meta: {
            icon: 'ci:dot-03-m',
            title: t('积分成长值'),
          },
        },
        // {
        //   path: 'UserBlacklist',
        //   name: 'UserBlacklist',
        //   component: () => import('/@/modules/UserModule/view/UserBlacklist/UserBlacklist.vue'),
        //   meta: {
        //     icon: 'ph:user-circle-gear-fill',
        //     title: t('黑名单'),
        //   },
        // },
        {
          path: 'UserBlackDetails',
          name: 'UserBlackDetails',
          component: () => import('/@/modules/UserModule/view/UserBlacklist/UserBlackDetails.vue'),
          meta: {
            icon: 'ci:dot-03-m',
            title: t('黑名单详情'),
            hideMenu: true,
          },
        },
        {
          path: 'UseLevelDetail',
          name: 'UseLevelDetail',
          component: () => import('/@/modules/UserModule/view/UseLevelDetail/UseLevelDetail.vue'),
          meta: {
            icon: 'ci:dot-03-m',
            title: t('用户等级明细'),
            hideMenu: true,
          },
        },
      ],
    },
  ],
}

export default userList
