import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  makeStyles,
  Paper,
  Box,
  Dialog,
} from '@material-ui/core';
import { People, TrendingUp, EmojiEvents } from '@material-ui/icons';
import ReferralForm from '../components/ReferralForm';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(8, 0, 6),
  },
  heroContent: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  howItWorks: {
    padding: theme.spacing(8, 0),
    backgroundColor: '#fff',
  },
  stepCard: {
    padding: theme.spacing(3),
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-8px)',
    },
  },
  stepIcon: {
    fontSize: 48,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  rewardsSection: {
    padding: theme.spacing(8, 0),
    backgroundColor: theme.palette.background.default,
  },
  rewardTier: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  imageContainer: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
    },
    position: 'relative',
  },
  heroImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  imageButton: {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
  },
}));

function Home() {
  const classes = useStyles();
  const [openReferral, setOpenReferral] = useState(false);

  const handleReferralOpen = () => {
    setOpenReferral(true);
  };

  const handleReferralClose = () => {
    setOpenReferral(false);
  };

  return (
    <>
      <div className={classes.hero}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" className={classes.heroContent}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" color="primary" gutterBottom>
                Let's Learn & Earn Together
              </Typography>
              <Typography variant="h5" color="textSecondary" paragraph>
                Refer your friends and earn up to ₹15,000! Join our referral program
                and get rewarded for spreading the knowledge.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={classes.imageContainer}>
              <img
                src="photo.png"
                alt="Referral Program"
                className={classes.heroImage}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleReferralOpen}
                className={classes.imageButton}
              >
                Refer Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className={classes.howItWorks}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            How It Works
          </Typography>
          <Box mt={6}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Paper elevation={2} className={classes.stepCard}>
                  <People className={classes.stepIcon} />
                  <Typography variant="h6" gutterBottom>
                    Step 1: Refer Friends
                  </Typography>
                  <Typography color="textSecondary">
                    Share your referral link with friends interested in learning.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={2} className={classes.stepCard}>
                  <TrendingUp className={classes.stepIcon} />
                  <Typography variant="h6" gutterBottom>
                    Step 2: They Enroll
                  </Typography>
                  <Typography color="textSecondary">
                    When your friends enroll in any course using your referral.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={2} className={classes.stepCard}>
                  <EmojiEvents className={classes.stepIcon} />
                  <Typography variant="h6" gutterBottom>
                    Step 3: Earn Rewards
                  </Typography>
                  <Typography color="textSecondary">
                    Get rewarded with cash bonuses for successful referrals.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>

      <div className={classes.rewardsSection}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            Rewards Structure
          </Typography>
          <Box mt={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.rewardTier}>
                  <Typography variant="h6" gutterBottom>
                    Bronze Tier (1-3 Referrals)
                  </Typography>
                  <Typography>₹1,000 per successful referral</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.rewardTier}>
                  <Typography variant="h6" gutterBottom>
                    Silver Tier (4-7 Referrals)
                  </Typography>
                  <Typography>₹1,500 per successful referral</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.rewardTier}>
                  <Typography variant="h6" gutterBottom>
                    Gold Tier (8+ Referrals)
                  </Typography>
                  <Typography>₹2,000 per successful referral</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>

      <Dialog
        open={openReferral}
        onClose={handleReferralClose}
        maxWidth="sm"
        fullWidth
      >
        <ReferralForm onClose={handleReferralClose} />
      </Dialog>
    </>
  );
}

export default Home;
