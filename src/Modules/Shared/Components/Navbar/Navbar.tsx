import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  
  styled,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TranslateIcon from '@mui/icons-material/Translate';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../../../../Hooks/useAuth.hook';

const drawerWidth = 240;

interface AppBarProps {
  open: boolean;
  handleOpen?: () => void;
}



// style of favourite icon
const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;





const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const activeStyle = {
  backgroundColor: '#1976d220',
  borderRadius: 6,
  paddingInline: 12,
  textDecoration: 'none',
};

const inactiveStyle = {
  textDecoration: 'none',
};

const Navbar = ({ open, handleOpen }: AppBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
const {logOut ,isUser ,token} = useAuth()





  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    logOut()
    handleMenuClose();
    navigate('/');
  };

  return (
    <AppBar position="fixed" open={open} color="default">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {!isUser && token && <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpen}
            edge="start"
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>}

          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              fontFamily: 'monospace',
              color: '#1976d2',
              marginRight: 2,
            }}
          >
            Staycation
          </Typography>

          <NavLink
            to="/"
            style={({ isActive }: { isActive: boolean }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <Button color="inherit">Home</Button>
          </NavLink>

          <NavLink
            to="/explore"
            style={({ isActive }: { isActive: boolean }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <Button color="inherit">Explore</Button>
          </NavLink>

{token && isUser &&    <IconButton onClick={()=>{
  navigate("/favourite-list")
}}>
      <FavoriteIcon fontSize="small"  color='primary'/>
      <CartBadge badgeContent={1} color="primary" overlap="circular" />
    </IconButton>}




        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Toggle dark mode">
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Change Language">
            <IconButton color="inherit">
              <TranslateIcon />
            </IconButton>
          </Tooltip>

          {/* Settings Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            
              <Avatar
                alt="User"
                src="/profile.jpg"
                sx={{
                  width: 36,
                  height: 36,
                  border: '2px solid #1976d2',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            
           {token &&  <IconButton onClick={handleMenuOpen}>
              <ArrowDropDownIcon />
            </IconButton>}
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
     <NavLink
  to="/profile"
  style={({ isActive }) => ({
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    color: 'inherit',
  })}
>
  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
</NavLink>


   <NavLink
  to="/change-password"
  style={({ isActive }) => ({
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    color: 'inherit',
  })}
>
  <MenuItem onClick={handleMenuClose}>ChangePassword</MenuItem>
</NavLink>



{token && isUser && <MenuItem onClick={handleLogout}>Logout</MenuItem>
}
  </Menu>

       {!token &&    <Button onClick={()=>{
            navigate("/auth/login")
          }} variant="outlined" color="inherit" sx={{ textTransform: 'none' }}>
            Login
          </Button>}


          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
