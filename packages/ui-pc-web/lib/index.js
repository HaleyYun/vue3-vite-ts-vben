import {
  defineComponent,
  openBlock,
  createElementBlock,
  createElementVNode,
  normalizeClass,
  ref,
  reactive,
  watch,
  unref,
  withModifiers,
  Fragment,
  renderList,
  toDisplayString,
  withDirectives,
  vModelText,
  vShow,
  createBlock,
  isRef,
  createCommentVNode,
  effectScope,
  markRaw,
  getCurrentInstance,
  inject,
  toRaw,
  isReactive,
  toRef,
  nextTick,
  computed,
  onUnmounted,
  toRefs,
} from 'vue'

// const pkg = require('../../package.json');
//
// const { version } = pkg;
const version = '0.0.0'

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */

process.env.NODE_ENV !== 'production' ? Object.freeze({}) : {}
process.env.NODE_ENV !== 'production' ? Object.freeze([]) : []

const withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp
    }
  }
  return main
}

var script = defineComponent({
  name: 'Button',
})

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock('button', null, '33')
}

script.render = render
script.__file = 'packages/components/Button/src/Button.vue'

const VoButton = withInstall(script)

const _hoisted_1 = { class: 'picker-item' }
const _hoisted_2 = /*#__PURE__*/ createElementVNode(
  'img',
  {
    src: 'https://qn.antdv.com/vue.png',
    class: 'block-img',
  },
  null,
  -1 /* HOISTED */,
)
const _hoisted_3 = /*#__PURE__*/ createElementVNode(
  'div',
  { class: 'picker-item__text' },
  '红色旅游等等',
  -1 /* HOISTED */,
)
var script$1 = /*#__PURE__*/ defineComponent({
  props: {
    /**
     * 是否选中
     */
    isCheckEd: {
      type: Boolean,
      default: false,
    },
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', _hoisted_1, [
          createElementVNode(
            'div',
            {
              class: normalizeClass(['picker-item__block', { 'active-item': __props.isCheckEd }]),
            },
            [
              createElementVNode(
                'span',
                {
                  class: normalizeClass(['block-checkbox', { selected: __props.isCheckEd }]),
                },
                null,
                2 /* CLASS */,
              ),
              _hoisted_2,
            ],
            2 /* CLASS */,
          ),
          _hoisted_3,
        ])
      )
    }
  },
})

script$1.__file = 'packages/components/PhotoGallery/src/widget/photoPickerItem.vue'

// Interface data format used to return a unified format
function resultSuccess(result, { message = 'ok' } = {}) {
  return {
    code: 0,
    result,
    message,
    type: 'success',
  }
}

const directoryMenu = [
  { name: '我的分组', label: 1, count: 100, id: 1 },
  { name: '小分组1', label: 2, count: 50, id: 2 },
  { name: '小分组2', label: 2, count: 50, id: 3 },
]
const imgMockList = [
  [],
  [
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 1,
    },
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 2,
    },
  ],
  [
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 3,
    },
  ],
  [
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 4,
    },
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 5,
    },
    {
      url: 'https://htst.wshtkj.com//Upload/Product/1318001/0ff17eae5a7e402eb28f7da8aa7c1cb5.JPG',
      id: 6,
    },
  ],
]
//获取目录列表
const getDirectoryMenu = () => {
  return new Promise((resolve, reject) => {
    resolve(
      resultSuccess({
        data: directoryMenu,
      }),
    )
  })
}
//获取图片列表
const getMockImgList = (id) => {
  return new Promise((resolve, reject) => {
    resolve(
      resultSuccess({
        data: imgMockList[id],
        count: imgMockList[id].length,
      }),
    )
  })
}
//添加分组
const addMockDirectoryMenu = (name) => {
  return new Promise((resolve) => {
    directoryMenu.push({
      name,
      label: 2,
      count: 20,
      id: directoryMenu[directoryMenu.length - 1].id + 1,
    })
    resolve('')
  })
}

const _hoisted_1$1 = ['onClick']
const _hoisted_2$1 = /*#__PURE__*/ createElementVNode('div', null, '选择图片', -1 /* HOISTED */)
const _hoisted_3$1 = /*#__PURE__*/ createElementVNode(
  'path',
  {
    d: 'M1003.008 902.656L612.352 512l390.656-390.656c27.648-27.648 27.648-72.704 0-100.352-27.648-27.648-72.704-27.648-100.352 0L512 411.648 121.344 20.992c-27.648-27.648-72.704-27.648-100.352 0-27.648 27.648-27.648 72.704 0 100.352L411.648 512 20.992 902.656c-13.312 13.312-20.992 31.232-20.992 50.176 0 18.944 7.168 36.864 20.992 50.176 13.312 13.312 31.232 20.992 50.176 20.992 18.944 0 36.864-7.168 50.176-20.992l390.656-390.656 390.656 390.656c13.312 13.312 31.232 20.992 50.176 20.992 18.944 0 36.864-7.168 50.176-20.992 13.312-13.312 20.992-31.232 20.992-50.176 0-18.944-7.168-36.864-20.992-50.176z',
    'p-id': '2201',
    fill: '#7e8081',
  },
  null,
  -1 /* HOISTED */,
)
const _hoisted_4 = [_hoisted_3$1]
const _hoisted_5 = { class: 'body' }
const _hoisted_6 = { class: 'body-directory' }
const _hoisted_7 = { class: 'body-directory__list' }
const _hoisted_8 = ['onClick']
const _hoisted_9 = { class: 'body-directory__add' }
const _hoisted_10 = ['onClick']
const _hoisted_11 = /*#__PURE__*/ createElementVNode(
  'span',
  { class: 'add-alert__span' },
  '创建分组',
  -1 /* HOISTED */,
)
const _hoisted_12 = { class: 'add-group group' }
const _hoisted_13 = ['onClick']
const _hoisted_14 = { class: 'body-list' }
const _hoisted_15 = { class: 'body-list__header' }
const _hoisted_16 = /*#__PURE__*/ createElementVNode(
  'span',
  null,
  ' 大小不超过10M ',
  -1 /* HOISTED */,
)
const _hoisted_17 = { class: 'body-list__header-btn' }
const _hoisted_18 = { for: 'file-id' }
const _hoisted_19 = /*#__PURE__*/ createElementVNode(
  'span',
  { class: 'span-btn' },
  '上传文件',
  -1 /* HOISTED */,
)
const _hoisted_20 = { class: 'body-list__content' }
const _hoisted_21 = { class: 'footer' }
const _hoisted_22 = /*#__PURE__*/ createElementVNode(
  'svg',
  {
    t: '1646027141410',
    class: 'icon footer-icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '6976',
    width: '24',
    height: '24',
  },
  [
    /*#__PURE__*/ createElementVNode('path', {
      d: 'M616.401455 720.756364L418.909091 523.310545 616.401455 325.818182l32.907636 32.907636-164.584727 164.584727 164.584727 164.538182z',
      'p-id': '6977',
      fill: '#8a8a8a',
    }),
  ],
  -1 /* HOISTED */,
)
const _hoisted_23 = { class: 'footer-page' }
const _hoisted_24 = /*#__PURE__*/ createElementVNode(
  'span',
  { class: 'footer-page__division' },
  '/',
  -1 /* HOISTED */,
)
const _hoisted_25 = /*#__PURE__*/ createElementVNode(
  'svg',
  {
    t: '1646027220715',
    class: 'icon footer-icon',
    viewBox: '0 0 1024 1024',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'p-id': '8128',
    width: '24',
    height: '24',
  },
  [
    /*#__PURE__*/ createElementVNode('path', {
      d: 'M407.59854499 303.243636L605.090909 500.689455 407.598545 698.18181801l-32.907636-32.90763601 164.584727-164.584727-164.584727-164.538182z',
      'p-id': '8129',
      fill: '#8a8a8a',
    }),
  ],
  -1 /* HOISTED */,
)
const _hoisted_26 = /*#__PURE__*/ createElementVNode(
  'span',
  { class: 'footer-btn' },
  '跳转',
  -1 /* HOISTED */,
)
const _hoisted_27 = { class: 'group' }
const _hoisted_28 = { class: 'group-check' }
const _hoisted_29 = /*#__PURE__*/ createElementVNode('span', null, '已选择', -1 /* HOISTED */)
const _hoisted_30 = { class: 'group-check__text' }
const __default__ = defineComponent({
  name: 'PhotoGallery',
})
var script$2 = /*#__PURE__*/ defineComponent({
  ...__default__,
  props: {
    /**
     * 遮罩是否可以点击
     */
    mask: {
      type: Boolean,
      default: true,
    },
    /**
     * 最多选择项
     */
    maxCount: {
      type: Number,
      default: 9,
    },
  },
  emits: ['returnPhoto'],
  setup(__props, { expose, emit }) {
    const props = __props
    //引入选择信息组件
    // 组件的变量 是否打开
    let photoShow = ref(false)
    const maskFn = () => {
      props.mask && (photoShow.value = false)
    }
    // 目录数组
    let directoryMenu = reactive([])
    // 选择的图片数组
    let selectImgList = reactive([])
    //选择某个图片
    const selectPhotoPicker = (item) => {
      const index = searchIndexSelectPhoto(item)
      if (index >= 0) {
        selectImgList.splice(index, 1)
      } else {
        if (selectImgList.length >= props.maxCount) {
          alert(`最多选择${props.maxCount}个`)
          return
        }
        selectImgList.push(item)
      }
    }
    // 在选中的图片里面找到存在的下标
    const searchIndexSelectPhoto = (item) => {
      let boo = -1
      for (let i = 0; i < selectImgList.length; i++) {
        if (selectImgList[i].id == item.id) {
          boo = i
        }
      }
      return boo
    }
    /**
     *  @description 获取左边目录
     */
    const getDirectaryMenuFn = () => {
      directorySelect.value = 0
      getDirectoryMenu().then((res) => {
        directoryMenu.length = 0
        res.result.data.forEach((item) => {
          directoryMenu.push(item)
        })
      })
    }
    /**
     *  @description 获取图片列表
     */
    const getImgListFn = () => {
      photoList.length = 0
      getMockImgList(directoryMenu[directorySelect.value].id).then((res) => {
        photoListCount.value = res.result.count
        res.result.data.forEach((item) => {
          photoList.push(item)
        })
      })
    }
    //选中目录的下标
    let directorySelect = ref(0)
    // 图片列表信息
    let photoList = reactive([])
    // 图片总数
    let photoListCount = ref(0)
    //第几页
    let photoListPage = ref(1)
    //要去的页数
    let photoListTopage = ref(1)
    /**
     * @description 选中目录
     */
    const changeDirectory = (index) => {
      directorySelect.value = index
    }
    //监听选中值
    watch(directorySelect, (newVal) => {
      getImgListFn()
    })
    const uploadImg = (inputUploadRef) => {
      console.log(inputUploadRef.target.files, 'sss')
    }
    const addGroupBoo = ref(false)
    /**
     * @description 新增分组弹窗
     */
    const addGroup = () => {
      addGroupBoo.value = !addGroupBoo.value
    }
    //添加分组名称
    const groupName = ref('')
    // 添加分组
    const addGroupFn = async () => {
      if (groupName.value.length <= 0) {
        alert('请输入分组名称')
        return
      }
      if (groupName.value.length > 6) {
        alert('分组名称最多不能超过6个字')
        return
      }
      addGroupBoo.value = false
      await addMockDirectoryMenu(groupName.value)
      await getDirectaryMenuFn()
    }
    /**
     * @description 选择的图片列表
     */
    const surePhoto = () => {
      if (selectImgList.length <= 0) return
      photoShow.value = false
      emit('returnPhoto', selectImgList)
    }
    /**
     *  @description 打开当前组件
     */
    const openPhoto = async () => {
      await getDirectaryMenuFn()
      await getImgListFn()
      groupName.value = ''
      selectImgList.length = 0
      photoShow.value = true
    }
    /**
     *  @description 关闭当前组件
     */
    const closePhoto = () => {
      photoShow.value = false
    }
    // 重点！！这里需要使用defineExpose暴露出去
    expose({
      openPhoto,
      closePhoto,
    })
    return (_ctx, _cache) => {
      return unref(photoShow)
        ? (openBlock(),
          createElementBlock(
            'div',
            {
              key: 0,
              class: 'vocen-desktop-dialog',
              onClick: withModifiers(maskFn, ['stop']),
            },
            [
              createElementVNode(
                'div',
                {
                  class: 'vocen-desktop-dialog__content',
                  onClick:
                    _cache[4] ||
                    (_cache[4] = withModifiers(($event) => (addGroupBoo.value = false), ['stop'])),
                },
                [
                  createElementVNode('div', { class: 'header' }, [
                    _hoisted_2$1,
                    createElementVNode(
                      'svg',
                      {
                        onClick: closePhoto,
                        t: '1646014081269',
                        class: 'icon',
                        viewBox: '0 0 1024 1024',
                        version: '1.1',
                        xmlns: 'http://www.w3.org/2000/svg',
                        'p-id': '2200',
                        width: '18',
                        height: '18',
                      },
                      _hoisted_4,
                    ),
                  ]),
                  createElementVNode('div', _hoisted_5, [
                    createElementVNode('div', _hoisted_6, [
                      createElementVNode('div', _hoisted_7, [
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(unref(directoryMenu), (item, index) => {
                            return (
                              openBlock(),
                              createElementBlock(
                                'div',
                                {
                                  class: normalizeClass([
                                    'item',
                                    {
                                      'item-children': item.label > 1,
                                      'item-active': unref(directorySelect) == index,
                                    },
                                  ]),
                                  onClick: ($event) => changeDirectory(index),
                                  key: index,
                                },
                                toDisplayString(item.name) +
                                  '(' +
                                  toDisplayString(item.count) +
                                  ') ',
                                11 /* TEXT, CLASS, PROPS */,
                                _hoisted_8,
                              )
                            )
                          }),
                          128 /* KEYED_FRAGMENT */,
                        )),
                      ]),
                      createElementVNode('div', _hoisted_9, [
                        createElementVNode(
                          'span',
                          {
                            class: 'body-directory__add-btn',
                            onClick: withModifiers(addGroup, ['stop']),
                          },
                          '新建分组',
                          8 /* PROPS */,
                          _hoisted_10,
                        ),
                        withDirectives(
                          createElementVNode(
                            'div',
                            {
                              class: 'add-alert',
                              onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ['stop'])),
                            },
                            [
                              createElementVNode('div', null, [
                                _hoisted_11,
                                withDirectives(
                                  createElementVNode(
                                    'input',
                                    {
                                      'onUpdate:modelValue':
                                        _cache[0] ||
                                        (_cache[0] = ($event) => (groupName.value = $event)),
                                      type: 'text',
                                      class: 'add-alert__input',
                                      placeholder: '分组名为1-6个字符',
                                    },
                                    null,
                                    512 /* NEED_PATCH */,
                                  ),
                                  [[vModelText, groupName.value]],
                                ),
                              ]),
                              createElementVNode('div', _hoisted_12, [
                                createElementVNode(
                                  'div',
                                  {
                                    class: normalizeClass([
                                      'group-sure',
                                      {
                                        disable:
                                          groupName.value.length <= 0 || groupName.value.length > 6,
                                      },
                                    ]),
                                    onClick: withModifiers(addGroupFn, ['stop']),
                                  },
                                  '确定',
                                  10 /* CLASS, PROPS */,
                                  _hoisted_13,
                                ),
                                createElementVNode(
                                  'div',
                                  {
                                    class: 'group-cancel',
                                    onClick:
                                      _cache[1] ||
                                      (_cache[1] = withModifiers(
                                        ($event) => {
                                          ;(addGroupBoo.value = false), (groupName.value = '')
                                        },
                                        ['stop'],
                                      )),
                                  },
                                  '取消',
                                ),
                              ]),
                            ],
                            512 /* NEED_PATCH */,
                          ),
                          [[vShow, addGroupBoo.value]],
                        ),
                      ]),
                    ]),
                    createElementVNode('div', _hoisted_14, [
                      createElementVNode('div', _hoisted_15, [
                        _hoisted_16,
                        createElementVNode('span', _hoisted_17, [
                          createElementVNode('label', _hoisted_18, [
                            _hoisted_19,
                            createElementVNode(
                              'input',
                              {
                                type: 'file',
                                title: '',
                                onChange: uploadImg,
                                id: 'file-id',
                                class: 'file-input',
                                multiple: '',
                                accept: 'image/png,image/jpeg,image/gif,image/jpg',
                              },
                              null,
                              32 /* HYDRATE_EVENTS */,
                            ),
                          ]),
                        ]),
                      ]),
                      createElementVNode('div', _hoisted_20, [
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(unref(photoList), (item, index) => {
                            return (
                              openBlock(),
                              createBlock(
                                script$1,
                                {
                                  onClick: ($event) => selectPhotoPicker(item),
                                  isCheckEd: searchIndexSelectPhoto(item) >= 0,
                                  key: index,
                                },
                                null,
                                8 /* PROPS */,
                                ['onClick', 'isCheckEd'],
                              )
                            )
                          }),
                          128 /* KEYED_FRAGMENT */,
                        )),
                      ]),
                      createElementVNode('div', _hoisted_21, [
                        _hoisted_22,
                        createElementVNode('span', _hoisted_23, [
                          createElementVNode(
                            'span',
                            null,
                            toDisplayString(unref(photoListPage)),
                            1 /* TEXT */,
                          ),
                          _hoisted_24,
                          createElementVNode(
                            'span',
                            null,
                            toDisplayString(Math.ceil(unref(photoListCount) / 18)),
                            1 /* TEXT */,
                          ),
                        ]),
                        _hoisted_25,
                        withDirectives(
                          createElementVNode(
                            'input',
                            {
                              'onUpdate:modelValue':
                                _cache[3] ||
                                (_cache[3] = ($event) =>
                                  isRef(photoListTopage)
                                    ? (photoListTopage.value = $event)
                                    : (photoListTopage = $event)),
                              type: 'number',
                              class: 'page-number',
                              οnkeyup:
                                "if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\\D/g,'')}",
                              onafterpaste:
                                "if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\\D/g,'')}",
                            },
                            null,
                            512 /* NEED_PATCH */,
                          ),
                          [[vModelText, unref(photoListTopage)]],
                        ),
                        _hoisted_26,
                      ]),
                    ]),
                  ]),
                  createElementVNode('div', _hoisted_27, [
                    createElementVNode(
                      'div',
                      {
                        class: normalizeClass([
                          'group-sure',
                          { disable: unref(selectImgList).length <= 0 },
                        ]),
                        onClick: surePhoto,
                      },
                      '确定',
                      2 /* CLASS */,
                    ),
                    createElementVNode(
                      'div',
                      {
                        class: 'group-cancel',
                        onClick: closePhoto,
                      },
                      '取消',
                    ),
                    createElementVNode('div', _hoisted_28, [
                      _hoisted_29,
                      createElementVNode(
                        'span',
                        _hoisted_30,
                        toDisplayString(unref(selectImgList).length) +
                          ' / ' +
                          toDisplayString(__props.maxCount) +
                          ' 项',
                        1 /* TEXT */,
                      ),
                    ]),
                  ]),
                ],
              ),
            ],
            8 /* PROPS */,
            _hoisted_1$1,
          ))
        : createCommentVNode('v-if', true)
    }
  },
})

script$2.__file = 'packages/components/PhotoGallery/src/PhotoGallery.vue'

const VoPhotoGallery = withInstall(script$2)

var isVue2 = false

function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  target[key] = val
  return val
}

function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  delete target[key]
}

function getDevtoolsGlobalHook() {
  return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__
}
function getTarget() {
  // @ts-ignore
  return typeof navigator !== 'undefined' && typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : {}
}
const isProxyAvailable = typeof Proxy === 'function'

const HOOK_SETUP = 'devtools-plugin:setup'
const HOOK_PLUGIN_SETTINGS_SET = 'plugin:settings:set'

let supported
let perf
function isPerformanceSupported() {
  var _a
  if (supported !== undefined) {
    return supported
  }
  if (typeof window !== 'undefined' && window.performance) {
    supported = true
    perf = window.performance
  } else if (
    typeof global !== 'undefined' &&
    ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)
  ) {
    supported = true
    perf = global.perf_hooks.performance
  } else {
    supported = false
  }
  return supported
}
function now() {
  return isPerformanceSupported() ? perf.now() : Date.now()
}

class ApiProxy {
  constructor(plugin, hook) {
    this.target = null
    this.targetQueue = []
    this.onQueue = []
    this.plugin = plugin
    this.hook = hook
    const defaultSettings = {}
    if (plugin.settings) {
      for (const id in plugin.settings) {
        const item = plugin.settings[id]
        defaultSettings[id] = item.defaultValue
      }
    }
    const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`
    let currentSettings = Object.assign({}, defaultSettings)
    try {
      const raw = localStorage.getItem(localSettingsSaveId)
      const data = JSON.parse(raw)
      Object.assign(currentSettings, data)
    } catch (e) {
      // noop
    }
    this.fallbacks = {
      getSettings() {
        return currentSettings
      },
      setSettings(value) {
        try {
          localStorage.setItem(localSettingsSaveId, JSON.stringify(value))
        } catch (e) {
          // noop
        }
        currentSettings = value
      },
      now() {
        return now()
      },
    }
    if (hook) {
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value)
        }
      })
    }
    this.proxiedOn = new Proxy(
      {},
      {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop]
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args,
              })
            }
          }
        },
      },
    )
    this.proxiedTarget = new Proxy(
      {},
      {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop]
          } else if (prop === 'on') {
            return this.proxiedOn
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {},
              })
              return this.fallbacks[prop](...args)
            }
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve,
                })
              })
            }
          }
        },
      },
    )
  }
  async setRealTarget(target) {
    this.target = target
    for (const item of this.onQueue) {
      this.target.on[item.method](...item.args)
    }
    for (const item of this.targetQueue) {
      item.resolve(await this.target[item.method](...item.args))
    }
  }
}

function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
  const descriptor = pluginDescriptor
  const target = getTarget()
  const hook = getDevtoolsGlobalHook()
  const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy
  if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
    hook.emit(HOOK_SETUP, pluginDescriptor, setupFn)
  } else {
    const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null
    const list = (target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [])
    list.push({
      pluginDescriptor: descriptor,
      setupFn,
      proxy,
    })
    if (proxy) setupFn(proxy.proxiedTarget)
  }
}

/*!
 * pinia v2.0.12
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */

/**
 * setActivePinia must be called to handle SSR at the top of functions like
 * `fetch`, `setup`, `serverPrefetch` and others
 */
let activePinia
/**
 * Sets or unsets the active pinia. Used in SSR and internally when calling
 * actions and getters
 *
 * @param pinia - Pinia instance
 */
const setActivePinia = (pinia) => (activePinia = pinia)
const piniaSymbol =
  process.env.NODE_ENV !== 'production' ? Symbol('pinia') : /* istanbul ignore next */ Symbol()

function isPlainObject(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  o,
) {
  return (
    o &&
    typeof o === 'object' &&
    Object.prototype.toString.call(o) === '[object Object]' &&
    typeof o.toJSON !== 'function'
  )
}
// type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
// TODO: can we change these to numbers?
/**
 * Possible types for SubscriptionCallback
 */
var MutationType
;(function (MutationType) {
  /**
   * Direct mutation of the state:
   *
   * - `store.name = 'new name'`
   * - `store.$state.name = 'new name'`
   * - `store.list.push('new item')`
   */
  MutationType['direct'] = 'direct'
  /**
   * Mutated the state with `$patch` and an object
   *
   * - `store.$patch({ name: 'newName' })`
   */
  MutationType['patchObject'] = 'patch object'
  /**
   * Mutated the state with `$patch` and a function
   *
   * - `store.$patch(state => state.name = 'newName')`
   */
  MutationType['patchFunction'] = 'patch function'
  // maybe reset? for $state = {} and $reset
})(MutationType || (MutationType = {}))

const IS_CLIENT = typeof window !== 'undefined'

/*
 * FileSaver.js A saveAs() FileSaver implementation.
 *
 * Originally by Eli Grey, adapted as an ESM module by Eduardo San Martin
 * Morote.
 *
 * License : MIT
 */
// The one and only way of getting global scope in all environments
// https://stackoverflow.com/q/3277182/1008999
const _global = /*#__PURE__*/ (() =>
  typeof window === 'object' && window.window === window
    ? window
    : typeof self === 'object' && self.self === self
    ? self
    : typeof global === 'object' && global.global === global
    ? global
    : typeof globalThis === 'object'
    ? globalThis
    : { HTMLElement: null })()
function bom(blob, { autoBom = false } = {}) {
  // prepend BOM for UTF-8 XML and text/* types (including HTML)
  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  if (
    autoBom &&
    /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)
  ) {
    return new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type })
  }
  return blob
}
function download(url, name, opts) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    saveAs(xhr.response, name, opts)
  }
  xhr.onerror = function () {
    console.error('could not download file')
  }
  xhr.send()
}
function corsEnabled(url) {
  const xhr = new XMLHttpRequest()
  // use sync to avoid popup blocker
  xhr.open('HEAD', url, false)
  try {
    xhr.send()
  } catch (e) {}
  return xhr.status >= 200 && xhr.status <= 299
}
// `a.click()` doesn't work for all browsers (#465)
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent('click'))
  } catch (e) {
    const evt = document.createEvent('MouseEvents')
    evt.initMouseEvent(
      'click',
      true,
      true,
      window,
      0,
      0,
      0,
      80,
      20,
      false,
      false,
      false,
      false,
      0,
      null,
    )
    node.dispatchEvent(evt)
  }
}
const _navigator = typeof navigator === 'object' ? navigator : { userAgent: '' }
// Detect WebView inside a native macOS app by ruling out all browsers
// We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
// https://www.whatismybrowser.com/guides/the-latest-user-agent/macos
const isMacOSWebView = /*#__PURE__*/ (() =>
  /Macintosh/.test(_navigator.userAgent) &&
  /AppleWebKit/.test(_navigator.userAgent) &&
  !/Safari/.test(_navigator.userAgent))()
const saveAs = !IS_CLIENT
  ? () => {} // noop
  : // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement !== 'undefined' &&
    'download' in HTMLAnchorElement.prototype &&
    !isMacOSWebView
  ? downloadSaveAs
  : // Use msSaveOrOpenBlob as a second approach
  'msSaveOrOpenBlob' in _navigator
  ? msSaveAs
  : // Fallback to using FileReader and a popup
    fileSaverSaveAs
function downloadSaveAs(blob, name = 'download', opts) {
  const a = document.createElement('a')
  a.download = name
  a.rel = 'noopener' // tabnabbing
  // TODO: detect chrome extensions & packaged apps
  // a.target = '_blank'
  if (typeof blob === 'string') {
    // Support regular links
    a.href = blob
    if (a.origin !== location.origin) {
      if (corsEnabled(a.href)) {
        download(blob, name, opts)
      } else {
        a.target = '_blank'
        click(a)
      }
    } else {
      click(a)
    }
  } else {
    // Support blobs
    a.href = URL.createObjectURL(blob)
    setTimeout(function () {
      URL.revokeObjectURL(a.href)
    }, 4e4) // 40s
    setTimeout(function () {
      click(a)
    }, 0)
  }
}
function msSaveAs(blob, name = 'download', opts) {
  if (typeof blob === 'string') {
    if (corsEnabled(blob)) {
      download(blob, name, opts)
    } else {
      const a = document.createElement('a')
      a.href = blob
      a.target = '_blank'
      setTimeout(function () {
        click(a)
      })
    }
  } else {
    // @ts-ignore: works on windows
    navigator.msSaveOrOpenBlob(bom(blob, opts), name)
  }
}
function fileSaverSaveAs(blob, name, opts, popup) {
  // Open a popup immediately do go around popup blocker
  // Mostly only available on user interaction and the fileReader is async so...
  popup = popup || open('', '_blank')
  if (popup) {
    popup.document.title = popup.document.body.innerText = 'downloading...'
  }
  if (typeof blob === 'string') return download(blob, name, opts)
  const force = blob.type === 'application/octet-stream'
  const isSafari = /constructor/i.test(String(_global.HTMLElement)) || 'safari' in _global
  const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent)
  if ((isChromeIOS || (force && isSafari) || isMacOSWebView) && typeof FileReader !== 'undefined') {
    // Safari doesn't allow downloading of blob URLs
    const reader = new FileReader()
    reader.onloadend = function () {
      let url = reader.result
      if (typeof url !== 'string') {
        popup = null
        throw new Error('Wrong reader.result type')
      }
      url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;')
      if (popup) {
        popup.location.href = url
      } else {
        location.assign(url)
      }
      popup = null // reverse-tabnabbing #460
    }
    reader.readAsDataURL(blob)
  } else {
    const url = URL.createObjectURL(blob)
    if (popup) popup.location.assign(url)
    else location.href = url
    popup = null // reverse-tabnabbing #460
    setTimeout(function () {
      URL.revokeObjectURL(url)
    }, 4e4) // 40s
  }
}

/**
 * Shows a toast or console.log
 *
 * @param message - message to log
 * @param type - different color of the tooltip
 */
function toastMessage(message, type) {
  const piniaMessage = '🍍 ' + message
  if (typeof __VUE_DEVTOOLS_TOAST__ === 'function') {
    __VUE_DEVTOOLS_TOAST__(piniaMessage, type)
  } else if (type === 'error') {
    console.error(piniaMessage)
  } else if (type === 'warn') {
    console.warn(piniaMessage)
  } else {
    console.log(piniaMessage)
  }
}
function isPinia(o) {
  return '_a' in o && 'install' in o
}

function checkClipboardAccess() {
  if (!('clipboard' in navigator)) {
    toastMessage(`Your browser doesn't support the Clipboard API`, 'error')
    return true
  }
}
function checkNotFocusedError(error) {
  if (error instanceof Error && error.message.toLowerCase().includes('document is not focused')) {
    toastMessage(
      'You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.',
      'warn',
    )
    return true
  }
  return false
}
async function actionGlobalCopyState(pinia) {
  if (checkClipboardAccess()) return
  try {
    await navigator.clipboard.writeText(JSON.stringify(pinia.state.value))
    toastMessage('Global state copied to clipboard.')
  } catch (error) {
    if (checkNotFocusedError(error)) return
    toastMessage(`Failed to serialize the state. Check the console for more details.`, 'error')
    console.error(error)
  }
}
async function actionGlobalPasteState(pinia) {
  if (checkClipboardAccess()) return
  try {
    pinia.state.value = JSON.parse(await navigator.clipboard.readText())
    toastMessage('Global state pasted from clipboard.')
  } catch (error) {
    if (checkNotFocusedError(error)) return
    toastMessage(
      `Failed to deserialize the state from clipboard. Check the console for more details.`,
      'error',
    )
    console.error(error)
  }
}
async function actionGlobalSaveState(pinia) {
  try {
    saveAs(
      new Blob([JSON.stringify(pinia.state.value)], {
        type: 'text/plain;charset=utf-8',
      }),
      'pinia-state.json',
    )
  } catch (error) {
    toastMessage(`Failed to export the state as JSON. Check the console for more details.`, 'error')
    console.error(error)
  }
}
let fileInput
function getFileOpener() {
  if (!fileInput) {
    fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = '.json'
  }
  function openFile() {
    return new Promise((resolve, reject) => {
      fileInput.onchange = async () => {
        const files = fileInput.files
        if (!files) return resolve(null)
        const file = files.item(0)
        if (!file) return resolve(null)
        return resolve({ text: await file.text(), file })
      }
      // @ts-ignore: TODO: changed from 4.3 to 4.4
      fileInput.oncancel = () => resolve(null)
      fileInput.onerror = reject
      fileInput.click()
    })
  }
  return openFile
}
async function actionGlobalOpenStateFile(pinia) {
  try {
    const open = await getFileOpener()
    const result = await open()
    if (!result) return
    const { text, file } = result
    pinia.state.value = JSON.parse(text)
    toastMessage(`Global state imported from "${file.name}".`)
  } catch (error) {
    toastMessage(`Failed to export the state as JSON. Check the console for more details.`, 'error')
    console.error(error)
  }
}

function formatDisplay(display) {
  return {
    _custom: {
      display,
    },
  }
}
const PINIA_ROOT_LABEL = '🍍 Pinia (root)'
const PINIA_ROOT_ID = '_root'
function formatStoreForInspectorTree(store) {
  return isPinia(store)
    ? {
        id: PINIA_ROOT_ID,
        label: PINIA_ROOT_LABEL,
      }
    : {
        id: store.$id,
        label: store.$id,
      }
}
function formatStoreForInspectorState(store) {
  if (isPinia(store)) {
    const storeNames = Array.from(store._s.keys())
    const storeMap = store._s
    const state = {
      state: storeNames.map((storeId) => ({
        editable: true,
        key: storeId,
        value: store.state.value[storeId],
      })),
      getters: storeNames
        .filter((id) => storeMap.get(id)._getters)
        .map((id) => {
          const store = storeMap.get(id)
          return {
            editable: false,
            key: id,
            value: store._getters.reduce((getters, key) => {
              getters[key] = store[key]
              return getters
            }, {}),
          }
        }),
    }
    return state
  }
  const state = {
    state: Object.keys(store.$state).map((key) => ({
      editable: true,
      key,
      value: store.$state[key],
    })),
  }
  // avoid adding empty getters
  if (store._getters && store._getters.length) {
    state.getters = store._getters.map((getterName) => ({
      editable: false,
      key: getterName,
      value: store[getterName],
    }))
  }
  if (store._customProperties.size) {
    state.customProperties = Array.from(store._customProperties).map((key) => ({
      editable: true,
      key,
      value: store[key],
    }))
  }
  return state
}
function formatEventData(events) {
  if (!events) return {}
  if (Array.isArray(events)) {
    // TODO: handle add and delete for arrays and objects
    return events.reduce(
      (data, event) => {
        data.keys.push(event.key)
        data.operations.push(event.type)
        data.oldValue[event.key] = event.oldValue
        data.newValue[event.key] = event.newValue
        return data
      },
      {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {},
      },
    )
  } else {
    return {
      operation: formatDisplay(events.type),
      key: formatDisplay(events.key),
      oldValue: events.oldValue,
      newValue: events.newValue,
    }
  }
}
function formatMutationType(type) {
  switch (type) {
    case MutationType.direct:
      return 'mutation'
    case MutationType.patchFunction:
      return '$patch'
    case MutationType.patchObject:
      return '$patch'
    default:
      return 'unknown'
  }
}

// timeline can be paused when directly changing the state
let isTimelineActive = true
const componentStateTypes = []
const MUTATIONS_LAYER_ID = 'pinia:mutations'
const INSPECTOR_ID = 'pinia'
/**
 * Gets the displayed name of a store in devtools
 *
 * @param id - id of the store
 * @returns a formatted string
 */
const getStoreType = (id) => '🍍 ' + id
/**
 * Add the pinia plugin without any store. Allows displaying a Pinia plugin tab
 * as soon as it is added to the application.
 *
 * @param app - Vue application
 * @param pinia - pinia instance
 */
