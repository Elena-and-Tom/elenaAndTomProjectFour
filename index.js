// test

const wineApp = {};

// selectors stored as variables
wineApp.mainContainer = document.querySelector(".mainContainer");
wineApp.topSection = document.querySelector(".topSection");

// wineApp.userChoice = [];

// functions for on clicks
wineApp.events = function() {
  $(".mainContainer").on("click", "#getResults", e => {
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

  $(".mainContainer").on("click", "#getResultsTwo", e => {
    let userChoiceTwo = "";

    e.preventDefault();
    wineApp.loopThroughRadios();
    wineApp.mainContainer.innerHTML = "";
  });
};

wineApp.loopThroughRadios = function() {
  const radios = Array.from($(".wineChoice"));
  let radioValue;

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      // thats weird - look into this for jquery version
      console.log(radios[i]);

      radioValue = radios[i].value;
      console.log(radioValue);
    }
  }

  if (radioValue == null) {
    alert("hello pick sometin dude");
    // maybe add a return here if we need it to stop
  }
  wineApp.getData2(radioValue);
};

wineApp.startOver = function() {
  $(".mainContainer").html("").append(`<div class="topSection">
          <h1 class='landingTitle'>Your Personal Sommelier</h1>
          <p class='landingText'>
            Let us make your dinner unforgettable. Take a journey with our virtual Sommelier who will suggest you wines tailored to your needs.
          </p>
          <p class='landingText'>
            Choose a food option below to start! 
          </p>
        </div>
        <div class="bottomSection">
          <form class="userSelection" id="userSelection">
            <label for="foodChoice" class='visuallyHidden'>Please select the food</label>
            <select name="foodChoice">
              <option selected="selected">So, what are you eating tonight?</option>
              <option value="red meat">Red meat</option>
              <option value="chicken">White meat </option>
              <option value="pizza">Pizza</option>
              <option value="risotto">Risotto(V)</option>
              <option value="fish">Fish</option>
            </select>
          </form>
          <button type="submit" id="getResults" class='getResults'>Explore suggestions</button>
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
      apiKey: "b79077231aeb4404ae54b9a405920c64"
    }
  })
    .then(function(result) {
      wineApp.cleanData(result, foodChoice);
    })
    .fail(function() {
      console.log("fail");
    });
};

wineApp.getData2 = function(wineUserChoice) {
  console.log(wineUserChoice);
  wineApp.url2 = "https://api.spoonacular.com/food/wine/recommendation?";

  $.ajax({
    url: wineApp.url2,
    dataType: "json",
    method: "GET",
    data: {
      wine: wineUserChoice,
      number: 100,
      // maxPrice: "40", // STRETCH IT UP
      apiKey: "b79077231aeb4404ae54b9a405920c64"
    }
  })
    .then(function(result) {
      wineApp.cleanData2(result, wineUserChoice);
    })
    .fail(function() {
      console.log("fail");
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
  // wineApp.displayWines(totalData, wineUserChoice);
};

wineApp.categorizeWine = function(apiData, userWineInput) {
  let cheapWine = [];
  let midWine = [];
  let highWine = [];

  apiData[0].forEach(function(option) {
    let cleanOption = option.price.substr(1);
    if (parseInt(cleanOption) >= 40) {
      highWine.push(option);
    } else if (parseInt(cleanOption) >= 15) {
      midWine.push(option);
    } else {
      cheapWine.push(option);
    }
  });

  wineApp.randomize(cheapWine, midWine, highWine, userWineInput);
};

wineApp.randomize = function(cheapWine, midWine, highWine, userWineInput) {
  let randomCheapWine = Math.floor(Math.random() * cheapWine.length);
  let randomMidWine = Math.floor(Math.random() * midWine.length);
  let randomHighWine = Math.floor(Math.random() * highWine.length);
  console.log(
    cheapWine[randomCheapWine],
    midWine[randomMidWine],
    highWine[randomHighWine]
  );

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

  // const wines = apiData[0][0];
  let pairedWines;
  pairedWines = apiData[0].join(", ");

  $(".mainContainer").append(
    `<div class="pageTwoTop"><p>You chose a ${userInput}. Good choice!</p><p>Top picks for you:<span class="pairedWines textEmphasis">${pairedWines}</span></p><p>${apiData[1]}</p></div>`
  ).append(`<div>
      <form class="wineSelection" id="wineSelection">
        <legend> I'd love to get recommendations for:</legend>
        
        <input type="radio" name="wineChoice" class='wineChoice' id='wineChoice1' value='${apiData[0][0]}'>
        <label for="wineChoice1">${apiData[0][0]}</label>
        
        <input type="radio" name="wineChoice" class='wineChoice' id='wineChoice2' value='${apiData[0][1]}'>
        <label for="wineChoice2">${apiData[0][1]}</label>
        
        <input type="radio" name="wineChoice" class='wineChoice' id='wineChoice3' value='${apiData[0][2]}'>
        <label for="wineChoice3">${apiData[0][2]}</label>
        
          
      </form>
      <button type="submit" id="getResultsTwo">Get recommedations</button>
      <button type="submit" id="startOver">Start over</button>
      </div>`);
};

wineApp.displayWines = function(
  cheapWineRandom,
  midWineRandom,
  highWineRandom,
  userWineInput
) {
  // console.log(cheapWineRandom, highWineRandom, midWineRandom, userWineInput);
  $(".mainContainer")
    .append(
      `<div class="pageThreeTop">
        <p>You chose <span class='textEmphasis'>${userWineInput}</span>. A great choice and please see our tailored suggestions below!</p>
        <div class='priceSlider'><p> Placeholder for Price</p></div>
      </div>`

    )
    .append(
      `<div class="mainWineCard">
        <div class="wineCard">
          <div class="wineImgContainer">
          <img src="${cheapWineRandom.imageUrl}" alt="a bottle of cheap wine">
          </div>
          <div class="wineTextContainer">
            <h2>Affordable wine</h2>
            <p>${cheapWineRandom.title}</p>
            <p>${cheapWineRandom.description}</p>
            <p>${cheapWineRandom.price}</p>
            <p>You can buy it <a href="${cheapWineRandom.link}">here</a>.</p>
          </div>
        </div>
        <div class="wineCard">
          <div class="wineImgContainer">
          <img src="${midWineRandom.imageUrl}" alt="a bottle of cheap wine">
          </div>
          <div class="wineTextContainer">
            <h2>Affordable wine</h2>
            <p>${midWineRandom.title}</p>
            <p>${midWineRandom.description}</p>
            <p>${midWineRandom.price}</p>
            <p>You can buy it <a href="${midWineRandom.link}">here</a>.</p>
          </div>
        </div>
        <div class="wineCard">
          <div class="wineImgContainer">
          <img src="${highWineRandom.imageUrl}" alt="a bottle of cheap wine">
          </div>
          <div class="wineTextContainer">
            <h2>Affordable wine</h2>
            <p>${highWineRandom.title}</p>
            <p>${highWineRandom.description}</p>
            <p>${highWineRandom.price}</p>
            <p>You can buy it <a href="${highWineRandom.link}">here</a>.</p>
          </div>
        </div>
      
      </div>
      <button type="submit" id="startOver">Start over</button>`
    );
};

wineApp.init = () => {
  wineApp.events();
};

$(document).ready(function() {
  wineApp.init();
});
