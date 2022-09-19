import React from "react";
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from '../layouts/NavBar';

const MainLayout = () => {
	return (
		<React.Fragment>
			<NavBar />
			<Box
				component="main"
	      sx={{
	        display: 'flex',
	        flexDirection: 'column',
	        justifyContent: 'flex-start',
	        alignItems: 'center',
	        width: '100%',
	        height: '100vh',
	        background: '#FAF0E6',
	        zIndex: 1,
	        overflow: 'auto',
	        whiteSpace: 'normal',
	        pt: 0,
	        pb: 25,
	      }}
	    >
	    	<Outlet />
			</Box>
		</React.Fragment>
	);
};

export default MainLayout;