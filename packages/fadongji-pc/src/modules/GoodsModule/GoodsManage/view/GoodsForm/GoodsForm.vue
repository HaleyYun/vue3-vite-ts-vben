<template>
<div>
  <div class="page-wrap mb-82px">
    <div class="page-left" :class="{ toggle: closeToggle }">
      <div class="page-left-container">
        <ASteps v-model:current="current" direction="vertical">
          <a-step
            class="step-title"
            title="一 填商品信息"
            @click.stop="targetHandler(0, '#basic-list')"
          >
            <template #description>
              <div class="step-title" @click.stop="targetHandler(0, '#basic-list')">基本信息</div>
              <div class="step-title" @click.stop="targetHandler(1, '#attribute')">
                属性及价格区间
              </div>
            </template>
          </a-step>
          <a-step
            class="step-title"
            title="二 填商品描述及服务"
            @click.stop="targetHandler(0, '#service')"
          >
            <template #description>
              <div class="step-title" @click.stop="targetHandler(0, '#service')">服务信息</div>
              <div class="step-title" @click.stop="targetHandler(1, '#picture')">商品头图</div>
              <div class="step-title" @click.stop="targetHandler(2, '#details')">图文详情</div>
            </template>
          </a-step>
          <a-step
            class="step-title"
            title="三 提交"
            @click.stop="targetHandler(0, '#edit-footer')"
          />
        </ASteps>
      </div>
    </div>
    <div class="page-right" id="container" ref="container">
      <div
        class="mb-20px static top-105px left-130px cursor-pointer"
        @click="closeToggle = !closeToggle"
      >
        <menu-fold-outlined v-if="!closeToggle" />
        <menu-unfold-outlined v-else />
      </div>

      <section>
        <div id="basic-list">
          <div class="basic section">
            <div class="template--title mb-15px">基础信息</div>

            <div class="basic-content section-content">
              <Form :label-col="{ style: { width: '150px' } }" :wrapper-col="{ span: 16 }">
                <a-row type="flex">
                  <a-col :span="12">
                    <FormItem label="商品类别" required>
                      <div class="px-12px rounded-sm border border-solid border-#D9D9D9">
                        <span>{{ categoryName }}</span>
                        <a-button
                          type="link"
                          class="ml-10px"
                          @click="goEidtCategory"
                          v-if="fromModel != 1"
                          >编辑
                        </a-button>
                      </div>
                    </FormItem>
                  </a-col>
                  <a-col :span="12">
                    <FormItem label="运营类别">
                      <div class="px-12px py-7px rounded-sm border border-solid border-#D9D9D9">
                        <span>{{ operateName }}</span>
                      </div>
                    </FormItem>
                  </a-col>
                  <a-col :span="12">
                    <FormItem label="商品品牌" required>
                      <a-select
                        v-model:value="brandSelectId"
                        show-search
                        :filterOption="brandfilterOption"
                        :options="brandSelectOptions"
                        :field-names="{ label: 'name', value: 'id' }"
                        placeholder="请输入商品品牌"
                        @change="getBrandId"
                      />
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
          <div class="price section">
            <div class="template--title mb-13px">属性及价格区间</div>
            <div>
              <div class="font-14px mb-20px"><span class="text-danger">*</span>规格属性：</div>
              <div class="p-15px rounded-sm border border-solid border-#EBEBEB">
                <GoodsSpecBox
                  :disabled="fromModel === 1"
                  :template-data="templateData"
                  :specs="specs"
                />
              </div>
              <div class="font-14px mt-13px mb-16px"
                ><span class="text-danger">*</span>价格区间：
              </div>
              <GoodsSkuBox
                :disabled="fromModel === 1"
                :template-data="templateData"
                :id="initID"
                ref="skuRef"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div id="service">
          <div class="sales section">
            <div class="template--title mb-15px">服务信息</div>
            <div>
              <div class="p-15px border border-solid border-#EBEBEB">
                <div class="margin-b-10 font-bold">
                  <a-checkbox v-model:checked="serviceConfig.checkOne"> 售卖物料支持</a-checkbox>
                </div>
                <div v-if="serviceConfig.checkOne">
                  <p>1、售卖物料:</p>
                  <VoUploadImage v-model:images="material" container="#container" num="6" />

                  <p class="text-upload">仅支持上传jpg、jpge图片、mp4视频，每张不超过5M</p>
                  <div class="mb-10px">2、售卖物料缩略图:</div>
                  <VoUploadImage
                    v-model:images="OriginMaterialImg"
                    container="#container"
                    num="6"
                  />
                  <p class="text-upload">仅支持上传1张jpg、jpge图片，建议宽度790px，最大不超过2M</p>
                </div>
              </div>

              <div class="tutorial mt-15px p-15px border border-solid border-#EBEBEB">
                <div class="font-bold">
                  <a-checkbox v-model:checked="serviceConfig.checkThree">
                    安装指导、安装视频
                  </a-checkbox>
                </div>
                <div v-if="serviceConfig.checkThree" class="mt-10px">
                  <div class="pb-16px">1.安装指导:</div>
                  <VoUploadImage v-model:images="InstallGuide" container="#container" num="1" />

                  <p class="text-upload pt-5px pb-20px">
                    仅支持上传1张jpg、jpge图片，建议宽度790px，最大不超过2M
                  </p>
                  <div>
                    <div class="pb-16px">2.安装视频:</div>
                    <div>
                      <VoUploadImage v-model:images="video" container="#container" num="1" />
                    </div>
                    <p class="text-upload">仅支持上传1个 mp4文件，最大不超过15M</p>
                  </div>
                  <div class="font-bold pt-20px">
                    <a-checkbox v-model:checked="serviceConfig.checkThree">
                      7*24小时人工技术支持
                    </a-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div id="picture">
          <div class="figure section">
            <div class="template--title mb-15px">商品头图</div>
            <div class="p-15px rounded-sm border border-solid border-#EBEBEB">
              <div>
                <VoUploadImage v-model:images="images" container="#container" num="5" />
              </div>
              <p>第一张图片是商品主图，会显示在商品列表，并在商品详情页优先展示。</p>
              <p class="figure-content-text">
                建议尺寸800*800px，图片大小不超过2M，视频大小不超过15M,仅支持JPG,JPEG，mp4格式，
                图片至少上传1张，最多6张，您可以拖拽图片/视频调整顺序
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div id="details">
          <div class="situation section">
            <div class="template--title mb-15px">商品详情</div>
            <div class="p-15px rounded-sm border border-solid border-#EBEBEB">
              <div class="situation-content section-content pt-10px">
                <VoUploadImage v-model:images="goodsDetails" container="#container" num="10" />
              </div>
              <p class="figure-content-text pl-10px">
                建议宽度790px，图片使用JPG,JPEG格式，大小不超过2M，视频使用mp4格式，大小不超过15M，图片+视频总量不超过10个，您可以拖拽图片/视频调整顺序。
              </p>
            </div>
          </div>
        </div>
      </section>
      <a-back-top :target="getBackTop" :visibilityHeight="200" />
    </div>
  </div>
  <div
    id="edit-footer"
    class="fixed bg-white left-251px right-24px bottom-0 flex items-center justify-center p-15px"
  >
    <div class="edit-btn">
      <a-space v-if="fromModel === 0 || fromModel === 2" :size="15">
        <Button @click="saveExit">保存草稿并退出</Button>
        <Button type="primary" @click="saveReleased()">保存到待发布</Button>
        <Button type="primary" @click="release()">立即发布</Button>
      </a-space>
      <a-space v-if="fromModel === 1" :size="15">
        <!--			  1：已发布  0：待发布  2：已取消发布-->
        <template v-if="editStatus === 0 || editStatus === 2">
          <Button @click="backHandler">返回</Button>
          <Button type="primary" @click="saveHandler">保存</Button>
          <Button type="primary" @click="releaseHandler">发布</Button>
        </template>
        <template v-if="editStatus === 1">
          <Button @click="backHandler">返回</Button>
          <Button type="primary" @click="saveHandler">保存</Button>
        </template>
      </a-space>
    </div>
  </div>
  <EraParameter container="#container" v-model:visible="parameterVisible" />
  <VoBenefit v-model:visible="benefitVisible" />
