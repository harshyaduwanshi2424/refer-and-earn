import React from 'react';
import {
  Container,
  Typography,
  Link,
  makeStyles,
  Grid,
  Box,
} from '@material-ui/core';
import { Facebook, Twitter, Instagram, LinkedIn } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#f8f9fa',
    padding: theme.spacing(6, 0),
    marginTop: 'auto',
  },
  socialIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  link: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  },
  section: {
    marginBottom: theme.spacing(3),
  },
  copyright: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Footer() {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="textSecondary">
              We provide quality education and training programs to help you advance in your career.
              Join our community and start learning today!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link href="#" className={classes.link}>How It Works</Link>
              <Link href="#" className={classes.link}>Courses</Link>
              <Link href="#" className={classes.link}>FAQs</Link>
              <Link href="#" className={classes.link}>Contact Us</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <Link href="#" className={classes.socialIcon}>
                <Facebook />
              </Link>
              <Link href="#" className={classes.socialIcon}>
                <Twitter />
              </Link>
              <Link href="#" className={classes.socialIcon}>
                <Instagram />
              </Link>
              <Link href="#" className={classes.socialIcon}>
                <LinkedIn />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" className={classes.copyright}>
          © {currentYear} Refer & Earn Program. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
