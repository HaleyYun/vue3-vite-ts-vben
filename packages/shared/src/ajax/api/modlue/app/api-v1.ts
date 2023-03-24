import {
  $appCreate,
  $businessVehicleBrand,
  $couponTrade,
  $prefix,
  $v1Api,
  $v1ApiGoods,
} from '../../../helpers/app-api-prefix-v1'

export default {
  app: {
    apiVersionCurrent: `${$v1Api}version/current`,
  },
  imports: {
    apiImportGarageMapTab: `${$v1Api}import/garage/map/tab`,
    apiImportGarageMap: `${$v1Api}import/garage/map`,
    apiImportGarageDetail: `${$v1Api}import/garage/detail`,
    apiImportGarageMapByAreaCode: `${$v1Api}import/garage/mapByAreaCode`,
  },
  tencent: {
    apiTencentSignSign: `${$v1Api}/tencent/sign/sign`, //    获取签名
    apiTencentSignH5Sign: `${$v1Api}/tencent/sign/h5/sign`, //    获取签名
  },
  home: {
    // 首页
    es: {
      //  搜索
      esList: `${$prefix}/es/list`, //    搜索数据列表
      test: `/v1/test`, //    搜索历史列表
      esHistoryList: `${$prefix}/es/history/list`, //    搜索历史列表
    },
    apiHomeSupplier: `${$v1Api}home/supplier`, //    供应商首页统计
  },
  finance: {
    apiFinanceBillManagePage: `${$v1Api}finance/bill/manage/page`, // 新机启用型号列表
    apiFinanceBillManageDetail: `${$v1Api}finance/bill/manage/detail`, // 新机启用型号列表
    apiFinanceMarginTotal: `${$v1Api}finance/margin/total`, // 保证金总额
  },
  goods: {
    apiGoodsDistributionSave: `${$v1Api}goods/distribution/save`, // 上货铺货设置 0210版本 接口版本更改
    apiGoodsDistributionUpdate: `${$v1Api}goods/distribution/update`, // 上货铺货修改 0210版本 接口版本更改
    apiGoodsAgentGoods: `${$v1Api}goods/query/agent/goods`, // 获取服务商最新购买的商品
    apiGoodsModelSaleList: `${$v1Api}goods/model/sale/list`, // 新机启用型号列表
    apiGoodsModelList: `${$v1Api}goods/model/list`, // 型号列表
    apiGoodsModelRecycleList: `${$v1Api}goods/model/recycle/list`, // 旧机启用型号-列表
    apiGoodsModeQueryByCylinderNo: `${$v1Api}goods/model/queryByCylinderNo`, // 根据发动机识别号查型号列表

    apiGoodsRecyclePreSaleSave: `${$v1Api}goods/recycle/pre/sale/save`,
    apiGoodsRecyclePreSaleUpdate: `${$v1Api}goods/recycle/pre/sale/update`,
    apiGoodsRecyclePreSaleQueryMyList: `${$v1Api}goods/recycle/pre/sale/query/my/list`,
    apiGoodsRecyclePreSaleQueryInfo: `${$v1Api}goods/recycle/pre/sale/query/info`,
    apiGoodsRecyclePreSaleQueryReason: `${$v1Api}goods/recycle/pre/sale/query/reason`,
    apiGoodsRecyclePreSaleUpdateStatus: `${$v1Api}goods/recycle/pre/sale/update/status`,

    apiGoodsqueryVehicleModelList: `${$v1Api}goods/query/vehicle/model/list`, //查询商品车型列表
    apiGoodsqueryModelList: `${$v1Api}goods/query/model/list`, //查询商品型号列表
    apiGoodsqueryBrandList: `${$v1Api}goods/query/brand/list`, //查询商品品牌列表
    apiGoodsqueryGoodsTypeList: `${$v1Api}goods/query/goods/type/list`, //查询商品类型列表

    apiGoodsDistributionApplyUpdate: `${$v1ApiGoods}distribution/apply/update`, // APP-商品铺货-申请上架
    apiGoodsApplyUpdate: `${$v1ApiGoods}apply/update`, // 商品型号申请-修改
    apiGoodsApplySave: `${$v1ApiGoods}apply/save`, // 商品型号申请-新增
    apiGoodsApplyCheck: `${$v1ApiGoods}apply/check`, // 商品型号申请-校验型号名称
    apiGoodsApplyView: `${$v1ApiGoods}apply/view`, // 商品型号申请-详情
    apiGoodsApplyQuery: `${$v1ApiGoods}apply/query`, // 商品型号申请-列表
    apiGoodsRecyleModelSave: `${$v1ApiGoods}recyle/model/save`, // 回收商品-新增
    apiGoodsRecyleModelUpdate: `${$v1ApiGoods}recyle/model/update`, // 回收商品-修改
    apiGoodsRecyleModelQuery: `${$v1ApiGoods}recyle/model/query`, // 回收商品-分页查询
    apiGoodsRecyleModelUpdateStatus: `${$v1ApiGoods}recyle/model/update/status`, // 回收商品-启动/暂停
    apiGoodsRecyleModelUpdatePrice: `${$v1ApiGoods}recyle/model/update/price`, // 回收商品-改价
    apiGoodsRecyleModelView: `${$v1ApiGoods}recyle/model/view`, // 回收商品-详情

    apiGoodsRecyleResalePublish: `${$v1ApiGoods}recycle/resale/publish`, // 回收再销售商品-发布
    apiGoodsRecyleResaleUpdate: `${$v1ApiGoods}recycle/resale/update`, // 回收再销售商品-修改
    apiGoodsRecyleResaleUpdatePrice: `${$v1ApiGoods}recycle/resale/update/price`, // 回收再销售商品-改价
    apiGoodsRecyleResaleUpdateStatus: `${$v1ApiGoods}recycle/resale/update/status`, // 回收再销售商品-上架/下架
    apiGoodsRecyleResaleCheckIsExist: `${$v1ApiGoods}recycle/resale/check/isExist`, // 旧机再销售校验是否存在
    apiGoodsRecyleResaleQueryByModelId: `${$v1ApiGoods}recycle/resale/query/by/modelId`, // 旧机再销售校验是否存在
    apiGoodsRecyleResaleMyGoodsList: `${$v1ApiGoods}recycle/resale/myGoods/list`, // 回收再销售商品-列表
    apiGoodsRecyleResaleForSaleList: `${$v1ApiGoods}recycle/resale/forSale/list`, // 回收再销售商品-在售/待售列表

    apiGoodsRecylePreSaleQueryBuyerInfo: `${$v1ApiGoods}recycle/pre/sale/query/buyer/info`, // 预售活动详情
    apiGoodsRecyleResaleBuyerInfo: `${$v1ApiGoods}recycle/resale/buyer/info`, // 旧机买家商品-详情
    apiGoodsRecyleResaleBuyerSaleList: `${$v1ApiGoods}recycle/resale/buyer/sale/list`, // 旧机买家销售商品-列表
    apiGoodsRecyleResaleBuyerPreSaleList: `${$v1ApiGoods}recycle/resale/buyer/preSale/list`, // 旧机买家预售商品-列表

    apiGoodsGarageDetail: `${$v1ApiGoods}garage/detail`,
    apiGoodsQueryWarehousesGoodsList$Post: `${$v1ApiGoods}query/warehouse/goods/list`,
    apiGoodsQueryWarehousesGoodsList: `${$v1ApiGoods}query/warehousesGoodsList`, // 商品查询列表-代客下单/修理厂列表
    apiGoodsQueryGoodsOnSale: `${$v1Api}goods/query/goods/OnSale`, // 获取商品在售和待售列表
    apiGoodsQueryChooseGoods: `${$v1Api}goods/query/chooseGoods`, // 服务商选择商品-非自由仓
    apiGoodsRecycleResaleForSaleList: `${$v1Api}goods/recycle/resale/forSale/list`, // 服务商选择商品-非自由仓
    // 旧机买家-回收商品管理
    apiGoodsModelApplyUpdate: `${$v1ApiGoods}model/apply/update`, // 商品型号申请-修改
    apiGoodsModelApplySave: `${$v1ApiGoods}model/apply/save`, // 商品型号申请-新增
    apiGoodsModelApplyQuery: `${$v1ApiGoods}model/apply/query`, // 商品型号申请-列表
    apiGoodsModelApplyCheck: `${$v1ApiGoods}model/apply/check`, // 商品型号申请-校验
    apiGoodsModelApplyView: `${$v1ApiGoods}model/apply/view`, // 商品型号申请-详情
    apiGoodsRecycleModelUpdate: `${$v1ApiGoods}recycle/model/update`, // 回收商品-修改
    apiGoodsRecycleModelUpdatePrice: `${$v1ApiGoods}recycle/model/update/price`, // 回收商品-改价
    apiGoodsRecycleModelSave: `${$v1ApiGoods}recycle/model/save`, // 回收商品-新增
    apiGoodsRecycleModelQuery: `${$v1ApiGoods}recycle/model/query`, // 回收商品-列表
    apiGoodsRecycleModelQueryByModelId: `${$v1ApiGoods}recycle/model/query/by/modelId`, // 回收商品-根据型号id查询详情
    apiGoodsRecycleModelPrice: `${$v1ApiGoods}recycle/model/price`, // 回收商品-改价
    apiGoodsRecycleModelView: `${$v1ApiGoods}recycle/model/view`, // 回收商品-详情
    apiGoodsRecycleResaleQueryInfo: `${$v1ApiGoods}recycle/resale/query/info`, // 旧机再销售管理-详情
    apiGoodsRecycleResaleBuyerInfo: `${$v1ApiGoods}recycle/resale/buyer/info`, // 旧机买家商品-详情
    apiGoodsRecycleModelUpdateStatus: `${$v1ApiGoods}recycle/model/update/status`, // 回收商品-启动/暂停
    apiGoodsRecycleModelCheckPrice: `${$v1ApiGoods}recycle/model/check/price`, // 回收商品-校验回收价格
    apiGoodsProjectInvestmentBuyerPreview: `${$v1ApiGoods}project/investment/buyer/preview`, // 买家预览
    apiGoodsRecycleModelView$Id: `${$v1ApiGoods}recycle/model/view`, // 买家预览
    apiGoodsRecyclePreSaleQueryBuyerInfo: `${$v1ApiGoods}recycle/pre/sale/query/buyer/info`, // 查看买家预售活动详情
    apiGoodsRecycleResalePreviewInfo: `${$v1ApiGoods}recycle/resale/preview/info`, // 旧机再销售管理-预览商品
    apiGoodsModelCompensateUnitList: `${$v1ApiGoods}model/compensate/unit/list`, // 售后补偿配置-零部件列表
    apiGoodsModelCompensateDetailCondition: `${$v1ApiGoods}/model/compensate/detail/condition`, // 获取补偿金额
    // 旧机买家-回收再销售
    apiGoodsRecycleResalePublish: `${$v1ApiGoods}recycle/resale/publish`, // 回收再销售商品-发布
    apiGoodsRecycleResaleUpdate: `${$v1ApiGoods}recycle/resale/update`, // 回收再销售商品-修改
    apiGoodsRecycleResaleUpdatePrice: `${$v1ApiGoods}recycle/resale/update/price`, // 回收再销售商品-改价
    apiGoodsRecycleResaleUpdateStatus: `${$v1ApiGoods}recycle/resale/update/status`, // 回收再销售商品-修改状态
    apiGoodsRecycleResaleMyGoodsList: `${$v1ApiGoods}recycle/resale/myGoods/list`, // 回收再销售商品-列表
    apiGoodsRecycleResaleBuyerPreSaleList: `${$v1ApiGoods}recycle/resale/buyer/preSale/list`, // 旧机买家预售商品-列表
    // APP-商品店铺收藏
    apiGoodsCollectionCollectionList: `${$v1ApiGoods}collection/collectionList`, // 商品收藏列表
    apiGoodsCollectionCollection: `${$v1ApiGoods}collection/collection`, // 商品收藏
    apiGoodsCollectionCancel$Id: `${$v1ApiGoods}collection/cancel`, // 取消收藏
    apiGoodsCollectionCancelBatch: `${$v1ApiGoods}collection/cancelBatch`, // 取消收藏批量操作
    apiGoodsCollectionCollectionCount: `${$v1ApiGoods}collection/collectionCount`, // 我的收藏数量
    apiGoodsCollectionStoreCollectionList: `${$v1ApiGoods}collection/storeCollectionList`, // 店铺收藏列表
    apiGoodsCollectionCollectionStore: `${$v1ApiGoods}collection/collectionStore`, // 店铺收藏
    apiGoodsCollectionCancelStore$Id: `${$v1ApiGoods}collection/cancelStore`, // 店铺取消收藏
    apiGoodsCollectionCancelStoreBatch: `${$v1ApiGoods}collection/cancelStoreBatch`, // 店铺取消收藏批量
    query: {
      priceGuideList: `${$v1ApiGoods}query/priceGuideList`, // 价格指导
      myGoods: `${$v1ApiGoods}query/myGoods`, // 我的商品列表
    },
    project: {
      investment: {
        list: `${$v1ApiGoods}project/investment/list`, // 项目投资列表
        apply: {
          status: `${$v1ApiGoods}project/investment/apply/status`,
        },
        save: `${$v1ApiGoods}project/investment/save`,
        detail: `${$v1ApiGoods}project/investment/detail`,
        update: `${$v1ApiGoods}project/investment/update`,
        reason: `${$v1ApiGoods}project/investment/reason`,
        updateStatus: `${$v1ApiGoods}project/investment/update/status`,
        whetherApplyListing: `${$v1ApiGoods}project/investment/whether/apply/listing`,
        buyerPreview: `${$v1ApiGoods}project/investment/buyer/preview`,
        sellerPreview: `${$v1ApiGoods}project/investment/seller/preview`,
      },
    },
    category: {
      query: {
        category: {
          list: `${$v1Api}goods/category/query/category/list`, // 商品类别
        },
      },
      batch: {
        delete: `${$v1Api}goods/category/batch/delete`,
      },
    },
    type: {
      query: {
        list: `${$v1Api}goods/type/query/list`, // 商品类型
      },
    },
    seal: {
      area: {
        query: {
          list: `${$v1Api}goods/seal/area/query/list`, // 销售区域
        },
      },
    },
    detail: `${$v1Api}goods/detail`,
    save: `${$v1Api}goods/save`,
    template: {
      detail: `${$v1Api}goods/template/detail`, // 模板详情
      query: {
        list: `${$v1Api}goods/template/query/list`, // 模板列表
      },
    },
    brand: {
      query: {
        apply: {
          check: `${$v1Api}goods/brand/apply/check`, // 品牌校验
          save: `${$v1Api}goods/brand/apply/save`, // 品牌申请
          list: `${$v1Api}goods/brand/query/apply/list`, // 品牌列表
        },
      },
    },
    sku: {
      property: {
        apply: {
          list: `${$v1Api}goods/sku/property/apply/list`, // 型号列表
        },
      },
    },
    params: {
      property: {
        apply: {
          list: `${$v1Api}goods/params/property/apply/list`, // 参数属性
        },
      },
    },
  },
  // 适配车型模块
  business: {
    vehicle: {
      apiBusinessVehicleFilter: '/v1/api/business/vehicle/filter',
      apiBusinessVehicleQueryVehicleDetail: '/v1/api/business/vehicle/query/vehicle/detail',
      apiBusinessVehicleQueryBindVehicle: '/v1/api/business/vehicle/query/bind/vehicle',
      vehicle: '/v1/api/business/vehicle/vehicle/by/vin',
      getgoodsbyvin: '/v1/api/business/vehicle/scan/getgoodsbyvin', // VIN查询车型商品信息
      getorderbyeno: '/v1/api/business/vehicle/scan/getorderbyeno', // 缸体号查询售后信息
      brand: {
        selectMode: `${$businessVehicleBrand}selectMode`,
        selectOne: `${$businessVehicleBrand}selectOne`,
        selectParameters: `${$businessVehicleBrand}selectParameters`,
        selectSeries: `${$businessVehicleBrand}selectSeries`, // 根据品牌ID找车系列表
        ocrGoods: `${$businessVehicleBrand}ocrGoods`, // ocr识别-返单据
      },
      handlose: {
        warehousing: `/v1/api/business/vehicle/handlose/warehousing`, // 手动数据发动集码入库
      },
    },
  },
  extra: {
    apiExtraBankFuzzy: `${$v1Api}extra/bank/fuzzy`, // 根据银行名称模糊查询银行信息
    apiExtraBankInfoFuzzy: `${$v1Api}extra/bank/info/fuzzy`, // 根据银行名称查询开户行信息
    apiExtraWithdrawQuerySign$GET: `${$v1Api}extra/withdraw/query/sign`, // 查询提现协议
    apiExtraWithdrawSign$PUT: `${$v1Api}extra/withdraw/sign`, // 签约电子协议
    apiExtraWithdrawApply: `${$v1Api}extra/withdraw/apply`, // 提现申请
    apiExtraCustomerShow: `${$v1Api}extra/customer/show`, // 登录图标
    apiExtraCustomerMoor: `${$v1Api}extra/customer/moor`, // 登录图标
    apiExtraWithdrawCheckApply: `${$v1Api}extra/withdraw/check/apply`, // APP-我的账户-提现 检查是否有权限提现
  },
  // 地区
  sixhot: {
    area: {
      sub: `/v1/api/sixhot/area/sub`,
      list: `/v1/api/sixhot/area/list`,
      provinceSub: `${$v1Api}sixhot/area/province/sub`,
      tree: `${$v1Api}sixhot/area/tree`,
      info: '/v1/api/sixhot/area/tertiary/info',
    },
  },
  // 社群圈子
  create: {
    apiCreateColumnList: `${$appCreate}/column/list`, // 栏目列表
    apiCreateVideoSave: `${$appCreate}/video/save`, // 发视频
    apiCreateVideo$Id: `${$appCreate}/video`, // 根据id获取视频详情
    apiCreateIdeasSave: `${$appCreate}/ideas/save`, // 发想法
    apiCreateIdeas$Id: `${$appCreate}/ideas`, // 根据id获取想法详情

    apiCreateQuestionsQuestionTipoff: `${$appCreate}/questions/question/tipoff`, // 问答举报

    apiCreateQuestionsQuestionLike: `${$appCreate}/questions/question/like`, // 问答点赞
    apiCreateQuestionsQuestionCancelLike: `${$appCreate}/questions/question/cancelLike`, // 问答取消点赞
    apiCreateQuestionsQuestionCollect: `${$appCreate}/questions/question/collect`, // 问答收藏
    apiCreateQuestionsQuestionCancelCollect: `${$appCreate}/questions/question/cancelCollect`, // 问答取消收藏
    apiCreateQuestionsAnswerSave: `${$appCreate}/questions/answer/save`, // 写回答
    apiCreateQuestionsQuestionSave: `${$appCreate}/questions/question/save`, // 发问题
    apiCreateQuestionsQuestionList: `${$appCreate}/questions/question/list`, // 问题列表
    apiCreateQuestionsQuestion$Id: `${$appCreate}/questions/question/getInfoById`, // 问答详情
    apiCreateQuestionsQuestionView$Id: `${$appCreate}/questions/question/view`, // 查看内容

    apiCreateQuestionsCommentCancelLike: `${$appCreate}/questions/comment/cancelLike`, // 评论取消点赞
    apiCreateQuestionsCommentLike: `${$appCreate}/questions/comment/like`, // 评论点赞
    apiCreateQuestionsCommentList: `${$appCreate}/questions/comment/list`, // 评论列表
    apiCreateQuestionsCommentSave: `${$appCreate}/questions/comment/save`, // 发评论
    apiCreateQuestionsCommentReplay: `${$appCreate}/questions/comment/replay`, // 回复
    apiCreateQuestionsCommentTipoff: `${$appCreate}/questions/comment/tipoff`, // 评论举报
    apiCreateQuestionsQuestionUpdate: `${$appCreate}/questions/question/update`, // 修改问题
    apiCreateQuestionsAnswerUpdate: `${$appCreate}/questions/answer/update`, // 修改回答
    apiCreateQuestionsAnswerList: `${$appCreate}/questions/answer/list`, // 回答列表
    apiCreateQuestionsAnswer$Id: `${$appCreate}/questions/answer`, // 根据id获取回答详情

    apiCreateQuestionsHomeGetUserInfo: `${$appCreate}/questions/home/getUserInfo`, // 个人基本信息
    apiCreateQuestionsHomeUpdateUserInfo: `${$appCreate}/questions/home/updateUserInfo`, // 修改个人基本信息
    apiCreateQuestionsHomeGetUserInfoById: `${$appCreate}/questions/home/getUserInfoById`, // 根据userid获取个人主页数量
    apiCreateQuestionsHomeGetFollowTypeById$Id: `${$appCreate}/questions/home/getFollowTypeById`, // 根据id获取是否关注
    apiCreateQuestionsHomeGetInfoById: `${$appCreate}/questions/home/getInfoById`, // 根据userid获取个人主页数量
    apiCreateQuestionsHomeUpdateFollow: `${$appCreate}/questions/home/updateFollow`, // 关注
    apiCreateQuestionsHomeCancelFollow: `${$appCreate}/questions/home/cancelFollow`, // 取消关注
    apiCreateQuestionsHomeGetFans: `${$appCreate}/questions/home/getFans`, // 我的粉丝列表
    apiCreateQuestionsHomeGetAttention: `${$appCreate}/questions/home/getAttention`, // 我的关注列表
    apiCreateQuestionsHomeGetCollection: `${$appCreate}/questions/home/getCollection`, // 我的收藏列表
    apiCreateQuestionsHomeCancelCollect: `${$appCreate}/questions/home/cancelCollect`, // 取消收藏
    apiCreateQuestionsHomeCheckEnable: `${$appCreate}/questions/home/checkEnable`, // 检查是否可以发表评论
    apiCreateQuestionsHomeCollectTotalCount: `${$appCreate}/questions/home/collectTotalCount`, // 检查是否可以发表评论
  },
  company: {
    apiCompanyLegalAddressGarage: `${$v1Api}company/legal/address/garage`, // 汽修厂完善地址信息
    apiCompanyInfoMapAllStatistical: `${$v1Api}company/info/map/all/statistical`, // 获取认证信息
    apiCompanyInfoInvoiceTitle: `${$v1Api}company/info/invoice/title`, // 获取认证信息
    apiCompanyLegalAuthSkill: `${$v1Api}company/legal/auth/skill`, // 技术工认证
    apiCompanyLegalInfo: `${$v1Api}company/legal/info`, // 获取认证信息
    apiCompanyLegalAuthAnewIdentity: `${$v1Api}company/legal/auth/anew/identity`, // 身份证重新认证
    apiCompanyLegalAuthAnewLicense: `${$v1Api}company/legal/auth/anew/license`, // 营业执照重新认证
    apiCompanyLegalAuthAnewAll: `${$v1Api}company/legal/auth/anew/all`, // 营业执照和身份证重新认证
    apiCompanyLegalGarage: `${$v1Api}company/legal/garage`, // 获取认证信息
    apiCompanyLegalRealNameInfo: `${$v1Api}company/legal/real/name/info`, // 获取实名认证信息
    apiCompanyLegalAuthCompany: `${$v1Api}company/legal/auth/company`, // 企业认证（企业信息页）
    apiCompanyLegalAuthIdentity: `${$v1Api}company/legal/auth/identity`, // 企业认证（个人身份页）
    fileOcr: `v1/file/ocr`, // 图片上传包含ocr识别
    apiCompanyLegalAuthAccount: `${$v1Api}company/legal/auth/account`, // 供应商、服务商 企业认证（添加账户页）
    apiCompanyLegalAuthGarage: `${$v1Api}company/legal/auth/garage`, // 汽修厂认证
    apiCompanyInfoDetail: `${$v1Api}company/info/detail`, // app 个人中心 详情接口
    apiCompanyInfoPhoto: `${$v1Api}company/info/photo`, // 修改头像
    apiCompanyInfoSroreName: `${$v1Api}company/info/store/name`, // 修改店铺名称
    apiCompanyInfoSms: `${$v1Api}company/info/sms`, // 云商通验证码
    apiCompanyInfoBindMobile: `${$v1Api}company/info/bind/mobile`, // 云商通绑定手机号
    apiCompanyInfoGaragePage: `${$v1Api}company/info/garage/page`, // 汽修厂列表代货订单列表
    apiCompanyInfoGarageAudit: `${$v1Api}company/info/garage/audit`, // 修理厂信息审核
    apiCompanyInfoStore: `${$v1Api}company/info/store`, // 获取店铺信息
    apiCompanyLegalRealName$PUT: `${$v1Api}company/legal/real/name`, // 汽修厂实名认证
    apiCompanyLegalRealName$GET: `${$v1Api}company/legal/real/name`, // 汽修厂实名认证 查询接口
    apiCompanyInfoSupplierStatistical: `${$v1Api}company/info/supplier/statistical`, // 供应商平台客户数据统计
    // 二期拓客相关api
    apiCompanyInfoRemoveBind$Id: `${$v1Api}company/info/remove/bind`, // 供应商解除绑定
    apiCompanyInfoRemoveBinder: `${$v1Api}company/info/remove/binder`, // 修理厂解除绑定
    apiCompanyInvitationSms: `${$v1Api}company/invitation/sms`, // 云商通验证码
    apiCompanyInvitationH5TertiaryInfo: `${$v1Api}company/invitation/h5/tertiary/info`, // 经纬度转区域code
    apiCompanyInvitationH5Sms: `${$v1Api}company/invitation/h5/sms`, // 云商通发送验证码（邀请修理厂）
    apiCompanyInvitationH5CheckGarage: `${$v1Api}company/invitation/h5/check/garage`, // 云商通发送验证码（邀请修理厂）
    apiCompanyInfoAudit: `${$v1Api}company/info/audit`, // 审核
    apiCompanyInvitationH5Common: `${$v1Api}company/invitation/h5/common`, // 通用二维码邀请注册
    apiCompanyInvitationH5Garage: `${$v1Api}company/invitation/h5/garage`, // 邀请修理厂（二维码）
    apiCompanyInvitationH5BindMobile: `${$v1Api}company/invitation/h5/bind/mobile`, // 拓客H5绑定手机号（通联绑定）
    apiCompanyInvitationH5BindInvitation: `${$v1Api}company/invitation/h5/bind/invitation`, // 建立绑定关系
    apiCompanyInvitationCheckSupplier: `${$v1Api}company/invitation/check/supplier`, // 供应商手机号验证
    apiCompanyInvitationSupplier$POST: `${$v1Api}company/invitation/supplier`,
    apiCompanyInvitationSupplier$PUT: `${$v1Api}company/invitation/supplier`,
    apiCompanyInvitationAnewIdentity: `${$v1Api}company/invitation/anew/identity`, // 身份证重新认证 拓客
    apiCompanyInvitationAnewLicense: `${$v1Api}company/invitation/anew/license`, // 营业执照重新认证 拓客
    apiCompanyInvitationAnewAll: `${$v1Api}company/invitation/anew/all`, // 营业执照和身份证重新认证 拓客
    apiCompanyInvitationAuthInfo: `${$v1Api}company/invitation/auth/info`, // 获取供应商或服务商详情（修改供应商或服务商接口专用）
    apiCompanyInvitationH5CheckSupplier: `${$v1Api}company/invitation/h5/check/supplier`,
    apiCompanyInvitationH5Supplier$POST: `${$v1Api}company/invitation/h5/supplier`,
    apiCompanyInvitationH5Supplier$PUT: `${$v1Api}company/invitation/h5/supplier`,
    apiCompanyInvitationH5CheckAgent: `${$v1Api}company/invitation/h5/check/agent`,
    apiCompanyInvitationH5Agent$POST: `${$v1Api}company/invitation/h5/agent`,
    apiCompanyInvitationH5Agent$PUT: `${$v1Api}company/invitation/h5/agent`,
    apiCompanyInvitationCheckAgent: `${$v1Api}company/invitation/check/agent`,
    apiCompanyInvitationAgent$POST: `${$v1Api}company/invitation/agent`,
    apiCompanyInvitationAgent$PUT: `${$v1Api}company/invitation/agent`,
    apiCompanyInvitationCheckGarage: `${$v1Api}company/invitation/check/garage`,
    apiCompanyInvitationGarage: `${$v1Api}company/invitation/garage`,
    apiCompanyInfoManagerGarageTab: `${$v1Api}company/info/manager/garage/tab`,
    apiCompanyInfoManagerTab: `${$v1Api}company/info/manager/tab`, // 渠道/招商经理-管辖企业（供应商/服务商）tabs
    apiCompanyInfoManagerGaragePage: `${$v1Api}company/info/manager/garage/page`,
    apiCompanyInfoManagerGarageInfo: `${$v1Api}company/info/manager/garage/info`,
    apiCompanyInfoManagerInfo: `${$v1Api}company/info/manager/info`, // 渠道/招商经理-管辖企业（供应商/服务商）详情
    apiCompanyInfoManagerPage: `${$v1Api}company/info/manager/page`, // 渠道/招商经理-管辖企业（供应商/服务商）分页
    apiCompanyInfoManagerGarageMapStatistical: `${$v1Api}company/info/manager/garage/map/statistical`, // marker地图数据统计
    apiCompanyInfoManagerGarageMapDetails: `${$v1Api}company/info/manager/garage/map/details`, // marker地图信息详情
    apiCompanyInfoManagerGarageLabelSave: `${$v1Api}company/info/manager/garage/label/save`, // marker地图标签保存
    apiCompanyInfoManagerGarageMapTab: `${$v1Api}company/info/manager/garage/map/tab`, // marker地图tab列表
    apiCompanyInfoManagerGarageMapList: `${$v1Api}company/info/manager/garage/map/list`, // marker地图信息列表
    apiCompanyInfoTechnicianRelationCount: `${$v1Api}company/info/technician/relation/count`, // 技术工邀请列表统计数
    apiCompanyInfoTechnicianRelationPage: `${$v1Api}company/info/technician/relation/page`, // 技术工邀请技术工分页查询列表
    apiCompanyInfoTechnicianGaragePage: `${$v1Api}company/info/technician/garage/page`, // 技术工邀请汽修厂分页查询列表
    apiCompanyCancellationPage: `${$v1Api}company/cancellation/page`, // 注销记录查询分页
    apiCompanyCancellation$Delete: `${$v1Api}company/cancellation`, // 撤销注销申请
    apiCompanyCancellationType: `${$v1Api}company/cancellation/type`, // 获取注销缘由
    apiCompanyCancellation$Post: `${$v1Api}company/cancellation`, // 主体注销
    apiCompanyCancellationWait: `${$v1Api}company/cancellation/wait`, // 获取待审核注销信息
    apiCompanyCancellationStaff: `${$v1Api}company/cancellation/staff`, // 员工注销
    apiCompanyInfoSkillInfo: `${$v1Api}company/info/skill/info`, // 获取技术工收益工作天数信息
    apiCompanyInvitationAgentByGarage: `${$v1Api}company/invitation/agentByGarage`, // 获取汽修厂绑定的服务商信息
    apiCompanyInfoInviterInfo: `${$v1Api}company/info/inviter/info`, // 获取渠道经理或招商经理信息
    apiCompanyInfoSerialDic: `${$v1Api}company/info/serial/dic`, // 获取车系字典
    apiCompanyInfoAdminPhoneNumber: `${$v1Api}company/info/admin/phoneNumber`,
    apiCompanyLegalSkillGarage: `${$v1Api}company/legal/skill/garage`,
    apiCompanyBindingInviterExist: `${$v1Api}company/binding/inviter/exist`, //企业绑定关系信息管理
  },
  user: {
    apiUserInfoCustomer$GET: `${$v1Api}user/info/customer`, // 根据角色id查询用户列表
    apiUserInfoCustomerService: `${$v1Api}user/info/customer/service`, // 根据角色id查询用户列表
    apiUserInfoAccountList: `${$v1Api}user/info/account/list`, // 根据角色id查询用户列表
    apiUserInfoAccount$Id: `${$v1Api}user/info/account`, // 根据accountId删除账号信息
    apiUserInfoAccountRole: `${$v1Api}user/info/account/role`, // 查询角色和员工信息
    apiUserInfo: `${$v1Api}user/info`, // 新增账号
    apiUserInfo$PUT: `${$v1Api}user/info`, // 新增账号
    apiUserInfoMobile: `${$v1Api}user/info/mobile`, // 修改手机号
    apiUserInfoCheckMobile: `${$v1Api}user/info/check/mobile`, // 验证原始手机号
    getUserProfile: `${$v1Api}company/info/detail`, // app 个人中心 详情接口
    // 绑定银行卡相关接口（APP）
    apiExtraBankApplyBankcard: `${$v1Api}extra/bank/apply/bankcard`, // 申请绑卡（绑卡页面发送短信验证码接口）
    apiExtraBankBindBankcard: `${$v1Api}extra/bank/bind/bankcard`, // 确认绑卡
    apiExtraBankUnBankcard: `${$v1Api}extra/bank/un/bankcard`, // 银行卡解绑
    apiExtraBankList: `${$v1Api}extra/bank/list`, // 查询银行卡信息
    apiAccountDetailsPage: `${$v1Api}account/details/page`, // 获取账户明细分页列表
    apiAccountDetailsAdd: `${$v1Api}account/details/add`, // APP-添加账户明细
    apiAccountDetailsWithdrawPage: `${$v1Api}account/details/withdraw/page`, // APP-提现记录
    apiAccountDetailsMain: `${$v1Api}account/details/main`, // APP-我的账户
  },
  // 账号
  account: {
    apiAccountWorkbench$GET: `${$v1Api}account/workbench`, // 账号角色关系分页查询
    apiAccountWorkbench$POST: `${$v1Api}account/workbench`, // 账号角色关系分页查询
    apiAccountRolePage: `${$v1Api}account/role/page`, // 账号角色关系分页查询
    apiAccountRole$Post: `${$v1Api}account/role`, // 新增账号角色关系
    apiAccountRole$Put: `${$v1Api}account/role`, // 修改账号角色关系
    apiAccountRole$Post$Id: `${$v1Api}account/role`, // 通过账号 ID 获取用户角色
    apiAccountRoleBatch: `${$v1Api}account/role/batch`, // 批量逻辑删除账号与角色关系
    apiAccountRole$Delete$Id: `${$v1Api}account/role`, // 逻辑删除账号与角色关系
    apiAccountDetailsBalance: `${$v1Api}account/details/balance`, // 根据账户类型获取总金额
  },
  // 菜单树
  menu: {
    apiMenuTree: `${$v1Api}menu/tree`, // 根据用户信息获取菜单树
    apiMenuList: `${$v1Api}menu/list`, // 根据用户信息获取菜单树
    apiMenuRoleTree: `${$v1Api}menu/role/tree`, // 角色 id 获取权限列表
    apiMenuOrgTree: `${$v1Api}menu/org/tree`, // 组织 id 获取权限列表
  },
  // 角色
  role: {
    apiRolePerms: `${$v1Api}role/perms`, // 修改角色权限信息
    apiRole: `${$v1Api}role`, // 新增角色
    apiRole$Put: `${$v1Api}role`, // 修改角色
    apiRole$Delete: `${$v1Api}role`, // 逻辑删除角色
  },
  coupon: {
    want: {
      config: `${$couponTrade}want/config`,
      config$userId: `${$couponTrade}want/config`,
    },
    trade: {
      page: `${$couponTrade}page`,
      my: `${$couponTrade}my`,
      trading: `${$couponTrade}trading`,
      shelf: `${$couponTrade}shelf`,
      respondent: {
        pending: `${$couponTrade}respondent/pending`,
        approved: `${$couponTrade}respondent/approved`,
        rejected: `${$couponTrade}respondent/rejected`,
        agree$id: `${$couponTrade}respondent/agree/`,
        reject$id: `${$couponTrade}respondent/reject/`,
      },
      applicant: {
        pending: `${$couponTrade}applicant/pending`,
        approved: `${$couponTrade}applicant/approved`,
        rejected: `${$couponTrade}applicant/rejected`,
        cancel$id: `${$couponTrade}applicant/cancel`,
      },
    },
  },
  // 支付
  pay: {
    payPayResult: `/pay/pay/result`,
    payType: `/pay/type`,
    payRepaymentPay: `/pay/repayment/pay`,
  },
  repayment: {
    apiRepaymentLogList: `${$v1Api}repayment/log/list`, // 还款记录
    apiRepaymentLogInfoList: `${$v1Api}repayment/log/infoList`, // 还款记录详情
  },
  // 仓库
  warehouse: {
    apiWarehousePage: `${$v1Api}warehouse/page`, // App仓库管理分页列表
    apiWarehousePlat: `${$v1Api}warehouse/plat`, // 获取平台仓信息
    apiWarehousePageGoods: `${$v1Api}warehouse/page/goods`, // 商品 id 集合，获取供应商在平台库中库存信息
    apiWarehouse$Id: `${$v1Api}warehouse`, // id 获取仓库详情
    apiWarehouse$Post: `${$v1Api}warehouse`, // 新增仓库
    apiWarehouse$Put: `${$v1Api}warehouse`, // 修改仓库
    apiWarehouseBatch: `${$v1Api}warehouse/batch`, // 批量删除数据
    apiWarehouse$Delete: `${$v1Api}warehouse`, // 按仓库 id 删除仓库信息
    apiWarehouseOperSupplierRefill: `${$v1Api}warehouse/oper/supplier/refill`, // 供应商补库存-平台库
    apiWarehouseOperSupplierSelfRefill: `${$v1Api}warehouse/oper/supplier/self/refill`, // 供应商补库存-自有库
    apiWarehouseOperSupplierSelfRefillBatch: `${$v1Api}warehouse/oper/supplier/self/refill/batch`, // 供应商批量补库存-自有库
    apiWarehouseOperSupplierTransfer: `${$v1Api}warehouse/oper/supplier/transfer`, // 供应商-调拨库存
    apiWarehouseOperSupplierStockSelfRefill: `${$v1Api}warehouse/oper/supplier/stock/self/refill`, // 库存界面-供应商补库存-自有库
    apiWarehouseOperBatch: `${$v1Api}warehouse/oper/batch`, // 批量删除数据
    apiWarehouseOper: `${$v1Api}warehouse/oper`, // 按 id 删除数据
    apiWarehouseArrival$Id: `${$v1Api}warehouse/arrival`, // id 获取到货时效
    apiWarehouseArrivalWarehouse: `${$v1Api}warehouse/arrival/warehouse`, // 仓库 id 获取到货时效列表
    apiWarehouseArrival$Post: `${$v1Api}warehouse/arrival`, // 添加到货时效
    apiWarehouseArrival$Put: `${$v1Api}warehouse/arrival`, // 更新到货时效
    apiWarehouseArrivalBatch: `${$v1Api}warehouse/arrival/Batch`, // 批量删除数据
    apiWarehouseArrival$Delete: `${$v1Api}warehouse/arrival`, // 按 id 删除数据
    apiWarehouseArrivalPage: `${$v1Api}warehouse/arrival/page`, // 按 id 删除数据
    apiWarehouseDeliveryPage: `${$v1Api}warehouse/delivery/page`, // 分页查询发货时效规则
    apiWarehouseDelivery$Id: `${$v1Api}warehouse/delivery`, // id 获取发货时效
    apiWarehouseDelivery$Post: `${$v1Api}warehouse/delivery`, // 增加发货时效
    apiWarehouseDelivery$Put: `${$v1Api}warehouse/delivery`, // 修改发货时效
    apiWarehouseDeliveryBatch: `${$v1Api}warehouse/delivery/batch`, // 批量删除数据
    apiWarehouseDelivery$Delete: `${$v1Api}warehouse/delivery`, // 按 id 删除数据
    apiWarehouseOperSupplierSelfRefillMultiter: `${$v1Api}warehouse/oper/supplier/self/refill/multiterm`, // 供应商补库存-自有库-多条

    apiWarehouseStockGoodsWarehouse: `${$v1Api}warehouse/stock/goods/warehouse`, // 商品 id 获取商品各个仓库库存信息
    apiWarehouseStockAgentInvestAreaGoodsWarehouse: `${$v1Api}warehouse/stock/agent/invest/area/goods/warehouse`, // 商品 id 获取商品各个仓库库存信息
    apiWarehouseStockCompanyGoodsWarehouse: `${$v1Api}warehouse/stock/company/goods/warehouse`, // 商品 id 获取商品各个仓库库存信息
    apiWarehouseStockGoodsList: `${$v1Api}warehouse/stock/goods/list`, // 商品列表库存信息
    apiWarehouseStockPage: `${$v1Api}warehouse/stock/page`, // 获取分页数据
    apiWarehouseStock$Id: `${$v1Api}warehouse/stock`, // id 获取详情
    apiWarehouseStockGoods: `${$v1Api}warehouse/stock/goods`, // 商品 id 集合获取库存信息列表
    apiWarehouseStockGoodsArival: `${$v1Api}warehouse/stock/goods/arival`, // 商品到货时效查询--张苗
    apiWarehouseStock$Post: `${$v1Api}warehouse/stock`, // 新增商品库存信息
    apiWarehouseStock$Put: `${$v1Api}warehouse/stock`, // 更新商品库存信息
    apiWarehouseStockBatch: `${$v1Api}warehouse/stock/batch`, // 批量删除数据
    apiWarehouseStock$Delete: `${$v1Api}warehouse/stock`, // 按 id 删除数据
    apiWarehouseSupplierMy: `${$v1Api}warehouse/supplier/my`, // 供应商-我的仓库
    apiWarehouseMyWarehouses: `${$v1Api}warehouse/my/warehouses`, // 服务商-我的仓库
    apiWarehouseAgentStatisMy: `${$v1Api}warehouse/agent/statis/my`, // 统计-所有仓库
    apiWarehouseGoodsAgentInvest: `${$v1Api}warehouse/goods/agent/invest`, // 服务商-我的仓库
    apiWarehouseOperSupplierLogisticsInout: `${$v1Api}warehouse/oper/supplier/logistics/inout`, // 当前用户-出入库记录按月显示-物流状态可筛选

    apiWarehouseGoodsList: `${$v1Api}warehouse/goods/list`, // app-仓库 id 获取商品列表
    apiWarehouseStockAppPage: `${$v1Api}warehouse/stock/app/page`, // app 分页获取商品库存信息

    apiWarehouseOperSupplierInout: `${$v1Api}warehouse/oper/supplier/inout`, // 供应商-出入库记录按月显示
    apiWarehouseStatisRecyclingInout: `${$v1Api}warehouse/statis/recycling/inout`, // 回收公司-出入库记录按月显示
    apiWarehouseStockWarnSetting: `${$v1Api}warehouse/stock/warn/setting`, // 库存预警设置
    apiWarehouseStatisSupplierRefill: `${$v1Api}warehouse/statis/supplier/refill`, // 供应商补库存记录按月统计
    apiWarehouseStatisSupplierTransfer: `${$v1Api}warehouse/statis/supplier/transfer`, // 供应商调拨记录按月统计

    // 回收公司
    apiWarehouseOperRecyclingSelfRefillBatch: `${$v1Api}warehouse/oper/recycling/self/refill/batch`, // 回收公司批量补库存-自有库
    apiWarehouseOperRecyclingSelfOutBatch: `${$v1Api}warehouse/oper/recycling/self/out/batch`, // 回收公司批量出库-自有库
    apiWarehouseOperRecyclingSelfModifyBatch: `${$v1Api}warehouse/oper/recycling/self/modify/batch`, // 回收公司修改库存
    apiWarehouseDelivery: `${$v1Api}warehouse/delivery`, // 回收公司修改发货时效
    apiWarehouseAddDelivery: `${$v1Api}warehouse/delivery`, // 回收公司增加发货时效
    apiWarehouseRecycling: `${$v1Api}warehouse/recycling`, // 回收公司--我的仓库
    apiWarehouseOperSupplierQuerySalesReturn: `${$v1Api}warehouse/oper/supplier/querySalesReturn`, // 供应商退货入库单
    // 统计
    apiWarehouseStatisAgentStockChange: `${$v1Api}warehouse/statis/agent/stock/change`, // App-服务商统计-库存
    // 库存变化记录
    apiWarehouseOperFacilitatorSelfRefillCheck: `${$v1Api}warehouse/oper/facilitator/self/refill/check`, // 检验商品识别码是否存在
    apiWarehouseOperFacilitatorSelfOutBatch: `${$v1Api}warehouse/oper/facilitator/self/out/batch`, // 服务商批量出库-自有库
    apiWarehouseOperFacilitatorSelfRefillBatch: `${$v1Api}warehouse/oper/facilitator/self/refill/batch`, // 服务商批量补库存-自有库
    apiWarehouseOperAgentGoodsVinPage: `${$v1Api}warehouse/oper/agent/goods/vin/page`, // 仓储商品识别码分页条件查询
    apiWarehouseOper$Id: `${$v1Api}warehouse/oper`, // 库存日志记录详情
    apiWarehouseOperConfirmStock: `${$v1Api}warehouse/oper/confirm/stock`, // 服务商-调拨记录-确认入库
  },
  // 消息
  message: {
    apiMessageRecordSendMessage: `${$v1Api}message/record/sendMessage`,
    apiMessageRecordReadMessage: `${$v1Api}message/record/readMessage`,
    apiMessageRecordGetMessage: `${$v1Api}message/record/getMessage`,
    apiMessageRecordRollbackMessage: `${$v1Api}message/record/rollbackMessage`,
  },
  // 订单
  order: {
    // 招商经理\渠道经理
    apiOrderAfterSaleQueryListSupplier: `${$v1Api}order/after/sale/query/list/supplier`, // 供应商 售后单列表
    apiOrderInvestQueryListAgent: `${$v1Api}order/invest/query/list/agent`, // 服务商 订单列表
    apiOrderSellQueryListGarage: `${$v1Api}order/sell/query/list/garage`, // 修理厂 订单列表
    apiOrderSellQueryListInviter: `${$v1Api}order/sell/query/list/inviter`, // 技术工  推广单列表
    apiAccountperiodList: `${$v1Api}accountperiod/list`, // 招商经理、渠道经理、服务商拓客账款信息
    apiOrderProfitQueryUnsettleList: `${$v1Api}order/profit/query/unsettle/list`, // 待结算列表
    apiOrderProfitQueryUnsettleAmount: `${$v1Api}order/profit/query/unsettle/amount`, // 待结算金额
    // 销售订单
    apiOrderSellDelivery: `${$v1Api}order/sell/delivery`, // 销售订单发货
    apiOrderSellQueryListPromote: `${$v1Api}order/sell/query/list/promote`, // 推广单列表
    apiOrderSellAddressEdit: `${$v1Api}order/sell/address/edit`, // 销售单地址修改
    apiOrderSellCancel: `${$v1Api}order/sell/cancel`, // 取消订单
    apiOrderSellRemarkAdd: `${$v1Api}order/sell/remark/add`, // 销售单增加备注
    apiOrderSell$Id: `${$v1Api}order/sell`, // 销售单详情
    apiOrderSellQueryList: `${$v1Api}order/sell/query/list`, // 销售单列表
    apiOrderSellQueryInviterCount: `${$v1Api}order/sell/query/inviter/count`, // 技术工推广单总个数
    apiOrderSellReceive: `${$v1Api}order/sell/receive`, // 销售单收货
    apiOrderSellEnumStatus: `${$v1Api}order/sell/enum/status`, // 销售订单状态枚举
    apiOrderSellSend$Id: `${$v1Api}order/sell/send`, // 发货详情
    apiOrderSellStatus: `${$v1Api}order/sell/status`, // 销售单统计
    apiOrderSellWarn: `${$v1Api}order/sell/warn`, // 销售订单提醒发货
    apiOrderSellQueryListRefundEnabled: `${$v1Api}order/sell/query/list/refund/enabled`, // 退货退款申请
    // 投资订单
    apiOrderInvestStatus: `${$v1Api}order/invest/status`, // 投资单统计
    apiOrderInvestAddressEdit: `${$v1Api}order/invest/address/edit`, // 投资单地址修改
    apiOrderInvestReceipt: `${$v1Api}order/invest/receipt`, // 投资订单收货
    apiOrderInvestRemarkAdd: `${$v1Api}order/invest/remark/add`, // 投资单增加备注
    apiOrderInvest$Id: `${$v1Api}order/invest`, // 投资单详情
    apiOrderInvestWarn: `${$v1Api}order/invest/warn`, // 投资订单提醒发货
    apiOrderInvestDelivery: `${$v1Api}order/invest/delivery`, // 投资订单发货
    apiOrderInvestCancel: `${$v1Api}order/invest/cancel`, // 取消订单
    apiOrderInvestSend$Id: `${$v1Api}order/invest/send`, // 发货详情
    apiOrderInvestEnumStatus: `${$v1Api}order/invest/enum/status`, // 投资订单状态枚举
    apiOrderInvestQueryList: `${$v1Api}order/invest/query/list`, // 投资单列表
    apiOrderInvestQueryListRefundEnabled: `${$v1Api}order/invest/query/list/refund/enabled`, // 退货退款申请
    apiOrderPlaceSpNational: `${$v1Api}order/place/sp/national`, // 服务商投资(全国投资)
    apiOrderPlaceGarage: `${$v1Api}order/place/garage`, // 修理厂统一下单
    apiOrderPlaceSpLocal: `${$v1Api}order/place/sp/local`, // 服务商投资(本地投资)
    // APP - 退换货订单
    apiRefundCalculateAmount: `${$v1Api}refund/calculate/amount`, // 计算可退金额
    apiRefundCreateDelivery: `${$v1Api}refund/create/delivery`, // 发起退货单
    apiRefundCreateFefundApply: `${$v1Api}refund/create/fefund/apply`, // 发起退款申请
    apiRefundCancelApply: `${$v1Api}refund/cancel/apply`, // 取消申请
    apiRefundUpdateApply: `${$v1Api}refund/update/apply`, // 更新退款单
    apiRefundReceipt: `${$v1Api}refund/receipt`, // 收货
    apiRefundDetail: `${$v1Api}refund/detail`, // 详情
    apiOrderRefundCauseQueryList: `${$v1Api}order/refund/cause/query/list`, // 运营后台 - 退款原因
    apiRefundQueryList: `${$v1Api}refund/query/list`, // 订单退货列表
    apiRefundCheckOrder: `${$v1Api}refund/check/order`, // 校验订单
    apiRefundCheckFastRefund: `${$v1Api}/refund/check/fast/refund`, // 校验极速退款
    apiRefundGetRefundEngineCode: `${$v1Api}/refund/get/refund/engine/code`, // 获取可退的发动机识别码
    //App - 铺货订单
    apiOrderDistributionPage: `${$v1Api}order/distribution/page`, // 铺货订单列表查询
    apiOrderDistributionDetail: `${$v1Api}order/distribution/detail`, // 铺货订单详情
    apiOrderDistributionDeliver: `${$v1Api}order/distribution/deliver`, //发货

    // APP-应还/应收列表
    apiOrderRepaymentQueryRepayableList: `${$v1Api}order/repayment/query/repayableList`, // 应还订单列表，应还账款使用
    apiOrderRepaymentQueryRepayableCalendar: `${$v1Api}order/repayment/query/repayableCalendar`, // 应还日历
    apiOrderRepaymentQueryRepayableAmount: `${$v1Api}order/repayment/query/repayableAmount`, // 应还总金额，应还账款使用
    apiOrderRepaymentQueryReceivableList: `${$v1Api}order/repayment/query/receivableList`, // 应收订单列表，应收账款使用
    apiOrderRepaymentQueryReceivableCalendar: `${$v1Api}order/repayment/query/receivableCalendar`, // 应收日历
    apiOrderRepaymentQueryReceivableAmount: `${$v1Api}order/repayment/query/receivableAmount`, // 应收总金额，应收账款使用
    apiOrderAccountPeriodReceivableList: `${$v1Api}order/account/period/receivable/list`, // 应收账款-列表
    apiOrderAccountPeriodReceivableStatistics: `${$v1Api}order/account/period/receivable/statistics`, // 应收账款-统计
    apiOrderAccountPeriodPayableStatistics: `${$v1Api}order/account/period/payable/statistics`, // 还款订单-统计
    apiOrderAccountPeriodGetByCurrentUser: `${$v1Api}order/account/period/get/by/current/user`, // 当前用户应收应付
    apiOrderAccountPeriodQueryReceivableCalendar: `${$v1Api}order/account/period/query/receivableCalendar`, // 应收日历
    apiOrderAccountPeriodQueryRepayableCalendar: `${$v1Api}order/account/period/query/repayableCalendar`, // 应付日历
    // APP-评价
    apiOrderEvaluateGetUnEvaluateOrderList: `${$v1Api}orderEvaluate/getUnEvaluateOrderList`, // 我的评价-待评价
    apiOrderEvaluateGetEvaluateOrderDetail: `${$v1Api}orderEvaluate/getEvaluateOrderDetail`, // 我的评价-评价详情
    apiOrderEvaluateGetEvaluateOrderList: `${$v1Api}orderEvaluate/getEvaluateOrderList`, // 我的评价-已评价
    // 回收服务订单-修理厂app(二期)
    apiOrderRecycleRepairQueryPage: `${$v1Api}order/recycle/repair/query/page`, // 修理厂-分页查询服务订单列表
    apiOrderRecycleCheckCancel: `${$v1Api}order/recycle/check/cancel`, // 修理厂-校验取消单是否绑定销售单
    apiOrderRecycleCancel: `${$v1Api}order/recycle/cancel`, // 取消订单
    apiOrderRecycleNotWaitCheck: `${$v1Api}order/recycle/not/wait/check`, // 修理厂-不等待-校验是否绑定销售单
    apiOrderRecycleWaitingAssign: `${$v1Api}order/recycle/waiting/assign`, // 修理厂-不等待-我知道了(待指派)
    apiOrderRecycleSave: `${$v1Api}order/recycle/save`, // 新增回收订单信息
    apiOrderRecycleUpdate: `${$v1Api}order/recycle/update`, // 修理厂-修改订单
    apiOrderRecycleDetail: `${$v1Api}order/recycle/detail`, // 查看回收服务详情
    apiOrderRecycleNotNeed: `${$v1Api}order/recycle/notNeed`, // 修理厂-不等待-不需要
    apiOrderRecycleNeedAssign: `${$v1Api}order/recycle/need/assign`, // 修理厂-不等待-需要指派
    apiOrderRecycleContinueWait: `${$v1Api}order/recycle/continue/wait`, // 修理厂-继续等待
    apiOrderRecycleConfirmRecycle: `${$v1Api}order/recycle/confirm/recycle`, // 修理厂-确认回收完成
    apiOrderRecycleSaveEvaluate: `${$v1Api}order/recycle/save/evaluate`, // 新增回收评价
    apiOrderNoninductiveEvaluateQuestion: `${$v1Api}order/noninductive/evaluate/question`, // 随机问题
    apiOrderNoninductiveEvaluateSave: `${$v1Api}order/noninductive/evaluate/save`, // 问题提交
    apiOrderRecycleMasterCancel: `${$v1Api}order/recycle/master/cancel`, // 集师傅-取消订单-待接单 (废弃)

    // 回收服务订单-技术工（二期）
    apiOrderRecycleSaveLogistics: `${$v1Api}order/recycle/save/logistics`, // 技术工-上传物流信息
    apiOrderRecycleCheck: `${$v1Api}order/recycle/check`, // 技术工-提交验收凭证
    apiOrderRecycleOrderDetail$Id: `${$v1Api}order/recycle/orderDetail`, // 技术工-查看服务单详情
    apiOrderRecycleQueryLogistics: `${$v1Api}order/recycle/query/logistics`, // 技术工-查看物流信息
    // 回收服务订单-回收公司app(二期)
    apiOrderRecycleQueryPageList: `${$v1Api}order/recycle/query/pageList`, // 回收服务订单列表查询
    apiOrderRecycleQuality: `${$v1Api}order/recycle/quality`, // 回收公司-查验
    apiOrderRecycleReceiptGoods: `${$v1Api}order/recycle/receipt/goods`, // 回收公司-确定收货
    // 安装服务单-技术工
    apiOrderTechnicianQueryList: `${$v1Api}order/technician/query/list`, // 服务单列表查询
    apiOrderTechnicianInstallDetail$Id: `${$v1Api}order/technician/install/detail`, // 安装订单详情
    apiOrderTechnicianInstallStart$Id: `${$v1Api}order/technician/install/start`, // 开始安装
    apiOrderTechnicianInstallSubmit: `${$v1Api}order/technician/install/submit`, // 提交安装凭证
    // 售后服务单-技术工
    apiOrderSupportAfterSaleDetail$Id: `${$v1Api}order/support/after/sale/detail`, // 售后服务订单详情
    apiOrderSupportAfterSaleConfirm: `${$v1Api}order/support/after/sale/confirm`, //售后服务订单确认
    apiOrderSupportAfterSaleTimeUpdate: `${$v1Api}order/support/after/sale/time/update`, //售后服务订单更新上门时间
    apiOrderSupportAfterSaleCancel: `${$v1Api}order/support/after/sale/cancel`, //售后服务订单取消 (废弃)
    apiOrderSupportAfterSaleResultCommit: `${$v1Api}order/support/after/sale/result/commit`, //售后服务订单提交上门结果
    apiOrderSupportAfterSaleEnumStatus: `${$v1Api}order/support/after/sale/enum/status`, //售后订单状态枚举
    apiOrderSupportAfterSaleVisit: `${$v1Api}order/support/after/sale/visit`, //售后上门订单
    // 技术工-取消订单
    apiGraborderSaveordercancel: `${$v1Api}graborder/saveordercancel`, // 技术工-取消订单(废弃)
    // 安装服务订单-修理厂app
    apiOrderInstallQueryList: `${$v1Api}order/install/query/list`, // 安装服务单列表查询
    apiOrderInstallUpdate: `${$v1Api}order/install/update`, // 修改订单
    apiOrderInstallPay: `pay/install/pay`, // 订单支付
    apiOrderInstallCancel: `${$v1Api}order/install/cancel`, // 取消订单
    apiOrderInstallPayRefund: `${$v1Api}order/install/pay/refund`, // 取消订单提交
    apiOrderInstallConfirm: `${$v1Api}order/install/confirm`, // 确认完成安装
    apiOrderInstallEvaluation: `${$v1Api}order/install/evaluation`, // 评价
    apiOrderInstallNeedAssign: `${$v1Api}order/install/need/assign`, // 修理厂-不等待-需要指派
    apiOrderInstallUnwanted: `${$v1Api}order/install/unwanted`, // 修理厂-不等待-不需要
    apiOrderInstallContinueWait: `${$v1Api}order/install/continue/wait`, // 修理厂继续等待
    apiOrderInstallCommitComplaint: `${$v1Api}order/install/commit/complaint`, // 投诉
    apiOrderInstallDetail$Id: `${$v1Api}order/install/detail`, // 安装服务单详情
    apiOrderInstallSubmitOrder: `${$v1Api}order/install/submit/order`, // 提交订单
    // 服务订单-技术工
    apiGraborderQuerycantakeorders: `${$v1Api}graborder/querycantakeorders`, // 技术工-查询可接单列表
    apiGraborderGraborders: `${$v1Api}graborder/graborders`, // 技术工-抢单
    apiGraborderLastorder: `${$v1Api}graborder/lastorder`, // 技术工查询最新订单信息
    apiGraborderGetorderdetailbyid$Id: `${$v1Api}graborder/getorderdetailbyid`, // 技术工-根据id查询订单详情
    apiGraborderIsUndertaker: `${$v1Api}graborder/isundertaker`, // 技术工-判断是否当前登陆人接单
    // 技术工
    apiOrdertakesettingDetail: `${$v1Api}ordertakesetting/detail`, // 技术工接单设置详情
    apiOrdertakesettingUpdate: `${$v1Api}ordertakesetting/update`, // 技术工修改接单设置
    apiCompanyInfoRecycling: `${$v1Api}company/info/recycling`, //获取回收公司id
    // 旧机订单-旧机买家
    apiOrderPlaceOld: `${$v1Api}order/place/old`, // 旧机下单
    apiOrderOldCancel: `${$v1Api}order/old/cancel`, // 取消订单
    apiOrderOldWarn: `${$v1Api}order/old/warn`, // 提醒发货
    apiOrderOldQueryList: `${$v1Api}order/old/query/list`, // 旧机列表
    apiOrderOld$Id: `${$v1Api}order/old`, // 旧机详情
    apiOrderOldEnumStatus: `${$v1Api}order/old/enum/status`, // 获取订单状态
    apiOrderOldReceive: `${$v1Api}order/old/receive`, // 确认收货
    apiOrderOldSend$Id: `${$v1Api}order/old/send`, // 发货详情
    apiOrderOldRemarkAdd$Id: `${$v1Api}order/old/remark/add`, // 添加备注
    // 旧机订单-回收公司
    apiOrderOldDelivery: `${$v1Api}order/old/delivery`, // 物流发货
    apiOrderOldRemarkAdd: `${$v1Api}order/old/remark/add`, // 添加备注
    apiOrderOldAddressEdit: `${$v1Api}order/old/address/edit`, // 修改地址
    // 修理厂售后
    apiOrderAfterSaleQueryList: `${$v1Api}order/after/sale/query/list`, // 售后列表
    apiOrderAfterSale: `${$v1Api}order/after/sale/`, // 售后详情
    apiOrderAfterSalePlace: `${$v1Api}order/after/sale/place`, // 售后单下单
    apiOrderAfterSaleCheck: `${$v1Api}order/after/sale/check/`, // 售后单下单
    apiOrderAfterSaleEnumStatus: `${$v1Api}order/after/sale/enum/status`, // 售后订单状态枚举
    apiOrderAfterSaleReceipt: `${$v1Api}order/after/sale/receipt`, // 售后单旧机签收
    apiOrderAfterSaleCancel: `${$v1Api}order/after/sale/cancel`, // 售后单取消
    apiOrderAfterSaleDelivery: `${$v1Api}order/after/sale/delivery`, // 售后单旧机发货
    apiOrderAfterSaleComment: `${$v1Api}order/after/sale/comment`, // 售后单评价
    // 地图接口
    apiOrderRecycleTechnologyMapLocation: `${$v1Api}order/recycle/technology/map/location`, // 技术工-位置marker
    apiOrderRecycleRepairMapLocation: `${$v1Api}order/recycle/repair/map/location`, // 修理厂、回收公司-位置marker
    apiOrderAfterSaleDeliveryEdit: `${$v1Api}order/after/sale/delivery/edit`, // 物流编辑
    apiOrderInstallCount: `${$v1Api}order/install/count`, // 服务订单统计
    apiOrderAccountPeriodPayableList: `${$v1Api}order/account/period/payable/list`, // 服务订单统计
    apiOrderCancelCauseQueryList: `${$v1Api}order/cancel/cause/query/list`, // 订单取消原因
    apiOrderStatisticsStatisticBoard: `${$v1Api}order/statistics/statistic/board`, // 订单取消原因
    apiOrderStatisticsStatisticCount: `${$v1Api}order/statistics/statistic/count`, // 订单取消原因
    // 订单统计
    apiOrderStatisticsSalesPage: `${$v1Api}order/statistics/sales/page`, // 销售统计
    apiOrderStatisticsOrderPayment: `${$v1Api}order/statistics/order/payment`, // 统计分析_流量_订单支付情况(饼图)
    apiOrderStatisticsSalesRanking: `${$v1Api}order/statistics/sales/ranking`, // 统计分析_同省销量排名
    apiOrderStatisticsInvest: `${$v1Api}order/statistics/invest`, // 统计分析_进货、批发
    apiOrderStatisticsInvestTotal: `${$v1Api}order/statistics/invest/total`, // 统计分析_进货、批发总数
    apiOrderStatisticsOrderPaymentDetail: `${$v1Api}order/statistics/order/payment/detail`, // 统计分析_流量_支付明细
    apiOrderStatisticsCustomerOrderStatistic: `${$v1Api}order/statistics/customer/order/statistic`, // 统计-客户订单购买量统计
    apiOrderStatisticsCustomerOrderRanking: `${$v1Api}order/statistics/customer/order/ranking`, // 统计-客户订单购买量排名
    apiOrderStatisticsCompanyInvitation: `${$v1Api}order/statistics/company/invitation`, // 首页_拓客区(企业邀请)
    apiOrderStatisticsRevenueColumn: `${$v1Api}order/statistics/revenue/column`, // 服务商-首页_收益栏 `1`
    apiOrderStatisticsWholesaleDistrict: `${$v1Api}order/statistics/wholesale/district`, //首页_批发区
    apiOrderStatisticsWarehouseDistrict: `${$v1Api}order/statistics/warehouse/district`, //首页_仓储区
    apiOrderStatisticsSupplierBoard: `${$v1Api}order/statistics/supplier/board`, //统计-供应商数据看板
    apiOrderInvestQueryFinallyPrice: `${$v1Api}/order/invest/query/finally/price`, //获取进货价
  },
  // 内容服务
  content: {
    apiContentUniversityDetail$Id: `${$v1Api}content/university/detail`, // 查看详情
    apiContentUniversityNewCourse: `${$v1Api}content/university/new/course`, // 课程上新
    apiContentUniversityMyCollection: `${$v1Api}content/university/my/collection`, // 我的收藏
    apiContentUniversityBatchDelete: `${$v1Api}content/university/batch/delete`, // 批量删除收藏
    apiContentUniversityCancelCollectionCourse$Id: `${$v1Api}content/university/cancel/collection/course`, // 取消收藏
    apiContentUniversityBrowseRecord$Id: `${$v1Api}content/university/browse/record`, // 用户浏览记录
    apiContentUniversityCollectionCourse$Id: `${$v1Api}content/university/collection/course`, // 收藏
    apiContentUniversityStudyCourse: `${$v1Api}content/university/study/course`, // 商家大学-最近在学
    apiContentUniversityRecommendCourse: `${$v1Api}content/university/recommend/course`, // 精选课程
    apiContentUniversityHotCourse: `${$v1Api}content/university/hot/course`, // 热门课程
    apiContentUniversitySearch: `${$v1Api}content/university/search`, // 搜索
    apiContentUniversitySelectCourse: `${$v1Api}content/university/select/course`, // 系列课程-根据分类id查询课程信息
    apiContentUniversitySelectCategory: `${$v1Api}content/university/select/category`, // 分类类别查询
    apiContentUniversityRelevantCourse: `${$v1Api}content/university/relevant/course`, // 相关课程
    apiContentUniversityQueryHelpDetail: `${$v1Api}content/university/queryHelpDetail`, // 帮助中心分类详情查询
    apiContentUniversityQueryHelpTypeList: `${$v1Api}content/university/queryHelpTypeList`, // 查询帮助中心分类列表
    apiContentEvaluateSave: `${$v1Api}content/evaluate/save`, // 新增评价
    apiContentEvaluateQueryEvaluateById: `${$v1Api}content/evaluate/queryEvaluateById`, // 根据ID查询评价信息
    apiContentEvaluateQueryProductFavorableComment: `${$v1Api}content/evaluate/queryProductFavorableComment`, // 查询商品好评度
    apiContentEvaluateQueryProductEvaluateInfo: `${$v1Api}content/evaluate/queryProductEvaluateInfo`, // 查询商品评价信息
    apiContentComplaintCommitContent: `${$v1Api}content/complaint/commit/content`, // 提交投诉内容
    apiContentComplaintDetail$Id: `${$v1Api}content/complaint/detail`, // 投诉详情
    apiContentComplaintQueryListByDealStatus: `${$v1Api}content/complaint/queryListByDealStatus`, // 我发起的投诉-按处理状态查询
    apiContentComplaintRevocationComplaint$Id: `${$v1Api}content/complaint/revocationComplaint`, // 撤销投诉
    apiContentComplaintUpdateComplaint: `${$v1Api}content/complaint/updateComplaint`, // 修改投诉状态为已处理
    apiContentComplaintType: `${$v1Api}content/complaint/type`, // 获取字典中的投诉类型code
    apiContentEvaluateQueryProductEvaluatePage: `${$v1Api}content/evaluate/queryProductEvaluatePage`, // 查询商品评价信息分页
    apiOrderEvaluateFavorableComment: `${$v1Api}orderEvaluate/favorable/comment`, // 查询商品评价信息分页
    apiContentLearningTasksInitialize: `${$v1Api}content/learningTasks/initialize`, // 刚进学习任务页面初始化添加课程
    apiContentLearningTasksCourseList: `${$v1Api}content/learningTasks/courseList`, // 课程列表
    apiContentLearningTasksLearningHistory: `${$v1Api}content/learningTasks/learningHistory`, // 学习记录
    apiContentLearningTasksProgress: `${$v1Api}content/learningTasks/progress`, // 学习进度
    apiContentLearningUpdateProgress: `${$v1Api}content/learningTasks/updateProgress`, // 更新课程进度记录
    apiContentLearningRelatedCourse: `${$v1Api}content/learningTasks/relatedCourse`, // 相关课程
    apiContentLearningCourseDetail: `${$v1Api}content/learningTasks/courseDetail`, // 课程详情查询
    apiContentFunctionRouteRoute: `/v1/content/function/route/route`, // 根据名称获取对应的路由  修理厂语音识别
    apiAclSearchEntrance: `/v1/api/search/entrance`, // 根据名称获取对应的路由  修理厂语音识别
    apiContentTechnicalGuidanceStudyCourse: `${$v1Api}content/technical/guidance/study/course`, // 技术指导-最近在学
    apiGoodsModelContentModelList: `${$v1Api}goods/model/content/model/list`, // APP-商品型号管理
    apiCompanyInfoServiceProject: `${$v1Api}company/info/service/project`, // 获取修理厂服务项目字典值
    apiContentTechnicalGuidanceRecommendCourse: `${$v1Api}content/technical/guidance/recommend/course`, // 技术指导-精选课程
    apiContentTechnicalGuidanceHotCourse: `${$v1Api}content/technical/guidance/hot/course`, // 技术指导-热门课程
    apiContentTechnicalGuidanceCancelCollectionCourse$Id: `${$v1Api}content/technical/guidance/cancel/collection/course`, // 技术指导-取消收藏
    apiContentTechnicalGuidanceMyCollection: `${$v1Api}content/technical/guidance/my/collection`, // 技术指导-我的收藏
    apiContentTechnicalGuidanceBatchDelete: `${$v1Api}content/technical/guidance/batch/delete`, // 技术指导-批量删除收藏
    apiContentTechnicalGuidanceDetail$Id: `${$v1Api}content/technical/guidance/detail`, // 技术指导-查看详情
    apiContentTechnicalGuidanceRelevantCourse: `${$v1Api}content/technical/guidance/relevant/course`, // 技术指导-相关课程
    apiContentTechnicalGuidanceBrowseRecord$Id: `${$v1Api}content/technical/guidance/browse/record`, // 技术指导-用户浏览记录
    apiContentTechnicalGuidanceCollectionCourse$Id: `${$v1Api}content/technical/guidance/collection/course`, // 技术指导-收藏
    apiContentTechnicalGuidanceSearch: `${$v1Api}content/technical/guidance/search`, // 技术指导-搜索
    apiContentTechnicalGuidanceSelectCategory: `${$v1Api}content/technical/guidance/select/category`, // 技术指导-分类列表查询
    apiContentMessageLogAnnouncementList: `${$v1Api}content/message/log/announcement/list`, // 公告列表
    apiContentMessageUserSettingSelect: `${$v1Api}message/user/setting/select`, // 查询通知设置
    apiContentMessageUserSettingSet: `${$v1Api}message/user/setting/set`, // 通知设置
    apiContentSwiperList: `${$v1Api}content/swiper/list`, // 轮播图列表

    apiContentMessageLogCount: `${$v1Api}content/message/log/count`, //未读消息数量
    apiContentMessageLogNoticeList: `${$v1Api}content/message/log/notice/list`, //服务通知列表
    apiContentMessageLogLogisticsList: `${$v1Api}content/message/log/logistics/list`, //交易物流列表
    apiContentMessageLogCollectList: `${$v1Api}content/message/log/collect/list`, //消息点赞收藏列表
    apiContentMessageLogCommentList: `${$v1Api}content/message/log/comment/list`, //消息评论列表
    apiContentMessageLogAttentionList: `${$v1Api}content/message/log/attention/list`, //新增关注列表
    apiContentMessageLogMessageRead: `${$v1Api}content/message/log/message/read`, //更新消息为已读
  },
  // 收货地址管理
  receiver: {
    apiReceiverAddressList: `${$v1Api}receiver/address/list`, // 获取地址信息 列表
    apiReceiverAddress$Put: `${$v1Api}receiver/address`, // 修改
    apiReceiverAddress$Post: `${$v1Api}receiver/address`, // 新增
    apiReceiverAddress$Delete: `${$v1Api}receiver/address`, // 删除
    apiReceiverAddress$Patch: `${$v1Api}receiver/address`, // 改为默认地址
    apiReceiverAddress$Get: `${$v1Api}receiver/address`, // 获取详情
    apiReceiverAddressHelpDefault: `${$v1Api}receiver/address/help/default`, // 获取详情
    apiReceiverAddressRegister: `${$v1Api}receiver/address/register`, // 获取详情
  },
  // 商品
  goodsList: {
    // 商品相关列表-ES有关
    apiGoodsQueryMyGoods: `${$v1Api}goods/query/myGoods`, // 获取商品列表
    apiGoodsQueryMyGoodsCount: `${$v1Api}goods/query/myGoods/count`, // 获取商品列表数据统计
    apiGoodsQueryReplenishList: `${$v1Api}goods/query/replenishList`, // 商品查询列表-补货
    apiGoodsProjectInvestmentSpList: `${$v1Api}goods/project/investment/sp/list`, // 服务商-投资列表
    // 商品流量统计
    apiGoodsVisitRecordStatistic: `${$v1Api}goods/visit/record/statistic`,
    // 商品人气分页列表
    apiGoodsVisitRecordQuery: `${$v1Api}goods/visit/record/query`,
    // 商品收藏量排序
    apiGoodsCollectionGoodsCollectionSorted: `${$v1Api}goods/collection/goodsCollectionSorted`,
    // app商品
    apiGoodsTemplateQueryList: `${$v1Api}goods/template/query/list`, // 模板列表
    apiGoodsBrandQueryApplyList: `${$v1Api}goods/brand/query/apply/list`, // 品牌列表
    apiGoodsSkuPropertyApplyList: `${$v1Api}goods/sku/property/apply/list`, // 型号列表
    apiGoodsParamsPropertyApplyList: `${$v1Api}goods/params/property/apply/list`, // 参数属性
    apiGoodsSave: `${$v1Api}goods/save`, // 上货
    apiGoodsDetail: `${$v1Api}goods/detail`, // 商品详情
    apiGoodsSealAreaQueryList: `${$v1Api}goods/seal/area/query/list`, // 销售区域
    apiGoodsTypeQueryList: `${$v1Api}goods/type/query/list`, // 商品类型
    apiGoodsCategoryQueryCategoryList: `${$v1Api}goods/category/query/category/list`, // 商品类别
    apiGoodsTemplateDetail: `${$v1Api}goods/template/detail`, // 模板详情
    apiGoodsUpdate: `${$v1Api}goods/update`, // 修改商品
    apiGoodsDetailAgent: `${$v1Api}goods/detail/agent`, // 服务商商品详情
    apiGoodsQueryReason: `${$v1Api}goods/query/reason`, // 查看原因
    apiGoodsStatusUpdate: `${$v1Api}goods/status/update`, // 商品上下架
    apiGoodsUpdateAgent: `${$v1Api}goods/update/agent`, // 服务商修改商品
    apiGoodsApplyUpdatePut: `${$v1Api}goods/apply/update`, // 申请上架
    apiGoodsQueryAgentGoodsList: `${$v1Api}goods/query/agent/goods/list`, // 查询供应商商品列表--服务商发布商品页面
    apiGoodsShelves: `${$v1Api}goods/shelves`, // 服务商一键上架供应商商品
    apiGoodsShelfBulk: `${$v1Api}goods/shelf/bulk`, // 供应商商品列表服务商批量上架
    // app商品品牌
    apiGoodsBrandApplySave: `${$v1Api}goods/brand/apply/save`, // 品牌申请
    apiGoodsBrandApplyLogList: `${$v1Api}goods/brand/apply/log/list`, // 申请记录列表
    apiGoodsBrandApplyCheck: `${$v1Api}goods/brand/apply/check`, // 品牌认证校验
    apiGoodsBrandApply$Id: `${$v1Api}goods/brand/apply`, // 认证记录详情
    apiGoodsBrandQueryMyList: `${$v1Api}goods/brand/query/my/list`, // 我的品牌
    apiGoodsBrandQueryListHot: `${$v1Api}goods/brand/query/list/hot`, // 热门品牌列表
    // APP商品类目申请模块
    apiGoodsCategoryApplyCertificationList: `${$v1Api}goods/category/apply/certification/List`, // 已认证商品类目列表
    apiGoodsCategoryApplyCertificationCategory: `${$v1Api}goods/category/apply/certification/category`, // 认证和认证中商品列表
    apiGoodsCategoryApplyDetail: `${$v1Api}goods/category/apply/detail`, // 商品类目详情
    apiGoodsCategoryApplyQueryList: `${$v1Api}goods/category/apply/query/list`, // 分页商品类目
    apiGoodsCategoryApplySave: `${$v1Api}goods/category/apply/save`, // 添加
    // 评价关键词
    apiGoodsKeywordQueryGetKeyWord: `${$v1Api}goods/keyword/query/getKeyWord`, // 关键词
    apiGoodsVisitRecordAdd: `${$v1Api}goods/visit/record/add`, // 插入浏览量（修理厂查看、分享）

    apiGoodsProjectInvestmentGetProjectServeFee: `${$v1ApiGoods}project/investment/get/project/serveFee`, // 根据项目id获取项目服务费-GET
    apiGoodsGetGoodsServeFee: `${$v1ApiGoods}get/goods/serveFee`, // 根据商品id获取商品服务费-GET
  },
  im: {
    apiImAttentionMeList: `${$v1Api}im/attention/me/list`, // 关注我的列表
    apiImAttentionMeMyFriend: `${$v1Api}im/attention/me/myFriend`, // 我的好友列表
    apiImMyAttentionNotSeeIt: `${$v1Api}im/my/attention/notSeeIt`, // 不看TA的
    apiImMyAttentionAdd: `${$v1Api}im/my/attention/add`, // 添加关注
    apiImMyAttentionDelete: `${$v1Api}im/my/attention/delete`, // 取消关注
    apiImMyAttentionList: `${$v1Api}im/my/attention/list`, // 我的关注列表

    apiGoodsQueryGoodsByUser: `${$v1Api}goods/query/goodsByUser`, // 获取商品列表-即时通讯聊天发送使用
    apiImAttentionMeDontSeeMe: `${$v1Api}im/attention/me/dontSeeMe`, // 不让TA看
    apiImAttentionMePower: `${$v1Api}im/attention/me/power`, // 好友权限

    apiImFriendBlackList: `${$v1Api}im/friend/black/list`, // 黑名单列表
    apiImFriendBlackRelieve: `${$v1Api}im/friend/black/relieve`, // 解除黑名单
    apiImFriendBlackSave: `${$v1Api}im/friend/black/save`, // 加入黑名单

    apiImNoticeConfigDetail: `${$v1Api}im/notice/config/detail`, // 服务配置详情
    apiImNoticeConfigSaveOrUpdate: `${$v1Api}im/notice/config/saveOrUpdate`, // 添加服务配置

    apiImMessageListUdateTop: `${$v1Api}im/message/list/update/top`, // 置顶聊天/取消置顶
    apiImMessageListUpdateDisturb: `${$v1Api}im/message/list/update/disturb`, // 修改免打扰
    apiImMessageListSave: `${$v1Api}im/message/list/save`, // 添加聊天列表
    apiImMessageListSelectMessageList: `${$v1Api}im/message/list/select/messagelist`, // 查询本用户的消息列表
    apiImMessageListSelectNotReadNum: `${$v1Api}im/message/list/select/notReadNum`, // 查询本用户的消息列表

    apiMessageRecordGetMessage: `${$v1Api}message/record/getMessage`, // 取聊天记录
    apiMessageList$Id: `${$v1Api}im/message/list`, // 从列表中删除
    apiMessageRecordReadMessage: `${$v1Api}message/record/readMessage`, // 读聊天记录
    apiMessageRecordAudioText: `${$v1Api}message/record/audioToText`, // 语音转文字
    apiMessageRecordAudioToTextFromUrl: `${$v1Api}message/record/audioToTextFromUrl`, // 语音转文字，文件路径
    apiMessageRecordRecordSendMessage: `${$v1Api}message/record/sendMessage`, // 发送消息存储
    apiImMessageListMessageUserInfo: `${$v1Api}im/message/list/messageUserInfo`, // 聊天设置回显信息
    apiImMessageListSearch: `${$v1Api}im/message/list/search`, // 聊天模糊查询
    apiOrderSellQueryListByUser: `${$v1Api}order/sell/query/listByUser`, // 销售订单列表，即时通讯发送订单使用
    apiImMyAttentionCount: `${$v1Api}im/my/attention/count`, // 通讯录数量
    apiImMyAttentionUpdateNickName: `${$v1Api}im/my/attention/updateNickName`, // 修改备注
    apiImMyAttentionUserInfo: `${$v1Api}im/my/attention/userInfo`, // 好友详情
    apiMessageRecordClearMessage: `${$v1Api}message/record/clearMessage`, // 清除聊天记录
    apiMessageRecordUpdateMessage: `${$v1Api}message/record/updateMessage`, // 清除聊天记录
    apiImMyAttentionAgentShop: `${$v1Api}im/my/attention/agentShop`, // 代课下单
    apiCompanyInfoImStore: `${$v1Api}company/info/im/store`, // 获取店铺详情
    apiMessageRecordCompanySendMessage: `${$v1Api}message/record/company/sendMessage`, // 给店铺发送消息
    apiMessageRecordCompanyChangeUser: `${$v1Api}message/record/company/change/user`, // 根据店铺id获取userId
  },
  cart: {
    apiCartBasisDeleteBatch: `${$v1Api}cart/basis/delete/batch`, // deleteBatch
    apiCartBasisDetailst: `${$v1Api}cart/basis/detailst`, // 获取购物车详情
    apiCartBasisSave: `${$v1Api}cart/basis/save`, // 添加购物车
    apiCartBasisReduceNum: `${$v1Api}cart/basis/reduceNum`, // 添加购物车
    apiCartBasisUpdateGoodscount: `${$v1Api}cart/basis/update/goodscount`, // 添加购物车
    apiCartBasisSaveCollection: `${$v1Api}cart/basis/save/collection`, // 移入收藏夹
    // 旧机订单-购物车
    apiCartResaleSave: `${$v1Api}cart/resale/save`, // 添加购物车
    apiCartResaleReduceNum: `${$v1Api}cart/resale/reduceNum`, // 减少数量
    apiCartResaleDeleteBatch: `${$v1Api}cart/resale/delete/batch`, // 删除商品
    apiCartResaleSaveCollection: `${$v1Api}cart/resale/save/collection`, // 移入收藏夹
    apiCartResaleDetailst: `${$v1Api}cart/resale/detailst`, // 获取购物车详情
    apiCartResaleUpdateGoodscount: `${$v1Api}cart/resale/update/goodscount`, // 删除商品
    apiCartBasisQueryNum: `${$v1Api}cart/basis/query/num`, // 查询购物车数量
  },
  // 发票管理
  invoice: {
    apiInvoiceSelectList: `${$v1Api}invoice/select/list`, // 开票列表查询
    apiInvoiceDetail$Id: `${$v1Api}invoice/detail`, // 开票详情页
    apiInvoiceConfirmInvoice: `${$v1Api}invoice/confirm/invoice`, // 确认开票
    apiInvoiceSave: `${$v1Api}invoice/save`, // 申请发票
    apiInvoiceRecord: `${$v1Api}invoice/record`, // 开票记录列表
    apiInvoiceDetailBuyer$Id: `${$v1Api}invoice/detail/buyer`, // 开票记录详情页
    apiInvoiceOrderListEnable: `${$v1Api}invoice/order/list/enable`, // APP-发票
    apiInvoiceQueryOrderList$Id: `${$v1Api}invoice/query/order/list`, // 查询发票下订单信息
  },
  // 积分管理
  grant: {
    apiGrantRecordList: `${$v1Api}grant/record/list`, // 开票列表查询
  },
  // 分享、邀请
  share: {
    apiShareLinkAdd: `${$v1Api}share/link/add`, // 新增数据，获取标识
    apiShareLinkDetail: `${$v1Api}share/link/detail`, // 根据标识，获取数据
  },
}
