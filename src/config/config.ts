export default {
  DB: process.env.DB_URL || "mongodb://localhost/baseApi",
  PORT: process.env.PORT || 4000
}