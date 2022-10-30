import React from 'react'
import { AiFillInstagram,AiOutlineTwitter,AiFillFacebook } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className="footer-container">
        <p>
          @2022 CS:GO PORT All rights reserved.
          </p>
          <p className="icons">
            <AiFillInstagram/>
            <AiOutlineTwitter/>
            <AiFillFacebook/>
            </p>
    </div>
  )
}

export default Footer