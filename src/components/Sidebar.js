import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";


import './sidebar.css'




 function Sidebar()  {
  return (
  <>

     <div className="sidebar">
     <header>My App</header>
     <ul>
        <li><Link to="/"><i class="fa-solid fa-address-book"></i>contact</Link></li>
        <li><Link to="/covid"><i class="fa-solid fa-globe"></i>Covid-19</Link></li>

     </ul>
     </div>
    
     </>
  )
}

 export default Sidebar