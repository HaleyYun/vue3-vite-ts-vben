import { t } from '/@/hooks/web/useI18n'

export const circleModuleData = [
  {
    path: 'thinkManager',
    name: 'ThinkManager',
    component: () => import('/@/modules/ContentModule/view/ThinkManager/ThinkManager.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('想法列表'),
    },
  },
  {
    path: 'problemManage',
    name: 'ProblemManage',
    component: () =>
      import('/@/modules/ContentModule/view/CircleManage/ProblemManage/ProblemManage.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('问题管理'),
    },
  },
  {
    path: 'answerManage',
    name: 'AnswerManage',
    component: () =>
      import('/@/modules/ContentModule/view/CircleManage/AnswerManage/AnswerManage.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('回答管理'),
    },
  },
  {
    path: 'videoManage',
    name: 'VideoManage',
    component: () =>
      import('/@/modules/ContentModule/view/CircleManage/VideoManage/VideoManage.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('视频管理'),
    },
  },
  {
    path: 'reportManage',
    name: 'ReportManage',
    component: () =>
      import('/@/modules/ContentModule/view/CircleManage/ReportManage/ReportManage.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('举报管理'),
    },
  },
  {
    path: 'columnManage',
    name: 'ColumnManage',
    component: () =>
      import('/@/modules/ContentModule/view/CircleManage/ColumnManage/ColumnManage.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('栏目管理'),
    },
  },
]

// 内容管理
export const contentModuleData = [
  {
    path: 'manualUse',
    name: 'ManualUse',
    component: () => import('/@/modules/ContentModule/view/ContentManage/ManualUse/ManualUse.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('招商手册'),
      hideChildrenInMenu: true, //暂时隐藏
      hideMenu: true, //暂时隐藏
    },
  },
  {
    path: 'manualContent',
    name: 'ManualContent',
    component: () =>
      import('/@/modules/ContentModule/view/ContentManage/ManualUse/ManualContent.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('招商手册内容'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  {
    path: 'ManualClassification',
    name: 'ManualClassification',
    component: () =>
      import('/@/modules/ContentModule/view/ContentManage/ManualUse/ManualClassification.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('招商手册分类管理'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  {
    path: 'helpCenter',
    name: 'HelpCenter',
    component: () => import('/@/modules/ContentModule/view/HelpCenter/HelpCenter.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('帮助中心'),
    },
  },
  {
    path: 'classification',
    name: 'Classification',
    component: () => import('/@/modules/ContentModule/view/HelpCenter/Classification.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('分类管理'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  {
    path: 'addCenterDetails',
    name: 'AddCenterDetails',
    component: () =>
      import('/@/modules/ContentModule/view/HelpCenter/compontents/AddCenterDetails.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('新增帮助中心'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  {
    path: 'studyCenter',
    name: 'StudyCenter',
    component: () =>
      import('/@/modules/ContentModule/view/StudyCenter/view/StudyCenter/StudyCenter.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('学习中心'),
    },
  },
  {
    path: 'classificationManagement',
    name: 'ClassificationManagementTable',
    component: () =>
      import(
        '/@/modules/ContentModule/view/StudyCenter/compontents/classificationManagementTable.vue'
      ),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('分类管理'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  {
    path: 'studyCenterDetails',
    name: 'StudyCenterDetails',
    component: () =>
      import('/@/modules/ContentModule/view/StudyCenter/view/StudyCenter/StudyCenterDetails.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('学习中心详情'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  {
    path: 'repairTechnology',
    name: 'RepairTechnology',
    component: () => import('/@/modules/ContentModule/view/RepairTechnology/RepairTechnology.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('修理厂技术指导'),
    },
  },
  {
    path: 'repairContent',
    name: 'RepairContent',
    component: () => import('/@/modules/ContentModule/view/RepairTechnology/RepairContent.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('技术指导内容'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  {
    path: 'repairClassification',
    name: 'RepairClassification',
    component: () =>
      import('/@/modules/ContentModule/view/RepairTechnology/RepairClassification.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('技术指导分类管理'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  {
    path: 'authentication',
    name: 'Authentication',
    component: () => import('/@/modules/ContentModule/view/Authentication/Authentication.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('认证课程管理'),
    },
  },
  {
    path: 'curriculumContent',
    name: 'CurriculumContent',
    component: () => import('/@/modules/ContentModule/view/Authentication/CurriculumContent.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('认证课程内容'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  {
    path: 'curriculumClassification',
    name: 'CurriculumClassification',
    component: () =>
      import('/@/modules/ContentModule/view/Authentication/CurriculumClassification.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('认证课程分类管理'),
      hideChildrenInMenu: true,
      hideMenu: true,
    },
  },
  {
    path: 'voiceBinding',
    name: 'VoiceBinding',
    component: () => import('/@/modules/ContentModule/view/VoiceBinding/VoiceBinding.vue'),
    meta: {
      icon: 'ci:dot-03-m',

      title: t('语音识别绑定'),
    },
  },
]
