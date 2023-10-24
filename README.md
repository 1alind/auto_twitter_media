# Auto Twitter Media Uploader

## Overview

This Node.js script enables the upload of images (PNG, JPG, WebP) and videos (MP4, MOV, GIF) to Twitter using the Twitter API. It relies on the [twitter-api-v2](https://github.com/plhery/node-twitter-api-v2) library for authentication and media upload and tweeting.

## Twitter File Types

Twitter supports the following file types:

- **Images:** PNG, JPG, WebP, GIF
- **Videos:** MP4, MOV

For size limits and other informations read [Twitter Docs](https://developer.twitter.com/en/docs/twitter-api/v1/media/upload-media/uploading-media/media-best-practices)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/1alind/auto_twitter_media.git
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up your environment variables:**

    Create a .env file in the root directory with the following content:
    ```bash
    CONSUMER_KEY=your_consumer_key
    CONSUMER_SECRET=your_consumer_secret
    oauth_token=your_oauth_token
    oauth_token_secret=your_oauth_token_secret
    ```

    Replace your_consumer_key, your_consumer_secret, your_oauth_token, and your_oauth_token_secret with your Twitter API credentials.

## Usage
    node index.js