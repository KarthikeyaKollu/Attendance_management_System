import React, { useState } from 'react';
import * as  XLSX from 'xlsx';
import {addStudent} from './test'

const ExcelDataFetcher: React.FC = () => {
//   const [excelData, setExcelData] = useState<string[][]>([]);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const data = await file.arrayBuffer();
//     const workbook = XLSX.read(data, { type: 'array' });
//     const parsedData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 }) as string[][];
//     setExcelData(parsedData);
    


    
//   };

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });

      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const studentList = XLSX.utils.sheet_to_json(worksheet) as any[];

        studentList.forEach((studentData) => {
          // Assuming your Excel file contains 'name', 'email', and 'id' columns.
          const { name, email, id } = studentData;

          // Create the studentData object based on the data from the Excel row.
          const studentDataObj = {
           
            id,
            name,
            // Other student properties...
          };

          //Call the addStudent function to add the student to the database.
           addStudent('4th-YEAR', 'section-D', studentDataObj, id.toString());
        });
      });

      console.log('Students uploaded successfully!');
    } catch (error) {
      console.error('Error reading Excel file:', error);
    }
  };





  return (
    <div>
    <input type="file" onChange={handleFileChange} />
  </div>
  );
};

export default ExcelDataFetcher;
