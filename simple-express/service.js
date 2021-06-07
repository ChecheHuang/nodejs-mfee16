const express = require("express");
let app = express();


//middleware 中間件 中介函式
app.use(function(req, res, next){
    let current = new Date;
    console.log(`有人來訪問了喔 在${current}`)
    //幾乎都要呼叫
    next();
});

app.get("/", function(req, res){
    res.send("Hello Express");
})
app.get("/about", function(req, res){
    res.send("About Express");
})
app.get("/test", function(req, res){
    res.send("Test Express");
})



app.listen(3001, () => {
    console.log(`我跑起來了喔 在 port 3001`)
})