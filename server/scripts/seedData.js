require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Reward = require('../models/Reward');

const courses = [
  {
    name: 'Full Stack Web Development',
    description: 'Learn modern web development with the MERN stack',
    duration: '6 months',
    fee: 49999,
    referralReward: 2000,
    active: true
  },
  {
    name: 'Data Science & Machine Learning',
    description: 'Master data analysis and ML algorithms',
    duration: '8 months',
    fee: 59999,
    referralReward: 2500,
    active: true
  },
  {
    name: 'Mobile App Development',
    description: 'Build iOS and Android apps with React Native',
    duration: '4 months',
    fee: 39999,
    referralReward: 1500,
    active: true
  },
  {
    name: 'UI/UX Design',
    description: 'Create beautiful and functional user interfaces',
    duration: '3 months',
    fee: 29999,
    referralReward: 1000,
    active: true
  }
];

const rewards = [
  {
    tier: 'bronze',
    minReferrals: 1,
    maxReferrals: 3,
    rewardAmount: 1000,
    description: 'Entry level rewards',
    bonusPercentage: 0,
    validUntil: new Date('2025-12-31'),
    conditions: ['Must be first-time referrals', 'Referee must complete enrollment'],
    active: true
  },
  {
    tier: 'silver',
    minReferrals: 4,
    maxReferrals: 7,
    rewardAmount: 1500,
    description: 'Intermediate rewards with bonus',
    bonusPercentage: 10,
    validUntil: new Date('2025-12-31'),
    conditions: ['Previous referrals must be successful', '10% bonus on base reward'],
    active: true
  },
  {
    tier: 'gold',
    minReferrals: 8,
    maxReferrals: 12,
    rewardAmount: 2000,
    description: 'Advanced rewards with higher bonus',
    bonusPercentage: 20,
    validUntil: new Date('2025-12-31'),
    conditions: ['Maintain 50% conversion rate', '20% bonus on base reward'],
    active: true
  },
  {
    tier: 'platinum',
    minReferrals: 13,
    maxReferrals: 999999,
    rewardAmount: 2500,
    description: 'Premium rewards with maximum benefits',
    bonusPercentage: 30,
    validUntil: new Date('2025-12-31'),
    conditions: ['VIP support', '30% bonus on base reward', 'Special recognition'],
    active: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/refer-and-earn');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await Reward.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await Course.insertMany(courses);
    console.log('Courses seeded successfully');

    await Reward.insertMany(rewards);
    console.log('Rewards seeded successfully');

    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
