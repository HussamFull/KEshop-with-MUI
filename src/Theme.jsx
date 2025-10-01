
import {createTheme} from '@mui/material/styles';

 const theme =(mode)=> createTheme({
    palette: {
     mode: mode,
    },
    });   

export default theme;