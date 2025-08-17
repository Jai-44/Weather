import React, { useEffect, useState } from "react";
import './searchbar.css'
import ReactAnimatedWeather from 'react-animated-weather';

function Location({ location }) {
    const [temp, setTemp] = useState(0);
    const [forecast, setForecast] = useState('');
    const [desc, setDesc] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        if (location[0] !== 0 && location[1] !== 0) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=3351f7a9ae9db5dd27d7b7e997f7b8a8&units=metric`)
                .then(response => response.json())
                .then(data => {
                    setTemp(data.main.temp);
                    setForecast(data.weather[0].main);
                    setDesc(data.weather[0].description);
                    
                    switch (data.weather[0].main) {
                        case 'Clear':
                            setIcon('CLEAR_DAY');
                            break;
                        case 'Clouds':
                            setIcon('CLOUDY');
                            break;
                        case 'Rain':
                            setIcon('RAIN');
                            break;
                        case 'Drizzle':
                            setIcon('RAIN');
                            break;
                        case 'Thunderstorm':
                            setIcon('SLEET');
                            break;
                        case 'Snow':
                            setIcon('SNOW');
                            break;
                        case 'Mist':
                        case 'Smoke':
                        case 'Haze':
                        case 'Dust':
                        case 'Fog':
                            setIcon('FOG');
                            break;
                        case 'Sand':
                        case 'Ash':
                            setIcon('FOG'); // Use FOG for sand and ash, as there is no specific icon
                            break;
                        case 'Squall':
                        case 'Tornado':
                            setIcon('WIND');
                            break;
                        default:
                            setIcon('PARTLY_CLOUDY_DAY');
                            break;
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [location]);

    return (
        <div className="finalres">
            {temp && forecast && desc && (
                <>
                    <p>{Math.floor(temp)}°C</p>
                    <ReactAnimatedWeather
                        icon={icon}
                        color="black"
                        size={128}
                        animate={true}
                    />
                    <p>{forecast}</p>
                    <p>{desc}</p>
                </>
            )}
        </div>
    );
}

export default Location;

