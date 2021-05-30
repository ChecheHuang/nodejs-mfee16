// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210523
// &stockNo=2610

// npm i axios
// 引入 axios
const axios = require("axios");

// TODO: 從 stock.txt 讀股票代碼進來
// filesystem
// npm i fs ??? -> 不用



const fs = require("fs");
function fsPromise(){
 return new Promise((resolve,reject)=>{ 
  fs.readFile("stock.txt","utf8",(err,data)=>{
    if(err){
      reject(err);
    }
    resolve(data);
  })
 });
};
// fs.readFile("stock.txt", "utf8", (err, data) => {
//   if (err) {
//     return console.error("讀檔錯誤", err);
//   }
//   console.log(`讀到的 stock code: ${data}`);

fsPromise().then(stockCode =>{
  console.log(stockCode);
}).catch(err()){
  console.error(err);
}
  axios
    .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: "20210523",
        stockNo: data,
      },
    })
    .then(function (response) {
      if (response.data.stat === "OK") {
        console.log(response.data.date);
        console.log(response.data.title);
      }
    });
});