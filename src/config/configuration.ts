export default () => {
  return {
    app: {
      env: process.env.APP_ENV || 'local',
      port: process.env.APP_PORT || 80,
    },
    database: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      pass: process.env.DATABASE_PASS,
      name: process.env.DATABASE_NAME,
    },
  }
}
