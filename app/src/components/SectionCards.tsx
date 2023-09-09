import React from 'react';
import { motion } from 'framer-motion';
import '../styles/SectionCards.css';
import Card from './Card';

const SectionCards = () => {
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

  return (
    <> 
      <div className="card-container">
        <motion.div
          className='box'
          variants={boxVariant}
          animate="visible"
          initial="hidden"
          transition={{ delay: 0.5 }}
        >
          {[1, 2, 3 ,4].map((value, index) => (
            <motion.li
              key={index}
              className="card"
              variants={cardVariant}
              transition={{ delay: index * 0.3 }}
            >
              <Card path={""} key={index}  /> {/* Add a unique key prop for each Card instance */}
            </motion.li>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default SectionCards;
