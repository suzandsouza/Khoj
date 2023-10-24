import { Button, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.scss";
import Footer from "../components/Footer";
import MainPage from "../components/MainPage";
import bg1 from "../images/bg1.png"
export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <Col className={styles.containerController}>
        <Col className={styles.text}>
          <h1>
          Innovate, Fund,<br/>Transform
          </h1>
          <h2>Empower Tomorrow's Innovators Today!</h2>
          <Button type="primary" className={styles.button}>
          <a href="/signup">Signup Now!</a>
          </Button>
        </Col>
        <Col>
        <img src={bg1} alt="KHOJ Logo" style={{ height: "470px"}} />
        </Col>
      </Col>
      <MainPage/>
      <Footer />
    </div>
  );
}