const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
  const query = req.body.city;
  const apiKey = "1a2cecf1ca58c549ddca68dc06980c82";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {

    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      //console.log(JSON.stringify(weatherData));
      const temp = weatherData.main.temp;
      //console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      //console.log(weatherDescription);
      const icon = weatherData.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + "degree Celcius.</h1>");
      res.write("<img src=" + imageurl + "></img?")
      res.send();
    })
  });
});

app.listen(3000, function() {
  console.log("Servere is running on port 3000");
})
