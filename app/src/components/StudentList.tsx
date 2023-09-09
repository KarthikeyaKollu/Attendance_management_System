import React, { useState } from 'react';
import StudentItem from './StudentItem';
import { Student } from './Wrapper';
import '../styles/StudentList.css';

interface Props {
  students: Student[];
  date: string;
  section:string;
}

const StudentList: React.FC<Props> = ({ students, date ,section }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div id='body'>
    <div className="search-container">
        <input id='input'
          type="text"
          placeholder="Search by student name"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
    
    <div id='tableContainer'>
      
      
      <table className="table bg-light  table-hover">
        
        <thead className='table'>
          <tr  id='thead'>
            <th scope="col"  id='thead'>Student Name</th>
            <th scope="col"  id='thead'>Details</th>
            <th scope="col"  id='thead'>Hour 1</th>
            <th scope="col"  id='thead'>Hour 2</th>
            <th scope="col"  id='thead'>Hour 3</th>
            <th scope="col"  id='thead'>Hour 4</th>
            <th scope="col"  id='thead'>Hour 5</th>
            <th scope="col"  id='thead'>Hour 6</th>
            <th scope="col"  id='thead'>Hour 7</th>
            <th scope="col"  id='thead'>Hour 8</th>
            <th scope="col"  id='thead'>Percent%</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <StudentItem
              key={student.id}
              studentId={student.id.toString()}
              studentName={student.name}
              date={date}
              section={section}
            />
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default StudentList;
