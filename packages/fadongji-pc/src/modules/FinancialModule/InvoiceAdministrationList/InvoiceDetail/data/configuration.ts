
//已开
export const payInfoWaitDesc = [
    {
        field: 'id',
        label: '申请编号',
    },
    {
        field: 'billTypeName',
        label: '开票内容',
    },
    {
        field: 'pay_price',
        label: '开票金额',
    },
    {
        field: 'sellerTel',
        label: '申请人',
    },
    {
        field: 'sellerEnterpriseName',
        label: '收票方',
    },
    {
        field: 'invoiceKindName',
        label: '发票类型',
    },
    {
        field: 'createTime',
        label: '申请时间',
    },

];

//待开
export const payInfoDesc = [
    {
        field: 'invoiceNo',
        label: '发票号',
    },
    {
        field: 'ownerTypeName',
        label: '开票类型',
    },
    {
        field: 'invoiceKindName',
        label: '发票类型',
    },
    {
        field: 'sellerEnterpriseName',
        label: '发票抬头',
    },
    {
        field: 'sellerTaxpayerNum',
        label: '纳税人识别号',
    },
    {
        field: 'pay_price',
        label: '开票金额',
    },
    {
        field: 'billTypeName',
        label: '开票内容',
    },

    {
        field: 'sellerTel',
        label: '申请人',
    },
    {
        field: 'id',
        label: '申请编号',
    },
    {
        field: 'sellerEnterpriseName',
        label: '收票方',
    },

];


export const tableColumns = [
    {
        title: '商品信息',
        dataIndex: 'goods',
        width: '20%'
    },
    {
        title: '单价/数量',
        dataIndex: 'unit_price',
        width: '10%',
    },
    {
        title: '售后数量',
        dataIndex: 'After_number',
        width: '10%',
    },
    {
        title: '金额',
        dataIndex: 'amount_of',
        width: '10%',
    },
    {
        title: '卖家',
        dataIndex: 'shopName',
        width: '15%',
    },
    {
        title: '买家',
        dataIndex: 'buyers',
        width: '15%',
    },
    {
        title: '订单状态',
        dataIndex: 'order_status',
        width: '10%',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        width: '10%',
    },
];

export const getTableColumns = (goodsLength) => {
    let customCell = (_, index) => {
        console.log(index, goodsLength)
        if (index == 0 && goodsLength && goodsLength >= 1) {
            return { rowSpan: goodsLength };
        } else {
            return { rowSpan: 0 }
        }
    }
    let column = [
        {
            title: '商品信息',
            dataIndex: 'goods',
            colSpan: 0,
            width: '20%'
        },
        {
            title: '单价/数量',
            dataIndex: 'unit_price',
            width: '10%',
            customCell: customCell,
        },
        {
            title: '售后数量',
            dataIndex: 'After_number',
            width: '10%',
            customCell: customCell,
        },
        {
            title: '金额',
            dataIndex: 'amount_of',
            width: '10%',
            customCell: customCell,
        },
        {
            title: '卖家',
            dataIndex: 'shopName',
            width: '15%',
            customCell: customCell,
        },
        {
            title: '买家',
            dataIndex: 'buyers',
            width: '15%',
            customCell: customCell,
        },
        {
            title: '订单状态',
            dataIndex: 'statusName',
            width: '10%',
            customCell: customCell,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            width: '10%',
            customCell: customCell,
        },


    ]

    return column;

}







