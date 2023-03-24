export default {
  props: {
    // 搜索框形状，round-圆形，square-方形
    shape: {
      type: String,
      default: uni.$u.props.search.shape,
    },
    // 搜索框背景色，默认值#f2f2f2
    bgColor: {
      type: String,
      default: '#F7F7F8',
    },
    // 占位提示文字
    placeholder: {
      type: String,
      default: '请输入搜索',
    },
    // 是否启用清除控件
    clearabled: {
      type: Boolean,
      default: uni.$u.props.search.clearabled,
    },
    // 是否自动聚焦
    focus: {
      type: Boolean,
      default: uni.$u.props.search.focus,
    },
    // 是否在搜索框右侧显示取消按钮
    showAction: {
      type: Boolean,
      default: uni.$u.props.search.showAction,
    },
    // 是否在搜索框右侧并且在灰色底框内显示搜索按钮
    showInsideAction: {
      type: Boolean,
      default: false,
    },
    // 边框里面的搜索按钮背景
    showInsideActionStyle: {
      type: Object,
      default: () => ({background: "linear-gradient(270.27deg, #FF5622 8.32%, #FF8640 93.91%)",width:"120rpx",height: "52rpx", borderRadius:"26rpx"}),
    },
    // 右边控件的样式
    actionStyle: {
      type: Object,
      default: uni.$u.props.search.actionStyle,
    },
    // 取消按钮文字
    actionText: {
      type: String,
      default: uni.$u.props.search.actionText,
    },
    // 输入框内容对齐方式，可选值为 left|center|right
    inputAlign: {
      type: String,
      default: uni.$u.props.search.inputAlign,
    },
    // input输入框的样式，可以定义文字颜色，大小等，对象形式
    inputStyle: {
      type: Object,
      default: uni.$u.props.search.inputStyle,
    },
    // 是否启用输入框
    disabled: {
      type: Boolean,
      default: uni.$u.props.search.disabled,
    },
    // 边框颜色
    borderColor: {
      type: String,
      default: uni.$u.props.search.borderColor,
    },
    // 搜索图标的颜色，默认同输入框字体颜色
    searchIconColor: {
      type: String,
      default: uni.$u.props.search.searchIconColor,
    },
    // 输入框字体颜色
    color: {
      type: String,
      default: 'rgba(0, 0, 0, 0.85)',
    },
    // placeholder的颜色
    placeholderColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.25)',
    },
    // 左边输入框的图标，可以为uView图标名称或图片路径
    searchIcon: {
      type: String,
      default: 'search',
    },
    searchIconSize: {
      type: [Number, String],
      default: 24,
    },
    // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30px"、"30px 20px"等写法
    margin: {
      type: String,
      default: uni.$u.props.search.margin,
    },
    // 开启showAction时，是否在input获取焦点时才显示
    animation: {
      type: Boolean,
      default: uni.$u.props.search.animation,
    },
    // 输入框的初始化内容
    value: {
      type: String,
      default: uni.$u.props.search.value,
    },
    // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
    maxlength: {
      type: [String, Number],
      default: uni.$u.props.search.maxlength,
    },
    // 搜索框高度，单位px
    height: {
      type: [String, Number],
      default: uni.$u.props.search.height,
    },
    // 搜索框左侧文本
    label: {
      type: [String, Number, null],
      default: uni.$u.props.search.label,
    },
  },
}
