import React, { useEffect, useState } from 'react'
import "./ManageUsers.css"
import UserForm from '../../components/UserForm/UserForm'
import UserList from '../../components/UserList/UserList'
import { fetchUsers } from '../../Service/User.service';
function ManageUsers() {
  const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);



const getAllser=()=>{
  fetchUsers().subscribe({
    next:(res)=>{
     setUsers(res.data)
    },
    error:(error)=>{
      console.log("error",error);
      
    },
    complete:()=>console.log("complete")
    
  })
}
useEffect(()=>{
 getAllser()
},[])
  return (
    <div className="users-container text-light">
  <div className="left-column">
    <UserForm setUsers={setUsers}/>
  </div>
  <div className="right-column">
    <UserList setUsers={setUsers} users={users}/>
  </div>
</div>
  )
}

export default ManageUsers
