import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import ejs from "ejs";

const app=express();


const APiKEY='4894d794c7c8451fb2b45204232907'
const APIURL="http://api.weatherapi.com/v1/forecast.json"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let startingplace="Search a place";
const startingregion="region";
const startingcountry="country";

app.get("/",async(req,res)=>{
    res.render("index.ejs",{place:startingplace,region:startingregion,country:startingcountry,
        temp:"0",locationtime:"",text:"",icon:"",wind:"",pre:"",humidity:"",vis:"", maxtemp:"",
        mintemp:"",
        sunrise:"",
        sunset:"",
        hours:["",""]
    
    })
    
})

app.post("/",async(req,res)=>{
    let place=req.body.add;
    
    const response =await axios.get(APIURL,{
        params:{
            key:APiKEY,
            q:place,
            aqi:"no",
            alerts:"yes",
            day:"5"
        }
    })
   
    
    
   const hours=response.data.forecast.forecastday[0].hour
    res.render("index.ejs",{place:response.data.location.name,
    region:response.data.location.region,
    country:response.data.location.country,
    temp:response.data.current.temp_c,
    locationtime:response.data.location.localtime,
    text:response.data.current.condition.text,
    icon:response.data.current.condition.icon,
    wind:response.data.current.wind_kph,
    humidity:response.data.current.humidity,
    pre:response.data.current.pressure_mb,
    vis:response.data.current.vis_km,
    maxtemp:response.data.forecast.forecastday[0].day.maxtemp_c,
    mintemp:response.data.forecast.forecastday[0].day.mintemp_c,
    sunrise:response.data.forecast.forecastday[0].astro.sunrise,
    sunset:response.data.forecast.forecastday[0].astro.sunset,
    hours:hours
    
    

})
console.log(hours[0])
    
})



app.listen(process.env.PORT || 3000,()=>{
    console.log("running at 3000");
})