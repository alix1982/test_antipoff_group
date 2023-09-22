import React from 'react';
import gitHub_icon from "../../images/1200px-GitHub_Icon.svg.png"

function Footer () {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">&copy; Alix2019</p>
        <a href="https://github.com/alix1982" className="footer__link" target="blank">
            <img src={gitHub_icon} className="footer__img" alt="GitHub"/>
        </a>
      </div>
      
    </footer>
  )
}

export default Footer