import {reactive} from "vue";

// “积分设置”（mock） -- 数据集
interface tableItem {
    id: string
    ruleID: string
    ruleName: string
    amount: string
    status: boolean
    description: string
}

export const integralSettingTableData = reactive<tableItem[]>([
    {
        id: 'integral001',
        ruleID: 'integral001',
        ruleName: '新人赠送',
        amount: '100',
        status: true,
        description: '注册时赠送10个积分',


    }
])

// “成长值设置”（mock） -- 数据集
interface tableItem {
    id: string
    ruleID: string
    ruleName: string
    amount: string
    status: boolean
    description: string
}
export const growthTableData = reactive<tableItem[]>([
    {
        id: 'integral001',
        ruleID: 'integral001',
        ruleName: '新人赠送',
        amount: '100',
        status: true,
        description: '注册时赠送10个积分',
    },
    {
        id: 'integral002',
        ruleID: 'integral002',
        ruleName: '下单赠送',
        amount: '20',
        status: false,
        description: '注册时赠送10个积分',
    }
])

// “等级设置”（mock） -- 数据集
interface rateAssetsItem {
    id: string,
    rateName: string
    growthAmount: string
    status: boolean
    description: string
}
export const rateAssetsTableData = reactive<rateAssetsItem[]>([
    {
        id: 'rateAssets001',
        rateName: '普通会员',
        growthAmount: '200',
        status: true,
        description: '等级描述'
    },
    {
        id: 'rateAssets002',
        rateName: '普通会员',
        growthAmount: '200',
        status: false,
        description: '等级描述'
    },
    {
        id: 'rateAssets003',
        rateName: '普通会员',
        growthAmount: '200',
        status: false,
        description: '等级描述'
    },
    {
        id: 'rateAssets004',
        rateName: '普通会员',
        growthAmount: '200',
        status: true,
        description: '等级描述'
    }
])