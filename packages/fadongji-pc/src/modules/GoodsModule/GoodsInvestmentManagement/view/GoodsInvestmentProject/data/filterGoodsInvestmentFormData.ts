import { FormSchema } from '/@/components/Form'
export const filterInvestmentFormByAwait: FormSchema[] = [
    {
        field: 'projectName',
        component: 'Input',
        label: '项目名称',
        defaultValue: '',
        componentProps: {
            placeholder: '请输入项目名称',
            onChange: (e) => {
                console.log(e)
            },
        },
    },

    {
        field: 'categoryId',
        label: '商品类别',
        component: 'TreeSelect',
        slot: 'categorySlot',
        colProps: {
            span: 6,
        },
    },
    {
        field: 'brandId',
        component: 'Select',
        label: '商品品牌',
        colProps: {
            span: 6,
        },
        componentProps: {
            placeholder: '请选择商品品牌',
            mode: 'multiple',
            options: [
                {
                    label: 'xlsx',
                    value: 'xlsx',
                    key: 'xlsx',
                },
                {
                    label: 'html',
                    value: 'html',
                    key: 'html',
                },
                {
                    label: 'csv',
                    value: 'csv',
                    key: 'csv',
                },
                {
                    label: 'txt',
                    value: 'txt',
                    key: 'txt',
                },
            ],
        },
    },
    {
        field: 'seller',
        component: 'Input',
        label: '卖家',
        colProps: {
            span: 6,
        },
        componentProps: {
            placeholder: '请输入卖家',
            onChange: (e) => {
                console.log(e)
            },
        },
    },
    {
        field: 'shippingWarehouse',
        component: 'Select',
        label: '发货仓库',
        colProps: {
            span: 6,
        },
        defaultValue: '1',
        componentProps: {
            placeholder: '请选择商品品牌',
            mode: 'multiple',
            options: [
                {
                    label: '郑州平台仓',
                    value: '1',
                },
                {
                    label: '济南平台仓',
                    value: '2',
                },
                {
                    label: '广州平台仓',
                    value: '3',
                },
            ],
        },
    },
]

// 投资项目 --  step1（one）-【全部项目】
export const filterDynamicAllAssets: FormSchema[] = [
    {
        field: '[startTime, endTime]',
        label: '最新更新时间',
        component: 'RangePicker',
        componentProps: {
            format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: ['开始时间', '结束时间'],
            showTime: { format: 'HH:mm:ss' },
        },
    },
]
// 投资项目 --  step2（two）-【待审核】
export const filterDynamicPendingReviewAssets: FormSchema[] =  [
    {
        field: 'theAuthor',
        component: 'Select',
        label: '提交人',
        colProps: {
            span: 6,
        },
        defaultValue: '1',
        componentProps: {
            placeholder: '请选择提交人',
            mode: 'multiple',
            options: [
                {
                    label: '供应商',
                    value: '1',
                },
                {
                    label: '代理商',
                    value: '2',
                },
            ],
        },
    },
    {
        field: '[startTime, endTime]',
        label: '提交时间',
        component: 'RangePicker',
        componentProps: {
            format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: ['开始时间', '结束时间'],
            showTime: { format: 'HH:mm:ss' },
        },
    },
]
// 投资项目 --  step3（three）-【审核未通过】
export const filterDynamicAuditFailedAssets: FormSchema[] = [
    {
        field: 'theAuthor',
        component: 'Select',
        label: '提交人',
        colProps: {
            span: 6,
        },
        defaultValue: '1',
        componentProps: {
            placeholder: '请选择提交人',
            mode: 'multiple',
            options: [
                {
                    label: '供应商',
                    value: '1',
                },
                {
                    label: '代理商',
                    value: '2',
                },
            ],
        },
    },
    {
        field: '[reviewStartTime, reviewEndTime]',
        label: '审核时间',
        component: 'RangePicker',
        componentProps: {
            format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: ['开始时间', '结束时间'],
            showTime: { format: 'HH:mm:ss' },
        },
    },
]
// 投资项目 --  step4（four）-【进行中】
export const filterDynamicInProgressAssets: FormSchema[]  = [
    {
        field: '[ShelfStartTime, ShelfEndTime]',
        label: '审核时间',
        component: 'RangePicker',
        componentProps: {
            format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: ['开始时间', '结束时间'],
            showTime: { format: 'HH:mm:ss' },
        },
    },
]
// 投资项目 --  step5（five）-【已下架】
export const filterDynamicRemovedAssets: FormSchema[] =  [
    {
        field: '[removedStartTime, removedEndTime]',
        label: '下架时间',
        component: 'RangePicker',
        componentProps: {
            format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: ['开始时间', '结束时间'],
            showTime: { format: 'HH:mm:ss' },
        },
    },
]
// 投资项目 --  step6（six）-【已完成】
export const filterDynamicDoneAssets: FormSchema[] =  [
    {
        field: '[shelfStartTime, shelfEndTime]',
        label: '上架时间',
        component: 'RangePicker',
        componentProps: {
            format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: ['开始时间', '结束时间'],
            showTime: { format: 'HH:mm:ss' },
        },
    },
    {
        field: '[doneStartTime, doneEndTime]',
        label: '完成时间',
        component: 'RangePicker',
        componentProps: {
            format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: ['开始时间', '结束时间'],
            showTime: { format: 'HH:mm:ss' },
        },
    },
]
// 投资项目 --  step7（seven）-【已完成】
export const filterDynamicViolationsAssets: FormSchema[] =  [
    {
        field: 'typeOfViolation',
        component: 'Select',
        label: '违规类型',
        colProps: {
            span: 6,
        },
        defaultValue: '1',
        componentProps: {
            placeholder: '请选择类型',
            mode: 'multiple',
            options: [
                {
                    label: '项目违规',
                    value: '1',
                },
                {
                    label: '商品违规',
                    value: '2',
                },
            ],
        },
    },
    {
        field: '[violationsStartTime, ViolationsEndTime]',
        label: '违规时间',
        component: 'RangePicker',
        componentProps: {
            format: 'YYYY-MM-DD HH:mm:ss',
            placeholder: ['开始时间', '结束时间'],
            showTime: { format: 'HH:mm:ss' },
        },
    },
]

