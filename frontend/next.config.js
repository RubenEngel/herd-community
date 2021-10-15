// next.config.js
module.exports = {
  images: {
    domains: ["i0.wp.com", "i1.wp.com", "i2.wp.com"],
  },
  env: {
    API_URL: process.env.API_URL,
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_SERVICE_CREDENTIALS: process.env.FIREBASE_SERVICE_CREDENTIALS,
  },
};