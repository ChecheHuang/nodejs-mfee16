const fs = require("fs");
const Promise = require("bluebird");
const mine = require("./crawler_modules")

let connection = mine.creatConnect();
const readFileBlue = Promise.promisify(fs.readFile);

(async function () {
    try {
        await connection.connectAsync();
        let stockCode = await readFileBlue("stock.txt", "utf-8");
        let stockCodeArr = stockCode.split("\r\n");
        console.log("stockCodeArr:", stockCodeArr);
        // console.log(stockCodeArr.length);
        for (i = 0; i < stockCodeArr.length; i++) {
            if (stockCodeArr[i] !== "" & stockCodeArr[i].length === 4) {
                let stock = await connection.queryAsync(`SELECT stock_id FROM stock WHERE stock_id =${stockCodeArr[i]}`);
                // console.log(stock.length);
                if (stock.length == 0) {
                    console.log("Start to query")
                    let answers = await mine.queryStockName(stockCodeArr[i])
                    console.log(answers)
                    if (answers) {
                        console.log("Insert data")
                        connection.queryAsync(
                            `INSERT INTO stock (stock_id,stock_name) VALUE ('${answers[0]}','${answers[1]}')`
                        )
                    }
                } else {
                    console.log(`${stockCodeArr[i]}已經存在`)
                }
                console.log(`查詢股票成交資料 ${stockCodeArr[i]}`);
                let pricesData = await mine.queryStockData(stockCodeArr[i])
                let InsertData = await connection.queryAsync(
                    "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?", [pricesData]
                )
                console.log(`${stockCodeArr[i]}更新成功`)
            } else {
                console.log(`第${i + 1}行股票代碼錯誤`)
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        connection.end();
    }
})();