<template>
  <div class="brand-box">
    <div class="brand-delete-icon" @click.stop="deleteBrandItem()">
      <MinusCircleOutlined />
    </div>
    <div class="brand-name-area">
      <div class="brand-name__icon"></div>
      <div class="brand-name__label ">江陵动力</div>
    </div>
  <!--  上传图片--文字描述 -->
    <div class="brand-upload__info">请上传资质或授权照片</div>
  <!--  上传图片-->
    <div class="brand-upload">
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MinusCircleOutlined } from "@ant-design/icons-vue";
  export default defineComponent({
    name: 'BrandListItem',
    components: {
      MinusCircleOutlined,
    },
    emits: ['deleteBrandItem'],
    setup (_, { emit }) {
      const images = ref([
        {
          id: 1,
          name: '测试1',
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655367819&t=fa92f9ce4ccb7e9725b35c132ca2adb2',
          type: 1,
        },
        {
          id: 2,
          name: '22',
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242306111155-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655367819&t=ad132fceb95bca534c40e7a37737c825',
          type: 1,
        },
        {
          id: 3,
          name: '',
          src: '',
          type: 1,
        },])
      const deleteBrandItem = () => {
        emit('deleteBrandItem', 'currentItem')
      }
      return {
        images,
        deleteBrandItem,
      }
    }
  })
</script>
<style lang="less">
  .brand-box {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    .brand-delete-icon {
      font-size: 30px;
      margin-right: 10px;
    }
    .brand-name-area {
      display: flex;
      align-items: center;
      height: 50px;
      width: 246px;
      border: 1px solid #02A7F0;
      margin-right: 10px;
      .brand-name__icon {
        margin-left: 10px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: gray;
        margin-right: 10px;
      }
      .brand-name__label {
        font-size: 14px;
        color: #000000;
      }
    }
    .brand-upload__info {
      font-size: 14px;
      color: #979797;
      margin-right: 10px;
    }
    .brand-upload {

    }


  }
</style>