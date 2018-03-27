# SER421lab5

This application addresses following problem statement:
An example is given here:  http://api.openweathermap.org/data/2.5/weather?q=London,uk
1.	Displays a list of 3 cities and their associated data. The data should be retrieved and parsed out of the JSON at URLs like the above via an AJAX call. The data you should display in a table:
a.	A city name and 2-letter country code. Examples: London,UK and Phoenix,US
b.	A timestamp when the data was last updated.
c.	Temperature in Celsius
d.	Humidity – a percentage. Example: 70 means “70% humidity”
e.	Wind speed – miles per hour 
f.	Cloudiness – a percentage. Example: 10 means “10% cloudy”
When initially loaded, the application should initialize the rows for 2 of the 3 cities, London, UK and Phoenix, US. The 3rd city may be any city and is described next.
2.	The 3rd city should be populated by selecting from a set of 5 cities in a dropdown. You may populate the dropdown with any 5 cities you like. When a new city is selected, you should populate its data in the 3rd row.
3.	At the bottom of the page, display the following lines based on dynamic calculations of retrived information:
a.	“The average temperature is AAA and the hottest city is TTT”
b.	“The average humidity is BBB and the most humid city is HHH”
c.	“The city with the nicest weather is XXX”
d.	“The city with the worst weather is YYY”



## Development server
Run `npm install` to install all the dependencies.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
