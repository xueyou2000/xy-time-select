import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHover } from "utils-hooks";
import AutoComplete from "xy-autocomplete";
import "xy-autocomplete/assets/index.css";
import { Input } from "xy-input";
import "xy-input/assets/index.css";
import { OptionConfig } from "xy-select/es/interface";
import { TimeSelectProps } from "./interface";
import { getLocal } from "./local";
import useValue from "./useValue";
import { createTimeList } from "./utils";

export const TimeSelect = React.forwardRef((props: TimeSelectProps, ref: React.MutableRefObject<any>) => {
    const { value, defaultValue, start, end, step = "00:30", min, max, placeholder = getLocal().TimeSelect.placeholder, onBlur, onChange, ...rest } = props;
    const [inputValue, setInputValue, changeValue] = useValue(props);
    const times: OptionConfig[] | string[] | React.ReactNode = createTimeList(props);
    const [iconRef, iconHouver] = useHover();

    function blurHandle(event: React.FocusEvent<HTMLInputElement>) {
        changeValue(event.target.value);
        if (onBlur) {
            onBlur(event);
        }
    }

    function cleanHandle() {
        if (inputValue) {
            changeValue("");
        }
    }

    return (
        <AutoComplete {...rest} ref={ref} filter={null} placeholder={placeholder} dataSource={times} value={inputValue} onSelect={changeValue} onChange={setInputValue} onBlur={blurHandle}>
            <Input
                suffix={
                    <span className="xy-time-select_icon" onClick={cleanHandle} ref={iconRef}>
                        <FontAwesomeIcon icon={iconHouver && inputValue ? faTimesCircle : faClock} />
                    </span>
                }
            />
        </AutoComplete>
    );
});

export default React.memo(TimeSelect);
