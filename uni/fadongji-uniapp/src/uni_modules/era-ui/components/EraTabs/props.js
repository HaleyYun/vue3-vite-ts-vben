export default {
  props: {
    // 滑块的移动过渡时间，单位ms
    duration: {
      type: Number,
      default: uni.$u.props.tabs.duration,
    },
    // tabs标签数组
    list: {
      type: Array,
      default: uni.$u.props.tabs.list,
    },
    // 滑块颜色
    lineColor: {
      type: String,
      default: '#FF5319',
    },
    // 菜单选择中时的样式
    activeStyle: {
      type: [String, Object],
      default: () => {
        return { color: '#FF5319', fontWeight: 500, 'font-size': '32rpx' }
      },
    },
    // 菜单非选中时的样式
    inactiveStyle: {
      type: [String, Object],
      default: () => {
        return { color: 'rgba(0, 0, 0, 0.45)', 'font-size': '28rpx' }
      },
    },
    // 菜单选择中时数字的样式
    activeLabelStyle: {
      type: [String, Object],
      default: () => {
        return { color: '#FF5319', fontWeight: 500, 'font-size': '28rpx' }
      },
    },
    // 菜单非选中时数字的样式
    inactiveLabelStyle: {
      type: [String, Object],
      default: () => {
        return { color: 'rgba(0, 0, 0, 0.45)', 'font-size': '24rpx' }
      },
    },
    // 滑块长度
    lineWidth: {
      type: [String, Number],
      default: 20,
    },
    // 滑块高度
    lineHeight: {
      type: [String, Number],
      default: 3,
    },
    // 菜单item的样式
    itemStyle: {
      type: [String, Object],
      default: uni.$u.props.tabs.itemStyle,
    },
    // 菜单是否可滚动
    scrollable: {
      type: Boolean,
      default: uni.$u.props.tabs.scrollable,
    },
    // 当前选中标签的索引
    current: {
      type: [Number, String],
      default: uni.$u.props.tabs.current,
    },
    // 默认读取的键名
    keyName: {
      type: String,
      default: uni.$u.props.tabs.keyName,
    },
    //展示下划线
    showLine: {
      type: Boolean,
      default: true,
    },
    //下划线距离底部距离 rpx
    lineBottom: {
      type: Number,
      default: 6,
    },
  },
}
