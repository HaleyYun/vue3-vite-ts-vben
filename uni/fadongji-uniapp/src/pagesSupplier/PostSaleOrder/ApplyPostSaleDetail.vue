<template>
  <view class="page">
    <VoNav
      v-if="orderDetail.status || orderDetail.statusName"
      :is-fixed="false"
      :title="Number(orderDetail.status) === 4160 ? '已完成' : orderDetail.statusName"
      is-have-more
    />
    <view class="content">
      <view class="content_steps">
        <u-steps :current="currentStep" activeColor="#FFECE5" inactiveColor="#F6F7F8">
          <u-steps-item v-for="(item, index) in stepsData" :key="index">
            <block slot="icon">
              <VoIcon
                v-if="orderDetail.status >= item.status || orderDetail.status === 4160"
                :key="index"
                color="#07C160"
                name="approve-have"
                size="13"
              />
              <VoIcon
                v-else-if="
                  orderDetail.status >= stepsData[index - 1].status &&
                  orderDetail.status < item.status
                "
                :key="index"
                color="#FF5319"
                name="more-fill"
                size="20"
              />
              <view v-else class="steps_text" />
            </block>
            <block slot="desc">
              <view class="step_desc">
                <view>{{ item.title }}</view>
                <view v-if="item.desc" class="black45 m-t-24 fz-20">{{
                  item.desc.split(' ')[0]
                }}</view>
                <view v-if="item.desc" class="black45 fz-20">{{ item.desc.split(' ')[1] }}</view>
              </view>
            </block>
          </u-steps-item>
        </u-steps>
        <view class="content_result_text black85">{{ switchToText(orderDetail.status) }}</view>
      </view>
      <!--已取消的不显示旧机返回地址-->
      <view
        v-if="
          orderDetail.status !== 4410 &&
          +orderDetail.status !== 4170 &&
          +orderDetail.status !== 4110 &&
          orderDetail.orderAddress &&
          Object.keys(orderDetail.orderAddress) &&
          orderDetail.isSendBack &&
          (orderDetail.orderAddress.address || orderDetail.orderAddress.addressDetail)
        "
        class="content_return"
      >
        <view class="title black85">旧件返还地址</view>
        <view class="content_return_address">
          <view class="addressee bg_white fz-28">
            <view class="addressee_desc"
              ><text class="m-r-16">{{ orderDetail.orderAddress.name }}</text
              ><text>{{ orderDetail.orderAddress.phone }}</text></view
            >
            <view class="addr">{{
              orderDetail.orderAddress.address + '-' + orderDetail.orderAddress.addressDetail
            }}</view>
          </view>
        </view>
      </view>
      <view
        v-if="orderDetail.sendBackList && orderDetail.sendBackList.length"
        class="content_logistics"
      >
        <view class="title black85">商品寄回信息</view>
        <view class="content_logistics_form">
          <u--form labelPosition="left" labelWidth="150">
            <u-form-item
              ref="item1"
              :required="orderDetail.sendBackList[0].deliveryType === 1"
              class="u_form_item_class"
              label="发货方式："
            >
              <view class="t-right">{{
                orderDetail.sendBackList[0].deliveryType == 1 ? '物流发货' : '无物流'
              }}</view>
            </u-form-item>
            <template v-if="logisticsDetail">
              <u-form-item
                :required="orderDetail.sendBackList[0].deliveryType === 1"
                class="u_form_item_class"
                label="发货凭证："
                labelWidth="100%"
              />
              <view v-if="logisticsDetail.pic && logisticsDetail.pic.length">
                <VoUpload
                  :deletable="false"
                  :fileList="[{ url: logisticsDetail.pic[0].url }]"
                  :maxCount="1"
                  :previewFullImage="true"
                  height="105"
                  multiple
                  name="1"
                  width="105"
                >
                  <view class="u__upload">
                    <VoIcon color="#D2D2D3" name="plus" size="30" />
                  </view>
                </VoUpload>
              </view>
              <template v-if="+orderDetail.sendBackList[0].deliveryType === 1">
                <u-form-item
                  class="u_form_item_class"
                  label="物流单号："
                  prop="logisticsNm"
                  required
                >
                  <view class="t-right black65">{{ logisticsDetail.orderId }}</view>
                </u-form-item>
                <u-form-item class="u_form_item_class" label="物流公司：">
                  <view class="t-right black65">{{ logisticsDetail.company }}</view>
                </u-form-item>
                <u-form-item class="u_form_item_class" label="物流查询电话：">
                  <view class="t-right black65">{{ logisticsDetail.companyPhoneNm }}</view>
                </u-form-item>
              </template>
            </template>
          </u--form>
          <view>
            <u-button
              v-if="orderDetail.status == 4130"
              class="custom-style button"
              color="#FF5319"
              shape="circle"
              text="确认收货"
              @click="sureSubmit"
            />
          </view>
        </view>
      </view>
      <view v-if="orderDetail.makeUpAmount" class="content_compensate">
        <view class="title black85">补偿信息</view>
        <view class="content_compensate_msg">
          <view class="flex flex-justify-between">
            <text>补偿金额：</text>
            <text class="black65">{{ orderDetail.makeUpDetail.makeUpAmount }}元</text>
          </view>
          <view class="flex flex-justify-between">
            <text>补偿方式：</text>
            <text class="black65">{{ orderDetail.makeUpDetail.makeUpType }}</text>
          </view>
          <view class="flex flex-justify-between">
            <text>处理备注：</text>
            <text class="black65">{{ orderDetail.makeUpDetail.remark }}</text>
          </view>
          <view v-if="orderDetail.makeUpDetail.makeUpTime" class="flex flex-justify-between">
            <text>补偿到账时间：</text>
            <text class="black65">{{ orderDetail.makeUpDetail.makeUpTime }}</text>
          </view>
        </view>
      </view>
      <view
        v-if="orderDetail.makeUpDetail && Object.keys(orderDetail.makeUpDetail).length"
        class="content_order"
      >
        <view class="title black85">平台处理结果</view>
        <view class="content_order_msg">
          <!-- 维修补偿和换件补偿的平台处理结果模块中都不显示处理结果字段 -->
          <view
            v-if="orderDetail.type != 1 && orderDetail.type != 2"
            class="flex flex-justify-between"
          >
            <text>处理结果：</text>
            <text class="black65">{{ orderDetail.makeUpDetail.result }}</text>
          </view>
          <view
            v-if="orderDetail.makeUpDetail.result != '仅换机'"
            class="flex flex-justify-between"
          >
            <text>补偿金额：</text>
            <text class="black65">{{ orderDetail.makeUpDetail.makeUpAmount }}元</text>
          </view>
          <view
            v-if="orderDetail.makeUpDetail.result != '仅换机'"
            class="flex flex-justify-between"
          >
            <text>补偿方式：</text>
            <text class="black65">{{ orderDetail.makeUpDetail.makeUpType }}</text>
          </view>
          <view class="flex flex-justify-between">
            <text>处理备注：</text>
            <text class="black65">{{ orderDetail.makeUpDetail.remark }}</text>
          </view>
          <view
            v-if="
              orderDetail.makeUpDetail.result != '仅换机' && orderDetail.makeUpDetail.makeUpTime
            "
            class="flex flex-justify-between"
          >
            <text>补偿到账时间：</text>
            <text class="black65">{{ orderDetail.makeUpDetail.makeUpTime }}</text>
          </view>
        </view>
      </view>
      <view
        v-if="orderDetail.goodsDetail && Object.keys(orderDetail.goodsDetail)"
        class="content_goods"
      >
        <view class="title black85">商品信息</view>
        <GoodsItemCard :orderDetail="orderDetail" />
      </view>
      <view
        v-if="orderDetail.newOrderInfo && Object.keys(orderDetail.newOrderInfo)"
        class="content_goods"
      >
        <view class="title flex flex-justify-between black85">
          <view>售后订单</view>
          <VoIcon
            color="#595959"
            name="right-arrow"
            size="20"
            @click="goOrderDetail(orderDetail.newOrderInfo)"
          />
        </view>
        <ApplyPostSaleSimpleItem :orderDetail="orderDetail" />
      </view>
      <view class="content_post_sale">
        <view class="title black85">售后信息</view>
        <view class="content_post_sale_msg">
          <view class="flex flex-justify-between">
            <view>服务单号:</view>
            <view
              ><text class="black65">{{ orderDetail.id }}</text
              ><text class="m-l-8 Color_0D66FF" @click="copyText(orderDetail.id)">复制</text></view
            >
          </view>
          <view class="flex flex-justify-between">
            <text>申请时间</text>
            <text class="black65">{{ orderDetail.createTime }}</text>
          </view>
          <view class="flex flex-justify-between">
            <text>商品识别码</text>
            <text class="black65">{{ orderDetail.engineNo }}</text>
          </view>
          <!--          <view v-if="orderDetail.goodsDetail && orderDetail.goodsDetail.length && afterDataUrl">-->
          <!--            <view class="flex flex-justify-r img_box">-->
          <!--              <view class="form_image">-->
          <!--                <u-upload-->
          <!--                  :deletable="false"-->
          <!--                  :fileList="[{ url: afterDataUrl }]"-->
          <!--                  :maxCount="1"-->
          <!--                  disabled-->
          <!--                  height="109"-->
          <!--                  name="1"-->
          <!--                  width="109"-->
          <!--                />-->
          <!--              </view>-->
          <!--            </view>-->
          <!--          </view>-->
          <view class="flex flex-justify-between">
            <text>售后类型：</text>
            <text class="black65">{{ orderDetail.typeName }}</text>
          </view>
          <view v-if="orderDetail.type !== 3" class="flex flex-justify-between">
            <text>故障部位：</text>
            <text class="black65">{{ orderDetail.unit }}</text>
          </view>
          <view
            v-if="orderDetail.status !== 4140 && orderDetail.amount > 0"
            class="flex flex-justify-between"
          >
            <text>预计补偿：</text>
            <text class="black65">{{ orderDetail.amount }}元</text>
          </view>
          <view>
            <text>故障描述及凭证：</text>
            <view
              v-if="
                orderDetail.afterSaleFaultDetail.voice &&
                orderDetail.afterSaleFaultDetail.voice.indexOf('.mp3') > -1
              "
            >
              <NewAudioVoice :info="JSON.parse(orderDetail.afterSaleFaultDetail.voice)" />
            </view>
            <view
              v-else-if="orderDetail.afterSaleFaultDetail && orderDetail.afterSaleFaultDetail.desc"
              class="problem_desc"
            >
              {{ orderDetail.afterSaleFaultDetail.desc }}
            </view>
            <view class="m-t-16">
              <VoFormUpload
                :source="fileList"
                class="vo_form_upload"
                preview
                uploadStyle="{width:218rpx;height:218rpx}"
              />
            </view>
          </view>
          <!-- <view class="flex flex-justify-between">
            <text>是否返回旧件：</text>
            <text class="black65">{{ orderDetail.isSendBack ? '是' : '否' }}</text>
          </view> -->
        </view>
      </view>
      <view
        v-if="orderDetail.oriOrderInfo && Object.keys(orderDetail.oriOrderInfo).length"
        class="content_order"
      >
        <view class="title black85">原订单信息</view>
        <view class="content_order_msg">
          <view class="flex flex-justify-between">
            <view>订单编号：</view>
            <view
              ><text class="black45">{{ orderDetail.oriOrderInfo.id }}</text
              ><text class="m-l-8 Color_0D66FF" @click="copyText(orderDetail.oriOrderInfo.id)"
                >复制</text
              ></view
            >
          </view>
          <view class="flex flex-justify-between">
            <text>下单时间：</text>
            <text class="black45">{{ orderDetail.oriOrderInfo.createTime }}</text>
          </view>
        </view>
      </view>
      <view class="m-b-40" />
      <u-toast ref="uToast" />

      <u-modal
        :show="sureCancel"
        cancel-text="取消"
        confirm-text="确定"
        confirmColor="#22284B"
        show-cancel-button
        @cancel="cancelFn"
        @confirm="confirmHandler"
      >
        <view class="info-content">确定取消售后申请吗？</view>
      </u-modal>
    </view>
  </view>
