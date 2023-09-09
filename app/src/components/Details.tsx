import React, { useState } from 'react'
import '../styles/Details.css'
import CircularBar from '../components/CircularBar';
import Chart from '../components/Chart'
import PieChart from './PieChart';
import Progress from './Progress';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props{
  onClose:(isClicked: boolean) => void;
  defaultPercentage:number[];
  labels:string[];
  bars:number[];
  studentName:string;
  isGet:(isClick: boolean ,startDate:any , endDate:any) => void;
  
  

}
const Details = ({onClose ,defaultPercentage ,labels ,bars,studentName ,isGet}:Props) => {




        const [startDate, setStartDate] = useState<Date>();
        const [endDate, setendDate] = useState<Date >();


        const handlePopupClose = () => {
          onClose(false);
        };
        const handleGet=()=>{
          isGet(true, startDate, endDate);
        }


        const handleDateChange1 = (date:any) => {
          setStartDate(date);
          console.log()
        };
        const handleDateChange2 = (date:any) => {
          setendDate(date);
          console.log()
        };
        const [userDefinedDates, setUserDefinedDates] = useState([
          new Date('2023-07-26'),
          new Date('2023-07-05'),
          new Date('2023-08-15'),
          // Add more user-defined dates here as needed
        ]);
        const isUserDefinedDate = (date:any ) => {
          return userDefinedDates.some((definedDate) =>
            date.getTime() === definedDate.getTime()
          );
        };
        const isSunday = (date:any) => {
          return date.getDay() === 0; // Sunday has day index 0
        };

        const filterDate = (date:any) => {
          // Block Sundays, user-defined dates, and future dates
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Set today's time to midnight
          return !isSunday(date) && !isUserDefinedDate(date) && date <= today;
        };





  return (
    <>
     <div className="container-detail"> 
     <div className="container-1-detail">
        <div className="details">
        <div className="circles">
             <div className="circle-1">
                <h4 id='h4' >Today</h4>
                <CircularBar percentage={defaultPercentage[0]} width={100} height={100}/>
                </div>
                <div className="circle-2">
                <h4 id='h4' >Overall</h4>
                <CircularBar percentage={defaultPercentage[1]} width={100} height={100}/>
                </div>
                <div className="circle-3">
                <h4 id='h4' >Grade</h4>
                <CircularBar percentage={defaultPercentage[2]} width={100} height={100}/>
                </div>
        </div>
        <div className="bar"> <Chart width={650} height={650}  studentName={studentName} labels={labels}  bars={bars}/></div>

     </div>
      
      <div className="footer">
        <div className="extra-1">
          <h3>Message To Student</h3>
          <div id="message">
          <textarea name="text" id="mail" cols={250 }rows={4}></textarea>
          <button className="btn btn-primary btn-sm mx-3" id='mail-btn'>Send</button>
          </div>
         
          

        </div>
        <div className="extra-2">
        <div id="date-pickers">
          <span>From :</span>
          
          <DatePicker id='date1'
              selected={startDate}
              onChange={handleDateChange1}
              dateFormat="yyyy-MM-dd" // Customize the date format (optional)
              maxDate={new Date()}
              filterDate={filterDate}
              // Other props you can use to customize the date picker (e.g., minDate, maxDate, etc.)
            /> <span>To :</span>
              <DatePicker  id='date2'
              selected={endDate}
              onChange={handleDateChange2}
              dateFormat="yyyy-MM-dd" // Customize the date format (optional)
              maxDate={new Date()}
              filterDate={filterDate}
              // Other props you can use to customize the date picker (e.g., minDate, maxDate, etc.)
            />
            <button  className="btn btn-success btn-sm" id='btn-get' onClick={handleGet} >Get</button>
        </div>
      </div>
    </div>
       
        </div>
        
     <div className="container-2-detail">
     <div id='btn-div' ><span><button id='btn' type="button" className="btn btn-danger btn-circle rounded-circle btn-xl" onClick={(e)=>handlePopupClose()}> &times;</button></span></div>

        <div className="progress-pie">
            <div className="progress-div">
                <h3>Intersted Subjects</h3>
            
                {[10,20,100,50,90,30,100,3].map((value) => (
                    <Progress value={value} width={300} />
                    
                ))}
               
       
                
            </div>
            <div className="pie">
                <PieChart labels={["1","2","3","4","5","6"]} data={[10,100,30,50,80,50]} studentName={'Karthikeya'} width={300} height={300}/>
            </div>
        </div>

     </div>

     </div>
     
    
    
    </>
  )
}

export default Details