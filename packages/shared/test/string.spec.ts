import { VoUtils } from '../src/index'

test('把一个变量转为字符串', () => {
  const a = 123456
  expect(VoUtils.toString(a)).toBe('123456')
  const b = [1, 2, 3]
  expect(VoUtils.toString(b)).toBe(JSON.stringify(b, null, 2))
})
