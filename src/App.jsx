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

  // This method handles adding an item to the cart.
  const  addItemToCart = (item) => {
    console.log("AddItem");
    setCartItems((prevState) => stackCartItems([...prevState, item]));
    // 
    SetCartCount((prevCount) => prevCount + item.count);
  };

  // This method handles removing an item from the cart. This could be 1/2 qty count or the full item.
  const removeItemFromCart = (item) => {
    const cart = [...cartItems];
    console.log(cart);

  };

  // This method handles creating item stacks instead of individual items in the cart.
  const stackCartItems = (cartItems) => {
    // 
    const stackedArray = []
    const unstackedArray = [...cartItems];
    // 
    unstackedArray.forEach((item) => {
      // 
      let stackFound = false;
      // 
      stackedArray.forEach((itemStack) => {
        if(item.id === itemStack.id)
        {
          itemStack.count += item.count;
          stackFound = true;
        }
      });

      // 
      if(!stackFound)
      {
        // Even though item is from a new array, it causes problems. Is item still referencing the immutable state?
        // If I do {...item} (new object item) it works fine. But [...cartItems] should be copying and creating new items right?
        // This is caused hours upon hours of headache. Leaving this here as a reminder that if I am going to change the state of a prop
        // make sure to fully create a whole new object that just clones the properties of the state props then modify to your liking.
        // The problem --> stackedArray.push(item); 
        stackedArray.push({...item}); // <--- The solution
      }
    });
    // 
    return stackedArray;
  }

  useEffect(() => {
    // Subscribe to events
    pubsub.subscribe("addItemToCart",  addItemToCart);
    pubsub.subscribe("removeItemFromCart", removeItemFromCart)
    // removeCartItem
    return (() => {
      // Unsubscribe to events
      pubsub.unsubscribe("addItemToCart",  addItemToCart);
      pubsub.unsubscribe("removeItemFromCart", removeItemFromCart)
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
