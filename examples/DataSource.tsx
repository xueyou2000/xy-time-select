import React from "react";
import TimeSelect from "../src";

export default function() {
    const dataSource = ["01:30", "02:30", "12:00", "14:30", "16:00"];

    return (
        <div>
            <TimeSelect dataSource={dataSource} />
        </div>
    );
}
