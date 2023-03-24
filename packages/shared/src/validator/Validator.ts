import Schema from 'async-validator'
import { isObject } from '../utils/utils'
interface ValidatorConfig {
  source: object
  rule: object
  mul?: boolean
}
export default class Validator {
  private readonly source: object
  private readonly rule: Record<string, any>
  private readonly mul: boolean | undefined = false
  constructor(config: ValidatorConfig) {
    const { source, rule, mul } = config
    if (!isObject(source)) {
      throw new Error('source need an object')
    }
    if (!isObject(rule)) {
      throw new Error('rule need an object')
    }
    this.source = source
    this.rule = rule
    this.mul = mul
  }

  /**
   * ghgh
   * @param callback
   */
  public validate(callback: any) {
    const { rule, source, mul } = this
    const validator = new Schema(rule)
    // @ts-ignore
    validator.validate(source, (errors: any[]) => {
      if (errors) {
        // 校验不通过 do something
        if (mul) {
          return callback(
            false,
            errors.map((item) => {
              return {
                filed: item.field,
                msg: item.message,
              }
            })
          )
        } else {
          return callback(false, [
            {
              filed: errors[0].field,
              msg: errors[0].message,
            },
          ])
        }
      }
      return callback(true, [])
    })
  }
}
