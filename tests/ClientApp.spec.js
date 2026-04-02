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

/* Child windows handling */

test.only('Child window handling ', async ({ browser }) => {

    //Chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();


    //Navigate to website
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");

    //Locators
    const documentLink = page.locator("[href*='documents-request']");
    const username = page.locator("#username");

    //To go o new page 
    const [newPage] = await Promise.all(
        [

            //listen for any new page pending , rejected , fullfilled
            context.waitForEvent('page'),
            //Click on the document link opens a seperate window
            documentLink.click(),
        ])

    //To get the red text content
    const text = await newPage.locator(".red").textContent();

    //To extract only particular text from the string - Split using the method
    const arrayText = text.split("@");
    const emailText = arrayText[1].split(" ")[0]

    console.log(emailText);
    //Enter username fro the extracted text
    await page.locator("#username").type(emailText);
    await page.pause();


    //To print the username entered in the field
    console.log(await page.locator("#username").inputValue());




});