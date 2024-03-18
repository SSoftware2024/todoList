import { Outlet } from "react-router-dom";
export default function TaskLayout() {
    return (
        <>
            Layout taks Pai
            <div>
                <Outlet />
            </div>
        </>
    );
}