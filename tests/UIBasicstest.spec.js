const {test , expect} = require('@playwright/test');


test.only('First Playwright test',async ({browser})=>
{


//Chrome - plugins/cookies
const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator("#username");
const passWord = page.locator("[type='password']");
const signIn = page.locator("#signInBtn");
const cardTitles = page.locator(".card-body a");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());

//Storing locators in const

//CSS locators 
//Type and fill gets same method
// await page.locator("#username").fill("Rahul shetty");
// await page.locator("[type='password']").fill("Learning");
// await page.locator("#signInBtn").click();


//Wait untill the element is visible
await userName.fill("rahulshettyacademy");
await passWord.fill("Learning@830$3mK2");
await signIn.click();
console.log(await cardTitles.first().textContent());
// console.log(await page.locator("[style*='block']").textContent());
const allText =await cardTitles.allTextContents();
console.log(allText)
;


});


//Using page as paparemeter
test('Page Playwright test',async ({page})=>
{

await page.goto("https://google.com");
//get the title 
 console.log(await page.title());
 await expect(page).toHaveTitle("Google");
 

});


