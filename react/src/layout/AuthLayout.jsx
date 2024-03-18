import { Outlet } from "react-router-dom";
function AuthLayout() {
    return (
        <>
            Layout pai
            <div>
                <Outlet />
            </div>
        </>
    );
}
export default AuthLayout;