import React, { useState, useEffect } from 'react';
import { useLayoutContext } from '@context/LayoutContext.jsx';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import axios from 'axios';
function Login() {
    const { setTitle } = useLayoutContext();
    useEffect(() => {
        setTitle('Login');
    }, []);

    function login(event) {
        event.preventDefault();
        axios.get('http://localhost/a_php/todoList/php/api/user/create.php')
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    return (
        <div>
            <form onSubmit={login}>
                <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                    <TextField label="Login" variant="standard" sx={{ width: '100%' }} />
                </Grid>
                <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                    <TextField type="password" label="Senha" variant="standard" autoComplete="current-password" sx={{ width: '100%' }} />
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