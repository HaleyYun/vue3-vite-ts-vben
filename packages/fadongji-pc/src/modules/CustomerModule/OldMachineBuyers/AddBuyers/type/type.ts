import {reactive} from "vue";
import {Rule} from "ant-design-vue/es/form";
// import {Pattern} from "@vocen/shared";
import {Pattern} from '../../../../../../../shared/src/index'
import {EraFormEnum} from "/@/components/EraForm/EraFormEnum";
// 供应商新增 -- enum ---- 进度条的标识
export enum progressEnum {
    isOneStep = 0,
    isTwoStep = 1,
    isThreeStep = 2,
}
// 供应商新增 -- enum ---- 服务于“供应商form”动态数据的tag标识
export enum baseFormDataEnum {
   isPhone = 'phone',
   isBusinessLicense = 'businessLicense',
   isBusinessLicenseName = 'businessLicenseName',
   isUnifiedCreditCode = 'unifiedCreditCode',
   isShopAbbreviation = 'shopAbbreviation',
   isNameOfLegalPerson = 'nameOfLegalPerson',
   isBusinessDate = 'businessDate',
   isCompanyLogo = 'companyLogo',

}
let checkAge = async (_rule: Rule, value: number) => {
    const judgePhone = value + ''
    if (Pattern.isPhone(judgePhone)) {
        return Promise.resolve();
    } else {
        return Promise.reject('手机号输入有误，请重新输入');
    }
};
let unifiedCreditCode = async (_rule: Rule, value: number) => {
    const judgeCreditCode = value + ''
    if (Pattern.isCreditCode(judgeCreditCode)) {
        return Promise.resolve();
    } else {
        return Promise.reject('统一信用代码输入有误，请重新输入');
    }
};
let juageIdCard = async (_rule: Rule, value: number) => {
    const juageIdCardCode = value + ''
    if (Pattern.isIdCard(juageIdCardCode)) {
        return Promise.resolve();
    } else {
        return Promise.reject('身份证输入有误，请重新输入');
    }
};
export const supplierNewAddSteps = reactive([
    {
        title: '企业信息',
        content: 'company-info'
    },
    {
        title: '法人信息',
        content: 'corporate-info'
    },
    {
        title: '经营品类',
        content: 'company-info'
    },

])

// 供应商新增 -- 基础信息 form
export const baseFormData = reactive([
    {
        id: baseFormDataEnum.isPhone,
        label: '手机号',
        name: 'phone',
        placeholder: '请输入手机号',
        type: EraFormEnum.isInputEnum,
        isRequireInput: true,

    },
    {
        id: baseFormDataEnum.isBusinessLicense,
        label: '营业执照',
        name: 'businessLicense',
        type: EraFormEnum.isOtherEnum,
        isRequireInput: true,

    },
    {
        id: baseFormDataEnum.isBusinessLicenseName,
        label: '营业执照名称',
        name: 'businessLicenseName',
        placeholder: '请输入营业执照名称',
        type: EraFormEnum.isInputEnum,
        isRequireInput: true,

    },
    {
        id: baseFormDataEnum.isUnifiedCreditCode,
        label: '统一信用代码',
        name: 'unifiedCreditCode',
        placeholder: '请输统一信用代码',
        type: EraFormEnum.isInputEnum,
        isRequireInput: true,

    },
    {
        id: baseFormDataEnum.isShopAbbreviation,
        label: '店铺简称',
        name: 'shopAbbreviation',
        placeholder: '请输入店铺简称',
        type: EraFormEnum.isInputEnum,
        isRequireInput: true,

    },
    {
        id: baseFormDataEnum.isNameOfLegalPerson,
        label: '法人姓名',
        name: 'nameOfLegalPerson',
        type: EraFormEnum.isInputEnum,
        placeholder: '请输入法人姓名',
        isRequireInput: true,

    },
    {
        id: baseFormDataEnum.isBusinessDate,
        label: '营业期限',
        name: 'businessDate',
        type: EraFormEnum.isOtherEnum,
        isRequireInput: true,

    },
    {
        id: baseFormDataEnum.isCompanyLogo,
        label: '企业LOGO',
        name: 'companyLogo',
        type: EraFormEnum.isOtherEnum,
        isRequireInput: true,

    },
])
export const propsRules = {
    propsRulesRef: {
        phone: [
            {required: true, validator: checkAge, trigger: 'change' }
        ],
        businessLicense: [
            {required: true, message: '请上传营业执照' }
        ],
        businessLicenseName: [
            {required: true, message: '请输入营业执照名称'  }
        ],
        unifiedCreditCode: [
            {required: true, validator: unifiedCreditCode, trigger: 'change'  }
        ],
        shopAbbreviation: [
            {required: true, message: '请输入店铺简称'  }
        ],
        nameOfLegalPerson: [
            {required: true, message: '请输入法人姓名'  }
        ],
        businessDate: [
            {required: true, message: '请选择营业期限'  },
        ],
        companyLogo: [
            {required: true, message: '请选择营业期限'  },
        ],

    },
    propsModelRef: {
        phone: '',
        businessLicense: '11',
        businessLicenseName: '',
        unifiedCreditCode: '',
        shopAbbreviation: '',
        nameOfLegalPerson: '',
        businessDate: '',
        companyLogo: '11',
    }
};

// 供应商新增 -- 法人信息 数据集
export  enum legalInformationEnum {
    isIdCardFront = 'idCardFront',
    isIdCardSide = 'idCardSide',
    isName = 'name',
    isIdCardNum = 'idCardNum',
    isIdCardDate = 'idCardDate',
}
export const legalInformationData = reactive([
    {
        id: legalInformationEnum.isIdCardFront,
        label: '身份证正面照',
        name: 'idCardFront',
        type: EraFormEnum.isOtherEnum,
        isRequireInput: true,
    },
    {
        id: legalInformationEnum.isIdCardSide,
        label: '身份证背面照',
        name: 'idCardSide',
        type: EraFormEnum.isOtherEnum,
        isRequireInput: true,
    },
    {
        id: legalInformationEnum.isName,
        label: '姓名',
        name: 'name',
        type: EraFormEnum.isInputEnum,
        isRequireInput: true,
    },
    {
        id: legalInformationEnum.isIdCardNum,
        label: '身份证号',
        name: 'idCardNum',
        type: EraFormEnum.isInputEnum,
        isRequireInput: true,
    },
    {
        id: legalInformationEnum.isIdCardDate,
        label: '身份证有效期',
        name: 'idCardDate',
        type: EraFormEnum.isOtherEnum,
        isRequireInput: true,
    },
])
export const legalInforPropsRules = {
    propsRulesRef: {
        idCardFront: [
            {required: true, message: '请上传身份证正面照' }
        ],
        idCardSide: [
            {required: true, message: '请上传身份证反面照' }
        ],
        name: [
            {required: true, message: '请输入姓名'  }
        ],
        idCardNum: [
            {required: true, validator: juageIdCard, trigger: 'change'  }
        ],
        idCardDate: [
            {required: true, message: '请选择身份证有效期'  }
        ],
    },
    propsModelRef: {
        idCardFront: '',
        idCardSide: '',
        name: '',
        idCardNum: '',
        idCardDate: '',
    }
};



