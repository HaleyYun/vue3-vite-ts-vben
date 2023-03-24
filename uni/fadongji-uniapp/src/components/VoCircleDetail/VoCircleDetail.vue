<template>
  <view class="detail">
    <view class="flex flex-justify-between detail-user">
      <view class="flex" @click="toUserHome()">
        <view class="detail-user__photo">
          <image
            :src="
              circleDetailData.userPhotoUrl ||
              circleDetailData.photoUrl ||
              '/static/default_avatar.png'
            "
            class="icon"
          />
          <VoIcon v-if="isShowVideo" :size="13" class="big-v" name="v-icon" />
        </view>
        <view>
          <view class="flex flex-vertical-c">
            <view class="fz-28 m-l-8 detail-user__name">{{
              circleDetailData.userName || circleDetailData.nickName
            }}</view>
            <!-- <VoIcon :size="24" class="detail-user__vip" color="#FDA202" name="crown" /> -->
          </view>
          <view class="m-l-20 fz-20 detail-user__time">{{ datetime }}</view>
        </view>
      </view>
      <view
        v-if="circleDetailData.businessType === 1 && isAuthor"
        class="edit-btn"
        @click="editIdea"
      >
        <VoIcon :size="24" color="#0D66FF" name="edit-line" />
        <view class="edit-btn__text">修改想法</view>
      </view>
      <view
        v-if="isShowAttention"
        :class="circleDetailData.isAttention ? 'detail-normal' : 'detail-selected'"
        class="detail-attention flex flex-justify-c"
        @click="attentionClick"
      >
        关注
      </view>
      <view v-if="!isAuthor" class="top-icon" @click.stop="showActionPop">
        <VoIcon :opacity="0.45" :size="24" class="icon1" color="#000000" name="comment-more" />
      </view>
    </view>
    <view class="detail-favour flex flex-justify-between overflow-hidden">
      <view>
        <block v-if="circleDetailData.likeNum">
          <block v-if="circleDetailData.likeNum >= 100000"> 10w+ </block>
          <block v-else-if="circleDetailData.likeNum >= 10000">
            {{ parseInt((circleDetailData.likeNum / 10000) * 10) / 10 }}w
          </block>
          <block v-else-if="circleDetailData.likeNum >= 1000">
            {{ (circleDetailData.likeNum / 1000).toFixed(1) }}k
          </block>
          <block v-else>{{ circleDetailData.likeNum }}</block>
        </block>
        <block v-else>0</block>
        人赞同该{{ businessTypeDis[circleDetailData.businessType] }}
      </view>
      <view
        v-if="circleDetailData.goodsName"
        class="link-name flex1 fz-24 flex flex-justify-r flex-vertical-c"
        @click="toGoodsDetail"
      >
        <VoIcon :size="20" class="m-l-8 m-r-8" color="#0D66FF" name="car-new" />
        <view class="link-name__goodsName overOneEllipsis">{{ circleDetailData.goodsName }}</view>
        <VoIcon :size="14" class="m-l-8" color="#0D66FF" name="arrow-right" />
      </view>
    </view>
    <!-- 回答类型展示富文本 -->
    <!-- <view class="rich" v-if="circleDetailData.businessType === 3">
      <u-parse :content="circleDetailData.transferHtml" />
    </view> -->
    <!-- 想法内容是语音时 -->
    <view v-if="circleDetailData.businessType === 1 && circleDetailData.audio" class="flex">
      <VoAudioVoice :info="circleDetailData" />
    </view>
    <view>
      <view class="detail-content">
        <view class="flex1">
          <u-parse
            v-if="+circleDetailData.businessType === 3"
            :content="commentParse"
            @imgTap="mediaClick"
          />
          <block v-else>
            <VoIcon
              :name="circleDetailData.businessType === 1 ? 'x-tag' : 'w-tag'"
              :size="24"
              class="detail-content__icon"
              style="display: inline-block"
            />
            <text v-if="circleDetailData.titleTag" class="detail-content__tag">{{
              circleDetailData.titleTag
            }}</text>
            <text class="detail-content__content">{{ circleDetailData.content }}</text>
          </block>
        </view>
      </view>
      <!--    视频文字-->
      <view
        v-if="
          circleDetailData.video &&
          circleDetailData.video.length &&
          +circleDetailData.businessType != 3
        "
      >
        <block v-for="(item, index) in circleDetailData.video" :key="index">
          <view class="poster" @click="playVideo(item)">
            <image
              :src="circleDetailData.image ? $getDomain(circleDetailData.image[index]) : ''"
              class="poster-img"
              mode="aspectFit"
            />
            <image class="poster-icon" mode="aspectFill" src="/static/icons/play.png" />
          </view>
        </block>
      </view>
      <!--    图文-->
      <view
        v-if="circleDetailData.image && circleDetailData.image.length && !circleDetailData.video"
        class="detail-photos"
      >
        <view
          v-for="(img, imgIndex) of circleDetailData.image"
          :key="img"
          class="image-box"
          @click="priviewImg(imgIndex)"
        >
          <image :src="img" class="image-box__img" @error="imgError(imgIndex)" />
        </view>
      </view>
    </view>

    <view class="detail-tags">
      <VoTag
        v-if="circleDetailData.columnName"
        :text="'#' + circleDetailData.columnName"
        bgColor="#F7F7F8"
        borderColor="#F7F7F8"
        class="detail-tags__tag"
        color="rgba(0, 0, 0, 0.45)"
        shape="circle"
      />
      <!-- <VoTag
              v-if="circleDetailData.categoryName"
              :text="'#' + circleDetailData.categoryName"
              bgColor="#F7F7F8"
              borderColor="#F7F7F8"
              class="detail-tags__tag"
              color="rgba(0, 0, 0, 0.45)"
              shape="circle"
            /> -->
    </view>

    <!--    <view v-show="circleDetailData.createTime" class="detail-bottom">-->
    <!--      最后编辑于 {{ circleDetailData.createTime }}・著作权归作者所有-->
    <!--    </view>-->
    <!-- 举报弹层 -->
    <VoActionSheet
      v-show="showAction"
      :actions="actions"
      :show="showAction"
      cancelText="取消"
      class="action-sheet"
      @close="cancelFn"
      @select="actionSelect"
    />
    <EraPreviewVideo ref="previewVideo" :videoSrc="videoSrc" autoplay />
  </view>
