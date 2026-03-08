import React from 'react'
import "./ManagItems.css"
import ItemForm from '../../components/ItemForm/ItemForm'
import ItemList from '../../components/ItemList/ItemList'
function ManageItems() {
  return (
    <div className="items-container text-light">
  <div className="left-column">
    <ItemForm/>
  </div>
  <div className="right-column">
    <ItemList/>
  </div>
</div>
  )
}

export default ManageItems
