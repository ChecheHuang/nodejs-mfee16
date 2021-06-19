const axios = require("axios");
const moment = require("moment");
const mysql = require('mysql');
const Promise = require("bluebird");
require("dotenv").config();

//建立連線
exports.creatConnect = function(){
    let connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    return  Promise.promisifyAll(connection);
}

//api拿股票名稱與代碼
exports.queryStockName = async function (stockCode) {
    let response = await axios.get(
        `https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`
    );
    // console.log(response.data.suggestions)
    let answers = response.data.suggestions
        .map((function (item) {
            return item.split("\t");
        }))
        .find(function (item) {
            return item[0] === stockCode;
        })
    // console.log(answers)
    if (answers.length > 1) {
        return answers;
    } else {
        return null;
    }
};

//api拿價格資料
exports.queryStockData = async function (stockCode) {
    let prices = await axios.get(
        "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
        {
            params: {
                response: "json",
                date: moment().format("YYYYMMDD"),
                stockNo: stockCode,
            },
        }
    );
    if (prices.data.stat !== "OK") {
        throw "查詢股價失敗";
    }
    return  prices.data.data.map((item) => {
        item = item.map((value) => {
            return value.replace(/,/g, "");
        });
        item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;//YYYYMMDD
        item[0] = moment(item[0], "YYYYMMDD").format("YYYY-MM-DD");//YYYY-MM-DD
        item.unshift(stockCode);
        return item;
    })
};