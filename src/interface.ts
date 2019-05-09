import { AutoCompleteProps } from "xy-autocomplete/es/interface";

export interface TimeSelectProps extends AutoCompleteProps {
    /**
     * 时间
     */
    value?: string;
    /**
     * 默认时间
     */
    defaultValue?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 开始时间
     * @description 时间选择器开始时间范围, 比如 09:00
     */
    start?: string;
    /**
     * 结束时间
     * @description 时间选择器开始时间范围, 比如 18:00
     */
    end?: string;
    /**
     * 间隔时间
     * @description 默认 00:30
     */
    step?: string;
    /**
     * 最小可选时间
     * @description 最小时间之上的都看得见，但是禁用不可选的. 比如 06:00
     */
    min?: string;
    /**
     * 最大可选时间
     * @description 最小时间之下的都看得见，但是禁用不可选的 比如 17:00
     */
    max?: string;
    /**
     * hange事件
     */
    onChange?: (value: string) => void;
}
