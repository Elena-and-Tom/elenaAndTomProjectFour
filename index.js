// PSEUDO CODE

// Overview: Site Structure
    // What - A WineApp that receives user input about their food preferences and matches the wine recommendations based on food selection
    // Features
        // MVP - Return Name of the wine, type of the wine, the description, an image, a link to amazon and the price. 
        // Stretch goal - filter the wines by rating / wine scoring system. Only return wines of a high enough rating.
    // Site Structure 
        // MVP - One page site. This updates on user clicks by updating the data each time their is a user input
        // Stretch goal - use firebase or local storage to make this a multi page site


// Pseudocode
    // Step 1
        // MVP - Show the user a form (dropdown menu) containing different food options (e.g. red meat, white meat, fish, vegetarian). Also have a submit button
        // stretch goal - instead of a drop down receive user text input and clean the data to allow for error handling
        // stretch goal - another criteria option for the user that can narrow the options they will see

    // Step 2
        // MVP - On form submit, store the user's input into a variable
        // Stretch goal - store it into an object for use potentially in firebase / local storage. Also useful for storing key value pairs

     // Step 3
        // MVP
            // Immediately, run a function that checks the variable that is stored with the user choice. Then place the variable chosen into the api call url. This api call will return a wine category and a description to why it suits the food
            // run api call with the user choice, and store the received data from the API (includes text of pairedWines, pairingText)

    // Step 4
        // MVP - clear the current data on the page using inner.html / .remove() / hide as a class


    // Step 5
        // MVP
            // Append to page the info called from the API
                // Show the user what they chose (e.g. you chose chicken, and vegetarian)
                // Add text to page with paired wines at the category level (e.g Merlot, Cabernet Saubignon, Pinot Noir). Also append 'pairing text' that highlights why we have chosen these wines to show to them
                // Offer a question about which category they want to explore (e.g. merlot or cabernet) and a submit button
                    // HOW - we use text literals to display the info on the page. This way we can place the data pulled from the api into the text appended to the page
                // Finally offer an option button for them to start again

    // Step 6 
        // MVP - On form submit, store the user's input into a variable. 
        // Stretch goal - store multiple user inputs (i.e. they want cabernet and merlot but not shiraz)

    // Step 7 
        // MVP
            // Immediately, run a function that checks the variable (or object/array of choices if we go for the stretch goal) that is stored with the user choice. Then place the variable chosen into the api call (url). This time the api call will return a specific wine
            // run api call with the user choice, and store the received data from the API (includes text of pairedWines, pairingText)

    // Step 8
        // MVP - filter the options (if more than 3) by a certain parameter that is within the API (e.g. price / e.g. rating). Most likely we will filter and pull a random cheap option, a random average option and a random expensive option 
            // HOW - set boundaries of what is high low and medium
            // loop through the object against these boundaries and return the high the low and the medium (in seperate arrays)
            // use math.random to pull one of the options from the array (if only one option return that one)
        // then store this filtered data for appending later.



    // Step 9
        // MVP - Append to page the info called from the API
        // This time: 
            // Show the user what they chose (e.g. you chose merlot)
            // Show the user three options based on the category they chose with some details including description, link, price / url (e.g. The Big Kahuna Merlot / $16 / merlot.com / image tag)
        // Stretch goal - show a price range slider. As they update the slider, we update the info shown on the page. 
        // Finally offer an option button for them to start again (this also resets all the data / page info to the initial)



