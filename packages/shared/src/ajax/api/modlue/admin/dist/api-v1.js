"use strict";
exports.__esModule = true;
var amdin_api_prefix_v1_1 = require("../../../helpers/amdin-api-prefix-v1");
exports["default"] = {
    home: {
        homePagePcOrderNumberLine: amdin_api_prefix_v1_1.$homePagePc + "order/number/line",
        homePagePcAmountCountLine: amdin_api_prefix_v1_1.$homePagePc + "amount/count/line",
        homePagePcAmountFeePie: amdin_api_prefix_v1_1.$homePagePc + "amount/fee/pie"
    },
    integral: {
        integralRuleUpdate: amdin_api_prefix_v1_1.$integralRule + "update",
        integralRuleList: amdin_api_prefix_v1_1.$integralRule + "list",
        integralUserLevelList: amdin_api_prefix_v1_1.$integralUserLevel + "list",
        integralUserLevelAdd: amdin_api_prefix_v1_1.$integralUserLevel + "add",
        integralUserLevelUpdate: amdin_api_prefix_v1_1.$integralUserLevel + "update",
        grantRecordList: amdin_api_prefix_v1_1.$grant + "record/list"
    },
    quota: {
        quotaRecordPage: amdin_api_prefix_v1_1.$quota + "record/page",
        quotaGetBy$CompanyId: amdin_api_prefix_v1_1.$quota + "get/",
        quotaAdd: amdin_api_prefix_v1_1.$quota + "add",
        quotaCoefficientSave: amdin_api_prefix_v1_1.$quota + "coefficient/save"
    },
    support: {
        supportInstallQueryList: amdin_api_prefix_v1_1.$supportInstall + "query/list",
        supportInstallDetailBy$id: amdin_api_prefix_v1_1.$supportInstall + "detail/",
        supportInstallListCount: amdin_api_prefix_v1_1.$supportInstall + "list/count",
        supportInstallUpdate: amdin_api_prefix_v1_1.$supportInstall + "update",
        supportInstallConfirm: amdin_api_prefix_v1_1.$supportInstall + "confirm",
        supportInstallHandel: amdin_api_prefix_v1_1.$supportInstall + "order/handel"
    },
    activation: {
        activationRecordQueryPage: amdin_api_prefix_v1_1.$activationList + "record/query/page",
        activationRecordBy$id: amdin_api_prefix_v1_1.$activationList + "record/"
    },
    finance: {
        financeBillConfigDefault: amdin_api_prefix_v1_1.$finances + "bill/config/default",
        financeBillConfig: amdin_api_prefix_v1_1.$finances + "bill/config",
        financeMarginPage: amdin_api_prefix_v1_1.$finances + "margin/page",
        financeMarginDetail: amdin_api_prefix_v1_1.$finances + "margin/detail",
        financeBillOrderPage: amdin_api_prefix_v1_1.$finances + "bill/order/page",
        financeBillOrder: amdin_api_prefix_v1_1.$finances + "bill/order",
        financeBillOrderBatch: amdin_api_prefix_v1_1.$finances + "bill/order/batch",
        financeBillManagePage: amdin_api_prefix_v1_1.$finances + "bill/manage/page",
        financeBillManageBy$id: amdin_api_prefix_v1_1.$finances + "bill/manage/id",
        financeBillManageManualBill: amdin_api_prefix_v1_1.$finances + "bill/manage/manual/bill",
        financeAdvancesStandingPage: amdin_api_prefix_v1_1.$finances + "advances/standing/page",
        financeAdvancesStandingDetailBy$id: amdin_api_prefix_v1_1.$finances + "advances/standing/detail",
        financeAdvancesStandingConfirmBy$id: amdin_api_prefix_v1_1.$finances + "advances/standing/confirm",
        financePayPcPage: amdin_api_prefix_v1_1.$finances + "pay/pc/page",
        financePayDetail: amdin_api_prefix_v1_1.$finances + "pay/detail",
        financeInvoiceSelectList: amdin_api_prefix_v1_1.$finances + "invoice/select/list",
        financeInvoiceDetailSellBy$id: amdin_api_prefix_v1_1.$finances + "invoice/detail/sell",
        financeInvoiceConfirmInvoice: amdin_api_prefix_v1_1.$finances + "invoice/confirm/invoice",
        financeInvoiceDetailBy$id: amdin_api_prefix_v1_1.$finances + "invoice/detail",
        financeInvoiceOrderListBy$id: amdin_api_prefix_v1_1.$finances + "invoice/order/list"
    },
    role: {
        rolePage: amdin_api_prefix_v1_1.$role + "page",
        role: "" + amdin_api_prefix_v1_1.$roles,
        modifyRole: "" + amdin_api_prefix_v1_1.$roles,
        rolePerms: amdin_api_prefix_v1_1.$role + "perms",
        role$Id: "" + amdin_api_prefix_v1_1.$role,
        roleGet$Id: "" + amdin_api_prefix_v1_1.$role,
        roleCompany: amdin_api_prefix_v1_1.$role + "company",
        accountMaskPage: amdin_api_prefix_v1_1.$account + "mask/page",
        accountMask$Id: amdin_api_prefix_v1_1.$account + "mask/",
        accountMaskAdd: amdin_api_prefix_v1_1.$account + "mask",
        accountMaskEdit: amdin_api_prefix_v1_1.$account + "mask",
        accountMaskGET: amdin_api_prefix_v1_1.$account + "mask",
        accountMaskList: amdin_api_prefix_v1_1.$account + "mask/list",
        accountMaskRole: amdin_api_prefix_v1_1.$account + "mask/role",
        accountMaskRole$Post: amdin_api_prefix_v1_1.$account + "mask/role",
        accountMaskRole$Put: amdin_api_prefix_v1_1.$account + "mask/role",
        versionCurrentVersion: amdin_api_prefix_v1_1.$version + "currentVersion",
        versionSave: amdin_api_prefix_v1_1.$version + "save"
    },
    customer: {
        customerRoleCompany: amdin_api_prefix_v1_1.$customerApi + "role/company"
    },
    content: {
        contentContentCondition: amdin_api_prefix_v1_1.$content + "content/condition",
        contentCertificationCourseCondition: amdin_api_prefix_v1_1.$content + "certificationCourse/condition",
        contentCertificationCourseSave: amdin_api_prefix_v1_1.$content + "certificationCourse/save",
        contentCertificationCourseModify: amdin_api_prefix_v1_1.$content + "certificationCourse/modify",
        contentCertificationCourseDelete: amdin_api_prefix_v1_1.$content + "certificationCourse/delete",
        contentCertificationCourseBatchUpdate: amdin_api_prefix_v1_1.$content + "certificationCourse/batch/update",
        contentCertificationCourseEnable: amdin_api_prefix_v1_1.$content + "certificationCourse/enable",
        contentCertificationCourseCategoryCondition: amdin_api_prefix_v1_1.$contentCertificationCourseCategory + "condition",
        contentCertificationCourseCategorySave: amdin_api_prefix_v1_1.$contentCertificationCourseCategory + "save",
        contentCertificationCourseCategoryModify: amdin_api_prefix_v1_1.$contentCertificationCourseCategory + "modify",
        contentCertificationCourseCategoryEnable: amdin_api_prefix_v1_1.$contentCertificationCourseCategory + "enable",
        contentCertificationCourseCategorySort: amdin_api_prefix_v1_1.$contentCertificationCourseCategory + "sort",
        contentInvestmentCondition: amdin_api_prefix_v1_1.$contentInvestment + "condition",
        contentInvestmentModify: amdin_api_prefix_v1_1.$contentInvestment + "modify",
        contentInvestmentDelete: amdin_api_prefix_v1_1.$contentInvestment + "delete",
        contentInvestmentBatchUpdate: amdin_api_prefix_v1_1.$contentInvestment + "batch/update",
        contentTechnicalCategoryCondition: amdin_api_prefix_v1_1.$contentTechnicalCategory + "condition",
        contentTechnicalCategorySave: amdin_api_prefix_v1_1.$contentTechnicalCategory + "save",
        contentTechnicalCategoryModify: amdin_api_prefix_v1_1.$contentTechnicalCategory + "modify",
        contentTechnicalCategoryDelete: amdin_api_prefix_v1_1.$contentTechnicalCategory + "delete",
        contentTechnicalCategoryEnable: amdin_api_prefix_v1_1.$contentTechnicalCategory + "enable",
        contentTechnicalCategorySort: amdin_api_prefix_v1_1.$contentTechnicalCategory + "sort",
        contentTechnicalCondition: amdin_api_prefix_v1_1.$contentTechnical + "condition",
        contentTechnicalSave: amdin_api_prefix_v1_1.$contentTechnical + "save",
        contentTechnicalModify: amdin_api_prefix_v1_1.$contentTechnical + "modify",
        contentTechnicalDelete: amdin_api_prefix_v1_1.$contentTechnical + "delete",
        contentTechnicalBatchUpdate: amdin_api_prefix_v1_1.$contentTechnical + "batch/update",
        contentTechnicalBatchDelete: amdin_api_prefix_v1_1.$contentTechnical + "batch/delete",
        contentTechnicalEnable: amdin_api_prefix_v1_1.$contentTechnical + "enable",
        contentTechnicalCategoryRecommend: amdin_api_prefix_v1_1.$contentTechnical + "recommend",
        contentTechnicalRecommend: amdin_api_prefix_v1_1.$contentTechnical + "recommend",
        contentContentSaveBatch: amdin_api_prefix_v1_1.$content + "content/save/batch",
        contentCategorySaveBatch: amdin_api_prefix_v1_1.$content + "category/save/batch",
        contentHelpContentSaveBatch: amdin_api_prefix_v1_1.$content + "help/content/save/batch",
        contentHelpCategorySaveBatch: amdin_api_prefix_v1_1.$content + "help/category/save/batch",
        contentVoiceRecognizeBindQueryListPage: amdin_api_prefix_v1_1.$content + "voice/recognize/bind/query/list/page",
        contentVoiceRecognizeBindStatusUpdate: amdin_api_prefix_v1_1.$content + "voice/recognize/bind/status/update",
        contentVoiceRecognizeBindDeleteBatch: amdin_api_prefix_v1_1.$content + "voice/recognize/bind/delete/batch",
        contentVoiceRecognizeBindBy$id: amdin_api_prefix_v1_1.$content + "voice/recognize/bind",
        contentVoiceRecognizeBindSave: amdin_api_prefix_v1_1.$content + "voice/recognize/bind/save",
        contentVoiceRecognizeBindUpdate: amdin_api_prefix_v1_1.$content + "voice/recognize/bind/update",
        contentFunctionRouteList: amdin_api_prefix_v1_1.$content + "function/route/list"
    },
    menu: {
        menuBtnPerms: amdin_api_prefix_v1_1.$menu + "btn/perms",
        menuTree: amdin_api_prefix_v1_1.$menu + "tree",
        menuList: amdin_api_prefix_v1_1.$menu + "list",
        menuNameTree: amdin_api_prefix_v1_1.$menu + "name/tree",
        menu$POST: "" + amdin_api_prefix_v1_1.$menu,
        menu$PUT: "" + amdin_api_prefix_v1_1.$menu,
        menu$Id: "" + amdin_api_prefix_v1_1.$menu,
        menuRoleTree: amdin_api_prefix_v1_1.$menu + "role/tree",
        menuOrgTree: amdin_api_prefix_v1_1.$menu + "org/tree",
        menuTreeLeaf: amdin_api_prefix_v1_1.$menu + "tree/leaf",
        menuTreeRoleLeaf: amdin_api_prefix_v1_1.$menu + "tree/role/leaf"
    },
    company: {
        companyInfoChangeRelation: amdin_api_prefix_v1_1.$merchant + "info/change/relation",
        companyInfoRemoveRelation: amdin_api_prefix_v1_1.$merchant + "info/remove/relation",
        // 统计相关
        companyStatisticsAgentAccountAmount: amdin_api_prefix_v1_1.$merchant + "statistics/agent/account/amount",
        companyInfoGarageList: amdin_api_prefix_v1_1.$merchant + "info/garage/list",
        companyInfoGarageCountPage: amdin_api_prefix_v1_1.$merchant + "info/garage/count/page",
        companyInfoCustomerCount: amdin_api_prefix_v1_1.$merchant + "info/customer/count",
        companyInfoCustomerTotal: amdin_api_prefix_v1_1.$merchant + "info/customer/total",
        companyStatisticsAgentAccountInfo: amdin_api_prefix_v1_1.$merchant + "statistics/agent/account/info",
        companyContractGetBy$id: amdin_api_prefix_v1_1.$merchant + "contract/get/",
        companyContractListBy$CompanyId: amdin_api_prefix_v1_1.$merchant + "contract/list/",
        companyContractUpdate: amdin_api_prefix_v1_1.$merchant + "contract/update",
        companyContractAdd: amdin_api_prefix_v1_1.$merchant + "contract/add",
        companyInfoManageList: amdin_api_prefix_v1_1.$merchant + "info/manage/list",
        companyInfoRemoveBinder: amdin_api_prefix_v1_1.$merchant + "info/remove/binder",
        companyInfoChangeBinder: amdin_api_prefix_v1_1.$merchant + "info/change/binder",
        CompanyInfoPlatformStoreName: amdin_api_prefix_v1_1.$merchant + "info/platform/store/name",
        CompanyInfoSelectPage: amdin_api_prefix_v1_1.$merchant + "info/select/page",
        companyInfoChangeManager: amdin_api_prefix_v1_1.$merchant + "info/change/manager",
        CompanyLegalAttractMobile: amdin_api_prefix_v1_1.$companyApi + "legal/attract/mobile",
        CompanyLegalAttractAdd: amdin_api_prefix_v1_1.$companyApi + "legal/attract/add",
        CompanyLegalChannelAdd: amdin_api_prefix_v1_1.$companyApi + "legal/channel/add",
        CompanyLegalChannelMobile: amdin_api_prefix_v1_1.$companyApi + "legal/channel/mobile",
        CompanyInfoManagerUnbind: amdin_api_prefix_v1_1.$merchant + "info/manager/unbind",
        CompanyInfoManagerRelationPage: amdin_api_prefix_v1_1.$merchant + "info/manager/relation/page",
        CompanyInfoManagerPage: amdin_api_prefix_v1_1.$merchant + "info/manager/page",
        companyInfoAgentAssociatedGaragePage: amdin_api_prefix_v1_1.$merchant + "info/agent/associated/garage/page",
        companyLegalOldMachineMobile: amdin_api_prefix_v1_1.$companyApi + "legal/oldMachine/mobile",
        companyLegalSkilledWorkerMobile: amdin_api_prefix_v1_1.$companyApi + "legal/skilledWorker/mobile",
        companyLegalSkilledWorkerAdd: amdin_api_prefix_v1_1.$companyApi + "legal/SkilledWorker/add",
        companyLegalOldMachineAdd: amdin_api_prefix_v1_1.$companyApi + "legal/oldMachine/add",
        companyInfoSkilledWorkerAssociatedPage: amdin_api_prefix_v1_1.$merchant + "info/skilledWorker/associated/page",
        companyInfoSkilledWorkerDetailsBy$id: amdin_api_prefix_v1_1.$merchant + "info/skilledWorker/details/",
        companyInfoSkilledWorkerAssociatedGaragePage: amdin_api_prefix_v1_1.$merchant + "info/skilledWorker/associatedGarage/page",
        companyInfoOldMachineGetBy$id: amdin_api_prefix_v1_1.$merchant + "info/oldMachine/get/",
        companyInfoSkilledWorkerPage: amdin_api_prefix_v1_1.$merchant + "info/skilledWorker/page",
        companyInfoSkilledWorkerTab: amdin_api_prefix_v1_1.$merchant + "info/skilledWorker/tab",
        companyInfoOldMachineTab: amdin_api_prefix_v1_1.$merchant + "info/oldMachine/tab",
        companyInfoOldMachineAuditLinkBy$id: amdin_api_prefix_v1_1.$merchant + "info/oldMachine/audit/link/",
        companyInfoOldMachinePage: amdin_api_prefix_v1_1.$merchant + "info/oldMachine/page",
        companyInfoStoreInfoBy$CompanyId: amdin_api_prefix_v1_1.$merchant + "info/store/info/",
        companyInfoFinancialBy$CompanyId: amdin_api_prefix_v1_1.$merchant + "info/financial/",
        companyInfoBankCardListBy$CompanyId: amdin_api_prefix_v1_1.$merchant + "info/bankcard/list/",
        companyInfoManageUpdate: amdin_api_prefix_v1_1.$merchant + "/info/manage/update",
        companyLegalAuthInfo: amdin_api_prefix_v1_1.$companyApi + "legal/auth/info",
        companyLegalOldMachineUpdate: amdin_api_prefix_v1_1.$companyApi + "legal/oldMachine/update",
        companyLegalAnewIdentity: amdin_api_prefix_v1_1.$companyApi + "legal/anew/identity",
        companyLegalWnewLicense: amdin_api_prefix_v1_1.$companyApi + "legal/anew/license",
        companyLegalAnewAll: amdin_api_prefix_v1_1.$companyApi + "legal/anew/all",
        receiverAddressList: amdin_api_prefix_v1_1.$receiver + "address/list",
        companyInfoBind: amdin_api_prefix_v1_1.$merchant + "info/bind",
        companyInfoGarageNotBindPage: amdin_api_prefix_v1_1.$merchant + "info/garage/notBind/page",
        companyInfoSkilledWorkerUnbind: amdin_api_prefix_v1_1.$merchant + "info/skilledWorker/unbind",
        companyStatisticsAgentAccountDetail: amdin_api_prefix_v1_1.$merchant + "statistics/agent/account/detail",
        companyInfoSkilledWorkerOpenqualify: amdin_api_prefix_v1_1.$merchant + "info/skilledWorker/openqualify",
        companyInfoServiceProject: amdin_api_prefix_v1_1.$merchant + "info/service/project",
        companyInfoCarSeries: amdin_api_prefix_v1_1.$merchant + "info/car/series",
        companyStatisticsAccountWithdrawApply: amdin_api_prefix_v1_1.$merchant + "statistics/account/withdraw/apply",
        companyInfoGarageBaseUpdate: amdin_api_prefix_v1_1.$merchant + "info/garage/base/update"
    },
    vehicle: {
        brand: {
            selectSeries: amdin_api_prefix_v1_1.$vehicleBrandPrefix + "selectSeries",
            selectParameters: amdin_api_prefix_v1_1.$vehicleBrandPrefix + "selectParameters",
            selectOne: amdin_api_prefix_v1_1.$vehicleBrandPrefix + "selectOne",
            selectMode: amdin_api_prefix_v1_1.$vehicleBrandPrefix + "selectMode"
        }
    },
    file: {
        // 文件操作
        fileUpload: amdin_api_prefix_v1_1.$file + "fileUpload",
        imgUpload: amdin_api_prefix_v1_1.$file + "imgUpload",
        videoUpload: amdin_api_prefix_v1_1.$file + "videoUpload",
        operations: {
            getObject: amdin_api_prefix_v1_1.$fileOperations + "getObject",
            getImageThumbnail: amdin_api_prefix_v1_1.$fileOperations + "getImageThumbnail",
            temporaryToForever: amdin_api_prefix_v1_1.$fileOperations + "temporaryToForever",
            copyObject: amdin_api_prefix_v1_1.$fileOperations + "copyObject"
        }
    },
    filePc: {
        fileUpload: amdin_api_prefix_v1_1.$filePc + "fileUpload",
        imgUpload: amdin_api_prefix_v1_1.$filePc + "imgUpload",
        videoUpload: amdin_api_prefix_v1_1.$filePc + "videoUpload",
        imgUploadBatch: amdin_api_prefix_v1_1.$filePc + "imgUploadBatch",
        videoUploadBatch: amdin_api_prefix_v1_1.$filePc + "videoUploadBatch"
    },
    // 社群板块
    community: {
        column: {
            condition: amdin_api_prefix_v1_1.$community + "column/condition",
            delete$id: amdin_api_prefix_v1_1.$community + "column/delete/",
            modify: amdin_api_prefix_v1_1.$community + "column/modify",
            save: amdin_api_prefix_v1_1.$community + "column/save",
            batch: amdin_api_prefix_v1_1.$community + "column/save/batch"
        },
        content: {
            tipoff: {
                getOne: amdin_api_prefix_v1_1.$community + "content/tipoff/getOne",
                approved: amdin_api_prefix_v1_1.$community + "content/tipoff/approved",
                condition: amdin_api_prefix_v1_1.$community + "content/tipoff/condition",
                reject: amdin_api_prefix_v1_1.$community + "content/tipoff/reject",
                detail: amdin_api_prefix_v1_1.$community + "content/tipoff/detail"
            },
            answer: {
                getOne: amdin_api_prefix_v1_1.$community + "content/answer/getOne",
                approved: amdin_api_prefix_v1_1.$community + "content/answer/approved",
                condition: amdin_api_prefix_v1_1.$community + "content/answer/condition",
                "delete": amdin_api_prefix_v1_1.$community + "content/answer/delete",
                detail: amdin_api_prefix_v1_1.$community + "content/answer/detail",
                offSale: amdin_api_prefix_v1_1.$community + "content/answer/off/sale",
                reject: amdin_api_prefix_v1_1.$community + "content/answer/reject",
                recommend: amdin_api_prefix_v1_1.$community + "content/answer/recommend",
                cancelRecommend: amdin_api_prefix_v1_1.$community + "content/answer/cancel/recommend",
                save: amdin_api_prefix_v1_1.$community + "content/answer/save",
                modify: amdin_api_prefix_v1_1.$community + "content/answer/modify",
                query: {
                    comment: amdin_api_prefix_v1_1.$community + "content/answer/query/comment"
                },
                top: amdin_api_prefix_v1_1.$community + "content/answer/top",
                reset: amdin_api_prefix_v1_1.$community + "content/answer/reset"
            },
            idea: {
                approved: amdin_api_prefix_v1_1.$community + "content/idea/approved",
                condition: amdin_api_prefix_v1_1.$community + "content/idea/condition",
                "delete": amdin_api_prefix_v1_1.$community + "content/idea/delete",
                exist: amdin_api_prefix_v1_1.$community + "content/idea/exist",
                modify: amdin_api_prefix_v1_1.$community + "content/idea/modify",
                offsale: amdin_api_prefix_v1_1.$community + "content/idea/off/sale",
                reject: amdin_api_prefix_v1_1.$community + "content/idea/reject",
                release: amdin_api_prefix_v1_1.$community + "content/idea/release",
                cancelRecommend: amdin_api_prefix_v1_1.$community + "content/idea/cancel/recommend",
                recommend: amdin_api_prefix_v1_1.$community + "content/idea/recommend",
                detail: amdin_api_prefix_v1_1.$community + "content/idea/detail",
                query: {
                    comment: amdin_api_prefix_v1_1.$community + "content/idea/query/comment"
                },
                getOne: {
                    batch: amdin_api_prefix_v1_1.$community + "content/idea/release/batch"
                }
            },
            video: {
                detail: amdin_api_prefix_v1_1.$community + "content/video/detail",
                approved: amdin_api_prefix_v1_1.$community + "content/video/approved",
                condition: amdin_api_prefix_v1_1.$community + "content/video/condition",
                "delete": amdin_api_prefix_v1_1.$community + "content/video/delete",
                exist: amdin_api_prefix_v1_1.$community + "content/video/exist",
                modify: amdin_api_prefix_v1_1.$community + "content/video/modify",
                offsale: amdin_api_prefix_v1_1.$community + "content/video/off/sale",
                reject: amdin_api_prefix_v1_1.$community + "content/video/reject",
                release: amdin_api_prefix_v1_1.$community + "content/video/release",
                cancelRecommend: amdin_api_prefix_v1_1.$community + "content/video/cancel/recommend",
                recommend: amdin_api_prefix_v1_1.$community + "content/video/recommend",
                getOne: amdin_api_prefix_v1_1.$community + "content/video/getOne",
                query: {
                    comment: amdin_api_prefix_v1_1.$community + "content/video/query/comment"
                }
            },
            question: {
                approved: amdin_api_prefix_v1_1.$community + "content/question/approved",
                condition: amdin_api_prefix_v1_1.$community + "content/question/condition",
                "delete": amdin_api_prefix_v1_1.$community + "content/question/delete",
                exist: amdin_api_prefix_v1_1.$community + "content/question/exist",
                modify: amdin_api_prefix_v1_1.$community + "content/question/modify",
                offsale: amdin_api_prefix_v1_1.$community + "content/question/off/sale",
                reject: amdin_api_prefix_v1_1.$community + "content/question/reject",
                release: amdin_api_prefix_v1_1.$community + "content/question/release",
                cancelRecommend: amdin_api_prefix_v1_1.$community + "content/question/cancel/recommend",
                recommend: amdin_api_prefix_v1_1.$community + "content/question/recommend",
                getOne: amdin_api_prefix_v1_1.$community + "content/question/getOne",
                query: {
                    comment: amdin_api_prefix_v1_1.$community + "content/question/query/comment"
                }
            }
        }
    },
    // 商品模块goods/category/apply/update
    goods: {
        goodsTemplateGetProfit: amdin_api_prefix_v1_1.$goodsTemplate + "getprofit",
        goodsStatisticQuerySalesRankingList: amdin_api_prefix_v1_1.$goodsStatistic + "query/sales/ranking/list",
        goodsStatisticQuerySalesComparisonList: amdin_api_prefix_v1_1.$goodsStatistic + "query/sales/comparison/list",
        goodsStatisticQueryInvestRankingList: amdin_api_prefix_v1_1.$goodsStatistic + "query/invest/ranking/list",
        goodsGoodsShop: amdin_api_prefix_v1_1.$goodsGoods + "shop",
        goodsInvestmentShop: amdin_api_prefix_v1_1.$goodsInvestment + "shop",
        goodsModelRecycleStatus: amdin_api_prefix_v1_1.$goodsModel + "recycle/status",
        goodsModelRecycleOperate: amdin_api_prefix_v1_1.$goodsModel + "recycle/operate",
        goodsModelRecycleCount: amdin_api_prefix_v1_1.$goodsModel + "recycle/count",
        goodsModelRecycleQueryListPage: amdin_api_prefix_v1_1.$goodsModel + "recycle/query/list/page",
        goodsModelRecycleDetail: amdin_api_prefix_v1_1.$goodsModel + "recycle/detail",
        goodsResourceFileList: amdin_api_prefix_v1_1.$goodsResource + "fileList",
        goodsModelApplyView: amdin_api_prefix_v1_1.$goodsModelApply + "view",
        goodsModelApplyApproval: amdin_api_prefix_v1_1.$goodsModelApply + "approval",
        goodsModelApplyQueryPage: amdin_api_prefix_v1_1.$goodsModelApply + "query/page",
        goodsModelSave: amdin_api_prefix_v1_1.$goodsModel + "save",
        goodsModelUpdate: amdin_api_prefix_v1_1.$goodsModel + "update",
        goodsModelEnableUpdate: amdin_api_prefix_v1_1.$goodsModel + "enable/update",
        goodsModelBatchDelete: amdin_api_prefix_v1_1.$goodsModel + "batch/delete",
        goodsModelDeleteBy$id: amdin_api_prefix_v1_1.$goodsModel + "delete",
        goodsModelQueryPage: amdin_api_prefix_v1_1.$goodsModel + "query/page",
        goodsModelSelectList: amdin_api_prefix_v1_1.$goodsModel + "select/list",
        goodsModelQueryListCatergory: amdin_api_prefix_v1_1.$goodsModel + "query/list/catergory",
        goodsModelCompensateSave: amdin_api_prefix_v1_1.$goodsModel + "compensate/save",
        goodsModelCompensateUpdate: amdin_api_prefix_v1_1.$goodsModel + "compensate/update",
        goodsModelCompensateSendBackUpdate: amdin_api_prefix_v1_1.$goodsModel + "compensate/sendBack/update",
        goodsModelCompensateDeleteBy$id: amdin_api_prefix_v1_1.$goodsModel + "compensate/delete",
        goodsModelCompensateQueryPage: amdin_api_prefix_v1_1.$goodsModel + "compensate/query/page",
        goodsModelCompensateUnitList: amdin_api_prefix_v1_1.$goodsModel + "compensate/unit/list",
        goodsModelCommissionUpdate: amdin_api_prefix_v1_1.$goodsModelCommission + "update",
        goodsModelCommissionModelProvince: amdin_api_prefix_v1_1.$goodsModelCommission + "model/province",
        goodsModelCommissionExport: amdin_api_prefix_v1_1.$goodsModelCommission + "export",
        goodsModelCommissionQueryPageList: amdin_api_prefix_v1_1.$goodsModelCommission + "query/page/list",
        goodsModelCommissionDelBy$id: "" + amdin_api_prefix_v1_1.$goodsModelCommission,
        goodsModelCommissionProvince: amdin_api_prefix_v1_1.$goodsModelCommission + "province",
        goodsModelCommissionDetail: amdin_api_prefix_v1_1.$goodsModelCommission + "detail",
        goodsModelCommissionSave: amdin_api_prefix_v1_1.$goodsModelCommission + "save",
        goodsRecycleModelStatus: amdin_api_prefix_v1_1.$goodsRecycleModel + "status",
        goodsRecycleModelOperate: amdin_api_prefix_v1_1.$goodsRecycleModel + "operate",
        goodsRecycleModelCount: amdin_api_prefix_v1_1.$goodsRecycleModel + "count",
        goodsRecycleModelQueryListPage: amdin_api_prefix_v1_1.$goodsRecycleModel + "query/list/page",
        goodsRecycleModelDetail: amdin_api_prefix_v1_1.$goodsRecycleModel + "detail",
        goodsRecycleModelViewBy$id: amdin_api_prefix_v1_1.$goodsRecycleModel + "view/",
        goodsRecycleModelUpdateStatus: amdin_api_prefix_v1_1.$goodsRecycleModel + "update/status",
        goodsRecycleModelUpdateProfit: amdin_api_prefix_v1_1.$goodsRecycleModel + "update/profit",
        goodsRecycleModelApproval: amdin_api_prefix_v1_1.$goodsRecycleModel + "approval",
        goodsRecycleModelQueryOpLogList: amdin_api_prefix_v1_1.$goodsRecycleModel + "query/opLog/list",
        goodsRecycleModelQueryPage: amdin_api_prefix_v1_1.$goodsRecycleModel + "query/page",
        goodsRecyclePreSaleQueryList: amdin_api_prefix_v1_1.$goodsRecyclePre + "sale/query/list",
        goodsRecyclePreSaleOperateList: amdin_api_prefix_v1_1.$goodsRecyclePre + "sale/operate/list",
        goodsRecyclePreSaleListCount: amdin_api_prefix_v1_1.$goodsRecyclePre + "sale/list/count",
        goodsRecyclePreSaleUpdate: amdin_api_prefix_v1_1.$goodsRecyclePre + "sale/update",
        goodsRecyclePreSaleDetail: amdin_api_prefix_v1_1.$goodsRecyclePre + "sale/detail",
        goodsInvestmentOperateList: amdin_api_prefix_v1_1.$goodsInvestment + "operate/list",
        goodsGoodsOperateList: amdin_api_prefix_v1_1.$goodsGoods + "operate/list",
        goodsInvestmentProfitList: amdin_api_prefix_v1_1.$goodsInvestment + "profit/list",
        goodsInvestmentProfit: amdin_api_prefix_v1_1.$goodsInvestment + "profit",
        goodsTemplateUnPublish: amdin_api_prefix_v1_1.$goodsTemplate + "unpublish",
        goodsGoodsQueryLabels: amdin_api_prefix_v1_1.$goodsGoods + "query/labels",
        goodsGoodsSaveLabel: amdin_api_prefix_v1_1.$goodsGoods + "save/label",
        goodsGoodsQueryReason: amdin_api_prefix_v1_1.$goodsGoods + "query/reason",
        goodsInvestmentQueryReason: amdin_api_prefix_v1_1.$goodsInvestment + "query/reason",
        goodsInvestmentQueryOperatelogPage: amdin_api_prefix_v1_1.$goodsInvestment + "query/operatelog/page",
        goodsGoodsQueryOperatelogPage: amdin_api_prefix_v1_1.$goodsGoods + "query/operatelog/page",
        goodsInvestmentProfitRole: amdin_api_prefix_v1_1.$goodsInvestment + "profit/role",
        goodsGoodsListCount: amdin_api_prefix_v1_1.$goodsGoods + "list/count",
        goodsGoodsAgentListCount: amdin_api_prefix_v1_1.$goodsGoods + "agent/list/count",
        goodsGoodsSubmitter: amdin_api_prefix_v1_1.$goodsGoods + "submitter",
        goodsInvestmentSubmitter: amdin_api_prefix_v1_1.$goodsInvestment + "submitter",
        goodsCategoryCategoryAdd: amdin_api_prefix_v1_1.$goodsCategory + "/category/add",
        goodsBrandBrandAdd: amdin_api_prefix_v1_1.$goodsBrandPrefix + "brand/add",
        goodsCategoryCertificationCategoryAdd: amdin_api_prefix_v1_1.$goodsCategory + "certification/category/add",
        goodsCertificationBrandBrandAdd: amdin_api_prefix_v1_1.$certificationApi + "/brand/brand/add",
        goodsBrandApplyShieldBrandList: amdin_api_prefix_v1_1.$goodsBrands + "apply/shield/brand/list",
        goodsBrandApplyShieldBrand: amdin_api_prefix_v1_1.$goodsBrands + "apply/shield/brand",
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
                reason: amdin_api_prefix_v1_1.$goodsProject + "investment/reason"
            }
        },
        type: {
            statusUpdate: amdin_api_prefix_v1_1.$goodsType + "status/update",
            save: amdin_api_prefix_v1_1.$goodsType + "save",
            delete$id: amdin_api_prefix_v1_1.$goodsType + "/",
            list: amdin_api_prefix_v1_1.$goodsType + "list",
            "delete": {
                name: amdin_api_prefix_v1_1.$goodsType + "/delete/name"
            }
        },
        // 资源库
        resource: {
            add: amdin_api_prefix_v1_1.$goodsResource + "add",
            "delete": amdin_api_prefix_v1_1.$goodsResource + "delete",
            deleteBatch: amdin_api_prefix_v1_1.$goodsResource + "deleteBatch",
            list: amdin_api_prefix_v1_1.$goodsResource + "list",
            move: amdin_api_prefix_v1_1.$goodsResource + "move",
            moveBatch: amdin_api_prefix_v1_1.$goodsResource + "moveBatch",
            search: amdin_api_prefix_v1_1.$goodsResource + "search",
            update: amdin_api_prefix_v1_1.$goodsResource + "update",
            library: {
                add: amdin_api_prefix_v1_1.$goodsResource + "library/add",
                "delete": amdin_api_prefix_v1_1.$goodsResource + "library/delete",
                list: amdin_api_prefix_v1_1.$goodsResource + "library/list",
                move: amdin_api_prefix_v1_1.$goodsResource + "library/move",
                update: amdin_api_prefix_v1_1.$goodsResource + "library/update"
            }
        },
        // 商品关键字goods/sku/property/query/list
        keyword: {
            list: amdin_api_prefix_v1_1.$goodsKeyword + "list",
            save: amdin_api_prefix_v1_1.$goodsKeyword + "save",
            status: {
                update: amdin_api_prefix_v1_1.$goodsKeyword + "status/update"
            },
            "delete": {
                name: amdin_api_prefix_v1_1.$goodsKeyword + "delete/name"
            }
        },
        // 商品模板列表
        template: {
            "delete": amdin_api_prefix_v1_1.$goodsTemplate + "delete",
            deleteBatch: amdin_api_prefix_v1_1.$goodsTemplate + "delete/batch",
            detail: amdin_api_prefix_v1_1.$goodsTemplate + "detail",
            list: amdin_api_prefix_v1_1.$goodsTemplate + "list",
            profitGet: amdin_api_prefix_v1_1.$goodsTemplate + "profit",
            profitPost: amdin_api_prefix_v1_1.$goodsTemplate + "profit",
            save: amdin_api_prefix_v1_1.$goodsTemplate + "save",
            status: amdin_api_prefix_v1_1.$goodsTemplate + "status",
            update: amdin_api_prefix_v1_1.$goodsTemplate + "update",
            recently: amdin_api_prefix_v1_1.$goodsTemplate + "category/recently",
            publish: amdin_api_prefix_v1_1.$goodsTemplate + "publish",
            getProfit: amdin_api_prefix_v1_1.$goodsTemplate + "getprofit",
            count: amdin_api_prefix_v1_1.$goodsTemplate + "count",
            draft: {
                batchDelete: amdin_api_prefix_v1_1.$goodsTemplate + "draft/batch/delete",
                details: amdin_api_prefix_v1_1.$goodsTemplate + "draft/details",
                list: amdin_api_prefix_v1_1.$goodsTemplate + "draft/list",
                save: amdin_api_prefix_v1_1.$goodsTemplate + "draft/save",
                update: amdin_api_prefix_v1_1.$goodsTemplate + "draft/update"
            },
            info: {
                init: amdin_api_prefix_v1_1.$goodsTemplate + "info/init"
            },
            param: {
                property: amdin_api_prefix_v1_1.$goodsTemplate + "param/property"
            }
        },
        // 商品属性
        skuProperty: {
            $id: "" + amdin_api_prefix_v1_1.$goodsSkuProperty,
            query: {
                category: amdin_api_prefix_v1_1.$goodsSkuProperty + "query/category",
                list: amdin_api_prefix_v1_1.$goodsSkuProperty + "query/list"
            },
            category: amdin_api_prefix_v1_1.$goodsSkuProperty + "category",
            "delete": amdin_api_prefix_v1_1.$goodsSkuProperty + "delete",
            deleteBatch: amdin_api_prefix_v1_1.$goodsSkuProperty + "delete/batch",
            detail: amdin_api_prefix_v1_1.$goodsSkuProperty + "detail",
            forbidden: amdin_api_prefix_v1_1.$goodsSkuProperty + "forbidden",
            "import": amdin_api_prefix_v1_1.$goodsSkuProperty + "import",
            list: amdin_api_prefix_v1_1.$goodsSkuProperty + "list",
            save: amdin_api_prefix_v1_1.$goodsSkuProperty + "save",
            sort: amdin_api_prefix_v1_1.$goodsSkuProperty + "sort",
            update: amdin_api_prefix_v1_1.$goodsSkuProperty + "update"
        },
        // 商品参数v1/goods/sku/property/{id}
        paramProperty: {
            query: {
                category: amdin_api_prefix_v1_1.$goodsParamProperty + "query/category",
                list: amdin_api_prefix_v1_1.$goodsParamProperty + "query/list"
            },
            category: amdin_api_prefix_v1_1.$goodsParamProperty + "query/category",
            deleteBatch: amdin_api_prefix_v1_1.$goodsParamProperty + "delete/batch",
            detail: amdin_api_prefix_v1_1.$goodsParamProperty + "detail",
            forbidden: amdin_api_prefix_v1_1.$goodsParamProperty + "forbidden",
            "import": amdin_api_prefix_v1_1.$goodsParamProperty + "import",
            list: amdin_api_prefix_v1_1.$goodsParamProperty + "query/list",
            required: amdin_api_prefix_v1_1.$goodsParamProperty + "required",
            save: amdin_api_prefix_v1_1.$goodsParamProperty + "save",
            sort: amdin_api_prefix_v1_1.$goodsParamProperty + "sort",
            update: amdin_api_prefix_v1_1.$goodsParamProperty + "update",
            delBy$id: "" + amdin_api_prefix_v1_1.$goodsParamProperty
        },
        // 商品类目v1/order/refund/query/warehouses
        category: {
            apply: {
                query: {
                    list: amdin_api_prefix_v1_1.$goodsCategory + "apply/query/list"
                },
                update: amdin_api_prefix_v1_1.$goodsCategory + "apply/update"
            },
            batchDelete: amdin_api_prefix_v1_1.$goodsCategory + "batch/delete",
            categorySelect: amdin_api_prefix_v1_1.$goodsCategory + "category/select",
            disabletypeUpdate: amdin_api_prefix_v1_1.$goodsCategory + "disabletype/update",
            list: amdin_api_prefix_v1_1.$goodsCategory + "list",
            save: amdin_api_prefix_v1_1.$goodsCategory + "save",
            secondCategory: amdin_api_prefix_v1_1.$goodsCategory + "second/category",
            sortUpdate: amdin_api_prefix_v1_1.$goodsCategory + "sort/update",
            update: amdin_api_prefix_v1_1.$goodsCategory + "update",
            operate: {
                selectSecondCategory: amdin_api_prefix_v1_1.$goodsCategory + "operate/second/category",
                "delete": amdin_api_prefix_v1_1.$goodsCategory + "operate/batch/delete",
                disabletypeUpdate: amdin_api_prefix_v1_1.$goodsCategory + "operate/disabletype/update",
                goodscategorygoodsUpdate: amdin_api_prefix_v1_1.$goodsCategory + "operate/goodscategorygoods/update",
                list: amdin_api_prefix_v1_1.$goodsCategory + "operate/list",
                save: amdin_api_prefix_v1_1.$goodsCategory + "operate/save",
                sortUpdate: amdin_api_prefix_v1_1.$goodsCategory + "operate/sort/update",
                update: amdin_api_prefix_v1_1.$goodsCategory + "operate/update"
            }
        },
        // 商品相关/v1/goods/goods/query/operatelog/page
        goods: {
            goods: {
                query: {
                    operatelog: {
                        page: amdin_api_prefix_v1_1.$goodsGoods + "query/operatelog/page"
                    }
                }
            },
            $id: "" + amdin_api_prefix_v1_1.$goodsGoods,
            "delete": amdin_api_prefix_v1_1.$goodsGoods + "delete",
            audit: amdin_api_prefix_v1_1.$goodsGoods + "audit",
            distribution: {
                audit: amdin_api_prefix_v1_1.$goodsGoods + "distribution/audit"
            },
            violationList: {
                audit: amdin_api_prefix_v1_1.$goodsGoods + "violation/audit"
            },
            goodsDetails: amdin_api_prefix_v1_1.$goodsGoods + "goodsDetails",
            list: amdin_api_prefix_v1_1.$goodsGoods + "list",
            save: amdin_api_prefix_v1_1.$goodsGoods + "save",
            update: amdin_api_prefix_v1_1.$goodsGoods + "update",
            status: {
                update: amdin_api_prefix_v1_1.$goodsGoods + "status/update"
            },
            violation: amdin_api_prefix_v1_1.$goodsGoods + "violation",
            query: {
                list: {
                    page: amdin_api_prefix_v1_1.$goodsGoods + "query/list/page"
                }
            },
            profit: {
                list: amdin_api_prefix_v1_1.$goodsGoods + "profit/list",
                set: amdin_api_prefix_v1_1.$goodsGoods + "profit/set"
            }
        },
        investment: {
            list: {
                count: amdin_api_prefix_v1_1.$goodsInvestment + "list/count"
            },
            number: {
                set: amdin_api_prefix_v1_1.$goodsInvestment + "number/set"
            },
            update: {
                status: amdin_api_prefix_v1_1.$goodsInvestment + "update/status"
            },
            $id: "" + amdin_api_prefix_v1_1.$goodsInvestment,
            query: {
                list: {
                    page: amdin_api_prefix_v1_1.$goodsInvestment + "query/list/page"
                }
            }
        },
        // 商品品牌相关/v1/goods/brand/hot/update
        brand: {
            hot: {
                update: amdin_api_prefix_v1_1.$goodsBrandPrefix + "hot/update"
            },
            $id: "" + amdin_api_prefix_v1_1.$goodsBrandPrefix,
            list: amdin_api_prefix_v1_1.$goodsBrandPrefix + "query/list",
            shield: amdin_api_prefix_v1_1.$goodsBrandPrefix + "brand/shield",
            page: amdin_api_prefix_v1_1.$goodsBrandPrefix + "page",
            save: amdin_api_prefix_v1_1.$goodsBrandPrefix + "save",
            update: amdin_api_prefix_v1_1.$goodsBrandPrefix + "update",
            "delete": {
                batch: amdin_api_prefix_v1_1.$goodsBrandPrefix + "delete/batch"
            },
            query: {
                list: amdin_api_prefix_v1_1.$goodsBrandPrefix + "query/list",
                page: amdin_api_prefix_v1_1.$goodsBrandPrefix + "query/page"
            },
            status: {
                update: amdin_api_prefix_v1_1.$goodsBrandPrefix + "status/update"
            },
            // 品牌申请
            apply: {
                postApply: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply",
                putApply: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply",
                deleteApply: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply/batch",
                list: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply/list",
                page: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply/page",
                get$id: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply",
                delete$id: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply",
                audit: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply/audit",
                id: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply/"
            },
            // 品牌厂商
            manufacturer: {
                put: amdin_api_prefix_v1_1.$goodsBrandPrefix + "manufacturer",
                post: amdin_api_prefix_v1_1.$goodsBrandPrefix + "manufacturer",
                batch: amdin_api_prefix_v1_1.$goodsBrandPrefix + "manufacturer/batch",
                list: amdin_api_prefix_v1_1.$goodsBrandPrefix + "manufacturer/list",
                page: amdin_api_prefix_v1_1.$goodsBrandPrefix + "manufacturer/page",
                $id: amdin_api_prefix_v1_1.$goodsBrandPrefix + "manufacturer",
                status: {
                    update: amdin_api_prefix_v1_1.$goodsBrandPrefix + "manufacturer/status/update"
                }
            }
        }
    },
    ///v1/user/info/update/reason
    user: {
        userInfoComplaintDic: amdin_api_prefix_v1_1.$user + "info/complaint/dic",
        userInfoOpDetail: amdin_api_prefix_v1_1.$user + "info/op/detail",
        userInfoOpAccount$PUT: amdin_api_prefix_v1_1.$user + "info/op/account",
        userInfoOpPasswordBy$userId: amdin_api_prefix_v1_1.$user + "info/op/password/",
        userInfoOpAccount$POST: amdin_api_prefix_v1_1.$user + "info/op/account",
        userInfoOpPage: amdin_api_prefix_v1_1.$user + "info/op/page",
        userInfoOpRealName: amdin_api_prefix_v1_1.$user + "info/op/realname",
        userInfoOpUpdatePassword: amdin_api_prefix_v1_1.$user + "info/op/update/password",
        company: {
            status: amdin_api_prefix_v1_1.$user + "company/status",
            "delete": amdin_api_prefix_v1_1.$user + "company/"
        },
        info: {
            page: amdin_api_prefix_v1_1.$user + "info/page",
            password: amdin_api_prefix_v1_1.$user + "info/password",
            detail: amdin_api_prefix_v1_1.$user + "info/detail",
            userStatus: amdin_api_prefix_v1_1.$user + "info/status",
            changeInfo: amdin_api_prefix_v1_1.$user + "info",
            account: amdin_api_prefix_v1_1.$merchant + "info/account",
            selectPage: amdin_api_prefix_v1_1.$merchant + "info/select/page",
            SelectAllPage: amdin_api_prefix_v1_1.$merchant + "info/select/all/page",
            addAccount: amdin_api_prefix_v1_1.$merchant + "info/account/",
            platformCode: amdin_api_prefix_v1_1.$user + "info/platform/code",
            user: {
                page: amdin_api_prefix_v1_1.$user + "info/user/page"
            },
            update: {
                reason: amdin_api_prefix_v1_1.$user + "info/update/reason"
            }
        }
    },
    //company/info/list/storehouse
    merchant: {
        companyInfoAgentPage: amdin_api_prefix_v1_1.$merchant + "info/agent/page",
        memberCompanyBindingInviteePage: amdin_api_prefix_v1_1.$member + "company/binding/invitee/page",
        memberCompanyBindingOperation: amdin_api_prefix_v1_1.$member + "company/binding/operation",
        info: {
            list: {
                storehouse: amdin_api_prefix_v1_1.$merchant + "info/list/storehouse"
            },
            page: amdin_api_prefix_v1_1.$merchant + "info/page",
            agent: {
                tab: amdin_api_prefix_v1_1.$merchant + "info/agent/tab"
            },
            supplier: {
                tab: amdin_api_prefix_v1_1.$merchant + "info/supplier/tab"
            },
            change: {
                black: amdin_api_prefix_v1_1.$merchant + "info/change/black",
                user: {
                    status: amdin_api_prefix_v1_1.$merchant + "info/change/user/status"
                },
                store: {
                    status: amdin_api_prefix_v1_1.$merchant + "info/change/store/status"
                }
            },
            garage: {
                page: amdin_api_prefix_v1_1.$merchant + "info/garage/page",
                get: amdin_api_prefix_v1_1.$merchant + "info/garage/get",
                tab: amdin_api_prefix_v1_1.$merchant + "info/garage/tab",
                asset: {
                    page: amdin_api_prefix_v1_1.$merchant + "info/garage/asset/page"
                }
            },
            unbind: {
                role: amdin_api_prefix_v1_1.$merchant + "info/unbind/role"
            },
            audit: {
                link: amdin_api_prefix_v1_1.$merchant + "info/audit/link/",
                $Post: amdin_api_prefix_v1_1.$merchant + "info/audit"
            },
            manage: amdin_api_prefix_v1_1.$merchant + "info/manage/",
            staff: {
                page: amdin_api_prefix_v1_1.$merchant + "info/staff/page"
            },
            logoff: {
                page: amdin_api_prefix_v1_1.$merchant + "info/logoff/page"
            },
            asset: {
                page: amdin_api_prefix_v1_1.$merchant + "info/asset/page"
            }
        }
    },
    // merchantUniversity.category.modify
    merchantUniversity: {
        content: {
            category: amdin_api_prefix_v1_1.$merchantUniversity + "content/category/enable",
            condition: amdin_api_prefix_v1_1.$merchantUniversity + "content/condition",
            save: amdin_api_prefix_v1_1.$merchantUniversity + "content/save",
            modify: amdin_api_prefix_v1_1.$merchantUniversity + "content/modify",
            "delete": amdin_api_prefix_v1_1.$merchantUniversity + "content/delete",
            enable: amdin_api_prefix_v1_1.$merchantUniversity + "content/enable",
            disable: amdin_api_prefix_v1_1.$merchantUniversity + "content/disable",
            recommend: amdin_api_prefix_v1_1.$merchantUniversity + "content/recommend",
            batch: {
                update: amdin_api_prefix_v1_1.$merchantUniversity + "content/batch/update"
            },
            cancel: {
                recommend: amdin_api_prefix_v1_1.$merchantUniversity + "content/cancel/recommend"
            }
        },
        // content/help/category/save
        help: {
            category: {
                enable: amdin_api_prefix_v1_1.$merchantUniversity + "help/category/enable",
                modify: amdin_api_prefix_v1_1.$merchantUniversity + "help/category/modify",
                condition: amdin_api_prefix_v1_1.$merchantUniversity + "help/category/condition",
                save: amdin_api_prefix_v1_1.$merchantUniversity + "help/category/save",
                "delete": amdin_api_prefix_v1_1.$merchantUniversity + "help/category/delete"
            },
            content: {
                save: amdin_api_prefix_v1_1.$merchantUniversity + "help/content/save",
                modify: amdin_api_prefix_v1_1.$merchantUniversity + "help/content/modify",
                condition: amdin_api_prefix_v1_1.$merchantUniversity + "help/content/condition",
                enable: amdin_api_prefix_v1_1.$merchantUniversity + "help/content/enable",
                "delete": amdin_api_prefix_v1_1.$merchantUniversity + "help/content/delete"
            }
        },
        category: {
            condition: amdin_api_prefix_v1_1.$merchantUniversity + "category/condition",
            save: amdin_api_prefix_v1_1.$merchantUniversity + "category/save",
            modify: amdin_api_prefix_v1_1.$merchantUniversity + "category/modify",
            "delete": amdin_api_prefix_v1_1.$merchantUniversity + "category/delete",
            enable: amdin_api_prefix_v1_1.$merchantUniversity + "category/enable",
            disable: amdin_api_prefix_v1_1.$merchantUniversity + "category/disable",
            sort: amdin_api_prefix_v1_1.$merchantUniversity + "category/sort",
            batch: {
                update: amdin_api_prefix_v1_1.$merchantUniversity + "category/batch/update"
            }
        },
        helpCenter: {
            help: {
                category: {
                    condition: amdin_api_prefix_v1_1.$merchantUniversity + "help/category/condition",
                    "delete": amdin_api_prefix_v1_1.$merchantUniversity + "help/category/delete"
                }
            }
        }
    },
    area: {
        sub: amdin_api_prefix_v1_1.$area + "area/sub"
    },
    api: {
        role: {
            num: amdin_api_prefix_v1_1.$api + "role/num",
            page: "/v1/role/page"
        },
        FileOcr: amdin_api_prefix_v1_1.$api + "file/ocr",
        FileInvoiceOcr: amdin_api_prefix_v1_1.$api + "file/vat/invoice/ocr",
        createCosGet: amdin_api_prefix_v1_1.$api + "create/cos/get",
        CompanyLegalSupplierMobile: amdin_api_prefix_v1_1.$companyApi + "legal/supplier/mobile",
        CompanyLegalAgentMobile: amdin_api_prefix_v1_1.$companyApi + "legal/agent/moblie",
        CompanyLegalSupplier: amdin_api_prefix_v1_1.$companyApi + "legal/supplier",
        CompanyLegalAgent: amdin_api_prefix_v1_1.$companyApi + "legal/agent",
        ExtraBankFuzzy: amdin_api_prefix_v1_1.$api + "extra/bank/fuzzy",
        ExtraBankInfoFuzzy: amdin_api_prefix_v1_1.$api + "extra/bank/info/fuzzy",
        company: {
            legal: {
                garage: {
                    moblie: amdin_api_prefix_v1_1.$api + "company/legal/garage/moblie"
                },
                garageCreate: amdin_api_prefix_v1_1.$api + "company/legal/garage"
            }
        }
    },
    // v1/order/refund/create/delivery
    order: {
        orderRefundCheckOrder: amdin_api_prefix_v1_1.$order + "refund/check/order",
        orderRefundUpdateDelivery: amdin_api_prefix_v1_1.$order + "refund/update/delivery",
        orderRefundReceipt: amdin_api_prefix_v1_1.$order + "refund/receipt",
        orderRefundRefund: amdin_api_prefix_v1_1.$order + "refund/refund",
        orderCountCustomerPurchaseRanking: amdin_api_prefix_v1_1.$order + "count/customer/purchase/ranking",
        orderCountCustomerSalesRanking: amdin_api_prefix_v1_1.$order + "count/customer/sales/ranking",
        orderCountSellOverTimeCount: amdin_api_prefix_v1_1.$orderCount + "sell/over/time/count",
        orderCountCustomerInvestCountRanking: amdin_api_prefix_v1_1.$orderCount + "customer/invest/count/ranking",
        orderCountInvestCount: amdin_api_prefix_v1_1.$orderCount + "invest/count",
        orderCountSellCount: amdin_api_prefix_v1_1.$orderCount + "sell/count",
        orderCountInvestBrandCount: amdin_api_prefix_v1_1.$orderCount + "invest/brand/count",
        orderCountInvestRefundCount: amdin_api_prefix_v1_1.$orderCount + "invest/refund/count",
        orderCountSellBrandCount: amdin_api_prefix_v1_1.$orderCount + "sell/brand/count",
        orderCountSellItemCount: amdin_api_prefix_v1_1.$orderCount + "sell/item/count",
        orderCountSellRefundBrandCount: amdin_api_prefix_v1_1.$orderCount + "sell/refund/brand/count",
        orderCountAccountPayableList: amdin_api_prefix_v1_1.$orderCount + "account/payable/list",
        orderCountAccountReceivableList: amdin_api_prefix_v1_1.$orderCount + "account/receivable/list",
        orderCountSellRefundCount: amdin_api_prefix_v1_1.$orderCount + "sell/refund/count",
        orderEvaluateAfterSalePage: amdin_api_prefix_v1_1.$orderEvaluateAfterSale + "page",
        orderEvaluateAfterSaleCount: amdin_api_prefix_v1_1.$orderEvaluateAfterSale + "count",
        orderAssignQueryList: amdin_api_prefix_v1_1.$orderAssign + "query/list",
        orderAssignQueryStatist: amdin_api_prefix_v1_1.$orderAssign + "query/statist",
        orderAssignQueryDetail: amdin_api_prefix_v1_1.$orderAssign + "query/detail",
        orderSupportAfterSaleSave: amdin_api_prefix_v1_1.$orderSupportAfterSale + "save",
        orderSupportAfterSaleUpdate: amdin_api_prefix_v1_1.$orderSupportAfterSale + "update",
        orderSupportAfterSaleQueryPage: amdin_api_prefix_v1_1.$orderSupportAfterSale + "query/page",
        orderSupportAfterSaleDetailBy$id: amdin_api_prefix_v1_1.$orderSupportAfterSale + "detail/",
        orderSupportAfterSaleCancel: amdin_api_prefix_v1_1.$orderSupportAfterSale + "cancel",
        orderSupportAfterSaleEnumStatus: amdin_api_prefix_v1_1.$orderSupportAfterSale + "enum/status",
        orderSupportAfterSaleCount: amdin_api_prefix_v1_1.$orderSupportAfterSale + "status/count",
        orderSupportAfterSaleConfirm: amdin_api_prefix_v1_1.$orderSupportAfterSale + "confirm",
        orderEvaluateServicePage: amdin_api_prefix_v1_1.$orderEvaluate + "service/page",
        orderEvaluateServiceDetail: amdin_api_prefix_v1_1.$orderEvaluate + "service/Detail",
        orderEvaluateServiceListCount: amdin_api_prefix_v1_1.$orderEvaluate + "service/list/count",
        orderSellListStatistics: amdin_api_prefix_v1_1.$order + "sell/list/statistics",
        orderDistributionPage: amdin_api_prefix_v1_1.$order + "distribution/page",
        orderDistributionCountList: amdin_api_prefix_v1_1.$order + "distribution/countList",
        orderInvestListStatistics: amdin_api_prefix_v1_1.$order + "invest/list/statistics",
        orderOldQueryList: amdin_api_prefix_v1_1.$order + "old/query/list",
        orderOldBy$id: amdin_api_prefix_v1_1.$order + "old/",
        orderOldEnumStatus: amdin_api_prefix_v1_1.$order + "old/status/count",
        orderOldWarnLogBy$OrderId: amdin_api_prefix_v1_1.$order + "old/warn/log/",
        orderRecyclePage: amdin_api_prefix_v1_1.$order + "recycle/page",
        orderRecycleUpdate: amdin_api_prefix_v1_1.$order + "recycle/update",
        orderRecycleDetailBy$id: amdin_api_prefix_v1_1.$order + "recycle/detail/",
        orderRecycleListCount: amdin_api_prefix_v1_1.$order + "recycle/list/count",
        orderRecycleOperateList: amdin_api_prefix_v1_1.$order + "recycle/operate/list",
        orderAssignTechnicians: amdin_api_prefix_v1_1.$order + "assign/technicians",
        orderAssignAssign: amdin_api_prefix_v1_1.$order + "assign/assign",
        orderAfterSaleBy$id: amdin_api_prefix_v1_1.$order + "after/sale/",
        orderAfterSaleQueryList: amdin_api_prefix_v1_1.$order + "after/sale/query/list",
        orderAfterSaleAudit: amdin_api_prefix_v1_1.$order + "after/sale/audit",
        orderAfterSaleTypeCount: amdin_api_prefix_v1_1.$order + "after/sale/type/count",
        orderAfterSaleEnumStatus: amdin_api_prefix_v1_1.$order + "after/sale/enum/status",
        orderSellWarnLog: amdin_api_prefix_v1_1.$orderSell + "warn/log/",
        orderRefundQueryAmount: amdin_api_prefix_v1_1.$order + "refund/query/amount",
        // /v1/order/refund/create/fefund/apply
        orderRefundCreateFeFundApply: amdin_api_prefix_v1_1.$order + "refund/create/fefund/apply",
        orderRefundQueryList: amdin_api_prefix_v1_1.$order + "refund/query/list",
        orderRefundGetRefundEngineCode: amdin_api_prefix_v1_1.$order + "refund/get/refund/engine/code",
        evaluate: {
            page: amdin_api_prefix_v1_1.$order + "evaluate/page",
            modify: amdin_api_prefix_v1_1.$order + "evaluate/modify",
            "delete": amdin_api_prefix_v1_1.$order + "evaluate/delete",
            batch: {
                update: amdin_api_prefix_v1_1.$order + "evaluate/batch/update",
                modify: amdin_api_prefix_v1_1.$order + "evaluate/batch/modify"
            },
            evaluate: {
                Detail: amdin_api_prefix_v1_1.$order + "evaluate/evaluate/Detail"
            }
        },
        setting: {
            list: amdin_api_prefix_v1_1.$order + "setting/list",
            update: {
                batch: amdin_api_prefix_v1_1.$order + "setting/update/batch"
            }
        },
        cancel: {
            cause: {
                page: amdin_api_prefix_v1_1.$order + "cancel/cause/page",
                update: amdin_api_prefix_v1_1.$order + "cancel/cause/update",
                details: amdin_api_prefix_v1_1.$order + "cancel/cause/details",
                save: amdin_api_prefix_v1_1.$order + "cancel/cause/save",
                batch: {
                    "delete": amdin_api_prefix_v1_1.$order + "cancel/cause/batch/delete"
                },
                toUpdate: {
                    sort: amdin_api_prefix_v1_1.$order + "cancel/cause/update/sort"
                }
            }
        },
        house: {
            company: {
                ids: amdin_api_prefix_v1_1.$order + "house/company/ids"
            }
        },
        sell: {
            query: {
                list: amdin_api_prefix_v1_1.$orderSell + "query/list"
            },
            $id: "" + amdin_api_prefix_v1_1.$orderSell,
            status: {
                count: amdin_api_prefix_v1_1.$orderSell + "status/count"
            }
        },
        invest: {
            query: {
                list: amdin_api_prefix_v1_1.$order + "invest/query/list"
            },
            "enum": {
                status: amdin_api_prefix_v1_1.$order + "invest/enum/status"
            },
            $id: amdin_api_prefix_v1_1.$order + "invest/",
            status: {
                count: amdin_api_prefix_v1_1.$order + "invest/status/count"
            }
        },
        // /order/refund/update/apply
        refund: {
            create: {
                delivery: amdin_api_prefix_v1_1.$order + "refund/create/delivery"
            },
            update: {
                apply: amdin_api_prefix_v1_1.$order + "refund/update/apply"
            },
            cause: {
                query: {
                    list: amdin_api_prefix_v1_1.$order + "refund/cause/query/list"
                }
            },
            calculate: {
                amount: amdin_api_prefix_v1_1.$order + "refund/calculate/amount"
            },
            query: {
                page: amdin_api_prefix_v1_1.$order + "refund/query/page",
                operatelog: amdin_api_prefix_v1_1.$order + "refund/query/operatelog",
                warehouses: amdin_api_prefix_v1_1.$order + "refund/query/warehouses"
            },
            detail: amdin_api_prefix_v1_1.$order + "refund/detail",
            audit: amdin_api_prefix_v1_1.$order + "refund/audit"
        }
    },
    users: {
        info: {
            account: amdin_api_prefix_v1_1.$user + "info/account/",
            create: amdin_api_prefix_v1_1.$user + "info/account"
        }
    },
    goodsBrand: {
        apply: {
            list: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply/list",
            page: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply/page",
            audit: amdin_api_prefix_v1_1.$goodsBrandPrefix + "apply/audit"
        }
    },
    warehouse: {
        warehouseTransferPage: amdin_api_prefix_v1_1.$warehouse + "transfer/page",
        warehouseTransfer: amdin_api_prefix_v1_1.$warehouse + "transfer",
        warehousePlat: amdin_api_prefix_v1_1.$warehouse + "plat",
        warehouseCodingQueryList: amdin_api_prefix_v1_1.$warehouse + "coding/query/list",
        warehouseCodingUpdate: amdin_api_prefix_v1_1.$warehouse + "coding/update",
        warehouseListAll: amdin_api_prefix_v1_1.$warehouse + "list/all",
        warehouseDelivery: amdin_api_prefix_v1_1.$warehouse + "delivery",
        warehouseDelete: amdin_api_prefix_v1_1.$warehouse + "delivery",
        warehouseArrival: amdin_api_prefix_v1_1.$warehouse + "arrival",
        warehousePrescription: amdin_api_prefix_v1_1.$warehouse + "arrival",
        warehouseArrivalTime: amdin_api_prefix_v1_1.$warehouse + "arrival",
        warehouseStockGoodsWarehouse: amdin_api_prefix_v1_1.$warehouse + "stock/goods/warehouse",
        warehouseArrivalDay: amdin_api_prefix_v1_1.$warehouse + "arrival/selectById",
        queryWareHouseDropDown: amdin_api_prefix_v1_1.$warehouse + "queryWareHouseDropDown",
        delivery: {
            query: amdin_api_prefix_v1_1.$warehouse + "delivery/page",
            page: amdin_api_prefix_v1_1.$warehouse + "delivery/page",
            ID: amdin_api_prefix_v1_1.$warehouse + "delivery/",
            batchAddTimeLimit: amdin_api_prefix_v1_1.$warehouse + "delivery",
            changeTimeLimit: amdin_api_prefix_v1_1.$warehouse + "delivery",
            batchDeleteTimeLimit: amdin_api_prefix_v1_1.$warehouse + "delivery/batch",
            deleteTimeLimit: amdin_api_prefix_v1_1.$warehouse + "delivery",
            warehouse: {
                $id: amdin_api_prefix_v1_1.$warehouse + "delivery/warehouse/"
            }
        },
        warehouseAdd: "" + amdin_api_prefix_v1_1.$wareHouseDeal,
        queryWareHousePage: amdin_api_prefix_v1_1.$warehouse + "queryWareHousePage",
        forbidden: amdin_api_prefix_v1_1.$warehouse + "forbidden",
        arrival: {
            page: amdin_api_prefix_v1_1.$warehouse + "arrival/page",
            queryWarehouseArrivalTimePage: amdin_api_prefix_v1_1.$warehouse + "arrival/queryWarehouseArrivalTimePage",
            warehouse: amdin_api_prefix_v1_1.$warehouse + "arrival/warehouse"
        },
        startup: amdin_api_prefix_v1_1.$warehouse + "startup",
        statis: {
            supplier: {
                inout: amdin_api_prefix_v1_1.$warehouse + "statis/supplier/inout",
                refill: amdin_api_prefix_v1_1.$warehouse + "statis/supplier/refill",
                transfer: amdin_api_prefix_v1_1.$warehouse + "statis/supplier/transfer"
            }
        }
    },
    sixHotArea: amdin_api_prefix_v1_1.$sixhot + "list",
    // v1/sixhot/area/tree
    sixHotAreaTree: amdin_api_prefix_v1_1.$sixhot + "tree",
    goodsCertificationBrandInfo: amdin_api_prefix_v1_1.$certificationApi + "brand/info",
    roleCompany: amdin_api_prefix_v1_1.$role + "company"
};
