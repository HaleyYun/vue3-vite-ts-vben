import { t } from '/@/hooks/web/useI18n'
//基础设置
// export const SetBasicSettings = [
//     {
//         // 城市设置
//         path: 'citySetting',
//         name: 'CitySetting',
//         component: () =>
//             import(
//                 '/@/modules/SetupModule/BasicSettings/CitySetting/CitySetting.vue'
//             ),
//         meta: {
//             icon: 'ci:dot-03-m',

//             hideChildrenInMenu: true,
//             title: t('城市设置'),
//         },
//     },
// ]
//权限管理
export const SetPermissionManage = [
    {
        // 角色管理
        path: 'roleManage',
        name: 'RoleManage',
        component: () =>
            import(
                '/@/modules/SetupModule/PermissionManage/RoleManage/RoleManage.vue'
            ),
        meta: {
            icon: 'ci:dot-03-m',

            hideChildrenInMenu: true,
            title: t('角色管理'),
        },
    },
    {
        // 账号管理
        path: 'accountManage',
        name: 'AccountManage',
        component: () =>
            import(
                '/@/modules/SetupModule/PermissionManage/AccountManage/AccountManage.vue'
            ),
        meta: {
            icon: 'ci:dot-03-m',

            hideChildrenInMenu: true,
            title: t('账号管理'),
        },
    },
    {
        // 权限字典
        path: 'dictionaries',
        name: 'Dictionaries',
        component: () =>
            import(
                '/@/modules/SetupModule/PermissionManage/Dictionaries/Dictionaries.vue'
            ),
        meta: {
            icon: 'ci:dot-03-m',

            hideChildrenInMenu: true,
            title: t('权限字典'),
        },
    },
    {
        // 脱敏管理
        path: 'desensitization',
        name: 'Desensitization',
        component: () =>
            import(
                '/@/modules/SetupModule/PermissionManage/Desensitization/Desensitization.vue'
            ),
        meta: {
            icon: 'ci:dot-03-m',

            hideChildrenInMenu: true,
            title: t('脱敏管理'),
        },
    },
    {
        // app版本
        path: 'VersionSettings',
        name: 'versionSettings',
        component: () =>
            import(
                '/@/modules/SetupModule/PermissionManage/VersionSettings/VersionSettings.vue'
            ),
        meta: {
            icon: 'ci:dot-03-m',

            hideChildrenInMenu: true,
            title: t('app版本'),
        },
    },
]

