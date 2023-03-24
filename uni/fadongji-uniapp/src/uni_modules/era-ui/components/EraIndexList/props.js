export default {
  props: {
    // 右边锚点非激活的颜色
    inactiveColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.45)',
    },
    // 右边锚点激活的颜色
    activeColor: {
      type: String,
      default: uni.$u.props.indexList.activeColor,
    },
    // 索引字符列表，数组形式
    indexList: {
      type: Array,
      default: uni.$u.props.indexList.indexList,
    },
    // 是否开启锚点自动吸顶
    sticky: {
      type: Boolean,
      default: uni.$u.props.indexList.sticky,
    },
    // 自定义导航栏的高度
    customNavHeight: {
      type: [String, Number],
      default: uni.$u.props.indexList.customNavHeight,
    },
  },
}
