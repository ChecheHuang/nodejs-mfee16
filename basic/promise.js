let doWork=function(job,timer,cb){
    setTimeout(()=>{
        let dt = new Date();
        cb(null,`完成工作:${job} at ${dt.toISOString}`);
    },timer);
};
let doWorkPromise = function(job,timer){
    return new Promise((resolve,rejuct)=>{
        setTimeout(()=>{
            let dt = new Date();
            resolve(`完成工作:${job} at ${dt.toISOString}`);
        },timer);
    });
};
let brushPromise = doWorkPromise("刷牙",2000);
console.log(brushPromise);
brushPromise
.then((result)=>{
    console.log(result);
})
.catch((err)=>{
    console.log("發生錯誤",err);
})