import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import Item from '../Items/Item';
import SearchBox from '../SearchBox/SearchBox';

function DisplayItem({ selectedCategory }) {
    const { itemsData, itemsList } = useContext(AppContext);
    const [searchText, setSearchText] = useState("");

    const getQueryParams = () => {
        let queryParams = [];
        if (searchText.length > 0) {
            queryParams.push({
                name: searchText
            })
        }

        return queryParams;
    }
    useEffect(() => {
        itemsList(getQueryParams())
    }, [searchText])
    const [filteredData, setFilteredData] = useState(itemsData)
    useEffect(() => {

        setFilteredData(itemsData)
    }, [itemsData])
    useEffect(() => {
        const list = itemsData.filter((item) => item.categoryId === selectedCategory)
        setFilteredData(list)
    }, [selectedCategory])


    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center align-items">
                <div></div>
                <div>
                    <SearchBox onSearch={setSearchText} />
                </div>
            </div>
            <div className="row g-3">
                {filteredData.map((item, index) => (
                    <div key={index} className="col-md-4 col-sm-6">
                        <Item

                            itemName={item.name}
                            itemPrice={item.price}
                            itemImage={item.image}
                            itemId={item.itemId}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DisplayItem
