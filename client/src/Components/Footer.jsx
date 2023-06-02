import React from 'react'
import '../Styles/Footer.css'

const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear()
  return (
    <footer>
      <span>E-Notes - All rights reserved &copy; {getCurrentYear()}</span>
    </footer>
  )
}

export default Footer
