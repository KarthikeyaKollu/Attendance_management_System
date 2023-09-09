import React, { useState, useEffect } from 'react';
import StudentList from './StudentList';
import { collection,
addDoc,
getDocs,
doc, 
 updateDoc, 
arrayUnion,
 getDoc 
,setDoc ,serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/App.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CircularBar from './CircularBar';
import { useLocation } from 'react-router-dom';





export interface Student {
  id: number;
  name: string;
  attendance: number[]; // Array of 8 values (0 for absent, 1 for present)
  
}
interface Props{
  path:string;
  
}



const initialStudents: Student[] = [

];

 const Wrapper = ({path}:Props) => {  
  const location = useLocation();

  const refdb=`/ECE${location.pathname}`;
  const userRef = collection(db, refdb)
  const [students, setStudents] = useState<Student[]>(initialStudents);
 // const const [selectedDate, setselectedDate] = useState(null)



  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getDocs(userRef);
        const fetchedStudentsData = data.docs.map((doc) => ({ ...(doc.data() as Student) }));

        // Update attendance in the students state based on data from the database
        // setStudents((prevStudents) => {
        //   const updatedStudents = prevStudents.map((student) => {
        //     const fetchedStudent = fetchedStudentsData.find((dataStudent) => dataStudent.id === student.id);
        //    console.log(fetchedStudent?.name);
        //     return fetchedStudent ? { ...student, attendance: fetchedStudent.attendance } : student;
        //   });
        //   return updatedStudents;
        // });

       setStudents(fetchedStudentsData);
      
        
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

    getData();
  }, []);

  const [selectedDate, setSelectedDate] = useState('');
   
  const data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  useEffect(()=>{handleDateChange("07/11/2023")})
  const handleDateChange = (date:any) => {
    setSelectedDate(date);
    console.log()
  };

  return (
    <div id='container'>
     

       {/* {selectedDate && <p>Selected Date: {selectedDate.toLocaleDateString()}</p>}
  
      <h1>Attendance Management System</h1> */}

      {selectedDate && <StudentList date={selectedDate} students={students} section={refdb}/>}
       

     
    </div>
  );
};
export default Wrapper;

