export default {
    props: {
        // 操作菜单是否展示 （默认false）
        show: {
            type: Boolean,
            default: false,
        },
        // 标题
        title: {
            type: String,
            default: '',
        },
        // 选项上方的描述信息
        description: {
            type: String,
            default: '',
        },
        // 数据
        actions: {
            type: Array,
            default: () => [],
        },
        // 取消按钮的文字，不为空时显示按钮
        cancelText: {
            type: String,
            default: '',
        },
        // 点击某个菜单项时是否关闭弹窗
        closeOnClickAction: {
            type: Boolean,
            default: true,
        },
        // 处理底部安全区（默认true）
        safeAreaInsetBottom: {
            type: Boolean,
            default: true,
        },
        // 小程序的打开方式
        openType: {
            type: String,
            default: '',
        },
        // 点击遮罩是否允许关闭 (默认true)
        closeOnClickOverlay: {
            type: Boolean,
            default: true,
        },
        // 圆角值
        round: {
            type: [Boolean, String, Number],
            default: 0,
        },
        lang: String,
        sessionFrom: String,
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean,
        appParameter: String,
        formType: String,
    }
}
