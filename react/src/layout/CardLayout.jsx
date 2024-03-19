import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useLayoutContext } from '@context/LayoutContext.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import style from '@/css/layouts/card.module.scss';
import { Outlet } from "react-router-dom";
import Card from '@mui/material/Card';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
//icons
import LogoutIcon from '@mui/icons-material/Logout';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#c868ff',
            light: '#ba49fc',
            dark: '#ba49fc'
        }
    },
});
function AuthLayout() {

    const { title } = useLayoutContext();
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <div className={style.container}>
                    <div className={style.container_card}>
                        <Card variant="outlined" sx={{ padding: '5px 10px', position: 'relative' }}>
                            <h2 style={{ textAlign: 'center' }}>{title}</h2>
                            <Outlet />



                            <div className={style.logout}>
                                <Tooltip title="Sair">
                                    <IconButton onClick={() => null} color='secondary'>
                                        <LogoutIcon></LogoutIcon>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Card>

                    </div>
                </div>
            </ThemeProvider>

        </>
    );
}
export default AuthLayout;