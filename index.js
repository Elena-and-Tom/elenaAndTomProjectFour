const wineApp = {};

// selectors stored as variables
wineApp.mainContainer = document.querySelector('.mainContainer');

// wineApp.userChoice = [];

// functions for on clicks
wineApp.events = function () {
  $("button").on("click", e => {
    let userChoice = ""

    e.preventDefault();
    userChoice = $("select[name=foodChoice]").val();
    const data = wineApp.getData(userChoice);
    // wineApp.mainContainer.innerHTML = '';
    wineApp.giveTypes(userChoice, data)
  });
};

// functions for api calls
wineApp.getData = function(foodChoice) {
    wineApp.url = "https://api.spoonacular.com/food/wine/pairing?";
    let apiData = [];
    $.ajax({
        url: wineApp.url,
        dataType: "json",
        method: "GET",
        data: {
          food: foodChoice,
          maxPrice: "40",
          // apiKey: "98162948a5504d3181cf99fb1f42ea76"
        }
  })
    .then(function (result) {
        console.log(result);
        apiData.push(result);
    })
    .fail(function () {
      console.log('fail');
    });
      return apiData;

}

// functions for activity
wineApp.giveTypes = function (userInput, apiData) {
  // grab the data from the API
  console.log(userInput, apiData)

  // wineApp.mainContainer.innerHTML = ``

}


wineApp.init = () => {
  wineApp.events();
};

$(document).ready(function() {
  wineApp.init();
});
