// using file system (fs) module
const fs = require("fs");

// require for puppeteer package
const puppeteer = require("puppeteer");

// require autoscroll down library
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");

async function run() {
  // automate the browser opening, eg: open the google chrome
  const browser = await puppeteer.launch();

  // initialize the page, eg: open new tab in browser
  const page = await browser.newPage();

  // go to specific page, eg: key in url link
  // await page.goto("https://www.imanshoppe.com/collections/20-off-feb");
  await page.goto("https://www.imanshoppe.com/collections/20-off-feb");

  // using scrollPageToBottom method
  await scrollPageToBottom(page);

  // const dataImg = await page.evaluate(() =>
  //   Array.from(
  //     document.querySelectorAll(".product-collection picture[data-index='0']"),
  //     (e) => ({
  //       productImg: e.querySelector("source[data-srcset]")
  //         ? e.querySelector("source[data-srcset]").getAttribute("data-srcset")
  //         : null,
  //     })
  //   )
  // );
  // console.log(dataImg);

  // const productsTitles = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll(".product-bottom"), (e) => ({
  //     title: e.querySelector("a span").innerText,
  //   }))
  // );
  // console.log(productsTitles);

  // const originalPrices = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll(".price-sale"), (e) => ({
  //     originalPrice: e.querySelector(".old-price").innerText,
  //   }))
  // );
  // console.log(originalPrices);

  // // close browser
  // await browser.close();

  // // create an array of objects to store the scraped data
  // const products = [];

  // // loop through the data arrays and create an object for each set of data
  // for (let i = 0; i < dataImg.length; i++) {
  //   const product = {
  //     dataImg: dataImg[i].productImg,
  //     productsTitles: productsTitles[i].title,
  //     originalPrices: originalPrices[i].originalPrice,
  //   };
  //   products.push(product);
  // }

  // // save to json file
  // fs.writeFile("products.json", JSON.stringify(products), (err) => {
  //   if (err) throw err;
  //   console.log("JSON file saved");
  // });

  // // convert json to csv file
  // // npm i json2csv
  // const json2csv = require("json2csv").parse;

  // // read the JSON file
  // const products2csv = require("./products.json");

  // // specify the fields you want to include in the CSV
  // const fields = ["dataImg", "productsTitles", "originalPrices"];

  // // convert JSON to CSV
  // const csv = json2csv(products2csv, { fields });

  // // write CSV file
  // fs.writeFile("products.csv", csv, function (err) {
  //   if (err) throw err;
  //   console.log("CSV file saved");
  // });
}

run();
