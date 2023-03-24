<template>
  <div>
    <div :id="editorId"> </div>

    <PhotoGallery @returnPhoto="returnPhoto" ref="PhotoGalleryRef"></PhotoGallery>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'WangEditor',
  })
</script>

<script setup lang="ts">
  import PhotoGallery from '../../../components/PhotoGallery/src/PhotoGallery.vue'
  // import { VoUtils } from '@vocen/shared'
  // import { VoUtils }
  import {VoUtils}  from '../../../../../shared/src/index'
  // import { VoUtils } from '../.././shared/src/index'
  console.log(VoUtils.isArray('555'), 'sssssssss')

  import E from 'wangeditor'
  import { onMounted, ref, watch } from 'vue'

  const props = defineProps({
    editorId: {
      type: String,
      default: 'vocenEdiltor',
    },
    /**
     * 高度
     */
    height: {
      type: Number,
      default: 500,
    },
    /**
     * 层级
     */
    zIndex: {
      type: Number,
      default: 20,
    },
    /**
     * 提示文字
     */
    placeholder: {
      type: String,
      default: '请输入内容',
    },
    /**
     * 初始化是否自动获取焦点 默认获取
     */
    focus: {
      type: Boolean,
      default: false,
    },
    /**
     * 初始化内容
     */
    content: {
      type: String,
      default: '',
    },
    /**
     *  菜单配置
     */
    menus: {
      type: Array,
      default: [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        'emoticon',
        // 'image',
        // 'video',
        'table',
        'code',
        'splitLine',
        'undo',
        'redo',
      ],
    },
    /**
     *  配置颜色（文字颜色、背景色）
     */
    colors: {
      type: Array,
      default: ['#000000', '#eeece0', '#1c487f', '#4d80bf'],
    },
    /**
     *  配置字体
     */
    fontNames: {
      type: Array,
      default: [
        '黑体',
        '仿宋',
        '楷体',
        '标楷体',
        '华文仿宋',
        '华文楷体',
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana',
        'Times New Roman',
        'Courier New',
      ],
    },
    /**
     *  配置文字大小
     */
    fontSizes: {
      type: Object,
      default: {
        'x-small': { name: '10px', value: '1' },
        small: { name: '13px', value: '2' },
        normal: { name: '16px', value: '3' },
        large: { name: '18px', value: '4' },
        'x-large': { name: '24px', value: '5' },
        'xx-large': { name: '32px', value: '6' },
        'xxx-large': { name: '48px', value: '7' },
      },
    },
    /**
     * 是否显示全屏
     */
    showFullScreen: {
      type: Boolean,
      default: true,
    },
    /**
     * 菜单提示   up  上标  down下标
     */
    menuTooltipPosition: {
      type: String,
      default: 'up',
    },
  })

  /**
   * 获取富文本html
   */
  const getHtml = () => {
    return editor.txt.html()
  }
  /**
   * 获取富文本文本
   */
  const getText = () => {
    return editor.txt.text()
  }
  /**
   * 清空富文本
   */
  const clearEditor = () => {
    return editor.txt.clear()
  }

  defineExpose({
    getHtml,
    getText,
    clearEditor,
  })

  //引入素材库
  const PhotoGalleryRef = ref(null)
  const returnPhoto = (res) => {
    editor.cmd.do('insertHTML', '<p>追加的内容</p>')
    console.log(res, 'sss')
  }

  // 新增图片菜单
  const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E
  class materialLibrary extends BtnMenu {
    constructor(editor) {
      // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
      const $elem = E.$(
        `<div class="w-e-menu" data-title="图片">
              <i class="w-e-icon-image"></i>
            </div>`,
      )
      super($elem, editor)
    }
    // 菜单点击事件
    clickHandler() {
      // 做任何你想做的事情
      // 可参考【常用 API】文档，来操作编辑器
      PhotoGalleryRef.value.openPhoto()
    }
    // 菜单是否被激活（如果不需要，这个函数可以空着）
    // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
    // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
    tryChangeActive() {
      // 激活菜单
      // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
      // 2. this.this.isActive === true
      // this.active()
      // // 取消激活菜单
      // // 1. 菜单 DOM 节点会删掉 .w-e-active
      // // 2. this.this.isActive === false
      // this.unActive()
    }
  }

  // 源代码
  //当前是否选中
  const isHTML = ref(false)
  class sourceCode extends BtnMenu {
    constructor(editor) {
      const $elem = E.$(
        `<div class="w-e-menu"  data-title="源代码">
                 <i class="iconfont icon-code"></i>
            </div>`,
      )
      super($elem, editor)
    }
    clickHandler() {
      showSource()
      this.tryChangeActive()
    }
    tryChangeActive() {
      if (isHTML.value) this.active()
      else this.unActive()
    }
  }
  const showSource = () => {
    let _editor = editor
    isHTML.value = !isHTML.value
    let _source = _editor.txt.html()
    if (isHTML.value) {
      _source = _source.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;')
    } else {
      _source = _editor.txt
        .text()
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&nbsp;/gi, ' ')
    }
    _editor.txt.html(_source)
  }

  //清除格式
  class clearFormat extends BtnMenu {
    constructor(editor) {
      const $elem = E.$(
        `<div class="w-e-menu"  data-title="清除样式">
                <i class="iconfont icon-qingchugeshi"></i>
              </div>`,
      )
      super($elem, editor)
    }
    clickHandler() {
      let isSeleEmpty = editor.selection.isSelectionEmpty()
      let selectionText = editor.selection.getSelectionText()

      if (!isSeleEmpty) {
        editor.cmd.do('insertHTML', selectionText)
      }
    }
    tryChangeActive() {}
  }
  //格式刷
  let isMouseDown = ref(false)
  let isBrushOn = ref(false)
  class brushFormat extends BtnMenu {
    constructor(editor) {
      // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
      const $elem = E.$(
        `<div class="w-e-menu" data-title="格式刷">
      <i class="iconfont icon-geshishua"></i>
            </div>`,
      )
      super($elem, editor)
    }
    // 菜单点击事件
    clickHandler() {
      if (editor.selection.isSelectionEmpty()) {
        this.unActive()
        return
      }
      let domToParse = editor.selection.getSelectionContainerElem().elems[0]
      editor.copyStyleList = parseDom(domToParse)
      // 做任何你想做的事情
      // 可参考【常用 API】文档，来操作编辑器
      if (isBrushOn.value) {
        this.unActive()
      } else {
        this.active()
      }
      isBrushOn.value = !isBrushOn.value
    }
    // 菜单是否被激活（如果不需要，这个函数可以空着）
    // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
    // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
    tryChangeActive() {
      // 激活菜单
      // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
      // 2. this.this.isActive === true
      //   this.active();
      // // 取消激活菜单
      // // 1. 菜单 DOM 节点会删掉 .w-e-active
      // // 2. this.this.isActive === false
      // this.unActive()
    }
  }
  const parseDom = (dom) => {
    let targetDom = null
    let nodeArray = []

    getTargetDom(dom)

    getAllStyle(targetDom)

    function getTargetDom(dom) {
      for (let i of dom.childNodes) {
        if (i.nodeType === 3 && i.nodeValue && i.nodeValue.trim() !== '') {
          targetDom = dom
          return
        }
      }
      getTargetDom(dom.children[0])
    }

    function getAllStyle(dom) {
      if (!dom) return
      console.log(dom.tagName, '555555555')
      const tagName = dom.tagName.toLowerCase()
      if (tagName === 'p') {
        nodeArray.push({
          tagName: 'span',
          attributes: Array.from(dom.attributes).map((i) => {
            return {
              name: i.name,
              value: i.value,
            }
          }),
        })
        return
      } else {
        nodeArray.push({
          tagName: tagName,
          attributes: Array.from(dom.attributes).map((i) => {
            return {
              name: i.name,
              value: i.value,
            }
          }),
        })
        getAllStyle(dom.parentNode)
      }
    }
    return nodeArray
  }

  const addStyle = (text, nodeArray) => {
    let currentNode = null
    if (!nodeArray) return
    nodeArray.forEach((ele, index) => {
      let node = document.createElement(ele.tagName)
      for (const attr of ele.attributes) {
        node.setAttribute(attr.name, attr.value)
      }
      if (index === 0) {
        node.innerText = text
        currentNode = node
      } else {
        node.appendChild(currentNode)
        currentNode = node
      }
    })
    return currentNode
  }
  const pasteStyle = (editor) => {
    let text = editor.selection.getSelectionText()
    let targetDom = addStyle(text, editor.copyStyleList)
    editor.cmd.do('insertHTML', targetDom.outerHTML)
  }

  let editor: Editor = ''
  onMounted(() => {
    const menuKey = 'materialLibrary'
    E.registerMenu(menuKey, materialLibrary)

    const menuSource = 'sourceCode'
    E.registerMenu(menuSource, sourceCode)

    const menuClear = 'clearFormat'
    E.registerMenu(menuClear, clearFormat)

    const menuBrush = 'brushFormat'
    E.registerMenu(menuBrush, brushFormat)

    editor = new E('#' + props.editorId)

    // 编辑器的配置
    editor.config.height = props.height
    editor.config.zIndex = props.zIndex
    editor.config.placeholder = props.placeholder
    editor.config.focus = props.focus
    editor.config.menus = props.menus
    editor.config.colors = props.colors
    editor.config.fontNames = props.fontNames
    editor.config.fontSizes = props.fontSizes
    editor.config.showFullScreen = props.showFullScreen
    editor.config.menuTooltipPosition = props.menuTooltipPosition

    editor.create()

    editor.txt.html(props.content)

    document.querySelector('.w-e-text').addEventListener('mousedown', () => {
      isMouseDown.value = true
    })
    document.querySelector('.w-e-text').addEventListener('mouseup', () => {
      if (isBrushOn.value && isMouseDown.value) {
        pasteStyle(editor)
        isBrushOn.value = false
        document.querySelector("[data-title='格式刷']").classList.remove('w-e-active')
      }
      isMouseDown.value = false
    })
  })
</script>
