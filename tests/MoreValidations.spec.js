const { test, expect } = require('@playwright/test');

//Pop up validations 
test("Pop up validations", async ({ page }) => {


    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();



});



//Pop up validations 
test("Frame handling", async ({ page }) => {

     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

 await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator("#hide-textbox").click();

    await expect(page.locator("displayed-text")).toBeHidden();

    //To handle dialog box 
    page.on('Dialog', dialog => dialog.accept());

    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    //Handling frames

    const framePage = page.frameLocator("#courses-iframe");

    await framePage.locator("li a[href*='lifetime-access']:visible").click();

    //To extract the text content
    const textCheck = await framePage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);


    });