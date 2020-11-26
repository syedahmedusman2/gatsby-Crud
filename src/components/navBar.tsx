import React from "react"
import Navbar from "react-bootstrap/Navbar"
const styles = require("./navBar.module.css")

export default function NavBar() {
  return (
    <div>
      <Navbar className={styles.navBar} bg="light">
        <Navbar.Brand className={styles.navBarText} href="#home">
          Contact List Application
        </Navbar.Brand>
      </Navbar>
    </div>
  )
}