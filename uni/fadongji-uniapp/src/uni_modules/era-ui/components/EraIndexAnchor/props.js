export default {
  props: {
    // 列表锚点文本内容
    text: {
      type: [String, Number],
      default: uni.$u.props.indexAnchor.text,
    },
    // 列表锚点文字颜色
    color: {
      type: String,
      default: 'rgba(0, 0, 0, 0.85)',
    },
    // 列表锚点文字大小，单位默认px
    size: {
      type: [String, Number],
      default: 14,
    },
    // 列表锚点背景颜色
    bgColor: {
      type: String,
      default: '#F7F7F8',
    },
    // 列表锚点高度，单位默认px
    height: {
      type: [String, Number],
      default: 48,
    },
  },
}
