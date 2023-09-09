import React, { useEffect, useState } from 'react';
import Card from './Card';
import {fetchData} from './setFaculty.js'
import '../styles/Years.css';
import graph from '../animations/Hologram.json'
import Lottie from "react-lottie";
import ECE from '../animations/ECE.json'
import ani from '../animations/ChartLoading.json'






const yearMap: { [key: string]: string } = {
  "1": '1st-YEAR',
  "2": '2nd-YEAR',
  "3": '3rd-YEAR',
  "4": '4th-YEAR',
};

interface Props {
    years :string[];
}


const Years = ({years}:Props) => {

  const options = {
    loop: true,
    autoplay: true,
    animationData: graph,
  };
  const options1 = {
    loop: true,
    autoplay: true,
    animationData:ECE ,
  };
  const options3 = {
    loop: true,
    autoplay: true,
    animationData :ani ,
  };


  const selectedYears = years.filter((year) => Object.keys(yearMap).includes(year));
 

  return (
   
    <div>
           {/* { <div>  
          <a href="/mydata"><button className="btn btn-primary">Report</button></a>
          <a href="/admin"><button className="btn btn-primary">Admin</button></a>
          <a href="/manageFaculty"><button className="btn btn-primary">Manage</button></a>
        </div> }  */}
    {years}
      {selectedYears.map((year) => (
        <Card key={year} path={yearMap[year]} />
      ))}
           <div className="lottie-animation" id="lottie-2">
            <Lottie options={options} width={400} height={400} isClickToPauseDisabled />
      </div>
   

      <div className="lottie-animation" id="lottie-ECE">
            <Lottie options={options1} width={500} height={800} isClickToPauseDisabled />
      </div>
    </div>
  );
};

export default Years;
