import React from 'react'
import Logo from '../img/logo-main.svg';
let currYear = new Date().getFullYear();

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="container-fluid">
          <div className="row">
              <div className="col-12 d-flex justify-content-center">
                  <Logo className="footer-logo"/>
              </div>
          </div>
        <div className="row">
          <div className="col-12 text-center">
            <p className="lead">&copy; {currYear} John Garcia</p>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
