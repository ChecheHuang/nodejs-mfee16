const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

// console.log(moment().format()); // 2021-05-30T13:45:06+08:00
// console.log(moment().format("YYYYMMDD")); // 20210530

function readFilePromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

readFilePromise()
  .then((stockCode) => {
    console.log("stockCode:", stockCode);

    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY?", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stockCode
      },
    });
  })
  .then((response) => {
    console.log(response)
    // if (response.data.stat === "OK") {
    //   console.log(response.data.date);
    //   console.log(response.data.title);
    // }
    // throw "查詢錯誤";
  })
  .catch((err) => {
    console.error(err);
    console.log("這裡ˋ是catch")
  });