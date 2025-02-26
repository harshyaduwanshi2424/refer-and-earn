const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  tier: {
    type: String,
    required: true,
    enum: ['bronze', 'silver', 'gold', 'platinum']
  },
  minReferrals: {
    type: Number,
    required: true
  },
  maxReferrals: {
    type: Number,
    required: true
  },
  rewardAmount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  bonusPercentage: {
    type: Number,
    default: 0
  },
  validUntil: {
    type: Date,
    required: true
  },
  conditions: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add validation to ensure minReferrals is less than maxReferrals
rewardSchema.pre('save', function(next) {
  if (this.minReferrals >= this.maxReferrals) {
    next(new Error('Minimum referrals must be less than maximum referrals'));
  }
  next();
});

module.exports = mongoose.model('Reward', rewardSchema);
