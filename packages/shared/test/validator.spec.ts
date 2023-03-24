import { Validator } from '../src/index'
import { isArray } from '../src/utils/utils'

test('检测校验器-输出false', () => {
  const va = new Validator({
    source: { name: 'xx', count: '23' },
    rule: {
      name: {
        type: 'string',
        required: true,
        message: '输入错误',
      },
      count: {
        type: 'number',
        required: true,
        message: '输入错误',
      },
    },
    mul: false,
  })
  va.validate((valid: any, fields: any) => {
    expect(valid).toBeFalsy()
  })
})

test('检测校验器-输出true', () => {
  const va = new Validator({
    source: { name: 'name', count: 115 },
    rule: {
      name: {
        type: 'string',
        required: true,
        message: '输入错误',
      },
      count: {
        type: 'number',
        required: true,
        message: '输入错误',
      },
    },
    mul: false,
  })
  va.validate((valid: any, fields: any) => {
    expect(valid).toBeTruthy()
    expect(isArray(fields)).toBeTruthy()
  })
})

test('检测校验器-输出true', () => {
  const va = new Validator({
    source: { name: 'name', count: '115' },
    rule: {
      name: {
        type: 'string',
        required: true,
        message: '输入错误',
      },
      count: {
        type: 'number',
        required: true,
        message: '输入错误',
      },
    },
    mul: true,
  })
  va.validate((valid: any, fields: any) => {
    expect(valid).toBeTruthy()
    expect(isArray(fields)).toBeTruthy()
  })
})

// source need an object
test('检测校验器-source格式出错', () => {
  expect(
    () =>
      new Validator({
        source: [],
        rule: {
          name: {
            type: 'string',
            required: true,
            message: '输入错误',
          },
          count: {
            type: 'number',
            required: true,
            message: '输入错误',
          },
        },
        mul: false,
      })
  ).toThrow('source need an object')
})

// rule need an object
test('检测校验器-rule格式出错', () => {
  expect(
    () =>
      new Validator({
        source: {},
        rule: [],
        mul: false,
      })
  ).toThrow('rule need an object')
})
