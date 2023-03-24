import { VoUtils } from '../src/index'

test('检测一个对象是否为空', () => {
  const a = 0
  expect(VoUtils.checkIsEmpty(a)).toBeTruthy()
})

test('把字符串转为数字', () => {
  const test = '123'
  expect(VoUtils.toNumber(test)).toBe(123)
})

test('判断当前实例是否是 Promise 对象', () => {
  const test = new Promise(() => {})
  expect(VoUtils.isPromise(test)).toBeTruthy()
})

test('获取值得原始类型字符串原始类型 `String` `Number` `Array` `Null` `RegExp` `Undefined` `Boolean` `Object` `Function` `Symbol`', () => {
  const test = 'asfasdf'
  expect(VoUtils.toRawType(test)).toBe('String')
})

test('判断当前对象是否是正则实例化对象', () => {
  const test = new RegExp('/test/')
  expect(VoUtils.isRegExp(test)).toBeTruthy()
})

test('判断当前实例是否是 Promise 对象', () => {
  const test = new Promise(() => {})
  expect(VoUtils.isPromise(test)).toBeTruthy()
})

test('判断变量是否 非 undefined', () => {
  const test = 'xxx'
  expect(VoUtils.isUndef(test)).toBeFalsy()
  const test2 = undefined
  expect(VoUtils.isUndef(test2)).toBeTruthy()
})

test('判断变量是否 是 undefined', () => {
  const test = 'xxx'
  expect(VoUtils.isDef(test)).toBeTruthy()
  const test2 = undefined
  expect(VoUtils.isDef(test2)).toBeFalsy()
})

test('判断变量是否是 假值', () => {
  const test = true
  expect(VoUtils.isTrue(test)).toBeTruthy()
})

test('判断变量是否是 假值', () => {
  const test = false
  expect(VoUtils.isFalse(test)).toBeTruthy()
})
