<template>
  <div>
    <div style="border: 1px solid #ccc; margin-top: 10px; z-index: 999">
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        disabled
        readonly
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="valueHtml"
        style="height: 400px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
      />
    </div>
  </div>
</template>

<script>
  import '@wangeditor/editor/dist/css/style.css'
  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { message } from 'ant-design-vue'

  export default {
    components: { Editor, Toolbar },
    props: {
      disable: {
        type: Boolean,
        default: true,
      },
      editorId: {
        type: String,
        default: 'vocenEdiltor',
      },
      width: {
        type: Number,
        default: 300,
      },
      maxSize: {
        type: Number,
        default: 100,
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
    },
    setup(props) {
      // 编辑器实例，必须用 shallowRef，重要！
      const editorRef = shallowRef()

      // 内容 HTML
      const valueHtml = ref('')

      // 模拟 ajax 异步获取内容
      onMounted(() => {})
      /**
       * 获取富文本html
       */
      const getHtml = () => {
        return editorRef.value.getHtml()
      }

      /**
       * 添加富文本内容
       *
       **/
      const setHtml = (content) => {
        editorRef.value.setHtml(content)
      }

      const toolbarConfig = {}
      toolbarConfig.excludeKeys = [
        'insertVideo', // 去除插入视频
      ]

      console.log(editorRef.value)
      const editorConfig = { placeholder: '请输入内容...', MENU_CONF: {} }
      editorConfig.MENU_CONF['uploadImage'] = {
        // 自定义上传
        // 单个文件的最大体积限制，默认为 2M
        maxFileSize: 100 * 1024 * 1024, // 1M
        async customUpload(file, insertFn) {
          // TS 语法
          console.log(file)
          let maxSize = props.maxSize * 1024 * 1024
          if (file.size > maxSize) {
            message.error(`文件大小不能超过${props.maxSize}M`)
            return
          }
          const formData = new FormData()
          formData.append('file', file)
          try {
            const { data, code } = await AdminHttp.FILE.fileImgUpload(formData)
            if (+code === 20001) {
              insertFn(data.filePath, data.fileName, data.filePath)
              message.success('上传成功')
            }
          } catch (e) {
            console.warn(e, 'FormUpload')
            message.success('上传失败')
          }
        },
      }

      editorConfig.MENU_CONF['uploadVideo'] = {
        // 自定义上传
        async customUpload(file, insertFn) {
          // TS 语法
          let maxSize = props.maxSize * 1024 * 1024
          if (file.size > maxSize) {
            message.error(`文件大小不能超过${props.maxSize}M`)
            return
          }
          // async customUpload(file, insertFn) {                   // JS 语法
          // file 即选中的文件
          // 自己实现上传，并得到视频 url poster
          // 最后插入视频
          try {
            const { data, code } = await AdminHttp.FILE.fileVideoUploadInfo({ file: file })
            if (+code === 20001) {
              console.log(data)
              insertFn(data.filePath, data.poster)
            }
          } catch (e) {
            console.log(e)
          }
        },
      }

      // 编辑器回调函数
      const handleCreated = (editor) => {
        editorRef.value = editor // 记录 editor 实例，重要！
      }
      const handleChange = (editor) => {
        // editorRef.value.getAllMenuKeys() // 所有菜单键名
        console.log('change:', editor.getHtml())
      }
      const handleDestroyed = (editor) => {
        console.log('destroyed', editor)
      }
      const handleFocus = (editor) => {
        console.log('focus', editor)
      }
      const handleBlur = (editor) => {
        console.log('blur', editor)
      }
      const customAlert = (info, type) => {
        alert(`【自定义提示】${type} - ${info}`)
      }

      const insertText = () => {
        const editor = editorRef.value
        if (editor == null) return

        editor.insertText('hello world')
      }

      const printHtml = () => {
        const editor = editorRef.value
        if (editor == null) return
      }

      const disable = () => {
        const editor = editorRef.value
        if (editor == null) return
        editor.disable()
      }
      // 组件销毁时，也及时销毁编辑器，重要！
      onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return

        editor.destroy()
      })

      return {
        editorRef,
        mode: 'default',
        valueHtml,
        toolbarConfig,
        editorConfig,
        handleCreated,
        handleChange,
        handleDestroyed,
        handleFocus,
        handleBlur,
        customAlert,
        insertText,
        printHtml,
        disable,
        getHtml,
        setHtml,
      }
    },
  }
</script>
