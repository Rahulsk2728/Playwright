const { test, expect } = require('@playwright/test');



/* First Playwright test locators  */
test('First Playwright test', async ({ page }) => {

    //To navigate to website
    await page.goto("https://rahulshettyacademy.com/client");

    //Loctaors
    await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button', { name: "Login" }).click();
    await page.locator(".card-body b").first().waitFor();

    //Wait condition to get the conatains text
    await page.waitForLoadState('networkidle');

    //To click on add to cart product which has zara
    const titles = await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" })
        .getByRole("button", { name: "Add To Cart" }).click();

    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

    await page.locator("div li").first().waitFor();

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();


    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button", { name: "India" }).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thank you for the Order.")).toBeVisible();



});


