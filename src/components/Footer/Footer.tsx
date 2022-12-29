import styles from "./Footer.module.scss";

interface FooterProps {
  weatherData: { [key: string]: any };
  loading: boolean;
  errorLog: {
    code: number;
    message: string;
  };
}

const Footer: React.FC<FooterProps> = ({ weatherData, loading, errorLog }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${styles.item__1}`}>
        <p className={styles.title}>Feels like</p>
        {!loading && (
          <p className={styles.data}>
            {weatherData.main.feels_like.toFixed()}
            <span className={styles.data__adds}> °C</span>
          </p>
        )}
        {errorLog.code === 404 && <p className={styles.data}>-</p>}
      </div>
      <div className={`${styles.item} ${styles.item__2}`}>
        <p className={styles.title}>Humidity</p>
        {!loading && (
          <p className={styles.data}>
            {weatherData.main.humidity}
            <span className={styles.data__adds}> %</span>
          </p>
        )}
        {errorLog.code === 404 && <p className={styles.data}>-</p>}
      </div>
      <div className={`${styles.item} ${styles.item__3}`}>
        <p className={styles.title}>Pressure</p>
        {!loading && (
          <p className={styles.data}>
            {weatherData.main.pressure}
            <span className={styles.data__adds}> hPa</span>
          </p>
        )}
        {errorLog.code === 404 && <p className={styles.data}>-</p>}
      </div>
    </div>
  );
};

export default Footer;
