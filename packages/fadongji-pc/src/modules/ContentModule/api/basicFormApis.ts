import adminHttp from '/@/utils/http/adminHttp'

export const getStorageData = (name) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.WAREHOUSE.warehouseListAll({
      name,
    })
    resolve(
      data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        }
      }),
    )
  })
}

export const getSellerData = (name) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.COMPANY.companyInfoManageList({
      storeName: name,
      platformCode: ['agent', 'supplier'],
    })
    resolve(
      data.map((item) => {
        return {
          value: item.companyId,
          label: item.storeName,
        }
      }),
    )
  })
}

export const getAgentData = (name) => {
  return new Promise(async (resolve) => {
    const { data } = await adminHttp.COMPANY.companyInfoManageList({
      storeName: name,
      platformCodeList: ['agent'],
    })
    resolve(
      data.map((item) => {
        return {
          value: item.companyId,
          label: item.storeName,
        }
      }),
    )
  })
}

export const getColumnsOptiosFunc = () => {
  return new Promise((resolve) => {
    adminHttp.COMMUNITY.communityColumnCondition({ pageSize: 999999, isEnable: 0, businessType: 1 })
      .then((res) => {
        //businessType: 2/v1/goods/category/list /v1/community/column/condition
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
export const getColumnsVideoFunc = () => {
  return new Promise((resolve) => {
    adminHttp.COMMUNITY.communityColumnCondition({ pageSize: 999999, isEnable: 0, businessType: 2 })
      .then((res) => {
        //businessType: 2/v1/goods/category/list /v1/community/column/condition
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

// 获取用户投诉类型
export const getUserInfoComplaintDic = () => {
  return new Promise((resolve) => {
    adminHttp.USER.userInfoComplaintDic()
      .then((res) => {
        resolve(
          res.data.map((item) => ({
            label: item.name,
            value: item.code,
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
        //id: '124582557818945540', name: '空调系统', parentId: '0', hierarchy: '1', sort: 6/v1/goods/category/lists
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
        resolve(
          res.data.map((item) => ({
            label: item.name,
            value: item.id,
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
//商品类型1
// export const getTypeAllFunc = () => {
//   return new Promise((resolve) => {
//     adminHttp
//       .goodsTypeStatusList({ pageSize: 999, pageNo: 1 })
//       .then((res) => {
//         resolve(
//           res.data.records.map((item) => ({
//             label: item.categoryName,
//             value: item.categoryId,
//             children: item.children ? item.children.map((val) => {
//               return {
//                 label: val.categoryName,
//                 value: val.categoryId,
//               }
//             }) : [],
//           })),
//         )
//       })
//       .catch(() => {
//         resolve([])
//       })
//   })
// }
export const getTypeAllFunc = () => {
  return new Promise((resolve) => {
    adminHttp
      .goodsTypeStatusList({ pageSize: 999, pageNo: 1 })
      .then((res) => {
        let list = []
        res.data.records.forEach((item) => {
          if (item.children) {
            item.children.map((l) => {
              if (l.categoryId === "1000000001") {
                list = l.prodTypeList || []
              }
            })
          }
        })
        resolve(
          list.map((item) => {
            return {
              label: item,
              value: item,
            }
          }),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

//商品类型
export const getGoodsTypeFunc = (id) => {
  return new Promise((resolve) => {
    adminHttp
      .goodsTypeStatusList({ pageSize: 999999, pageNo: 1 })
      .then((res) => {
        let list = []
        res.data.records.forEach((item) => {
          if (item.children) {
            item.children.map((l) => {
              if (l.categoryId === id) {
                list = l.prodTypeList || []
              }
            })
          }
        })
        resolve(
          list.map((item) => {
            return {
              label: item,
              value: item,
            }
          }),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

//商品品牌
export const getBrandFunc = () => {
  return new Promise((resolve) => {
    adminHttp
      .goodsBranchQueryList({ pageSize: 9999 })
      .then((res) => {
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
//商品品号
export const getItemFunc = () => {
  return new Promise((resolve) => {
    adminHttp
      .goodsDistributionArticlNumber({ pageSize: 999 })
      .then((res) => {
        resolve(
          res.data.map(item => {
            const key = Object.keys(item)[0]
            const val = Object.values(item)[0]
            return {
              label: key,
              value: val,
            }
          }),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

//仓库调入
export const getHousePageFunc = () => {
  return new Promise((resolve) => {
    adminHttp.WAREHOUSE.warehousePlat({
      pageSize: 999999,
      type: 0,
      status: 1,
    })
      .then((res) => {
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

//省市区
export const getCityFunc = () => {
  return new Promise((resolve) => {
    adminHttp
      .sixHotAreaTree()
      .then((res) => {
        console.log('省市区======++=', res)
        // resolve(
        //   res.data.records.map((item) => ({
        //     label: item.name,
        //     value: item.code,
        //     children: item.children,
        //   })),
        // )
      })
      .catch(() => {
        resolve([])
      })
  })
}

/**
 * ("agent", "服务商"),
 * ("supplier", "供应商"),
 * ("garage", "修理厂"),
 * ("channelManager", "渠道经理"),
 * ("op", "运营平台"),
 * ("investmentManager", "招商经理"),
 * ("skilledWorker", "集师傅"),
 * ("recycling", "回收公司"),
 * ("oldMachine", "旧机买家");
 */
// 获取卖家
export const getSellerList = (data) => {
  return adminHttp.COMPANY.companyInfoManageList(data)
}
export const getStorageList = (data) => {
  return adminHttp.WAREHOUSE.warehouseListAll(data)
}

// 获取平台角色 userInfoPlatformCode

export const getPlatformCode = async () => {
  return await adminHttp.USER.userInfoPlatformCode()
}

// 获取员工角色
export const getCustomerRoleCompany = async () => {
  return await adminHttp.apiRoleCompany()
}
//想法栏目
export const getColumnsOIdeaFunc = () => {
  return new Promise((resolve) => {
    adminHttp.COMMUNITY.communityColumnCondition({ pageSize: 999999, isEnable: 0, businessType: 1 })
      .then((res) => {
        //businessType: 2/v1/goods/category/list /v1/community/column/condition
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
//型号
export const getModelQueryFunc = () => {
  return new Promise((resolve) => {
    adminHttp.GOODS.goodsModelSelectList({ pageSize: 999999 })
      .then((res) => {
        resolve(
          res.data.map((item) => ({
            label: item.model,
            value: item.id,
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}

//商品评价的用户昵称
export const getCompanyInfoFunc = (value) => {
  return new Promise((resolve) => {
    adminHttp.CUSTOMER.companyInfoSelectAllPage({
      platformCode: 'garage',
      nickName: value,
      pageSize: 999999,
    })
      .then((res) => {
        resolve(
          res.data.records.map((item) => ({
            label: item.nickName,
            value: item.userId,
          })),
        )
      })
      .catch(() => {
        resolve([])
      })
  })
}
