import React, {useState, useMemo, useCallback} from 'react';
import classnames from 'classnames';
import {useNavigate} from 'react-router-dom';
import {IconButton, Menu, MenuItem, Box, Typography, Container, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IncomeTaxPage from '../../pages/IncomeTax/IncomeTaxPage';

import './styles.css';

const AppBar = () => {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = useCallback(
        (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget),
        []
    );

    const handleCloseNavMenu = useCallback(
        (to: string) => () => {
            setAnchorElNav(null);
            if (to) {
                navigate(to);
            }
        },
        [navigate]
    );

    const publicPages = useMemo(() => [{to: '/income-tax', label: 'Income Tax Calculator', Icon: IncomeTaxPage}], []);

    const handleLogoClicked = useCallback(() => navigate('/'), [navigate]);

    return (
        <>
            <Container className={classnames('appbar-container')} maxWidth={false}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={handleLogoClicked}
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'flex'},
                            // display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <span className="profit">Investment</span>
                        <span className="loss">Calculators</span>
                    </Typography>

                    {/* <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}> */}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu('')}
                            sx={{display: {xs: 'block', md: 'none'}}}
                        >
                            {publicPages.map((page) => (
                                <MenuItem key={page.label} onClick={handleCloseNavMenu(page.to)}>
                                    <Typography sx={{textAlign: 'center'}}>{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </>
    );
};

export default AppBar;
