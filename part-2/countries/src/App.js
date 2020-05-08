import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = ({ city }) => {
  const { temperature, weather_icons, wind_speed, wind_dir } = city;
  return (
    <>
      <p>temperature: {temperature} celcius </p>
      <img src={weather_icons} alt='weather icon' width='100px' />
      <p>
        wind: {wind_speed} mph direction {wind_dir}
      </p>
    </>
  );
};

const SingleCountry = ({ data }) => {
  const [city, setState] = useState(null);
  const { name, capital, population, languages, flag } = data[0];

  useEffect(() => {
    let source = axios.CancelToken.source();
    const fetchData = async () => {
      const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`;

      const result = await axios.get(url, {
        cancelToken: source.token,
      });

      setState(result.data.current);
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, [capital]);

  return (
    <div>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>population {population}</p>

      <h3>languages</h3>

      <ul>
        {languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>

      <img src={flag} alt={`${name}'s flag`} width='100px' />

      {city && (
        <>
          <h3>Weather in {capital}</h3>

          <WeatherWidget city={city} />
        </>
      )}
    </div>
  );
};

const CountriesList = ({ countries }) => {
  const [countryList, setCountry] = useState([]);

  return (
    <>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        countries.map((country) => (
          <div key={country.name}>
            {country.name}
            {countries.length !== 1 && (
              <button
                onClick={() => {
                  setCountry([country]);
                }}
              >
                show
              </button>
            )}
          </div>
        ))
      )}

      {countryList.length > 0 && countries.length !== 1 && (
        <SingleCountry data={countryList} />
      )}
    </>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) => setCountriesData(data));
  }, []);

  const searchHandler = (event) => setSearchTerm(event.target.value);

  const filteredBySearch = countriesData.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      find countries <input value={searchTerm} onChange={searchHandler} />
      {searchTerm ? <CountriesList countries={filteredBySearch} /> : ''}
      {filteredBySearch.length === 1 && (
        <SingleCountry data={filteredBySearch} />
      )}
    </div>
  );
}

export default App;
