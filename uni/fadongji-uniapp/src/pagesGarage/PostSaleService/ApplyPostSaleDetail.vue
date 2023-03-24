<template>
  <view class="page">
    <VoNav :is-fixed="false" :title="orderDetail.statusName" is-have-more />
    <view class="content">
      <view v-if="stepsData && stepsData.length" class="content_steps">
        <u-steps :current="currentStep" activeColor="#FFECE5" inactiveColor="#F7F7F8">
          <u-steps-item v-for="(item, index) in stepsData" :key="index">
            <block slot="icon">
              <VoIcon
                v-if="orderDetail.status >= item.status"
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
        <view class="content_result_text black85">
          <view v-if="Number(orderDetail.status) === 4180 && Number(orderDetail.type) === 3">
            换机申请未通过
          </view>
          {{ switchToText }}
        </view>
      </view>
      <!--已取消/已关闭的不显示旧机返回地址-->
      <view
        v-if="
          +orderDetail.status !== 4110 &&
          +orderDetail.status !== 4170 &&
          +orderDetail.status !== 4180 &&
          orderDetail.orderAddress &&
          Object.keys(orderDetail.orderAddress) &&
          orderDetail.isSendBack &&
          orderDetail.type !== 1 &&
          orderDetail.orderAddress.addressDetail &&
          orderDetail.orderAddress.address
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
          <block v-if="isEdit">
            <view class="content_logistics_form">
              <u--form
                ref="form1"
                :model="formLogistics"
                :rules="rules"
                labelPosition="left"
                labelWidth="150"
              >
                <u-form-item
                  ref="item1"
                  class="u_form_item_class"
                  label="发货方式："
                  prop="deliveryType"
                  required
                >
                  <u-radio-group
                    v-model="formLogistics.deliveryType"
                    activeColor="#FF5319"
                    class="radio_group"
                  >
                    <u-radio
                      v-for="(item, index) in deliveryTypeList"
                      :key="index"
                      :label="item.label"
                      :name="item.name"
                    />
                  </u-radio-group>
                </u-form-item>
                <block v-if="formLogistics.deliveryType == 1">
                  <u-form-item ref="item" label="发货凭证：" prop="logisticsDetail.pic" required />
                  <u-form-item class="u_form_item_class">
                    <VoUpload
                      :fileList="demoPic"
                      :isTencentCloud="false"
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
                  </u-form-item>

                  <u-form-item
                    ref="item1"
                    class="u_form_item_class"
                    label="运单号："
                    prop="logisticsDetail.orderId"
                    required
                  >
                    <u--input
                      v-model="formLogistics.logisticsDetail.orderId"
                      border="none"
                      inputAlign="right"
                      placeholder="请输入运单号"
                      placeholderClass="placeholderStyle"
                    />
                    <block slot="right">
                      <image
                        class="scan-class m-l-30"
                        src="/static/icons/scan.png"
                        @click="scanOcrFn"
                      />
                    </block>
                  </u-form-item>
                  <u-form-item
                    ref="item1"
                    class="u_form_item_class"
                    label="物流公司："
                    prop="logisticsDetail.company"
                  >
                    <u--input
                      v-model="formLogistics.logisticsDetail.company"
                      border="none"
                      inputAlign="right"
                      placeholder="请填写物流公司"
                    />
                  </u-form-item>
                  <u-form-item
                    ref="item1"
                    class="u_form_item_class"
                    label="物流查询电话："
                    prop="logisticsDetail.companyPhoneNm"
                  >
                    <u--input
                      v-model="formLogistics.logisticsDetail.companyPhoneNm"
                      border="none"
                      inputAlign="right"
                      placeholder="请输入物流查询电话"
                    />
                  </u-form-item>
                </block>
              </u--form>
              <view class="m-t-30">
                <u-button
                  class="custom-style"
                  color="#FF5319"
                  shape="circle"
                  text="提交"
                  @click="submitEdit"
                />
              </view>
            </view>
          </block>
          <block v-else>
            <u--form labelPosition="left" labelWidth="150">
              <u-form-item ref="item1" class="u_form_item_class" label="发货方式：" required>
                <view class="t-right black65">
                  {{ orderDetail.sendBackList[0].deliveryType == 1 ? '物流发货' : '无物流' }}
                  <text
                    v-if="orderDetail.status == 4130"
                    class="m-l-24 colorOrange"
                    @click="handleEdit"
                    >修改</text
                  ></view
                >
              </u-form-item>
              <block v-if="logisticsDetail">
                <u-form-item
                  class="u_form_item_class"
                  label="发货凭证："
                  labelWidth="100%"
                  prop="pic"
                  required
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
                <block v-if="orderDetail.sendBackList[0].deliveryType == 1">
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
                </block>
              </block>
            </u--form>
          </block>
        </view>
      </view>
      <!-- v-else -->
      <view v-if="orderDetail.status == 4120" class="content_logistics">
        <view class="title black85">旧件寄回信息</view>
        <view class="content_logistics_form">
          <u--form
            ref="form1"
            :model="formLogistics"
            :rules="rules"
            labelPosition="left"
            labelWidth="150"
          >
            <u-form-item
              ref="item1"
              class="u_form_item_class"
              label="发货方式："
              prop="deliveryType"
              required
            >
              <u-radio-group
                v-model="formLogistics.deliveryType"
                activeColor="#FF5319"
                class="radio_group"
              >
                <u-radio :name="1" label="物流发货" />
                <u-radio :name="2" class="m-l-50" label="无需物流" />
              </u-radio-group>
            </u-form-item>

            <u-form-item ref="item11" label="发货凭证：" prop="logisticsDetail.pic" required />
            <view class="color-block-25 fz-28 m-b-10"> 发货凭证是物流单时，能自动填充运单号 </view>
            <u-form-item class="u_form_item_class">
              <VoUpload
                :fileList="formLogistics.logisticsDetail.pic"
                :isTencentCloud="false"
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
            </u-form-item>
            <block v-if="formLogistics.deliveryType == 1">
              <u-form-item
                ref="item1"
                class="u_form_item_class"
                label="运单号："
                prop="logisticsDetail.orderId"
                required
              >
                <u--input
                  v-model="formLogistics.logisticsDetail.orderId"
                  border="none"
                  inputAlign="right"
                  placeholder="请输入运单号"
                  placeholderClass="placeholderStyle"
                />
                <block slot="right">
                  <image
                    class="scan-class m-l-30"
                    src="/static/icons/scan.png"
                    @click="scanOcrFn"
                  />
                </block>
              </u-form-item>
              <u-form-item
                ref="item1"
                class="u_form_item_class"
                label="物流公司："
                prop="logisticsDetail.company"
              >
                <u--input
                  v-model="formLogistics.logisticsDetail.company"
                  border="none"
                  inputAlign="right"
                  placeholder="请填写物流公司"
                  placeholderClass="placeholderStyle"
                />
              </u-form-item>
              <u-form-item
                ref="item1"
                class="u_form_item_class"
                label="物流查询电话："
                prop="logisticsDetail.companyPhoneNm"
              >
                <u--input
                  v-model="formLogistics.logisticsDetail.companyPhoneNm"
                  border="none"
                  inputAlign="right"
                  placeholder="请输入物流查询电话"
                  placeholderClass="placeholderStyle"
                />
              </u-form-item>
            </block>
          </u--form>
          <view class="m-t-30">
            <u-button
              class="custom-style"
              color="#FF5319"
              shape="circle"
              text="提交"
              @click="submit"
            />
          </view>
        </view>
      </view>
      <view
        v-if="
          orderDetail.makeUpDetail &&
          Object.keys(orderDetail.makeUpDetail).length &&
          orderDetail.type == 1
        "
        class="content_compensate"
      >
        <view class="title black85">补偿信息</view>
        <view class="content_compensate_msg">
          <view class="flex flex-justify-between">
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
          <view class="flex flex-justify-between">
            <text>补偿到账时间：</text>
            <text class="black65">{{ orderDetail.makeUpDetail.makeUpTime }}</text>
          </view>
        </view>
      </view>
      <view
        v-if="
          orderDetail.makeUpDetail &&
          Object.keys(orderDetail.makeUpDetail).length &&
          orderDetail.type != 1
        "
        class="content_order"
      >
        <view class="title black85">平台处理结果</view>
        <view class="content_order_msg">
          <view
            v-if="orderDetail.type == 3 && orderDetail.status >= 4120"
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
            v-if="orderDetail.makeUpDetail.result != '仅换机'"
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
        <GoodsItemCard :orderDetail="orderDetail">
          <view>
            <text>激活时间：</text>
            <text>{{ orderDetail.activeTime }}</text>
          </view>
        </GoodsItemCard>
      </view>
      <view
        v-if="orderDetail.newOrderInfo && Object.keys(orderDetail.newOrderInfo)"
        class="content_goods"
      >
        <view class="title flex flex-justify-between black85">
          <view>新机订单</view>
          <VoIcon
            color="#595959"
            name="right-arrow"
            size="20"
            @click="goOrderDetail(orderDetail.newOrderInfo)"
          />
        </view>
        <ApplyPostSaleSimpleItem :orderDetail="orderDetail" />
      </view>
      <view v-if="orderDetail && orderDetail.id" class="content_post_sale">
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
          <!--          <view v-if="orderDetail.goodsDetail && orderDetail.goodsDetail.length">-->
          <!--            <view class="flex flex-justify-r img_box">-->
          <!--              <view class="form_image">-->
          <!--                <u-upload-->
          <!--                  :deletable="false"-->
          <!--                  :fileList="[{ url: orderDetail.goodsDetail[0].pic[0] }]"-->
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
            v-if="orderDetail.makeUpDetail && orderDetail.makeUpDetail.result != '仅换机'"
            class="flex flex-justify-between"
          >
            <text>预计补偿：</text>
            <text class="black65">{{ orderDetail.amount }}元</text>
          </view>
          <view>
            <text>故障描述及凭证：</text>
            <!-- v-if="orderDetail.afterSaleFaultDetail.voice" -->
            <view
              v-if="
                orderDetail.afterSaleFaultDetail.voice &&
                orderDetail.afterSaleFaultDetail.voice.indexOf('.mp3') > -1
              "
            >
              <NewAudioVoice :info="JSON.parse(orderDetail.afterSaleFaultDetail.voice)" />
            </view>
            <!-- v-else-if="orderDetail.afterSaleFaultDetail && orderDetail.afterSaleFaultDetail.desc" -->
            <view
              v-else-if="orderDetail.afterSaleFaultDetail && orderDetail.afterSaleFaultDetail.desc"
              class="problem_desc"
            >
              {{ orderDetail.afterSaleFaultDetail.desc }}
            </view>

            <view class="m-t-16">
              <VoFormUpload
                :preview="true"
                :source="fileList"
                class="vo_form_upload"
                uploadStyle="{width:218rpx;height:218rpx}"
              />
            </view>
          </view>
          <view v-if="orderDetail.type == 2" class="flex flex-justify-between">
            <text>是否返回旧件：</text>
            <text class="black65">{{ orderDetail.isSendBack ? '是' : '否' }}</text>
          </view>
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
    <view v-if="[4110, 4170, 4180, 4160].includes(orderDetail.status)" class="bottom">
      <view>
        <u-button
          v-if="orderDetail.status == 4110"
          class="custom-style"
          color="#FF5319"
          shape="circle"
          text="取消申请"
          @click="cancel"
        />
        <u-button
          v-if="orderDetail.status == 4170 || orderDetail.status == 4180"
          class="custom-style"
          color="#FF5319"
          shape="circle"
          text="重新申请"
          @click="tapToEdit"
        />
        <u-button
          v-if="orderDetail.status == 4160"
          class="custom-style"
          color="#FF5319"
          shape="circle"
          text="去评价"
          @click="toEvaluate"
        />
      </view>
    </view>
  </view>
