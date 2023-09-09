import React, { useState, useEffect } from 'react';
import { collection,
    addDoc,
    getDocs,
    doc, 
     updateDoc, 
    arrayUnion,
     getDoc 
    ,where, query,setDoc } from 'firebase/firestore';

import { db } from '../firebase';
import '../styles/StudentItem.css'
import CircularBar from './CircularBar';
import Chart from './Chart';
import Progress from './Progress';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Details from './Details';
import {addStudentAttendance} from './setFaculty.js'




interface Props {
  studentName: string;
  studentId:string;
  date :string;
  section:string;


}

export const generateDateRange = (startDate: string, endDate: string): string[] => {
  const dates = [];
  const startDateParts = startDate.split('/');
  const endDateParts = endDate.split('/');

  const startDateObject = new Date(
    parseInt(startDateParts[2]),
    parseInt(startDateParts[1]) - 1,
    parseInt(startDateParts[0])
  );

  const endDateObject = new Date(
    parseInt(endDateParts[2]),
    parseInt(endDateParts[1]) - 1,
    parseInt(endDateParts[0])
  );

  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  let currentDate = startDateObject;

  while (currentDate <= endDateObject) {
    dates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};



export  const generateDefaultDateRange = (date:string): { startDate: string; endDate: string } => {
  const pastDateInDDMMYYYY = date;
  const [day, month, year] = pastDateInDDMMYYYY.split('/');
  const pastDateInMMDDYYYY = `${month}/${day}/${year}`;
  const today = new Date(pastDateInMMDDYYYY);
  const endDate = today.toLocaleDateString('en-IN'); // Change the locale as needed
  today.setDate(today.getDate() - 7); // Subtract 7 days from today
  const startDate = today.toLocaleDateString('en-IN'); // Change the locale as needed
  return { startDate, endDate };
};


const StudentItem = ({ studentName,studentId,date , section}:Props) => {
    const [attendanceForDate , setAttendanceForDate]=useState<number[]>([]);
    const [percentage, setpercentage] = useState(0);
    const [percentage7days, setpercentage7days] = useState(0);

  
    
  const updateStudentAttendance = async (studentId: string, date: string, hour: number, attendance: number) => {
        try {
          const newArray = [...attendanceForDate];
          newArray[hour] = attendance;
          setAttendanceForDate(newArray);
         setpercentage(calculatePercentage(newArray));
         //console.log(percentage);

          

          const studentAttendanceRef = doc(db,section, studentId);
          const docSnap = await getDoc(studentAttendanceRef);
      
          if (docSnap.exists()) {
            const studentAttendanceData = docSnap.data();
            let { attendanceData } = studentAttendanceData;
      
            // If attendanceData is undefined, initialize it as an empty object
            if (!attendanceData) {
              attendanceData = {};
            }
            addStudentAttendance(studentId,date,section,attendance);
          //  console.log(section);
      
            // If the date doesn't exist in the attendanceData, create a new array with 8 hours
            if (!attendanceData[date]) {
              attendanceData[date] = Array(8).fill(0);
            }
      
            // Update the attendance for the specific hour
            attendanceData[date][hour] = attendance;




      
            // Update the document with the modified attendanceData
            await setDoc(studentAttendanceRef, { attendanceData }, { merge: true });
          } else {
            console.log("Student not found");
          }
        } catch (error) {
          console.error("Error updating student attendance: ", error);
        }
      };

  const fetchStudentAttendanceByDate = async (studentId: string, date: string, section: string) => {
        try {
          const studentAttendanceRef = doc(db, section, studentId);
          const docSnap = await getDoc(studentAttendanceRef);

          if (docSnap.exists()) {
            const studentAttendanceData = docSnap.data();
            const { attendanceData } = studentAttendanceData;

            // Access the attendance data for the specific date
            const attendanceForDate = attendanceData[date];
           // 
          

            // If attendance data for the date does not exist, fill with 0 for all hours
            if (!attendanceForDate) {
              return Array(8).fill(0);
            }

            // Log the attendance for that date
            console.log(`Attendance for ${date}:`, attendanceForDate);
            return attendanceForDate;
          } else {
            console.log("Student not found");
            return [];
          }
        } catch (error) {
          console.error("Error fetching student attendance: ", error);
          return [];
        }
      };

      

     const [attendancePercentageForDateRange, setattendancePercentageForDateRange] = useState<number[]>([]);
     const [attendanceDateRange, setattendanceDateRange] = useState<string[]>([]);
      const fetchStudentAttendanceByDateRange = async (startDate:any, endDate:any, section:string) => {
        try {
          const studentAttendanceRef = doc(db, section, studentId);
          const docSnap = await getDoc(studentAttendanceRef);
      
          if (docSnap.exists()) {
            const studentAttendanceData = docSnap.data();
            const { attendanceData } = studentAttendanceData;
      
            const dateRange = generateDateRange(startDate, endDate); // Helper function to generate an array of dates within the range
            setattendanceDateRange(dateRange);
            console.log(attendanceDateRange);
            const attendanceDataInRange = dateRange.map(date => {
              // Access the attendance data for the specific date
              const attendanceForDate = attendanceData[date];
              
              return attendanceForDate ? attendanceForDate : Array(8).fill(0);
            });
      
            const attendancePercentages = attendanceDataInRange.map(calculatePercentage);
            setattendancePercentageForDateRange(attendancePercentages);//for attandece percentagess
            console.log(attendancePercentageForDateRange);
            return attendancePercentages;
          } else {
            console.log("Student not found");
            return [];
          }
        } catch (error) {
          console.error("Error fetching student attendance: ", error);
          return [];
        }
      };
      
      // Helper function to generate an array of dates between the start and end date (inclusive)
     
      
 
      const get=()=>{ 
        fetchStudentAttendanceByDateRange(startDate?.toLocaleDateString().split(" ").toString(), endDate?.toLocaleDateString().split(" ").toString(), section)
        .then(attendancePercentages => {
       // console.log("Attendance Percentages:", attendancePercentages);
        setpercentage7days(calculatePercentageForRange(attendancePercentageForDateRange));
        console.log(percentage7days);
        console.log(startDate?.toLocaleDateString().split(" ").toString());
        

            
        })
        .catch(error => { 
        console.error("Error fetching student attendance: ", error);
      });
        
            

      }














      const getDefalut7Days=()=>{
        const { startDate, endDate } = generateDefaultDateRange(date); 
        console.log("hello");
        setattendanceDateRange(generateDateRange(startDate, endDate));
        if (attendanceDateRange.length > 0) {
          fetchStudentAttendanceByDateRange(attendanceDateRange[0], attendanceDateRange[attendanceDateRange.length - 1], section)
            .then(attendancePercentages => {
              setattendancePercentageForDateRange(attendancePercentages);
              console.log(attendancePercentages);//for attandance percentages
              setpercentage7days(calculatePercentageForRange(attendancePercentages)); // calculating for last 7 days
              
            })
            .catch(error => {
              console.error("Error fetching student attendance: ", error);
            });
        }

      }
    
    // useEffect(() => { // Defalut student atandance loading previous 7 days
    //   getDefalut7Days();
        
    //   }, [attendanceForDate]);
  
    
      
      

      

  function calculatePercentage(arr: number[]): number {
    if (arr.length === 0) {
      return 0; // Return 0 if the array is empty to avoid division by zero
    }
      
        const sum = arr.reduce((total, value) => total + value, 0);
        const percentage = (sum / arr.length) * 100;
      
        return Math.round(percentage);
      }

      function calculatePercentageForRange(arr: number[]): number {
        if (arr.length === 0) {
          return 0; // Return 0 if the array is empty to avoid division by zero
        }
          
            const sum = arr.reduce((total, value) => total + value, 0);
            const percentage = (sum / arr.length);
          
            return Math.round(percentage);
          }
    



  useEffect(() => { // for fecthing the data on render 
        // const date = "2023-07-02";
        
      //  

        const fetchData = async () => {
          try {
            const attendanceData = await fetchStudentAttendanceByDate(studentId, date, section);
            setAttendanceForDate(attendanceData);
            setpercentage(calculatePercentage(attendanceData));
          } catch (error) {
            console.error("Error fetching attendance data: ", error);
            setAttendanceForDate([]); // Set the attendance to an empty array in case of an error
          }
        };
        
        fetchData();
      }, []);




      




  const [isClicked, setisClicked] = useState(false);
  const  [isGet, setisGet] = useState(false);
  const [startDate, setStartDate] = useState<Date >();
  const [endDate, setendDate] = useState<Date >();

  const handleDateChange1 = (date:any) => {
    setStartDate(date);
   
  };
  const handleDateChange2 = (date:any) => {
    setendDate(date);
    
  };
  const handleGet=(isClick: boolean, startDate: Date ,endDate:Date)=>{
    console.log("Is Clicked:", isClick); // true
      if(isClick){
        getDefalut7Days();
        setisGet(isClick);
          get();
          console.log("getCalled");
      }
    setStartDate(startDate);
    setendDate(endDate);
    console.log(startDate,"  ",endDate ); // "hi"

  }

    
  return (
    <>   
    <tr>
    <th scope="row" >{studentName}
     </th> 
      <td > <button id='fetch' className='btn btn-primary mx-3 ' onClick={(e)=>
        {
          fetchStudentAttendanceByDate(studentId,"2023-07-02",section);
          setisClicked(true);
       
       
        } }>fetch</button></td>
      <td><input  type="number" onChange={(e)=>{updateStudentAttendance(studentId, date,0,Number(e.target.value));}}  value={attendanceForDate[0]} min={0} max={1}/></td>
      <td><input type="number" onChange={(e)=>{updateStudentAttendance(studentId, date, 1, Number(e.target.value));}}  value={attendanceForDate[1]} min={0} max={1}/></td>
      <td><input type="number" onChange={(e)=>{updateStudentAttendance(studentId, date, 2, Number(e.target.value));}}  value={attendanceForDate[2]} min={0} max={1}/></td>
      <td><input type="number" onChange={(e)=>{updateStudentAttendance(studentId, date, 3, Number(e.target.value));}}  value={attendanceForDate[3]} min={0} max={1}/></td>
      <td><input type="number" onChange={(e)=>{updateStudentAttendance(studentId, date, 4, Number(e.target.value));}}  value={attendanceForDate[4]} min={0} max={1}/></td>
      <td><input type="number" onChange={(e)=>{updateStudentAttendance(studentId, date, 5, Number(e.target.value));}}  value={attendanceForDate[5]} min={0} max={1}/></td>
      <td><input type="number" onChange={(e)=>{updateStudentAttendance(studentId, date, 6, Number(e.target.value));}}  value={attendanceForDate[6]} min={0} max={1}/></td>
      <td><input type="number" onChange={(e)=>{updateStudentAttendance(studentId, date, 7, Number(e.target.value));}}  value={attendanceForDate[7]} min={0} max={1}/></td>
      <td>
        <div >
        <CircularBar percentage={percentage} width={50} height={50}/>
        
        </div>
       
     </td>
    </tr>

    {isClicked&&
    <div className='overlay'>
     
      
      <Details onClose={(e)=>{setisClicked(false)}} defaultPercentage={[percentage,percentage7days,20]} labels={attendanceDateRange}   studentName={studentName} bars={attendancePercentageForDateRange} isGet={handleGet} />
       
    {/* <div  id='info'>
    <div id="date-pickers">
      <Details onClose={(e)=>{setisClicked(false)}} defaultPercentage={[100,50,20]} studentName  labels={attendanceDateRange}   bars={attendancePercentageForDateRange}/>
  
  <DatePicker
       selected={startDate}
       onChange={handleDateChange1}
       dateFormat="yyyy-MM-dd" // Customize the date format (optional)
       // Other props you can use to customize the date picker (e.g., minDate, maxDate, etc.)
     />
      <DatePicker
       selected={endDate}
       onChange={handleDateChange2}
       dateFormat="yyyy-MM-dd" // Customize the date format (optional)
       // Other props you can use to customize the date picker (e.g., minDate, maxDate, etc.)
     /></div>
      <button onClick={(e)=>{
        get();
        setisGet(false);
        
        console.log(percentage);
      }}>get</button>   
      <button id='btn' className="btn btn-danger btn-sm" onClick={(e)=>{setisClicked(false)}}>close</button>
        <div id='chart-bar'>
            <div id='bar'>
                <CircularBar percentage={percentage7days} width={200} height={200}/>
                <h3 id='h3'>{studentName}</h3>
                </div>
                <div id='chart'><Chart width={600} height={600} studentName={studentName} labels={attendanceDateRange}   bars={attendancePercentageForDateRange}/>
                {  isGet  ?  <h5>data for 7 days</h5> : <h5>data for certain range</h5>}
                </div>
                
                
          </div>
          <div  id='progress'>
              <Progress value={0} width={100} />
              <Progress value={25}  width={100}/>
              <Progress value={50}  width={100}/>
              <Progress value={75}  width={100}/>
              <Progress value={100} width={100} />
    </div> 
        </div> */
               }
      </div>
      }
    </>
  )
}

export default StudentItem