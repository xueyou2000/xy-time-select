import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { DefineDefaultValue } from "utils-hooks";
import AutoComplete from "xy-autocomplete";
import "xy-autocomplete/assets/index.css";
import { Input } from "xy-input";
import "xy-input/assets/index.css";
import { OptionConfig } from "xy-select/es/interface";
import { isShortTime } from "./date";
import { TimeSelectProps } from "./interface";
import { createTimeList } from "./utils";

export const TimeSelect = React.forwardRef((props: TimeSelectProps, ref: React.MutableRefObject<any>) => {
    const { value, defaultValue, start, end, step = "00:30", min, max, placeholder = "请选择时间", onChange, ...rest } = props;
    const valueProps = DefineDefaultValue(props, "value", "defaultValue");
    const isControll = "value" in props;
    const [inputValue, setInputValue] = useState<string>(isShortTime(valueProps) ? valueProps : "");
    // 记录最后一次输入正确的时间字符串
    const lastRef = useRef(inputValue);
    const times: OptionConfig[] | string[] | React.ReactNode = createTimeList(props);

    function changeValue(val: string) {
        const _val = isShortTime(val) ? val : lastRef.current;
        if (props.disabled) {
            return;
        }

        lastRef.current = _val;
        if (!isControll) {
            setInputValue(_val);
        }
        if (onChange) {
            onChange(_val);
        }
    }

    // 受控时候由外部更新输入框的值
    useEffect(() => {
        if (isControll) {
            setInputValue(value);
        }
    }, [isControll ? props.value : 1]);

    function blurHandle(event: React.FocusEvent<HTMLInputElement>) {
        changeValue(event.target.value);
    }

    return (
        <AutoComplete {...rest} ref={ref} filter={null} placeholder={placeholder} dataSource={times} value={inputValue} onSelect={changeValue} onChange={setInputValue} onBlur={blurHandle}>
            <Input suffix={<FontAwesomeIcon className="xy-time-select_icon" icon={faClock} />} />
        </AutoComplete>
    );
});

export default React.memo(TimeSelect);
