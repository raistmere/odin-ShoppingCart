import { useEffect, useState } from 'react';
import pubsub from "./pubsub/pubsub.js";
import Store from "./Components/Store/Store.jsx";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Cart from './Components/Cart/Cart.jsx';
import ErrorPage from './Routes/ErrorPage.jsx';

export default function App() {
  // State props
  const [cartCount, SetCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // 
  const updateCart = (newItem) => {
    // 
    setCartItems((prevState) => {
      // 
      let newArray = [...prevState];
      // 
      newArray.push(newItem);
      // 
      return [...newArray];
    });

    // 
    SetCartCount((prevCount) => prevCount + newItem.count);
  };

  useEffect(() => {
    // 
    pubsub.subscribe("updateCartCount", updateCart);
    // 
    return (() => {
      pubsub.unsubscribe("updateCartCount", updateCart);
    });
  },[]);

  useEffect(() => {
    console.log("Cart Items after change", cartItems);
  }, [cartItems]);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Store cartCount={cartCount} />}/>
        <Route path="/cart" element={<Cart cartCount={cartCount} cartItems={cartItems} />}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
