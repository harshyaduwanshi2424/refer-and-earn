const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward');
const Referral = require('../models/Referral');

// Get all active rewards/tiers
router.get('/', async (req, res) => {
  try {
    const rewards = await Reward.find({ active: true })
      .sort({ minReferrals: 1 });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new reward tier
router.post('/', async (req, res) => {
  try {
    const {
      tier,
      minReferrals,
      maxReferrals,
      rewardAmount,
      description,
      bonusPercentage,
      validUntil,
      conditions
    } = req.body;

    // Check if tier already exists
    const existingTier = await Reward.findOne({ tier });
    if (existingTier) {
      return res.status(400).json({ message: 'Reward tier already exists' });
    }

    const reward = new Reward({
      tier,
      minReferrals,
      maxReferrals,
      rewardAmount,
      description,
      bonusPercentage,
      validUntil,
      conditions
    });

    const newReward = await reward.save();
    res.status(201).json(newReward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Calculate rewards for a referrer
router.get('/calculate/:email', async (req, res) => {
  try {
    // Get completed referrals for the user
    const completedReferrals = await Referral.find({
      'referrer.email': req.params.email,
      status: 'completed'
    }).populate('course');

    // Get all active reward tiers
    const rewards = await Reward.find({ 
      active: true,
      validUntil: { $gt: new Date() }
    }).sort({ minReferrals: 1 });

    const referralCount = completedReferrals.length;
    let totalReward = 0;
    let currentTier = null;

    // Calculate base rewards from courses
    totalReward = completedReferrals.reduce((sum, ref) => 
      sum + (ref.course.referralReward || 0), 0);

    // Find applicable tier
    for (const reward of rewards) {
      if (referralCount >= reward.minReferrals && 
          referralCount <= reward.maxReferrals) {
        currentTier = reward;
        // Add bonus percentage if applicable
        if (reward.bonusPercentage > 0) {
          const bonus = (totalReward * reward.bonusPercentage) / 100;
          totalReward += bonus;
        }
        break;
      }
    }

    res.json({
      referralCount,
      totalReward,
      currentTier,
      nextTier: rewards.find(r => r.minReferrals > referralCount),
      completedReferrals
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a reward tier
router.patch('/:id', async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) {
      return res.status(404).json({ message: 'Reward tier not found' });
    }

    // Update only provided fields
    Object.keys(req.body).forEach(key => {
      if (key in reward) {
        reward[key] = req.body[key];
      }
    });

    const updatedReward = await reward.save();
    res.json(updatedReward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deactivate a reward tier
router.delete('/:id', async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) {
      return res.status(404).json({ message: 'Reward tier not found' });
    }

    reward.active = false;
    await reward.save();
    res.json({ message: 'Reward tier deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
