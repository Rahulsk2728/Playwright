const { test, expect } = require('@playwright/test');

test.only('Unique locator ', async ({page}) => {

    //Navigate to Website
     await page.goto("https://rahulshettyacademy.com/angularpractice/");
    
    //Unique locators - get by label
    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await page.getByLabel("Employed").check();

    await page.getByLabel("Gender").selectOption("Female");

    //unique Locators - get by placeholder
    await page.getByPlaceholder("Password").fill("abc123");

    //Click on submit button
    await page.getByRole("button", {name:'Submit'}).click();

    //Is the text visible
    await page.getByText("Success! The Form has been submitted succesfully!.").isVisible();

    
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();



})