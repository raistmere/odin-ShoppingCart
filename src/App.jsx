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

  // This method handles updating an item stack based on the new item count.
  const updateItemInCart = (item) => {
    // 
    let removedCount = 0; // We need to keep track of how many items we have removed to update cartCount.

    // 
    setCartItems((prevState) => {
      // 
      console.log("prevState: ", prevState);
      console.log("Updated item: ", item);
      const newArray = []; // This will be the new updated cartItems array
      // 
      prevState.forEach((element) => {
        // We are only worried about the changed item, the rest of the items are fine and should be added to the newArray.
        if(element.id === item.id) {
          // We want to see if we still have the item, if so then we make sure to keep track of count and push to newArray
          if(item.count > 0) {
            removedCount = element.count - item.count;
            newArray.push({...element, count: item.count})
          }
          // Else we want to make sure to remove the item count from the counter. We no longer have this item in 
          // our cart so we don't add it to the newArray.
          else
          {
            removedCount = element.count;
          }
        }
        else
        {
          newArray.push({...element});
        }
      })

      console.log("NewArray: ", newArray);
      return newArray;
    });
    // 
    SetCartCount((prevState) => prevState - removedCount);
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
    pubsub.subscribe("removeItemFromCart", updateItemInCart)
    // removeCartItem
    return (() => {
      // Unsubscribe to events
      pubsub.unsubscribe("addItemToCart",  addItemToCart);
      pubsub.unsubscribe("removeItemFromCart", updateItemInCart)
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
