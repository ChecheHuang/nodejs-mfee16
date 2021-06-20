//ajax
$(function(){
    $.ajax({
        type:"GET",
        url: "/api/stocks",
    }).done(function(data){
        console.log(data);
    });
})


// axios.get("/api/stocks").then((res)=>{
//     console.log(res.data);
// });

fetch("/api/stocks")
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data);
    });