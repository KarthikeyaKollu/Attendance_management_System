import { db } from '../firebase';
import { doc, getDoc, addDoc, collection ,setDoc } from 'firebase/firestore';
import { facultyId } from '../App';



   
      export const addStudentAttendance = async (studentId, day, section, attendanceStatus) => {
        try {
          const formattedDay = day.replaceAll('/', '-');
          const attendanceRef = doc(db, `faculty/${facultyId}/${section}/attendance/${studentId}/${formattedDay}`);
          
          const docSnapshot = await getDoc(attendanceRef);
          const currentData = docSnapshot.data();
         
        
         
             
            await setDoc(attendanceRef, {
              status: attendanceStatus,
            });
          

          console.log(`Attendance data added for student ${studentId} on day ${day}.`);
        } catch (error) {
          console.error(`Error adding attendance for student ${studentId} on day ${day}:`, error);
        }
      };



   export  const fetchAttandanceReport = async(date,id ,path )=>{
         const formattedDay = date.replaceAll('/', '-');
        //  console.log("called fetchattandance report");
         
        try{
          
        const attendanceRef = doc(db, `faculty/${facultyId}/${path}/attendance/${id}/${date}`);
       // console.log(attendanceRef)
       // console.log(`${id}/${date}`)
        const docSnapshot = await getDoc(attendanceRef);
        const currentData =await docSnapshot.data();
        const {status}=currentData;
       // console.log(status)
       
        return status;
        }
        catch(error){
          //console.log("data not found");
          return "NoData";
        }
 
      }
 
      



          
export const fetchData= async()=>{   // used to fetch the branch and data of the faculty
  const dataRef = doc(db, `faculty/${facultyId}`);
  const data =(await getDoc(dataRef)).data();
//   console.log(data)
  const {years ,branches ,id, name ,sections} = "";

  return [years,branches,id,name,sections]
  

 // console.log(years,branches,id,name,sections);
  
}




// Fetch the document data
export async function fetchYearsSectionsAndBranches(dataRef) {
      try {
        const docSnapshot = await getDoc(dataRef);
    
        if (docSnapshot.exists()) {
          // Get the data from the document
          const data = docSnapshot.data();
    
          // Extract years, sections, and branches
          const yearsSectionsAndBranches = data.branches.flatMap((branch) =>
            branch.years.map((yearObj) => ({
              branch: branch.branch,
              year: yearObj.year,
              sections: yearObj.sections,
            }))
          );
        //  console.log(yearsSectionsAndBranches)
          const yearsSectionsAndBranche = data.branches.reduce((acc, branch) => {
            const yearSections = branch.years.reduce((accYear, yearObj) => {
              accYear[yearObj.year] = yearObj.sections;
              return accYear;
            }, {});
    
            acc[branch.branch] = yearSections;
            return acc;
          }, {});
         return yearsSectionsAndBranche;



        } else {
          console.log("Document not found.");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    }
    
    






    const branchesData = [
      {
        branch: "ECE",
        years: [
         
          { year: 4, sections: ["D"] },
          

        ],
      },
      {
        branch: "CSE",
        years: [
        
          { year: 3, sections: ["D"] },
        ],
      },
    ];



    
// async function setNewDocument() {
//       // Reference to the document you want to create or overwrite
//       const dataRef = doc(db,"faculty/IPR");

//       // Use setDoc to create or overwrite the document with the new data
//       await setDoc(dataRef, { branches: branchesData })
//         .catch((error) => {
//           console.error("Error writing document: ", error);
//         });
//     }

//     // Call the function to set the new document
//     setNewDocument();
