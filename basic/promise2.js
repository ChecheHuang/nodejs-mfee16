// let doWork=function(job,timer,cb){
//     setTimeout(()=>{
//         let dt = new Date();
//         cb(null,`完成工作:${job} at ${dt.toISOString}`);
//     },timer);
// };
let doWorkPromise = function(job,timer,success){
    return new Promise((resolve,rejuct)=>{
        setTimeout(()=>{
            let dt = new Date();
            if(success){
                resolve(`完成工作:${job} at ${dt.toISOString()}`);
            }
            rejuct(`!!工作失敗:${job} at ${dt.toISOString()}`);
        },timer);
    });
};
// let brushPromise = doWorkPromise("刷牙",2000);
// console.log(brushPromise);
doWorkPromise("刷牙",2000,true)
.then((result)=>{
    console.log(result);
    return doWorkPromise("吃早餐",2500,true)
})
.then(function(result){
    console.log(result);
    return doWorkPromise("寫功課",3000,true)
})
.then((result)=>{
    console.log(result);
})
.catch((err)=>{
    console.log("發生錯誤",err);
})
.finally(function(){
    console.log("done")
})