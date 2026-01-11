
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import logo from "../assets/design.svg";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

//   const isAuthenticated = false; // şimdilik mock
  const { isAuthenticated } = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const menuItems = isAuthenticated 
    ? [
        <MenuItem 
            key="profile" 
            onClick={handleClose}
        >Profile</MenuItem>,
        <MenuItem 
            key="account" 
            onClick={handleClose}
        >My account</MenuItem>,
        <MenuItem 
            key="logout" 
            onClick={()=>{
                dispatch(logout());
                handleClose();
        }}>Logout</MenuItem>
    ]:[
        <MenuItem 
            key="login" 
            component={Link} to="/login" 
            onClick={handleClose}
        >Login</MenuItem>,
        <MenuItem 
            key="register" 
            component={Link} to="/register" 
            onClick={handleClose}
        >Register</MenuItem>
    ]


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static"
        sx={{
            backgroundColor: "#046582"
        }}
      >
        <Toolbar sx={{ display: "flex" }}>
            {/* LEFT */}
            <Box 
                sx={{ 
                    // flex:1 
                    }}
            >
                <IconButton color="inherit">
                    <img src={logo} alt="logo" width="40px" />
                </IconButton>
            </Box>

            {/* CENTER */}
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography variant="h5">
                ⎯⎯⎯ <span style={{ color: "#FFD369" }}>{"< UmitDev /> Blog"}</span> ⎯⎯⎯
              </Typography>
            </Box>

            {/* RIGHT */}
            <Box sx={{ 
                // flex: 1, 
                display: "flex", 
                justifyContent: "flex-end" 
                }}>
              {/* Account menu burada */}            
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle sx={{ fontSize: 36 }}/>
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >

                { menuItems }
                
                </Menu>

              </div>
            </Box>
    
        </Toolbar>
      </AppBar>
    </Box>
  );
}





// First Navbar
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         {/* Logo / Title */}
//         <Typography
//           variant="h6"
//           component={Link}
//           to="/"
//           sx={{
//             flexGrow: 1,
//             textDecoration: "none",
//             color: "inherit",
//           }}
//         >
//           Blog App
//         </Typography>

//         {/* Navigation */}
//         <Box>
//           <Button color="inherit" component={Link} to="/login">
//             Login
//           </Button>
//           <Button color="inherit" component={Link} to="/register">
//             Register
//           </Button>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

