import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  CircularProgress,
  LinearProgress,
} from '@material-ui/core';
import { Person, EmojiEvents, Timeline, TrendingUp } from '@material-ui/icons';
import { endpoints } from '../utils/api';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    height: '100%',
  },
  statCard: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
  },
  statIcon: {
    fontSize: 40,
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  tableContainer: {
    marginTop: theme.spacing(4),
  },
  chipPending: {
    backgroundColor: theme.palette.warning.light,
  },
  chipCompleted: {
    backgroundColor: theme.palette.success.light,
  },
  chipCancelled: {
    backgroundColor: theme.palette.error.light,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  tierInfo: {
    marginTop: theme.spacing(4),
  },
  progressSection: {
    marginTop: theme.spacing(2),
  },
  progress: {
    height: 10,
    borderRadius: 5,
  },
}));

function ReferralDashboard() {
  const classes = useStyles();
  const [stats, setStats] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // For demo purposes using a static email - in production this would come from auth
      const email = 'demo@example.com';
      
      const [statsRes, referralsRes] = await Promise.all([
        endpoints.getReferralStats(email),
        endpoints.getReferralsByEmail(email)
      ]);

      setStats(statsRes.data);
      setReferrals(referralsRes.data);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'pending':
        return classes.chipPending;
      case 'completed':
        return classes.chipCompleted;
      case 'cancelled':
        return classes.chipCancelled;
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Container className={classes.root}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Referral Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.statCard}>
            <Person className={classes.statIcon} />
            <div>
              <Typography variant="h6">
                {stats?.totalReferrals || 0}
              </Typography>
              <Typography color="textSecondary">
                Total Referrals
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.statCard}>
            <EmojiEvents className={classes.statIcon} />
            <div>
              <Typography variant="h6">
                ₹{stats?.totalEarnings || 0}
              </Typography>
              <Typography color="textSecondary">
                Total Earnings
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.statCard}>
            <Timeline className={classes.statIcon} />
            <div>
              <Typography variant="h6">
                {stats?.pendingReferrals || 0}
              </Typography>
              <Typography color="textSecondary">
                Pending Referrals
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className={classes.statCard}>
            <TrendingUp className={classes.statIcon} />
            <div>
              <Typography variant="h6">
                {stats?.conversionRate || 0}%
              </Typography>
              <Typography color="textSecondary">
                Conversion Rate
              </Typography>
            </div>
          </Paper>
        </Grid>

        {/* Current Tier Info */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Current Tier: {stats?.currentTier?.name || 'Bronze'}
            </Typography>
            <div className={classes.progressSection}>
              <Typography variant="body2" color="textSecondary">
                Progress to Next Tier
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Box width="100%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    value={stats?.nextTierProgress || 0}
                    className={classes.progress}
                  />
                </Box>
                <Box minWidth={35}>
                  <Typography variant="body2" color="textSecondary">
                    {stats?.nextTierProgress || 0}%
                  </Typography>
                </Box>
              </Box>
            </div>
          </Paper>
        </Grid>

        {/* Referrals Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Referee Name</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Reward</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow key={referral._id}>
                    <TableCell>{referral.referee.name}</TableCell>
                    <TableCell>{referral.course.name}</TableCell>
                    <TableCell>
                      {new Date(referral.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={referral.status}
                        className={getStatusChipColor(referral.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      ₹{referral.course.referralReward}
                    </TableCell>
                  </TableRow>
                ))}
                {referrals.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No referrals found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ReferralDashboard;
