const wineApp = {};

// selectors stored as variables
wineApp.mainContainer = document.querySelector(".mainContainer");
wineApp.topSection = document.querySelector(".topSection");
wineApp.userFood = [];

// functions for on clicks
wineApp.events = function() {
  $(".mainContainer").on("click", "#getResults", e => {
    let userChoice = "";

    e.preventDefault();
    userChoice = $("select[name=foodChoice]").val();

    if (userChoice == "So, what is for dinner?") {
      swal("Please select the food");
    } else {
      wineApp.getData(userChoice);
      wineApp.topSection.className += "topSectionHide";
      wineApp.mainContainer.innerHTML = "";
    }
  });

  $(".mainContainer").on("click", "#startOver", e => {
    e.preventDefault();
    wineApp.userFood = [];
    wineApp.startOver();
  });

  $(".mainContainer").on("click", "#goBack", e => {
    e.preventDefault();
    wineApp.getData(wineApp.userFood[0]);
    wineApp.mainContainer.innerHTML = "";
  });

  $(".mainContainer").on("click", "#getResultsTwo", e => {
    let userChoiceTwo = "";

    e.preventDefault();
    wineApp.loopThroughRadios();
  });
};

wineApp.loopThroughRadios = function() {
  const radios = Array.from($(".wineChoice"));
  let radioValue;

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radioValue = radios[i].value;
    }
  }

  if (radioValue == null) {
    swal("Please pick the wine and we'll provde the suggestions");
    return;
  } else {
    wineApp.mainContainer.innerHTML = "";
    wineApp.getData2(radioValue);
  }
};

