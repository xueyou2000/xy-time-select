import { TimeSelectProps } from "./interface";
import { formatDate, isShortTime, shortTimeParse, shrotTimeTimestamp } from "utils-dom";
import { OptionConfig } from "xy-select/es/interface";

const LAST_SECOND = "23:59";
// (1 * 60 * 1000)为1秒的毫秒数
const SECOND_TIMESTAMP = 60 * 1000;

export function createTimeList(props: TimeSelectProps) {
    const { start, step = "00:30", min, max } = props;
    if ("dataSource" in props) {
        return props.dataSource;
    }
    const times: OptionConfig[] = [];
    const end = isShortTime(props.end) ? props.end : LAST_SECOND;
    const startTimestamp = shortTimeParse(isShortTime(start) ? start : "00:00").getTime();
    const endTimestamp = shortTimeParse(isShortTime(end) ? end : LAST_SECOND).getTime();
    const stepTimestamp = shrotTimeTimestamp(shortTimeParse(step));
    const minTimestamp = isShortTime(min) ? shortTimeParse(min).getTime() : 0;
    const maxTimestamp = isShortTime(max) ? shortTimeParse(max).getTime() : 0;

    // Tips: 修正最后 23:59 的时候需要等于 24:00 才进入此循环, (1 * 60 * 1000)为1秒的毫秒数，补齐24:00
    const isLastEnd = end === LAST_SECOND;
    const lastSecond = isLastEnd ? endTimestamp + SECOND_TIMESTAMP : endTimestamp;

    for (let time = startTimestamp; time <= lastSecond; time += stepTimestamp) {
        if (time === lastSecond && isLastEnd) {
            time -= SECOND_TIMESTAMP;
        }
        const date = new Date(time);
        times.push({
            label: formatDate(date, "HH:mm"),
            value: formatDate(date, "HH:mm"),
            disabled: (minTimestamp && time < minTimestamp) || (maxTimestamp && time > maxTimestamp)
        });
    }

    return times;
}
