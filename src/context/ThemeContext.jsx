
import {children, createContext, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../Theme.jsx';




export const ThemeContext = createContext(null);

const  ThemeContextProvider = ({ children }) => {

    const [mode, setMode] = useState('light');
    const currentTheme = theme(mode);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }
    
    return (
        <ThemeContext.Provider value={{mode, toggleTheme}}>    

         <ThemeProvider theme={currentTheme}>
          <CssBaseline />

            {children}
             </ThemeProvider>
        </ThemeContext.Provider>
    );
}
export default ThemeContextProvider;