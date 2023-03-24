import {reactive} from "vue";

interface cancelColumnItem {
    id: string
    supperId: string
    supperName: string
    phone: string
    rate: string
    integral: string
    growthValue: string
    bond: string,
    accountBalance: string
    supplierChannelManager: string,

}
export const propertyTableData = reactive<cancelColumnItem[]>([
    {
        id: 'property001',
        supperId: 'property001',
        supperName: '河南汽配专营有限公司',
        phone: '15039018939',
        rate: '一级',
        integral: '100',
        growthValue: '120',
        bond: '10000',
        accountBalance: '20',
        supplierChannelManager: '马萧金',
    },
    {
        id: 'property002',
        supperId: 'property002',
        supperName: '河南汽配专营有限公司',
        phone: '15039018939',
        rate: '二级',
        integral: '100',
        growthValue: '10',
        bond: '10000',
        accountBalance: '20',
        supplierChannelManager: '马萧金',
    },
])