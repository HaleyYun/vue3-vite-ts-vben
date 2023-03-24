<template>
  <view class="uploaded">
    <VoNav :is-fixed="false" is-have-more title="商品详情" />
    <view>
      <view class="line-bg h16" />
      <u--form
        ref="form"
        :model="formData"
        class="uploaded-form"
        labelPosition="left"
        labelWidth="150"
      >
        <view class="uploaded_form__title">商品信息</view>
        <u-form-item class="uploaded-form__item" label="商品分类" required>
          <u--input
            v-model="formData.categoryName"
            border="none"
            disabled
            disabledColor="#ffffff"
            inputAlign="right"
            placeholder="请选择"
            placeholderClass="uploaded-form__placeholder"
          />
<!--          <template #right>-->
<!--            <u-icon name="arrow-right" />-->
<!--          </template>-->
        </u-form-item>
        <u-form-item class="uploaded-form__item m-b-16" label="发动机型号" required>
          <u--input
            v-model="formData.model"
            border="none"
            disabled
            disabledColor="#ffffff"
            inputAlign="right"
            placeholder="请选择"
            placeholderClass="uploaded-form__placeholder"
          />
        </u-form-item>
        <view class="uploaded_form__title">商品信息</view>
        <u-form-item
          class="uploaded-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="商品名称"
          prop="contractPhone"
          required
        >
          <u--input
            v-model="formData.name"
            border="none"
            disabled
            disabledColor="#ffffff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="uploaded-form__placeholder"
          />
        </u-form-item>
        <u-form-item
          class="uploaded-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="销售价格"
          required
        />

        <u-form-item
          class="uploaded-form__item2"
          color="rgba(0, 0, 0, 0.85)"
          label="A类(成色上等商品)"
          prop="value4"
        >
          <u--input
            v-model="formData.aPrice"
            border="none"
            disabled
            disabledColor="#ffffff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="uploaded-form__placeholder"
          />
        </u-form-item>
        <view class="uploaded-form__text"
          >预计收益{{
            (formData.cPrice - detailData.recyclePrice - detailData.platformPrice).toFixed(2)
          }}元</view
        >
        <u-form-item
          class="uploaded-form__item2"
          color="rgba(0, 0, 0, 0.85)"
          label="B类(成色中等商品)"
          prop="value4"
        >
          <u--input
            v-model="formData.bPrice"
            border="none"
            disabled
            disabledColor="#ffffff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="uploaded-form__placeholder"
          />
        </u-form-item>
        <view class="uploaded-form__text"
          >预计收益{{
            (formData.cPrice - detailData.recyclePrice - detailData.platformPrice).toFixed(2)
          }}元</view
        >
        <u-form-item
          class="uploaded-form__item2"
          color="rgba(0, 0, 0, 0.85)"
          label="C类(成色下等商品)"
          prop="value5"
        >
          <u--input
            v-model="formData.cPrice"
            border="none"
            disabled
            disabledColor="#ffffff"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入"
            placeholderClass="uploaded-form__placeholder"
          />
        </u-form-item>
        <view class="uploaded-form__text"
          >预计收益{{
            (formData.cPrice - detailData.recyclePrice - detailData.platformPrice).toFixed(2)
          }}元</view
        >
        <!--        <u-form-item-->
        <!--          class="uploaded-form__item m-b-16 m-t-16"-->
        <!--          color="rgba(0, 0, 0, 0.85)"-->
        <!--          label="运费"-->
        <!--          prop="value10"-->
        <!--          required-->
        <!--        >-->
        <!--          <template #right>-->
        <!--            <u-radio-group v-model="formData.value10" placement="row">-->
        <!--              <u-radio-->
        <!--                v-for="(item, index) in radiolist1"-->
        <!--                :key="index"-->
        <!--                :class="{ 'm-l-60': index == 1 }"-->
        <!--                :label="item.name"-->
        <!--                :name="item.name"-->
        <!--                labelColor="#000"-->
        <!--              />-->
        <!--            </u-radio-group>-->
        <!--          </template>-->
        <!--        </u-form-item>-->
        <u-form-item class="uploaded-form__item2" label="商品主图" required />
        <view class="goods-image">
          <block v-for="(item, index) in goodsData.images">
            <u--image
              :src="item"
              mode="widthFix"
              @click="lookPreviewImage(goodsData.images, index)"
            />
            <!--            <view v-if="item.type === 'img'" :key="index">-->
            <!--              <u&#45;&#45;image :src="item.url" mode="widthFix" />-->
            <!--            </view>-->
            <!--            <view v-else :key="index" class="goods-image-video">-->
            <!--              <u&#45;&#45;image :src="item.url" mode="widthFix" />-->
            <!--              <view class="goods-image-video-icon">-->
            <!--                <VoIcon color="#fff" name="play" size="48" />-->
            <!--              </view>-->
            <!--            </view>-->
          </block>
        </view>
      </u--form>
      <view class="m-b-30" />
    </view>

    <!--  底部固定模块：start  -->
    <view class="uploaded-footer flex p-b-safe-area">
      <u-button
        class="uploaded-footer__button"
        shape="circle"
        text="预览商品"
        @click="nextpage()"
      />
      <u-button
        class="uploaded-footer__button"
        color="#FF5319"
        shape="circle"
        text="选择"
        @click="getGoods"
      />
    </view>
    <VoAddress />
    <u-picker />
    <u-calendar :show="show1" mode="range" @confirm="confirm1" />
    <u-datetime-picker v-model="formData.value13" :show="show3" mode="date" @confirm="confirm2" />
  </view>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        show1: false,
        show2: false,
        show3: false,
        //预售商品主键id
        sellId: '',
        //A类商品
        aShow: false,
        //B类商品
        bShow: false,
        //C类商品
        cShow: false,
        detailData: {},
        radiolist1: [
          {
            name: '到付',
            disabled: false,
          },
          {
            name: '包邮',
            disabled: false,
          },
        ],
        formData: {
          categoryName: '',
          model: '',
          value2: Number(new Date()),
          value3: Number(new Date()),
          value10: '',
          aPrice: '',
          bPrice: '',
          cPrice: '',
        },
        goodsData: {
          guideDesc: '需检查上传发动机正时端/水泵照片',
          problemDesc: '发动机漏水，打不着火了',
          images: [],
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
        },
      }
    },
    methods: {
      confirm1(e) {
        this.formData.value11 = e[0] + '至' + e[e.length - 1]
        this.show1 = false
      },
      confirm2(e) {
        this.formData.value13 = e
        this.show3 = false
      },
      nextpage(val) {
        this.getRecycleDetailRequest(this.detailData.id)
      },
      getGoods() {
        this.$linkToEasy(
          '/pagesRecovery/PresellActivity/PresellReleaseActivity?name=' +
            this.detailData.name +
            '&id=' +
            this.detailData.id +
            '&levelVOS=' +
            JSON.stringify(this.detailData.levelInfoVOS) +
            '&sourceType=3',
        )
      },
      lookPreviewImage(data, index) {
        // 预览图片
        uni.previewImage({
          urls: data,
          current: index,
        })
      },
      //旧机再销售管理-预览商品
      getRecycleDetailRequest(id) {
        this.$VoHttp
          .apiGoodsRecycleResalePreviewInfo({ id: id })
          .then((res) => {
            if (res.code === '20001') {
              this.$linkToEasy(
                '/pagesRecovery/SellGood/PreviewGoods/PreviewGoods?id=' + res.data.id,
              )
            } else {
              uni.$u.toast(res.message || '预览商品失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '预览商品失败')
          })
      },
      //获取商品详情
      getOrderDetailRequest(id) {
        this.$VoHttp
          .apiGoodsRecycleResaleQueryInfo({ id: id })
          .then((res) => {
            if (res.code === '20001') {
              console.log('订单详情', res)
              this.processDetail(res.data)
            } else {
              uni.$u.toast(res.message || '订单详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '订单详情获取失败')
          })
      },
      processDetail(data) {
        this.detailData = data
        this.formData.categoryName = this.detailData.categoryName
        this.formData.model = this.detailData.model
        this.formData.name = this.detailData.name
        console.log('订单详情', this.detailData)
        this.sellId = this.detailData.id
        this.goodId = this.detailData.resaleId
        this.formData.value1 = this.detailData.name
        //运费
        if (this.detailData.shippingType === 2) {
          this.formData.value10 = '包邮'
        } else {
          this.formData.value10 = '到付'
        }

        //预售信息
        this.detailData.levelInfoVOS.forEach((item) => {
          if (item.level === 'A') {
            this.aShow = true
            this.formData.aPrice = item.price
          }
          if (item.level === 'B') {
            this.bShow = true
            this.formData.bPrice = item.price
          }
          if (item.level === 'C') {
            this.cShow = true
            this.formData.cPrice = item.price
          }
        })
        //商品主图
        this.goodsData.images = this.detailData.picture
      },
    },
    onLoad(option) {
      this.getOrderDetailRequest(option.id)
    },
  }
</script>

<style lang="scss" scoped>
  .uploaded {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    > :nth-child(2) {
      flex-grow: 1;
      overflow: auto;
    }
    &-form {
      .uploaded_form__title {
        padding: 24rpx 32rpx;
        font-weight: bold;
        font-size: 32rpx;
        background-color: #fff;
      }
      &__item {
        padding: 0rpx 32rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        background: $v-bg-white;
      }
      &__item2 {
        padding: 0rpx 32rpx;
        text-align: right;
        background: $v-bg-white;
      }
      &__text {
        font-size: 28rpx;
        color: #ee0a24;
        padding: 0rpx 32rpx 8rpx 0;
        text-align: right;
        background: $v-bg-white;
        border-bottom: 2rpx solid $v-bg-light;
      }

      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
      }
      .text {
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .goods-image {
      display: flex;
      padding: 0 32rpx 32rpx 32rpx;
      background: $v-bg-white;
      flex-wrap: wrap;
      > :nth-child(n) {
        width: 218rpx;
        height: 218rpx;
        overflow: hidden;
        border-radius: 8rpx;
        margin-bottom: 16rpx;
      }

      > :nth-child(3n-1) {
        margin: 0 16rpx;
      }

      &-video {
        position: relative;

        &-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    &-footer {
      height: 132rpx;
      line-height: 132rpx;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
      width: 100%;
      background: $v-bg-white;

      &__button {
        width: 324rpx;
        height: 80rpx;
        margin: auto;
      }
    }
  }
</style>
