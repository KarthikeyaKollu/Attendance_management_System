import React from 'react';
import "../styles/Header.css"
import aicte from "../images/aicte.png"
import reclogo from "../images/reclogo.png"
import nba from "../images/nba.png"
import iso from "../images/iso.png"
import jntugv from "../images/jntugv.png"
import ugc from "../images/ugc.png"
import naac from "../images/naac.png"

const Header = () => {
  return (
    <>
    <div id='header'>
        <div id="nav-bar">
            <div id='logo'>
                <img src={reclogo} alt="logo" id='reclogo'/>
            </div>
            <div id='list'>
            <img src={naac} alt="logo" id='list-items'/>
            <img src={ugc} alt="logo" id='list-items'/>
            <img src={nba} alt="logo" id='list-items'/>
            <img src={jntugv} alt="logo" id='list-items'/>
            <img src={aicte} alt="logo" id='list-items'/>
            <img src={iso} alt="logo" id='list-items'/>
            </div>
        </div>
        <div id="title">
            <h2 id='h2'>ATTENDANCE MANAGEMENT SYSTEM</h2>
        </div>

    </div>
    </>
  )
}

export default Header