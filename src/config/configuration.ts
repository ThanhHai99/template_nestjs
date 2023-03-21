export default () => {
  return {
    app: {
      env: process.env.APP_ENV || 'local',
      port: process.env.APP_PORT || 80,
    },
    mail: {
      user: process.env.MAIL_USER || '',
      pass: process.env.MAIL_PASS || '',
    },
  }
}
