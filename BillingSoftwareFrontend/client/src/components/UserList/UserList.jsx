import React, { useEffect, useState } from 'react'
import { DeleteUser, fetchUsers } from '../../Service/User.service';

function UserList() {
  let [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
 console.log("searc",searchTerm);
 
  
  const getQueryParams = () => {
    let queryParams = [];
    if (searchTerm.length > 0) {
      queryParams.push({
        name: searchTerm
      })
    }
    return queryParams;
  }

  const searchUser = (queryParams) => {
    console.log("queryaparsms",queryParams);
    
    fetchUsers(queryParams ?? []).subscribe({
      next: (res) => {
        setUsers(res.data)
      },
      error: (error) => console.log("This is error", error),
      complete: console.log("complete")
    })
  }


  const deleteUser = (id) => {
    console.log("This is deleteing user", id);

    DeleteUser(id).subscribe({
      next: () => {
        searchUser(getQueryParams())
        toast.success("deleted successfully")
      },
      error: (error) => console.log("This is error", error),
      complete: console.log("complete")
    })
  }
  useEffect(() => {
    searchUser()
  }, [])
  return (
    <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', width: "100%" }}>

      <div className="row pe-3">
        Search Bar
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"


            placeholder="Search..."
            className='form-control'
            onChange={(e) => {

              setSearchTerm(e.target.value)

            }}
            onKeyDown={(e) => {

              console.log(e)

              if (e.key === "Enter")
                searchUser(getQueryParams())


            }}

            value={searchTerm}
          />
          <span className="input-group-text bg-warning" onClick={searchUser}>
            <i className="bi bi-search"></i>
          </span>
        </div>


      </div>


      <div className="row g-3 pe-2">
        {users.map((user, index) => (
          <div key={index} className="col-12">
            {user.role
              !== "ROLE_ADMIN" && <div className="card p-3 bg-dark">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="mb-1 text-white">{user.name}</h5>
                    <h5 className="mb-0 text-white">{user.email}</h5>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.userId)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList
