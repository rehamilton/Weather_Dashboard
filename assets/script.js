//start with an empty array



$("button").on("click", function () {

    displayCurrent(event);
    displayForecast(event);

}); 



function displayCurrent () {

    var city = $("#citySearch").val()
    var currentUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d6db38001e351111dd620023b7c30d07";
        
    // 5 day forecast
    $.ajax({
        url: currentUrl,
        method: "GET"
    }).then(function(response) {

       

        //get latitude and longitude to run UV index function
        var lat = (response.coord.lat)
        var lon = (response.coord.lon)
        
        getUV(lat, lon)
        
        //get temperature and format it from kelvin to celsius to 2 decimal places
        var tempInt = ((response.main.temp)-273.1).toFixed(2);
        $("#temperature").text( + tempInt + "℃");

        //get humidity
        var humidity = (response.main.humidity);
        $("#humidity").text(humidity +" %");

        //get windspeed and change to km/h to the nearest whole figure
        var windSpeed = ((response.wind.speed)*3.6).toFixed(0);
        $("#wind").text(windSpeed+ " km/h")

        //get city name
        var city = (response.name);
        $("#city").text(city);

        //change date to milliseconds and run through date formatting function
        var unixDate = (response.dt)*1000;

        currentDate(unixDate)
        
        //get icon name and lookup icon url to return image
        var icon = (response.weather[0].icon);
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        $("#icon").attr({
            src: iconUrl,
            alt: "weatherIcon"})

        //console.log(response);

    });
}



function getUV(lat, lon) {
    //set wthe url at which the uv information can be found
    var UVUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=d6db38001e351111dd620023b7c30d07";

    //use url to get data
    $.ajax({
        url:UVUrl,
        method: "GET"
    }).then(function(response) {

        //console.log(response);

        //get UV value from response
        var uvValue = (response.value)

        //place uv value in relevant field
        $("#uv").text(uvValue)

    })
}

function currentDate(unixDate) {
 
    //change date format
    var date = new Date(unixDate)
    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day = date.getDate()
    //Bring all variables together to create correct date format
    var fullDate = day + "/" + month + "/" + year

    //Place in dtae field
    $("#date").text("(" + fullDate + ")")

}


function displayForecast() {

    $("#forecast").empty()

    var city = $("#citySearch").val();
    var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d6db38001e351111dd620023b7c30d07";

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
            var iconUrlFC = "http://openweathermap.org/img/w/" + iconFC + ".png";


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

function createButton() {

}