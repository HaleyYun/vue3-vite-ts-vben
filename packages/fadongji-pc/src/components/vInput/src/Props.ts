export const inputProps = {
  msg: {
    type: String,
    default() {
      return ''
    },
  },
  width: { type: Number, default: 80 },
  height: { type: Number, default: 40 },
  color: { type: String, default: 'black' },
  placeholder: { type: String, default: '请选择' },
  fontSize: { type: String, default: '12px' },
  borderRadius: { type: Number, default: 5 },
  borderColor: { type: Number, default: 5 },
  border: { type: String, default: '1px solid white' },
  paddingLeft: { type: Number, default: 0 },
  textAligns: { type: String, default: 'left' },
}
