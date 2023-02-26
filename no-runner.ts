import {chromium} from "playwright";
import {expect} from "@playwright/test";

(async () => {
    const browser = await chromium.launch({
        headless: false,
    });

    const browserContext = await browser.newContext();
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
    await browserContext.close();
    await browser.close();
})();
