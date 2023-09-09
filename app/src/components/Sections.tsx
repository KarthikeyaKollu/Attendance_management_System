import React, { useEffect, useState } from 'react';
import Card from './Card';
import {fetchData} from './setFaculty.js'
import { cloneData } from 'react-chartjs-2/dist/utils';




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


const Sections   = ({sections}:Props) => {



  const selectedSections = sections.filter((section) =>
    Object.keys(sectionMap).includes(section)
  );


  return (
    <div>
      {selectedSections.map((section) => (
        <Card key={section} path={sectionMap[section]} />
      ))}
    </div>
  );
};

export default Sections;
