This project demonstrates how to build a web application using Express for the backend and EJS for the frontend, designed to handle form submissions and image uploads efficiently. All uploaded images are securely stored in Cloudinary for better scalability and management.

To use Cloudinary in this project, you'll need to create an account at Cloudinary.
After creating an account, update your cloudinary.config in your project as follows;

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY', 
  api_secret: 'YOUR_API_SECRET' 
});
