import React, { useEffect, useState } from 'react';
import FacultyItem from './Faculty_StudentItem';
import { db } from '../firebase';
import { doc, getDocs, addDoc, collection ,setDoc, getDoc } from 'firebase/firestore';
import { error } from 'console';
import { idText } from 'typescript';
import { generateDateRange } from './StudentItem';
import { Student } from './Wrapper';
import { MyObjectInterface } from '../App';
import { styled } from 'styled-components';
import Lottie from "react-lottie";
import AnimationData from "../animations/Data.json";
import AnimationData1 from "../animations/ChartLoading.json";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';





export interface Faculty {
  id: string;
  name: string;
}
interface SectionMap {
  [key: string]: string;
}


interface Props {
  yearsList :string[];
  branchesList:string[];
  sectionsList:MyObjectInterface;
}


const Faculty_StudentList = ({yearsList,branchesList,sectionsList}:Props) => {
  const dateRange = generateDateRange("01/08/2023","03/08/2023");
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const  [dates, setdates] = useState<string[]>(dateRange); 
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: AnimationData,
    speed:1
  };
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: AnimationData1,
    speed:1
  };


  

  const getFacultyData = async () => {
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
    };


  };
  const [isClilcked, setIsClicked] = useState(false);
  const [students, setStudents] = useState<Student[]>();
  
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const  [selectedPath, setselectedPath] = useState('');
    const  [fillValues, setfillValues] = useState(0);
    const [selectedDate, setselectedDate] = useState<any>();

    const yearMap: { [key: string]: string } = {
      "1": '1st-YEAR',
      "2": '2nd-YEAR',
      "3": '3rd-YEAR',
      "4": '4th-YEAR',
    };
    const sectionMap: SectionMap = {
      A: 'section-A',
      B: 'section-B',
      C: 'section-C',
      D: 'section-D',
    };
    
   
    
  
    // You can define your options for year, branch, and section here.
    const years = yearsList;
    const branches = branchesList;
    const sections =sectionsList[Number(selectedYear)] ||['A', 'B', 'C'];
   // console.log(selectedPath)
  
    // Handle selection change for each dropdown
    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(event.target.value);
    };
  
    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedBranch(event.target.value);
    };
  
    const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSection(event.target.value);
    };
    const handleClick=()=>{ 
      setIsClicked(true);
      
      getData();
     
      setselectedPath(`${selectedBranch}/${yearMap[Number(selectedYear)]}/${sectionMap[selectedSection]}`);

      
      

    }


    useEffect(()=>{
      getData();
    },[selectedPath,dateRange])
  

 
    const getData = async () => {
      try {
        
        const refdb=selectedPath;
        
        const userRef = collection(db, refdb)
        const data = await getDocs(userRef);
        const fetchedStudentsData = data.docs.map((doc) => ({ ...(doc.data() as Student) }));


        setStudents(fetchedStudentsData);
        

      
        
        
      
      
        
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

 






  useEffect(() => {
    getFacultyData();
   


  },[dateRange]);

  const handleDateChange1 = (date:Date) => {
    setselectedDate(date);
   
  };
  

  







  return (
    <Maincontainer >

     { !isClilcked && <Container id='mydata-container' >
      

      
      <select id="branch" value={selectedBranch} onChange={e=>handleBranchChange(e)}>
        <option value="">Branch</option>
        {branches.map((branch) => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </select>
      
      <select id="year" value={selectedYear} onChange={e=>handleYearChange(e)}>
        <option value="">Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

    
      <select id="section" value={selectedSection} onChange={e=>handleSectionChange(e)}>
        <option value="">Section</option>
        {sections.map((section) => (
          <option key={section} value={section}>
            {section}
          </option>
        ))}
      </select>
      <button className="btn btn-primary"  onClick={(e)=>handleClick()}>show</button>
    </Container>}

{  !isClilcked &&   <><div className="lottie-animation">
        <Lottie options={defaultOptions} width={500} height={500} isClickToPauseDisabled />
      </div><div className="lottie-animation1">
          <Lottie options={defaultOptions1} width={500} height={500} isClickToPauseDisabled />
        </div></>}




      {isClilcked && <table className="table table-bordered bg-light table-hover">
        <thead className="thead-light bg-dark ">
          <tr>
            <th scope="col">Student Name</th>  
            <th scope="col">Details</th>
            {dates.map((date,index)=>(<th key={index} scope="col">{date}<br/>{1}</th>))}
            { <th> <DatePicker
             selected={selectedDate}
             onChange={handleDateChange1}
           dateFormat="dd-MM-yyyy" // Customize the date format (optional)
       // Other props you can use to customize the date picker (e.g., minDate, maxDate, etc.)
     /> <input type="number" onChange={(e)=>{setfillValues(Number(e.target.value))}} /></th>}
          </tr>
        </thead>
        <tbody>
        {students?.map((student,index) => ( 
         
           <FacultyItem  key={index} name={student.name} id={student.id} dates={dates}  selectedPath={selectedPath} fillvalues={fillValues} selectedDateProp={selectedDate?.toLocaleDateString()} />
         
        ))}

        </tbody>
      </table>}
    </Maincontainer>
  );
  
};

export default Faculty_StudentList;
const Container = styled.div`
width: 500px;
height: 400px;
margin-top: 60px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-radius: 10px;
background-color: transparent;
backdrop-filter: blur(10px);
box-shadow: 0 0 10px rgba(0,0,0,.2);
border: 1px solid #ccc;
position: relative;
button{
    position: absolute;
    width: 100px;
    bottom: 20px;

}
select{

  width: 150px;
  border-radius: 5px;
  margin-top: 30px;
  outline: none;
  height: 30px;
  background-color: #4c4d4e;
  color: white;
}


`;

const Maincontainer = styled.div`
display: flex;
margin-top: 100px;
justify-content: center;
.lottie-animation{
  position: absolute;
  z-index:-1;
}

.lottie-animation1{
  position: absolute;
  bottom: -100px;
  z-index: -1;

}

`;