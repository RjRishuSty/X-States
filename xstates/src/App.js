import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countrie, setCountrie] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedData, setSelectedData] = useState({
    countrie: "",
    state: "",
    city: "",
  });
  const handleChange = (e) => {
    setSelectedData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "countrie") {
      setState([]);
      setCity([]);
      selectedData.state = "";
      selectedData.city = "";
    } else if (e.target.name === "state") {
      setCity([]);
      selectedData.city = "";
    }
  };
  // console.log("Form", selectedData);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/countries`
      );
      setCountrie(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedData.countrie}/states`
      );
      setState(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCity = async () => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${selectedData.countrie}/state=${selectedData.state}/cities`
      );
      setCity(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountries();
    if (selectedData.countrie) {
      fetchStates();
    }
    if (selectedData.state) {
      fetchCity();
    }
  }, [selectedData.countrie, selectedData.state]);

  // console.log("selected", selectedData);

  return (
    <div className="App">
      <h2>
        Select Location <hr />
      </h2>
      <form>
        <select
          name="countrie"
          value={selectedData.countrie}
          onChange={handleChange}
        >
          <option value="" disabled>
            Countries
          </option>
          {countrie.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          name="state"
          value={selectedData.state}
          disabled={!selectedData.countrie}
          onChange={handleChange}
        >
          <option value="" disabled>
            States
          </option>
          {state.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          name="city"
          value={selectedData.city}
          disabled={!selectedData.state}
          onChange={handleChange}
        >
          <option value="" disabled>
            Cities
          </option>
          {city.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </form>
      {selectedData.countrie && selectedData.state && selectedData.city ? (
        <div className="selected">
          <h3>You Selected <span className="countires"> {selectedData.city}</span>,<span> {selectedData.state}, {selectedData.countrie}
            </span>
          </h3>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
