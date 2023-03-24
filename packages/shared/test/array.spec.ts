import * as VoUtils from '../src/utils/utils'

test('array remove', () => {
  const a = [1, 2, 3, 4]
  expect(VoUtils.remove(a, 2)).toStrictEqual([2])
})

test('array isValidArrayIndex', () => {
  expect(VoUtils.isValidArrayIndex(12)).toBe(true)
  expect(VoUtils.isValidArrayIndex(-2)).toBe(false)
})

test('array ensureArray', () => {
  expect(VoUtils.ensureArray(12)).toStrictEqual([12])
  expect(VoUtils.ensureArray(null)).toStrictEqual([])
  expect(VoUtils.ensureArray([1, 2])).toStrictEqual([1, 2])
})
