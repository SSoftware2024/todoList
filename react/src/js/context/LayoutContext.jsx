import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [title, setTitle] = useState('');
  const [alert, setAlert] = useState({
    open: false,
    type: '', //success,info,warning,error
    message: ''
  });

  function showAlertFrom(value) {
    setAlert({
      open: true,
      message: value.message,
      type: value.status,
    });
  }

  return (
    <LayoutContext.Provider value={{ title, setTitle, alert, setAlert, showAlertFrom }}>
      {children}
    </LayoutContext.Provider>
  );
};

const useLayoutContext = () => {
  return useContext(LayoutContext);
};

export {
  LayoutProvider, useLayoutContext
};