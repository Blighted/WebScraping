const puppeteer = require("puppeteer");
const chalk = require("chalk"); //this is optional, I just like pretty colours.

// Colourizing my errors/success messages
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    // Opens the headless browser (with fixed resolution)
    var browser = await puppeteer.launch({
		defaultViewport: {width: 1920, height: 1080, headless: false}
});

    // Opens a new page
    var page = await browser.newPage();

    // Url of page to have a still-frame shot 
    await page.goto(`https://www.google.com/`);

    // Still frame created, file saved as "example.png"
    await page.screenshot({ path: "example.png" });

    await browser.close();
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();