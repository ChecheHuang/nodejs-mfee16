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
async function crawler(){
    try{
        let stockCode = await readFilePromise();
    let response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: stockCode,
        },
      });
      if (response.data.stat === "OK") {
        console.log(response.data.date);
        console.log(response.data.title);
      }
    }catch(err){
        console.error(err);
    }finally{
        console.log("全部跑完了")
    }
}
crawler();


// readFilePromise()
//   .then((stockCode) => {
//     console.log("stockCode:", stockCode);

//     return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//       params: {
//         response: "json",
//         date: moment().format("YYYYMMDD"),
//         stockNo: stockCode,
//       },
//     });
//   })
//   .then((response) => {
//     if (response.data.stat === "OK") {
//       console.log(response.data.date);
//       console.log(response.data.title);
//     }
//   })
//   .catch((err) => {
//     console.error(err);
//   });