<template>
  <div class="page-wrap">
    <a-tabs class="wrap-tabs bg-white" :tabBarGutter="50"  v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="PC端预览">
        <div class="page-left" :class="{ toggle: menuSetting.collapsed }">
          <a-steps v-model:current="current" direction="vertical">
            <a-step
              class="step-title"
              title="商品信息"
              #description
              @click.stop="targetHandler(0, '#basic-list')"
            >
              <div class="step-title" @click.stop="targetHandler(0, '#basic-list')"> 基本信息</div>
              <div class="step-title" @click.stop="targetHandler(1, '#attribute')">
                属性及价格区间
              </div>
            </a-step>
            <a-step
              class="step-title"
              title="商品描述及服务"
              @click.stop="targetHandler(2, '#service')"
              #description
            >
              <div class="step-title" @click.stop="targetHandler(2, '#service')"> 服务信息</div>
              <div class="step-title" @click.stop="targetHandler(3, '#picture')"> 商品头图</div>
              <div class="step-title" @click.stop="targetHandler(4, '#details')"> 图文详情</div>
            </a-step>
          </a-steps>
        </div>
        <div class="page-right p-24px" id="container">
          <section>
            <div id="basic-list">
              <div class="basic">
                <div class="template--title">基础信息</div>
                <div class="basic-content">
                  <Form :label-col="{ span: 8 }" :wrapper-col="{ span: 14 }">
                    <a-row type="flex">
                      <a-col :span="12" >
                        <FormItem label="商品类别">
                          <div class="px-12px py-5px rounded-sm	 border border-solid border-#D9D9D9">
                            <span>{{ detailInfo.categoryName }}</span>
                          </div>
                        </FormItem>
                      </a-col>
                      <a-col :span="12" >
                        <FormItem label="运营类别">
                          <div class="px-12px py-5px rounded-sm	 border border-solid border-#D9D9D9">
                            <span>{{ detailInfo.operateName }}</span>
                          </div>
                        </FormItem>
                      </a-col>
                      <a-col :span="12" >
                        <FormItem label="商品品牌">
                          <div class="px-12px py-5px rounded-sm	 border border-solid border-#D9D9D9">
                            {{ detailInfo.brandName }}
                          </div>
                        </FormItem>
                      </a-col>
                    </a-row>
                  </Form>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div id="attribute">
              <div class="price">
                <div class="template--title">属性及价格区间</div>
                <div >
                  <div class="price-content--title mt-13px mb-15px"
                    ><span class="price-content--title--wild mr-5px">*</span>价格区间
                  </div>
                  <div class="price-content-price">
                    <Table
                      :dataSource="priceData"
                      :columns="priceColumns"
                      :pagination="false"
                      bordered
                    />
                  </div>
                  <!-- 参数属性 -->
                  <div class="price-content--parameter mt-13px mb-15px"
                    ><span class="price-content--parameter--wild mr-5px">*</span>参数属性
                  </div>
                  <div class="price-content-ginseng">
                    <Table
                      :dataSource="stateGinseng"
                      :columns="parameterList"
                      :pagination="false"
                      bordered
                    />
                  </div>
                  <!-- <div class="price-content-filter mt-13px mb-15px"
                    ><span class="price-content-filter--wild mr-5px">*</span>适配车型
                    <div class="mt-10px">OE码：{{ detailInfo.oeId && detailInfo.oeId.join(',') }}</div>
                  </div> -->
                  <!-- <div class="price-content-models">
                    <Table
                      :dataSource="detailInfo.vehicleVOS"
                      :columns="modelsList"
                      :pagination="false"
                      bordered
                    >
                      <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'displacement'">
                          {{ record.displacement }}{{ record.induction }}
                        </template>
                      </template>
                    </Table>
                  </div> -->
                  <div class="price-content-FenRun mt-13px mb-15px"
                    ><span class="price-content-FenRun--wild mr-5px">*</span>商品分润
                  </div>
                  <div class="price-content-list ">
                    <SupplyTotal :data="detailInfo.profitSharing" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div id="service">
              <div class="clothing">
                <div class="template--title">服务保障</div>
                <div class="clothing-content">
                  <div v-for="(item, index) of detailInfo.serviceConfiguration" :key="index">
                    <div class="clothing-content-support"> {{ index + 1 }}、{{ item.key }}</div>
                    <div class="clothing-content-header" container="#container" v-if="item.value instanceof Array">
                      <VoPreviewHeadImg  :dataSource="item.value" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div id="picture">
              <div class="figure">
                <div class="template--title">商品头图</div>
                <div class="figure-content">
                  <div class="figure-content-header" container="#container">
                    <VoPreviewHeadImg  :dataSource="detailInfo.picture" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div id="details">
              <div class="figure">
                <div class="template--title">商品详情</div>
                <div class="figure-content">
                  <div class="figure-content-header" container="#container">
                    <VoPreviewHeadImg
                      :dataSource="detailInfo.detailsPicture"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="fixed bg-white left-251px right-24px bottom-0 flex items-center justify-center p-15px">
          <a-space  :size="15">
            <Button type="primary" class="w-100px"  @click="back()">返回</Button>
            <Button type="primary" class="w-100px" @click="edit()">修改</Button>
            <APopconfirm
                    title="确定要发布吗？发布后该模版将公开到平台。"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="handlerAccessRow(record)"
            >
              <Button class="w-100px" type="primary" v-if="detailInfo.status != 1"
              >发布
              </Button>
            </APopconfirm>
            <APopconfirm
                    title="确定要取消发布吗？取消发布后，客户将无法再使用该模版。"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="cancelRelease(record)"
            >
              <Button class="w-100px" type="primary" v-if="detailInfo.status == 1"
              >取消发布
              </Button>
            </APopconfirm>
          </a-space>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="用户端预览" force-render>
        <div class="page-mobile" id="container">
          <section>
            <div class="price-mobile">移动端H5预览</div>
          </section>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  import { detailList } from '/@/modules/GoodsModule/GoodsManage/component/index'
  import { parameterList } from '/@/modules/GoodsModule/GoodsManage/component/index'
  import { detailSource } from '/@/modules/GoodsModule/GoodsManage/mock/index'
  import { ginsengSource } from '/@/modules/GoodsModule/GoodsManage/mock/index'
  import { modelsSource } from '/@/modules/GoodsModule/GoodsManage/mock/index' //过滤
  import { modelsList } from '/@/modules/GoodsModule/GoodsManage/component/index'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useRoute, useRouter } from 'vue-router'
  // import { FenRunList } from '/@/modules/GoodsManage/mock/index' //分润
  // import { FenRunTitle } from '/@/modules/GoodsManage/component/index' //分润
  import SupplyTotal from '/@/modules/SupplierPages/component/SupplyTotal.vue'
  import { useAppStore } from '/@/store/modules/app'
  import { defineComponent, ref, reactive, toRefs } from 'vue'
  import { Form, Table, Button } from 'ant-design-vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { PageEnum } from '/@/enums/pageEnum'

  const { createMessage } = useMessage()
  const loadingCtxkey = 'handlerRow'

  interface Option {
    value: string
    label: string
    children?: Option[]
  }

  const options: Option[] = [
    {
      value: '发动机系列',
      label: '发动机系列',
      children: [
        {
          value: '发动机',
          label: '发动机',
        },
      ],
    },
  ]
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
  ])
  const headerImages = ref([
    {
      id: 1,
      name: '测试1',
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655367819&t=fa92f9ce4ccb7e9725b35c132ca2adb2',
      type: 1,
    },
    {
      id: 2,
      name: '细节图',
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242306111155-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655367819&t=ad132fceb95bca534c40e7a37737c825',
      type: 1,
    },
    {
      id: 3,
      name: '细节图',
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655367819&t=fa92f9ce4ccb7e9725b35c132ca2adb2',
      type: 1,
    },
    {
      id: 4,
      name: '细节图',
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242306111155-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655367819&t=ad132fceb95bca534c40e7a37737c825',
      type: 1,
    },
    {
      id: 5,
      name: '细节图',
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242306111155-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655367819&t=ad132fceb95bca534c40e7a37737c825',
      type: 1,
    },
  ])
  export default defineComponent({
    name: 'GoodsProfit',
    components: { VoPreviewHeadImg, Form, FormItem: Form.Item, Table, SupplyTotal, Button },
    setup() {
      //--滑动--
      const appStore = useAppStore()
      const current = ref(0)
      const visible = ref(false)
      const target = ref('#basic-list')
      const style = reactive({})
      const menuSetting = appStore.getMenuSetting
      const route = useRoute() // 获取路由详情
      const router = useRouter() // 跳转路由
      const detailInfo = ref({})
      const priceColumns = ref([
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          key: 'goodsName',
        },
        {
          title: '价格上限',
          dataIndex: 'priceCap',
          key: 'priceCap',
        },
        {
          title: '价格下限',
          dataIndex: 'priceFloor',
          key: 'priceFloor',
        },
      ]) // 价格区间head
      const priceData = ref([{}]) // 价格区间数据
      const targetHandler = (index, target) => {
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' })
        current.value = index
      }

      const dingHandler = (targetEl) => {
        target.value = targetEl
        visible.value = true
      }
      const queryScroll = () => {
        const c = document.querySelector('#container') as HTMLElement
        console.log(c.scrollTop)
      }
      //--以上滑动--
      const stateDetail = reactive({ detailSource })
      const stateGinseng = ref([])
      const stateModels = reactive({ modelsSource })
      // const stateFenRun = reactive({ FenRunList })
      const onChange = (current: number) => {
        console.log(current)
      }

      const state = reactive({
        value1: [],
      })

      interface formValue {
        goodsClassfy: string[]
        initClassfy: string
      }

      const formState = reactive<formValue>({
        goodsClassfy: [],
        initClassfy: '机油>润滑油',
      })
      const choiceInitClassfy = () => {
        console.log('选中问题====', formState.goodsClassfy)
        formState.goodsClassfy = ['machine-oil', 'runhua-oil']
      }

      // 返回
      const back = () => {
        router.back()
      }

      // 修改
      const edit = () => {
        router.push({
          path: PageEnum.GOOD_DRAFT,
          query: {
            id: detailInfo.value.id,
            edit: 1,
            categoryId: detailInfo.value.categoryId,
            categoryName: detailInfo.value.categoryName,
            type: 'show',
            from: 1,
          },
        })
      }
      // 取消发布
      const cancelRelease = (item) => {
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp
          .goodsTemplateUnPublish({ ids: [detailInfo.value.id] })
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            detailInfo.value.status = 1
            router.push('/goodsManage/goodsTemplate/goodsCase')
          })
          .catch((err) => {
            createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
          })
      }

      // 发布
      const handlerAccessRow = (item) => {
        console.log(item, '000990909090090')
        const changeSwitchMap = {
          ids: [detailInfo.value.id],
        }
        createMessage.loading({ content: 'Loading...', key: loadingCtxkey })
        adminHttp
          .goodsTemplatePublish(changeSwitchMap)
          .then(() => {
            createMessage.success({ content: `操作成功`, key: loadingCtxkey })
            goodsDetail()
            detailInfo.value.status = 1
          })
          .catch((err) => {
            if(err.message == '部分模板分润信息未设置'){
              createMessage.error({ content: `${err.message},请点击修改按钮去设置`, key: loadingCtxkey })
            }else {
              createMessage.error({ content: `${err.message}`, key: loadingCtxkey })
            }

          })
      }

      const goodsDetail = async () => {
        try {
          const { data, code } = await adminHttp.goodsTemplateDetail({
            id: route.query.id,
          })
          if (code == '20001') {
            console.log(data.paramsProperty)
            detailInfo.value = data
            getPriceInfo()
            // 获取参数
            stateGinseng.value = data.paramsProperty
          }
        } catch (e) {
          console.log(e)
        }
      }

      const getPriceInfo = () => {
        priceData.value[0]['goodsName'] = detailInfo.value.name
        priceData.value[0]['priceFloor'] = detailInfo.value.priceFloor
        priceData.value[0]['priceCap'] = detailInfo.value.priceCap
        let skuProprty =
          detailInfo.value.skuProperty &&
          detailInfo.value.skuProperty.map((item) => {
            priceData.value[0][item.key] = item.value
            return {
              title: item.key == detailInfo.value.modelId?'型号':item.name,
              dataIndex: item.key,
              key: item.key,
              align: 'center',
            }
          })
        priceColumns.value = [].concat(skuProprty).concat(priceColumns.value)
        detailInfo.value.serviceConfiguration = detailInfo.value.serviceConfiguration.map(
          (item) => {
            if (JSON.parse(item.value) instanceof Array) {
              item.value = JSON.parse(item.value)
            }
            return item
          },
        )
        // 适配车型
        detailInfo.value.vehicleVOS = detailInfo.value.vehicleVOS ? detailInfo.value.vehicleVOS : []
      }

      goodsDetail()
      return {
        images,
        headerImages,
        //以下滑动
        current,
        visible,
        menuSetting,
        style,
        target,
        targetHandler,
        queryScroll,
        dingHandler,
        //以上滑动
        ...toRefs(stateDetail),
        stateGinseng,
        ...toRefs(stateModels),
        // 价格区间
        priceColumns,
        priceData,
        // ...toRefs(stateFenRun),
        detailList,
        parameterList,
        modelsList,
        // FenRunTitle,
        onChange,
        choiceInitClassfy,
        formState,
        activeKey: ref('1'),
        ...toRefs(state),
        options,
        detailInfo,
        category: ref<string[]>(['发动机系列']),

        // 操作按钮
        back,
        edit,
        cancelRelease,
        handlerAccessRow,
      }
    },
  })
