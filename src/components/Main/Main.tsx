import { WiThermometer } from "react-icons/wi";
import { WiThermometerExterior } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";

import styles from "./Main.module.scss";
import img01 from "../../img/01.svg";
import img02 from "../../img/02.svg";
import img03 from "../../img/03.svg";
import img09 from "../../img/09.svg";
import img10 from "../../img/10.svg";
import img11 from "../../img/11.svg";
import img13 from "../../img/13.svg";

interface MainProps {
  weatherData: { [key: string]: any };
  errorLog: {
    code: number;
    message: string;
  };
  loading: boolean;
}

const Main: React.FC<MainProps> = ({ weatherData, errorLog, loading }) => {
  const displayTemperature = (temp: number) => {
    if (temp < 0) {
      return (
        <div className={styles.temp}>
          <span className={styles.temp_minus}>-</span>
          {weatherData.main.temp.toFixed().toString().slice(1, 3)}
          <span className={styles.temp_data}> °C</span>
        </div>
      );
    } else {
      return (
        <div className={styles.temp}>
          {weatherData.main.temp.toFixed()}
          <span className={styles.temp_data}> °C</span>
        </div>
      );
    }
  };

  const getWeatherSvg = (code: number) => {
    if (code >= 200 && code <= 232) {
      return img11;
    }
    if (code >= 300 && code <= 321) {
      return img09;
    }
    if (code >= 500 && code <= 504) {
      return img10;
    }
    if (code >= 511 && code <= 531) {
      return img09;
    }
    if (code >= 600 && code <= 622) {
      return img13;
    }
    if (code >= 700 && code <= 781) {
      return img03;
    }
    if (code === 800) {
      return img01;
    }
    if (code === 801 || code === 802) {
      return img02;
    }
    if (code === 803 || code === 804) {
      return img03;
    }
  };

  // const getFullDate = () => {
  //   const date = new Date();
  //   const monthNames = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   const day = date.getDate();
  //   const month = monthNames[date.getMonth()];
  //   const year = date.getFullYear();
  //   return `${month} ${day}, ${year}`;
  // };

  const convertCountryCodeToName = (code: string) => {
    const countryName = new Intl.DisplayNames(["en"], { type: "region" });
    return countryName.of(code);
  };

  if (loading) {
    return (
      <div className={styles.error_container}>
        <p>{errorLog.message ? errorLog.message : "Loading..."}</p>
      </div>
    );
  } else {
    return (
      <div className={`${styles.main_container}`}>
        <p className={styles.city}>
          {weatherData.name.length >= 21
            ? weatherData.name.substring(0, 19) + "... "
            : weatherData.name + " "}
        </p>
        <p className={styles.country}>
          ({convertCountryCodeToName(weatherData.sys.country)})
        </p>
        <img
          src={getWeatherSvg(weatherData.weather[0].id)}
          alt="weather_img"
          className={styles.image}
        />
        <div className={styles.inner_container}>
          {/* Left side */}
          <div className={styles.degrees}>
            {displayTemperature(weatherData.main.temp)}
          </div>
          {/* Right side */}
          <div>
            <div className={styles.temp_container}>
              <WiThermometer className={styles.temp_icon} />
              <span className={styles.temp_minMax}>
                {weatherData.main.temp_max.toFixed()}°
              </span>
            </div>
            <div className={styles.temp_container}>
              <WiThermometerExterior className={styles.temp_icon} />
              <span className={styles.temp_minMax}>
                {weatherData.main.temp_min.toFixed()}°
              </span>
            </div>
            <div className={styles.temp_container_inner}>
              <WiStrongWind className={styles.temp_icon} />
              <span className={styles.temp_minMax}>
                {weatherData.wind.speed} m/s
              </span>
            </div>
          </div>
        </div>
        <h2 className={styles.weather}>{weatherData.weather[0].main}</h2>
      </div>
    );
  }
};

export default Main;
