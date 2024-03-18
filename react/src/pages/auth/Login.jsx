import React, { useState, useEffect } from 'react';
import {useLayoutContext} from '@/js/context/LayoutContext.jsx';
function Login() {
    const { setTitle } = useLayoutContext();
    useEffect(() => {
        setTitle('Login');
    }, []);
    
    return (
        <div>
            Login here
        </div>
    );
}
export default Login;