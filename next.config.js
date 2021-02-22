// next.config.js
module.exports = {
    images: {
      domains: ['i0.wp.com', 'i1.wp.com', 'i2.wp.com'],
    },
    env: {
      WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
    }
  }