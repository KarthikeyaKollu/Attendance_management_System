import React, { useEffect, useState } from 'react';
import Card from './Card';
import {fetchData} from './setFaculty.js'
import { cloneData } from 'react-chartjs-2/dist/utils';
import { motion } from 'framer-motion';
import '../styles/SectionCards.css';
import Lottie from "react-lottie";
import Hologram from '../animations/Hologram.json'




interface SectionMap {
  [key: string]: string;
}
interface Props{
  sections:string[];
}

const sectionMap: SectionMap = {
  A: 'section-A',
  B: 'section-B',
  C: 'section-C',
  D: 'section-D',
};
const boxVariant = {
  hidden: {
    x: "-100vw"
  },
  visible: {
    x: 0
  }
};

const cardVariant = {
  hidden: {
    x: -10,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1
  }
};

const options = {
  loop: true,
  autoplay: true,
  animationData: Hologram,
};


const Sections   = ({sections}:Props) => {
 


  const selectedSections = sections.filter((section) =>
    Object.keys(sectionMap).includes(section)
  );


  return (

    <div className="card-container">
            <div className="lottie-animation" id="lottie-Holo">
            <Lottie options={options} width={1200} height={1200} isClickToPauseDisabled />
      </div>
    <motion.div
      className='box'
      variants={boxVariant}
      animate="visible"
      initial="hidden"
      transition={{ delay: 0.5 }}
    >
      {selectedSections.map((section,index) => (
        <motion.li
          key={index}
          className="card"
          variants={cardVariant}
          transition={{ delay: index * 0.6 }}
        >
          <Card key={section} path={sectionMap[section]}  /> {/* Add a unique key prop for each Card instance */}
        </motion.li>
      ))}
    </motion.div>
  </div>

    
    // <div>
    //   {selectedSections.map((section) => (
    //     <Card key={section} path={sectionMap[section]} />
    //   ))}
    // </div>
  );
};

export default Sections;
