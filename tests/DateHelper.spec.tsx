import { isShortTime, shortTimeParse, shrotTimeTimestamp, formatDate } from "../src/date";

describe("short-time", () => {
    test("isShortTime", () => {
        expect(isShortTime(null)).toBeFalsy();
        expect(isShortTime("")).toBeFalsy();
        expect(isShortTime("24:00")).toBeFalsy();
        expect(isShortTime("1:00")).toBeFalsy();
        expect(isShortTime("13:60")).toBeFalsy();
        expect(isShortTime("13")).toBeFalsy();

        expect(isShortTime("00:00")).toBeTruthy();
        expect(isShortTime("10:23")).toBeTruthy();
        expect(isShortTime("23:59")).toBeTruthy();
    });

    test("shortTimeParse", () => {
        const date = shortTimeParse("10:23");
        expect(date.getHours()).toBe(10);
        expect(date.getMinutes()).toBe(23);
        expect(date.getSeconds()).toBe(0);
    });

    test("shrotTimeTimestamp", () => {
        let timestamp = shrotTimeTimestamp(shortTimeParse("00:01"));
        expect(timestamp).toBe(1 * 60 * 1000);

        timestamp = shrotTimeTimestamp(shortTimeParse("01:00"));
        expect(timestamp).toBe(1 * 60 * 60 * 1000);
    });
});

describe("date", () => {
    test("formatDate", () => {
        let date = new Date(2019, 9, 19, 13, 30, 0);
        expect(formatDate(date)).toBe("2019-10-19 13:30:00");
    });
});
