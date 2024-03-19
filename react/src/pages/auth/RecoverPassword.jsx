import React, { useEffect, useState } from 'react';
import { useLayoutContext } from '@context/LayoutContext.jsx';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
export default function RecoverPassword() {
    const { setTitle } = useLayoutContext();
    const [isUpdatePassword, setUpdatePassword] = useState(false);
    useEffect(() => {
        isUpdatePassword ? setTitle('Nova senha') : setTitle('Recuperar acesso');
    }, [isUpdatePassword]);
    return (
        <div>
            {isUpdatePassword ? (
                <form>
                    <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                        <TextField type='password' label="Nova senha" variant="standard" sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                        <TextField type='password' label="Confirmar" variant="standard" sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                        <Button variant="contained" sx={{ marginTop: '15px', display: 'block', width: '100%' }} onClick={() => setUpdatePassword(false)}>Redefinir</Button>
                    </Grid>

                </form>
            ) : (
                <form>
                    <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                        <TextField label="Código" variant="standard" sx={{ width: '100%' }} />
                        <Button variant="contained" sx={{ margin: '15px 0 10px 0', display: 'block', width: '100%' }} onClick={() => setUpdatePassword(true)}>Validar</Button>
                        <div style={{ width:'100%', display:'flex', justifyContent:'center' }}>
                            <Link to="/auth/login">Login</Link>
                        </div>
                    </Grid>

                </form>
            )}

        </div>
    );
}