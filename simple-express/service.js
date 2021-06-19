const connection = require("./utils/db.js")

const express = require("express");
let app = express();

app.use(express.static("public"));

app.set("views","views");
app.set("view engine","pug");
//middleware 中間件 中介函式
app.use(function(req, res, next){
    let current = new Date;
    console.log(`有人來訪問了喔 在${current}`)
    //幾乎都要呼叫
    next();
});

let stockRouter = require("./routes/stock")
app.use("/stock",stockRouter)


app.get("/", function(req, res){
    // res.send("Hello Express");
    res.render("index");
})
app.get("/about", function(req, res){
    // res.send("About Express");
    res.render("about");
})
app.get("/test", function(req, res){
    res.send("Test Express");
})



app.listen(3000, async() => {
    
    await connection.connectAsync();
    console.log(`我跑起來了喔 在 port 3000`)
})