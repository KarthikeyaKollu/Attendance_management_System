import React, { useEffect, useState } from 'react';
import Card from './Card';
import {fetchData} from './setFaculty.js'





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



  const selectedYears = years.filter((year) => Object.keys(yearMap).includes(year));
 

  return (
   
    <div>
    {years}
      {selectedYears.map((year) => (
        <Card key={year} path={yearMap[year]} />
      ))}
    </div>
  );
};

export default Years;
