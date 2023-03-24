import {reactive} from "vue";
interface cancelColumnItem {
    id: string
    supperName: string
    phone: string
    area: string
    userNameStatus: string
    registerStatus: string
    shopName: string
    channelManager: string
    rate: string
    usersSource: string
    cancellationTime: string

}
export const supperCancelData = reactive<cancelColumnItem[]>([
    {
        id: 'cancel001',
        supperName: '河南汽配专营有限公司',
        phone: '15039018939',
        area: '河南省-周口市',
        userNameStatus: '未处理',
        registerStatus: '已注销',
        shopName: '发动机总店-郑州金水区',
        channelManager: '方锦生',
        rate: '一级',
        usersSource: '网络',
        cancellationTime: '2021-09-12 12:00:00'
    },
    {
        id: 'cancel002',
        supperName: '河南汽配专营有限公司',
        phone: '15039018939',
        area: '河南省-周口市',
        userNameStatus: '未处理',
        registerStatus: '已注销',
        shopName: '发动机总店-郑州金水区',
        channelManager: '方锦生',
        rate: '二级',
        usersSource: '网络',
        cancellationTime: '2021-09-12 12:00:00'
    },
])