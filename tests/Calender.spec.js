const { test, expect } = require("@Playwright/test");

test("Calender Validations", async ({ page }) => {

    const monthNumber = "6";
    const date = "15";
    const year = "2027";

    //Array collection
    const expectedList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    //Click on calender
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    //Select the year
    await page.getByText(year).click();

    //Choose the month
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();

    //Choose date
    await page.locator("//abbr[text()='" + date + "']").click();

    const inputs = page.locator(".react-date-picker__inputGroup__input")

    //To iterate through the calender for validations

    for (let i = 0; i < expectedList.length; i++) {

        const value = await inputs.nth(i).inputValue();

        expect(value).toEqual(expectedList[i]);

    }



})