</template>

<script>
  import GoodsItemCard from './components/GoodsItemCard.vue'
  import ApplyPostSaleSimpleItem from './components/ApplyPostSaleSimpleItem.vue'
  import NewAudioVoice from './components/NewAudioVoice.vue'
  import { chooseImageOcrByPromise, uploadOcr } from '@/common/helper'

  export default {
    components: {
      GoodsItemCard,
      ApplyPostSaleSimpleItem,
      NewAudioVoice,
    },
    data() {
      return {
        demoPic: [],
        sureCancel: false,
        isEdit: false,
        currentStep: 1,
        deliveryTypeList: [
          {
            name: 1,
            label: '物流发货',
          },
          {
            name: 2,
            label: '无需物流',
          },
        ],
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
        orderDetail: {},
        rules: {
          // deliveryType: [
          //   {
          //     required: true,
          //     message: '不能为空',
          //     trigger: ['change'],
          //   },
          // ],
          'logisticsDetail.orderId': [
            {
              required: true,
              message: '不能为空',
              trigger: ['change', 'blur'],
            },
          ],
          //   'logisticsDetail.pic': [
          //     {
          //       required: true,
          //       message: '请上传发货凭证',
          //       trigger: ['change'],
          //     },
          //   ],
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
              warn: '申请提交成功，请等待售后处理',
              desc: this.orderDetail.cancelTime,
            },
          ]
        } else if (this.orderDetail.status == 4180) {
          return [
            {
              title: '提交申请',
              status: 4110,
              warn: '未通过：' + this.orderDetail.makeUpDetail?.result,
              desc: this.orderDetail.createTime,
            },
            {
              title: '未通过',
              status: 4180,
              warn: '未通过：' + this.orderDetail.makeUpDetail?.result,
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
              warn: '申请已提交，等待售后处理',
              desc: this.orderDetail.createTime,
            },
            {
              title: '通过',
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
              warn: '申请已提交，等待售后处理',
              desc: this.orderDetail.createTime,
            },
            {
              title: '通过',
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
              warn: '申请已提交，等待售后处理',
              desc: this.orderDetail.createTime,
            },
            {
              title: '通过',
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
      switchToText() {
        const val = this.orderDetail.status
        if (val == 4110) return '申请已提交，等待售后处理'
        if (val == 4120) return '已通过，待买家上传旧件寄回信息'
        if (val == 4130) return '买家已寄回旧件，待卖家签收'
        if (val == 4140) {
          if (this.orderDetail.receiveTime) {
            return '旧机已签收，等待新机确认收货'
          }
          if (this.orderDetail.newOrderReceiveTime) {
            return '新机已签收，等待旧机确认收货'
          }
        }
        if (val == 4150) {
          if (this.orderDetail.type == 1) return '已通过 等待银行发放补偿中'
          else if (this.orderDetail.type == 2) {
            if (this.orderDetail.isSendBack) return '旧机已签收，等待银行发放补偿中'
            else return '审核通过，等待银行发放补偿中'
          } else {
            return '旧机、新机已签收，等待银行发放补偿中'
          }
        }
        if (val == 4160) return '服务已完成，感谢您的支持'
        if (val == 4161) return '服务已完成，感谢您的支持'
        if (val == 4170) return '服务单已取消，如有需要可重新申请。'
        if (val == 4180) {
          if (this.orderDetail.type == 3) {
            // '买家提交的故障内容经查证与事实不符，不支持换机。'
            return this.orderDetail.reason
          } else {
            return '未通过，' + this.orderDetail.reason
          }
        } else {
          return ''
        }
      },
      fileList() {
        return this.orderDetail.afterSaleFaultDetail?.pic.map((item) => {
          return {
            type: item.type == 'video' ? 2 : 1,
            src: item.pic,
            poster: item.pic,
          }
        })
      },
      logisticsDetail() {
        if (this.orderDetail.sendBackList?.[0].logisticsDetail) {
          return JSON.parse(this.orderDetail.sendBackList?.[0].logisticsDetail)
        }
        return ''
      },
    },
    watch: {
      'formLogistics.logisticsDetail.pic': {
        handler(val) {
          if (val && val.length) {
            this.uploadOcrImageFn(val[0].url)
          }
        },
      },
    },
    onLoad(val) {
      if (val && val.id) {
        this.id = val.id
      }
    },
    mounted() {
      this.getOrderDetail()
      uni.$off('evaSuccess')
      uni.$on('evaSuccess', () => {
        console.log('评价回调')
        this.getOrderDetail()
      })
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

      goOrderDetail(data) {
        this.$linkToEasy('/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=' + data.id)
      },
      tapToEdit() {
        this.$linkToEasy('/pagesGarage/PostSaleService/ApplyPostSaleService?id=' + this.id)
      },
      toEvaluate() {
        this.$linkToEasy('/pagesGarage/PostSaleService/ApplyPostSaleEvaluate?id=' + this.id)
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
            uni.$u.toast('取消成功')
            setTimeout(() => {
              this.sureCancel = false
              uni.$emit('refresh')
              this.$backFn()
            }, 1000)
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
        try {
          const res = await this.$VoHttp.apiOrderAfterSale(this.id)
          if (res.success) {
            this.orderDetail = res.data
          } else {
            uni.$u.toast(res.message)
          }
        } catch (err) {
          uni.$u.toast(err.message)
        }
      },
      async submit() {
        const res = await this.$refs.form1.validate()
        const submitRes = await this.$VoHttp.apiOrderAfterSaleDelivery({
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
      async submitEdit() {
        const res = await this.$refs.form1.validate()
        this.formLogistics.logisticsDetail.pic = this.demoPic

        const submitRes = await this.$VoHttp.apiOrderAfterSaleDeliveryEdit({
          ...this.formLogistics,
          logisticsDetail: JSON.stringify(this.formLogistics.logisticsDetail),
          id: this.id,
        })
        if (submitRes.success) {
          this.isEdit = false
          this.getOrderDetail()
        }
      },
      handleEdit() {
        this.isEdit = true
        if (this.orderDetail.sendBackList[0].deliveryType) {
          this.formLogistics.deliveryType = this.orderDetail.sendBackList[0].deliveryType
        }
        this.formLogistics.logisticsDetail.pic = this.logisticsDetail?.pic
        this.formLogistics.logisticsDetail.company = this.logisticsDetail?.company
        this.formLogistics.logisticsDetail.companyPhoneNm = this.logisticsDetail?.companyPhoneNm
        this.formLogistics.logisticsDetail.orderId = this.logisticsDetail?.orderId
      },
      /**
       * 上传发货凭证OCR识别
       */
      uploadOcrImageFn(urlStr) {
        uploadOcr({
          url: urlStr,
          isPath: true,
          formData: {},
          tip: '加载中',
          apiUrl: '/v1/api/file/waybill/ocr',
        }).then((res) => {
          const resultData = JSON.parse(res.data)
          if (+resultData.code === 20001) {
            this.formLogistics.logisticsDetail.orderId = resultData.data.waybillNum
            // this.companyModel = resultData.data.recName
            // this.mobileModel = resultData.data.senderNum
          } else {
            console.log(resultData.message)
          }
        })
      },
      /**
       * 扫码OCR识别
       */
      scanOcrFn() {
        chooseImageOcrByPromise({
          tip: '加载中',
          count: 1,
          apiUrl: '/v1/api/file/waybill/ocr',
        })
          .then((res) => {
            const resultData = JSON.parse(res.data)
            if (+resultData.code === 20001) {
              this.formLogistics.logisticsDetail.orderId = resultData.data.waybillNum
            } else {
              console.log(resultData.message)
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
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
        }

        .content_result_text {
          text-align: center;
          font-size: 28rpx;
          line-height: 42rpx;
          padding-top: 32rpx;
          padding-bottom: 24rpx;
          color: #f20014;
          font-weight: 500;
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
    .bottom {
      width: 100%;
      background-color: #fff;
      > :nth-child(n) {
        margin: 24rpx auto 80rpx auto;
        .custom-style {
          width: 656rpx;
          height: 80rpx;
        }
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
  .colorOrange {
    color: #ff5319;
  }
  ::v-deep {
    .u-text {
      flex-grow: 0 !important;
    }
  }
  .scan-class {
    width: 24px;
    height: 24px;
    display: block;
  }
</style>
