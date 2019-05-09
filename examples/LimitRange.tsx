import React from "react";
import TimeSelect from "../src";

export default function() {
    return (
        <div>
            <TimeSelect style={{ width: "160px" }} min="08:00" max="18:00" />
        </div>
    );
}
