import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../App';

const Radio = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'vision', 'equipment', 'training', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="de">
          <div className="den">
            <hr className="line" />
            <hr className="line" />
            <hr className="line" />
            <div className="switch">
              <label htmlFor="switch_home" onClick={() => handleNavigation('home')}>
                <span>Home</span>
              </label>
              <label htmlFor="switch_about" onClick={() => handleNavigation('about')}>
                <span>About</span>
              </label>
              <label htmlFor="switch_vision" onClick={() => handleNavigation('vision')}>
                <span>Vision</span>
              </label>
              <label htmlFor="switch_equipment" onClick={() => handleNavigation('equipment')}>
                <span>Equip</span>
              </label>
              <label htmlFor="switch_training" onClick={() => handleNavigation('training')}>
                <span>Train</span>
              </label>
              <label htmlFor="switch_contact" onClick={() => handleNavigation('contact')}>
                <span>Contact</span>
              </label>
              <input type="radio" checked={activeSection === 'home'} onChange={() => {}} name="switch" id="switch_home" />
              <input type="radio" checked={activeSection === 'about'} onChange={() => {}} name="switch" id="switch_about" />
              <input type="radio" checked={activeSection === 'vision'} onChange={() => {}} name="switch" id="switch_vision" />
              <input type="radio" checked={activeSection === 'equipment'} onChange={() => {}} name="switch" id="switch_equipment" />
              <input type="radio" checked={activeSection === 'training'} onChange={() => {}} name="switch" id="switch_training" />
              <input type="radio" checked={activeSection === 'contact'} onChange={() => {}} name="switch" id="switch_contact" />
              <div className="light"><span /></div>
              <div className="dot"><span /></div>
              <div className="dene">
                <div className="denem">
                  <div className="deneme">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;

  .container .origin {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 111;
    width: 2px;
    height: 2px;
    margin: -1px 0 0 -1px;
    background-color: #f50;
  }

  .de {
    user-select: none;
    position: relative;
    width: 230px;
    height: 230px;
    border-radius: 100%;
    box-shadow: 0 0 25px rgba(0, 0, 0, .1);
    background-color: transparent;
  }

  .de .den, .de .dene, .de .denem, .de .deneme, .de .light, .de .dot {
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .den {
    position: relative;
    width: 220px;
    height: 220px;
    margin: -110px 0 0 -110px;
    border-radius: 100%;
    box-shadow: inset 0 3px 10px rgba(0, 0, 0, .6), 0 2px 20px rgba(255, 255, 255, 1);
    background: #003366;
    background: -moz-radial-gradient(center, ellipse cover, #0077b6 0%, #003366 100%);
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, #0077b6), color-stop(100%, #003366));
    background: -webkit-radial-gradient(center, ellipse cover, #0077b6 0%, #003366 100%);
    background: -o-radial-gradient(center, ellipse cover, #0077b6 0%, #003366 100%);
  }

  .dene {
    z-index: 4;
    width: 140px;
    height: 140px;
    margin: -70px 0 0 -70px;
    border-radius: 100%;
    box-shadow: inset 0 2px 2px rgba(255, 255, 255, .4), 0 3px 13px rgba(0, 0, 0, .85);
    background: #f2f6f5;
    background: -moz-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f2f6f5), color-stop(100%, #cbd5d6));
    background: -webkit-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%);
    background: -o-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%);
  }

  .denem {
    width: 120px;
    height: 120px;
    margin: -60px 0 0 -60px;
    border-radius: 100%;
    background: #cbd5d6;
    background: -moz-linear-gradient(top, #cbd5d6 0%, #f2f6f5 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #cbd5d6), color-stop(100%, #f2f6f5));
    background: -webkit-linear-gradient(top, #cbd5d6 0%, #f2f6f5 100%);
    background: -o-linear-gradient(top, #cbd5d6 0%, #f2f6f5 100%);
  }

  .deneme {
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
    border-radius: 100%;
    box-shadow: inset 0 2px 3px rgba(255, 255, 255, .6), 0 8px 20px rgba(0, 0, 0, .9);
    background: #eef7f6;
    background: -moz-linear-gradient(top, #eef7f6 0%, #8d989a 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #eef7f6), color-stop(100%, #8d989a));
    background: -webkit-linear-gradient(top, #eef7f6 0%, #8d989a 100%);
    background: -o-linear-gradient(top, #eef7f6 0%, #8d989a 100%);
  }

  .den .switch {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .den .switch label {
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 70px;
    margin-top: -35px;
    transform-origin: 0% 50%;
    -webkit-transform-origin: 0% 50%;
    -o-transform-origin: 0% 50%;
    cursor: pointer;
  }

  .den .switch label:after {
    content: "";
    position: absolute;
    top: 6px;
    left: 1px;
    width: 100%;
    height: 30px;
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den .switch label:before {
    content: "";
    position: absolute;
    bottom: 6px;
    left: 1px;
    width: 100%;
    height: 30px;
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den .switch label span {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    font-weight: bold;
    font-size: 11px;
    line-height: 70px;
    text-align: center;
    color: #fff;
    text-shadow: 0 1px 0 #000;
  }

  .den .switch label:nth-child(1) {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den .switch label:nth-child(1) span {
    right: 2px;
    font-size: 11px;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den .switch label:nth-child(2) {
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den .switch label:nth-child(2) span {
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den .switch label:nth-child(3) {
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den .switch label:nth-child(3) span {
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den .switch label:nth-child(4) {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den .switch label:nth-child(4) span {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den .switch label:nth-child(5) {
    transform: rotate(150deg);
    -webkit-transform: rotate(150deg);
    -o-transform: rotate(150deg);
  }

  .den .switch label:nth-child(5) span {
    transform: rotate(-150deg);
    -webkit-transform: rotate(-150deg);
    -o-transform: rotate(-150deg);
  }

  .den .switch label:nth-child(6) {
    transform: rotate(210deg);
    -webkit-transform: rotate(210deg);
    -o-transform: rotate(210deg);
  }

  .den .switch label:nth-child(6) span {
    transform: rotate(-210deg);
    -webkit-transform: rotate(-210deg);
    -o-transform: rotate(-210deg);
  }

  .den .switch input {
    position: absolute;
    opacity: 0;
    visibility: hidden;
  }

  /* SWITCH LIGHT */

  .den .light {
    z-index: 1;
    width: 50%;
    height: 100px;
    margin-top: -50px;
    transform-origin: 0% 50%;
    -webkit-transform-origin: 0% 50%;
    -o-transform-origin: 0% 50%;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    -webkit-transition: all .5s;
    transition: all .5s;
    -o-transition: all .5s;
  }

  .den .light span {
    opacity: .6;
    position: absolute;
    top: 0;
    left: 15px;
    width: 100px;
    height: 100px;
    background: -moz-radial-gradient(center, ellipse cover, rgba(0, 180, 216, 1) 0%, rgba(0, 119, 182, 0.42) 42%, rgba(0, 51, 102, 0) 72%, rgba(0, 51, 102, 0) 100%);
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(0, 180, 216, 1)), color-stop(42%, rgba(0, 119, 182, 0.42)), color-stop(72%, rgba(0, 51, 102, 0)), color-stop(100%, rgba(0, 51, 102, 0)));
    background: -webkit-radial-gradient(center, ellipse cover, rgba(0, 180, 216, 1) 0%, rgba(0, 119, 182, 0.42) 42%, rgba(0, 51, 102, 0) 72%, rgba(0, 51, 102, 0) 100%);
    background: -o-radial-gradient(center, ellipse cover, rgba(0, 180, 216, 1) 0%, rgba(0, 119, 182, 0.42) 42%, rgba(0, 51, 102, 0) 72%, rgba(0, 51, 102, 0) 100%);
  }

  /* SWITCH LIGHT POSITION */

  .den #switch_home:checked ~ .light {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den #switch_about:checked ~ .light {
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den #switch_vision:checked ~ .light {
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den #switch_equipment:checked ~ .light {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den #switch_training:checked ~ .light {
    transform: rotate(150deg);
    -webkit-transform: rotate(150deg);
    -o-transform: rotate(150deg);
  }

  .den #switch_contact:checked ~ .light {
    transform: rotate(210deg);
    -webkit-transform: rotate(210deg);
    -o-transform: rotate(210deg);
  }

  /* SWITCH DOT */

  .den .dot {
    z-index: 6;
    width: 50%;
    height: 12px;
    margin-top: -6px;
    transform-origin: 0% 50%;
    -webkit-transform-origin: 0% 50%;
    -o-transform-origin: 0% 50%;
    transition: all .5s;
    -moz-transition: all .5s;
    -o-transition: all .5s;
  }

  .den .dot span {
    position: absolute;
    top: 0;
    left: 30px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background: #00b4d8;
    background: -moz-linear-gradient(top, #00b4d8 0%, #0077b6 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #00b4d8), color-stop(100%, #0077b6));
    background: -webkit-linear-gradient(top, #00b4d8 0%, #0077b6 100%);
    background: -o-linear-gradient(top, #00b4d8 0%, #0077b6 100%);
  }

  /* SWITCH DOT POSITION */

  .den #switch_home:checked ~ .dot {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den #switch_home:checked ~ .dot span {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den #switch_about:checked ~ .dot {
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den #switch_about:checked ~ .dot span {
    opacity: .9;
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den #switch_vision:checked ~ .dot {
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den #switch_vision:checked ~ .dot span {
    opacity: .5;
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den #switch_equipment:checked ~ .dot {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den #switch_equipment:checked ~ .dot span {
    opacity: .4;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den #switch_training:checked ~ .dot {
    transform: rotate(150deg);
    -webkit-transform: rotate(150deg);
    -o-transform: rotate(150deg);
  }

  .den #switch_training:checked ~ .dot span {
    opacity: .5;
    transform: rotate(-150deg);
    -webkit-transform: rotate(-150deg);
    -o-transform: rotate(-150deg);
  }

  .den #switch_contact:checked ~ .dot {
    transform: rotate(210deg);
    -webkit-transform: rotate(210deg);
    -o-transform: rotate(210deg);
  }

  .den #switch_contact:checked ~ .dot span {
    opacity: .9;
    transform: rotate(-210deg);
    -webkit-transform: rotate(-210deg);
    -o-transform: rotate(-210deg);
  }

  /* LINE */

  .den hr.line {
    z-index: 1;
    position: absolute;
    top: 50%;
    width: 100%;
    height: 0;
    margin-top: -1px;
    border-width: 1px 0;
    border-style: solid;
    border-top-color: #1e293b;
    border-bottom-color: #00b4d8;
  }

  .den hr.line:nth-child(1) {
    transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
  }

  .den hr.line:nth-child(2) {
    transform: rotate(60deg);
    -webkit-transform: rotate(60deg);
    -o-transform: rotate(60deg);
  }
`;

export default Radio;
