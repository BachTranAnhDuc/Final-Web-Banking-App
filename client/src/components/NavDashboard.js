import React, { useState } from 'react';

import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';

import Logo from '../assets/images/logos/bankist.svg';

import { FaBars } from 'react-icons/fa';
import { VscSettingsGear } from 'react-icons/vsc';
import { RiUserLine, RiLogoutCircleRLine } from 'react-icons/ri';

//
import { Menu, MenuItem, MenuButton, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
// import '@szhsin/react-menu/dist/transitions/slide.css';

const NavDashboard = () => {
  const { switchPage, openSidebar, logout } = useGlobalContext();

  const [display, setDisplay] = useState('arrow');
  const [align, setAlign] = useState('center');
  const [position, setPosition] = useState('anchor');
  const [viewScroll, setViewScroll] = useState('auto');
  const [direction, setDirection] = useState('bottom');

  const navigate = useNavigate();

  const handleClickLog = () => {
    logout();

    switchPage();

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <nav className="nav-dash">
      <button onClick={openSidebar} className="sidebar-toggle">
        <FaBars />
      </button>

      <NavLink to={'/dashboard'} onClick={() => switchPage()}>
        <img src={Logo} alt="" className="nav-logo" />
      </NavLink>

      <ul className="nav-list">
        <li className="nav-list__item">
          <NavLink
            to={'/dashboard'}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link__active' : 'nav-link'
            }
            onClick={() => switchPage()}
          >
            Something
          </NavLink>
        </li>
        <li className="nav-list__item">
          <NavLink
            to={'/about'}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link__active' : 'nav-link'
            }
            onClick={() => switchPage()}
          >
            <span>Something</span>
          </NavLink>
        </li>
      </ul>

      <Menu
        className={'nav__menu'}
        menuButton={
          <MenuButton className={'btn-account'}>My Account</MenuButton>
        }
        key={direction}
        direction={direction}
        align={align}
        position={position}
        viewScroll={viewScroll}
        arrow={display === 'arrow'}
        offsetX={
          display === 'offset' &&
          (direction === 'left' || direction === 'right')
            ? 12
            : 0
        }
        offsetY={
          display === 'offset' &&
          (direction === 'top' || direction === 'bottom')
            ? 12
            : 0
        }
      >
        <MenuItem className={'nav__menu--item'}>
          <RiUserLine></RiUserLine>
          <span>View account</span>
        </MenuItem>
        <MenuItem className={'nav__menu--item'}>
          <VscSettingsGear></VscSettingsGear>
          <Link to="/dashboard/setting" className="btn-link">
            Setting
          </Link>
        </MenuItem>

        <MenuDivider />

        <MenuItem className={'nav__menu--item'} onClick={handleClickLog}>
          <RiLogoutCircleRLine></RiLogoutCircleRLine>
          <span>Logout</span>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default NavDashboard;
