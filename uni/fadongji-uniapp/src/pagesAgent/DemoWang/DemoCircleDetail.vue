<template>
  <view>
    <view class="m-t-30" />
    <VoCircleDetail :circleDetailData="circleText" circelType="CircleText" @attentionFn="attentionFn" />

    <view class="m-t-30" />
    <VoCircleDetail :circleDetailData="circlePhotoAndText" circelType="CirclePhotoAndText" />

    <view class="m-t-30" />
    <VoCircleDetail :circleDetailData="circleVideoAndText" circelType="CircleVideoAndText" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        circleText: {
          tagList: ['#离合器', '#汽修大咖', '#发动机'],
          photoList: [],
          userIcon: '/static/circle/circle_user_icon.png',
          vipIcon: '/static/circle/circle_user_vip.png',
          isVip: false,
          name: '李思思',
          time: '2022年05月10日11:09:17',
          favourNum: '222',
          isAttention: false,
          endEditTime: '2022年05月10日17:11:35',
          poster: '',
          videoUrl: '',
          titleTag: '[共创项目：三离合变速器]',
          content:
            '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复，有钱大家一起赚~库存乱，有没有合适的方法扩大库存？',
        },
        circlePhotoAndText: {
          tagList: ['#离合器', '#汽修大咖', '#发动机'],
          photoList: [
            'https://cdn.uviewui.com/uview/album/1.jpg',
            'https://cdn.uviewui.com/uview/album/2.jpg',
            'https://cdn.uviewui.com/uview/album/3.jpg',
            'https://cdn.uviewui.com/uview/album/4.jpg',
            'https://cdn.uviewui.com/uview/album/5.jpg',
            'https://cdn.uviewui.com/uview/album/6.jpg',
            'https://cdn.uviewui.com/uview/album/7.jpg',
            'https://cdn.uviewui.com/uview/album/8.jpg',
            'https://cdn.uviewui.com/uview/album/9.jpg',
            'https://cdn.uviewui.com/uview/album/10.jpg',
          ],
          userIcon: '/static/circle/circle_user_icon.png',
          vipIcon: '/static/circle/circle_user_vip.png',
          isVip: false,
          name: '李思思',
          time: '2022年05月10日11:09:17',
          favourNum: '222',
          isAttention: false,
          endEditTime: '2022年05月10日17:11:35',
          poster: '',
          videoUrl: '',
          titleTag: '[共创项目：三离合变速器]',
          content:
            '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复，有钱大家一起赚~库存乱，有没有合适的方法扩大库存？',
        },
        circleVideoAndText: {
          tagList: ['#离合器', '#汽修大咖', '#发动机'],
          photoList: [],
          userIcon: '/static/circle/circle_user_icon.png',
          vipIcon: '',
          isVip: false,
          name: '李思思',
          time: '2022年05月10日11:09:17',
          favourNum: '222',
          isAttention: true,
          endEditTime: '2022年05月10日17:11:35',
          poster: 'https://cdn.uviewui.com/uview/album/2.jpg',
          videoUrl: '/static/video/video1.mp4',
          titleTag: '[共创项目：三离合变速器]',
          content:
            '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复，有钱大家一起赚~库存乱，有没有合适的方法扩大库存？',
        },
      }
    },
    methods: {
      attentionFn() {
        this.$u.toast('点击了关注')
      }
    },
  }
</script>

<style></style>
