import React, { useState, useEffect } from 'react';

import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';

import Logo from '../assets/images/logos/BANK.svg';
import avt1 from '../assets/images/avt/avatar-01.svg';

import { FaBars } from 'react-icons/fa';
import { VscSettingsGear } from 'react-icons/vsc';
import { RiUserLine, RiLogoutCircleRLine } from 'react-icons/ri';

//
// import { Menu, MenuItem, MenuButton, MenuDivider } from '@szhsin/react-menu';
// import '@szhsin/react-menu/dist/index.css';
// import '@szhsin/react-menu/dist/transitions/slide.css';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

import NavLanding from '../theme/components/LandingNav';

const NavDashboard = () => {
  const {
    switchPage,
    openSidebar,
    logout,
    user,
    showStyleBody,
    hideStyleBody,
  } = useGlobalContext();

  const [display, setDisplay] = useState('arrow');
  const [align, setAlign] = useState('center');
  const [position, setPosition] = useState('anchor');
  const [viewScroll, setViewScroll] = useState('auto');
  const [direction, setDirection] = useState('bottom');
  const [stickyClass, setStickyClass] = useState('nav-dash');

  const navigate = useNavigate();

  const handleClickLog = () => {
    logout();

    switchPage();

    // navigate('/login');

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleClickToSetting = (input) => {
    showStyleBody();
    switchPage();
    navigate(`/dashboard/setting/${input}`);
  };

  const handleClickToHome = (e) => {
    hideStyleBody();
    switchPage();
    navigate(`/dashboard/setting/${e.target.name}`);
  };

  const stickyNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 400
        ? setStickyClass('nav-dash sticky')
        : setStickyClass('nav-dash');
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.addEventListener('scroll', stickyNavbar);

    return () => {
      window.removeEventListener('scroll', stickyNavbar);
    };
  }, []);

  return (
    <NavLanding>
      <nav className={stickyClass}>
        <div className="nav-dash__left-side">
          <button onClick={openSidebar} className="sidebar-toggle">
            <FaBars />
          </button>
          <NavLink to={'/dashboard'} onClick={handleClickToHome}>
            <img src={Logo} alt="" className="nav-dash__logo" />
          </NavLink>

          <ul className="nav-dash__list">
            <li className="nav-dash__list--item">
              <NavLink
                to={'/dashboard'}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link__active' : 'nav-link'
                }
                onClick={() => switchPage()}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-dash__list--item">
              <NavLink
                to={'/dashboard/deposit'}
                className={({ isActive }) =>
                  isActive ? 'nav-link nav-link__active' : 'nav-link'
                }
                onClick={() => switchPage()}
              >
                <span>Deposit</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-dash__right-side">
          <Tooltip title="Account settings" sx={{}}>
            <IconButton
              onClick={handleClickOpen}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar
                sx={{ width: 32, height: 32, backgroundColor: '#20c997' }}
              >
                D
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={(e) => handleClickToSetting('account')}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                {/* <PersonAdd fontSize="small" /> */}
                <RiUserLine></RiUserLine>
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem name="all" onClick={(e) => handleClickToSetting('all')}>
              <ListItemIcon>
                {/* <Settings fontSize="small" /> */}
                <VscSettingsGear></VscSettingsGear>
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClickLog}>
              <ListItemIcon>
                {/* <Logout fontSize="small" /> */}
                <RiLogoutCircleRLine></RiLogoutCircleRLine>
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
          {/* <img src={avt1} alt="avatar" className="nav__menu--img" /> */}

          {/* <Menu
          className={'nav__menu'}
          menuButton={
            <MenuButton className={'btn-account'}>{user?.name}</MenuButton>
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
            <Link
              to="/dashboard/setting/account"
              className="btn-link"
              onClick={() => handleClick(true)}
            >
              View account
            </Link>
          </MenuItem>
          <MenuItem className={'nav__menu--item'}>
            <VscSettingsGear></VscSettingsGear>
            <Link
              to="/dashboard/setting/all"
              className="btn-link"
              onClick={() => handleClick(true)}
            >
              Setting
            </Link>
          </MenuItem>

          <MenuDivider />

          <MenuItem className={'nav__menu--item'} onClick={handleClickLog}>
            <RiLogoutCircleRLine></RiLogoutCircleRLine>
            <span>Logout</span>
          </MenuItem>
        </Menu> */}
        </div>
      </nav>
    </NavLanding>
  );
};

export default NavDashboard;
