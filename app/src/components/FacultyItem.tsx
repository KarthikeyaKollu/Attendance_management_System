import React, { useEffect, useState } from 'react';
import { Faculty } from './FacultyList';
import {generateDateRange ,generateDefaultDateRange} from './StudentItem';
import { fetchAttandanceReport } from './setFaculty';

interface Props{
   name:string;
   id:string;
   dates:string[];
  
}

const FacultyItem = ({name,id ,dates}:Props) => {
  const [arrayOfStatus, setArrayOfStatus] = useState<number[][]>([
  ]);
 
  const [startDate, setStartDate] = useState("01-11-2023");
  const [endDate, setendDate] = useState("06-11-2023");


 


  const get7Stauts=async(date:string)=>{
     const resp= await fetchAttandanceReport(date);
     if(arrayOfStatus.length < 3){

      setArrayOfStatus((prevArray) => [...prevArray, resp]);
    
    }

    
      
  }

  useEffect(() => {

    dates.map((date,index)=>{get7Stauts(date)}) 

  
  },[])
  

  return (<>
  
    <tr>
      <th scope="row">{name}</th>
      <td>{id}</td>
      <td>{arrayOfStatus[0]}</td>
      <td>{arrayOfStatus[1]}</td>
      <td>{arrayOfStatus[2]}</td>
      <td>{arrayOfStatus[3]}</td>
      <td>{arrayOfStatus[4]}</td>
      <td>{arrayOfStatus[5]}</td>
      <td>{arrayOfStatus[6]}</td>
      <td>{arrayOfStatus[7]}</td>
    </tr>
    </>
  );
};

export default FacultyItem;
