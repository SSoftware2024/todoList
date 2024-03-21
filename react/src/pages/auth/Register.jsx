import React, { useEffect } from 'react';
import { useLayoutContext } from '@context/LayoutContext.jsx';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
function Register() {
    const { setTitle } = useLayoutContext();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    useEffect(() => {
        setTitle('Registrar');
    }, []);

    const onSubmit = (data) => console.log(data)
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
                    })} error={!!errors.email}/>
                    {errors.email && <span style={{ color: 'red' }}>Email não validado</span>}
                </Grid>
                <Grid item sm={12} sx={{ marginBottom: '15px' }}>
                    <TextField type="password" label="Senha" variant="standard" autoComplete="current-password" sx={{ width: '100%' }} {...register("password", { required: true, minLength:5 })} 
                    error={!!errors.password}/>
                    {errors.password && <span style={{ color: 'red' }}>Senha minímo 5</span>}
                </Grid>
                <Grid item sm={12} sx={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                    <Link to="/">Início</Link>
                    <Button variant="contained" type='submit'>Registrar</Button>
                </Grid>

            </form>
        </div>
    );
}
export default Register;