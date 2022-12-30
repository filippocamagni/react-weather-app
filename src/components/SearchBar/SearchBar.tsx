import React from "react";

import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  fetchWeatherData: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  fetchWeatherData,
  handleInputChange,
}) => {
  return (
    <div className={styles.inner_container}>
      <form onSubmit={fetchWeatherData}>
        <input
          className={styles.input}
          type="search"
          placeholder="Enter a city"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
