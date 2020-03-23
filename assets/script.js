
onOpen()

//function runs when page opens
function onOpen(){
    // extract stored data
    savedCities = JSON.parse(localStorage.getItem("savedCities"));

    // if there are cities on the list show details from last search
    if (savedCities) {
        city = savedCities[savedCities.length-1];
        displayCurrent(city);
        displayForecast(city);
        retrieveButtons(event);
    }
    // if there is no stored data show Perth as default
    else {
        city = "Perth";
        displayCurrent(city);
        displayForecast(city);
        retrieveButtons(event);
    }
}

// create buttons for all items in storage 
function retrieveButtons() {
    
    var savedCities = JSON.parse(window.localStorage.getItem("savedCities")) || [];

    savedCities.forEach(function(value){
        var city = value
        createButton(city)
    })

}

//when search button clicked find the city and pass through to the relevant functions
$("#searchBttn").on("click", function () {

    var city = $("#citySearch").val()
    
    displayCurrent(city);
    displayForecast(city);
    saveCity(city);
    createButton(city);
    
}); 

function displayCurrent (city) {

   
    var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d6db38001e351111dd620023b7c30d07";
        
    // 5 day forecast
    $.ajax({
        url: currentUrl,
        method: "GET",
        //on error clear all fields and show warning at top of page
        error: function() {
            $("#city").text("Error - City Not Found");
            $("#city").addClass("error");
            $("#temperature").text(" ");
            $("#humidity").text(" ");
            $("#wind").text(" ");
            $("#icon").attr({
                src: "",
                alt: ""});
            $("#date").text(" ");
        }
    }).then(function(response) {

        //get latitude and longitude to run UV index function
        var lat = (response.coord.lat);
        var lon = (response.coord.lon);
        
        getUV(lat, lon);
        
        //get temperature and format it from kelvin to celsius to 2 decimal places
        var tempInt = ((response.main.temp)-273.1).toFixed(2);
        $("#temperature").text( + tempInt + "℃");

        //get humidity
        var humidity = (response.main.humidity);
        $("#humidity").text(humidity +" %");

        //get windspeed and change to km/h to the nearest whole figure
        var windSpeed = ((response.wind.speed)*3.6).toFixed(0);
        $("#wind").text(windSpeed+ " km/h");

        //get city name
        var city = (response.name);
        $("#city").removeClass("error");
        $("#city").text(city);

        //change date to milliseconds and run through date formatting function
        var unixDate = (response.dt)*1000;

        currentDate(unixDate);
        
        //get icon name and lookup icon url to return image
        var icon = (response.weather[0].icon);
        var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
        $("#icon").attr({
            src: iconUrl,
            alt: "weatherIcon"});

    });
}


// tak the latitude and longitude and run through the UV API
function getUV(lat, lon) {
    
    var UVUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=d6db38001e351111dd620023b7c30d07";

    //use url to get data
    $.ajax({
        url:UVUrl,
        method: "GET"
    }).then(function(response) {

        //get UV value from response
        var uvValue = (response.value);


        //place uv value in relevant field
        $("#uv").text(uvValue);

    })
}

//format the current date and set to relevant field
function currentDate(unixDate) {
 
    //change date format
    var date = new Date(unixDate);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    //Bring all variables together to create correct date format
    var fullDate = day + "/" + month + "/" + year;

    //Place in dtae field
    $("#date").text("(" + fullDate + ")");

}

// take the city and run through the forecast API 
function displayForecast(city) {

    $("#forecast").empty();

    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d6db38001e351111dd620023b7c30d07";

    // 5 day forecast
    $.ajax({
        url: forecastUrl,
        method: "GET"
    }).then(function(response) {

        //loop through the api object array for each day (day split into 3 hr increments so every 7th index required)
        for (i = 7 ; i <= 40 ; i+=7) {
            var tempFC ="Temp: " + ((response.list[i].main.temp)-273.1).toFixed(2) + " ℃";
            var humidityFC = "Humidity: " + (response.list[i].main.humidity) + "%";
            var unixDateFC = (response.list[i].dt)*1000;
            var dateFC = new Date(unixDateFC)
            var yearFC = dateFC.getFullYear()
            var monthFC = dateFC.getMonth()+1
            var dayFC = dateFC.getDate()
            var fullDateFC = dayFC + "/" + monthFC + "/" + yearFC
            var iconFC = (response.list[i].weather[0].icon);
            var iconUrlFC = "https://openweathermap.org/img/w/" + iconFC + ".png";


            //create HTML to contain the above information and append to forecast area
            var column = $("<div>").attr("class", "col card forecast text-light text-center")
            var dateLine = $("<h5>").text(fullDateFC)
            var iconLine = $("<div>")
            var iconImg = $("<img>").attr({
                src: iconUrlFC,
                alt: "weatherImage"})

            iconLine.append(iconImg)

            var tempLine = $("<div>").text(tempFC)          
            var humidityLine = $("<div>").text(humidityFC)
            column.append(dateLine, iconLine, tempLine, humidityLine)

            $("#forecast").append(column)           

        };
        
    })

}

// When an item is searched save it to local storage
function saveCity(city) {

    var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

    //push score array to local storage
    savedCities.push(city);
    window.localStorage.setItem("savedCities", JSON.stringify(savedCities));

}

function getCity(){
    var city = $(this).attr("data-city");
    displayCurrent(city);
    displayForecast(city);
}

// When an item is searched add it to the list of cities
function createButton(city) {
    var button = $("<button>").attr({
        type: "button", 
        class: "btn btn-light btn-block btn-lg city_button",
        "data-city": city})

    button.text(city)
    button.on("click", getCity)
    $("#cityBttns").append(button)
    
}

//when one of the city buttons is clicked the city name is extracted and run through the relevant functions
$(".city_button").on("click", getCity)