/**
 * 用于生成表单校验，指定正则规则的触发方式。
 * 未在此处声明无触发方式的组件将不生成rule！！
 */
export default {
  'p-input': 'blur',
  'p-input-number': 'change',
  'p-dropdown': 'change',
  'p-radio-group': 'change',
  'p-checkbox-group': 'change',
  'p-cascader': 'change',
  'p-time-picker': 'change',
  'p-date-picker': 'change',
  'p-rate': 'change'
}
