import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TimeSelect from "../src";

describe("TimeSelect", () => {
    test("times range", () => {
        const wrapper = render(<TimeSelect start="08:00" end="14:00" step="01:00" />);
        const options = document.body.querySelectorAll(".xy-option");
        expect([].map.call(options, (x) => x.textContent)).toEqual(["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"]);
    });

    test("select range", () => {
        const wrapper = render(<TimeSelect start="08:00" end="14:00" min="10:00" max="13:00" step="01:00" />);
        expect(wrapper.getByText("08:00").classList.contains("xy-option-disabled")).toBeTruthy();
        expect(wrapper.getByText("09:00").classList.contains("xy-option-disabled")).toBeTruthy();
        expect(wrapper.getByText("10:00").classList.contains("xy-option-disabled")).toBeFalsy();
        expect(wrapper.getByText("11:00").classList.contains("xy-option-disabled")).toBeFalsy();
        expect(wrapper.getByText("12:00").classList.contains("xy-option-disabled")).toBeFalsy();
        expect(wrapper.getByText("13:00").classList.contains("xy-option-disabled")).toBeFalsy();
        expect(wrapper.getByText("14:00").classList.contains("xy-option-disabled")).toBeTruthy();
    });

    test("invalid start and end", () => {
        const wrapper = render(<TimeSelect start="xx" end="xx" step="01:00" />);
        const options = document.body.querySelectorAll(".xy-option");
        expect(options.length).toBe(25);
    });

    test("invalid min and max", () => {
        const wrapper = render(<TimeSelect min="xx" max="xx" step="01:00" />);
        const options = document.body.querySelectorAll(".xy-option");
        expect(options.length).toBe(25);
    });

    test("invalid input time string", () => {
        // 输入无效的时间字符串，则会回退到上一次正确的值
        const wrapper = render(<TimeSelect placeholder="请选择时间" />);
        const input = wrapper.getByPlaceholderText("请选择时间") as HTMLInputElement;

        fireEvent.click(wrapper.getByText("08:00"));
        expect(input.value).toBe("08:00");

        fireEvent.change(input, { target: { value: "asd02:00" } });
        expect(input.value).toBe("asd02:00");
        fireEvent.blur(input);
        expect(input.value).toBe("08:00");

        fireEvent.change(input, { target: { value: "asd02:00" } });
        fireEvent.click(wrapper.getByText("11:00"));
        expect(input.value).toBe("11:00");
    });

    test("onChange", () => {
        const fn = jest.fn();
        const wrapper = render(<TimeSelect placeholder="请选择时间" onChange={fn} />);
        const input = wrapper.getByPlaceholderText("请选择时间") as HTMLInputElement;

        fireEvent.click(wrapper.getByText("08:00"));
        expect(fn.mock.calls.length).toBe(1);
        expect(fn.mock.calls[0][0]).toBe("08:00");

        fireEvent.change(input, { target: { value: "asd02:00" } });
        expect(fn.mock.calls.length).toBe(1);
        fireEvent.blur(input);
        expect(fn.mock.calls.length).toBe(2);
        expect(fn.mock.calls[1][0]).toBe("08:00");

        fireEvent.change(input, { target: { value: "asd02:00" } });
        expect(fn.mock.calls.length).toBe(2);
        fireEvent.click(wrapper.getByText("11:00"));
        expect(fn.mock.calls.length).toBe(3);
        expect(fn.mock.calls[2][0]).toBe("11:00");
    });

    test("onBlur", () => {
        const fn = jest.fn();
        const wrapper = render(<TimeSelect placeholder="请选择时间" onBlur={fn} />);
        const input = wrapper.getByPlaceholderText("请选择时间") as HTMLInputElement;

        expect(fn.mock.calls.length).toBe(0);
        fireEvent.blur(input);
        expect(fn.mock.calls.length).toBe(1);
    });

    test("clean", () => {
        const fn = jest.fn();
        const wrapper = render(<TimeSelect defaultValue="12:30" placeholder="请选择时间" onChange={fn} />);
        const input = wrapper.getByPlaceholderText("请选择时间") as HTMLInputElement;
        expect(input.value).toBe("12:30");

        const cleanBtn = wrapper.container.querySelector(".xy-time-select_icon");
        fireEvent.click(cleanBtn);

        expect(input.value).toBe("");
        expect(fn.mock.calls.length).toBe(1);
        expect(fn.mock.calls[0][0]).toBe("");
    });
});
