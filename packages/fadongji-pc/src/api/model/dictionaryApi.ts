import adminHttp from '/@/utils/http/adminHttp'

//-----通用的参数-----
export const getColumnsOptiosFunc = () => {
  return new Promise((resolve) => {
    adminHttp.COMMUNITY.communityColumnCondition({ pageSize: 999999 })
      .then((res) => {
        //businessType: 2/v1/goods/category/list
        // columnCode: "C000001"
        // columnName: "栏目111"
        resolve(
          res.data.records.map((item) => ({
            label: item.columnName,
            value: item.id,
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

export const getCategoryOptiosFunc = () => {
  return new Promise((resolve) => {
    adminHttp
      .goodsCategoryList({ pageSize: 999999 })
      .then((res) => {
        //id: '124582557818945540', name: '空调系统', parentId: '0', hierarchy: '1', sort: 6
        resolve(
          res.data.records.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}
//商品类别
export const getCategoryFunc = () => {
  return new Promise((resolve) => {
    adminHttp
      .goodsCategoryList({ pageSize: 999999 })
      .then((res) => {
        resolve(
          res.data.records.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

//商品类别
export const getCategoryAllFunc = () => {
  return new Promise((resolve) => {
    adminHttp
      .goodsCategoryCategorySelect({ name: '' })
      .then((res) => {
        //id: '124582557818945540', name: '空调系统', parentId: '0', hierarchy: '1', sort: 6/v1/goods/category/lists
        resolve(
          res.data.map((item) => ({
            label: item.name,
            value: item.id,
            selectable: item.children.length > 0 ? false : true,
            children: item.children.map((l) => {
              return {
                label: l.name,
                value: l.id,
              }
            }),
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

//商品品牌
export const getBrandFunc = (name = '') => {
  return new Promise((resolve) => {
    adminHttp
      .goodsBranchQueryList({ pageSize: 999999, name })
      .then((res) => {
        //id: '124582557818945540', name: '空调系统', parentId: '0', hierarchy: '1', sort: 6/goods/brand/query/list

        resolve(
          res.data.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

// 获取省市县数据
export const AreaDataApi = () => {
  return new Promise((resolve) => {
    adminHttp
      .sixHotAreaTree()
      .then((res) => {
        resolve(res.data)
      })
      .catch(() => {
        resolve([])
      })
  })
}

// 获取平台身份  userInfoPlatformCode
export const getPlatformCode = async () => {
  return new Promise((resolve) => {
    adminHttp.USER.userInfoPlatformCode()
      .then((res) => {
        resolve(res.data)
      })
      .catch(() => {
        resolve([])
      })
  })
}

// 获取商家--商品
export const getGoodsSellerData = (name) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.GOODS.goodsGoodsShop({
      name,
    })
    resolve(
      data.map((item) => {
        return {
          value: item.id,
          label: item.storeName,
        }
      }),
    )
  })
}
// 获取商家--供应商商品
export const getGoodsSupplierData = (name) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.GOODS.goodsGoodsShop({
      name, role: 1
    })
    resolve(
      data.map((item) => {
        return {
          value: item.id,
          label: item.storeName,
        }
      }),
    )
  })
}
// 获取商家--服务商商品
export const getGoodsServiceData = (name) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.GOODS.goodsGoodsShop({
      name, role: 2
    })
    resolve(
      data.map((item) => {
        return {
          value: item.id,
          label: item.storeName,
        }
      }),
    )
  })
}

// 获取商家--项目
export const getInvestmentSellerData = (name) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.GOODS.goodsInvestmentShop({
      name: name,
    })
    resolve(
      data.map((item) => {
        return {
          value: item.id,
          label: item.storeName,
        }
      }),
    )
  })
}
// 获取商品提交人 goodsGoodsSubmitter
export const getGoodsGoodsSubmitter = (name) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.GOODS.goodsGoodsSubmitter({
      name: name,
      status: [2],
      violationStatus: [3],
    })
    resolve(
      data.map((item) => {
        return {
          value: item.id,
          label: item.nickName,
        }
      }),
    )
  })
}
// 获取项目提交人 goodsInvestmentSubmitter
export const getGoodsInvestmentSubmitter = (name) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.GOODS.goodsInvestmentSubmitter({
      name: name,
    })
    resolve(
      data.map((item) => {
        return {
          value: item.id,
          label: item.nickName,
        }
      }),
    )
  })
}
//订单仓库v1/order/house/company/ids
export const getOrderFunc = (code) => {
  return new Promise((resolve) => {
    adminHttp.Order.orderHouseCompanyIds(code)
      .then((res) => {
        const ceshi = []
        res.data.map((item) =>
          ceshi.push({
            label: item.warehouseName,
            value: item.warehouseId,
          }),
        ),
          resolve(ceshi)
      })
      .catch(() => {
        resolve([])
      })
  })
}

// 公司角色列表customerRoleCompany
export const getCustomerRoleCompany = async (id) => {
  console.log(id)
  return await adminHttp.CUSTOMER.customerRoleCompany(id)
}

// 修理厂服务项目
export const getcompanyInfoServiceProject = async () => {
  return await adminHttp.COMPANY.companyInfoServiceProject()
}

// 修理厂车系 companyInfoCarSeries
export const getcompanyInfoCarSeries = async () => {
  return await adminHttp.COMPANY.companyInfoCarSeries()
}


export const timeSelectOptions = [
  {
    label: '8:00~10:00',
    value: '08:00:00~10:00:00',
  },
  {
    label: '10:00~12:00',
    value: '10:00:00~12:00:00',
  },
  {
    label: '12:00~14:00',
    value: '12:00:00~14:00:00',
  },
  {
    label: '14:00~16:00',
    value: '14:00:00~16:00:00',
  },
  {
    label: '16:00~18:00',
    value: '16:00:00~18:00:00',
  },
  {
    label: '18:00~20:00',
    value: '18:00:00~20:00:00',
  },
]
