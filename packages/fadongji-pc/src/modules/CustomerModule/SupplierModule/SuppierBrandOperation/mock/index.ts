// 积分设置--table 数据
import {reactive} from "vue";

interface brandTableItem {
    id: string
    supperName: string
    phone: string
    applyCategory: string
    status: string
    applyDate: string
    operation?: string

}
export const brandTableData = reactive<brandTableItem[]>([
    {
        id: 'brand001',
        supperName: '河南汽配专营有限公司',
        phone: '15039018939',
        applyCategory: '发动机系列---发动机整机',
        status: '未处理',
        applyDate: '2021-09-12 12:00:00',
    },
    {
        id: 'brand002',
        supperName: '河南汽配专营有限公司',
        phone: '15039018939',
        applyCategory: '发动机系列---发动机整机',
        status: '未处理',
        applyDate: '2021-09-12 12:00:00',
        operation: '拒绝理由：跨品类经营',
    },
    {
        id: 'brand003',
        supperName: '河南汽配专营有限公司',
        phone: '15039018939',
        applyCategory: '发动机系列---发动机整机',
        status: '未处理',
        applyDate: '2021-09-12 12:00:00',
        operation: '无',
    },
])

// "经营品牌审核" --
export const modelData = reactive([
    {
        label:'处理意见',
        value: '',

    }
])