import React from 'react'
import "./Category.css"

function Category({ categoryName, imgUrl, numberOfItems, bgColor,isSelected,onClick  }) {
  return (
    <div style={{ backgroundColor: bgColor, padding: "10px", borderRadius: "10px" }} onClick={onClick} className='category-hover'>
      <img src={imgUrl} alt={categoryName} width={100} height={100} />
      <h4>{categoryName}</h4>
      <p>{numberOfItems} items</p>
      {isSelected && <div className='active-category'> </div>}
    </div>
  );
}

export default Category;

