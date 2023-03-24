interface RuleOption {
  required?: boolean
  message?: string
}
export default {
  buildRuleByOpt(row) {
    const rules: Array<RuleOption> = []
    if (row.isRequire) {
      const requireRuleOption = {
        required: true,
        message: `${row.label}必填`,
      }
      rules.push(requireRuleOption)
    }
    return rules
  },
}