</template>

<script>
  import { hideLoading, showLoading } from '../../common/helper'

  export default {
    name: 'VoCircleDetail',
    components: {},

    props: {
      /*
       * 类型判断 文本：CircleText  图文：CirclePhotoAndText  视频文字：CircleVideoAndText
       * 默认：文本格式
       * */
      circelType: {
        type: String,
        default: 'CircleText',
      },
      isShowAttention: {
        type: Boolean,
        default: false,
      },
      //是否是作者
      isAuthor: {
        type: Boolean,
        default: false,
      },
      //回答内容
      circleDetailData: {
        type: Object,
      },
    },
    data() {
      return {
        videoSrc: '',
        src: '',
        attentionTitle: this.circleDetailData.isAttention ? '已关注' : '关注',
        isShowVideo: false,
        datetime: '',
        photoList: [],
        videoContext: '',
        businessTypeDis: {
          0: '问题',
          1: '想法',
          2: '视频',
          3: '回答',
          4: '评论',
        },
        showAction: false,
        actions: [
          {
            name: '举报作者',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            name: '举报内容',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            name: '拉黑用户',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
        ],
        commentParse: '',
      }
    },
    mounted() {
      //时间转换
      if (this.circleDetailData.createTime) {
        let timestamp
        if (uni.$u.os() === 'ios') {
          timestamp = new Date(this.circleDetailData.createTime.replace(/-/g, '/')).getTime()
        } else {
          timestamp = new Date(this.circleDetailData.createTime).getTime()
        }
        this.datetime = this.$vocenApi.VoUtils.timeFormat(timestamp, 'yyyy年mm月dd日 hh:MM:ss')
      }
      // this.videoContext = uni.createVideoContext('myVideo')
      this.transferHtml()
      // this.photoList = this.circleDetailData.image
      //图片路径转换
      // if (this.circleDetailData.fileUrl) {
      //   let urls = this.circleDetailData.fileUrl.split('|')
      //   this.photoList = urls.map((item) => {
      //     return showCosUrl + item
      //   })
      // }
    },
    methods: {
      cancelFn() {
        this.showAction = false
        this.$emit('update', false)
      },
      imgError(index) {
        console.log(index, '99999')
        this.circleDetailData.image[index] = '/static/created/im/photo.png'
        this.$forceUpdate()
      },
      //富文本视频解析
      transferHtml(commentParse) {
        let str = commentParse ? commentParse : this.circleDetailData.commentParse
        if (str) {
          // 匹配img自定义封面图标正则
          const reg2 = /<img[^<]*data-custom=[^>]*\.mp4"[^>]*>/g
          const imgReg = /http[^"]*\.jpg/g
          // 匹配视频地址正则
          const video = /video=.*\.mp4/g
          // 进行img转 video
          const afterHtmlStr = str.replace(reg2, (val) => {
            // 取出data-custom值
            const v = val.match(video)
            const poster = val.match(imgReg)
            const vs = v[0].replace('video=', '')

            return `<video controls src="${vs}" poster="${poster[0]}" style="background:#000" preload width="100%" height="200"></video>`
          })
          this.commentParse = afterHtmlStr
        }

        console.log('commentParse', this.commentParse)
      },
      playVideo(item) {
        this.videoSrc = item
        this.$refs.previewVideo.show(item)
      },
      // 富文本媒体点击
      mediaClick(e) {
        console.log(e)
        let src = e['data-custom']
        if (src) {
          if (src.split('.').pop() === 'mp4') {
            this.videoSrc = src.split('=').pop()
            this.$refs.previewVideo.show(this.videoSrc)
          }
        }
      },
      //跳转商品详情
      toGoodsDetail() {
        this.$linkToEasy(
          `/pagesSupplier/GoodsManage/GoodsDetail?id=${this.circleDetailData.goodsId}&authorId=${this.circleDetailData.userId}`,
        )
      },
      /*
       * 预览图片
       */
      priviewImg(index) {
        uni.previewImage({
          urls: this.circleDetailData.image,
          current: index,
        })
      },
      playClick(val) {
        this.isShowVideo = true
        this.src = val.video
      },
      // video播放结束
      eventHandle() {
        this.isShowVideo = false
      },
      // 暂停video
      pause() {
        // this.videoContext.pause()
        // this.isShowVideo = false
      },
      attentionClick() {
        if (this.circleDetailData.isAttention) {
          return
        }
        this.$emit('attentionFn')
      },
      editIdea() {
        this.$linkToEasy(
          '/pagesAgent/CreatedCenter/ReleaseCircle/ReleaseIdea?id=' + this.circleDetailData.id,
        )
      },
      //跳转作者主页
      toUserHome() {
        this.$linkToEasy(
          '/pagesAgent/PersonalHomepage/PersonalHomepage?userId=' +
            this.circleDetailData.userId +
            '&platformCode=' +
            this.circleDetailData.platformCode,
        )
      },
      //评论举报
      showActionPop() {
        this.showAction = true
        this.$emit('update', true)
      },
      actionSelect(e) {
        if (e.name === '举报作者') {
          showLoading()
          setTimeout(() => {
            hideLoading()
            this.$u.toast('举报成功')
          }, 1500)
          return
        }
        if (e.name === '拉黑用户') {
          showLoading()
          setTimeout(() => {
            hideLoading()
            this.$u.toast('拉黑成功')
          }, 1000)
          return
        }
        if (e.name === '举报内容') {
          console.log(this.circleDetailData)
          let data = JSON.stringify(this.circleDetailData)
          let url = `/pagesAgent/CreatedCenter/AnswerAll/CircleReport?data=${data}`
          if (this.circleDetailData.businessType != 3) {
            url = url + '&page=comment'
          }
          this.$linkToEasy(url)
          return
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail {
    margin: 0 32rpx;
    background-color: #ffffff;
    // border-bottom: 2rpx solid #f7f7f8;
    width: 686rpx !important;
    box-sizing: border-box;

    &:last-child {
      border-bottom: none;
    }
    .link-name {
      color: #0d66ff;
      &__goodsName {
        max-width: 320rpx;
      }
    }

    &-user {
      padding-top: 20rpx;

      &__photo {
        position: relative;
        width: 56rpx;
        height: 56rpx;

        .icon {
          width: 56rpx;
          height: 56rpx;
          border-radius: 50%;
        }

        .big-v {
          position: absolute;
          right: -4rpx;
          bottom: -4rpx;
        }
      }

      &__name {
        height: 42rpx;
        line-height: 42rpx;
      }

      &__time {
        color: rgba(0, 0, 0, 0.45);
      }

      &__vip {
        padding-left: 8rpx;
      }
    }

    &-attention {
      border-radius: 60rpx;
      height: 56rpx;
      line-height: 56rpx;
      width: 160rpx;
      font-size: 24rpx;
    }

    &-normal {
      color: rgba(0, 0, 0, 0.15);
      background-color: #f6f7f8;
    }

    &-selected {
      color: #ffffff;
      background-color: #22284b;
    }

    &-favour {
      margin-top: 14rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: rgba(0, 0, 0, 0.45);
      border-bottom: 2rpx solid #f6f7f8;
      padding-bottom: 22rpx;
      box-sizing: border-box;
    }

    &-content {
      margin-top: 16rpx;
      font-size: 28rpx;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.65);
      word-break: break-all;
      display: flex;
      &__icon {
        margin-right: 8rpx;
        line-height: 1;
        display: inline-block;
        vertical-align: top;
      }

      &__tag {
        color: #155bd4;
        line-height: 42rpx;
      }
      &__content {
        line-height: 42rpx;
      }
    }

    &-video {
      position: relative;
      margin-top: 16rpx;
      height: 384rpx;
      max-height: 384rpx;
      width: 686rpx;
      display: inline-block;
      border-radius: 16rpx;

      &__image {
        height: 384rpx;
        width: 686rpx;
        border-radius: 16rpx;
      }

      &__paly {
        position: absolute;
        height: 110rpx;
        width: 110rpx;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }

    &-photos {
      margin-top: 16rpx;
      // height: 100%;
      width: 686rpx;
      box-sizing: border-box;

      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .image-box {
        width: 33.33%;
        height: 210rpx;
        padding-right: 8rpx;
        padding-top: 8rpx;
        box-sizing: border-box;

        &:nth-child(3n + 3) {
          padding-right: 0;
        }
        &__img {
          width: 100%;
          height: 100%;
          border-radius: 8rpx;
        }
      }
    }

    &-tags {
      margin-top: 16rpx;
      color: rgba(0, 0, 0, 0.45);
      font-size: 24rpx;

      &__tag {
        display: inline-block;
        margin-right: 16rpx;
      }
    }

    &-bottom {
      margin-top: 6rpx;
      color: rgba(0, 0, 0, 0.45);
      font-size: 24rpx;
    }
    .edit-btn {
      display: flex;
      &__text {
        font-weight: bold;
        font-size: 28rpx;
        line-height: 1.5;
        color: #0d66ff;
      }
    }
    .poster {
      position: relative;
      background: #000;
      border-radius: 12rpx;
      overflow: hidden;
      &-img {
        height: 364rpx;
        width: 100%;
      }
      &-icon {
        width: 110rpx;
        height: 110rpx;
        position: absolute;
        right: calc(50% - 56rpx);
        top: calc(50% - 56rpx);
      }
    }
  }
</style>
