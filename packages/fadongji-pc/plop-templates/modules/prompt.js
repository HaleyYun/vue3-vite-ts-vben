const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate module',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: '请输入模块名称',
      validate: notEmpty('name'),
    },
  ],
  actions: () => {
    const name = '{{name}}'
    const actions = [
      // 根据模板文件生成api文件夹和对应的文件
      {
        type: 'add',
        path: `src/modules/${name}/api/index.ts`,
        templateFile: `plop-templates/modules/api/index.hbs`,
        data: {
          name: name,
        },
      },
      // 根据模板文件生成component文件夹
      {
        type: 'add',
        path: `src/modules/${name}/component/index.ts`,
        templateFile: `plop-templates/modules/component/index.hbs`,
        data: {
          name: name,
        },
      },
      // 根据模板文件生成mock文件夹和对应的文件
      {
        type: 'add',
        path: `src/modules/${name}/mock/index.ts`,
        templateFile: `plop-templates/modules/mock/index.hbs`,
        data: {
          name: name,
        },
      },
      // 根据模板文件生成tests文件夹和对应的文件
      {
        type: 'add',
        path: `src/modules/${name}/test/index.ts`,
        templateFile: `plop-templates/modules/tests/index.hbs`,
        data: {
          name: name,
        },
      },
      // 根据模板文件生成views文件夹和对应的文件
      {
        type: 'add',
        path: `src/modules/${name}/view/index.vue`,
        templateFile: `plop-templates/modules/views/index.hbs`,
        data: {
          name: name,
        },
      },
    ]
    return actions
  },
}
