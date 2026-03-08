import React, { useContext, useEffect, useState } from 'react'
import "./CategoryList.css"
import { AppContext } from '../../context/AppContext'
import { DeleteCategory, fetchCategories } from '../../Service/Category';
import { toast } from 'react-hot-toast';
function CategoryList() {
  let { categories,searchByName } = useContext(AppContext)
  
  const [searchTerm, setSearchTerm] = useState("")
  const getQueryParams = () => {
    let queryParams = [];
    if (searchTerm.length > 0) {
      queryParams.push({
        name: searchTerm
      })
    }
    return queryParams;
  }

  
  const deleteByCategoryId = (categoryId) => {
    DeleteCategory(categoryId).subscribe({
      next: () => {
        searchByName(getQueryParams())
        toast.success("deleted successfully")
      },
      error: (error) => console.log("This is error", error),
      complete: console.log("complete")
    })
  }
  console.log("This is searchBox", searchTerm);

 useEffect(() => {
        searchByName()
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
                searchByName()


            }}

            value={searchTerm}
          />
          <span className="input-group-text bg-warning" onClick={searchByName}>
            <i className="bi bi-search"></i>
          </span>
        </div>


      </div>


      <div className="row g-3 pe-2">
        {categories.map((category, index) => (
          <div key={index} className="col-12">
            <div className="card p-3" style={{ backgroundColor: category.bgColor }}>
              <div className="d-flex align-items-center">
                <div style={{ marginRight: '15px' }}>
                  <img
                    src={category.imgUrl}
                    className="category-image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{category.name}</h5>
                  <p className="mb-0 text-black">{category.items} Items</p>
                </div>
                <div>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteByCategoryId(category.categoryId)}>
                    <i className="bi bi-trash"></i>
                  </button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default CategoryList
