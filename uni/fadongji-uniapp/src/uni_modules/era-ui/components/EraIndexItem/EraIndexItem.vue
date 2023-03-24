<template>
  <!-- #ifdef APP-NVUE -->
  <cell ref="u-index-item">
    <!-- #endif -->
    <view class="u-index-item" :id="`u-index-item-${id}`" :class="[`u-index-item-${id}`]">
      <slot></slot>
    </view>
    <!-- #ifdef APP-NVUE -->
  </cell>
  <!-- #endif -->
</template>

<script>
  import props from './props.js'
  // #ifdef APP-NVUE
  // 由于weex为阿里的KPI业绩考核的产物，所以不支持百分比单位，这里需要通过dom查询组件的宽度
  const dom = uni.requireNativePlugin('dom')
  // #endif
  /**
   * IndexItem
   * @description
   * @tutorial https://uviewui.com/components/indexList.html
   * @property {String}
   * @event {Function}
   * @example
   */
  export default {
    name: 'EraIndexItem',
    mixins: [uni.$u.mpMixin, uni.$u.mixin, props],
    data() {
      return {
        // 本组件到滚动条顶部的距离
        top: 0,
        height: 0,
        id: '',
      }
    },
    created() {
      // 子组件u-index-anchor的实例
      this.anchor = {}
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // 此处会活动父组件实例，并赋值给实例的parent属性
        this.getParentData('EraIndexList')
        if (!this.parent) {
          return uni.$u.error('u-index-item必须要搭配u-index-list组件使用')
        }
        uni.$u.sleep().then(() => {
          this.getIndexItemRect().then((size) => {
            // 由于对象的引用特性，此处会同时生效到父组件的children数组的本实例的top属性中，供父组件判断读取
            this.top = Math.ceil(size.top)
            this.height = Math.ceil(size.height)
          })
        })
      },
      getParentData(parentName = '') {
        // 避免在created中去定义parent变量
        if (!this.parent) this.parent = {}
        // 这里的本质原理是，通过获取父组件实例(也即类似u-radio的父组件u-radio-group的this)
        // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
        // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
        // 此处并不会自动更新子组件的数据，而是依赖父组件u-radio-group去监听data的变化，手动调用更新子组件的方法去重新获取
        this.parent = uni.$u.$parent.call(this, parentName)
        if (this.parent.children) {
          // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this)
        }
        if (this.parent && this.parentData) {
          // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key]
          })
        }
      },
      getIndexItemRect() {
        return new Promise((resolve) => {
          // #ifndef APP-NVUE
          this.$uGetRect('.u-index-item').then((size) => {
            resolve(size)
          })
          // #endif

          // #ifdef APP-NVUE
          const ref = this.$refs['u-index-item']
          dom.getComponentRect(ref, (res) => {
            resolve(res.size)
          })
          // #endif
        })
      },
    },
  }
</script>

<style lang="scss" scoped></style>