</template>

<script>
  import ApplyPostSaleSimpleItem from './components/ApplyPostSaleSimpleItem.vue'
  import GoodsItemCard from './components/GoodsItemCard.vue'
  import NewAudioVoice from './components/NewAudioVoice.vue'

  export default {
    components: {
      GoodsItemCard,
      ApplyPostSaleSimpleItem,
      NewAudioVoice,
    },
    data() {
      return {
        //售后信息 图片
        afterDataUrl: '',
        sureCancel: false,
        formLogistics: {
          deliveryType: 1,
          logisticsDetail: {
            pic: [],
            company: '',
            companyPhoneNm: '',
            orderId: '',
          },
        },
        fileList1: [],
        id: '',
        orderDetail: {
          afterSaleFaultDetail: {
            voice: '',
            pic: [],
          },
        },
        rules: {
          deliveryType: [
            {
              required: true,
              message: '不能为空',
              trigger: ['change'],
            },
          ],
          'logisticsDetail.orderId': [
            {
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          'logisticsDetail.pic': [
            {
              required: true,
              message: '请上传发货凭证',
              trigger: ['change'],
            },
          ],
          'logisticsDetail.company': [
            {
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          'logisticsDetail.companyPhoneNm': [
            {
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
        },
      }
    },
    computed: {
      stepsData() {
        if (this.orderDetail.status == 4170) {
          return [
            {
              title: '提交申请',
              status: 4110,
              warn: '服务单已取消,如有需要可重新申请',
              desc: this.orderDetail.createTime,
            },
            {
              title: '服务单取消',
              status: 4170,
              warn: '申请提交成功，请等待平台审核',
              desc: this.orderDetail.cancelTime,
            },
          ]
        } else if (this.orderDetail.status == 4180) {
          return [
            {
              title: '提交申请',
              status: 4110,
              warn: '审核未通过：' + '请补充商品图片',
              desc: this.orderDetail.createTime,
            },
            {
              title: '审核未通过',
              status: 4180,
              warn: '审核未通过：' + '请补充商品图片',
              desc: this.orderDetail.closeTime,
            },
          ]
        } else if (
          this.orderDetail.type == 1 ||
          (this.orderDetail.type == 2 && !this.orderDetail.isSendBack)
        ) {
          //运输损坏+更换零部件不还旧件
          return [
            {
              title: '提交申请',
              status: 4110,
              warn: '申请提交成功，请等待售后处理',
              desc: this.orderDetail.createTime,
            },
            {
              title: '已通过',
              status: 4120,
              warn: '已通过，等待银行发放补偿中',
              desc: this.orderDetail.auditTime,
            },
            {
              title: '补偿完成',
              status: 4160,
              warn: '补偿已完成',
              desc: this.orderDetail.finishTime,
            },
          ]
        } else if (this.orderDetail.type == 2 && this.orderDetail.isSendBack) {
          //更换零部件需还旧件
          return [
            {
              title: '提交申请',
              status: 4110,
              warn: '申请提交成功，请等待售后处理',
              desc: this.orderDetail.createTime,
            },
            {
              title: '已通过',
              status: 4120,
              warn: '已通过，请尽快上传旧件寄回物流单号',
              desc: this.orderDetail.auditTime,
            },
            {
              title: '退件寄出',
              status: 4130,
              warn: '旧件已寄回，待卖家签收',
              desc: this.orderDetail.sendTime,
            },
            {
              title: '旧件签收',
              status: 4140,
              warn: '旧件已签收，等待银行发放补偿中',
              desc: this.orderDetail.receiveTime,
            },
            {
              title: '售后完成',
              status: 4160,
              warn: '服务已完成，感谢您的支持',
              desc: this.orderDetail.finishTime,
            },
          ]
        } else if (this.orderDetail.type == 3) {
          //换机
          return [
            {
              title: '提交申请',
              status: 4110,
              warn: '申请提交成功，请等待售后处理',
              desc: this.orderDetail.createTime,
            },
            {
              title: '已通过',
              status: 4120,
              warn: '已通过，待上传旧机寄回物流单号',
              desc: this.orderDetail.auditTime,
            },
            {
              title: '上传物流单号',
              status: 4130,
              warn: '旧机已寄出，待卖家签收',
              desc: this.orderDetail.sendTime,
            },
            {
              title: '确认收货',
              status: 4160,
              warn: '服务已完成，感谢您的支持',
              desc: this.compareTime(),
            },
          ]
        }
        return []
      },
      currentStep() {
        for (let i = 0; i < this.stepsData.length; i++) {
          if (this.orderDetail.status == this.stepsData[i].status) {
            return i
          } else if (this.stepsData[i].status > this.orderDetail.status) {
            return i - 1
          }
        }
        return this.stepsData.length - 1
      },
      fileList() {
        return this.orderDetail.afterSaleFaultDetail?.pic.map((item) => {
          return { type: item.type == 'video' ? 2 : 1, src: item.pic }
        })
      },
      logisticsDetail() {
        if (this.orderDetail.sendBackList?.[0].logisticsDetail) {
          return JSON.parse(this.orderDetail.sendBackList?.[0].logisticsDetail)
        }
        return ''
      },
    },
    onLoad(val) {
      if (val && val.id) {
        this.id = val.id
      }
    },
    mounted() {
      this.getOrderDetail()
    },
    methods: {
      compareTime() {
        if (
          this.$vocenApi
            .dayjs(this.orderDetail.newOrderReceiveTime)
            .isBefore(this.orderDetail.receiveTime)
        ) {
          return this.orderDetail.receiveTime
        } else {
          return this.orderDetail.newOrderReceiveTime
        }
      },
      switchToText(val) {
        if (val == 4110) return '申请提交成功，请等待售后处理'
        if (val == 4120) return '已通过，待买家上传旧件寄回信息'
        if (val == 4130) return '买家已寄回旧件，待卖家签收'
        if (val == 4140) return '旧机已签收，等待新机确认收货'
        if (val == 4150) {
          if (this.orderDetail.type == 1) return '已通过 等待银行发放补偿中'
          else if (this.orderDetail.type == 2) {
            if (this.orderDetail.isSendBack) return '旧机已签收，等待银行发放补偿中'
            else '旧机已签收，等待银行发放补偿中'
          } else {
            return '旧机、新机已签收，等待银行发放补偿中'
          }
        }
        if (val == 4160) return '服务已完成，感谢您的支持'
        if (val == 4161) return '服务已完成，感谢您的支持'
        if (val == 4170) return '服务单已取消，如有需要可重新申请。'
        if (val == 4180) {
          if (this.orderDetail.type == 3) {
            return '换机申请未通过,买家提交的故障内容经查证与事实不符，不支持换机。'
          } else {
            return '未通过，' + this.orderDetail.reason
          }
        } else {
          return ''
        }
      },
      goOrderDetail(data) {
        this.$linkToEasy('/pagesSupplier/Order/OrderDetail/OrderDetail?id=' + data.id)
      },
      cancel() {
        this.sureCancel = true
      },
      cancelFn() {
        this.sureCancel = false
      },
      async confirmHandler() {
        try {
          const res = await this.$VoHttp.apiOrderAfterSaleCancel({
            req: { orderId: this.id, cancelReason: '...' },
          })
          if (res.success) {
            uni.$u.toast(res.message)
            this.sureCancel = false
            this.resetReqList()
          }
        } catch (err) {
          uni.$u.toast(err.message)
        } finally {
          this.sureCancel = false
        }
      },
      copyText(val) {
        uni.setClipboardData({
          data: val,
          success: function () {
            uni.$u.toast('复制成功')
          },
        })
      },
      async getOrderDetail() {
        const res = await this.$VoHttp.apiOrderAfterSale(this.id)
        if (res.success) {
          this.orderDetail = res.data
          if (
            this.orderDetail.goodsDetail &&
            this.orderDetail.goodsDetail.length &&
            this.orderDetail.goodsDetail[0].pic &&
            this.orderDetail.goodsDetail[0].pic.length
          ) {
            if (this.orderDetail.goodsDetail[0].pic[0].indexOf('.mp4')) {
              if (this.orderDetail.goodsDetail[0].pic.length > 1) {
                this.afterDataUrl = this.orderDetail.goodsDetail[0].pic[1]
              }
            } else {
              this.afterDataUrl = this.orderDetail.goodsDetail[0].pic[0]
            }
          }
        } else {
          uni.$u.toast(res.message)
        }
      },
      submit() {
        const res = this.$refs.form1.validate()
        const submitRes = this.$VoHttp.apiOrderAfterSaleDelivery({
          req: {
            goodsDetail: this.orderDetail.goodsDetail,
            ...this.formLogistics,
            logisticsDetail: JSON.stringify(this.formLogistics.logisticsDetail),
            orderId: this.id,
          },
        })
        if (submitRes.success) {
          this.getOrderDetail()
        }
      },
      async sureSubmit() {
        const res = await this.$VoHttp.apiOrderAfterSaleReceipt({ orderId: this.id })
        if (res.success) {
          uni.$u.toast(res.message)
          this.getOrderDetail()
          uni.$emit('refresh')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    height: 100vh;
    flex-direction: column;
    .content {
      flex-grow: 1;
      overflow: auto;
      .content_steps {
        padding-top: 28rpx;
        background-color: #fff;
        margin-top: 16rpx;
        .steps_text {
          width: 16rpx;
          height: 16rpx;
          background-color: #f7f7f8;
          border-radius: 8rpx;
          color: #fff;
          line-height: 21px;
          text-align: center;
        }
        .step_desc {
          font-size: 24rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .content_result_text {
          text-align: center;
          font-size: 28rpx;
          line-height: 42rpx;
          padding-top: 32rpx;
          padding-bottom: 24rpx;
          color: #f20014;
          font-weight: bold;
        }
      }
      .content_return,
      .content_logistics,
      .content_compensate,
      .content_goods,
      .content_post_sale,
      .content_order {
        background-color: #fff;
        padding: 24rpx 32rpx;
        margin-top: 16rpx;
      }
      .content_compensate_msg,
      .content_post_sale_msg,
      .content_order_msg {
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.85);
        > :nth-child(n) {
          margin: 16rpx 0;
        }
      }
      .content_return_address {
        .addressee {
          padding-top: 24rpx;
          .addressee_desc {
            display: flex;
            align-items: center;
            margin-bottom: 8rpx;
          }
        }
      }
      .content_logistics_form {
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.85);
        ::v-deep .u_form_item_class .u-form-item__body {
          padding: 8rpx 0;
        }
        .placeholderStyle {
          text-align: right;
        }

        ::v-deep .u-form-item__body__right__content__slot .u-radio-group--row {
          justify-content: flex-end;
        }
      }

      .form_image {
        width: 218rpx;
        height: 218rpx;
        overflow: hidden;
        border-radius: 8rpx;
      }
      .problem_desc {
        box-sizing: border-box;
        padding: 24rpx;
        margin-top: 8rpx;
        background-color: #f6f7f8;
      }
    }

    .u__upload {
      width: 218rpx;
      height: 218rpx;
      font-size: 28rpx;
      color: #bfbfbf;
      background-color: #f7f7f8;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 8rpx;
    }
    .img_box {
      > :nth-child(3n-1) {
        margin: 0 18rpx;
      }
    }
    .title {
      font-size: 32rpx;
      font-weight: bold;
      padding-bottom: 24rpx;
      border-bottom: 1px solid #f7f7f8;
    }
    .Color_0D66FF {
      color: #0d66ff;
    }
    .black45 {
      color: rgba(0, 0, 0, 0.45);
    }
    .black85 {
      color: rgba(0, 0, 0, 0.85);
    }
    .black65 {
      color: rgba(0, 0, 0, 0.65);
    }
    .black {
      color: #000;
    }
  }
  .t-right {
    width: 100%;
    text-align: right;
  }
  .custom-style {
    width: 656rpx;
    height: 80rpx;
  }
  ::v-deep {
    .u-text {
      flex-grow: 0 !important;
    }
  }
</style>
