export const codeVueFront = `<template>
<div>
  <template>
    <AntdDesignForm />
  </template>
</div>
</template>
<script>
export default {
name: 'Demo',
data () {
  return {
    jsonData:   `
export const codeNullLast = `
  }
}
}`
/* eslint-disable */
export const codeVueLast = `
    }
  },
  methods: {
    handleSubmit(p) {
       // 通过表单提交按钮触发，获取promise对象
       p().then(res => {
         // 获取数据成功
         alert(JSON.stringify(res))
       })
         .catch(err => {
           console.log(err, '校验失败')
         })
     },
     getData() {
       // 通过函数获取数据
       this.$refs.KFB.getData().then(res => {
         // 获取数据成功
         alert(JSON.stringify(res))
       })
         .catch(err => {
           console.log(err, '校验失败')
         })
     }
  }
}
<\/script>`

export const codeHtmlFront = `<!DOCTYPE html>
<html>

<head>
  <title>表单设计器kcz</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="http://unpkg.com/k-form-design/lib/k-form-design.css">
</head>

<body>
  <div class="app">
    <k-form-build ref="KFB" @submit="handleSubmit" :value="jsonData"></k-form-build>
    <button @click="getData">提交</button>
  </div>
  <script src="http://cdn.kcz66.com/vue.min.js"><\/script>
  <script src="http://unpkg.com/k-form-design/lib/k-form-design.umd.min.js"><\/script>
  <script>
    let jsonData = `

export const codeHtmlLast = `
    let vm = new Vue({
      el: '.app',
      data: {
        jsonData
      },
      methods: {
        handleSubmit(p) {
          // 通过表单提交按钮触发，获取promise对象
          p().then(res => {
            // 获取数据成功
            alert(JSON.stringify(res))
          })
            .catch(err => {
              console.log(err, '校验失败')
            })
        },
        getData() {
          // 通过函数获取数据
          this.$refs.KFB.getData().then(res => {
            // 获取数据成功
            alert(JSON.stringify(res))
          })
            .catch(err => {
              console.log(err, '校验失败')
            })
        }
      }
    })
  <\/script>
</body>

</html>`

export const moduleData =
  'list: [label: "滑块", type: "slider", options: {defaultValue: 0, disabled: false,required: false,min: 0,max: 100, step: 1, showInput: false, range: false, width: "", remoteFunc: "func_5f4ff98de760429e996989df418129c8"}, key: "5f4ff98de760429e996989df41812910", model: "slider_5f4ff98de760429e996989df418129c8", rules: []]'

// {
// 	"list": [
// 		{
// 			"label": "滑块",
// 			"type": "slider",
// 			"options": {
// 				"defaultValue": 0,
// 				"disabled": false,
// 				"required": false,
// 				"min": 0,
// 				"max": 100,
// 				"step": 1,
// 				"showInput": false,
// 				"range": false,
// 				"width": "",
// 				"remoteFunc": "func_5f4ff98de760429e996989df418129c8"
// 			},
// 			"key": "5f4ff98de760429e996989df418129c8",
// 			"model": "slider_5f4ff98de760429e996989df418129c8",
// 			"rules": []
// 		}
// 	],
// 	"config": {
// 		"size": "default",
// 		"hideRequiredMark": false,
// 		"layout": "horizontal",
// 		"labelAlign": "right",
// 		"labelCol": {
// 			"span": 3,
// 			"offset": 0
// 		}
// 	}
// }
