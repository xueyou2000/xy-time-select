| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-time-select.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-time-select.svg?style=flat-square)

[![xy-time-select](https://nodei.co/npm/xy-time-select.png)](https://npmjs.org/package/xy-time-select)

# xy-time-select

时间选择器组件组件, 可从下拉列表选择时间，也可以直接输入

## 安装

```bash
# yarn
yarn add xy-time-select
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import TimeSelect from "xy-time-select";
ReactDOM.render(<TimeSelect />, container);
```

## API

| 属性           | 说明                                        | 类型                                        | 默认值  |
| -------------- | ------------------------------------------- | ------------------------------------------- | ------- |
| disabled       | 是否禁用                                    | boolean                                     | false   |
| value          | 输入框值, 比如 01:00                        | string                                      | 无      |
| defaultValue   | 输入框默认值                                | string                                      | 无      |
| placeholder    | 占位符文本                                  | string                                      | 无      |
| autoFocus      | 自动焦点                                    | boolean                                     | 无      |
| onChange       | 输入框 change 事件                          | (value: string) => void                     | 无      |
| popupClassName | 弹出内容类名                                | string                                      | 无      |
| stretch        | 下拉列表是否宽度与输入框宽度对齐            | boolean                                     | true    |
| backfill       | 是否键盘输入完再回填                        | boolean                                     | false   |
| delay          | 防抖毫秒                                    | number                                      | 200     |
| dataSource     | 数据源                                      | OptionConfig[] / string[] / React.ReactNode | 无      |
| customItem     | 自定义渲染                                  | (props: CustomItemProps) => JSX.Element     | 无      |
| onChange       | 改变回调                                    | (value: string) => void                     | 无      |
| start          | 开始时间,时间选择器开始时间范围, 比如 09:00 | string                                      | "00:00" |
| end            | 结束时间,时间选择器开始时间范围, 比如 18:00 | string                                      | "23:59" |
| step           | 间隔时间                                    | string                                      | "00:30" |
| min            | 最小可选时间                                | string                                      | 无      |
| max            | 最大可选时间                                | string                                      | 无      |

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-time-select is released under the MIT license.
