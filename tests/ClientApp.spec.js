const { test, expect } = require('@playwright/test');


test.only('First Playwright test', async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/client")

    //Loctaors
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    //Wait condition to get the conatains text
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);



});