import {
  $goodsBrandPrefix,
  $goodsKeyword,
  $goodsGoods,
  $goodsCategory,
  $goodsSkuProperty,
  $goodsParamProperty,
  $goodsTemplate,
  $community,
  $goodsType,
  $goodsResource,
  $file,
  $goodsInvestment,
  $fileOperations,
  $user,
  $member,
  $merchant,
  $area,
  $api,
  $orderSell,
  $merchantUniversity,
  $warehouse,
  $order,
  $vehicleBrandPrefix,
  $vehicleDispose,
  $filePc,
  $wareHouseDeal,
  $sixhot,
  $companyApi,
  $customerApi,
  $certificationApi,
  $goodsProject,
  $goodsModelCommission,
  $goodsRecycleModel,
  $menu,
  $goodsModel,
  $content,
  $orderEvaluate,
  $contentCertificationCourseCategory,
  $contentInvestment,
  $contentTechnicalCategory,
  $contentTechnical,
  $role,
  $roles,
  $account,
  $version,
  $goodsRecyclePre,
  $goodsModelApply,
  $supportInstall,
  $activationList,
  $quota,
  $receiver,
  $finances,
  $orderSupportAfterSale,
  $orderAssign,
  $orderEvaluateAfterSale,
  $integralRule,
  $integralUserLevel,
  $grant,
  $orderCount,
  $goodsStatistic,
  $homePagePc,
  $goodsBrands,
  $goods,
} from '../../../helpers/amdin-api-prefix-v1'

