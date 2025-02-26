const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all active courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ active: true });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new course
router.post('/', async (req, res) => {
  try {
    const { name, description, duration, fee, referralReward } = req.body;
    
    // Check if course with same name exists
    const existingCourse = await Course.findOne({ name });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course with this name already exists' });
    }

    const course = new Course({
      name,
      description,
      duration,
      fee,
      referralReward
    });

    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a course
router.patch('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update only provided fields
    Object.keys(req.body).forEach(key => {
      if (key in course) {
        course[key] = req.body[key];
      }
    });

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deactivate a course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.active = false;
    await course.save();
    res.json({ message: 'Course deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get courses with referral statistics
router.get('/stats/referrals', async (req, res) => {
  try {
    const courseStats = await Course.aggregate([
      {
        $lookup: {
          from: 'referrals',
          localField: '_id',
          foreignField: 'course',
          as: 'referrals'
        }
      },
      {
        $project: {
          name: 1,
          referralCount: { $size: '$referrals' },
          activeReferrals: {
            $size: {
              $filter: {
                input: '$referrals',
                as: 'referral',
                cond: { $eq: ['$$referral.status', 'pending'] }
              }
            }
          }
        }
      }
    ]);
    res.json(courseStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
