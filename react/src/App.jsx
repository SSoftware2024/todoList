import { useState } from 'react'
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
  palette: {
    mode: 'light',
  },
});
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Button variant="contained" color='primary'>Hello world</Button>
      </ThemeProvider>
    </>
  )
}

export default App
