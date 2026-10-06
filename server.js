// Entry point of the application
const app = require('./src/app');

// Vercel aur Local dono ke liye setup
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🌿 Server is running smoothly on http://localhost:${PORT}`);
    console.log(`🌿 Student API is ready to accept requests.`);
  });
}

// Vercel ke liye app ko export karna zaroori hai
module.exports = app;