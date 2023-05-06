import React from 'react'
import '../Styles/Footer.css'

const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear()
  return (
    <footer>
      <span>E-Notes</span> - All rights reserved &copy; {getCurrentYear()}
    </footer>
  )
}

export default Footer