</script>
<style>
  html,
  body {
    overflow-x: visible !important;
  }
</style>
<style lang="less" scoped>
  /* For demo */
  .page-wrap {
    min-height: calc(100vh - 130px);
    padding: 24px;
    width: 100%;
    position: relative;

    .wrap-tabs {

    }
    ::v-deep(.ant-tabs-nav-wrap){
      padding: 0 16px;
    }

    .page-left {
      padding: 15px;
      transition: all 0.3s;
      width: 200px;
      position: absolute;
      //top: 230px;
      z-index: 99;
      ::v-deep  .ant-steps-item-icon{
        width: 21px;
        height: 22px;
        line-height: 22px;
        margin-left: 5px;
        margin-top: 5px;
        font-size: 14px;
        font-weight: 400;
      }
      ::v-deep .ant-steps-item-description {
        .step-title{
          font-size: 14px;
          font-weight: 700;
        }
      }

      &.toggle {
        left: 70px;
      }

      .step-title {
        font-size: 16px;
        font-weight: 800;
        margin-top: 10px;
      }
    }

    .page-right {
      position: relative;
      padding-left: 230px;
      height: calc(100vh - 100px);
      overflow-y: scroll;
      width: 100%;

      .basic {
        & {
          // background: #ff6400;
          &--title {
            padding: 12px 0;
            font-weight: 700;
            font-size: 14px;
            line-height: 22px;
            height: 46px;
            background: rgba(230, 247, 255, 0.7);
            font-style: normal;
          }

          &--title:before {
            content: '';
            width: 2px;
            height: 16px;
            padding: 0 2px;
            background: #1890ff;
            margin: 15px 8px;
          }

          &-content {
            padding: 10px;
            background: #fff;
          }
        }
      }

      .price {
        & {
          margin-top: 15px;

          &-content {
            padding: 0 10px;
            // height: 200px;
            background: #fff;

            &--title {
              font-size: 14px;
              color: #262626;

              &--wild {
                color: red;
              }
            }

            &--parameter {
              font-size: 14px;
              color: #262626;

              &--wild {
                color: red;
              }
            }

            &-ginseng {
              width: 500px;
            }

            &-filter {
              font-size: 14px;
              color: #262626;

              &--wild {
                color: red;
              }
            }

            &-FenRun {
              font-size: 14px;
              color: #262626;

              &--wild {
                color: red;
              }
            }

            &-list {
              margin-bottom: 30px;
            }
          }
        }
      }

      .clothing {
        & {
          margin-top: 15px;

          &-content {
            padding: 10px;
            background: #fff;

            &-support {
              // color: #c1c1c1;
              padding: 10px;
              font-size: 16px;
            }

            &-install {
              padding: 10px;
              font-size: 16px;
            }

            &-installation {
              // padding: 10px 0;
            }
          }
        }
      }

      .figure {
        margin-top: 15px;

        &-content {
          background: #fff;
          padding: 10px;

          &-header {
            margin-bottom: 20px;
          }
        }
      }

      .operation {
        &-button {
          display: flex;
          justify-content: center;
          align-items: center;

          &-item {
            margin: 70px;
            width: 120px;
          }
        }
      }
    }

    .page-mobile {
      position: relative;

      padding-left: 200px;
      height: calc(100vh - 10px);
      overflow-y: scroll;

      .price-mobile {
        // width: 749px;
      }
    }
  }
  .template--title {
    padding: 12px 0;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    height: 46px;
    background: rgba(230, 247, 255, 0.7);
    font-style: normal;
  }

  .template--title:before {
    content: '';
    width: 2px;
    height: 16px;
    padding: 0 2px;
    background: #1890ff;
    margin: 15px 8px;
  }
</style>
