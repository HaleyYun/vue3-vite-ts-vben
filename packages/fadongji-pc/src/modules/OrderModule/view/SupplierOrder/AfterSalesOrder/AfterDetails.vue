<template>
<div>
  <div class="page-wrap">
    <div class="template--title mt-24px">{{ commodityStatus }}</div>
    <div class="flex-col p-10px my-15px bg-light-800">
     
      <div v-if="statusName === 2160" class="text-700 text-xl"
        >已关闭原因:{{ serviceList.operateRemark }}</div
      >
    </div>
    <div class="page-table">
      <div class="product-data pb-24px">
          <div class="template--title">商品信息</div>
        <div>
          <ATable :dataSource="refundGoods" :columns="columns" bordered :pagination="false">
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'payPrice'">
                {{ price }}*{{ goodsCount }}
              </template>
              <template v-if="column.dataIndex === 'increment'">
                <span v-if="payment === 1">微信</span>
                <span v-if="payment === 11">支付宝</span>
                <span v-if="payment === 51">银联</span>
                <span v-if="payment === 61">账期支付</span>
              </template>
              <template v-if="column.dataIndex === 'shopName'">
                <div class="flex">
                  <span>{{ record.shopName }}</span>
                </div>
              </template>
              <template v-if="column.dataIndex === 'goodsName'">
                <div class="flex">
                  <FileUrlPrase height="80px" width="80px" :file-url="payPrice" />
                  <span>{{ record.goodsName }}</span>
                </div>
              </template>
            </template>
            <template #title>
              <div>退款商品</div>
            </template>
          </ATable>
        </div>
      </div>
	  <div class="flex pb-35px text-xl">
		<div class="w-300px" v-if="engineNoList !=''">退回机器的识别码:</div>
    <div class="flex-1 flex-wrap flex -ml-110px">
      <div class="px-5px pb-3px" v-for="(item, index) in engineNoList" :key="index">
			{{ item }}
		</div>
    </div>
		
      </div>
      <div class="order-data pb-50">
        <ATabs v-model:activeKey="activeKey" type="card" @tabClick="tabColumns">
          <ATabPane key="one" tab="订单信息">
            <!-- 退款的 -->
            <!-- 仅退款待审核 -->
            <template v-if="statusName === 2110 && isRefundOnly === true">
              <table class="edit-table pb-20 px-16px">
                <tr v-for="item in orderRefund.basisData">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '状态'">
                    <td class="leading-13 pl-16px" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2120">待退货</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title === '关联订单编号'">
                    <td class="leading-13 pl-16px">
                      {{ serviceList.oriOrderId }}
                      <a class="ml-10px" @click="viewOrder">查看</a>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '确认退款金额'">
                    <td class="pl-16px">
                      <AInput prefix="￥" v-model:value="money" @change="thumbsChange" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '退换货类型'">
                    <td class="leading-13 pl-16px">
                      {{ isRefundOnly ? '仅退款' : '退货退款' }}
                      <span>({{ serviceList.whetherReceiptGoods ? '已收到货' : '未收到货' }})</span>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款方式'">
                    <td class="leading-13 pl-16px">{{serviceList.isSplit ? '退款至账户余额' : '退回到原支付渠道'}}</td>
                  </template>
                  <template v-else-if="item.title === 'auditRemark'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="remarks" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '处理备注'">
                    <td class="leading-13">
                    </td>
                  </template>
                  <template v-else-if="item.title === '凭证照片'">
                    <td class="leading-13 pt-20px pl-20px">
                      <FileUrlPrase height="80px" width="80px" :file-url="refundPic" />
                    </td>
                  </template>
                  <td v-else class="edit-table-content pl-16px">{{ serviceList[item.key] }}</td>
                </tr>
              </table>
            </template>
            <!-- 仅退款待退款 -->
            <template v-else-if="statusName === 2130 && isRefundOnly === true">
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.ReturnOnlyRefund" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>  
                  </td>
                  <template v-if="item.title === '状态'">
                    <td class="leading-13 pl-16px" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2120">待退货</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title === '关联订单编号'">
                    <td class="leading-13 pl-16px"
                      >{{ serviceList.oriOrderId
                      }}<a class="ml-10px" @click="viewOrder">查看</a></td
                    >
                  </template>
                  <template v-else-if="item.title === '退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '确认退款金额'">
                    <td>
                      <div class="px-16px pl-16px">
                      <AInput disabled prefix="￥" v-model:value="money" @change="thumbsChange" />
                    </div>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退换货类型'">
                    <td class="leading-13 pl-16px">
                      {{ isRefundOnly ? '仅退款' : '退货退款' }}
                      <span>
                        ({{ serviceList.whetherReceiptGoods ? '已收到货' : '未收到货' }})
                      </span>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款方式'">
                    <td class="leading-13 pl-16px">{{serviceList.isSplit ? '退款至账户余额' : '退回到原支付渠道'}}</td>
                  </template>
                  <template v-else-if="item.title === '处理备注'">
                    <td class="leading-13">
                      <div class="px-16px">
                      <AInput disabled v-model:value="auditRemark" />
                    </div>
                    </td>
                  </template>
                  <template v-else-if="item.title === '凭证照片'">
                    <td class="leading-13 pt-20px pl-16px">
                      <FileUrlPrase height="80px" width="80px" :file-url="refundPic" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款支付途径'">
                    <td class="leading-13 pl-16px">
                      <span v-if="payment === 1">微信</span>
                      <span v-if="payment === 11">支付宝</span>
                      <span v-if="payment === 51">银联</span>
                      <span v-if="payment === 61">账期支付</span>
                    </td>
                  </template>
                  <td v-else class="edit-table-content pl-16px">{{ serviceList[item.key] }}</td>
                </tr>
              </table>
            </template>
            <!-- 仅退款已完成 -->
            <template v-else-if="statusName === 2150 && isRefundOnly === true">
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.OnlyRefundCompleted" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '状态'">
                    <td class="leading-13 pl-16px" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2120">待退货</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title === '关联订单编号'">
                    <td class="leading-13 pl-16px">
                      {{ serviceList.oriOrderId }}
                      <a class="ml-10px" @click="viewOrder">查看</a>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '确认退款金额'">
                    <td>
                      <div class="px-16px">
                      <AInput disabled prefix="￥" v-model:value="money" @change="thumbsChange" />
                    </div>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退换货类型'">
                    <td class="leading-13 pl-16px"
                      >{{ isRefundOnly ? '仅退款' : '退货退款' }}
                      <span>
                        ({{ serviceList.whetherReceiptGoods ? '已收到货' : '未收到货' }})
                      </span>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款方式'">
                    <td class="leading-13 pl-16px">{{serviceList.isSplit ? '退款至账户余额' : '退回到原支付渠道'}}</td>
                  </template>
                  <template v-else-if="item.title === '处理备注'">
                    <td class="leading-13">
                      <div class="px-16px">
                      <AInput disabled v-model:value="auditRemark" />
                    </div>
                    </td>
                  </template>
                  <template v-else-if="item.title === '凭证照片'">
                    <td class="leading-13 pt-20px pl-16px">
                      <FileUrlPrase height="80px" width="80px" :file-url="refundPic" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款支付途径'">
                    <td class="leading-13 pl-16px">
                      <span v-if="payment === 1">微信</span>
                      <span v-if="payment === 11">支付宝</span>
                      <span v-if="payment === 51">银联</span>
                      <span v-if="payment === 61">账期支付</span>
                    </td>
                  </template>
                  <td v-else class="edit-table-content"><div class="pl-16px">{{serviceList[item.key] }}</div></td>
                </tr>
              </table>
            </template>
            <!-- 仅退款已关闭 -->
            <template v-else-if="statusName === 2160 && isRefundOnly === true">
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.RefundOnlyClosed" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '状态'">
                    <td class="leading-13 pl-16px" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2120">待退货</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title === '关联订单编号'">
                    <td class="leading-13 pl-16px">
                      {{ serviceList.oriOrderId }}
                      <a class="ml-10px" @click="viewOrder">查看</a></td
                    >
                  </template>
                  <template v-else-if="item.title === '退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '确认退款金额'">
                    <td>
                      <div class="px-16px pl-16px">
                        <AInput disabled prefix="￥" v-model:value="money" @change="thumbsChange" />
                      </div>
                     
                    </td>
                  </template>
                  <template v-else-if="item.title === '退换货类型'">
                    <td class="leading-13 pl-16px">
                      {{ isRefundOnly ? '仅退款' : '退货退款' }}
                      <span>({{ serviceList.whetherReceiptGoods ? '已收到货' : '未收到货' }})</span>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款方式'">
                    <td class="leading-13 pl-16px">{{serviceList.isSplit ? '退款至账户余额' : '退回到原支付渠道'}}</td>
                  </template>
                  <template v-else-if="item.title === '处理备注'">
                    <td class="leading-13">
                      <div class="px-16px">
                        <AInput disabled v-model:value="auditRemark" />
                      </div>
                      
                    </td>
                  </template>
                  <template v-else-if="item.title === '凭证照片'">
                    <td class="leading-13 pt-20px pl-16px">
                      <FileUrlPrase height="80px" width="80px" :file-url="refundPic" />
                    </td>
                  </template>

                  <td v-else class="edit-table-content pl-16px">{{ serviceList[item.key] }}</td>
                </tr>
              </table>
            </template>
            <!-- 退款退货的 -->
            <!-- 退款退货待审核 -->
            <template v-else-if="statusName === 2110 && isRefundOnly === false">
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.returnGoods" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '状态'">
                    <td class="leading-13 pl-16px" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2120">待退货</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title === '关联订单编号'">
                    <td class="leading-13 pl-16px"
                      >{{ serviceList.oriOrderId
                      }}<a class="ml-10px" @click="viewOrder">查看</a></td
                    >
                  </template>
                  <template v-else-if="item.title === '退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '确认退款金额'">
                    <td>
                      <div class="px-16px">
                        <AInput prefix="￥" v-model:value="money" @change="thumbsChange" />
                      </div>
                      
                    </td>
                  </template>
                  <template v-else-if="item.title === '退换货类型'">
                    <td class="leading-13 pl-16px">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title === '退款方式'">
                    <td class="leading-13 pl-16px">{{serviceList.isSplit ? '退款至账户余额' : '退回到原支付渠道'}}</td>
                  </template>
                  <template v-else-if="item.title === '处理备注'">
                    <td class="leading-13">
                      <div class="px-16px">
                        <AInput  v-model:value="auditRemark" />
                      </div>
                     
                    </td>
                  </template>
                  <template v-else-if="item.title === '凭证照片'">
                    <td class="leading-13 pt-20px pl-16px">
                      <FileUrlPrase height="80px" width="80px" :file-url="refundPic" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货点'">
                    <td class="leading-13">
                      <div class="px-16px">
                        <a-select
                        style="width: 300px"
                        ref="select"
                        v-model:value="orderReason"
                        :options="wareHouseOptions"
                        @change="changeWareHouse"
                        placeholder="请选择仓库"
                      />
                      </div>
                    
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货地址'">
                    <td class="leading-13">
                      <div class="px-16px">

                      <AInput disabled v-model:value="wareAddressCode" />
                    </div>
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货人姓名'">
                    <td class="leading-13">
                      <div class="px-16px">
                      <AInput disabled v-model:value="wareAddressName" />
                    </div>
                    </td>
                  </template>
                  <template v-else-if="item.title === '联系电话'">
                    <td class="leading-13">
                      <div class="px-16px">
                      <AInput disabled v-model:value="wareAddressPhone" />
                    </div>
                    </td>
                  </template>
                  <td v-else class="edit-table-content pl-16px">{{ serviceList[item.key] }}</td>
                </tr>
              </table>
            </template>
            <!-- 退款退货已关闭 -->
            <template v-else-if="statusName === 2160 && isRefundOnly === false">
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.returnClosed" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '状态'">
                    <td class="leading-13 pl-16px" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2120">待退货</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title === '关闭原因'">
                    <td class="leading-13 pl-16px">
                      {{ serviceList.operateRemark }}
                    </td>
                  </template>
                  <template v-else-if="item.title === '关联订单编号'">
                    <td class="leading-13 pl-16px">
                      {{ serviceList.oriOrderId }}
                      <a class="ml-10px" @click="viewOrder">查看</a>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '确认退款金额'" @change="thumbsChange">
                    <td>
                      <div class="px-16px">
                        <AInput prefix="￥" v-model:value="money" />
                      </div>
                     
                    </td>
                  </template>
                  <template v-else-if="item.title === '退换货类型'">
                    <td class="leading-13 pl-16px">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title === '退款方式'">
                    <td class="leading-13 pl-16px">{{serviceList.isSplit ? '退款至账户余额' : '退回到原支付渠道'}}</td>
                  </template>
                  <template v-else-if="item.title === '处理备注'">
                    <td class="leading-13 pl-16px">
                      <div class="px-16px">
                      <AInput v-model:value="auditRemark" />
                    </div>
                    </td>
                  </template>
                  <template v-else-if="item.title === '凭证照片'">
                    <td class="leading-13 pt-20px pl-16px">
                      <FileUrlPrase height="80px" width="80px" :file-url="refundPic" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货点'">
                    <td class="leading-13">
                      <div class="px-16px">
                      <a-select
                        style="width: 300px"
                        ref="select"
                        v-model:value="orderReason"
                        :options="wareHouseOptions"
                        @change="changeWareHouse"
                        placeholder="请选择仓库"
                      />
                    </div>
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货地址'">
                    <td class="leading-13">
                      <div class="px-16px">
                      <AInput v-model:value="wareAddressCode" />
                    </div>
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货人姓名'">
                    <td class="leading-13">
                      <div class="px-16px">
                      <AInput v-model:value="wareAddressName" />
                    </div>
                    </td>
                  </template>
                  <template v-else-if="item.title === '联系电话'">
                    <td class="leading-13">
                      <div class="px-16px">
                      <AInput v-model:value="wareAddressPhone" />
                    </div>
                    </td>
                  </template>
                  <td v-else class="edit-table-content pl-16px">{{ serviceList[item.key] }}</td>
                </tr>
              </table>
            </template>
            <!-- 退款退货待退款-->
            <template v-else-if="statusName === 2130 && isRefundOnly === false">
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.returnBeRefunded" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '状态'">
                    <td class="leading-13 pl-16px" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2120">待退货</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title === '关联订单编号'">
                    <td class="leading-13 pl-16px"
                      >{{ serviceList.oriOrderId
                      }}<a class="ml-10px" @click="viewOrder">查看</a></td
                    >
                  </template>
                  <template v-else-if="item.title === '退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '确认退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '退换货类型'">
                    <td class="leading-13 pl-16px">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title === '退款方式'">
                    <td class="leading-13 pl-16px">{{serviceList.isSplit ? '退款至账户余额' : '退回到原支付渠道'}}</td>
                  </template>
                  <template v-else-if="item.title === '处理备注'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="auditRemark" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '凭证照片'">
                    <td class="leading-13 pt-20px pl-16px">
                      <FileUrlPrase height="80px" width="80px" :file-url="refundPic" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货点'">
                    <td class="leading-13 pl-16px">
                      <a-select
                        style="width: 300px"
                        ref="select"
                        v-model:value="orderReason"
                        :options="wareHouseOptions"
                        @change="changeWareHouse"
                        placeholder="请选择仓库"
                      />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货地址'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressCode" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货人姓名'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressName" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '联系电话'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressPhone" />
                    </td>
                  </template>
                  <td v-else class="edit-table-content pl-16px">{{ serviceList[item.key] }}</td>
                </tr>
              </table>
              <!-- 退货信息 -->
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.letterList" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '选择收货点'">
                    <td class="leading-13 pl-16px">
                      <span>{{ refundGoodsName.refundWarehouseName }}</span>
                    </td>
                  </template>
                  <template v-else>
                    <td class="edit-table-content pl-16px">{{ returnInformation[item.key] }}</td>
                  </template>
                </tr>
              </table>
              <!-- 物流信息 -->
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.logisticsList" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '发货方式'">
                    <td v-if="deliveryType === 1" class="leading-13 pl-16px">
                      <span>物流发货</span>
                    </td>
                    <td v-else class="leading-13 pl-16px">
                      <span>无需物流</span>
                    </td>
                  </template>
                  <template v-if="item.title === '退货凭证'">
                    <td class="leading-13 p-16px">
                      <FileUrlPrase height="80px" width="80px" :file-url="deliveryPic" />
                    </td>
                  </template>
                  <td v-else class="edit-table-content">{{ deliveryDetails[item.key] }}</td>
                </tr>
              </table>
            </template>
            <!-- 退款退货已完成-->
            <template v-else-if="statusName === 2150 && isRefundOnly === false">
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.returnBeRefunded" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  
                  <template v-if="item.title === '状态'">
                    <td class="leading-13 pl-16px" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2120">待退货</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title === '关联订单编号'">
                    <td class="leading-13 pl-16px">
                      {{ serviceList.oriOrderId }}
                      <a class="ml-10px" @click="viewOrder">查看</a>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '确认退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '退换货类型'">
                    <td class="leading-13 pl-16px">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title === '退款方式'">
                    <td class="leading-13 pl-16px">{{serviceList.isSplit ? '退款至账户余额' : '退回到原支付渠道'}}</td>
                  </template>
                  <template v-else-if="item.title === '处理备注'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="auditRemark" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '凭证照片'">
                    <td class="leading-13 pt-20px pl-16px">
                      <FileUrlPrase height="80px" width="80px" :file-url="refundPic" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货点'">
                    <td class="leading-13 pl-16px">
                      <a-select
                        style="width: 300px"
                        ref="select"
                        v-model:value="orderReason"
                        :options="wareHouseOptions"
                        @change="changeWareHouse"
                        placeholder="请选择仓库"
                      />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货地址'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressCode" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货人姓名'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressName" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '联系电话'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressPhone" />
                    </td>
                  </template>
                  <td v-else class="edit-table-content pl-16px">{{ serviceList[item.key] }}</td>
                </tr>
              </table>
              <!-- 退货信息 -->
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.letterList" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '选择收货点'">
                    <td class="leading-13 pl-16px">
                      <span>{{ refundGoodsName.refundWarehouseName }}</span>
                    </td>
                  </template>
                  <template v-else>
                    <td class="edit-table-content pl-16px">{{ returnInformation[item.key] }}</td>
                  </template>
                </tr>
              </table>
              <!-- 物流信息 -->
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.logisticsComplete" :key="index">
                  <td class="edit-table-title pl-16px">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '发货方式'">
                    <td v-if="deliveryType === 1" class="leading-13 pl-16px">
                      <span>物流发货</span>
                    </td>
                    <td v-else class="leading-13 pl-16px">
                      <span>无需物流</span>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退货凭证'">
                    <td class="leading-13 pl-16px">
                      <FileUrlPrase :file-url="deliveryPic" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货时间'">
                    <td class="leading-13 pl-16px">
                      <span>{{ receivingTime }}</span>
                    </td>
                  </template>
                  <td v-else class="edit-table-content pl-16px">{{ deliveryDetails[item.key] }}</td>
                </tr>
              </table>
            </template>
            <!-- 退款退货待退货-->
            <template v-else-if="statusName === 2120 && isRefundOnly === false">
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.returnBeRefunded" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '状态'">
                    <td class="leading-13 pl-16px" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2120">待退货</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title === '关联订单编号'">
                    <td class="leading-13 pl-16px">
                      {{ serviceList.oriOrderId }}
                      <a class="ml-10px" @click="viewOrder">查看</a>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '确认退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '退换货类型'">
                    <td class="leading-13 pl-16px">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title === '退款方式'">
                    <td class="leading-13 pl-16px">{{serviceList.isSplit ? '退款至账户余额' : '退回到原支付渠道'}}</td>
                  </template>

                  <template v-else-if="item.title === '凭证照片'">
                    <td class="leading-13 pt-20px pl-16px">
                      <FileUrlPrase height="80px" width="80px" :file-url="refundPic" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货点'">
                    <td class="leading-13 pl-16px">
                      <a-select
                        style="width: 300px"
                        ref="select"
                        v-model:value="orderReason"
                        :options="wareHouseOptions"
                        @change="changeWareHouse"
                        placeholder="请选择仓库"
                      />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货地址'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressCode" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货人姓名'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressName" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '联系电话'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressPhone" />
                    </td>
                  </template>
                  <td v-else class="edit-table-content pl-16px">{{ serviceList[item.key] }}</td>
                </tr>
              </table>
              <!-- 退货信息 -->
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.letterList" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '选择收货点'">
                    <td class="leading-13 pl-16px">
                      <span>{{ refundGoodsName.refundWarehouseName }}</span>
                    </td>
                  </template>
                  <template v-else-if="item.title === '处理备注'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="auditRemark" />
                    </td>
                  </template>
                  <template v-else>
                    <td class="edit-table-content pl-16px">{{ returnInformation[item.key] }}</td>
                  </template>
                </tr>
              </table>
              <!-- 物流信息 -->
              <div class="flex flex-row-reverse py-5">
                <AButton @click="writeLogistics" type="link">填写物流信息</AButton>
              </div>
              <div>
                <template v-if="showLogistics">
                  <table class="edit-table pb-20 px-16px">
                    <tr v-for="(item, index) in orderRefund.logisticsList" :key="index">
                      <td class="edit-table-title">
                        <div class="pl-16px">{{ item.title }}</div>
                      </td>
                      <template v-if="item.title === '物流公司'">
                        <td class="leading-13 pl-16px">
                          <a-input
                            style="width: 400px"
                            v-model:value="logisticsCompany"
                            placeholder="填写物流公司"
                          />
                        </td>
                      </template>
                      <template v-else-if="item.title === '退货运单号'">
                        <td class="leading-13 pl-16px">
                          <a-input
                            style="width: 400px"
                            v-model:value="waybill"
                            placeholder="填写退货运单号"
                          />
                        </td>
                      </template>
                      <template v-else-if="item.title === '物流公司电话号码'">
                        <td class="leading-13 pl-16px">
                          <a-input
                            style="width: 400px"
                            v-model:value="logisticsPhone"
                            placeholder="填写物流公司电话号码"
                          />
                        </td>
                      </template>
                      <template v-else-if="item.title === '退货凭证'">
                        <td class="leading-13 pl-16px">
                          <EraUpload
                            :uploadType="'img'"
                            :fileListData="freightPic"
                            :maxSize="30"
                            :maxNumber="6"
                            uploadFuncChannel="localStore"
                            :multiple="true"
                            upload-tip="点击上传图片"
                            help-text="最多插入6张图片。"
                            @done="handleVoucher"
                            @delete="handerVoucherDel"
                          />
                        </td>
                      </template>
                      <td v-else class="edit-table-content pl-16px">{{ deliveryDetails[item.key] }}</td>
                    </tr>
                  </table>
                  <div class="flex justify-center p-5">
                    <AButton type="primary" @click="submitLogistics">提交物流信息</AButton>
                  </div>
                </template>
                <template v-else>
                  <table class="edit-table pb-20 px-16px">
                    <tr v-for="(item, index) in orderRefund.logisticsList" :key="index">
                      <td class="edit-table-title">
                        <div class="pl-16px">{{ item.title }}</div>
                      </td>
                      <template v-if="item.title === '物流公司'">
                        <td class="leading-13 pl-16px">
                          <a-input style="width: 400px" v-model:value="logistics" disabled />
                        </td>
                      </template>
                      <template v-else-if="item.title === '退货运单号'">
                        <td class="leading-13 pl-16px">
                          <a-input style="width: 400px" v-model:value="logistics" disabled />
                        </td>
                      </template>
                      <template v-else-if="item.title === '物流公司电话号码'">
                        <td class="leading-13 pl-16px">
                          <a-input style="width: 400px" v-model:value="logistics" disabled />
                        </td>
                      </template>
                      <template v-else-if="item.title === '退货凭证'">
                        <td class="leading-13 pl-16px"></td>
                      </template>
                      <td v-else class="edit-table-content pl-16px">{{ deliveryDetails[item.key] }}</td>
                    </tr>
                  </table>
                </template>
              </div>
            </template>
            <!-- 退款退货待签收-->
            <template v-else-if="statusName === 2140 && isRefundOnly === false">
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.returnBeRefunded" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '状态'">
                    <td class="leading-13 pl-16px" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2120">待退货</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title === '关联订单编号'">
                    <td class="leading-13 pl-16px"
                      >{{ serviceList.oriOrderId
                      }}<a class="ml-10px" @click="viewOrder">查看</a></td
                    >
                  </template>
                  <template v-else-if="item.title === '退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '确认退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '退换货类型'">
                    <td class="leading-13 pl-16px">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title === '退款方式'">
                    <td class="leading-13 pl-16px">{{serviceList.isSplit ? '退款至账户余额' : '退回到原支付渠道'}}</td>
                  </template>
                  <template v-else-if="item.title === '处理备注'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="auditRemark" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '凭证照片'">
                    <td class="leading-13 pt-20px pl-16px">
                      <FileUrlPrase height="80px" width="80px" :file-url="refundPic" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货点'">
                    <td class="leading-13 pl-16px">
                      <a-select
                        style="width: 300px"
                        ref="select"
                        v-model:value="orderReason"
                        :options="wareHouseOptions"
                        @change="changeWareHouse"
                        placeholder="请选择仓库"
                      />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货地址'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressCode" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '收货人姓名'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressName" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '联系电话'">
                    <td class="leading-13 pl-16px">
                      <AInput v-model:value="wareAddressPhone" />
                    </td>
                  </template>
                  <td v-else class="edit-table-content pl-16px">{{ serviceList[item.key] }}</td>
                </tr>
              </table>
              <!-- 退货信息 -->
              <table class="edit-table pb-20 px-16px">
                <tr v-for="(item, index) in orderRefund.letterList" :key="index">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '选择收货点'">
                    <td class="leading-13 pl-16px">
                      <span>{{ refundGoodsName.refundWarehouseName }}</span>
                    </td>
                  </template>
                  <template v-else>
                    <td class="edit-table-content pl-16px">{{ returnInformation[item.key] }}</td>
                  </template>
                </tr>
              </table>
              <!-- 物流信息 -->
              <div class="flex flex-row-reverse py-5">
                <AButton @click="writeLogistics" type="link">修改物流信息</AButton>
              </div>
              <div>
                <template v-if="showLogistics">
                  <table class="edit-table pb-20 px-16px">
                    <tr v-for="(item, index) in orderRefund.logisticsList" :key="index">
                      <td class="edit-table-title">
                        <div class="pl-16px">{{ item.title }}</div>
                      </td>
                      <template v-if="item.title === '物流公司'" placeholder="填写物流公司">
                        <td class="leading-13 pl-16px">
                          <a-input style="width: 400px" v-model:value="freightCompany" />
                        </td>
                      </template>
                      <template v-else-if="item.title === '退货运单号'">
                        <td class="leading-13 pl-16px">
                          <a-input
                            style="width: 400px"
                            v-model:value="freightNum"
                            placeholder="填写退货运单号"
                          />
                        </td>
                      </template>
                      <template v-else-if="item.title === '物流公司电话号码'">
                        <td class="leading-13 pl-16px">
                          <a-input
                            style="width: 400px"
                            v-model:value="freightPhone"
                            placeholder="填写物流公司电话号码"
                          />
                        </td>
                      </template>
                      <template v-else-if="item.title === '退货凭证'">
                        <td class="leading-13 pl-16px">
                          <EraUpload
                            :uploadType="'img'"
                            :fileListData="freightPic"
                            :maxSize="30"
                            :maxNumber="6"
                            uploadFuncChannel="localStore"
                            :multiple="true"
                            upload-tip="点击上传图片"
                            help-text="最多插入6张图片。"
                            @done="handleVoucher"
                            @delete="handerVoucherDel"
                          />
                        </td>
                      </template>
                      <td v-else class="edit-table-content pl-16px">{{ deliveryDetails[item.key] }}</td>
                    </tr>
                  </table>
                  <div class="flex justify-center p-5">
                    <AButton type="primary" @click.stop="modifyLogistics">提交物流信息</AButton>
                  </div>
                </template>
                <template v-else>
                  <table class="edit-table pb-20 px-16px">
                    <tr v-for="(item, index) in orderRefund.logisticsList" :key="index">
                      <td class="edit-table-title">
                        <div class="pl-16px">{{ item.title }}</div>
                      </td>
                      <template v-if="item.title === '物流公司'">
                        <td class="leading-13 pl-16px">
                          <a-input style="width: 400px" v-model:value="freightCompany" disabled />
                        </td>
                      </template>
                      <template v-else-if="item.title === '退货运单号'">
                        <td class="leading-13 pl-16px">
                          <a-input style="width: 400px" v-model:value="freightNum" disabled />
                        </td>
                      </template>
                      <template v-else-if="item.title === '物流公司电话号码'">
                        <td class="leading-13 pl-16px">
                          <a-input style="width: 400px" v-model:value="freightPhone" disabled />
                        </td>
                      </template>
                      <template v-else-if="item.title === '退货凭证'">
                        <td class="leading-13 pl-16px">
                          <FileUrlPrase height="80px" width="80px" :file-url="deliveryPic" />
                        </td>
                      </template>
                      <td v-else class="edit-table-content pl-16px">{{ deliveryDetails[item.key] }}</td>
                    </tr>
                  </table>
                </template>
              </div>
            </template>
            <template v-else>
              <table class="edit-table pb-20 pl-20px px-16px">
                <tr v-for="item in orderRefund.basisData">
                  <td class="edit-table-title">
                    <div class="pl-16px">{{ item.title }}</div>
                  </td>
                  <template v-if="item.title === '状态'">
                    <td class="leading-13 pl-16px" v-if="statusName === 2110">待审核</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2140">待签收</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2130">待退款</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2120">待退货</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2150">已完成</td>
                    <td class="leading-13 pl-16px" v-if="statusName === 2160">已关闭</td>
                  </template>
                  <template v-else-if="item.title === '关联订单编号'">
                    <td class="leading-13 pl-16px">
                      {{ serviceList.oriOrderId }}
                      <a class="ml-10px" @click="viewOrder">查看</a>
                    </td>
                  </template>
                  <template v-else-if="item.title === '退款金额'">
                    <td class="leading-13 pl-16px">￥{{ amount }}</td>
                  </template>
                  <template v-else-if="item.title === '确认退款金额'">
                    <td class="pl-16px">
                      <AInput disabled prefix="￥" v-model:value="money" @change="thumbsChange" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '退换货类型'">
                    <td class="leading-13 pl-16px">{{ isRefundOnly ? '仅退款' : '退货退款' }}</td>
                  </template>
                  <template v-else-if="item.title === '退款方式'">
                    <td class="leading-13 pl-16px">{{serviceList.isSplit ? '退款至账户余额' : '退回到原支付渠道'}}</td>
                  </template>
                  <template v-else-if="item.title === '处理备注'">
                    <td class="leading-13 pl-16px">
                      <AInput disabled v-model:value="auditRemark" />
                    </td>
                  </template>
                  <template v-else-if="item.title === '凭证照片'">
                    <td class="leading-13 pt-20px pl-16px">
                      <FileUrlPrase height="80px" width="80px" :file-url="refundPic" />
                    </td>
                  </template>
                  <td v-else class="edit-table-content pl-16px">{{ serviceList[item.key] }}</td>
                </tr>
              </table>
            </template>
          </ATabPane>
          <ATabPane key="two" tab="处理记录">
            <div>
              <ATable :dataSource="tableData" :columns="handleColumns" bordered :pagination="false">
                <template #bodyCell="{ column, text, record }">
                  <template v-if="column.dataIndex === 'status'">
                    <span v-if="record.status === 2110">待审核</span>
                    <span v-if="record.status === 2120">待退货</span>
                    <span v-if="record.status === 2140">待签收</span>
                    <span v-if="record.status === 2130">待退款</span>
                    <span v-if="record.status === 2150">已完成</span>
                    <span v-if="record.status === 2160">已关闭</span>
                  </template>
                </template>
              </ATable>
            </div>
          </ATabPane>
        </ATabs>
        <div class="handle-btn">
          <template v-if="statusName === 2110">
            <AButton
     
              v-auth="'/v1/order/refund/audit'"
         
              class="margin-r-30"
              @click="auditShow"
            >
              审核不通过
            </AButton>
            <AButton
              type="primary"
              v-auth="'/v1/order/refund/audit'"
              class="margin-r-20"
              @click="approved"
              >审核通过
            </AButton>
           
          </template>
          <template v-else-if="statusName === 2160 && route.query?.isCanUpdateRefund === 'true'">
            <AButton
              type="primary"
              v-auth="'/v1/order/refund/update/apply'"
              danger
              ghost
              class="margin-r-20"
              @click="application"
            >
              修改申请
            </AButton>
          </template>
          <template v-else-if="statusName === 2140">
            <AButton type="primary" v-auth="'/v1/order/refund/receipt'" @click="cancelActivation"
              >确认收货</AButton
            >
          </template>
        </div>
      </div>
    </div>
  </div>
  <a-modal v-model:visible="auditVisible" title="填写审核不通过原因" @ok="auditFailed">
    <div class="p-15px">
      <a-form
        ref="formRef"
        :model="formFailed"
        name="failedBasic"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item
          label="审核不通过原因"
          name="failedPass"
          :rules="[{ required: true, message: '请填写拒绝退款原因' }]"
        >
          <a-textarea
            v-model:value="formFailed.failedPass"
            :auto-size="{ minRows: 6, maxRows: 5 }"
            placeholder="请填写拒绝退款原因"
            show-count
            :maxlength="200"
          />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
  <AModal
    width="1200px"
    v-model:visible="afterSales.visible"
    title="申请售后"
    centered
    destroy-on-close
    @ok="salesConfirmation"
    @cancel="salesCancel"
  >
    <!-- goodsPic: res.data.refundGoods.pic, -->
    <div class="flex">
      <div class="p-10 m-l-10 flex-4">
        <div class="gondsImg"><img :src="goodsPic" alt="商品图片" /></div>
        <div><span>订单编号：</span>{{ oriOrderId }}</div>
        <div class="goodsTitle">
          <AButton type="link" @click="tradeName"
            ><span>商品名称：</span>{{ orderGoodsName }}
          </AButton>
        </div>
      </div>

      <div class="flex-1 pt-10 pb-10">
        <AForm
          layout="horizontal"
          ref="formRef"
          :model="formState"
          name="basic"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
        >
          <AFormItem
            label="售后类型"
            name="isRefundOnlyValue"
            :rules="[{ required: true, message: '请选择售后类型' }]"
          >
            <a-select
              ref="select"
              v-model:value="formState.isRefundOnlyValue"
              :options="afterType"
              @change="isRefundOnlyChange"
              placeholder="请选择"
            />
          </AFormItem>
          <AFormItem
            label="是否已到货"
            name="whetherReceiptGoods"
            :rules="[{ required: true, message: '请选择是否收到货' }]"
          >
            <a-select
              ref="select"
              v-model:value="formState.whetherReceiptGoods"
              :options="receiptType"
              @change="receiptGoodsChange"
              placeholder="请选择"
            />
          </AFormItem>
          <AFormItem
            label="售后原因"
            name="orderReason"
            :rules="[{ required: true, message: '请选择售后原因' }]"
          >
            <a-select
              ref="select"
              v-model:value="formState.orderReason"
              :options="orderOptions"
              @change="changeReason"
              placeholder="请选择"
            />
          </AFormItem>
          <AFormItem
            label="产品数量"
            name="productCount"
            :rules="[{ required: true, message: '请选择产品数量' }]"
          >
            <a-input-number
              id="inputNumber"
              v-model:value="formState.productCount"
              :min="1"
              @change="countChange"
              placeholder="请选择"
            />
          </AFormItem>
          <AFormItem
            label="详细描述"
            name="receiptRemark"
            :rules="[{ required: true, message: '请填写详细描述' }]"
          >
            <a-textarea
              v-model:value="formState.receiptRemark"
              placeholder="详细描述"
              :showCount="true"
              :rows="6"
              :maxlength="100"
            />
          </AFormItem>
          <AFormItem label="上传凭证" name="voucher">
            <div>
              <EraUpload
                :uploadType="'img'"
                :fileListData="fileUrl"
                :maxSize="30"
                :maxNumber="6"
                uploadFuncChannel="localStore"
                :multiple="true"
                upload-tip="点击上传图片"
                help-text="最多插入6张图片。"
                @done="handleDone"
                @delete="handerUpDel"
              />
            </div>
          </AFormItem>
          <AFormItem label="退款金额" name="createdTime">
            <AInput disabled v-model:value="quantity" />
          </AFormItem>
        </AForm>
      </div>
    </div>
  </AModal>
 </div>
