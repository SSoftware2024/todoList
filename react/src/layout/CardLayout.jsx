import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useLayoutContext } from '@context/LayoutContext.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import style from '@/css/layouts/auth.module.scss';
import { Outlet } from "react-router-dom";
import Card from '@mui/material/Card';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main:'#c868ff',
            light: '#ba49fc',
            dark:'#ba49fc'
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
                        <Card variant="outlined" sx={{ padding: '5px 10px' }}>
                            <h2 style={{ textAlign: 'center' }}>{title}</h2>
                            <Outlet />
                        </Card>

                    </div>
                </div>
            </ThemeProvider>

        </>
    );
}
export default AuthLayout;