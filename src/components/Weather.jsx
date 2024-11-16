import React, {useEffect, useState} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icone from '../assets/clear.png'
import cloud_icone from '../assets/cloud.png'
import drizzle_icone from '../assets/drizzle.png'
import humidity_icone from '../assets/humidity.png'
import rain_icone from '../assets/rain.png'
import snow_icone from '../assets/snow.png'
import wind_icone from '../assets/wind.png'
import { useRef } from 'react'

function Weather() {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false)
    const allIcon = {
        "01d": clear_icone,
        "01n": clear_icone,
        "02d": cloud_icone,
        "02n": cloud_icone,
        "03d": cloud_icone,
        "03n": cloud_icone,
        "04d": drizzle_icone,
        "04n": drizzle_icone,
        "09d": rain_icone,
        "09n": rain_icone,
        "10d": rain_icone,
        "10n": rain_icone,
        "13d": snow_icone,
        "13n": snow_icone,
    }
    const search = async (city)=>{
        if(city === "") {
            alert("Please Enter City Name")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message)
                return;
            }
            console.log(data);
            const icon = allIcon[data.weather[0].icon] || clear_icone
            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon

            })
        } catch (error) {
            setWeatherData(false);
            console.log("Error in fetching weather data");
        }
    }

    useEffect(() => {
        search("London")
    },[])
    
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
            <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icone} alt="" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={wind_icone} alt="" />
                <div>
                    <p>{weatherData.wind} km/h</p>
                    <span>Wind</span>
                </div>
            </div>
        </div>
        </>:<></>}
        
    </div>
  )
}

export default Weather