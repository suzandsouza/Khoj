import { Button, Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <Col className={styles.containerController}>
        <Col className={styles.text}>
          <h1>
          Innovate, Fund, Transform
          </h1>
          <h2>Empower Tomorrow's Innovators Today</h2>
          <Button type="primary" className={styles.button}>
          {/* <Link to="/signin">Signin</Link> */}
          </Button>
        </Col>
      </Col>
      <Navbar />
    </div>
  );
}