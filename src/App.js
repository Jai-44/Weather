import React, { useState } from "react";
import Search from './search';
import Location from './location';
import './App.css';

function App() {
    const [location, setLocation] = useState([0, 0]);

    const handleResult = (result) => {
        setLocation(result);
    };

    return (
        <div className="App">
            <Search  onResult={handleResult} />
            <Location location={location} />
        </div>
    );
}
export default App;
