/* eslint-disable no-unused-vars */
import React from "react";
import { useHistory } from "react-router";
import styles from "./home.module.scss";
import { RiStackOverflowLine, RiSettings4Fill } from "react-icons/ri";
import { VscEditorLayout } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa";
import { MdPets } from "react-icons/md";

const Home = () => {
  let history = useHistory();
  const goLoginPage = () => {
    history.push("/login");
  };
  return (
    <div className={styles.main}>
      <h1>PORTFOLIO</h1>
      <h2>ABOUT PROJECT</h2>
      <p className={styles.text}>
        <RiSettings4Fill className={styles.icon} size="18" />
        <span>
          기능: 사용자 로그인/로그아웃, 나의 펫 정보 등록 및 조회, 펫
          사진/동영상 조회 및 검색
        </span>
      </p>
      <p className={styles.text}>
        <RiStackOverflowLine className={styles.icon} size="18" />
        <span>
          기술 스택: HTML(+HTML5), SCSS, Javascript, React, postCSS, Firebase,
          axios, Github, Cloudinary, netlify
        </span>
      </p>
      <p className={styles.text}>
        <VscEditorLayout className={styles.icon} size="18" />
        <span>Oven(프로토타입) URL: </span>
      </p>
      <p className={styles.text}>
        <FaGithub className={styles.icon} size="18" />
        <span>
          Github:
          <button
            onClick={() =>
              window.open("https://github.com/mkfdev/my-react-app", "_blank")
            }
            className={styles.link}
          >
            https://github.com/mkfdev/my-react-app
          </button>
        </span>
      </p>
      <div className={styles.project}>
        <strong>
          START PROJECT
          <MdPets className={styles.icon} />
        </strong>
        <button onClick={goLoginPage} className={styles.button}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default Home;
