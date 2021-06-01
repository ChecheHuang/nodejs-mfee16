const moment = require("moment");

let doWork = function (job, timer, cb) {
    setTimeout(() => {
        let dt = new Date();
        cb(null, `完成工作: ${job} at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
    }, timer);
};

let dt = new Date();
console.log(`開始工作 at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
doWork("刷牙", 2000, function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result);
    // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
    doWork("吃早餐", 3000, function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result);
        doWork("寫功課", 5000, function (err, result) {
            if (err) {
              console.error(err);    
              return;
            }
            console.log(result);
          });
    });
});




//   doWork("吃早餐", 3000, function (err, result) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(result);
//   });


// let doWork =function(job,timer,cb){
//     setTimeout(()=>{
//         callback(null,`完成工作 ${job}`);
//     },timer);
// }