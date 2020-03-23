//start with an empty array
var cities = []

displayCurrent()

function displayCurrent () {

    var city = "Greenock";
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
        var tempInt =((response.main.temp)-273.1).toFixed(2);
        $("#temperature").text(tempInt);

        //get humidity
        var humidity = (response.main.humidity);
        $("#humidity").text(humidity);

        //get windspeed and change to km/h to the nearest whole figure
        var windSpeed = ((response.wind.speed)*3.6).toFixed(0);
        $("#wind").text(windSpeed)

        //get city name
        var city = (response.name);
        $("#city").text(city);

        //change date to milliseconds and run through date formatting function
        var unixDate = (response.dt)*1000;

        currentDate(unixDate)
        
        //get icon name and lookup icon url to return image
        var icon = (response.weather[0].icon);
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        $("#icon").attr("src", iconUrl)

        console.log(response);

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

    var date = new Date(unixDate)
    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day = date.getDate()
    var fullDate = day + "/" + month + "/" + year

    $("#date").text(fullDate)

}


function displayForecast() {

    var city = "Greenock";
    var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d6db38001e351111dd620023b7c30d07";
    
    
    
    
    
    // 5 day forecast
    $.ajax({
        url: forecastUrl,
        method: "GET"
    }).then(function(response) {

        for (i = 0 ; i <= 33 ; i+=8) {
            var tempForecast =((response.list[i].main.temp)-273.1).toFixed(2);
            var humidityForecast = (response.list[i].main.humidity);
            var unixDateFC = (response.list[i].dt)*1000;
            var dateFC = new Date(unixDateFC)
            var yearFC = dateFC.getFullYear()
            var monthFC = dateFC.getMonth()+1
            var dayFC = dateFC.getDate()
            var fullDateFC = dayFC + "/" + monthFC + "/" + yearFC
            var iconFC = (response.list[i].weather[0].icon);
            var iconUrlFC = "http://openweathermap.org/img/w/" + iconFC + ".png";

    

            console.log(response);
            console.log(tempForecast);
            console.log(humidityForecast);
            console.log(fullDateFC);
            console.log(icon);



        }
        
        
    })

}

displayForecast()
