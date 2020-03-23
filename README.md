# Weather_Dashboard
Weather Dashboard

A weather dashboard was created following the below acceptance criteria set out in the homework. 

Below this I have broken down how the javascript works to achieve the acceptance criteria. 

## Reference 

For reference, the following requirements were set out in the homework.

## Acceptance Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## On Page Open

On opening the page the dashboard will show the details of the last city searched or default to Perth. Any previous searches will be shown in buttons on the side of the page.

![markdownAssets/OnPageOen.png]( "Page Open")

## On search of city

When a city is searched the current weather and forecast will be updated. If there is an error all details will be empty and an error will show.


## On click of a saved City

When the button of a saved city is clicked the dashboard wioll update to show that citys info.