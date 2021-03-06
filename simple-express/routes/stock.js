const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

router.get("/",async(req, res)=>{
    let queryResults = await connection.queryAsync("SELECT * FROM stock;")
    res.render("stock/list",{
     stocks:queryResults
    })
});
router.get("/:stockCode",async(req, res ,next)=>{
    let stock = await connection.queryAsync("SELECT * FROM stock WHERE stock_id=?",req.params.stockCode);

    if(stock.length === 0){
        // throw new Error("查無此代碼");
        next();
    }
    stock = stock [0]
    let count = await connection.queryAsync(
        "SELECT COUNT(*) as total FROM stock_price WHERE stock_id=?;",
        req.params.stockCode
      );
    const total = count[0].total;
    const perPage = 10;
    const lastPage = Math.ceil(total/perPage);
    const currentPage = req.query.page || 1;
    const offset =(currentPage-1)*perPage;


    let queryResults = await connection.queryAsync("SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?",[req.params.stockCode,perPage,offset])
    res.render("stock/detail",{
        stock,
        stockPrices: queryResults,
        pagination:{
            lastPage,
            currentPage,
            total,

        }
    })
});

module.exports = router;
