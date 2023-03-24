import type { AppRouteModule } from '/@/router/types'

import { LAYOUT, getParentLayout } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'
import {
    SetPermissionManage,
    // SetBasicSettings,
} from '/@/modules/SetupModule/router/index'

const setup: AppRouteModule = {
    path: '/setup',
    name: 'Setup',
    component: LAYOUT,
    meta: {
        orderNo: 9,
        icon: 'ant-design:setting-outlined',
        title: t('设置'),
    },
    children: [
        // {
        //     path: 'basicSettings',
        //     name: 'BasicSettings',
        //     component: getParentLayout('view'),
        //     meta: {
        //         title: '基础设置',
        //     },
        //     children: [...SetBasicSettings],
        // },
        {
            path: 'permissionManage',
            name: 'PermissionManage',
            component: getParentLayout('view'),
            meta: {
                title: '权限管理',
            },
            children: [...SetPermissionManage],
        },
    ],
}

export default setup
