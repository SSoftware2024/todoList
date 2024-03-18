import React, { useState, useEffect } from 'react';
import { useLayoutContext } from '@/js/context/LayoutContext.jsx';
function Register() {
    const { setTitle } = useLayoutContext();
    useEffect(() => {
        setTitle('Registrar');
    }, []);
    return (
        <>
            Register Here
        </>
    );
}
export default Register;