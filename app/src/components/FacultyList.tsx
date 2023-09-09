import React, { useEffect, useState } from 'react';
import FacultyItem from './FacultyItem';
import { db } from '../firebase';
import { doc, getDocs, addDoc, collection ,setDoc } from 'firebase/firestore';
import { error } from 'console';
import { idText } from 'typescript';
import { generateDateRange } from './StudentItem';


export interface Faculty {
  id: string;
  name: string;
}

const FacultyList = () => {
  const dateRange = generateDateRange("01/11/2023","07/11/2023");
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const  [dates, setdates] = useState<string[]>(dateRange);
  console.log(dateRange)
  
 
  

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'faculty'));
      const facultyData: Faculty[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        
      }));
      setFaculties(facultyData);
     // console.log(faculties);
    } catch (error) {
      console.log(error);
    }


 ;


   





  };

  useEffect(() => {
    getData();

  },[]);
  









  return (
    <div >
      
      <table className="table table-bordered bg-light table-hover">
        <thead className="thead-light bg-dark ">
          <tr>
            <th scope="col">Faculty Name</th>  
            <th scope="col">Details</th>
            <th scope="col">{dates[0]}</th>
            <th scope="col">{dates[0]}</th>
            <th scope="col">{dates[0]}</th>
            <th scope="col">{dates[0]}</th>
            <th scope="col">{dates[0]}</th>
            <th scope="col">{dates[0]}</th>
            <th scope="col">{dates[0]}</th>
  
           
          </tr>
        </thead>
        <tbody>
        {faculties.map((facultyMember,index) => ( 
         
           <FacultyItem  key={index} name={facultyMember.name} id={facultyMember.id} dates={dates} />
         
        ))}

        </tbody>
      </table>
    </div>
  );
};

export default FacultyList;
