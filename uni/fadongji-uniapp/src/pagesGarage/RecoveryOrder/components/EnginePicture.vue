<template>
  <view class="engine">
    <view class="w452 flex flex-column flex-vertical-c">
      <VoUpload
        :fileList="fileList1"
        :isTencentCloud="false"
        :maxCount="1"
        :previewFullImage="true"
        height="226"
        multiple
        name="1"
        width="226"
        @success="uploadSuccess1"
      >
        <image class="engine-img1" mode="widthFix" src="/static/common/upload_pictures.png" />
      </VoUpload>
      <view class="engine-name">发动机识别号</view>
    </view>
    <view class="flex flex-wrap">
      <view class="w218 m-t-32 m-r-16 flex flex-column flex-vertical-c">
        <VoUpload
          :fileList="fileList2"
          :isTencentCloud="false"
          :maxCount="1"
          :previewFullImage="true"
          height="109"
          multiple
          name="1"
          width="109"
          @success="uploadSuccess2"
        >
          <image class="engine-img" mode="widthFix" src="/static/common/upload_pictures.png" />
        </VoUpload>
        <view class="engine-name">进气端</view>
      </view>
      <view class="w218 m-t-32 m-r-16 flex flex-column flex-vertical-c">
        <VoUpload
          :fileList="fileList3"
          :isTencentCloud="false"
          :maxCount="1"
          :previewFullImage="true"
          height="109"
          multiple
          name="1"
          width="109"
          @success="uploadSuccess3"
        >
          <image class="engine-img" mode="widthFix" src="/static/common/upload_pictures.png" />
        </VoUpload>
        <view class="engine-name">排气端</view>
      </view>
      <view class="w218 m-t-32 flex flex-column flex-vertical-c">
        <VoUpload
          :fileList="fileList4"
          :isTencentCloud="false"
          :maxCount="1"
          :previewFullImage="true"
          height="109"
          multiple
          name="1"
          width="109"
          @success="uploadSuccess4"
        >
          <image class="engine-img" mode="widthFix" src="/static/common/upload_pictures.png" />
        </VoUpload>
        <view class="engine-name">正时端</view>
      </view>
      <view class="w218 m-t-32 m-r-16 flex flex-column flex-vertical-c">
        <VoUpload
          :fileList="fileList5"
          :isTencentCloud="false"
          :maxCount="1"
          :previewFullImage="true"
          height="109"
          multiple
          name="1"
          width="109"
          @success="uploadSuccess5"
        >
          <image class="engine-img" mode="widthFix" src="/static/common/upload_pictures.png" />
        </VoUpload>
        <view class="engine-name">曲后端</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'EnginePicture',
    data() {
      return {
        fileList1: [],
        fileList2: [],
        fileList3: [],
        fileList4: [],
        fileList5: [],
      }
    },
    methods: {
      // 上传图片
      uploadSuccess1(e) {
        this.fileList1.push({ url: e.filePath })
        this.$emit('uploadSuccess1', this.fileList1)
      },
      uploadSuccess2(e) {
        this.fileList2.push({ url: e.filePath })
        this.$emit('uploadSuccess2', this.fileList2)
      },
      uploadSuccess3(e) {
        this.fileList3.push({ url: e.filePath })
        this.$emit('uploadSuccess3', this.fileList3)
      },
      uploadSuccess4(e) {
        this.fileList4.push({ url: e.filePath })
        this.$emit('uploadSuccess4', this.fileList4)
      },
      uploadSuccess5(e) {
        this.fileList5.push({ url: e.filePath })
        this.$emit('uploadSuccess5', this.fileList5)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .engine {
    padding: 24rpx 32rpx;
    &-name {
      font-size: 28rpx;
      color: $v-c0-45;
      margin-top: 16rpx;
    }
    &-img1 {
      width: 452rpx;
      height: 452rpx;
      display: block;
    }
    &-img {
      width: 218rpx;
      height: 218rpx;
      display: block;
    }
  }
</style>
