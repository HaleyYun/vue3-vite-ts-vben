<template>
  <div >
    <div  @click="clickItem" class="img-item mb-4 shadow-lg bg-gray-100 pb-1 cursor-pointer rounded-5px overflow-hidden w-190px">
      <div class="item__thumb ">
        <div class="container">
          <Icon size="50" v-if="info.isFolder" icon="ant-design:folder-outlined" />
          <div v-else-if="info.url&& !isVideo" class="img-item--target  overflow-hidden bg-white text-0">
            <a-image  :src="info.url+'&type=1'" />
          </div>
          <div class="video-style " v-else-if="info.url&& isVideo" @click="previewVideo">
            <PlayCircleFilled :style="playStyle" class="icon-play"/>
            <a-image  :src="info.url+ '&type=3'" :preview="false" />
          </div>
          <Icon size="50" v-else icon="iconoir:empty-page" />
        </div>
      </div>
      <div class="item__name">
        {{ info.name }}
      </div>
    </div>
  </div>
  <AModal
          v-model:visible="videoModal.visible"
          :title="info.name"
          destroy-on-close
          :footer="null"
          width="50%"
  >
    <div class="previewVideo">
      <video :src="info.url" autoplay controls :poster="info.videoPicUrl"></video>
    </div>

  </AModal>
</template>

<script lang="ts" setup>
  import { ref, reactive, toRefs,computed } from 'vue'
  import Icon from '/@/components/Icon'
  import { FileItemInterface } from '/@/modules/GoodsModule/GoodsManage/view/Source/type'
  import { useResourceTreeStoreWithOut } from '/@/store/modules/resourceTreeStore'
  import {PlayCircleFilled} from '@ant-design/icons-vue'

  const playStyle = {
      fontSize: '40px',
      color: '#07b4b4',
  }

  const useResourceTree = useResourceTreeStoreWithOut()
  const props = defineProps<{
    vo: FileItemInterface
  }>()

  // const emiter = defineEmits(['intoChildFoler'])

  const { vo: info } = toRefs(props);
  const imgSuffix = ['jpg','jpeg','png'];
  const videoSuffix = ['mp4','mov'];
  const videoModal = reactive({
      visible:false,

  });
  const isVideo = computed(()=>{
      if(videoSuffix.includes(info.value.resourceSuffix)){
        return true;
      }else {
          return false;
      }
  });

  const previewVideo = ()=>{
      videoModal.visible = true;
  };



  const clickItem = () => {
    if (info.value.isFolder) {
      console.log(info.value)
      useResourceTree.setCurrentFloderId(info.value.id)
      const selectFolderList = useResourceTree.getSelectFolderList
      const sl: [] = [...selectFolderList]
      sl.push({ title: info.value.name, id: info.value.id })
      console.log({
        sl,
      })
      useResourceTree.setSelectFolderList(sl)

      // emiter('intoChildFoler', info)
    } else {
      console.warn('非文件夹点击无效')
    }
  }
</script>

<style lang="scss" scoped>
  .item {
    margin-bottom: 15px;
    &__thumb {
      background: #f8f8f8;
      position: relative;
      cursor: pointer;
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 150px;
        min-height: 150px;
        .video-style{
          width:100%;
          height:100%;
          position: relative;

        }
        ::v-deep .ant-image{
          display: block;
        }
        ::v-deep .ant-image > img{
          height: 150px;
          width:100%;
          object-fit: cover;
        }
      }
    }
    &__name {
      background: #f2f2f2;
      text-align: center;
      padding: 6px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .previewVideo{
    height: 500px;
    width: 100%;
    video{
      width: 100%;
      height: 100%;
    }
  }

  .img-list {
    .img-item {
      margin-right: 20px;
      width: 190px;
      position: relative;

      .icon-play {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 99;
        background-color: #fff;
        border-radius: 50%;
        transform: translate(-50%,-50%);
      }

      .selected-icon {
        width: 100px;
        height: 100px;
        position: absolute;
        left: -50px;
        top: -50px;
        transform: rotate(45deg);
        background-color: #1abc9c;
        z-index: 99;
      }

      .img-item--name {
        height: 40px;
        font-size: 13px;
      }

      .img-name--content {
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        max-height: 40px;
        line-height: 1.5;
      }
    }
  }
</style>
