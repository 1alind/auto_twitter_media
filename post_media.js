// Import necessary modules
const {
  TwitterApi,
  TwitterApiV2Settings
} = require('twitter-api-v2');
TwitterApiV2Settings.deprecationWarnings = false;

const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Create a Twitter API client instance with authentication credentials
const client = new TwitterApi({
  appKey: process.env.CONSUMER_KEY,
  appSecret: process.env.CONSUMER_SECRET,
  accessToken: process.env.oauth_token,
  accessSecret: process.env.oauth_token_secret,
});

// Function to upload media to Twitter and post a tweet
async function postmedia(file, txt) {
  try {

    // Check if the file exists
    if (!file || !fs.existsSync(file)) {
      return "file not defined or doesn't exist";
    }

    // If no text is provided, set it to a space (will post without text)
    if (!txt) {
      txt = " "; // will post without text
    }

    // Read image or video data from the file
    const imageData = fs.readFileSync(file);


    // Get the file extension (e.g., 'jpg', 'mp4')
    const ext = path.extname(file).substring(1);

    // 'mimeType' returns "media type unrecognized" from twitter when uplaoding videos so we use 'type' instead for videos
    // idk if this is a bug from library or servers but this should work     
    var data;
    let type = gettype(ext)
    if (type == "img") {
      data = {
        mimeType: ext
      }
    } else if (type == "vid") {
      data = {
        type: ext
      }
    } else {
      return `unsupported filetype: ${ext}`;
    }
    // Upload media to Twitter and get the media ID
    const mediaId = await client.v1.uploadMedia(imageData, data);

    // Post a tweet with the uploaded media
    let h = await client.v2.tweet({
      'text': txt,
      'media': {
        'media_ids': [mediaId.toString()]
      }
    })

    // Check if the tweet was successfully posted
    if (h.data.id && h.data.text && h.data.edit_history_tweet_ids) {
      return true;
    } else {
      console.error(h.data)
      return false;
    }
  } catch (error) {
    console.error('An error occurred:', error.data);
    return false;
  }
}

// Helper function to determine the type of media based on file extension
function gettype(e) {
  // avi unsupported
  let v = ["gif", "mov", "mp4"]
  let i = ["png", "jpg", "webp"]
  if (v.includes(e)) {
    return "vid";
  } else if (i.includes(e)) {
    return "img";
  } else {
    return "unsupported";
  }
}



module.exports = {
  postmedia
}