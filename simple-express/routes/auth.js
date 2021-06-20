const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator")

router.get("/register",(req, res)=>{
    res.render("auth/register");
    

});
const registerResults = [
    body 
];


router.post("/register", (req, res)=>{
    console.log(req.body);
    res.send("這裡是post register");
});


router.get("/login",(req, res)=>{
    res.render("auth/login");
});

module.exports = router ;
