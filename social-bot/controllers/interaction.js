const twitter = require('../services/twitterService');

const likeAndComment = async () => {
  try {
    const tweets = await twitter.searchHashtag('javascript');
    for (const tweet of tweets) {
      await twitter.like(tweet.id);
      await twitter.comment(tweet.id, "Great post! 🔥");
    }
  } catch (err) {
    console.error('Interaction failed:', err.message);
  }
};

module.exports = { likeAndComment };
