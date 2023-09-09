import { doc, getDoc, addDoc, collection ,setDoc } from 'firebase/firestore';
import { db } from '../firebase';


export const addStudent = async (year, section, studentData, studentId) => {
  try {
    // Create a reference to the specific student document using the studentId as the document ID
    const studentRef = doc(db, `ECE/${year}/${section}/${studentId}`);

    // Add the student data to the document
    await setDoc(studentRef, studentData);

    console.log(`Student with ID ${studentId} added.`);
  } catch (error) {
    console.error(`Error adding student with ID ${studentId}:`, error);
  }
};

// // Example usage: Add students with IDs from 1 to 10
// const year = "4th-YEAR";
// const section = "section-D";

// for (let i = 1; i <= 10; i++) {
//   const studentData = {
//     name: `Student ${i}`,
//     age: 20 + i,
//     grade: "A",
//     id:i,
    
//   };

//   addStudent(year, section, studentData, i.toString());
// }
