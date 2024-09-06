import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const port = 3000;
const app = express();
const apiKey = 'ac3600fc4b9a47bb90f130553240409'
var latitude;
var longitude;
var date;
var time;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.listen(port, () => {
    console.log("Server is listening in port 3000");
});

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/submit", async(req, res) => {
    latitude = req.body.latitude;
    longitude = req.body.longitude;
    try{
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}`)

        date = response.data.location.localtime.slice(0,10); 
        time = response.data.location.localtime.slice(11,16)
        res.render("home.ejs", {
            location: response.data.location.name,
            countryDate: date,
            countryTime: time,
            temperature: response.data.current.temp_c,
            weather: response.data.forecast.forecastday[0].day.condition.text,
            humidityPercent: response.data.current.humidity,
            wind_KPH: response.data.current.wind_kph,
            Precipitation_mm: response.data.current.precip_mm,
            UV_index: response.data.current.uv,
            maxTemperature: response.data.forecast.forecastday[0].day.maxtemp_c,
            chanceOfRain: response.data.forecast.forecastday[0].day.daily_chance_of_rain
        })
    }
    catch(error){
        console.error("Failed to make request,", error.message);
    }

    
})