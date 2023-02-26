import {expect} from "@playwright/test";
import {chromium} from "playwright";
describe("Bug in Playwright", async function () {

    let browser;
    let browserContext;
    this.timeout(0);


    before(async function () {
        browser = await chromium.launch({
            headless: false,
        });
        browserContext = await browser.newContext();
    });

    after(async function(){
        await browserContext.close();
        await browser.close();
    })


    it("page.pause() hightlights incorrect line in Playwright Inspector and reports wrong line for failed assertion", async function () {
        browserContext.setDefaultTimeout(0);
        const page = await browserContext.newPage();
        await page.pause();
        await page.goto('https://news.ycombinator.com');
        const entries = page.locator('.athing');
        for (let i = 0; i < await entries.count(); i++) {
            const title = entries.nth(i).locator('td.title .titleline > a');
            console.log(`${i + 1}: ${await title.innerText()}`);
            await entries.nth(i).locator('td.title .titleline > a').evaluate(node => node.style.visibility = "hidden");
        }
        await expect(entries.nth(0).locator('td.title .titleline > a')).toBeVisible();
    });
});