export default {
  home: {
    homePagePcOrderNumberLine: `${$homePagePc}order/number/line`, // 订单数-折线图 - POST
    homePagePcAmountCountLine: `${$homePagePc}amount/count/line`, // 平台交易额-折线图- POST
    homePagePcAmountFeePie: `${$homePagePc}amount/fee/pie`, // 平台总收入-饼状图 - POST
  },
  integral: {
    integralRuleUpdate: `${$integralRule}update`, // 修改规则信息
    integralRuleList: `${$integralRule}list`, // 查询积分成长值规则
    integralUserLevelList: `${$integralUserLevel}list`, // 查询等级设置
    integralUserLevelAdd: `${$integralUserLevel}add`, // 新增等级设置
    integralUserLevelUpdate: `${$integralUserLevel}update`, // 修改等级设置
    grantRecordList: `${$grant}record/list`, // 查询用户成长值积分明细
  },
  quota: {
    quotaRecordPage: `${$quota}record/page`, // 获取账期额度调整记录列表-GET
    quotaGetBy$CompanyId: `${$quota}get/`, // 获取账期额度信息-GET
    quotaAdd: `${$quota}add`, // 新增账期额度-GET
    quotaCoefficientSave: `${$quota}coefficient/save`,
  },
  support: {
    supportInstallQueryList: `${$supportInstall}query/list`, // 安装服务订单-安装订单列表查询-POST
    supportInstallDetailBy$id: `${$supportInstall}detail/`, // 安装服务订单-查看详情-GET
    supportInstallListCount: `${$supportInstall}list/count`, // 安装服务订单-页签-GET
    supportInstallUpdate: `${$supportInstall}update`, // 安装服务订单-修改安装服务单-POST
    supportInstallConfirm: `${$supportInstall}confirm`, // 安装服务订单-确认安装完成-POST
    supportInstallHandel: `${$supportInstall}order/handel`, // 安装服务订单-订单处理结果-POST
  },
  activation: {
    activationRecordQueryPage: `${$activationList}record/query/page`, // 激活列表列表查询-POST
    activationRecordBy$id: `${$activationList}record/`, //取消激活-Delete
  },

  finance: {
    financeBillConfigDefault: `${$finances}bill/config/default`, // 结算配置-取默认结算周期规则-GET
    financeBillConfig: `${$finances}bill/config`, // 结算配置-修改结算配置信息-GET
    financeMarginPage: `${$finances}margin/page`, // 保证金查询分页列表查询-POST
    financeMarginDetail: `${$finances}margin/detail`, // 保证金查看详情-POST
    financeBillOrderPage: `${$finances}bill/order/page`, // 未结算订单分页查询-POST
    financeBillOrder: `${$finances}bill/order`, // 添加未结算订单-POST
    financeBillOrderBatch: `${$finances}bill/order/batch`, // 批量添加未结算订单-POST
    financeBillManagePage: `${$finances}bill/manage/page`, // 分页获取结算单信息-POST
    financeBillManageBy$id: `${$finances}bill/manage/id`, // id 获取结算单详情-GET
    financeBillManageManualBill: `${$finances}bill/manage/manual/bill`, // 结算单 id，手动结算异常结算单
    financeAdvancesStandingPage: `${$finances}advances/standing/page`, // 平台垫付(转账)分页列表=POST
    financeAdvancesStandingDetailBy$id: `${$finances}advances/standing/detail`, // 查看详情-POST
    financeAdvancesStandingConfirmBy$id: `${$finances}advances/standing/confirm`, //确认收款 -POST
    financePayPcPage: `${$finances}pay/pc/page`, // 分页查询支付单列表
    financePayDetail: `${$finances}pay/detail`, //根据支付获取支付单详情

    financeInvoiceSelectList: `${$finances}invoice/select/list`, //发票分页列表查询
    financeInvoiceDetailSellBy$id: `${$finances}invoice/detail/sell`, //发票详情
    financeInvoiceConfirmInvoice: `${$finances}invoice/confirm/invoice`, //确认开票
    financeInvoiceDetailBy$id: `${$finances}invoice/detail`, //开票详情页,不包含订单
    financeInvoiceOrderListBy$id: `${$finances}invoice/order/list`, //开票页订单信息
  },
  role: {
    rolePage: `${$role}page`, // 角色分页查询
    role: `${$roles}`, //新增
    modifyRole: `${$roles}`, //修改
    rolePerms: `${$role}perms`, //修改角色权限
    role$Id: `${$role}`, //删除
    roleGet$Id: `${$role}`, //根据角色获取id
    roleCompany: `${$role}company`, //获取角色列表
    accountMaskPage: `${$account}mask/page`, //脱敏分页
    accountMask$Id: `${$account}mask/`, //脱敏删除
    accountMaskAdd: `${$account}mask`, //脱敏新增
    accountMaskEdit: `${$account}mask`, //脱敏编辑
    accountMaskGET: `${$account}mask`, //脱敏 获取单条数据GET
    accountMaskList: `${$account}mask/list`, //脱敏 获取所有启用状态脱敏字段list
    accountMaskRole: `${$account}mask/role`, //角色 id 获取角色数据脱敏规则
    accountMaskRole$Post: `${$account}mask/role`, //新增角色与脱敏字段关系
    accountMaskRole$Put: `${$account}mask/role`, //修改角色脱敏字段是否脱敏
    versionCurrentVersion: `${$version}currentVersion`, //获取版本号
    versionSave: `${$version}save`, //保存版本号
  },

  customer: {
    customerRoleCompany: `${$customerApi}role/company`,
  },
  content: {
    contentContentCondition: `${$content}content/condition`, // 认证课程管理-列表查询-POST
    contentCertificationCourseCondition: `${$content}certificationCourse/condition`, // 认证课程管理-列表查询-POST
    contentCertificationCourseSave: `${$content}certificationCourse/save`, // 认证课程管理-新增内容-POST
    contentCertificationCourseModify: `${$content}certificationCourse/modify`, // 认证课程管理-修改内容-PUT
    contentCertificationCourseDelete: `${$content}certificationCourse/delete`, // 认证课程管理-逻辑删除-PUT
    contentCertificationCourseBatchUpdate: `${$content}certificationCourse/batch/update`, // 认证课程管理-批量删除-PUT
    contentCertificationCourseEnable: `${$content}certificationCourse/enable`, // 认证课程管理-是否启用-PUT

    contentCertificationCourseCategoryCondition: `${$contentCertificationCourseCategory}condition`, // 认证课程管理分类-列表查询-POST
    contentCertificationCourseCategorySave: `${$contentCertificationCourseCategory}save`, // 认证课程管理分类-新增分类-POST
    contentCertificationCourseCategoryModify: `${$contentCertificationCourseCategory}modify`, // 认证课程管理分类-列表查询-PUT
    contentCertificationCourseCategoryEnable: `${$contentCertificationCourseCategory}enable`, // 认证课程管理分类-是否启用-PUT
    contentCertificationCourseCategorySort: `${$contentCertificationCourseCategory}sort`, // 认证课程管理分类-列表查询-PUT

    contentInvestmentCondition: `${$contentInvestment}condition`, // 招商手册-列表查询-POST
    contentInvestmentModify: `${$contentInvestment}modify`, // 招商手册-修改内容-PUT
    contentInvestmentDelete: `${$contentInvestment}delete`, // 招商手册-逻辑删除-PUT
    contentInvestmentBatchUpdate: `${$contentInvestment}batch/update`, // 招商手册-批量删除-PUT

    contentTechnicalCategoryCondition: `${$contentTechnicalCategory}condition`, // 修理厂技术指导管理分类-列表查询-POST
    contentTechnicalCategorySave: `${$contentTechnicalCategory}save`, // 修理厂技术指导管理分类-新增分类-POST
    contentTechnicalCategoryModify: `${$contentTechnicalCategory}modify`, // 修理厂技术指导管理分类-修改分类-PUT
    contentTechnicalCategoryDelete: `${$contentTechnicalCategory}delete`, // 修理厂技术指导管理分类-删除(逻辑删除)-PUT
    contentTechnicalCategoryEnable: `${$contentTechnicalCategory}enable`, // 修理厂技术指导管理分类-是否启用-PUT
    contentTechnicalCategorySort: `${$contentTechnicalCategory}sort`, // 修理厂技术指导管理分类-排序-PUT

    contentTechnicalCondition: `${$contentTechnical}condition`, // 修理厂技术指导管理分类-列表查询-POST
    contentTechnicalSave: `${$contentTechnical}save`, // 修理厂技术指导管理分类-新增分类-POST
    contentTechnicalModify: `${$contentTechnical}modify`, // 修理厂技术指导管理分类-修改分类-PUT
    contentTechnicalDelete: `${$contentTechnical}delete`, // 修理厂技术指导管理分类-删除(逻辑删除)-PUT
    contentTechnicalBatchUpdate: `${$contentTechnical}batch/update`, // 修理厂技术指导管理分类-批量删除-PUT
    contentTechnicalBatchDelete: `${$contentTechnical}batch/delete`, // 修理厂技术指导管理分类-删除(逻辑删除)-PUT
    contentTechnicalEnable: `${$contentTechnical}enable`, // 修理厂技术指导管理分类-是否启用-PUT
    contentTechnicalCategoryRecommend: `${$contentTechnical}recommend`, // 修理厂技术指导管理分类-排序-PUT
    contentTechnicalRecommend: `${$contentTechnical}recommend`, // 修理厂技术指导管理分类-是否精选

    contentContentSaveBatch: `${$content}content/save/batch`, // 商家大学内容管理-批量新增内容-POST
    contentCategorySaveBatch: `${$content}category/save/batch`, //商家大学分类管理-批量新增分类-POST

    contentHelpContentSaveBatch: `${$content}help/content/save/batch`, // 帮助中心内容管理-批量新增内容-POST
    contentHelpCategorySaveBatch: `${$content}help/category/save/batch`, //帮助中心分类管理-批量新增分类-POST

    contentVoiceRecognizeBindQueryListPage: `${$content}voice/recognize/bind/query/list/page`, //语音识别绑定列表-POST
    contentVoiceRecognizeBindStatusUpdate: `${$content}voice/recognize/bind/status/update`, //语音识别绑定列表禁用启用-Put
    contentVoiceRecognizeBindDeleteBatch: `${$content}voice/recognize/bind/delete/batch`, //语音识别绑定列表批量删除
    contentVoiceRecognizeBindBy$id: `${$content}voice/recognize/bind`, //语音识别绑定列表删除
    contentVoiceRecognizeBindSave: `${$content}voice/recognize/bind/save`, //语音识别绑定列表添加
    contentVoiceRecognizeBindUpdate: `${$content}voice/recognize/bind/update`, //语音识别绑定列表禁用修改
    contentFunctionRouteList: `${$content}function/route/list`, //获取路由列表映射
  },
  menu: {
    menuBtnPerms: `${$menu}btn/perms`, // 用户信息获取按钮 perms列表
    menuTree: `${$menu}tree`, // 菜单管理-根据用户信息获取菜单树-GET
    menuList: `${$menu}list`, // 菜单管理-根据用户信息获取菜单列表-GET
    menuNameTree: `${$menu}name/tree`, // 菜单管理-菜单名获取菜单列表，name 为空返回树形结构，name 有值不拼接树-GET
    menu$POST: `${$menu}`, // 菜单管理-保存菜单-POST
    menu$PUT: `${$menu}`, // 菜单管理-更新菜单-PUT
    menu$Id: `${$menu}`, // 菜单管理-删除菜单
    menuRoleTree: `${$menu}role/tree`, // 菜单管理-角色 id 获取权限列表
    menuOrgTree: `${$menu}org/tree`, // 菜单管理-用户信息中组织 id 获取组织权限列表 - GET
    menuTreeLeaf: `${$menu}tree/leaf`, // 当前用户叶子节点 id 集合- GET
    menuTreeRoleLeaf: `${$menu}tree/role/leaf`, // 当前用户叶子节点 id 集合- GET
  },
  company: {
    companyInfoChangeRelation: `${$merchant}info/change/relation`,
    companyInfoRemoveRelation: `${$merchant}info/remove/relation`,
    // 统计相关
    companyStatisticsAgentAccountAmount: `${$merchant}statistics/agent/account/amount`, // 查询账户实时余额-GET
    companyInfoGarageList: `${$merchant}info/garage/list`, // 关联汽修厂排名-获取汽修厂列表-GET
    companyInfoGarageCountPage: `${$merchant}info/garage/count/page`, // 关联汽修厂排名-关联汽修厂排名-POST
    companyInfoCustomerCount: `${$merchant}info/customer/count`, // 平台客户数（身份分组）
    companyInfoCustomerTotal: `${$merchant}info/customer/total`, // 平台客户总数
    companyStatisticsAgentAccountInfo: `${$merchant}statistics/agent/account/info`, // 分页查询服务商账户信息 - POST

    companyContractGetBy$id: `${$merchant}contract/get/`, // 企业合同信息管理-获取合同详情信息-GET
    companyContractListBy$CompanyId: `${$merchant}contract/list/`, // 企业合同信息管理-获取企业合同信息-GET
    companyContractUpdate: `${$merchant}contract/update`, // 企业合同信息管理-修改合同信息-POST
    companyContractAdd: `${$merchant}contract/add`, // 企业合同信息管理-新增合同信息-POST

    companyInfoManageList: `${$merchant}info/manage/list`,
    companyInfoRemoveBinder: `${$merchant}info/remove/binder`,
    companyInfoChangeBinder: `${$merchant}info/change/binder`,
    CompanyInfoPlatformStoreName: `${$merchant}info/platform/store/name`, //根据（平台角色code、店铺名称）模糊查询企业信息
    CompanyInfoSelectPage: `${$merchant}info/select/page`, // 获取企业下拉列表
    companyInfoChangeManager: `${$merchant}info/change/manager`, //修改角色
    CompanyLegalAttractMobile: `${$companyApi}legal/attract/mobile`, // 验证该手机号是否已存在招商经理
    CompanyLegalAttractAdd: `${$companyApi}legal/attract/add`, // 新增招商经理
    CompanyLegalChannelAdd: `${$companyApi}legal/channel/add`, // 新增渠道经理
    CompanyLegalChannelMobile: `${$companyApi}legal/channel/mobile`, // 验证该手机号是否已存在渠道经理
    CompanyInfoManagerUnbind: `${$merchant}info/manager/unbind`, // 渠道/招商经理-解除管辖企业绑定关系
    CompanyInfoManagerRelationPage: `${$merchant}info/manager/relation/page`, // 渠道/招商经理-管辖企业分页查询列表
    CompanyInfoManagerPage: `${$merchant}info/manager/page`, // 渠道/招商经理-分页查询列表
    companyInfoAgentAssociatedGaragePage: `${$merchant}info/agent/associated/garage/page`, // 获取服务商关联的汽修厂信息分页列表

    companyLegalOldMachineMobile: `${$companyApi}legal/oldMachine/mobile`, // 验证该手机号是否已存在旧机买家-GET
    companyLegalSkilledWorkerMobile: `${$companyApi}legal/skilledWorker/mobile`, // 验证该手机号是否已存在技术工-GET
    companyLegalSkilledWorkerAdd: `${$companyApi}legal/SkilledWorker/add`, // 新增技术工-POST
    companyLegalOldMachineAdd: `${$companyApi}legal/oldMachine/add`, // 新增旧机买家-POST
    companyInfoSkilledWorkerAssociatedPage: `${$merchant}info/skilledWorker/associated/page`, // 技术工邀请技术工分页列表-POST
    companyInfoSkilledWorkerDetailsBy$id: `${$merchant}info/skilledWorker/details/`, // 技术工详情-GET
    companyInfoSkilledWorkerAssociatedGaragePage: `${$merchant}info/skilledWorker/associatedGarage/page`, // 技术工邀请汽修厂分页列表-POST
    companyInfoOldMachineGetBy$id: `${$merchant}info/oldMachine/get/`, // 旧机买家详情-GET
    companyInfoSkilledWorkerPage: `${$merchant}info/skilledWorker/page`, // 技术工分页列表-POST
    companyInfoShowStatus: `${$merchant}info/show/status`, // 技术工扩客
    companyInfoSkilledWorkerTab: `${$merchant}info/skilledWorker/tab`, // 技术工tab页签 - GET
    companyInfoOldMachineTab: `${$merchant}info/oldMachine/tab`, // 旧机买家tab页签-GET
    companyInfoOldMachineAuditLinkBy$id: `${$merchant}info/oldMachine/audit/link/`, //旧机买家审核链路-GET
    companyInfoOldMachinePage: `${$merchant}info/oldMachine/page`, // 旧机买家分页列表-POST
    companyInfoStoreInfoBy$CompanyId: `${$merchant}info/store/info/`, // 获取企业店铺信息-GET
    companyInfoFinancialBy$CompanyId: `${$merchant}info/financial/`, // 客户财务信息-GET
    companyInfoBankCardListBy$CompanyId: `${$merchant}info/bankcard/list/`, // 企业法人银行卡信息列表-GET
    companyInfoManageUpdate: `${$merchant}/info/manage/update`, // 修改店铺详情
    companyLegalAuthInfo: `${$companyApi}legal/auth/info`, // 获取旧机买家详细 （修改接口专用
    companyLegalOldMachineUpdate: `${$companyApi}legal/oldMachine/update`, //更新旧机买家信息
    companyLegalAnewIdentity: `${$companyApi}legal/anew/identity`, // 身份证重新认证 旧机买家
    companyLegalWnewLicense: `${$companyApi}legal/anew/license`, // 营业执照重新认证 旧机买家
    companyLegalAnewAll: `${$companyApi}legal/anew/all`, // 营业执照和身份证重新认证 旧机买家
    receiverAddressList: `${$receiver}address/list`, // 获取地址
    companyInfoBind: `${$merchant}info/bind`, //绑定企业
    companyInfoGarageNotBindPage: `${$merchant}info/garage/notBind/page`, //获取未被绑定的客户信息
    companyInfoSkilledWorkerUnbind: `${$merchant}info/skilledWorker/unbind`, // 技术工-解除管辖企业绑定关系
    companyStatisticsAgentAccountDetail: `${$merchant}statistics/agent/account/detail`, // 分页查询服务商账户明细接口
    companyInfoSkilledWorkerOpenqualify: `${$merchant}info/skilledWorker/openqualify`, // 技术工接单资格开通
    companyInfoServiceProject: `${$merchant}info/service/project`, // 获取修理厂服务项目字典值
    companyInfoCarSeries: `${$merchant}info/car/series`, // 获取修理厂车系字典值
    companyStatisticsAccountWithdrawApply: `${$merchant}statistics/account/withdraw/apply`, // 账户台账
    companyInfoGarageBaseUpdate: `${$merchant}info/garage/base/update`, // 更新修理厂基本信息
  },
  vehicle: {
    communityVehicleModelModelList:`${$vehicleDispose}model/modelList`,//车型库列表
    communityVehicleModelModelDetail:`${$vehicleDispose}model/detail`,//车型库详情
    communityVehicleModelBindBatchModel:`${$vehicleDispose}model/bindBatchModel`,//绑定车型
    communityVehicleModelCondition:`${$vehicleDispose}model/condition`,//车型联动查询
    brand: {
      selectSeries: `${$vehicleBrandPrefix}selectSeries`,
      selectParameters: `${$vehicleBrandPrefix}selectParameters`,
      selectOne: `${$vehicleBrandPrefix}selectOne`,
      selectMode: `${$vehicleBrandPrefix}selectMode`,
    },
  },
  file: {
    // 文件操作
    fileUpload: `${$file}fileUpload`,
    imgUpload: `${$file}imgUpload`,
    videoUpload: `${$file}videoUpload`,
    operations: {
      getObject: `${$fileOperations}getObject`,
      getImageThumbnail: `${$fileOperations}getImageThumbnail`,
      temporaryToForever: `${$fileOperations}temporaryToForever`,
      copyObject: `${$fileOperations}copyObject`,
    },
  },
  filePc: {
    fileUpload: `${$filePc}fileUpload`,
    imgUpload: `${$filePc}imgUpload`,
    videoUpload: `${$filePc}videoUpload`,
    imgUploadBatch: `${$filePc}imgUploadBatch`,
    videoUploadBatch: `${$filePc}videoUploadBatch`,
  },
  // 社群板块
  community: {
    column: {
      condition: `${$community}column/condition`,
      delete$id: `${$community}column/delete/`,
      modify: `${$community}column/modify`,
      save: `${$community}column/save`,
      batch: `${$community}column/save/batch`,
    },
    content: {
      tipoff: {
        getOne: `${$community}content/tipoff/getOne`,
        approved: `${$community}content/tipoff/approved`,
        condition: `${$community}content/tipoff/condition`,
        reject: `${$community}content/tipoff/reject`,
        detail: `${$community}content/tipoff/detail`,
      },
      answer: {
        getOne: `${$community}content/answer/getOne`,
        approved: `${$community}content/answer/approved`,
        condition: `${$community}content/answer/condition`,
        delete: `${$community}content/answer/delete`,
        detail: `${$community}content/answer/detail`,
        offSale: `${$community}content/answer/off/sale`,
        reject: `${$community}content/answer/reject`,
        recommend: `${$community}content/answer/recommend`,
        cancelRecommend: `${$community}content/answer/cancel/recommend`,
        save: `${$community}content/answer/save`,
        modify: `${$community}content/answer/modify`,
        query: {
          comment: `${$community}content/answer/query/comment`,
        },
        top: `${$community}content/answer/top`,
        reset: `${$community}content/answer/reset`,
      },
      idea: {
        approved: `${$community}content/idea/approved`,
        condition: `${$community}content/idea/condition`,
        delete: `${$community}content/idea/delete`,
        exist: `${$community}content/idea/exist`,
        modify: `${$community}content/idea/modify`,
        offsale: `${$community}content/idea/off/sale`,
        reject: `${$community}content/idea/reject`,
        release: `${$community}content/idea/release`,
        cancelRecommend: `${$community}content/idea/cancel/recommend`,
        recommend: `${$community}content/idea/recommend`,
        detail: `${$community}content/idea/detail`,
        query: {
          comment: `${$community}content/idea/query/comment`,
        },
        getOne: {
          batch: `${$community}content/idea/release/batch`,
        },
      },
      video: {
        detail: `${$community}content/video/detail`,
        approved: `${$community}content/video/approved`,
        condition: `${$community}content/video/condition`,
        delete: `${$community}content/video/delete`,
        exist: `${$community}content/video/exist`,
        modify: `${$community}content/video/modify`,
        offsale: `${$community}content/video/off/sale`,
        reject: `${$community}content/video/reject`,
        release: `${$community}content/video/release`,
        cancelRecommend: `${$community}content/video/cancel/recommend`,
        recommend: `${$community}content/video/recommend`,
        getOne: `${$community}content/video/getOne`,
        query: {
          comment: `${$community}content/video/query/comment`,
        },
      },
      question: {
        approved: `${$community}content/question/approved`,
        condition: `${$community}content/question/condition`,
        delete: `${$community}content/question/delete`,
        exist: `${$community}content/question/exist`,
        modify: `${$community}content/question/modify`,
        offsale: `${$community}content/question/off/sale`,
        reject: `${$community}content/question/reject`,
        release: `${$community}content/question/release`,
        cancelRecommend: `${$community}content/question/cancel/recommend`,
        recommend: `${$community}content/question/recommend`,
        getOne: `${$community}content/question/getOne`,
        query: {
          comment: `${$community}content/question/query/comment`,
        },
      },
    },
  },
  // 商品模块
  goods: {
    goodsGoodsDistributionStatus:`${$goodsGoods}distribution/status`, //修改寄售状态
    goodsGoodsDistributionUpdatePrice:`${$goodsGoods}distribution/update/price`, //修改寄售价格
    goodsDistributionArticlNumber:`${$goodsGoods}distribution/articl/number`, // 获取寄售商品品号
    goodsGoodsDistributionPageList:`${$goodsGoods}distribution/page/list`, // 获取寄售商品列表
    goodsTemplateGetProfit: `${$goodsTemplate}getprofit`, // 获取商品的利润
    goodsStatisticQuerySalesRankingList: `${$goodsStatistic}query/sales/ranking/list`, // 商品销量排名
    goodsStatisticQuerySalesComparisonList: `${$goodsStatistic}query/sales/comparison/list`, // 同型号商品销量对比
    goodsStatisticQueryInvestRankingList: `${$goodsStatistic}query/invest/ranking/list`, // 投资覆盖率排名

    goodsGoodsShop: `${$goodsGoods}shop`, // 获取商家-商品
    goodsInvestmentShop: `${$goodsInvestment}shop`, // 获取商家-项目
    goodsModelRecycleStatus: `${$goodsModel}recycle/status`, // 旧机回收商品-暂停/启动回收-PUT
    goodsModelRecycleOperate: `${$goodsModel}recycle/operate`, // 旧机回收商品-操作历史记录-GET
    goodsModelRecycleCount: `${$goodsModel}recycle/count`, // 旧机回收商品-初始化数量统计-GET
    goodsModelRecycleQueryListPage: `${$goodsModel}recycle/query/list/page`, // 旧机回收商品-列表查询（带分页）-POST
    goodsModelRecycleDetail: `${$goodsModel}recycle/detail`, // 旧机回收商品-详情-GET

    goodsResourceFileList: `${$goodsResource}fileList`, // 商品资源库管理-文件列表-POST

    goodsModelApplyView: `${$goodsModelApply}view`, //商品型号申请-详情-GET
    goodsModelApplyApproval: `${$goodsModelApply}approval`, //商品型号申请-审核-POST
    goodsModelApplyQueryPage: `${$goodsModelApply}query/page`, //商品型号申请-列表-分页-POST

    goodsModelSave: `${$goodsModel}save`, // 商品型号-新增-POST
    goodsModelUpdate: `${$goodsModel}update`, // 商品型号-修改-PUT
    goodsModelEnableUpdate: `${$goodsModel}enable/update`, // 商品型号-启用/禁用-PUT
    goodsModelBatchDelete: `${$goodsModel}batch/delete`, // 商品型号-批量删除-DELETE
    goodsModelDeleteBy$id: `${$goodsModel}delete`, // 商品型号-删除-DELETE
    goodsModelQueryPage: `${$goodsModel}query/page`, // 商品型号-列表-分页-POST
    goodsModelSelectList: `${$goodsModel}select/list`, // 商品型号-型号下拉列表-POST
    goodsModelQueryListCatergory: `${$goodsModel}query/list/catergory`, // 商品型号-根据类别查询商品型号

    goodsModelCompensateSave: `${$goodsModel}compensate/save`, // 售后补偿配置-新增-POST
    goodsModelCompensateUpdate: `${$goodsModel}compensate/update`, // 售后补偿配置-修改-POST
    goodsModelCompensateSendBackUpdate: `${$goodsModel}compensate/sendBack/update`, // 旧件寄回-启用/禁用-GET
    goodsModelCompensateDeleteBy$id: `${$goodsModel}compensate/delete`, // 售后补偿配置-删除-DELETE
    goodsModelCompensateQueryPage: `${$goodsModel}compensate/query/page`, // 售后补偿配置-列表-分页-POST
    goodsModelCompensateUnitList: `${$goodsModel}compensate/unit/list`, // 售后补偿配置-零部件列表-GET

    goodsModelCommissionUpdate: `${$goodsModelCommission}update`, // 服务佣金配置 修改
    goodsModelCommissionModelProvince: `${$goodsModelCommission}model/province`, // 服务佣金配置 获取已设置省份
    goodsModelCommissionExport: `${$goodsModelCommission}export`, // 服务佣金配置 导出
    goodsModelCommissionQueryPageList: `${$goodsModelCommission}query/page/list`, // 服务佣金配置 分页查询
    goodsModelCommissionDelBy$id: `${$goodsModelCommission}`, // 服务佣金配置 删除
    goodsModelCommissionProvince: `${$goodsModelCommission}province`, // 服务佣金配置 获取全国34个省份
    goodsModelCommissionDetail: `${$goodsModelCommission}detail`, // 服务佣金配置 详情
    goodsModelCommissionSave: `${$goodsModelCommission}save`, // 服务佣金配置 添加

    goodsRecycleModelStatus: `${$goodsRecycleModel}status`, // 旧机回收商品-pc 暂停/启动回收 --PUT
    goodsRecycleModelOperate: `${$goodsRecycleModel}operate`, // 旧机回收商品-pc 操作历史记录 --GET
    goodsRecycleModelCount: `${$goodsRecycleModel}count`, // 旧机回收商品-pc 初始化数量统计 --GET
    goodsRecycleModelQueryListPage: `${$goodsRecycleModel}query/list/page`, // 旧机回收商品-pc 列表查询（带分页） --POST
    goodsRecycleModelDetail: `${$goodsRecycleModel}detail`, // 旧机回收商品-pc 详情 --GET

    goodsRecycleModelViewBy$id: `${$goodsRecycleModel}view/`, //旧机再销售管理-详情-GET
    goodsRecycleModelUpdateStatus: `${$goodsRecycleModel}update/status`, //旧机再销售管理-上架/下架-PUT
    goodsRecycleModelUpdateProfit: `${$goodsRecycleModel}update/profit`, //旧机再销售管理-修改分润-PUT
    goodsRecycleModelApproval: `${$goodsRecycleModel}approval`, //旧机再销售管理-审核-POST
    goodsRecycleModelQueryOpLogList: `${$goodsRecycleModel}query/opLog/list`, //旧机再销售管理-操作列表-GET
    goodsRecycleModelQueryPage: `${$goodsRecycleModel}query/page`, //旧机再销售管理-列表-分页-POST

    goodsRecyclePreSaleQueryList: `${$goodsRecyclePre}sale/query/list`, //-预售活动管理-列表分页查询-POST
    goodsRecyclePreSaleOperateList: `${$goodsRecyclePre}sale/operate/list`, //-预售活动管理-操作历史记录-GET
    goodsRecyclePreSaleListCount: `${$goodsRecyclePre}sale/list/count`, //-预售活动管理-初始化数量统计-GET
    goodsRecyclePreSaleUpdate: `${$goodsRecyclePre}sale/update`, //预售活动管理-启动/暂停-PUT
    goodsRecyclePreSaleDetail: `${$goodsRecyclePre}sale/detail`, // 旧机回收商品-详情-GET

    goodsInvestmentOperateList: `${$goodsInvestment}operate/list`, // 投资项目-操作历史记录-项目-GET
    goodsGoodsOperateList: `${$goodsGoods}operate/list`, // 投资项目-操作历史记录-商品-GET
    goodsInvestmentProfitList: `${$goodsInvestment}profit/list`, // 投资项目润列表-项目-POST
    goodsInvestmentProfit: `${$goodsInvestment}profit`, // 投资项目-设置分润-PUT
    goodsTemplateUnPublish: `${$goodsTemplate}unpublish`, // 模板取消发布
    goodsGoodsQueryLabels: `${$goodsGoods}query/labels`, // 品标签配置查询
    goodsGoodsSaveLabel: `${$goodsGoods}save/label`,//商品标签操作
    goodsGoodsQueryReason: `${$goodsGoods}query/reason`, // 商品查看原因
    goodsInvestmentQueryReason: `${$goodsInvestment}query/reason`, // 投资项目查看原因
    goodsInvestmentQueryOperatelogPage: `${$goodsInvestment}query/operatelog/page`, // 投资项目操作日志
    goodsGoodsQueryOperatelogPage: `${$goodsGoods}query/operatelog/page`, // 商品查看操作
    goodsInvestmentProfitRole: `${$goodsInvestment}profit/role`, // 获取分润信息
    goodsGoodsListCount: `${$goodsGoods}list/count`, // 获取商品列表所有的页签的数量统计
    goodsGoodsAgentListCount: `${$goodsGoods}agent/list/count`, // 获取商品列表所有的页签的数量统计（服务商）
    goodsGoodsSubmitter: `${$goodsGoods}submitter`, // 获取提交人-商品
    goodsInvestmentSubmitter: `${$goodsInvestment}submitter`, // 获取提交人-项目
    goodsCategoryCategoryAdd: `${$goodsCategory}/category/add`, // 商品类别，绑定列表-get
    goodsBrandBrandAdd: `${$goodsBrandPrefix}brand/add`, // 品牌列表,绑定品牌用-get
    goodsCategoryCertificationCategoryAdd: `${$goodsCategory}certification/category/add`, // 绑定类别-post
    goodsCertificationBrandBrandAdd: `${$certificationApi}/brand/brand/add`, // 绑定品牌-post
    goodsBrandApplyShieldBrandList: `${$goodsBrands}apply/shield/brand/list`, // 获取屏蔽品牌
    goodsBrandApplyShieldBrand: `${$goodsBrands}apply/shield/brand`, // 屏蔽品牌
    goodsGoodsDistributionExport: `${$goodsGoods}distribution/export`, // 寄售商品管理-导出
    goodsGoodsExportConsignment: `${$goodsGoods}import/consignment`, // 导入寄售商品

    //

    // 产品类型
    // sku: {
    //   property: {        reason: `${$goodsType}project/investment/reason`,
    //     query: {
    //       category: `${$goodsType}sku/property/query/status/category`,
    //     },
    //   },
    // },
    project: {
      investment: {
        reason: `${$goodsProject}investment/reason`,
      },
    },
    type: {
      statusUpdate: `${$goodsType}status/update`,
      save: `${$goodsType}save`,
      delete$id: `${$goodsType}/`,
      list: `${$goodsType}list`,
      delete: {
        name: `${$goodsType}/delete/name`,
      },
    },

    // 资源库
    resource: {
      add: `${$goodsResource}add`,
      delete: `${$goodsResource}delete`,
      deleteBatch: `${$goodsResource}deleteBatch`,
      list: `${$goodsResource}list`,
      move: `${$goodsResource}move`,
      moveBatch: `${$goodsResource}moveBatch`,
      search: `${$goodsResource}search`,
      update: `${$goodsResource}update`,
      library: {
        add: `${$goodsResource}library/add`,
        delete: `${$goodsResource}library/delete`,
        list: `${$goodsResource}library/list`,
        move: `${$goodsResource}library/move`,
        update: `${$goodsResource}library/update`,
      },
    },
    // 商品关键字goods/sku/property/query/list
    keyword: {
      list: `${$goodsKeyword}list`,
      save: `${$goodsKeyword}save`,
      status: {
        update: `${$goodsKeyword}status/update`,
      },
      delete: {
        name: `${$goodsKeyword}delete/name`,
      },
    },
    // 商品模板列表
    template: {
      delete: `${$goodsTemplate}delete`,
      deleteBatch: `${$goodsTemplate}delete/batch`,
      detail: `${$goodsTemplate}detail`,
      list: `${$goodsTemplate}list`,
      profitGet: `${$goodsTemplate}profit`,
      profitPost: `${$goodsTemplate}profit`,
      save: `${$goodsTemplate}save`,
      status: `${$goodsTemplate}status`,
      update: `${$goodsTemplate}update`,
      recently: `${$goodsTemplate}category/recently`,
      publish: `${$goodsTemplate}publish`,
      getProfit: `${$goodsTemplate}getprofit`,
      count: `${$goodsTemplate}count`,
      draft: {
        batchDelete: `${$goodsTemplate}draft/batch/delete`,
        details: `${$goodsTemplate}draft/details`,
        list: `${$goodsTemplate}draft/list`,
        save: `${$goodsTemplate}draft/save`,
        update: `${$goodsTemplate}draft/update`,
      },
      info: {
        init: `${$goodsTemplate}info/init`,
      },
      param: {
        property: `${$goodsTemplate}param/property`,
      },
    },
    // 商品属性
    skuProperty: {
      $id: `${$goodsSkuProperty}`,
      query: {
        category: `${$goodsSkuProperty}query/category`,
        list: `${$goodsSkuProperty}query/list`,
      },
      category: `${$goodsSkuProperty}category`,
      delete: `${$goodsSkuProperty}delete`,
      deleteBatch: `${$goodsSkuProperty}delete/batch`,
      detail: `${$goodsSkuProperty}detail`,
      forbidden: `${$goodsSkuProperty}forbidden`,
      import: `${$goodsSkuProperty}import`,
      list: `${$goodsSkuProperty}list`,
      save: `${$goodsSkuProperty}save`,
      sort: `${$goodsSkuProperty}sort`,
      update: `${$goodsSkuProperty}update`,
    },
    // 商品参数v1/goods/sku/property/{id}
    paramProperty: {
      query: {
        category: `${$goodsParamProperty}query/category`,
        list: `${$goodsParamProperty}query/list`,
      },
      category: `${$goodsParamProperty}query/category`,
      deleteBatch: `${$goodsParamProperty}delete/batch`,
      detail: `${$goodsParamProperty}detail`,
      forbidden: `${$goodsParamProperty}forbidden`,
      import: `${$goodsParamProperty}import`,
      list: `${$goodsParamProperty}query/list`,
      required: `${$goodsParamProperty}required`,
      save: `${$goodsParamProperty}save`,
      sort: `${$goodsParamProperty}sort`,
      update: `${$goodsParamProperty}update`,
      delBy$id: `${$goodsParamProperty}`,
    },
    // 商品类目v1/order/refund/query/warehouses
    category: {
      apply: {
        query: {
          list: `${$goodsCategory}apply/query/list`,
        },
        update: `${$goodsCategory}apply/update`,
      },
      batchDelete: `${$goodsCategory}batch/delete`,
      categorySelect: `${$goodsCategory}category/select`,
      disabletypeUpdate: `${$goodsCategory}disabletype/update`,
      list: `${$goodsCategory}list`,
      save: `${$goodsCategory}save`,
      secondCategory: `${$goodsCategory}second/category`,
      sortUpdate: `${$goodsCategory}sort/update`,
      update: `${$goodsCategory}update`,
      operate: {
        selectSecondCategory: `${$goodsCategory}operate/second/category`,
        delete: `${$goodsCategory}operate/batch/delete`,
        disabletypeUpdate: `${$goodsCategory}operate/disabletype/update`,
        goodscategorygoodsUpdate: `${$goodsCategory}operate/goodscategorygoods/update`,
        list: `${$goodsCategory}operate/list`,
        save: `${$goodsCategory}operate/save`,
        sortUpdate: `${$goodsCategory}operate/sort/update`,
        update: `${$goodsCategory}operate/update`,
      },
    },
    // 商品相关/v1/goods/goods/query/operatelog/page
    goods: {
      goods: {
        query: {
          operatelog: {
            page: `${$goodsGoods}query/operatelog/page`,
          },
        },
      },
      $id: `${$goodsGoods}`,
      delete: `${$goodsGoods}delete`,
      audit: `${$goodsGoods}audit`,
      distribution:{
        audit: `${$goodsGoods}distribution/audit`,
      },
      violationList: {
        audit: `${$goodsGoods}violation/audit`,
      },
      goodsDetails: `${$goodsGoods}goodsDetails`,
      list: `${$goodsGoods}list`,
      save: `${$goodsGoods}save`,
      update: `${$goodsGoods}update`,
      status: {
        update: `${$goodsGoods}status/update`,
      },
      violation: `${$goodsGoods}violation`,
      query: {
        list: {
          page: `${$goodsGoods}query/list/page`,
        },
      },
      profit: {
        list: `${$goodsGoods}profit/list`,
        set: `${$goodsGoods}profit/set`,
      },
    },
    investment: {
      list: {
        count: `${$goodsInvestment}list/count`,
      },
      number: {
        set: `${$goodsInvestment}number/set`,
      },
      update: {
        status: `${$goodsInvestment}update/status`,
      },
      $id: `${$goodsInvestment}`,
      query: {
        list: {
          page: `${$goodsInvestment}query/list/page`,
        },
      },
    },
    // 商品品牌相关/v1/goods/brand/hot/update
    brand: {
      hot: {
        update: `${$goodsBrandPrefix}hot/update`,
      },
      $id: `${$goodsBrandPrefix}`,
      list: `${$goodsBrandPrefix}query/list`,
      shield: `${$goodsBrandPrefix}brand/shield`,
      page: `${$goodsBrandPrefix}page`,
      save: `${$goodsBrandPrefix}save`,
      update: `${$goodsBrandPrefix}update`,
      delete: {
        batch: `${$goodsBrandPrefix}delete/batch`,
      },
      query: {
        list: `${$goodsBrandPrefix}query/list`,
        page: `${$goodsBrandPrefix}query/page`,
      },
      status: {
        update: `${$goodsBrandPrefix}status/update`,
      },
      // 品牌申请
      apply: {
        postApply: `${$goodsBrandPrefix}apply`,
        putApply: `${$goodsBrandPrefix}apply`,
        deleteApply: `${$goodsBrandPrefix}apply/batch`,
        list: `${$goodsBrandPrefix}apply/list`,
        page: `${$goodsBrandPrefix}apply/page`,
        get$id: `${$goodsBrandPrefix}apply`,
        delete$id: `${$goodsBrandPrefix}apply`,
        audit: `${$goodsBrandPrefix}apply/audit`,
        id: `${$goodsBrandPrefix}apply/`,
      },
      // 品牌厂商
      manufacturer: {
        put: `${$goodsBrandPrefix}manufacturer`,
        post: `${$goodsBrandPrefix}manufacturer`,
        batch: `${$goodsBrandPrefix}manufacturer/batch`,
        list: `${$goodsBrandPrefix}manufacturer/list`,
        page: `${$goodsBrandPrefix}manufacturer/page`,
        $id: `${$goodsBrandPrefix}manufacturer`,
        status: {
          update: `${$goodsBrandPrefix}manufacturer/status/update`,
        },
      },
    },
  },
  ///v1/user/info/update/reason
  user: {
    userInfoComplaintDic: `${$user}info/complaint/dic`, // 用户投诉类型
    userInfoOpDetail: `${$user}info/op/detail`, // 用户详情(运营平台用户)
    userInfoOpAccount$PUT: `${$user}info/op/account`, //修改账号(运营平台用户)-PUT
    userInfoOpPasswordBy$userId: `${$user}info/op/password/`, // 重置密码(运营平台用户)-put
    userInfoOpAccount$POST: `${$user}info/op/account`, //新增账号(运营平台用户)-PUT
    userInfoOpPage: `${$user}info/op/page`, //用户列表(运营平台用户)-POST
    userInfoOpRealName: `${$user}info/op/realname`, //用户列表(模糊查询)-get
    userInfoOpUpdatePassword: `${$user}info/op/update/password`, //修改密码(运营平台用户)-PUT
    company: {
      status: `${$user}company/status`,
      delete: `${$user}company/`,
    },
    info: {
      page: `${$user}info/page`,
      password: `${$user}info/password`,
      detail: `${$user}info/detail`,
      userStatus: `${$user}info/status`,
      changeInfo: `${$user}info`,
      account: `${$merchant}info/account`,
      selectPage: `${$merchant}info/select/page`,
      SelectAllPage: `${$merchant}info/select/all/page`,
      addAccount: `${$merchant}info/account/`,
      platformCode: `${$user}info/platform/code`,
      user: {
        page: `${$user}info/user/page`,
      },
      update: {
        reason: `${$user}info/update/reason`,
      },
    },
  },
  //company/info/list/storehouse
  merchant: {
    companyInfoAgentPage: `${$merchant}info/agent/page`,//自营服务商
    memberCompanyBindingInviteePage: `${$member}company/binding/invitee/page`,//添加服务商
    memberCompanyBindingOperation: `${$member}company/binding/operation`,//绑定服务商
    info: {
      list: {
        storehouse: `${$merchant}info/list/storehouse`,
      },
      page: `${$merchant}info/page`,
      agent: {
        tab: `${$merchant}info/agent/tab`,
      },
      supplier: {
        tab: `${$merchant}info/supplier/tab`,
      },
      change: {
        black: `${$merchant}info/change/black`,
        user: {
          status: `${$merchant}info/change/user/status`,
        },
        store: {
          status: `${$merchant}info/change/store/status`,
        },
      },
      garage: {
        page: `${$merchant}info/garage/page`,
        get: `${$merchant}info/garage/get`,
        tab: `${$merchant}info/garage/tab`,
        asset: {
          page: `${$merchant}info/garage/asset/page`,
        },
      },
      unbind: {
        role: `${$merchant}info/unbind/role`,
      },

      audit: {
        link: `${$merchant}info/audit/link/`,
        $Post: `${$merchant}info/audit`,
      },
      manage: `${$merchant}info/manage/`,
      staff: {
        page: `${$merchant}info/staff/page`,
      },
      logoff: {
        page: `${$merchant}info/logoff/page`,
      },
      asset: {
        page: `${$merchant}info/asset/page`,
      },
    },
  },
  // merchantUniversity.category.modify
  merchantUniversity: {
    content: {
      category: `${$merchantUniversity}content/category/enable`,
      condition: `${$merchantUniversity}content/condition`,
      save: `${$merchantUniversity}content/save`,
      modify: `${$merchantUniversity}content/modify`,
      delete: `${$merchantUniversity}content/delete`,
      enable: `${$merchantUniversity}content/enable`,
      disable: `${$merchantUniversity}content/disable`,
      recommend: `${$merchantUniversity}content/recommend`,
      batch: {
        update: `${$merchantUniversity}content/batch/update`,
      },
      cancel: {
        recommend: `${$merchantUniversity}content/cancel/recommend`,
      },
    },
    // content/help/category/save
    help: {
      category: {
        enable: `${$merchantUniversity}help/category/enable`,
        modify: `${$merchantUniversity}help/category/modify`,
        condition: `${$merchantUniversity}help/category/condition`,
        save: `${$merchantUniversity}help/category/save`,
        delete: `${$merchantUniversity}help/category/delete`,
      }, //contentHelpContentModify
      content: {
        save: `${$merchantUniversity}help/content/save`,
        modify: `${$merchantUniversity}help/content/modify`,
        condition: `${$merchantUniversity}help/content/condition`,
        enable: `${$merchantUniversity}help/content/enable`,
        delete: `${$merchantUniversity}help/content/delete`,
      },
    },
    category: {
      condition: `${$merchantUniversity}category/condition`,
      save: `${$merchantUniversity}category/save`,
      modify: `${$merchantUniversity}category/modify`,
      delete: `${$merchantUniversity}category/delete`,
      enable: `${$merchantUniversity}category/enable`,
      disable: `${$merchantUniversity}category/disable`,
      sort: `${$merchantUniversity}category/sort`,
      batch: {
        update: `${$merchantUniversity}category/batch/update`,
      },
    },
    helpCenter: {
      help: {
        category: {
          condition: `${$merchantUniversity}help/category/condition`,
          delete: `${$merchantUniversity}help/category/delete`,
        },
      },
    },
  },
  area: {
    sub: `${$area}area/sub`,
  },
  api: {
    role: {
      num: `${$api}role/num`,
      page: `/v1/role/page`,
    },
    FileOcr: `${$api}file/ocr`, // 图片上传包含ocr识别 1：身份证，2：营业执照
    FileInvoiceOcr: `${$api}file/vat/invoice/ocr`, // 发票识别
    createCosGet: `${$api}create/cos/get`, // 上传到腾讯云cos
    CompanyLegalSupplierMobile: `${$companyApi}legal/supplier/mobile`, // 检验手机号供应商
    CompanyLegalAgentMobile: `${$companyApi}legal/agent/moblie`, // 检验手机号服务商
    CompanyLegalSupplier: `${$companyApi}legal/supplier`, // 新增供应商
    CompanyLegalAgent: `${$companyApi}legal/agent`, // 新增服务商
    ExtraBankFuzzy: `${$api}extra/bank/fuzzy`, // 根据银行名称模糊查询支行信息
    ExtraBankInfoFuzzy: `${$api}extra/bank/info/fuzzy`, //根据银行名称查询开户行信息
    company: {
      legal: {
        garage: {
          moblie: `${$api}company/legal/garage/moblie`,
        },
        garageCreate: `${$api}company/legal/garage`,
      },
    },
  },
  // v1/order/refund/create/delivery
  order: {
    orderRefundCheckOrder: `${$order}refund/check/order`, // 校验订单
    orderRefundUpdateDelivery: `${$order}refund/update/delivery`, //修改物流
    orderRefundReceipt: `${$order}refund/receipt`, // 退货
    orderRefundRefund: `${$order}refund/refund`, // 手动退货
    orderCountCustomerPurchaseRanking: `${$order}count/customer/purchase/ranking`, // 客户统计-客户进货排名
    orderCountCustomerSalesRanking: `${$order}count/customer/sales/ranking`, // 客户统计-客户销货排名
    orderCountSellOverTimeCount: `${$orderCount}sell/over/time/count`, // 订单统计-超时未付款销售订单统计 - POST

    orderCountCustomerInvestCountRanking: `${$orderCount}customer/invest/count/ranking`, //订单统计-客户统计-客户投资次数排名
    orderCountInvestCount: `${$orderCount}invest/count`, //订单统计-投资订单统计
    orderCountSellCount: `${$orderCount}sell/count`, //订单统计-订单统计-销售订单统计
    orderCountInvestBrandCount: `${$orderCount}invest/brand/count`, //订单统计-投资统计
    orderCountInvestRefundCount: `${$orderCount}invest/refund/count`, //订单统计-投资订单退货退款
    orderCountSellBrandCount: `${$orderCount}sell/brand/count`, //订单统计-销货统计
    orderCountSellItemCount: `${$orderCount}sell/item/count`, //订单统计-销售订单明细统计
    orderCountSellRefundBrandCount: `${$orderCount}sell/refund/brand/count`, //：订单统计-销售退货统计
    orderCountAccountPayableList: `${$orderCount}account/payable/list`, // 订单统计-应付账款
    orderCountAccountReceivableList: `${$orderCount}account/receivable/list`, // 订单统计-应收账款
    orderCountSellRefundCount: `${$orderCount}sell/refund/count`, // 订单统计-退货销售订单统计

    orderEvaluateAfterSalePage: `${$orderEvaluateAfterSale}page`, // 售后服务评价分页列表 - POST
    orderEvaluateAfterSaleCount: `${$orderEvaluateAfterSale}count`, // 售后服务评价分页列表 - GET
    orderAssignQueryList: `${$orderAssign}query/list`, // 违约订单列表
    orderAssignQueryStatist: `${$orderAssign}query/statist`, // 违约订单页签
    orderAssignQueryDetail: `${$orderAssign}query/detail`, // 违约订单详情
    orderSupportAfterSaleSave: `${$orderSupportAfterSale}save`, //-售后上门-售后上门单生成-POST
    orderSupportAfterSaleUpdate: `${$orderSupportAfterSale}update`, //-售后上门-售后上门单更新-PUT
    orderSupportAfterSaleQueryPage: `${$orderSupportAfterSale}query/page`, //-售后上门-售后上门单列表-POST
    orderSupportAfterSaleDetailBy$id: `${$orderSupportAfterSale}detail/`, //-售后上门-售后上门单订单详情-GET
    orderSupportAfterSaleCancel: `${$orderSupportAfterSale}cancel`, //-售后上门-售后上门单取消-POST
    orderSupportAfterSaleEnumStatus: `${$orderSupportAfterSale}enum/status`, //-售后上门-售后上门单订单状态-GET
    orderSupportAfterSaleCount: `${$orderSupportAfterSale}status/count`, //-售后上门-售后上门单订单状态统计-GET
    orderSupportAfterSaleConfirm: `${$orderSupportAfterSale}confirm`, // 售后服务订单确认-POST

    orderEvaluateServicePage: `${$orderEvaluate}service/page`, // 回安装/回收服务评价分页列表-POST
    orderEvaluateServiceDetail: `${$orderEvaluate}service/Detail`, // 安装/回收服务评价详情-POST
    orderEvaluateServiceListCount: `${$orderEvaluate}service/list/count`, // 安装/回收服务页签-POST
    orderSellListStatistics:`${$order}sell/list/statistics`, // 销售单列表统计-列表
    orderDistributionPage:`${$order}distribution/page`, // 铺货列表统计-列表
    orderDistributionCountList:`${$order}distribution/countList`, // 铺货列表统计-页签
    orderInvestListStatistics:`${$order}invest/list/statistics`, // 投资单列表统计-列表
    orderOldQueryList: `${$order}old/query/list`, // 旧机订单-列表
    orderOldBy$id: `${$order}old/`, // 旧机订单-详情-GET
    orderOldEnumStatus: `${$order}old/status/count`, // 旧机订单-获取订单状态-GET
    orderOldWarnLogBy$OrderId: `${$order}old/warn/log/`, // 旧机订单-提醒发货记录-GET

    orderRecyclePage: `${$order}recycle/page`, // 回收服务订单-回收服务订单分页列表-POST
    orderRecycleUpdate: `${$order}recycle/update`, // 回收服务订单-回收修改订单-POST
    orderRecycleDetailBy$id: `${$order}recycle/detail/`, // 回收服务订单-详情-GET
    orderRecycleListCount: `${$order}recycle/list/count`, // 回收服务订单-页签
    orderRecycleOperateList: `${$order}recycle/operate/list`, // 回收服务订单-操作记录

    orderAssignTechnicians: `${$order}assign/technicians`, //服务订单指派技术工-查询空闲可指派技术工列表-POST
    orderAssignAssign: `${$order}assign/assign`, //服务订单指派技术工-派技术工/改派-POST

    orderAfterSaleBy$id: `${$order}after/sale/`, // 售后订单-售后单详情-GET
    orderAfterSaleQueryList: `${$order}after/sale/query/list`, // 售后订单-售后单列表-POST
    orderAfterSaleAudit: `${$order}after/sale/audit`, // 售后订单-售后单审核-POST
    orderAfterSaleTypeCount: `${$order}after/sale/type/count`, // 售后订单-售后订单类型统计-GET
    orderAfterSaleEnumStatus: `${$order}after/sale/enum/status`, // 售后订单-售后订单状态枚举
    orderSellWarnLog: `${$orderSell}warn/log/`, // 进货订单--提醒发货记录

    orderRefundQueryAmount: `${$order}refund/query/amount`, // 退换货数量
    // /v1/order/refund/create/fefund/apply
    orderRefundCreateFeFundApply: `${$order}refund/create/fefund/apply`, // 发起退款申请
    orderRefundQueryList: `${$order}refund/query/list`, // 查询退款订单

    orderRefundGetRefundEngineCode: `${$order}refund/get/refund/engine/code`, // 获取可用发动机识别码

    evaluate: {
      page: `${$order}evaluate/page`,
      modify: `${$order}evaluate/modify`,
      delete: `${$order}evaluate/delete`,
      batch: {
        update: `${$order}evaluate/batch/update`,
        modify: `${$order}evaluate/batch/modify`,
      },
      evaluate: {
        Detail: `${$order}evaluate/evaluate/Detail`,
      },
    },
    setting: {
      list: `${$order}setting/list`,
      update: {
        batch: `${$order}setting/update/batch`,
      },
    },
    cancel: {
      cause: {
        page: `${$order}cancel/cause/page`,
        update: `${$order}cancel/cause/update`,
        details: `${$order}cancel/cause/details`,
        save: `${$order}cancel/cause/save`,
        batch: {
          delete: `${$order}cancel/cause/batch/delete`,
        },
        toUpdate: {
          sort: `${$order}cancel/cause/update/sort`,
        },
      },
    },
    house: {
      company: {
        ids: `${$order}house/company/ids`,
      },
    },
    sell: {
      query: {
        list: `${$orderSell}query/list`,
      },
      $id: `${$orderSell}`,
      status: {
        count: `${$orderSell}status/count`,
      },
    },
    invest: {
      query: {
        list: `${$order}invest/query/list`,
      },
      enum: {
        status: `${$order}invest/enum/status`,
      },
      $id: `${$order}invest/`,
      status: {
        count: `${$order}invest/status/count`,
      },
    },
    // /order/refund/update/apply
    refund: {
      create: {
        delivery: `${$order}refund/create/delivery`,
      },
      update: {
        apply: `${$order}refund/update/apply`,
      },
      cause: {
        query: {
          list: `${$order}refund/cause/query/list`,
        },
      },
      calculate: {
        amount: `${$order}refund/calculate/amount`,
      },
      query: {
        page: `${$order}refund/query/page`,
        operatelog: `${$order}refund/query/operatelog`,
        warehouses: `${$order}refund/query/warehouses`,
      },
      detail: `${$order}refund/detail`,
      audit: `${$order}refund/audit`,
    },
  },
  users: {
    info: {
      account: `${$user}info/account/`,
      create: `${$user}info/account`,
    },
  },

  goodsBrand: {
    apply: {
      list: `${$goodsBrandPrefix}apply/list`,
      page: `${$goodsBrandPrefix}apply/page`,
      audit: `${$goodsBrandPrefix}apply/audit`,
    },
  },
  warehouse: {
    warehouseStockUpdate: `${$warehouse}stock/update`, // 寄售仓库可用库存
    warehouseTransferPage: `${$warehouse}transfer/page`, // 调拨管理-调拨分页查询-POST
    warehouseTransfer: `${$warehouse}transfer`, //  调拨管理-调拨分页查询-GET
    warehousePlat: `${$warehouse}plat`, //  调拨管理-仓库分拨-GET
    warehouseCodingQueryList: `${$warehouse}coding/query/list`, // 打码配置
    warehouseCodingUpdate: `${$warehouse}coding/update`, // 编辑打码配置
    warehouseListAll: `${$warehouse}list/all`,
    warehouseDelivery: `${$warehouse}delivery`,
    warehouseDelete: `${$warehouse}delivery`,
    warehouseArrival: `${$warehouse}arrival`,
    warehousePrescription: `${$warehouse}arrival`,
    warehouseArrivalTime: `${$warehouse}arrival`,
    warehouseStockGoodsWarehouse: `${$warehouse}stock/goods/warehouse`,

    warehouseArrivalDay: `${$warehouse}arrival/selectById`,
    queryWareHouseDropDown: `${$warehouse}queryWareHouseDropDown`,
    delivery: {
      query: `${$warehouse}delivery/page`,
      page: `${$warehouse}delivery/page`,
      ID: `${$warehouse}delivery/`,
      batchAddTimeLimit: `${$warehouse}delivery`,
      changeTimeLimit: `${$warehouse}delivery`,
      batchDeleteTimeLimit: `${$warehouse}delivery/batch`,
      deleteTimeLimit: `${$warehouse}delivery`,
      warehouse: {
        $id: `${$warehouse}delivery/warehouse/`,
      },
    },
    warehouseAdd: `${$wareHouseDeal}`,

    queryWareHousePage: `${$warehouse}queryWareHousePage`,
    forbidden: `${$warehouse}forbidden`,
    arrival: {
      page: `${$warehouse}arrival/page`,
      queryWarehouseArrivalTimePage: `${$warehouse}arrival/queryWarehouseArrivalTimePage`,
      warehouse: `${$warehouse}arrival/warehouse`,
    },
    startup: `${$warehouse}startup`,
    statis: {
      supplier: {
        inout: `${$warehouse}statis/supplier/inout`,
        refill: `${$warehouse}statis/supplier/refill`,
        transfer: `${$warehouse}statis/supplier/transfer`,
      },
    },
  },
  sixHotArea: `${$sixhot}list`,
  // v1/sixhot/area/tree
  sixHotAreaTree: `${$sixhot}tree`,
  goodsCertificationBrandInfo: `${$certificationApi}brand/info`,
  roleCompany: `${$role}company`,
}
