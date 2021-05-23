# (1) 請問下列程式執行後的結果為何？為什麼？
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 1000);
})();

console.log("end");
顯示start
建立function 顯示IIFE   1000毫秒後顯示 Timeout
顯示end(在Timeout之前)
# (2) 請問下列程式執行的結果為何？為什麼？

console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 0);
})();

console.log("end");
顯示
start
IIFE   
end    
Timeout
function setTimeout 指定0毫秒後執行 console.log("Timeout")單獨執行  所以在  end 後
# (3) 請問下列程式執行的結果為何？為什麼？

const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  bar();
  baz();
};

foo();
回調函式
bar baz function 放在 const foo裡
foo() 顯示 foo   bar   baz
# (4) 請問下列程式執行的結果為何？為什麼？

const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  setTimeout(bar, 0);
  baz();
};

foo();
顯示 foo  baz bar
回調函式 
執行const foo  顯示  foo  baz setTimeout(bar,0)(在function執行完0秒後執行)  