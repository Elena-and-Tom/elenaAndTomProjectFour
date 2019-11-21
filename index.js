// test

const wineApp = {};

// selectors stored as variables
wineApp.mainContainer = document.querySelector(".mainContainer");
wineApp.topSection = document.querySelector(".topSection");

// wineApp.userChoice = [];

// functions for on clicks
wineApp.events = function() {
  $("#getResults").on("click", e => {
    let userChoice = "";

    e.preventDefault();
    userChoice = $("select[name=foodChoice]").val();
    wineApp.getData(userChoice);
    wineApp.topSection.className += "topSectionHide";
    wineApp.mainContainer.innerHTML = "";
  });

  $(".mainContainer").on("click", "#startOver", e => {
    e.preventDefault();
    wineApp.startOver();
  });
};

wineApp.startOver = function() {
  $(".mainContainer").html("").append(`<div class="topSection">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet ipsam,
          id repudiandae facere ut magni! Facere, expedita? Totam, fuga iure.
          Minus officiis deleniti earum rerum quo dicta unde sit sapiente.
        </p>
      </div>
      <form class="userSelection" id="userSelection">
        <label for="foodChoice">Please select the food</label>
        <select name="foodChoice">
          <option selected="selected">Select the food</option>
          <option value="red meat">Red meat</option>
          <option value="chicken">White meat </option>
          <option value="pizza">Pizza</option>
          <option value="risotto">Risotto(V)</option>
          <option value="fish">Fish</option>
        </select>
      </form>
      <button type="submit" id="getResults">Explore suggestions</button>
    </div>`);
};

// functions for api calls
wineApp.getData = function(foodChoice) {
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
    .then(function(result) {
      console.log(result);
      wineApp.cleanData(result, foodChoice);
    })
    .fail(function() {
      console.log("fail");
    });
};

// wineApp.pairedWines;

wineApp.cleanData = function(apiData, userChoice) {
  let totalData = [];
  let pairedArray = apiData.pairedWines;
  let pairedDescription = apiData.pairingText;
  totalData.push(pairedArray);
  totalData.push(pairedDescription);
  wineApp.displayTypes(totalData, userChoice);
};

// functions for activity
wineApp.displayTypes = function(apiData, userInput) {
  // grab the data from the API

  console.log(apiData[0]);
  console.log(apiData[1]);

  // const wines = apiData[0][0];
  // console.log(wines);
  let pairedWines;
  pairedWines = apiData[0].join(", ");
  console.log(pairedWines);

  $(".mainContainer").append(
    `<div class="pageTwoTop"><p>You chose ${userInput}. Good choice!</p><p>Top picks for you:<span class="pairedWines">${pairedWines}</span></p><p>${apiData[1]}</p></div>`
  ).append(`<div><form class="wineSelection" id="wineSelection">
        <legend> I'd love to get recommendations for:</legend>
        
        <input type="radio" name="wineChoice1" value=${apiData[0][0]}>
        <label for="wineChoice1">${apiData[0][0]}</label>
        
        <input type="radio" name="wineChoice2" value=${apiData[0][1]}>
        <label for="wineChoice2">${apiData[0][1]}</label>
        
        <input type="radio" name="wineChoice3" value=${apiData[0][2]}>
        <label for="wineChoice3">${apiData[0][2]}</label>
        
          
      </form>
      <button type="submit" id="getResultsTwo">Get recommedations</button>
      <button type="submit" id="startOver">Start over</button>
      </div>`);
};

wineApp.init = () => {
  wineApp.events();
};

$(document).ready(function() {
  wineApp.init();
});
