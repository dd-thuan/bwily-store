import React from 'react';
import Content from '../../components/Content/Content';
import PreNavbar from '../../components/Content/Navbar/PreNavbar';
import Sidebar from '../../components/Content/Sidebar/Sidebar';



const Home = () => {
  return (
    <div>
      <PreNavbar/>  
      <Sidebar />
      <Content />
    </div>

  )
}

export default Home