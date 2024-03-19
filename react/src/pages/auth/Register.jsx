import React, { useEffect } from 'react';
import { useLayoutContext } from '@context/LayoutContext.jsx';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
function Register() {
    const { setTitle } = useLayoutContext();
    useEffect(() => {
        setTitle('Registrar');
    }, []);
    return (
        <div>
            <form>
                <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                    <TextField label="Nome" variant="standard" sx={{ width: '100%' }} />
                </Grid>
                <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                    <TextField label="E-mail" variant="standard" sx={{ width: '100%' }} />
                </Grid>
                <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                    <TextField type="password" label="Senha" variant="standard" autoComplete="current-password" sx={{ width: '100%' }} />
                </Grid>
                <Grid item sm={12} sx={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                    <Link to="/">Início</Link>
                    <Button variant="contained">Registrar</Button>
                </Grid>

            </form>
        </div>
    );
}
export default Register;