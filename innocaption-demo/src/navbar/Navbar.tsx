import { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  state = { clicked: false };

  clickHandler = () => {
    this.setState({ clicked: !this.state.clicked }, () => {
      if (this.state.clicked) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    });
  };

  render() {
    return (
      <>
        <nav>
          <div id="navIcons">
            <a href="https://www.innocaption.com/">
              <img
                src="https://assets-global.website-files.com/655d1528a0b32e81e04f3276/65817c50cd9dde6e9bc5a732_Logo.svg"
                alt="Logo"
                className="innocaptionLogo"
              />
            </a>
          </div>

          <div id="navbarContent">
            <ul id="navbar" className={this.state.clicked ? "active" : ""}>
              <li>
                <a className="active" href="index.html">
                  Products
                </a>
              </li>
              <li>
                <a href="index.html">Shop</a>
              </li>
              <li>
                <a href="index.html">Other Stuff</a>
              </li>
            </ul>
          </div>

          <div>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="white"
                className="bi bi-bag"
                viewBox="0 0 16 16"
                style={{ cursor: "pointer" }}
                onClick={this.clickHandler}
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
              </svg>
            </a>
          </div>

          <div id="menu" onClick={this.clickHandler}>
            <i
              id="bar"
              className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