// 服务商商品列表 -- table的 column
export const investmentColumn = {
    one: [
        { title: '编码', dataIndex: 'code', width: 100 },
        { title: '项目名称', dataIndex: 'projectName' },
        { title: '商品类别', dataIndex: 'category' },
        { title: '品牌', dataIndex: 'brand', width: 100 },
        { title: '投资价格', dataIndex: 'inventoryPrice', width: 200 },
        { title: '投资回报率', dataIndex: 'returnOnInvestment', width: 80 },
        { title: '发货仓库', dataIndex: 'deliveryWarehouse', width: 120 },
        { title: '已投量/总可投资量', dataIndex: 'investmentVolume', width: 120 },
        { title: '卖家', dataIndex: 'seller', width: 250 },
        { title: '项目状态', dataIndex: 'projectStatus', width: 100 },
        { title: '最后更新时间', dataIndex: 'updateTime', width: 200},
        { title: '操作', dataIndex: 'action', width: 300, fixed: 'right', align: 'center' },
    ],
    two: [
        { title: '编码', dataIndex: 'code', width: 100 },
        { title: '项目名称', dataIndex: 'projectName' },
        { title: '商品类别', dataIndex: 'category' },
        { title: '品牌', dataIndex: 'brand', width: 100 },
        { title: '投资价格', dataIndex: 'inventoryPrice', width: 200 },
        { title: '投资回报率', dataIndex: 'returnOnInvestment', width: 80 },
        { title: '发货仓库', dataIndex: 'deliveryWarehouse', width: 120 },
        { title: '已投量/总可投资量', dataIndex: 'investmentVolume', width: 120 },
        { title: '卖家', dataIndex: 'seller', width: 250 },
        { title: '提交人', dataIndex: 'submitter', width: 100 },
        { title: '项目状态', dataIndex: 'projectStatus', width: 100 },
        { title: '提交时间', dataIndex: 'submitTime', width: 200},
        { title: '操作', dataIndex: 'action', width: 300, fixed: 'right', align: 'center' },
    ],
    three: [
        { title: '编码', dataIndex: 'code', width: 100 },
        { title: '项目名称', dataIndex: 'projectName' },
        { title: '商品类别', dataIndex: 'category' },
        { title: '品牌', dataIndex: 'brand', width: 100 },
        { title: '投资价格', dataIndex: 'inventoryPrice', width: 200 },
        { title: '投资回报率', dataIndex: 'returnOnInvestment', width: 80 },
        { title: '发货仓库', dataIndex: 'deliveryWarehouse', width: 120 },
        { title: '已投量/总可投资量', dataIndex: 'investmentVolume', width: 120 },
        { title: '卖家', dataIndex: 'seller', width: 250 },
        { title: '提交人', dataIndex: 'submitter', width: 100 },
        { title: '项目状态', dataIndex: 'projectStatus', width: 100 },
        { title: '审核时间', dataIndex: 'auditTime', width: 200},
        { title: '操作', dataIndex: 'action', width: 300, fixed: 'right', align: 'center' },
    ],
    four: [
        { title: '编码', dataIndex: 'code', width: 100 },
        { title: '项目名称', dataIndex: 'projectName' },
        { title: '商品类别', dataIndex: 'category' },
        { title: '品牌', dataIndex: 'brand', width: 100 },
        { title: '投资价格', dataIndex: 'inventoryPrice', width: 200 },
        { title: '投资回报率', dataIndex: 'returnOnInvestment', width: 80 },
        { title: '发货仓库', dataIndex: 'deliveryWarehouse', width: 120 },
        { title: '已投量/总可投资量', dataIndex: 'investmentVolume', width: 120 },
        { title: '卖家', dataIndex: 'seller', width: 250 },
        { title: '项目状态', dataIndex: 'projectStatus', width: 100 },
        { title: '上架时间', dataIndex: 'auditTime', width: 200},
        { title: '操作', dataIndex: 'action', width: 300, fixed: 'right', align: 'center' },
    ],
    five: [
        { title: '编码', dataIndex: 'code', width: 100 },
        { title: '项目名称', dataIndex: 'projectName' },
        { title: '商品类别', dataIndex: 'category' },
        { title: '品牌', dataIndex: 'brand', width: 100 },
        { title: '投资价格', dataIndex: 'inventoryPrice', width: 200 },
        { title: '投资回报率', dataIndex: 'returnOnInvestment', width: 80 },
        { title: '发货仓库', dataIndex: 'deliveryWarehouse', width: 120 },
        { title: '已投量/总可投资量', dataIndex: 'investmentVolume', width: 120 },
        { title: '卖家', dataIndex: 'seller', width: 250 },
        { title: '项目状态', dataIndex: 'projectStatus', width: 100 },
        { title: '上架时间', dataIndex: 'shelfTime', width: 200},
        { title: '操作', dataIndex: 'action', width: 300, fixed: 'right', align: 'center' },
    ],
    six: [
        { title: '编码', dataIndex: 'code', width: 100 },
        { title: '项目名称', dataIndex: 'projectName' },
        { title: '商品类别', dataIndex: 'category' },
        { title: '品牌', dataIndex: 'brand', width: 100 },
        { title: '投资价格', dataIndex: 'inventoryPrice', width: 200 },
        { title: '投资回报率', dataIndex: 'returnOnInvestment', width: 80 },
        { title: '发货仓库', dataIndex: 'deliveryWarehouse', width: 120 },
        { title: '已投量/总可投资量', dataIndex: 'investmentVolume', width: 120 },
        { title: '卖家', dataIndex: 'seller', width: 250 },
        { title: '项目状态', dataIndex: 'projectStatus', width: 100 },
        { title: '上架时间', dataIndex: 'endTime', width: 200},
        { title: '操作', dataIndex: 'action', width: 300, fixed: 'right', align: 'center' },
    ],
    seven: [
        { title: '编码', dataIndex: 'code', width: 100 },
        { title: '项目名称', dataIndex: 'projectName' },
        { title: '商品类别', dataIndex: 'category' },
        { title: '品牌', dataIndex: 'brand', width: 100 },
        { title: '投资价格', dataIndex: 'inventoryPrice', width: 200 },
        { title: '投资回报率', dataIndex: 'returnOnInvestment', width: 80 },
        { title: '发货仓库', dataIndex: 'deliveryWarehouse', width: 120 },
        { title: '已投量/总可投资量', dataIndex: 'investmentVolume', width: 120 },
        { title: '卖家', dataIndex: 'seller', width: 250 },
        { title: '违规类型', dataIndex: 'violationType', width: 140 },
        { title: '项目状态', dataIndex: 'projectStatus', width: 100 },
        { title: '下架时间', dataIndex: 'offShelfTime', width: 200},
        { title: '操作', dataIndex: 'action', width: 300, fixed: 'right', align: 'center' },
    ],
}
// 服务商商品列表 -- mock 数据
export const investData = {
    one: [
        {
            id: '100',
            code: '100',
            projectName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
            category: '发动机系列-发动机',
            brand: '引爆点',
            inventoryPrice: '3800元 45天账期 4000.55元',
            returnOnInvestment: '16%',
            deliveryWarehouse: '江陵动力郑州仓库',
            investmentVolume: '50/500',
            seller: '上海左班汽车零部件 13200000000',
            projectStatus: '已下架',
            updateTime: '2022-03-23 12:00:00',
        },
        {
            id: '200',
            code: '100',
            projectName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
            category: '发动机系列-发动机',
            brand: '引爆点',
            inventoryPrice: '3800元 45天账期 4000.55元',
            returnOnInvestment: '16%',
            deliveryWarehouse: '江陵动力郑州仓库',
            investmentVolume: '50/500',
            seller: '上海左班汽车零部件 13200000000',
            projectStatus: '已下架',
            updateTime: '2022-03-23 12:00:00',
        },
    ],
    two: [
        {
            id: '100',
            code: '100',
            projectName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
            category: '发动机系列-发动机',
            brand: '引爆点',
            inventoryPrice: '3800元 45天账期 4000.55元',
            returnOnInvestment: '16%',
            deliveryWarehouse: '江陵动力郑州仓库',
            investmentVolume: '50/500',
            seller: '上海左班汽车零部件 13200000000',
            submitter: '李阿四13455555555',
            projectStatus: '已下架',
            submitTime: '2022-03-23 12:00:00',
        },
    ],
    three: [
        {
            id: '100',
            code: '100',
            projectName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
            category: '发动机系列-发动机',
            brand: '引爆点',
            inventoryPrice: '3800元 45天账期 4000.55元',
            returnOnInvestment: '16%',
            deliveryWarehouse: '江陵动力郑州仓库',
            investmentVolume: '50/500',
            seller: '上海左班汽车零部件 13200000000',
            submitter: '李阿四13455555555',
            projectStatus: '已下架',
            auditTime: '2022-03-23 12:00:00',
        },
    ],
    four: [
        {
            id: '100',
            code: '100',
            projectName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
            category: '发动机系列-发动机',
            brand: '引爆点',
            inventoryPrice: '3800元 45天账期 4000.55元',
            returnOnInvestment: '16%',
            deliveryWarehouse: '江陵动力郑州仓库',
            investmentVolume: '50/500',
            seller: '上海左班汽车零部件 13200000000',
            projectStatus: '已下架',
            auditTime: '2022-03-23 12:00:00',
        },
    ],
    five: [
        {
            id: '100',
            code: '100',
            projectName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
            category: '发动机系列-发动机',
            brand: '引爆点',
            inventoryPrice: '3800元 45天账期 4000.55元',
            returnOnInvestment: '16%',
            deliveryWarehouse: '江陵动力郑州仓库',
            investmentVolume: '50/500',
            seller: '上海左班汽车零部件 13200000000',
            projectStatus: '已下架',
            shelfTime: '2022-03-23 12:00:00',
        },
    ],
    six: [
        {
            id: '100',
            code: '100',
            projectName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
            category: '发动机系列-发动机',
            brand: '引爆点',
            inventoryPrice: '3800元 45天账期 4000.55元',
            returnOnInvestment: '16%',
            deliveryWarehouse: '江陵动力郑州仓库',
            investmentVolume: '50/500',
            seller: '上海左班汽车零部件 13200000000',
            projectStatus: '已下架',
            endTime: '2022-03-23 12:00:00',
        },
    ],
    seven: [
        {
            id: '100',
            code: '100',
            projectName: '适用五菱宏光荣光B15发动机总成L2BL3C配OCV阀',
            category: '发动机系列-发动机',
            brand: '引爆点',
            inventoryPrice: '3800元 45天账期 4000.55元',
            returnOnInvestment: '16%',
            deliveryWarehouse: '江陵动力郑州仓库',
            investmentVolume: '50/500',
            seller: '上海左班汽车零部件 13200000000',
            violationType: '商品违规',
            projectStatus: '已下架',
            offShelfTime: '2022-03-23 12:00:00',
        },
    ]
}
