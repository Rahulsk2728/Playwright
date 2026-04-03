const { test, expect } = require('@playwright/test');


/* Write the condition till the payment page from login */

test.only('Web client login', async ({ page }) => {


    //To navigate to website
    await page.goto("https://rahulshettyacademy.com/client");

    //Locators
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();

    //To wait for the page to load
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor(); //For the particular card to load - IMP 

    //To get the title of all the contents
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    //To store the count of the product in the variable
    const count = await products.count();

    //To iterate through all the title use for loop
    for (let i = 0; i < count; ++i) {

        //Condition to check the extracted product name is matching with the required product name
        if (await products.nth(i).locator("b").textContent() == productName) {

            //Add the product the cart
            await products.nth(i).locator("text = Add To Cart").click();
            break;
        }
    }

    //Add to cart process
    await page.locator("[routerLink*='cart']").click();

    //Wait untill locators are loaded
    await page.locator("div li").first().waitFor();

    //Using html tag and text
    const bool = page.locator("h3:has-text('Zara Coat 4')").isVisible();

    // To check the return value
    expect(bool).toBeTruthy();

    //Click on checkout button
    await page.locator("text=Checkout").click();

    //To select option from dyanmic dropdown
    await page.locator("[placeHolder*='Country']").pressSequentially("ind", { delay: 100 });

    //Store the options displayed 
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();

    //Iterate through all the options 
    for (let i = 0; i < optionsCount; ++i) {

        //Get the text of the option
        const text = await dropdown.locator("button").nth(i).textContent();

        if (text === " India") {
            //click operation
            await dropdown.locator("button").nth(i).click();
            break;

        }

    }

    //To validate the email displaed on the above 
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    await page.locator(".action__submit").click();

    //To validate the thank you message
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    //To fetch the order id 
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);


    //Click on my orders
    await page.locator("button[routerLink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {

        //Condition to check the order id 
        const rowOrderId = await rows.nth(i).locator("th").textContent();

        if (orderId.includes(rowOrderId)) {

            await rows.nth(i).locator("button").first().click();
            break;

        }

    }

    //To check the orde ID details
    const orderIdDetails = await page.locator(".col-text").textContent();

    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});