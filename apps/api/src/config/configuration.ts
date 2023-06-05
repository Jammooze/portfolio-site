// eslint-disable-next-line import/no-anonymous-default-export
export default () => ({
  apiPort: parseInt(process.env.API_PORT, 10) || 3001,
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://voyage.com"
      : "http://localhost:" + (parseInt(process.env.API_PORT, 10) || 3001),
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  auth: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    },
  },
});
