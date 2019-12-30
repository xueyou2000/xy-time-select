import React, { useEffect, useRef, useState } from "react";
import { isShortTime } from "utils-dom";
import { DefineDefaultValue } from "utils-hooks";
import { TimeSelectProps } from "./interface";

export default function useValue(props: TimeSelectProps): [string, React.Dispatch<React.SetStateAction<string>>, (val: string) => void] {
    const { onChange } = props;

    const valueProps = DefineDefaultValue(props, "value", "defaultValue");
    const isControll = "value" in props;
    const [inputValue, setInputValue] = useState<string>(isShortTime(valueProps) ? valueProps : "");
    // 记录最后一次输入正确的时间字符串
    const lastRef = useRef(inputValue);

    function changeValue(val: string) {
        let _val = isShortTime(val) ? val : lastRef.current;
        if (val === "") {
            _val = "";
        }

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
            setInputValue(props.value);
        }
    }, [isControll ? props.value : 1]);

    return [inputValue, setInputValue, changeValue];
}
