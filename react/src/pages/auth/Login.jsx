import React, { useState, useEffect } from 'react';
import { useLayoutContext } from '@context/LayoutContext.jsx';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import instance from '@/js/configAxios.js';
import { user as userEndpoint } from '@/js/endpoints.js';
import { useNavigate } from "react-router-dom";
function Login() {
    const { setTitle, showAlertFrom } = useLayoutContext();
    useEffect(() => {
        setTitle('Login');
    }, []);
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        const axios = await instance();
        axios({
            method: 'POST',
            url: userEndpoint.login,
            data: {
                email: event.target.email.value,
                password: event.target.password.value,
            },
        }).then((result) => {
            const user = result.data;
            if(user?.email){
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/auth/toDo/');
            }else if(user?.message){
                showAlertFrom(user);
            }

        });
    }

    return (
        <div>
            <form onSubmit={login}>
                <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                    <TextField label="Login" name='email' variant="standard" sx={{ width: '100%' }} />
                </Grid>
                <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                    <TextField type="password" name='password' label="Senha" variant="standard" autoComplete="current-password" sx={{ width: '100%' }} />
                </Grid>
                <Grid item sm={12} sx={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Link to="/" style={{ marginRight: '13px' }}>Início</Link>
                        <Link to="/auth/recover_password">Recuperar senha</Link>
                    </div>
                    <Button variant="contained" type='submit'>Entrar</Button>
                </Grid>

            </form>
        </div>
    );
}
export default Login;