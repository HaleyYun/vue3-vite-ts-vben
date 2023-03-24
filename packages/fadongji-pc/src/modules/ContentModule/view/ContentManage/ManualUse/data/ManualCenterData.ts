import { FormSchema } from '/@/components/Form'
// 所属角色，supplier=供应商；agent=服务商；garage=修理厂；op=运营平台
export const filterManualCenterDetailsForm: FormSchema[] = [
    {
        field: 'platformCode',
        component: 'Select',
        label: '所属角色',
        rules: [{ required: true }],
        slot: 'slotCode',
    },
    {
        field: 'categoryId',
        component: 'Select',
        label: '分类',
        slot: 'slotCategory'
        // componentProps: {
        //   style: { width: '25%' },
        //   placeholder: '请选择分类',
        //   api: classificationEvent,
        //   onChange: (e) => {
        //     console.log(e)
        //   },
        // },
    },
    {
        field: 'name',
        component: 'Input',
        label: '内容标题',
        defaultValue: '',
        componentProps: {
            style: { width: '25%' },
            placeholder: '请输入内容标题',
            onChange: (e) => {
                console.log(e)
            },
        },
        rules: [{ required: true, message: '请输入内容标题' }],
    },
    {
        field: 'fileUrl',
        component: 'Input',
        label: '图片/视频',
        slot: 'resourceSlot',
    },
    {
        field: 'content',
        component: 'Input',
        label: '内容',
        componentProps: {
            style: { width: '90%' },
        },
        slot: 'contentSlot',
    },
    {
        field: 'isEnable',
        component: 'Switch',
        label: '是否启动',
        defaultValue: false,
        colProps: {
            span: 8,
        },
    },

]


export const removeEmpty = (obj) => {
    Object.keys(obj).forEach(function (key) {
        (obj[key] && typeof obj[key] === 'object') && removeEmpty(obj[key]) ||
            (obj[key] === undefined || obj[key] === null) && delete obj[key]
    });
    return obj;
};
