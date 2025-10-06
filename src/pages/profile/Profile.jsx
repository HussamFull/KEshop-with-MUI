import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, Outlet } from 'react-router-dom';

export default function Profile() {


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" >
      <List>
          <ListItem component={Link} to="" >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Info"} disablePadding />
            </ListItemButton>
          </ListItem>

          <ListItem component={Link} to="Orders" >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Orders'} />
            </ListItemButton>
          </ListItem>

            <ListItem component={Link} to="Setting" >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Setting'} />
            </ListItemButton>
          </ListItem>

      </List>
      <Divider />
     
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
         <Drawer variant='permanent' anchor='left'
      
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: '64px', // Adjust this value based on your AppBar height
         // top: "6px" // Adjust this value based on your AppBar height
        },
      }
      }

      >
        {DrawerList}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
        <Outlet />
      </Box>
    </Box>
   
  );
}
