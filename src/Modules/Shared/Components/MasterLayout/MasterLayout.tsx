
import { Box, CssBaseline} from '@mui/material';
import { useState } from 'react';
import MySideBar, { DrawerHeader } from '../../../AdminPortal/Components/MySideBar/MySideBar';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import useAuth from '../../../../Hooks/useAuth.hook';

export default function MasterLayout() {
  const [open, setOpen] = useState(false);
const{isUser ,token}= useAuth()
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar open={open} handleOpen={handleDrawerOpen} />
      {token && !isUser &&<MySideBar open={open} handleClose={handleDrawerClose} />
}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Box>
          <Outlet/>
          </Box>
      </Box>
    </Box>
  );
}



