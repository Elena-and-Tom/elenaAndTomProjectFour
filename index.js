const wineApp = {};

// console.log(wineApp.userChoice);

wineApp.events = function() {
  $("button").on("click", e => {
    let userChoice = "t";

    e.preventDefault();
    userChoice = $("select[name=foodChoice]").val();
    console.log(userChoice);
  });
};

// wineApp.url = "https://api.spoonacular.com/food/wine/pairing?";
// wineApp.getWineCat = $.ajax({
//   url: wineApp.url,
//   dataType: "json",
//   method: "GET",
//   data: {
//     food: " pasta",
//     maxPrice: "40",
//     apiKey: "98162948a5504d3181cf99fb1f42ea76"
//   }
// })
//   .then(function(result) {
//     // console.log(result);
//   })
//   .fail(function(result) {
//     // console.log("fail");
//   });

init = () => {
  wineApp.events();
};

$(document).ready(function() {
  init();
});