</template>

<script setup lang="ts">
  import type { SelectProps } from 'ant-design-vue'
  import { Pattern } from '@vocen/shared'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { Modal } from 'ant-design-vue'
  import { createFromIconfontCN } from '@ant-design/icons-vue'
  import { ref, onBeforeMount, reactive, createVNode } from 'vue'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  // import GoodsAlert from '/@/modules/GoodsModule/GoodsManage/component/GoodsAlert.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { orderRefund } from '/@/modules/OrderModule/view/SupplierOrder/AfterSalesOrder/data/ReturnRefund'
  import FileUrlPrase from '/@/modules/ContentModule/component/FileUrlPrase/FileUrlPrase.vue'
  import EraUpload from '/@/components/EraUpload/EraUpload.vue'
  import type { FormInstance } from 'ant-design-vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const { createMessage } = useMessage()

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3417860_o9xftpwv6ss.js',
  })
  const fileUrl = ref([])
  const go = useRouter()
  const loadingCtxkey = 'handlerRow'
  const route = useRoute()
  onMountedOrActivated(async () => {
    await loadTableData()
    await storeSelectList()
  })
  const auditRemark = ref<any>('')
  const auditVisible = ref<boolean>(false)
  const freightCompany = ref<string>('')
  const freightPhone = ref<string>('')
  const freightNum = ref<string>('')
  const showLogistics = ref<boolean>(false)
  const logisticsCompany = ref<string>('')
  const waybill = ref<string>('')
  const logisticsPhone = ref<string>('')
  const receivingTime = ref<any>('')
  const wareAddressPhone = ref<any>('')
  const wareAddressName = ref<any>('')
  const wareAddressCode = ref<any>('')
  const wareAddress = reactive({})
  const wareCode = reactive({})
  const addressCode = ref<any>('')
  const wareContact = reactive({})
  const warePhone = reactive({})
  const wareName = reactive({})
  const wareId = ref<any>('')
  const orderShopId = ref<any>('')
  const shopPlatformCode = ref<any>('')
  const orderReason = ref<any>(null)
  let deliveryType = ref<any>()
  let orderOptions = ref([] as any[])
  let quantity = <any>ref('')
  let oriOrderId = ref<string>('')
  let money = ref<any>('')
  let remarks = <any>ref('')
  const logistics = <string>''
  let amount = <any>ref('')
  let refundPic = <any>ref('')
  let deliveryPic = ref('')
  const freightPic = ref([])
  let wareHouseOptions = ref([] as any[])
  let commodityStatus = <any>ref('')
  let commodity = <any>ref({})
  let goodId = ref('')
  let commodityDescription = <any>ref()
  let statusName = <any>ref({})
  let refundGoods = <any>ref()
  let goodsPic = <any>ref('')
  let payPrice = <any>ref({})
  let projectId = ref('')
  let price = <any>ref({})
  let goodsCount = <any>ref({})
  let serviceList = <any>ref({})
  let returnInformation = ref<any>({})
  let deliveryDetails = ref<any>({})
  let payment = <any>ref('')
  let orderId = <any>ref({})
  let isRefundOnly = <any>ref({})
  let reason = <any>ref({})
  let orderGoodsName = <any>ref('')
  const formRef = ref<any>()
  const refundGoodsName = ref<any>() //仓库
  const engineNoList=ref<any>()//识别码

  interface FormState {
    afterGoods: any
    createdTime: any
    warehouseName: any
    modifyTime: any
    isRefundOnlyValue: any
    whetherReceiptGoods: any
    orderReason: any
    productCount: any
    receiptRemark: any
    formFailed: any
  }

  const formFailed = reactive<FormState>({
    failedPass: '',
  })

  let isRefundOnlyValue = <any>ref('')
  let deliveryMethod = ref<string | undefined>()
  let whetherReceiptGoods = <any>ref('')
  let productCount = <any>ref('')
  let receiptRemark = <any>ref('')
  const modeType = ref<SelectProps['options']>([
    { value: 1, label: '物流发货' },
    { value: 2, label: '无需物流' },
  ])
  const afterType = ref<SelectProps['options']>([
    { value: true, label: '仅退款' },
    { value: false, label: '退货退款' },
  ])
  const receiptType = ref<SelectProps['options']>([
    { value: true, label: '已收到货' },
    { value: false, label: '未收到货' },
  ])
  const formState = reactive<FormState>({
    afterGoods: '',
    createdTime: '',
    warehouseName: '',
    modifyTime: '',
    isRefundOnlyValue: null,
    whetherReceiptGoods: null,
    orderReason: null,
    productCount: '',
    receiptRemark: '',
  })
  //退换货//v1/order/refund/detail
  const loadOperatelog = async () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    await adminHttp.Order.orderRefundQueryOperatelog({
      orderId: orderId,
    })
      .then((res) => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        console.log(res, 'vue')

        // item.status = 1
        loadTableData()
        loadOperatelog()
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  let tableData = ref([])
  //查询日志/v1/order/refund/query/operatelog
  const tabColumns = async () => {
    createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
    const data = await adminHttp.Order.orderRefundQueryOperatelog({
      orderId: route.query?.id,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log(`获取列表失败:${err.message}`)
        return { records: [], total: 0 }
      })

    tableData.value = data

    console.log(data, 'res.data')
  }

  const loadTableData = async () => {
    try {
      createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
      const res = await adminHttp.Order.orderRefundDetail({
        id: route.query?.id,
      })
      auditRemark.value = res.data?.auditRemark
      console.log(auditRemark.value, 'kkkkk')
      refundGoodsName.value = res.data?.refundGoods //商品信息
	  engineNoList.value=res.data?.refundGoods?.engineNoList//商品信息
      orderShopId.value = res.data?.refundGoods?.shopId
      shopPlatformCode.value = res.data?.refundGoods.shopPlatformCode
      oriOrderId.value = res.data.refundInformation.oriOrderId
      orderGoodsName.value = res.data?.refundGoods.goodsName
      goodsPic.value = res.data?.refundGoods.pic
      money.value = res.data.refundInformation.amount
      amount.value = res.data.refundInformation.amount
      payment.value = res.data.refundInformation.payType
      //物流信息
      deliveryDetails.value = res.data.deliveryDetails
      deliveryType.value = res.data.deliveryDetails.deliveryType
      deliveryPic.value = res.data.deliveryDetails.deliveryPic
      // freightPic.value = res.data.deliveryDetails.deliveryPic?.split(',')
      freightCompany.value = res.data.deliveryDetails.deliveryCompany
      freightPhone.value = res.data.deliveryDetails.deliveryMobile
      freightNum.value = res.data.deliveryDetails.deliveryNum
      //退货信息
      returnInformation.value = res.data.receiverAddress
      receivingTime.value = res.data.receiverAddress.receivingTime
      //服务
      serviceList.value = res.data.refundInformation
      //订单id isRefundOnly
      orderId.value = res.data.refundInformation.id
      isRefundOnly.value = res.data.refundInformation.isRefundOnly
      reason.value = res.data.refundInformation.reason
      goodId.value = res.data?.refundGoods?.goodsId

      //商品
      payPrice.value = res.data?.refundGoods.pic
      price.value = res.data?.refundGoods.payPrice
      goodsCount.value = res.data?.refundGoods.goodsCount
      projectId.value = res.data?.refundGoods.projectId
      refundPic.value = res.data?.refundInformation.refundPic
      refundGoods.value = [
        {
          goodsId: res.data?.refundGoods?.code,
          shopName: res.data?.refundGoods.shopName,
          goodsName: res.data?.refundGoods.goodsName,
          warehouseName: res.data?.refundGoods.warehouseName,
          goodsCount: res.data?.refundGoods.goodsCount,
          amount: res.data?.refundGoods.amount,
          projectId: res.data?.refundGoods.projectId,
        },
      ]

      //状态
      statusName.value = res.data.refundInformation.status
      if (statusName.value === 2110) {
        commodityStatus.value = '售后状态-待审核'
        commodity.value = 'error'
        // commodityDescription.value = ''
      } else if (statusName.value === 2120) {
        commodityStatus.value = '售后状态-待退货'
        commodity.value = 'success'
      } else if (statusName.value === 2140) {
        commodityStatus.value = '售后状态-待签收'
        commodity.value = 'success'
      } else if (statusName.value === 2130) {
        commodityStatus.value = '售后状态-待退款'
        commodity.value = 'success'
      } else if (statusName.value === 2150) {
        commodityStatus.value = '售后状态-已完成'
        commodity.value = 'error'
      } else if (statusName.value === 2160) {
        commodityStatus.value = '售后状态-已关闭'
        commodity.value = 'error'
      }
      createMessage.success({ content: `获取列表成功`, key: loadingCtxkey })
    } catch (e: any) {
      console.warn(e?.message || e?.data?.message || e?.error || '服务端错误')
      createMessage.error({ content: `操作失败:${e.message}`, key: loadingCtxkey })
    }
  }
  //退货凭证
  const handleVoucher = (info) => {
    freightPic.value.push(info.file.filePath)
    console.log(freightPic, 'freightPic地址')
  }

  const handerVoucherDel = (record) => {
    freightPic.value = freightPic.value.filter((item) => item != record.url)
    console.log(freightPic.value, '0000')
  }

  //审核通过/v1/order/refund/audit
  const approved = () => {
    if (money.value === '') {
      createMessage.error('请输入退款金额')
      return false
    }

    if (statusName === 2120 || statusName === 2130 || statusName === 2140 || statusName === 2150) {
      if (!orderReason.value) {
        createMessage.error('请选择退货点')
        return false
      }
    }

    adminHttp.Order.orderRefundAudit({
      // auditRemark: auditRemark.value,
      cause: auditRemark.value,
      isRefundOnly: isRefundOnly.value,
      orderId: orderId.value,
      status: 2,
      goodsId: goodId.value,
      projectId: projectId.value,
      warehouseId: wareId.value,
      money: money.value,
      receiverAddress: {
        name: wareAddressName.value,
        mobile: wareAddressPhone.value,
        areaCode: addressCode.value,
        address: wareAddressCode.value,
      },
    })
      .then(({ code }) => {
        if (+code === 20001) {
          createMessage.success({ content: `操作成功`, key: loadingCtxkey })
          // item.status = 1
          loadTableData()
        }
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //取消
  const salesCancel = () => {
    afterSales.visible = false
    formState.orderReason = null
    formState.productCount = ''
    formState.receiptRemark = ''
    formState.productCount = ''
    formState.whetherReceiptGoods = null
    formState.isRefundOnlyValue = null
  }
  let imgs = ref<string[]>([])
  const handleDone = (info) => {
    fileUrl.value.push(info.file.filePath)
    console.log(fileUrl, 'fileUrl地址')
  }

  const handerUpDel = (record) => {
    fileUrl.value = fileUrl.value.filter((item) => item != record.url)
    console.log(fileUrl.value, '0000')
  }
  //原因
  const changeReason = (item) => {
    console.log(item)
    formState.orderReason = item
  }
  //确定
  const salesConfirmation = () => {
    formRef.value
      .validate()
      .then((res) => {
        console.log(res, 'success')

        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        let map = {
          goodsId: goodId.value,
          amount: quantity.value,
          goodsCount: formState.productCount,
          isRefundOnly: formState.isRefundOnlyValue,
          orderId: orderId.value,
          reason: formState.orderReason,
          refundPic: fileUrl.value.toString() || '',
          whetherReceiptGoods: formState.whetherReceiptGoods,
          projectId: projectId.value || 0,
          remark: formState.receiptRemark,
        }
        adminHttp.Order.orderRefundUpdateApply(map)
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            // item.status = 1
            afterSales.visible = false
            loadTableData()
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
      .catch((e) => {
        console.log(e, '校验不通过')
      })
  }
  //修改售后
  const afterSales = reactive({
    visible: false,
    currentItem: null,
    rejectReason: '',
    currentId: '',
  })
  //修改申请
  const application = () => {
    afterSales.visible = true
  }
  //审核不通过
  const auditFailed = () => {
    formRef.value
      .validate()
      .then((res) => {
        console.log(res, 'success')

        const auditMap = {
          // auditRemark: auditRemark.value,
          cause: formFailed.failedPass,
          isRefundOnly: isRefundOnly.value,
          orderId: orderId.value,
          status: 3,
          goodsId: goodId.value,
          projectId: projectId.value,
          warehouseId: wareId.value,
          money: money.value,
          receiverAddress: {
            name: wareAddressName.value,
            mobile: wareAddressPhone.value,
            areaCode: addressCode.value,
            address: wareAddressCode.value,
          },
        }
        adminHttp.Order.orderRefundAudit(auditMap)
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            // item.status = 1
            auditVisible.value = false
            loadTableData()
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      })
      .catch((e) => {
        console.log(e, '校验不通过')
      })
  }
  const activeKey = ref('one')
  const handleColumns = [
    {
      title: '操作者',
      dataIndex: 'creatorName',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      width: '280px',
    },
    {
      title: '操作项',
      dataIndex: 'statusEvent',
    },
    {
      title: '退款状态',
      dataIndex: 'status',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ]
  const columns = [
    {
      title: '商品id',
      dataIndex: 'goodsId',
    },
    {
      title: '卖家',
      dataIndex: 'shopName',
      width: '280px',
    },
    {
      title: '商品信息',
      dataIndex: 'goodsName',
    },
    {
      title: '销售价格*数量',
      dataIndex: 'payPrice',
    },
    {
      title: '发货仓',
      dataIndex: 'warehouseName',
    },
    {
      title: '支付方式',
      dataIndex: 'increment',
    },
    {
      title: '退款数量',
      dataIndex: 'goodsCount',
    },
    {
      title: '小计',
      dataIndex: 'amount',
    },
  ]
  const deliveryChange = (value) => {
    console.log(value, 'iiii')
  }
  //是否退货退款
  const isRefundOnlyChange = (value) => {
    console.log(value, 'iiii')
  }
  //是否到货
  const receiptGoodsChange = (value) => {
    console.log(value, 'aaaa')
    orderOptions.value = []
    adminHttp.Order.orderRefundCauseQueryList({
      type: value,
    })
      .then((res) => {
        res.data.filter((item) => {
          console.log(item)
          let map = { label: item, value: item }
          orderOptions.value.push(map)
        })
      })
      .catch((err) => {
        createMessage.error({ content: `:${err.message}` })
      })
  }
  //数量变化/v1/order/refund/calculate/
  const countChange = (value) => {
    adminHttp.Order.orderRefundCalculateAmount({
      goodsId: goodId.value,
      orderId: oriOrderId.value,
      goodsCount: formState.productCount,
      projectId: projectId.value || 0,
    })
      .then((res) => {
        console.log('数量=>', res)
        quantity.value = res.data
      })
      .catch((err) => {
        createMessage.error({ content: `:${err.message}` })
      })
  }
  //收货点
  const changeWareHouse = (item) => {
    console.log(item, 'item')
    wareId.value = item
    wareAddressCode.value = wareName[item] + wareAddress[item] //收货点contact
    wareAddressName.value = wareContact[item] //收货人contact
    wareAddressPhone.value = warePhone[item] //手机号
    addressCode.value = wareCode[item]
    console.log(wareAddress[item], '地址') //地址code
    console.log(wareCode[item]) //地址code
    console.log(wareContact[item], '收货人') //收货人
    console.log(warePhone[item], '手机号') //手机号
  }

  //仓库下拉, /v1/order/refund/query/warehouses
  const storeSelectList = async () => {
    wareHouseOptions.value = []
    let map = {
      companyId: orderShopId.value,
      platformCode: shopPlatformCode.value,
      goodsId: goodId.value,
    }
    const res = await adminHttp.Order.orderRefundQueryWarehouses(map)
    if (res.code === '20001') {
      res.data.filter((item) => {
        wareAddress[item.warehouseId] = item.address
        wareCode[item.warehouseId] = item.areaCode
        wareContact[item.warehouseId] = item.contact
        if(refundGoodsName.value.shopPlatformCode ==='supplier'){
          warePhone[item.warehouseId] =
          item.refundPhone1 + (item.refundPhone2 ? '/' + item.refundPhone2 : '')
        }else{
          warePhone[item.warehouseId] = item.phone
        }
        wareName[item.warehouseId] = item.areaName
        let map = { value: item.warehouseId, label: item.warehouseName }
        wareHouseOptions.value.push(map)
      })
    }
  }

  //物流orderRefundCreateDelivery
  const submitLogistics = () => {
    adminHttp.Order.orderRefundCreateDelivery({
      orderId: route.query?.id,
      deliveryType: 1,
      logisticsDetail: {
        deliveryPic: freightPic.value.toString(),
        deliveryNum: waybill.value,
        deliveryCompany: logisticsCompany.value,
        deliveryMobile: logisticsPhone.value,
      },
    })
      .then(() => {})
      .catch((err) => {
        createMessage.error({ content: `:${err.message}` })
      })
  }
  const writeLogistics = () => {
    showLogistics.value = true
  }

  //修改退货单
  const modifyLogistics = async () => {
    adminHttp.Order.orderRefundUpdateDelivery({
      id: deliveryDetails.value.deliveryId,
      deliveryType: 1,
      logisticsDetail: {
        deliveryPic: freightPic.value.toString(),
        deliveryNum: freightNum.value,
        deliveryCompany: freightCompany.value,
        deliveryMobile: freightPhone.value,
      },
    })
      .then(() => {
        createMessage.success({ content: `操作成功`, key: loadingCtxkey })
        showLogistics.value = false
        // item.status = 1
      })
      .catch((err) => {
        createMessage.error({ content: `:${err.message}` })
      })
  }

  //查看订单号
  const viewOrder = () => {
    if (refundGoods.value[0].projectId) {
      // OrderModule/agentOrder/agentInvestDetails
      go.push({
        path: '/OrderModule/agentOrder/agentInvestDetails',
        query: {
          id: serviceList.value.oriOrderId,
        },
      })
    } else {
      go.push({
        path: '/OrderModule/repairShopOrder/purchaseDetails',
        query: {
          id: serviceList.value.oriOrderId,
        },
      })
    }
  }

  //审核
  const auditShow = () => {
    auditVisible.value = true
  }
  //确认收货
  const cancelActivation = () => {
    const modal = Modal.confirm({
      title: '是否到货',
      icon: createVNode(ExclamationCircleOutlined),
      okText: '已收货',
      cancelText: '未收货',
      content: '您是否收到该订单商品？',
      onOk() {
        let params = { orderId: orderId.value }
        cancelDeactivate(params)
        modal.destroy()
      },

      onCancel() {
        modal.destroy()
      },
    })
  }
  const cancelDeactivate = async (params) => {
    try {
      const { code, message } = await adminHttp.Order.orderRefundReceipt(params)
      if (code === '20001') {
        // 重新加载列表页面
        loadTableData()
      } else {
        createMessage.error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }
  const isIntNum = (val) => {
    var regPos = /^[0-9]+.?[0-9]*$/

    if (regPos.test(val)) {
      return true
    } else {
      return false
    }
  }
  const thumbsChange = () => {
    if (money.value > amount.value) {
      createMessage.error('确认退款金额不能大于退款金额')
      money.value = ''
      return
    }
    if (!isIntNum(money.value)) {
      createMessage.error('金额为数字')
      money.value = ''
      return
    }
  }
  //跳转商品详情
  const tradeName = () => {
    go.push({
      path: '/goodsManage/goods/goodsDetailsAssets',
      query: {
        id: refundGoodsName.value.goodsId,
      },
    })
  }
</script>

<style lang="less" scoped>
  .page-wrap {
    margin: 10px;

    .page-table {
      padding: 10px;
      background: #fff;

      .payment-Status {
        // display: flex;
        background-color: #fff;
      }

      .handle-btn {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        // width: 100vw;
        bottom: 10px;
        left: 0;
        height: 40px;
      }
    }

    .edit-table {
      width: 100%;
    }

    .edit-table td,
    .edit-table th {
      border: 1px solid #cad9ea;
      color: #666;
      height: 50px;
    }

    .edit-table td:nth-child(odd) {
      width: 200px;
      background: #f6f7f8;
    }
  }

  .gondsImg {
    display: flex;
    width: 200px;
    height: 200px;
  }

  .goodsTitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
