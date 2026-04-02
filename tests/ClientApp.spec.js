const { test, expect } = require('@playwright/test');



/* First Playwright test locators  */
test.only('First Playwright test', async ({ page }) => {

    //To navigate to website
    await page.goto("https://rahulshettyacademy.com/client");

    //Loctaors
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();

    //Wait condition to get the conatains text
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});


/* UI lcoators methods and assertions */
test.only('UI controls ', async ({ page }) => {

    //Navigate to website
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");

    //Locators
    const username = page.locator("#username");
    const password = page.locator("signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");

    //Static dropdown 
    await dropdown.selectOption("consult");


    //Radio button
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    //Assertions
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    //Checkbox
    await page.locator("#terms").click();

    await expect(page.locator("#terms")).toBeChecked();

    await page.locator("#terms").uncheck();

    //Asertion for the method uncheck
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    //Assertion for blinking text
    await expect(documentLink).toHaveAttribute("class", "blinkingText");

});

/* Chidl windows handling */

test.only('Child window handling ', async ({ page }) => {






});