import { VoUtils } from '../src/index'

test('转换时间戳格式的时间格式', () => {
  const timestamp = 1648098884
  expect(VoUtils.timeFormat(timestamp)).toBe('2022-03-24')
  expect(VoUtils.timeFormat('1648098884')).toBe('2022-03-24')
  expect(VoUtils.timeFormat('16480988844444')).toBe('2492-04-05')
  expect(VoUtils.timeFormat('2019/12/22')).toBe('2019-12-22')

  expect(VoUtils.timeFormat(null)).toBe(VoUtils.getNowFormatDate())
})

test('格式转换', () => {
  const timestamp = (new Date().getTime() / 1000).toFixed(0)
  expect(VoUtils.timeTransfer(timestamp)).toBe('刚刚')
  expect(VoUtils.timeTransfer(null)).toBe('刚刚')
  const time = new Date().getTime() / 1000
  expect(VoUtils.timeTransfer(time - 1005)).toBe('16分钟前')
  expect(VoUtils.timeTransfer('1648446317')).toBe('1小时前')
  expect(VoUtils.timeTransfer('1624863410')).toBe('2021-06-28')
  expect(VoUtils.timeTransfer('1648359917')).toBe('1天前')
  expect(VoUtils.timeTransfer('1645940717')).toBe('29天前')
  expect(VoUtils.timeTransfer('1582782317')).toBe('2020')
  expect(VoUtils.timeTransfer('1582782317', false)).toBe('2年前')
  expect(VoUtils.getNowFormatDate()).toBe(VoUtils.getNowFormatDate())
})
