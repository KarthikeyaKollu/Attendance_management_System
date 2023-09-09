import React from 'react'
import Admin_ViewItem from './Admin_ViewItem'

const Admin_ViewList = () => {
  return (
    <div>
        <table className="table table-bordered bg-light table-hover">
        <thead className="thead-light bg-dark ">
          <tr>
            <th scope="col">Student Name</th>  
            <th  scope="col"> 5  sub1</th>
            <th  scope="col"> 6 sub2</th>
            <th  scope="col"> 7 sub3</th>
            <th  scope="col"> 0 sub4</th>
            <th  scope="col"> 10 sub5</th>
          </tr>
        </thead>
        <tbody>
       
           
           <Admin_ViewItem/>
         
        

        </tbody>
      </table>

    </div>
  )
}

export default Admin_ViewList