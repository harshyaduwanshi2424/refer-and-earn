import React, { useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Typography,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import { endpoints } from '../utils/api';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formSection: {
    marginBottom: theme.spacing(3),
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(1),
  },
  successMessage: {
    color: theme.palette.success.main,
    marginTop: theme.spacing(1),
  },
}));

function ReferralForm({ onClose }) {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    referrer: {
      name: '',
      email: '',
      phone: ''
    },
    referee: {
      name: '',
      email: '',
      phone: ''
    },
    courseId: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await endpoints.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      setError('Failed to load courses. Please try again later.');
    }
  };

  const handleChange = (section, field) => (event) => {
    setFormData({
      ...formData,
      [section]: section === 'courseId' 
        ? event.target.value
        : {
            ...formData[section],
            [field]: event.target.value
          }
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(formData.referrer.email)) {
      setError('Invalid referrer email address');
      return false;
    }
    if (!emailRegex.test(formData.referee.email)) {
      setError('Invalid referee email address');
      return false;
    }
    if (!phoneRegex.test(formData.referrer.phone)) {
      setError('Invalid referrer phone number (10 digits required)');
      return false;
    }
    if (!phoneRegex.test(formData.referee.phone)) {
      setError('Invalid referee phone number (10 digits required)');
      return false;
    }
    if (!formData.courseId) {
      setError('Please select a course');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await endpoints.createReferral(formData);
      setSuccess('Referral submitted successfully!');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit referral. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogTitle>Refer a Friend</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.formSection}>
            <Typography variant="h6" gutterBottom>
              Your Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Name"
                  value={formData.referrer.name}
                  onChange={handleChange('referrer', 'name')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Email"
                  type="email"
                  value={formData.referrer.email}
                  onChange={handleChange('referrer', 'email')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Phone"
                  value={formData.referrer.phone}
                  onChange={handleChange('referrer', 'phone')}
                  required
                />
              </Grid>
            </Grid>
          </div>

          <div className={classes.formSection}>
            <Typography variant="h6" gutterBottom>
              Friend's Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Friend's Name"
                  value={formData.referee.name}
                  onChange={handleChange('referee', 'name')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Friend's Email"
                  type="email"
                  value={formData.referee.email}
                  onChange={handleChange('referee', 'email')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Friend's Phone"
                  value={formData.referee.phone}
                  onChange={handleChange('referee', 'phone')}
                  required
                />
              </Grid>
            </Grid>
          </div>

          <div className={classes.formSection}>
            <TextField
              select
              fullWidth
              label="Select Course"
              value={formData.courseId}
              onChange={handleChange('courseId')}
              required
            >
              {courses.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {course.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {error && (
            <Typography className={classes.errorMessage}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography className={classes.successMessage}>
              {success}
            </Typography>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit Referral'}
        </Button>
      </DialogActions>
    </>
  );
}

export default ReferralForm;
