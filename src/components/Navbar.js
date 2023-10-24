import React from 'react'
import { Row, message } from "antd";
import { AiOutlineLogout } from "react-icons/ai";
import styles from "../styles/Navbar.module.scss"
import logo from "../images/khoj-logo.png"
const Navbar = () => {
  return (
    <Row className={styles.navContainer}>
      <Row className={styles.navItems}>
      <img src={logo} alt="KHOJ Logo" style={{ height: "50px", marginLeft: "100px" }} />
        <a className={styles.navLogo} href="/">
          <h2>KHOJ</h2>
        </a>
      </Row>
      <Row className={styles.navItems}>
        <AiOutlineLogout
          color="#1b76ff"
          style={{ fontSize: "30px", cursor: "pointer", marginRight: "100px" }}
          className={styles.navLogo}
        />
      </Row>
    </Row>
  )
}

export default Navbar