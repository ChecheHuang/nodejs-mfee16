const axios = require('axios');
axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210529&stockNo=2330&_=1622262713687')
  .then(function (response) {
    // handle success
    console.log(response.data.date);
    console.log(response.data.title);
  })
  