const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');
const Course = require('../models/Course');

// Create a new referral
router.post('/', async (req, res) => {
  try {
    const { referrer, referee, courseId } = req.body;

    // Validate course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if referee has been referred before
    const existingReferral = await Referral.findOne({
      'referee.email': referee.email
    });
    if (existingReferral) {
      return res.status(400).json({ message: 'This person has already been referred' });
    }

    const referral = new Referral({
      referrer,
      referee,
      course: courseId
    });

    await referral.save();
    res.status(201).json(referral);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all referrals for a referrer
router.get('/referrer/:email', async (req, res) => {
  try {
    const referrals = await Referral.find({
      'referrer.email': req.params.email
    }).populate('course');
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update referral status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const referral = await Referral.findById(req.params.id);
    
    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    referral.status = status;
    if (status === 'completed') {
      referral.rewardClaimed = true;
    }

    await referral.save();
    res.json(referral);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get referral statistics
router.get('/stats/:email', async (req, res) => {
  try {
    const stats = await Referral.aggregate([
      {
        $match: {
          'referrer.email': req.params.email
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
