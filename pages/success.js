import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";

import {runConfettiAnimation} from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();


  useEffect(()=>{
      localStorage.clear();
      setCartItems ([]);
      setTotalPrice(0);
      setTotalQuantities(0)
      runConfettiAnimation();
  },[])
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon ">
          <BsBagCheckFill />
        </p>
        <h2> Thank you for your Order !</h2>
        <p className="email-msg">
          Please Check your email inbox for your purchase details.{" "}
        </p>
        <p className="description">
          If you have any questions please write to us at:
          <a className="email" href="mailto:orders@csmarketplace.com">
            orders@csmarketplace.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width ="300px" className="btn">
            Continue Shopping 
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
