let doWorkPromise = function (job, timer, success) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let dt = new Date();
        if (success) {
          // 成功
          return resolve(`完成工作: ${job} at ${dt.toISOString()}`);
        }
        reject(`!!工作失敗: ${job} at ${dt.toISOString()}`);
      }, timer);
    });
  };
  
//   // 刷完牙 > 吃早餐 > 寫功課
//   // 作法 1
//   doWorkPromise("刷牙", 2000, true)
//     .then((result) => {
//       // fulfilled 處理成功 resolve
//       console.log(result);
//       return doWorkPromise("吃早餐", 3000, false);
//     })
//     // // 測試3
//     // .catch((err) => {
//     //   // 這裡多加一個 catch，捕捉這個 catch 之前的錯誤
//     //   // 最後仍會 return 一個 promise 讓下一個 then 繼續發生
//     //   // 但因為沒有真的 return 什麼資料，所以下一個 then 的 result 會是 undefined
//     //   console.log("中間的 catch 攔截", err);
//     // })
//     .then((result) => {
//       console.log("成功地吃早餐了嗎？", result);
//       return doWorkPromise("寫功課", 5000, true);
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       // rejected 處理失敗 reject
//       console.error("發生錯誤", err);
//     })
//     .finally(() => {
//       console.log("我是 Finally");
//     });
  
  // 作法2
  doWorkPromise("刷牙", 2000, true)
    .then(
      (result) => {
        // fulfilled 處理成功 resolve
        console.log(result);
        return doWorkPromise("吃早餐", 3000, false);
      },
      (reject) => {
        console.log("中途攔截A", reject);
      }
    )
    .then(
      (result) => {
        console.log(result);
        return doWorkPromise("寫功課", 5000, true);
      },
      (reject) => {
        console.log("中途攔截B", reject);
        //  沒註解的差異
        return doWorkPromise("寫功課", 5000, true);
      }
    )
    .then(
      (result) => {
        console.log(result);
      },
      (reject) => {
        console.log("中途攔截C", reject);
      }
    )
    .catch((err) => {
      // rejected 處理失敗 reject
      console.error("發生錯誤", err);
    })
    .finally(() => {
      console.log("我是 Finally");
    });