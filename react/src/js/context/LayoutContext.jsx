import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [title, setTitle] = useState('');

  return (
    <LayoutContext.Provider value={{ title, setTitle }}>
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