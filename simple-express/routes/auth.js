const express = require("express");
const router = express.Router();
const connection = require("../utils/db");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,path.join(__dirname,"../","public","uploads"));
  },
  filename:function (req, file ,cb){
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
  },
});
const uploader = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // console.log(file);
    if (file.mimetype !== "image/jpeg") {
      return cb(new Error("不合法的 file type"), false);
    }
    // file.originalname: Name of the file on the user's computer
    // 101.jpeg
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("是不合格的副檔名"));
    }
    // 檔案ＯＫ, 接受這個檔案
    cb(null, true);
  },
  limits: {
    // 限制檔案的上限 1 M
    fileSize: 1024 * 1024,
  },
});

router.get("/register",(req, res)=>{
    res.render("auth/register");
});

const registerRules = [
    body("email").isEmail().withMessage("請正確輸入 Email 格式"),
    body("password").isLength({ min: 6 }),
    body("confirmPassword").custom((value, { req }) => {
      return value === req.body.password;
    }),
  ];


router.post("/register",uploader.single('photo'),registerRules, async(req, res, next)=>{
    console.log(req.body);
    const validateResult = validationResult(req);
    if(!validateResult.isEmpty()){
        return next(new Error("註冊表單資料有問題"));
    };
    let checkResult = await connection.queryAsync(
        "SELECT * FROM members WHERE email = ?",
        req.body.email
      );
      if(checkResult.length>0){
        return next(new Error("已經註冊過了"));
      }
      console.log(req.file);
      let result = await connection.queryAsync(
        "INSERT INTO members (email, password, name,photo) VALUES (?);",
        [[req.body.email, await bcrypt.hash(req.body.password, 10), req.body.name, `/uploads/${req.file.filename}`]]    
        );
    res.send("恭喜 註冊成功")


    // res.send("這裡是post register");
});


router.get("/login",(req, res)=>{

  if(req.session.member){
    res.session.message = {
      title: "重複登入",
      text: "歡迎回到本服務",
    }
    return res.redirect(303,"/member");
  };

    res.render("auth/login");
});

const loginRules = [
  body("email").isEmail().withMessage("請正確輸入 Email 格式"),
  body("password").isLength({ min: 6 }),
];
router.post("/login",loginRules,async(req, res ,next)=>{
  console.log(req.body);
  const validateResult = validationResult(req);
    if(!validateResult.isEmpty()){
        return next(new Error("登入資料有問題"));
    };
    let member = await connection.queryAsync(
      "SELECT * FROM members WHERE email = ?",
      req.body.email
    );
    if(member.length===0){
      return next(new Error("查無此帳號"));
    }
    member = member[0];
    let result = await bcrypt.compare(req.body.password,member.password); 
    if(result){
      req.session.member = {
        email: member.email,
        name: member.name,
        photo: member.photo,
      }

      req.session.message = {
        title: "登入成功",
        text: "歡迎回到本服務",
      }

      res.redirect(303,"/");
    }else{
      req.session.member = null;

      req.session.message = {
        title: "登入失敗",
        text: "請填寫正確帳號、密碼",
      }

      res.redirect(303,"/auth/login");
    }
}); 
router.get("/logout", (req, res)=>{
  req.session.member = null;

  req.session.message = {
    title: "已登出",
    text: "歡迎再回來",
  };
  res.redirect(303,"/");
})

router.get("/member", (req, res)=>{
  res.render("auth/member")
})


module.exports = router ;
