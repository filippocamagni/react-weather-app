import React, { useState } from "react";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import SearchBar from "./components/SearchBar/SearchBar";
import StartupScreen from "./components/StartupScreen/StartupScreen";

import styles from "./App.module.scss";

function App() {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [location, setLocation] = useState("");
  const [lastLocation, setLastLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [firstStart, setFirstStart] = useState(true);
  const [errorLog, setErrorLog] = useState<{
    code: number;
    message: string;
  }>({ code: 0, message: "" });

  const fetchWeatherData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (location === "") {
      return;
    }
    setLastLocation(location);
    if (lastLocation === location) {
      return;
    }
    const url = `${process.env.REACT_APP_URL}?q=${location}&units=metric&appid=${process.env.REACT_APP_ID}`;
    setLoading(true);
    setFirstStart(false);
    try {
      const response = await fetch(url);
      if (response.status === 404) {
        setFirstStart(false);
        setErrorLog({
          code: 404,
          message: "City not found. Enter a valid city",
        });
        return;
      }
      if (response.status === 400) {
        setFirstStart(false);
        setErrorLog({ code: 400, message: "Error. Check your connection" });
        return;
      }
      const weatherData = await response.json();
      setLoading(false);
      setData(weatherData);
    } catch (err) {
      console.log(
        "Unable to fetch weather data. Check your Internet connection and try again."
      );
    }
    setErrorLog({ code: 200, message: "Loading data..." });
  };

  const handleInputChange = (event: React.ChangeEvent) => {
    setLocation((event.target as HTMLInputElement).value);
  };

  return (
    <div
      className={
        !loading
          ? data.weather[0].main === "Thunderstorm"
            ? `${styles.container} ${styles.thunderstorm}`
            : data.weather[0].main === "Drizzle"
            ? `${styles.container} ${styles.drizzle}`
            : data.weather[0].main === "Rain"
            ? `${styles.container} ${styles.rain}`
            : data.weather[0].main === "Snow"
            ? `${styles.container} ${styles.snow}`
            : data.weather[0].main === "Clear"
            ? `${styles.container} ${styles.clear}`
            : data.weather[0].main === "Clouds"
            ? `${styles.container} ${styles.clouds}`
            : data.weather[0].main === "Fog" || data.weather[0].main === "Mist"
            ? `${styles.container} ${styles.fog}`
            : `${styles.container}`
          : `${styles.container}`
      }
    >
      {/* SearchBar */}
      <div className={`${styles.item}`}>
        <SearchBar
          handleInputChange={handleInputChange}
          fetchWeatherData={fetchWeatherData}
        />
      </div>
      {/* Main */}

      {!firstStart ? (
        <div className={`${styles.item} ${styles.item__2}`}>
          <Main weatherData={data} loading={loading} errorLog={errorLog} />
        </div>
      ) : (
        <StartupScreen />
      )}
      {/* Footer */}
      {!firstStart && (
        <div className={`${styles.item} ${styles.item__3}`}>
          <Footer weatherData={data} errorLog={errorLog} loading={loading} />
        </div>
      )}
    </div>
  );
}

export default App;
