import { db } from '../firebase';
import { doc, getDoc, addDoc, collection ,setDoc } from 'firebase/firestore';




      
      export const addStudentAttendance = async (studentId, day, section, attendanceStatus) => {
        try {
          const formattedDay = day.replaceAll('/', '-');
          const attendanceRef = doc(db, `faculty/IPR${section}/attendance/${studentId}/${formattedDay}`);
      
          const docSnapshot = await getDoc(attendanceRef);
          const currentData = docSnapshot.data();
          console.log(docSnapshot.exists());
        
          if (!docSnapshot.exists()) {
             
            await setDoc(attendanceRef, {
              status: [attendanceStatus],
            });
          }


          if (Object.entries(currentData).length==0){
            await setDoc(attendanceRef, {
              status: [attendanceStatus],
            });
         }
         
         
         else if (true) {
          // If the document exists and "status" is an array, update the array
          const updatedStatusArray = [...currentData.status,attendanceStatus];
          console.log("updatesa aray", updatedStatusArray)
    
          await setDoc(attendanceRef, {
            status: updatedStatusArray,
          });
         } 
      
          console.log(`Attendance data added for student ${studentId} on day ${day}.`);
        } catch (error) {
          console.error(`Error adding attendance for student ${studentId} on day ${day}:`, error);
        }
      };



   export   const fetchAttandanceReport=async(date)=>{
         const formattedDay = date.replaceAll('/', '-');
         
        try{
          const attendanceRef = doc(db, `faculty/IPR/ECE/1st-YEAR/section-A/attendance/1/${date}`);
        const docSnapshot = await getDoc(attendanceRef);
        const currentData = docSnapshot.data();
        const {status}=currentData;
       
        return status;
        }
        catch(error){
          //console.log("data not found");
          return "NoDate";
        }
 
      }
 
      



          
export const fetchData= async()=>{   // used to fetch the branch and data of the faculty
  const dataRef = doc(db, `faculty/IPR`);
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
          { year: 1, sections: ["A","B","C", "D"] },
          
          

        ],
      },
      // {
      //   branch: "CSE",
      //   years: [
      //     { year: 1, sections: ["A"] },
      //     { year: 2, sections: ["B","C"] },
      //     { year: 3, sections: ["D"] },
      //   ],
      // },
    ];



    
// async function setNewDocument() {
//       // Reference to the document you want to create or overwrite
//       const dataRef = doc(db,"faculty/MEENA");

//       // Use setDoc to create or overwrite the document with the new data
//       await setDoc(dataRef, { branches: branchesData })
//         .catch((error) => {
//           console.error("Error writing document: ", error);
//         });
//     }

//     // Call the function to set the new document
//     setNewDocument();
