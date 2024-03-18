import { Outlet } from "react-router-dom";
import Card from '@mui/material/Card';
import style from '@/css/layouts/auth.module.scss';
import { useLayoutContext } from '@context/LayoutContext.jsx';
function AuthLayout() {
    const { title } = useLayoutContext();
    return (
        <>
            <div className={style.container}>
                <div className={style.container_card}>
                    <Card variant="outlined">
                        <h2 style={{ textAlign: 'center' }}>{title}</h2>
                        <Outlet />
                    </Card>

                </div>
            </div>
        </>
    );
}
export default AuthLayout;