import {experimental_extendTheme as extendTheme, createTheme} from '@mui/material/styles';

const fontFamily = [
    'Inter',
    'Roboto',
    'Arial',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
].join(',');

export const lightTheme = createTheme({
    typography: {
        fontFamily
    },
    palette: {
        mode: 'light'
    },
    components: {
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    transition: 'opacity 2s ease-out',
                    backgroundColor: 'var(--magnyfire-background-primary)',
                    '& .MuiLinearProgress-barColorPrimary': {
                        backgroundColor: 'green'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '0',
                        borderColor: 'var(--magnyfire-border-color-1)'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--magnyfire-background-primary)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--magnyfire-background-focused)',
                        color: '#fff !important'
                    }
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundImage: 'none',
                    backgroundColor: 'var(--background-color-2)',
                    boxShadow: 'var(--magnyfire-container-shadow)'
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        }
    }
});

export const darkTheme = createTheme({
    typography: {
        fontFamily
    },
    palette: {
        mode: 'dark',
        background: {
            paper: '#101010'
        }
    },
    components: {}
});

export const extendedTheme = extendTheme({
    colorSchemes: {
        light: {
            ...lightTheme
        },
        dark: {
            ...lightTheme
        }
    }
});
