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

  const dataImg = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".product-collection picture[data-index='0']"),
      (e) => ({
        productImg: e.querySelector("source[data-srcset]")
          ? e.querySelector("source[data-srcset]").getAttribute("data-srcset")
          : null,
      })
    )
  );
  console.log(dataImg);

  const productsTitles = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".product-bottom"), (e) => ({
      title: e.querySelector("a span").innerText,
    }))
  );
  console.log(productsTitles);

  const originalPrices = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".price-sale"), (e) => ({
      originalPrice: e.querySelector(".old-price").innerText,
    }))
  );
  console.log(originalPrices);

  // const offerPrices = await page.evaluate(() =>
  //   Array.from(
  //     document.querySelectorAll(
  //       ".product-collection .product-details .price-sale"
  //     ),
  //     (e) => ({
  //       offerPrice: e.querySelector(".special-price").innerText.trim(),
  //     })
  //   )
  // );

  // const offerPrices = await page.evaluate(() =>
  //   Array.from(
  //     document.querySelectorAll(
  //       ".product-collection .product-details .price-sale"
  //     ),
  //     (e) => ({
  //       offerThePrice: e.querySelector(".special-price")
  //         ? e.querySelector(".special-price").innerText.trim()
  //         : null,
  //     })
  //   )
  // );

  // const offerPrices = await page
  //   .waitForSelector(
  //     ".product-collection .product-details .price-sale .special-price"
  //   )
  //   .then(() =>
  //     page.evaluate(() => {
  //       return Array.from(
  //         document.querySelectorAll(
  //           ".product-collection .product-details .price-sale .special-price"
  //         ),
  //         (e) => ({
  //           offerPrice: e.innerText.trim(),
  //         })
  //       );
  //     })
  //   );
  // console.log(offerPrices);

  // close browser
  await browser.close();

  // create an array of objects to store the scraped data
  const products = [];

  // loop through the data arrays and create an object for each set of data
  for (let i = 0; i < dataImg.length; i++) {
    const product = {
      dataImg: dataImg[i].productImg,
      productsTitles: productsTitles[i].title,
      originalPrices: originalPrices[i].originalPrice,
      // offerPrices: offerPrices[i].offerPrice,
    };
    products.push(product);
  }

  // save to json file
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) throw err;
    console.log("JSON file saved");
  });
}

run();
