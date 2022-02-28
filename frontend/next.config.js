// next.config.js
module.exports = {
  env: {
    API_URL: process.env.API_URL,
    SUPABASE_API_URL: process.env.SUPABASE_API_URL,
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_UPLOAD_URL: process.env.CLOUDINARY_UPLOAD_URL,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};
