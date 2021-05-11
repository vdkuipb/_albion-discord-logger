import puppeteer, { SerializableOrJSHandle } from "puppeteer";
import fs from "fs";

export async function createImageFromTemplate(templateFile: string, evaluateCallback: (...args: any[]) => void, data: SerializableOrJSHandle, outputFile: string): Promise<void> {
    const browser: puppeteer.Browser = await puppeteer.launch();
    const page: puppeteer.Page = await browser.newPage();
    const html: string = await fs.promises.readFile(templateFile, "utf8");
    await page.setContent(html);
    await page.evaluate(evaluateCallback, data);
    // const watch = page.waitForFunction('window.status === "ready"');
    // await watch; 
    await new Promise((resolve) => setTimeout(resolve, 3000)); //TODO: find better solution
    await page.screenshot({ path: outputFile })
    await page.close();
    await browser.close();
}