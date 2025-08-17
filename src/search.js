import React, { useEffect, useState, useRef } from "react";
import { FaSearchLocation } from "react-icons/fa";
import './searchbar.css';

function Search({ onResult }) {
    const [cityInput, setCityInput] = useState('');
    const [stateInput, setStateInput] = useState('');
    const [countryInput, setCountryInput] = useState('');
    
    const cityRef = useRef(null);
    const stateRef = useRef(null);
    const countryRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCityInput(cityRef.current.value);
        setStateInput(stateRef.current.value);
        setCountryInput(countryRef.current.value);
    };

    useEffect(() => {
        if (cityInput && stateInput && countryInput) {
            fetch(`http://api.positionstack.com/v1/forward?access_key=bbd41e7fca9607982e609b380720417c&query=${cityInput},${stateInput},${countryInput}`)
                .then(response => response.json())
                .then(data => {
                    if (data.data && data.data.length > 0) {
                        const { latitude, longitude } = data.data[0];
                        onResult([latitude, longitude]); // Pass result to the parent
                    } else {
                        console.error("No coordinates found");
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [cityInput, stateInput, countryInput, onResult]);

    return (
            <div className="mainSearch">
                < form  onSubmit={handleSubmit} >
                    <div className="inputsearch">
                    <input 
                        ref={cityRef} 
                        className="searchcity" 
                        type="text" 
                        placeholder="Search City"
                    />
                    <input 
                        ref={stateRef} 
                        className="searchstate" 
                        type="text" 
                        placeholder="Search State"
                    />
                    <input 
                        ref={countryRef} 
                        className="searchcountry" 
                        type="text" 
                        placeholder="Search Country"
                    />
                    </div>
                <div className="searchbutton">
                <button className="submitbut" type="submit">
                        Search
                    </button>
                </div>
                </form>
            </div>
    );
}

export default Search;


/*Clear – Indicates clear sky conditions.
Clouds – Refers to cloudy weather (could be broken clouds, overcast, etc.).
Rain – Denotes rainy conditions.
Drizzle – Light rain or drizzle conditions.
Thunderstorm – Indicates thunderstorms.
Snow – Represents snowy weather.
Mist – Misty conditions.
Smoke – Indicates smoke in the air.
Haze – Represents hazy conditions.
Dust – Refers to dust in the air.
Fog – Indicates foggy conditions.
Sand – Refers to sandstorms or sand particles in the air.
Ash – Represents volcanic ash in the air.
Squall – Refers to sudden, sharp increases in wind speed lasting minutes.
Tornado – Indicates tornado conditions.*/

