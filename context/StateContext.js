import React, { createContext,useState,useContext,useEffect } from 'react'

import {toast} from 'react-hot-toast';


const Context = createContext();

export const StateContext=({children})=>{

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1);

  //variables to find the product to be updated
  let foundProduct;
  let index;


  const onAddToCart = (product,quantity) =>{
   // Check if the item i salready in the cart
    const checkProductInCart = cartItems.find((item)=> item._id ===product._id)
    
    setTotalPrice((prevTotalPrice)=>prevTotalPrice+product.price * quantity )
    setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities+quantity)


    if(checkProductInCart){

      const updatedCartItems = cartItems.map((cartProduct)=>{
        if(cartProduct._id === product._id) 
        return{
          ...cartProduct,
          quantity:cartProduct.quantity+quantity
        }
      })
      setCartItems(updatedCartItems);
    } 
    else{
      product.quantity= quantity;
      setCartItems([...cartItems, {...product}])
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  }


  const onProductDelete=(product)=>{
    foundProduct = cartItems.find((item)=> item._id===product._id)
  const newCartItems = cartItems.filter((item)=>item._id!==product._id)

  setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price * foundProduct.quantity)
  setTotalQuantities(prevTotalQuantities=>prevTotalQuantities-foundProduct.quantity)
  setCartItems(newCartItems)
  }
  
  const toggleCartItemQuantity =(id,value)=>{

    foundProduct= cartItems.find((item)=>item._id===id)
    
    index = cartItems.findIndex((product)=>product._id===id)

    // new instance of cart item to modify 

    const newCartItems = cartItems.filter((item)=> item._id!==id )

    // Note to self: Splice doesnt work because we are still mutating state directly 
   // const newCartItems =cartItems.splice(index+1)

    if(value==='inc')
    {
        setCartItems([...newCartItems,{...foundProduct, quantity:foundProduct.quantity+1}])
        setTotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.price)
        setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities+1)
    }
    else if(value==='dec')
    {
     if (foundProduct.quantity>1)
     {
      setCartItems([...newCartItems,{...foundProduct, quantity :foundProduct.quantity-1}])
      setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price)
      setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities-1)
     }
    }
  }


  const incQty=()=>{
      setQty((prevQty)=>prevQty+1)
  }

  const decQty=()=>{
    setQty((prevQty)=>{
      if(prevQty-1 < 1) return 1;

      return prevQty-1
    })
  }
//   const incCartQty=()=>{
//     setQty((prevQty)=>prevQty+1)
// }

// const decCartQty=()=>{
//   setQty((prevQty)=>{
//     if(prevQty-1 < 1) return 0;
//     return prevQty-1
//   })
//}



  return (
    <Context.Provider value={{
      showCart,
      setShowCart,
      cartItems,
      totalPrice,
      totalQuantities,
      qty,
      incQty,
      decQty,
      onProductDelete,
      onAddToCart,
      toggleCartItemQuantity,
      setCartItems,
      setTotalPrice,
      setTotalQuantities,
        }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = ()=>useContext(Context)
