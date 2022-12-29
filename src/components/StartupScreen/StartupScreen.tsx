import React, { useState } from "react";

import { AiFillGithub, AiFillLinkedin, AiTwotoneMail } from "react-icons/ai";

import { FaInfo, FaReact } from "react-icons/fa";

import ow_logo from "../../img/ow_logo.svg";
import react from "../../img/react.svg";
import sass from "../../img/sass.svg";
import ts from "../../img/ts.svg";
import js from "../../img/js.svg";

import styles from "./StartupScreen.module.scss";

const StartupScreen: React.FC = () => {
  const [active, setActive] = useState(1);
  const [tabValue, setTabValue] = useState(1);
  const [iconToggle, setIconToggle] = useState(false);

  const handleIconToggle = () => {
    setIconToggle((prev) => !prev);
  };

  const handleClick = (id: number) => {
    setTabValue(id);
    setActive(id);
  };

  return (
    <>
      <div className={styles.container_main}>
        <h1 className={styles.stup_h1}>
          A <FaReact className={styles.react_icon} /> weather app
        </h1>
        <div className={styles.container_nav}>
          <button
            onClick={() => handleClick(1)}
            className={
              active === 1
                ? `${styles.stup_button} ${styles.stup_button__1} ${styles.stup_button__active}`
                : `${styles.stup_button} ${styles.stup_button__1}`
            }
          >
            About
          </button>
          <button
            onClick={() => handleClick(2)}
            className={
              active === 2
                ? `${styles.stup_button} ${styles.stup_button__2} ${styles.stup_button__active}`
                : `${styles.stup_button} ${styles.stup_button__2}`
            }
          >
            Stack
          </button>
          <button
            onClick={() => handleClick(3)}
            className={
              active === 3
                ? `${styles.stup_button} ${styles.stup_button__3} ${styles.stup_button__active}`
                : `${styles.stup_button} ${styles.stup_button__3}`
            }
          >
            API
          </button>
        </div>
        {tabValue === 1 && (
          <div className={`${styles.container_tab} ${styles.tab_about}`}>
            <p className={styles.stup_p}>
              I built this tiny weather app for learning purposes using{" "}
              <strong>TypeScript</strong>, <strong>React.js</strong> and{" "}
              <strong>SCSS</strong>.
            </p>
            <p className={styles.stup_p}>
              The customized SVG weather icons are downloaded from{" "}
              <strong>
                <a
                  className={styles.stup_a}
                  href="https://www.amcharts.com/free-animated-svg-weather-icons/"
                  target="_blank"
                  rel="noreferrer"
                >
                  amcharts.com
                </a>
              </strong>
              . All the other icons come from the{" "}
              <strong>
                <a
                  className={styles.stup_a}
                  href="https://react-icons.github.io/react-icons/"
                  target="_blank"
                  rel="noreferrer"
                >
                  react-icons
                </a>
              </strong>{" "}
              library (Font Awesome, Ant Design, Weather).
            </p>
          </div>
        )}
        {tabValue === 2 && (
          <div className={`${styles.container_tab} ${styles.tab_tech}`}>
            <img className={styles.stup_img_tech} src={js} alt="javascript" />
            <img className={styles.stup_img_tech} src={ts} alt="typescript" />
            <img className={styles.stup_img_tech} src={react} alt="react" />
            <img className={styles.stup_img_tech} src={sass} alt="sass" />
          </div>
        )}
        {tabValue === 3 && (
          <div className={`${styles.container_tab} ${styles.tab_api}`}>
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className={styles.stup_img_api}
                src={ow_logo}
                alt="openweather"
              />
            </a>
          </div>
        )}
      </div>
      <div className={styles.container_contact}>
        <div className={styles.container_contact__left}>
          <button
            className={styles.contact_info_btn}
            onClick={handleIconToggle}
          >
            <FaInfo className={styles.contact_info_icon} />
          </button>
        </div>
        <div className={styles.container_contact__right}>
          <a
            href="https://www.linkedin.com/in/filippocamagni/"
            target="_blank"
            rel="noreferrer"
            className={styles.contact_btn}
          >
            <AiFillLinkedin
              className={
                iconToggle
                  ? `${styles.contact_icon} ${styles.contact_icon__1}`
                  : `${styles.contact_icon} ${styles.contact_icon__1h}`
              }
            />
          </a>
          <a
            href="https://github.com/filippocamagni"
            target="_blank"
            rel="noreferrer"
            className={styles.contact_btn}
          >
            <AiFillGithub
              className={
                iconToggle
                  ? `${styles.contact_icon} ${styles.contact_icon__2}`
                  : `${styles.contact_icon} ${styles.contact_icon__2h}`
              }
            />
          </a>
          <div className={styles.contact_btn}>
            <AiTwotoneMail
              className={
                iconToggle
                  ? `${styles.contact_icon} ${styles.contact_icon__3}`
                  : `${styles.contact_icon} ${styles.contact_icon__3h}`
              }
            />
            {iconToggle && (
              <span className={styles.tooltip}>
                filippocamagni[at]gmail[dot]com
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StartupScreen;
