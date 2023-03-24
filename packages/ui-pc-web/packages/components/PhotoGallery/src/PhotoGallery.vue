<template>
  <div class="vocen-desktop-dialog" v-if="photoShow" @click.stop="maskFn">
    <div class="vocen-desktop-dialog__content" @click.stop="addGroupBoo = false">
      <div class="header">
        <div>选择图片</div>
        <svg
          @click="closePhoto"
          t="1646014081269"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2200"
          width="18"
          height="18"
        >
          <path
            d="M1003.008 902.656L612.352 512l390.656-390.656c27.648-27.648 27.648-72.704 0-100.352-27.648-27.648-72.704-27.648-100.352 0L512 411.648 121.344 20.992c-27.648-27.648-72.704-27.648-100.352 0-27.648 27.648-27.648 72.704 0 100.352L411.648 512 20.992 902.656c-13.312 13.312-20.992 31.232-20.992 50.176 0 18.944 7.168 36.864 20.992 50.176 13.312 13.312 31.232 20.992 50.176 20.992 18.944 0 36.864-7.168 50.176-20.992l390.656-390.656 390.656 390.656c13.312 13.312 31.232 20.992 50.176 20.992 18.944 0 36.864-7.168 50.176-20.992 13.312-13.312 20.992-31.232 20.992-50.176 0-18.944-7.168-36.864-20.992-50.176z"
            p-id="2201"
            fill="#7e8081"
          />
        </svg>
      </div>
      <div class="body">
        <div class="body-directory">
          <div class="body-directory__list">
            <div
              class="item"
              @click="changeDirectory(index)"
              :class="{
                'item-children': item.label > 1,
                'item-active': directorySelect == index,
              }"
              v-for="(item, index) of directoryMenu"
              :key="index"
            >
              {{ item.name }}({{ item.count }})
            </div>
          </div>
          <div class="body-directory__add">
            <span class="body-directory__add-btn" @click.stop="addGroup">新建分组</span>
            <div class="add-alert" v-show="addGroupBoo" @click.stop>
              <div>
                <span class="add-alert__span">创建分组</span>
                <input
                  v-model="groupName"
                  type="text"
                  class="add-alert__input"
                  placeholder="分组名为1-6个字符"
                />
              </div>
              <div class="add-group group">
                <div
                  class="group-sure"
                  :class="{ disable: groupName.length <= 0 || groupName.length > 6 }"
                  @click.stop="addGroupFn"
                  >确定</div
                >
                <div class="group-cancel" @click.stop=";(addGroupBoo = false), (groupName = '')"
                  >取消</div
                >
              </div>
            </div>
          </div>
        </div>
        <div class="body-list">
          <div class="body-list__header">
            <span> 大小不超过10M </span>
            <span class="body-list__header-btn">
              <label for="file-id">
                <span class="span-btn">上传文件</span>
                <input
                  type="file"
                  title=""
                  @change="uploadImg"
                  id="file-id"
                  class="file-input"
                  multiple
                  accept="image/png,image/jpeg,image/gif,image/jpg"
                />
              </label>
            </span>
          </div>

          <div class="body-list__content">
            <PhotoPickerItem
              @click="selectPhotoPicker(item)"
              :isCheckEd="searchIndexSelectPhoto(item) >= 0"
              v-for="(item, index) of photoList"
              :key="index"
            />
          </div>

          <div class="footer">
            <svg
              t="1646027141410"
              class="icon footer-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6976"
              width="24"
              height="24"
            >
              <path
                d="M616.401455 720.756364L418.909091 523.310545 616.401455 325.818182l32.907636 32.907636-164.584727 164.584727 164.584727 164.538182z"
                p-id="6977"
                fill="#8a8a8a"
              />
            </svg>
            <span class="footer-page">
              <span>{{ photoListPage }}</span>
              <span class="footer-page__division">/</span>
              <span>{{ Math.ceil(photoListCount / 18) }}</span>
            </span>
            <svg
              t="1646027220715"
              class="icon footer-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8128"
              width="24"
              height="24"
            >
              <path
                d="M407.59854499 303.243636L605.090909 500.689455 407.598545 698.18181801l-32.907636-32.90763601 164.584727-164.584727-164.584727-164.538182z"
                p-id="8129"
                fill="#8a8a8a"
              />
            </svg>

            <input
              v-model="photoListTopage"
              type="number"
              class="page-number"
              οnkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            />

            <span class="footer-btn">跳转</span>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="group-sure" @click="surePhoto" :class="{ disable: selectImgList.length <= 0 }"
          >确定</div
        >
        <div class="group-cancel" @click="closePhoto">取消</div>

        <div class="group-check">
          <span>已选择</span>
          <span class="group-check__text">{{ selectImgList.length }} / {{ maxCount }} 项</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  //引入选择信息组件
  import { reactive, ref, watch } from 'vue'
  import { defineExpose } from 'vue'
  import { openPhotoStatement } from './PhotoGallery.ts'
  import PhotoPickerItem from './widget/PhotoPickerItem.vue'
  import {
    getDirectoryMenu,
    getMockImgList,
    addMockDirectoryMenu,
  } from '../../../../mock/PhotoGallery'

  //父组件的参数
  const props = defineProps({
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
  })

  // 组件的变量 是否打开
  let photoShow = ref(false)

  const maskFn = () => {
    props.mask && (photoShow.value = false)
  }

  // 目录数组
  let directoryMenu: Array<any> = reactive([])

  // 选择的图片数组
  let selectImgList: Array<any> = reactive([])
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
  let directorySelect= ref(0)

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

  const emit = defineEmits<{ (e: 'returnPhoto', selectImgList: Array<any>): void }>()
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
  defineExpose({
    openPhoto,
    closePhoto,
  })
</script>
