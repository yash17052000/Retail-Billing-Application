import React, { useContext, useEffect, useState } from 'react'

import "./Explore.css"
import { AppContext } from '../../context/AppContext'
import DisplayItem from '../../components/DisplayItem/DisplayItem';
import CustomerForm from '../../components/CustomerForm/CustomerForm';
import CartItems from '../../components/CartItems/CartItems';
import CartSummary from '../../components/CartSummary/CartSummary';
import DisplayCategory from '../../components/DisplayCategory/DisplayCategory';
function Explore() {
  const {categories,searchByName } = useContext(AppContext)
  useEffect(()=>{
  searchByName()
  },[])
  const [selectedCategory,setSelectedCategory]=useState("");
  const [customerDetails,setCustomerDetails]=useState({
    mobilerNumber:"",
    customerName:""
  })
  return (
    <>
      {/* Left Section */}
      <div className="explore-container text-light">
        <div className="left-column">
          <div className="first-row" style={{ overflowY: 'auto' }}>
           <DisplayCategory 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
           />
          </div>
          <hr className="horizontal-line" />
          <div className="second-row" style={{ overflowY: 'auto' }}>
            <DisplayItem selectedCategory={selectedCategory}/>
          </div>
        </div>


        {/* Right Section */}
        <div className="right-column d-flex flex-column">
          <div className="customer-form-container" style={{ height: '20%' }}>
            <CustomerForm customerDetails={customerDetails} setCustomerDetails={setCustomerDetails}/>
          </div>
          <hr className="my-3 text-light" />
          <div className="cart-items-container" style={{ height: '40%', overflowY: 'auto' }}>
            <CartItems/>
          </div>
          <hr className="my-3 text-light" />
          <div className="cart-summary-container" style={{ height: '30%' }}>
            <CartSummary customerDetails={customerDetails} setCustomerDetails={setCustomerDetails}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
