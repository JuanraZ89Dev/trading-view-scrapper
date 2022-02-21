const { chromium } = require ('playwright')


var express = require('express');
var app = express();
const port = 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get('/:symbol/:pair/', function(req, res) {

    const symbol = req.params.symbol;
    const pair = req.params.pair;

    const dataToSearch = {

        symbol: symbol,
        pair: pair,
        exchange: "Binance"

    }

   getInformation(dataToSearch, res)




});


/*

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

*/


const getInformation = async(data, res) => {

    const browser = await chromium.launch()

    const page = await browser.newPage();

    const URLToScrap = "https://www.tradingview.com/symbols/" + data.symbol + data.pair + "/"

    await page.goto(URLToScrap)

    const content = await page.textContent('.tv-symbol-price-quote__value');


    if(content !== ''){


        res.json(
            {
                code: 200,
                status: 'success',
                data: content,
                url_scrapped: URLToScrap,

            });

        browser.close();

    } else {

        console.log('probant 2 intent')
        for(let i = 0; i < 5; i++){

          let newPage = await browser.newPage();

          await newPage.goto(URLToScrap)

         let content2 = await page.textContent('.tv-symbol-price-quote__value');

            if(content2 != ''){

                i = 5;

                res.json(
                    {
                        code: 200,
                        status: 'success',
                        data: content2,
                        url_scrapped: URLToScrap


                    });

            }

        }

        browser.close();

        console.log("Error getting data")

    }








    }





