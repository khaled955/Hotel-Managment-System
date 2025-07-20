
import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
} from '@mui/material';
import { CSSObject, Theme } from '@mui/material/styles';
import { NavLink, useLocation } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CampaignIcon from '@mui/icons-material/Campaign';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BuildIcon from '@mui/icons-material/Build';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../../../Hooks/useAuth.hook';

const drawerWidth = 240;
const mainColor = '#203fc7';
const textColor = '#ffffff';





const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
   backgroundColor: mainColor,
  color: textColor,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    backgroundColor: mainColor,
  color: textColor,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
     
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface SidebarProps {
  open: boolean;
  handleClose: () => void;
  onLogout?: () => void;
}

const links = [
  { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Users', path: '/dashboard/users', icon: <GroupIcon /> },
  { text: 'Rooms', path: '/dashboard/rooms', icon: <MeetingRoomIcon /> },
  { text: 'Ads', path: '/dashboard/ads', icon: <CampaignIcon /> },
  { text: 'List Booking', path: '/dashboard/list-booking', icon: <ListAltIcon /> },
  { text: 'Facilities', path: '/dashboard/facilities', icon: <BuildIcon /> },
];

const MySideBar = ({ open, handleClose }: SidebarProps) => {
  const theme = useTheme();
  const location = useLocation();
const {logOut} = useAuth()
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleClose} sx={{ color: textColor }}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ borderColor: '#ffffff55' }} />
      <List>
        {links.map(({ text, path, icon }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              to={path}
              key={text}
             style={{
                textDecoration: 'none',
                color: textColor,
              }}
            >
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    color: isActive ? '#ffeb3b' : textColor,
                     '&:hover': {
                      backgroundColor: '#1a34a3',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                       color: isActive ? '#ffeb3b' : textColor,

                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          );
        })}
      </List>
      <Divider  sx={{ borderColor: '#ffffff55' }}/>
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={logOut}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
                color: textColor,
              '&:hover': {
                backgroundColor: '#1a34a3',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: textColor,
             
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Log Out"
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MySideBar;
export { DrawerHeader };



