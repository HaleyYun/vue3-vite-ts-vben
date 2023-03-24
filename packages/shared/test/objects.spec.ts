import { VoUtils } from '../src/index'

test('判断一个对象里面是否包含某个key值', () => {
  const a = {
    age: '12',
    name: 'zhangsan',
  }
  expect(VoUtils.hasOwn(a, 'age')).toBeTruthy()
})
