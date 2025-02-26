import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReferralDashboard from './pages/ReferralDashboard';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <main className={classes.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ReferralDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
