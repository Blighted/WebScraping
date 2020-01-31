const puppeteer = require("puppeteer");
const chalk = require("chalk");  //This is optional, I just like pretty colours.
var fs = require("fs"); //Writing file

// Colourizing my errors/success messages
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    // Opens the headless browser
    var browser = await puppeteer.launch({ headless: false });
    // Opens a new page
    var page = await browser.newPage();
    // Url of page to scrape
    await page.goto(`https://news.ycombinator.com/`);
    await page.waitForSelector("a.storylink");

	//Setting Vars for each article and FOR loop to iterate through each article
    var news = await page.evaluate(() => {
      var titleNodeList = document.querySelectorAll(`a.storylink`);
      var ageList = document.querySelectorAll(`span.age`);
      var scoreList = document.querySelectorAll(`span.score`);
      var titleLinkArray = [];
      for (var i = 0; i < titleNodeList.length; i++) {
        titleLinkArray[i] = {
          title: titleNodeList[i].innerText.trim(),
          link: titleNodeList[i].getAttribute("href"),
          age: ageList[i].innerText.trim(),
          score: scoreList[i].innerText.trim()
        };
      }
      return titleLinkArray;
    });
    // console.log(news);
    await browser.close();
    // Writing data to JSON file format
    fs.writeFile("hackernews.json", JSON.stringify(news), function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();