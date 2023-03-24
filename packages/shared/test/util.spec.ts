import { VoUtils } from '../src/index'

test('判断一个值是否是数组', () => {
  expect(VoUtils.isArray({ test: 1 })).not.toBeTruthy()
  expect(VoUtils.isFalse([1, 2, 3])).toBeFalsy()
})

test('null', () => {
  const n = null
  expect(n).toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeUndefined()
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
})

test('zero', () => {
  const z = 0
  expect(z).not.toBeNull()
  expect(z).toBeDefined()
  expect(z).not.toBeUndefined()
  expect(z).not.toBeTruthy()
  expect(z).toBeFalsy()
})