function registerPiniaDevtools(app, pinia) {
  setupDevtoolsPlugin(
    {
      id: 'dev.esm.pinia',
      label: 'Pinia 🍍',
      logo: 'https://pinia.vuejs.org/logo.svg',
      packageName: 'pinia',
      homepage: 'https://pinia.vuejs.org',
      componentStateTypes,
      app,
    },
    (api) => {
      if (typeof api.now !== 'function') {
        toastMessage(
          'You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.',
        )
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 0xe5df88,
      })
      api.addInspector({
        id: INSPECTOR_ID,
        label: 'Pinia 🍍',
        icon: 'storage',
        treeFilterPlaceholder: 'Search stores',
        actions: [
          {
            icon: 'content_copy',
            action: () => {
              actionGlobalCopyState(pinia)
            },
            tooltip: 'Serialize and copy the state',
          },
          {
            icon: 'content_paste',
            action: async () => {
              await actionGlobalPasteState(pinia)
              api.sendInspectorTree(INSPECTOR_ID)
              api.sendInspectorState(INSPECTOR_ID)
            },
            tooltip: 'Replace the state with the content of your clipboard',
          },
          {
            icon: 'save',
            action: () => {
              actionGlobalSaveState(pinia)
            },
            tooltip: 'Save the state as a JSON file',
          },
          {
            icon: 'folder_open',
            action: async () => {
              await actionGlobalOpenStateFile(pinia)
              api.sendInspectorTree(INSPECTOR_ID)
              api.sendInspectorState(INSPECTOR_ID)
            },
            tooltip: 'Import the state from a JSON file',
          },
        ],
      })
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: 'state',
              editable: true,
              value: store._isOptionsAPI
                ? {
                    _custom: {
                      value: store.$state,
                      actions: [
                        {
                          icon: 'restore',
                          tooltip: 'Reset the state of this store',
                          action: () => store.$reset(),
                        },
                      ],
                    },
                  }
                : store.$state,
            })
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: 'getters',
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key]
                  } catch (error) {
                    // @ts-expect-error: we just want to show it in devtools
                    getters[key] = error
                  }
                  return getters
                }, {}),
              })
            }
          })
        }
      })
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia]
          stores = stores.concat(Array.from(pinia._s.values()))
          payload.rootNodes = (
            payload.filter
              ? stores.filter((store) =>
                  '$id' in store
                    ? store.$id.toLowerCase().includes(payload.filter.toLowerCase())
                    : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase()),
                )
              : stores
          ).map(formatStoreForInspectorTree)
        }
      })
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore =
            payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId)
          if (!inspectedStore) {
            // this could be the selected store restored for a different project
            // so it's better not to say anything here
            return
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore)
          }
        }
      })
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore =
            payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId)
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, 'error')
          }
          const { path } = payload
          if (!isPinia(inspectedStore)) {
            // access only the state
            if (
              path.length !== 1 ||
              !inspectedStore._customProperties.has(path[0]) ||
              path[0] in inspectedStore.$state
            ) {
              path.unshift('$state')
            }
          } else {
            // Root access, we can omit the `.value` because the devtools API does it for us
            path.unshift('state')
          }
          isTimelineActive = false
          payload.set(inspectedStore, path, payload.state.value)
          isTimelineActive = true
        }
      })
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith('🍍')) {
          const storeId = payload.type.replace(/^🍍\s*/, '')
          const store = pinia._s.get(storeId)
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, 'error')
          }
          const { path } = payload
          if (path[0] !== 'state') {
            return toastMessage(
              `Invalid path for store "${storeId}":\n${path}\nOnly state can be modified.`,
            )
          }
          // rewrite the first entry to be able to directly set the state as
          // well as any other path
          path[0] = '$state'
          isTimelineActive = false
          payload.set(store, path, payload.state.value)
          isTimelineActive = true
        }
      })
    },
  )
}
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id))
  }
  setupDevtoolsPlugin(
    {
      id: 'dev.esm.pinia',
      label: 'Pinia 🍍',
      logo: 'https://pinia.vuejs.org/logo.svg',
      packageName: 'pinia',
      homepage: 'https://pinia.vuejs.org',
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: 'Notify about new/deleted stores',
          type: 'boolean',
          defaultValue: true,
        },
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      },
    },
    (api) => {
      // gracefully handle errors
      const now = typeof api.now === 'function' ? api.now.bind(api) : Date.now
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now(),
            title: '🛫 ' + name,
            subtitle: 'start',
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args,
            },
            groupId,
          },
        })
        after((result) => {
          activeAction = undefined
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now(),
              title: '🛬 ' + name,
              subtitle: 'end',
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result,
              },
              groupId,
            },
          })
        })
        onError((error) => {
          activeAction = undefined
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now(),
              logType: 'error',
              title: '💥 ' + name,
              subtitle: 'end',
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error,
              },
              groupId,
            },
          })
        })
      }, true)
      store._customProperties.forEach((name) => {
        watch(
          () => unref(store[name]),
          (newValue, oldValue) => {
            api.notifyComponentUpdate()
            api.sendInspectorState(INSPECTOR_ID)
            if (isTimelineActive) {
              api.addTimelineEvent({
                layerId: MUTATIONS_LAYER_ID,
                event: {
                  time: now(),
                  title: 'Change',
                  subtitle: name,
                  data: {
                    newValue,
                    oldValue,
                  },
                  groupId: activeAction,
                },
              })
            }
          },
          { deep: true },
        )
      })
      store.$subscribe(
        ({ events, type }, state) => {
          api.notifyComponentUpdate()
          api.sendInspectorState(INSPECTOR_ID)
          if (!isTimelineActive) return
          // rootStore.state[store.id] = state
          const eventData = {
            time: now(),
            title: formatMutationType(type),
            data: {
              store: formatDisplay(store.$id),
              ...formatEventData(events),
            },
            groupId: activeAction,
          }
          // reset for the next mutation
          activeAction = undefined
          if (type === MutationType.patchFunction) {
            eventData.subtitle = '⤵️'
          } else if (type === MutationType.patchObject) {
            eventData.subtitle = '🧩'
          } else if (events && !Array.isArray(events)) {
            eventData.subtitle = events.type
          }
          if (events) {
            eventData.data['rawEvent(s)'] = {
              _custom: {
                display: 'DebuggerEvent',
                type: 'object',
                tooltip: 'raw DebuggerEvent[]',
                value: events,
              },
            }
          }
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: eventData,
          })
        },
        { detached: true, flush: 'sync' },
      )
      const hotUpdate = store._hotUpdate
      store._hotUpdate = markRaw((newStore) => {
        hotUpdate(newStore)
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now(),
            title: '🔥 ' + store.$id,
            subtitle: 'HMR update',
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`),
            },
          },
        })
        // update the devtools too
        api.notifyComponentUpdate()
        api.sendInspectorTree(INSPECTOR_ID)
        api.sendInspectorState(INSPECTOR_ID)
      })
      const { $dispose } = store
      store.$dispose = () => {
        $dispose()
        api.notifyComponentUpdate()
        api.sendInspectorTree(INSPECTOR_ID)
        api.sendInspectorState(INSPECTOR_ID)
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`)
      }
      // trigger an update so it can display new registered stores
      api.notifyComponentUpdate()
      api.sendInspectorTree(INSPECTOR_ID)
      api.sendInspectorState(INSPECTOR_ID)
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`)
    },
  )
}
let runningActionId = 0
let activeAction
/**
 * Patches a store to enable action grouping in devtools by wrapping the store with a Proxy that is passed as the
 * context of all actions, allowing us to set `runningAction` on each access and effectively associating any state
 * mutation to the action.
 *
 * @param store - store to patch
 * @param actionNames - list of actionst to patch
 */
function patchActionForGrouping(store, actionNames) {
  // original actions of the store as they are given by pinia. We are going to override them
  const actions = actionNames.reduce((storeActions, actionName) => {
    // use toRaw to avoid tracking #541
    storeActions[actionName] = toRaw(store)[actionName]
    return storeActions
  }, {})
  for (const actionName in actions) {
    store[actionName] = function () {
      // setActivePinia(store._p)
      // the running action id is incremented in a before action hook
      const _actionId = runningActionId
      const trackedStore = new Proxy(store, {
        get(...args) {
          activeAction = _actionId
          return Reflect.get(...args)
        },
        set(...args) {
          activeAction = _actionId
          return Reflect.set(...args)
        },
      })
      return actions[actionName].apply(trackedStore, arguments)
    }
  }
}
/**
 * pinia.use(devtoolsPlugin)
 */
function devtoolsPlugin({ app, store, options }) {
  // HMR module
  if (store.$id.startsWith('__hot:')) {
    return
  }
  // detect option api vs setup api
  if (options.state) {
    store._isOptionsAPI = true
  }
  // only wrap actions in option-defined stores as this technique relies on
  // wrapping the context of the action with a proxy
  if (typeof options.state === 'function') {
    patchActionForGrouping(
      // @ts-expect-error: can cast the store...
      store,
      Object.keys(options.actions),
    )
    const originalHotUpdate = store._hotUpdate
    // Upgrade the HMR to also update the new actions
    toRaw(store)._hotUpdate = function (newStore) {
      originalHotUpdate.apply(this, arguments)
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions))
    }
  }
  addStoreToDevtools(
    app,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    store,
  )
}

/**
 * Creates a Pinia instance to be used by the application
 */
function createPinia() {
  const scope = effectScope(true)
  // NOTE: here we could check the window object for a state and directly set it
  // if there is anything like it with Vue 3 SSR
  const state = scope.run(() => ref({}))
  let _p = []
  // plugins added before calling app.use(pinia)
  let toBeInstalled = []
  const pinia = markRaw({
    install(app) {
      // this allows calling useStore() outside of a component setup after
      // installing pinia's plugin
      setActivePinia(pinia)
      {
        pinia._a = app
        app.provide(piniaSymbol, pinia)
        app.config.globalProperties.$pinia = pinia
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production' && IS_CLIENT) {
          registerPiniaDevtools(app, pinia)
        }
        toBeInstalled.forEach((plugin) => _p.push(plugin))
        toBeInstalled = []
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin)
      } else {
        _p.push(plugin)
      }
      return this
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: new Map(),
    state,
  })
  // pinia devtools rely on dev only features so they cannot be forced unless
  // the dev build of Vue is used
  if (process.env.NODE_ENV !== 'production' && IS_CLIENT) {
    pinia.use(devtoolsPlugin)
  }
  return pinia
}
/**
 * Mutates in place `newState` with `oldState` to _hot update_ it. It will
 * remove any key not existing in `newState` and recursively merge plain
 * objects.
 *
 * @param newState - new state object to be patched
 * @param oldState - old state that should be used to patch newState
 * @returns - newState
 */
function patchObject(newState, oldState) {
  // no need to go through symbols because they cannot be serialized anyway
  for (const key in oldState) {
    const subPatch = oldState[key]
    // skip the whole sub tree
    if (!(key in newState)) {
      continue
    }
    const targetValue = newState[key]
    if (
      isPlainObject(targetValue) &&
      isPlainObject(subPatch) &&
      !isRef(subPatch) &&
      !isReactive(subPatch)
    ) {
      newState[key] = patchObject(targetValue, subPatch)
    } else {
      // objects are either a bit more complex (e.g. refs) or primitives, so we
      // just set the whole thing
      {
        newState[key] = subPatch
      }
    }
  }
  return newState
}

const noop = () => {}
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback)
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback)
    if (idx > -1) {
      subscriptions.splice(idx, 1)
      onCleanup()
    }
  }
  if (!detached && getCurrentInstance()) {
    onUnmounted(removeSubscription)
  }
  return removeSubscription
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args)
  })
}

function mergeReactiveObjects(target, patchToApply) {
  // no need to go through symbols because they cannot be serialized anyway
  for (const key in patchToApply) {
    const subPatch = patchToApply[key]
    const targetValue = target[key]
    if (
      isPlainObject(targetValue) &&
      isPlainObject(subPatch) &&
      !isRef(subPatch) &&
      !isReactive(subPatch)
    ) {
      target[key] = mergeReactiveObjects(targetValue, subPatch)
    } else {
      // @ts-expect-error: subPatch is a valid value
      target[key] = subPatch
    }
  }
  return target
}
const skipHydrateSymbol =
  process.env.NODE_ENV !== 'production'
    ? Symbol('pinia:skipHydration')
    : /* istanbul ignore next */ Symbol()
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol)
}
const { assign } = Object
function isComputed(o) {
  return !!(isRef(o) && o.effect)
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options
  const initialState = pinia.state.value[id]
  let store
  function setup() {
    if (!initialState && (!(process.env.NODE_ENV !== 'production') || !hot)) {
      /* istanbul ignore if */
      {
        pinia.state.value[id] = state ? state() : {}
      }
    }
    // avoid creating a state in pinia.state.value
    const localState =
      process.env.NODE_ENV !== 'production' && hot
        ? // use ref() to unwrap refs inside state TODO: check if this is still necessary
          toRefs(ref(state ? state() : {}).value)
        : toRefs(pinia.state.value[id])
    return assign(
      localState,
      actions,
      Object.keys(getters || {}).reduce((computedGetters, name) => {
        computedGetters[name] = markRaw(
          computed(() => {
            setActivePinia(pinia)
            // it was created just before
            const store = pinia._s.get(id)
            // @ts-expect-error
            // return getters![name].call(context, context)
            // TODO: avoid reading the getter while assigning with a global variable
            return getters[name].call(store, store)
          }),
        )
        return computedGetters
      }, {}),
    )
  }
  store = createSetupStore(id, setup, options, pinia, hot)
  store.$reset = function $reset() {
    const newState = state ? state() : {}
    // we use a patch to group all changes into one single subscription
    this.$patch(($state) => {
      assign($state, newState)
    })
  }
  return store
}
function createSetupStore($id, setup, options = {}, pinia, hot) {
  let scope
  const buildState = options.state
  const optionsForPlugin = assign({ actions: {} }, options)
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && !pinia._e.active) {
    throw new Error('Pinia destroyed')
  }
  // watcher options for $subscribe
  const $subscribeOptions = {
    deep: true,
    // flush: 'post',
  }
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production' && !isVue2) {
    $subscribeOptions.onTrigger = (event) => {
      /* istanbul ignore else */
      if (isListening) {
        debuggerEvents = event
        // avoid triggering this while the store is being built and the state is being set in pinia
      } else if (isListening == false && !store._hotUpdating) {
        // let patch send all the events together later
        /* istanbul ignore else */
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event)
        } else {
          console.error(
            '🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.',
          )
        }
      }
    }
  }
  // internal state
  let isListening // set to true at the end
  let isSyncListening // set to true at the end
  let subscriptions = markRaw([])
  let actionSubscriptions = markRaw([])
  let debuggerEvents
  const initialState = pinia.state.value[$id]
  // avoid setting the state for option stores are it is set
  // by the setup
  if (!buildState && !initialState && (!(process.env.NODE_ENV !== 'production') || !hot)) {
    /* istanbul ignore if */
    {
      pinia.state.value[$id] = {}
    }
  }
  const hotState = ref({})
  function $patch(partialStateOrMutator) {
    let subscriptionMutation
    isListening = isSyncListening = false
    // reset the debugger events since patches are sync
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      debuggerEvents = []
    }
    if (typeof partialStateOrMutator === 'function') {
      partialStateOrMutator(pinia.state.value[$id])
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents,
      }
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator)
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents,
      }
    }
    nextTick().then(() => {
      isListening = true
    })
    isSyncListening = true
    // because we paused the watcher, we need to manually call the subscriptions
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id])
  }
  /* istanbul ignore next */
  const $reset =
    process.env.NODE_ENV !== 'production'
      ? () => {
          throw new Error(
            `🍍: Store "${$id}" is build using the setup syntax and does not implement $reset().`,
          )
        }
      : noop
  function $dispose() {
    scope.stop()
    subscriptions = []
    actionSubscriptions = []
    pinia._s.delete($id)
  }
  /**
   * Wraps an action to handle subscriptions.
   *
   * @param name - name of the action
   * @param action - action to wrap
   * @returns a wrapped action to handle subscriptions
   */
  function wrapAction(name, action) {
    return function () {
      setActivePinia(pinia)
      const args = Array.from(arguments)
      const afterCallbackList = []
      const onErrorCallbackList = []
      function after(callback) {
        afterCallbackList.push(callback)
      }
      function onError(callback) {
        onErrorCallbackList.push(callback)
      }
      // @ts-expect-error
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError,
      })
      let ret
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args)
        // handle sync errors
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error)
        throw error
      }
      if (ret instanceof Promise) {
        return ret
          .then((value) => {
            triggerSubscriptions(afterCallbackList, value)
            return value
          })
          .catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error)
            return Promise.reject(error)
          })
      }
      // allow the afterCallback to override the return value
      triggerSubscriptions(afterCallbackList, ret)
      return ret
    }
  }
  const _hmrPayload = /*#__PURE__*/ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState,
  })
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options.detached, () =>
        stopWatcher(),
      )
      const stopWatcher = scope.run(() =>
        watch(
          () => pinia.state.value[$id],
          (state) => {
            if (options.flush === 'sync' ? isSyncListening : isListening) {
              callback(
                {
                  storeId: $id,
                  type: MutationType.direct,
                  events: debuggerEvents,
                },
                state,
              )
            }
          },
          assign({}, $subscribeOptions, options),
        ),
      )
      return removeSubscription
    },
    $dispose,
  }
  const store = reactive(
    assign(
      process.env.NODE_ENV !== 'production' && IS_CLIENT
        ? // devtools custom properties
          {
            _customProperties: markRaw(new Set()),
            _hmrPayload,
          }
        : {},
      partialStore,
      // must be added later
      // setupStore
    ),
  )
  // store the partial store now so the setup of stores can instantiate each other before they are finished without
  // creating infinite loops.
  pinia._s.set($id, store)
  // TODO: idea create skipSerialize that marks properties as non serializable and they are skipped
  const setupStore = pinia._e.run(() => {
    scope = effectScope()
    return scope.run(() => setup())
  })
  // overwrite existing actions to support $onAction
  for (const key in setupStore) {
    const prop = setupStore[key]
    if ((isRef(prop) && !isComputed(prop)) || isReactive(prop)) {
      // mark it as a piece of state to be serialized
      if (process.env.NODE_ENV !== 'production' && hot) {
        set(hotState.value, key, toRef(setupStore, key))
        // createOptionStore directly sets the state in pinia.state.value so we
        // can just skip that
      } else if (!buildState) {
        // in setup stores we must hydrate the state and sync pinia state tree with the refs the user just created
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key]
          } else {
            // probably a reactive object, lets recursively assign
            mergeReactiveObjects(prop, initialState[key])
          }
        }
        // transfer the ref to the pinia state to keep everything in sync
        /* istanbul ignore if */
        {
          pinia.state.value[$id][key] = prop
        }
      }
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        _hmrPayload.state.push(key)
      }
      // action
    } else if (typeof prop === 'function') {
      // @ts-expect-error: we are overriding the function we avoid wrapping if
      const actionValue =
        process.env.NODE_ENV !== 'production' && hot ? prop : wrapAction(key, prop)
      // this a hot module replacement store because the hotUpdate method needs
      // to do it with the right context
      /* istanbul ignore if */
      {
        // @ts-expect-error
        setupStore[key] = actionValue
      }
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        _hmrPayload.actions[key] = prop
      }
      // list actions so they can be used in plugins
      // @ts-expect-error
      optionsForPlugin.actions[key] = prop
    } else if (process.env.NODE_ENV !== 'production') {
      // add getters for devtools
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = buildState
          ? // @ts-expect-error
            options.getters[key]
          : prop
        if (IS_CLIENT) {
          const getters =
            // @ts-expect-error: it should be on the store
            setupStore._getters || (setupStore._getters = markRaw([]))
          getters.push(key)
        }
      }
    }
  }
  // add the state, getters, and action properties
  /* istanbul ignore if */
  {
    assign(store, setupStore)
    // allows retrieving reactive objects with `storeToRefs()`. Must be called after assigning to the reactive object.
    // Make `storeToRefs()` work with `reactive()` #799
    assign(toRaw(store), setupStore)
  }
  // use this instead of a computed with setter to be able to create it anywhere
  // without linking the computed lifespan to wherever the store is first
  // created.
  Object.defineProperty(store, '$state', {
    get: () =>
      process.env.NODE_ENV !== 'production' && hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && hot) {
        throw new Error('cannot set hotState')
      }
      $patch(($state) => {
        assign($state, state)
      })
    },
  })
  // add the hotUpdate before plugins to allow them to override it
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey]
          const oldStateSource = store.$state[stateKey]
          if (
            typeof newStateTarget === 'object' &&
            isPlainObject(newStateTarget) &&
            isPlainObject(oldStateSource)
          ) {
            patchObject(newStateTarget, oldStateSource)
          } else {
            // transfer the ref
            newStore.$state[stateKey] = oldStateSource
          }
        }
        // patch direct access properties to allow store.stateProperty to work as
        // store.$state.stateProperty
        set(store, stateKey, toRef(newStore.$state, stateKey))
      })
      // remove deleted state properties
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey)
        }
      })
      // avoid devtools logging this as a mutation
      isListening = false
      isSyncListening = false
      pinia.state.value[$id] = toRef(newStore._hmrPayload, 'hotState')
      isSyncListening = true
      nextTick().then(() => {
        isListening = true
      })
      for (const actionName in newStore._hmrPayload.actions) {
        const action = newStore[actionName]
        set(store, actionName, wrapAction(actionName, action))
      }
      // TODO: does this work in both setup and option store?
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName]
        const getterValue = buildState
          ? // special handling of options api
            computed(() => {
              setActivePinia(pinia)
              return getter.call(store, store)
            })
          : getter
        set(store, getterName, getterValue)
      }
      // remove deleted getters
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          del(store, key)
        }
      })
      // remove old actions
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          del(store, key)
        }
      })
      // update the values used in devtools and to allow deleting new properties later on
      store._hmrPayload = newStore._hmrPayload
      store._getters = newStore._getters
      store._hotUpdating = false
    })
    const nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false,
    }
    if (IS_CLIENT) {
      ;['_p', '_hmrPayload', '_getters', '_customProperties'].forEach((p) => {
        Object.defineProperty(store, p, {
          value: store[p],
          ...nonEnumerable,
        })
      })
    }
  }
  // apply all plugins
  pinia._p.forEach((extender) => {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production' && IS_CLIENT) {
      const extensions = scope.run(() =>
        extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin,
        }),
      )
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key))
      assign(store, extensions)
    } else {
      assign(
        store,
        scope.run(() =>
          extender({
            store,
            app: pinia._a,
            pinia,
            options: optionsForPlugin,
          }),
        ),
      )
    }
  })
  if (
    process.env.NODE_ENV !== 'production' &&
    store.$state &&
    typeof store.$state === 'object' &&
    typeof store.$state.constructor === 'function' &&
    !store.$state.constructor.toString().includes('[native code]')
  ) {
    console.warn(
      `[🍍]: The "state" must be a plain object. It cannot be\n` +
        `\tstate: () => new MyClass()\n` +
        `Found in store "${store.$id}".`,
    )
  }
  // only apply hydrate to option stores with an initial state in pinia
  if (initialState && buildState && options.hydrate) {
    options.hydrate(store.$state, initialState)
  }
  isListening = true
  isSyncListening = true
  return store
}
function defineStore(
  // TODO: add proper types from above
  idOrOptions,
  setup,
  setupOptions,
) {
  let id
  let options
  const isSetupStore = typeof setup === 'function'
  if (typeof idOrOptions === 'string') {
    id = idOrOptions
    // the option store setup will contain the actual options in this case
    options = isSetupStore ? setupOptions : setup
  } else {
    options = idOrOptions
    id = idOrOptions.id
  }
  function useStore(pinia, hot) {
    const currentInstance = getCurrentInstance()
    pinia =
      // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      (process.env.NODE_ENV === 'test' && activePinia && activePinia._testing ? null : pinia) ||
      (currentInstance && inject(piniaSymbol))
    if (pinia) setActivePinia(pinia)
    if (process.env.NODE_ENV !== 'production' && !activePinia) {
      throw new Error(
        `[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?\n` +
          `\tconst pinia = createPinia()\n` +
          `\tapp.use(pinia)\n` +
          `This will fail in production.`,
      )
    }
    pinia = activePinia
    if (!pinia._s.has(id)) {
      // creating the store registers it in `pinia._s`
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia)
      } else {
        createOptionsStore(id, options, pinia)
      }
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        // @ts-expect-error: not the right inferred type
        useStore._pinia = pinia
      }
    }
    const store = pinia._s.get(id)
    if (process.env.NODE_ENV !== 'production' && hot) {
      const hotId = '__hot:' + id
      const newStore = isSetupStore
        ? createSetupStore(hotId, setup, options, pinia, true)
        : createOptionsStore(hotId, assign({}, options), pinia, true)
      hot._hotUpdate(newStore)
      // cleanup the state properties and the store from the cache
      delete pinia.state.value[hotId]
      pinia._s.delete(hotId)
    }
    // save stores in instances to access them devtools
    if (
      process.env.NODE_ENV !== 'production' &&
      IS_CLIENT &&
      currentInstance &&
      currentInstance.proxy &&
      // avoid adding stores that are just built for hot module replacement
      !hot
    ) {
      const vm = currentInstance.proxy
      const cache = '_pStores' in vm ? vm._pStores : (vm._pStores = {})
      cache[id] = store
    }
    // StoreGeneric cannot be casted towards Store
    return store
  }
  useStore.$id = id
  return useStore
}

var r = createPinia(),
  e = defineStore({
    id: 'system',
    state: function () {
      return { name: '测试系统', count: 1 }
    },
    getters: {
      doubleCount: function (n) {
        return 2 * n.count
      },
    },
    actions: {
      setName: function (n) {
        this.name = n
      },
      addCount: function () {
        this.count++
      },
      resetCount: function () {
        this.count = 1
      },
      subCount: function () {
        this.count--
      },
    },
  })
var i = {
  useCounterStore: e,
  useCounterStoreWithOut: function () {
    return e(r)
  },
}
Object.freeze({ __proto__: null, Counter: i })
function o(n, t) {
  void 0 === t && (t = 'yyyy-mm-dd')
  var r,
    e = {
      y: (n = n
        ? /^\d{10}$/.test(null == n ? void 0 : n.toString().trim())
          ? new Date(1e3 * n)
          : 'string' == typeof n && /^\d+$/.test(n.trim())
          ? new Date(Number(n))
          : new Date('string' == typeof n ? n.replace(/-/g, '/') : n)
        : new Date())
        .getFullYear()
        .toString(),
      m: (n.getMonth() + 1).toString().padStart(2, '0'),
      d: n.getDate().toString().padStart(2, '0'),
      h: n.getHours().toString().padStart(2, '0'),
      M: n.getMinutes().toString().padStart(2, '0'),
      s: n.getSeconds().toString().padStart(2, '0'),
    }
  for (r in e) {
    var i,
      u = (new RegExp(''.concat(r, '+')).exec(t) || [])[0]
    u && ((i = 'y' === r && 2 === u.length ? 2 : 0), (t = t.replace(u, e[r].slice(i))))
  }
  return t
}
var s = Object.prototype.toString
function f(n) {
  return null != n
}
var a = Object.prototype.hasOwnProperty,
  c = Object.prototype.toString
function l(n) {
  return '[object Object]' === Object.prototype.toString.call(n)
}
function h(n) {
  return '[object Object]' === c.call(n)
}
var p = Object.freeze({}),
  d = Object.prototype.toString
var g = Object.freeze({
    __proto__: null,
    remove: function (n, t) {
      if (n.length && -1 < (t = n.indexOf(t))) return n.splice(t, 1)
    },
    isValidArrayIndex: function (n) {
      var t = parseFloat(String(n))
      return 0 <= t && Math.floor(t) === t && isFinite(n)
    },
    ensureArray: function (n) {
      return n || 0 === n ? (Array.isArray(n) ? n : [n]) : []
    },
    isArray: function (n) {
      return Array.isArray(n)
    },
    timeFormat: o,
    timeTransfer: function (n, t) {
      void 0 === t && (t = 'yyyy-mm-dd'),
        null == n && (n = Number(new Date())),
        10 == (n = parseInt(n)).toString().length && (n *= 1e3)
      var r = new Date().getTime() - n
      return (r = parseInt(String(r / 1e3))) < 300
        ? '刚刚'
        : 300 <= r && r < 3600
        ? ''.concat(parseInt(String(r / 60)), '分钟前')
        : 3600 <= r && r < 86400
        ? ''.concat(parseInt(String(r / 3600)), '小时前')
        : 86400 <= r && r < 2592e3
        ? ''.concat(parseInt(String(r / 86400)), '天前')
        : 2592e3 <= r && r < 62208e3
        ? o(n, t)
        : t
        ? o(n, 'yyyy')
        : 2592e3 <= r && r < 31536e3
        ? ''.concat(parseInt(String(r / 2592e3)), '个月前')
        : ''.concat(parseInt(String(r / 31536e3)), '年前')
    },
    checkIsEmpty: function (n) {
      return void 0 === n || 0 == +n || null === n || !n.toString().trim()
    },
    toNumber: function (n) {
      var t = parseFloat(n)
      return isNaN(t) ? n : t
    },
    isPromise: function (n) {
      return f(n) && 'function' == typeof n.then && 'function' == typeof n.catch
    },
    toRawType: function (n) {
      return s.call(n).slice(8, -1)
    },
    isRegExp: function (n) {
      return '[object RegExp]' === s.call(n)
    },
    isUndef: function (n) {
      return null == n
    },
    isDef: f,
    isTrue: function (n) {
      return !0 === n
    },
    isFalse: function (n) {
      return !1 === n
    },
    hasOwn: function (n, t) {
      return a.call(n, t)
    },
    makeMap: function (n, t) {
      for (var r = Object.create(null), e = n.split(','), i = 0; i < e.length; i++) r[e[i]] = !0
      return t
        ? function (n) {
            return r[n.toLowerCase()]
          }
        : function (n) {
            return r[n]
          }
    },
    isObject: l,
    isPlainObject: h,
    emptyObject: p,
    toString: function (n) {
      return Array.isArray(n) || (h(n) && n.toString === d)
        ? null == n
          ? ''
          : JSON.stringify(n, null, 2)
        : null == n
        ? ''
        : String(n)
    },
    websFunc: function () {
      return 'websFunc'
    },
  }),
  v = /^1[3456789][0-9]{9}$/,
  y = /^[1-9]\d{5}$/,
  _ = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
  m = /^-?\d+\.?\d+$/,
  w = /^(1|0(\.(\d?)(\d?)([1-9]?))?)$/,
  b = /^[0-9]*$/,
  x = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  A = /^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$/,
  N = /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/,
  S = /^[a-zA-Z]\w{5,17}$/,
  O = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/,
  E = /^\d{4}-\d{1,2}-\d{1,2}/,
  F =
    /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/,
  j = /[1-9][0-9]{4,}/,
  D = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/,
  q = /^([1-9]{1})(\d{15}|\d{18})$/,
  R = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  k = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/,
  C =
    /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/,
  z =
    /^[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][1-9DF][1-9ABCDEFGHJKLMNPQRSTUVWXYZ]\d{3}[1-9DF]$/,
  I =
    /^[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][\dABCDEFGHJKLNMxPQRSTUVWXYZ]{5}$/,
  $ = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
  P = /^(\-|\+)?\d+(\.\d+)?$/,
  M =
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/,
  T = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/,
  U = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
  L =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/,
  Z = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
  B =
    /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/,
  W = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/,
  V = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
  H = /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/,
  J =
    /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i,
  G = /^-?\d+(,\d{3})*(\.\d{1,2})?$/,
  K = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/,
  Y = /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/,
  X = /^\d+(?:\.\d+){2}$/,
  Q = /^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/,
  nn = /^([a-f\d]{32}|[A-F\d]{32})$/,
  tn = /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/,
  rn = /^[GCDZTSPKXLY1-9]\d{1,4}$/
Object.freeze({
  __proto__: null,
  phone: v,
  smsCode: y,
  email: _,
  float_number: m,
  zero_dot: w,
  int_number: b,
  number: /^(\-|\+)?\d+(\.\d+)?$/,
  id_card: x,
  id_card_one: A,
  id_card_two: N,
  password: S,
  strong_password: O,
  date_day: E,
  date: F,
  qq: j,
  zipcode: D,
  bank_card: q,
  ipv4: R,
  weichat_account: k,
  passport: C,
  new_energy: z,
  energy: I,
  host: $,
  white: /\n\s*\r/,
  num: P,
  url: M,
  mobile: T,
  money: U,
  car_num: L,
  hex_color: Z,
  chinese: B,
  english: W,
  time24: V,
  time12: H,
  base64: J,
  money_all: G,
  imgUrl: K,
  video_url: Y,
  version: X,
  GUID_UUID: Q,
  md5: nn,
  credit_code: tn,
  train_number: rn,
  isPhone: function (n) {
    return v.test(n.toString())
  },
  isEmail: function (n) {
    return _.test(n.toString())
  },
  isSmsCode: function (n) {
    return y.test(n.toString())
  },
  isFloatName: function (n) {
    return m.test(n.toString())
  },
  isZeroDot: function (n) {
    return w.test(n.toString())
  },
  isIntNumber: function (n) {
    return b.test(n.toString())
  },
  isIdCard: function (n) {
    return x.test(n.toString())
  },
  isIdCardOne: function (n) {
    return A.test(n.toString())
  },
  isIdCardTwo: function (n) {
    return N.test(n.toString())
  },
  isPassword: function (n) {
    return S.test(n.toString())
  },
  isStrongPassword: function (n) {
    return O.test(n.toString())
  },
  isDateDay: function (n) {
    return E.test(n.toString())
  },
  isDate: function (n) {
    return F.test(n.toString())
  },
  isQQ: function (n) {
    return j.test(n.toString())
  },
  isZipCode: function (n) {
    return D.test(n.toString())
  },
  isBankCard: function (n) {
    return q.test(n.toString())
  },
  isIpv4: function (n) {
    return R.test(n.toString())
  },
  isWechatAccount: function (n) {
    return k.test(n.toString())
  },
  isPassport: function (n) {
    return C.test(n.toString())
  },
  isNewEnergy: function (n) {
    return z.test(n.toString())
  },
  isEnergy: function (n) {
    return I.test(n.toString())
  },
  isHost: function (n) {
    return $.test(n.toString())
  },
  isNum: function (n) {
    return P.test(n.toString())
  },
  isUrl: function (n) {
    return M.test(n.toString())
  },
  isMobile: function (n) {
    return T.test(n.toString())
  },
  isMoney: function (n) {
    return U.test(n.toString())
  },
  isCarNum: function (n) {
    return L.test(n.toString())
  },
  isHexColor: function (n) {
    return Z.test(n.toString())
  },
  isChinese: function (n) {
    return B.test(n.toString())
  },
  isEnglish: function (n) {
    return W.test(n.toString())
  },
  isTime24: function (n) {
    return V.test(n.toString())
  },
  isTime12: function (n) {
    return H.test(n.toString())
  },
  isBase64: function (n) {
    return J.test(n.toString())
  },
  isMoneyAll: function (n) {
    return G.test(n.toString())
  },
  isImgUrl: function (n) {
    return K.test(n.toString())
  },
  isVideoUrl: function (n) {
    return Y.test(n.toString())
  },
  isVersion: function (n) {
    return X.test(n.toString())
  },
  isGuidOrUuid: function (n) {
    return Q.test(n.toString())
  },
  isMd5: function (n) {
    return nn.test(n.toString())
  },
  isCreditCode: function (n) {
    return tn.test(n.toString())
  },
  isTrainNum: function (n) {
    return rn.test(n.toString())
  },
})
function un() {
  return (un =
    Object.assign ||
    function (n) {
      for (var t = 1; t < arguments.length; t++) {
        var r,
          e = arguments[t]
        for (r in e) Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r])
      }
      return n
    }).apply(this, arguments)
}
function on(n) {
  return (on = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (n) {
        return n.__proto__ || Object.getPrototypeOf(n)
      })(n)
}
function sn(n, t) {
  return (sn =
    Object.setPrototypeOf ||
    function (n, t) {
      return (n.__proto__ = t), n
    })(n, t)
}
function fn() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return !1
  if (Reflect.construct.sham) return !1
  if ('function' == typeof Proxy) return !0
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0
  } catch (n) {
    return !1
  }
}
function an(n, t, r) {
  return (an = fn()
    ? Reflect.construct
    : function (n, t, r) {
        var e = [null]
        return (
          e.push.apply(e, t), (t = new (Function.bind.apply(n, e))()), r && sn(t, r.prototype), t
        )
      }).apply(null, arguments)
}
function cn(n) {
  var t = 'function' == typeof Map ? new Map() : void 0
  return (cn = function (n) {
    if (
      null === n ||
      !(function (n) {
        return -1 !== Function.toString.call(n).indexOf('[native code]')
      })(n)
    )
      return n
    if ('function' != typeof n)
      throw new TypeError('Super expression must either be null or a function')
    if (void 0 !== t) {
      if (t.has(n)) return t.get(n)
      t.set(n, r)
    }
    function r() {
      return an(n, arguments, on(this).constructor)
    }
    return (
      (r.prototype = Object.create(n.prototype, {
        constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 },
      })),
      sn(r, n)
    )
  })(n)
}
var ln = /%[sdj%]/g,
  hn = function () {}
function pn(n) {
  if (!n || !n.length) return null
  var t = {}
  return (
    n.forEach(function (n) {
      var r = n.field
      ;(t[r] = t[r] || []), t[r].push(n)
    }),
    t
  )
}
function dn(n) {
  for (var t = arguments.length, r = new Array(1 < t ? t - 1 : 0), e = 1; e < t; e++)
    r[e - 1] = arguments[e]
  var i = 0,
    u = r.length
  return 'function' == typeof n
    ? n.apply(null, r)
    : 'string' == typeof n
    ? n.replace(ln, function (n) {
        if ('%%' === n) return '%'
        if (u <= i) return n
        switch (n) {
          case '%s':
            return String(r[i++])
          case '%d':
            return Number(r[i++])
          case '%j':
            try {
              return JSON.stringify(r[i++])
            } catch (n) {
              return '[Circular]'
            }
            break
          default:
            return n
        }
      })
    : n
}
function gn(n, t) {
  return (
    null == n ||
    !('array' !== t || !Array.isArray(n) || n.length) ||
    !(
      !(function (n) {
        return (
          'string' === n ||
          'url' === n ||
          'hex' === n ||
          'email' === n ||
          'date' === n ||
          'pattern' === n
        )
      })(t) ||
      'string' != typeof n ||
      n
    )
  )
}
function vn(n, t, r) {
  var e = [],
    i = 0,
    u = n.length
  function o(n) {
    e.push.apply(e, n || []), ++i === u && r(e)
  }
  n.forEach(function (n) {
    t(n, o)
  })
}
function yn(n, t, r) {
  var e = 0,
    i = n.length
  !(function u(o) {
    o && o.length ? r(o) : ((o = e), (e += 1), o < i ? t(n[o], u) : r([]))
  })([])
}
'undefined' != typeof process &&
  process.env &&
  'undefined' != typeof window &&
  'undefined' != typeof document &&
  (hn = function (n, t) {
    'undefined' != typeof console &&
      console.warn &&
      'undefined' == typeof ASYNC_VALIDATOR_NO_WARNING &&
      t.every(function (n) {
        return 'string' == typeof n
      })
  })
var _n = (function (n) {
  function t(t, r) {
    var e = n.call(this, 'Async Validation Error') || this
    return (e.errors = t), (e.fields = r), e
  }
  return (
    (function (n, t) {
      ;(n.prototype = Object.create(t.prototype)), sn((n.prototype.constructor = n), t)
    })(t, n),
    t
  )
})(cn(Error))
function mn(n, t, r, e, i) {
  if (t.first)
    return (
      (c = new Promise(function (t, u) {
        yn(
          (function (n) {
            var t = []
            return (
              Object.keys(n).forEach(function (r) {
                t.push.apply(t, n[r] || [])
              }),
              t
            )
          })(n),
          r,
          function (n) {
            return e(n), n.length ? u(new _n(n, pn(n))) : t(i)
          },
        )
      })).catch(function (n) {
        return n
      }),
      c
    )
  var u = !0 === t.firstFields ? Object.keys(n) : t.firstFields || [],
    o = Object.keys(n),
    s = o.length,
    f = 0,
    a = [],
    c = new Promise(function (t, c) {
      function l(n) {
        if ((a.push.apply(a, n), ++f === s)) return e(a), a.length ? c(new _n(a, pn(a))) : t(i)
      }
      o.length || (e(a), t(i)),
        o.forEach(function (t) {
          var e = n[t]
          ;(-1 !== u.indexOf(t) ? yn : vn)(e, r, l)
        })
    })
  return (
    c.catch(function (n) {
      return n
    }),
    c
  )
}
function wn(n, t) {
  return function (r) {
    var e = n.fullFields
      ? (function (n, t) {
          for (var r = n, e = 0; e < t.length; e++) {
            if (null == r) return r
            r = r[t[e]]
          }
          return r
        })(t, n.fullFields)
      : t[r.field || n.fullField]
    return (function (n) {
      return !(!n || void 0 === n.message)
    })(r)
      ? ((r.field = r.field || n.fullField), (r.fieldValue = e), r)
      : { message: 'function' == typeof r ? r() : r, fieldValue: e, field: r.field || n.fullField }
  }
}
function bn(n, t) {
  if (t)
    for (var r in t) {
      var e
      t.hasOwnProperty(r) &&
        ('object' == typeof (e = t[r]) && 'object' == typeof n[r]
          ? (n[r] = un({}, n[r], e))
          : (n[r] = e))
    }
  return n
}
var xn = function (n, t, r, e, i, u) {
    !n.required ||
      (r.hasOwnProperty(n.field) && !gn(t, u || n.type)) ||
      e.push(dn(i.messages.required, n.fullField))
  },
  An = {
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
    url: new RegExp(
      '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
      'i',
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
  },
  Nn = {
    integer: function (n) {
      return Nn.number(n) && parseInt(n, 10) === n
    },
    float: function (n) {
      return Nn.number(n) && !Nn.integer(n)
    },
    array: function (n) {
      return Array.isArray(n)
    },
    regexp: function (n) {
      if (n instanceof RegExp) return !0
      try {
        return !!new RegExp(n)
      } catch (n) {
        return !1
      }
    },
    date: function (n) {
      return (
        'function' == typeof n.getTime &&
        'function' == typeof n.getMonth &&
        'function' == typeof n.getYear &&
        !isNaN(n.getTime())
      )
    },
    number: function (n) {
      return !isNaN(n) && 'number' == typeof n
    },
    object: function (n) {
      return 'object' == typeof n && !Nn.array(n)
    },
    method: function (n) {
      return 'function' == typeof n
    },
    email: function (n) {
      return 'string' == typeof n && n.length <= 320 && !!n.match(An.email)
    },
    url: function (n) {
      return 'string' == typeof n && n.length <= 2048 && !!n.match(An.url)
    },
    hex: function (n) {
      return 'string' == typeof n && !!n.match(An.hex)
    },
  },
  Sn = {
    required: xn,
    whitespace: function (n, t, r, e, i) {
      ;(!/^\s+$/.test(t) && '' !== t) || e.push(dn(i.messages.whitespace, n.fullField))
    },
    type: function (n, t, r, e, i) {
      n.required && void 0 === t
        ? xn(n, t, r, e, i)
        : ((r = n.type),
          -1 <
          [
            'integer',
            'float',
            'array',
            'regexp',
            'object',
            'method',
            'email',
            'number',
            'date',
            'url',
            'hex',
          ].indexOf(r)
            ? Nn[r](t) || e.push(dn(i.messages.types[r], n.fullField, n.type))
            : r && typeof t !== n.type && e.push(dn(i.messages.types[r], n.fullField, n.type)))
    },
    range: function (n, t, r, e, i) {
      var u = 'number' == typeof n.len,
        o = 'number' == typeof n.min,
        s = 'number' == typeof n.max,
        f = t,
        a = null,
        c = 'number' == typeof t,
        l = 'string' == typeof t,
        h = Array.isArray(t)
      if ((c ? (a = 'number') : l ? (a = 'string') : h && (a = 'array'), !a)) return !1
      h && (f = t.length),
        l && (f = t.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '_').length),
        u
          ? f !== n.len && e.push(dn(i.messages[a].len, n.fullField, n.len))
          : o && !s && f < n.min
          ? e.push(dn(i.messages[a].min, n.fullField, n.min))
          : s && !o && f > n.max
          ? e.push(dn(i.messages[a].max, n.fullField, n.max))
          : o &&
            s &&
            (f < n.min || f > n.max) &&
            e.push(dn(i.messages[a].range, n.fullField, n.min, n.max))
    },
    enum: function (n, t, r, e, i) {
      ;(n.enum = Array.isArray(n.enum) ? n.enum : []),
        -1 === n.enum.indexOf(t) && e.push(dn(i.messages.enum, n.fullField, n.enum.join(', ')))
    },
    pattern: function (n, t, r, e, i) {
      n.pattern &&
        (n.pattern instanceof RegExp
          ? ((n.pattern.lastIndex = 0),
            n.pattern.test(t) || e.push(dn(i.messages.pattern.mismatch, n.fullField, t, n.pattern)))
          : 'string' != typeof n.pattern ||
            new RegExp(n.pattern).test(t) ||
            e.push(dn(i.messages.pattern.mismatch, n.fullField, t, n.pattern)))
    },
  },
  On = function (n, t, r, e, i) {
    var u = n.type,
      o = []
    if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
      if (gn(t, u) && !n.required) return r()
      Sn.required(n, t, e, o, i, u), gn(t, u) || Sn.type(n, t, e, o, i)
    }
    r(o)
  },
  En = {
    string: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn(t, 'string') && !n.required) return r()
        Sn.required(n, t, e, u, i, 'string'),
          gn(t, 'string') ||
            (Sn.type(n, t, e, u, i),
            Sn.range(n, t, e, u, i),
            Sn.pattern(n, t, e, u, i),
            !0 === n.whitespace && Sn.whitespace(n, t, e, u, i))
      }
      r(u)
    },
    method: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn(t) && !n.required) return r()
        Sn.required(n, t, e, u, i), void 0 !== t && Sn.type(n, t, e, u, i)
      }
      r(u)
    },
    number: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn((t = '' === t ? void 0 : t)) && !n.required) return r()
        Sn.required(n, t, e, u, i),
          void 0 !== t && (Sn.type(n, t, e, u, i), Sn.range(n, t, e, u, i))
      }
      r(u)
    },
    boolean: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn(t) && !n.required) return r()
        Sn.required(n, t, e, u, i), void 0 !== t && Sn.type(n, t, e, u, i)
      }
      r(u)
    },
    regexp: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn(t) && !n.required) return r()
        Sn.required(n, t, e, u, i), gn(t) || Sn.type(n, t, e, u, i)
      }
      r(u)
    },
    integer: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn(t) && !n.required) return r()
        Sn.required(n, t, e, u, i),
          void 0 !== t && (Sn.type(n, t, e, u, i), Sn.range(n, t, e, u, i))
      }
      r(u)
    },
    float: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn(t) && !n.required) return r()
        Sn.required(n, t, e, u, i),
          void 0 !== t && (Sn.type(n, t, e, u, i), Sn.range(n, t, e, u, i))
      }
      r(u)
    },
    array: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (null == t && !n.required) return r()
        Sn.required(n, t, e, u, i, 'array'),
          null != t && (Sn.type(n, t, e, u, i), Sn.range(n, t, e, u, i))
      }
      r(u)
    },
    object: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn(t) && !n.required) return r()
        Sn.required(n, t, e, u, i), void 0 !== t && Sn.type(n, t, e, u, i)
      }
      r(u)
    },
    enum: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn(t) && !n.required) return r()
        Sn.required(n, t, e, u, i), void 0 !== t && Sn.enum(n, t, e, u, i)
      }
      r(u)
    },
    pattern: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn(t, 'string') && !n.required) return r()
        Sn.required(n, t, e, u, i), gn(t, 'string') || Sn.pattern(n, t, e, u, i)
      }
      r(u)
    },
    date: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn(t, 'date') && !n.required) return r()
        Sn.required(n, t, e, u, i),
          gn(t, 'date') ||
            ((t = t instanceof Date ? t : new Date(t)),
            Sn.type(n, t, e, u, i),
            t && Sn.range(n, t.getTime(), e, u, i))
      }
      r(u)
    },
    url: On,
    hex: On,
    email: On,
    required: function (n, t, r, e, i) {
      var u = [],
        o = Array.isArray(t) ? 'array' : typeof t
      Sn.required(n, t, e, u, i, o), r(u)
    },
    any: function (n, t, r, e, i) {
      var u = []
      if (n.required || (!n.required && e.hasOwnProperty(n.field))) {
        if (gn(t) && !n.required) return r()
        Sn.required(n, t, e, u, i)
      }
      r(u)
    },
  }
function Fn() {
  return {
    default: 'Validation error on field %s',
    required: '%s is required',
    enum: '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid',
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      boolean: '%s is not a %s',
      integer: '%s is not an %s',
      float: '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s',
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters',
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s',
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length',
    },
    pattern: { mismatch: '%s value %s does not match pattern %s' },
    clone: function () {
      var n = JSON.parse(JSON.stringify(this))
      return (n.clone = this.clone), n
    },
  }
}
var jn,
  Dn,
  qn = Fn(),
  Rn = (function () {
    function n(n) {
      ;(this.rules = null), (this._messages = qn), this.define(n)
    }
    var t = n.prototype
    return (
      (t.define = function (n) {
        var t = this
        if (!n) throw new Error('Cannot configure a schema with no rules')
        if ('object' != typeof n || Array.isArray(n)) throw new Error('Rules must be an object')
        ;(this.rules = {}),
          Object.keys(n).forEach(function (r) {
            var e = n[r]
            t.rules[r] = Array.isArray(e) ? e : [e]
          })
      }),
      (t.messages = function (n) {
        return n && (this._messages = bn(Fn(), n)), this._messages
      }),
      (t.validate = function (t, r, e) {
        var i = this,
          u = t,
          o = (r = void 0 === r ? {} : r),
          s = (e = void 0 === e ? function () {} : e)
        if (
          ('function' == typeof o && ((s = o), (o = {})),
          !this.rules || 0 === Object.keys(this.rules).length)
        )
          return s && s(null, u), Promise.resolve(u)
        o.messages
          ? (bn((r = (r = this.messages()) === qn ? Fn() : r), o.messages), (o.messages = r))
          : (o.messages = this.messages())
        var f = {},
          a =
            ((o.keys || Object.keys(this.rules)).forEach(function (n) {
              var r = i.rules[n],
                e = u[n]
              r.forEach(function (r) {
                'function' == typeof r.transform &&
                  (u === t && (u = un({}, u)), (e = u[n] = r.transform(e))),
                  ((r = 'function' == typeof r ? { validator: r } : un({}, r)).validator =
                    i.getValidationMethod(r)),
                  r.validator &&
                    ((r.field = n),
                    (r.fullField = r.fullField || n),
                    (r.type = i.getType(r)),
                    (f[n] = f[n] || []),
                    f[n].push({ rule: r, value: e, source: u, field: n }))
              })
            }),
            {})
        return mn(
          f,
          o,
          function (t, r) {
            var e,
              i,
              s = t.rule
            function f(i) {
              void 0 === i && (i = [])
              i = Array.isArray(i) ? i : [i]
              var f =
                (!o.suppressWarning && i.length && n.warning('async-validator:', i),
                (i = i.length && void 0 !== s.message ? [].concat(s.message) : i).map(wn(s, u)))
              if (o.first && f.length) return (a[s.field] = 1), r(f)
              if (e) {
                if (s.required && !t.value)
                  return (
                    void 0 !== s.message
                      ? (f = [].concat(s.message).map(wn(s, u)))
                      : o.error && (f = [o.error(s, dn(o.messages.required, s.field))]),
                    r(f)
                  )
                var c = {},
                  l =
                    (s.defaultField &&
                      Object.keys(t.value).map(function (n) {
                        c[n] = s.defaultField
                      }),
                    (c = un({}, c, t.rule.fields)),
                    {})
                i =
                  (Object.keys(c).forEach(function (n) {
                    var t = c[n]
                    t = Array.isArray(t) ? t : [t]
                    l[n] = t.map(
                      function (n, t) {
                        return un({}, t, {
                          fullField: s.fullField + '.' + n,
                          fullFields: s.fullFields ? [].concat(s.fullFields, [n]) : [n],
                        })
                      }.bind(null, n),
                    )
                  }),
                  new n(l))
                i.messages(o.messages),
                  t.rule.options &&
                    ((t.rule.options.messages = o.messages), (t.rule.options.error = o.error)),
                  i.validate(t.value, t.rule.options || o, function (n) {
                    var t = []
                    f && f.length && t.push.apply(t, f),
                      n && n.length && t.push.apply(t, n),
                      r(t.length ? t : null)
                  })
              } else r(f)
            }
            ;(e =
              !(
                ('object' !== s.type && 'array' !== s.type) ||
                ('object' != typeof s.fields && 'object' != typeof s.defaultField)
              ) &&
              (s.required || (!s.required && t.value))),
              (s.field = t.field),
              s.asyncValidator
                ? (i = s.asyncValidator(s, t.value, f, t.source, o))
                : s.validator &&
                  (!0 === (i = s.validator(s, t.value, f, t.source, o))
                    ? f()
                    : !1 === i
                    ? f(
                        'function' == typeof s.message
                          ? s.message(s.fullField || s.field)
                          : s.message || (s.fullField || s.field) + ' fails',
                      )
                    : i instanceof Array
                    ? f(i)
                    : i instanceof Error && f(i.message)),
              i &&
                i.then &&
                i.then(function () {
                  return f()
                }, f)
          },
          function (n) {
            !(function (n) {
              for (var t, r, e = [], i = 0; i < n.length; i++)
                (r = n[i]), Array.isArray(r) ? (e = e.concat.apply(e, r)) : e.push(r)
              e.length ? ((t = pn(e)), s(e, t)) : s(null, u)
            })(n)
          },
          u,
        )
      }),
      (t.getType = function (n) {
        if (
          (void 0 === n.type && n.pattern instanceof RegExp && (n.type = 'pattern'),
          'function' != typeof n.validator && n.type && !En.hasOwnProperty(n.type))
        )
          throw new Error(dn('Unknown rule type %s', n.type))
        return n.type || 'string'
      }),
      (t.getValidationMethod = function (n) {
        if ('function' == typeof n.validator) return n.validator
        var t = Object.keys(n),
          r = t.indexOf('message')
        return (
          -1 !== r && t.splice(r, 1),
          1 === t.length && 'required' === t[0] ? En.required : En[this.getType(n)] || void 0
        )
      }),
      n
    )
  })()
;(Rn.register = function (n, t) {
  if ('function' != typeof t)
    throw new Error('Cannot register a validator by type, validator is not a function')
  En[n] = t
}),
  (Rn.warning = hn),
  (Rn.messages = qn),
  (Rn.validators = En),
  (function () {
    function n(n) {
      this.mul = !1
      var t = n.source,
        r = n.rule
      n = n.mul
      if (!l(t)) throw new Error('source need an object')
      if (!l(r)) throw new Error('rule need an object')
      ;(this.source = t), (this.rule = r), (this.mul = n)
    }
    return (
      (n.prototype.validate = function (n) {
        var t = this.rule,
          r = this.source,
          e = this.mul
        new Rn(t).validate(r, function (t) {
          return t
            ? n(
                !1,
                e
                  ? t.map(function (n) {
                      return { filed: n.field, msg: n.message }
                    })
                  : [{ filed: t[0].field, msg: t[0].message }],
              )
            : n(!0, [])
        })
      }),
      n
    )
  })()
var Cn =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : {},
  zn = { exports: {} }
;(jn = zn),
  (Dn = zn.exports),
  function () {
    var n,
      t,
      r,
      e,
      i = 'Expected a function',
      u = '__lodash_hash_undefined__',
      o = '__lodash_placeholder__',
      s = 128,
      f = 9007199254740991,
      a = NaN,
      c = 4294967295,
      l = [
        ['ary', s],
        ['bind', 1],
        ['bindKey', 2],
        ['curry', 8],
        ['curryRight', 16],
        ['flip', 512],
        ['partial', 32],
        ['partialRight', 64],
        ['rearg', 256],
      ],
      h = '[object Arguments]',
      p = '[object Array]',
      d = '[object Boolean]',
      g = '[object Date]',
      v = '[object Error]',
      y = '[object Function]',
      _ = '[object GeneratorFunction]',
      m = '[object Map]',
      w = '[object Number]',
      b = '[object Object]',
      x = '[object Promise]',
      A = '[object RegExp]',
      N = '[object Set]',
      S = '[object String]',
      O = '[object Symbol]',
      E = '[object WeakMap]',
      F = '[object ArrayBuffer]',
      j = '[object DataView]',
      D = '[object Float32Array]',
      q = '[object Float64Array]',
      R = '[object Int8Array]',
      k = '[object Int16Array]',
      C = '[object Int32Array]',
      z = '[object Uint8Array]',
      I = '[object Uint8ClampedArray]',
      $ = '[object Uint16Array]',
      P = '[object Uint32Array]',
      M = /\b__p \+= '';/g,
      T = /\b(__p \+=) '' \+/g,
      U = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
      L = /&(?:amp|lt|gt|quot|#39);/g,
      Z = /[&<>"']/g,
      B = RegExp(L.source),
      W = RegExp(Z.source),
      V = /<%-([\s\S]+?)%>/g,
      H = /<%([\s\S]+?)%>/g,
      J = /<%=([\s\S]+?)%>/g,
      G = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      K = /^\w*$/,
      Y =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      X = /[\\^$.*+?()[\]{}|]/g,
      Q = RegExp(X.source),
      nn = /^\s+/,
      tn = /\s/,
      rn = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      en = /\{\n\/\* \[wrapped with (.+)\] \*/,
      un = /,? & /,
      on = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
      sn = /[()=,{}\[\]\/\s]/,
      fn = /\\(\\)?/g,
      an = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      cn = /\w*$/,
      ln = /^[-+]0x[0-9a-f]+$/i,
      hn = /^0b[01]+$/i,
      pn = /^\[object .+?Constructor\]$/,
      dn = /^0o[0-7]+$/i,
      gn = /^(?:0|[1-9]\d*)$/,
      vn = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      yn = /($^)/,
      _n = /['\n\r\u2028\u2029\\]/g,
      mn = '\\ud800-\\udfff',
      wn = '\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff',
      bn = '\\ufe0e\\ufe0f',
      xn = '[' + mn + ']',
      An =
        '[' +
        (qn =
          '\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000') +
        ']',
      Nn = '[' + wn + ']',
      Sn = '[' + (t = '\\u2700-\\u27bf') + ']',
      On = '[' + (Kn = 'a-z\\xdf-\\xf6\\xf8-\\xff') + ']',
      En = '\\u200d',
      Fn =
        '(?:' +
        On +
        '|' +
        (qn = '[^' + mn + qn + '\\d+' + t + Kn + (r = 'A-Z\\xc0-\\xd6\\xd8-\\xde') + ']') +
        ')',
      qn = '(?:' + (r = '[' + r + ']') + '|' + qn + ')',
      Rn = "(?:['’](?:d|ll|m|re|s|t|ve))?",
      kn = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
      zn =
        (zn = '[' + bn + ']?') +
        (In = '(?:' + Nn + '|' + (t = '\\ud83c[\\udffb-\\udfff]') + ')?') +
        '(?:' +
        En +
        '(?:' +
        [
          (Kn = '[^' + mn + ']'),
          (Yn = '(?:\\ud83c[\\udde6-\\uddff]){2}'),
          (e = '[\\ud800-\\udbff][\\udc00-\\udfff]'),
        ].join('|') +
        ')' +
        zn +
        In +
        ')*',
      In = '(?:' + [Sn, Yn, e].join('|') + ')' + zn,
      $n = ((Sn = '(?:' + [Kn + Nn + '?', Nn, Yn, e, xn].join('|') + ')'), RegExp("['’]", 'g')),
      Pn = RegExp(Nn, 'g'),
      Mn = RegExp(t + '(?=' + t + ')|' + Sn + zn, 'g'),
      Tn = RegExp(
        [
          r + '?' + On + '+' + Rn + '(?=' + [An, r, '$'].join('|') + ')',
          qn + '+' + kn + '(?=' + [An, r + Fn, '$'].join('|') + ')',
          r + '?' + Fn + '+' + Rn,
          r + '+' + kn,
          '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
          '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
          '\\d+',
          In,
        ].join('|'),
        'g',
      ),
      Un = RegExp('[' + En + mn + wn + bn + ']'),
      Ln = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
      Zn = [
        'Array',
        'Buffer',
        'DataView',
        'Date',
        'Error',
        'Float32Array',
        'Float64Array',
        'Function',
        'Int8Array',
        'Int16Array',
        'Int32Array',
        'Map',
        'Math',
        'Object',
        'Promise',
        'RegExp',
        'Set',
        'String',
        'Symbol',
        'TypeError',
        'Uint8Array',
        'Uint8ClampedArray',
        'Uint16Array',
        'Uint32Array',
        'WeakMap',
        '_',
        'clearTimeout',
        'isFinite',
        'parseInt',
        'setTimeout',
      ],
      Bn = -1,
      Wn = {},
      Vn =
        ((Wn[D] = Wn[q] = Wn[R] = Wn[k] = Wn[C] = Wn[z] = Wn[I] = Wn[$] = Wn[P] = !0),
        (Wn[h] =
          Wn[p] =
          Wn[F] =
          Wn[d] =
          Wn[j] =
          Wn[g] =
          Wn[v] =
          Wn[y] =
          Wn[m] =
          Wn[w] =
          Wn[b] =
          Wn[A] =
          Wn[N] =
          Wn[S] =
          Wn[E] =
            !1),
        {}),
      Hn =
        ((Vn[h] =
          Vn[p] =
          Vn[F] =
          Vn[j] =
          Vn[d] =
          Vn[g] =
          Vn[D] =
          Vn[q] =
          Vn[R] =
          Vn[k] =
          Vn[C] =
          Vn[m] =
          Vn[w] =
          Vn[b] =
          Vn[A] =
          Vn[N] =
          Vn[S] =
          Vn[O] =
          Vn[z] =
          Vn[I] =
          Vn[$] =
          Vn[P] =
            !0),
        (Vn[v] = Vn[y] = Vn[E] = !1),
        { '\\': '\\', "'": "'", '\n': 'n', '\r': 'r', '\u2028': 'u2028', '\u2029': 'u2029' }),
      Jn = parseFloat,
      Gn = parseInt,
      Kn = 'object' == typeof Cn && Cn && Cn.Object === Object && Cn,
      Yn = 'object' == typeof self && self && self.Object === Object && self,
      Xn = Kn || Yn || Function('return this')(),
      Qn = (e = Dn && !Dn.nodeType && Dn) && jn && !jn.nodeType && jn,
      nt = Qn && Qn.exports === e,
      tt = nt && Kn.process,
      rt =
        ((xn = (function () {
          try {
            var n = Qn && Qn.require && Qn.require('util').types
            return n || (tt && tt.binding && tt.binding('util'))
          } catch (n) {}
        })()),
        xn && xn.isArrayBuffer),
      et = xn && xn.isDate,
      it = xn && xn.isMap,
      ut = xn && xn.isRegExp,
      ot = xn && xn.isSet,
      st = xn && xn.isTypedArray
    function ft(n, t, r) {
      switch (r.length) {
        case 0:
          return n.call(t)
        case 1:
          return n.call(t, r[0])
        case 2:
          return n.call(t, r[0], r[1])
        case 3:
          return n.call(t, r[0], r[1], r[2])
      }
      return n.apply(t, r)
    }
    function at(n, t, r, e) {
      for (var i = -1, u = null == n ? 0 : n.length; ++i < u; ) {
        var o = n[i]
        t(e, o, r(o), n)
      }
      return e
    }
    function ct(n, t) {
      for (var r = -1, e = null == n ? 0 : n.length; ++r < e && !1 !== t(n[r], r, n); );
      return n
    }
    function lt(n, t) {
      for (var r = null == n ? 0 : n.length; r-- && !1 !== t(n[r], r, n); );
      return n
    }
    function ht(n, t) {
      for (var r = -1, e = null == n ? 0 : n.length; ++r < e; ) if (!t(n[r], r, n)) return !1
      return !0
    }
    function pt(n, t) {
      for (var r = -1, e = null == n ? 0 : n.length, i = 0, u = []; ++r < e; ) {
        var o = n[r]
        t(o, r, n) && (u[i++] = o)
      }
      return u
    }
    function dt(n, t) {
      return !(null == n || !n.length) && -1 < Nt(n, t, 0)
    }
    function gt(n, t, r) {
      for (var e = -1, i = null == n ? 0 : n.length; ++e < i; ) if (r(t, n[e])) return !0
      return !1
    }
    function vt(n, t) {
      for (var r = -1, e = null == n ? 0 : n.length, i = Array(e); ++r < e; ) i[r] = t(n[r], r, n)
      return i
    }
    function yt(n, t) {
      for (var r = -1, e = t.length, i = n.length; ++r < e; ) n[i + r] = t[r]
      return n
    }
    function _t(n, t, r, e) {
      var i = -1,
        u = null == n ? 0 : n.length
      for (e && u && (r = n[++i]); ++i < u; ) r = t(r, n[i], i, n)
      return r
    }
    function mt(n, t, r, e) {
      var i = null == n ? 0 : n.length
      for (e && i && (r = n[--i]); i--; ) r = t(r, n[i], i, n)
      return r
    }
    function wt(n, t) {
      for (var r = -1, e = null == n ? 0 : n.length; ++r < e; ) if (t(n[r], r, n)) return !0
      return !1
    }
    var bt = Ft('length')
    function xt(n, t, r) {
      var e
      return (
        r(n, function (n, r, i) {
          if (t(n, r, i)) return (e = r), !1
        }),
        e
      )
    }
    function At(n, t, r, e) {
      for (var i = n.length, u = r + (e ? 1 : -1); e ? u-- : ++u < i; ) if (t(n[u], u, n)) return u
      return -1
    }
    function Nt(n, t, r) {
      if (t != t) return At(n, Ot, r)
      for (var e = n, i = t, u = r - 1, o = e.length; ++u < o; ) if (e[u] === i) return u
      return -1
    }
    function St(n, t, r, e) {
      for (var i = r - 1, u = n.length; ++i < u; ) if (e(n[i], t)) return i
      return -1
    }
    function Ot(n) {
      return n != n
    }
    function Et(n, t) {
      var r = null == n ? 0 : n.length
      return r ? qt(n, t) / r : a
    }
    function Ft(t) {
      return function (r) {
        return null == r ? n : r[t]
      }
    }
    function jt(t) {
      return function (r) {
        return null == t ? n : t[r]
      }
    }
    function Dt(n, t, r, e, i) {
      return (
        i(n, function (n, i, u) {
          r = e ? ((e = !1), n) : t(r, n, i, u)
        }),
        r
      )
    }
    function qt(t, r) {
      for (var e, i = -1, u = t.length; ++i < u; ) {
        var o = r(t[i])
        o !== n && (e = e === n ? o : e + o)
      }
      return e
    }
    function Rt(n, t) {
      for (var r = -1, e = Array(n); ++r < n; ) e[r] = t(r)
      return e
    }
    function kt(n) {
      return n && n.slice(0, Gt(n) + 1).replace(nn, '')
    }
    function Ct(n) {
      return function (t) {
        return n(t)
      }
    }
    function zt(n, t) {
      return vt(t, function (t) {
        return n[t]
      })
    }
    function It(n, t) {
      return n.has(t)
    }
    function $t(n, t) {
      for (var r = -1, e = n.length; ++r < e && -1 < Nt(t, n[r], 0); );
      return r
    }
    function Pt(n, t) {
      for (var r = n.length; r-- && -1 < Nt(t, n[r], 0); );
      return r
    }
    var Mt = jt({
        À: 'A',
        Á: 'A',
        Â: 'A',
        Ã: 'A',
        Ä: 'A',
        Å: 'A',
        à: 'a',
        á: 'a',
        â: 'a',
        ã: 'a',
        ä: 'a',
        å: 'a',
        Ç: 'C',
        ç: 'c',
        Ð: 'D',
        ð: 'd',
        È: 'E',
        É: 'E',
        Ê: 'E',
        Ë: 'E',
        è: 'e',
        é: 'e',
        ê: 'e',
        ë: 'e',
        Ì: 'I',
        Í: 'I',
        Î: 'I',
        Ï: 'I',
        ì: 'i',
        í: 'i',
        î: 'i',
        ï: 'i',
        Ñ: 'N',
        ñ: 'n',
        Ò: 'O',
        Ó: 'O',
        Ô: 'O',
        Õ: 'O',
        Ö: 'O',
        Ø: 'O',
        ò: 'o',
        ó: 'o',
        ô: 'o',
        õ: 'o',
        ö: 'o',
        ø: 'o',
        Ù: 'U',
        Ú: 'U',
        Û: 'U',
        Ü: 'U',
        ù: 'u',
        ú: 'u',
        û: 'u',
        ü: 'u',
        Ý: 'Y',
        ý: 'y',
        ÿ: 'y',
        Æ: 'Ae',
        æ: 'ae',
        Þ: 'Th',
        þ: 'th',
        ß: 'ss',
        Ā: 'A',
        Ă: 'A',
        Ą: 'A',
        ā: 'a',
        ă: 'a',
        ą: 'a',
        Ć: 'C',
        Ĉ: 'C',
        Ċ: 'C',
        Č: 'C',
        ć: 'c',
        ĉ: 'c',
        ċ: 'c',
        č: 'c',
        Ď: 'D',
        Đ: 'D',
        ď: 'd',
        đ: 'd',
        Ē: 'E',
        Ĕ: 'E',
        Ė: 'E',
        Ę: 'E',
        Ě: 'E',
        ē: 'e',
        ĕ: 'e',
        ė: 'e',
        ę: 'e',
        ě: 'e',
        Ĝ: 'G',
        Ğ: 'G',
        Ġ: 'G',
        Ģ: 'G',
        ĝ: 'g',
        ğ: 'g',
        ġ: 'g',
        ģ: 'g',
        Ĥ: 'H',
        Ħ: 'H',
        ĥ: 'h',
        ħ: 'h',
        Ĩ: 'I',
        Ī: 'I',
        Ĭ: 'I',
        Į: 'I',
        İ: 'I',
        ĩ: 'i',
        ī: 'i',
        ĭ: 'i',
        į: 'i',
        ı: 'i',
        Ĵ: 'J',
        ĵ: 'j',
        Ķ: 'K',
        ķ: 'k',
        ĸ: 'k',
        Ĺ: 'L',
        Ļ: 'L',
        Ľ: 'L',
        Ŀ: 'L',
        Ł: 'L',
        ĺ: 'l',
        ļ: 'l',
        ľ: 'l',
        ŀ: 'l',
        ł: 'l',
        Ń: 'N',
        Ņ: 'N',
        Ň: 'N',
        Ŋ: 'N',
        ń: 'n',
        ņ: 'n',
        ň: 'n',
        ŋ: 'n',
        Ō: 'O',
        Ŏ: 'O',
        Ő: 'O',
        ō: 'o',
        ŏ: 'o',
        ő: 'o',
        Ŕ: 'R',
        Ŗ: 'R',
        Ř: 'R',
        ŕ: 'r',
        ŗ: 'r',
        ř: 'r',
        Ś: 'S',
        Ŝ: 'S',
        Ş: 'S',
        Š: 'S',
        ś: 's',
        ŝ: 's',
        ş: 's',
        š: 's',
        Ţ: 'T',
        Ť: 'T',
        Ŧ: 'T',
        ţ: 't',
        ť: 't',
        ŧ: 't',
        Ũ: 'U',
        Ū: 'U',
        Ŭ: 'U',
        Ů: 'U',
        Ű: 'U',
        Ų: 'U',
        ũ: 'u',
        ū: 'u',
        ŭ: 'u',
        ů: 'u',
        ű: 'u',
        ų: 'u',
        Ŵ: 'W',
        ŵ: 'w',
        Ŷ: 'Y',
        ŷ: 'y',
        Ÿ: 'Y',
        Ź: 'Z',
        Ż: 'Z',
        Ž: 'Z',
        ź: 'z',
        ż: 'z',
        ž: 'z',
        Ĳ: 'IJ',
        ĳ: 'ij',
        Œ: 'Oe',
        œ: 'oe',
        ŉ: "'n",
        ſ: 's',
      }),
      Tt = jt({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })
    function Ut(n) {
      return '\\' + Hn[n]
    }
    function Lt(n) {
      return Un.test(n)
    }
    function Zt(n) {
      var t = -1,
        r = Array(n.size)
      return (
        n.forEach(function (n, e) {
          r[++t] = [e, n]
        }),
        r
      )
    }
    function Bt(n, t) {
      return function (r) {
        return n(t(r))
      }
    }
    function Wt(n, t) {
      for (var r = -1, e = n.length, i = 0, u = []; ++r < e; ) {
        var s = n[r]
        ;(s !== t && s !== o) || ((n[r] = o), (u[i++] = r))
      }
      return u
    }
    function Vt(n) {
      var t = -1,
        r = Array(n.size)
      return (
        n.forEach(function (n) {
          r[++t] = n
        }),
        r
      )
    }
    function Ht(n) {
      return (
        Lt(n)
          ? function (n) {
              for (var t = (Mn.lastIndex = 0); Mn.test(n); ) ++t
              return t
            }
          : bt
      )(n)
    }
    function Jt(n) {
      return Lt(n) ? n.match(Mn) || [] : n.split('')
    }
    function Gt(n) {
      for (var t = n.length; t-- && tn.test(n.charAt(t)); );
      return t
    }
    var Kt = jt({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }),
      Yt = (function t(r) {
        var e = (r = null == r ? Xn : Yt.defaults(Xn.Object(), r, Yt.pick(Xn, Zn))).Array,
          tn = r.Date,
          mn = r.Error,
          wn = r.Function,
          bn = r.Math,
          xn = r.Object,
          An = r.RegExp,
          Nn = r.String,
          Sn = r.TypeError,
          On = e.prototype,
          En = wn.prototype,
          Fn = xn.prototype,
          jn = r['__core-js_shared__'],
          Dn = En.toString,
          qn = Fn.hasOwnProperty,
          Rn = 0,
          kn = (En = /[^.]+$/.exec((jn && jn.keys && jn.keys.IE_PROTO) || ''))
            ? 'Symbol(src)_1.' + En
            : '',
          Cn = Fn.toString,
          zn = Dn.call(xn),
          In = Xn._,
          Mn = An(
            '^' +
              Dn.call(qn)
                .replace(X, '\\$&')
                .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
              '$',
          ),
          Un = ((En = nt ? r.Buffer : n), r.Symbol),
          Hn = r.Uint8Array,
          Kn = En ? En.allocUnsafe : n,
          Yn = Bt(xn.getPrototypeOf, xn),
          Qn = xn.create,
          tt = Fn.propertyIsEnumerable,
          bt = On.splice,
          jt = Un ? Un.isConcatSpreadable : n,
          Xt = Un ? Un.iterator : n,
          Qt = Un ? Un.toStringTag : n,
          nr = (function () {
            try {
              var n = Qi(xn, 'defineProperty')
              return n({}, '', {}), n
            } catch (n) {}
          })(),
          tr = r.clearTimeout !== Xn.clearTimeout && r.clearTimeout,
          rr = tn && tn.now !== Xn.Date.now && tn.now,
          er = r.setTimeout !== Xn.setTimeout && r.setTimeout,
          ir = bn.ceil,
          ur = bn.floor,
          or = xn.getOwnPropertySymbols,
          sr = ((En = En ? En.isBuffer : n), r.isFinite),
          fr = On.join,
          ar = Bt(xn.keys, xn),
          cr = bn.max,
          lr = bn.min,
          hr = tn.now,
          pr = r.parseInt,
          dr = bn.random,
          gr = On.reverse,
          vr = ((tn = Qi(r, 'DataView')), Qi(r, 'Map')),
          yr = Qi(r, 'Promise'),
          _r = Qi(r, 'Set'),
          mr = ((r = Qi(r, 'WeakMap')), Qi(xn, 'create')),
          wr = r && new r(),
          br = {},
          xr = Ou(tn),
          Ar = Ou(vr),
          Nr = Ou(yr),
          Sr = Ou(_r),
          Or = Ou(r),
          Er = (Un = Un ? Un.prototype : n) ? Un.valueOf : n,
          Fr = Un ? Un.toString : n
        function jr(n) {
          if (Co(n) && !No(n) && !(n instanceof Cr)) {
            if (n instanceof kr) return n
            if (qn.call(n, '__wrapped__')) return Eu(n)
          }
          return new kr(n)
        }
        var Dr = function (t) {
          return ko(t)
            ? Qn
              ? Qn(t)
              : ((qr.prototype = t), (t = new qr()), (qr.prototype = n), t)
            : {}
        }
        function qr() {}
        function Rr() {}
        function kr(t, r) {
          ;(this.__wrapped__ = t),
            (this.__actions__ = []),
            (this.__chain__ = !!r),
            (this.__index__ = 0),
            (this.__values__ = n)
        }
        function Cr(n) {
          ;(this.__wrapped__ = n),
            (this.__actions__ = []),
            (this.__dir__ = 1),
            (this.__filtered__ = !1),
            (this.__iteratees__ = []),
            (this.__takeCount__ = c),
            (this.__views__ = [])
        }
        function zr(n) {
          var t = -1,
            r = null == n ? 0 : n.length
          for (this.clear(); ++t < r; ) {
            var e = n[t]
            this.set(e[0], e[1])
          }
        }
        function Ir(n) {
          var t = -1,
            r = null == n ? 0 : n.length
          for (this.clear(); ++t < r; ) {
            var e = n[t]
            this.set(e[0], e[1])
          }
        }
        function $r(n) {
          var t = -1,
            r = null == n ? 0 : n.length
          for (this.clear(); ++t < r; ) {
            var e = n[t]
            this.set(e[0], e[1])
          }
        }
        function Pr(n) {
          var t = -1,
            r = null == n ? 0 : n.length
          for (this.__data__ = new $r(); ++t < r; ) this.add(n[t])
        }
        function Mr(n) {
          ;(n = this.__data__ = new Ir(n)), (this.size = n.size)
        }
        function Tr(n, t) {
          var r,
            e = No(n),
            i = !e && Ao(n),
            u = !e && !i && Fo(n),
            o = !e && !i && !u && Lo(n),
            s = e || i || u || o,
            f = s ? Rt(n.length, Nn) : [],
            a = f.length
          for (r in n)
            (!t && !qn.call(n, r)) ||
              (s &&
                ('length' == r ||
                  (u && ('offset' == r || 'parent' == r)) ||
                  (o && ('buffer' == r || 'byteLength' == r || 'byteOffset' == r)) ||
                  ou(r, a))) ||
              f.push(r)
          return f
        }
        function Ur(t) {
          var r = t.length
          return r ? t[$e(0, r - 1)] : n
        }
        function Lr(n, t) {
          return xu(yi(n), Yr(t, 0, n.length))
        }
        function Zr(n) {
          return xu(yi(n))
        }
        function Br(t, r, e) {
          ;((e === n || wo(t[r], e)) && (e !== n || r in t)) || Gr(t, r, e)
        }
        function Wr(t, r, e) {
          var i = t[r]
          ;(qn.call(t, r) && wo(i, e) && (e !== n || r in t)) || Gr(t, r, e)
        }
        function Vr(n, t) {
          for (var r = n.length; r--; ) if (wo(n[r][0], t)) return r
          return -1
        }
        function Hr(n, t, r, e) {
          return (
            re(n, function (n, i, u) {
              t(e, n, r(n), u)
            }),
            e
          )
        }
        function Jr(n, t) {
          return n && _i(t, cs(t), n)
        }
        function Gr(n, t, r) {
          '__proto__' == t && nr
            ? nr(n, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
            : (n[t] = r)
        }
        function Kr(t, r) {
          for (var i = -1, u = r.length, o = e(u), s = null == t; ++i < u; )
            o[i] = s ? n : us(t, r[i])
          return o
        }
        function Yr(t, r, e) {
          return t == t && (e !== n && (t = t <= e ? t : e), r !== n && (t = r <= t ? t : r)), t
        }
        function Xr(t, r, e, i, u, o) {
          var s,
            f,
            a = 1 & r,
            c = 2 & r,
            l = 4 & r
          if ((s = e ? (u ? e(t, i, u, o) : e(t)) : s) !== n) return s
          if (!ko(t)) return t
          if ((i = No(t))) {
            if (
              ((s = (function (n) {
                var t = n.length,
                  r = new n.constructor(t)
                return (
                  t &&
                    'string' == typeof n[0] &&
                    qn.call(n, 'index') &&
                    ((r.index = n.index), (r.input = n.input)),
                  r
                )
              })(t)),
              !a)
            )
              return yi(t, s)
          } else {
            var p = ru(t),
              v = p == y || p == _
            if (Fo(t)) return li(t, a)
            if (p == b || p == h || (v && !u)) {
              if (((s = c || v ? {} : iu(t)), !a))
                return c
                  ? ((x = v = t), (x = (f = s) && _i(x, ls(x), f)), _i(v, tu(v), x))
                  : ((v = Jr(s, (f = t))), _i(f, nu(f), v))
            } else {
              if (!Vn[p]) return u ? t : {}
              s = (function (n, t, r) {
                var e = n.constructor
                switch (t) {
                  case F:
                    return hi(n)
                  case d:
                  case g:
                    return new e(+n)
                  case j:
                    return (function (n, t) {
                      return (
                        (t = t ? hi(n.buffer) : n.buffer),
                        new n.constructor(t, n.byteOffset, n.byteLength)
                      )
                    })(n, r)
                  case D:
                  case q:
                  case R:
                  case k:
                  case C:
                  case z:
                  case I:
                  case $:
                  case P:
                    return pi(n, r)
                  case m:
                    return new e()
                  case w:
                  case S:
                    return new e(n)
                  case A:
                    return (function (n) {
                      var t = new n.constructor(n.source, cn.exec(n))
                      return (t.lastIndex = n.lastIndex), t
                    })(n)
                  case N:
                    return new e()
                  case O:
                    return (function (n) {
                      return Er ? xn(Er.call(n)) : {}
                    })(n)
                }
              })(t, p, a)
            }
          }
          var x = (o = o || new Mr()).get(t)
          if (x) return x
          o.set(t, s),
            Mo(t)
              ? t.forEach(function (n) {
                  s.add(Xr(n, r, e, n, t, o))
                })
              : zo(t) &&
                t.forEach(function (n, i) {
                  s.set(i, Xr(n, r, e, i, t, o))
                })
          var E = i ? n : (l ? (c ? Vi : Wi) : c ? ls : cs)(t)
          return (
            ct(E || t, function (n, i) {
              E && (n = t[(i = n)]), Wr(s, i, Xr(n, r, e, i, t, o))
            }),
            s
          )
        }
        function Qr(t, r, e) {
          var i = e.length
          if (null == t) return !i
          for (t = xn(t); i--; ) {
            var u = e[i],
              o = r[u],
              s = t[u]
            if ((s === n && !(u in t)) || !o(s)) return !1
          }
          return !0
        }
        function ne(t, r, e) {
          if ('function' != typeof t) throw new Sn(i)
          return _u(function () {
            t.apply(n, e)
          }, r)
        }
        function te(n, t, r, e) {
          var i = -1,
            u = dt,
            o = !0,
            s = n.length,
            f = [],
            a = t.length
          if (!s) return f
          r && (t = vt(t, Ct(r))),
            e ? ((u = gt), (o = !1)) : 200 <= t.length && ((u = It), (o = !1), (t = new Pr(t)))
          n: for (; ++i < s; ) {
            var c = n[i],
              l = null == r ? c : r(c)
            if (((c = e || 0 !== c ? c : 0), o && l == l)) {
              for (var h = a; h--; ) if (t[h] === l) continue n
              f.push(c)
            } else u(t, l, e) || f.push(c)
          }
          return f
        }
        ;(jr.templateSettings = {
          escape: V,
          evaluate: H,
          interpolate: J,
          variable: '',
          imports: { _: jr },
        }),
          ((jr.prototype = Rr.prototype).constructor = jr),
          ((kr.prototype = Dr(Rr.prototype)).constructor = kr),
          ((Cr.prototype = Dr(Rr.prototype)).constructor = Cr),
          (zr.prototype.clear = function () {
            ;(this.__data__ = mr ? mr(null) : {}), (this.size = 0)
          }),
          (zr.prototype.delete = function (n) {
            return (n = this.has(n) && delete this.__data__[n]), (this.size -= n ? 1 : 0), n
          }),
          (zr.prototype.get = function (t) {
            var r,
              e = this.__data__
            return mr ? ((r = e[t]) === u ? n : r) : qn.call(e, t) ? e[t] : n
          }),
          (zr.prototype.has = function (t) {
            var r = this.__data__
            return mr ? r[t] !== n : qn.call(r, t)
          }),
          (zr.prototype.set = function (t, r) {
            var e = this.__data__
            return (this.size += this.has(t) ? 0 : 1), (e[t] = mr && r === n ? u : r), this
          }),
          (Ir.prototype.clear = function () {
            ;(this.__data__ = []), (this.size = 0)
          }),
          (Ir.prototype.delete = function (n) {
            var t = this.__data__
            return !(
              (n = Vr(t, n)) < 0 || (n == t.length - 1 ? t.pop() : bt.call(t, n, 1), --this.size, 0)
            )
          }),
          (Ir.prototype.get = function (t) {
            var r = this.__data__
            return (t = Vr(r, t)) < 0 ? n : r[t][1]
          }),
          (Ir.prototype.has = function (n) {
            return -1 < Vr(this.__data__, n)
          }),
          (Ir.prototype.set = function (n, t) {
            var r = this.__data__,
              e = Vr(r, n)
            return e < 0 ? (++this.size, r.push([n, t])) : (r[e][1] = t), this
          }),
          ($r.prototype.clear = function () {
            ;(this.size = 0),
              (this.__data__ = { hash: new zr(), map: new (vr || Ir)(), string: new zr() })
          }),
          ($r.prototype.delete = function (n) {
            return (n = Yi(this, n).delete(n)), (this.size -= n ? 1 : 0), n
          }),
          ($r.prototype.get = function (n) {
            return Yi(this, n).get(n)
          }),
          ($r.prototype.has = function (n) {
            return Yi(this, n).has(n)
          }),
          ($r.prototype.set = function (n, t) {
            var r = Yi(this, n),
              e = r.size
            return r.set(n, t), (this.size += r.size == e ? 0 : 1), this
          }),
          (Pr.prototype.add = Pr.prototype.push =
            function (n) {
              return this.__data__.set(n, u), this
            }),
          (Pr.prototype.has = function (n) {
            return this.__data__.has(n)
          }),
          (Mr.prototype.clear = function () {
            ;(this.__data__ = new Ir()), (this.size = 0)
          }),
          (Mr.prototype.delete = function (n) {
            var t = this.__data__
            return (n = t.delete(n)), (this.size = t.size), n
          }),
          (Mr.prototype.get = function (n) {
            return this.__data__.get(n)
          }),
          (Mr.prototype.has = function (n) {
            return this.__data__.has(n)
          }),
          (Mr.prototype.set = function (n, t) {
            var r = this.__data__
            if (r instanceof Ir) {
              var e = r.__data__
              if (!vr || e.length < 199) return e.push([n, t]), (this.size = ++r.size), this
              r = this.__data__ = new $r(e)
            }
            return r.set(n, t), (this.size = r.size), this
          })
        var re = bi(ce),
          ee = bi(le, !0)
        function ie(n, t) {
          var r = !0
          return (
            re(n, function (n, e, i) {
              return (r = !!t(n, e, i))
            }),
            r
          )
        }
        function ue(t, r, e) {
          for (var i = -1, u = t.length; ++i < u; ) {
            var o,
              s,
              f = t[i],
              a = r(f)
            null != a && (o === n ? a == a && !Uo(a) : e(a, o)) && ((o = a), (s = f))
          }
          return s
        }
        function oe(n, t) {
          var r = []
          return (
            re(n, function (n, e, i) {
              t(n, e, i) && r.push(n)
            }),
            r
          )
        }
        function se(n, t, r, e, i) {
          var u = -1,
            o = n.length
          for (r = r || uu, i = i || []; ++u < o; ) {
            var s = n[u]
            0 < t && r(s) ? (1 < t ? se(s, t - 1, r, e, i) : yt(i, s)) : e || (i[i.length] = s)
          }
          return i
        }
        var fe = xi(),
          ae = xi(!0)
        function ce(n, t) {
          return n && fe(n, t, cs)
        }
        function le(n, t) {
          return n && ae(n, t, cs)
        }
        function he(n, t) {
          return pt(t, function (t) {
            return Do(n[t])
          })
        }
        function pe(t, r) {
          for (var e = 0, i = (r = si(r, t)).length; null != t && e < i; ) t = t[Su(r[e++])]
          return e && e == i ? t : n
        }
        function de(n, t, r) {
          return (t = t(n)), No(n) ? t : yt(t, r(n))
        }
        function ge(t) {
          if (null == t) return t === n ? '[object Undefined]' : '[object Null]'
          if (Qt && Qt in xn(t)) {
            var r = t,
              e = qn.call(r, Qt),
              i = r[Qt]
            try {
              r[Qt] = n
              var u = !0
            } catch (t) {}
            var o = Cn.call(r)
            return u && (e ? (r[Qt] = i) : delete r[Qt]), o
          }
          return Cn.call(t)
        }
        function ve(n, t) {
          return t < n
        }
        function ye(n, t) {
          return null != n && qn.call(n, t)
        }
        function _e(n, t) {
          return null != n && t in xn(n)
        }
        function me(t, r, i) {
          for (
            var u = i ? gt : dt, o = t[0].length, s = t.length, f = s, a = e(s), c = 1 / 0, l = [];
            f--;

          ) {
            var h = t[f]
            f && r && (h = vt(h, Ct(r))),
              (c = lr(h.length, c)),
              (a[f] = !i && (r || (120 <= o && 120 <= h.length)) ? new Pr(f && h) : n)
          }
          h = t[0]
          var p = -1,
            d = a[0]
          n: for (; ++p < o && l.length < c; ) {
            var g = h[p],
              v = r ? r(g) : g
            if (((g = i || 0 !== g ? g : 0), !(d ? It(d, v) : u(l, v, i)))) {
              for (f = s; --f; ) {
                var y = a[f]
                if (!(y ? It(y, v) : u(t[f], v, i))) continue n
              }
              d && d.push(v), l.push(g)
            }
          }
          return l
        }
        function we(t, r, e) {
          return null == (r = null == (t = gu(t, (r = si(r, t)))) ? t : t[Su(Ru(r))])
            ? n
            : ft(r, t, e)
        }
        function be(n) {
          return Co(n) && ge(n) == h
        }
        function xe(t, r, e, i, u) {
          if (t === r) return !0
          if (null == t || null == r || (!Co(t) && !Co(r))) return t != t && r != r
          var o = xe,
            s = No(t),
            f = No(r),
            a = s ? p : ru(t),
            c = ((f = f ? p : ru(r)), (a = a == h ? b : a) == b),
            l = (f = f == h ? b : f) == b
          if ((f = a == f) && Fo(t)) {
            if (!Fo(r)) return !1
            c = !(s = !0)
          }
          if (f && !c) {
            if (((u = u || new Mr()), s || Lo(t))) return Zi(t, r, e, i, o, u)
            var y = t,
              _ = r,
              x = e,
              E = i,
              D = o,
              q = u
            switch (a) {
              case j:
                if (y.byteLength != _.byteLength || y.byteOffset != _.byteOffset) return !1
                ;(y = y.buffer), (_ = _.buffer)
              case F:
                return !(y.byteLength != _.byteLength || !D(new Hn(y), new Hn(_)))
              case d:
              case g:
              case w:
                return wo(+y, +_)
              case v:
                return y.name == _.name && y.message == _.message
              case A:
              case S:
                return y == _ + ''
              case m:
                var R = Zt
              case N:
                var k = 1 & x
                return (
                  (R = R || Vt),
                  !(y.size != _.size && !k) &&
                    ((k = q.get(y))
                      ? k == _
                      : ((x |= 2), q.set(y, _), (k = Zi(R(y), R(_), x, E, D, q)), q.delete(y), k))
                )
              case O:
                if (Er) return Er.call(y) == Er.call(_)
            }
            return !1
          }
          if (
            !(1 & e) &&
            ((s = c && qn.call(t, '__wrapped__')), (a = l && qn.call(r, '__wrapped__')), s || a)
          )
            return o((c = s ? t.value() : t), (l = a ? r.value() : r), e, i, (u = u || new Mr()))
          if (f) {
            var C = t,
              z = r,
              I = e,
              $ = i,
              P = o,
              M = (u = u || new Mr()),
              T = 1 & I,
              U = Wi(C),
              L = U.length
            if (L != (s = Wi(z).length) && !T) return !1
            for (var Z = L; Z--; ) {
              var B = U[Z]
              if (!(T ? B in z : qn.call(z, B))) return !1
            }
            if (((s = M.get(C)), (a = M.get(z)), s && a)) return s == z && a == C
            for (var W = !0, V = (M.set(C, z), M.set(z, C), T); ++Z < L; ) {
              var H,
                J = C[(B = U[Z])],
                G = z[B]
              if (
                !((H = $ ? (T ? $(G, J, B, z, C, M) : $(J, G, B, C, z, M)) : H) === n
                  ? J === G || P(J, G, I, $, M)
                  : H)
              ) {
                W = !1
                break
              }
              V = V || 'constructor' == B
            }
            return (
              W &&
                !V &&
                (s = C.constructor) != (a = z.constructor) &&
                'constructor' in C &&
                'constructor' in z &&
                !(
                  'function' == typeof s &&
                  s instanceof s &&
                  'function' == typeof a &&
                  a instanceof a
                ) &&
                (W = !1),
              M.delete(C),
              M.delete(z),
              W
            )
          }
          return !1
        }
        function Ae(t, r, e, i) {
          var u = e.length,
            o = u,
            s = !i
          if (null == t) return !o
          for (t = xn(t); u--; ) {
            var f = e[u]
            if (s && f[2] ? f[1] !== t[f[0]] : !(f[0] in t)) return !1
          }
          for (; ++u < o; ) {
            var a = (f = e[u])[0],
              c = t[a],
              l = f[1]
            if (s && f[2]) {
              if (c === n && !(a in t)) return !1
            } else {
              var h,
                p = new Mr()
              if (!((h = i ? i(c, l, a, t, r, p) : h) === n ? xe(l, c, 3, i, p) : h)) return !1
            }
          }
          return !0
        }
        function Ne(n) {
          return !(!ko(n) || ((t = n), kn && kn in t)) && (Do(n) ? Mn : pn).test(Ou(n))
          var t
        }
        function Se(n) {
          return 'function' == typeof n
            ? n
            : null == n
            ? Is
            : 'object' == typeof n
            ? No(n)
              ? De(n[0], n[1])
              : je(n)
            : Ws(n)
        }
        function Oe(n) {
          if (!lu(n)) return ar(n)
          var t,
            r = []
          for (t in xn(n)) qn.call(n, t) && 'constructor' != t && r.push(t)
          return r
        }
        function Ee(n, t) {
          return n < t
        }
        function Fe(n, t) {
          var r = -1,
            i = Oo(n) ? e(n.length) : []
          return (
            re(n, function (n, e, u) {
              i[++r] = t(n, e, u)
            }),
            i
          )
        }
        function je(n) {
          var t = Xi(n)
          return 1 == t.length && t[0][2]
            ? pu(t[0][0], t[0][1])
            : function (r) {
                return r === n || Ae(r, n, t)
              }
        }
        function De(t, r) {
          return fu(t) && hu(r)
            ? pu(Su(t), r)
            : function (e) {
                var i = us(e, t)
                return i === n && i === r ? os(e, t) : xe(r, i, 3)
              }
        }
        function qe(t, r, e, i, u) {
          t !== r &&
            fe(
              r,
              function (o, s) {
                var f, a, c, l, h, p, d, g, v, y, _, m, w
                ;(u = u || new Mr()),
                  ko(o)
                    ? ((a = r),
                      (l = e),
                      (h = qe),
                      (p = i),
                      (d = u),
                      (_ = vu((f = t), (c = s))),
                      (m = vu(a, c)),
                      (w = d.get(m)) ||
                        ((a = (w = p ? p(_, m, c + '', f, a, d) : n) === n) &&
                          ((v = !(g = No(m)) && Fo(m)),
                          (y = !g && !v && Lo(m)),
                          (w = m),
                          g || v || y
                            ? (w = No(_)
                                ? _
                                : Eo(_)
                                ? yi(_)
                                : v
                                ? li(m, !(a = !1))
                                : y
                                ? pi(m, !(a = !1))
                                : [])
                            : $o(m) || Ao(m)
                            ? Ao((w = _))
                              ? (w = Ko(_))
                              : (ko(_) && !Do(_)) || (w = iu(m))
                            : (a = !1)),
                        a && (d.set(m, w), h(w, m, l, p, d), d.delete(m))),
                      Br(f, c, w))
                    : ((g = i ? i(vu(t, s), o, s + '', t, r, u) : n),
                      Br(t, s, (g = g === n ? o : g)))
              },
              ls,
            )
        }
        function Re(t, r) {
          var e = t.length
          if (e) return ou((r += r < 0 ? e : 0), e) ? t[r] : n
        }
        function ke(n, t, r) {
          t = t.length
            ? vt(t, function (n) {
                return No(n)
                  ? function (t) {
                      return pe(t, 1 === n.length ? n[0] : n)
                    }
                  : n
              })
            : [Is]
          var e = -1
          t = vt(t, Ct(Ki()))
          var i = Fe(n, function (n, r, i) {
              return {
                criteria: vt(t, function (t) {
                  return t(n)
                }),
                index: ++e,
                value: n,
              }
            }),
            u =
              ((n = function (n, t) {
                for (
                  var e = r, i = -1, u = n.criteria, o = t.criteria, s = u.length, f = e.length;
                  ++i < s;

                ) {
                  var a = di(u[i], o[i])
                  if (a) return f <= i ? a : a * ('desc' == e[i] ? -1 : 1)
                }
                return n.index - t.index
              }),
              i.length)
          for (i.sort(n); u--; ) i[u] = i[u].value
          return i
        }
        function Ce(n, t, r) {
          for (var e = -1, i = t.length, u = {}; ++e < i; ) {
            var o = t[e],
              s = pe(n, o)
            r(s, o) && Le(u, si(o, n), s)
          }
          return u
        }
        function ze(n, t, r, e) {
          var i = e ? St : Nt,
            u = -1,
            o = t.length,
            s = n
          for (n === t && (t = yi(t)), r && (s = vt(n, Ct(r))); ++u < o; )
            for (var f = 0, a = t[u], c = r ? r(a) : a; -1 < (f = i(s, c, f, e)); )
              s !== n && bt.call(s, f, 1), bt.call(n, f, 1)
          return n
        }
        function Ie(n, t) {
          for (var r = n ? t.length : 0, e = r - 1; r--; ) {
            var i,
              u = t[r]
            ;(r != e && u === i) || (ou((i = u)) ? bt.call(n, u, 1) : Qe(n, u))
          }
        }
        function $e(n, t) {
          return n + ur(dr() * (t - n + 1))
        }
        function Pe(n, t) {
          var r = ''
          if (!n || t < 1 || f < t) return r
          for (; t % 2 && (r += n), (t = ur(t / 2)) && (n += n), t; );
          return r
        }
        function Me(n, t) {
          return mu(du(n, t, Is), n + '')
        }
        function Te(n) {
          return Ur(ms(n))
        }
        function Ue(n, t) {
          return xu((n = ms(n)), Yr(t, 0, n.length))
        }
        function Le(t, r, e, i) {
          if (!ko(t)) return t
          for (var u = -1, o = (r = si(r, t)).length, s = o - 1, f = t; null != f && ++u < o; ) {
            var a,
              c = Su(r[u]),
              l = e
            if ('__proto__' === c || 'constructor' === c || 'prototype' === c) return t
            u != s &&
              ((a = f[c]),
              (l = i ? i(a, c, f) : n) === n && (l = ko(a) ? a : ou(r[u + 1]) ? [] : {})),
              Wr(f, c, l),
              (f = f[c])
          }
          return t
        }
        var Ze = wr
          ? function (n, t) {
              return wr.set(n, t), n
            }
          : Is
        function Be(n) {
          return xu(ms(n))
        }
        function We(n, t, r) {
          for (
            var i = -1,
              u = n.length,
              o =
                ((r = u < r ? u : r) < 0 && (r += u),
                (u = r < (t = t < 0 ? (u < -t ? 0 : u + t) : t) ? 0 : (r - t) >>> 0),
                (t >>>= 0),
                e(u));
            ++i < u;

          )
            o[i] = n[i + t]
          return o
        }
        function Ve(n, t) {
          var r
          return (
            re(n, function (n, e, i) {
              return !(r = t(n, e, i))
            }),
            !!r
          )
        }
        function He(n, t, r) {
          var e = 0,
            i = null == n ? e : n.length
          if ('number' == typeof t && t == t && i <= 2147483647) {
            for (; e < i; ) {
              var u = (e + i) >>> 1,
                o = n[u]
              null !== o && !Uo(o) && (r ? o <= t : o < t) ? (e = 1 + u) : (i = u)
            }
            return i
          }
          return Je(n, t, Is, r)
        }
        function Je(t, r, e, i) {
          var u = 0,
            o = null == t ? 0 : t.length
          if (0 === o) return 0
          for (var s = (r = e(r)) != r, f = null === r, a = Uo(r), c = r === n; u < o; ) {
            var l = ur((u + o) / 2),
              h = e(t[l]),
              p = h !== n,
              d = null === h,
              g = h == h,
              v = Uo(h)
            ;(g = s
              ? i || g
              : c
              ? g && (i || p)
              : f
              ? g && p && (i || !d)
              : a
              ? g && p && !d && (i || !v)
              : !d && !v && (i ? h <= r : h < r))
              ? (u = l + 1)
              : (o = l)
          }
          return lr(o, 4294967294)
        }
        function Ge(n, t) {
          for (var r = -1, e = n.length, i = 0, u = []; ++r < e; ) {
            var o,
              s = n[r],
              f = t ? t(s) : s
            ;(r && wo(f, o)) || ((o = f), (u[i++] = 0 === s ? 0 : s))
          }
          return u
        }
        function Ke(n) {
          return 'number' == typeof n ? n : Uo(n) ? a : +n
        }
        function Ye(n) {
          if ('string' == typeof n) return n
          if (No(n)) return vt(n, Ye) + ''
          if (Uo(n)) return Fr ? Fr.call(n) : ''
          var t = n + ''
          return '0' == t && 1 / n == -1 / 0 ? '-0' : t
        }
        function Xe(n, t, r) {
          var e = -1,
            i = dt,
            u = n.length,
            o = !0,
            s = [],
            f = s
          if (r) (o = !1), (i = gt)
          else if (200 <= u) {
            var a = t ? null : $i(n)
            if (a) return Vt(a)
            ;(o = !1), (i = It), (f = new Pr())
          } else f = t ? [] : s
          n: for (; ++e < u; ) {
            var c = n[e],
              l = t ? t(c) : c
            if (((c = r || 0 !== c ? c : 0), o && l == l)) {
              for (var h = f.length; h--; ) if (f[h] === l) continue n
              t && f.push(l), s.push(c)
            } else i(f, l, r) || (f !== s && f.push(l), s.push(c))
          }
          return s
        }
        function Qe(n, t) {
          return null == (n = gu(n, (t = si(t, n)))) || delete n[Su(Ru(t))]
        }
        function ni(n, t, r, e) {
          return Le(n, t, r(pe(n, t)), e)
        }
        function ti(n, t, r, e) {
          for (var i = n.length, u = e ? i : -1; (e ? u-- : ++u < i) && t(n[u], u, n); );
          return r ? We(n, e ? 0 : u, e ? u + 1 : i) : We(n, e ? u + 1 : 0, e ? i : u)
        }
        function ri(n, t) {
          var r = n
          return _t(
            t,
            function (n, t) {
              return t.func.apply(t.thisArg, yt([n], t.args))
            },
            (r = n instanceof Cr ? n.value() : r),
          )
        }
        function ei(n, t, r) {
          var i = n.length
          if (i < 2) return i ? Xe(n[0]) : []
          for (var u = -1, o = e(i); ++u < i; )
            for (var s = n[u], f = -1; ++f < i; ) f != u && (o[u] = te(o[u] || s, n[f], t, r))
          return Xe(se(o, 1), t, r)
        }
        function ii(t, r, e) {
          for (var i = -1, u = t.length, o = r.length, s = {}; ++i < u; ) {
            var f = i < o ? r[i] : n
            e(s, t[i], f)
          }
          return s
        }
        function ui(n) {
          return Eo(n) ? n : []
        }
        function oi(n) {
          return 'function' == typeof n ? n : Is
        }
        function si(n, t) {
          return No(n) ? n : fu(n, t) ? [n] : Nu(Yo(n))
        }
        Un = nr
          ? function (n, t) {
              return nr(n, 'toString', {
                configurable: !0,
                enumerable: !1,
                value: ks(t),
                writable: !0,
              })
            }
          : Is
        var fi = Me
        function ai(t, r, e) {
          var i = t.length
          return (e = e === n ? i : e), !r && i <= e ? t : We(t, r, e)
        }
        var ci =
          tr ||
          function (n) {
            return Xn.clearTimeout(n)
          }
        function li(n, t) {
          return t
            ? n.slice()
            : ((t = n.length), (t = Kn ? Kn(t) : new n.constructor(t)), n.copy(t), t)
        }
        function hi(n) {
          var t = new n.constructor(n.byteLength)
          return new Hn(t).set(new Hn(n)), t
        }
        function pi(n, t) {
          return (t = t ? hi(n.buffer) : n.buffer), new n.constructor(t, n.byteOffset, n.length)
        }
        function di(t, r) {
          if (t !== r) {
            var e = t !== n,
              i = null === t,
              u = t == t,
              o = Uo(t),
              s = r !== n,
              f = null === r,
              a = r == r,
              c = Uo(r)
            if (
              (!f && !c && !o && r < t) ||
              (o && s && a && !f && !c) ||
              (i && s && a) ||
              (!e && a) ||
              !u
            )
              return 1
            if (
              (!i && !o && !c && t < r) ||
              (c && e && u && !i && !o) ||
              (f && e && u) ||
              (!s && u) ||
              !a
            )
              return -1
          }
          return 0
        }
        function gi(n, t, r, i) {
          for (
            var u = -1,
              o = n.length,
              s = r.length,
              f = -1,
              a = t.length,
              c = cr(o - s, 0),
              l = e(a + c),
              h = !i;
            ++f < a;

          )
            l[f] = t[f]
          for (; ++u < s; ) (h || u < o) && (l[r[u]] = n[u])
          for (; c--; ) l[f++] = n[u++]
          return l
        }
        function vi(n, t, r, i) {
          for (
            var u = -1,
              o = n.length,
              s = -1,
              f = r.length,
              a = -1,
              c = t.length,
              l = cr(o - f, 0),
              h = e(l + c),
              p = !i;
            ++u < l;

          )
            h[u] = n[u]
          for (var d = u; ++a < c; ) h[d + a] = t[a]
          for (; ++s < f; ) (p || u < o) && (h[d + r[s]] = n[u++])
          return h
        }
        function yi(n, t) {
          var r = -1,
            i = n.length
          for (t = t || e(i); ++r < i; ) t[r] = n[r]
          return t
        }
        function _i(t, r, e, i) {
          for (var u = !e, o = ((e = e || {}), -1), s = r.length; ++o < s; ) {
            var f = r[o],
              a = i ? i(e[f], t[f], f, e, t) : n
            ;(u ? Gr : Wr)(e, f, (a = a === n ? t[f] : a))
          }
          return e
        }
        function mi(n, t) {
          return function (r, e) {
            var i = No(r) ? at : Hr,
              u = t ? t() : {}
            return i(r, n, Ki(e, 2), u)
          }
        }
        function wi(t) {
          return Me(function (r, e) {
            var i = -1,
              u = e.length,
              o = 1 < u ? e[u - 1] : n,
              s = 2 < u ? e[2] : n
            for (
              o = 3 < t.length && 'function' == typeof o ? (u--, o) : n,
                s && su(e[0], e[1], s) && ((o = u < 3 ? n : o), (u = 1)),
                r = xn(r);
              ++i < u;

            ) {
              var f = e[i]
              f && t(r, f, i, o)
            }
            return r
          })
        }
        function bi(n, t) {
          return function (r, e) {
            if (null == r) return r
            if (!Oo(r)) return n(r, e)
            for (
              var i = r.length, u = t ? i : -1, o = xn(r);
              (t ? u-- : ++u < i) && !1 !== e(o[u], u, o);

            );
            return r
          }
        }
        function xi(n) {
          return function (t, r, e) {
            for (var i = -1, u = xn(t), o = e(t), s = o.length; s--; ) {
              var f = o[n ? s : ++i]
              if (!1 === r(u[f], f, u)) break
            }
            return t
          }
        }
        function Ai(t) {
          return function (r) {
            var e = (i = Lt((r = Yo(r))) ? Jt(r) : n) ? i[0] : r.charAt(0),
              i = i ? ai(i, 1).join('') : r.slice(1)
            return e[t]() + i
          }
        }
        function Ni(n) {
          return function (t) {
            return _t(Ds(xs(t).replace($n, '')), n, '')
          }
        }
        function Si(n) {
          return function () {
            var t = arguments
            switch (t.length) {
              case 0:
                return new n()
              case 1:
                return new n(t[0])
              case 2:
                return new n(t[0], t[1])
              case 3:
                return new n(t[0], t[1], t[2])
              case 4:
                return new n(t[0], t[1], t[2], t[3])
              case 5:
                return new n(t[0], t[1], t[2], t[3], t[4])
              case 6:
                return new n(t[0], t[1], t[2], t[3], t[4], t[5])
              case 7:
                return new n(t[0], t[1], t[2], t[3], t[4], t[5], t[6])
            }
            var r = Dr(n.prototype),
              e = n.apply(r, t)
            return ko(e) ? e : r
          }
        }
        function Oi(t) {
          return function (r, e, i) {
            var u,
              o = xn(r)
            return -1 <
              (Oo(r) ||
                ((u = Ki(e, 3)),
                (r = cs(r)),
                (e = function (n) {
                  return u(o[n], n, o)
                })),
              (e = t(r, e, i)))
              ? o[u ? r[e] : e]
              : n
          }
        }
        function Ei(t) {
          return Bi(function (r) {
            var e = r.length,
              u = e,
              o = kr.prototype.thru
            for (t && r.reverse(); u--; ) {
              var s = r[u]
              if ('function' != typeof s) throw new Sn(i)
              o && !c && 'wrapper' == Ji(s) && (c = new kr([], !0))
            }
            for (u = c ? u : e; ++u < e; )
              var f = Ji((s = r[u])),
                a = 'wrapper' == f ? Hi(s) : n,
                c =
                  a && au(a[0]) && 424 == a[1] && !a[4].length && 1 == a[9]
                    ? c[Ji(a[0])].apply(c, a[3])
                    : 1 == s.length && au(s)
                    ? c[f]()
                    : c.thru(s)
            return function () {
              var n = arguments,
                t = n[0]
              if (c && 1 == n.length && No(t)) return c.plant(t).value()
              for (var i = 0, u = e ? r[i].apply(this, n) : t; ++i < e; ) u = r[i].call(this, u)
              return u
            }
          })
        }
        function Fi(t, r, i, u, o, f, a, c, l, h) {
          var p = r & s,
            d = 1 & r,
            g = 2 & r,
            v = 24 & r,
            y = 512 & r,
            _ = g ? n : Si(t)
          return function s() {
            for (var m = e((A = arguments.length)), w = A; w--; ) m[w] = arguments[w]
            if (
              (v &&
                (x = (function (n, t) {
                  for (var r = n.length, e = 0; r--; ) n[r] === t && ++e
                  return e
                })(m, (b = Gi(s)))),
              u && (m = gi(m, u, o, v)),
              f && (m = vi(m, f, a, v)),
              (A -= x),
              v && A < h)
            )
              return (x = Wt(m, b)), zi(t, r, Fi, s.placeholder, i, m, x, c, l, h - A)
            var b = d ? i : this,
              x = g ? b[t] : t,
              A = m.length
            return (
              c
                ? (m = (function (t, r) {
                    for (var e = t.length, i = lr(r.length, e), u = yi(t); i--; ) {
                      var o = r[i]
                      t[i] = ou(o, e) ? u[o] : n
                    }
                    return t
                  })(m, c))
                : y && 1 < A && m.reverse(),
              p && l < A && (m.length = l),
              (x = this && this !== Xn && this instanceof s ? _ || Si(x) : x).apply(b, m)
            )
          }
        }
        function ji(n, t) {
          return function (r, e) {
            return (
              (r = r),
              (i = n),
              (u = t(e)),
              (o = {}),
              ce(r, function (n, t, r) {
                i(o, u(n), t, r)
              }),
              o
            )
            var i, u, o
          }
        }
        function Di(t, r) {
          return function (e, i) {
            var u
            if (e === n && i === n) return r
            if ((e !== n && (u = e), i !== n)) {
              if (u === n) return i
              ;(i =
                'string' == typeof e || 'string' == typeof i
                  ? ((e = Ye(e)), Ye(i))
                  : ((e = Ke(e)), Ke(i))),
                (u = t(e, i))
            }
            return u
          }
        }
        function qi(n) {
          return Bi(function (t) {
            return (
              (t = vt(t, Ct(Ki()))),
              Me(function (r) {
                var e = this
                return n(t, function (n) {
                  return ft(n, e, r)
                })
              })
            )
          })
        }
        function Ri(t, r) {
          var e = (r = r === n ? ' ' : Ye(r)).length
          return e < 2
            ? e
              ? Pe(r, t)
              : r
            : ((e = Pe(r, ir(t / Ht(r)))), Lt(r) ? ai(Jt(e), 0, t).join('') : e.slice(0, t))
        }
        function ki(t) {
          return function (r, i, u) {
            u && 'number' != typeof u && su(r, i, u) && (i = u = n),
              (r = Vo(r)),
              i === n ? ((i = r), (r = 0)) : (i = Vo(i))
            for (
              var o = r,
                s = (u = u === n ? (r < i ? 1 : -1) : Vo(u)),
                f = t,
                a = -1,
                c = cr(ir((i - o) / (s || 1)), 0),
                l = e(c);
              c--;

            )
              (l[f ? c : ++a] = o), (o += s)
            return l
          }
        }
        function Ci(n) {
          return function (t, r) {
            return (
              ('string' == typeof t && 'string' == typeof r) || ((t = Go(t)), (r = Go(r))), n(t, r)
            )
          }
        }
        function zi(t, r, e, i, u, o, s, f, a, c) {
          var l = 8 & r
          return (
            4 & (r = (r | (l ? 32 : 64)) & ~(l ? 64 : 32)) || (r &= -4),
            (u = [t, r, u, l ? o : n, l ? s : n, l ? n : o, l ? n : s, f, a, c]),
            (o = e.apply(n, u)),
            au(t) && yu(o, u),
            (o.placeholder = i),
            wu(o, t, r)
          )
        }
        function Ii(n) {
          var t = bn[n]
          return function (n, r) {
            var e
            return (
              (n = Go(n)),
              (r = null == r ? 0 : lr(Ho(r), 292)) && sr(n)
                ? ((e = (Yo(n) + 'e').split('e')),
                  +(
                    (e = (Yo(t(e[0] + 'e' + (+e[1] + r))) + 'e').split('e'))[0] +
                    'e' +
                    (+e[1] - r)
                  ))
                : t(n)
            )
          }
        }
        var $i =
          _r && 1 / Vt(new _r([, -0]))[1] == 1 / 0
            ? function (n) {
                return new _r(n)
              }
            : Us
        function Pi(n) {
          return function (t) {
            var r,
              e,
              i,
              u = ru(t)
            return u == m
              ? Zt(t)
              : u == N
              ? ((u = t),
                (r = -1),
                (e = Array(u.size)),
                u.forEach(function (n) {
                  e[++r] = [n, n]
                }),
                e)
              : vt(n((i = t)), function (n) {
                  return [n, i[n]]
                })
          }
        }
        function Mi(t, r, u, f, a, c, l, h) {
          var p = 2 & r
          if (!p && 'function' != typeof t) throw new Sn(i)
          var d,
            g,
            v,
            y,
            _,
            m = f ? f.length : 0,
            w =
              (m || ((r &= -97), (f = a = n)),
              (l = l === n ? l : cr(Ho(l), 0)),
              (h = h === n ? h : Ho(h)),
              (m -= a ? a.length : 0),
              64 & r && ((b = f), (d = a), (f = a = n)),
              p ? n : Hi(t)),
            b = [t, r, u, f, a, b, d, c, l, h]
          return (
            w &&
              (function (n, t) {
                var r,
                  e = n[1],
                  i = t[1],
                  u = e | i,
                  f = u < 131,
                  a =
                    (i == s && 8 == e) ||
                    (i == s && 256 == e && n[7].length <= t[8]) ||
                    (384 == i && t[7].length <= t[8] && 8 == e)
                ;(f || a) &&
                  (1 & i && ((n[2] = t[2]), (u |= 1 & e ? 0 : 4)),
                  (f = t[3]) &&
                    ((r = n[3]), (n[3] = r ? gi(r, f, t[4]) : f), (n[4] = r ? Wt(n[3], o) : t[4])),
                  (f = t[5]) &&
                    ((r = n[5]), (n[5] = r ? vi(r, f, t[6]) : f), (n[6] = r ? Wt(n[5], o) : t[6])),
                  (f = t[7]) && (n[7] = f),
                  i & s && (n[8] = null == n[8] ? t[8] : lr(n[8], t[8])),
                  null == n[9] && (n[9] = t[9]),
                  (n[0] = t[0]),
                  (n[1] = u))
              })(b, w),
            (t = b[0]),
            (r = b[1]),
            (u = b[2]),
            (f = b[3]),
            (a = b[4]),
            !(h = b[9] = b[9] === n ? (p ? 0 : t.length) : cr(b[9] - m, 0)) && 24 & r && (r &= -25),
            (d =
              r && 1 != r
                ? 8 == r || 16 == r
                  ? (function (t, r, i) {
                      var u = Si(t)
                      return function o() {
                        for (var s = arguments.length, f = e(s), a = s, c = Gi(o); a--; )
                          f[a] = arguments[a]
                        return (s -= (c = s < 3 && f[0] !== c && f[s - 1] !== c ? [] : Wt(f, c))
                          .length) < i
                          ? zi(t, r, Fi, o.placeholder, n, f, c, n, n, i - s)
                          : ft(this && this !== Xn && this instanceof o ? u : t, this, f)
                      }
                    })(t, r, h)
                  : (32 != r && 33 != r) || a.length
                  ? Fi.apply(n, b)
                  : (function (n, t, r, i) {
                      var u = 1 & t,
                        o = Si(n)
                      return function t() {
                        for (
                          var s = -1,
                            f = arguments.length,
                            a = -1,
                            c = i.length,
                            l = e(c + f),
                            h = this && this !== Xn && this instanceof t ? o : n;
                          ++a < c;

                        )
                          l[a] = i[a]
                        for (; f--; ) l[a++] = arguments[++s]
                        return ft(h, u ? r : this, l)
                      }
                    })(t, r, u, f)
                : ((v = u),
                  (y = 1 & r),
                  (_ = Si((g = t))),
                  function n() {
                    return (this && this !== Xn && this instanceof n ? _ : g).apply(
                      y ? v : this,
                      arguments,
                    )
                  })),
            wu((w ? Ze : yu)(d, b), t, r)
          )
        }
        function Ti(t, r, e, i) {
          return t === n || (wo(t, Fn[e]) && !qn.call(i, e)) ? r : t
        }
        function Ui(t, r, e, i, u, o) {
          return ko(t) && ko(r) && (o.set(r, t), qe(t, r, n, Ui, o), o.delete(r)), t
        }
        function Li(t) {
          return $o(t) ? n : t
        }
        function Zi(t, r, e, i, u, o) {
          var s = 1 & e,
            f = t.length
          if (f != (a = r.length) && !(s && f < a)) return !1
          var a = o.get(t),
            c = o.get(r)
          if (a && c) return a == r && c == t
          var l = -1,
            h = !0,
            p = 2 & e ? new Pr() : n
          for (o.set(t, r), o.set(r, t); ++l < f; ) {
            var d,
              g = t[l],
              v = r[l]
            if ((d = i ? (s ? i(v, g, l, r, t, o) : i(g, v, l, t, r, o)) : d) !== n) {
              if (d) continue
              h = !1
              break
            }
            if (p) {
              if (
                !wt(r, function (n, t) {
                  return !It(p, t) && (g === n || u(g, n, e, i, o)) && p.push(t)
                })
              ) {
                h = !1
                break
              }
            } else if (g !== v && !u(g, v, e, i, o)) {
              h = !1
              break
            }
          }
          return o.delete(t), o.delete(r), h
        }
        function Bi(t) {
          return mu(du(t, n, Du), t + '')
        }
        function Wi(n) {
          return de(n, cs, nu)
        }
        function Vi(n) {
          return de(n, ls, tu)
        }
        var Hi = wr
          ? function (n) {
              return wr.get(n)
            }
          : Us
        function Ji(n) {
          for (var t = n.name + '', r = br[t], e = qn.call(br, t) ? r.length : 0; e--; ) {
            var i = r[e],
              u = i.func
            if (null == u || u == n) return i.name
          }
          return t
        }
        function Gi(n) {
          return (qn.call(jr, 'placeholder') ? jr : n).placeholder
        }
        function Ki() {
          var n = (n = jr.iteratee || $s) === $s ? Se : n
          return arguments.length ? n(arguments[0], arguments[1]) : n
        }
        function Yi(n, t) {
          var r, e
          return (
            (n = n.__data__),
            (
              'string' == (e = typeof (r = t)) || 'number' == e || 'symbol' == e || 'boolean' == e
                ? '__proto__' !== r
                : null === r
            )
              ? n['string' == typeof t ? 'string' : 'hash']
              : n.map
          )
        }
        function Xi(n) {
          for (var t = cs(n), r = t.length; r--; ) {
            var e = t[r],
              i = n[e]
            t[r] = [e, i, hu(i)]
          }
          return t
        }
        function Qi(t, r) {
          return (r = r), Ne((t = null == (t = t) ? n : t[r])) ? t : n
        }
        var nu = or
            ? function (n) {
                return null == n
                  ? []
                  : ((n = xn(n)),
                    pt(or(n), function (t) {
                      return tt.call(n, t)
                    }))
              }
            : Js,
          tu = or
            ? function (n) {
                for (var t = []; n; ) yt(t, nu(n)), (n = Yn(n))
                return t
              }
            : Js,
          ru = ge
        function eu(n, t, r) {
          for (var e = -1, i = (t = si(t, n)).length, u = !1; ++e < i; ) {
            var o = Su(t[e])
            if (!(u = null != n && r(n, o))) break
            n = n[o]
          }
          return u || ++e != i
            ? u
            : !!(i = null == n ? 0 : n.length) && Ro(i) && ou(o, i) && (No(n) || Ao(n))
        }
        function iu(n) {
          return 'function' != typeof n.constructor || lu(n) ? {} : Dr(Yn(n))
        }
        function uu(n) {
          return No(n) || Ao(n) || !!(jt && n && n[jt])
        }
        function ou(n, t) {
          var r = typeof n
          return (
            !!(t = null == t ? f : t) &&
            ('number' == r || ('symbol' != r && gn.test(n))) &&
            -1 < n &&
            n % 1 == 0 &&
            n < t
          )
        }
        function su(n, t, r) {
          var e
          if (ko(r))
            return (
              ('number' == (e = typeof t) ? Oo(r) && ou(t, r.length) : 'string' == e && t in r) &&
              wo(r[t], n)
            )
        }
        function fu(n, t) {
          var r
          if (!No(n))
            return (
              'number' == (r = typeof n) ||
              'symbol' == r ||
              'boolean' == r ||
              null == n ||
              Uo(n) ||
              K.test(n) ||
              !G.test(n) ||
              (null != t && n in xn(t))
            )
        }
        function au(n) {
          var t = Ji(n),
            r = jr[t]
          if ('function' == typeof r && t in Cr.prototype)
            return n === r ? 1 : (t = Hi(r)) && n === t[0]
        }
        ;((tn && ru(new tn(new ArrayBuffer(1))) != j) ||
          (vr && ru(new vr()) != m) ||
          (yr && ru(yr.resolve()) != x) ||
          (_r && ru(new _r()) != N) ||
          (r && ru(new r()) != E)) &&
          (ru = function (t) {
            var r = ge(t)
            if ((t = (t = r == b ? t.constructor : n) ? Ou(t) : ''))
              switch (t) {
                case xr:
                  return j
                case Ar:
                  return m
                case Nr:
                  return x
                case Sr:
                  return N
                case Or:
                  return E
              }
            return r
          })
        var cu = jn ? Do : Gs
        function lu(n) {
          var t = n && n.constructor
          return n === (('function' == typeof t && t.prototype) || Fn)
        }
        function hu(n) {
          return n == n && !ko(n)
        }
        function pu(t, r) {
          return function (e) {
            return null != e && e[t] === r && (r !== n || t in xn(e))
          }
        }
        function du(t, r, i) {
          return (
            (r = cr(r === n ? t.length - 1 : r, 0)),
            function () {
              for (var n = arguments, u = -1, o = cr(n.length - r, 0), s = e(o); ++u < o; )
                s[u] = n[r + u]
              u = -1
              for (var f = e(r + 1); ++u < r; ) f[u] = n[u]
              return (f[r] = i(s)), ft(t, this, f)
            }
          )
        }
        function gu(n, t) {
          return t.length < 2 ? n : pe(n, We(t, 0, -1))
        }
        function vu(n, t) {
          if (('constructor' !== t || 'function' != typeof n[t]) && '__proto__' != t) return n[t]
        }
        var yu = bu(Ze),
          _u =
            er ||
            function (n, t) {
              return Xn.setTimeout(n, t)
            },
          mu = bu(Un)
        function wu(n, t, r) {
          var e, i
          return mu(
            n,
            (function (n, t) {
              var r = t.length
              if (!r) return n
              var e = r - 1
              return (
                (t[e] = (1 < r ? '& ' : '') + t[e]),
                (t = t.join(2 < r ? ', ' : ' ')),
                n.replace(rn, '{\n/* [wrapped with ' + t + '] */\n')
              )
            })(
              (t += ''),
              ((e = (n = (n = t).match(en)) ? n[1].split(un) : []),
              (i = r),
              ct(l, function (n) {
                var t = '_.' + n[0]
                i & n[1] && !dt(e, t) && e.push(t)
              }),
              e.sort()),
            ),
          )
        }
        function bu(t) {
          var r = 0,
            e = 0
          return function () {
            var i = hr(),
              u = 16 - (i - e)
            if (((e = i), 0 < u)) {
              if (800 <= ++r) return arguments[0]
            } else r = 0
            return t.apply(n, arguments)
          }
        }
        function xu(t, r) {
          var e = -1,
            i = t.length,
            u = i - 1
          for (r = r === n ? i : r; ++e < r; ) {
            var o = $e(e, u),
              s = t[o]
            ;(t[o] = t[e]), (t[e] = s)
          }
          return (t.length = r), t
        }
        Au = (tr = go(
          (tr = function (n) {
            var t = []
            return (
              46 === n.charCodeAt(0) && t.push(''),
              n.replace(Y, function (n, r, e, i) {
                t.push(e ? i.replace(fn, '$1') : r || n)
              }),
              t
            )
          }),
          function (n) {
            return 500 === Au.size && Au.clear(), n
          },
        )).cache
        var Au,
          Nu = tr
        function Su(n) {
          if ('string' == typeof n || Uo(n)) return n
          var t = n + ''
          return '0' == t && 1 / n == -1 / 0 ? '-0' : t
        }
        function Ou(n) {
          if (null != n) {
            try {
              return Dn.call(n)
            } catch (n) {}
            try {
              return n + ''
            } catch (n) {}
          }
          return ''
        }
        function Eu(n) {
          if (n instanceof Cr) return n.clone()
          var t = new kr(n.__wrapped__, n.__chain__)
          return (
            (t.__actions__ = yi(n.__actions__)),
            (t.__index__ = n.__index__),
            (t.__values__ = n.__values__),
            t
          )
        }
        function Fu(n, t, r) {
          var e = null == n ? 0 : n.length
          return e
            ? ((r = null == r ? 0 : Ho(r)) < 0 && (r = cr(e + r, 0)), At(n, Ki(t, 3), r))
            : -1
        }
        function ju(t, r, e) {
          var i = null == t ? 0 : t.length
          if (!i) return -1
          var u = i - 1
          return (
            e !== n && ((u = Ho(e)), (u = e < 0 ? cr(i + u, 0) : lr(u, i - 1))),
            At(t, Ki(r, 3), u, !0)
          )
        }
        function Du(n) {
          return null != n && n.length ? se(n, 1) : []
        }
        function qu(t) {
          return t && t.length ? t[0] : n
        }
        function Ru(t) {
          var r = null == t ? 0 : t.length
          return r ? t[r - 1] : n
        }
        function ku(n, t) {
          return n && n.length && t && t.length ? ze(n, t) : n
        }
        ;(tn = Me(function (n, t) {
          return Eo(n) ? te(n, se(t, 1, Eo, !0)) : []
        })),
          (yr = Me(function (t, r) {
            var e = Ru(r)
            return Eo(e) && (e = n), Eo(t) ? te(t, se(r, 1, Eo, !0), Ki(e, 2)) : []
          })),
          (r = Me(function (t, r) {
            var e = Ru(r)
            return Eo(e) && (e = n), Eo(t) ? te(t, se(r, 1, Eo, !0), n, e) : []
          })),
          (jn = Me(function (n) {
            var t = vt(n, ui)
            return t.length && t[0] === n[0] ? me(t) : []
          })),
          (er = Me(function (t) {
            var r = Ru(t),
              e = vt(t, ui)
            return r === Ru(e) ? (r = n) : e.pop(), e.length && e[0] === t[0] ? me(e, Ki(r, 2)) : []
          })),
          (Un = Me(function (t) {
            var r = Ru(t),
              e = vt(t, ui)
            return (
              (r = 'function' == typeof r ? r : n) && e.pop(),
              e.length && e[0] === t[0] ? me(e, n, r) : []
            )
          })),
          (tr = Me(ku))
        var Cu = Bi(function (n, t) {
          var r = null == n ? 0 : n.length,
            e = Kr(n, t)
          return (
            Ie(
              n,
              vt(t, function (n) {
                return ou(n, r) ? +n : n
              }).sort(di),
            ),
            e
          )
        })
        function zu(n) {
          return null == n ? n : gr.call(n)
        }
        var Iu = Me(function (n) {
            return Xe(se(n, 1, Eo, !0))
          }),
          $u = Me(function (t) {
            var r = Ru(t)
            return Eo(r) && (r = n), Xe(se(t, 1, Eo, !0), Ki(r, 2))
          }),
          Pu = Me(function (t) {
            var r = 'function' == typeof (r = Ru(t)) ? r : n
            return Xe(se(t, 1, Eo, !0), n, r)
          })
        function Mu(n) {
          if (!n || !n.length) return []
          var t = 0
          return (
            (n = pt(n, function (n) {
              return Eo(n) && ((t = cr(n.length, t)), 1)
            })),
            Rt(t, function (t) {
              return vt(n, Ft(t))
            })
          )
        }
        function Tu(t, r) {
          return t && t.length
            ? ((t = Mu(t)),
              null == r
                ? t
                : vt(t, function (t) {
                    return ft(r, n, t)
                  }))
            : []
        }
        var Uu = Me(function (n, t) {
            return Eo(n) ? te(n, t) : []
          }),
          Lu = Me(function (n) {
            return ei(pt(n, Eo))
          }),
          Zu = Me(function (t) {
            var r = Ru(t)
            return Eo(r) && (r = n), ei(pt(t, Eo), Ki(r, 2))
          }),
          Bu = Me(function (t) {
            var r = 'function' == typeof (r = Ru(t)) ? r : n
            return ei(pt(t, Eo), n, r)
          }),
          Wu = Me(Mu),
          Vu = Me(function (t) {
            var r = 'function' == typeof (r = 1 < (r = t.length) ? t[r - 1] : n) ? (t.pop(), r) : n
            return Tu(t, r)
          })
        function Hu(n) {
          return ((n = jr(n)).__chain__ = !0), n
        }
        function Ju(n, t) {
          return t(n)
        }
        var Gu = Bi(function (t) {
            function r(n) {
              return Kr(n, t)
            }
            var e = t.length,
              i = e ? t[0] : 0,
              u = this.__wrapped__
            return !(1 < e || this.__actions__.length) && u instanceof Cr && ou(i)
              ? ((u = u.slice(i, +i + (e ? 1 : 0))).__actions__.push({
                  func: Ju,
                  args: [r],
                  thisArg: n,
                }),
                new kr(u, this.__chain__).thru(function (t) {
                  return e && !t.length && t.push(n), t
                }))
              : this.thru(r)
          }),
          Ku = mi(function (n, t, r) {
            qn.call(n, r) ? ++n[r] : Gr(n, r, 1)
          }),
          Yu = Oi(Fu),
          Xu = Oi(ju)
        function Qu(n, t) {
          return (No(n) ? ct : re)(n, Ki(t, 3))
        }
        function no(n, t) {
          return (No(n) ? lt : ee)(n, Ki(t, 3))
        }
        var to = mi(function (n, t, r) {
            qn.call(n, r) ? n[r].push(t) : Gr(n, r, [t])
          }),
          ro = Me(function (n, t, r) {
            var i = -1,
              u = 'function' == typeof t,
              o = Oo(n) ? e(n.length) : []
            return (
              re(n, function (n) {
                o[++i] = u ? ft(t, n, r) : we(n, t, r)
              }),
              o
            )
          }),
          eo = mi(function (n, t, r) {
            Gr(n, r, t)
          })
        function io(n, t) {
          return (No(n) ? vt : Fe)(n, Ki(t, 3))
        }
        var uo = mi(
            function (n, t, r) {
              n[r ? 0 : 1].push(t)
            },
            function () {
              return [[], []]
            },
          ),
          oo = Me(function (n, t) {
            if (null == n) return []
            var r = t.length
            return (
              1 < r && su(n, t[0], t[1]) ? (t = []) : 2 < r && su(t[0], t[1], t[2]) && (t = [t[0]]),
              ke(n, se(t, 1), [])
            )
          }),
          so =
            rr ||
            function () {
              return Xn.Date.now()
            }
        function fo(t, r, e) {
          return (r = e ? n : r), (r = t && null == r ? t.length : r), Mi(t, s, n, n, n, n, r)
        }
        function ao(t, r) {
          var e
          if ('function' != typeof r) throw new Sn(i)
          return (
            (t = Ho(t)),
            function () {
              return 0 < --t && (e = r.apply(this, arguments)), t <= 1 && (r = n), e
            }
          )
        }
        var co = Me(function (n, t, r) {
            var e,
              i = 1
            return r.length && ((e = Wt(r, Gi(co))), (i |= 32)), Mi(n, i, t, r, e)
          }),
          lo = Me(function (n, t, r) {
            var e,
              i = 3
            return r.length && ((e = Wt(r, Gi(lo))), (i |= 32)), Mi(t, i, n, r, e)
          })
        function ho(t, r, e) {
          var u,
            o,
            s,
            f,
            a,
            c,
            l = 0,
            h = !1,
            p = !1,
            d = !0
          if ('function' != typeof t) throw new Sn(i)
          function g(r) {
            var e = u,
              i = o
            return (u = o = n), (l = r), (f = t.apply(i, e))
          }
          function v(t) {
            var e = t - c
            return c === n || r <= e || e < 0 || (p && s <= t - l)
          }
          function y() {
            var n,
              t = so()
            if (v(t)) return _(t)
            a = _u(y, ((n = r - ((t = t) - c)), p ? lr(n, s - (t - l)) : n))
          }
          function _(t) {
            return (a = n), d && u ? g(t) : ((u = o = n), f)
          }
          function m() {
            var t = so(),
              e = v(t)
            if (((u = arguments), (o = this), (c = t), e)) {
              if (a === n) return (l = t = c), (a = _u(y, r)), h ? g(t) : f
              if (p) return ci(a), (a = _u(y, r)), g(c)
            }
            return a === n && (a = _u(y, r)), f
          }
          return (
            (r = Go(r) || 0),
            ko(e) &&
              ((h = !!e.leading),
              (s = (p = 'maxWait' in e) ? cr(Go(e.maxWait) || 0, r) : s),
              (d = 'trailing' in e ? !!e.trailing : d)),
            (m.cancel = function () {
              a !== n && ci(a), (l = 0), (u = c = o = a = n)
            }),
            (m.flush = function () {
              return a === n ? f : _(so())
            }),
            m
          )
        }
        rr = Me(function (n, t) {
          return ne(n, 1, t)
        })
        var po = Me(function (n, t, r) {
          return ne(n, Go(t) || 0, r)
        })
        function go(n, t) {
          if ('function' != typeof n || (null != t && 'function' != typeof t)) throw new Sn(i)
          function r() {
            var e = arguments,
              i = t ? t.apply(this, e) : e[0],
              u = r.cache
            return u.has(i) ? u.get(i) : ((e = n.apply(this, e)), (r.cache = u.set(i, e) || u), e)
          }
          return (r.cache = new (go.Cache || $r)()), r
        }
        function vo(n) {
          if ('function' != typeof n) throw new Sn(i)
          return function () {
            var t = arguments
            switch (t.length) {
              case 0:
                return !n.call(this)
              case 1:
                return !n.call(this, t[0])
              case 2:
                return !n.call(this, t[0], t[1])
              case 3:
                return !n.call(this, t[0], t[1], t[2])
            }
            return !n.apply(this, t)
          }
        }
        ;(go.Cache = $r),
          (fi = fi(function (n, t) {
            var r = (t = 1 == t.length && No(t[0]) ? vt(t[0], Ct(Ki())) : vt(se(t, 1), Ct(Ki())))
              .length
            return Me(function (e) {
              for (var i = -1, u = lr(e.length, r); ++i < u; ) e[i] = t[i].call(this, e[i])
              return ft(n, this, e)
            })
          }))
        var yo = Me(function (t, r) {
            var e = Wt(r, Gi(yo))
            return Mi(t, 32, n, r, e)
          }),
          _o = Me(function (t, r) {
            var e = Wt(r, Gi(_o))
            return Mi(t, 64, n, r, e)
          }),
          mo = Bi(function (t, r) {
            return Mi(t, 256, n, n, n, r)
          })
        function wo(n, t) {
          return n === t || (n != n && t != t)
        }
        var bo = Ci(ve),
          xo = Ci(function (n, t) {
            return t <= n
          }),
          Ao = be(
            (function () {
              return arguments
            })(),
          )
            ? be
            : function (n) {
                return Co(n) && qn.call(n, 'callee') && !tt.call(n, 'callee')
              },
          No = e.isArray,
          So = rt
            ? Ct(rt)
            : function (n) {
                return Co(n) && ge(n) == F
              }
        function Oo(n) {
          return null != n && Ro(n.length) && !Do(n)
        }
        function Eo(n) {
          return Co(n) && Oo(n)
        }
        var Fo = En || Gs
        function jo(n) {
          if (!Co(n)) return !1
          var t = ge(n)
          return (
            t == v ||
            '[object DOMException]' == t ||
            ('string' == typeof n.message && 'string' == typeof n.name && !$o(n))
          )
        }
        function Do(n) {
          return (
            !!ko(n) &&
            ((n = ge(n)) == y || n == _ || '[object AsyncFunction]' == n || '[object Proxy]' == n)
          )
        }
        function qo(n) {
          return 'number' == typeof n && n == Ho(n)
        }
        function Ro(n) {
          return 'number' == typeof n && -1 < n && n % 1 == 0 && n <= f
        }
        function ko(n) {
          var t = typeof n
          return null != n && ('object' == t || 'function' == t)
        }
        function Co(n) {
          return null != n && 'object' == typeof n
        }
        En = et
          ? Ct(et)
          : function (n) {
              return Co(n) && ge(n) == g
            }
        var zo = it
          ? Ct(it)
          : function (n) {
              return Co(n) && ru(n) == m
            }
        function Io(n) {
          return 'number' == typeof n || (Co(n) && ge(n) == w)
        }
        function $o(n) {
          return (
            !(!Co(n) || ge(n) != b) &&
            (null === (n = Yn(n)) ||
              ('function' == typeof (n = qn.call(n, 'constructor') && n.constructor) &&
                n instanceof n &&
                Dn.call(n) == zn))
          )
        }
        var Po = ut
            ? Ct(ut)
            : function (n) {
                return Co(n) && ge(n) == A
              },
          Mo = ot
            ? Ct(ot)
            : function (n) {
                return Co(n) && ru(n) == N
              }
        function To(n) {
          return 'string' == typeof n || (!No(n) && Co(n) && ge(n) == S)
        }
        function Uo(n) {
          return 'symbol' == typeof n || (Co(n) && ge(n) == O)
        }
        var Lo = st
            ? Ct(st)
            : function (n) {
                return Co(n) && Ro(n.length) && !!Wn[ge(n)]
              },
          Zo = Ci(Ee),
          Bo = Ci(function (n, t) {
            return n <= t
          })
        function Wo(n) {
          if (!n) return []
          if (Oo(n)) return (To(n) ? Jt : yi)(n)
          if (Xt && n[Xt]) {
            for (var t, r = n[Xt](), e = []; !(t = r.next()).done; ) e.push(t.value)
            return e
          }
          var i = ru(n)
          return (i == m ? Zt : i == N ? Vt : ms)(n)
        }
        function Vo(n) {
          return n
            ? (n = Go(n)) === 1 / 0 || n === -1 / 0
              ? 17976931348623157e292 * (n < 0 ? -1 : 1)
              : n == n
              ? n
              : 0
            : 0 === n
            ? n
            : 0
        }
        function Ho(n) {
          var t = (n = Vo(n)) % 1
          return n == n ? (t ? n - t : n) : 0
        }
        function Jo(n) {
          return n ? Yr(Ho(n), 0, c) : 0
        }
        function Go(n) {
          if ('number' == typeof n) return n
          if (Uo(n)) return a
          if (
            'string' !=
            typeof (n = ko(n)
              ? ko((t = 'function' == typeof n.valueOf ? n.valueOf() : n))
                ? t + ''
                : t
              : n)
          )
            return 0 === n ? n : +n
          n = kt(n)
          var t = hn.test(n)
          return t || dn.test(n) ? Gn(n.slice(2), t ? 2 : 8) : ln.test(n) ? a : +n
        }
        function Ko(n) {
          return _i(n, ls(n))
        }
        function Yo(n) {
          return null == n ? '' : Ye(n)
        }
        var Xo = wi(function (n, t) {
            if (lu(t) || Oo(t)) _i(t, cs(t), n)
            else for (var r in t) qn.call(t, r) && Wr(n, r, t[r])
          }),
          Qo = wi(function (n, t) {
            _i(t, ls(t), n)
          }),
          ns = wi(function (n, t, r, e) {
            _i(t, ls(t), n, e)
          }),
          ts = wi(function (n, t, r, e) {
            _i(t, cs(t), n, e)
          }),
          rs = Bi(Kr),
          es = Me(function (t, r) {
            t = xn(t)
            var e = -1,
              i = r.length,
              u = 2 < i ? r[2] : n
            for (u && su(r[0], r[1], u) && (i = 1); ++e < i; )
              for (var o = r[e], s = ls(o), f = -1, a = s.length; ++f < a; ) {
                var c = s[f],
                  l = t[c]
                ;(l === n || (wo(l, Fn[c]) && !qn.call(t, c))) && (t[c] = o[c])
              }
            return t
          }),
          is = Me(function (t) {
            return t.push(n, Ui), ft(ps, n, t)
          })
        function us(t, r, e) {
          return (t = null == t ? n : pe(t, r)) === n ? e : t
        }
        function os(n, t) {
          return null != n && eu(n, t, _e)
        }
        var ss = ji(function (n, t, r) {
            n[(t = null != t && 'function' != typeof t.toString ? Cn.call(t) : t)] = r
          }, ks(Is)),
          fs = ji(function (n, t, r) {
            null != t && 'function' != typeof t.toString && (t = Cn.call(t)),
              qn.call(n, t) ? n[t].push(r) : (n[t] = [r])
          }, Ki),
          as = Me(we)
        function cs(n) {
          return (Oo(n) ? Tr : Oe)(n)
        }
        function ls(n) {
          return Oo(n)
            ? Tr(n, !0)
            : (function (n) {
                if (!ko(n)) {
                  var t = n,
                    r = []
                  if (null != t) for (var e in xn(t)) r.push(e)
                  return r
                }
                var i,
                  u = lu(n),
                  o = []
                for (i in n) ('constructor' != i || (!u && qn.call(n, i))) && o.push(i)
                return o
              })(n)
        }
        var hs = wi(function (n, t, r) {
            qe(n, t, r)
          }),
          ps = wi(function (n, t, r, e) {
            qe(n, t, r, e)
          }),
          ds = Bi(function (n, t) {
            var r = {}
            if (null == n) return r
            for (
              var e = !1,
                i =
                  ((t = vt(t, function (t) {
                    return (t = si(t, n)), (e = e || 1 < t.length), t
                  })),
                  _i(n, Vi(n), r),
                  e && (r = Xr(r, 7, Li)),
                  t.length);
              i--;

            )
              Qe(r, t[i])
            return r
          }),
          gs = Bi(function (n, t) {
            return null == n
              ? {}
              : Ce((r = n), t, function (n, t) {
                  return os(r, t)
                })
            var r
          })
        function vs(n, t) {
          if (null == n) return {}
          var r = vt(Vi(n), function (n) {
            return [n]
          })
          return (
            (t = Ki(t)),
            Ce(n, r, function (n, r) {
              return t(n, r[0])
            })
          )
        }
        var ys = Pi(cs),
          _s = Pi(ls)
        function ms(n) {
          return null == n ? [] : zt(n, cs(n))
        }
        var ws = Ni(function (n, t, r) {
          return (t = t.toLowerCase()), n + (r ? bs(t) : t)
        })
        function bs(n) {
          return js(Yo(n).toLowerCase())
        }
        function xs(n) {
          return (n = Yo(n)) && n.replace(vn, Mt).replace(Pn, '')
        }
        var As = Ni(function (n, t, r) {
            return n + (r ? '-' : '') + t.toLowerCase()
          }),
          Ns = Ni(function (n, t, r) {
            return n + (r ? ' ' : '') + t.toLowerCase()
          }),
          Ss = Ai('toLowerCase'),
          Os = Ni(function (n, t, r) {
            return n + (r ? '_' : '') + t.toLowerCase()
          }),
          Es = Ni(function (n, t, r) {
            return n + (r ? ' ' : '') + js(t)
          }),
          Fs = Ni(function (n, t, r) {
            return n + (r ? ' ' : '') + t.toUpperCase()
          }),
          js = Ai('toUpperCase')
        function Ds(t, r, e) {
          return (
            (t = Yo(t)),
            (r = e ? n : r) === n
              ? ((e = t), Ln.test(e) ? t.match(Tn) || [] : t.match(on) || [])
              : t.match(r) || []
          )
        }
        var qs = Me(function (t, r) {
            try {
              return ft(t, n, r)
            } catch (t) {
              return jo(t) ? t : new mn(t)
            }
          }),
          Rs = Bi(function (n, t) {
            return (
              ct(t, function (t) {
                ;(t = Su(t)), Gr(n, t, co(n[t], n))
              }),
              n
            )
          })
        function ks(n) {
          return function () {
            return n
          }
        }
        var Cs = Ei(),
          zs = Ei(!0)
        function Is(n) {
          return n
        }
        function $s(n) {
          return Se('function' == typeof n ? n : Xr(n, 1))
        }
        var Ps = Me(function (n, t) {
            return function (r) {
              return we(r, n, t)
            }
          }),
          Ms = Me(function (n, t) {
            return function (r) {
              return we(n, r, t)
            }
          })
        function Ts(n, t, r) {
          var e = cs(t),
            i = he(t, e),
            u =
              (null != r ||
                (ko(t) && (i.length || !e.length)) ||
                ((r = t), (t = n), (n = this), (i = he(t, cs(t)))),
              !(ko(r) && 'chain' in r && !r.chain)),
            o = Do(n)
          return (
            ct(i, function (r) {
              var e = t[r]
              ;(n[r] = e),
                o &&
                  (n.prototype[r] = function () {
                    var t,
                      r = this.__chain__
                    return u || r
                      ? (((t = n(this.__wrapped__)).__actions__ = yi(this.__actions__)).push({
                          func: e,
                          args: arguments,
                          thisArg: n,
                        }),
                        (t.__chain__ = r),
                        t)
                      : e.apply(n, yt([this.value()], arguments))
                  })
            }),
            n
          )
        }
        function Us() {}
        var Ls = qi(vt),
          Zs = qi(ht),
          Bs = qi(wt)
        function Ws(n) {
          return fu(n)
            ? Ft(Su(n))
            : ((t = n),
              function (n) {
                return pe(n, t)
              })
          var t
        }
        var Vs = ki(),
          Hs = ki(!0)
        function Js() {
          return []
        }
        function Gs() {
          return !1
        }
        var Ks,
          Ys = Di(function (n, t) {
            return n + t
          }, 0),
          Xs = Ii('ceil'),
          Qs = Di(function (n, t) {
            return n / t
          }, 1),
          nf = Ii('floor'),
          tf = Di(function (n, t) {
            return n * t
          }, 1),
          rf = Ii('round'),
          ef = Di(function (n, t) {
            return n - t
          }, 0)
        return (
          (jr.after = function (n, t) {
            if ('function' != typeof t) throw new Sn(i)
            return (
              (n = Ho(n)),
              function () {
                if (--n < 1) return t.apply(this, arguments)
              }
            )
          }),
          (jr.ary = fo),
          (jr.assign = Xo),
          (jr.assignIn = Qo),
          (jr.assignInWith = ns),
          (jr.assignWith = ts),
          (jr.at = rs),
          (jr.before = ao),
          (jr.bind = co),
          (jr.bindAll = Rs),
          (jr.bindKey = lo),
          (jr.castArray = function () {
            if (!arguments.length) return []
            var n = arguments[0]
            return No(n) ? n : [n]
          }),
          (jr.chain = Hu),
          (jr.chunk = function (t, r, i) {
            r = (i ? su(t, r, i) : r === n) ? 1 : cr(Ho(r), 0)
            var u = null == t ? 0 : t.length
            if (!u || r < 1) return []
            for (var o = 0, s = 0, f = e(ir(u / r)); o < u; ) f[s++] = We(t, o, (o += r))
            return f
          }),
          (jr.compact = function (n) {
            for (var t = -1, r = null == n ? 0 : n.length, e = 0, i = []; ++t < r; ) {
              var u = n[t]
              u && (i[e++] = u)
            }
            return i
          }),
          (jr.concat = function () {
            var n = arguments.length
            if (!n) return []
            for (var t = e(n - 1), r = arguments[0], i = n; i--; ) t[i - 1] = arguments[i]
            return yt(No(r) ? yi(r) : [r], se(t, 1))
          }),
          (jr.cond = function (n) {
            var t = null == n ? 0 : n.length,
              r = Ki()
            return (
              (n = t
                ? vt(n, function (n) {
                    if ('function' != typeof n[1]) throw new Sn(i)
                    return [r(n[0]), n[1]]
                  })
                : []),
              Me(function (r) {
                for (var e = -1; ++e < t; ) {
                  var i = n[e]
                  if (ft(i[0], this, r)) return ft(i[1], this, r)
                }
              })
            )
          }),
          (jr.conforms = function (n) {
            return (
              (t = Xr(n, 1)),
              (r = cs(t)),
              function (n) {
                return Qr(n, t, r)
              }
            )
            var t, r
          }),
          (jr.constant = ks),
          (jr.countBy = Ku),
          (jr.create = function (n, t) {
            return (n = Dr(n)), null == t ? n : Jr(n, t)
          }),
          (jr.curry = function t(r, e, i) {
            return ((r = Mi(r, 8, n, n, n, n, n, (e = i ? n : e))).placeholder = t.placeholder), r
          }),
          (jr.curryRight = function t(r, e, i) {
            return ((r = Mi(r, 16, n, n, n, n, n, (e = i ? n : e))).placeholder = t.placeholder), r
          }),
          (jr.debounce = ho),
          (jr.defaults = es),
          (jr.defaultsDeep = is),
          (jr.defer = rr),
          (jr.delay = po),
          (jr.difference = tn),
          (jr.differenceBy = yr),
          (jr.differenceWith = r),
          (jr.drop = function (t, r, e) {
            var i = null == t ? 0 : t.length
            return i ? We(t, (r = e || r === n ? 1 : Ho(r)) < 0 ? 0 : r, i) : []
          }),
          (jr.dropRight = function (t, r, e) {
            var i = null == t ? 0 : t.length
            return i ? We(t, 0, (r = i - (r = e || r === n ? 1 : Ho(r))) < 0 ? 0 : r) : []
          }),
          (jr.dropRightWhile = function (n, t) {
            return n && n.length ? ti(n, Ki(t, 3), !0, !0) : []
          }),
          (jr.dropWhile = function (n, t) {
            return n && n.length ? ti(n, Ki(t, 3), !0) : []
          }),
          (jr.fill = function (t, r, e, i) {
            if (!(a = null == t ? 0 : t.length)) return []
            e && 'number' != typeof e && su(t, r, e) && ((e = 0), (i = a))
            var u = t,
              o = r,
              s = e,
              f = i,
              a = u.length
            for (
              (s = Ho(s)) < 0 && (s = a < -s ? 0 : a + s),
                (f = f === n || a < f ? a : Ho(f)) < 0 && (f += a),
                f = f < s ? 0 : Jo(f);
              s < f;

            )
              u[s++] = o
            return u
          }),
          (jr.filter = function (n, t) {
            return (No(n) ? pt : oe)(n, Ki(t, 3))
          }),
          (jr.flatMap = function (n, t) {
            return se(io(n, t), 1)
          }),
          (jr.flatMapDeep = function (n, t) {
            return se(io(n, t), 1 / 0)
          }),
          (jr.flatMapDepth = function (t, r, e) {
            return (e = e === n ? 1 : Ho(e)), se(io(t, r), e)
          }),
          (jr.flatten = Du),
          (jr.flattenDeep = function (n) {
            return null != n && n.length ? se(n, 1 / 0) : []
          }),
          (jr.flattenDepth = function (t, r) {
            return null != t && t.length ? se(t, (r = r === n ? 1 : Ho(r))) : []
          }),
          (jr.flip = function (n) {
            return Mi(n, 512)
          }),
          (jr.flow = Cs),
          (jr.flowRight = zs),
          (jr.fromPairs = function (n) {
            for (var t = -1, r = null == n ? 0 : n.length, e = {}; ++t < r; ) {
              var i = n[t]
              e[i[0]] = i[1]
            }
            return e
          }),
          (jr.functions = function (n) {
            return null == n ? [] : he(n, cs(n))
          }),
          (jr.functionsIn = function (n) {
            return null == n ? [] : he(n, ls(n))
          }),
          (jr.groupBy = to),
          (jr.initial = function (n) {
            return null != n && n.length ? We(n, 0, -1) : []
          }),
          (jr.intersection = jn),
          (jr.intersectionBy = er),
          (jr.intersectionWith = Un),
          (jr.invert = ss),
          (jr.invertBy = fs),
          (jr.invokeMap = ro),
          (jr.iteratee = $s),
          (jr.keyBy = eo),
          (jr.keys = cs),
          (jr.keysIn = ls),
          (jr.map = io),
          (jr.mapKeys = function (n, t) {
            var r = {}
            return (
              (t = Ki(t, 3)),
              ce(n, function (n, e, i) {
                Gr(r, t(n, e, i), n)
              }),
              r
            )
          }),
          (jr.mapValues = function (n, t) {
            var r = {}
            return (
              (t = Ki(t, 3)),
              ce(n, function (n, e, i) {
                Gr(r, e, t(n, e, i))
              }),
              r
            )
          }),
          (jr.matches = function (n) {
            return je(Xr(n, 1))
          }),
          (jr.matchesProperty = function (n, t) {
            return De(n, Xr(t, 1))
          }),
          (jr.memoize = go),
          (jr.merge = hs),
          (jr.mergeWith = ps),
          (jr.method = Ps),
          (jr.methodOf = Ms),
          (jr.mixin = Ts),
          (jr.negate = vo),
          (jr.nthArg = function (n) {
            return (
              (n = Ho(n)),
              Me(function (t) {
                return Re(t, n)
              })
            )
          }),
          (jr.omit = ds),
          (jr.omitBy = function (n, t) {
            return vs(n, vo(Ki(t)))
          }),
          (jr.once = function (n) {
            return ao(2, n)
          }),
          (jr.orderBy = function (t, r, e, i) {
            return null == t
              ? []
              : ke(
                  t,
                  (r = No(r) ? r : null == r ? [] : [r]),
                  (e = No((e = i ? n : e)) ? e : null == e ? [] : [e]),
                )
          }),
          (jr.over = Ls),
          (jr.overArgs = fi),
          (jr.overEvery = Zs),
          (jr.overSome = Bs),
          (jr.partial = yo),
          (jr.partialRight = _o),
          (jr.partition = uo),
          (jr.pick = gs),
          (jr.pickBy = vs),
          (jr.property = Ws),
          (jr.propertyOf = function (t) {
            return function (r) {
              return null == t ? n : pe(t, r)
            }
          }),
          (jr.pull = tr),
          (jr.pullAll = ku),
          (jr.pullAllBy = function (n, t, r) {
            return n && n.length && t && t.length ? ze(n, t, Ki(r, 2)) : n
          }),
          (jr.pullAllWith = function (t, r, e) {
            return t && t.length && r && r.length ? ze(t, r, n, e) : t
          }),
          (jr.pullAt = Cu),
          (jr.range = Vs),
          (jr.rangeRight = Hs),
          (jr.rearg = mo),
          (jr.reject = function (n, t) {
            return (No(n) ? pt : oe)(n, vo(Ki(t, 3)))
          }),
          (jr.remove = function (n, t) {
            var r = []
            if (!n || !n.length) return r
            var e = -1,
              i = [],
              u = n.length
            for (t = Ki(t, 3); ++e < u; ) {
              var o = n[e]
              t(o, e, n) && (r.push(o), i.push(e))
            }
            return Ie(n, i), r
          }),
          (jr.rest = function (t, r) {
            if ('function' != typeof t) throw new Sn(i)
            return Me(t, (r = r === n ? r : Ho(r)))
          }),
          (jr.reverse = zu),
          (jr.sampleSize = function (t, r, e) {
            return (r = (e ? su(t, r, e) : r === n) ? 1 : Ho(r)), (No(t) ? Lr : Ue)(t, r)
          }),
          (jr.set = function (n, t, r) {
            return null == n ? n : Le(n, t, r)
          }),
          (jr.setWith = function (t, r, e, i) {
            return (i = 'function' == typeof i ? i : n), null == t ? t : Le(t, r, e, i)
          }),
          (jr.shuffle = function (n) {
            return (No(n) ? Zr : Be)(n)
          }),
          (jr.slice = function (t, r, e) {
            var i = null == t ? 0 : t.length
            return i
              ? ((e =
                  e && 'number' != typeof e && su(t, r, e)
                    ? ((r = 0), i)
                    : ((r = null == r ? 0 : Ho(r)), e === n ? i : Ho(e))),
                We(t, r, e))
              : []
          }),
          (jr.sortBy = oo),
          (jr.sortedUniq = function (n) {
            return n && n.length ? Ge(n) : []
          }),
          (jr.sortedUniqBy = function (n, t) {
            return n && n.length ? Ge(n, Ki(t, 2)) : []
          }),
          (jr.split = function (t, r, e) {
            return (
              e && 'number' != typeof e && su(t, r, e) && (r = e = n),
              (e = e === n ? c : e >>> 0)
                ? (t = Yo(t)) &&
                  ('string' == typeof r || (null != r && !Po(r))) &&
                  !(r = Ye(r)) &&
                  Lt(t)
                  ? ai(Jt(t), 0, e)
                  : t.split(r, e)
                : []
            )
          }),
          (jr.spread = function (n, t) {
            if ('function' != typeof n) throw new Sn(i)
            return (
              (t = null == t ? 0 : cr(Ho(t), 0)),
              Me(function (r) {
                var e = r[t]
                return (r = ai(r, 0, t)), e && yt(r, e), ft(n, this, r)
              })
            )
          }),
          (jr.tail = function (n) {
            var t = null == n ? 0 : n.length
            return t ? We(n, 1, t) : []
          }),
          (jr.take = function (t, r, e) {
            return t && t.length ? We(t, 0, (r = e || r === n ? 1 : Ho(r)) < 0 ? 0 : r) : []
          }),
          (jr.takeRight = function (t, r, e) {
            var i = null == t ? 0 : t.length
            return i ? We(t, (r = i - (r = e || r === n ? 1 : Ho(r))) < 0 ? 0 : r, i) : []
          }),
          (jr.takeRightWhile = function (n, t) {
            return n && n.length ? ti(n, Ki(t, 3), !1, !0) : []
          }),
          (jr.takeWhile = function (n, t) {
            return n && n.length ? ti(n, Ki(t, 3)) : []
          }),
          (jr.tap = function (n, t) {
            return t(n), n
          }),
          (jr.throttle = function (n, t, r) {
            var e = !0,
              u = !0
            if ('function' != typeof n) throw new Sn(i)
            return (
              ko(r) &&
                ((e = 'leading' in r ? !!r.leading : e), (u = 'trailing' in r ? !!r.trailing : u)),
              ho(n, t, { leading: e, maxWait: t, trailing: u })
            )
          }),
          (jr.thru = Ju),
          (jr.toArray = Wo),
          (jr.toPairs = ys),
          (jr.toPairsIn = _s),
          (jr.toPath = function (n) {
            return No(n) ? vt(n, Su) : Uo(n) ? [n] : yi(Nu(Yo(n)))
          }),
          (jr.toPlainObject = Ko),
          (jr.transform = function (n, t, r) {
            var e,
              i = No(n),
              u = i || Fo(n) || Lo(n)
            return (
              (t = Ki(t, 4)),
              null == r &&
                ((e = n && n.constructor),
                (r = u ? (i ? new e() : []) : ko(n) && Do(e) ? Dr(Yn(n)) : {})),
              (u ? ct : ce)(n, function (n, e, i) {
                return t(r, n, e, i)
              }),
              r
            )
          }),
          (jr.unary = function (n) {
            return fo(n, 1)
          }),
          (jr.union = Iu),
          (jr.unionBy = $u),
          (jr.unionWith = Pu),
          (jr.uniq = function (n) {
            return n && n.length ? Xe(n) : []
          }),
          (jr.uniqBy = function (n, t) {
            return n && n.length ? Xe(n, Ki(t, 2)) : []
          }),
          (jr.uniqWith = function (t, r) {
            return (r = 'function' == typeof r ? r : n), t && t.length ? Xe(t, n, r) : []
          }),
          (jr.unset = function (n, t) {
            return null == n || Qe(n, t)
          }),
          (jr.unzip = Mu),
          (jr.unzipWith = Tu),
          (jr.update = function (n, t, r) {
            return null == n ? n : ni(n, t, oi(r))
          }),
          (jr.updateWith = function (t, r, e, i) {
            return (i = 'function' == typeof i ? i : n), null == t ? t : ni(t, r, oi(e), i)
          }),
          (jr.values = ms),
          (jr.valuesIn = function (n) {
            return null == n ? [] : zt(n, ls(n))
          }),
          (jr.without = Uu),
          (jr.words = Ds),
          (jr.wrap = function (n, t) {
            return yo(oi(t), n)
          }),
          (jr.xor = Lu),
          (jr.xorBy = Zu),
          (jr.xorWith = Bu),
          (jr.zip = Wu),
          (jr.zipObject = function (n, t) {
            return ii(n || [], t || [], Wr)
          }),
          (jr.zipObjectDeep = function (n, t) {
            return ii(n || [], t || [], Le)
          }),
          (jr.zipWith = Vu),
          (jr.entries = ys),
          (jr.entriesIn = _s),
          (jr.extend = Qo),
          (jr.extendWith = ns),
          Ts(jr, jr),
          (jr.add = Ys),
          (jr.attempt = qs),
          (jr.camelCase = ws),
          (jr.capitalize = bs),
          (jr.ceil = Xs),
          (jr.clamp = function (t, r, e) {
            return (
              e === n && ((e = r), (r = n)),
              e !== n && (e = (e = Go(e)) == e ? e : 0),
              r !== n && (r = (r = Go(r)) == r ? r : 0),
              Yr(Go(t), r, e)
            )
          }),
          (jr.clone = function (n) {
            return Xr(n, 4)
          }),
          (jr.cloneDeep = function (n) {
            return Xr(n, 5)
          }),
          (jr.cloneDeepWith = function (t, r) {
            return Xr(t, 5, (r = 'function' == typeof r ? r : n))
          }),
          (jr.cloneWith = function (t, r) {
            return Xr(t, 4, (r = 'function' == typeof r ? r : n))
          }),
          (jr.conformsTo = function (n, t) {
            return null == t || Qr(n, t, cs(t))
          }),
          (jr.deburr = xs),
          (jr.defaultTo = function (n, t) {
            return null == n || n != n ? t : n
          }),
          (jr.divide = Qs),
          (jr.endsWith = function (t, r, e) {
            ;(t = Yo(t)), (r = Ye(r))
            var i = t.length
            return (
              (i = e = e === n ? i : Yr(Ho(e), 0, i)), 0 <= (e -= r.length) && t.slice(e, i) == r
            )
          }),
          (jr.eq = wo),
          (jr.escape = function (n) {
            return (n = Yo(n)) && W.test(n) ? n.replace(Z, Tt) : n
          }),
          (jr.escapeRegExp = function (n) {
            return (n = Yo(n)) && Q.test(n) ? n.replace(X, '\\$&') : n
          }),
          (jr.every = function (t, r, e) {
            return (No(t) ? ht : ie)(t, Ki((r = e && su(t, r, e) ? n : r), 3))
          }),
          (jr.find = Yu),
          (jr.findIndex = Fu),
          (jr.findKey = function (n, t) {
            return xt(n, Ki(t, 3), ce)
          }),
          (jr.findLast = Xu),
          (jr.findLastIndex = ju),
          (jr.findLastKey = function (n, t) {
            return xt(n, Ki(t, 3), le)
          }),
          (jr.floor = nf),
          (jr.forEach = Qu),
          (jr.forEachRight = no),
          (jr.forIn = function (n, t) {
            return null == n ? n : fe(n, Ki(t, 3), ls)
          }),
          (jr.forInRight = function (n, t) {
            return null == n ? n : ae(n, Ki(t, 3), ls)
          }),
          (jr.forOwn = function (n, t) {
            return n && ce(n, Ki(t, 3))
          }),
          (jr.forOwnRight = function (n, t) {
            return n && le(n, Ki(t, 3))
          }),
          (jr.get = us),
          (jr.gt = bo),
          (jr.gte = xo),
          (jr.has = function (n, t) {
            return null != n && eu(n, t, ye)
          }),
          (jr.hasIn = os),
          (jr.head = qu),
          (jr.identity = Is),
          (jr.includes = function (n, t, r, e) {
            return (
              (n = Oo(n) ? n : ms(n)),
              (r = r && !e ? Ho(r) : 0),
              (e = n.length),
              r < 0 && (r = cr(e + r, 0)),
              To(n) ? r <= e && -1 < n.indexOf(t, r) : !!e && -1 < Nt(n, t, r)
            )
          }),
          (jr.indexOf = function (n, t, r) {
            var e = null == n ? 0 : n.length
            return e ? Nt(n, t, (r = (r = null == r ? 0 : Ho(r)) < 0 ? cr(e + r, 0) : r)) : -1
          }),
          (jr.inRange = function (t, r, e) {
            return (
              (r = Vo(r)),
              e === n ? ((e = r), (r = 0)) : (e = Vo(e)),
              (t = t = Go(t)) >= lr((r = r), (e = e)) && t < cr(r, e)
            )
          }),
          (jr.invoke = as),
          (jr.isArguments = Ao),
          (jr.isArray = No),
          (jr.isArrayBuffer = So),
          (jr.isArrayLike = Oo),
          (jr.isArrayLikeObject = Eo),
          (jr.isBoolean = function (n) {
            return !0 === n || !1 === n || (Co(n) && ge(n) == d)
          }),
          (jr.isBuffer = Fo),
          (jr.isDate = En),
          (jr.isElement = function (n) {
            return Co(n) && 1 === n.nodeType && !$o(n)
          }),
          (jr.isEmpty = function (n) {
            if (null == n) return !0
            if (
              Oo(n) &&
              (No(n) ||
                'string' == typeof n ||
                'function' == typeof n.splice ||
                Fo(n) ||
                Lo(n) ||
                Ao(n))
            )
              return !n.length
            var t,
              r = ru(n)
            if (r == m || r == N) return !n.size
            if (lu(n)) return !Oe(n).length
            for (t in n) if (qn.call(n, t)) return !1
            return !0
          }),
          (jr.isEqual = function (n, t) {
            return xe(n, t)
          }),
          (jr.isEqualWith = function (t, r, e) {
            var i = (e = 'function' == typeof e ? e : n) ? e(t, r) : n
            return i === n ? xe(t, r, n, e) : !!i
          }),
          (jr.isError = jo),
          (jr.isFinite = function (n) {
            return 'number' == typeof n && sr(n)
          }),
          (jr.isFunction = Do),
          (jr.isInteger = qo),
          (jr.isLength = Ro),
          (jr.isMap = zo),
          (jr.isMatch = function (n, t) {
            return n === t || Ae(n, t, Xi(t))
          }),
          (jr.isMatchWith = function (t, r, e) {
            return (e = 'function' == typeof e ? e : n), Ae(t, r, Xi(r), e)
          }),
          (jr.isNaN = function (n) {
            return Io(n) && n != +n
          }),
          (jr.isNative = function (n) {
            if (cu(n))
              throw new mn('Unsupported core-js use. Try https://npms.io/search?q=ponyfill.')
            return Ne(n)
          }),
          (jr.isNil = function (n) {
            return null == n
          }),
          (jr.isNull = function (n) {
            return null === n
          }),
          (jr.isNumber = Io),
          (jr.isObject = ko),
          (jr.isObjectLike = Co),
          (jr.isPlainObject = $o),
          (jr.isRegExp = Po),
          (jr.isSafeInteger = function (n) {
            return qo(n) && -f <= n && n <= f
          }),
          (jr.isSet = Mo),
          (jr.isString = To),
          (jr.isSymbol = Uo),
          (jr.isTypedArray = Lo),
          (jr.isUndefined = function (t) {
            return t === n
          }),
          (jr.isWeakMap = function (n) {
            return Co(n) && ru(n) == E
          }),
          (jr.isWeakSet = function (n) {
            return Co(n) && '[object WeakSet]' == ge(n)
          }),
          (jr.join = function (n, t) {
            return null == n ? '' : fr.call(n, t)
          }),
          (jr.kebabCase = As),
          (jr.last = Ru),
          (jr.lastIndexOf = function (t, r, e) {
            var i = null == t ? 0 : t.length
            if (!i) return -1
            var u = i
            if ((e !== n && (u = (u = Ho(e)) < 0 ? cr(i + u, 0) : lr(u, i - 1)), r != r))
              return At(t, Ot, u, !0)
            for (var o = t, s = r, f = u + 1; f--; ) if (o[f] === s) return f
            return f
          }),
          (jr.lowerCase = Ns),
          (jr.lowerFirst = Ss),
          (jr.lt = Zo),
          (jr.lte = Bo),
          (jr.max = function (t) {
            return t && t.length ? ue(t, Is, ve) : n
          }),
          (jr.maxBy = function (t, r) {
            return t && t.length ? ue(t, Ki(r, 2), ve) : n
          }),
          (jr.mean = function (n) {
            return Et(n, Is)
          }),
          (jr.meanBy = function (n, t) {
            return Et(n, Ki(t, 2))
          }),
          (jr.min = function (t) {
            return t && t.length ? ue(t, Is, Ee) : n
          }),
          (jr.minBy = function (t, r) {
            return t && t.length ? ue(t, Ki(r, 2), Ee) : n
          }),
          (jr.stubArray = Js),
          (jr.stubFalse = Gs),
          (jr.stubObject = function () {
            return {}
          }),
          (jr.stubString = function () {
            return ''
          }),
          (jr.stubTrue = function () {
            return !0
          }),
          (jr.multiply = tf),
          (jr.nth = function (t, r) {
            return t && t.length ? Re(t, Ho(r)) : n
          }),
          (jr.noConflict = function () {
            return Xn._ === this && (Xn._ = In), this
          }),
          (jr.noop = Us),
          (jr.now = so),
          (jr.pad = function (n, t, r) {
            n = Yo(n)
            var e = (t = Ho(t)) ? Ht(n) : 0
            return !t || t <= e ? n : Ri(ur((t = (t - e) / 2)), r) + n + Ri(ir(t), r)
          }),
          (jr.padEnd = function (n, t, r) {
            n = Yo(n)
            var e = (t = Ho(t)) ? Ht(n) : 0
            return t && e < t ? n + Ri(t - e, r) : n
          }),
          (jr.padStart = function (n, t, r) {
            n = Yo(n)
            var e = (t = Ho(t)) ? Ht(n) : 0
            return t && e < t ? Ri(t - e, r) + n : n
          }),
          (jr.parseInt = function (n, t, r) {
            return (t = r || null == t ? 0 : t && +t), pr(Yo(n).replace(nn, ''), t || 0)
          }),
          (jr.random = function (t, r, e) {
            var i
            return (
              e && 'boolean' != typeof e && su(t, r, e) && (r = e = n),
              e === n &&
                ('boolean' == typeof r
                  ? ((e = r), (r = n))
                  : 'boolean' == typeof t && ((e = t), (t = n))),
              t === n && r === n
                ? ((t = 0), (r = 1))
                : ((t = Vo(t)), r === n ? ((r = t), (t = 0)) : (r = Vo(r))),
              r < t && ((i = t), (t = r), (r = i)),
              e || t % 1 || r % 1
                ? ((i = dr()), lr(t + i * (r - t + Jn('1e-' + ((i + '').length - 1))), r))
                : $e(t, r)
            )
          }),
          (jr.reduce = function (n, t, r) {
            var e = No(n) ? _t : Dt,
              i = arguments.length < 3
            return e(n, Ki(t, 4), r, i, re)
          }),
          (jr.reduceRight = function (n, t, r) {
            var e = No(n) ? mt : Dt,
              i = arguments.length < 3
            return e(n, Ki(t, 4), r, i, ee)
          }),
          (jr.repeat = function (t, r, e) {
            return (r = (e ? su(t, r, e) : r === n) ? 1 : Ho(r)), Pe(Yo(t), r)
          }),
          (jr.replace = function () {
            var n = arguments,
              t = Yo(n[0])
            return n.length < 3 ? t : t.replace(n[1], n[2])
          }),
          (jr.result = function (t, r, e) {
            var i = -1,
              u = (r = si(r, t)).length
            for (u || ((u = 1), (t = n)); ++i < u; ) {
              var o = null == t ? n : t[Su(r[i])]
              o === n && ((i = u), (o = e)), (t = Do(o) ? o.call(t) : o)
            }
            return t
          }),
          (jr.round = rf),
          (jr.runInContext = t),
          (jr.sample = function (n) {
            return (No(n) ? Ur : Te)(n)
          }),
          (jr.size = function (n) {
            if (null == n) return 0
            if (Oo(n)) return To(n) ? Ht(n) : n.length
            var t = ru(n)
            return t == m || t == N ? n.size : Oe(n).length
          }),
          (jr.snakeCase = Os),
          (jr.some = function (t, r, e) {
            return (No(t) ? wt : Ve)(t, Ki((r = e && su(t, r, e) ? n : r), 3))
          }),
          (jr.sortedIndex = function (n, t) {
            return He(n, t)
          }),
          (jr.sortedIndexBy = function (n, t, r) {
            return Je(n, t, Ki(r, 2))
          }),
          (jr.sortedIndexOf = function (n, t) {
            var r = null == n ? 0 : n.length
            if (r) {
              var e = He(n, t)
              if (e < r && wo(n[e], t)) return e
            }
            return -1
          }),
          (jr.sortedLastIndex = function (n, t) {
            return He(n, t, !0)
          }),
          (jr.sortedLastIndexBy = function (n, t, r) {
            return Je(n, t, Ki(r, 2), !0)
          }),
          (jr.sortedLastIndexOf = function (n, t) {
            if (null != n && n.length) {
              var r = He(n, t, !0) - 1
              if (wo(n[r], t)) return r
            }
            return -1
          }),
          (jr.startCase = Es),
          (jr.startsWith = function (n, t, r) {
            return (
              (n = Yo(n)),
              (r = null == r ? 0 : Yr(Ho(r), 0, n.length)),
              (t = Ye(t)),
              n.slice(r, r + t.length) == t
            )
          }),
          (jr.subtract = ef),
          (jr.sum = function (n) {
            return n && n.length ? qt(n, Is) : 0
          }),
          (jr.sumBy = function (n, t) {
            return n && n.length ? qt(n, Ki(t, 2)) : 0
          }),
          (jr.template = function (t, r, e) {
            var i,
              u,
              o = jr.templateSettings
            e && su(t, r, e) && (r = n), (t = Yo(t)), (r = ns({}, r, o, Ti))
            var s = cs((e = ns({}, r.imports, o.imports, Ti))),
              f = zt(e, s),
              a = 0,
              c = ((o = r.interpolate || yn), "__p += '"),
              l =
                ((e = An(
                  (r.escape || yn).source +
                    '|' +
                    o.source +
                    '|' +
                    (o === J ? an : yn).source +
                    '|' +
                    (r.evaluate || yn).source +
                    '|$',
                  'g',
                )),
                '//# sourceURL=' +
                  (qn.call(r, 'sourceURL')
                    ? (r.sourceURL + '').replace(/\s/g, ' ')
                    : 'lodash.templateSources[' + ++Bn + ']') +
                  '\n')
            if (
              (t.replace(e, function (n, r, e, o, s, f) {
                return (
                  (e = e || o),
                  (c += t.slice(a, f).replace(_n, Ut)),
                  r && ((i = !0), (c += "' +\n__e(" + r + ") +\n'")),
                  s && ((u = !0), (c += "';\n" + s + ";\n__p += '")),
                  e && (c += "' +\n((__t = (" + e + ")) == null ? '' : __t) +\n'"),
                  (a = f + n.length),
                  n
                )
              }),
              (c += "';\n"),
              (o = qn.call(r, 'variable') && r.variable))
            ) {
              if (sn.test(o)) throw new mn('Invalid `variable` option passed into `_.template`')
            } else c = 'with (obj) {\n' + c + '\n}\n'
            if (
              ((c = (u ? c.replace(M, '') : c).replace(T, '$1').replace(U, '$1;')),
              (c =
                'function(' +
                (o || 'obj') +
                ') {\n' +
                (o ? '' : 'obj || (obj = {});\n') +
                "var __t, __p = ''" +
                (i ? ', __e = _.escape' : '') +
                (u
                  ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
                  : ';\n') +
                c +
                'return __p\n}'),
              ((e = qs(function () {
                return wn(s, l + 'return ' + c).apply(n, f)
              })).source = c),
              jo(e))
            )
              throw e
            return e
          }),
          (jr.times = function (n, t) {
            if ((n = Ho(n)) < 1 || f < n) return []
            var r = c,
              e = lr(n, c)
            for (t = Ki(t), n -= c, e = Rt(e, t); ++r < n; ) t(r)
            return e
          }),
          (jr.toFinite = Vo),
          (jr.toInteger = Ho),
          (jr.toLength = Jo),
          (jr.toLower = function (n) {
            return Yo(n).toLowerCase()
          }),
          (jr.toNumber = Go),
          (jr.toSafeInteger = function (n) {
            return n ? Yr(Ho(n), -f, f) : 0 === n ? n : 0
          }),
          (jr.toString = Yo),
          (jr.toUpper = function (n) {
            return Yo(n).toUpperCase()
          }),
          (jr.trim = function (t, r, e) {
            return (t = Yo(t)) && (e || r === n)
              ? kt(t)
              : t && (r = Ye(r))
              ? ai((e = Jt(t)), $t(e, (t = Jt(r))), Pt(e, t) + 1).join('')
              : t
          }),
          (jr.trimEnd = function (t, r, e) {
            return (t = Yo(t)) && (e || r === n)
              ? t.slice(0, Gt(t) + 1)
              : t && (r = Ye(r))
              ? ai((e = Jt(t)), 0, Pt(e, Jt(r)) + 1).join('')
              : t
          }),
          (jr.trimStart = function (t, r, e) {
            return (t = Yo(t)) && (e || r === n)
              ? t.replace(nn, '')
              : t && (r = Ye(r))
              ? ai((e = Jt(t)), $t(e, Jt(r))).join('')
              : t
          }),
          (jr.truncate = function (t, r) {
            var e,
              i,
              u = 30,
              o = '...'
            if (
              (ko(r) &&
                ((e = 'separator' in r ? r.separator : e),
                (u = 'length' in r ? Ho(r.length) : u),
                (o = 'omission' in r ? Ye(r.omission) : o)),
              (r = (t = Yo(t)).length),
              (r = Lt(t) ? (i = Jt(t)).length : r) <= u)
            )
              return t
            if ((r = u - Ht(o)) < 1) return o
            if (((u = i ? ai(i, 0, r).join('') : t.slice(0, r)), e === n)) return u + o
            if ((i && (r += u.length - r), Po(e))) {
              if (t.slice(r).search(e)) {
                var s,
                  f = u
                for (
                  (e = e.global ? e : An(e.source, Yo(cn.exec(e)) + 'g')).lastIndex = 0;
                  (s = e.exec(f));

                )
                  var a = s.index
                u = u.slice(0, a === n ? r : a)
              }
            } else t.indexOf(Ye(e), r) == r || (-1 < (i = u.lastIndexOf(e)) && (u = u.slice(0, i)))
            return u + o
          }),
          (jr.unescape = function (n) {
            return (n = Yo(n)) && B.test(n) ? n.replace(L, Kt) : n
          }),
          (jr.uniqueId = function (n) {
            var t = ++Rn
            return Yo(n) + t
          }),
          (jr.upperCase = Fs),
          (jr.upperFirst = js),
          (jr.each = Qu),
          (jr.eachRight = no),
          (jr.first = qu),
          Ts(
            jr,
            ((Ks = {}),
            ce(jr, function (n, t) {
              qn.call(jr.prototype, t) || (Ks[t] = n)
            }),
            Ks),
            { chain: !1 },
          ),
          (jr.VERSION = '4.17.21'),
          ct(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function (n) {
            jr[n].placeholder = jr
          }),
          ct(['drop', 'take'], function (t, r) {
            ;(Cr.prototype[t] = function (e) {
              e = e === n ? 1 : cr(Ho(e), 0)
              var i = this.__filtered__ && !r ? new Cr(this) : this.clone()
              return (
                i.__filtered__
                  ? (i.__takeCount__ = lr(e, i.__takeCount__))
                  : i.__views__.push({
                      size: lr(e, c),
                      type: t + (i.__dir__ < 0 ? 'Right' : ''),
                    }),
                i
              )
            }),
              (Cr.prototype[t + 'Right'] = function (n) {
                return this.reverse()[t](n).reverse()
              })
          }),
          ct(['filter', 'map', 'takeWhile'], function (n, t) {
            var r = t + 1,
              e = 1 == r || 3 == r
            Cr.prototype[n] = function (n) {
              var t = this.clone()
              return (
                t.__iteratees__.push({ iteratee: Ki(n, 3), type: r }),
                (t.__filtered__ = t.__filtered__ || e),
                t
              )
            }
          }),
          ct(['head', 'last'], function (n, t) {
            var r = 'take' + (t ? 'Right' : '')
            Cr.prototype[n] = function () {
              return this[r](1).value()[0]
            }
          }),
          ct(['initial', 'tail'], function (n, t) {
            var r = 'drop' + (t ? '' : 'Right')
            Cr.prototype[n] = function () {
              return this.__filtered__ ? new Cr(this) : this[r](1)
            }
          }),
          (Cr.prototype.compact = function () {
            return this.filter(Is)
          }),
          (Cr.prototype.find = function (n) {
            return this.filter(n).head()
          }),
          (Cr.prototype.findLast = function (n) {
            return this.reverse().find(n)
          }),
          (Cr.prototype.invokeMap = Me(function (n, t) {
            return 'function' == typeof n
              ? new Cr(this)
              : this.map(function (r) {
                  return we(r, n, t)
                })
          })),
          (Cr.prototype.reject = function (n) {
            return this.filter(vo(Ki(n)))
          }),
          (Cr.prototype.slice = function (t, r) {
            t = Ho(t)
            var e = this
            return e.__filtered__ && (0 < t || r < 0)
              ? new Cr(e)
              : (t < 0 ? (e = e.takeRight(-t)) : t && (e = e.drop(t)),
                r !== n ? ((r = Ho(r)) < 0 ? e.dropRight(-r) : e.take(r - t)) : e)
          }),
          (Cr.prototype.takeRightWhile = function (n) {
            return this.reverse().takeWhile(n).reverse()
          }),
          (Cr.prototype.toArray = function () {
            return this.take(c)
          }),
          ce(Cr.prototype, function (t, r) {
            var e = /^(?:filter|find|map|reject)|While$/.test(r),
              i = /^(?:head|last)$/.test(r),
              u = jr[i ? 'take' + ('last' == r ? 'Right' : '') : r],
              o = i || /^find/.test(r)
            u &&
              (jr.prototype[r] = function () {
                function r(n) {
                  return (n = u.apply(jr, yt([n], a))), i && p ? n[0] : n
                }
                var s,
                  f = this.__wrapped__,
                  a = i ? [1] : arguments,
                  c = f instanceof Cr,
                  l = a[0],
                  h = c || No(f),
                  p =
                    (h && e && 'function' == typeof l && 1 != l.length && (c = h = !1),
                    this.__chain__),
                  d = ((l = !!this.__actions__.length), o && !p)
                return (
                  (c = c && !l),
                  !o && h
                    ? ((f = c ? f : new Cr(this)),
                      (s = t.apply(f, a)).__actions__.push({ func: Ju, args: [r], thisArg: n }),
                      new kr(s, p))
                    : d && c
                    ? t.apply(this, a)
                    : ((s = this.thru(r)), d ? (i ? s.value()[0] : s.value()) : s)
                )
              })
          }),
          ct(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function (n) {
            var t = On[n],
              r = /^(?:push|sort|unshift)$/.test(n) ? 'tap' : 'thru',
              e = /^(?:pop|shift)$/.test(n)
            jr.prototype[n] = function () {
              var n,
                i = arguments
              return e && !this.__chain__
                ? ((n = this.value()), t.apply(No(n) ? n : [], i))
                : this[r](function (n) {
                    return t.apply(No(n) ? n : [], i)
                  })
            }
          }),
          ce(Cr.prototype, function (n, t) {
            var r,
              e = jr[t]
            e &&
              ((r = e.name + ''), qn.call(br, r) || (br[r] = []), br[r].push({ name: t, func: e }))
          }),
          (br[Fi(n, 2).name] = [{ name: 'wrapper', func: n }]),
          (Cr.prototype.clone = function () {
            var n = new Cr(this.__wrapped__)
            return (
              (n.__actions__ = yi(this.__actions__)),
              (n.__dir__ = this.__dir__),
              (n.__filtered__ = this.__filtered__),
              (n.__iteratees__ = yi(this.__iteratees__)),
              (n.__takeCount__ = this.__takeCount__),
              (n.__views__ = yi(this.__views__)),
              n
            )
          }),
          (Cr.prototype.reverse = function () {
            var n
            return (
              this.__filtered__
                ? (((n = new Cr(this)).__dir__ = -1), (n.__filtered__ = !0))
                : ((n = this.clone()).__dir__ *= -1),
              n
            )
          }),
          (Cr.prototype.value = function () {
            var n = this.__wrapped__.value(),
              t = this.__dir__,
              r = No(n),
              e = t < 0,
              i = r ? n.length : 0,
              u = (function (n, t, r) {
                for (var e = -1, i = r.length; ++e < i; ) {
                  var u = r[e],
                    o = u.size
                  switch (u.type) {
                    case 'drop':
                      n += o
                      break
                    case 'dropRight':
                      t -= o
                      break
                    case 'take':
                      t = lr(t, n + o)
                      break
                    case 'takeRight':
                      n = cr(n, t - o)
                  }
                }
                return { start: n, end: t }
              })(0, i, this.__views__),
              o = u.start,
              s = (u = u.end) - o,
              f = e ? u : o - 1,
              a = this.__iteratees__,
              c = a.length,
              l = 0,
              h = lr(s, this.__takeCount__)
            if (!r || (!e && i == s && h == s)) return ri(n, this.__actions__)
            var p = []
            n: for (; s-- && l < h; ) {
              for (var d = -1, g = n[(f += t)]; ++d < c; ) {
                var v = (y = a[d]).iteratee,
                  y = y.type
                if (((v = v(g)), 2 == y)) g = v
                else if (!v) {
                  if (1 == y) continue n
                  break n
                }
              }
              p[l++] = g
            }
            return p
          }),
          (jr.prototype.at = Gu),
          (jr.prototype.chain = function () {
            return Hu(this)
          }),
          (jr.prototype.commit = function () {
            return new kr(this.value(), this.__chain__)
          }),
          (jr.prototype.next = function () {
            this.__values__ === n && (this.__values__ = Wo(this.value()))
            var t = this.__index__ >= this.__values__.length
            return { done: t, value: t ? n : this.__values__[this.__index__++] }
          }),
          (jr.prototype.plant = function (t) {
            for (var r, e = this; e instanceof Rr; ) {
              var i = Eu(e),
                u = ((i.__index__ = 0), (i.__values__ = n), r ? (u.__wrapped__ = i) : (r = i), i)
              e = e.__wrapped__
            }
            return (u.__wrapped__ = t), r
          }),
          (jr.prototype.reverse = function () {
            var t = this.__wrapped__
            return t instanceof Cr
              ? ((t = t),
                (t = (t = this.__actions__.length ? new Cr(this) : t).reverse()).__actions__.push({
                  func: Ju,
                  args: [zu],
                  thisArg: n,
                }),
                new kr(t, this.__chain__))
              : this.thru(zu)
          }),
          (jr.prototype.toJSON =
            jr.prototype.valueOf =
            jr.prototype.value =
              function () {
                return ri(this.__wrapped__, this.__actions__)
              }),
          (jr.prototype.first = jr.prototype.head),
          Xt &&
            (jr.prototype[Xt] = function () {
              return this
            }),
          jr
        )
      })()
    Qn ? (((Qn.exports = Yt)._ = Yt), (e._ = Yt)) : (Xn._ = Yt)
  }.call(Cn),
  zn.exports
var $n = { exports: {} }
;(function (n) {
  function t(n) {
    var t,
      r,
      e,
      i = n.length - 1,
      u = '',
      o = n[0]
    if (0 < i) {
      for (u += o, t = 1; t < i; t++) (e = n[t] + ''), (r = Mn - e.length) && (u += d(r)), (u += e)
      ;(o = n[t]), (r = Mn - (e = o + '').length) && (u += d(r))
    } else if (0 === o) return '0'
    for (; o % 10 == 0; ) o /= 10
    return u + o
  }
  function r(n, t, r) {
    if (n !== ~~n || n < t || r < n) throw Error(En + n)
  }
  function e(n, t, r, e) {
    for (var i, u, o = n[0]; 10 <= o; o /= 10) --t
    return (
      --t < 0 ? ((t += Mn), (i = 0)) : ((i = Math.ceil((t + 1) / Mn)), (t %= Mn)),
      (o = Rn(10, Mn - t)),
      (u = n[i] % o | 0),
      null == e
        ? t < 3
          ? (0 == t ? (u = (u / 100) | 0) : 1 == t && (u = (u / 10) | 0),
            (r < 4 && 99999 == u) || (3 < r && 49999 == u) || 5e4 == u || 0 == u)
          : (((r < 4 && u + 1 == o) || (3 < r && u + 1 == o / 2)) &&
              ((n[i + 1] / o / 100) | 0) == Rn(10, t - 2) - 1) ||
            ((u == o / 2 || 0 == u) && 0 == ((n[i + 1] / o / 100) | 0))
        : t < 4
        ? (0 == t
            ? (u = (u / 1e3) | 0)
            : 1 == t
            ? (u = (u / 100) | 0)
            : 2 == t && (u = (u / 10) | 0),
          ((e || r < 4) && 9999 == u) || (!e && 3 < r && 4999 == u))
        : (((e || r < 4) && u + 1 == o) || (!e && 3 < r && u + 1 == o / 2)) &&
          ((n[i + 1] / o / 1e3) | 0) == Rn(10, t - 3) - 1
    )
  }
  function i(n, t, r) {
    for (var e, i, u = [0], o = 0, s = n.length; o < s; ) {
      for (i = u.length; i--; ) u[i] *= t
      for (u[0] += bn.indexOf(n.charAt(o++)), e = 0; e < u.length; e++)
        u[e] > r - 1 &&
          (void 0 === u[e + 1] && (u[e + 1] = 0), (u[e + 1] += (u[e] / r) | 0), (u[e] %= r))
    }
    return u.reverse()
  }
  function u(n, t, r) {
    var e,
      i = 0,
      u = n.length
    for (n = n.slice(); u--; ) (e = n[u] * t + i), (n[u] = e % r | 0), (i = (e / r) | 0)
    return i && n.unshift(i), n
  }
  function o(n, t, r, e) {
    var i, u
    if (r != e) u = e < r ? 1 : -1
    else
      for (i = u = 0; i < r; i++)
        if (n[i] != t[i]) {
          u = n[i] > t[i] ? 1 : -1
          break
        }
    return u
  }
  function s(n, t, r, e) {
    for (var i = 0; r--; ) (n[r] -= i), (i = n[r] < t[r] ? 1 : 0), (n[r] = i * e + n[r] - t[r])
    for (; !n[0] && 1 < n.length; ) n.shift()
  }
  function f(n, t, r, e) {
    var i,
      u,
      o,
      s,
      f,
      a,
      c,
      l,
      h = n.constructor
    n: if (null != t) {
      if (!(c = n.d)) return n
      for (i = 1, s = c[0]; 10 <= s; s /= 10) i++
      if ((u = t - i) < 0) (u += Mn), (o = t), (f = ((a = c[(l = 0)]) / Rn(10, i - o - 1)) % 10 | 0)
      else if (((l = Math.ceil((u + 1) / Mn)), (s = c.length) <= l)) {
        if (!e) break n
        for (; s++ <= l; ) c.push(0)
        ;(a = f = 0), (o = (u %= Mn) - Mn + (i = 1))
      } else {
        for (a = s = c[l], i = 1; 10 <= s; s /= 10) i++
        f = (o = (u %= Mn) - Mn + i) < 0 ? 0 : (a / Rn(10, i - o - 1)) % 10 | 0
      }
      if (
        ((e = e || t < 0 || void 0 !== c[l + 1] || (o < 0 ? a : a % Rn(10, i - o - 1))),
        (f =
          r < 4
            ? (f || e) && (0 == r || r == (n.s < 0 ? 3 : 2))
            : 5 < f ||
              (5 == f &&
                (4 == r ||
                  e ||
                  (6 == r && (0 < u ? (0 < o ? a / Rn(10, i - o) : 0) : c[l - 1]) % 10 & 1) ||
                  r == (n.s < 0 ? 8 : 7)))),
        t < 1 || !c[0])
      )
        return (
          (c.length = 0),
          f
            ? ((t -= n.e + 1), (c[0] = Rn(10, (Mn - (t % Mn)) % Mn)), (n.e = -t || 0))
            : (c[0] = n.e = 0),
          n
        )
      if (
        (0 == u
          ? ((c.length = l), (s = 1), l--)
          : ((c.length = l + 1),
            (s = Rn(10, Mn - u)),
            (c[l] = 0 < o ? ((a / Rn(10, i - o)) % Rn(10, o) | 0) * s : 0)),
        f)
      )
        for (;;) {
          if (0 == l) {
            for (u = 1, o = c[0]; 10 <= o; o /= 10) u++
            for (o = c[0] += s, s = 1; 10 <= o; o /= 10) s++
            u != s && (n.e++, c[0] == Pn && (c[0] = 1))
            break
          }
          if (((c[l] += s), c[l] != Pn)) break
          ;(c[l--] = 0), (s = 1)
        }
      for (u = c.length; 0 === c[--u]; ) c.pop()
    }
    return (
      Sn && (n.e > h.maxE ? ((n.d = null), (n.e = NaN)) : n.e < h.minE && ((n.e = 0), (n.d = [0]))),
      n
    )
  }
  function a(n, r, e) {
    if (!n.isFinite()) return w(n)
    var i,
      u = n.e,
      o = t(n.d),
      s = o.length
    return (
      r
        ? (e && 0 < (i = e - s)
            ? (o = o.charAt(0) + '.' + o.slice(1) + d(i))
            : 1 < s && (o = o.charAt(0) + '.' + o.slice(1)),
          (o = o + (n.e < 0 ? 'e' : 'e+') + n.e))
        : u < 0
        ? ((o = '0.' + d(-u - 1) + o), e && 0 < (i = e - s) && (o += d(i)))
        : s <= u
        ? ((o += d(u + 1 - s)), e && 0 < (i = e - u - 1) && (o = o + '.' + d(i)))
        : ((i = u + 1) < s && (o = o.slice(0, i) + '.' + o.slice(i)),
          e && 0 < (i = e - s) && (u + 1 === s && (o += '.'), (o += d(i)))),
      o
    )
  }
  function c(n, t) {
    var r = n[0]
    for (t *= Mn; 10 <= r; r /= 10) t++
    return t
  }
  function l(n, t, r) {
    if (Tn < t) throw ((Sn = !0), r && (n.precision = r), Error(Fn))
    return f(new n(xn), t, 1, !0)
  }
  function h(n, t, r) {
    if (Un < t) throw Error(Fn)
    return f(new n(An), t, r, !0)
  }
  function p(n) {
    var t = n.length - 1,
      r = t * Mn + 1
    if ((t = n[t])) {
      for (; t % 10 == 0; t /= 10) r--
      for (t = n[0]; 10 <= t; t /= 10) r++
    }
    return r
  }
  function d(n) {
    for (var t = ''; n--; ) t += '0'
    return t
  }
  function g(n, t, r, e) {
    var i,
      u = new n(1),
      o = Math.ceil(e / Mn + 4)
    for (Sn = !1; ; ) {
      if ((r % 2 && O((u = u.times(t)).d, o) && (i = !0), 0 === (r = qn(r / 2)))) {
        ;(r = u.d.length - 1), i && 0 === u.d[r] && ++u.d[r]
        break
      }
      O((t = t.times(t)).d, o)
    }
    return (Sn = !0), u
  }
  function v(n) {
    return 1 & n.d[n.d.length - 1]
  }
  function y(n, t, r) {
    for (var e, i = new n(t[0]), u = 0; ++u < t.length; ) {
      if (!(e = new n(t[u])).s) {
        i = e
        break
      }
      i[r](e) && (i = e)
    }
    return i
  }
  function _(n, r) {
    var i,
      u,
      o,
      s,
      a,
      c,
      l,
      h = 0,
      p = 0,
      d = 0,
      g = n.constructor,
      v = g.rounding,
      y = g.precision
    if (!n.d || !n.d[0] || 17 < n.e)
      return new g(n.d ? (n.d[0] ? (n.s < 0 ? 0 : 1 / 0) : 1) : n.s ? (n.s < 0 ? 0 : n) : NaN)
    for (l = null == r ? ((Sn = !1), y) : r, c = new g(0.03125); -2 < n.e; )
      (n = n.times(c)), (d += 5)
    for (
      l += u = ((Math.log(Rn(2, d)) / Math.LN10) * 2 + 5) | 0,
        i = s = a = new g(1),
        g.precision = l;
      ;

    ) {
      if (
        ((s = f(s.times(n), l, 1)),
        (i = i.times(++p)),
        t((c = a.plus(Zn(s, i, l, 1))).d).slice(0, l) === t(a.d).slice(0, l))
      ) {
        for (o = d; o--; ) a = f(a.times(a), l, 1)
        if (null != r) return (g.precision = y), a
        if (!(h < 3 && e(a.d, l - u, v, h))) return f(a, (g.precision = y), v, (Sn = !0))
        ;(g.precision = l += 10), (i = s = c = new g(1)), (p = 0), h++
      }
      a = c
    }
  }
  function m(n, r) {
    var i,
      u,
      o,
      s,
      a,
      c,
      h,
      p,
      d,
      g,
      v,
      y = 1,
      _ = n,
      w = _.d,
      b = _.constructor,
      x = b.rounding,
      A = b.precision
    if (_.s < 0 || !w || !w[0] || (!_.e && 1 == w[0] && 1 == w.length))
      return new b(w && !w[0] ? -1 / 0 : 1 != _.s ? NaN : w ? 0 : _)
    if (
      ((d = null == r ? ((Sn = !1), A) : r),
      (b.precision = d += 10),
      (u = (i = t(w)).charAt(0)),
      !(Math.abs((s = _.e)) < 15e14))
    )
      return (
        (p = l(b, d + 2, A).times(s + '')),
        (_ = m(new b(u + '.' + i.slice(1)), d - 10).plus(p)),
        (b.precision = A),
        null == r ? f(_, A, x, (Sn = !0)) : _
      )
    for (; (u < 7 && 1 != u) || (1 == u && 3 < i.charAt(1)); )
      (u = (i = t((_ = _.times(n)).d)).charAt(0)), y++
    for (
      s = _.e,
        1 < u ? ((_ = new b('0.' + i)), s++) : (_ = new b(u + '.' + i.slice(1))),
        h = a = _ = Zn((g = _).minus(1), _.plus(1), d, 1),
        v = f(_.times(_), d, 1),
        o = 3;
      ;

    ) {
      if (
        ((a = f(a.times(v), d, 1)),
        t((p = h.plus(Zn(a, new b(o), d, 1))).d).slice(0, d) === t(h.d).slice(0, d))
      ) {
        if (
          ((h = h.times(2)),
          0 !== s && (h = h.plus(l(b, d + 2, A).times(s + ''))),
          (h = Zn(h, new b(y), d, 1)),
          null != r)
        )
          return (b.precision = A), h
        if (!e(h.d, d - 10, x, c)) return f(h, (b.precision = A), x, (Sn = !0))
        ;(b.precision = d += 10),
          (p = a = _ = Zn(g.minus(1), g.plus(1), d, 1)),
          (v = f(_.times(_), d, 1)),
          (o = c = 1)
      }
      ;(h = p), (o += 2)
    }
  }
  function w(n) {
    return String((n.s * n.s) / 0)
  }
  function b(n, t) {
    var r, e, i
    for (
      0 < (e = (t = -1 < (r = t.indexOf('.')) ? t.replace('.', '') : t).search(/e/i))
        ? (r < 0 && (r = e), (r += +t.slice(e + 1)), (t = t.substring(0, e)))
        : r < 0 && (r = t.length),
        e = 0;
      48 === t.charCodeAt(e);
      e++
    );
    for (i = t.length; 48 === t.charCodeAt(i - 1); --i);
    if ((t = t.slice(e, i))) {
      if (
        ((i -= e), (n.e = r = r - e - 1), (n.d = []), (e = (r + 1) % Mn), r < 0 && (e += Mn), e < i)
      ) {
        for (e && n.d.push(+t.slice(0, e)), i -= Mn; e < i; ) n.d.push(+t.slice(e, (e += Mn)))
        ;(t = t.slice(e)), (e = Mn - t.length)
      } else e -= i
      for (; e--; ) t += '0'
      n.d.push(+t),
        Sn &&
          (n.e > n.constructor.maxE
            ? ((n.d = null), (n.e = NaN))
            : n.e < n.constructor.minE && ((n.e = 0), (n.d = [0])))
    } else (n.e = 0), (n.d = [0])
    return n
  }
  function x(n, t, r, e, i) {
    var u,
      o,
      s,
      f,
      a = n.precision,
      c = Math.ceil(a / Mn)
    for (Sn = !1, f = r.times(r), s = new n(e); ; ) {
      if (
        ((o = Zn(s.times(f), new n(t++ * t++), a, 1)),
        (s = i ? e.plus(o) : e.minus(o)),
        (e = Zn(o.times(f), new n(t++ * t++), a, 1)),
        void 0 !== (o = s.plus(e)).d[c])
      ) {
        for (u = c; o.d[u] === s.d[u] && u--; );
        if (-1 == u) break
      }
      ;(u = s), (s = e), (e = o), (o = u)
    }
    return (Sn = !0), (o.d.length = c + 1), o
  }
  function A(n, t) {
    for (var r = n; --t; ) r *= n
    return r
  }
  function N(n, t) {
    var r,
      e = t.s < 0,
      i = (n = h(n, n.precision, 1)).times(0.5)
    if ((t = t.abs()).lte(i)) return (_n = e ? 4 : 1), t
    if ((r = t.divToInt(n)).isZero()) _n = e ? 3 : 2
    else {
      if ((t = t.minus(r.times(n))).lte(i)) return (_n = v(r) ? (e ? 2 : 3) : e ? 4 : 1), t
      _n = v(r) ? (e ? 1 : 4) : e ? 3 : 2
    }
    return t.minus(n).abs()
  }
  function S(n, t, e, u) {
    var o,
      s,
      f,
      c,
      l,
      h,
      p,
      d,
      g = n.constructor,
      v = void 0 !== e
    if (
      (v
        ? (r(e, 1, wn), void 0 === u ? (u = g.rounding) : r(u, 0, 8))
        : ((e = g.precision), (u = g.rounding)),
      n.isFinite())
    ) {
      for (
        v ? ((o = 2), 16 == t ? (e = 4 * e - 3) : 8 == t && (e = 3 * e - 2)) : (o = t),
          0 <= (f = (h = a(n)).indexOf('.')) &&
            ((h = h.replace('.', '')),
            ((d = new g(1)).e = h.length - f),
            (d.d = i(a(d), 10, o)),
            (d.e = d.d.length)),
          s = c = (p = i(h, 10, o)).length;
        0 == p[--c];

      )
        p.pop()
      if (p[0]) {
        if (
          (f < 0
            ? s--
            : (((n = new g(n)).d = p),
              (n.e = s),
              (p = (n = Zn(n, d, e, u, 0, o)).d),
              (s = n.e),
              (l = vn)),
          (f = p[e]),
          (g = o / 2),
          (l = l || void 0 !== p[e + 1]),
          (l =
            u < 4
              ? (void 0 !== f || l) && (0 === u || u === (n.s < 0 ? 3 : 2))
              : g < f ||
                (f === g &&
                  (4 === u || l || (6 === u && 1 & p[e - 1]) || u === (n.s < 0 ? 8 : 7)))),
          (p.length = e),
          l)
        )
          for (; ++p[--e] > o - 1; ) (p[e] = 0), e || (++s, p.unshift(1))
        for (c = p.length; !p[c - 1]; --c);
        for (f = 0, h = ''; f < c; f++) h += bn.charAt(p[f])
        if (v) {
          if (1 < c)
            if (16 == t || 8 == t) {
              for (f = 16 == t ? 4 : 3, --c; c % f; c++) h += '0'
              for (c = (p = i(h, o, t)).length; !p[c - 1]; --c);
              for (f = 1, h = '1.'; f < c; f++) h += bn.charAt(p[f])
            } else h = h.charAt(0) + '.' + h.slice(1)
          h = h + (s < 0 ? 'p' : 'p+') + s
        } else if (s < 0) {
          for (; ++s; ) h = '0' + h
          h = '0.' + h
        } else if (++s > c) for (s -= c; s--; ) h += '0'
        else s < c && (h = h.slice(0, s) + '.' + h.slice(s))
      } else h = v ? '0p+0' : '0'
      h = (16 == t ? '0x' : 2 == t ? '0b' : 8 == t ? '0o' : '') + h
    } else h = w(n)
    return n.s < 0 ? '-' + h : h
  }
  function O(n, t) {
    return n.length > t && ((n.length = t), 1)
  }
  function E(n) {
    return new this(n).abs()
  }
  function F(n) {
    return new this(n).acos()
  }
  function j(n) {
    return new this(n).acosh()
  }
  function D(n, t) {
    return new this(n).plus(t)
  }
  function q(n) {
    return new this(n).asin()
  }
  function R(n) {
    return new this(n).asinh()
  }
  function k(n) {
    return new this(n).atan()
  }
  function C(n) {
    return new this(n).atanh()
  }
  function z(n, t) {
    ;(n = new this(n)), (t = new this(t))
    var r,
      e = this.precision,
      i = this.rounding,
      u = e + 4
    return (
      n.s && t.s
        ? n.d || t.d
          ? !t.d || n.isZero()
            ? ((r = t.s < 0 ? h(this, e, i) : new this(0)).s = n.s)
            : !n.d || t.isZero()
            ? ((r = h(this, u, 1).times(0.5)).s = n.s)
            : (r =
                t.s < 0
                  ? ((this.precision = u),
                    (this.rounding = 1),
                    (r = this.atan(Zn(n, t, u, 1))),
                    (t = h(this, u, 1)),
                    (this.precision = e),
                    (this.rounding = i),
                    n.s < 0 ? r.minus(t) : r.plus(t))
                  : this.atan(Zn(n, t, u, 1)))
          : ((r = h(this, u, 1).times(0 < t.s ? 0.25 : 0.75)).s = n.s)
        : (r = new this(NaN)),
      r
    )
  }
  function I(n) {
    return new this(n).cbrt()
  }
  function $(n) {
    return f((n = new this(n)), n.e + 1, 2)
  }
  function P(n, t, r) {
    return new this(n).clamp(t, r)
  }
  function M(n) {
    if (!n || 'object' != typeof n) throw Error(On + 'Object expected')
    for (
      var t,
        r,
        e = !0 === n.defaults,
        i = [
          'precision',
          1,
          wn,
          'rounding',
          0,
          8,
          'toExpNeg',
          -mn,
          0,
          'toExpPos',
          0,
          mn,
          'maxE',
          0,
          mn,
          'minE',
          -mn,
          0,
          'modulo',
          0,
          9,
        ],
        u = 0;
      u < i.length;
      u += 3
    )
      if (((t = i[u]), e && (this[t] = Nn[t]), void 0 !== (r = n[t]))) {
        if (!(qn(r) === r && i[u + 1] <= r && r <= i[u + 2])) throw Error(En + t + ': ' + r)
        this[t] = r
      }
    if (((t = 'crypto'), e && (this[t] = Nn[t]), void 0 !== (r = n[t]))) {
      if (!0 !== r && !1 !== r && 0 !== r && 1 !== r) throw Error(En + t + ': ' + r)
      if (r) {
        if (
          'undefined' == typeof crypto ||
          !crypto ||
          (!crypto.getRandomValues && !crypto.randomBytes)
        )
          throw Error(jn)
        this[t] = !0
      } else this[t] = !1
    }
    return this
  }
  function T(n) {
    return new this(n).cos()
  }
  function U(n) {
    return new this(n).cosh()
  }
  function L(n, t) {
    return new this(n).div(t)
  }
  function Z(n) {
    return new this(n).exp()
  }
  function B(n) {
    return f((n = new this(n)), n.e + 1, 3)
  }
  function W() {
    var n,
      t,
      r = new this(0)
    for (Sn = !1, n = 0; n < arguments.length; )
      if ((t = new this(arguments[n++])).d) r.d && (r = r.plus(t.times(t)))
      else {
        if (t.s) return (Sn = !0), new this(1 / 0)
        r = t
      }
    return (Sn = !0), r.sqrt()
  }
  function V(n) {
    return n instanceof gn || (n && n.toStringTag === Dn) || !1
  }
  function H(n) {
    return new this(n).ln()
  }
  function J(n, t) {
    return new this(n).log(t)
  }
  function G(n) {
    return new this(n).log(2)
  }
  function K(n) {
    return new this(n).log(10)
  }
  function Y() {
    return y(this, arguments, 'lt')
  }
  function X() {
    return y(this, arguments, 'gt')
  }
  function Q(n, t) {
    return new this(n).mod(t)
  }
  function nn(n, t) {
    return new this(n).mul(t)
  }
  function tn(n, t) {
    return new this(n).pow(t)
  }
  function rn(n) {
    var t,
      e,
      i,
      u,
      o = 0,
      s = new this(1),
      f = []
    if ((void 0 === n ? (n = this.precision) : r(n, 1, wn), (i = Math.ceil(n / Mn)), this.crypto))
      if (crypto.getRandomValues)
        for (t = crypto.getRandomValues(new Uint32Array(i)); o < i; )
          429e7 <= (u = t[o])
            ? (t[o] = crypto.getRandomValues(new Uint32Array(1))[0])
            : (f[o++] = u % 1e7)
      else {
        if (!crypto.randomBytes) throw Error(jn)
        for (t = crypto.randomBytes((i *= 4)); o < i; )
          214e7 <= (u = t[o] + (t[o + 1] << 8) + (t[o + 2] << 16) + ((127 & t[o + 3]) << 24))
            ? crypto.randomBytes(4).copy(t, o)
            : (f.push(u % 1e7), (o += 4))
        o = i / 4
      }
    else for (; o < i; ) f[o++] = (1e7 * Math.random()) | 0
    for (
      i = f[--o], n %= Mn, i && n && ((u = Rn(10, Mn - n)), (f[o] = ((i / u) | 0) * u));
      0 === f[o];
      o--
    )
      f.pop()
    if (o < 0) f = [(e = 0)]
    else {
      for (e = -1; 0 === f[0]; e -= Mn) f.shift()
      for (i = 1, u = f[0]; 10 <= u; u /= 10) i++
      i < Mn && (e -= Mn - i)
    }
    return (s.e = e), (s.d = f), s
  }
  function en(n) {
    return f((n = new this(n)), n.e + 1, this.rounding)
  }
  function un(n) {
    return (n = new this(n)).d ? (n.d[0] ? n.s : 0 * n.s) : n.s || NaN
  }
  function on(n) {
    return new this(n).sin()
  }
  function sn(n) {
    return new this(n).sinh()
  }
  function fn(n) {
    return new this(n).sqrt()
  }
  function an(n, t) {
    return new this(n).sub(t)
  }
  function cn() {
    var n = 0,
      t = arguments,
      r = new this(t[n])
    for (Sn = !1; r.s && ++n < t.length; ) r = r.plus(t[n])
    return (Sn = !0), f(r, this.precision, this.rounding)
  }
  function ln(n) {
    return new this(n).tan()
  }
  function hn(n) {
    return new this(n).tanh()
  }
  function pn(n) {
    return f((n = new this(n)), n.e + 1, 1)
  }
  var dn,
    gn,
    vn,
    yn,
    _n,
    mn,
    wn,
    bn,
    xn,
    An,
    Nn,
    Sn,
    On,
    En,
    Fn,
    jn,
    Dn,
    qn,
    Rn,
    kn,
    zn,
    In,
    $n,
    Pn,
    Mn,
    Tn,
    Un,
    Ln,
    Zn
  ;(dn = Cn),
    (wn = 1e9),
    (bn = '0123456789abcdef'),
    (xn =
      '2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058'),
    (Nn = {
      precision: 20,
      rounding: 4,
      modulo: 1,
      toExpNeg: -7,
      toExpPos: 21,
      minE: -(mn = 9e15),
      maxE: mn,
      crypto: !(An =
        '3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789'),
    }),
    (Sn = !0),
    (En = (On = '[DecimalError] ') + 'Invalid argument: '),
    (Fn = On + 'Precision limit exceeded'),
    (jn = On + 'crypto unavailable'),
    (Dn = '[object Decimal]'),
    (qn = Math.floor),
    (Rn = Math.pow),
    (kn = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i),
    (zn = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i),
    (In = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i),
    ($n = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i),
    (Pn = 1e7),
    (Mn = 7),
    (Tn = xn.length - 1),
    (Un = An.length - 1),
    ((Ln = { toStringTag: Dn }).absoluteValue = Ln.abs =
      function () {
        var n = new this.constructor(this)
        return n.s < 0 && (n.s = 1), f(n)
      }),
    (Ln.ceil = function () {
      return f(new this.constructor(this), this.e + 1, 2)
    }),
    (Ln.clampedTo = Ln.clamp =
      function (n, t) {
        var r = this.constructor
        if (((n = new r(n)), (t = new r(t)), !n.s || !t.s)) return new r(NaN)
        if (n.gt(t)) throw Error(En + t)
        return this.cmp(n) < 0 ? n : 0 < this.cmp(t) ? t : new r(this)
      }),
    (Ln.comparedTo = Ln.cmp =
      function (n) {
        var t,
          r,
          e = this,
          i = e.d,
          u = (n = new e.constructor(n)).d,
          o = e.s,
          s = n.s
        if (!i || !u) return o && s ? (o !== s ? o : i === u ? 0 : !i ^ (o < 0) ? 1 : -1) : NaN
        if (!i[0] || !u[0]) return i[0] ? o : u[0] ? -s : 0
        if (o !== s) return o
        if (e.e !== n.e) return (e.e > n.e) ^ (o < 0) ? 1 : -1
        for (t = 0, r = (s = i.length) < (e = u.length) ? s : e; t < r; ++t)
          if (i[t] !== u[t]) return (i[t] > u[t]) ^ (o < 0) ? 1 : -1
        return s === e ? 0 : (e < s) ^ (o < 0) ? 1 : -1
      }),
    (Ln.cosine = Ln.cos =
      function () {
        var n,
          t,
          r = this,
          e = r.constructor
        return r.d
          ? r.d[0]
            ? ((n = e.precision),
              (t = e.rounding),
              (e.precision = n + Math.max(r.e, r.sd()) + Mn),
              (e.rounding = 1),
              (r = (function (n, t) {
                var r, e
                if (t.isZero()) return t
                ;(e =
                  (e = t.d.length) < 32
                    ? (1 / A(4, (r = Math.ceil(e / 3)))).toString()
                    : ((r = 16), '2.3283064365386962890625e-10')),
                  (n.precision += r),
                  (t = x(n, 1, t.times(e), new n(1)))
                for (var i = r; i--; ) {
                  var u = t.times(t)
                  t = u.times(u).minus(u).times(8).plus(1)
                }
                return (n.precision -= r), t
              })(e, N(e, r))),
              (e.precision = n),
              (e.rounding = t),
              f(2 == _n || 3 == _n ? r.neg() : r, n, t, !0))
            : new e(1)
          : new e(NaN)
      }),
    (Ln.cubeRoot = Ln.cbrt =
      function () {
        var n,
          r,
          e,
          i,
          u,
          o,
          s,
          a,
          c,
          l,
          h = this,
          p = h.constructor
        if (!h.isFinite() || h.isZero()) return new p(h)
        for (
          Sn = !1,
            (o = h.s * Rn(h.s * h, 1 / 3)) && Math.abs(o) != 1 / 0
              ? (i = new p(o.toString()))
              : ((e = t(h.d)),
                (o = ((n = h.e) - e.length + 1) % 3) && (e += 1 == o || -2 == o ? '0' : '00'),
                (o = Rn(e, 1 / 3)),
                (n = qn((n + 1) / 3) - (n % 3 == (n < 0 ? -1 : 2))),
                ((i = new p(
                  (e =
                    o == 1 / 0
                      ? '5e' + n
                      : (e = o.toExponential()).slice(0, e.indexOf('e') + 1) + n),
                )).s = h.s)),
            s = (n = p.precision) + 3;
          ;

        )
          if (
            ((l = (c = (a = i).times(a).times(a)).plus(h)),
            (i = Zn(l.plus(h).times(a), l.plus(c), s + 2, 1)),
            t(a.d).slice(0, s) === (e = t(i.d)).slice(0, s))
          ) {
            if ('9999' != (e = e.slice(s - 3, s + 1)) && (u || '4999' != e)) {
              ;(+e && (+e.slice(1) || '5' != e.charAt(0))) ||
                (f(i, n + 1, 1), (r = !i.times(i).times(i).eq(h)))
              break
            }
            if (!u && (f(a, n + 1, 0), a.times(a).times(a).eq(h))) {
              i = a
              break
            }
            ;(s += 4), (u = 1)
          }
        return (Sn = !0), f(i, n, p.rounding, r)
      }),
    (Ln.decimalPlaces = Ln.dp =
      function () {
        var n,
          t = this.d,
          r = NaN
        if (t) {
          if (((r = ((n = t.length - 1) - qn(this.e / Mn)) * Mn), (n = t[n])))
            for (; n % 10 == 0; n /= 10) r--
          r < 0 && (r = 0)
        }
        return r
      }),
    (Ln.dividedBy = Ln.div =
      function (n) {
        return Zn(this, new this.constructor(n))
      }),
    (Ln.dividedToIntegerBy = Ln.divToInt =
      function (n) {
        var t = this.constructor
        return f(Zn(this, new t(n), 0, 1, 1), t.precision, t.rounding)
      }),
    (Ln.equals = Ln.eq =
      function (n) {
        return 0 === this.cmp(n)
      }),
    (Ln.floor = function () {
      return f(new this.constructor(this), this.e + 1, 3)
    }),
    (Ln.greaterThan = Ln.gt =
      function (n) {
        return 0 < this.cmp(n)
      }),
    (Ln.greaterThanOrEqualTo = Ln.gte =
      function (n) {
        return 1 == (n = this.cmp(n)) || 0 === n
      }),
    (Ln.hyperbolicCosine = Ln.cosh =
      function () {
        var n,
          t,
          r,
          e = (s = this).constructor,
          i = new e(1)
        if (!s.isFinite()) return new e(s.s ? 1 / 0 : NaN)
        if (s.isZero()) return i
        ;(t = e.precision),
          (r = e.rounding),
          (e.precision = t + Math.max(s.e, s.sd()) + 4),
          (e.rounding = 1)
        for (
          var u,
            o =
              (o = s.d.length) < 32
                ? (1 / A(4, (n = Math.ceil(o / 3)))).toString()
                : ((n = 16), '2.3283064365386962890625e-10'),
            s = x(e, 1, s.times(o), new e(1), !0),
            a = n,
            c = new e(8);
          a--;

        )
          (u = s.times(s)), (s = i.minus(u.times(c.minus(u.times(c)))))
        return f(s, (e.precision = t), (e.rounding = r), !0)
      }),
    (Ln.hyperbolicSine = Ln.sinh =
      function () {
        var n,
          t,
          r,
          e = (o = this).constructor
        if (!o.isFinite() || o.isZero()) return new e(o)
        if (
          ((n = e.precision),
          (t = e.rounding),
          (e.precision = n + Math.max(o.e, o.sd()) + 4),
          (e.rounding = 1),
          (r = o.d.length) < 3)
        )
          o = x(e, 2, o, o, !0)
        else
          for (
            var i,
              u = 1.4 * Math.sqrt(r),
              o = x(e, 2, (o = o.times(1 / A(5, (u = 16 < u ? 16 : 0 | u)))), o, !0),
              s = new e(5),
              a = new e(16),
              c = new e(20);
            u--;

          )
            (i = o.times(o)), (o = o.times(s.plus(i.times(a.times(i).plus(c)))))
        return f(o, (e.precision = n), (e.rounding = t), !0)
      }),
    (Ln.hyperbolicTangent = Ln.tanh =
      function () {
        var n,
          t,
          r = this.constructor
        return this.isFinite()
          ? this.isZero()
            ? new r(this)
            : ((n = r.precision),
              (t = r.rounding),
              (r.precision = n + 7),
              (r.rounding = 1),
              Zn(this.sinh(), this.cosh(), (r.precision = n), (r.rounding = t)))
          : new r(this.s)
      }),
    (Ln.inverseCosine = Ln.acos =
      function () {
        var n = this,
          t = n.constructor,
          r = n.abs().cmp(1),
          e = t.precision,
          i = t.rounding
        return -1 !== r
          ? 0 === r
            ? n.isNeg()
              ? h(t, e, i)
              : new t(0)
            : new t(NaN)
          : n.isZero()
          ? h(t, e + 4, i).times(0.5)
          : ((t.precision = e + 6),
            (t.rounding = 1),
            (n = n.asin()),
            (r = h(t, e + 4, i).times(0.5)),
            (t.precision = e),
            (t.rounding = i),
            r.minus(n))
      }),
    (Ln.inverseHyperbolicCosine = Ln.acosh =
      function () {
        var n,
          t,
          r = this,
          e = r.constructor
        return r.lte(1)
          ? new e(r.eq(1) ? 0 : NaN)
          : r.isFinite()
          ? ((n = e.precision),
            (t = e.rounding),
            (e.precision = n + Math.max(Math.abs(r.e), r.sd()) + 4),
            (e.rounding = 1),
            (Sn = !1),
            (r = r.times(r).minus(1).sqrt().plus(r)),
            (Sn = !0),
            (e.precision = n),
            (e.rounding = t),
            r.ln())
          : new e(r)
      }),
    (Ln.inverseHyperbolicSine = Ln.asinh =
      function () {
        var n,
          t,
          r = this,
          e = r.constructor
        return !r.isFinite() || r.isZero()
          ? new e(r)
          : ((n = e.precision),
            (t = e.rounding),
            (e.precision = n + 2 * Math.max(Math.abs(r.e), r.sd()) + 6),
            (e.rounding = 1),
            (Sn = !1),
            (r = r.times(r).plus(1).sqrt().plus(r)),
            (Sn = !0),
            (e.precision = n),
            (e.rounding = t),
            r.ln())
      }),
    (Ln.inverseHyperbolicTangent = Ln.atanh =
      function () {
        var n,
          t,
          r,
          e = this,
          i = e.constructor
        return e.isFinite()
          ? 0 <= e.e
            ? new i(e.abs().eq(1) ? e.s / 0 : e.isZero() ? e : NaN)
            : ((n = i.precision),
              (t = i.rounding),
              (r = e.sd()),
              Math.max(r, n) < 2 * -e.e - 1
                ? f(new i(e), n, t, !0)
                : ((i.precision = r -= e.e),
                  (e = Zn(e.plus(1), new i(1).minus(e), r + n, 1)),
                  (i.precision = n + 4),
                  (i.rounding = 1),
                  (e = e.ln()),
                  (i.precision = n),
                  (i.rounding = t),
                  e.times(0.5)))
          : new i(NaN)
      }),
    (Ln.inverseSine = Ln.asin =
      function () {
        var n,
          t,
          r,
          e = this,
          i = e.constructor
        return e.isZero()
          ? new i(e)
          : ((n = e.abs().cmp(1)),
            (t = i.precision),
            (r = i.rounding),
            -1 !== n
              ? 0 === n
                ? (((n = h(i, t + 4, r).times(0.5)).s = e.s), n)
                : new i(NaN)
              : ((i.precision = t + 6),
                (i.rounding = 1),
                (e = e.div(new i(1).minus(e.times(e)).sqrt().plus(1)).atan()),
                (i.precision = t),
                (i.rounding = r),
                e.times(2)))
      }),
    (Ln.inverseTangent = Ln.atan =
      function () {
        var n,
          t,
          r,
          e,
          i,
          u,
          o,
          s,
          a,
          c = this,
          l = c.constructor,
          p = l.precision,
          d = l.rounding
        if (c.isFinite()) {
          if (c.isZero()) return new l(c)
          if (c.abs().eq(1) && p + 4 <= Un) return ((o = h(l, p + 4, d).times(0.25)).s = c.s), o
        } else {
          if (!c.s) return new l(NaN)
          if (p + 4 <= Un) return ((o = h(l, p + 4, d).times(0.5)).s = c.s), o
        }
        for (
          l.precision = s = p + 10, l.rounding = 1, n = r = Math.min(28, (s / Mn + 2) | 0);
          n;
          --n
        )
          c = c.div(c.times(c).plus(1).sqrt().plus(1))
        for (Sn = !1, t = Math.ceil(s / Mn), e = 1, a = c.times(c), o = new l(c), i = c; -1 !== n; )
          if (
            ((i = i.times(a)),
            (u = o.minus(i.div((e += 2)))),
            (i = i.times(a)),
            void 0 !== (o = u.plus(i.div((e += 2)))).d[t])
          )
            for (n = t; o.d[n] === u.d[n] && n--; );
        return (
          r && (o = o.times(2 << (r - 1))), (Sn = !0), f(o, (l.precision = p), (l.rounding = d), !0)
        )
      }),
    (Ln.isFinite = function () {
      return !!this.d
    }),
    (Ln.isInteger = Ln.isInt =
      function () {
        return !!this.d && qn(this.e / Mn) > this.d.length - 2
      }),
    (Ln.isNaN = function () {
      return !this.s
    }),
    (Ln.isNegative = Ln.isNeg =
      function () {
        return this.s < 0
      }),
    (Ln.isPositive = Ln.isPos =
      function () {
        return 0 < this.s
      }),
    (Ln.isZero = function () {
      return !!this.d && 0 === this.d[0]
    }),
    (Ln.lessThan = Ln.lt =
      function (n) {
        return this.cmp(n) < 0
      }),
    (Ln.lessThanOrEqualTo = Ln.lte =
      function (n) {
        return this.cmp(n) < 1
      }),
    (Ln.logarithm = Ln.log =
      function (n) {
        var r,
          i,
          u,
          o,
          s,
          a,
          c,
          h,
          p = this.constructor,
          d = p.precision,
          g = p.rounding
        if (null == n) (n = new p(10)), (r = !0)
        else {
          if (((i = (n = new p(n)).d), n.s < 0 || !i || !i[0] || n.eq(1))) return new p(NaN)
          r = n.eq(10)
        }
        if (((i = this.d), this.s < 0 || !i || !i[0] || this.eq(1)))
          return new p(i && !i[0] ? -1 / 0 : 1 != this.s ? NaN : i ? 0 : 1 / 0)
        if (r)
          if (1 < i.length) s = !0
          else {
            for (o = i[0]; o % 10 == 0; ) o /= 10
            s = 1 !== o
          }
        if (
          ((Sn = !1),
          (a = m(this, (c = d + 5))),
          (u = r ? l(p, c + 10) : m(n, c)),
          e((h = Zn(a, u, c, 1)).d, (o = d), g))
        )
          do {
            if (
              ((a = m(this, (c += 10))), (u = r ? l(p, c + 10) : m(n, c)), (h = Zn(a, u, c, 1)), !s)
            ) {
              ;+t(h.d).slice(o + 1, o + 15) + 1 == 1e14 && (h = f(h, d + 1, 0))
              break
            }
          } while (e(h.d, (o += 10), g))
        return (Sn = !0), f(h, d, g)
      }),
    (Ln.minus = Ln.sub =
      function (n) {
        var t,
          r,
          e,
          i,
          u,
          o,
          s,
          a,
          l,
          h,
          p,
          d = this,
          g = d.constructor
        if (((n = new g(n)), !d.d || !n.d))
          return (
            d.s && n.s
              ? d.d
                ? (n.s = -n.s)
                : (n = new g(n.d || d.s !== n.s ? d : NaN))
              : (n = new g(NaN)),
            n
          )
        if (d.s != n.s) return (n.s = -n.s), d.plus(n)
        if (((l = d.d), (p = n.d), (s = g.precision), (a = g.rounding), !l[0] || !p[0])) {
          if (p[0]) n.s = -n.s
          else {
            if (!l[0]) return new g(3 === a ? -0 : 0)
            n = new g(d)
          }
          return Sn ? f(n, s, a) : n
        }
        if (((r = qn(n.e / Mn)), (d = qn(d.e / Mn)), (l = l.slice()), (u = d - r))) {
          for (
            o = (h = u < 0) ? ((t = l), (u = -u), p.length) : ((t = p), (r = d), l.length),
              (e = Math.max(Math.ceil(s / Mn), o) + 2) < u && ((u = e), (t.length = 1)),
              t.reverse(),
              e = u;
            e--;

          )
            t.push(0)
          t.reverse()
        } else {
          for ((h = (e = l.length) < (o = p.length)) && (o = e), e = 0; e < o; e++)
            if (l[e] != p[e]) {
              h = l[e] < p[e]
              break
            }
          u = 0
        }
        for (
          h && ((t = l), (l = p), (p = t), (n.s = -n.s)), o = l.length, e = p.length - o;
          0 < e;
          --e
        )
          l[o++] = 0
        for (e = p.length; u < e; ) {
          if (l[--e] < p[e]) {
            for (i = e; i && 0 === l[--i]; ) l[i] = Pn - 1
            --l[i], (l[e] += Pn)
          }
          l[e] -= p[e]
        }
        for (; 0 === l[--o]; ) l.pop()
        for (; 0 === l[0]; l.shift()) --r
        return l[0] ? ((n.d = l), (n.e = c(l, r)), Sn ? f(n, s, a) : n) : new g(3 === a ? -0 : 0)
      }),
    (Ln.modulo = Ln.mod =
      function (n) {
        var t,
          r = this.constructor
        return (
          (n = new r(n)),
          !this.d || !n.s || (n.d && !n.d[0])
            ? new r(NaN)
            : !n.d || (this.d && !this.d[0])
            ? f(new r(this), r.precision, r.rounding)
            : ((Sn = !1),
              9 == r.modulo
                ? ((t = Zn(this, n.abs(), 0, 3, 1)).s *= n.s)
                : (t = Zn(this, n, 0, r.modulo, 1)),
              (t = t.times(n)),
              (Sn = !0),
              this.minus(t))
        )
      }),
    (Ln.naturalExponential = Ln.exp =
      function () {
        return _(this)
      }),
    (Ln.naturalLogarithm = Ln.ln =
      function () {
        return m(this)
      }),
    (Ln.negated = Ln.neg =
      function () {
        var n = new this.constructor(this)
        return (n.s = -n.s), f(n)
      }),
    (Ln.plus = Ln.add =
      function (n) {
        var t,
          r,
          e,
          i,
          u,
          o,
          s,
          a,
          l = this,
          h = l.constructor
        if (((n = new h(n)), !l.d || !n.d))
          return l.s && n.s ? l.d || (n = new h(n.d || l.s === n.s ? l : NaN)) : (n = new h(NaN)), n
        if (l.s != n.s) return (n.s = -n.s), l.minus(n)
        if (((s = l.d), (a = n.d), (u = h.precision), (o = h.rounding), !s[0] || !a[0]))
          return a[0] || (n = new h(l)), Sn ? f(n, u, o) : n
        if (((h = qn(l.e / Mn)), (l = qn(n.e / Mn)), (s = s.slice()), (e = h - l))) {
          for (
            (i =
              (i = e < 0 ? ((r = s), (e = -e), a.length) : ((r = a), (l = h), s.length)) <
              (h = Math.ceil(u / Mn))
                ? h + 1
                : i + 1) < e && ((e = i), (r.length = 1)),
              r.reverse();
            e--;

          )
            r.push(0)
          r.reverse()
        }
        for (
          (i = s.length) - (e = a.length) < 0 && ((e = i), (r = a), (a = s), (s = r)), t = 0;
          e;

        )
          (t = ((s[--e] = s[e] + a[e] + t) / Pn) | 0), (s[e] %= Pn)
        for (t && (s.unshift(t), ++l), i = s.length; 0 == s[--i]; ) s.pop()
        return (n.d = s), (n.e = c(s, l)), Sn ? f(n, u, o) : n
      }),
    (Ln.precision = Ln.sd =
      function (n) {
        var t
        if (void 0 !== n && n !== !!n && 1 !== n && 0 !== n) throw Error(En + n)
        return this.d ? ((t = p(this.d)), n && this.e + 1 > t && (t = this.e + 1)) : (t = NaN), t
      }),
    (Ln.round = function () {
      var n = this.constructor
      return f(new n(this), this.e + 1, n.rounding)
    }),
    (Ln.sine = Ln.sin =
      function () {
        var n,
          t,
          r = this,
          e = r.constructor
        return r.isFinite()
          ? r.isZero()
            ? new e(r)
            : ((n = e.precision),
              (t = e.rounding),
              (e.precision = n + Math.max(r.e, r.sd()) + Mn),
              (e.rounding = 1),
              (r = (function (n, t) {
                var r,
                  e = t.d.length
                if (e < 3) return t.isZero() ? t : x(n, 2, t, t)
                ;(r = 16 < (r = 1.4 * Math.sqrt(e)) ? 16 : 0 | r),
                  (t = x(n, 2, (t = t.times(1 / A(5, r))), t))
                for (var i, u = new n(5), o = new n(16), s = new n(20); r--; )
                  (i = t.times(t)), (t = t.times(u.plus(i.times(o.times(i).minus(s)))))
                return t
              })(e, N(e, r))),
              (e.precision = n),
              (e.rounding = t),
              f(2 < _n ? r.neg() : r, n, t, !0))
          : new e(NaN)
      }),
    (Ln.squareRoot = Ln.sqrt =
      function () {
        var n,
          r,
          e,
          i,
          u,
          o,
          s = this.d,
          a = this.e,
          c = this.s,
          l = this.constructor
        if (1 !== c || !s || !s[0])
          return new l(!c || (c < 0 && (!s || s[0])) ? NaN : s ? this : 1 / 0)
        for (
          Sn = !1,
            i =
              0 == (c = Math.sqrt(+this)) || c == 1 / 0
                ? (((r = t(s)).length + a) % 2 == 0 && (r += '0'),
                  (c = Math.sqrt(r)),
                  (a = qn((a + 1) / 2) - (a < 0 || a % 2)),
                  new l(
                    (r =
                      c == 1 / 0
                        ? '5e' + a
                        : (r = c.toExponential()).slice(0, r.indexOf('e') + 1) + a),
                  ))
                : new l(c.toString()),
            e = (a = l.precision) + 3;
          ;

        )
          if (
            ((i = (o = i).plus(Zn(this, o, e + 2, 1)).times(0.5)),
            t(o.d).slice(0, e) === (r = t(i.d)).slice(0, e))
          ) {
            if ('9999' != (r = r.slice(e - 3, e + 1)) && (u || '4999' != r)) {
              ;(+r && (+r.slice(1) || '5' != r.charAt(0))) ||
                (f(i, a + 1, 1), (n = !i.times(i).eq(this)))
              break
            }
            if (!u && (f(o, a + 1, 0), o.times(o).eq(this))) {
              i = o
              break
            }
            ;(e += 4), (u = 1)
          }
        return (Sn = !0), f(i, a, l.rounding, n)
      }),
    (Ln.tangent = Ln.tan =
      function () {
        var n,
          t,
          r = this,
          e = r.constructor
        return r.isFinite()
          ? r.isZero()
            ? new e(r)
            : ((n = e.precision),
              (t = e.rounding),
              (e.precision = n + 10),
              (e.rounding = 1),
              ((r = r.sin()).s = 1),
              (r = Zn(r, new e(1).minus(r.times(r)).sqrt(), n + 10, 0)),
              (e.precision = n),
              (e.rounding = t),
              f(2 == _n || 4 == _n ? r.neg() : r, n, t, !0))
          : new e(NaN)
      }),
    (Ln.times = Ln.mul =
      function (n) {
        var t,
          r,
          e,
          i,
          u,
          o,
          s,
          a,
          l,
          h = this.constructor,
          p = this.d,
          d = (n = new h(n)).d
        if (((n.s *= this.s), !(p && p[0] && d && d[0])))
          return new h(
            !n.s || (p && !p[0] && !d) || (d && !d[0] && !p) ? NaN : p && d ? 0 * n.s : n.s / 0,
          )
        for (
          r = qn(this.e / Mn) + qn(n.e / Mn),
            (a = p.length) < (l = d.length) &&
              ((u = p), (p = d), (d = u), (o = a), (a = l), (l = o)),
            u = [],
            e = o = a + l;
          e--;

        )
          u.push(0)
        for (e = l; 0 <= --e; ) {
          for (t = 0, i = a + e; e < i; )
            (s = u[i] + d[e] * p[i - e - 1] + t), (u[i--] = s % Pn | 0), (t = (s / Pn) | 0)
          u[i] = (u[i] + t) % Pn | 0
        }
        for (; !u[--o]; ) u.pop()
        return (
          t ? ++r : u.shift(), (n.d = u), (n.e = c(u, r)), Sn ? f(n, h.precision, h.rounding) : n
        )
      }),
    (Ln.toBinary = function (n, t) {
      return S(this, 2, n, t)
    }),
    (Ln.toDecimalPlaces = Ln.toDP =
      function (n, t) {
        var e = this.constructor,
          i = new e(this)
        return void 0 === n
          ? i
          : (r(n, 0, wn), void 0 === t ? (t = e.rounding) : r(t, 0, 8), f(i, n + i.e + 1, t))
      }),
    (Ln.toExponential = function (n, t) {
      var e = this,
        i = e.constructor
      i =
        void 0 === n
          ? a(e, !0)
          : (r(n, 0, wn),
            void 0 === t ? (t = i.rounding) : r(t, 0, 8),
            a((e = f(new i(e), n + 1, t)), !0, n + 1))
      return e.isNeg() && !e.isZero() ? '-' + i : i
    }),
    (Ln.toFixed = function (n, t) {
      var e = this.constructor
      t =
        void 0 === n
          ? a(this)
          : (r(n, 0, wn),
            void 0 === t ? (t = e.rounding) : r(t, 0, 8),
            a((e = f(new e(this), n + this.e + 1, t)), !1, n + e.e + 1))
      return this.isNeg() && !this.isZero() ? '-' + t : t
    }),
    (Ln.toFraction = function (n) {
      var r,
        e,
        i,
        u,
        o,
        s,
        f,
        a,
        c,
        l,
        h = this.d,
        d = this.constructor
      if (!h) return new d(this)
      if (
        ((a = e = new d(1)),
        (i = f = new d(0)),
        (o = (r = new d(i)).e = p(h) - this.e - 1),
        (r.d[0] = Rn(10, (c = o % Mn) < 0 ? Mn + c : c)),
        null == n)
      )
        n = 0 < o ? r : a
      else {
        if (!(s = new d(n)).isInt() || s.lt(a)) throw Error(En + s)
        n = s.gt(r) ? (0 < o ? r : a) : s
      }
      for (
        Sn = !1, s = new d(t(h)), c = d.precision, d.precision = o = h.length * Mn * 2;
        (l = Zn(s, r, 0, 1, 1)), 1 != (u = e.plus(l.times(i))).cmp(n);

      )
        (e = i),
          (i = u),
          (u = a),
          (a = f.plus(l.times(u))),
          (f = u),
          (u = r),
          (r = s.minus(l.times(u))),
          (s = u)
      return (
        (u = Zn(n.minus(e), i, 0, 1, 1)),
        (f = f.plus(u.times(a))),
        (e = e.plus(u.times(i))),
        (f.s = a.s = this.s),
        (h =
          Zn(a, i, o, 1).minus(this).abs().cmp(Zn(f, e, o, 1).minus(this).abs()) < 1
            ? [a, i]
            : [f, e]),
        (d.precision = c),
        (Sn = !0),
        h
      )
    }),
    (Ln.toHexadecimal = Ln.toHex =
      function (n, t) {
        return S(this, 16, n, t)
      }),
    (Ln.toNearest = function (n, t) {
      var e = (i = this).constructor,
        i = new e(i)
      if (null == n) {
        if (!i.d) return i
        ;(n = new e(1)), (t = e.rounding)
      } else {
        if (((n = new e(n)), void 0 === t ? (t = e.rounding) : r(t, 0, 8), !i.d)) return n.s ? i : n
        if (!n.d) return n.s && (n.s = i.s), n
      }
      return (
        n.d[0]
          ? ((Sn = !1), (i = Zn(i, n, 0, t, 1).times(n)), (Sn = !0), f(i))
          : ((n.s = i.s), (i = n)),
        i
      )
    }),
    (Ln.toNumber = function () {
      return +this
    }),
    (Ln.toOctal = function (n, t) {
      return S(this, 8, n, t)
    }),
    (Ln.toPower = Ln.pow =
      function (n) {
        var r,
          i,
          u,
          o,
          s,
          a,
          c = this,
          l = c.constructor,
          h = +(n = new l(n))
        if (!(c.d && n.d && c.d[0] && n.d[0])) return new l(Rn(+c, h))
        if ((c = new l(c)).eq(1)) return c
        if (((u = l.precision), (s = l.rounding), n.eq(1))) return f(c, u, s)
        if ((r = qn(n.e / Mn)) >= n.d.length - 1 && (i = h < 0 ? -h : h) <= 9007199254740991)
          return (o = g(l, c, i, u)), n.s < 0 ? new l(1).div(o) : f(o, u, s)
        if ((a = c.s) < 0) {
          if (r < n.d.length - 1) return new l(NaN)
          if ((0 == (1 & n.d[r]) && (a = 1), 0 == c.e && 1 == c.d[0] && 1 == c.d.length))
            return (c.s = a), c
        }
        return (r =
          0 != (i = Rn(+c, h)) && isFinite(i)
            ? new l(i + '').e
            : qn(h * (Math.log('0.' + t(c.d)) / Math.LN10 + c.e + 1))) >
          l.maxE + 1 || r < l.minE - 1
          ? new l(0 < r ? a / 0 : 0)
          : ((Sn = !1),
            (l.rounding = c.s = 1),
            (i = Math.min(12, (r + '').length)),
            ((o =
              (o = _(n.times(m(c, u + i)), u)).d &&
              e((o = f(o, u + 5, 1)).d, u, s) &&
              +t((o = f(_(n.times(m(c, (r = u + 10) + i)), r), r + 5, 1)).d).slice(u + 1, u + 15) +
                1 ==
                1e14
                ? f(o, u + 1, 0)
                : o).s = a),
            (Sn = !0),
            f(o, u, (l.rounding = s)))
      }),
    (Ln.toPrecision = function (n, t) {
      var e = this,
        i = e.constructor
      t =
        void 0 === n
          ? a(e, e.e <= i.toExpNeg || e.e >= i.toExpPos)
          : (r(n, 1, wn),
            void 0 === t ? (t = i.rounding) : r(t, 0, 8),
            a((e = f(new i(e), n, t)), n <= e.e || e.e <= i.toExpNeg, n))
      return e.isNeg() && !e.isZero() ? '-' + t : t
    }),
    (Ln.toSignificantDigits = Ln.toSD =
      function (n, t) {
        var e = this.constructor
        return (
          void 0 === n
            ? ((n = e.precision), (t = e.rounding))
            : (r(n, 1, wn), void 0 === t ? (t = e.rounding) : r(t, 0, 8)),
          f(new e(this), n, t)
        )
      }),
    (Ln.toString = function () {
      var n = this.constructor
      n = a(this, this.e <= n.toExpNeg || this.e >= n.toExpPos)
      return this.isNeg() && !this.isZero() ? '-' + n : n
    }),
    (Ln.truncated = Ln.trunc =
      function () {
        return f(new this.constructor(this), this.e + 1, 1)
      }),
    (Ln.valueOf = Ln.toJSON =
      function () {
        var n = this.constructor
        n = a(this, this.e <= n.toExpNeg || this.e >= n.toExpPos)
        return this.isNeg() ? '-' + n : n
      }),
    (Zn = function (n, t, r, e, i, a) {
      var c,
        l,
        h,
        p,
        d,
        g,
        v,
        y,
        _,
        m,
        w,
        b,
        x,
        A,
        N,
        S,
        O,
        E,
        F,
        j = n.constructor,
        D = n.s == t.s ? 1 : -1,
        q = n.d,
        R = t.d
      if (!(q && q[0] && R && R[0]))
        return new j(
          n.s && t.s && (q ? !R || q[0] != R[0] : R)
            ? (q && 0 == q[0]) || !R
              ? 0 * D
              : D / 0
            : NaN,
        )
      for (
        l = a ? ((d = 1), n.e - t.e) : ((a = Pn), qn(n.e / (d = Mn)) - qn(t.e / d)),
          E = R.length,
          S = q.length,
          _ = (D = new j(D)).d = [],
          h = 0;
        R[h] == (q[h] || 0);
        h++
      );
      if (
        (R[h] > (q[h] || 0) && l--,
        null == r ? ((x = r = j.precision), (e = j.rounding)) : (x = i ? r + (n.e - t.e) + 1 : r),
        x < 0)
      )
        _.push(1), (g = !0)
      else {
        if (((x = (x / d + 2) | 0), (h = 0), 1 == E)) {
          for (R = R[(p = 0)], x++; (h < S || p) && x--; h++)
            (A = p * a + (q[h] || 0)), (_[h] = (A / R) | 0), (p = A % R | 0)
          g = p || h < S
        } else {
          for (
            1 < (p = (a / (R[0] + 1)) | 0) &&
              ((R = u(R, p, a)), (q = u(q, p, a)), (E = R.length), (S = q.length)),
              N = E,
              w = (m = q.slice(0, E)).length;
            w < E;

          )
            m[w++] = 0
          for (
            (F = R.slice()).unshift(0), O = R[0], R[1] >= a / 2 && ++O;
            (p = 0),
              (c = o(R, m, E, w)) < 0
                ? ((b = m[0]),
                  1 < (p = ((b = E != w ? b * a + (m[1] || 0) : b) / O) | 0)
                    ? 1 ==
                        (c = o(
                          (v = u(R, (p = a <= p ? a - 1 : p), a)),
                          m,
                          (y = v.length),
                          (w = m.length),
                        )) && (p--, s(v, E < y ? F : R, y, a))
                    : (0 == p && (c = p = 1), (v = R.slice())),
                  (y = v.length) < w && v.unshift(0),
                  s(m, v, w, a),
                  -1 == c &&
                    (c = o(R, m, E, (w = m.length))) < 1 &&
                    (p++, s(m, E < w ? F : R, w, a)),
                  (w = m.length))
                : 0 === c && (p++, (m = [0])),
              (_[h++] = p),
              c && m[0] ? (m[w++] = q[N] || 0) : ((m = [q[N]]), (w = 1)),
              (N++ < S || void 0 !== m[0]) && x--;

          );
          g = void 0 !== m[0]
        }
        _[0] || _.shift()
      }
      if (1 == d) (D.e = l), (vn = g)
      else {
        for (h = 1, p = _[0]; 10 <= p; p /= 10) h++
        ;(D.e = h + l * d - 1), f(D, i ? r + D.e + 1 : r, e, g)
      }
      return D
    }),
    (((gn = (function n(t) {
      var r, e, u
      function o(n) {
        var t,
          r,
          e,
          u = this
        if (!(u instanceof o)) return new o(n)
        if (((u.constructor = o), V(n)))
          return (
            (u.s = n.s),
            void (Sn
              ? !n.d || n.e > o.maxE
                ? ((u.e = NaN), (u.d = null))
                : n.e < o.minE
                ? ((u.e = 0), (u.d = [0]))
                : ((u.e = n.e), (u.d = n.d.slice()))
              : ((u.e = n.e), (u.d = n.d && n.d.slice())))
          )
        if ('number' == (e = typeof n)) {
          if (0 === n) return (u.s = 1 / n < 0 ? -1 : 1), (u.e = 0), void (u.d = [0])
          if ((n < 0 ? ((n = -n), (u.s = -1)) : (u.s = 1), n === ~~n && n < 1e7)) {
            for (t = 0, r = n; 10 <= r; r /= 10) t++
            return void (Sn
              ? o.maxE < t
                ? ((u.e = NaN), (u.d = null))
                : t < o.minE
                ? ((u.e = 0), (u.d = [0]))
                : ((u.e = t), (u.d = [n]))
              : ((u.e = t), (u.d = [n])))
          }
          return 0 * n != 0
            ? (n || (u.s = NaN), (u.e = NaN), void (u.d = null))
            : b(u, n.toString())
        }
        if ('string' != e) throw Error(En + n)
        return (
          45 === (r = n.charCodeAt(0))
            ? ((n = n.slice(1)), (u.s = -1))
            : (43 === r && (n = n.slice(1)), (u.s = 1)),
          ($n.test(n)
            ? b
            : function (n, t) {
                var r, e, u, o, s, f, a, l
                if (-1 < t.indexOf('_')) {
                  if (((t = t.replace(/(\d)_(?=\d)/g, '$1')), $n.test(t))) return b(n, t)
                } else if ('Infinity' === t || 'NaN' === t)
                  return +t || (n.s = NaN), (n.e = NaN), (n.d = null), n
                if (zn.test(t)) (r = 16), (t = t.toLowerCase())
                else if (kn.test(t)) r = 2
                else {
                  if (!In.test(t)) throw Error(En + t)
                  r = 8
                }
                for (
                  o = (t =
                    0 < (o = t.search(/p/i))
                      ? ((a = +t.slice(o + 1)), t.substring(2, o))
                      : t.slice(2)).indexOf('.'),
                    e = n.constructor,
                    (s = 0 <= o) &&
                      ((o = (f = (t = t.replace('.', '')).length) - o),
                      (u = g(e, new e(r), o, 2 * o))),
                    o = t = (l = i(t, r, Pn)).length - 1;
                  0 === l[o];
                  --o
                )
                  l.pop()
                return o < 0
                  ? new e(0 * n.s)
                  : ((n.e = c(l, t)),
                    (n.d = l),
                    (Sn = !1),
                    s && (n = Zn(n, u, 4 * f)),
                    a && (n = n.times(Math.abs(a) < 54 ? Rn(2, a) : gn.pow(2, a))),
                    (Sn = !0),
                    n)
              })(u, n)
        )
      }
      if (
        ((o.prototype = Ln),
        (o.ROUND_UP = 0),
        (o.ROUND_DOWN = 1),
        (o.ROUND_CEIL = 2),
        (o.ROUND_FLOOR = 3),
        (o.ROUND_HALF_UP = 4),
        (o.ROUND_HALF_DOWN = 5),
        (o.ROUND_HALF_EVEN = 6),
        (o.ROUND_HALF_CEIL = 7),
        (o.ROUND_HALF_FLOOR = 8),
        (o.EUCLID = 9),
        (o.config = o.set = M),
        (o.clone = n),
        (o.isDecimal = V),
        (o.abs = E),
        (o.acos = F),
        (o.acosh = j),
        (o.add = D),
        (o.asin = q),
        (o.asinh = R),
        (o.atan = k),
        (o.atanh = C),
        (o.atan2 = z),
        (o.cbrt = I),
        (o.ceil = $),
        (o.clamp = P),
        (o.cos = T),
        (o.cosh = U),
        (o.div = L),
        (o.exp = Z),
        (o.floor = B),
        (o.hypot = W),
        (o.ln = H),
        (o.log = J),
        (o.log10 = K),
        (o.log2 = G),
        (o.max = Y),
        (o.min = X),
        (o.mod = Q),
        (o.mul = nn),
        (o.pow = tn),
        (o.random = rn),
        (o.round = en),
        (o.sign = un),
        (o.sin = on),
        (o.sinh = sn),
        (o.sqrt = fn),
        (o.sub = an),
        (o.sum = cn),
        (o.tan = ln),
        (o.tanh = hn),
        (o.trunc = pn),
        (t = void 0 === t ? {} : t) && !0 !== t.defaults)
      )
        for (
          u = ['precision', 'rounding', 'toExpNeg', 'toExpPos', 'maxE', 'minE', 'modulo', 'crypto'],
            r = 0;
          r < u.length;

        )
          t.hasOwnProperty((e = u[r++])) || (t[e] = this[e])
      return o.config(t), o
    })(Nn)).prototype.constructor = gn).default = gn.Decimal =
      gn),
    (xn = new gn(xn)),
    (An = new gn(An)),
    n.exports
      ? ('function' == typeof Symbol &&
          'symbol' == typeof Symbol.iterator &&
          ((Ln[Symbol.for('nodejs.util.inspect.custom')] = Ln.toString),
          (Ln[Symbol.toStringTag] = 'Decimal')),
        (n.exports = gn))
      : ((dn = dn || ('undefined' != typeof self && self && self.self == self ? self : window)),
        (yn = dn.Decimal),
        (gn.noConflict = function () {
          return (dn.Decimal = yn), gn
        }),
        (dn.Decimal = gn))
})($n),
  $n.exports

const _hoisted_1$2 = /*#__PURE__*/ createElementVNode(
  'div',
  { id: 'vocen-ediltor' },
  null,
  -1 /* HOISTED */,
)
const _hoisted_2$2 = [_hoisted_1$2]
const __default__$1 = defineComponent({
  name: 'WangEditor',
})
var script$3 = /*#__PURE__*/ defineComponent({
  ...__default__$1,
  setup(__props) {
    console.log(g.isArray('555'), 'sssssssss')
    // import E from 'wangeditor'
    // import { onMounted, ref, watch } from 'vue'
    //
    // const props = defineProps({
    //   /**
    //    * 高度
    //    */
    //   height: {
    //     type: Number,
    //     default: 500,
    //   },
    //   /**
    //    * 层级
    //    */
    //   zIndex: {
    //     type: Number,
    //     default: 20,
    //   },
    //   /**
    //    * 提示文字
    //    */
    //   placeholder: {
    //     type: String,
    //     default: '请输入内容',
    //   },
    //   /**
    //    * 初始化是否自动获取焦点 默认获取
    //    */
    //   focus: {
    //     type: Boolean,
    //     default: true,
    //   },
    //   /**
    //    * 初始化内容
    //    */
    //   content: {
    //     type: String,
    //     default: '5555',
    //   },
    //   /**
    //    *  菜单配置
    //    */
    //   menus: {
    //     type: Array,
    //     default: [
    //       'head',
    //       'bold',
    //       'fontSize',
    //       'fontName',
    //       'italic',
    //       'underline',
    //       'strikeThrough',
    //       'indent',
    //       'lineHeight',
    //       'foreColor',
    //       'backColor',
    //       'link',
    //       'list',
    //       'todo',
    //       'justify',
    //       'quote',
    //       'emoticon',
    //       'image',
    //       'video',
    //       'table',
    //       'code',
    //       'splitLine',
    //       'undo',
    //       'redo',
    //     ],
    //   },
    //   /**
    //    *  配置颜色（文字颜色、背景色）
    //    */
    //   colors: {
    //     type: Array,
    //     default: ['#000000', '#eeece0', '#1c487f', '#4d80bf'],
    //   },
    //   /**
    //    *  配置颜色（文字颜色、背景色）
    //    */
    //   fontNames: {
    //     type: Array,
    //     default: [
    //       '黑体',
    //       '仿宋',
    //       '楷体',
    //       '标楷体',
    //       '华文仿宋',
    //       '华文楷体',
    //       '宋体',
    //       '微软雅黑',
    //       'Arial',
    //       'Tahoma',
    //       'Verdana',
    //       'Times New Roman',
    //       'Courier New',
    //     ],
    //   },
    //   /**
    //    *  配置颜色（文字颜色、背景色）
    //    */
    //   fontSizes: {
    //     type: Array,
    //     default: {
    //       'x-small': { name: '10px', value: '1' },
    //       small: { name: '13px', value: '2' },
    //       normal: { name: '16px', value: '3' },
    //       large: { name: '18px', value: '4' },
    //       'x-large': { name: '24px', value: '5' },
    //       'xx-large': { name: '32px', value: '6' },
    //       'xxx-large': { name: '48px', value: '7' },
    //     },
    //   },
    //   /**
    //    * 是否显示全屏
    //    */
    //   showFullScreen: {
    //     type: Boolean,
    //     default: true,
    //   },
    //   /**
    //    * 菜单提示   up  上标  down下标
    //    */
    //   menuTooltipPosition: {
    //     type: String,
    //     default: 'up',
    //   },
    // })
    //
    // /**
    //  * 获取富文本html
    //  */
    // const getHtml = () => {
    //   return editor.txt.html()
    // }
    // /**
    //  * 获取富文本文本
    //  */
    // const getText = () => {
    //   return editor.txt.text()
    // }
    // /**
    //  * 清空富文本
    //  */
    // const clearEditor = () => {
    //   return editor.txt.clear()
    // }
    //
    // defineExpose({
    //   getHtml,
    //   getText,
    //   clearEditor,
    // })
    //
    // let editor: Editor = ''
    // onMounted(() => {
    //   editor = new E('#vocen-ediltor')
    //
    //   // 编辑器的配置
    //   editor.config.height = props.height
    //   editor.config.zIndex = props.zIndex
    //   editor.config.placeholder = props.placeholder
    //   editor.config.focus = props.focus
    //   editor.config.menus = props.menus
    //   editor.config.colors = props.colors
    //   editor.config.fontNames = props.fontNames
    //   editor.config.fontSizes = props.fontSizes
    //   editor.config.showFullScreen = props.showFullScreen
    //   editor.config.menuTooltipPosition = props.menuTooltipPosition
    //
    //   editor.create()
    //
    //   editor.txt.html(props.content)
    // })
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock('div', null, _hoisted_2$2)
    }
  },
})

script$3.__file = 'packages/components/WangEditor/src/WangEditor.vue'

const VocenWangEditor = withInstall(script$3)

// import * as components from '../components';
const components = [VoButton, VoPhotoGallery, VocenWangEditor]
const install = function (app) {
  components.forEach((component) => {
    if (component.install) {
      app.use(component)
    }
  })
  // app.config.globalProperties.$message = components.message;
  // app.config.globalProperties.$notification = components.notification;
  // app.config.globalProperties.$info = components.Modal.info;
  // app.config.globalProperties.$success = components.Modal.success;
  // app.config.globalProperties.$error = components.Modal.error;
  // app.config.globalProperties.$warning = components.Modal.warning;
  // app.config.globalProperties.$confirm = components.Modal.confirm;
  // app.config.globalProperties.$destroyAll = components.Modal.destroyAll;
  return app
}
var index = {
  version,
  install,
}

export default index
export { install, version }
