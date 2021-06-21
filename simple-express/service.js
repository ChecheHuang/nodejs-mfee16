const connection = require("./utils/db.js")
const bodyParser = require("body-parser");
require("dotenv").config();

const express = require("express");
let app = express();

// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const expressSession = require("express-session");
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
}))
app.use(express.static("public"));

app.set("views","views");
app.set("view engine","pug");

app.use(function(req, res, next){
    res.locals.member = req.session.member;
    next();
});

app.use(function(req, res ,next){
    if(req.session.message){
        res.locals.message = req.session.message;
        delete req.session.message;
    }
    next();
});

//middleware 中間件 中介函式
app.use(function(req, res, next){
    let current = new Date;
    console.log(`有人來訪問了喔 在${current}`)
    //幾乎都要呼叫
    next();
});

let stockRouter = require("./routes/stock")
app.use("/stock",stockRouter)
let apiRouter = require("./routes/api");
app.use("/api",apiRouter);
let authRouter = require("./routes/auth");
const { use } = require("./routes/api");
app.use("/auth",authRouter);
let memberRouter =require("./routes/member");
app.use("/member",memberRouter);


app.get("/", function(req, res){
    console.log("這裡是首頁");

    res.cookie("lang","zh-TW");

    res.render("index");
})
app.get("/about", function(req, res){
    // res.send("About Express");
    res.render("about");
})
app.get("/test", function(req, res){
    res.send("Test Express");
})
app.use(function (req, res ,next){
    res.status(404);
    res.render("404");
})

app.use(function(err, req, res, next){
    console.log(err.message);
    res.status(500);
    res.send("500 - Internal Sever Error 請洽系統管理員");
});


app.listen(3000, async() => {
    
    await connection.connectAsync();
    console.log(`我跑起來了喔 在 port 3000`)
})