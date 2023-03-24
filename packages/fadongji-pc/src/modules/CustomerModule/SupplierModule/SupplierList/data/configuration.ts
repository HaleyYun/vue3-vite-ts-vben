import { FormSchema } from '/@/components/Form'
import { getGoodsSelectOne } from '/@/api/data/ModelFormApis'


export const tableColumns = [
    {
        title: '序号',
        dataIndex: 'index',
        // align: 'center',
        width: '50px',

    },
    {
        title: '店铺名称',
        dataIndex: 'storeName',
        width: '180px',
    },
    {
        title: '姓名',
        dataIndex: 'realName',
        width: '150px',
    },
    {
        title: '手机号',
        dataIndex: 'userName',
        width: '180px',
    },
    {
        title: '所在地区',
        dataIndex: 'areaCodeStr',
        width: '160px',
    },
    {
        title: '铺货商品数量',
        dataIndex: 'layOutModelNumber',
        width: '130px',
    },
    {
        title: '上架商品数量',
        dataIndex: 'shelfModelNumber',
        width: '180px',
    },
   
]


