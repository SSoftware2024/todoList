import React, { useEffect, useState } from 'react';
import { useLayoutContext } from '@context/LayoutContext.jsx';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import instance from '@/js/configAxios.js';
import { user as userEndpoint } from '@/js/endpoints.js';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
function Register() {
    const { setTitle, alert, showAlertFrom } = useLayoutContext();
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');

    const handleClose = () => {
        setOpen(false);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()
    useEffect(() => {
        setTitle('Registrar');
    }, []);



    const onSubmit = async (fields) => {
        const axios = await instance();
        axios({
            method: 'POST',
            url: userEndpoint.create,
            data: fields,
        }).then((result) => {
            const message = result.data?.recovery_code ? result.data.message: result.data;
            const recovery_code = result.data?.recovery_code;
            if(recovery_code){
                setCode(recovery_code);
                setOpen(true);
            }
            showAlertFrom(message);
            if (message.status == 'success') {
                reset();
            }

        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                    <TextField label="Nome" variant="standard" sx={{ width: '100%' }} {...register("name", { required: true })} error={!!errors.name} />
                    {errors.name && <span style={{ color: 'red' }}>Nome é obrigatório</span>}
                </Grid>
                <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                    <TextField label="E-mail" variant="standard" sx={{ width: '100%' }} {...register("email", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })} error={!!errors.email} />
                    {errors.email && <span style={{ color: 'red' }}>Email não validado</span>}
                </Grid>
                <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                    <TextField type="password" label="Senha" variant="standard" autoComplete="current-password" sx={{ width: '100%' }} {...register("password", { required: true, minLength: 5 })}
                        error={!!errors.password} />
                    {errors.password && <span style={{ color: 'red' }}>Senha minímo 5</span>}
                </Grid>
                <Grid item sm={12} sx={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                    <Link to="/">Início</Link>
                    <Button variant="contained" type='submit'>Registrar</Button>

                </Grid>

            </form>



            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h3>Seu código de recuperação: </h3>
                        <h2>{code}</h2>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default Register;