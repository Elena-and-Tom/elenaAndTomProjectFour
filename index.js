// test

const wineApp = {};

// selectors stored as variables
wineApp.mainContainer = document.querySelector(".mainContainer");
wineApp.topSection = document.querySelector(".topSection");

// wineApp.userChoice = [];

// functions for on clicks
wineApp.events = function () {
  $("button").on("click", e => {
    let userChoice = "";

    e.preventDefault();
    userChoice = $("select[name=foodChoice]").val();
    wineApp.getData(userChoice);
    wineApp.topSection.className += "topSectionHide";
    wineApp.mainContainer.innerHTML = "";
  });
};

// functions for api calls
wineApp.getData = function (foodChoice) {
  wineApp.url = "https://api.spoonacular.com/food/wine/pairing?";

  $.ajax({
    url: wineApp.url,
    dataType: "json",
    method: "GET",
    data: {
      food: foodChoice,
      maxPrice: "40",
      apiKey: "98162948a5504d3181cf99fb1f42ea76"
    }
  })
    .then(function (result) {
      console.log(result);
      wineApp.cleanData(result, foodChoice);

    })
    .fail(function () {
      console.log("fail");
    });


};

// wineApp.pairedWines;

wineApp.cleanData = function (apiData, userChoice) {
  let totalData = [];
  let pairedArray = apiData.pairedWines;
  let pairedDescription = apiData.pairingText;
  totalData.push(pairedArray)
  totalData.push(pairedDescription)
  wineApp.displayTypes(totalData, userChoice);
}



// functions for activity
wineApp.displayTypes = function (apiData, userInput) {
  // grab the data from the API

  console.log(apiData[0]);
  console.log(apiData[1]);


  // const wines = apiData[0][0];
  // console.log(wines);
  // wines.join(",");

  $(".mainContainer").append(
    `<div class="pageTwoTop"><p>You chose ${userInput}. Good choice!</p><p>Top picks for you:${apiData[0]}</p></div>`
  );
};

wineApp.init = () => {
  wineApp.events();
};

$(document).ready(function () {
  wineApp.init();
});
