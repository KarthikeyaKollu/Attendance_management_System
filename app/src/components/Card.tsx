import {useState} from 'react'
import '../styles/Card.css'
import Chart from './Chart'
import CircularBar from './CircularBar'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Details from './Details';
import { Link } from 'react-router-dom';

interface Props{
  path:string;
}

const Card = ({path}:Props) => {

    const [startDate, setStartDate] = useState<Date >();
  const [isReport, setisReport] = useState(false);
    const [endDate, setendDate] = useState<Date >();




//dummy
  const [isClicked, setisClicked] = useState(false);
const handleGet=(isClick: boolean, startDate: Date ,endDate:Date)=>{
  console.log("Is Clicked:", isClick); // true
    if(isClick){
 
        console.log("getCalled");
    }
  setStartDate(startDate);
  setendDate(endDate);
  console.log(startDate,"  ",endDate ); // "hi"

}
//dumy





    const handleDateChange1 = (date:any) => {
      setStartDate(date);
      console.log()
    };
    const handleDateChange2 = (date:any) => {
      setendDate(date);
      console.log()
    };
  

  return (
    <>
        
      
     
    
    <div className='body'>
      
        <div className='container'>
          
            <h2 id='h2'>ELECTRONICS & COMMUNICATIONS {path}</h2>
            <div className="bar-circle">
                <div className="bar"> <Chart width={510} height={510}  studentName="karthikeya" labels={["1","2","3","4","5","6"]}  bars={[10,20,80,40,100,60]}/></div>
                <div className="circle"><CircularBar percentage={80} width={250} height={250}  /></div>
            </div>
            <div className="buttons">
            
             
              <button id='btn1' onClick={(e)=>setisReport(true)} className="btn btn-outline-primary">Full Report</button> 
              <Link to={`${path}`}>
              <button id='btn2' className="btn btn-outline-primary" >NEXT</button> 
              </Link>
              

              
            </div>
            
        </div>
    </div>
     
  
    
    </>
  )
}

export default Card