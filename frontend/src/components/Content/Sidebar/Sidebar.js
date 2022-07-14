import React from 'react';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';

const Sidebar = () => {
  return (
    <div>
      <div className="container">
      <Menu menuButton={<MenuButton>Menu</MenuButton>}>
        <MenuItem>Japan</MenuItem>
        <MenuItem>Korea</MenuItem>
        <SubMenu label="China">
          <MenuItem>Taiwan</MenuItem>
        </SubMenu>
        <MenuItem>US</MenuItem>
      </Menu>
    </div>
    </div>
  )
}

export default Sidebar