import { test, expect, request } from '@playwright/test';
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "IamKing@00" };



test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacaemy.com/api/ecom/auth/login",

        // Headers 
        {
            data: loginPayLoad
        })
    // 200 , response code status code check 
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponseJson.json();
    const token = loginResponseJson.token;
    console.log(token);

});


testBeforeEach(() => {


});



/* First Playwright test locators  */
test('First Playwright test', async ({ page }) => {

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
