import { test, expect, request } from '@playwright/test';


//Payload storage 
const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "IamKing@00" };
const orderPayload = {"orders": [{"country":"India","product0rderedId":"62023a761Sfcf72fe9dfc619"}]};
let token;

test.beforeAll(async () => {

    //Login API 
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/com/auth/login",

        // Headers 
        {
            data: loginPayLoad
        })

    // Debug (optional but useful)
    console.log(await loginResponse.text());

    // Status check
    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log("Token:", token);

// Create order API
  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload,
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(await orderResponse.json());
});



/* First Playwright test locators  */
test('First Playwright test', async ({ page }) => {


    page.addInitScript(value => {

        window.localStorage.setItem('token', value);

    }, value);

    // //To navigate to website
    // await page.goto("https://rahulshettyacademy.com/client");

    // //Loctaors
    // await page.locator("#userEmail").fill("anshika@gmail.com");
    // await page.locator("#userPassword").fill("Iamking@000");
    // await page.locator("[value='Login']").click();

    //Wait condition to get the conatains text
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});
