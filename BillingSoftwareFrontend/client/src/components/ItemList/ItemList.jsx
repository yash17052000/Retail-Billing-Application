import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { DeleteItems } from '../../Service/Item.Service';
import "./ItemList.css"

function ItemList() {
  let { itemsList,
    itemsData } = useContext(AppContext)
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


  const deleteByItemId = (itemId) => {
    DeleteItems(itemId).subscribe({
      next: () => {
        itemsList(getQueryParams())
        toast.success("deleted successfully")
      },
      error: (error) => console.log("This is error", error),
      complete: console.log("complete")
    })
  }


  useEffect(() => {
    itemsList()
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

             

              if (e.key === "Enter")
                itemsList(getQueryParams())


            }}

            value={searchTerm}
          />
          <span className="input-group-text bg-warning" onClick={itemsList}>
            <i className="bi bi-search"></i>
          </span>
        </div>


      </div>


      <div className="row g-3 pe-2">
        {itemsData.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div style={{
                  marginRight:"15px"
                }}>
                  <img src={item.imgUrl} alt={item.name} className="item-image" />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 text-white">{item.name}</h6>
                  <p className="mb-0 text-white">
                    Category: {item.categoryName}
                  </p>
                  <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                    ₹{item.price}
                  </span>
                </div>
                <div>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteByItemId(item.itemId)}>
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

export default ItemList
