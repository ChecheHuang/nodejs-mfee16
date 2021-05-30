// let counter = 0;

// let fibonacci = function (n) {
//   counter++;
//   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
// };

// console.log("fib(10) = " + fibonacci(-1)); // 55
// console.log("counter: " + counter); // 177
function fibonacci (num) {
    var n1 = 1,
        n2 = 1,
        n = 1;
    for (var i = 3; i <= num; i++) {
        n = n1 + n2;
        n1 = n2;
        n2 = n;
    }
    return n ;
}
console.log("fib(10) = " +fibonacci(10))