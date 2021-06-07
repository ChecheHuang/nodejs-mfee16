const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const mysql = require('mysql');
const Promise = require("bluebird");
require("dotenv").config();

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
connection = Promise.promisifyAll(connection);
const readFileBlue = Promise.promisify(fs.readFile);

(async function () {
    try {
        await connection.connectAsync();
        let stockCode = await readFileBlue("stock.txt", "utf-8");
        console.log("stockCode:", stockCode);

        let stock = await connection.queryAsync(`SELECT stock_id FROM stock WHERE stock_id = ${stockCode}`);
        if (stock.length == 0) {
            console.log("Start to query")
            let response = await axios.get(
                `https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`
            );
                // console.log(response)
            let answers = response.data.suggestions
                .map((function (item) {
                    return item.split("\t");
                }))
                .find(function (item) {
                    return item[0] === stockCode;
                })
            console.log(answers)
            //TODO:answers[0],answers[1]
            if (answers.length > 1) {
                console.log("Insert data")
                connection.queryAsync(
                    `INSERT INTO stock (stock_id,stock_name) VALUE ('${answers[0]}','${answers[1]}')`)
            }
        }else{
            console.log("資料已經存在")
        }

    } catch (err) {
        console.error(err);
    } finally {
        connection.end();
    }
})();