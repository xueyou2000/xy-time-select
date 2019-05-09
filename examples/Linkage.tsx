import React, { useState } from "react";
import TimeSelect from "../src";

export default function() {
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);

    return (
        <div>
            <p>开始时间</p>
            <TimeSelect max={max} onChange={setMin} />

            <p>结束时间</p>
            <TimeSelect min={min} onChange={setMax} />
        </div>
    );
}