</div>
</template>

<script lang="ts">
  import { useMessage } from '/@/hooks/web/useMessage'
  // 传递给图片弹框内容，系统弹框退出后，触发相对应的图片区域的函数
  import { Modal } from 'ant-design-vue'
  import { useRoute, useRouter } from 'vue-router'
  import VoBenefit from '/@/components/VoBenefit/VoBenefit.vue'
  import { defineComponent, onMounted, reactive, ref, toRefs, watch, createVNode } from 'vue'
  import EraParameter from '../../component/EraParameter.vue'
  import { caseContent } from '/@/modules/GoodsModule/GoodsManage/mock'
  import { draftContent } from '/@/modules/GoodsModule/GoodsManage/component'
  import { Button, Form, message } from 'ant-design-vue'
  import VoUploadImage from '/@/components/VoGoodsHeaderImage/VoUploadImage.vue'
  import { transmitEnum } from '/@/modules/GoodsModule/GoodsTemplate/data/data'
  import { useAppStore } from '/@/store/modules/app'
  import adminHttp from '/@/utils/http/adminHttp'
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import GoodsSpecBox from '/@/modules/GoodsModule/GoodsManage/view/GoodsForm/components/GoodsSpecBox/GoodsSpecBox.vue'
  import GoodsSkuBox from '/@/modules/GoodsModule/GoodsManage/view/GoodsForm/components/GoodsSkuBox/GoodsSkuBox.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'

  // 商品详情
  const goodsDetails = ref([])

  const fromModel = ref<any>(0)

  const material = ref<any>([])

  const OriginMaterialImg = ref([])

  const InstallGuide = ref([])

  const video = ref([])

  // 商品头图
  const images = ref([])

  const serviceConfig = reactive({
    checkOne: true,
    checkTwo: true,
    checkThree: true,
  })

  // "新增商品模板"的form
  interface goodFormItem {
    operateName: string | undefined
    categoryName: string | undefined
    randSelectOptions: Array<[string]>
    categoryId: string | undefined
  }

  export default defineComponent({
    name: 'GoodsForm',
    components: {
      VoUploadImage,
      GoodsSkuBox,
      GoodsSpecBox,
      Button,
      Form,
      FormItem: Form.Item,
      VoBenefit,
      EraParameter,
      MenuFoldOutlined,
      MenuUnfoldOutlined,
      // VoMaterialLibrary,
    },
    setup() {
      const router: any = useRoute()

      const $router = useRouter()
      const closeToggle = ref(false)

      // 0 新增  1 模板编辑  2 草稿箱编辑

      fromModel.value = +router.query.from || 0

      const editStatus = ref(0)

      const skuRef = ref()
      const templateData = ref<any>([])
      // categoryId name
      const baseModel = reactive({
        categoryId: '',
        name: '',
      })
      // 创建“发布”数据模型
      const templateModel: any = {
        picture: [] as any[], // 头图
        detailsPicture: [] as any[], // 商品详情图
        serviceConfig: [
          {
            id: 'material',
            key: '售卖物料', //  material
            value: [],
          },
          {
            id: 'OriginMaterialImg',
            key: '售卖物料缩略图', // OriginMaterialImg
            value: [],
          },
          {
            id: 'InstallGuide',
            key: '安装指导', // InstallGuide
            value: [],
          },
          {
            id: 'video',
            key: '安装视频', // video
            value: [],
          },
          {
            id: 'serviceKey',
            key: '7*24小时人工技术支持',
            value: true,
          },
        ],
        status: 0,
        goodsTemplateList: [] as any[],
      }

      // salesLocation: 售卖位置
      const salesLocation = ref<any>()

      // 点击了某个图片区域
      const transType = ref('')
      const brandSelectId = ref<string[]>([])
      // 商品id
      const brandID = ref('')
      // 详情里面的对象
      const draftDetailsData = ref({})
      // 上传视频
      const initID = ref<any>(router.query.categoryId)
      const { createMessage } = useMessage()
      const goodsFrom = reactive<goodFormItem>({
        operateName: '',
        categoryName: '',
        categoryId: '',
        brandSelectOptions: [],
      })
      const brandData = ref([])
      // 类别
      // let categoryName = ref(router.query.categoryName)
      const appStore = useAppStore()
      const current = ref(0)
      const visible = ref(false)
      const target = ref('#basic-list')
      const style = reactive({})
      const menuSetting = appStore.getMenuSetting
      //-----
      // 获取元素的绝对位置坐标（像对于页面左上角）
      const targetHandler = (stepIndex, target) => {
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' })
        current.value = Number(stepIndex)
      }

      //-----
      // const target = ref('')
      const numberValue = ref<number>(3)
      const codeValue = ref<number>(1111)

      watch(
        () => serviceConfig.checkOne,
        (val) => {
          if (!val) {
            material.value = []
            OriginMaterialImg.value = []
          }
        },
      )
      watch(
        () => serviceConfig.checkTwo,
        (val) => {
          if (!val) {
            InstallGuide.value = []
            video.value = []
          }
        },
      )

      /**
       *@desc 提交 草稿箱 以及 发布商品 公共入参 处理
       *@return map
       */
      const handleCommonParamFunc = () => {
        let getGoodsTemplateList = skuRef.value.saveSkuDataFunc()
        templateModel.picture = images.value
        templateModel.detailsPicture = goodsDetails.value
        templateModel.serviceConfig[0]['value'] = material.value
        templateModel.serviceConfig[1]['value'] = OriginMaterialImg.value
        templateModel.serviceConfig[2]['value'] = InstallGuide.value
        templateModel.serviceConfig[3]['value'] = video.value
        templateModel.serviceConfig[4]['value'] = serviceConfig.checkThree
        templateModel.status = 1
        templateModel.goodsTemplateList = getGoodsTemplateList
        if (!priceValidation(getGoodsTemplateList)) {
          return
        }
        const templateContentValue = JSON.stringify({
          templateContentVal: getGoodsTemplateList,
          picture: templateModel.picture,
          detailsPicture: templateModel.detailsPicture,
          serviceConfig: templateModel.serviceConfig,
        })
        return {
          categoryId: goodsFrom.categoryId,
          brandId: brandID.value,
          name: baseModel.name,
          templateContent: templateContentValue,
        }
      }

      // 判断价格下限是否大于价格上线
      const priceValidation = (getGoodsTemplateList) => {
        //  下限priceFloor,上限priceCap,
        if (getGoodsTemplateList.find((item) => item.priceCap == null)) {
          createMessage.error('价格上限不能为空')
          return false
        }
        if (getGoodsTemplateList.find((item) => item.priceFloor == null)) {
          createMessage.error('价格下限不能为空')
          return false
        }
        let data = getGoodsTemplateList.find((item) => item.priceFloor > item.priceCap)
        if (data) {
          createMessage.error('价格下限不能大于价格上限！')
          return false
        }
        return true
      }

      /**
       *@desc 获取商品品牌list
       *@return brandSelectOptions--品牌列表
       */
      const initBrand = async (filterParams = {}) => {
        try {
          const { data } = await adminHttp.goodsBrandList(filterParams)
          goodsFrom.brandSelectOptions = data
        } catch (error) {
          createMessage.error({ content: `操作失败:${error}`, key: 'failed' })
        }
      }

      const specs = ref([])
      /**
       *@desc 获取【新增模板】信息
       *@return 类别+属性及价格区间
       */
      const initTemplateInfo = async () => {
        try {
          const categoryParam = { categoryId: goodsFrom.categoryId }
          const res = await adminHttp.goodsTemplateInfoInit(categoryParam)
          goodsFrom.operateName = res.data.operateName.replaceAll('-', '>')
          baseModel.name = res.data.categoryName
          const { skuProperty, categoryId } = res.data
          goodsFrom.categoryId = categoryId
          specs.value = skuProperty
          getModelData()
          console.log(specs.value, 'specs')
        } catch (error) {
        } finally {
        }
      }

      // 获取型号数据
      const getModelData = async () => {
        try {
          const { code, data } = await adminHttp.GOODS.goodsModelQueryListCatergory({
            categoryId: goodsFrom.categoryId,
          })
          if (code == '20001') {
            let modalData = { name: '型号', id: '0', value: data }
            if (specs.value) {
              specs.value = specs.value && specs.value.filter((item) => item.name != '型号')
              specs.value = [modalData, ...specs.value]
            } else {
              specs.value = [modalData]
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
      /**
       *@desc toDraftDetailsLinkId [去编辑] - 草稿箱
       * @param  { string } == [ID]
       *@return
       */
      const toDraftDetailsLinkId = async () => {
        let ids = router.query.id + ''
        if (!ids) {
          return new Error('id不能为空')
        }
        try {
          const DraftDetailsMap = { id: ids }
          const { data } = await adminHttp.goodsTemplateDraftDetails(DraftDetailsMap)
          draftDetailsData.value = data
          initID.value = data.categoryId
          const templateContent = JSON.parse(data.templateContent)
          console.log(templateContent, 'xx111')
          const { picture, detailsPicture } = templateContent
          if (picture) {
            images.value = picture
          }
          if (detailsPicture) {
            goodsDetails.value = detailsPicture
            console.log(picture, 'picture')
          }
          const materialObj = templateContent.serviceConfig.find((item) => item.key === '售卖物料')
          const OriginMaterialImgObj = templateContent.serviceConfig.find(
            (item) => item.key === '售卖物料缩略图',
          )
          const InstallGuideObj = templateContent.serviceConfig.find(
            (item) => item.key === '安装指导',
          )
          const videoObj = templateContent.serviceConfig.find((item) => item.key === '安装视频')
          const CheckThree = templateContent.serviceConfig.find(
            (item) => item.key === '7*24小时人工技术支持',
          )
          if (CheckThree) {
            serviceConfig.checkThree = CheckThree.value
          }
          if (materialObj) {
            material.value = materialObj.value
          }
          if (OriginMaterialImgObj) {
            OriginMaterialImg.value = OriginMaterialImgObj.value
          }
          console.log(InstallGuideObj, 'InstallGuideObj')
          if (InstallGuideObj) {
            InstallGuide.value = InstallGuideObj.value
            console.log(InstallGuide.value)
          }
          if (videoObj) {
            video.value = videoObj.value
          }
          //
          templateData.value = templateContent.templateContentVal
          console.log(templateContent.templateContentVal, '我是数据')
          goodsFrom.categoryName = router.query.categoryName + ''
          goodsFrom.operateName = data.name
          goodsFrom.categoryId = data.categoryId
          brandSelectId.value = [data.brandId]
          brandID.value = data.brandId
          await initTemplateInfo()
        } catch (error) {
        } finally {
        }
      }
      onMountedOrActivated(async () => {
        material.value = []
        InstallGuide.value = []
        video.value = []
        OriginMaterialImg.value = []
        goodsDetails.value = []
        images.value = []
        // 初始化品牌列表
        await initBrand()
        if (router.query.type === transmitEnum.Add) {
          goodsFrom.categoryName = router.query.categoryName + ''
          goodsFrom.categoryId = router.query.categoryId + ''
          // 初始化规格属性
          await initTemplateInfo()
        } else {
          // 编辑数据
          // initTemplateInfo()
          if (+router.query.from === 1) {
            //  模板详情

            const { data } = await adminHttp.goodsTemplateDetail({
              id: router.query.id,
            })

            editStatus.value = data.status
            initID.value = data.categoryId
            console.log(data, 'dddddddddddddddddddddddddddd')
            goodsFrom.categoryName = data.categoryName
            goodsFrom.operateName = data.operateName
            goodsFrom.categoryId = data.categoryId
            brandSelectId.value = [data.brandId]
            brandID.value = data.brandId
            // brandID.value = router.query.brandId
            // specs.value = data.skuProperty
            // alert(2)

            // 模板-构建回显数据
            templateData.value = [
              {
                name: data.name,
                // oeCodes: data.oeId,
                paramProperties: data.paramsProperty,
                priceCap: data.priceCap,
                priceFloor: data.priceFloor,
                templateSkus: data.skuProperty,
                profitShare: data.profitSharing,
                // vehicleModelBOS: data.vehicleIds,
              },
            ]

            const { picture, detailsPicture, serviceConfiguration } = data
            if (picture) {
              images.value = picture
              console.log(images.value, 'picture')
            }
            if (detailsPicture) {
              goodsDetails.value = detailsPicture
            }
            // 构建回显服务信息

            const materialObj = serviceConfiguration.find((item) => item.key === '售卖物料')
            const OriginMaterialImgObj = serviceConfiguration.find(
              (item) => item.key === '售卖物料缩略图',
            )
            const InstallGuideObj = serviceConfiguration.find((item) => item.key === '安装指导')
            const videoObj = serviceConfiguration.find((item) => item.key === '安装视频')
            const CheckThree = serviceConfiguration.find(
              (item) => item.key === '7*24小时人工技术支持',
            )
            if (CheckThree) {
              serviceConfig.checkThree = !!+CheckThree.value
            }
            if (materialObj) {
              materialObj.value = JSON.parse(materialObj.value)
              material.value = materialObj.value
              console.log(material.value)
            }

            if (OriginMaterialImgObj) {
              console.log(OriginMaterialImgObj, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
              OriginMaterialImg.value = JSON.parse(OriginMaterialImgObj.value)
            }
            if (InstallGuideObj) {
              InstallGuide.value = JSON.parse(InstallGuideObj.value)
            }
            if (videoObj) {
              console.log(videoObj)
              video.value = JSON.parse(videoObj.value)
            }

            await initTemplateInfo()
          } else if (+router.query.from === 2) {
            // 草稿箱进入 -详情页面
            await toDraftDetailsLinkId()
          }
        }
      })

      //以上售后支持
      const benefitVisible = ref(false)
      const parameterVisible = ref(false)
      const openFen = () => {
        benefitVisible.value = true
      }
      const openPg = () => {
        parameterVisible.value = true
      }
      const state = reactive({
        value1: [],
      })
      //内容
      const content = reactive({ caseContent })

      interface formValue {
        goodsClassfy: string[]
        initClassfy: string
      }

      const formState = reactive<formValue>({
        goodsClassfy: [],
        initClassfy: '机油>润滑油',
      })
      const choiceInitClassfy = () => {
        formState.goodsClassfy = ['machine-oil', 'runhua-oil']
      }
      const aChecked = ref<boolean>(false)
      //按钮 保存草稿箱
      const saveExit = async () => {
        try {
          if (router.query.edit) {
            const storeDraftMap = {
              ...handleCommonParamFunc(),
              id: router.query.id,
            }
            const { code } = await adminHttp.goodsTemplateDraftUpdate(storeDraftMap)
            if (code == '20001') {
              createMessage.success('保存草稿成功')
              $router.push({
                path: '/goodsManage/goodsTemplate/draftBox',
              })
            }
          } else {
            const storeDraftMap = handleCommonParamFunc()
            // return
            const { code } = await adminHttp.goodsTemplateDraftSave(storeDraftMap)
            if (code == '20001') {
              createMessage.success('保存草稿成功')
              $router.push({
                path: '/goodsManage/goodsTemplate/draftBox',
              })
            }
          }
        } catch (err: any) {
          createMessage.error('操作失败===' + err)
        }
      }
      const saveReleased = async () => {
        let getGoodsTemplateListss = skuRef.value.saveSkuDataFunc()
        if (!priceValidation(getGoodsTemplateListss)) {
          return
        }
        const categoryId = router.query.categoryId || initID.value
        templateModel.serviceConfig[0]['value'] = JSON.stringify(material.value)
        templateModel.serviceConfig[1]['value'] = JSON.stringify(OriginMaterialImg.value)
        templateModel.serviceConfig[2]['value'] = JSON.stringify(InstallGuide.value)
        templateModel.serviceConfig[3]['value'] = JSON.stringify(video.value)
        templateModel.serviceConfig[4]['value'] = serviceConfig.checkThree ? 1 : 0
        const maps = {
          categoryId: categoryId,
          brandId: brandID.value,
          name: goodsFrom.categoryName,
          picture: images.value,
          detailsPicture: goodsDetails.value,
          serviceConfig: templateModel.serviceConfig,
          status: 0,
          goodsTemplateList: getGoodsTemplateListss,
        }
        console.log(brandID.value)

        try {
          const { code } = await adminHttp.goodsTemplateSave(maps)
          if (code == '20001') {
            createMessage.success('保存待发布成功')
            $router.push({
              path: '/goodsManage/goodsTemplate/goodsCase',
            })
          } else {
            // createMessage.error('保存失败')
          }
        } catch (e) {
          message.error(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      }
      const release = async () => {
        console.log(material.value)
        let getGoodsTemplateListss = skuRef.value.saveSkuDataFunc()
        if (!priceValidation(getGoodsTemplateListss)) {
          return
        }
        const categoryId = router.query.categoryId || initID.value
        templateModel.serviceConfig[0]['value'] = JSON.stringify(material.value)
        templateModel.serviceConfig[1]['value'] = JSON.stringify(OriginMaterialImg.value)
        templateModel.serviceConfig[2]['value'] = JSON.stringify(InstallGuide.value)
        templateModel.serviceConfig[3]['value'] = JSON.stringify(video.value)
        templateModel.serviceConfig[4]['value'] = serviceConfig.checkThree ? 1 : 0
        const maps = {
          categoryId: categoryId,
          brandId: brandID.value,
          name: goodsFrom.categoryName,
          picture: images.value,
          detailsPicture: goodsDetails.value,
          serviceConfig: templateModel.serviceConfig,
          status: 1,
          goodsTemplateList: getGoodsTemplateListss,
        }
        if (!categoryId) {
          return new Error('类别id为空')
        }

        try {
          const { code } = await adminHttp.goodsTemplateSave(maps)
          if (code == '20001') {
            createMessage.success('发布成功')
            $router.push({
              path: '/goodsManage/goodsTemplate/goodsCase',
            })
          }
        } catch (err: any) {
          createMessage.error(err.message)
        }
      }

      // 获取 brandId
      const getBrandId = (item) => {
        if (item) {
          console.log(item)
          const brandId = item
          brandID.value = brandId
        } else {
          brandID.value = ''
        }
      }
      // 商品平台搜索
      const brandfilterOption = (input: string, option: any) => {
        return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }

      // 模板的保存
      const saveHandler = async () => {
        let getGoodsTemplateListss = skuRef.value.saveSkuDataFunc()
        if (!priceValidation(getGoodsTemplateListss)) {
          return
        }
        const categoryId = router.query.categoryId || initID.value
        templateModel.serviceConfig[0]['value'] = JSON.stringify(material.value)
        templateModel.serviceConfig[1]['value'] = JSON.stringify(OriginMaterialImg.value)
        templateModel.serviceConfig[2]['value'] = JSON.stringify(InstallGuide.value)
        templateModel.serviceConfig[3]['value'] = JSON.stringify(video.value)
        templateModel.serviceConfig[4]['value'] = serviceConfig.checkThree ? 1 : 0
        const result = getGoodsTemplateListss[0]
        console.log(result)
        const maps = {
          categoryId: categoryId,
          brandId: brandID.value,
          modelId: result.modelId,
          name: result.name,
          // oeCodes: result.oeCodes,
          pramProperties: result.pramProperties || [],
          priceCap: result.priceCap,
          priceFloor: result.priceFloor,
          profitShare: result.profitShare || [],
          serviceConfig: templateModel.serviceConfig,
          templateSkus: result.templateSkus,
          // vehicleModelBOS: result.vehicleModelBOS,
          picture: images.value,
          detailsPicture: goodsDetails.value,
          status: editStatus.value ? editStatus.value : 0,
        }
        try {
          const { code } = await adminHttp.goodsTemplateUpdate({
            ...maps,
            id: router.query.id,
          })
          if (code == '20001') {
            createMessage.success('保存待发布成功')
            $router.push({
              path: '/goodsManage/goodsTemplate/goodsCase',
            })
          } else {
            // createMessage.error('保存失败')
          }
        } catch (e) {
          createMessage.error(e.message)
        }
      }

      // 模板的修改并发布
      const releaseHandler = async () => {
        let getGoodsTemplateListss = skuRef.value.saveSkuDataFunc()
        if (!priceValidation(getGoodsTemplateListss)) {
          return
        }
        templateModel.serviceConfig[0]['value'] = JSON.stringify(material.value)
        templateModel.serviceConfig[1]['value'] = JSON.stringify(OriginMaterialImg.value)
        templateModel.serviceConfig[2]['value'] = JSON.stringify(InstallGuide.value)
        templateModel.serviceConfig[3]['value'] = JSON.stringify(video.value)
        templateModel.serviceConfig[4]['value'] = serviceConfig.checkThree ? 1 : 0
        const categoryIds = router.query.categoryId || initID.value
        if (!categoryIds) {
          return new Error('类别id为空')
        }
        const result = getGoodsTemplateListss[0]
        const maps = {
          categoryId: initID.value,
          brandId: brandID.value,
          modelId: result.modelId,
          name: result.name,
          // oeCodes: result.oeCodes,
          pramProperties: result.pramProperties || [],
          priceCap: result.priceCap,
          priceFloor: result.priceFloor,
          profitShare: result.profitShare || [],
          serviceConfig: templateModel.serviceConfig,
          templateSkus: result.templateSkus,
          // vehicleModelBOS: result.vehicleModelBOS,
          picture: images.value,
          detailsPicture: goodsDetails.value,
          status: 1,
        }
        try {
          const { code } = await adminHttp.goodsTemplateUpdate({
            ...maps,
            id: router.query.id,
          })
          if (code == '20001') {
            createMessage.success('发布成功')
            $router.push({
              path: '/goodsManage/goodsTemplate/goodsCase',
            })
          } else {
            createMessage.error('发布失败')
          }
        } catch (e) {
          createMessage.error(e.message)
        }
      }

      const backHandler = () => {
        $router.back()
      }
      // 回到顶部
      const container = ref()
      const getBackTop = () => {
        console.log(container.value)
        return container.value
      }

      // 编辑商品类别
      const goEidtCategory = () => {
        Modal.confirm({
          title: '提示',
          icon: createVNode(ExclamationCircleOutlined),
          content: '修改后当前页信息将会被清空',
          okText: '确认',
          cancelText: '取消',
          async onOk() {
            backHandler()
          },
          onCancel() {
            Modal.destroyAll()
          },
        })
      }

      return {
        closeToggle,
        releaseHandler,
        saveHandler,
        backHandler,
        editStatus,
        fromModel,
        templateData,
        specs,
        ...toRefs(goodsFrom),
        handleCommonParamFunc,
        saveExit,
        saveReleased,
        release,
        targetHandler,
        initID,
        skuRef,
        visible,
        menuSetting,
        style,
        //-----
        target,
        aChecked,
        numberValue,
        codeValue,
        checked: ref(true),
        parameterVisible,
        benefitVisible,
        goodsDetails,
        images,
        material,
        OriginMaterialImg,
        InstallGuide,
        video,
        openPg,
        ...toRefs(state),
        ...toRefs(content),
        serviceConfig,
        current,
        formState,
        choiceInitClassfy,
        baseModel,
        draftContent,
        templateModel,
        openFen,
        brandData,
        brandSelectId,
        getBrandId,
        brandfilterOption,
        brandID, // 商品ID
        draftDetailsData, // 草稿箱详情页面
        transType,
        salesLocation,
        container,
        getBackTop,
        goEidtCategory,
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
  .section {
    //border: 1px solid #e7e7e7;
    margin-bottom: 15px;
    //border-radius: 2px;
    &-title {
      padding: 10px;
      font-size: 18px;
      font-weight: bold;
      border-bottom: 1px solid #e7e7e7;
    }

    &-mtitle {
      padding: 10px 0;
      font-size: 14px;
      font-weight: bold;
    }

    &-content {
      padding: 10px;
      background: #fff;
    }
  }

  .text-upload {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #8c8c8c;
  }

  .page-wrap {
    border-radius: 4px;
    display: flex;
    margin: 24px;
    height: calc(100vh - 162px);

    .page-left {
      background: #fff;
      padding: 24px;
      display: flex;
      justify-content: center;
      transition: all 0.3s;
      overflow: hidden;

      &.toggle {
        display: none;
      }

      ::v-deep .ant-steps-item-icon {
        width: 21px;
        height: 22px;
        line-height: 22px;
        margin-left: 5px;
        margin-top: 5px;
        font-size: 14px;
        font-weight: 400;
      }

      ::v-deep .ant-steps-item-description {
        .step-title {
          font-size: 14px;
          font-weight: 700;
        }
      }

      &-container {
        transition: all 0.3s;
        width: 200px;
      }

      //position: fixed;
      //left: 230px;
      //top: 250px;
      //z-index: 99;
      &.toggle {
        left: 70px;
      }

      .step-title {
        font-size: 16px;
        font-weight: 800;
        margin-top: 10px;
        padding-right: 0;
      }
    }

    .page-right {
      background: #fff;
      flex: 1;
      padding: 24px;
      border-left: 1px solid #ebebeb;
      //position: relative;
      //padding-left: 230px;
      //border-left: 1px solid #e7e7e7;

      overflow-y: scroll;

      .basic {
        & {
          //margin-top: 15px;
          //border: 1px solid #e7e7e7;
          // background: #ff6400;
          //&--title {
          //  padding: 10px;
          //  font-size: 18px;
          //  //font-weight: bold;
          //  //background: #c1c1c1;
          //  border-bottom: 1px solid #e7e7e7;
          //}
          //&-content {
          //  padding: 10px;
          //  background: #fff;
          //}
        }
      }

      .price {
        & {
          //margin-top: 15px;
          //border: 1px solid #c1c1c1;
          &--title {
            //padding: 10px;
            //font-size: 24px;
            //font-weight: bold;
            //background: #c1c1c1;
            //border-bottom: 1px solid #c1c1c1;
          }

          &-content {
            //padding: 10px;
            //// height: 200px;
            //background: #fff;
            &-model {
            }

            &-check {
              display: flex;
              align-items: center;
              padding-left: 10px;
              background-color: #f9fafc;
              margin-top: 10px;
            }

            &-title {
              color: #999999;
            }

            &-choose {
              padding-left: 42px;
            }
          }

          &-interval {
            padding: 10px;
            background: #fff;

            &--title {
              font-size: 16px;
              font-weight: 600px;
              padding: 10px;
            }
          }
        }
      }

      .sales {
        //margin-top: 15px;
        //border: 1px solid #c1c1c1;
        &--title {
          //padding: 10px;
          //font-size: 24px;
          //font-weight: bold;
          //background: #c1c1c1;
          //border-bottom: 1px solid #c1c1c1;
        }

        &-content {
          //background: #fff;
          //padding: 10px;
          &-upload {
            margin: 10px 0;
            width: 150px;
            height: 170px;
            border: 1px solid #e4e4e4;
            margin-right: 20px;
            cursor: pointer;
            position: relative;

            .plus-icon {
              position: absolute;
              left: 55px;
              top: 40px;
              font-size: 35px;
              color: #8d8a8a;
            }

            .plus-text {
              position: absolute;
              font-size: 16px;
              margin-top: 5px;
              color: #666;
              left: 40px;
              top: 80px;
            }
          }

          &-materials {
            margin: 10px 0;
            width: 150px;
            height: 170px;
            border: 1px solid #e4e4e4;
            margin-right: 20px;
            cursor: pointer;
            position: relative;

            .materials-icon {
              position: absolute;
              left: 55px;
              top: 40px;
              font-size: 35px;
              color: #8d8a8a;
            }

            .materials-text {
              position: absolute;
              font-size: 16px;
              margin-top: 5px;
              color: #666;
              left: 40px;
              top: 80px;
            }
          }

          .tutorial {
            &-group {
              padding: 20px 0;
            }

            &-quality {
              display: flex;

              &-item {
                margin-right: 20px;
              }
            }
          }

          .code {
            display: flex;
            padding: 15px 0;

            &-item {
              margin-right: 10px;
            }
          }
        }
      }

      .figure {
        //margin-top: 15px;
        //border: 1px solid #c1c1c1;
        &--title {
          //padding: 10px;
          //font-size: 24px;
          //font-weight: bold;
          //background: #c1c1c1;
          //border-bottom: 1px solid #c1c1c1;
        }

        &-content {
          //background: #fff;
          //padding: 10px;
          &-header {
            margin-bottom: 20px;
          }

          &-text {
            color: #9d9d9d;
          }
        }
      }

      .situation {
        //margin-top: 15px;
        //border: 1px solid #c1c1c1;
        &--title {
          //padding: 10px;
          //font-size: 24px;
          //font-weight: bold;
          //background: #c1c1c1;
          //border-bottom: 1px solid #c1c1c1;
        }

        &-content {
          //background: #fff;
          //padding: 10px;
        }
      }

      .edit-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 240px;

        .btn-item {
          //width: 250px;
          //margin-left: 30px;
        }
      }
    }
  }

  ::v-deep(.ant-steps-item-title) {
    padding-right: 0;
  }

  .text-danger {
    color: #ff4d4f;
    margin-right: 3px;
  }
</style>
