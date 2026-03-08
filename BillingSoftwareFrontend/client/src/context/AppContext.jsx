import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../Service/Category";
import { fetchItems } from "../Service/Item.Service";

export const AppContext = createContext(null)

export const AppContextProvider = (props) => {
    let [categories, setCategories] = useState([])
    const [itemsData,setItemsData]=useState([])
    let [auth,setAuth]=useState({
      role:"",
      token:""
    })
    const [cartItems, setCartItems] = useState([]);

const addToCart = (item) => {  // no usages
  const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

  if (existingItem) {
    setCartItems(
      cartItems.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  } else {
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  }
};

// Remove an item entirely from the cart
const removeFromCart = (itemId) => {
  setCartItems(cartItems.filter(item => item.itemId !== itemId));
};

// Update the quantity of a specific item
const updateQuantity = (itemId, newQuantity) => {
  setCartItems(cartItems.map(item => 
    item.itemId === itemId ? { ...item, quantity: newQuantity } : item
  ));
};
    const searchByName = (queryParams) => {
    fetchCategories(queryParams ?? []).subscribe({
      next: (res) => {
        setCategories(res.data)
      },
      error: (error) => console.log("This is error", error),
      complete: console.log("complete")
    })
  }
    const itemsList = (queryParams) => {

      
      
    fetchItems(queryParams ?? {}).subscribe({
      next: (res) => {
        setItemsData(res.data)
      },
      error: (error) => console.log("This is error", error),
      complete: console.log("complete")
    })
  }
    const setAuthData=(token,role)=>{
     setAuth({
      token:token,
      role:role
     })
    }

    const clearcart=()=>{
      setCartItems([])
    }
    const contextValue = {
        categories, setCategories, searchByName,
        setAuthData,auth,
        itemsList,
        itemsData,
        cartItems,
        setItemsData,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearcart
    }
    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}
