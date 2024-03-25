import React, { useEffect, useState } from 'react';
import { useLayoutContext } from '@context/LayoutContext.jsx';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import instance from '@/js/configAxios.js';
import { user as userEndpoint } from '@/js/endpoints.js';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
export default function RecoverPassword() {
    const { setTitle, showAlertFrom } = useLayoutContext();
    const [isUpdatePassword, setUpdatePassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');
    useEffect(() => {
        isUpdatePassword ? setTitle('Nova senha') : setTitle('Recuperar acesso');
    }, [isUpdatePassword]);

    const handleClose = () => {
        setOpen(false);
    };

    async function validateCode(event) {
        event.preventDefault();
        const axios = await instance();
        axios({
            method: 'POST',
            url: userEndpoint.validate_code,
            data: {
                code: event.target.code.value,
            },
        }).then((result) => {
            if (result.data?.isVerified) {
                localStorage.setItem('user_id', result.data.id);
                setUpdatePassword(true);
                setCode(result.data.newCode);
                setOpen(true);
                event.target.code.value = '';
            } else {
                showAlertFrom(result.data);
            }
            

        });
    }

    async function newPassword(event) {
        event.preventDefault();
        console.log(localStorage.getItem('user_id'));
        const axios = await instance();
        axios({
            method: 'PACTH',
            url: userEndpoint.new_password,
            data: {
                id: localStorage.getItem('user_id'),
                password: event.target.password.value
            },
        }).then((result) => {
            showAlertFrom(result.data);
            setUpdatePassword(false);
            event.target.password.value = '';
            localStorage.removeItem('user_id');
        });
    }
    return (
        <div>
            {isUpdatePassword ? (
                <form onSubmit={newPassword}>
                    <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                        <TextField type='password' name='password' label="Nova senha" variant="standard" sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                        <Button variant="contained" type='submit' sx={{ marginTop: '15px', display: 'block', width: '100%' }}>Redefinir</Button>
                    </Grid>

                </form>
            ) : (
                <form onSubmit={validateCode}>
                    <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                        <TextField label="Código" name='code' variant="standard" sx={{ width: '100%' }} />
                        <Button variant="contained" type='submit' sx={{ margin: '15px 0 10px 0', display: 'block', width: '100%' }}>Validar</Button>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Link to="/auth/login">Login</Link>
                        </div>
                    </Grid>

                </form>
            )}


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h3>Seu novo código de recuperação: </h3>
                        <h2>{code}</h2>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}