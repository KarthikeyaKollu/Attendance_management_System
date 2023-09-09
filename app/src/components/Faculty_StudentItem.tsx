import React, { useEffect, useState } from 'react';
import { Faculty } from './Faculty_StudentList';
import {generateDateRange ,generateDefaultDateRange} from './StudentItem';
import { addStudentAttendance, fetchAttandanceReport } from './setFaculty';

interface Props{
   name:string;
   id:string;
   dates:string[];
   selectedPath:string;
   fillvalues:number;
   selectedDateProp:Date;
  
}

const Faculty_StudentItem = ({name,id ,dates ,selectedPath ,fillvalues ,selectedDateProp}:Props) => {
  const [arrayOfStatus, setArrayOfStatus] = useState<number[][]>([]);
 
  const [startDate, setStartDate] = useState("01-11-2023");
  const [endDate, setendDate] = useState("06-11-2023");
  const [fillvalue, setfillvalue] = useState(0); 

 


  const get7Stauts=async(date:string)=>{

     const resp = await fetchAttandanceReport(date , id ,selectedPath);
    
    setArrayOfStatus((prevArray) => [...prevArray, resp]);
    console.log(resp);
    
    
    
      
  }

  useEffect(() => {

    dates.map((date,index)=>{get7Stauts(date)}) ;
    setArrayOfStatus([]);
    

  
  },[selectedPath])
  useEffect(()=>{
    setfillvalue(fillvalues)
    addStudentAttendance(id,selectedDateProp,selectedPath,fillvalues);

  },[fillvalues]);

  

  return (<>
  
    <tr>
      <th scope="row">{name}</th>
      <td>{id}</td>
       {arrayOfStatus.map((status,index)=>(  <td key={index}>{status}</td>))}
       {<td><input type="text"  value={fillvalue}  onChange={(e)=>{setfillvalue(Number(e.target.value)); addStudentAttendance(id,selectedDateProp,selectedPath,Number(e.target.value)); }}  /></td>}
    </tr>
   
    </>
  );
};

export default Faculty_StudentItem;
