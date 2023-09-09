import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import Card from './components/Card';
import Framer from './components/Framer';
import Details from './components/Details';
import './styles/App.css';
import Header from './components/Header';
import SectionCards from './components/SectionCards';
import Years from './components/Years';
import Sections from './components/Sections';
import { fetchYearsSectionsAndBranches} from './components/setFaculty.js'
import { db } from './firebase';
import { doc } from 'firebase/firestore';

interface MyObjectInterface {
  [key: number]: string[];
}

const App = () => {



  const handleClick = () => {
    console.log('clicked');
  };


  
 const [years, setyears] = useState<string[]>([]);

 const [section, setsection] = useState<MyObjectInterface >([]);



const getData =async()=>{
  const dataRef = doc(db,"faculty/IPR");
    const data = await fetchYearsSectionsAndBranches(dataRef);
      const branches = Object.keys(data);
      //console.log(branches);

      const branch = "ECE";
      const yearsObj = data[branch];

      const years = Object.keys(yearsObj);
      setyears(years);

      setsection(yearsObj);
      console.log(section[1]) 
      
  


  }
  useEffect(()=>{ getData();},[])


  


  return (<div>
 
   


<Router>
        <Routes>
          <Route path="/" element={<Years  years={years}  />} />
          // {/* <Route path="/1" element={<Sections/>}></Route> */}

        
          (<><Route path="/1st-YEAR" element={<Sections sections={section[1]} />}>
            </Route><Route path="/1st-YEAR/section-A" element={<Wrapper path="" />} />
            <Route path="/1st-YEAR/section-B" element={<Wrapper path="" />} />
            <Route path="/1st-YEAR/section-C" element={<Wrapper path="" />} />
            <Route path="/1st-YEAR/section-D" element={<Wrapper path="" />} /></>)




          <Route path="/2nd-YEAR" element={<Sections sections={section[2]} />}></Route>
          <Route path="/2nd-YEAR/section-A" element={<Wrapper path="" />} />
          <Route path="/2nd-YEAR/section-B" element={<Wrapper path="" />} />
          <Route path="/2nd-YEAR/section-C" element={<Wrapper path="" />} />
          <Route path="/2nd-YEAR/section-D" element={<Wrapper path="" />} />




          <Route path="/3rd-YEAR" element={<Sections sections={section[3]} />}></Route>
          <Route path="/3rd-YEAR/section-A" element={<Wrapper path="" />} />
          <Route path="/3rd-YEAR/section-B" element={<Wrapper path="" />} />
          <Route path="/3rd-YEAR/section-C" element={<Wrapper path="" />} />
          <Route path="/3rd-YEAR/section-D" element={<Wrapper path="" />} />




          <Route path="4th-YEAR" element={<Sections sections={section[4]} />}></Route>
          <Route path="4th-YEAR/section-A" element={<Wrapper path="" />} />
          <Route path="4th-YEAR/section-B" element={<Wrapper path="" />} />
          <Route path="4th-YEAR/section-C" element={<Wrapper path="" />} />
          <Route path="4th-YEAR/section-D" element={<Wrapper path="" />} />













        </Routes>
      
    </Router> 

    </div>
  );
};

export default App;