wineApp.startOver = function() {
  $(".mainContainer").html("").append(`<div class="topSection">
          <h1 class="landingTitle">Your Personal Sommelier</h1>
          <p class="landingText">
            Let us make your dinner unforgettable. Take a journey with our
            virtual Sommelier who will suggest you wines tailored to your needs.
          </p>
          <p class="landingText">
            Choose a food option below to start!
          </p>
        </div>
        <div class="bottomSection">
          <form class="userSelection" id="userSelection">
            <label for="foodChoice" class="visuallyHidden"
              >Please select the food</label
            >
            <select name="foodChoice">
              <option selected="selected">So, what is for dinner?</option>
              <option value="red meat">Red meat</option>
              <option value="chicken">White meat </option>
              <option value="fish">Fish</option>
              <option value="pizza">Pizza</option>
              <option value="taco">Tacos (veg)</option>
              <option value="curry">Curry (v)</option>
              <option value="salad">Salads (v)</option>
            </select>
          </form>
          <button type="submit" id="getResults" class="getResults">
            Explore suggestions
          </button>
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
      wineApp.cleanData(result, foodChoice);
    })
    .fail(function() {
      wineApp.mainContainer.innerHTML = `<p>Sorry, we are experiencing some technical issues. Please try again soon :)</p>`
    });
};

wineApp.getData2 = function(wineUserChoice) {
  wineApp.url2 = "https://api.spoonacular.com/food/wine/recommendation?";

  $.ajax({
    url: wineApp.url2,
    dataType: "json",
    method: "GET",
    data: {
      wine: wineUserChoice,
      number: 100,
      apiKey: "98162948a5504d3181cf99fb1f42ea76"
    }
  })
    .then(function(result) {
      wineApp.cleanData2(result, wineUserChoice);
    })
    .fail(function() {
      wineApp.mainContainer.innerHTML = `<p>Sorry, we are experiencing some technical issues. Please try again soon :)</p>`
    });
};

wineApp.cleanData = function(apiData, userChoice) {
  let totalData = [];
  let pairedArray = apiData.pairedWines;
  let pairedDescription = apiData.pairingText;
  totalData.push(pairedArray);
  totalData.push(pairedDescription);
  wineApp.displayTypes(totalData, userChoice);
};

wineApp.cleanData2 = function(apiData, wineUserChoice) {
  let totalData = [];
  totalData.push(apiData.recommendedWines);
  wineApp.categorizeWine(totalData, wineUserChoice);
};

wineApp.categorizeWine = function(apiData, userWineInput) {
  let cheapWine = [];
  let midWine = [];
  let highWine = [];

  if (
    userWineInput === "gruener veltliner" ||
    userWineInput === "sparkling rose"
  ) {
    apiData[0].forEach(function(option) {
      let cleanOption = option.price.substr(1);
      if (parseInt(cleanOption) >= 24) {
        highWine.push(option);
      } else if (parseInt(cleanOption) >= 17) {
        midWine.push(option);
      } else {
        cheapWine.push(option);
      }
    });
  } else {
    apiData[0].forEach(function(option) {
      let cleanOption = option.price.substr(1);
      if (parseInt(cleanOption) >= 30) {
        highWine.push(option);
      } else if (parseInt(cleanOption) >= 15) {
        midWine.push(option);
      } else {
        cheapWine.push(option);
      }
    });
  }

  wineApp.randomize(cheapWine, midWine, highWine, userWineInput);
};

wineApp.randomize = function(cheapWine, midWine, highWine, userWineInput) {
  let randomCheapWine = Math.floor(Math.random() * cheapWine.length);
  let randomMidWine = Math.floor(Math.random() * midWine.length);
  let randomHighWine = Math.floor(Math.random() * highWine.length);

  wineApp.displayWines(
    cheapWine[randomCheapWine],
    midWine[randomMidWine],
    highWine[randomHighWine],
    userWineInput
  );
};

// functions for activity
wineApp.displayTypes = function(apiData, userInput) {
  // grab the data from the API

  let pairedWines;
  pairedWines = apiData[0].join(", ");

  $(".mainContainer").append(
    `<div class="pageTwoTop"><p>You chose a <span class="pairedWines">${userInput}</span>. Good choice!</p><p>Top picks for you: <span class="pairedWines textEmphasis">${pairedWines}</span></p><p class="pairingText">${apiData[1]}</p></div>`
  ).append(`<div class="pageTwoBottom">
      <form class="wineSelection" id="wineSelection">
        <legend> Select the wine you'd love to explore:</legend>
        
        <input type="radio" name="wineChoice" class='wineChoice' id='wineChoice1' value='${apiData[0][0]}'>
        <label for="wineChoice1"><i class="fas fa-wine-bottle"></i> ${apiData[0][0]}</label>
        
        <input type="radio" name="wineChoice" class='wineChoice' id='wineChoice2' value='${apiData[0][1]}'>
        <label for="wineChoice2"><i class="fas fa-wine-bottle"></i> ${apiData[0][1]}</label>
        
        <input type="radio" name="wineChoice" class='wineChoice' id='wineChoice3' value='${apiData[0][2]}'>
        <label for="wineChoice3"><i class="fas fa-wine-bottle"></i> ${apiData[0][2]}</label>
        
          
      </form>
      <button type="submit" id="getResultsTwo">Get recommendations</button>
      <button type="submit" id="startOver">Start over</button>
      </div>`);

  wineApp.userFood.unshift(userInput);
};

wineApp.displayWines = function(
  cheapWineRandom,
  midWineRandom,
  highWineRandom,
  userWineInput
) {
  $(".mainContainer")
    .append(
      `<div class="pageThreeTop">
        <p>You chose <span class='pairedWines'>${userWineInput}</span>. Excellent choice! Please see our tailored suggestions below.</p>
      </div>`
    )
    .append(
      `<div class="mainWineCard">
        <div class="wineCard">
          <div class="wineImgContainer">
          <img src="./assets/pricedBottleLow.png" alt="a bottle of cheap wine">
          <p>(affordable)</p>
          </div>
          <div class="wineTextContainer">
            
            <h3>${cheapWineRandom.title}</h3>
            
            <p>${cheapWineRandom.price}</p>
            <p>See decription<a href="${cheapWineRandom.link}">here</a>.</p>
            <p>Find my local <a href="map.html">LCBO</a></p>
          </div>
        </div>
        <div class="wineCard">
          <div class="wineImgContainer">
          <img src="./assets/pricedBottleMid.png" alt="a bottle of medium wine">
          <p>(average)</p>
          </div>
          <div class="wineTextContainer">
            
            <h3>${midWineRandom.title}</h3>
            
            <p>${midWineRandom.price}</p>
            <p>See description <a href="${midWineRandom.link}">here</a>.</p>
            <p>Find my local <a href="map.html">LCBO</a></p>
          </div>
        </div>
        <div class="wineCard">
          <div class="wineImgContainer">
          <img src="./assets/pricedBottleHigh.png"  alt="a bottle of expensive wine">
          <p>(premium)</p>
          </div>
          <div class="wineTextContainer">
            
            <h3>${highWineRandom.title}</h3>
            
            <p>${highWineRandom.price}</p>
            <p>See description <a href="${highWineRandom.link}">here</a>.</p>
            <p>Find my local <a href="map.html">LCBO</a></p>
          </div>
        </div>
      
      </div>
      <div class="bottomSectionThree">
     <button type="submit" id="goBack" class='startOverThree'>Go back a step</button> 
<button type="submit" id="startOver" class='startOverThree'>Start over</button>
</div>`
    );
};

wineApp.init = () => {
  wineApp.events();
};

$(document).ready(function() {
  wineApp.init();
});
