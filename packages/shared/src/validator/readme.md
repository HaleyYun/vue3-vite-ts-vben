## Validator类

### 使用方式

```
import { Validator } from '@vocen/shared'

const source = {};
const rule = {};
const mul = false;

const validator = new Validator(source, rule, mul);

const result = validator.validate((valid, errors) => {
    if(valid) {
        // 校验通过执行的逻辑
    } else {
        // 校验不通过，可根据返回的errors进行业务端进行提示
    }
})
```

### 参数说明

校验规则参见 [async-validator](https://github.com/yiminghe/async-validator)

#### source

```
    # source
    需要校验的对象
    比如：
    {
        name: 'xx',
        age: '12'
    }
```

#### rule

```
# rule
校验规则
{
  email: [
    { type: 'string', required: true, pattern: Schema.pattern.email },
    {
      validator(rule, value, callback, source, options) {
        const errors = [];
        // test if email address already exists in a database
        // and add a validation error to the errors array if it does
        return errors;
      },
    },
  ],
};
```

##### Type

`type`要使用的验证器。认可的类型值为

- string: 必须是类型 string。This is the default type.
- number: 必须是类型 number。
- boolean: 必须是类型 boolean。
- method: 必须是类型 function。
- regexp: 必须是 RegExp 创建新的时不产生异常的实例或字符串 RegExp。
- integer: 必须是类型 number 和整数。
- float: 必须是类型 number 和浮点数。
- array: 必须是由 确定的数组 Array.isArray。
- object: 必须是 typeobject 而不是 Array.isArray。
- enum: 值必须存在于 enum.
- date：值必须是有效的，由 Date
- url: 必须是类型 url。
- hex: 必须是类型 hex。
- email: 必须是类型 email。
- any: 可以是任何类型。

##### Required

`require` `drule` 属性指示该字段必须存在于正在验证的源对象上。

##### Pattern

`pattern` `rule` 属性指示值必须匹配才能通过验证的正则表达式

##### Range

使用`min`和`max`属性定义范围。`For ` `string` 和 `array` `types `比较针对 `length`, for `number` `types `数字不能小于`min`或大于`max`。

##### Length

要验证字段的确切长度，请指定`len`属性。对属性执行`string`和`array`类型比较，对于类型，此属性指示与 的完全匹配，即它只能严格等于。`length` `number` `number` `len`

如果该`len`属性与`min`和 max 范围属性结合使用，`len`则优先。

Enumerable

> 从 3.0.0 版开始，如果要验证值 0 或 false 内部 enum 类型，则必须显式包含它们。

要验证可能值列表中的值，请使用具有列出字段有效值`enum`的属性的类型，例如：`enum`

```
const descriptor = {
  role: { type: 'enum', enum: ['admin', 'user', 'guest'] },
};
```

#### mul

返回格式 mul = false; // 单个返回， 从上往下依次验证，如遇到输入错误，则返回报错的第一个失败信息 mul = true; // 返回所有的输入错误的信息
