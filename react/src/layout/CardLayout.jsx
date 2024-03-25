import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useLayoutContext } from '@context/LayoutContext.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import style from '@/css/layouts/card.module.scss';
import { Outlet } from "react-router-dom";
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import instance from '@/js/configAxios.js';
import { user as userEndpoint } from '@/js/endpoints.js';
import { useNavigate } from "react-router-dom";
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
    const { title, alert, setAlert, showAlertFrom } = useLayoutContext();
    useEffect(() => {
        if (alert.open) {
            setTimeout(() => {
                setAlert({...alert, open: false });
            }, 5000);
        }
    }, [alert]);

    const navigate = useNavigate();

    async function logout(event) {
        event.preventDefault();
        const axios = await instance();
        axios({
            method: 'POST',
            url: userEndpoint.logout,
        }).then((result) => {
            const message = result.data;
            localStorage.clear();
            showAlertFrom(message);
            navigate('/auth/login/');

        });
    }
    
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
                                    <IconButton onClick={logout} color='secondary'>
                                        <LogoutIcon></LogoutIcon>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Card>
                        {alert.open ? (<Alert variant="outlined" severity={alert.type}>
                            {alert.message}
                        </Alert>) : null}

                    </div>
                </div>
            </ThemeProvider>

        </>
    );
}
export default AuthLayout;