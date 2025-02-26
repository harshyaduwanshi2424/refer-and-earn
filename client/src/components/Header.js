import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Container,
} from '@material-ui/core';
import { Person, Dashboard } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    color: theme.palette.text.primary,
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
    '& img': {
      height: 40,
      marginRight: theme.spacing(1),
    },
  },
  brandName: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <RouterLink to="/" className={classes.logo}>
            <Typography variant="h6" className={classes.brandName}>
              Refer & Earn Program
            </Typography>
          </RouterLink>
          <div>
            <Button
              component={RouterLink}
              to="/dashboard"
              color="primary"
              className={classes.menuButton}
              startIcon={<Dashboard className={classes.buttonIcon} />}
            >
              Dashboard
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={classes.menuButton}
              startIcon={<Person className={classes.buttonIcon} />}
            >
              Refer Now
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
