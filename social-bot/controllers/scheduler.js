const twitter = require('../services/twitterService');

const postScheduledContent = async () => {
  const message = "Scheduled post at " + new Date().toISOString();
  try {
    await twitter.postTweet(message);
    console.log('Tweeted:', message);
  } catch (err) {
    console.error('Post failed', err.message);
  }
};

module.exports = { postScheduledContent };
